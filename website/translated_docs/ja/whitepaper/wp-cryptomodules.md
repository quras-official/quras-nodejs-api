---
id: wp-cryptomodules
title: Crypto Modules
---

<p>QURASブロックチェーンは取引内容についての暗号化を実現して取引の匿名化を実現した。</p>
<p>取引の匿名化で基本問題点はConsensus Nodeから暗号化された取引内容に対する検証をどのように実現するかである。</p>
<p>つまりConsensus Nodeは暗号化された取引について復号化キーを利用しなくて暗号化された取引が正確だということを証明することができなければならない。</p>
<p>これを実現するためにZero-Knowlegde Proofというゼロ知識暗号化アルゴリズムを利用してConsensus Nodeで実の復号化キー(Private key)がなくても暗号化された取引に対する正確性を検証できるようになる。</p>
<p>ZK-SNARKSはこのZKPを実現したモジュールである。</p>
<p>まずはZero-Knowledge Proofの概念について見ることにしよう。</p>

## Zero Knowledge Proof

<p>ゼロ知識証明方法は暗号理論で誰かが相手にどのような式が真であることを証明する際、そのいかなる情報も露出させなくて相手に真ということを認識させる方式である。</p>
<p>どんな式が真であることを証明しようとする側を証明者(prover)として、証明過程に参加して証明者と情報をやりとりする方を検証者(Verifier)という。</p>
<p>ゼロ知識証明に参加する証明者が検証者を騙すことが目的でプロトコルを変更する場合、証明者が不正直という。その他の場合には正直という。</p>
<p>ゼロ知識証明は次のような3つの性質を満足させなければならない。</p>

  1.	完全性(Completeness):どんな式が真なら正直な証明者は正直な検証者にこの式が真であることを証明させることができなければならない。
  2.	健全性(Soundness):どんな式が虚偽ならそのどんな不正直な証明者も正直な検証者にこの式が真であることを納得させできなければならない。
  3.	ゼロ知識性(Zero-Knowledge):どんな式が真なら検証者は式の真と虚偽のほかに何も知らないなければならない。

<p>ゼロ知識証明は確率論に依存することになる。</p>
<p>代表的な例としてAli Baba洞窟問題がある。</p>
<p>つまりProverとVerifierの間に証明施行の数が増えれば式の証明の正確度が高くなる。</p>
<p>しかしProverとVerifierの間に実施数が多い証明はQURASブロックチェーンで利用するのが不便である。</p>
<p>確率論に基づいた証明方法はInteractive Zero-Knowledge Proofとなる。</p>
<p>つまり施行を多く行なって真と偽の確率として式の真と偽を判別するアルゴリズムである。</p>
<p>このような方式はネットの負荷など様々な問題が発生することになる。</p>
<p>それで提案されることになったのがNon-interactive zero-knowledge proofという概念が出るようになるだった。[7] [8]</p>
<p>しかし証明に対する検証は計算の推定に起因することになる。</p>
<p>Non-interactive zero-knowledge proofはZKFの一種としてProverとVerifierの間相互にやり取りする内容がなく検証を実施する方式である。</p>
<p>zk-SNARK(zero-knowledge succinct non-interactive argument of knowledge)もNon-interactive zero-knowledge proofによって出た概念であり、Zcashでも利用されている。</p>
<p>ゼロ知識と関連した文書が多く公開されているからこれに対する具体的な内容はReferenceを参照して欲しい。</p>

## ZK-SNARKS の概念

