import { useEffect, useMemo, useState } from 'react';

import appGlobals from '@onekeyhq/shared/src/appGlobals';
import {
  EAppEventBusNames,
  appEventBus,
} from '@onekeyhq/shared/src/eventBus/appEventBus';
import platformEnv from '@onekeyhq/shared/src/platformEnv';

export function FlipperPluginsContainer() {
  console.log('FlipperPluginsContainer render');
  const [realmReady, setRealmReady] = useState(false);
  useEffect(() => {
    const fn = () => {
      console.log('FlipperPluginsContainer realm ready');
      setRealmReady(true);
    };
    if (appGlobals.$$realm) {
      fn();
    }
    appEventBus.on(EAppEventBusNames.RealmInit, fn);
    return () => {
      appEventBus.off(EAppEventBusNames.RealmInit, fn);
    };
  }, []);
  const realmPlugin = useMemo(() => {
    if (process.env.NODE_ENV !== 'production') {
      if (realmReady && appGlobals.$$realm && platformEnv.isNative) {
        console.log('FlipperPluginsContainer render realm plugin');
        const RealmFlipperPlugin = (
          require('@onekeyhq/shared/src/modules3rdParty/realm-flipper-plugin-device') as typeof import('@onekeyhq/shared/src/modules3rdParty/realm-flipper-plugin-device')
        ).default;
        return <RealmFlipperPlugin realms={[appGlobals.$$realm]} />;
      }
    }
    return null;
  }, [realmReady]);
  return <>{realmPlugin}</>;
}
