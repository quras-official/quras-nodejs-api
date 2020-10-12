import { num2VarInt, num2hexstring, StringStream, reverseHex, hash256, Fixed8 } from '../utils'
import { Account, AssetBalance, generateSignature, getVerificationScriptFromPublicKey, getPublicKeyFromPrivateKey, getScriptHashFromAddress, isPrivateKey, getScriptHashFromPublicKey, getAddressFromScriptHash, getMultiSignVerificationScriptFromPublicKey } from '../wallet'
import { serializeExclusive, deserializeExclusive } from './exclusive'
import { ASSET_ID } from '../consts'
import * as comp from './components'
import { defaultCalculationStrategy } from '../settings'
import logger from '../logging'
import { encode } from 'js-base64'

const log = logger('tx')

/**
 * Calculate the inputs required given the intents and gasCost. gasCost has to be seperate because it will not be reflected as an TransactionOutput.
 * @param {Balance} balances - Balance of all assets available.
 * @param {TransactionOutput[]} intents - All sending intents
 * @param {number|Fixed8} extraCost - gasCost required for the transaction.
 * @param {function} strategy
 * @param {number|Fixed8} fees
 * @return {object} {inputs: TransactionInput[], change: TransactionOutput[] }
 */
export const calculateInputs = (balances, intents, extraCost = 0, strategy = null, fees = 0) => {
  if (intents === null) intents = []
  if (strategy === null) strategy = defaultCalculationStrategy
  const requiredAssets = intents.reduce((assets, intent) => {
    assets[intent.assetId] ? assets[intent.assetId] = assets[intent.assetId].add(intent.value) : assets[intent.assetId] = intent.value
    return assets
  }, {})

  // Add GAS cost and fees in
  extraCost = new Fixed8(extraCost).add(fees)
  if (extraCost.gt(0)) {
    if (requiredAssets[ASSET_ID.XQG]) {
      requiredAssets[ASSET_ID.XQG] = requiredAssets[ASSET_ID.XQG].add(extraCost)
    } else {
      requiredAssets[ASSET_ID.XQG] = extraCost
    }
  }
  const inputsAndChange = Object.keys(requiredAssets).map((assetId) => {
    const requiredAmt = requiredAssets[assetId]
    const assetSymbol = balances.getSymbol(assetId)
    if (balances.assetSymbols.indexOf(assetSymbol) === -1) throw new Error(`This balance does not contain any ${assetSymbol}!`)
    const assetBalance = balances.assets[assetSymbol]
    if (assetBalance.balance.lt(requiredAmt)) throw new Error(`Insufficient ${balances.getSymbol(assetId)}! Need ${requiredAmt.toString()} but only found ${assetBalance.balance.toString()}`)
    return calculateInputsForAsset(AssetBalance(assetBalance), requiredAmt, assetId, balances.address, strategy)
  })

  const output = inputsAndChange.reduce((prev, curr) => {
    return {
      inputs: prev.inputs.concat(curr.inputs),
      change: prev.change.concat(curr.change)
    }
  }, { inputs: [], change: [] })
  return output
}

/**
 * Calculate the inputs required given the intents and gasCost. gasCost has to be seperate because it will not be reflected as an TransactionOutput.
 * @param {Balance} balances - Balance of all assets available.
 * @param {TransactionOutput[]} intents - All sending intents
 * @param {number|Fixed8} extraCost - gasCost required for the transaction.
 * @param {function} strategy
 * @param {number|Fixed8} fees
 * @return {object} {inputs: TransactionInput[], change: TransactionOutput[] }
 */
export const calculateIssueInputs = (balances, intents, extraCost = 0, strategy = null, fees = 0) => {
  if (intents === null) intents = []
  if (strategy === null) strategy = defaultCalculationStrategy
  const requiredAssets = intents.reduce((assets, intent) => {
    assets[intent.assetId] ? assets[intent.assetId] = assets[intent.assetId].add(intent.value) : assets[intent.assetId] = intent.value
    return assets
  }, {})
  // Add GAS cost and fees in
  extraCost = new Fixed8(extraCost).add(fees)
  if (extraCost.gt(0)) {
    if (requiredAssets[ASSET_ID.XQG]) {
      requiredAssets[ASSET_ID.XQG] = requiredAssets[ASSET_ID.XQG].add(extraCost)
    } else {
      requiredAssets[ASSET_ID.XQG] = extraCost
    }
  }
  const inputsAndChangeAll = Object.keys(requiredAssets).map((assetId) => {
    if (assetId === ASSET_ID.XQG) {
      const requiredAmt = requiredAssets[assetId]
      const assetSymbol = balances.getSymbol(assetId)
      if (balances.assetSymbols.indexOf(assetSymbol) === -1) throw new Error(`This balance does not contain any ${assetSymbol}!`)
      const assetBalance = balances.assets[assetSymbol]
      if (assetBalance.balance.lt(requiredAmt)) throw new Error(`Insufficient ${balances.getSymbol(assetId)}! Need ${requiredAmt.toString()} but only found ${assetBalance.balance.toString()}`)
      return calculateInputsForAsset(AssetBalance(assetBalance), requiredAmt, assetId, balances.address, strategy)
    }
  })
  var inputsAndChange = []
  inputsAndChangeAll.forEach(element => {
    if (element !== undefined) {
      inputsAndChange.push(element)
    }
  })
  const output = inputsAndChange.reduce((prev, curr) => {
    return {
      inputs: prev.inputs.concat(curr.inputs),
      change: prev.change.concat(curr.change)
    }
  }, { inputs: [], change: [] })
  return output
}

