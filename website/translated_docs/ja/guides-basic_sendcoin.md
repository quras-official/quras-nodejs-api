---
id: basic_sendcoin
title: Basic - コインの送金
---

この連載でQURASコインを`quras-js`モジュールを利用してどのように送金できるのか方法について説明する。
`quras-js`モジュールは使用者の便宜を図るためにqurasDBAPIサーバーとの連動のもとにコインの送受信機能を提供している。

それでは `quras-js`を通してどのようにコイン送受信が可能か実例コードを通して説明する。

```js
import * as Quras from `quras-js`

Quras.api.qurasDB.getBalance(Quras.CONST.QURAS_NETWORK.MAIN, 'DknmAbcap8RnUpkLQvbXTwTXqFJMjN4QPz') // From(送金しようとする)アドレスの balanceをqurasDB APIサバーから呼んでくる。
.then((data) => {
    const balance = new Quras.wallet.Balance(data)
    var scriptHash = Quras.wallet.getScriptHashFromAddress('Dqf3UKe1f5FBWduGxHp8RMqP29dL6DgGS1'); // Toアドレス
    const outputs = [{
            assetId: Quras.CONST.ASSET_ID['QRS'], // コインの種類を示す。
            value: 2, // 送金するコインの量を意味する。
            scriptHash: scriptHash // 送金するアドレスのscriptHash値である。
        }]
    
        const testTx = Quras.tx.Transaction.createContractTx(balance, outputs) // 送金のtxを生成する。
    
        testTx.sign('20164b85226c67cb6d8fe114f3b91af3f2dfc52dcf05d708e9eca80c8d739481'); // privatekeyを利用してtxを署名する。
    
        rpcServer.sendRawTransaction(testTx.serialize()) // RPCサーバーにTxを転送する。
        .then((data) => {
            console.log(data);
        })
        .catch ((error) => {
            console.log("error");
        });
})
.catch((error) => {
    console.log(error)
});
```

上記のようにコインに対する送受信を行うことができる。
上記の方式はQURASブロックチェーンに対して開発者レベルから利用することができる。
コイン送金方式にはこの他にもsendAssetを利用して行うこともできる。