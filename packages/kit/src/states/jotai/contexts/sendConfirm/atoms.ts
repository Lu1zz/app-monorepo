import type { IUnsignedTxPro } from '@onekeyhq/core/src/types';
import type {
  IFeeInfoUnit,
  ISendSelectedFeeInfo,
} from '@onekeyhq/shared/types/fee';
import { EFeeType, ESendFeeStatus } from '@onekeyhq/shared/types/fee';
import type { IDecodedTx } from '@onekeyhq/shared/types/tx';

import { createJotaiContext } from '../../utils/createJotaiContext';

const {
  Provider: ProviderJotaiContextSendConfirm,
  withProvider: withSendConfirmProvider,
  contextAtom,
  contextAtomMethod,
} = createJotaiContext();
export {
  ProviderJotaiContextSendConfirm,
  withSendConfirmProvider,
  contextAtomMethod,
};

export const { atom: unsignedTxsAtom, use: useUnsignedTxsAtom } = contextAtom<
  IUnsignedTxPro[]
>([]);

export const { atom: decodedTxsAtom, use: useDecodedTxsAtom } = contextAtom<
  IDecodedTx[]
>([]);

export const { atom: sendSelectedFeeAtom, use: useSendSelectedFeeAtom } =
  contextAtom<{
    feeType: EFeeType;
    presetIndex: number;
  }>({
    feeType: EFeeType.Standard,
    presetIndex: 0,
  });

export const { atom: customFeeAtom, use: useCustomFeeAtom } = contextAtom<
  IFeeInfoUnit | undefined
>(undefined);

export const {
  atom: sendSelectedFeeInfoAtom,
  use: useSendSelectedFeeInfoAtom,
} = contextAtom<
  | {
      feeInfos: ISendSelectedFeeInfo[];
      total: string;
      totalNative: string;
      totalFiat: string;
      totalNativeForDisplay: string;
      totalFiatForDisplay: string;
    }
  | undefined
>(undefined);

export const { atom: sendFeeStatusAtom, use: useSendFeeStatusAtom } =
  contextAtom<{
    status: ESendFeeStatus;
    errMessage?: string;
  }>({
    status: ESendFeeStatus.Idle,
    errMessage: '',
  });

export const {
  atom: nativeTokenTransferAmountAtom,
  use: useNativeTokenTransferAmountAtom,
} = contextAtom<string>('0');

export const {
  atom: nativeTokenTransferAmountToUpdateAtom,
  use: useNativeTokenTransferAmountToUpdateAtom,
} = contextAtom<{
  isMaxSend: boolean;
  amountToUpdate: string;
}>({
  isMaxSend: false,
  amountToUpdate: '0',
});

export const { atom: nativeTokenInfoAtom, use: useNativeTokenInfoAtom } =
  contextAtom<{
    isLoading: boolean;
    balance: string;
    logoURI: string;
  }>({
    isLoading: false,
    balance: '0',
    logoURI: '',
  });

export const { atom: sendTxStatusAtom, use: useSendTxStatusAtom } =
  contextAtom<{
    isInsufficientNativeBalance?: boolean;
    isSubmitting?: boolean;
  }>({
    isInsufficientNativeBalance: false,
    isSubmitting: false,
  });

export const { atom: preCheckTxStatusAtom, use: usePreCheckTxStatusAtom } =
  contextAtom<{
    errorMessage?: string;
  }>({
    errorMessage: '',
  });

export const { atom: isSinglePresetAtom, use: useIsSinglePresetAtom } =
  contextAtom<boolean>(true);

export const { atom: tokenApproveInfoAtom, use: useTokenApproveInfoAtom } =
  contextAtom<{
    originalAllowance: string;
    originalIsUnlimited: boolean;
  }>({
    originalAllowance: '',
    originalIsUnlimited: false,
  });

export const { atom: txAdvancedSettingsAtom, use: useTxAdvancedSettingsAtom } =
  contextAtom<{
    nonce: string;
    dataChanged: boolean;
  }>({
    nonce: '',
    dataChanged: false,
  });