<p>ZK-SNARK(Zero-Knowledge Succint Non-interactive Argument of Knowledge)はProverとVerifierの間にどんな情報も交換しないながらProverが証明式を作ってVerifierに検証できるモジュールを提供するが、その証明式にはProviderが実例としてSecret keyを持っているということを知らせることができるアルゴリズムである。</p>
<p>この時Verifierは証明式でProverのSecret Keyとかどんな情報も見いだすことができない。</p>
<p>ZKP(Zero Knowledge Proof)はProverがVeriferに証明式が正しいということをそのどんな情報も与えず、検証させる方式である。  </p>
<p>実例としてランダム数Aに対するHash値Bがある時ProverはVerifierに自分がHash値Bに該当したAを知っているということをA値をVerifierに見せずに証明させることができるということだ。</p>
<p>ゼロ知識でProof of KnowledgeはProverがVerifierにAを持っているだけでなく、その値が正確だということをAを見せなくて確信させる方式を意味する。</p>
<p>Succinct ZKPでVerifierはProverのProofの長さに関係なくて短い時間(数ms秒)間に証明式が本当か嘘かを判別することができる。</p>
<p>もともとInteractive ZKPではProverとVerifierが何回にわたって通信を進めた後、証明を終わらせることができた。</p>
<p>つまりVerifierは検証のためにProverにいろいろとMessageを送り、その回答の結果による確率論に基づいて証明式の真と偽を判別することができた。</p>
<p>この時Proverが送っている応答メッセージあるいはVerifierが送るメッセージとしてはProverの秘密データを分かることはできないように設計される。</p>
<p>しかし、Non-interactive ZKPではProverとVeriferの間にただ一つのメッセージだけを通信して証明式の真と偽を判別できるようにする。</p>
<p>Non-interactive ZKPを実現するためにProverとVerifierの間にゼロ知識アルゴリズムを向けたPublic Parmemterを共有しなければならない。</p>
<p>このキーに対して生成はQURAS開発チームで進行し、QURASブロックチェーンで共通に利用されるようになる。</p>

### CENTRALIZED ANONYMOUS PAYMENT SYSTEM
<p>QURAS ブロックチェーンで利用したDAP(Decentralized Anonymous Payment System)について見る前に銀行による中央化された支払システムについて見ることにしよう。</p>
<p>Anonymous e-cash : Chaumによって初めて開発された。Chaumの理論に次のようである。Aliceと銀行がコインを持っていると仮定しよう。この時vに該当する価値のコインを作るためにAliceはまず銀行は分からないランダムの秘密番号SNを選択する。その後、Aliceの口座からv分減少させて銀行はSNを署名する。その次AliceがBobに自分のコインを送金しようとする時に彼は銀行からサインしたSNをBobに与えてその署名が実に銀行から署名したものということを証明させる。この時、Bobとか銀行はAliceのSN情報から身分情報を知ることができない。そして銀行で以前に発生したSNに対しては無効と認める規約によって二重支払いは許されない。</p>
<p>Unforgeable e-cash : Chaumの理論には一つの問題点があるが銀行の秘密キーが危うくなるとコインが偽造される可能性がある。これについて詳しく説明すると以下のようになる。</p>
<p>銀行は"Coin Commitment"としてMerkle Treeを維持してユーザは定期的にこのMerkle Treeのroot値であるrtを照会する。特に銀行はいかなる秘密資料を維持していない。Aliceがコインを要求する時、彼はランダムの秘密番号SNと補助文字列rを選択してcm:=CRH(SN||r)を計算して銀行に送る。ここでCRH は衝突回避の関数である。</p>
<p>銀行ではcmをもらえばAliceの口座から要請金額を削減してcmをMerkleTreeのleafノードに追加する。その後、Bobに支払うためにAliceはBobにSNとともにゼロ知識証明πを送る。</p>
<p>AliceはBobにSNが銀行のMerkle Treeのleafに保管されていることを知らせることができる。</p>
<p>しかしゼロ知識証明によってBobはAliceの身分情報が分からなくなる。後にBobはAliceから受け取ったSNとπを銀行に送る。</p>

## ZK-SNARKSの原理の具現

