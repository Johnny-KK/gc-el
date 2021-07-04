import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import ElementGc from 'element-gc';
import 'element-gc/lib/theme-chalk/index.css';
Vue.use(ElementGc);

import GcEl from '../packages/index';
Vue.use(GcEl);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
