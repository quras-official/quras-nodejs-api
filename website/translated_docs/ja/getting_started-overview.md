---
id: overview
title: Overview
---

``quras-js`` はJavascriptライブラリとしてQURASブロックチェーンのInterfaceを具現してくれる。
開発者は ``quras-js`` のライブラリを利用してtransactionを創造したりスマートコントラクトを具現することができる。 

## 具現された機能

- QURASエンジンで提供するRPC通信部が具現化された。
- Wallet のキーの生成の部分が実装された。
- Transactionの生成部分が実装された。

## 具現すべき機能

- Smart Contract Script Build部分が実装されなければならない。
- qurasDBサーバとの結合作業が実現されなければならない。

## 使用方法

``quras-js`` は2つの方式に用いられることができる。

### 意味論的な方式

QurasLibをImportすることで標準に利用される方式であるがより意味論的に使用者が利用できるように図ってくれる。

```js
import QurasLib from 'quras-js'
QurasLib.create.privateKey()
QurasLib.serialize.tx(transactionObj)
QurasLib.get.publicKeyFromPrivateKey(privateKey)
```

この方式は 'quras-js'の初歩者が利用することに便利に構築されている。

### 部分モジュールの方式

次のモジュール名を利用して次のように利用することもできる。
この方式はQurasLibの意味論的な方式よりはより具体的なモジュールを部分的に利用することでより具体的な作業を進められるように提供する。

- `api`
- `CONST`
- `rpc`
- `sc`
- `tx`
- `u`
- `wallet`

```js
import { api } from 'quras-js'
```
