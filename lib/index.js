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
    var css = [];
    Object.keys(ids).forEach(function (id) {
      css.push(_glamor.styleSheet.inserted[id].join(''));
    });

    if (css) {
      this.queue('<style data-glamor-chunk>' + css.join('') + '</style>');
    }

    this.queue(data.toString());
  }, function end() {
    this.queue(null);
  });
};

var _through = require('through');

var _through2 = _interopRequireDefault(_through);

var _glamor = require('glamor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }