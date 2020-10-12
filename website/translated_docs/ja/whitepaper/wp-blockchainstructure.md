---
id: wp-blockchainstructure
title: Structure of QURAS Blockchain
---

QURASブロックチェーンの直観的な表象を立てるために次の図を参照する。<br/>
<center>![/quras-js/img](/quras-js/img/whitepaper/StructureOfBlockchain.png)</center>
<center>図1. QURASブロックチェーンの直観的な構造</center><br/>
<p>上記の図をみるとブロックチェーンには大きくFull Node、Light Node、Consensus Nodeが存在することになる。</p>
<p>ブロックチェーンが維持されるためにはConsensus Nodeが存在することが必要である。</p>
<p>Consensus Nodeはブロックチェーンでブロックを生成していくノードである。</p>
<p>Consensus NodeでTransactionの検証とSmart Contractの実行が行われる。</p>
<p>Consensusアルゴリズムについては後で具体的に説明されているからここでは言及しない。</p>
<p>Full Nodeの役割は発生したTransactionの検証とbroadcastなどを進め、WalletとWebサイトのエンジンとして動作するようになる。</p>
<p>Full Nodeは現在ZK-SNARKSアルゴリズムが実装されている。</p>
<p>すなわちすべての類型のTransactionを提供することになる。</p>
<p>Light NodeはPC用Light Walletで利用するようになる軽量化されたエンジンと見ることができる。</p>
<p>Light Nodeはブロックチェーンのブロックを全部ダウンロードしないから保存スペースを多く要求しない。</p>
<p>Light NodeはLight Walletだけで利用されるように設計されているから、不要な機能が無く、Walletに必要な機能だけを実装するとしている。</p>


## P2P 通信の構造

<p>ブロックチェーンは特定のサーバがなくて全てのノードがP2P方式で連結して動作するシステムである。</p>
<p>つまりQURASブロックチェーンのすべてのノードはP2P方式で通信を進行する。</p>
<p>この部分ではQURASブロックチェーンのFull Node、Light Node、Consensus Nodeの間に行われている全ての通信構造がどのようになって、どのように反映されるかを具体的に記述することになる。</p>
<p>ノードの間に行われている全ての通信は全部ここで記述されるようになる。</p>
<p>QURASブロックチェーンで行われている全ての通信はQurasMessageの通信構造によってすべての通信部分がカプセル化されて進行されるようになる。</p>
<p>それではQurasMessageの構造を見て個別的な通信部分について説明する。</p>

### QURASMESSAGEの構造

<p>QurasMessageの構造は次のようである。</p>

項目 | 説明
--- | --- 
Network Type(Magic) | Magicの項目はNetworkのタイプを示しるとしてQuras BlockchainでMainnetとTestnetを区別するための項目になる。
Command | メッセージの指令としてこの項目の値によってメッセージの基本使命が分かれるようになる。<br/>Commandに対する説明はの下記で進行する。
Checksum | Payloadの項目のChecksumとしてPayloadのが正しいかどうかを区別するために利用される項目である。
Body (Payload) | この項目はCommandによってメッセージの基本Body部分と見ることができる。<br/>この項目の構造についてはCommand部分と共に下記で説明する。

<center>表1. QurasMessageの項目</center> <br/>

<p>QURASブロックチェーンで行われている全てのパケットの通信は上記のQurasMessage構造に合わせて進められることになる。</p>
<p>QURASブロックチェーンのすべてのノードはQurasMessageを受ければ次のような認証を進める。</p>

  - ロコルのNetwork TypeとQurasMessageのNetwork Typeを比較して同じ場合には次の段階を遂行し、そうではなければ連結を切ってしまう。
  -	PayloadのChecksumを計算してQurasMessageのChecksumと比較して同じ場合には次の段階を遂行し、そうではなければ連結を切ってしまう。
  -	Bodyの項目の長さを検査して、長さが0x2000000より大きい場合は連結を止め、そうではなければPayloadの項目を解釈する。

<p>QURASブロックチェーンは上記の3種に対する検査を進め、QurasMessageの正確性を検証する。</p>
<p>それではQURASブロックチェーンの通信メッセージでどのようなCommandがあり、それに該当したBodyの項目はどんな構造を持っているのかについて説明しよう。</p>

#### SYN Command

<p>このメッセージはノードの間に連結を確立するためにノードの情報を交換するメッセージである。</p>
<p>SYN CommandのBody部分は次のようである。</p>

項目 | 説明
--- | --- 
Protocol Version | 現在ノードのProtocol Versionとしてノードエンジンの通信部Versionを意味する。
Module Services (Services) | この項目は現在QURASブロックチェーンのノードネットワークについた状態を表示している項目である。
Timestamp | メッセージが生成された時間を表現する。
Port | 現在ノードがメッセージの送受信するPortを意味する。
Nonce | この項目はメッセージを送ったノードを識別するためにRandomに割り当てられた数値を意味する。
User Agent | 現在ノードのビルドバージョンを意味する。
Block Start Height (StartHeight) | 現在ノードのLocalブロックのサイズを意味する。
Relay | パケットを伝えるものかどうかを決定している項目である。<br/>一般的にTrueの値に設定する。

