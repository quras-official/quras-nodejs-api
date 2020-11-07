/**
 * Created by dotFund on 9/4/2018.
 */

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const axios = require('axios');
const Quras = require('../lib/index.js');

// const { getMultiSignWalletTx } = require('../src/transactions/index.js');
//const config = require('./createData.js')

Quras.logging.logger.setAll('info') // sets logging level of module-dev-js to 'info'
const apiLogger = Quras.logging.logger.getLogger('api') // gets the logger for the api package
apiLogger.setLevel('warn') // sets logging level only on the logger for the api package

//console.log(Quras.CONST.ASSETS)

const ico_account = new Quras.wallet.Account('7c7de7669ccdea67d205ece99eaae3e5da60dec649bce05e750fcd6a64071016')
console.log('privkey : ' + ico_account.privateKey)
console.log('public key : ' + ico_account.publicKey)
console.log('address : ' + ico_account.address);

const myAccount = new Quras.wallet.Account()

console.log('Private Key : ' + myAccount.privateKey)
console.log('Public Key : ' + myAccount.publicKey)
console.log('Address : ' + myAccount.address)
console.log('MTP1 Private Key : ' + myAccount.MTP1)
console.log('Script Hash : ' + myAccount.scriptHash)

var pubKey = '03436a716bb42f8e094b06ba5a4e2112ca5f378a727356d8ec9dcc0aca7b15074f';
var scriptHash = Quras.wallet.getScriptHashFromPublicKey(pubKey);
var addr = Quras.wallet.getAddressFromScriptHash(scriptHash);

var scriptHash = Quras.wallet.getScriptHashFromAddress('DZ5ZLHNs1opQitAMW9knMDFxw3SZSQhb31');
console.log(scriptHash);

var checkAddr = Quras.wallet.isAddress('DYKBRXP1hk6dZCft7reVkXiTdyRb1DhKxJ');

var addrfromPriv = new Quras.wallet.Account('02bf9e9964a3c0421ad5a8dde06f848977c514fd5cc638434d567a05b87ade39');
console.log('Address : ' + addrfromPriv.address)

var addrToPriv = new Quras.wallet.Account('02bf9e9964a3c0421ad5a8dde06f848977c514fd5cc638434d567a05b87ade40');
console.log('Address : ' + addrToPriv.address)

const rpcServer = new Quras.rpc.RPCClient(Quras.CONST.QURAS_NETWORK.MAIN);
const testRpcServer = new Quras.rpc.RPCClient(Quras.CONST.QURAS_NETWORK.TEST);
const devRpcServer = new Quras.rpc.RPCClient(Quras.CONST.QURAS_NETWORK.DEV);

try {
    var data = Quras.u.fixed82num("ffffffffffffffff");
    console.log(data.toString());
} catch (err) {
    console.log(err);
}


function convertHexToString(hex) {
    var str = '';
    for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}
// for (var i=1; i<4; i++) {
//     var param = [
//         {
//             "type": "Integer",
//             "value": i
//         }
//     ];

//     rpcServer.invokeFunction('0xcc1321a11784192ab50a6141ff6ad267b858c862','tokenMetadata',param/*param*/)
//     .then((uriValue) => {
//         rpcServer.invokeFunction('0xcc1321a11784192ab50a6141ff6ad267b858c862','ownerOf',param/*param*/)
//         .then((ownerValue) =>{
//             var uri = convertHexToString(uriValue["stack"][0]["value"]);
//             var owner = convertHexToString(ownerValue["stack"][0]["value"]);
//             console.log(uri);
//             console.log(owner);
//         })
//         .catch((error) => {
//             console.log(error);
//         });
//     })
//     .catch((error) => {
//         console.log(error);
//     });
// }

// var params = [
//     { "type": "ByteArray",
//       "value": Quras.u.reverseHex("38cbd2622e2f120455c17f02fdbe2ed5be3ed7da") },
//     { "type": "String",
//       "value": "https://media.giphy.com/media/Wyt6sLEjKjaFjzybth/giphy.gif" }
// ]

// var functionName = {
//     "type": "String",
//     "value": "mint"
// }

// var pubKey = Quras.wallet.getPublicKeyFromPrivateKey('530ccff5d695e934edf5f180268da169c5dfc01c1b750d359b663542c20a6049');
// var scriptHash = Quras.wallet.getScriptHashFromPublicKey(pubKey);
// var address = Quras.wallet.getAddressFromScriptHash(scriptHash);





/*Quras.api.qurasDB.invokeSmartContract(Quras.CONST.QURAS_NETWORK.TEST,'02a42edc5064c7f5415de400bdfd382dc72515e2c450dad31f45cf2cac58c3dc','cc1321a11784192ab50a6141ff6ad267b858c862',functionName, params, address)
.then((data) => {
    console.log(data);
})
.catch((error) => {
    console.log(error);
});*/
// var claims = [
//     {txid: "0x4ec9c0b98d68c8061ca7236efe804107628652234e78b49baf8a993448370f36", vout: 1}
// ]
// testRpcServer.getClaimAmount(claims);

