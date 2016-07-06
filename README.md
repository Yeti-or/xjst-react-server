# React Server Engine for XJST

> npm i --save-dev xjst-react-server

## Usage

``` js
'use strict';

const xrs = require('xjst-react-server');
const runtime = new xrs.Engine();

// LIVE
runtime.compile(/* templates */);
runtime.apply(/* bemjson */);

// BUNDLE
const fs = require('fs');

fs.writeFileSync('./bundle.xrs.js', xrs.generate(/* templates */));

const compiledTemplates = require('./bundle.xrs.js');
compiledTemplates.apply(/* bemjson */);
```

[More docs and examples](https://github.com/bem/bem-xjst).

### License MIT
