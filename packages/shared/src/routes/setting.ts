export enum EModalSettingRoutes {
  SettingListModal = 'SettingListModal',
  SettingCurrencyModal = 'SettingCurrencyModal',
  SettingClearAppCache = 'SettingClearAppCache',
  SettingAccountDerivationModal = 'SettingAccountDerivationModal',
  SettingSpendUTXOModal = 'SettingSpendUTXOModal',
  SettingCustomRPC = 'SettingCustomRPC',
  SettingCustomTransaction = 'SettingCustomTransaction',
  SettingCustomNetwork = 'SettingCustomNetwork',
  SettingAppAutoLockModal = 'SettingAppAutoLockModal',
  SettingProtectModal = 'SettingProtectModal',
  SettingSignatureRecordModal = 'SettingSignatureRecordModal',
  SettingDevFirmwareUpdateModal = 'SettingDevFirmwareUpdateModal',
  SettingDevV4MigrationModal = 'SettingDevV4MigrationModal',
  SettingExportCustomNetworkConfig = 'SettingExportCustomNetworkConfig',
  SettingNotifications = 'SettingNotifications',
  SettingManageAccountActivity = 'SettingManageAccountActivity',
  SettingAlignPrimaryAccount = 'SettingAlignPrimaryAccount',
}

export type IModalSettingParamList = {
  [EModalSettingRoutes.SettingListModal]: { flag?: string } | undefined;
  [EModalSettingRoutes.SettingCurrencyModal]: undefined;
  [EModalSettingRoutes.SettingClearAppCache]: undefined;
  [EModalSettingRoutes.SettingAccountDerivationModal]: undefined;
  [EModalSettingRoutes.SettingSpendUTXOModal]: undefined;
  [EModalSettingRoutes.SettingCustomRPC]: undefined;
  [EModalSettingRoutes.SettingCustomNetwork]: undefined;
  [EModalSettingRoutes.SettingCustomTransaction]: undefined;
  [EModalSettingRoutes.SettingAppAutoLockModal]: undefined;
  [EModalSettingRoutes.SettingProtectModal]: undefined;
  [EModalSettingRoutes.SettingSignatureRecordModal]: undefined;
  [EModalSettingRoutes.SettingDevFirmwareUpdateModal]: undefined;
  [EModalSettingRoutes.SettingDevV4MigrationModal]: undefined;
  [EModalSettingRoutes.SettingExportCustomNetworkConfig]: undefined;
  [EModalSettingRoutes.SettingNotifications]: undefined;
  [EModalSettingRoutes.SettingManageAccountActivity]: undefined;
  [EModalSettingRoutes.SettingAlignPrimaryAccount]: undefined;
};
