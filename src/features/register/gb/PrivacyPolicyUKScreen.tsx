import { Screen } from '@covid/components/Screen';
import { colors } from '@covid/themes';
import * as React from 'react';
import { ActivityIndicator, Linking, Platform, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes';
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
      if (!element.classList.contains('privacy-outer') && element.id !== 'privacy-policy') {
        element.remove();
      } else {
        element.classList.forEach((className) => {
          element.classList.remove(className);
        });
        element.id = 'privacy-policy';
      }
    });

    if (window.thisvariableexists) {
      const styles = "div { outline: none; }";

      const styleElement = document.createElement('style');

      styleElement.type = 'text/css';

      if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = styles;
      } else {
        styleElement.appendChild(document.createTextNode(styles));
      }

      document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
  }
`;

const uri = 'https://covid.joinzoe.com/privacy';
const url = new UrlParse(uri);
const source = { uri };

export function PrivacyPolicyUKScreen() {
  const [loaded, setLoaded] = React.useState(false);
  const webView = React.useRef<WebView>(null);

  // eslint-disable-next-line no-console
  const onError = React.useCallback((error) => console.warn(error), []);

  const onLoad = React.useCallback(() => webView.current?.injectJavaScript(js), [webView.current, js]);

  const onLoadEnd = React.useCallback(() => {
    webView.current?.injectJavaScript(js);
    if (!loaded) {
      setTimeout(() => setLoaded(true), 250);
    }
  }, [webView.current, js, loaded, setLoaded]);

  const onShouldStartLoadWithRequest = React.useCallback(
    (request: ShouldStartLoadRequest) => {
      // The 'navigationType' property is only available on iOS.
      // If a request is started without the user initiating it, always allow it.
      if (Platform.OS === 'ios' && request.navigationType !== 'click') {
        return true;
      }
      try {
        const navUrl = new UrlParse(request.url);
        if (navUrl.hostname !== url.hostname || navUrl.pathname !== url.pathname) {
          Linking.openURL(request.url);
          return false;
        }
        return true;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(error);
      }
      return false;
    },
    [webView.current],
  );

  return (
    <Screen noScrollView testID="privacy-policy-uk-screen">
      <WebView
        injectedJavaScript={js}
        injectedJavaScriptBeforeContentLoaded={js}
        onError={onError}
        onLoad={onLoad}
        onLoadEnd={onLoadEnd}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
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