<p>まずはZK-SNARKSの原理を知る前にQURASブロックチェーンでTransparent Transactionについて見てZK-SNARKSをある項目に利用してAnonymousを実現できるかを見よう。</p>
<p>代表的なTransparent TransactionはContract Transaction構造から見た。</p>
<p>Contract Transactionで基本入力はCoin Reference情報であり、出力とTransaction Outputの項目である。</p>
<p>QURASブロックチェーンでTransparent TransactionのFrom、To、Amount情報はContract TransactionのCoin ReferenceとTransaction Outputの項目によって得られる。</p>
<p>それではContract TransactionのCoin ReferenceとTransaction Outputの項目からどのようにFrom、To、Amountを決定できるのかについて見ることにしよう。</p>
<p>Contract Transaction構造で見るとCoin Referenceは以前に発生したTransactionのTransaction Outputに対する参照である。</p>
<p>つまりブロックチェーンのデータからCoin Referenceを推定して、簡単にCoin Referenceが示すTransaction Outputの項目を得ることができる。</p>
<p>Transaction Outputの項目は3つの項目つまりAssetID、Value、ScriptHashの項目を持つ。</p>
<p>つまりCoin Referenceが指したTransaction Outputの項目のScriptHashはFromのアドレスになる。</p>
<p>そしてContract TransactionのTransaction Outputの項目のScriptHashは最終残高状況を表示することになる。</p>
<p>すなわちこの項目によってToのアドレスと送金量を確認することができる。</p>
<p>Contract Transactionのすべての項目は暗号化されなくてそのままブロックチェーンに登録されるためからノードは発生したTransactionについてFrom、To、Amountが正確に計算できだったのか<p>を正確に検査することができるしSign値を確認してTransactionが偽造されなかったかどうかを確認することができる。</p>
<p>それではAnonymous Transactionで基本暗号化しなければならない部分について見当が行くのである。</p>
<p>Anonymous Transactionで暗号化しなければならない部分はまさにCoin Reference部分とTransaction Outputの項目である。</p>
<p>この部分についてゼロ知識証明アルゴリズムを利用すればノードはFrom、To、Amountについて推測できず、結局Transactionの匿名化が実現されるようになる。</p>
<p>それではどのようにCoin ReferenceとTransaction Outputを暗号化し、またそれが正確だということを他のノードでどんな検証できるかについて進めることにしよう。</p>
<p>QURASブロックチェーンでZK-SNARKS用のAddressとTransactionはTransparent Addressと異なる。</p>
<p>QURASブロックチェーンでZK-SNARKS用のAddress生成部分は上記で説明しているので省略する。</p>
<p>QURASブロックチェーンで前述したようにReferenceとOutputの部分は全て暗号化されることになる。</p>
<p>すなわち、検証者はこの暗号化された内容をPrivateKeyがなく検証して正確であることを確認しなければならない。</p>
<p>そのためにZK-SNARKSでは新しい概念が登場することになる。</p>
<p>それはCommitmentとNullifierである。</p>
<p>QURASブロックチェーンで暗号化された残高をNoteと表示しよう。この時Noteの概念はBitcoinからUTXOのような概念で見ることができる。</p>
<p>ただNoteはUTXOのような透明性ではなく暗号化されている。</p>
<p>VerifierがどのようにNoteを検証するかを見ることにしよう。</p>
<p>AnonymousのTransactionでCommitmentとNullifierという概念が登場する。</p>
<p>CommitmentはUnspent Noteと考えればいいが,BitcoinではUnspent UTXOと同じである。</p>
<p>Nullifierは二重払いを防ぐために出たものであるがSpent Noteである。</p>
<p>Transactionで入力として入ったReferenceはそれのhashをNullifierでブロックチェーンに公開する。</p>
<p>Transaction OutputはそれのHash値でCommitmentをブロックチェーンに公開することになる。</p>

## ZK-SNARKのプロトコル

### 暗号学的概念

#### ハッシュ関数

<p>ハッシュ関数は一方向関数としてx->YからxによってY値を求めることはできても反対が難しい種類の関数を意味する。</p>
<p>ZK-SNARKSでハッシュ関数を多く利用する。</p>
<p>まずCommitment Merkle Treeでハッシュ関数を利用する。</p>
<p>JoinSplitのCommitment値をleafにしてバイナリツリーを形成してMerkle Treeを構成することになるが,この時ハッシュ関数を利用するようになる。</p>
<p>またJoinSplitでhSigを計算する時もハッシュ関数を利用するようになる。</p>

