import * as React from 'react';
import { Linking } from 'react-native';
import WebView, { WebViewNavigation } from 'react-native-webview';
import UrlParse from 'url-parse';

const js = `
  divPrivacyInners = document.getElementsByClassName("privacy-inner");
  if (divPrivacyInners.length > 0) {
    document.body.appendChild(divPrivacyInners[0]);
  }

  document.querySelectorAll('body > *').forEach((element) => {
    if (!element.classList.contains('privacy-inner')) {
      element.remove();
    }
  });
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
    <WebView
      injectedJavaScript={js}
      injectedJavaScriptBeforeContentLoaded={js}
      onLoad={onLoad}
      onLoadEnd={onLoadEnd}
      onNavigationStateChange={onNavigationStateChange}
      ref={webView}
      source={source}
    />
  );
}
