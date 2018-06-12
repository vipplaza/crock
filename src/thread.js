import schedule from 'node-schedule'
import { getDefinitions } from './definition_reader'
import { send } from './slack'
import _ from 'lodash'

class Thread {
  constructor(config) {
    if (_.size(config.mongo) > 0) {
      const { connection, options } = config.mongo;
      
      this.mongo(connection, options);
    }
  }
    
  async run(yamlPath) {
    const definitions = await getDefinitions();
    
    definitions.map(definition => {
      schedule.scheduleJob(definition.expr, () => {
        definition.task.bind(this);
        definition.task();
        
        send(definition.filename, yamlPath);
      });
    })

    // TODO: Run server and show /documentation
    return definitions
  }
}

Thread.prototype.mongo = require('./mongo');

export default Thread;