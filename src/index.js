import semanticApi, * as api from './api'
import semanticRpc, * as rpc from './rpc'
import * as CONST from './consts'
import semanticSc, * as sc from './sc'
import semanticTx, * as tx from './transactions'
import semanticWallet, * as wallet from './wallet'
import * as u from './utils'
import semanticSettings, * as settings from './settings'
import * as logging from './logging'

const mods = [semanticSc, semanticTx, semanticWallet, semanticApi, semanticRpc, semanticSettings]

const QurasLib = mods.reduce((quraslib, mod) => {
  Object.keys(mod).map((key) => {
    if (quraslib[key]) Object.assign(quraslib[key], mod[key])
    else quraslib[key] = mod[key]
  })
  return quraslib
}, { CONST, u })

export default QurasLib
export {
  api,
  rpc,
  sc,
  tx,
  wallet,
  u,
  CONST,
  settings,
  logging
}
