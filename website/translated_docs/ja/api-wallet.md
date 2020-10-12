---
id: api-wallet
title: Wallet
---

`wallet` モジュールは次のように利用できる。

```js
import QurasLib from 'quras-js'
const account = QurasLib.create.account(privateKey)
QurasLib.is.address(string)

import {wallet} from 'quras-js'
const account = new wallet.Account(privateKey)
wallet.isAddress(string)
```

`wallet` モジュールはキーの生成、残高管理、署名のような機能を提供している。

## Classes
### Account

```ts
class Account {
  constructor(str: string)

  QTP1: string
  privateKey: string
  publicKey: string
  scriptHash: string
  address: string

  getPublicKey(encoded: boolean): string
}
```

`Account` モジュールはキーの各種形態に対する管理を進める。

```js
  import QurasLib, {wallet} from 'quras-js'

  const a = QurasLib.create.Account('Dqf3UKe1f5FBWduGxHp8RMqP29dL6DgGS1')
  console.log(a.address) // Dqf3UKe1f5FBWduGxHp8RMqP29dL6DgGS1

  const b = new wallet.Account('8acd21064619fb4a8f309ef5eb9f85d913b81bd3b0894962e2974ba3bf821ca6')
  console.log(b.privateKey) // 8acd21064619fb4a8f309ef5eb9f85d913b81bd3b0894962e2974ba3bf821ca6
```

このクラスを利用して様々なキーを容易に変換して得ることができる。

```js
  console.log(a.publicKey) // throws an error
  console.log(b.publicKey) // prints the public key
  console.log(b.address) // prints the address
```

キーの形態の優先順位は以下のとおりである。

0. encrypted (QEP1)
1. privateKey / QTP1
2. publicKey
3. scriptHash
4. address

`Account` クラスを利用してキーを生成する場合上記の優先順位に従って様々なキーを生成することができる。
つまり上記の優先順位から見るとprivateKeyからpublicKeyは生成できるがscriptHashからそれより優先順位が高いpublicKeyとかprivateKeyは生成することができない。

### Balance

```ts
class Balance {
  constructor(bal?: Balance)

  address: string
  net: 'MainNet' | 'TestNet'
  assetSymbols: string[]
  assets: { [index: string]: AssetBalance }
  tokenSymbols: string[]
  tokens: { [index: string]: number }

  static import(jsonString: string): Balance
  export(): string
}
```

`Balance` クラスは該当accountの残高を保管し,管理するクラスである。

```js
import QurasLib from 'quras-js'
// This creates a balance object but it is empty and not really useful
QurasLib.create.balance({net: 'TestNet', address: 'DdMKz4NPardpaUqNVG7tfj9PgDNoD9zr9c'})

import {wallet, api} from 'quras-js'
// This form is useless as it is an empty balance.
const balance = new wallet.Balance({net: 'TestNet', address: 'DdMKz4NPardpaUqNVG7tfj9PgDNoD9zr9c'})
// We get a useful balance that can be used to fill a transaction through api.qurasDB
const filledBalance = api.qurasDB.getBalance('MainNet','DdMKz4NPardpaUqNVG7tfj9PgDNoD9zr9c')
// This contains all symbols of assets available in this balance
const symbols = filledBalance.assetSymbols
// We retrieve the unspent coins from the assets object using the symbol
const qrsCoins = filledBalance.assets['QRS'].unspent
// We can verify the information retrieved using verifyAssets
filledBalance.verifyAssets('https://{Quras Node IP}:{Port}') // Not implemented.
```

このクラスはThird-Party Apiサーバから当該accountのunspent残高を計算して残高を得られるよう提供している。

### Claims

```ts
class Claims {
  constructor(claims?: Claims)

  address: string
  net: string
  claims: ClaimItem[]
}
```

`Claims` クラスはユーザがQRSコインを持っている対価で支払われるQRGコインを受け取れるようにTxを生成する機能を提供する。
このクラスはThird part Apiサーバと連動して機能を遂行することになる。

QURASはQRSコインによりQRGコインを生成することになる。
実例としてQRSコインを有している場合はQRSコインの量に応じてQRGコインの分配を受けることになる。
計算規則は下記の通りである。

    claim = ((start - end) * 8 + sysfee) * value

このクラスは上記の計算ロジックに従ってThird Part Apiサーバと連動して使用者の使用可能なQRGコインを計算する役割を行う。

### Wallet

The `Wallet` クラスは言葉通りにユーザのaccountをより便利に管理できるように開発されたクラスである。

このクラスを利用する例題を紹介する。

```js
import QurasLib, {wallet} from 'quras-js'

const b = new wallet.Account('8acd21064619fb4a8f309ef5eb9f85d913b81bd3b0894962e2974ba3bf821ca6')

// We create a wallet with name 'myWallet'. This is optional. The constructor is fine with no arguments.
const w1 = QurasLib.create.wallet({name: 'myWallet'})

// We generate a new Account and add it to the wallet
w1.addAccount()
// We add Account a to the wallet.
// The wallet will only error when trying to export an unencrypted key but does not prevent you from adding it.
w1.addAccount(a)
```

## Methods

### Core

Coreに定義された関数を紹介する。

Coreで定義された関数を利用してキーの互常間の変換をより効率的に進めるように提供している。

```js
import QurasLib from 'quras-js'
const privateKey = QurasLib.create.privateKey()
const publicKey = QurasLib.get.publicKeyFromPrivateKey(publicKey)
const scriptHash = QurasLib.get.scriptHashFromPublicKey(publicKey)
const address = QurasLib.get.addressFromScriptHash(scriptHash)

import { wallet } from 'quras-js'
const privateKey = wallet.generatePrivateKey()
const publicKey = wallet.getPublicKeyFromPrivateKey(privateKey)
const scriptHash = wallet.getScriptHashFromPublicKey(publicKey)
const address = wallet.getAddressFromScriptHash(scriptHash)
```

## Verify

またこのモジュールで該当キーの形式を入力してもらって実のQURASブロックチェーンで提供するキーの形式に合うかを検査できるように提供している。

```js
import QurasLib from 'quras-js'
QurasLib.is.address(addrStr)
QurasLib.is.privateKey(keyStr)
QurasLib.is.encryptedKey(encryptedStr)
QurasLib.is.publicKey(publicKeyStr)
QurasLib.is.MTP1(qtp1Str)
QurasLib.is.scriptHash(scriptHashStr)

import {wallet} from 'quras-js'
wallet.isAddress(addrStr)
wallet.isPrivateKey(keyStr)
wallet.isQEP1(keyStr)
wallet.isPublicKey(publicKeyStr)
wallet.isQTP1(qtp1Str)
wallet.isScriptHash(scriptHashStr)
```

戻す値はbool型である。
