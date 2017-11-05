'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefinitions = undefined;

let getDefinitions = exports.getDefinitions = (() => {
  var _ref = _asyncToGenerator(function* () {
    var list = unique(flatten((yield dig('./'))));
    return list.map(function (path_to_def) {
      return require(`../${path_to_def}`);
    });
  });

  return function getDefinitions() {
    return _ref.apply(this, arguments);
  };
})();

let dig = (() => {
  var _ref2 = _asyncToGenerator(function* (cd) {
    const lstat = yield _awaitFs2.default.lstat(cd);
    const isDirectory = lstat.isDirectory();
    if (isDirectory && cd.indexOf('node_modules') === -1) {
      const list = yield _awaitFs2.default.readdir(cd);
      const res = list.map(function (li) {
        if (cd.indexOf('definitions') > 0) {
          return _awaitFs2.default.readdir(cd).then(function (dirs) {
            return dirs.map(function (f) {
              return `${cd}/${f}`;
            });
          });
        } else {
          return dig(`${cd}/${li}`);
        }
      });
      return yield Promise.all(res);
    } else {
      if (cd.indexOf("definitions") > 0) {
        return cd;
      } else {
        return null;
      }
    }
  });

  return function dig(_x) {
    return _ref2.apply(this, arguments);
  };
})();

var _awaitFs = require('await-fs');

var _awaitFs2 = _interopRequireDefault(_awaitFs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function flatten(array, mutable) {
  var toString = Object.prototype.toString;
  var arrayTypeStr = '[object Array]';

  var result = [];
  var nodes = mutable && array || array.slice();
  var node;

  if (!array.length) {
    return result;
  }

  node = nodes.pop();

  do {
    if (toString.call(node) === arrayTypeStr) {
      nodes.push.apply(nodes, node);
    } else {
      result.push(node);
    }
  } while (nodes.length && (node = nodes.pop()) !== undefined);

  result.reverse(); // we reverse result to restore the original order
  return result;
}

function unique(basket) {
  var items = [];
  for (var i = 0; i < basket.length; i++) {
    if (basket[i] && !items.includes(basket[i])) {
      items.push(basket[i]);
    }
  }
  return items;
}