// rpcServer.getRawMemPool()
// .then((data) => {
//     console.log(data);
// })
// .catch((error) => {

// });

// script = "144c6f727279204465706c6f79656420546f6b656e106c6f727279363230403136332e636f6d054c6f72727905312e302e37034c424400550207104c8653c56b6c766b00527ac46c766b51527ac461616168124d6f64756c652e52756e74696d652e4c6f67616168194d6f64756c652e53746f726167652e476574436f6e746578740e48656c6c6f2046756e6374696f6e05576f726c6461527268124d6f64756c652e53746f726167652e50757461516c766b52527ac46203006c766b52c3616c7566681551757261732e436f6e74726163742e437265617465";
// const sb = new Quras.sc.ScriptBuilder(script);
// try {
//     var params = sb.toScriptParams();
//     console.log(params);
// } catch (error) {
//     console.log(error);
// }

// Quras.api.qurasDB.getClaimInfo(Quras.CONST.QURAS_NETWORK.MAIN, 'DknmAbcap8RnUpkLQvbXTwTXqFJMjN4QPz')
// .then((data) => {
//     var tx = Quras.tx.Transaction.createClaimTxWithQurasDB('20164b85226c67cb6d8fe114f3b91af3f2dfc52dcf05d708e9eca80c8d739481', data['available']);

//     testTx.sign('20164b85226c67cb6d8fe114f3b91af3f2dfc52dcf05d708e9eca80c8d739481'); // Sign the transaction using private key
    
//     rpcServer.sendRawTransaction(testTx.serialize()) // Send the transaction to RPC Server.
//     .then((data) => {
//         console.log(data);
//     })
//     .catch ((error) => {
//         console.log("error");
//     });
// })
// .catch((error) => {
//     console.log(error);
// });

// Quras.api.qurasDB.getAssetInfo(Quras.CONST.QURAS_NETWORK.MAIN, '0682fa316d9d6b8d7f379b573d00a6bc78075d943f191790d0ea87aff166de571')
// .then((data) => {
//     console.log(data);
// })
// .catch((error) => {
//     console.log(error);
// });

// Quras.api.qurasDB.getMyAssetInfo(Quras.CONST.QURAS_NETWORK.MAIN, 'DkDYhNTmuLokLhHgB27cTdeW4WtCATeAwF')
// .then((data) => {
//     console.log(data);
// })
// .catch((error) => {
//     console.log(error);
// });

// Quras.api.qurasDB.getMyMultiSignAddresses(Quras.CONST.QURAS_NETWORK.DEV, 'DhxumsrNQy9KwjYJiPjHLV3c4Qo6GhfdGt')
// .then((data) => {
//     console.log(data);
// })
// .catch((error) => {
//     console.log(error);
// });

// Quras.api.qurasDB.getMyMultiSignMembers(Quras.CONST.QURAS_NETWORK.MAIN, 'DhxumsrNQy9KwjYJiPjHLV3c4Qo6GhfdGt')
// .then((data) => {
//     console.log(data);
// })
// .catch((error) => {
//     console.log(error);
// });

// Quras.api.qurasDB.getBalance(Quras.CONST.QURAS_NETWORK.MAIN, 'Di4GYMXaSh7NiunKjmm9E5XqeB1xAkhgtH')
// .then((data) => {
//     console.log(data);
// })
// .catch((error) => {
//     console.log(error);
// });

// console.log(rpcServer.version);

// rpcServer.getBlockCount()
//     .then((data) => {
//         console.log('block count'  + data);
//     })
//     .catch ((error) => {
//         console.log("error");
// });

// rpcServer.getBlock(100)
//     .then((data) => {
//         console.log(data);
//     })
//     .catch ((error) => {
//         console.log("error");
// });

// Quras.api.qurasDB.getTransactionHistory(Quras.CONST.QURAS_NETWORK.DEV, "DjfmJ57DYWffX53R8XRkB9WyejW8o3Y5jc")
//     .then((data) => {
//         console.log(data);
//     })
//     .catch ((error) => {
//         console.log("error");
//     });

function AddAsset() {
    var assetData = new Array();
    assetData['priKey'] = '02bf9e9964a3c0421ad5a8dde06f848977c514fd5cc638434d567a05b87ade39';                  
    assetData['tokenName'] = 'DYKTest5';
    assetData['totalSupply'] = 1000;
    assetData['precision'] = 2;
    assetData['afee'] = 0;
    assetData['tfeeMin'] = 0;
    assetData['tfeeMax'] = 10;

    Quras.api.qurasDB.deployAsset(Quras.CONST.QURAS_NETWORK.MAIN, assetData)
    .then((data) => {
        console.log(data)
    })
    .catch((error) => {
        console.log(error)
    })
}

