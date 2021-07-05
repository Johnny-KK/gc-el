<template>
  <div id="app">
    <gc-form :model="form" :form-config="formConfig"></gc-form>
  </div>
</template>

<script>
const api = () => {
  return Promise.resolve([
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' },
  ]);
};

export default {
  name: 'App',
  data() {
    return {
      form: {},
      formConfig: {
        mainConfig: { labelPosition: 'right', labelWidth: 120, span: 12 }, //默认的表单配置
        //填写表单内容
        fieldList: [
          { type: 'date-picker', name: 'startTime', label: '开始时间' },
          { type: 'input', name: 'username', label: '姓名' },
          { type: 'pic', name: 'avatar', label: '头像', span: 24 },
          {
            type: 'radio',
            name: 'sex',
            label: '性别',
            options: [
              { label: '0', text: 'male' },
              { label: '1', text: 'female' },
              { label: '2', text: 'unknown' },
            ],
          },
          {
            type: 'select',
            name: 'place',
            label: '地点',
            options: [
              { label: '户外', value: 'outside' },
              { label: '室内', value: 'inside' },
            ],
          },
          { type: 'select-api', name: 'opt', label: '选项', api: api },
          { type: 'select-dept', name: 'orgCode', label: '部门下拉' },
          {
            type: 'select-dict',
            name: 'orgType',
            catCode: 'org_typ',
            label: '机构部门类型',
            placeholder: '请选择',
            rules: [{ required: false }],
          },
          { type: 'select-menu', name: 'menuCode', label: '菜单下拉' },
          { type: 'select-tree', name: 'tree', label: '树' },
          { type: 'select-user', name: 'user', label: '用户' },
          { type: 'switch', name: 'sss', label: '转换' },
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
