---
id: api-u
title: Utility
---

utilityモジュールを利用する方法は次の通りである。

```js
import QurasLib from 'quras-js'
QurasLib.u.reverseHex(hexstring)

import { u } from 'quras-js'
u.reverseHex(hexstring)
```

utilityモジュールは次の3つの形式の関数を提供する。

- 文字列の形式変換と関連するメソッド
- ハッシュ関数に関するメソッド
- Utilityクラス

## Utiltity クラス

### Fixed8 クラス

Fixed8クラスはQURASブロックチェーンで資産の量を管理する基本資料型でbignumberに対する計算処理を進めるために開発されたクラスである。

```js
import QurasLib from 'quras-js'
const a = new QurasLib.u.Fixed8(1)
a.toHex()        // '0000000005f5e100'
a.toReverseHex() // '00e1f50500000000'

const b = QurasLib.u.Fixed8.fromHex('0000000005f5e100') // 1

import {u} from 'quras-js'
const c = new u.Fixed8('2')
const d = u.Fixed8.fromReverseHex('00e1f50500000000')
```

## 関数

### 形式変換関連の関数

QurasLibで多く利用される文字列変換関数がここに述べられている。

```js
import QurasLib from 'quras-js'
QurasLib.u.reverseHex(hexstring)
QurasLib.u.num2fixed8(1)
QurasLib.u.ab2str(arrayBuffer)

// 16進数文字列に変換
QurasLib.u.str2hexstring('QurasString') // 5175726173537472696e67
QurasLib.u.int2hex(234) // EA
QurasLib.u.ab2hexstring(arrayBuffer)

// 16進数文字列を一般文字列に変更
QurasLib.u.hexstring2str('5175726173537472696e67') // QurasString
QurasLib.u.hex2int('EA') // 234
QurasLib.u.hexstring2ab(hexString)
```

### ハッシュ関連関数

utilityモジュールではsha256、hash256、hash160のようなQURASブロックチェーンで利用される基本ハッシュ関数をご提供している。

使い方式は次の通りである。
```js
import QurasLib from 'quras-js'
// Performs a single SHA
QurasLib.u.sha256(item)
// Performs a SHA followed by a SHA
QurasLib.u.hash256(item)
// Performs a SHA followed by a RIPEMD160
QurasLib.u.hash160(item)
```