#### PRF関数(PSEDUO RANDOM FUNCTION)

<p>PRF 関数は無作為ランドーム関数を示す。</p>
<p>QurasブロックチェーンではC#の無作為ランドーム関数に基づいてPRFを再構築した。</p>
<p>JoinSplitを生成するのにPRFをたくさん利用する。</p>
<p>それは暗号化されたCencに対する予測不可能とCommitmentの重複現象を防ぐためにPRFを利用することとなった。</p>
<p>PRF関数の特徴はx値が違えばPRF(x)の結果もいつも変わらなければならない。</p>

#### AUTHENTICATED ONE-TIME SYMMETRIC ENCRYPTION

<p>Authenticated One Time Symmetric Encryptionを簡単にSYMで表現するようにしよう。</p>
<p>SYM.K(SYMのキーを意味)により平文SYM.PをSYM.Cに暗号化する時SYMは次のように定義される。</p>
<p>SYM.Encrypt : SYM.K × SYM.P=> SYM.C に変換させる関数である。</p>
<p>SYM.Decrypt : SYM.K × SYM.C=> SYM.P に変換させる関数である。</p>
<p>この種類のSYM関数はただ一度だけ利用することを勧める。</p>
<p>この関数はSYM.Kが公開されると攻撃者から攻撃を受けることができるのでただ一度だけ使用することを勧告する。</p>

#### KEY AGREEMENT

<p>Key Agreement 形式は二人の間で(A,Bと仮定)Aのprivate keyとBのpublic keyを利用して互いに共有された秘密資料を約束する暗号学のプロトコルである。</p>
<p>つまりAとBのキーを利用してAとBだけがわかる秘密資料を互いに共有できるようにしようというのである。</p>
<p>すなわち三者はAとBが共有した秘密資料が分からなくなる。</p>
<p>Key Agreement形式(簡単にKAという)は次のような3つの要素として具現される。</p>

  - KA.Public : Bで利用するPublic Keyを示す。
  - KA.Private: Aで利用するPrivate Keyを示す。
  - KA.SharedSecret:AとBの他に誰も分からない秘密資料を意味する。

<p>次の関数を定義してKAを見るようにしよう。</p>

  - KA.FormatPrivate:この関数はランドームbyte列をKA.Privateで作る関数である。
  - KA.DerivePublic:この関数はKA.PrivateとKA.baseからKA.Publicを生成する関数である。
  - KA.Agree:KA.PrivateとKA.PublicからKA.SharedSecretを作り出す関数である。
  - KA.Base:KA.Publicの基礎値である。

<p>Key Agreement プロトコルはDiffie–HellmanのKey Exchange思想をベースにして解決して出たものである。</p>
<p>Diffie–HellmanのKey Exchange プロトコルでは二人のAとB間にキーを交換するがこのときAとBに対する認証ができないという弱点がある。</p>
<p>すなわちKey Exchange プロトコールを利用してAとB 間の匿名キーの交換が可能であるがAとB間の他のCが仲間に入れて盗聴する場合に脆弱になる。</p>
<p>AとBの間の鍵交換にCが仲間に入れてAとCがキーの交換を行いし、CとBがキーの交換を行ってCはAとBの間でやり取りされるデータを盗聴できるようになる。</p>
<p>対策としてAとBを認証するために三者の認証機関で発給されたキーで署名して送る方式でAとB間の互相認証を行うことができる。すなわち三者Cが仲間に入れる現象を防ぐための方法である。</p>

#### KEY DERIVATION