<center>表2. Version Commandの項目</center> <br/>

<p>すべてのノードはSYN Commandを通じて該当Remoteノードの状態を知ることができるし、どのノードからブロックをはじめ必要な資料の提供を受けられるかを決定することになる。</p>

#### ACK Command

<p>このメッセージはBody部分がない。</p>
<p>このメッセージは当該ノードがSYNメッセージを受けた時、回答に送るメッセージである。</p>
<p>つまりSYNメッセージに対する検証を確認してRemoteノードと連結を確立するという意味で送られるSYNに対する回答メッセージである。</p>

#### GetBlocks Command

<p>このメッセージは当該ノードがブロックをダウンロードするために送るメッセージである。</p>
<p>メセジのBodyの項目は次のようである。</p>

項目 | 説明
--- | --- 
Start | ダウンロードしようとするブロックの開始ブロックを意味する。
End | ダウンロードしようとするブロックの最後ブロックを意味する。
<center>表3. GetBlock Commandの項目</center> <br/>

<p>このメッセージはRemoteノードから自分のロコルブロックチェーンをSyncするために利用されるメッセージとして上記の項目を設定してRemoteノードに送られる。</p>

#### Addr Command
<p>このメッセージは自分と連結されているRemoteノードの情報を要請したノードに送る時利用されるメッセージである。</p>

項目 | 説明
--- | --- 
Address List | 自分と連結されているノードの情報をList形式にまとめて送るようになる。
<center>表4. Addr Commandの項目</center> <br/>

<p>この時Address Listの項目の意味は次のようである。</p>

項目 | 説明
--- | --- 
Module Services | この項目は現在QURASブロックチェーンのノードのネットワークについた状態を表示している項目である。
Timestamp | この項目はロコルノードと連結された時間を意味する。
Protocol Version | 現在ノードのProtocol Versionとしてノードエンジンの通信部Versionを意味する。
End Point | 現在ノードのNetwork情報である。つまりIPアドレスとPort番号を意味する。
<center>表5. Address Listの項目</center> <br/>

<p>すなわちすべてのノードはAddrメッセージを受けて他のノードの情報に基づいて連結を確立してQURASブロックチェーンのP2Pに接続を行うことになる。</p>

#### GetHeaders Command

<p>このメッセージは当該ノードがブロックのHeader部分をダウンロードするためにRemoteノードに送るメッセージである。</p>
<p>このメッセージのBody部分はGetBlocksメッセージと同じである。</p>

項目 | 説明
--- | --- 
Start | ダウンロードしようとするブロックの開始ブロックを意味する。
End | ダウンロードしようとするブロックの最後ブロックを意味する。
<center>表6. GetHeaders Commandの項目</center> <br/>

<p>このメッセージはFullNodeとLightNodeで実装されるようになる。</p>
<p>特にLightNodeはブロックのHeader部分だけダウンロードしことになる。</p>

#### Mempool Command

<p>MempoolはノードのTransactionの保存空間を意味する。</p>
<p>このメッセージは当該RemoteノードとTransactionを同期化するために呼び出されるメッセージである。</p>
<p>このメッセージはBody部分がない。</p>
<p>すなわちこのメッセージの用途は、現在発生されたTransactionを同期化する目的で呼び出されるメッセージである。</p>

#### GetAddr Command

<p>このメッセージは次のような場合利用することになる。</p>
<p>すべてのノードは自分と連結されたノードの情報をPeerListで保管している。</p>
<p>それはノードが再起動とか再度インターネットに連結される時再びP2Pブロックのチェーンに連結するためである。</p>
<p>QURASブロックチェーンはServer/Client方式ではなくP2P方式であるため、全てのノードはどのような特定にサーバに連結されるではなく、任意の複数のノードと連結して一つの大きなP2Pネットを形成することになるのである。</p>

  1)	このメッセージを利用するようになる場合の最初の場合はノードが初めて起動される場合、ノードのPeerListに何もない時である。この場合ノードはブロックチェーンのSeedNodeと呼ばれるノードに接続してこのメッセージを送信する。 すなわちこのメッセージを利用して連結可能なノード情報を得てQURASブロックチェーンのP2Pネットに連結されることである。

  2)	二番目の場合はノードがPeerListは持っているが、PeerListのノードの個数あるいは現在連結されているノード数が標準に連結するノード数より少ない場合である。つまり標準でノードは6台程度と連結することが必要であるが、現在ノードに接続されているノード数は2と仮定しよう。このような場合、ノードは連結している2台のノードにGetAddrメッセージを送って連結情報を確保することができる。 P2PネットのすべてのノードはGetAddrメッセージを受けると、自分に連結しているノードの情報を照会し、最新の情報を収集して送ってくれる。

<p>上記の同じ方式でQURASブロックチェーンのすべてのノードはP2Pネットに連結されてブロックチェーンを形成していくことになる。</p>
<p>GetAddrメッセージはBody部分がない。</p>
<p>GetAddrの応答としてAddrメッセージが受けることになる。</p>

#### INV Command

<p>このメッセージはTransaction、Block、Consensusのハッシュ値を送るメッセージである。</p>
<p>Body部分に対する項目は次のようである。</p>

