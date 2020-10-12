---
id: basic_smartcontractlimitation
title: 基本 - スマートコントラクトの制限
---

## データの型

QurasVMは次の基本タイプを提供する：

 - `ByteArray`
 - `Integer`
 - `Boolean`
 - `Array`
 - `Struct`
 - `Map`
 - `Interface`

QSBコードから直接的に生成できる基本タイプは次のとおりである：

 - `ByteArray`
 - `Array`
 - `Struct`
 - `Map`

C#言語の基本的なタイプは次のとおりである:

 - `Int8` `int16` `int32` `int64` `uint8` `uint16` `uint32` `uint64`
 - `float` `double`
 - `Boolean`
 - `char` `string`

仮想マシンの基本タイプが異なるためにC#言語の基本タイプは完全にはサポートされていなくて特殊な状況だけで使用できる。

### C#言語の統合型

`Int8` `int16` `int32` `int64` `uint8` `uint16` `uint32` `uint64`

QurasVMではこのすべての整数タイプがサポートされてBigIntegerの側ではC#言語よりも大きなスコープをサポートする。

数字データの型である`VARINT`は`BigInteger`を意味する。

さらにこれらはC#言語の「BigInteger」のためにサポートされる：

```c#
BigInteger total_qrs = 300;
BigInteger ico_qrs = 200; 
```

数字型をより小さいものに変換する場合にQSBにコンパイルしても値(byte)(ulong)は切り捨てられないことに注意してください。

数学的演算子はすべての整数タイプでサポートされる：

```js
var a1 = abc + 1;
var a2 = abc - 1;
var a3 = abc * 1;
var a4 = abc / 1;
var a5 = abc % 2;
```

論理演算子はすべての整数タイプでサポートされる：

```js
if (a1 > a2) ;
if (a2 < a3) ;
if (a3 == a2) ;
if (a3 != a2) ;
if (a1 >= a2) ;
if (a1 <= a2) ;
```

インクリメンタル演算子は整数に対してサポートされる：

```c#
int k = 100;
for (int j = 0; j < 3; j++)
{
   k += j;
}

```

### C#言語の浮動小数点型
サポートなし。

### C#言語のブール型
基本的にはサポートする。基本的な動作はINTに似ている。falseはint 0である。

### C#言語のchar文字列型

完全にはサポートされていない。C#言語の文字列とは異なりQurasVM で文字列はbytearrayとして扱われてQSB にコンパイルされた文字列は実際には UTF8 で符号化されたbytearrayである。文字列の拡張ハンドラは使用しないでください。文字列は特殊な型として扱うだけである。特に中国語の処理には文字列を使用しないでください。

```C#
string ss3 = "ab";
ss3 += "c";
var ss = "abcdef";
var b2 = ss.Length;
var c = ss + "abc";
var d = ss.Substring(1, 2);
```

文字列の連結とか長さの取得がサポートされる。英語の文字列はC#言語の文字列と同様にサポートされるが、中国語の文字列はサポートされない。

他のタイプの文字列はサポートされていないために、例えば`“abc”+1.ToString()`の結果はC#言語は異なるになる。


char型は整数タイプとしてサポートされる。

### C#言語のクラスと構造体

C#言語のクラスおよび構造体の定義がサポートされる。

```C#
public class info
{
    public byte[] a;
    public byte[] b;
}
```

APPCALLなどの機能を使用する外部メンバ関数を除外してカスタムメンバ関数の定義はサポートされない。

OPCALLアトリビュートを使用する外部コンストラクタを除外してカスタムコンストラクタはサポートされない。

### C#言語の配列型

C#言語の配列がサポートされて利用方法はC#言語に似ている。

Byte[]はQurasVMの下位レイヤの特殊な型であるために例外である。

通常は次のように配列の値を設定できる:

```C#
short[] some= new short[17];
some[1] = 12;
return some;
```

### C#言語の列挙型

列挙型の定義は数値として使用されている場合だけにサポートされる。

文字列へのフォーマットおよび文字列からの解析はサポートされない。

### C#言語のコンテナ

C#言語の共通リストディクショナリコンテナはサポートされない。

リスト関数は配列に置き換えることができる。

ディクショナリ関数はQRS DOTNET DEVPACKでMAPに置き換えることができる。

### C#言語の変数

臨時変数には制限がない。const変数とスタティックメンバ変数の定義がサポートされる。スタティックメンバ変数への初期値の設定がサポートされる。

```C#
private const ulong total_qrs = total_ico_usd / qrs_to_usd * qrs_decimals;
public static BigInteger TotalIcoQRS() => total_qrs;
```

### C#言語の代表者とイベント
QurasVM の特別な機能である2つのC#言語の代表者の関数を定義できる。

`public delegate void acall(string a);`

次のいずれかを使用してイベントを定義できる:

`publics tatic event acall dododo;`

このイベントを呼び出す時にQURAS C#言語のコンパイラはこれをNotifyメソッドと見なす。

もう1つはbytearrayをdelegateに変換するために使用できる:

`acall call = (acall)new byte[] { 01, 02, 03 }.ToDelegate();`

これは指定されたアドレスのスマートコントラクトへのコールを定義する。

## C#言語の開発規約
### C#言語のエクスポート要件
QURAS C#コンパイルではスマートコントラクトがエントリポイントとして一つだけのメイン関数を必要にする。

エクスポートする他の関数は固有の名前としてpublic staticになることが必要である。

### C#言語の代表者とイベント
C#言語の代表者とイベントには特別な機能がある。C#言語の代表者とイベントのセクションを参照してください。

### C#言語の組み込み属性
QURAS DEVPACKの外部関数はたくさんある。実際には定義する必要がないために外部定義はない。機能的にはマークされる。

スマートコントラクトこれらの関数は使用できる。

### APPCALL
APPCALL属性を利用して関数を呼び出すと指定されたスマートコントラクトが呼び出される:

```C#
[Appcall("97b9373228d508155d5bdf75cd4703dfb1137fe0")]
public static extern bool AnotherContract(string arg, object[] args);
```

### SYSCALL
Syscall属性を利用して関数を呼び出すと対応するシステム関数が実際に呼び出される:

```C#
[Syscall("Quras.Account.GetBalance")]
public extern long GetBalance(byte[] asset_id);
```

### OPCALL
OPCODEの属性を利用して関数が呼び出されると命令に変換される:

```C#
[OpCode(Quras.VM.OpCode.LEFT)]
public extern static byte[] Take(byte[] good, int index);
```

### NONEMIT
NonEMit属性を利用して関数を実行すると構文規則を満たす変換が完了する。実際にQurasVMで変換を行う必要はない。

```C#
[Nonemit]
public extern static Delegate ToDelegate(this byte[] source);
```
### NonemitWithConvert
NonemitWitWitConvert属性を利用して関数を実行すると実際には変換が実行される。この関数への入力はコンパイルの段階で変換が行われるので定数である必要がある。

```C#
[NonemitWithConvert(ConvertMethod.ToScriptHash)]
public extern static byte[] ToScriptHash(this string address);
```

例えば、`“ASH……wk”.ToScriptHash();` はコンパイラが `“ABCD”`に変換できるために有効である。

しかし、`String xxx = "ASH……wk"; xxx.ToScriptHash();` コンパイラは XXX の値を判別できないから無効である。