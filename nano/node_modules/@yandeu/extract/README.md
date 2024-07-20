# Extract

Extract package.json properties.

## Installation

```console
npm install @yandeu/extract
```

## Usage

### CLI (example 1)

```json
"name": "awesomepackage",
"version": "1.2.0",
"keywords": [
  "awesome",
  "fast"
],
"scripts": {
  "extract-version": "extract version VERSION.js",
  "test": "jest --coverage"
},
```

`npm run extract-version` will generate:

```js
// VERSION.js
exports.VERSION = "1.2.0";
```

### CLI (example 2)

```json
"scripts": {
  "extract": "extract name keywords scripts.test src/const.ts",
},
```

`npm run extract` will generate:

```ts
// src/const.ts
export const NAME = "awesomepackage";
export const KEYWORDS = ["awesome", "fast"];
export const TEST = "jest --coverage";
```

### Node.js

```js
// index.cjs
const { extract } = require('extract')

extract(['name', 'version'], 'properties.js', false)
```

```js
// index.mjs
import { extract } from 'extract/lib/extract.js'

extract(['name', 'version'], 'properties.js', false)
```

```js
// index.ts
import { extract } from 'extract'

extract(['name', 'version'], 'properties.js', false)
```

## License

[MIT](LICENSE)
