'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _thread = require('./thread');

var _thread2 = _interopRequireDefault(_thread);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version('0.0.1').option('-y --yaml [path]', 'Specify yaml path', 'crock.yaml').parse(process.argv);

const thread = new _thread2.default(_config2.default);

thread.run(_commander2.default.yaml).then(res => {
  console.log(res.map(d => `${d.filename} ${d.expr} ${d.description}`).join("\n"));
}).catch(err => {
  console.error(err);
});