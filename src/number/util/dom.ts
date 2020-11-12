import { error, warn } from './log'

const InputTagList = ['INPUT', 'TEXTAREA']
const AllowedInputType = ['number', 'text', 'tel', 'hidden', 'password', 'search']
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
const ElementUIClassList = ['el-input__inner']

function isInputLike(el: any) {
  return InputTagList.includes(el.tagName) || el.getAttribute('contenteditable')
}

function getChildInputs(el: any): Array<HTMLElement> {
  let res = []

  if (isInputLike(el)) {
    res.push(el)
  }

  if (el.children) {
    res = res.concat(
      Array.prototype.reduce.call(
        el.children,
        (arr, child: HTMLElement): Array<HTMLElement> => {
          return (arr as Array<HTMLElement>).concat(getChildInputs(child))
        },
        []
      )
    )
  }

  return res
}

function handleElementUI(inputDom: any, vnode: any) {
  if (ElementUIClassList.some((c) => Array.prototype.includes.call(inputDom.classList, c))) {
    if (vnode.data.model && vnode.data.model.value !== undefined) {
      inputDom.value = vnode.data.model.value
    }
  }
}

export const getInputDom = (el: any, vnode: any) => {
  const inputDomList = getChildInputs(el)
  const inputDom: HTMLElement = inputDomList[0]
  if (!inputDomList.length) {
    error('no input like element found')
  } else if (inputDomList.length > 1) {
    warn('more than one input like element found, use first')
  }

  handleElementUI(inputDom, vnode)

  if (inputDom.tagName === 'INPUT') {
    if (
      inputDom.getAttribute('type') &&
      !AllowedInputType.includes(inputDom.getAttribute('type') || '')
    ) {
      error('wrong INPUT element type')
    }
  } else if (!inputDom.getAttribute('contenteditable')) {
    if (AllowedTagList.includes(inputDom.tagName.toLowerCase())) {
      // warn('once use to format number')
    } else {
      error('wrong element type, or should be contenteditable')
    }
  }
  // else if (inputDom.tagName === 'TEXTAREA') {
  // }

  return inputDom
}

export const unshiftEventHandler = (el: any, eventType: any, handler: any) => {
  el.addEventListener(eventType, handler)
  // let handlerArr = getEventListeners(el)[eventType]
  // console.log(handlerArr)

  // if (handlerArr) {
  //   handlerArr.unshift(handler)
  // } else {
  //   el.addEventListener(eventType, handler)
  // }
}

export const getDomValue = (el: any) => {
  return InputTagList.includes(el.tagName) ? el.value : el.innerText
}

export const setDomValue = (el: any, value: any) => {
  InputTagList.includes(el.tagName) ? (el.value = value) : (el.innerText = value)
}
