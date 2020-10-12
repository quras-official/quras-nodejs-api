import { Account } from '../wallet'
import { TX_VERSION, ASSET_ID } from '../consts'
import { createScript, generateMultiSig } from '../sc'
import { Fixed8, str2hexstring, hash160, reverseHex } from '../utils'
import TxAttrUsage from './txAttrUsage'
import * as comp from './components'
import * as core from './core'
import * as exc from './exclusive'
import logger from '../logging'
import { StateDescriptor } from './StateDescriptor'
import { decode } from 'js-base64'

const log = logger('tx')

/**
 * @class Transaction
 * @classdesc
 * Transactions are what you use to interact with the blockchain.
 * A transaction is made up of components found in the component file.
 * Besides those components which are found in every transaction, there are also special data that is unique to each transaction type. These 'exclusive' data can be found in the exclusive file.
 * This class is a wrapper around the various transaction building methods found in this folder.
 * @param {object} tx - A Transaction-like object.
 * @param {number} tx.type - Transaction type. Default is 128 (ContractTransaction).
 * @param {number} tx.version - Transaction version. Default is latest version for ContractTransaction.
 * @param {TransactionAttribute[]} tx.attributes - Transaction Attributes.
 * @param {TransactionInput[]} tx.inputs - Transaction Inputs.
 * @param {TransactionOutput[]} tx.outputs - Transaction Outputs.
 * @param {Witness[]} tx.scripts - Witnesses.
 */
class Transaction {
  constructor (tx = {}) {
    /** @type {number} */
    this.type = tx.type || 128

    /** @type {number} */
    this.version = tx.version || TX_VERSION.CONTRACT

    /** @type {TransactionAttribute[]} */
    this.attributes = tx.attributes || []

    /** @type {TransactionInput[]} */
    this.inputs = tx.inputs || []

    /** @type {TransactionOutput[]} */
    this.outputs = tx.outputs ? tx.outputs.map((tx) => comp.TransactionOutput(tx)) : []

    /** @type {Witness[]} */
    this.scripts = tx.scripts || []
    const exclusive = exc.getExclusive[this.type](tx)
    Object.keys(exclusive).map((k) => {
      this[k] = exclusive[k]
    })

    this.etc = tx.etc || []
  }

  get [Symbol.toStringTag] () {
    return 'Transaction'
  }

  /**
   * Exclusive Data
   * @type {Object}
   */
  get exclusiveData () {
    return exc.getExclusive[this.type](this)
  }

  /**
   * Transaction hash.
   * @type {string}
   */
  get hash () {
    return core.getTransactionHash(this)
  }

  /**
   * Creates a ClaimTransaction with the given parameters.
   * @param {string} publicKeyOrAddress - Public key (Encoded form) or address
   * @param {Object} claimData - Claim Data provided by API
   * @param {Object} [override={}] - Optional overrides (eg. custom version)
   * @return {Transaction} Unsigned Transaction
   */
  static createClaimTx (publicKeyOrAddress, claimData, override = {}) {
    if (claimData.claims.length === 0) throw new Error('Useless transaction! There is no claims!')
    const acct = new Account(publicKeyOrAddress)
    const txConfig = Object.assign({
      type: 2,
      version: TX_VERSION.CLAIM
    }, override)
    let totalClaim = new Fixed8(0)
    let maxClaim = 255
    txConfig.claims = claimData.claims.slice(0, maxClaim).map((c) => {
      totalClaim = totalClaim.add(c.claim)
      return { prevHash: c.txid, prevIndex: c.index }
    })
    txConfig.outputs = [{
      assetId: ASSET_ID.XQG,
      value: totalClaim,
      scriptHash: acct.scriptHash
    }]

    const tx = new Transaction(Object.assign(txConfig, override))
    log.info(`New ClaimTransaction for ${acct.address}`)
    return tx
  }

