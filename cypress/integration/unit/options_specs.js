import Vue from 'vue/dist/vue.common.dev'
import VueNumber from '../../../dist/index'
Vue.use(VueNumber)
import parseOption, {
  getModelPath,
  getMinMax,
  parseSchema,
  optimizeOptions
} from '../../../dist/number/option.js'

let vnode

beforeEach(function () {
  vnode = {
    data: {
      model: {
        expression: 'test.model'
      }
    }
  }

  cy.fixture('options').as('config')
})

describe('getModelPath', () => {
  context('正常获取', () => {
    it('简单路径', () => {
      expect(getModelPath('{ model: test.int, }', vnode)).to.eq('test.int')
    })
    it('复杂路径', () => {
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
    it('从min/max获取', function () {
      expect(getMinMax(this.config.minMax.base, 'min')).to.eq(-100)
      expect(getMinMax(this.config.minMax.base, 'max')).to.eq(100)
    })

    it('从minimum/maximumx获取', function () {
      expect(getMinMax({ ...this.config.minMax.base, min: null }, 'min')).to.eq(
        -101
      )
      expect(getMinMax({ ...this.config.minMax.base, max: null }, 'max')).to.eq(
        102
      )
    })
  })

  it('优先级：min 优先于 minimum，max 优先于 maximum', function () {
    expect(getMinMax(this.config.minMax.base, 'min')).to.eq(-100)
    expect(getMinMax(this.config.minMax.base, 'max')).to.eq(100)
  })
})

describe('parseSchema', () => {
  it('基本输入', function () {
    // cy.wrap().as('schema')

    expect(parseSchema(this.config.schema.base)).to.deep.equal({
      integer: true,
      minimum: -101,
      maximum: 102,
      exclusiveMinimum: true,
      exclusiveMaximum: false,
      multipleOf: 3
    })
  })
})

describe('options parse method', () => {
  let vnode
  let vm

  beforeEach(() => {
    vm = new Vue({
      template: `<input v-model="input" v-number="{}" ref="myInput">`,
      data: {
        input: '123',
        options: {}
      },
      computed: {
        myInput() {
          return this.$refs.myInput
        }
      }
    }).$mount()
  })

  it('basic', function () {
    let options = parseOption(
      vm.myInput,
      this.config.binding.base,
      vm._vnode,
      {}
    ).options
    console.log('basic options', options)

    expect(options).to.be.a('object')
    expect(options.modelPropPath).to.be.equal('input1')
    expect(options.minimum).to.be.equal(Number.MIN_SAFE_INTEGER)
    expect(options.maximum).to.be.equal(Number.MAX_SAFE_INTEGER)
    expect(options.fixed).to.be.equal(2)
  })

  it('all options', function () {
    let options = parseOption(
      vm.myInput,
      this.config.binding.all,
      vm._vnode,
      {}
    ).options
    console.log('all options', options)

    expect(options.el).to.be.instanceOf(HTMLElement)
    expect(options.modelPropPath).to.be.equal('input2')
    expect(options.fixed).to.be.equal(0)
    expect(options.vnode).to.be.a('object')
    expect(options.debug).to.be.equal(true)
    expect(options.fixed).to.be.equal(0)
    expect(options.flag).to.be.equal(true)
    expect(options.integer).to.be.equal(true)
    expect(options.positive).to.be.equal(true)
    expect(options.minimum).to.be.equal(0)
    expect(options.maximum).to.be.equal(Number.MAX_SAFE_INTEGER)
    expect(options.scope).to.be.deep.equal([{ a: 1 }, { b: 2 }])
    expect(options.sep).to.be.equal(false)
    expect(options.sientific).to.be.equal(false)
  })

  it('global options', function () {
    let options = parseOption(
      vm.myInput,
      this.config.binding.base,
      vm._vnode,
      this.config.binding.all.value
    ).options
    console.log('global options', options)

    expect(options.el).to.be.instanceOf(HTMLElement)
    expect(options.modelPropPath).to.be.equal('input1')
    expect(options.fixed).to.be.equal(3)
    expect(options.vnode).to.be.a('object')
    expect(options.debug).to.be.equal(true)
    expect(options.flag).to.be.equal(true)
    expect(options.integer).to.be.equal(false)
    expect(options.positive).to.be.equal(true)
    expect(options.minimum).to.be.equal(0)
    expect(options.maximum).to.be.equal(Number.MAX_SAFE_INTEGER)
    expect(options.scope).to.be.deep.equal([{ a: 1 }, { b: 2 }])
    expect(options.sep).to.be.equal(false)
    expect(options.sientific).to.be.equal(false)
  })

  it('优先级：schema 优先于 options中的min/max配置', function () {
    let options = parseOption(
      vm.myInput,
      {
        ...this.config.binding.base,
        value: {
          ...this.config.binding.base.value,
          schema: this.config.schema.base
        }
      },
      vm._vnode,
      {}
    ).options

    expect(options.minimum).to.be.equal(-101)
    expect(options.maximum).to.be.equal(102)
  })
})