項目 | 説明
--- | --- 
Type | INVメッセージの形式を規定している項目である。<br/>0: Transaction<br/>1: Block<br/>2: Consensus
HashList | Typeの項目に該当したHashのListを意味する。
<center>表7. Inv Commandの項目</center> <br/>

<p>上記の項目の説明は次のようである。</p>

  1)	Type:0の場合Mempoolメッセージの応答としてTransactionのHashをList形式にしてHash Listに入れて送ることになる。
  2)	Type:1の場合GetBlocksメッセージを受けた時、回答としてブロックのStartからEndまでのブロックHash値をHash Listで作って送る。
  3)	Type:2の場合Consensus Nodeの間に進行される通信で利用されることになる。

<p>またこのメッセージはGetDataメッセージの回答でも動作するようになる。</p>

#### Tx Command

<p>このメッセージはGetDataメッセージの応答としてTransactionの情報を送るメッセージである。</p>
<p>このメッセージはまたInvメッセージの応答として要請するHashのTransaction情報を送るのにも利用されるようになる。</p>
<p>TxメッセージはBody部分としてTransactionの構造と同じである。</p>
<p>Transactionの構造は後で具体的に言及しようにする。</p>

#### Block Command

<p>このメッセージもTxメッセージと同様にGetDataあるいはInvメッセージの要請によって伝送されるメッセージである。</p>
<p>形式もTxメッセージと同様にGetDataあるいはInvメッセージのHashに該当したブルロク値をBody部分に入れて伝送されることとなる。</p>
<p>Blockの構造も後で具体的に言及しようにする。</p>

#### Merkle Block Command

<p>このメッセージは当該ブロックのブロックHeader値とブロックが持っているTransaction数、そしてTransactionで作られたMerkle Tree Hash値にBody部分を形成するようになる。</p>

項目 | 説明
--- | --- 
Block Header | この部分は後で具体的に説明する。(リンク)
Tx Count | ブロックに含まれているTransactionの個数を意味する。
Hash List | TransactionにMerkle Treeを形成し、そのMerkle Treeに対する配列値である。
<center>表8. MerkleBlock Commandの項目</center> <br/>

#### Consensus Command

<p>このメッセージは合意ノードの間やり取りするメッセージとして合意と関連した内容を含めている。</p>
<p>このメッセージについては、以下の リンクを参照する。</p>

#### Headers Command

<p>このメッセージはブロックのHeader値を要請し、すなわちGetheaders Commandから要請される応答として要求するHeader情報を抽出して伝送するメッセージである。</p>
<p>このメッセージのBody部分はブロックのHeader部分と同じであるから次のリンクを参照する。</p>

<p>上記のようなメッセージ構造を通じてQURASブロックチェーンのすべてのノードは要求するデータの通信を行うことになる。</p>


## WALLETの構造

<p>QURASブロックチェーンの二つの種類の提供することにコインの暗号化と透明性的な送受信を提供します。</p>

### TRANSPARENT WALLETの構造

<p>Transparent WalletはECC暗号化を利用してPrivate KeyとPublic Keyを生成してPublic KeyによってAddressを生成することになる。</p>
<p>ここで基本重要な問題はPrivate KeyとPublic Key生成とPublic Keyからユーザたちが使用するAddressをどのように生成するのかどうか、Private KeyとAddressを利用してTransactionの検証をどのように進行するのかについて具体的に説明している。</p>
<p>ECC暗号化(楕円曲線暗号)は楕円曲線の理論に基づく公開キー暗号化方式である。楕円曲線暗号化は他の公開キー暗号化に比べて(例えばRSA)より長さが短いキーを要求する利点がある。[1]</p>
<p>楕円曲線暗号方式は計算複雑性の理論によって理論上有限な時間に計算が可能であるが、実際に計算するにはあまりに長い時間がかかることを利用して出た暗号化方式である。</p>
<p>初期公開キー暗号化のRSAと同じ暗号化は2つ以上の素数に分けるのが長い時間かかるという理論的な基礎によって開発された。</p>
<p>ECC暗号化は知られた特定した点に対する無作為楕円曲線の離散対数を探すのが時間的に長くかかるという点で作られた。</p>
<p>暗号化の目的で楕円曲線は平面曲線の一種として次の方程式を満足する点の集合を意味する。</p>

<center>x^3+ax+ b=y^2</center>
<p>一般的なECC暗号化で利用される標準の楕円曲線式である。</p>
<p>ここでQURAS Walletで利用する楕円曲線は標準として提示されているsecp256r1である。</p>
<p>ECC暗号化については多くの文献が存在するためにここでは具体的に記述しない。</p>
<p>QURAS WalletのPrivate Keyの長さは32byteである。</p>
<p>このPrivate KeyはRandomで時間とデバイスなどの情報によって再度発行が不可能なアルゴリズムによりRandomで生成する。</p>
<p>Private KeyによってPublic Keyを生成する方式は以下のようである。</p>
<p>ECCのsecp256r1の標準でG点は次のようである。</p>
0x036b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296
<p>Public Keyは上記のG点とPrivate Keyから離散的に求められた値である。</p>
<p>この時得られるPublic Keyの長さは66byteになる。</p>
<p>この時Public Keyの初の33byteはX軸値を意味して次の33byteはY軸値を意味する。</p>