  /**
   * Creates a createClaimTxWithQurasDB with the given parameters from QurasDB.
   * @param {string} publicKeyOrAddress - Public key (Encoded form) or address
   * @param {Object} claimData - Claim Data provided by API
   * @param {Object} [override={}] - Optional overrides (eg. custom version)
   * @return {Transaction} Unsigned Transaction
   */
  static createClaimTxWithQurasDB (publicKeyOrAddress, claimData, override = {}) {
    if (claimData.references.length === 0) throw new Error('Useless transaction! There is no claims!')
    const acct = new Account(publicKeyOrAddress)
    const txConfig = Object.assign({
      type: 2,
      version: TX_VERSION.CLAIM
    }, override)
    let totalClaim = new Fixed8(claimData.amount)
    let maxClaim = 255
    txConfig.claims = claimData.references.slice(0, maxClaim).map((c) => {
      if (c.txid.substr(0, 2) === '0x') {
        var prevHash = c.txid.substr(2, c.txid.length - 2)
        return { prevHash: prevHash, prevIndex: c.vout }
      } else {
        return { prevHash: c.txid, prevIndex: c.vout }
      }
    })
    txConfig.outputs = [{
      assetId: ASSET_ID.XQG,
      value: totalClaim,
      scriptHash: acct.scriptHash,
      fee: 0
    }]

    const tx = new Transaction(Object.assign(txConfig, override))
    log.info(`New ClaimTransaction for ${acct.address}`)
    return tx
  }

  /**
   * Creates a ContractTransaction with the given parameters.
   * @param {Balance} balances - Current assets available.
   * @param {TransactionOutput[]} intents - All sending intents as TransactionOutputs
   * @param {Object} [override={}] - Optional overrides (eg.custom versions)
   * @param {number|Fixed8} [fees]
   * @return {Transaction} Unsigned Transaction
   */
  static createContractTx (balances, intents, override = {}, fees = 0) {
    if (intents === null) throw new Error('Useless transaction! You are not sending anything!')

    const txConfig = Object.assign({
      type: 128,
      version: TX_VERSION.CONTRACT,
      outputs: intents
    }, override)
    balances = new Transaction(txConfig).rebuildBalance(balances)

    intents.forEach((output) => {
      fees += output.fee
    })

    const tx = new Transaction(txConfig).calculate(balances, null, fees)
    log.info(`New ContractTransaction for ${balances.address}`)
    return tx
  }

  static createIssueTx (balances, intents, override = {}, fees = 0) {
    if (intents === null) throw new Error('Useless transaction! You are not issuing anything!')
    const txConfig = Object.assign({
      type: 1,
      version: TX_VERSION.ISSUE,
      outputs: intents
    }, override)

    balances = new Transaction(txConfig).rebuildBalance(balances)

    const tx = new Transaction(txConfig).calculateIssueInputs(balances, null, fees)
    log.info(`New ContractTransaction for ${balances.address}`)
    return tx
  }

  /**
   * Creates an InvocationTransaction with the given parameters.
   * @param {Balance} balances - Balance of address
   * @param {TransactionOutput[]} intents - Sending intents as transactionOutputs
   * @param {object|string} invoke - Invoke Script as an object or hexstring
   * @param {number} gasCost - Gas to attach for invoking script
   * @param {object} [override={}] - Optional overrides (eg.custom versions)
   * @param {number|Fixed8} [fees]
   * @return {Transaction} Unsigned Transaction
   */
  static createInvocationTx (balances, intents, invoke, gasCost = 0, override = {}, fees = 0) {
    if (intents === null) intents = []
    const txConfig = Object.assign({
      type: 209,
      version: TX_VERSION.INVOCATION,
      outputs: intents,
      script: typeof (invoke) === 'string' ? invoke : createScript(invoke),
      gas: gasCost
    }, override)
    balances = new Transaction(txConfig).rebuildBalance(balances)
    const tx = new Transaction(txConfig).calculate(balances, null, fees)
    log.info(`New InvocationTransaction for ${balances.address}`)
    return tx
  }

  /**
   * Creates an StateTransaction with the given parameters
   * @param {StateDescriptor[]} descriptors
   * @param {object} [override]
   */
  static createStateTx (descriptors, override = {}) {
    const txConfig = Object.assign({
      type: 0x90,
      version: 0,
      descriptors: descriptors.map(d => new StateDescriptor(d))
    }, override)
    const tx = new Transaction(txConfig)
    return tx
  }

