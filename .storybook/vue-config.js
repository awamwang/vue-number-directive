import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import VueNumber from '../dist/vue-number-directive'
import NumberWrap from '../examples/stories/NumberDirectiveWrap'
import ExampleMixins from '../examples/stories/example-mixins'
import genStory from '../examples/stories/basic-story'

Vue.use(VueNumber)
Vue.component('NumberWrap', NumberWrap)
Vue.mixin(ExampleMixins)
window.genStory = genStory
