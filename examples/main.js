import Vue from 'vue';
import App from './App.vue';

import GcEl from '../packages/index';
Vue.use(GcEl, {
  apiQueryDictList: () =>
    Promise.resolve({
      content: '操作成功',
      success: true,
      type: 'info',
      data: [
        {
          catCode: 'org_typ',
          createBy: 'admin',
          createTime: '2020-05-01 00:00:00',
          currentPage: 0,
          deleted: 0,
          dictCode: 'org',
          dictId: 4509,
          dictName: '\u673A\u6784',
          dictNameEn: '',
          enabled: 1,
          fullName: '',
          mnemonic: '',
          modifyBy: 'admin',
          modifyTime: '2020-05-01 00:00:00',
          orderBy: 418,
          pageSize: 20,
          pdictCode: '0',
          remark: '',
        },
        {
          catCode: 'org_typ',
          createBy: 'admin',
          createTime: '2020-05-01 00:00:00',
          currentPage: 0,
          deleted: 0,
          dictCode: 'dept',
          dictId: 4510,
          dictName: '\u90E8\u95E8',
          dictNameEn: '',
          enabled: 1,
          fullName: '',
          mnemonic: '',
          modifyBy: 'admin',
          modifyTime: '2020-05-01 00:00:00',
          orderBy: 419,
          pageSize: 20,
          pdictCode: '0',
          remark: '',
        },
      ],
    }),
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