  /**
   * Creates an RegisterMultiSignTransaction with the given parameters
   * @param {string} pubkey
   * @param {object} [override]
   */
  static createRegisterMultiSignTx (pubkey, override = {}) {
    const script = generateMultiSig(1, [pubkey])
    const txConfig = Object.assign({
      type: 192,
      version: TX_VERSION.REGISTERMULTISIGN,
      multisig_redeem_script: hash160(script.str),
      validators: [pubkey]
    }, override)
    const tx = new Transaction(txConfig)
    return tx
  }

  /**
   * Join an RegisterMultiSignTransaction with the given parameters
   * @param {Transaction} transaction
   * @param {string} pubkey
   * @param {object} [override]
   */
  static joinMultiSignWallet (transaction, pubkey, override = {}) {
    if (transaction.type !== 192) throw new Error('This transaction is not RegisterMultiSignTransaction!')

    transaction.validators.push(pubkey)
    const script = generateMultiSig(Math.floor(transaction.validators.length / 2) + 1, transaction.validators)
    const txConfig = Object.assign({
      type: 192,
      version: TX_VERSION.REGISTERMULTISIGN,
      multisig_redeem_script: hash160(script.str),
      validators: transaction.validators
    }, override)
    const tx = new Transaction(txConfig)
    return tx
  }

  static getMultiSignScriptHash (transaction) {
    return reverseHex(transaction.multisig_redeem_script)
  }

  /** Get RegisterMultiSignTransaction from raw text
   * @param {string} data
   */
  static getMultiSignWalletTx (data) {
    try {
      data = decode(data)
      var txData = JSON.parse(data)
      const script = txData.multisig_redeem_script
      const validators = txData.validators
      const txConfig = Object.assign({
        type: 192,
        version: TX_VERSION.REGISTERMULTISIGN,
        multisig_redeem_script: script,
        validators: validators
      })
      const tx = new Transaction(txConfig)
      return tx
    } catch (ex) {
      throw new Error('MultiSignWalletTransaction data is not correct!')
    }
  }

  /** Get MultiSignTransaction from raw text
   * @param {string} data
   */
  static getMultiSignTx (data) {
    try {
      data = decode(data)
      var txData = JSON.parse(data)
      const tx = new Transaction(txData)
      return tx
    } catch (ex) {
      throw new Error('MultiSignWalletTransaction data is not correct!')
    }
  }

  /**
   * Deserializes a hexstring into a Transaction object.
   * @param {string} hexstring - Hexstring of the transaction.
   * @return {Transaction}
   */
  static deserialize (hexstring) {
    const txObj = core.deserializeTransaction(hexstring)
    const exclusiveData = exc.getExclusive[txObj.type](txObj)
    return new Transaction(Object.assign(txObj, exclusiveData))
  }

  /**
   * Adds a TransactionOutput. TransactionOutput can be given as a TransactionOutput object or as human-friendly values. This is detected by the number of arguments provided.
   * @param {string|Object} assetSymOrTxOut - The symbol of the asset (eg XQC or XQG) or the TransactionOutput object.
   * @param {number} [value] - The value to send. Required if providing human-friendly values.
   * @param {string} [address] - The address to send to. Required if providing human-friendly values.
   * @return {Transaction} this
   */
  addOutput (assetSymOrTxOut, value, address) {
    if (arguments.length === 3) {
      this.outputs.push(comp.createTransactionOutput(assetSymOrTxOut, value, address))
    } else if (typeof (arguments[0]) === 'object') {
      this.outputs.push(arguments[0])
    } else throw new Error('Invalid input given! Give either 1 or 3 arguments!')
    return this
  }

  /**
   * Add an attribute.
   * @param {number} usage - The usage type. Do refer to txAttrUsage enum values for all available options.
   * @param {string} data - The data as hexstring.
   */
  addAttribute (usage, data) {
    if (typeof data !== 'string') throw new TypeError('data should be formatted as string!')
    this.attributes.push({
      usage,
      data
    })
    return this
  }

  /**
   * Add a remark.
   * @param {string} remark - A remark in ASCII.
   * @return {Transaction} this
   */
  addRemark (remark) {
    const hexRemark = str2hexstring(remark)
    return this.addAttribute(TxAttrUsage.Remark, hexRemark)
  }

