import { num2fixed8, fixed82num, num2VarInt, reverseHex, num2hexstring, str2hexstring, hexstring2str } from '../utils'
import {
  serializeTransactionInput,
  deserializeTransactionInput
} from './components'
import StateDescriptor from './StateDescriptor'

/**
 * @param {StringStream} ss
 * @return {object} {claims: TransactionInput[]}
 */
const deserializeClaimExclusive = ss => {
  let out = {
    claims: []
  }
  const claimLength = ss.readVarInt()
  for (let i = 0; i < claimLength; i++) {
    out.claims.push(deserializeTransactionInput(ss))
  }
  return out
}

/**
 * @param {Transaction} tx - Transaction.
 * @return {string} hexstring
 */
const serializeClaimExclusive = tx => {
  if (tx.type !== 0x02) throw new Error()
  let out = num2VarInt(tx.claims.length)
  for (const claim of tx.claims) {
    out += serializeTransactionInput(claim)
  }
  return out
}

/**
 * @param {Transaction} tx
 * @return {object} {claims: TransactionInput[]}
 */
const getClaimExclusive = tx => {
  return Object.assign({ claims: [] }, { claims: tx.claims })
}

/**
 * @param {StringStream} ss
 * @return {object} {}
 */
const deserializeContractExclusive = ss => {
  return {}
}

/**
 * @param {Transaction} tx - Transaction.
 * @return {string} ''
 */
const serializeContractExclusive = tx => {
  if (tx.type !== 0x80) throw new Error()
  return ''
}

/**
 * @param {Transaction} tx
 * @return {object} {}
 */
const getContractExclusive = tx => {
  return {}
}

/**
 * @param {StringStream} ss
 * @return {object} {}
 */
const deserializeIssueExclusive = ss => {
  return {}
}

/**
 * @param {Transaction} tx - Transaction.
 * @return {string} ''
 */
const serializeIssueExclusive = tx => {
  if (tx.type !== 1) throw new Error()
  return ''
}

/**
 * @param {Transaction} tx
 * @return {object} {}
 */
const getIssueExclusive = tx => {
  return {}
}

/**
 * @param {StringStream} ss
 * @return {object} {script: string, gas: number}
 */
const deserializeInvocationExclusive = ss => {
  const script = ss.readVarBytes()
  const version = parseInt(ss.str.substr(2, 2), 16)
  const gas = version >= 1 ? fixed82num(ss.read(8)) : 0
  return { script, gas }
}

/**
 * @param {Transaction} tx
 * @return {string}
 */
const serializeInvocationExclusive = tx => {
  if (tx.type !== 0xd1) throw new Error()
  let out = num2VarInt(tx.script.length / 2)
  out += tx.script
  if (tx.version >= 1) out += num2fixed8(tx.gas)
  return out
}

const getInvocationExclusive = tx => {
  return { script: tx.script || '', gas: tx.gas || 0 }
}

const deserializeStateExclusive = ss => {
  let out = {
    descriptors: []
  }
  const descLength = ss.readVarInt()
  for (let i = 0; i < descLength; i++) {
    out.descriptors.push(StateDescriptor.deserialize(ss))
  }
  return out
}

const serializeStateExclusive = tx => {
  if (tx.type !== 0x90) throw new Error()
  let out = num2VarInt(tx.descriptors.length)
  for (const desc of tx.descriptors) {
    if (desc instanceof StateDescriptor) {
      out += desc.serialize()
    } else {
      out += new StateDescriptor(desc).serialize()
    }
  }
  return out
}

const getStateExclusive = tx => {
  return { descriptors: tx.descriptors || [] }
}

const getMultiSignWalletExclusive = tx => {
  return { multisig_redeem_script: tx.multisig_redeem_script || '', validators: tx.validators || [] }
}

const serializeMultiSignWalletExclusive = tx => {
  if (tx.type !== 192) throw new Error()
  let out = tx.multisig_redeem_script
  out += reverseHex(num2hexstring(tx.validators.length, 4))
  for (const validator of tx.validators) {
    out += num2VarInt(validator.length)
    out += str2hexstring(validator)
  }
  return out
}

const deserializeMultiSignWalletExclusive = ss => {
  let out = {
    multisig_redeem_script: '',
    validators: []
  }
  out.multisig_redeem_script = ss.read(20)
  const validatorLength = parseInt(reverseHex(ss.read(4)), 16)
  for (let i = 0; i < validatorLength; i++) {
    ss.read(1)
    out.validators.push(hexstring2str(ss.read(66)))
  }
  return out
}

export const serializeExclusive = {
  1: serializeIssueExclusive,
  2: serializeClaimExclusive,
  128: serializeContractExclusive,
  144: serializeStateExclusive,
  192: serializeMultiSignWalletExclusive,
  209: serializeInvocationExclusive
}

export const deserializeExclusive = {
  1: deserializeIssueExclusive,
  2: deserializeClaimExclusive,
  128: deserializeContractExclusive,
  144: deserializeStateExclusive,
  192: deserializeMultiSignWalletExclusive,
  209: deserializeInvocationExclusive
}

export const getExclusive = {
  1: getIssueExclusive,
  2: getClaimExclusive,
  128: getContractExclusive,
  144: getStateExclusive,
  192: getMultiSignWalletExclusive,
  209: getInvocationExclusive
}
