---
id: basic_smartcontract
title: Basic - Smart Contract
---

In this lesson, we will show you how to deploy the QURAS smart contract and invoke this functions of smart contract.

Smart Contract will be run on QURAS VM.
You can deploy or invoke your smart contract using `quras-js` module.
Then let's see about this step by step.

## Smart Contract Deploy

You can deploy your own smart contract on blockchain like bellow.

```js
var address = 'Do27ycn5urnJnWnNboiDh5i5PkAEFmvehd'; // The address that launch the smart contract.
var privKey = '02bf9e9964a3c0421ad5a8dde06f848977c514fd5cc638434d567a05b87ade39'; // The private key.
var script = '53c56b6c766b00527ac46c766b51527ac461616168124d6f64756c652e52756e74696d652e4c6f67616168194d6f64756c652e53746f726167652e476574436f6e746578740e48656c6c6f2046756e6374696f6e05576f726c6461527268124d6f64756c652e53746f726167652e50757461516c766b52527ac46203006c766b52c3616c7566';  // Script that is compiled. 
var param = '07'; // Smart contract parameter types.
var returns = 5;  // Smart contract return type
var needStorage = true; 
var scName = 'HelloWorld';
var version = '1.0.0.1';
var author = 'dotFund';
var mail = 'dotFund@outlook.com';
var description = 'My First SC using JS Library.';

Quras.api.qurasDB.deploySmartContract(Quras.CONST.QURAS_NETWORK.MAIN, address, privKey, script, param, returns, needStorage, scName, version, author, mail, description, 490)
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.log(error)
  })
```

## Add Asset

You can add your own asset like bellow.

```js
var address = 'Do27ycn5urnJnWnNboiDh5i5PkAEFmvehd';
var privKey = '02bf9e9964a3c0421ad5a8dde06f848977c514fd5cc638434d567a05b87ade39';
var tokenName = 'DtToken';
var totalSupply = 100000;
var precision = 5;
var OwnerPrivKey = '02bf9e9964a3c0421ad5a8dde06f848977c514fd5cc638434d567a05b87ade39';
var admin = 'Do27ycn5urnJnWnNboiDh5i5PkAEFmvehd';
var issuer = 'Do27ycn5urnJnWnNboiDh5i5PkAEFmvehd';

Quras.api.qurasDB.deployAsset(Quras.CONST.QURAS_NETWORK.MAIN, address, privKey, Quras.CONST.ASSET_TYPE.Token, tokenName, totalSupply, precision, OwnerPrivKey, admin, issuer)
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.log(error)
  })
```

## Issue Asset

You can issue your own token so that you can use this token.

```js
Quras.api.qurasDB.getBalance(Quras.CONST.QURAS_NETWORK.MAIN, 'Do27ycn5urnJnWnNboiDh5i5PkAEFmvehd') // Get the balance of from address.
  .then((data) => {
    const balance = new Quras.wallet.Balance(data)
    var scriptHash = Quras.wallet.getScriptHashFromAddress('DrnEEnU1RtNKkP6TBAx8FaUQN1t1ghYPJV'); // To address.
    const outputs = [{
      assetId: '7a1a8c541de4fb7753d077a17870943b6a622817d922f46017d239f8db5b5bec', // The type of coins that you want to send.
      value: 1, // Coin amount to send.
      scriptHash: scriptHash // The scripthash of "To address".
    }]
        
    const testTx = Quras.tx.Transaction.createIssueTx(balance, outputs, null, 1) // create a transaction.
        
    testTx.sign('02bf9e9964a3c0421ad5a8dde06f848977c514fd5cc638434d567a05b87ade39'); // Sign the transaction using private key
        
    rpcServer.sendRawTransaction(testTx.serialize()) // Send the transaction to RPC Server.
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