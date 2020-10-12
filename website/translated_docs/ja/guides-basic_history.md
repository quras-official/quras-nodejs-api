---
id: basic_history
title: 基本 - 履歴の確認
---

この連載ではどのようにトランザクションの履歴を得てくるかについて説明する。

トランザクションの履歴はqurasDB APIサーバーを利用して得ることができる。
つまりqurasDB APIサーバーのガイドを参照して、もしくはさ`quras-js`の関数を利用して履歴を得ることができる。

`quras-js`を利用して履歴を得てくる方式を次の実例を通じて説明する。

```js
  import * as Quras from 'quras-js'

  Quras.api.qurasDB.getTransactionHistory("MainNet", "Dqf3UKe1f5FBWduGxHp8RMqP29dL6DgGS1")
    .then((data) => {
        console.log(data); // トランザクションの履歴のデータが入っている。
    })
    .catch ((error) => {
        console.log(error);
    });
```

上記のようにqurasDBのgetTransactionHistory関数を利用して希望するアドレスの履歴情報を得ることができる。