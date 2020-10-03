const StringPropRegex = /\[['"`]{1}(\S+)['"`]{1}\]/g
const VarPropRegex = /\[(\S+)\]/g

function runContextChain(contextChain, key, fn) {
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

    // HACK: 由于events顺序问题，需要在setImmediate设置值；副作用——一些浏览器中回闪现删除的过程
    setImmediate(() => {
      context[arr[0]] = value
    })
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

export const isSameOption = function(obj1, obj2) {
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