<p>Key Derivation関数はKey AgreementとAuthenticated One-Time Semmentric Encryptionを結合して定義した関数である。</p>
<p>この関数はKey Agreementと複数のargumentを組み合わせて作られたshared secretデータと暗号化に利用されるキーを生成する。</p>
<p>KDF(Key Derivation Function)を次のように定義する。</p>
<p>{1… N} × Bytes(hSig) × KA.SharedSecret × KA.Public × KA.Public => Sym.K</p>
<p>上記の関数がKDF関数である。</p>
<p>それではKDFを満足させなければならないセキュリティ条件を見ることにしよう。</p>

  - g := KA.Base
  - SKenc1とSKenc2は依存関係がなくてKA.Privateから生成されるランドームバイト列である。
  - PKenc := KA.DerivePublic(SKenc, g)

<p>上記の方式に基づいてESKとEPKを生成する。</p>
<p>KDFを利用してコインの送信者と受信者との間で公開秘密キーを生成してその情報をTransaction に反映することとして受信者だけが暗号が解読できるようにする。</p>

#### SIGNATURE

<p>Sig関数を次のように定義しよう。</p>

  - Sig.Private : サインするのに必要なキー
  - Sig.Public : サインを検証するのに必要なキー
  - Sig.Message : 平文
  - Sig.Signature : 平文に対する署名情報
  - Sig.Gen : サインと検証に必要なSig.PrivateとSig.Publicを生成する関数
  - Sig.Sign : Sig.Message × Sig.Private => Sig.Signature
  - Sig.Verify : Sig.Public × Sig.Message × Sig.Signature => TrueあるいはFalse

<p>上記のSig関数を利用して送信者はトランザクションを作ってトランザクションを署名して転送する。</p>

#### ZERO-KNOWLEDGE PROVING SYSTEM

<p>ゼロ知識証明システムは証明者が検証者にいかなる情報も露出させずに自分の正確性を証明させる暗号学プロトコルである。</p>
<p>ゼロ知識証明システムはzk-SNARKSに基づいてQURAS ブロックチェンジでTransactionを暗号化して検証するのに利用された。</p>
<p>Qurasブロックチェーンではzk-SNARKSを利用するために次のキーを先に生成する。</p>

  - ZK.ProvingKey : Anonymous Transactionの生成者が暗号化Transaction を生成して検証者が検証に利用する検証資料(Proof)を生成するようにするのに利用されるキーを意味する。
  - ZK.VerifyingKey : 暗号化されたTransactionの検証資料(Proof)と結合して暗号化されたTransactionが正しいかを検証するのに利用されるキーを意味する。
  - ZK.SecretKey : ZK-SNARKSのProvingKeyとVerifyingKeyを生成するのに利用されるキーを意味する。
  - ZK.PrimaryInput : 証明者がZK.Proofを生成するために入力する入力値としてこの値はVerifierと共有して利用する値である。
  - ZK.AuxiliaryInput : これもZK.Proofを生成するのに利用される入力値である。
  - ZK.Proof : 証明者が検証者に証明のために送るデータとしてこのデータには証明者の情報が含まれない。ZK.Proofは証明者がZK.ProvingKeyとZK.PrimaryInput、ZK.AuxiliaryInputに基づいて作られることになる。検証者はこのデータとZK.Verifying Keyとして検証を進める。

<p>つまり検証者はZK.ProvingKeyとZK.PrimaryInput、ZK.AuxiliaryInputを利用してZK.Proofを作ってそのZK.ProofデータとZK.PrimaryKeyをTransactionに入れて転送する。</p>
<p>Transactionを受けて検証する側はZK.VerifyingKeyとTransactionに含まれているZK.PrimaryInput、ZK.Proofを利用して当該証明結果がTrueであるかFalse であるかによって処理できる。</p>

### ZK-SNARKS Keyの要素

<p>ZK-SNARKS KEYは次の4つの要素を持つ。</p>
<p>a_sk,  a_pk,  sk_enc, pk_enc</p>
<p>ここで a_skは送信キーとして32byteのランドームバイト列である。</p>
<p>残りの3 つのキーであるa_pk, sk_enc, pk_encは全部a_skから生成されることになる。</p>
<p>生成原理は次の通りである。</p>

