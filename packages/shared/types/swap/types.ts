import type { IKeyOfIcons } from '@onekeyhq/components';
import type { useSwapAddressInfo } from '@onekeyhq/kit/src/views/Swap/hooks/useSwapAccount';
import type { IDBWalletId } from '@onekeyhq/kit-bg/src/dbs/local/types';
import type { IAccountDeriveTypes } from '@onekeyhq/kit-bg/src/vaults/types';
import type {
  IEventSourceCloseEvent,
  IEventSourceDoneEvent,
  IEventSourceErrorEvent,
  IEventSourceExceptionEvent,
  IEventSourceMessageEvent,
  IEventSourceOpenEvent,
  IEventSourceTimeoutEvent,
} from '@onekeyhq/shared/src/eventSource';

import type { IDecodedTxActionTokenApprove } from '../tx';

export enum EProtocolOfExchange {
  SWAP = 'Swap', // swap and bridge
  LIMIT = 'Limit', // TODO
}

export enum ESwapTabSwitchType {
  SWAP = 'swap',
  BRIDGE = 'bridge',
  LIMIT = 'limit',
}

export enum ESwapDirectionType {
  FROM = 'from',
  TO = 'to',
}

export enum ESwapRateDifferenceUnit {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  DEFAULT = 'default',
}

export enum ETokenRiskLevel {
  UNKNOWN = 0,
  BENIGN = 1,
  WARNING = 2,
  SPAM = 1000,
  MALICIOUS = 1001,
  SCAM = 1002,
}

export interface ISwapInitParams {
  importFromToken?: ISwapToken;
  importToToken?: ISwapToken;
  importNetworkId?: string;
  swapTabSwitchType?: ESwapTabSwitchType;
}

// token & network

export interface ISwapNetworkBase {
  networkId: string;
  defaultSelectToken?: { from?: string; to?: string };
  supportCrossChainSwap?: boolean;
  supportSingleSwap?: boolean;
}

export interface ISwapNetwork extends ISwapNetworkBase {
  name: string;
  symbol: string;
  shortcode?: string;
  logoURI?: string;
  isAllNetworks?: boolean;
}

export interface ISwapTokenBase {
  networkId: string;
  contractAddress: string;
  isNative?: boolean;
  symbol: string;
  decimals: number;
  name?: string;
  logoURI?: string;
}

export interface ISwapToken extends ISwapTokenBase {
  balanceParsed?: string;
  price?: string;
  fiatValue?: string;

  accountAddress?: string;
  networkLogoURI?: string;

  riskLevel?: ETokenRiskLevel;
  reservationValue?: string;

  isPopular?: boolean;
}

export interface ISwapTokenCatch {
  data: ISwapToken[];
  updatedAt: number;
}

interface IFetchSwapQuoteBaseParams {
  fromNetworkId: string;
  toNetworkId: string;
  fromTokenAddress: string;
  toTokenAddress: string;
  fromTokenAmount: string;
  protocol: string;
}

export interface IFetchTokensParams {
  networkId?: string;
  keywords?: string;
  limit?: number;
  accountAddress?: string;
  accountNetworkId?: string;
  accountId?: string;
  onlyAccountTokens?: boolean;
  isAllNetworkFetchAccountTokens?: boolean;
}

export interface IFetchTokenListParams {
  protocol: string;
  networkId?: string;
  accountAddress?: string;
  accountNetworkId?: string;
  accountXpub?: string;
  withCheckInscription?: boolean;
  limit?: number;
  keywords?: string;
  skipReservationValue?: boolean;
  onlyAccountTokens?: boolean;
}

export interface IFetchTokenDetailParams {
  protocol: string;
  networkId: string;
  accountAddress?: string;
  contractAddress: string;
  accountNetworkId?: string;
  xpub?: string;
  withCheckInscription?: boolean;
}

export interface ISwapAutoSlippageSuggestedValue {
  value: number;
  from: string;
  to: string;
}

// quote

export type ISwapQuoteEvent =
  | IEventSourceErrorEvent
  | IEventSourceTimeoutEvent
  | IEventSourceExceptionEvent
  | IEventSourceDoneEvent
  | IEventSourceMessageEvent
  | IEventSourceCloseEvent
  | IEventSourceOpenEvent;

export enum ESwapApproveTransactionStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  CANCEL = 'cancel',
  FAILED = 'failed',
}
export interface ISwapApproveTransaction {
  fromToken: ISwapToken;
  toToken: ISwapToken;
  provider: string;
  useAddress: string;
  spenderAddress: string;
  amount: string;
  status: ESwapApproveTransactionStatus;
  resetApproveValue?: string;
  resetApproveIsMax?: boolean;
  txId?: string;
  blockNumber?: number;
}
export interface IFetchQuotesParams extends IFetchSwapQuoteBaseParams {
  userAddress?: string;
  receivingAddress?: string;
  slippagePercentage: number;
  autoSlippage?: boolean;
  blockNumber?: number;
}
interface ISocketAsset {
  address: string;
  chainId: number;
  decimals: number;
  icon: string;
  logoURI: string;
  name: string;
  symbol: string;
}
interface ISocketRewardData {
  amount: string;
  amountInUsd: number;
  asset: ISocketAsset;
  chainId: number;
}
export interface ISocketExtraData {
  rewards: ISocketRewardData[];
}
interface IQuoteExtraData {
  socketBridgeExtraData?: ISocketExtraData;
}

