import { getProp, setProp } from '../../../dist/number/util/lang'

const data = {
  key1: 1,
  propName: 'propDeep',
  list: [
    2,
    {
      prop1: 'foo',
    },
  ],
}
const otherData = {
  key2: 2,
  key1: 3,
  propDeep: 'deep',
  list: [
    20,
    {
      prop1: 'zoo',
      propName: 'hi',
    },
  ],
}
const otherData1 = {
  key2: 2,
  hi: 'hi',
  key1: 4,
}

describe('获取prop', () => {
  it('单个context获取', () => {
    expect(getProp(data, 'key1')).to.equal(1)
    expect(getProp(data, 'list[0]')).to.equal(2)
    expect(getProp(data, 'list[1].prop1')).to.equal('foo')

    expect(getProp(data, ' list[1].prop1 ')).to.equal('foo')
  })

  it('嵌套的prop', () => {
    let context = [{ key1: 10, otherData, otherData1 }, data]

    expect(getProp(context, 'otherData[propName]')).to.equal('deep')
    expect(getProp(context, 'otherData1[otherData.list[1].propName]')).to.equal('hi')
  })

  it('带scope的获取', () => {
    let context = [{ key1: 10, otherData, otherData1 }, data]

    expect(getProp(context, 'key1')).to.equal(10)
    expect(getProp(context, 'otherData.list[0]')).to.equal(20)
    expect(getProp(context, ' otherData.key1 ')).to.equal(3)
    expect(getProp(context, ' otherData1.key1 ')).to.equal(4)
    expect(getProp(context, 'otherData.list[1].prop1')).to.equal('zoo')
  })
})

describe('设置prop', () => {
  let temp, tempContext

  beforeEach(() => {
    temp = JSON.parse(JSON.stringify(data))
    tempContext = JSON.parse(JSON.stringify([{ key1: 10, otherData, otherData1 }, data]))
  })

  it('设置单个context', () => {
    setProp(temp, 'key1', 'res')
    setProp(temp, 'list[0]', 'res')
    setProp(temp, 'list[1].prop1 ', 'res')

    setImmediate(() => {
      expect(temp.key1).to.equal('res')
      expect(temp.list[0]).to.equal('res')
      expect(temp.list[1].prop1).to.equal('res')
    })
  })

  it('设置嵌套的prop', () => {
    setProp(tempContext, 'otherData[propName]', 'res')
    setProp(tempContext, 'otherData1[otherData.list[1].propName]', 'res')

    setImmediate(() => {
      expect(tempContext.otherData[temp.propName]).to.equal('res')
      expect(tempContext.otherData1[otherData.list[1].propName]).to.equal('res')
    })
  })

  it('设置带scope', () => {
    setProp(tempContext, 'key1', 'res')
    setProp(tempContext, 'otherData.list[0]', 'res')
    setProp(tempContext, ' otherData.key1 ', 'res')
    setProp(tempContext, 'otherData1.key1 ', 'res')
    setProp(tempContext, 'otherData.list[1].prop1', 'res')
    setImmediate(() => {
      expect(tempContext.key1).to.equal('res')
      expect(tempContext.otherData.list[0]).to.equal('res')
      expect(tempContext.otherData.key1).to.equal('res')
      expect(tempContext.otherData1.key1).to.equal('res')
      expect(tempContext.otherData.list[1].prop1).to.equal('res')
    })
  })
})
