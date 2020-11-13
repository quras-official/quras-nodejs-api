import axios from 'axios'

import { Balance, getPublicKeyFromPrivateKey, getAddressFromScriptHash, getScriptHashFromPublicKey, getScriptHashFromAddress } from '../wallet'
// import { Account, Balance, Claims } from '../wallet'
import { Transaction } from '../transactions'
// import { Transaction, TxAttrUsage } from '../transactions'
import { RPCClient } from '../rpc'
// import { RPCClient, Query } from '../rpc'
import { ASSET_TYPE } from '../consts'
import { Fixed8, reverseHex, int2hex, hexstring2ab, ab2str } from '../utils'
import { networks, httpsOnly, timeout } from '../settings'
import logger from '../logging'
import {raceToSuccess} from './common'
import { generateAsset, generateInvoke, generateDeployScript } from '../sc'
// import {ContractParam, createScript, ScriptBuilder} from '../sc'
// import { BigNumber } from 'bignumber.js'

const log = logger('api')
export const name = 'qurasDB'

var cachedRPC = null
/**
 * API Switch for MainNet and TestNet
 * @param {string} net - 'MainNet', 'TestNet', or custom module-wallet-db URL.
 * @return {string} URL of API endpoint.
 */
export const getAPIEndpoint = net => {
  if (networks[net]) return networks[net].extra.qurasDB
  return net
}

/**
 * Get balances of XQC and XQG for an address
 * @param {string} net - 'MainNet' or 'TestNet'.
 * @param {string} address - Address to check.
 * @return {Promise<Balance>} Balance of address
 */
