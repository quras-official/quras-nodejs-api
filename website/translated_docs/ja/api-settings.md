---
id: api-settings
title: Settings
---

`settings`モジュールを利用してしてQURASブロックチェーンのネットワークを新たに登録することができる。

```js
import QurasLib, {settings} from 'quras-js'

// Semantic access
const newNet = new QurasLib.rpc.Network({name:'NewNet'})
QurasLib.add.network(newNet)

```

## networks

`{[network:string]: Network}`

`quras-js`モジュールが提供する標準networkは `MainNet`と `TestNet`がある。

またaddNetworkとremoveNetwork関数を利用してNetworkを追加することもできるし、削除することもできる。

```js
const customMainNet = new Network('MainNet')
// MainNetを新しく修正することができる。
settings.addNetwork(customMainNet, true)

settings.removeNetwork('TestNet')
```