<template>
  <div id="app">
    <gc-form :model="form" :form-config="formConfig"></gc-form>

    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data() {
    return {
      form: {},
      formConfig: {
        mainConfig: { labelPosition: 'right', labelWidth: 120, span: 12 }, //默认的表单配置
        //填写表单内容
        fieldList: [
          { type: 'select-dept', name: 'orgCode', label: '部门下拉' },
          { type: 'select-menu', name: 'menuCode', label: '菜单下拉' },
          { type: 'input', name: 'porgName', label: '上级部门', disabled: true, maxlength: '32', rules: [{ required: false }] },
          {
            type: 'select-dict',
            name: 'orgType',
            catCode: 'org_typ',
            label: '机构部门类型',
            placeholder: '请选择',
            rules: [{ required: false }],
          },
          { type: 'input', name: 'orgCode', label: '部门编码', tips: ['a', 'b', 'c'], suffixText: '小时', rules: [{ required: false }] },
          { type: 'input', name: 'orgName', label: '部门名称', rules: [{ required: false }] },
          { type: 'pic', name: 'avatar', label: '头像', span: 12 },
          {
            type: 'select-dict',
            name: 'enabled',
            catCode: 'enabled',
            label: '是否启用',
            placeholder: '请选择',
          },
          {
            type: 'select-dict',
            name: 'virtual',
            catCode: 'deleted',
            label: '是否虚拟机构',
            placeholder: '请选择',
          },
          { type: 'date-picker', name: 'foundTime', label: '成立时间', placeholder: '选择日期' },
          { type: 'textarea', name: 'remark', label: '备注', placeholder: '备注', maxlength: 256, span: 24 },
        ],
      },
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
