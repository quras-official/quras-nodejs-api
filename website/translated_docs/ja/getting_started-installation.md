---
id: installation
title: Installation
---

`quras-js` ライブラリはNPMライブラリとしてQuras Devチームで開発するライブラリである。

## インストール方法

ライブラリのインストールする方法は以下の通りである。

```sh
npm install quras-js
```

## Import 方法

`quras-js`は2つの方式に利用されることができる。

詳しくはapiリストで具体的に見ようにする。

### 利用方法1 (意味論的な方法)

```js
import QurasLib from 'quras-js'

QurasLib.create.claimTx(...args)
const query = QurasLib.create.query()
```

### 利用方法 2 (部分モジュールの方法)

```js
import {rpc, tx} from 'quras-js'

QurasLib.tx.createClaimTx(...args)
const query = new rpc.Query()
```

## Require 方法

```js
var quras-js = require('quras-js')

// Semantic Style by using default import
var Quras = quras-js.default
const query = Quras.create.query()

// Named imports are available too
var wallet = quras-js.wallet
var tx = quras-js.tx

const account = new wallet.Account(privateKey)
```

## Web 利用方法

`quras-js`はweb用も開発されている。
使用方法は次のようである。

```html
  <script src="./lib/browser.js"></script>
```
