import { StringStream } from '../../utils'
import { TransactionInput } from './components';
import { Transaction } from './Transaction';

export const serializeExclusive: {
  1: (tx: Transaction) => ''
  2: (tx: Transaction) => string
  128: (tx: Transaction) => ''
  192: (tx: Transaction) => string
  209: (tx: Transaction) => string
}

export const deserializeExclusive: {
  1: (stream: StringStream) => {}
  2: (stream: StringStream) => { claims: TransactionInput[] }
  128: (stream: StringStream) => {}
  192: (stream: StringStream) => { multisig_redeem_script: number, validators: string }
  209: (stream: StringStream) => { gas: number, script: string }
}

export const getExclusive: {
  1: (tx: Transaction) => {}
  2: (tx: Transaction) => { claims: TransactionInput[] }
  128: (tx: Transaction) => {}
  192: (tx: Transaction) => { multisig_redeem_script: string, validators: string[] }
  209: (tx: Transaction) => { gas: number, script: string }
}