const calculateInputsForAsset = (assetBalance, requiredAmt, assetId, address, strategy) => {
  const selectedInputs = strategy(assetBalance, requiredAmt)
  const selectedAmt = selectedInputs.reduce((prev, curr) => prev.add(curr.value), new Fixed8(0))
  const change = []
  // Construct change output
  if (selectedAmt.gt(requiredAmt)) {
    change.push({
      assetId,
      value: selectedAmt.sub(requiredAmt),
      scriptHash: getScriptHashFromAddress(address),
      fee: new Fixed8(0)
    })
  }
  // Format inputs
  const inputs = selectedInputs.map((input) => {
    return { prevHash: input.txid, prevIndex: input.index }
  })
  return { inputs, change }
}

/**
 * Serializes a given transaction object
 * @param {Transaction} tx
 * @param {boolean} signed - If the signatures should be serialized
 * @returns {string} Hexstring of transaction
 */
export const serializeTransaction = (tx, signed = true) => {
  let out = ''
  out += num2hexstring(tx.type)
  out += num2hexstring(tx.version)
  out += serializeExclusive[tx.type](tx)
  out += num2VarInt(tx.attributes.length)
  for (const attribute of tx.attributes) {
    out += comp.serializeTransactionAttribute(attribute)
  }
  out += num2VarInt(tx.inputs.length)
  for (const input of tx.inputs) {
    out += comp.serializeTransactionInput(input)
  }
  out += num2VarInt(tx.outputs.length)
  for (const output of tx.outputs) {
    out += comp.serializeTransactionOutput(output)
  }
  if (signed && tx.scripts && tx.scripts.length > 0) {
    out += num2VarInt(tx.scripts.length)
    for (const script of tx.scripts) {
      out += comp.serializeWitness(script)
    }
  }
  return out
}

/**
 * Deserializes a given string into a Transaction object
 * @param {string} data - Serialized string
 * @returns {Transaction} Transaction object
 */
export const deserializeTransaction = (data) => {
  const ss = new StringStream(data)
  let tx = {}
  tx.type = parseInt(ss.read(1), 16)
  tx.version = parseInt(ss.read(1), 16)
  const exclusiveData = deserializeExclusive[tx.type](ss)
  tx.attributes = []
  tx.inputs = []
  tx.outputs = []
  tx.scripts = []
  const attrLength = ss.readVarInt()
  for (let i = 0; i < attrLength; i++) {
    tx.attributes.push(comp.deserializeTransactionAttribute(ss))
  }
  const inputLength = ss.readVarInt()
  for (let i = 0; i < inputLength; i++) {
    tx.inputs.push(comp.deserializeTransactionInput(ss))
  }
  const outputLength = ss.readVarInt()
  for (let i = 0; i < outputLength; i++) {
    tx.outputs.push(comp.deserializeTransactionOutput(ss))
  }
  if (!ss.isEmpty()) {
    const scriptLength = ss.readVarInt()
    for (let i = 0; i < scriptLength; i++) {
      tx.scripts.push(comp.deserializeWitness(ss))
    }
  }
  return Object.assign(tx, exclusiveData)
}

/**
 * Signs a transaction with the corresponding privateKey. We are dealing with it as an Transaction object as multi-sig transactions require us to sign the transaction without signatures.
 * @param {Transaction} transaction - Transaction as an object
 * @param {string} privateKey - The private key. This method does not check if the private key is valid (aka that the inputs come from the corresponding address)
 * @return {Transaction} Signed transaction as an object.
 */
