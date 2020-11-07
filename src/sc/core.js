import ScriptBuilder from './ScriptBuilder'
import OpCode from './opCode.js'
import { str2hexstring } from '../utils'

/**
 * A wrapper method around ScripBuilder for creating a VM script.
 * @param {object} props - Properties passed in as an object.
 * @param {string} props.scriptHash - The contract scriptHash.
 * @param {string} [props.operation=null] - The method name to call.
 * @param {Array} [props.args=undefined] - The arguments of the method to pass in.
 * @param {boolean} [props.useTailCall=false] - To use Tail Call.
 * @return {string} The VM Script.
 */
export const createScript = (...scriptIntents) => {
  if (scriptIntents.length === 1 && Array.isArray(scriptIntents[0])) {
    scriptIntents = scriptIntents[0]
  }
  const sb = new ScriptBuilder()
  for (var scriptIntent of scriptIntents) {
    if (!scriptIntent.scriptHash) throw new Error('No scriptHash found!')
    const { scriptHash, operation, args, useTailCall } = Object.assign({ operation: null, args: undefined, useTailCall: false }, scriptIntent)

    sb.emitAppCall(scriptHash, operation, args, useTailCall)
  }
  return sb.str
}

/**
 * Generates script for deploying contract
 */
export const generateDeployScript = ({ script, name, version, author, email, description, needsStorage = false, returnType = 'ff00', parameterList = undefined }) => {
  const sb = new ScriptBuilder()
  sb
    .emitPush(str2hexstring(description))
    .emitPush(str2hexstring(email))
    .emitPush(str2hexstring(author))
    .emitPush(str2hexstring(version))
    .emitPush(str2hexstring(name))
    .emitPush(needsStorage)
    .emitPush(returnType)
    .emitPush(parameterList)
    .emitPush(script)
    .emitSysCall('Quras.Contract.Create')
  return sb
}

/**
 * Generate script for adding asset
 */
export const generateAsset = (assetType, assetName, assetAmount, assetPrecision, assetOwner, assetAdmin, assetIssuer, assetAFee, assetTFee, assetTFeeMin, assetTFeeMax, assetFeeAddress) => {
  const sb = new ScriptBuilder()
  sb
    .emitPush(assetFeeAddress)
    .emitPush(assetTFeeMax)
    .emitPush(assetTFeeMin)
    .emitPush(assetTFee)
    .emitPush(assetAFee)
    .emitPush(assetIssuer)
    .emitPush(assetAdmin)
    .emitPush(assetOwner)
    .emitPush(assetPrecision)
    .emitPush(assetAmount)
    .emitPush(str2hexstring(assetName))
    .emitPush(assetType)
    .emitSysCall('Quras.Asset.Create')
  return sb
}

/**
 * Generate script for invoke function
 */
export const generateInvoke = (scripthash, functionName, params) => {
  const sb = new ScriptBuilder()
  sb
    .emitPush(params)
    .emitPush(functionName)
    .emitSysCall(scripthash, 0)
  return sb
}

/**
 * Generate script for MultiSigRedeem
 */
export const generateMultiSig = (m, publickeys) => {
  if (!(m >= 1 && m <= publickeys.length && publickeys.length <= 16)) throw new Error('Redeem Parameters are incorrect')
  const sb = new ScriptBuilder()
  sb.emitPush(m)
  var data = publickeys.slice()
  data = data.sort(function (a, b) { return a.slice(2, a.length).localeCompare(b.slice(2, b.length)) })
  for (var publickey of data) {
    sb.emitPush(publickey)
  }
  sb.emitPush(publickeys.length)
    .emit(OpCode.CHECKMULTISIG)
  return sb
}
