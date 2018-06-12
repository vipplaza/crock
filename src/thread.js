import schedule from 'node-schedule'
import { getDefinitions } from './definition_reader'
import { send } from './slack'
import _ from 'lodash'

class Thread {
  constructor(config) {
    console.log(_.size(config.mongo), config.mongo);
    if (_.size(config.mongo) > 0) {
      const { connection, options } = config.mongo;
      
      this.mongo(connection, options);
    }
  }
    
  async run(yamlPath) {
    const definitions = await getDefinitions();
    
    definitions.map(definition => {
      schedule.scheduleJob(definition.expr, () => {
        const taskRunner = definition.task.bind(this);
        
        taskRunner();
        
        send(definition.filename, yamlPath);
      });
    })

    // TODO: Run server and show /documentation
    return definitions
  }
}

Thread.prototype.mongo = require('./mongo');

export default Thread;