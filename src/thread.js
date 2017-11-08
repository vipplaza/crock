import schedule from 'node-schedule'
import { getDefinitions } from './definition_reader'
import { send } from './slack'


export default class Thread {
  static async run(yaml_path){
    const definitions = await getDefinitions()
    definitions.map(def=> {
      schedule.scheduleJob(def.expr, _=>{
        def.task()
        send(def.filename, yaml_path)
      })
    })
    return definitions
  }
}