export interface scriptParams {
  scriptHash: string,
  operation?: string,
  args?: Array<any> | string | number | boolean,
  useTailCall?: boolean
}

/** A wrapper method around ScripBuilder for creating a VM script. */
export function createScript({ scriptHash, operation, args, useTailCall }: scriptParams): string

interface DeployScriptConfig {
  script: string,
  name: string,
  version: string,
  author: string,
  email: string,
  description: string,
  needsStorage?: boolean,
  returnType?: string,
  paramaterList?: string
}

/** Generates script for deploying contract */
export function generateDeployScript({
  script,
  name,
  version,
  author,
  email,
  description,
  needsStorage,
  returnType,
  paramaterList
}: DeployScriptConfig): string

/** Add asset on blockchain */
export function generateAsset(
  assetType: string,
  assetName: string,
  assetAmount: number,
  assetPrecision: number,
  assetOwner: string,
  assetAdmin: string,
  assetIssuer: string,
  assetAFee : number,
  assetTFee : number,
  assetTFeeMin: number,
  assetTFeeMax : number,
  assetFeeAdress : string
): string

/** generate script for invoking function */
export function generateInvoke(
  scripthash: string,
  functionName: string,
  params: Array<any>
): string

/** generate script for multisig address function */
export function generateMultiSig(
  m: number,
  publickeys: Array<string>
): string