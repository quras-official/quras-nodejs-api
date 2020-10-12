---
id: api-logging
title: Logging
---

loggingモジュールを利用して `quras-js` 内部のログを残すことができる。

```js
import {logging} from 'quras-js'
logging.logger.setAll('info') // quras-jsのlogger levelをinfoに設定する。
const apiLogger = logging.logger.getLogger('api') // apiモジュールに対するloggerを得る。
apiLogger.setLevel('warn') // apiモジュールに対するlogger levelをwarnに設定する。
```

すべてのログは `stdout`と `stderr`に出力されるようになる。
標準logger方式は 'slient'方式である。