import { Account } from "./wallet"

export const ADDR_VERSION = '1f'

export namespace ASSET_ID {
  export const XQC: string
  export const XQG: string
}

export namespace CONTRACTS {
  export const QEP1TOKEN: string
}

export namespace DEFAULT_RPC {
  export const MAIN: string
  export const TEST: string
  export const DEV: string
}

export const DEFAULT_REQ: {
  jsonrpc: string
  method: string
  params: any[]
  id: number
}

export const DEFAULT_SCRYPT: {
  cost: number
  blockSize: number
  parallel: number
  size: number
}

export const ASSET_TYPE: {
  Token: number
  AnonymousToken: number
  TransparentToken: number
  Share: number
}

export const DEFAULT_WALLET: {
  name: string
  version: string,
  scrypt: object
  accounts: Account[]
  extra: any
}

export const DEFAULT_ACCOUNT_CONTRACT: {
  script: string
  parameters: any[]
  deployed: boolean
}

export namespace QURAS_NETWORK {
  export const MAIN: string
  export const TEST: string
  export const DEV: string
}

export const QEP_HEADER: string

export const QEP_FLAG: string

export const RPC_VERSION: string

export namespace TX_VERSION {
  export const CLAIM: number
  export const CONTRACT: number
  export const INVOCATION: number
  export const REGISTERMULTISIGN: number
}

export as namespace CONST

