---
id: basic_createwallet
title: 基本 - ウォレットの生成
---

この連載ではどのようにQURAS用のウォレットを生成できるかについて説明する。
QURAS用のウォレットと言うとPrivate Key, Public Key, ScriptHash, Addressを管理することを意味する。
ブロックチェーンでウォレットの生成と管理は必須です。

`quras-js`モジュールを利用して便利にウォレットを生成及び管理できる。
それではどのようにウォレットを生成して利用するかについて説明する。

## ウォレットの生成

`quras-js`でウォレット管理用のクラスを提供する。
それではどのようにウォレットを生成することができるのか実例を通じて説明する。

```js
  import * as Quras from 'quras-js'
  const myAccount = new Quras.wallet.Account()

  console.log('Private Key : ' + myAccount.privateKey) // 生成されたPrivate Keyを表示する。
  console.log('Public Key : ' + myAccount.publicKey) // 生成されたPublic Keyを表示する。
  console.log('Address : ' + myAccount.address) // 生成されたアドレスを表示する。
  console.log('Script Hash : ' + myAccount.scriptHash) // 生成されたscriptHashを表示する。
```

上記の実例のようにウォレットのアドレスを生成して管理することができる。