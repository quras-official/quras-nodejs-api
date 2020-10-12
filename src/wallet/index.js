/** @module wallet */

import * as core from './core'
import * as verify from './verify'
import * as qep1 from './qep1'
import * as message from './message'
import Account from './Account'
import Balance from './Balance'
import Wallet from './Wallet'
import Claims from './Claims'
import AssetBalance from './components/AssetBalance'
import Coin from './components/Coin'
import { ClaimItem } from './components/ClaimItem'

export default {
  create: {
    account: (k) => new Account(k),
    privateKey: core.generatePrivateKey,
    signature: core.generateSignature,
    wallet: (k) => new Wallet(k)
  },
  is: {
    address: verify.isAddress,
    publicKey: verify.isPublicKey,
    encryptedKey: verify.isQEP1,
    privateKey: verify.isPrivateKey,
    wif: verify.isQTP1,
    scriptHash: verify.isScriptHash
  },
  encrypt: {
    privateKey: qep1.encrypt
  },
  decrypt: {
    privateKey: qep1.decrypt
  },
  get: {
    privateKeyFromWIF: core.getPrivateKeyFromWIF,
    WIFFromPrivateKey: core.getWIFFromPrivateKey,
    publicKeyFromPrivateKey: core.getPublicKeyFromPrivateKey,
    scriptHashFromPublicKey: core.getScriptHashFromPublicKey,
    addressFromScriptHash: core.getAddressFromScriptHash,
    scriptHashFromAddress: core.getScriptHashFromAddress
  },
  sign: {
    message: message.signMessage
  },
  verify: {
    message: message.verifyMessage
  }
}

export * from './core'
export * from './verify'
export * from './qep1'
export * from './message'
export {
  Account,
  Balance,
  Wallet,
  Claims,
  ClaimItem,
  AssetBalance,
  Coin
}
