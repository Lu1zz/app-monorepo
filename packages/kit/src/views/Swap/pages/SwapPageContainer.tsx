import { Page } from '@onekeyhq/components';
import { useDebugComponentRemountLog } from '@onekeyhq/shared/src/utils/debug/debugUtils';
import { EAccountSelectorSceneName } from '@onekeyhq/shared/types';

import { TabPageHeader } from '../../../components/TabPageHeader';

import SwapMainLandWithPageType from './components/SwapMainLand';

const SwapPageContainer = () => {
  useDebugComponentRemountLog({ name: 'SwapPageContainer' });

  return (
    <Page fullPage>
      <TabPageHeader
        sceneName={EAccountSelectorSceneName.swap}
        showHeaderRight={false}
      />
      <Page.Body>
        <SwapMainLandWithPageType />
      </Page.Body>
    </Page>
  );
};
export default SwapPageContainer;
