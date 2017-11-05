'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _thread = require('./thread');

var _thread2 = _interopRequireDefault(_thread);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version('0.0.1').option('-y --yaml [path]', 'Specify yaml path', './crock.yaml').parse(process.argv);

_thread2.default.run(_commander2.default.yaml).then(res => {
  console.log(res.map(d => `${d[2]} ${d[0]}`).join("\n"));
}).catch(err => {
  console.error(err);
});