X Value (33byte)|Y Value (33byte)
--- | ---
66 Byte

<p>この時Y値が偶数か奇数かによって次のようにScriptHashを生成する。</p>
<p>Y値が偶数である場合にはXの初のbyteを02に設定する。</p>
<p>Y値が奇数の場合にはXの初のbyteを03に設定する。</p>

<p>ScriptHashを生成した次はScriptHashの長さは0x21byteである。</p>
<p>このScriptHashの一番前byteにAddress Versionの1byteを追加してHash160を取る。</p>
<p>そのHash160 Byte列をBase58エンコディンをすればAddressが出ている。</p>
<p>上記に説明を図式で表現すると次のようである。</p>

<center>![/quras-js/img](http://13.230.62.42/quras/img/whitepaper/GeneratingTransparentAddress.png)</center>
<center>図2. Transparent Addressの生成構造</center>

<p>QURASブロックチェーンでWalletを話す時には基本Private Keyを意味するし、このPrivate Keyはよく保管することを勧奨する。</p>
<p>またユーザーたちはPrivate Keyだけ保管していば様々なサービスあるいはWalletを利用してPublic KeyとAddressを手に入れることができるし、当該Addressに保管されているコインの残高を確認することができる。</p>
<p>またAddressの暗号化アルゴリズムは引き続き発展させていくつもりであり、ユーザがさらにコイン管理を安全にできるように研究を深化させるだろう。</p>

### ANONYMOUS WALLETの構造

<p>Anonymous Addressには大きく二つの類型がある。</p>
<p>Zk-Snarksを利用したAddress帯域とRing-Signatureを利用したAddressの帯域がある。</p>
<p>先にZk-Snarksを利用したAddress帯域について見てみるようにする。</p>

#### ZK-SANRKS ADDRESSの構造

<p>Anonymous walletのkeyはTransparent Keyと形式が違う。</p>
<p>Anonymous WalletのPrivate Keyの長さは31byteである。</p>
<p>Anonymous WalletのPrivate Keyもやはりrandom発生器によって作る31byteのrnadomのbyte列である。</p>
<p>Anonymous WalletではPrivate KeyをSpend Keyと呼ぶ。</p>
<p>このSpend Keyに基づいてReceiving Key、Viewing Key、Addressを生成することができる。</p>
<p>Receiving KeyはSpend KeyのPublic Keyと見ることができる。</p>
<p>Receiving KeyはSpend Keyからスカラー掛けを進めて得ることになるキーとしてSodiumのライブラリのcrypto_scalamult_base関数を利用して取得する。</p>
<p>もちろんこのアルゴリズムもECCアルゴリズムを利用して行われる。</p>
<p>Viewing KeyはSpend KeyからPRF関数を利用して作られるようになる。</p>
<p>PRF関数は自体で定義した関数であり具体的に見るためにはソースを参照して確認できる。</p>
<p>AddressはECCのPublic KeyとPublic EncKeyを組み合わせて構成される。</p>

<p>Anonymous Addressの構成図は次のようである。</p>


#### RING SIGNATURE ADDRESSの構造

## TRANSACTIONの構造

<p>QURASブロックチェーンは様々なTransactionを持っている。</p>
<p>この部分ではQURASブロックチェーンが提供する様々なTransactionに対して具体的に記述することになる。</p>
<p>Transactionの構造について記述する前にすべてのTransactionが共通に含めている項目と構造について説明するようにしよう。</p>

### TRANSACTION構造(共通部)

<p>ここで言及するTransaction構造はすべての類型のTransactionが含めている構造である。</p>
<p>今後、他のTransactionの構造を説明する時この部分についてはTransaction Fieldで表示しようとしている。</p>

項目 | 説明
--- | --- 
Transaction Type | TransactionのタイプとしてこのタイプによってTransactionの構造とTransactionの使命によって変更される。
Version | この項目はTransactionのVersionを示しているところとしてTransactionの項目が更新される場合この項目の値によって処理するように設計されている。
Transaction Attribute | Transactionの追加的な機能と関連した項目としてSmart Contractと特定Transactionで適用される。
Coin Reference | Coin Referenceはコインを送信する場合BitcoinでUTXO情報と同じような内容として現在送っていないコインに対するTxのOut Put参照である。
Transaction Outputs | コインの送受信で受信される側に対するTx Outputである。
Script | Transactionの検証とSmart Contractの内容がここに入ることになる。
<center>表9. Transactionの構造</center> <br/>

<p>TransactionのTypeの項目についてみることにしよう。</p>
<p>TransactionのTypeはQURASブロックチェーンで利用されるすべてのTransactionのタイプを含めている。</p>
<p>Typeの項目に定義されているTransactionのタイプは次のようである。</p>

  -	Miner Transaction
  -	Issue Transaction
  -	Claim Transaction
  -	Enrollment Transaction
  -	Register Transaction
  -	Contract Transaction
  -	Anonymous Transaction
  -	Publish Transaction
  -	Invocation Transaction

<p>上記のTransactionについては後で具体的に記述しようにする。</p>

### MINER TRANSACTIONの構造

<p>Miner TransactionはConsensus Nodeつまりブロックを生成するノードが発生するTransactionである。</p>
<p>ここには現在ブロックに含まれたTransactionらの手数料を総合して現在ブロック生成者のアカウントに送信するTransactionと見ることができる。</p>
<p>つまりMiner Transactionはブロック生成者がブロックを生成し、ブロックに含まれたTransactionらの手数料を計算して手数料をブロック生成者のアカウントに移すTransactionとしてブロックの初のTransactionに登録されている。</p>
<p>Miner TransactionはTransactionの項目のほかにNonceという項目、つまりrandom値を表現する項目が追加でさらに含まれることになる。</p>

### ISSUE TRANSACTIONの構造

<p>Issue Transactionには特別な項目は存在しない。</p>
<p>Asset作成者はIssue Transactionを通じてQURASブロックチェーンに登録されるAssetを創造することができ、全てのアドレスへ送金される。</p>
<p>QURASブロックチェーンに発行されることになるとTransactionのFeeは0である。</p>

### CLAIM TRANSACTIONの構造

<p>Claim TransactionはQURASコインの保有者がコインの持分に応じてQURAS Gas Tokenの支払を貰う時利用されるTransactionである。</p>
<p>つまり実例としてQURASコインを保有したユーザが1000コインを保有していることとして300 QURAS Gas TokenをRewardで受ける場合、このTransactionを利用して300 QURAS Gas Tokenを受けることができる。</p>
<p>Claim Transactionは現在のユーザのコインTransactionを分析して現在まで認められているQURAS Gas Tokenボーナスを計算してそれに対するボーナスをコイン保有者に返すTransactionである。</p>
<p>Claim Transactionの認証過程もやはりこれについた、つまりボーナスの正確性に対する検証を行うことになる。</p>
<p>もしボーナス検証が失敗する場合、Transactionはブロックに追加されることはできない。</p>
<p>このTransactionはただQURASコインの保有者だけが利用できるTransactionである。</p>


### ENROLLMENT TRANSACTIONの構造

<p>このTransactionに追加される項目は次のようである。</p>

項目 | 説明
--- | --- 
PublicKey | 検証者のPublic Keyである。
<center>表10. Enrollment Transactionの追加項目</center> <br/>

<p>このTransactionは検証者になるために発行するTransactionである。</p>
<p>検証者になるための方法はEnrollment Trnasactionを構成してPublicKeyのアドレスに手付金を送らなければならない。</p>
<p>登録をキャンセルする方法はPublicKeyで手付金を抜けばいい。</p>

### REGISTER TRANSACTIONの構造

<p>このTransactionはQURASブロックチェーンにQURASコインやQURAS Gas Tokenといった資産を登録する時、利用されるTransactionである。</p>
<p>つまりEthereumのERC20トークンのようなユーザ定義の資産を登録するTransactionだと思えばいい。</p>
<p>このTransactionは資産登録Transactionとして資産情報をTransaction構造に追加されるようになる。</p>
<p>追加される情報の項目は次のようである。</p>

項目 | 説明
--- | --- 
Asset Type | この項目は資産のタイプを示している項目である。
Name | 資産の名前を示している項目である。
Amount | 資産を登録する時、総発行される資産量を示している項目である。
Precision | 資産の量で小数点位を表現する際に使われる項目である。
Owner | 資産を保有するユーザの情報である。
Admin | ScriptHashを示している項目である。
<center>表11. 資産の登録の項目</center> <br/>

<p>上記の項目により登録される資産に対する情報をブロックチェーンに登録してユーザたちが利用するようにする。</p>
<p>つまりQURASブロックチェーンは資産登録Transactionを提供することとしてユーザたちがQURASブロックチェーンの中で自分の資産を構築して利用できるようにする。</p>

### CONTRACT TRANSACTIONの構造

<p>このTransactionは資産の送受信と関連されたTransactionである。</p>
<p>ユーザは資産の送受信をこのTransactionを利用して行うことになる。</p>
<p>このTransactionはTransaction共通部をそのまま利用する。</p>
<p>それではこのTransactionを利用してどのようにユーザがコインを送信するかを見ることにしよう。</p>
<p>ブロックチェーンは分散された共同帳簿としてブロックの集まりである。</p>
<p>すべてのブロックはTransactionらを含めている。</p>
<p>つまりContract Transactionもブロックに全部含まれることになる。</p>
<p>すべてのユーザたちのコインの送受信履歴がすべて分散帳簿のブロックチェーン、より正確にブロックに含まれることになる。</p>
<p>ブロックチェーンですべてのユーザたちはECCによって創造されたAddressに区分され、すべてのユーザたちはAddressに該当した個人Private Keyを保有している。</p>
<p>上記でTransparent Addressの構造について言及した。</p>
<p>ユーザはPrivate Key、Public Key、ScriptHash、Addressを持っている。</p>
<p>ブロックチェーンにはScriptHashやAddressがデータとして保管されるようになる。</p>
<p>Private Keyはユーザだけが別途に保管しているキーである。</p>
<p>それでは実地のTransactionがどう生成されるのかについて実例を通じて進めることにしよう。</p>
<p>User AからUser Bにコイン100を送るとしよう。</p>
<p>Aには残高が200あると仮定する。</p>
<p>Aに残高が200あるという意味はまだ送られないTransaction Outputが存在するということを意味する。</p>
<p>それではContract TransactionにCoin Referenceの項目が存在する。</p>
<p>この項目に対する意味下記のようである。</p>

項目 | 説明
--- | --- 
PrevHash | 以前に発生したTransactionのHash値を示す。
PrevIndex | この項目はTransactionが含んでいるTransaction Output ListのIndex値を意味する。
<center>表12. Coin Referenceの項目</center> <br/>

<p>すべてのTransactionは全部Transaction Outputの項目を持っている。</p>
<p>Coin ReferenceはこのTransaction OutputをTransaction HashとTransaction Output ListのIndex値で指定することになる。</p>
<p>つまりAからBにコインを送る時Coin Referenceの項目を上記のように指定している。</p>
<p>次にBにコイン100を送る時はTransaction Outputを入れてくれなければならない。</p>
<p>ところがCoin Referenceに200の残高が入るためにAに100、Bに100を送るようにTransaction Outputを2つの生成する。</p>
<p>それではTransaction Outputについた項目の意味を見ることにしよう。</p>

項目 | 説明
--- | --- 
AssetID | 資産のIDとして実地にどの資産を送金するのかを示している項目である。
Value | 送金される量を示している項目である。
Script Hash | コインを受けるユーザのScriptHashである。
<center>表13. Transaction Outputの項目</center> <br/>

<p>上記のような形式に合わせてCoin ReferenceとTransaction Outputの項目を入力送金すればコインが送金されることとなる。</p>
<p>友誼内容を図式で表現すると次のようである。</p>

<center>![/quras-js/img](http://13.230.62.42/quras/img/whitepaper/TransparentTxPrinciple.png)</center>
<center>図3. Transparent Txの原理</center>

<p>すべてのコインの送金原理は上記のように進行される。</p>

### ANONYMOUS TRANSACTIONの構造

<p>Anonymous Transactionは暗号化アルゴリズムによって大きく2種類に分ける。</p>

#### ZK-SNARKS ANONYMOUS TRANSACTION

<p>ZK-SNARKSはZcashコインで初めて導入された暗号化モジュールである。</p>
<p>QURASブロックチェーンではTransactionの匿名化を実現する目的でZK-SNARKSを利用してTransactionの暗号化を実現した。</p>
<p>暗号化ブロックチェーンで基本はTransactionの検証をどのように実現するかが重要である。</p>
<p>ZK-SNARKSを利用した匿名化Transactionではすべての取引内容が暗号化されているためにこれに対する検証方式がTransparent Transactionとは違う。</p>
<p>まずZK-SNARKSアルゴリズムでPrivate KeyとAddress方式がTransparent Address方式と違う。</p>
<p>暗号化アルゴリズムはECCに基礎したが、Address方式が異なる。</p>
<p>この部分については上記で言及したためにそれを参照しようにする。</p>
<p>暗号化Transactionということは取引内容つまり実例としてA->Bで100コインを伝送したとする時送信者、受信者、取引金額に対して暗号化を取るということを意味する。</p>
<p>すなわち取引内容が暗号化されるために暗号化された部分に対する解釈はただZK-SNARKSのPrivate Keyを持つユーザだけができるようになる。</p>
<p>この時Consensus NodeでTransactionの検証方式が必要になる。</p>
<p>つまりZK-SNARKSアルゴリズムの特徴を利用してConsensus NodeではUserのPrivate Keyを全然わからなくても暗号化されたTransactionが正確だということを判断できるようになる。</p>
<p>Anonymous Transactionは暗号化されたTransactionのByte列とその暗号化されたByte列に対するSign値とサインしたPublic Keyの項目を持っている。</p>
<p>追加された項目を見ると次のようである。</p>

項目 | 説明
--- | --- 
AnonymousTx | Transactionの暗号化されたbyte列を意味する。
PubKey | この暗号化された項目を検証するためのPublic Keyを意味する。
Sign | この項目はAnonymousTx byte列のHashに対するsignとしてAnonymousTxの検証をための項目である。
<center>表14. Anonymous Transactionの追加項目</center> <br/>

<p>基本的なZK-SNARKSアルゴリズムに対する説明は次を参照しようにする。</p>

### PUBLISH TRANSACTIONの構造

<p>Publish TransactionはスマートコントラクトをPublishする時利用されるTransactionとしてまだ次の段階でTransactionを追加しようとしている。</p>

### INVOCATION TRANSACTIONの構造

<p>スマートコントラクトのためのTransactionである。</p>
<p>このTransactionはスマートコントラクトを実行するためのTransactionとしてスマートコントラクトのbyte列、つまりコンパイルされたScriptを含む。</p>
<p>このTransactionはConsensus Nodeで実行され、Scriptに反映された内容がVMで実行されて結果を戻す機能を遂行する。</p>
<p>スマートコントラクトについては後で具体的に言及しようにする。</p>

## ブロックの構造

<p>ブロックチェーンはブロックの連結された集合と見ることができる。</p>
<p>ブロックの構造を見る前にブロックチェーンでブロックがどのように連結されているのかについて直観的に説明しよう。</p>
<p>ブロックチェーンでブロックの連結方式は以下のようである。</p>

<center>![/quras-js/img](http://13.230.62.42/quras/img/whitepaper/StructureOfBlock.png)</center>
<center>図4. ブロックチェーンでブロックの連結構造</center>

<p>上記のようにブロックは大きくブロックのHeader部分とブロックのBody部分からなっている。</p>
<p>ブロックのHeader部分はブロックの情報が入っていてブロックのBody部分はTransactionの集合で構成されている。</p>
<p>まずはブロックのHeader部分について具体的に見ることにしよう。</p>

### BLOCK HEADERの構造

<p>ブロックのHeaderにどのような項目があるかを見てそれに対する説明をすることにしよう。</p>

項目 | 説明
--- | --- 
Version | ブロックのVersionを示している項目としてブロックのHeader部分が更新される場合を考慮した項目である。
Prev Hash | この項目は以前のブロックに対するHash値を示している項目である。
Merkle Root | ブロックのBody部分にあるTransactionのHashを葉で構成されるMerkle TreeのRoot Hash値である。
Time Stamp | ブロックが生成された時間を示す。	
Index | 現在ブロックの長さを示す。
Consensus Data | ブロックを生成したNodeのNonce値を意味する。
Next Consensus | 次のブロックを生成する権限を持ったConsensus NodeのScriptHash値である。
Script | ブロックに対する検証Scriptを示す。
<center>表15. ブロックの構造</center> <br/>

<p>ブロックのHeader部分にMerkle Rootという項目が存在する。</p>
<p>この項目の意味は次のようでる。</p>
<p>ブロックの生成子はブロックに含まれているTransactionのHash値でMerkle Treeを形成する。</p>
<p>そしてMerkle TreeのRootHash値をこのMerkle Rootの項目に代入する。</p>
<p>すべてのノードはブロックに含まれたTransactionの誤ったTransactionについてはMerkle Rootの計算方法により検証することができる。</p>
<p>TransactionでどのようにMerkle Treeを構築するのかについて直観的に説明すると次のようである。</p>
<p>実例としてブロックが7個のTransactionを持っていると仮定しよう。</p>
<p>この7個のTransactionのHashをA、B、C、D、E、F、Gとしよう。</p>
<p>その場合Merkle Root値は次の図のように計算されるようになる。</p>

<center>![/quras-js/img](http://13.230.62.42/quras/img/whitepaper/MerkleRootConfiguration.png)</center>
<center>図5. MerkleRootの構成</center>

<p>もし他のノードからブロックのBody部分をダウンロードする時、問題があってBody部分の内容を誤って受けた場合Body部分に対するMerkle Root値がHeader部分のMerkle Root値と変わることになる。</p>
<p>次の図を通じて知ることができる。</p>

<center>![/quras-js/img](http://13.230.62.42/quras/img/whitepaper/SearchingErrorsInMerkleTree.png)</center>
<center>図6. MerkleTreeのエラーの探索</center>

<p>この場合どのTransactionが誤ったTransactionのかをMerkle Treeを通じて簡単に得られる。</p>
<p>つまりノードはMerkle Treeを利用してブロックのHeaderとブロックのBodyを一つのノードがなくていろんないくつのノードからダウンロードして検証できるようになる。</p>
<p>Merkle Rootについての文献はたくさん出ているために参考資料を参考にしてほしい。[2],[3]</p>

### BLOCK BODYの構造

<p>ブロックのBody部分はTransactionの集合である。</p>
<p>Transactionすなわちすべての種類のTransactionが含まれるようになる。</p>

### BLOCKの検証方式

<p>ブロックの検証方式は以下のようである。</p>
<p>ブロック検証手続きはまずはブロックのHeader部分に対する検証を進め、その次にBody部分に対する検証を進める。</p>
<p>ブロックHeader部に対する検証から見ることにしよう。</p>

#### BLOCK HEADERの検証

<p>ブロックのHeaderに対する検証手続きは以下の通りである。</p>

  1)	現在ブロックのHash値がGenesisブロックのHash値である場合、Trueを返還する。
  2)	現在ブロックのHash値がLocalのブロックにすでに含まれたらTrueを返還する。
  3)	現在ブロックのPrevHashの値に該当したブロックHeaderがLocalのブロックチェーンになければFalseを返還する。
  4)	PrevHashの値に該当したブロックHeaderのIndex値が現在ブロックのIndex値より2以上の差が出る場合Falseを返還する。
  5)	PrevHashの値に該当したブロックHeaderのTimestampが現在ブロックのTimestampより大きい場合Falseを返還する。
  6)	最後にブロックのScriptに対する検証を進めてScriptが失敗する場合、Falseを返還する。