export const getBalance = (net, address) => {
  const apiEndpoint = getAPIEndpoint(net)

  // var rpcServer = new RPCClient(net)

  // var error_promise = new Promise(function(resolve, reject) {
  //  throw 'Get pending transaction was failed'
  // });

  // rpcServer.getRawMemPool()
  // .then((mem_txs) => {
  //   console.log(mem_txs)
  // })
  // .catch((error) => {
  //   return error_promise;
  // });

  return axios.get(apiEndpoint + '/v1/address/balance/' + address)
    .then((res) => {
      var balance = res.data.data.balance
      const bal = new Balance(balance)
      log.info(`Retrieved Balance for ${address} from modscan ${net}`)

      var rpcServer = new RPCClient(net)
      return rpcServer.getMemPoolCoin(getScriptHashFromAddress(address))
        .then(res => {
          bal['mempool'] = res
          return bal
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((error) => {
      console.log(error)
    })
}

/**
 * Get balances of XQC and XQG for an address
 * @param {string} net - 'MainNet' or 'TestNet'.
 * @param {string} address - Address to check.
 * @return {Promise<Balance>} Balance of address
 */
export const getClaimInfo = (net, address) => {
  const apiEndpoint = getAPIEndpoint(net)

  return axios.get(apiEndpoint + '/v1/addresses/' + address)
    .then(res => {
      var unclaimed = res.data.unclaimed
      return unclaimed
    })
}

/**
 * Get the current height of the light wallet DB
 * @param {string} net - 'MainNet' or 'TestNet'.
 * @return {Promise<number>} Current height.
 */
export const getWalletDBHeight = net => {
  const apiEndpoint = getAPIEndpoint(net)
  return axios.get(apiEndpoint + '/v1/block/height').then(response => {
    return parseInt(response.data.block_height)
  })
}

/**
 * Get transaction history for an account
 * @param {string} net - 'MainNet' or 'TestNet'.
 * @param {string} address - Address to check.
 * @return {Promise<PastTransaction[]>} a list of PastTransaction
 */
export const getTransactionHistory = (net, address) => {
  const apiEndpoint = getAPIEndpoint(net)
  return axios
    .get(apiEndpoint + '/v1/address/history/' + address)
    .then(response => {
      return response.data.data.history.map(rawTx => {
        if (rawTx.status !== undefined) {
          return rawTx
        }
        if (rawTx.tx_type === 'ClaimTransaction') {
          return {
            from: rawTx.claim_transaction_address,
            to: rawTx.claim_transaction_address,
            txType: rawTx.tx_type,
            blockHeight: new Fixed8(rawTx.block_number),
            txid: rawTx.txid,
            asset: 'XQG',
            amount: rawTx.claim_transaction_amount,
            timestamp: rawTx.time,
            fee: 0,
            status: 1
          }
        } else if (rawTx.tx_type === 'ContractTransaction') {
          return {
            from: rawTx.contract_transaction_from,
            to: rawTx.contract_transaction_to,
            txType: rawTx.tx_type,
            blockHeight: new Fixed8(rawTx.block_number),
            txid: rawTx.txid,
            asset: rawTx.name,
            amount: rawTx.contract_transaction_amount,
            timestamp: rawTx.time,
            fee: rawTx.contract_transaction_fee,
            status: 1
          }
        } else if (rawTx.tx_type === 'InvocationTransaction') {
          return {
            from: rawTx.invocation_transaction_address,
            to: '',
            txType: rawTx.tx_type,
            blockHeight: new Fixed8(rawTx.block_number),
            txid: rawTx.txid,
            asset: 'XQG',
            amount: rawTx.gas,
            timestamp: rawTx.time,
            fee: 0,
            status: 1
          }
        } else if (rawTx.tx_type === 'IssueTransaction') {
          return {
            from: rawTx.issue_transaction_address,
            to: rawTx.issue_transaction_to,
            txType: rawTx.tx_type,
            blockHeight: new Fixed8(rawTx.block_number),
            txid: rawTx.txid,
            asset: rawTx.name,
            amount: rawTx.issue_transaction_amount,
            timestamp: rawTx.time,
            fee: rawTx.issue_transaction_fee,
            status: 1
          }
        } else if (rawTx.tx_type === 'MinerTransaction') {
          return {
            from: rawTx.miner_transaction_address,
            to: rawTx.miner_transaction_to,
            txType: rawTx.tx_type,
            blockHeight: new Fixed8(rawTx.block_number),
            txid: rawTx.txid,
            asset: 'XQG',
            amount: rawTx.miner_transaction_amount,
            timestamp: rawTx.time,
            fee: 0,
            status: 1
          }
        } else if (rawTx.tx_type === 'RegisterMultiSignTransaction') {
          return {
            from: address,
            to: rawTx.multisign_address,
            txType: rawTx.tx_type,
            blockHeight: new Fixed8(rawTx.block_number),
            txid: rawTx.txid,
            asset: '',
            amount: '',
            timestamp: '',
            fee: '',
            status: 1
          }
        }
      })
    })
    .catch((error) => {
      console.log(error)
      return []
    })
}

/**
 * Returns an appropriate RPC endpoint retrieved from a ModScan endpoint.
 * @param {string} net - 'MainNet', 'TestNet' or a custom ModScan-like url.
 * @return {Promise<string>} - URL
 */
export const getRPCEndpoint = net => {
  const apiEndpoint = getAPIEndpoint(net)
  return axios.get(apiEndpoint + '/v1/nodes/rpc')
    .then(res => {
      var data = res.data.data.nodes
      let nodes = data.sort((a, b) => b.height - a.height)
      if (httpsOnly) nodes = nodes.filter(n => n.url.includes('https://'))
      if (nodes.length === 0) throw new Error('No eligible nodes found!')
      const heightThreshold = nodes[0].height - 1
      const goodNodes = nodes.filter(n => n.height >= heightThreshold)
      const urls = goodNodes.map(n => n.url)
      if (urls.includes(cachedRPC)) {
        return new RPCClient(cachedRPC).ping().then(num => {
          if (num <= timeout.ping) return cachedRPC
          cachedRPC = null
          return getRPCEndpoint(net)
        })
      }
      const clients = urls.map(u => new RPCClient(u))
      return raceToSuccess(clients.map(c => c.ping().then(_ => c.net)))
    })
    .then(fastestUrl => {
      cachedRPC = fastestUrl
      return fastestUrl
    })
}

/**
 * Returns the asset id.
 * @param {string} net - 'MainNet', 'TestNet' or a custom ModScan-like url.
 * @param {string} fromAddress - The address that publish the asset.
 * @param {string} privKey - Private key that using publish the asset.
 * @param {string} tokenType - Asset type.
 * @param {string} tokenName - Asset name.
 * @param {number} totalSupply - Asset amount.
 * @param {number} precision - Asset precision.
 * @param {string} assetOwner - Asset owner.
 * @param {string} assetAdmin - Asset admin.
 * @param {string} assetIssuer - Asset issuer.
 * @returns {string-Hex} - Asset ID.
 */
export const deployAsset = (net, assetData) => {
  var ownerScriptHash = getScriptHashFromPublicKey(getPublicKeyFromPrivateKey(assetData['priKey']))
  var ownerAddress = getAddressFromScriptHash(ownerScriptHash)
  return getBalance(net, ownerAddress)
    .then((data) => {
      try {
        assetData['tokenType'] = ASSET_TYPE.TransparentToken
        var ownerPubKey = getPublicKeyFromPrivateKey(assetData['priKey'])
        var ownerScriptHash = getScriptHashFromPublicKey(ownerPubKey)
        var adminScriptHash = reverseHex(ownerScriptHash)
        var issuerScriptHash = reverseHex(ownerScriptHash)
        var amount = assetData['totalSupply'] * 100000000 === 0 ? '0000000000000000' : assetData['totalSupply'] * 100000000
        var tfeeMin = assetData['tfeeMin'] * 100000000 === 0 ? '0000000000000000' : assetData['tfeeMin'] * 100000000
        var tfeeMax = assetData['tfeeMax'] * 100000000 === 0 ? '0000000000000000' : assetData['tfeeMax'] * 100000000
        var tfee = '0000000000000000'
        var afee = assetData['afee'] * 100000000 === 0 ? '0000000000000000' : assetData['afee'] * 100000000
        var feeAddressScriptHash = reverseHex(ownerScriptHash)
        var name = '[{"lang":"en-US","name":"' + assetData['tokenName'] + '"}]'
        const balance = new Balance(data)
        const sb = generateAsset(int2hex(assetData['tokenType']), name, amount, assetData['precision'], ownerPubKey, adminScriptHash, issuerScriptHash, afee, tfee, tfeeMin, tfeeMax, feeAddressScriptHash)
        const invocationTx = Transaction.createInvocationTx(balance, null, sb.str, 5000)
        invocationTx.sign(assetData['priKey'])
        var rpcServer = new RPCClient(net)
        return rpcServer.sendRawTransaction(invocationTx.serialize())
          .then((data) => {
            var returnData = {status: data, txHash: invocationTx.hash}
            return returnData
          })
          .catch((error) => {
            throw new Error(error)
          })
      } catch (ex) {
        throw new Error(ex)
      }
    })
    .catch((error) => {
      throw new Error(error)
    })
}

export const deploySmartContract = (net, fromAddress, privKey, script, paramList, returnType, needStorage, name, version, author, email, description, qrg) => {
  return getBalance(net, fromAddress)
    .then((data) => {
      try {
        const balance = new Balance(data)
        const sb = generateDeployScript({
          script: script,
          name: name,
          version: version,
          author: author,
          email: email,
          description: description,
          needsStorage: needStorage,
          returnType: returnType,
          paramaterList: paramList
        })
        const invocationTx = Transaction.createInvocationTx(balance, null, sb.str, qrg)
        invocationTx.sign(privKey)
        var rpcServer = new RPCClient(net)
        return rpcServer.sendRawTransaction(invocationTx.serialize())
          .then((data) => {
            var returnData = {status: data, txHash: invocationTx.hash}
            return returnData
          })
          .catch((error) => {
            throw new Error(error)
          })
      } catch (ex) {
        throw new Error(ex)
      }
    })
    .catch((error) => {
      throw new Error(error)
    })
}

export const getAssetInfo = (net, assetId) => {
  const apiEndpoint = getAPIEndpoint(net)

  return axios.get(apiEndpoint + '/v1/assets/' + '0x' + assetId)
    .then(res => {
      if (res.data.errors === undefined) {
        return res.data
      } else {
        return {
          error: true,
          msg: 'NOT_EXIST_ASSET'
        }
      }
    })
}

export const getMyAssetInfo = (net, address) => {
  const apiEndpoint = getAPIEndpoint(net)

  return axios.get(apiEndpoint + '/v1/address/assets/' + address)
    .then(res => {
      if (res.data.errors === undefined) {
        return res.data
      } else {
        return {
          error: true,
          msg: 'NOT_EXIST_ASSET'
        }
      }
    })
}

export const getMyMultiSignAddresses = (net, address) => {
  const apiEndpoint = getAPIEndpoint(net)

  return axios.get(apiEndpoint + '/v1/address/multi/' + address)
    .then(res => {
      if (res.data.errors === undefined) {
        return res.data
      } else {
        return {
          error: true,
          msg: 'NO_ADDRESSES'
        }
      }
    })
}

export const getMyMultiSignMembers = (net, address) => {
  const apiEndpoint = getAPIEndpoint(net)

  return axios.get(apiEndpoint + '/v1/address/multi/members/' + address)
    .then(res => {
      if (res.data.errors === undefined) {
        return res.data
      } else {
        return {
          error: true,
          msg: 'NO_ADDRESSES'
        }
      }
    })
}

export const getMyMultiSignMemberPubkeys = (net, address) => {
  const apiEndpoint = getAPIEndpoint(net)

  return axios.get(apiEndpoint + '/v1/address/multi/member_pubkeys/' + address)
    .then(res => {
      if (res.data.errors === undefined) {
        return res.data
      } else {
        return {
          error: true,
          msg: 'NO_ADDRESSES'
        }
      }
    })
}

export const isMyMultiSignWallet = (net, multisignAddress, address) => {
  const apiEndpoint = getAPIEndpoint(net)

  return axios.get(apiEndpoint + '/v1/address/multi/members/' + multisignAddress)
    .then(res => {
      if (res.data.errors === undefined) {
        return res.data.includes(address)
      } else {
        return {
          error: true,
          msg: 'NOT_MY_MULTISIGN_ADDRESS'
        }
      }
    })
}

export const getTransaction = (net, txid) => {
  const apiEndpoint = getAPIEndpoint(net)

  return axios.get(apiEndpoint + '/v1/txs/' + txid)
    .then(res => {
      if (res.data.errors === undefined) {
        return res.data
      } else {
        return {
          error: true,
          msg: 'NOT_EXIST_TX'
        }
      }
    })
}

export const getBlock = (net, number) => {
  const apiEndpoint = getAPIEndpoint(net)

  return axios.get(apiEndpoint + '/v1/blocks/' + number)
    .then(res => {
      if (res.data.errors === undefined) {
        return res.data
      } else {
        return {
          error: true,
          msg: 'NOT_EXIST_BLOCK'
        }
      }
    })
}

export const invokeSmartContract = (net, privkey, scripthash, fucntionName, params, address, gas) => {
  return getBalance(net, address)
    .then((data) => {
      const hexHash = ab2str(hexstring2ab(reverseHex(scripthash)))
      const sb = generateInvoke(hexHash, fucntionName, params)
      const balance = new Balance(data)
      const invocationTx = Transaction.createInvocationTx(balance, null, sb.str, 0, null, gas)
      invocationTx.sign(privkey)
      var rpcServer = new RPCClient(net)
      return rpcServer.sendRawTransaction(invocationTx.serialize())
        .then((data) => {
          var returnData = {status: data, txHash: invocationTx.hash}
          return returnData
        })
        .catch((error) => {
          throw new Error(error)
        })
    })
    .catch((error) => {
      throw new Error(error)
    })
}
