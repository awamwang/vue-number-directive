import {
  error
  // warn
} from './log'

const AllowedInputType = ['number', 'text', 'tel', 'hidden']
const AllowedTagList = [
  'b',
  'caption',
  'cite',
  'code',
  'const',
  'dd',
  'del',
  'div',
  'dfn',
  'dt',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'ins',
  'kdb',
  'label',
  'li',
  'option',
  'output',
  'p',
  'q',
  's',
  'sample',
  'span',
  'strong',
  'td',
  'th',
  'u'
]

function getChildInput(el) {
  if (el.children) {
    for (let i = 0, len = el.children.length; i < len; i++) {
      let child = el.children[i]
      if (child.tagName === 'INPUT') {
        return child
      }
    }
  }

  return el
}

function handleElementUI(el, inputDom, vnode) {
  if (Array.prototype.includes.call(el.classList, 'el-input')) {
    if (vnode.data.model && vnode.data.model.value !== undefined) {
      inputDom.value = vnode.data.model.value
    }
  }
}

export let getInputDom = (el, vnode) => {
  let inputDom = getChildInput(el)
  handleElementUI(el, inputDom, vnode)

  if (inputDom.tagName === 'INPUT') {
    if (
      inputDom.getAttribute('type') &&
      !AllowedInputType.includes(inputDom.getAttribute('type'))
    ) {
      error('wrong INPUT element type')
    }
  } else if (!inputDom.getAttribute('contenteditable')) {
    if (AllowedTagList.includes(inputDom.tagName.toLowerCase)) {
      // warn('once use to format number')
    } else {
      error('wrong element type, or should be contenteditable')
    }
  }

  return inputDom
}

export let unshiftEventHandler = (el, eventType, handler) => {
  el.addEventListener(eventType, handler)
  // let handlerArr = getEventListeners(el)[eventType]
  // console.log(handlerArr)

  // if (handlerArr) {
  //   handlerArr.unshift(handler)
  // } else {
  //   el.addEventListener(eventType, handler)
  // }
}

export let getVNodeValue = (vnode, ele) => {
  let res

  if (vnode.data && vnode.data.model) {
    res = vnode.data.model.value
  } else if (vnode.data && vnode.data.domProps) {
    res = vnode.data.domProps.value
  } else if (ele && ele.tagName !== 'INPUT' && ele.innerText) {
    res = ele.innerText
  } else {
    // warn('target vnode hasn\'t bound value, may cause bug')
  }
  return res
}

export let getElementValue = ele => {
  let res

  if (ele.tagName === 'INPUT') {
    res = ele.value
  } else {
    res = ele.innerText
  }

  return res
}