<p>ブロックのHeaderに対する検証で失敗する場合、ブロックのBodyに対する検証は進行しない。</p>

#### BLOCK BODYの検証

<p>ブロックのBodyに対する検証手続きは以下の通りである。</p>

  1)	Transactionのリストから最初のTransactionがMiner Transactionがなかったり、Miner Transactionが2番目index以上に位置する場合、Falseを返還する。
  2)	Transactionに該当したNextConsensus項目が正確に計算できだったのかを確認してそうではない場合はFalseを返還する。
  3)	TransactionらのFeeを総合した結果とMiner Transactionの金額を確認して結果が異なるとFalseを返還する。

<p> 上記の検証がすべて成功する場合、ノードはブロック検証で成功したと認識してブロックをLocalブロックチェーンに受け入れる。</p>

## SMART CONTRACTの構造

<p>スマートコントラクトの概念はNick Szaboが1994年最初に提案した概念である。従来の契約書(Contract)は書面になって契約条件を履行するには実際の人が契約書の通り遂行をしなければならないが、デジタルコマンドで契約を作成するとその条件によって契約内容を自動で実行できると主張した。</p>
<p>デジタルとなった契約書は条件に応じた契約結果が明確で、契約内容を直ちに履行することができます。</p>
<p>各自の資産が連結されたデジタルで両者の合意をして契約書を作成して実行することにしたら契約を実行するのに第3者の信頼機関が必要なくなる。</p>
<p>1994年当時、デジタルスマート契約は概念として存在して実地運営サービスに導入されていなかった。</p>
<p>ブロックチェーンの概念が登場することとしてスマートコントラクトを作ることができる環境が調うになった。</p>
<p>QURASブロックチェーンでSmart Contractはこのようなデジタル契約のほかにもユーザたちが直接契約条件を作成して利用するように設計された。</p>
<p>すなわちユーザたちはQURAS Smart Contract言語を利用して自分だけのSmart Contractを開発してQURASブロックチェーン上で実行させられるように全てのPlatformを提供する。</p>
<p>それではQURASブロックチェーンのSmart Contract実行手続きを見るようにしよう。</p>

  1)	SmartユーザはQURASブロックチェーンで支援するSmart Contract作成言語を利用してSmart Contractを作成する。
  QURASブロックチェーンで支援するSmart Contract言語はC#である。
  ユーザたちはQURAS開発チームで支援するSmart Contract Frameworkを利用してVisual Studio環境でSmart Contractを作成することができる。
  2)	Smart Contractの作成が終わったらSmart Contract Compilerを利用して該当Smart ContractをビルドしてByteコードを得る。
  QURAS開発チームは、ユーザたちがSmart Contractを自体に開発できるようにコンパイラを提供してくれる。
  ユーザたちはVisual Studio環境でQURAS Smart Contract Pluginとその他のCompilerをシステムに登録させ、使用できるようにする。
  3)	ビルドしたByteコードが準備されれば、ユーザはSmart ContractをQURASブロックチェーンにDeployさせる。
  ユーザはSmart Contractを支援するWalletあるいは専用道具からビルドしたByteコードをブロックチェーンに登録させるTransactionを発生する。
  4)	MinerはSmart Contract Scriptを実行させてエラーがなければQURASブロックチェーンに登録させる。
  MinerはSmart Contract Transactionが発生すると、Smart ContractのByteコードをSmart Contract VMで実行させて成功すればブロックに追加してブロックチェーンに登録されることになる。
  5)	Smart ContractをDeployさせた後、ユーザはSmart Contract ScriptHashを利用して関数などを呼び出すことができる。

