'use strict';

var inherits = require('inherits');
var Entity = require('bem-xjst/lib/bemhtml/entity').Entity;
var BEMHTML = require('bem-xjst/lib/bemhtml');

var ReactMarkupChecksum = require('../ReactMarkupChecksum');

function ReactServer() {
  BEMHTML.apply(this, arguments);
}

inherits(ReactServer, BEMHTML);
module.exports = ReactServer;

ReactServer.prototype.Entity = Entity;

var i = 0;
var flag = 0;

ReactServer.prototype.renderClose = function renderClose(prefix,
                                                     context,
                                                     tag,
                                                     attrs,
                                                     isBEM,
                                                     ctx,
                                                     content) {
  var out = prefix;
  var isObj = function isObj(val) {
    return val && typeof val === 'object' && !Array.isArray(val) &&
      val !== null;
  };


  // NOTE: maybe we need to make an array for quicker serialization
  if (isObj(attrs) || isObj(ctx.attrs)) {
    attrs = utils.extend(attrs, ctx.attrs);

    /* jshint forin : false */
    for (var name in attrs) {
      var attr = attrs[name];
      if (attr === undefined || attr === false || attr === null)
        continue;

      if (attr === true)
        out += ' ' + name;
      else
        out += ' ' + name + '="' +
          utils.attrEscape(utils.isSimple(attr) ?
                           attr :
                           this.context.reapply(attr)) +
                           '"';
    }
  }

  if (flag === 0) {
    out += ' data-reactroot=""';
    flag++;
  }
  out += ' data-reactid="' + ++i + '"';

  if (utils.isShortTag(tag)) {
    out += this._shortTagCloser;
    if (this.canFlush)
      out = context._flush(out);
  } else {
    out += '>';
    if (this.canFlush)
      out = context._flush(out);

    // TODO(indutny): skip apply next flags
    if (content || content === 0) {
      flag++;
      out += this.renderContent(content, isBEM);
      flag--;
    }

    out += '</' + tag + '>';
  }

  if (flag === 1) {
    out = ReactMarkupChecksum.addChecksumToMarkup(out);
    flag++;
  }
  if (this.canFlush)
    out = context._flush(out);
  return out;
};
