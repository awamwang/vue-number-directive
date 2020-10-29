const StringPropRegex = /\[['"`]{1}(\S+)['"`]{1}\]/g
const VarPropRegex = /\[(\S+)\]/g

function runContextChain(contextChain: any, key: any, fn: any) {
  let context

  for (let i = 0, len = contextChain.length; i < len; i++) {
    // check scope first, then context
    if (Object.prototype.hasOwnProperty.call(contextChain[i], key)) {
      context = contextChain[i]
      break
    }
  }

  fn(context)
}

function transSquareBracketToDot(contextChain: any, str: any) {
  str = str.replace(StringPropRegex, '.$1')
  str = str.replace(VarPropRegex, (word: any, firstMatch: any) => {
    return '.' + getProp(contextChain, firstMatch)
  })

  return str
}

export const getProp = function getProp(contextChain: any, path: any) {
  path = transSquareBracketToDot(contextChain, path)

  let res
  let arr = path.split('.')
  runContextChain(contextChain, arr[0], (context: any) => {
    while (arr.length > 1) {
      context = context[arr.shift()]
    }

    res = context[arr[0]]

  })

  return res
}

export const setProp = function setProp(contextChain: any, path: any, value: any) {
  if (!Array.isArray(contextChain)) {
    contextChain = [contextChain]
  }

  path = transSquareBracketToDot(contextChain, path)

  let arr = path.split('.')
  runContextChain(contextChain, arr[0], (context: any) => {
    while (arr.length > 1) {
      context = context[arr.shift()]
    }

    // HACK: 由于events顺序问题，需要在setImmediate设置值；副作用——一些浏览器中回闪现删除的过程
    setTimeout(() => {
      context[arr[0]] = value
    }, 0)
  })
}

export const removeItem = function(arr: any, item: any) {
  let idx = arr.indexOf(item)

  if (idx > -1) {
    arr.splice(idx, 1)
  }
}

export const cache = function(fn: any) {
  let cached: any = []
  return function(str: any) {
    if (cached[str]) {
      return cached[str]
    } else {
      return (cached[str] = fn(str))
    }
  };
}

export const isSameOption = function(obj1: any, obj2: any) {
  return Object.keys(obj1).every(key => {
    if (key === 'vnode') {
      return obj1[key].context._uid === obj2[key].context._uid
    } else if (key === 'scope') {
      return true
    } else {
      // if (obj1[key] !== obj2[key]) {
      //   console.log(obj1[key], obj2[key])
      // }
      return obj1[key] === obj2[key]
    }
  })
}
