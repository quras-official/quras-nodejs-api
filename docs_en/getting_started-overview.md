---
id: overview
title: Overview
---

``quras-js`` is a Javascript library to interface with QURAS blockchain, providing quick and easy methods to send RPC calls, create transactions and simple contract invocations.

## Features

- Built-in RPC queries
- Wallet key manipulation
- Transaction creation, serialization and deserialization

## Future Features

- Smart Contract script builder
- 3rd party API support ex: qurasDB

## Usage

``quras-js`` can be used in 2 ways:

### Semantic

The default import for QurasLib is a Javascript object where functions are arranged in a semantic manner following the convention of Verb-Noun.

```js
import QurasLib from 'quras-js'
QurasLib.create.privateKey()
QurasLib.get.publicKeyFromPrivateKey(privateKey)
QurasLib.serialize.tx(transactionObj)
```

This style is recommended for beginners or anyone who just wishes to use QurasLib without hassle.

### Named

Named imports are the conventional JS imports. The modules in QurasLib are:

- `api`
- `CONST`
- `rpc`
- `sc`
- `tx`
- `u`
- `wallet`

```js
import { api } from 'quras-js'
```

This style offers more control and flexibility. Do refer to the source code for each module's exports.
