import { useEffect, useMemo } from 'react';

import { generateUUID } from '@onekeyhq/shared/src/utils/miscUtils';

import type { ViewStyle } from 'react-native';
import type { WebViewProps } from 'react-native-webview';

export function WebView({
  tradingViewProps,
  style,
  onLoadEnd,
}: {
  tradingViewProps: {
    uri: string;
  };
  style: ViewStyle;
} & WebViewProps & {
    onLoadEnd: () => void;
  }) {
  const iframeId = useMemo(() => generateUUID(), []);
  useEffect(() => {
    const frame = document.getElementById(iframeId) as HTMLIFrameElement;
    if (frame && tradingViewProps.uri) {
      frame.onload = () => {
        setTimeout(() => {
          onLoadEnd();
        }, 1200);
      };
    }
  }, [iframeId, onLoadEnd, tradingViewProps.uri]);
  return (
    <div style={style as any}>
      <iframe
        id={iframeId}
        src={tradingViewProps.uri}
        style={{
          height: '100%',
          width: '100%',
          border: 0,
        }}
        frameBorder="0"
        title="TradingView"
        sandbox="allow-orientation-lock allow-scripts	allow-top-navigation allow-top-navigation-by-user-activation allow-same-origin allow-popups"
      />
    </div>
  );
}
