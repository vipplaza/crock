import fs from 'await-fs'

export async function getDefinitions(){
  var list = unique(flatten(await dig('./')))
  return list.map(path_to_def=> require(`../${path_to_def}`) )
}

async function dig(cd){
  const lstat = await fs.lstat(cd)
  const isDirectory = lstat.isDirectory()
  if(isDirectory && cd.indexOf('node_modules') === -1){
    const list = await fs.readdir(cd)
    const res = list.map(li=>{
      if (cd.indexOf('definitions') > 0) {
        return fs.readdir(cd).then(dirs=> dirs.map(f=> `${cd}/${f}` ) )
      } else {
        return dig(`${cd}/${li}`)
      }
    })
    return await Promise.all(res)
  } else {
    if(cd.indexOf("definitions") > 0){
      return cd
    } else {
      return null
    }
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