<center>a_pk= PRF_addr(a_sk, 0)</center> <br/>
<center>sk_enc=KA.PrivateKey(PRF_addr(a_sk, 1) )</center> <br/>
<center>pk_enc=KA.PublicKey(sk_enc, KA.Base)</center> <br/>

<p>ここでPRF関数とKA関数は上記で説明したのでここで言及しない。</p>

### JOINSPLIT DESCRIPTION

<p>暗号化Transactionには1つ以上のJoinSplit項目が存在する。</p>
<p>もし暗号化されたTransactionの場合Transactionに1つ以上のJoinSplit項目とJoinSplitSig、JoinSplitPubKey が含まれている。</p>
<p>検証者はJoinSplitSigとJoinSplitPubKey、JoinSplitを通してJoinSplitの正確性を検証する。</p>
<p>またJoinSplitの項目からZK-SNARKS Verify Key を利用して当該JoinSplit内容に対する正確性の検証、すなわちゼロ知知の証明を進める。</p>
<p>それではJoinSplitにどのような項目が存在するかを見てみよう。

  - VAmount_Old : T(transparentアカウント)->A(anonymousアカウント)に送金する際にTransparentにあった残高を示す。
  - VAmount_New : T->AあるいはA->Tの場合Tアカウントに入る残高を示す。
  - MerkleRoot : 以前ブロックまでのCommitmentのMerkle Treeのroot hash値である。
  - Nullifier(1, 2) : Inputに入った2つのNoteに対するNullifier値を意味する。
  - Commitment(1, 2) : Outputに記録されたNoteに対するCommitment値を意味する。
  - Epk : Outputのノートを暗号化するのに使われるKAキーペアのpublic keyである。この時ESKと受信者のPKencを結合してoutputを暗号化する。つまり受信者は自分のSKencとEPKを利用して暗号化されたCencを解読できる。
  - RandomSeed : JoinSplitのProof値の計算のためのランドームのバイト列を意味する。
  - Proof : JoinSplitに対するZK-SNARKSのゼロ知識証明データを示す。
  - Cenc : Noteの暗号化されたデータを示す。

<p>VAmount_OldとVAmount_Newは全部1以上の値になってはならない。</p>
<p>もし二つの値が全部1以上の場合、Transactionは失敗と認める。</p>
<p>またJoinSplitのProofとZK-SNARK Verify Keyを通じてZK-SNARKS認証を行ってTrueの場合にはTransactionを成功として判断する。</p>
<p>Trueではないの場合にはTransactionを失敗として判断する。</p>

### SENDING NOTES

<p>暗号化されたTransaction は少なくとも一つ以上のJoinSplit項目を含めて構成することになる。</p>
<p>JoinSplitを構成する段階で第一段階はJoinSplitを検証するための署名キー(JoinSplitSig)のためのキーペアを先に生成しなければならない。</p>
<p>キーペアであるJoinSplitPrivKeyとJoinSplitPubKeyをECCアルゴリズムに基づくキー生成として生成する。</p>
<p>その後JoinSplitの項目を構築する。</p>
<p>JoinSplitの項目には2つのInputと2つのOutputから構成される。</p>
<p>送信者はInput項目を次のように構成する。</p>

  - Inputに該当するNoteが1つである場合 -> Random Noteを生成して2つのInputを作る。
  - Inputに該当するNoteが2つである場合 -> 2つをInputに作る。

<p>Inputを生成しながらhsigを生成する。そしてランドームバイト列を生成してそれに基づいてOutPutを生成する。</p>
<p>Outputを生成する段階は以下の通りである。</p>

  - ランドームバイト列を一つ選ぶ。長さは32byte列である。
  - IをOutputのindexとしよう。{0, 1}
  - ρ_i=PRF(i, hsig) として計算する。
  - 最後にNoteを受信者のpk_(enc,i)に暗号化する。

