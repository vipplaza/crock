'use strict';

const _ = require('lodash');

module.exports = {
  mongo: {
    connection: {
      scheme: 'mongodb',
      hosts: _.compact([{
        host: _.get(process.env, 'DATABASE_HOST'),
        port: _.get(process.env, 'DATABASE_PORT')
      }]),
      database: _.get(process.env, 'DATABASE_NAME'),
      username: _.get(process.env, 'DATABASE_USERNAME'),
      password: _.get(process.env, 'DATABASE_PASSWORD')
    },
    options: {
      useMongoClient: _.get(process.env, 'MONGO_USE_CLIENT'),
      // Don't build indexes
      autoIndex: _.get(process.env, 'MONGO_AUTO_INDEX'),
      // Never stop trying to reconnect
      reconnectTries: _.get(process.env, 'MONGO_RECONNECT_TRIES'),
      // Reconnect every 500ms
      reconnectInterval: _.get(process.env, 'MONGO_RECONNECT_INTERVAL'),
      // Maintain up to 10 socket connections
      poolSize: _.get(process.env, 'MONGO_POOL_SIZE'),
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: _.get(process.env, 'MONGO_BUFFER_MAX_ENTRIES')
    }
  }
};