  /**
   * Calculate the inputs required based on existing outputs provided. Also takes into account the fees required through the gas property.
   * @param {Balance} balance - Balance to retrieve inputs from.
   * @param {function} strategy
   * @param {number|Fixed8} fees
   * @return {Transaction} this
   */
  calculate (balance, strategy = null, fees = 0) {
    const { inputs, change } = core.calculateInputs(balance, this.outputs, this.gas, strategy, fees)
    this.inputs = inputs
    this.outputs = this.outputs.concat(change)
    balance.applyTx(this)
    log.info(`Calculated the inputs required for Transaction with Balance: ${balance.address}`)
    return this
  }

  /**
   * Calculate the inputs required based on existing outputs provided. Also takes into account the fees required through the gas property.
   * @param {Balance} balance - Balance to retrieve inputs from.
   * @param {function} strategy
   * @param {number|Fixed8} fees
   * @return {Transaction} this
   */
  calculateIssueInputs (balance, strategy = null, fees = 0) {
    const { inputs, change } = core.calculateIssueInputs(balance, this.outputs, this.gas, strategy, fees)
    this.inputs = inputs
    this.outputs = this.outputs.concat(change)
    // balance.applyTx(this)
    // log.info(`Calculated the inputs required for Transaction with Balance: ${balance.address}`)
    return this
  }

  /**
   * Serialize the transaction and return it as a hexstring.
   * @param {boolean} signed  - Whether to serialize the signatures. Signing requires it to be serialized without the signatures.
   * @return {string} Hexstring.
   */
  serialize (signed = true) {
    return core.serializeTransaction(this, signed)
  }

  /**
   * Serializes the exclusive data in this transaction
   * @return {string} hexstring of the exclusive data
   */
  serializeExclusiveData () {
    return exc.serializeExclusive[this.type](this)
  }

  /**
   * Signs a transaction.
   * @param {Account|string} signer - Account, privateKey or WIF
   * @return {Transaction} this
   */
  sign (signer) {
    if (typeof signer === 'string') {
      signer = new Account(signer)
    }
    core.signTransaction(this, signer.privateKey)
    log.info(`Signed Transaction with Account: ${signer.label}`)
    return this
  }

  /** Create a multiSignTx.
   * @param {Account|string} signer - Account, privateKey or WIF
   * @return {Transaction} this
  */
  createMultiSign (pubkeys, signer) {
    if (typeof signer === 'string') {
      signer = new Account(signer)
    }
    core.generateMultiSignTx(pubkeys, this, signer.privateKey)
    log.info(`Signed Transaction with Account: ${signer.label}`)
    return this
  }

  /** Signs a transaction.
   * @param {Account|string} signer - Account, privateKey or WIF
   * @return {Transaction} this
  */
  joinMultiSign (signer) {
    if (typeof signer === 'string') {
      signer = new Account(signer)
    }
    core.addMultiSignTx(this, signer.privateKey)
    log.info(`Signed Transaction with Account: ${signer.label}`)
    return this
  }

  completeMultiSignTx () {
    core.completeMultiSignTx(this)
    log.info(`Completed Transaction.`)
    return this
  }

  /** Check if multisign tx is completed. */
  isCompletedMultiSign () {
    const m = this.scripts[0].verificationScript.slice(0, 2)

    return Object.keys(this.etc).length === (m - 50)
  }

  rebuildBalance (balance) {
    if (balance.mempool === undefined) return balance

    var ret = balance

    for (let asset of balance.mempool) {
      for (let balKey of Object.keys(balance.assets)) {
        var balAsset = balance.assets[balKey]
        if (asset.AssetId.substring(2) === balAsset.assetId) {
          for (var i = 0; i < asset['unconfirmed'].length; i++) {
            var unspent = {
              'index': asset['unconfirmed'][i]['index'],
              'txid': asset['unconfirmed'][i]['txid'].substring(2),
              'value': new Fixed8(asset['unconfirmed'][i]['value'])
            }
            ret.assets[balKey]['unspent'] = ret.assets[balKey]['unspent'].concat(unspent)
          }
          for (let spent of asset.spent) {
            ret.assets[balKey]['unspent'] = ret.assets[balKey]['unspent'].filter(function (entry) { return entry.txid !== spent['PrevHash'].substring(2) })
          }

          break
        }
      }
    }

    return ret
  }
}

export default Transaction
