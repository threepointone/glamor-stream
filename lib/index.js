'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {

  var insed = {};

  return (0, _through2.default)(function write(data) {
    var html = data.toString();
    var regex = /css\-([a-zA-Z0-9\-_]+)/gm;
    var match = void 0,
        ids = {};
    while ((match = regex.exec(html)) !== null) {
      if (!insed[match[1] + '']) {
        ids[match[1] + ''] = insed[match[1] + ''] = true;
      }
    }
    var rules = _glamor.styleSheet.rules().filter(function (x) {
      var regex = /css\-([a-zA-Z0-9\-_]+)/gm;
      var match = regex.exec(x.cssText);
      if (match && ids[match[1] + '']) {
        return true;
      }
      if (!match) {
        return true;
      }
      return false;
    });
    var css = rules.map(function (x) {
      return x.cssText;
    }).join('');
    css = css.length > 0 ? '<style data-glamor-chunk>' + css + '</style>' : css;
    this.queue(css);
    this.queue(data.toString());
  }, function end() {
    this.queue(null);
  });
};

var _through = require('through');

var _through2 = _interopRequireDefault(_through);

var _glamor = require('glamor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }