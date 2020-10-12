---
id: api-api
title: API
---

`api` モジュールは下記のように利用される。

```js
import QurasLib from 'quras-js'
QurasLib.get.balance('TestNet', address)
QurasLib.get.tokenBalance(contractScriptHash)

import { api } from 'quras-js'
api.qurasDB.getBalance('TestNet', address)
api.cmc.getPrice()
api.sendAsset(config)
```

The `api`モジュールはQurasLibを通じて様々なAPIを提供する。QurasLib をリ用いてユーザはQurasDBサーバと連動してQURAS ブロックチェーンのTransaction生成のような色々な機能を利用することができる。

ここでQurasDBはQURASブロックチェーンのFullNodeと連結されている一種のサーバである。

## Core

`core` モジュールでは今後追加される他のFullNodeにおいて実装しなければならない基本関数のInterfaceを具現している。

`core` モジュールは下記の3つの基本関数を提供している。

1. `claimGas` - 具現されない
2. `sendAsset` - 具現されている
3. `doInvoke` - 具現されている

```js
import QurasLib from 'quras-js'
const config = {
  net: 'TestNet'
  address: 'ALq7AWrhAueN6mJNqk6FHJjnsEoPRytLdW',
  privateKey: '7d128a6d096f0c14c3a25a2b0c41cf79661bfcb4a8cc95aaaea28bde4d732344'
}
QurasLib.api.claimGas(config)
.then((conf) => {
  console.log(conf.response)
})

import {api} from 'quras-js'
api.claimGas(config)
.then((conf) => {
  console.log(conf.response)
})
```

これらの関数は `quras-js` で提供するcoreの基本関数である。今後`quras-js`にqurasDB以外に他のFullNodeを継続して追加する予定であり,開発者は様々なFullNodeをこのCoreモジュールのInterfaceを利用して簡単に使用することができる。

## QurasDB

The `qurasDB` API is exposed as:

```js
import QurasLib from 'quras-js'
QurasLib.get.balance('TestNet', address)

import {api} from 'quras-js'
api.qurasDB.getBalance('TestNet', address)
```

The quasDB API describes the API set exposed by [quras-wallet-db](https://bitbucket.org/qurasblockchain) as well as other convenient methods. The node is hosted by Quras Dev.

The API returns useful information that is not built into standard QURAS nodes such as claimable transactions or spendable coins. These information are used to construct transactions.

For example, the `getBalance` method returns a list of spendable assets of a specific address. This is then used to construct a ContractTransaction.

## CoinMarketCap

A straightforward call to CoinMarketCap API to retrieve the latest price information. This is exposed as `cmc` within `api`.

```js
import QurasLib from 'quras-js'
QurasLib.get.price('QRS', 'EUR')
QurasLib.get.price('QRG') // defaults to USD
QurasLib.get.prices(['QRS', 'QRG'], 'EUR')
QurasLib.get.prices(['QRS', 'QRG']) // defaults to USD

import { api } from 'quras-js'
api.cmc.getPrice('QRS', 'SGD')
api.cmc.getPrices(['QRS', 'QRG'], 'SGD')
```