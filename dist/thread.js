'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

var _definitionReader = require('./definitionReader');

var _slack = require('./slack');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class Thread {
  static run(yaml_path) {
    return _asyncToGenerator(function* () {
      const definitions = yield (0, _definitionReader.getDefinitions)();
      definitions.map(function (def) {
        _nodeSchedule2.default.scheduleJob(def[0], function (_) {
          def[1]();
          (0, _slack.send)(def[2], yaml_path);
        });
      });
      return definitions;
    })();
  }
}
exports.default = Thread;