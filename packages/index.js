// 导入button组件
import GcDatePicker from './gc-date-picker/index'
import GcForm from './gc-form/index'
import GcInput from './gc-input/index'
import GcLayout from './gc-layout/index'
import GcNumber from './gc-number/index'
import GcPic from './gc-pic/index'
import GcRadio from './gc-radio/index'
import GcSelect from './gc-select/index'
import GcSelecApi from './gc-select-api/index'
import GcSelectDept from './gc-select-dept/index'
import GcSelectDict from './gc-select-dict/index'
import GcSelectMenu from './gc-select-menu/index'
import GcSelectTree from './gc-select-tree/index'
import GcSelectUser from './gc-select-user/index'
import GcSwitch from './gc-switch/index'
import GcTable from './gc-table/index' 
import GcTextarea from './gc-textarea/index'
import GcUpload from './gc-upload/index'

// 组件列表
const components = [
  GcDatePicker,
  GcForm,
  GcInput,
  GcLayout,
  GcNumber,
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
  GcUpload
]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue, {apiQueryDeptTree, apiQueryDictList, apiQueryAllMenuIncludeEnabled, apiDownloadFile, apiGetSysUser}) {
  // 判断是否安装
  if (install.installed) return

  if (typeof apiQueryDeptTree !== 'function') {
    return false;
  }
  Vue.propotype.$gcEl.apiQueryDeptTree = apiQueryDeptTree;
  Vue.propotype.$gcEl.apiQueryDictList = apiQueryDictList;
  Vue.propotype.$gcEl.apiQueryAllMenuIncludeEnabled = apiQueryAllMenuIncludeEnabled;
  Vue.propotype.$gcEl.apiDownloadFile = apiDownloadFile;
  Vue.propotype.$gcEl.apiGetSysUser = apiGetSysUser;

  // 遍历注册全局组件
  components.forEach(component => Vue.component(component.name, component))
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '0.0.1',
  install,
  ...components
}