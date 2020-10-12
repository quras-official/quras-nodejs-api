---
id: basic_setsmartcontractenvironment
title: 基本 - C#言語を利用してQURASスマートコントラクトを作成する方法
---

QURASブロックチェーンでスマートコントラクトを作成する場合にはC#言語をお勧めする。

このセクションではQURASスマートコントラクトのためのC#開発環境の設定について説明する簡単なチュートリアルについて説明する。またスマートコントラクトプロジェクトの作成方法とコンパイル方法についても説明する。

## 開発ツール

### 1. Visual Studio 2017

もし既にコンピュータに.NETクロスプラットフォーム開発を選択してVisual Studio 2017をインストールした場合にはこの部分を省略できる。

ダウンロードしてインストール: [`Visual Studioのダウンロードアドレス`](https://visualstudio.microsoft.com/vs/community/) <br/>

インストール方法は簡単して手順に従って操作します。.NETクロスプラットフォーム開発を選択してインストールすることに注意してください。そうしないとステップ3でquras-vmプロジェクトを開くことができなくなる。インストールには約 10 分または最長1 時間ぐらいかかる。

<center>![/quras-js/img](http://13.230.62.42/quras/img/smartcontract/install_core_cross_platform_development_toolset.png)</center>

### 2. QurasContractPlugin

<p>インストール方法:</p>

<p>Visual Studio 2017を起動して「Tools」を開いて「Extensions and Updates」をクリックした後ウィンドウの左側にある「Online」タブをクリックする。ウィンドウの右上隅にある検索ボックスで「QURAS」を検索してQurasContractPluginをダウンロードする(この手順はインターネットとの連結を必要にする)。</p>

<center>![/quras-js/img](http://13.230.62.42/quras/img/smartcontract/install_quras_plugin.png)</center>

### 3. quras-compiler

インストールと設定の手順:<br/>
Githubから[`quras-compiler`](https://bitbucket.org/qurasdev/quras-sc-compiler/src/master/)プロジェクトをダウンロードしてVisual Studio 2017を起動した後にQURASプロジェクトをビルドーする。

<center>![/quras-js/img](http://13.230.62.42/quras/img/smartcontract/quras_compiler_setting.png)</center>

リリースが成功すると「quras-msil-compile.exe」ファイルが「bin\Release\PublishOutput」で生成される。

ここでこのディレクトリを実行パスに追加するのが必要である。PATH はコマンドラインまたはターミナルウィンドウから実行するファイルの位置を検索するためにシステムが使用するシステムの変数です。

#### Windows 10

<b>「Search」ウィンドウで「System(Control Pannel)]を検索して「Advanced system settings」リンクをクリックした後に[Environment Variables]をクリックする。「System Variables」セクションでPATH 環境変数を選択して「Edit」をクリックする。もしPATH 環境変数が存在しない場合は「New」をクリックする。「Edit System Variable」(または 「New System Variable」)ウィンドウでPATH 環境変数の値を指定する。設定した後に「OK」をクリックして設定関連のウィンドウをすべて閉じる。</b>

次にはCommandまたはPowerShellを実行してquras-msil-compile.exeを入力する。その場合エラーがなくて出力画面にバージョン情報が表示されると環境変数の設定は成功を意味する。

<center>![/quras-js/img](http://13.230.62.42/quras/img/smartcontract/quras_compiler_run.png)</center>

## プロジェクトの作成

上記のインストール設定が成功するとVisual Studio 2017 でQurasContract プロジェクトを作成できる。

<center>![/quras-js/img](http://13.230.62.42/quras/img/smartcontract/quras_sc_create_project.png)</center>

プロジェクトを作成するとC# ファイルが自動的に生成される。SmartContractを継承するデフォルトクラス下記のように表示される:

<center>![/quras-js/img](http://13.230.62.42/quras/img/smartcontract/quras_sc_code.png)</center>

## プロジェクトのコンパイル

これからスマートコントラクトを定義するメソッドを追加することができる:

正常にプロジェクトをコンパイルすると「bin/Debug」ディレクトリにContract1.avmが生成される。このファイルはQURASスマートコントラクトとして生成されたファイルである。

<center>![/quras-js/img](http://13.230.62.42/quras/img/smartcontract/quras_sc_compile.png)</center>

これでQurasスマートコントラクトの開発環境の設定方法に対して説明したことである。