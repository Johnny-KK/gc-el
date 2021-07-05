import Vue from 'vue';
import App from './App.vue';

import { apiQueryDeptTree, apiQueryDictList, apiQueryAllMenuIncludeEnabled } from './apis';

import GcEl from '../packages/index';
Vue.use(GcEl, { apiQueryDeptTree, apiQueryDictList, apiQueryAllMenuIncludeEnabled });

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
