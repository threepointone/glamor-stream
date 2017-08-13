'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = inline;

var _through = require('through');

var _through2 = _interopRequireDefault(_through);

var _htmlTokenize = require('html-tokenize');

var _htmlTokenize2 = _interopRequireDefault(_htmlTokenize);

var _multipipe = require('multipipe');

var _multipipe2 = _interopRequireDefault(_multipipe);

var _glamor = require('glamor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GlobalTypes = ['raw', 'keyframes', 'font-face'];

function inline() {

  var insed = {};
  var tokenStream = (0, _htmlTokenize2.default)();
  var globalInserted = false;

  var inlineStream = (0, _through2.default)(function write(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        type = _ref2[0],
        data = _ref2[1];

    if (type === 'open') {
      var css = [];
      if (!globalInserted) {
        Object.keys(_glamor.styleSheet.inserted).filter(function (id) {
          return GlobalTypes.indexOf(_glamor.styleSheet.registered[id].type) >= 0;
        }).forEach(function (id) {
          return css.push(_glamor.styleSheet.inserted[id].join(''));
        });
        globalInserted = true;
      }

      var ids = {},
          match = void 0;
      var fragment = data.toString();
      var regex = /css\-([a-zA-Z0-9\-_]+)/gm;
      while ((match = regex.exec(fragment)) !== null) {
        if (!insed[match[1] + '']) {
          ids[match[1] + ''] = insed[match[1] + ''] = true;
        }
      }

      Object.keys(ids).forEach(function (id) {
        css.push(_glamor.styleSheet.inserted[id].join(''));
      });

      if (css) {
        this.queue('<style data-glamor-chunk>' + css.join('') + '</style>');
      }
    }
    this.queue(data);
  }, function end() {
    this.queue(null);
  });

  return (0, _multipipe2.default)(tokenStream, inlineStream);
}