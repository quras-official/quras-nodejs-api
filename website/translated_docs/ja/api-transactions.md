---
id: api-transactions
title: Transactions
---

Transactions モジュールは次のように利用できる。

```js
import QurasLib from 'quras-js'
let transaction1 = QurasLib.create.claimTx(...args)
transaction1 = QurasLib.sign.transaction(transaction1, privateKey)
let serialized1 = QurasLib.serialize.tx(transaction1)
let txid1 = QurasLib.get.transactionHash(transaction1)

import { tx } from 'quras-js'
let transaction2 = tx.createClaimTx(...args)
transaction2 = tx.signTransaction(transaction2, privateKey)
let serialized2 = tx.serializeTransaction(transaction2)
let txid2 = tx.getTransactionHash(transaction2)
```

TransactionsモジュールはブロックチェーンのTransaction管理を全部行う。ブロックチェーンの状態を変更するにはトランザクションがconsensusノードによりブロックチェーンに追加する必要がある。
Transactionsモジュールを利用してTransactionを生成することができる。

## クラス

### Transaction クラス

Transactionクラスはtransactionの生成と管理に必要なすべての機能を組み込んでいる。 

```js
import QurasLib from 'quras-js'
// ContractTransationの生成は次のようにする。
let tx = QurasLib.create.tx({type: 128})
// ContractTransactionを利用して1 QRSを他の人に送る例を見ることにしょう。
tx
.addOutput('QRS',1,someAddress)
.addRemark('I am sending 1 QRS to someAddress') // Add an remark
.calculate(balance) // Now we add in the balance we retrieve from an external API and calculate the required inputs.
.sign(privateKey) // Sign with the private key of the balance

const hash = tx.hash // Store the hash so we can use it to query a block explorer.

// Now we can use this serializedTx string and send it through sendrawtransaction RPC call.
const serializedTx = tx.serialize()
```

## 関数

### Components

Transactionは次のような項目が含まれている。

1. Type

  この項目はTransactionの形態を示す。QURASブロックチェーンで様々なTransaction形式が存在するが現在 `quras-js`で提供するTransaction形式は以下の通りである。
  - Contract
  - Claim
  - Invocation
  - AnonymousContract
  
2. Version

  この項目はTransactionのversion情報を示す。ブロックチェーンを更新する時、プロトコルの追加によりversionによってプロトコルが異なることがある。

3. Attribute

  Transactionの追加的な項目としてTransactionの属性情報およびRemarkなどが入る。

4. Input

  この項目はTransactionの入力項目を示す。Transactionによってこの入力項目は 'spent' に状態が変わる。手数料もここに含まれるようになる。

5. Output

  この項目はTransactionの出力を示す。つまりこのTransactionによって 'unspent' 状態のUTXOが生成されることになる。この 'unspent' 出力項目は次のTransactionでinput項目に入る。

6. Witness

  Transactionの署名に関わった項目である。Transaction検証のための署名を示す項目である。つまりinput項目に入った資産のprivatekeyを利用して署名を生成することになる。

7. Exclusive Data (unique to each transaction type)

  すべてのTransactionに対して様々なその他の項目が存在する。実例としてClaimTransactionは ``claims``という項目がもっと存在し,InvocationTransactionは ``script``項目がもっと存在する。

## 手数料

手数料はQRGコインで支払うこととなる。

```js
import {tx} from 'quras-js'

// This attaches a fee of 1 QRG.
tx.Transaction.createContractTx(balances, intents, {}, 1)

// Another way is to attach fees on calculation
var newTx = new tx.Transaction()
newTx.addIntent({})
.calculate(balance, null, 1)

```
