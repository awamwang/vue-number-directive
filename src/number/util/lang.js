const StringPropRegex = /\[['"`]{1}(\S+)['"`]{1}\]/g
const VarPropRegex = /\[(\S+)\]/g

function runContextChain(contextChain, key, fn) {
  let context

  for (let i = 0, len = contextChain.length; i < len; i++) {
    // first check scope, then context
    if (contextChain[i][key] !== void 0) {
      context = contextChain[i]
      break
    }
  }

  fn(context)
}

function transSquareBracketToDot(contextChain, str) {
  str = str.replace(StringPropRegex, '.$1')
  str = str.replace(VarPropRegex, (word, firstMatch) => {
    return '.' + getProp(contextChain, firstMatch)
  })

  return str
}

export const getProp = function getProp(contextChain, path) {
  path = transSquareBracketToDot(contextChain, path)

  let res
  let arr = path.split('.')
  runContextChain(contextChain, arr[0], context => {
    while (arr.length > 1) {
      context = context[arr.shift()]
    }
    res = context[arr[0]]
  })
  return res
}

export const setProp = function setProp(contextChain, path, value) {
  if (!Array.isArray(contextChain)) {
    contextChain = [contextChain]
  }

  path = transSquareBracketToDot(contextChain, path)

  let arr = path.split('.')
  runContextChain(contextChain, arr[0], context => {
    while (arr.length > 1) {
      context = context[arr.shift()]
    }
    context[arr[0]] = value
  })
}

export const removeItem = function(arr, item) {
  let idx = arr.indexOf(item)

  if (idx > -1) {
    arr.splice(idx, 1)
  }
}

export const cache = function(fn) {
  let cached = []
  return function(str) {
    if (cached[str]) {
      return cached[str]
    } else {
      return (cached[str] = fn(str))
    }
  }
}

export const isSameOptions = function(obj1, obj2) {
  return Object.keys(obj1).every(key => {
    if (key === 'vnode') {
      return obj1[key].context._uid === obj2[key].context._uid
    } else {
      return obj1[key] === obj2[key]
    }
  })
}
