'use strict';

import program from 'commander'
import Thread from './thread'
import config from './config'

program
  .version('0.0.1')
  .option('-y --yaml [path]', 'Specify yaml path', 'crock.yaml')
  .parse(process.argv);

const thread = new Thread(config);

thread.run(program.yaml)
.then(res=>{
  console.log(res.map(d=> `${d.filename} ${d.expr} ${d.description}` ).join("\n"))
})
.catch(err=>{
  console.error(err)
})