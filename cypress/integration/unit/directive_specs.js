import Vue from 'vue/dist/vue.common.dev'
import VueNumber from '../../../src/index.js'
Vue.use(VueNumber)

beforeEach(function () {
  cy.fixture('options').then((optionsConfig) => {
    this.config = optionsConfig
  })
})

describe('基本检查', function () {
  it('导出正确', () => {
    expect(VueNumber).to.have.ownProperty('install').to.be.a('function')
  })
})
