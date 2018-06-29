'use strict';

const _ = require('lodash');

const isEmpty = function (value) {
  return _.isEqual(value, []) || _.isEqual(value, {}) || _.isNull(value) || _.isUndefined(value) || _.isEqual(value, '') || _.isEqual(value, 0) || _.isEqual(value, '0');
};

const generateScheme = function () {
  return isEmpty(_.get(process.env, 'USE_REPLICA_SET')) ? 'mongodb' : 'mongodb+srv';
};

module.exports = {
  mongo: {
    connection: {
      scheme: generateScheme(),
      hosts: _.compact([{
        host: _.get(process.env, 'DATABASE_HOST'),
        port: _.get(process.env, 'DATABASE_PORT')
      }]),
      database: _.get(process.env, 'DATABASE_NAME'),
      username: _.get(process.env, 'DATABASE_USERNAME'),
      password: _.get(process.env, 'DATABASE_PASSWORD'),
      options: _.omitBy({
        authSource: _.get(process.env, 'AUTH_SOURCE', null),
        retryWrites: _.get(process.env, 'RETRY_WRITES', null)
      }, isEmpty)
    },
    options: {
      // Don't build indexes
      autoIndex: _.get(process.env, 'MONGO_AUTO_INDEX', false),
      // Never stop trying to reconnect
      reconnectTries: _.get(process.env, 'MONGO_RECONNECT_TRIES', Number.MAX_VALUE),
      // Reconnect every 500ms
      reconnectInterval: _.get(process.env, 'MONGO_RECONNECT_INTERVAL', 500),
      // Maintain up to 10 socket connections
      poolSize: _.get(process.env, 'MONGO_POOL_SIZE', 10),
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: _.get(process.env, 'MONGO_BUFFER_MAX_ENTRIES', 0)
    }
  }
};