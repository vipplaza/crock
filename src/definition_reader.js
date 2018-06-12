'use strict';

import fs from 'await-fs'
import path from 'path';

const distanceFromHereToCallee = process.env.PWD;

export async function getDefinitions(){
  const list = await flatMap(await traverse('.'))
  const def_paths = list.filter(path=> path.indexOf("definitions") > 0 )
  
  return def_paths.map(def_path=> require(path.join(distanceFromHereToCallee, def_path)))
}

async function traverse(cd){
  
  const lstat = await fs.lstat(cd)
  const isDirectory = lstat.isDirectory()
  if(isDirectory && cd.indexOf('node_modules') === -1 && cd.indexOf('.git') === -1){
    const list = await fs.readdir(cd)
    const res = list.map(li=> traverse(`${cd}/${li}`) )
    return res
  } else {
    return cd
  }
}

async function flatMap(promises){
  promises = flatten(promises)
  const containsPromise = promises.filter(p=> !!p.then ).length > 0
  if(containsPromise){
    return flatMap(await Promise.all(promises))
  } else {
    const paths = promises
    return paths
  }
}

function flatten(array, mutable){
  var toString = Object.prototype.toString
  var arrayTypeStr = '[object Array]'
  
  var result = []
  var nodes = (mutable && array) || array.slice()
  var node

  if (!array.length) {
      return result
  }

  node = nodes.pop()
  
  do {
      if (toString.call(node) === arrayTypeStr) {
          nodes.push.apply(nodes, node)
      } else {
          result.push(node)
      }
  } while (nodes.length && (node = nodes.pop()) !== undefined)

  result.reverse() // we reverse result to restore the original order
  return result
}

function unique(basket){
  var items = []
  for (var i=0; i<basket.length; i++) {  
    if (basket[i] && !items.includes(basket[i])) {
      items.push(basket[i])
    }
  }
  return items
}