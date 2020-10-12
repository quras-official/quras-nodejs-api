import * as cmc from './coinmarketcap'
import * as nep5 from './nep5'
import * as qurasDB from './qurasDB'
import * as core from './core'
/**
 * @typedef {object} History
 * @property {string} address - Address.
 * @property {string} name - API name.
 * @property {string} net - 'MainNet' or 'TestNet'
 * @property {PastTx[]} history - List of past transactions.
 */

/**
 * @typedef {object} PastTx
 * @property {number} XQG - XQG involved.
 * @property {number} XQC - XQC involved.
 * @property {number} block_index - Block index.
 * @property {boolean} xqg_sent - Was XQG sent.
 * @property {boolean} xqc_sent - Was XQC sent.
 * @property {string} txid - Transaction ID.
 */

export default {
  get: {
    price: cmc.getPrice,
    prices: cmc.getPrices,
    balance: qurasDB.getBalance,
    // claims: qurasDB.getClaims,
    transactionHistory: qurasDB.getTransactionHistory,
    tokenBalance: nep5.getTokenBalance,
    tokenBalances: nep5.getTokenBalances,
    tokenInfo: nep5.getTokenInfo,
    token: nep5.getToken
  },
  do: {
    // sendAsset: qurasDB.doSendAsset,
    // claimAllGas: qurasDB.doClaimAllGas,
    // mintTokens: qurasDB.doMintTokens
  },
  sendAsset: (config) => core.sendAsset(config),
  claimXQG: (config) => core.claimXQG(config),
  doInvoke: (config) => core.doInvoke(config),
  setupVote: (config) => core.setupVote(config)
}

export * from './core'
export * from './switch'
export { qurasDB, cmc, nep5 }
