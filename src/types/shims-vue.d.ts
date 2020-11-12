declare module 'vue/types/vnode' {
  interface VNodeData {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    model?: { expression: any }
  }
}
