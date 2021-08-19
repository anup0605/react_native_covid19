import { Screen } from '@covid/components/Screen';
import { colors } from '@covid/themes';
import * as React from 'react';
import { ActivityIndicator, Linking, StyleSheet, View } from 'react-native';
import WebView, { WebViewNavigation } from 'react-native-webview';
import UrlParse from 'url-parse';

const js = `
  if (!window.thisvariableexists) {
    divPrivacyInners = document.getElementsByClassName("privacy-outer");
    if (divPrivacyInners.length > 0) {
      // This script runs multiple times and the first time it runs might be before any
      // content is loaded in the DOM. Besides that we only want to run this script once
      // successfully.
      window.thisvariableexists = true;
      document.body.appendChild(divPrivacyInners[0]);
    }

    document.querySelectorAll('body > *').forEach((element) => {
      if (!element.classList.contains('privacy-outer') || element.id === 'privacy-policy') {
        element.remove();
      } else {
        element.classList.forEach((className) => {
          element.classList.remove(className);
        });
        element.id = 'privacy-policy';
      }
    });
  }
`;

const uri = 'https://covid.joinzoe.com/privacy';
const url = new UrlParse(uri);
const source = { uri };

export function PrivacyPolicyUKScreen() {
  const [loaded, setLoaded] = React.useState(false);
  const webView = React.useRef<WebView>(null);

  function onLoad() {
    webView.current?.injectJavaScript(js);
  }

  function onLoadEnd() {
    webView.current?.injectJavaScript(js);
    if (!loaded) {
      setTimeout(() => setLoaded(true), 250);
    }
  }

  function onNavigationStateChange(navState: WebViewNavigation) {
    try {
      const navUrl = new UrlParse(navState.url);
      if (navUrl.hostname !== url.hostname || navUrl.pathname !== url.pathname) {
        webView.current?.stopLoading();
        Linking.openURL(navState.url);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
    }
  }

  return (
    <Screen noPadding noScrollView testID="privacy-policy-uk-screen">
      <WebView
        injectedJavaScript={js}
        injectedJavaScriptBeforeContentLoaded={js}
        onLoad={onLoad}
        onLoadEnd={onLoadEnd}
        onNavigationStateChange={onNavigationStateChange}
        ref={webView}
        source={source}
      />
      {!loaded ? (
        <View style={styles.view}>
          <ActivityIndicator color={colors.coral.main.bgColor} size="large" />
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    backgroundColor: 'white',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
});