export interface IQuoteRouteDataInfo {
  name: string;
  part?: number;
  logo?: string;
}

export interface IQuoteRoutePath {
  amount?: string;
  part?: number;
  subRoutes?: IQuoteRouteDataInfo[][];
}

export interface ISwapTokenMetadata {
  buyToken: {
    buyTaxBps: string;
    sellTaxBps: string;
  };
  sellToken: {
    buyTaxBps: string;
    sellTaxBps: string;
  };
}

export interface IQuoteTip {
  icon?: string;
  title?: string;
  detail?: string;
  link?: string;
}

export interface IFetchQuoteResult {
  quoteId?: string;
  eventId?: string;
  info: IFetchQuoteInfo;
  errorMessage?: string;
  fromAmount?: string;
  toAmount?: string; // quote is after protocolFees, build_tx is after protocolFees + oneKeyFee
  fee?: IFetchQuoteFee;
  instantRate?: string;
  allowanceResult?: IAllowanceResult;
  estimatedTime?: string;
  isBest?: boolean;
  receivedBest?: boolean;
  minGasCost?: boolean;
  limit?: IFetchQuoteLimit;
  isWrapped?: boolean;
  unSupportReceiveAddressDifferent?: boolean;
  routesData?: IQuoteRoutePath[];
  quoteExtraData?: IQuoteExtraData;
  autoSuggestedSlippage?: number;
  unSupportSlippage?: boolean;
  fromTokenInfo: ISwapTokenBase;
  toTokenInfo: ISwapTokenBase;
  quoteResultCtx?: any;
  protocolNoRouterInfo?: string;
  supportUrl?: string;
  isAntiMEV?: boolean;
  tokenMetadata?: ISwapTokenMetadata;
  quoteShowTip?: IQuoteTip;
  gasLimit?: number;
}

export interface IAllowanceResult {
  allowanceTarget: string;
  amount: string;
  shouldResetApprove?: boolean;
}

export interface IFetchQuoteInfo {
  provider: string;
  providerName: string;
  providerLogo?: string;
}
export interface IFetchQuoteLimit {
  max?: string;
  min?: string;
}
export interface IQuoteResultFeeOtherFeeInfo {
  token: {
    networkId: string;
    contractAddress: string;
    symbol: string;
    price: string;
    decimals: number;
    logoURI?: string;
    name?: string;
    isNative?: boolean;
  };
  amount: string;
}
export interface IFetchQuoteFee {
  percentageFee: number; // oneKey fee percentage
  protocolFees?: number;
  estimatedFeeFiatValue?: number;
  otherFeeInfos?: IQuoteResultFeeOtherFeeInfo[];
}

export enum ESwapApproveAllowanceType {
  UN_LIMIT = 'unLimit',
  PRECISION = 'precision',
}

export enum ESwapFetchCancelCause {
  SWAP_TOKENS_CANCEL = 'SWAP_TOKENS_CANCEL',
  SWAP_QUOTE_CANCEL = 'SWAP_QUOTE_CANCEL',
}

// swap action&alert state
export interface ISwapState {
  label: string;
  isLoading: boolean;
  isWrapped?: boolean;
  isApprove?: boolean;
  disabled: boolean;
  isCrossChain: boolean;
  shoutResetApprove?: boolean;
  approveUnLimit?: boolean;
  isRefreshQuote?: boolean;
}

export interface ISwapCheckWarningDef {
  swapFromAddressInfo: ReturnType<typeof useSwapAddressInfo>;
  swapToAddressInfo: ReturnType<typeof useSwapAddressInfo>;
}