<p>ここでInputとOutputにランドーム文字列を入れるのは暗号解読を困難にするためのものである。</p>
<p>つまり当該Noteに対して残高とアドレスが同じであっても生成されたNoteの暗号化されたデータはランドーム文字列によって異なる。</p>
<p>これでユーザたちが同じNoteということを知らせないためにランドーム文字列を入れたのである。</p>
<p>JoinSplit生成を完了するとJoinSplitボディ部分をJoinSplitPrivKeyでサインをする後TransactionにJoinSplitSigを入れてTransactionの生成を完了してブロックチェーンにbroadcastするようになる。</p>

### MERKLE PATH VALIDITY

<p>Note Commitment treeの深さをMerkleDepthと仮定する。</p>
<p>Merkle treeの毎ノードはハッシュ値で構成される。</p>
<p>高さがhであるMerkle treeは最大Pow(2,h)個のノードを持ち、最小Pow(2,h-1)個のノードを持つ。</p>
<p>マックルツリーで最後の階にあるノードを"葉ノード"と呼ぶ。</p>
<p>マックルーツリーで葉ノードとルートノードを除いたノードをInternalノードと呼ぶ。</p>
<p>M(h,i)をh層のi番目ノードとしよう。</p>
<p>この時M(h,i)の計算公式は以下の通りである。</p>
<p>M(h, i) = MerkleHash(M(h+1, 2*I), M(h+1, 2*I + 1))</p>
<p>QurasブロックチェーンではMerkle TreeのAuth Path理論に基づいてマクルトリーのルート値とMerkle Treeの正確性を検証できる。</p>

### BALANCE

<p>Anonymous transactionでJoinSplit項目があることは上記で述べた。</p>
<p>JoinSplit項目のVAmount_oldはTransparent balance poolでコインを抜くことを意味するし、VAmount_newはTransparent balance poolにコインを入れる動作を意味する。</p>
<p>ユーザは単にJoinSplitのVAmount_oldとVAmount_newを通じてQurasブロックチェーンの全体Transparent balance poolの残高だけが測定できる。</p>
<p>その他の該当アカウントの残高は照会できない。</p>
<p>JoinSplit では暗号化されたNote単位でアカウント管理を進める。</p>
<p>すべてのNoteはブロックチェーンに暗号化されたまま保管されており、この暗号はただ当該アカウントのキーを持っているユーザだけが照会できる。</p>

### NOTE COMMITMENTS AND NULLIFIERS

<p>Anonymous Transactionには1つ以上のJoinSplit項目を持っているがこのTransactionがブロックチェーンに入る時にJoinSplitのCommitmentがブロックチェーンのNote Commitment Merkle Treeに追加されることになる。</p>
<p>またJoinSplitのNullifierはブロックチェーンに登録されることになる。</p>
<p>もしAnonymous Transactionがブロックチェーンに登録する際に当該TxのNullifierが既にブロックチェーンに登録されている場合、Double spendと認めてTransactionをブロックチェーンに登録せずに失敗に戻す。</p>
<p>Nullifer計算において当該Noteにランダム文字列を入れることとして同じNoteに対してもNullifierの値は異なるからNullifierとしてDouble spendを防止することになる。</p>


## RING SIGNATUREの概念

<p>Ring signatureアルゴリズムはグループに参加しているキーを有しているすべてのユーザによって署名して行われる電子署名アルゴリズムの一種類である。</p>
<p>つまりリング署名されたメセッシはグループのあるユーザによって承認されることになる。リング署名の基本特性はリング署名をグループのどのユーザのキーで署名されたのか決めづらくなることである。</p>
<p>リング署名はグループ署名と似ているが2つの側面で差がある。</p>

  - 1つ目の違いは個別署名の匿名性は分からないこと
  - 2つ目の差は追加的な設定がないままグループの任意のユーザたちがグループを成すのに参加できること

