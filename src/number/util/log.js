let type
// type = 'debug'

export const debug =
  type === 'debug'
    ? msg => {
        console.debug('[vue number] ' + msg)
      }
    : () => {}
export const warn = msg => {
  console.warn('[vue number] ' + msg)
}
export const error = msg => {
  throw new Error('[vue number] ' + msg)
}
