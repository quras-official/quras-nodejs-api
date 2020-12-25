<p align="center">
<img
    src="http://blockapi.quras.io/quras/img/logo1.png"
    width="200px">
</p>

## Table of Contents
1. [Overview](#overview)
2. [Getting started](#getting-started)
3. [Modules](#modules)
4. [Runtime Environment](#runtime-environment)


## Overview
The repository contains  QURAS Light Wallet's JS SDK for the QURAS blockchain platform.

It is currently in use by [QURAS](https://github.com/QurasWallet/quras-wallet/).

Visit the [docs](https://quras.io/quras-js) to learn how to use this library.

## Getting started

### Installation

Install the package using:

```js
npm i quras-js
```

### Build

```js
npm run build:dev
```

### Tests

```js
npm run test
```

### Docs

The docs are stores in [quras.io](https://quras.io/quras-js) while the main website and its configuration is in `./website`.

```bash
cd website
npm install
npm run start
```

### Typescript

The typescript declaration files are included _(no need of any @types/...)_.

### Future Features

  "basic_sendasset"
  "basic_claimgas"
  "basic_createscript"
  "basic_invoke"
  "basic_privnet"
  "adv_multitx"
  "adv_apicore"



## Modules

### api
The _api_ module contains code that interfaces with external APIs as well as providing a high level abstraction.

### wallet
The _wallet_ module deals with key manipulating as well as importing and exporting of wallet files.

### tx
The _tx_ module deals with transaction creation, serialization and deserialization.

### sc
The _sc_ module deals with smart contract script construction. It is used primarily to construct scripts that can be carried by InvocationTransaction.

### rpc
The _rpc_ module deals with the RPC interface exposed by the QURAS node.

### u
The _u_ module is the utilities module containing methods handling the various data transformation aspects within QURAS.

### CONST
The _CONST_ module is a collection of constants and defaults used across all modules.


## Runtime Environment
|OS Type|Version|
|---|---|
|Windows|any|
|linux|any|
|other|any OS that supports 'npm' environment|