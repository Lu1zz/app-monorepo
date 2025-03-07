export interface IMarketCategory {
  categoryId: string;
  coingeckoIds: string[];
  name: string;
  type: string;
  recommendedTokens?: IMarketToken[];
  defaultSelected?: boolean;
  enable: boolean;
  origin: string;
  sequenceId: number;
  status?: string;
  coingeckoUrl?: string;
  customTokens?: IMarketCustomToken[];
}

export interface IMarketCustomToken {
  coingeckoId: string;
  iconUrl: string;
  symbol: string;
  rankIndex?: number;
  name?: string;
}

export interface IMarketToken {
  coingeckoId: string;
  name: string;
  serialNumber: number;
  price: number;
  totalVolume: number;
  marketCap: number;
  symbol: string;
  iconUrl: string;
  image: string;
  priceChangePercentage1H: number;
  priceChangePercentage24H: number;
  priceChangePercentage7D: number;
  sparkline: number[];
  lastUpdated: string;
}

export interface IMarketDetailAthOrAtl {
  time: Date;
  value: number;
}

export interface IMarketPerformance {
  priceChangePercentage1h: number;
  priceChangePercentage24h: number;
  priceChangePercentage7d: number;
  priceChangePercentage14d: number;
  priceChangePercentage30d: number;
  priceChangePercentage1y: number;
}

export interface IMarketDetailPlatform {
  [key: string]: {
    contract_address: string;
    onekeyNetworkId?: string;
    hideContractAddress?: boolean;
    coingeckoNetworkId?: string;
  };
}

export interface IMarketResponsePool {
  data: IMarketDetailPool[];
  contract_address: string;
  onekeyNetworkId?: string | undefined;
}

export interface IMarketDetailStats {
  performance: IMarketPerformance;
  marketCap: number;
  marketCapRank: number;
  volume24h: number;
  low24h: number;
  high24h: number;
  atl: IMarketDetailAthOrAtl;
  ath: IMarketDetailAthOrAtl;
  fdv: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  currentPrice: string;
  lastUpdated: string;
}

export interface IMarketTokenExplorer {
  contractAddress: string;
  url: string;
  name: string;
}

export interface IMarketDetailLinks {
  homePageUrl: string;
  discordUrl: string;
  twitterUrl: string;
  whitepaper: string;
  telegramUrl: string;
}

export interface IMarketDetailTicker {
  base: string;
  target: string;
  market: {
    name: string;
    identifier: string;
    has_trading_incentive: boolean;
  };
  depth_data: {
    '+2%': string;
    '-2%': string;
  } | null;
  last: number;
  last_updated_at: string;
  logo: string;
  volume: number;
  trust_score: string;
  bid_ask_spread_percentage: number;
  trade_url: string;
}

export interface IMarketTokenDetail {
  name: string;
  image: string;
  symbol: string;
  about: string;
  explorers: IMarketTokenExplorer[];
  links: IMarketDetailLinks;
  stats: IMarketDetailStats;
  detailPlatforms: IMarketDetailPlatform;
  tickers?: IMarketDetailTicker[];
}

export type IMarketTokenChart = [number, number][];

export interface IMarketDetailPoolPriceChangePercentage {
  m5: string;
  h1: string;
  h6: string;
  h24: string;
}

export interface IMarketDetailPoolH1 {
  buys: number;
  sells: number;
  buyers: number | null;
  sellers: number | null;
}

export interface IMarketDetailPoolTransactions {
  m5: IMarketDetailPoolH1;
  m15: IMarketDetailPoolH1;
  m30: IMarketDetailPoolH1;
  h1: IMarketDetailPoolH1;
  h24: IMarketDetailPoolH1;
}

export enum EMarketDetailDataType {
  Dex = 'dex',
  Token = 'token',
}

export interface IMarketDetailData {
  id: string;
  type: EMarketDetailDataType;
}
export interface IMarketDetailPoolBaseToken {
  data: IMarketDetailData;
}

export enum EMarketDetailDatumType {
  Pool = 'pool',
}

export interface IMarketDetailPoolRelationships {
  baseToken: IMarketDetailPoolBaseToken;
  quoteToken: IMarketDetailPoolBaseToken;
  dex: IMarketDetailPoolBaseToken;
}

interface IMarketDetailPoolAttributes {
  baseTokenPriceUsd: string;
  baseTokenPriceNativeCurrency: string;
  quoteTokenPriceUsd: string;
  quoteTokenPriceNativeCurrency: string;
  baseTokenPriceQuoteToken: string;
  quoteTokenPriceBaseToken: string;
  address: string;
  name: string;
  poolCreatedAt: Date;
  fdvUsd: string;
  market_cap_usd: null | string;
  priceChangePercentage: IMarketDetailPoolPriceChangePercentage;
  transactions: IMarketDetailPoolTransactions;
  volumeUsd: IMarketDetailPoolPriceChangePercentage;
  reserveInUsd: string;
}

export interface IMarketDetailPool {
  id: string;
  dexLogoUrl: string;
  dexName: string;
  baseTokenImageUrl: string;
  onekeyNetworkId: string;
  quoteTokenImageUrl: string;
  type: EMarketDetailDatumType;
  attributes: IMarketDetailPoolAttributes;
  relationships: IMarketDetailPoolRelationships;
}

export interface IMarketWatchListItem {
  coingeckoId: string;
}

export interface IMarketWatchListData {
  data: IMarketWatchListItem[];
}