<p>スマートコントラクトの構造はQURAS Smart Contract VMで提供するOpcodeの組合として見ることができる。</p>
<p>ユーザが作成したSmart ContractはCompileになる時、Opcodeで変化されたByteコードに変わる。</p>
<p>QURAS開発チームはユーザにより便利なSmart Contract作成環境を用意するためにSmart Contract VMに対する更新を定期的に進めていくのである。</p>
<p>次にSmart Contractの構造について見ることにしよう。</p>
<p>Smart ContractはOpcodeのByte列として構造は簡単である。</p>
<p>Byte列のすべてのOpcodeはノードのVMで解析されて実行されるようになる。</p>
<p>Smart ContractのOpcode意味とQURAS Smart Contractのライブラリについては次を参照しようにする。</p>

## LEVELDBの構造

<p>すべてのノードでブロックチェーン管理をLevelDBを利用して進行する。</p>
<p>LevelDBは他のSQLデータベースとは違って、Key-Value形式のDBという点で、他のSQLデータベースと区別される。</p>
<p>LevelDBはSQLとは違って、Key-Value形式の保存構造を持つ。[4][5][6]</p>
<p>LevelDBに対する性能については以下のとおりである。</p>
<p>一般的にSQLiteとKyoto Cabinet Tree DBと比較すると全般的に優れた性能を持っている。</p>
<p>ただ大きなデータを使う部分では性能が落ちた結果が出た。</p>
<p>つまりLevelDBのValueの項目の大きさが100byte程度では優れた性能が誇示された。</p>
<p>Valueの項目がこの範囲内では性能が優れているためにLocalで利用するには適合することになる。</p>
<p>LevelDBについて具体的に見るためにはReferenceを参照する。</p>
