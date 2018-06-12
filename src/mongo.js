'use strict';

const mongoose = require('mongoose');
const mongodbUri = require('mongodb-uri');
const Promise = require('bluebird');
const debug = require('debug')('crock:mongo');

mongoose.Promise = Promise;

let defaults = {
  useMongoClient: true,
  // Don't build indexes
  autoIndex: false,
  // Never stop trying to reconnect
  reconnectTries: Number.MAX_VALUE,
  // Reconnect every 500ms
  reconnectInterval: 500,
  // Maintain up to 10 socket connections
  poolSize: 10,
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
};

module.exports = async function(connection, options) {
  const uri = mongodbUri.format(connection);
  
  options = Object.assign(defaults, options);
  
  try {
    this.connection = await mongoose.connect(uri, options);
    
    debug('successful connection to MongoDB using collection: [%s]', uri);
  } catch (error) {
    debug('error connecting to MongoDB using connection: [%s]', uri);
    
    throw error;
  } 
  
  return this;
};