'use strict';

const fs = require('fs');
const Compiler = require('bem-xjst/lib/compiler').Compiler;

const xrs  = require('./xjst-react-server');

module.exports = function compiler(templates) {
  xrs.source = fs.readFileSync(require.resolve('./xjst-react-server/bundle'), 'utf-8');
  const compiler = new Compiler(xrs);

  return compiler.generate(templates, {
    engine: 'XRS',
    exportName: 'XRS'
  });
}
