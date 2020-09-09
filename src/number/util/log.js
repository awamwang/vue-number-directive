let type
// type = 'debug'

export let debug =
  type === 'debug'
    ? msg => {
        console.debug('[vue number] ' + msg)
      }
    : () => {}
export let warn = msg => {
  console.warn('[vue number] ' + msg)
}
export let error = msg => {
  throw new Error('[vue number] ' + msg)
}
