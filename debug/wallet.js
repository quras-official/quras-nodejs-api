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

const ico_account = new Quras.wallet.Account('8488eb4be90c73650723277c43464f751b976c0954f0cc305ed1260dbc87f7d0')
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

// Quras.api.qurasDB.getClaimInfo(Quras.CONST.QURAS_NETWORK.MAIN, 'Dm8YXM7TV9QPmKPzedmEYdHz9HPr831VMd')
// .then((data) => {
//     var tx = Quras.tx.Transaction.createClaimTxWithQurasDB('Dm8YXM7TV9QPmKPzedmEYdHz9HPr831VMd', data['available']);
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

// Quras.api.qurasDB.getMyMultiSignAddresses(Quras.CONST.QURAS_NETWORK.DEV, 'Ds4QWGvHf72g4bHz5zcgJK4v6BE1x3YLQy')
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
    assetData['priKey'] = '5d3008d4da65af0a86604bf16049fab831d1077229657cd6139b1dfdec52955b';                  
    assetData['tokenName'] = 'TOKEN_T_N';
    assetData['totalSupply'] = 100000;
    assetData['precision'] = 8;
    assetData['afee'] = 0.5;
    assetData['tfeeMin'] = 0;
    assetData['tfeeMax'] = 1;

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
    Quras.api.qurasDB.getBalance(Quras.CONST.QURAS_NETWORK.MAIN, 'DX4TWAha5pM9hVsxD4QRoyac1ubHLMJXqC') // Get the balance of from address.
    .then((data) => {
        const balance = new Quras.wallet.Balance(data)
        var scriptHash = Quras.wallet.getScriptHashFromAddress('DX4TWAha5pM9hVsxD4QRoyac1ubHLMJXqC'); // To address.
        const outputs = [{
                assetId: Quras.CONST.ASSET_ID["XQC"], // The type of coins that you want to send.
                value: 0.6 , // Coin amount to send.
                fee: 0.2, // fee.
                scriptHash: scriptHash // The scripthash of "To address".
            }]
        
            const testTx = Quras.tx.Transaction.createContractTx(balance, outputs) // create a transaction.

            getFromAddress(Quras.CONST.QURAS_NETWORK.MAIN, testTx);
        
            // testTx.sign('8488eb4be90c73650723277c43464f751b976c0954f0cc305ed1260dbc87f7d0'); // Sign the transaction using private key
        
            // rpcServer.sendRawTransaction(testTx.serialize()) // Send the transaction to RPC Server.
            // .then((data) => {
            //     console.log(data);
            // })
            // .catch ((error) => {
            //     console.log(error);
            // });
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
    var testTx = Quras.tx.Transaction.getMultiSignTx('eyJ0eXBlIjoxMjgsInZlcnNpb24iOjAsImF0dHJpYnV0ZXMiOltdLCJpbnB1dHMiOlt7InByZXZIYXNoIjoiNDYxM2IzMDZmOGU5MzVkOTZhMmU2MWFkZmEyY2JmNTljOTBmZTcyYjAxMjFmNTcwYTQ5NGU1MmFhODU4NDU5NiIsInByZXZJbmRleCI6MH0seyJwcmV2SGFzaCI6IjNlOGY4OWEyOGE3MjAyNDVkYTE2MDZmNDA0YTY0Y2MwNmEyNDY0NWQ2ZTIxMzc5ZDM0YmJhM2UxNDAyNjhkN2UiLCJwcmV2SW5kZXgiOjB9XSwib3V0cHV0cyI6W3siYXNzZXRJZCI6IjBmZWRkMDVlMzQyYzk2ODk2OTJlZWFhNWJlYWQ5ZjZmOTBlYjU3NmQyNjhlNDEzNzczZjMyMzg4ZWIyOTliZDQiLCJ2YWx1ZSI6IjEwMCIsInNjcmlwdEhhc2giOiIwZDc3ZDY4M2FkYjkwMGVjZDNjMDY1YmEwM2FmMzM1ZjNiOTA5NmViIiwiZmVlIjoiMTAifSx7ImFzc2V0SWQiOiIwZmVkZDA1ZTM0MmM5Njg5NjkyZWVhYTViZWFkOWY2ZjkwZWI1NzZkMjY4ZTQxMzc3M2YzMjM4OGViMjk5YmQ0IiwidmFsdWUiOiI5OTAwIiwic2NyaXB0SGFzaCI6IjdhNDdjMTU1ODJmZTQxY2I1Y2U5ODljODI3ZGIxYjMxOTNiYTk4ZjQiLCJmZWUiOiIwIn0seyJhc3NldElkIjoiYTQ5MjU5NDAwMWIzNzdjZDI2MmI3YWY4MmUzYTY2ZGM4YjQ2ODZjYTgwYjUzNDNkYTQ1NGVhYzAyMzM1NDlhOCIsInZhbHVlIjoiOTk5MCIsInNjcmlwdEhhc2giOiI3YTQ3YzE1NTgyZmU0MWNiNWNlOTg5YzgyN2RiMWIzMTkzYmE5OGY0IiwiZmVlIjoiMCJ9XSwic2NyaXB0cyI6W3siaW52b2NhdGlvblNjcmlwdCI6IjQwNmRhNmEyMTdkZTk2OTY3YjEzNDc1NzVhNDQzZTcwNDI3Njk4MmU4YzY5YmNiMTZmZmY1MDgxNTFiNmI4MWMxMWE2MTFhM2VmOTQyZWY2ZjE2Y2RhMDRhN2I4ZjZlMzI4MDAwNDJjYjgyNDRhOWRmNmI1ZmRiOWM5MDQ0MjQyMDUiLCJ2ZXJpZmljYXRpb25TY3JpcHQiOiI1MjIxMDM2N2JkMmZkNjNiNmM1MTY2OTkyNTg1YWY4ODI0NDM0NDc5NTg4MGNkNjEwNjYzYzIwNTI2ZTFmMWM0NWFhM2I5MjEwMjc4NWE4NDQzMTY5OGRjOTk4MmUzNTUyZWZjNTllMmE3YjBkMjhjNDBhMDI1MzliMjI5MDk5MDgyOTNjNGI3NzUyMTAyY2VhNDYzNDRmMDNmZDFhNjM1MmE0Y2VkMTE1MWNlYTYxMjQzOGMwNzY3OWE5YmE0OGVhOTE0NzMxNDg2N2JlNTUzYWUifV0sImV0YyI6eyIwMmNlYTQ2MzQ0ZjAzZmQxYTYzNTJhNGNlZDExNTFjZWE2MTI0MzhjMDc2NzlhOWJhNDhlYTkxNDczMTQ4NjdiZTUiOiI0MDZkYTZhMjE3ZGU5Njk2N2IxMzQ3NTc1YTQ0M2U3MDQyNzY5ODJlOGM2OWJjYjE2ZmZmNTA4MTUxYjZiODFjMTFhNjExYTNlZjk0MmVmNmYxNmNkYTA0YTdiOGY2ZTMyODAwMDQyY2I4MjQ0YTlkZjZiNWZkYjljOTA0NDI0MjA1In19');

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

ClaimMultiSign();

function RegisterMultiSignTransaction()
{
    // var tx = Quras.tx.Transaction.createRegisterMultiSignTx('033a8bc8e815458cc910f800d7fca5bda1be9040297f4dc3f4015eade9571119ce');
    // console.log(Quras.tx.getMultiSignWalletTxRawData(tx));
    // tx = Quras.tx.Transaction.joinMultiSignWallet(tx, '03c50eab4b3d9e7ba3304265eaa9bd05c1a7c60e5adefe69b18042fc1f5da4ec40');
    // console.log(Quras.tx.getMultiSignWalletTxRawData(tx));

    var tx = Quras.tx.Transaction.getMultiSignWalletTx('eyJtdWx0aXNpZ19yZWRlZW1fc2NyaXB0IjoiMHgyZmI4Y2FmYzljNjJmY2ExMzVlYjkyNTk3MWVkNTNmNzA5MWRjNTZiIiwidmFsaWRhdG9yc19jb3VudCI6MSwidmFsaWRhdG9ycyI6WyIwMmNlYTQ2MzQ0ZjAzZmQxYTYzNTJhNGNlZDExNTFjZWE2MTI0MzhjMDc2NzlhOWJhNDhlYTkxNDczMTQ4NjdiZTUiXX0=');

    tx = Quras.tx.Transaction.joinMultiSignWallet(tx, '0367bd2fd63b6c5166992585af88244344795880cd610663c20526e1f1c45aa3b9');

    var scripthash = Quras.tx.Transaction.getMultiSignScriptHash(tx);

    var addr = Quras.wallet.getAddressFromScriptHash(scripthash);

    var parsedTx = Quras.tx.Transaction.getMultiSignWalletTx(Quras.tx.getMultiSignWalletTxRawData(tx));
    console.log(parsedTx);

    tx.sign('bb0e2a6e667dd396c77d13398e4886fed7d31c14e48fc471896a7200ba2e6358'); // Sign the transaction using private key
            
    devRpcServer.sendRawTransaction(tx.serialize()) // Send the transaction to RPC Server.
    .then((data) => {
        console.log(data);
    })
    .catch ((error) => {
        console.log("error");
    });
}

// RegisterMultiSignTransaction();

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
            }]
        
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
//IssueTx()

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