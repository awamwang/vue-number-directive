const SquareBracketPropRegex = /\[(['"`](\S+)['"`]|\d+)\]/g // 匹配["xx"]/[0]一类普通属性
const VarPropRegex = /\[(\S+)\]/g // 匹配计算属性（本身也为变量的属性名称）

export interface Context {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
// export class PropHandler {}

function getContext(contextChain: Array<Context>, key: string): Context {
  for (let i = 0, len = contextChain.length; i < len; i++) {
    // check scope first, then context
    if (Object.prototype.hasOwnProperty.call(contextChain[i], key)) {
      return contextChain[i]
    }
  }

  throw new Error('no context found')
}

/**
 * 规范化属性路径
 *   - 将[]形式转为`.`形式
 *   - 把计算属性转化为普通属性
 *
 * @param contextChain
 * @param str
 */
function normalizePath(contextChain: Array<Context>, str: string) {
  str = str.trim()
  str = str.replace(SquareBracketPropRegex, '.$1')
  str = str.replace(VarPropRegex, (word: string, firstMatch: string) => {
    // 处理计算属性
    return '.' + getProp(contextChain, firstMatch)
  })

  return str
}

/**
 * 根据属性路径表达式获取属性值
 *
 * @param contextChain 可查询属性的对象列表，类似作用域链
 * @param path 属性路径表达式
 */
export const getProp = function getProp(contextChain: Array<Context>, path: string): unknown {
  if (!Array.isArray(contextChain)) {
    contextChain = [contextChain]
  }

  // let res
  const propArr: Array<string> = normalizePath(contextChain, path).split('.')
  let context: Context = getContext(contextChain, propArr[0])

  while (propArr.length > 1) {
    context = context[propArr.shift() as string]
  }

  return context[propArr[0]]
}

/**
 * 根据属性路径表达式设置特定的属性值
 *
 * @param contextChain 可查询属性的对象列表，类似作用域链
 * @param path 属性路径表达式
 * @param value 给属性设置的值
 */
export const setProp = function setProp(
  contextChain: Array<Context>,
  path: string,
  value: string
): void {
  if (!Array.isArray(contextChain)) {
    contextChain = [contextChain]
  }

  const propArr: Array<string> = normalizePath(contextChain, path).split('.')
  let context: Context = getContext(contextChain, propArr[0])

  while (propArr.length > 1) {
    context = context[propArr.shift() as string]
  }

  // HACK: 由于events顺序问题，需要在setImmediate设置值；副作用——一些浏览器中回闪现删除的过程
  setTimeout(() => {
    context[propArr[0]] = value
  }, 0)
}

// eslint-disable-next-line
export const removeItem = function (arr: Array<any>, item: any): void {
  const idx = arr.indexOf(item)

  if (idx > -1) {
    arr.splice(idx, 1)
  }
}

/**
 * 返回带有缓存的函数
 *
 * @param fn
 */
export const cache = function <T>(fn: (str: string) => T): (str: string) => T {
  const cached: {
    [key: string]: T
  } = {}

  return function (str: string): T {
    if (cached[str]) {
      return cached[str]
    } else {
      return (cached[str] = fn(str))
    }
  }
}

/**
 * 判断两个Option对象是否等效
 *
 * @param obj1
 * @param obj2
 */
export const isSameOption = function (obj1: Context, obj2: Context): boolean {
  return Object.keys(obj1).every((key) => {
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
