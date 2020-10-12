---
id: api-index
title: API
---

`quras-js` モジュールはQURASブロックチェーンと連動して様々なサービスを開発しようとする開発者の便宜を図るために色々な特定の機能を提供するライブラリである。

## default

`quras-js` で提供する標準importモジュールであるQurasLibはQURAS ブロックチェーンで利用される様々な機能を関数で提供している。

```js
import QurasLib from 'quras-js'
QurasLib.create.privateKey()
QurasLib.serialize.tx(transactionObj)
QurasLib.get.publicKeyFromPrivateKey(privateKey)
```

標準QurasLibを利用して上記のようにQURASブロックチェーンの初級開発者たちが簡単にブロックチェーンのサービス開発に近づけるように図られるため利用されるようになる。

## api

`api` モジュールは様々な外部のAPIに対する標準インタフェースを提供する。

## wallet

`wallet` モジュール"はQURASブロックチェーンのキーの生成に関するモジュールを提供する。

## tx

`tx`モジュールはトランザクションの創造と署名、標準化に関連する部分を提供する。

## sc

`sc` モジュール"はスマートコントラクトと関連した部分を提供し,QURASブロックチェーンで提供するInvocationTransactionと共に利用される。

## rpc

`rpc` モジュールはQURASノードと連動する機能を遂行する。

## u

`u` モジュールはutilityの略として文字列変換、ハッシュ関数等QURASブロックチェーンで利用されるその他の関数を実装している。

## CONST

`CONST` モジュールはQURASブロックチェーンと `quras-js` で利用される定数値を定義している。