export enum ESwapAlertLevel {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

export enum ESwapAlertActionType {
  CREATE_ADDRESS = 'create_address',
  TOKEN_DETAIL_FETCHING = 'token_detail_fetching',
}

export interface ISwapAlertActionData {
  num?: number;
  key?: string;
  account?: {
    walletId: IDBWalletId | undefined;
    networkId: string | undefined;
    indexedAccountId: string | undefined;
    deriveType: IAccountDeriveTypes;
  };
}
export interface ISwapAlertState {
  title?: string;
  icon?: IKeyOfIcons;
  message?: string;
  alertLevel?: ESwapAlertLevel;
  inputShowError?: boolean;
  action?: {
    actionType: ESwapAlertActionType;
    actionLabel?: string;
    actionData?: ISwapAlertActionData;
  };
}

export interface ISwapQuoteEventAutoSlippage {
  autoSuggestedSlippage: number;
  fromNetworkId: string;
  toNetworkId: string;
  fromTokenAddress: string;
  toTokenAddress: string;
  eventId: string;
}

export interface ISwapQuoteEventQuoteResult {
  data: IFetchQuoteResult[];
}

export interface ISwapQuoteEventInfo {
  totalQuoteCount: number;
  eventId: string;
}

export type ISwapQuoteEventData =
  | ISwapQuoteEventAutoSlippage
  | ISwapQuoteEventQuoteResult
  | ISwapQuoteEventInfo;

// build_tx
export interface IFetchBuildTxParams extends IFetchSwapQuoteBaseParams {
  userAddress: string;
  receivingAddress: string;
  slippagePercentage: number;
  toTokenAmount: string;
  provider: string;
  quoteResultCtx?: any;
}
export interface IFetchBuildTxResult extends IFetchQuoteResult {
  arrivalTime?: number;
}

export interface IThorSwapCallData {
  hasStreamingSwap?: boolean;
  depositWithExpiry: string;
  vault: string;
  asset: string;
  amount: string;
  memo: string;
  memoStreamingSwap: string;
  expiration: string;
  fromAsset: string;
  amountIn: string;
}
export interface IOKXTransactionObject {
  data: string;
  from: string;
  gas?: string;
  gasLimit?: string;
  gasPrice: string;
  minReceiveAmount: string;
  to: string;
  value: string;
  maxPriorityFeePerGas: string;
  randomKeyAccount?: string[];
  signatureData?: string[];
}
export interface IFetchBuildTxResponse {
  result: IFetchBuildTxResult;
  tx?: ITransaction;
  thorSwapCallData?: IThorSwapCallData;
  swftOrder?: IFetchBuildTxOrderResponse;
  changellyOrder?: IFetchBuildTxChangellyOrderResponse;
  OKXTxObject?: IOKXTransactionObject;
  ctx?: any;
  socketBridgeScanUrl?: string;
  orderId?: string;
}

export interface ISwapInfoSide {
  amount: string;
  token: ISwapToken;
  accountInfo: {
    accountId?: string;
    networkId: string;
  };
}
export interface ISwapTxInfo {
  sender: ISwapInfoSide;
  receiver: ISwapInfoSide;
  accountAddress: string;
  receivingAddress: string;
  swapBuildResData: IFetchBuildTxResponse;
  swapRequiredApproves?: IDecodedTxActionTokenApprove[];
}

export interface IEVMTransaction {
  to: string;
  value: string;
  data: string;
}

export type ITransaction = IEVMTransaction | string;

export interface IFetchBuildTxOrderResponse {
  platformAddr: string;
  depositCoinAmt: string;
  depositCoinCode: string;
  orderId: string;
  memo?: string;
}
export interface IFetchBuildTxChangellyOrderResponse {
  payinAddress: string;
  amountExpectedFrom: string;
  orderId: string;
  payinExtraId?: string;
}

export interface IFetchResponse<T> {
  code: number;
  data: T;
  message: string;
}

// tx history

export enum ESwapTxHistoryStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
  PENDING = 'pending',
  CANCELED = 'canceled',
  CANCELING = 'canceling',
}

export interface IFetchSwapTxHistoryStatusResponse {
  state: ESwapTxHistoryStatus;
  crossChainReceiveTxHash?: string;
  gasFee?: string;
  gasFeeFiatValue?: string;
  timestamp?: number;
  dealReceiveAmount?: string;
  blockNumber?: number;
}

export interface ISwapCheckSupportResponse {
  contractAddress: string;
  isSupportCrossChain: boolean;
  isSupportSwap: boolean;
  networkId: string;
}

export interface ISwapTxHistory {
  status: ESwapTxHistoryStatus;
  ctx?: any;
  currency?: string;
  accountInfo: {
    sender: {
      accountId?: string;
      networkId: string;
    };
    receiver: {
      accountId?: string;
      networkId: string;
    };
  };
  baseInfo: {
    fromToken: ISwapToken;
    toToken: ISwapToken;
    fromAmount: string;
    toAmount: string;
    fromNetwork?: ISwapNetwork;
    toNetwork?: ISwapNetwork;
  };
  txInfo: {
    txId: string;
    orderId?: string; // swft orderId
    sender: string;
    receiver: string;
    gasFeeInNative?: string;
    gasFeeFiatValue?: string;
    receiverTransactionId?: string;
  };
  swapInfo: {
    provider: IFetchQuoteInfo;
    socketBridgeScanUrl?: string;
    instantRate: string;
    protocolFee?: number;
    oneKeyFee?: number;
    otherFeeInfos?: IQuoteResultFeeOtherFeeInfo[];
    orderId?: string;
    supportUrl?: string;
  };
  date: {
    created: number;
    updated: number;
  };
}

// component -----------------

export interface ISwapSlippageSegmentItem {
  key: ESwapSlippageSegmentKey;
  value: number;
}

export enum ESwapSlippageSegmentKey {
  AUTO = 'Auto',
  CUSTOM = 'Custom',
}

export enum ESwapSlippageCustomStatus {
  NORMAL = 'normal',
  ERROR = 'error',
  WRONG = 'wrong',
}

export const SwapBuildUseMultiplePopoversNetworkIds = ['tron--0x2b6653dc'];
