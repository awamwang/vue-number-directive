import Vue from 'vue/dist/vue.common.dev'
import VueNumber, { NumberDirective } from '../../../dist/index'

beforeEach(function () {
  cy.fixture('options').then((optionsConfig) => {
    this.config = optionsConfig
  })
})

describe('插件基本检查', function () {
  let vm

  it('插件对象正确', () => {
    expect(VueNumber).to.have.ownProperty('install').to.be.a('function')
  })

  it('插件options', () => {
    Vue.use(VueNumber, { name: 'custom-name' })

    vm = new Vue({
      template: `<input v-model="input" v-custom-name="{}" ref="myInput">`,
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

    expect(Vue.options.directives).to.have.property('custom-name')
    expect(vm.myInput).to.have.property('formatter')
  })
})

describe('指令基本检查', () => {
  let vm

  it('指令对象正确', () => {
    expect(NumberDirective).to.be.a('object')
    expect(NumberDirective.bind).to.be.a('function')
    expect(NumberDirective.update).to.be.a('function')
    expect(NumberDirective.unbind).to.be.a('function')
  })

  it('指令注册-全局', () => {
    Vue.directive('my-directive', NumberDirective)
    expect(Vue.options.directives).to.have.property('my-directive')
  })

  it('指令注册-局部', () => {
    vm = new Vue({
      template: `<input v-model="input" v-local-number="{}" ref="myInput">`,
      directives: {
        localNumber: NumberDirective
      },
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

    expect(vm.myInput).to.have.property('formatter')
  })
})
