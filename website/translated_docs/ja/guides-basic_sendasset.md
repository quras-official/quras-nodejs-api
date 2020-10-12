---
id: basic_sendasset
title: Basic - Sending assets
---

ここでは `sendAsset`関数を利用してどのように資産の送受信を進めるかについて連載(tutorial)で示している。

`quras-js`はQRSコインの送信、QRGコインの再分配とスマートコントラクトの実行に関する様々な機能を提供している。
今度の連載で資産の送信をどのように進行するかについて説明しようとする。

ここでいう資産という概念はQURASコインで基本コインであるQRSあるいはQRGコインを意味する。
また今後QURASブロックチェーンで提供するスマートコントラクトとして開発されたQEP1トークンに対する送受信方式も連載される予定である。

## Output 創造

資産を送信するためにはまず `Output`を生成しなければならない。ここで `Output`の概念は特定のアドレスへ送ろうとする資産の情報をいう。言い換えればアドレスAでどの程度の資産を送ろうとするかを示す項目がまさに `Output`である。

```js
  import QurasLib, {api} from 'quras-js'

  // DdMKz4NPardpaUqNVG7tfj9PgDNoD9zr9c アドレスへ1QRSを送ろうとする時次のように作る。
  const intentQRS = api.makeIntent({QRS:1}, 'DdMKz4NPardpaUqNVG7tfj9PgDNoD9zr9c')
  // DdMKz4NPardpaUqNVG7tfj9PgDNoD9zr9c アドレスへ1QRGを送ろうとする時次のように作る。
  const intentQRG = api.makeIntent({QRG:1}, 'DdMKz4NPardpaUqNVG7tfj9PgDNoD9zr9c')
  console.log(intentQRS) 
```

を追加しようとする時は `api.makeIntent`関数を利用してOutputを創造してそれらを配列で処理する方法で行えばなる。

## configuratin オブジェクトの設定

`sendAsset` はトランザクションの構成に必要な全ての詳細情報を含むconfigurationオブジェクトを入力してもらってトランザクションを生成する。

```js
const config = {
  net: 'TestNet', // トラクザクションを実行するQURASブロックチェーンのネットワークを設定する。
  address: 'DdMKz4NPardpaUqNVG7tfj9PgDNoD9zr9c',  // このアドレスは資産を送ろうとするアドレスを意味する。
  privateKey: '8acd21064619fb4a8f309ef5eb9f85d913b81bd3b0894962e2974ba3bf821ca6', // 資産を送るアドレスのprivatekeyを意味する。
  intents: intentQRS // 上記で創造したOutputオブジェクトを意味する。
}
```

ここでprivatekeyとaddressは互いにマッチングされなければならない。このconfigurationオブジェクトはqurasDBのような3rd party APIサーバと連動して当該アドレスの残高を得てからトランザクションを生成して署名することに利用される。

## 送信

```js
QurasLib.sendAsset(config)
.then(config => {
  console.log(config.response)
})
.catch(config => {
  console.log(config)
})
```

`sendAsset`は3rd party APIサーバからbalanceを読み込んでtransactionを構成して署名を進める後にQURASブロックチェーンに伝送する全ての段階を自動的に一度に行う。
つまり `sendAsset`関数は具体的なトランザクションの生成過程が分からなくてもこの一つの関数を利用してトランザクションの生成を進めることができる。

戻す形式は次の通りである。

```js
{
  result: true,
  txid: '48b83901a827fa343bf0e4d2ea00f4e7bd352ca28285f21e4bad9509f6460348'
}
```

トランザクションが成功すれば戻し値としてtxid を受け取る。

## Notes

- `sendAsset`関数は `api`モジュールで確認できる。
- この関数はmulti-sigアドレスには対応していない。
