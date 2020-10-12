---
id: wp-virtualmachine
title: The structure of the QURAS VM
---

<p>QURASブロックチェーンはSmart Contractを実行するためにエンジンにVirtual Machineを持っている。</p>
<p>ここではQURASブロックチェーンのVirtual Machineの構造について見ることにしよう。</p>
<p>Virtual Machineについて見る前にSmart Contract参照して欲しい。</p>
<p>Smart ContractはOpcodeのByte列で構成されている。</p>
<p>またユーザたちはSmart ContractをC#を利用して作成してSmart Contract Compilerを利用してOpcodeの列であるByteコードを得ることになる。</p>
<p>まずはSmart Contract Compilerについて見ることにしよう。</p>

## Smart Contract Compiler

<p>Smart Contract Compilerはユーザが作成したSmart Contractコード(ユーザLevelのC#コード)QURASブロックチェーンのVMで実行できるOPCODEの列であるScriptコードに変換させる役割を遂行する。</p>
<p>ユーザたちはSmart ContractをQURASブロックチェーンで提供するFrameworkを利用して開発し、そのコードをVMで認識できるScriptに変換させる役割をこのSmart Contract Compilerを利用してすることができる。</p>

## Opcode

<p>QURAS Smart Contract Virtual Machinは次のようなOpcode Setを提供する。</p>
<p>VMで提供するOpcode内容は大きく次のようである。</p>

  -	文字列関連のOpcodeの集まり
  文字列関連処理などを提供する。
  -	スタックの操作と関連したOpcodeの集まり
  CやC++で提供するスタックの操作のような命令を提供する。
  -	Process操作と関連したOpcodeの集まり
  If、forと同じような命令を提供する。
  -	定数関連のOpcodeの集まり
  Constのような命令を提供する。
  -	算術演算と関連したOpcodeの集まり
  +、-、*、/のような算術演算と関連した命令を提供する。
  -	暗号化と関連したOpcodeの集まり
  ユーザたちが暗号化を利用できるようにECDSA、SHAと他のさまざまなアルゴリズムを利用できるように提供する。
  -	データの構造と関連したOpcodeの集まり
  このOpcode関連命令には配列と複雑な形の資料の構造を定義できるように提供する。

## Opcode Fee

<p>手数料には2つの方式のFeeが存在する。</p>
<p>その二つの点について見ることとしよう。</p>

### Deployment Fee

<p>QURASブロックチェーンでユーザたちはSmart Contractで提供する保存スペースを利用して様々なサービスを開発利用できる。</p>
<p>その時保存スペースに対する使用は無料ではない。</p>
<p>QURASブロックチェーンでユーザたちはSmart Contractを作成してそれをブロックチェーンにDeployさせてユーザがその内容を利用できるようにする。</p>
<p>ユーザたちはSmart ContractをDeployさせる時保存スペースとSystem Callなどについて手数料を支払わなければならない。</p>
<p>つまりDeployment FeeはSmart ContractをDeployさせる際に利用される手数料である。</p>

### Implementation Fee

<p>QURASはSmart Contractに対する安全的な実行環境を用意してすべてのノードからSmart Contractに対する結果がすべてのノードで同一に得られるように設計されてすべてのノードはスマートコントラクトを実行するためにfeeを払わなければならない。</p>
<p>また手数料はSmart Contractの計算ロジックつまりOpcodeについて決定されることになり、単位はQurasToken単位である。</p>
<p>もしFeeが不足すればSmart Contractは失敗することになる。</p>
<p>すべてのユーザたちはQurasToken 10に該当したSmart Contractについた無料で利用できる。</p>

## VMの機能

<p>QURASブロックチェーンでSmart Contract実行結果はすべてのノードで一致しなければならない。</p>
<p>もしSmart Contractの実行結果がノードによって変わったらTransactionに対する検証結果と合意を進めることができなくなる。</p>
<p>この時C、C++や体系CPUの形式によって実行結果が違うことが存在する。</p>
<p>またシステムが32bitのか64bitのかによってintとようなデータの大きさが変わることとして計算結果が変わる可能性もある場合が存在する。</p>
<p>しかしQURASブロックチェーンのSmart Contractの実行結果はすべてのノードすなわちどのようなCPU、OS環境に関係なく同一の結果を出さなければならない。</p>
<p>ブロックチェーンはすべてのノードの同一状態のブロックチェーン帳簿によって運営されるためにノードに存在するブロックのデータが変われば、ブロックチェーンを維持することはできない。</p>
<p>このような問題点としてQURASブロックチェーンのSmart Contract VMはすべての環境で同じ入力に対して同一の結果物を出るように設計されなければならない。</p>
<p>つまりQURASブロックチェーンは一貫性の特徴を持たなければならない。</p>
<p>それではQURASブロックチェーンで一貫性の特徴について見ることにしよう。</p>
<p>一貫性ではじめは時間である。</p>
<p>すべてのノードはブロックの合意でブロックにTimeStampのような項目が存在する。</p>
<p>もしSmart Contractに時間関連関数を利用する時ノードから得られる時間が全て差があれば、結果は変わることになるだろう。</p>
<p>つまりQURASブロックのチェーンに参加したノードの時間同期化は必須である。</p>
<p>これからQURASブロックチェーンに参加するすべてのノードはシステムの時間同期化を進めた状態で連結することを要求しており、それによってQURASブロックチェーンに連結されるように設計した。</p>
<p>こうすることによってSmart Contractで時間同期の問題を解決した。</p>
<p>次はランスの発生と関連した問題である。</p>
<p>ランスの発生はすべてのノードによってお互いに異なる結果を発生させることができる。</p>
<p>分散されたネットワークでこのような問題を解決するために出た方法がランスの発生にSeedの概念を導入することである。</p>
<p>つまりSeedを導入して同じのSeedに限って同じ結果が出るように設計されたランス発生器を利用してブロックチェーンで同期化を実現することができる。</p>
<p>QURASブロックチェーンではブロックのHash値をSeedで利用してランス発生器を利用することになる。</p>
<p>また提起れる可能性がある問題はSmart Contractで利用される保存スペースのデータに対する一貫性を保障することである。</p>
<p>QURASブロックチェーンでは分散帳簿を利用しているのでデータに対する決定性はすべてのノードで同じである。</p>
<p>またSmart Contractの保存スペースに保存されたデータはただContractのみがアクセスすることができるものとして決定論的だと見ることができる。</p>
<p>これにしてブロックチェーンで発生するすべてのノードの状態はすべて同一に管理できるようになる。</p>

## SMART CONTRACTの類型

<p>QURASブロックチェーンで提供するSmart Contract類型には実行方式によって次のように分けられる。</p>

### Verification Contract

<p>QURASブロックチェーンを見ると他のビットコインのようにpublic-keyによって管理されるアドレス方式ではなくContractアドレス方式を利用する。</p>
<p>QURASブロックチェーンでは全てのアドレスはScriptHashによって生成される。</p>
<p>ScriptHashはSignコードを検証できるOpcodeのロジックが入っている。</p>
<p>QURASブロックチェーンのアドレスはこのScriptHashによって作られるようになり、アドレスの帯域も一つのContractと見ることができる。</p>
<p>つまり一般的なコイン伝送を見れば一つのContractで見られるし、Transactionが発生すればSignの検証をScriptHashのOpcodeを実行して進行するようになっている。</p>
<p>こうしたContractをVerification Contractと呼ぶが、これの入力としてSign値とScriptHash値が入って戻す値ではただBool型としてtrueとfalseの間の一つの値を持つ。</p>
<p>つまりこのようなContractは戻す値の結果によってtrueの場合はブロックチェーンに入ってfalseの場合は失敗で認めてTransactionがなくなっている。</p>

### Application Contract

<p>このTransactionはQURASブロックチェーンのSmart Contractで一番多く利用されるContractである。</p>
<p>このTransactionは特定のTransactionによって実行されるが実行されながらシステムの状態に対するアクセスと更新を進めることができるし、またContract Storageの値を変更し、照会することができる。</p>
<p>Application ContractはTransactionを発生した場合、Contract ScriptによってFeeを払わなければならず、Feeが足りない場合Application Contractは失敗に終わることになる。</p>

### Function Contract

<p>Smart Contractを作成するときにユーザは他のContractで呼び出すことができるように関数をPublic型とすることができる。</p>
<p>このような場合利用できるContractとしてFunction Contractが存在する。</p>
<p>つまりSmart ContractユーザたちはすでにDeployされたSmart ContractのFunctionを呼び出す時、そういうContractを使用することになる。</p>

