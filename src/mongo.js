'use strict';

const mongoose = require('mongoose');
const mongodbUri = require('mongodb-uri');
const Promise = require('bluebird');
const debug = require('debug')('crock:mongo');

mongoose.Promise = Promise;


module.exports = async function(connection, options) {
  const uri = mongodbUri.format(connection);

  try {
    this.db = await mongoose.connect(uri, options);
    
    debug('successful connection to MongoDB using collection: [%s]', uri);
  } catch (error) {
    debug('error connecting to MongoDB using connection: [%s]', uri);
    
    throw error;
  } 
  
  return this;
};