/**
 * 配置式表单支持的组件
 */
const allowComponents = [
  { name: 'input', label: '单行文本' },
  { name: 'textarea', label: '多行文本' },
  { name: 'number', label: '数字框' },
  { name: 'radio', label: '单选' },
  // { name: 'checkbox', label: '多选' },
  // { name: 'switch', label: '开关' },
  { name: 'select', label: '下拉框' },
  { name: 'select-dict', label: '数据字典下拉框' },
  { name: 'select-api', label: '远程接口下拉框' },
  { name: 'select-user', label: '人员下拉框' },
  { name: 'select-dept', label: '部门下拉框' },
  { name: 'select-menu', label: '菜单下拉框' },
  // { name: 'select-menu-tree', label: '菜单树下拉框' },
  { name: 'date-picker', label: '日期选择器' },
  { name: 'pic', label: '图片上传' },
];

/**
 * TODO 完善校验信息
 * 表单配置校验
 */
function formConfigValidator(config) {
  if (typeof config !== 'object' || config === null) {
    console.error(`表单配置必须为非空对象`);
    return false;
  }
  /**
   * 表单主题配置 mainConfig 校验
   */
  // 检查类型
  const mainConfig = config.mainConfig;
  if (typeof mainConfig !== 'object' || mainConfig === null) {
    console.error('表单主体配置必须为非空对象');
    return false;
  }
  // 检查字段是否缺少
  const mainConfigKeys = ['labelWidth', 'labelPosition', 'span'];
  const targetKeys = Object.keys(mainConfig);
  if (mainConfigKeys.some((x) => targetKeys.indexOf(x) === -1)) {
    console.error(`表单主题配置项目为${mainConfigKeys.join('、')}: 请检查是否有遗漏项目`);
    return false;
  }
  // 检查labelWidth字段
  if (typeof mainConfig.labelWidth !== 'number') {
    console.error(`表单主体配置-标签宽度必须为数字类型`);
    return false;
  }
  // 检查labelPosition字段
  const allowLabelPosition = ['left', 'right', 'top'];
  if (typeof mainConfig.labelPosition !== 'string' || allowLabelPosition.indexOf(mainConfig.labelPosition) === -1) {
    console.error(`表单主体配置-标签位置必须为以下值之一: ${allowLabelPosition.join('、')}`);
    return false;
  }
  // 检查span字段
  if (typeof mainConfig.span !== 'number') {
    console.error(`表单主体配置-默认空间必须为数字类型`);
    return false;
  }

  /**
   *
   */
  if (!Array.isArray(config.fieldList)) {
    console.error(`表单项目配置必须为数组`);
    return false;
  }

  config.fieldList.forEach((x) => {
    // 检查配置类型是否在允许范围内
    if (allowComponents.map((x) => x.name).indexOf(x.type) === -1) {
      console.error(`配置${JSON.stringify(x)}: type类型不对，不在指定范围内，请检查配置`);
      return false;
    }
  });

  return true;
}

/**
 * 表单配置自动补全 补全表单缺少的默认字段
 */
const compileFormConfig = (config) => {
  return config;
};

// 默认表单配置
const defaultFormConfig = {
  mainConfig: {
    labelWidth: 80,
    span: 8,
    labelPosition: 'right',
  },
  fieldList: [],
  operateConfig: { reset: true, submit: true },
};

export default { compileFormConfig, allowComponents, defaultFormConfig };
export { formConfigValidator };
