export const ADDR_VERSION = '1f'

export const ASSET_ID = {
  XQC: '0fedd05e342c9689692eeaa5bead9f6f90eb576d268e413773f32388eb299bd4',
  XQG: 'a492594001b377cd262b7af82e3a66dc8b4686ca80b5343da454eac0233549a8'
}

export const CONTRACTS = {
  QEP1TOKEN: 'ecc6b20d3ccac1ee9ef109af5a7cdb85706b1df9'
}

export const DEFAULT_RPC = {
  MAIN: 'https://rpc.quras.io',
  TEST: 'http://13.230.62.42:10030',
  DEV: 'http://13.250.19.208:10030'
}

export const DEFAULT_REQ = { jsonrpc: '2.0', method: 'getblockcount', params: [], id: 1234 }

export const ASSET_TYPE = {
  Token: 96,
  AnonymousToken: 97,
  TransparentToken: 98,
  Share: 144
}

export const DEFAULT_SCRYPT = {
  cost: 16384,
  blockSize: 8,
  parallel: 8,
  size: 64
}

export const DEFAULT_SYSFEE = {
  enrollmentTransaction: 1000,
  issueTransaction: 500,
  publishTransaction: 500,
  registerTransaction: 10000
}

export const DEFAULT_WALLET = {
  name: 'myWallet',
  version: '1.0',
  scrypt: {},
  accounts: [],
  extra: null
}

export const DEFAULT_ACCOUNT_CONTRACT = {
  'script': '',
  'parameters': [
    {
      'name': 'signature',
      'type': 'Signature'
    }
  ],
  'deployed': false
}

export const QURAS_NETWORK = {
  MAIN: 'MainNet',
  TEST: 'TestNet',
  DEV: 'DevNet'
}

// specified by QEP1, same as bip38
export const QEP_HEADER = '0002'

export const QEP_FLAG = '19'

export const RPC_VERSION = '2.3.2'

export const TX_VERSION = {
  'CLAIM': 0,
  'CONTRACT': 0,
  'INVOCATION': 1,
  'ISSUE': 1,
  'REGISTERMULTISIGN': 1
}
