import { colors } from '@theme/colors';
import * as React from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import WebView from 'react-native-webview';

interface IProps {
  autoplay?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  height: number;
  loop?: boolean;
  showLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  vimeoId: string;
  width: number;
}

export default function VimeoVideo(props: IProps) {
  const source = React.useMemo(() => {
    const url = new URL(`https://player.vimeo.com/video/${props.vimeoId}`);
    if (props.autoplay !== undefined) {
      url.searchParams.append('autoplay', props.autoplay ? '1' : '0');
    }
    if (props.loop !== undefined) {
      url.searchParams.append('loop', props.loop ? '1' : '0');
    }
    return {
      html: `
        <html style="padding: 0; margin: 0; background-color: transparent;">
          <body style="padding: 0; margin: 0; background-color: transparent;">
            <iframe
              allow="autoplay; picture-in-picture"
              frameborder="0"
              height="100%"
              src="${url.href}"
              style="background-color: transparent;"
              width="100%"
            ></iframe>
            <script src="https://player.vimeo.com/api/player.js"></script>
          </body>
        </html>
      `,
    };
  }, [props.vimeoId, props.autoplay, props.loop]);
  const sizeStyle = {
    height: props.height,
    width: props.width,
  };
  const webViewElement = (
    <WebView
      allowsInlineMediaPlayback
      automaticallyAdjustContentInsets
      allowsFullscreenVideo={false}
      containerStyle={[styles.webView, sizeStyle, props.containerStyle]}
      scrollEnabled={false}
      source={source}
      style={[styles.webView, sizeStyle, props.style]}
    />
  );
  return props.showLoading ? (
    <>
      <View style={StyleSheet.absoluteFill}>
        <ActivityIndicator color={colors.brand} size="large" style={styles.activityIndicator} />
      </View>
      {webViewElement}
    </>
  ) : (
    webViewElement
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    alignSelf: 'center',
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  webView: {
    backgroundColor: 'transparent',
    flex: 0,
  },
});
