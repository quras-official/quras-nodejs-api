import { Fixed8 } from '../../utils';
import { Balance } from '../../wallet'
import { Transaction } from './Transaction';
import {
  TransactionInput,
  TransactionAttribute,
  TransactionOutput,
  Witness,
} from './components';

/** Calculate the inputs required given the intents and gasCost. gasCost has to be seperate because it will not be reflected as an TransactionOutput. */
export function calculateInputs(balances: Balance, intents: TransactionOutput[], gasCost?: number): { inputs: TransactionInput[], change: TransactionOutput[] }

/** Calculate the inputs required given the intents and gasCost. gasCost has to be seperate because it will not be reflected as an TransactionOutput. */
export function calculateIssueInputs(balances: Balance, intents: TransactionOutput[], gasCost?: number): { inputs: TransactionInput[], change: TransactionOutput[] }

/** Serializes a given transaction object */
export function serializeTransaction(tx: Transaction, signed?: boolean): string

/** Deserializes a given string into a Transaction object */
export function deserializeTransaction(data: string): Transaction

/** Signs a transaction with the corresponding privateKey. We are dealing with it as an Transaction object as multi-sig transactions require us to sign the transaction without signatures. */
export function signTransaction(transaction: Transaction, privateKey: string): Transaction

/** Create a multisign transaction sign with the corresponding privateKey. We are dealing with it as an Transaction object as multi-sig transactions require us to sign the transaction without signatures. */
export function generateMultiSignTx(pubkeys: string[], transaction: Transaction, privateKey: string): Transaction

/** Add sign to a multisign transaction with the corresponding privateKey. We are dealing with it as an Transaction object as multi-sig transactions require us to sign the transaction without signatures. */
export function addMultiSignTx(transaction: Transaction, privateKey: string): Transaction

/** Complete multi signs to the transaction. */
export function completeMultiSignTx(transaction: Transaction): Transaction

/** Get hash value of a transaction */
export function getTransactionHash(transaction: Transaction): string

/** Get member list of a multisignwallet transaction */
export function getMultiSignMembers(transaction: Transaction): string[]

/** Get raw data of RegisterMultiSignTransaction. */
export function getMultiSignWalletTxRawData(transaction: Transaction): string

/** Get raw data of MultiSignTransaction */
export function getMultiSignTxRawData(transaction: Transaction): string
