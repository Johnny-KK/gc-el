import GcDatePicker from './gc-date-picker/index';
import GcForm from './gc-form/index';
import GcInput from './gc-input/index';
import GcLayout from './gc-layout/index';
import GcPic from './gc-pic/index';
import GcRadio from './gc-radio/index';
import GcSelect from './gc-select/index';
import GcSelecApi from './gc-select-api/index';
import GcSelectDept from './gc-select-dept/index';
import GcSelectDict from './gc-select-dict/index';
import GcSelectMenu from './gc-select-menu/index';
import GcSelectTree from './gc-select-tree/index';
import GcSelectUser from './gc-select-user/index';
import GcSwitch from './gc-switch/index';
import GcTable from './gc-table/index';
import GcTextarea from './gc-textarea/index';
import GcUpload from './gc-upload/index';

const componentList = [
  GcDatePicker,
  GcForm,
  GcInput,
  GcLayout,
  GcPic,
  GcRadio,
  GcSelect,
  GcSelecApi,
  GcSelectDept,
  GcSelectDict,
  GcSelectMenu,
  GcSelectTree,
  GcSelectUser,
  GcSwitch,
  GcTable,
  GcTextarea,
  GcUpload,
];

import ElementGc from 'element-gc';
import 'element-gc/lib/theme-chalk/index.css';

const install = (Vue, options = {}) => {
  Vue.use(ElementGc);
  componentList.forEach((c) => Vue.component(c.name, c));

  const apiQueryDeptTree = options.apiQueryDeptTree || null;
  const apiQueryDictList = options.apiQueryDictList || null;
  const apiQueryAllMenuIncludeEnabled = options.apiQueryAllMenuIncludeEnabled || null;
  const apiGetSysUser = options.apiGetSysUser || null;
  Vue.prototype.$gcEl = {};
  Vue.prototype.$gcEl.apiQueryDeptTree = apiQueryDeptTree;
  Vue.prototype.$gcEl.apiQueryDictList = apiQueryDictList;
  Vue.prototype.$gcEl.apiQueryAllMenuIncludeEnabled = apiQueryAllMenuIncludeEnabled;
  Vue.prototype.$gcEl.apiGetSysUser = apiGetSysUser;
};

export default {
  version: '0.0.1',
  install,
  ...componentList,
};
