'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

var _definition_reader = require('./definition_reader');

var _slack = require('./slack');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class Thread {
  constructor(config) {
    if (_lodash2.default.size(config.mongo) > 0) {
      const { connection, options } = config.mongo;

      this.mongo(connection, options);
    }
  }

  run(yamlPath) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const definitions = yield (0, _definition_reader.getDefinitions)();

      definitions.map(function (definition) {
        _nodeSchedule2.default.scheduleJob(definition.expr, _asyncToGenerator(function* () {
          const taskRunner = definition.task.bind(_this);

          yield taskRunner();

          (0, _slack.send)(definition.filename, yamlPath);
        }));
      });

      // TODO: Run server and show /documentation
      return definitions;
    })();
  }
}

Thread.prototype.mongo = require('./mongo');

exports.default = Thread;