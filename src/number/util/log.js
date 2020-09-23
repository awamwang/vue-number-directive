let type

export function configLog({ debug }) {
  type = debug ? 'debug' : ''
}

export const debug = (...args) => {
  if (type === 'debug') {
    console.debug('[vue number]', ...args)
  }
}
export const warn = (...args) => {
  console.warn('[vue number]', ...args)
}
export const error = (...args) => {
  throw new Error('[vue number] ', ...args)
}
