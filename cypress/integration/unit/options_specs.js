import Vue from 'vue'
import genOptions, {
  getModelPath,
  getMinMax,
  parseSchema,
  optimizeOptions
} from '../../../src/number/option'

const vnode = {
  data: {
    model: {
      expression: 'test.model'
    }
  }
}

describe('基本检查', function () {
  it('导出正确', () => {
    expect(genOptions, 'genOptions').to.be.a('function')
  })
})

describe('getModelPath', () => {
  context('正常获取', () => {
    it('简单路径', () => {
      expect(getModelPath('{ model: test.int, }', vnode)).to.eq('test.int')
    })
    it('简单路径', () => {
      expect(
        getModelPath(
          `{ model: test.int[1], }
            max: 1000`,
          vnode
        )
      ).to.eq('test.int[1]')
    })
  })

  it('从v-model获取', () => {
    expect(getModelPath('{ integer: true, }', vnode)).to.eq('test.model')
  })
})

describe('getMinMax', () => {
  it('默认值', () => {
    expect(getMinMax({}, 'min')).to.eq(Number.MIN_SAFE_INTEGER)
    expect(getMinMax({}, 'max')).to.eq(Number.MAX_SAFE_INTEGER)
  })

  context('正常获取', () => {
    it('设置min/max', () => {
      expect(
        getMinMax(
          {
            min: -100,
            max: 100
          },
          'min'
        )
      ).to.eq(-100)
      expect(
        getMinMax(
          {
            min: -100,
            max: 100
          },
          'max'
        )
      ).to.eq(100)
    })

    it('设置minimum/maximum', () => {
      expect(
        getMinMax(
          {
            minimum: -101,
            maximum: 102
          },
          'min'
        )
      ).to.eq(-101)
      expect(
        getMinMax(
          {
            minimum: -101,
            maximum: 102
          },
          'max'
        )
      ).to.eq(102)
    })
  })

  it('优先级', () => {
    expect(
      getMinMax(
        {
          min: -100,
          max: 100,
          minimum: -101,
          maximum: 102
        },
        'min'
      )
    ).to.eq(-100)
    expect(
      getMinMax(
        {
          min: -100,
          max: 100,
          minimum: -101,
          maximum: 102
        },
        'max'
      )
    ).to.eq(100)
  })
})

describe('parseSchema', () => {
  it('普通输入', () => {
    // cy.wrap().as('schema')

    expect(
      parseSchema(
        {
          type: 'integer',
          minimum: -100,
          maximum: 100,
          exclusiveMinimum: true,
          exclusiveMaximum: false,
          multipleOf: 2
        },
        'min'
      )
    ).to.deep.equal({
      integer: true,
      minimum: -100,
      maximum: 100,
      exclusiveMinimum: true,
      exclusiveMaximum: false,
      multipleOf: 2
    })
    expect(getMinMax({}, 'max')).to.eq(Number.MAX_SAFE_INTEGER)
  })

  context('正常获取', () => {
    it('设置min/max', () => {
      expect(
        getMinMax(
          {
            min: -100,
            max: 100
          },
          'min'
        )
      ).to.eq(-100)
      expect(
        getMinMax(
          {
            min: -100,
            max: 100
          },
          'max'
        )
      ).to.eq(100)
    })

    it('设置minimum/maximum', () => {
      expect(
        getMinMax(
          {
            minimum: -101,
            maximum: 102
          },
          'min'
        )
      ).to.eq(-101)
      expect(
        getMinMax(
          {
            minimum: -101,
            maximum: 102
          },
          'max'
        )
      ).to.eq(102)
    })
  })

  it('优先级', () => {
    expect(
      getMinMax(
        {
          min: -100,
          max: 100,
          minimum: -101,
          maximum: 102
        },
        'min'
      )
    ).to.eq(-100)
    expect(
      getMinMax(
        {
          min: -100,
          max: 100,
          minimum: -101,
          maximum: 102
        },
        'max'
      )
    ).to.eq(100)
  })
})

// describe('options', () => {
//   let input
//   let vnode

//   before(() => {
//     input = document.createElement('input')
//   })

//   it('basic', () => {
//     genOptions(input, {})
//   })
// })
