---
id: wp-jsonrpc
title: JSON RPC for QURAS node
---

<p>QURASブロックチェーンのノードはJSON-RPCサービスを提供することとしてQURASブロックチェーンを利用して開発者がいろいろなPlateform開発を進めることができるようにサポートしている。</p>
<p>開発者はQURAS開発チームで提供するノードに接続したり自分のFull Nodeを利用してJSON-RPCサービスを利用することができるしQURASブロックチェインと結合された様々なサービス開発を進められる。</p>

## ブロックチェーン関連のJSON-RPC

### Get Block Method

<p>このCommandはパラメーターに該当したブロックの情報を得るのに利用される。</p>

#### パラメーターの説明

パラメーターを2つの形式として指定できる。
1.	ブロックのHash値をパラメーターとしてできる。 <br/>
ブロックのHash値に該当したブロックの情報を得てくるようになる。
2.	ブロックの番号をパラメーターとしてできる。 <br/>
ブロックの番号に相当したブロック情報を得てくるようになる。

#### 例


### Get Block Count Method

<p>このメッソドは現在Main Chainのブロックの長さを得てくるメッソドである。</p>

#### パラメーターの説明

パラメーターは存在しない。

#### 例

### Get Block Hash Method

<p>このメッソドはパラメーターから受け取ったindexの値に該当したブロックに対するHash値を得るメッソドである。</p>

#### パラメーターの説明

`Index` : ブロックのHash値を得ようとするブロックの番号を示す。

#### 例


### Get Block SysFee Method

<p>このメッソドはパラメーターから受け取ったindexに該当したブロックのfeeを得るメッソドである。</p>

#### パラメーターの説明

`Index` : 手数料を得ようとするブロックに該当した番号を示す。

#### 例

## WALLET 関連の JSON-RPC

### Get New Address Method

このメッソドは現在ノードに新しいWalletを生成するメッソドである。<br/>
しかしこのメッソドを実行する前にあなたのノードはWallet DBを開いておいた状態でなければならない。

#### パラメーターの説明

パラメーターは存在しない。

#### 例

### Send Raw Transaction Method

このメッソドはQURASブロックのチェーンにTransactionを伝送する場合利用されるメッソドである。

#### パラメーターの説明

`Hex` : Transactionの署名を進行した後、16進数形式の文字列として入力する。

#### 例

### Get Balance Method

現在ノードが開いているWalletの残高を得てくるメッソドである。

#### パラメーターの説明

`Asset _ id`: 資産形式としてQURAS CoinあるいはQURAS GASを指すことになる。<br/>
`QURAS Coin残高の場合` :<br/>
`QURAS GAS残高の場合` :

#### 例

### Dump Priv Key Method

現在ノードが開いているWalletで当該指定されたアドレスに対するPrivate Keyを得てくるメッソドである。

#### パラメーターの説明

`Address` : Private Keyを得てくるアドレスである。

#### 例

## SMART　CONTRACT関連のJSON-RPC

### Get Contract State Method

ContractScriptHashからContractに対する情報を得てくるメッソドである。

#### パラメーターの説明

`Scripthash` : Contractに対するScriptHashである。

#### 例

### Get Storage Method

このメッソドは当該Contract scripthashに保管されているStorage keyに該当した値を得てくるメッソドである。

#### パラメーターの説明

`Scripthash` : Contractに対するScriptHashである。<br/>
`Key` : contractの保存スペースから見つけることができる16進数形式のkey値である。 

#### 例

### Invoke Method

このメッソドは与えられたパラメーターとしてscripthashに該当したsmart contractを呼び出して結果を得てくるメッソドである。
このメッソドはVMの状態でブロックチェーンにすでにある値に対するTestだけを進行してブロックチェーンには反映されていない。

#### パラメーターの説明

`ScriptHash` : Smart Contractに対するscripthashである。<br/>
`Params` : Smart Contractを呼び出す時に入力されるパラメーター列である。

#### 例

## その他のJSON-RPC

### Get Connection Count Method

現在ノードが連結されているノードの数を得てくるメッソドである。

#### パラメーターの説明

パラメーターは存在しない。

#### 例

### Get Raw Mempool Method

現在ノードのMemPoolを調査して処理されていないTransactionのリストを得てくるメッソドである。

#### パラメーターの説明

パラメーターは存在しない。

#### 例

### Get Raw Transaction Method

パラメーターに設定されたTxHashの値についたTransaction情報を得てきている関数である。

#### パラメーターの説明

`TxHash` : Transaction Hash値を示す。<br/>

`Type` : 0であればTransactionのraw形式で得る。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1であればTransactionのfull形式で得る。

#### 例

### Get TX Out Method

<p>このメッソドはTransaction Hashに対するTransactionから送られていないTransaction Outputの項目を得てくるメッソドである。</p>
<p>もしすべてのTx Output項目が送られたなら、結果はnull値を得る。</p>

#### パラメーターの説明

`TxHash` : Transactionに対するHash値
`Index` : Transaction Output列で索引の値である。始まりは0から始める。

#### 例

### Get Peers Method

このメッソドは現在ノードに接続されであったか接続が切れたノードに対する情報を得てくるメッソドである。

#### パラメーターの説明

パラメーターは存在しない。

#### 例