// AddAsset();

function DeploySmartContract() {
    var address = 'Do27ycn5urnJnWnNboiDh5i5PkAEFmvehd';
    var privKey = '02bf9e9964a3c0421ad5a8dde06f848977c514fd5cc638434d567a05b87ade39';
                   
    var script = '53c56b6c766b00527ac46c766b51527ac461616168124d6f64756c652e52756e74696d652e4c6f67616168194d6f64756c652e53746f726167652e476574436f6e746578740e48656c6c6f2046756e6374696f6e05576f726c6461527268124d6f64756c652e53746f726167652e50757461516c766b52527ac46203006c766b52c3616c7566';
    var param = '07';
    var returns = 5;
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
}
//DeploySmartContract()

/*
const tx = new Quras.tx.Transaction({
        type: 2,
        version: 2,
        attributes: [],
        shouldNotBeThere: false
      })
*/

/*
      privateKey : 02bf9e9964a3c0421ad5a8dde06f848977c514fd5cc638434d567a05b87ade39
      Address : Do27ycn5urnJnWnNboiDh5i5PkAEFmvehd

      ToPrivateKey : 02bf9e9964a3c0421ad5a8dde06f848977c514fd5cc638434d567a05b87ade40
      ToAddress : DZbNA3F3vrTk7kmmiywAVpJ4P5foGkVek7
*/
function SendCoin(){
    Quras.api.qurasDB.getBalance(Quras.CONST.QURAS_NETWORK.MAIN, 'DVCLMp58LVZunbABR6zQQqpF1xiAHKBvrL') // Get the balance of from address.
    .then((data) => {
        const balance = new Quras.wallet.Balance(data)
        var scriptHash = Quras.wallet.getScriptHashFromAddress('DX4TWAha5pM9hVsxD4QRoyac1ubHLMJXqC'); // To address.
        const outputs = [{
                assetId: Quras.CONST.ASSET_ID["XQC"], // The type of coins that you want to send.
                value: 20 , // Coin amount to send.
                fee: 0.2, // fee.
                scriptHash: scriptHash // The scripthash of "To address".
            }]
        
        var testTx = Quras.tx.Transaction.createContractTx(balance, outputs) // create a transaction.

        // getFromAddress(Quras.CONST.QURAS_NETWORK.MAIN, testTx);
    
        testTx.sign('8488eb4be90c73650723277c43464f751b976c0954f0cc305ed1260dbc87f7d0'); // Sign the transaction using private key

        // var rawdata = testTx.serialize();

        // testTx = Quras.tx.Transaction.deserialize(rawdata);
    
        rpcServer.sendRawTransaction(testTx.serialize()) // Send the transaction to RPC Server.
        .then((data) => {
            console.log(data);
        })
        .catch ((error) => {
            console.log(error);
        });
    })
    .catch((error) => {
        console.log(error)
    });
}

// SendCoin();
// SendCoin();
// SendCoin();

// function getFromAddress(net, tx) {
//     if (tx.inputs.length == 0) {
//         console.log("There's no inputs");
//     }
  
//     Quras.api.qurasDB.getTransaction(net, tx.inputs[0].prevHash)
//     .then((resTx) => {
//         var address = resTx.vouts[tx.inputs[0].prevIndex].address;
//         console.log(address);
//     })
//     .catch((error) => {
//         console.log(error)
//     })
// }

// Quras.api.qurasDB.getBlock(Quras.CONST.QURAS_NETWORK.MAIN, 44078)
// .then((res) => {
//     console.log(res);
// })
// .catch((error) => {
//     console.log(error);
// })

// Quras.api.qurasDB.getTransaction(Quras.CONST.QURAS_NETWORK.MAIN, '06d616968d2c6ee0bdc9c5200bacdcb8c9566dfad9b85611d5089f37903a42b8')
// .then((resTx) => {
//     var address = resTx.vouts[tx.inputs[0].prevIndex].address;
//     console.log(address);
// })
// .catch((error) => {
//     console.log(error)
// })

// Quras.api.qurasDB.isMyMultiSignWallet(Quras.CONST.QURAS_NETWORK.DEV, 'DgoW5JSaAYAAwUuNg5JX3tMC9GnuycjRr7', 'DhrAHYFAJ3iSRCvvESjUiwSJkE7AqvS6rx')
// .then((data) => {
//     console.log(data);
// })
// .catch((error) => {
//     console.log(error);
// });

