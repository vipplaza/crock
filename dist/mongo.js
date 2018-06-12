'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const mongoose = require('mongoose');
const mongodbUri = require('mongodb-uri');
const Promise = require('bluebird');
const debug = require('debug')('crock:mongo');

mongoose.Promise = Promise;

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (connection, options) {
    const uri = mongodbUri.format(connection);
    console.log('uri: ', uri);
    try {
      this.connection = yield mongoose.connect(uri, options);

      debug('successful connection to MongoDB using collection: [%s]', uri);
    } catch (error) {
      debug('error connecting to MongoDB using connection: [%s]', uri);

      throw error;
    }

    return this;
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();