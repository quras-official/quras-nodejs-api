---
id: api-rpc
title: RPC
---

`RPC` モジュールは次のように利用することができる。

```js
import QurasLib from 'quras-js'
const client = QurasLib.create.rpcClient(URL)

import { rpc } from 'quras-js'
const client = new rpc.rpcClient(URL)
```

## Classes

### RPCClient

RPC Clientは特定のQURASノードのように動作できる。RPCClientを使用してQURAS networkに簡単に接続してブロックチェーンで提供するRPC関数を利用することができる。ただしTransactionの実行はできない。

すべてのRPC呼び出すの戻し値はPromise形式である。

```js
import QurasLib from 'quras-js'
// Creates a RPCClient with URL of version 2.3.2
const client = QurasLib.create.rpcClient('http://{IP}:{PORT}', '{Version}')
// Returns block number
client.getBlockCount()
client.getRawTransaction('f5412dba662ec8023e6fc93dba23e7b62679e0a7bebed52a0c3f70795cbb51d2', 1)

// This will throw an error as invokefunction is not supported @ 2.3.2
client.invokeFunction(contractAddr,'name')

// Custom query
let query = QurasLib.create.query({method: 'custommethod'}
client.execute(query)
```

### Query

Queryオブジェクトはシンプルなrequest/response方式である。

```js
import QurasLib from 'quras-js'

// Custom query
const query = QurasLib.create.query({method: 'newmethod', params: [arg1, arg2]})
const response = query.execute('http://mycustomqrsnode.com:10039')

import { rpc } from 'quras-js'
// Simple query creation and execution
const response = rpc.Query.getBlock(1).execute('http://mycustomqrsnode.com:10039')
```

### Network

Networkクラスは該当QURASブロックチェーンのNetwork情報を管理するクラスである。

```js
import QurasLib, { rpc } from 'quras-js'

const newNet = new rpc.Network({name: 'NewNet'})
QurasLib.add.network(newNet)

console.log(QurasLib.settings.networks['NewNet'])
```