export const signTransaction = (transaction, privateKey) => {
  if (!isPrivateKey(privateKey)) throw new Error('Key provided does not look like a private key!')
  const acct = new Account(privateKey)
  const invocationScript = '40' + generateSignature(serializeTransaction(transaction, false), privateKey)
  const verificationScript = getVerificationScriptFromPublicKey(getPublicKeyFromPrivateKey(privateKey))
  const witness = { invocationScript, verificationScript }
  transaction.scripts ? transaction.scripts.push(witness) : transaction.scripts = [witness]
  log.info(`Signed tx ${transaction.hash} with Account[${acct.address}]`)
  return transaction
}

/** Create a multisign transaction sign with the corresponding privateKey. We are dealing with it as an Transaction object as multi-sig transactions require us to sign the transaction without signatures.
 * @param {number} m - M in multisigntx
 * @param {Transaction} transaction - Transaction as an object
 * @param {string} privateKey - The private key. This method does not check if the private key is valid (aka that the inputs come from the corresponding address)
 * @return {Transaction} Signed transaction as an object.
*/
export const generateMultiSignTx = (pubkeys, transaction, privateKey) => {
  if (pubkeys.length < 1 && pubkeys.length > 16) return null
  var sortedPubkeys = pubkeys.sort(function (a, b) { return a.slice(2, a.length).localeCompare(b.slice(2, b.length)) })
  const acct = new Account(privateKey)
  var signatures = {}
  signatures[getPublicKeyFromPrivateKey(privateKey)] = '40' + generateSignature(serializeTransaction(transaction, false), privateKey)
  var verificationScript = '5' + num2hexstring(Math.floor(pubkeys.length / 2) + 1).slice(1, 2)
  for (var i = 0; i < sortedPubkeys.length; i++) {
    verificationScript += getMultiSignVerificationScriptFromPublicKey(sortedPubkeys[i])
  }
  const invocationScript = ''
  verificationScript += '5' + num2hexstring(pubkeys.length).slice(1, 2) + 'ae'
  const witness = { invocationScript, verificationScript }
  transaction.scripts ? transaction.scripts.push(witness) : transaction.scripts = [witness]
  transaction.etc = signatures
  log.info(`Signed tx ${transaction.hash} with Account[${acct.address}]`)
  return transaction
}

/** Add sign to a multisign transaction with the corresponding privateKey. We are dealing with it as an Transaction object as multi-sig transactions require us to sign the transaction without signatures.
 * @param {Transaction} transaction - Transaction as an object
 * @param {string} privateKey - The private key. This method does not check if the private key is valid (aka that the inputs come from the corresponding address)
 * @return {Transaction} Signed transaction as an object.
*/
export const addMultiSignTx = (transaction, privateKey) => {
  const acct = new Account(privateKey)
  var signatures = transaction.etc
  signatures[getPublicKeyFromPrivateKey(privateKey)] = '40' + generateSignature(serializeTransaction(transaction, false), privateKey)

  transaction.etc = signatures

  log.info(`Signed tx ${transaction.hash} with Account[${acct.address}]`)
  return transaction
}

/** Complete the multi signs to the transaction.
 * @param {Transaction} transaction - Transaction as an object
 * @return {Transaction} Signed transaction as an object.
*/
export const completeMultiSignTx = (transaction) => {
  var signatures = transaction.etc
  var pubkeys = Object.keys(signatures)
  pubkeys = pubkeys.sort(function (a, b) { return a.slice(2, a.length).localeCompare(b.slice(2, b.length)) })
  var invocationScript = ''
  for (let i = 0; i < pubkeys.length; i++) {
    invocationScript += signatures[pubkeys[i]]
  }

  transaction.scripts[0].invocationScript = invocationScript
  log.info(`Completed tx ${transaction.hash}`)
  return transaction
}

/**
 * @param {Transaction} transaction
 * @return {string}
 */
export const getTransactionHash = (transaction) => {
  return reverseHex(hash256(serializeTransaction(transaction, false)))
}

export const getMultiSignMembers = (transaction) => {
  if (transaction.type !== 192) {
    throw new Error('This transaction is not RegisterMultiSignTransaction!')
  }

  var ret = []
  for (var i = 0; i < transaction.validators.length; i++) {
    ret.push(getAddressFromScriptHash(getScriptHashFromPublicKey(transaction.validators[i])))
  }

  return ret
}

export const getMultiSignWalletTxRawData = (transaction) => {
  if (transaction.type !== 192) throw new Error('This transaction is not RegisterMultiSignWalletTransaction!')
  const ret = {
    multisig_redeem_script: transaction.multisig_redeem_script,
    validator_count: transaction.validators.length,
    validators: transaction.validators
  }
  var jRet = JSON.stringify(ret)
  return encode(jRet)
}

export const getMultiSignTxRawData = (transaction) => {
  var jRet = JSON.stringify(transaction)
  return encode(jRet)
}
