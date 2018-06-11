import schedule from 'node-schedule'
import { getDefinitions } from './definition_reader'
import { send } from './slack'


class Thread {
  constructor(config) {
    if (config.mongo) {
      const { connection, options } = config.mongo;
      
      this.mongo(connection, options);
    }
  }
    
  static async run(yamlPath) {
    const definitions = await getDefinitions();
    
    definitions.map(definition => {
      schedule.scheduleJob(definition.expr, () => {
        definition.task().bind(this);
          
        send(definition.filename, yamlPath);
      });
    })

    // TODO: Run server and show /documentation
    return definitions
  }
}

Thread.prototype.mongo = require('./mongo');

export default Thread;