function SendMultiSignCoin(){
    Quras.api.qurasDB.getBalance(Quras.CONST.QURAS_NETWORK.MAIN, 'Ddb6XJozy18AbJx2Nnmh7Q8rVHzcSM2HYd') // Get the balance of from address.
    .then((data) => {
        const balance = new Quras.wallet.Balance(data)
        var scriptHash = Quras.wallet.getScriptHashFromAddress('DkDYhNTmuLokLhHgB27cTdeW4WtCATeAwF'); // To address.
        const outputs = [{
            assetId: Quras.CONST.ASSET_ID["XQC"], // The type of coins that you want to send.
            value: 3 , // Coin amount to send.
            fee: 0.2, // fee.
            scriptHash: scriptHash // The scripthash of "To address".
        }]
    
        var testTx = Quras.tx.Transaction.createContractTx(balance, outputs) // create a transaction.

        Quras.api.qurasDB.getMyMultiSignMemberPubkeys(Quras.CONST.QURAS_NETWORK.MAIN, 'Ddb6XJozy18AbJx2Nnmh7Q8rVHzcSM2HYd')
        .then((data) => {

            if (data.length < 1) throw new Error("There is no members");
            testTx.createMultiSign(data, 'e4fdf1d4d00bc9597d9a94bf880810221501289f96c0ac89eed1a19a334785b0'); // Sign the transaction using private key
            
            console.log(testTx.isCompletedMultiSign());

            console.log(Quras.tx.getMultiSignTxRawData(testTx));

            testTx = Quras.tx.Transaction.getMultiSignTx(Quras.tx.getMultiSignTxRawData(testTx));
            
            testTx.joinMultiSign('8488eb4be90c73650723277c43464f751b976c0954f0cc305ed1260dbc87f7d0'); // Sign the transaction using private key
        
            console.log(testTx.isCompletedMultiSign());

            // testTx.joinMultiSign('3af2373286901af9aa9a76087800109d0b63fb8e96be447f1fafcf98db21fe84'); // Sign the transaction using private key
        
            // console.log(testTx.isCompletedMultiSign());

            // testTx.joinMultiSign('bb0e2a6e667dd396c77d13398e4886fed7d31c14e48fc471896a7200ba2e6358'); // Sign the transaction using private key
        
            // console.log(testTx.isCompletedMultiSign());

            testTx = testTx.completeMultiSignTx();

            rpcServer.sendRawTransaction(testTx.serialize()) // Send the transaction to RPC Server.
            .then((data) => {
                console.log(data);
            })
            .catch ((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            console.log(error);
        });
    })
    .catch((error) => {
        console.log(error)
    });
}

// SendMultiSignCoin();

function sendMultiSignCoinTemp() {
    var testTx = Quras.tx.Transaction.getMultiSignTx('eyJ0eXBlIjoxMjgsInZlcnNpb24iOjAsImF0dHJpYnV0ZXMiOltdLCJpbnB1dHMiOlt7InByZXZIYXNoIjoiNmYwZDUxNjE5Yjk5YTlmZGUyNmY0NmNkMjNmZmM3NGI4OGNkNDZhNjQ5ZmQ1MmU1ZmRlYzQ0MmJlZTA5N2RkMyIsInByZXZJbmRleCI6MH0seyJwcmV2SGFzaCI6IjFjZTE0YTc1NTFhZTM4Y2I3ODM0N2RhZjY3YTBhNTNjNGRjOTlmNzUyYjdlZDA0YWRiZDczZjJmMjA1NzFhN2QiLCJwcmV2SW5kZXgiOjB9XSwib3V0cHV0cyI6W3siYXNzZXRJZCI6IjBmZWRkMDVlMzQyYzk2ODk2OTJlZWFhNWJlYWQ5ZjZmOTBlYjU3NmQyNjhlNDEzNzczZjMyMzg4ZWIyOTliZDQiLCJ2YWx1ZSI6IjMuNSIsInNjcmlwdEhhc2giOiIwOTkyY2UxMDdmZDRiZDQ1ZmFkYmY3YWE3YWI0MDdiMjU1YTA5Y2MzIiwiZmVlIjoiMC4yIn0seyJhc3NldElkIjoiMGZlZGQwNWUzNDJjOTY4OTY5MmVlYWE1YmVhZDlmNmY5MGViNTc2ZDI2OGU0MTM3NzNmMzIzODhlYjI5OWJkNCIsInZhbHVlIjoiOTk5Ni41Iiwic2NyaXB0SGFzaCI6IjQ1MjBhZGZjY2Y4N2E1MjBiYzVhMDNmY2ZhOWU5MjkwM2UzMTQxNDciLCJmZWUiOiIwIn0seyJhc3NldElkIjoiYTQ5MjU5NDAwMWIzNzdjZDI2MmI3YWY4MmUzYTY2ZGM4YjQ2ODZjYTgwYjUzNDNkYTQ1NGVhYzAyMzM1NDlhOCIsInZhbHVlIjoiOTk5OS44Iiwic2NyaXB0SGFzaCI6IjQ1MjBhZGZjY2Y4N2E1MjBiYzVhMDNmY2ZhOWU5MjkwM2UzMTQxNDciLCJmZWUiOiIwIn1dLCJzY3JpcHRzIjpbeyJpbnZvY2F0aW9uU2NyaXB0IjoiNDBmNmIwYmVkZTUwZDE1MGViYzg4NGU3OTZlN2I3ZmJmM2VkYzAwZjRlYjcxZWNlNDNhMWUwODE3OTQ3ZGM0YWNmMTE2NDY1NmI4ZjE1YWVjNTE4YWM1MDU2MGIxM2EzNTQ5NTllNWZkMjBjMGYzZWZjNmFmM2ViYjg5ZDFjNDJlMjQwYTUzMjU2YmRlYWY3ODQ0MDdkZTAwMjY0MjE1M2RlMmEzNzM5NWIyN2QxMjc5ZDEyYzEwMTZkNzQxODg4MjIyMWY5NjBiMTc1ZTk4YjUxNzRlZDVkOTY0YTc0MTVhNjAxY2ZmMzY0MzVhZGY3ZTI1ZTBlZGVjYjE4OGFiNzU3NmUiLCJ2ZXJpZmljYXRpb25TY3JpcHQiOiI1MzIxMDMzYThiYzhlODE1NDU4Y2M5MTBmODAwZDdmY2E1YmRhMWJlOTA0MDI5N2Y0ZGMzZjQwMTVlYWRlOTU3MTExOWNlMjEwMzg5YjNlZjZhYzM4ZTVkNjcyMWU0NzllODA5NjUxZDYwMzg5NzMxM2U0OTQ1YWY4NWE5MzgyMzBkYWZhZjU5ZmQyMTAzYzUwZWFiNGIzZDllN2JhMzMwNDI2NWVhYTliZDA1YzFhN2M2MGU1YWRlZmU2OWIxODA0MmZjMWY1ZGE0ZWM0MDIxMDJlNjQyOWUzZTFjMmMxNWE3ZDM3MWIxNWEzMmM0MWU4MzU2ZmFjODFiOWNjZmU3MjBjNzM0ZTk2OWQ5ODdmN2JiNTRhZSJ9XSwiZXRjIjp7IjAzM2E4YmM4ZTgxNTQ1OGNjOTEwZjgwMGQ3ZmNhNWJkYTFiZTkwNDAyOTdmNGRjM2Y0MDE1ZWFkZTk1NzExMTljZSI6IjQwYTUzMjU2YmRlYWY3ODQ0MDdkZTAwMjY0MjE1M2RlMmEzNzM5NWIyN2QxMjc5ZDEyYzEwMTZkNzQxODg4MjIyMWY5NjBiMTc1ZTk4YjUxNzRlZDVkOTY0YTc0MTVhNjAxY2ZmMzY0MzVhZGY3ZTI1ZTBlZGVjYjE4OGFi');

    console.log(testTx.isCompletedMultiSign());

    testTx.joinMultiSign('ca019e7157b681e3cba8d02c6a12665701954dc658dcef9ddb222c69f316013f'); // Sign the transaction using private key

    testTx = testTx.completeMultiSignTx();

    rpcServer.sendRawTransaction(testTx.serialize()) // Send the transaction to RPC Server.
    .then((data) => {
        console.log(data);
    })
    .catch ((error) => {
        console.log(error);
    });
}

// sendMultiSignCoinTemp();

function ClaimMultiSign(){
    Quras.api.qurasDB.getClaimInfo(Quras.CONST.QURAS_NETWORK.MAIN, 'Drn1MxUc94X4ZkWtHuhUyDizofGFABVqY2')
    .then((data) => {
        var testTx = Quras.tx.Transaction.createClaimTxWithQurasDB('Drn1MxUc94X4ZkWtHuhUyDizofGFABVqY2', data['available']);

        Quras.api.qurasDB.getMyMultiSignMemberPubkeys(Quras.CONST.QURAS_NETWORK.MAIN, 'Drn1MxUc94X4ZkWtHuhUyDizofGFABVqY2')
        .then((data) => {
            if (data.length < 1) throw new Error("There is no members");
            testTx.createMultiSign(data, 'd886cca2644b42ba509adf6b988a0c20506aae92b51feb6a1b9f6b8e94ef43ea'); // Sign the transaction using private key
            
            console.log(testTx.isCompletedMultiSign());

            testTx = new Quras.tx.Transaction(JSON.parse(JSON.stringify(testTx)));
            
            testTx.joinMultiSign('7ed1aef02e9259fa81081ac2850a1e3363bbae5b5c3ac84e9ed2548848620e5f'); // Sign the transaction using private key
        
            console.log(testTx.isCompletedMultiSign());

            testTx.joinMultiSign('3af2373286901af9aa9a76087800109d0b63fb8e96be447f1fafcf98db21fe84'); // Sign the transaction using private key
        
            console.log(testTx.isCompletedMultiSign());

            testTx.joinMultiSign('bb0e2a6e667dd396c77d13398e4886fed7d31c14e48fc471896a7200ba2e6358'); // Sign the transaction using private key
        
            console.log(testTx.isCompletedMultiSign());

            testTx = testTx.completeMultiSignTx();

            devRpcServer.sendRawTransaction(testTx.serialize()) // Send the transaction to RPC Server.
            .then((data) => {
                console.log(data);
            })
            .catch ((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            console.log(error);
        });
    })
    .catch((error) => {
        console.log(error);
    });
}

// ClaimMultiSign();

function RegisterMultiSignTransaction()
{
    var tx = Quras.tx.Transaction.createRegisterMultiSignTx('022d597ef40181c3f075d2b8612611785aa275485e7ede57c3d07664f254f99450');
    console.log(Quras.tx.getMultiSignWalletTxRawData(tx));
    tx = Quras.tx.Transaction.joinMultiSignWallet(tx, '035575f88c6f0e41fc7cc657b040f34902337d13dbc1b18dd2c3eac3f2e576d6b3');
    console.log(Quras.tx.getMultiSignWalletTxRawData(tx));

    // var tx = Quras.tx.Transaction.getMultiSignWalletTx('eyJtdWx0aXNpZ19yZWRlZW1fc2NyaXB0IjoiMDYxZTNkNzAzZTAyMTU0YjY2Njk1ZWI1NzQzOWFmODY3MWEwYjM1OCIsInZhbGlkYXRvcl9jb3VudCI6MiwidmFsaWRhdG9ycyI6WyIwMzNhOGJjOGU4MTU0NThjYzkxMGY4MDBkN2ZjYTViZGExYmU5MDQwMjk3ZjRkYzNmNDAxNWVhZGU5NTcxMTE5Y2UiLCIwM2JhMzA5YTg2M2RiMmI2OGIwMTgxYzY5NjU4YmJkMjhiNTViNmVlYmE0MzNkOTVmZmVhNjI0ZjgzMGNhZTYzMDciXX0=');

    // tx = Quras.tx.Transaction.joinMultiSignWallet(tx, '0367bd2fd63b6c5166992585af88244344795880cd610663c20526e1f1c45aa3b9');

    var scripthash = Quras.tx.Transaction.getMultiSignScriptHash(tx);

    var addr = Quras.wallet.getAddressFromScriptHash(scripthash);

    console.log(addr);

    // var parsedTx = Quras.tx.Transaction.getMultiSignWalletTx(Quras.tx.getMultiSignWalletTxRawData(tx));
    // console.log(parsedTx);

    tx.sign('7946ec98ebfa9e064101584b91db3275f485391d6eec345650bcceb861874c0a'); // Sign the transaction using private key

    // var rawdata = tx.serialize();

    // tx = Quras.tx.Transaction.deserialize(rawdata);
            
    rpcServer.sendRawTransaction(tx.serialize()) // Send the transaction to RPC Server.
    .then((data) => {
        console.log(data);
    })
    .catch ((error) => {
        console.log("error");
    });
}

// RegisterMultiSignTransaction();

// var serializedString = "80000003596991b5b4dd94a713546e6eca69059b839ac960caef69e1d57731d253bd91e600007a551578e14a6c0949a9c95ad517c00504736409278709c7baa5782486ddc8e1000001e6427944e77d67e87230e0cd1d3e9fa30f1946505b506d464e5d5bb0de184f000002d49b29eb8823f37337418e266d57eb906f9fadbea5ea2e6989962c345ed0ed0f009435770000000007dfcd8f0bfbad0a35984cb3864d2c5951aaea630000000000000000d49b29eb8823f37337418e266d57eb906f9fadbea5ea2e6989962c345ed0ed0f0465360000000000f01ab122900d7b219e0cd9260395f796206082700000000000000000";
// var tx = Quras.tx.Transaction.deserialize(serializedString);
// console.log(tx);

// var scriptHash = Quras.wallet.getScriptHashFromAddress('DnvhF68T9RoVKHKA6nUG4S3zpngGeZEzDo');
// devRpcServer.getMemPoolTransaction(scriptHash)
// .then((data) => {
//     console.log(data);
// })
// .catch ((error) => {
//     console.log(error);
// });

function sendCoinCam() {
    const API = "http://blockapi.quras.io:3001";
    Quras.api.qurasDB
    .getBalance(API, "DeQ3m5WSPYLLuQTP1DyLvENKkpqqzaUwWy")
    .then((data) => {
        var b = new Quras.wallet.Balance(data);
        console.log("b = ", b);
        var newAccountScriptHash = Quras.wallet.getScriptHashFromAddress(
        "Db1dHvTzN696ef43RqufL6fTGFtDNT2fmb"
        );
        outputs = [
        {
            assetId: Quras.CONST.ASSET_ID["XQC"], // The type of coins that you want to send.
            value: b.assets["XQC"].balance / 2, // Coin amount to send.
            scriptHash: newAccountScriptHash, // The scripthash of "To address".
            fee: 0,
        },
        ];
        const testTx = Quras.tx.Transaction.createContractTx(b, outputs); // create a transaction.

        console.log(testTx);
    })
    .catch((error) => {
        console.log(error)
    });
}

//sendCoinCam();

function IssueTx() {
    
    var script = Quras.wallet.getScriptHashFromPublicKey('0d6db99d3960ce97cf311f1ff7ff1ecb9e4b2cb1a62730ea66cc64549ba573ce03');
    var address = Quras.wallet.getAddressFromScriptHash(script);
    Quras.api.qurasDB.getBalance(Quras.CONST.QURAS_NETWORK.MAIN, 'DWLAfpCoX39nqsihfcMLfkUaWrQ8KAVhD9') // Get the balance of from address.
    .then((data) => {
        const balance = new Quras.wallet.Balance(data)
        var scriptHash = Quras.wallet.getScriptHashFromAddress('DWLAfpCoX39nqsihfcMLfkUaWrQ8KAVhD9'); // To address.
        const outputs = [{
            assetId: 'c22ec650954a9ac2a18fa8364680112cf87d99c1d646c228393b33f076993cb0', // The type of coins that you want to send.
            value: 10000, // Coin amount to send.
            scriptHash: scriptHash // The scripthash of "To address".
        }];
    
        const testTx = Quras.tx.Transaction.createIssueTx(balance, outputs, null, 1) // create a transaction.
    
        testTx.sign('4746b86333d9d3aa3437a4f4313e5cbf8793ea2f7cb8bfba2db1380beda09faa'); // Sign the transaction using private key
    
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
}
// IssueTx()

function do_invoke() {
    const sb = new Quras.sc.ScriptBuilder('00c1046e616d65675f0e5a86edd8e1f62b68d2b3f7c0a761fc5a67dc');
    const params = sb.toScriptParams();
    Quras.rpc.Query.invokeScript(sb.str)
    .execute(Quras.CONST.DEFAULT_RPC.MAIN)
    .then((res) => {
        console.log(res)
    });
}

//do_invoke();

function do_coinmarket() {
    Quras.api.cmc.getPrice("NEO", "usd")
    .then((data) => {
        console.log(data);
    })
    .catch ((error) => {
        console.log("error");
    });

    var Net = Quras.api.qurasDB.getAPIEndpoint("MainNet");
    console.log(Net);

    /*
    Quras.api.neoscan.getBalance("MainNet", "AZCcft1uYtmZXxzHPr5tY7L6M85zG7Dsrv")
    .then((data) => {
        console.log(data);
    })
    .catch ((error) => {
        console.log("error");
    });
    */

    // Quras.api.qurasDB.getBalance("MainNet", "2BV5Epr7CUnLpFCBVi2LVsP3z4xcuTSFytzXp54phm4")
    // .then((data) => {
    //     console.log(data);
    // })
    // .catch ((error) => {
    //     console.log("error");
    // });

    
    // Quras.api.qurasDB.getTransactionHistory("MainNet", "DkDYhNTmuLokLhHgB27cTdeW4WtCATeAwF")
    // .then((data) => {
    //     console.log(data);
    // })
    // .catch ((error) => {
    //     console.log("error");
    // });
    
    // Quras.api.qurasDB.getRPCEndpoint("MainNet")
    // .then((data) => {
    //     console.log(data);
    // })
    // .catch ((error) => {
    //     console.log("error");
    // });
}

//do_coinmarket();

function RegisterProviderInfo()
{
    Quras.api.qurasDB.getBalance('MainNet', "2BV5Epr7CUaQs9khfU4zEKj51bmc6bpEVXdxz5UPNBn")
    .then ((balance) => {
        const bal = new Quras.wallet.Balance(balance)
    
        /*
        const outputs = [{
            assetId: Quras.CONST.ASSET_ID['MOD'],
            value: 2,
            scriptHash: '7a38e764c0f38277e7da8f5c19eae5143bab5a1c'
        }]

        var script = '0c7769746864726177486f6c6414fcf0ddef25dd21b5ac447e924aca08403d08801352c10c476574506172616d6574657267108165121dea07d875a532c6b8a3d91390fe5f8c';

        const sb = new Quras.sc.ScriptBuilder(script);
        const params = sb.toScriptParams();
        Quras.rpc.Query.invokeScript(sb.str)
        .execute(Quras.CONST.DEFAULT_RPC.MAIN)
        .then((res) => {
            console.log(res)
        });

        Quras.api.qurasDB.getParameter(Quras.CONST.DEFAULT_RPC.MAIN, 'fcf0ddef25dd21b5ac447e924aca08403d088013', 'withdrawHold')
        .then ((data) => {
            console.log(data);
        })

        */

        Quras.api.qurasDB.getProviderInfo(Quras.CONST.DEFAULT_RPC.MAIN, '2BV5Epr7CUaQs9khfU4zEKj51bmc6bpEVXdxz5UPNBn', 'withdrawHold')
        .then ((data) => {
            console.log(data);
        })
        
        /*
        Quras.api.qurasDB.setProviderInfo(Quras.CONST.DEFAULT_RPC.MAIN, balance, '7f1e0b95adabf5b0baf01adbd7a5cc43418529a5729ecc977c091fc60e45d5af', '2BV5Epr7CUaQs9khfU4zEKj51bmc6bpEVXdxz5UPNBn', '10000', '100', '192.168.1.1', '3000', '100', '100', '100', '100')
        .then ((data) => {
            console.log(data);
        })
        .catch ((error) => {
            console.log(error);
        })
        */

       Quras.api.qurasDB.depositCollateral(Quras.CONST.DEFAULT_RPC.MAIN, balance, '7f1e0b95adabf5b0baf01adbd7a5cc43418529a5729ecc977c091fc60e45d5af', '2BV5Epr7CUaQs9khfU4zEKj51bmc6bpEVXdxz5UPNBn', 3)
       .then ((data) => {
            console.log(data);
       })
       .catch ((error) => {

       })
    })
    .catch ((error) => {

    });

    // File Contract
    Quras.api.qurasDB.getBalance('MainNet', "2BV5Epr7CUVshjH3LjPBvRXuRwymgqvAdkrswqxuVQT")
    .then ((balance) => {
        var merkleHash = '109c5bd496607dff0b3b1b4e6c9da8a096f0d55c138d853264ccc836d67ab990';
        Quras.api.qurasDB.setFileContract(Quras.CONST.DEFAULT_RPC.MAIN, balance, '109c5bd496607dff0b3b1b4e6c9da8a096f0d55c138d853264ccc836d67ab999', '2BV5Epr7CUVshjH3LjPBvRXuRwymgqvAdkrswqxuVQT', '2BV5Epr7CUaQs9khfU4zEKj51bmc6bpEVXdxz5UPNBn', merkleHash, 100, 1000, 3, 5, 10, 20)
        .then ((data) => {
            console.log(data);
        })
        .catch ((error) => {
            console.log(error);
        })
    })
    .catch ((error) => {

    });
}

//RegisterProviderInfo();

function RegProvider()
{
    Quras.api.qurasDB.getBalance('MainNet', "2BV5Epr7CUaQs9khfU4zEKj51bmc6bpEVXdxz5UPNBn")
    .then ((balance) => {
        Quras.api.qurasDB.setProviderInfo(Quras.CONST.DEFAULT_RPC.MAIN, balance, '7f1e0b95adabf5b0baf01adbd7a5cc43418529a5729ecc977c091fc60e45d5af', '2BV5Epr7CUaQs9khfU4zEKj51bmc6bpEVXdxz5UPNBn', '10000', '100', '192.168.1.1', '3000', '5', '10000', '5', '5')
        .then ((data) => {
            console.log(data);
        })
        .catch ((error) => {
            console.log(error);
        })
    });
}

//RegProvider();

function RegFileContract()
{
    Quras.api.qurasDB.getBalance('MainNet', "2BV5Epr7CUVshjH3LjPBvRXuRwymgqvAdkrswqxuVQT")
    .then ((balance) => {
        var merkleHash = '109c5bd496607dff0b3b1b4e6c9da8a096f0d55c138d853264ccc836d67ab990';
        Quras.api.qurasDB.setFileContract(Quras.CONST.DEFAULT_RPC.MAIN, balance, '109c5bd496607dff0b3b1b4e6c9da8a096f0d55c138d853264ccc836d67ab999', '2BV5Epr7CUVshjH3LjPBvRXuRwymgqvAdkrswqxuVQT', '2BV5Epr7CUaQs9khfU4zEKj51bmc6bpEVXdxz5UPNBn', merkleHash, 100, 2048, 3, 5, 10, 20)
        .then ((data) => {
            console.log(data);
        })
        .catch ((error) => {
            console.log(error);
        })
    })
    .catch ((error) => {

    });
}

//RegFileContract();

function Accept()
{
    Quras.api.qurasDB.getBalance('MainNet', "2BV5Epr7CUaQs9khfU4zEKj51bmc6bpEVXdxz5UPNBn")
    .then ((balance) => {
        Quras.api.qurasDB.acceptFileContract(Quras.CONST.DEFAULT_RPC.MAIN, balance, '7f1e0b95adabf5b0baf01adbd7a5cc43418529a5729ecc977c091fc60e45d5af', '56647132ae732a0f4ffeb30761db84bc471a6137e851001f5fddc7c61e3f41e2', '2BV5Epr7CUaQs9khfU4zEKj51bmc6bpEVXdxz5UPNBn')
        .then ((data) => {
            console.log(data);
        })
        .catch ((error) => {
            console.log(error);
        })
    });
}

//Accept();