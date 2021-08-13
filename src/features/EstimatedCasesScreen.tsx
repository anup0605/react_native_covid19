import { BackButton } from '@covid/components/BackButton';
import { sizes } from '@covid/themes';
import { loadEstimatedCasesCartoMap } from '@covid/utils/files';
import * as React from 'react';
import { ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

export function EstimatedCasesScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const [html, setHtml] = React.useState<string>('');

  React.useEffect(() => {
    let isMounted = true;
    const runAsync = async () => {
      try {
        setHtml(await loadEstimatedCasesCartoMap());
      } catch (_) {}
    };
    if (isMounted) {
      runAsync();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const style = React.useMemo<ViewStyle>(
    () => ({
      left: safeAreaInsets.left + sizes.screenHorizontalPadding,
      position: 'absolute',
      top: safeAreaInsets.top + sizes.screenVerticalPadding / 2,
      zIndex: 100,
    }),
    [safeAreaInsets],
  );

  return (
    <>
      <BackButton style={style} />
      <WebView originWhitelist={['*']} source={{ html }} />
    </>
  );
}