<p>リング署名の定義は以下の通りである。</p>
<p>グループのすべてのユーザは共にpublic/privateキーペアをそれぞれ持たなければならない。</p>
<p>つまりN個のユーザのグループは(P1, S1)、(P2, S2)、•••、(Pn, Sn)で定義できる。</p>
<p>ではi 番目のユーザがメッセージmに対するリング署名をσとしよう。</p>
<p>ではすべてのユーザはリング署名σ, m, P1, P2, …, Pnに基づいてリング署名に対する検証を進めることができる。</p>
<p>もしリング署名が正確に計算されていたら検証で通過することになる。</p>
<p>グループ内のユーザたちのprivate keyが分からなければ正確なリング署名を計算することが難しい。</p>

## RING SIGNATUREの原理の具現

### Ring sigatureの基本形式

<p>RSAアルゴリズムはグループのユーザの数が一つであるリング署名と同じである。</p>
<p>それでは合成関数C_(k,v) (y1,y2,y3,..,yn) を見るようにしよう。</p>
<p>ここでkはキーであり、vは初期値である。y1、y2、y3、 ... 、ynはランダム値である。</p>
<p>この時この合成関数の結果値をzとしよう。</p>
<p>つまり C_(k,v) (y1,y2,y3,..,yn) = z</p>
<p>簡単な入力に対してこの数式を解くことは難しくない。</p>
<p>でももしy1、y2、y3、...、ynがtrapdoor関数の場合すなわちy1 = g(x1)、y2 = g(x2) …、yn = g(xn) の場合それをを満足するx1、x2、x3, … 、xnを求めるのは難しい。</p>
<p>それはy1=g(x1)がtrapdoor関数であるからである。</p>
<p>このような類型の関数をring方程式と呼び、次のように定義する。</p>
<p>C_(k,v) (y1,y2,y3,..,yn)  = Ek(yn • Ek(y(n-1) • Ek(…• Ek(y1 • v) …)) = v</p>

### Ring Signatureの生成過程

<p>Ring署名段階を大きく6つに分離できる。</p>
<p>P1、P2、... 、Pnをリングの公開キーとしよう。</p>

  1.	キーを生成する。K= Hash(m)ここでmは平文を意味する。
  2.	ランダム文字列vを生成する。
  3.	グループの全てのメンバー(自分を除く)に該当するランダム値Xiを生成する。自分は(Xs)自己のPrivateKeyで計算されるようになる。そしてXiに当たったYi=g(Xi)を計算する。
  4.	Ysに当たったリング方程式を解く。Yiたちが分かるからリング方程式を易しく解ける。
  5.	Xsを計算する。Xs = g^-1(Ys)
  6.	リング署名の結果は以下の通りである。(P1、P2、… 、Pn、v、X1、X2、…、Xn)

### Ring signature の検証過程

Ring検証段階は3つに分離される。

  1.	XiについてYi=gi(Xi)を計算する。
  2.	キーを計算する。K = Hash(m)

リング方程式が正しいかを検証する。C_(k,v) (y1,y2,y3,..,yn) = v

## STEALTH ADDRESSについて

<p>リング署名Txで送信者が受信者に代わって全てのトランザクションに対してランダム一回性アドレス(One-Time Address)を生成させる。</p>
<p>受信者は必ず一つのアドレスのみを生成することができるし、受信されたすべての支払金は受信されたアドレスとは関係のない固有のアドレスに移動することになる。</p>
<p>ステルスアドレスを利用してただ送った人と受信した人のみが支払われた転送位置を決めることができる。</p>
<p>ステルスアカウントには個人表示キー、非公開支出キー、そしてアドレスから構成されている。</p>
<p>支出キーは自分のアカウントでコインを支払うのに利用されるし、表示キーはアカウントで受信された受信履歴を見られるようにする。</p>
<p>またアドレスは受信先のアドレスを生成するのに利用されることになる。</p>
<p>アドレスは支出キーと表示キーによって生成されることになる。</p>

## RING CTについて

<p>Ring CTを利用してTransactionで残高を隠すことができる。</p>




