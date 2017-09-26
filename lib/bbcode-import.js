'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = BBCodeToState;

var _bbcodeParser = require('bbcode-parser');

var _bbcodeParser2 = _interopRequireDefault(_bbcodeParser);

var _bbTag = require('bbcode-parser/bbTag');

var _bbTag2 = _interopRequireDefault(_bbTag);

var _stateFromElement = require('./utils/state-from-element.js');

var _stateFromElement2 = _interopRequireDefault(_stateFromElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getElement(html) {
    var doc = void 0;
    if (typeof DOMParser !== 'undefined') {
        var parser = new DOMParser();
        doc = parser.parseFromString(html, 'text/html');
    } else {
        doc = document.implementation.createHTMLDocument('');
        doc.documentElement.innerHTML = html;
    }
    return doc.body;
}

function BBCodeToState() {
    var bbcode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var customTags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var bbTags = _bbcodeParser2.default.defaultTags();

    Object.assign(bbTags, {
        h1: _bbTag2.default.createSimpleTag('h1'),
        h2: _bbTag2.default.createSimpleTag('h1'),
        h3: _bbTag2.default.createSimpleTag('h1'),
        quote: _bbTag2.default.createSimpleTag('quote'),
        ul: _bbTag2.default.createSimpleTag('ul'),
        li: _bbTag2.default.createSimpleTag('li'),
        ol: _bbTag2.default.createSimpleTag('ol'),
        img: _bbTag2.default.createTag('img', function (tag, content, attr) {
            var caption = attr['img-caption'] ? '<figcaption>' + attr['img-caption'] + '</figcaption>' : '';
            return '<figure><img src="' + content + '"/>' + caption + '</figure>';
        })
    }, customTags);

    var parser = new _bbcodeParser2.default(bbTags);
    var htmlString = parser.parseString(bbcode);
    return (0, _stateFromElement2.default)(getElement(htmlString));
}