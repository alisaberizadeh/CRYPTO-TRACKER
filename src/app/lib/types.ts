
export interface ICoin {
  id: number
  name: string
  symbol: string
  slug: string
  num_market_pairs: number
  date_added: string
  tags: string[]
  max_supply?: number
  circulating_supply: number
  total_supply: number
  infinite_supply: boolean
  platform?: Platform
  cmc_rank: number
  self_reported_circulating_supply?: number
  self_reported_market_cap?: number
  tvl_ratio?: number
  last_updated: string
  quote: Quote
}

export interface Platform {
  id: number
  name: string
  symbol: string
  slug: string
  token_address: string
}

export interface Quote {
  USD: Usd
}

export interface Usd {
  price: number
  volume_24h: number
  volume_change_24h: number
  percent_change_1h: number
  percent_change_24h: number
  percent_change_7d: number
  percent_change_30d: number
  percent_change_60d: number
  percent_change_90d: number
  market_cap: number
  market_cap_dominance: number
  fully_diluted_market_cap: number
  tvl?: number
  last_updated: string
}

export interface IInfo {
    id:                               number;
    name:                             string;
    symbol:                           string;
    category:                         string;
    description:                      string;
    slug:                             string;
    logo:                             string;
    subreddit:                        string;
    notice:                           string;
    tags:                             string[];
    "tag-names":                      string[];
    "tag-groups":                     TagGroup[];
    urls:                             Urls;
    platform:                         null;
    date_added:                       Date;
    twitter_username:                 string;
    is_hidden:                        number;
    date_launched:                    Date;
    contract_address:                 any[];
    self_reported_circulating_supply: null;
    self_reported_tags:               null;
    self_reported_market_cap:         null;
    infinite_supply:                  boolean;
}

export enum TagGroup {
    Algorithm = "ALGORITHM",
    Category = "CATEGORY",
    Others = "OTHERS",
    Platform = "PLATFORM",
}

export interface Urls {
    website:       string[];
    twitter:       any[];
    message_board: string[];
    chat:          any[];
    facebook:      any[];
    explorer:      string[];
    reddit:        string[];
    technical_doc: string[];
    source_code:   string[];
    announcement:  any[];
}


export interface ICat {
  id: string
  name: string
  title: string
  description: string
  num_tokens: number
  avg_price_change: number
  market_cap: number
  market_cap_change: number
  volume: number
  volume_change: number
  last_updated: string
}

export interface IInfoCoin {
  id: number
  name: string
  symbol: string
  category: string
  description: string
  slug: string
  logo: string
  subreddit: string
  notice: string
  tags: string[]
  "tag-names": string[]
  "tag-groups": string[]
  urls: Urls
  platform: any
  date_added: string
  twitter_username: string
  is_hidden: number
  date_launched: string
  contract_address: any[]
  self_reported_circulating_supply: any
  self_reported_tags: any
  self_reported_market_cap: any
  infinite_supply: boolean
}

export interface Urls {
  website: string[]
  twitter: any[]
  message_board: string[]
  chat: any[]
  facebook: any[]
  explorer: string[]
  reddit: string[]
  technical_doc: string[]
  source_code: string[]
  announcement: any[]
}

export interface IQuotes {
  id: number
  name: string
  symbol: string
  slug: string
  num_market_pairs: number
  date_added: string
  tags: Tag[]
  max_supply: number
  circulating_supply: number
  total_supply: number
  is_active: number
  infinite_supply: boolean
  platform: any
  cmc_rank: number
  is_fiat: number
  self_reported_circulating_supply: any
  self_reported_market_cap: any
  tvl_ratio: any
  last_updated: string
  quote: Quote
}

export interface Tag {
  slug: string
  name: string
  category: string
}

export interface Quote {
  USD: Usd
}

 