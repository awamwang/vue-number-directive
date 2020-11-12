let logLevel: any

export function configLog({ debug }: any) {
  logLevel = debug ? 'debug' : ''
}

export const debug = (...args: Array<any>) => {
  if (logLevel === 'debug') {
    console.debug('[vue number]', ...args)
  }
}
export const warn = (...args: Array<any>) => {
  console.warn('[vue number]', ...args)
}
export const error = (msg: string) => {
  throw new Error(`[vue number] ${msg}`)
}
