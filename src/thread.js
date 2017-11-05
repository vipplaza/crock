import schedule from 'node-schedule'
import { getDefinitions } from './definitionReader'
import { send } from './slack'


export default class Thread {
  static async run(yaml_path){
    const definitions = await getDefinitions()
    definitions.map(def=> {
      schedule.scheduleJob(def[0], _=>{
        def[1]()
        send(def[2], yaml_path)
      })
    })
    return definitions
  }
}