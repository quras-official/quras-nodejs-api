---
id: basic_checkbalance
title: 基本 - 残高の確認
---

以前のの連載ではどのようにアカウントを生成して管理するかについて説明した。
今回の連載ではどのように生成されたアカウントに対する残高管理を行うかについてセ説明する。

`quras-js`モジュールはqurasDBというThird-party APIを結合して行うことになる。
`quras-js`にqurasDBロジックが実装されているためにユーザは便利に利用できる。

## 残高の確認

`quras-js`でqurasDBを通して残高を確認できる関数を提供している。
それではどのようにウォレットの残高を確認することができるか実例を通じて説明する。

```js
  import * as Quras from 'quras-js'

  Quras.api.qurasDB.getBalance(Quras.CONST.QURAS_NETWORK.MAIN, 'DknmAbcap8RnUpkLQvbXTwTXqFJMjN4QPz')
  .then((data) => {
      console.log(data);
  })
  .catch((error) => {
      console.log(error);
  });
```

上記の実例のようにウォレットの残高が確認できる。