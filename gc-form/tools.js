// 表单配置校验
export function formConfigValidator(config) {
  if (typeof config !== 'object' || config === null) {
    console.error(`表单配置必须为非空对象`);
    return false;
  }
  if (typeof config.mainConfig !== 'object' || config.mainConfig === null) {
    console.error(`表单主体配置必须为非空对象`);
    return false;
  }
  if (!Array.isArray(config.fieldList)) {
    console.error(`表单项目配置必须为数组`);
    return false;
  }

  const allowType = ['input', 'password', 'number', 'input-number', 'textarea', 'select'];

  config.fieldList.forEach(x => {
    // 检查配置类型是否在允许范围内
    if (allowType.indexOf(x.type) === -1) {
      console.error(`配置${JSON.stringify(x)}: type类型不对，不在指定范围内，请检查配置`);
      return false;
    }
  });

  return true;
}

// 配置式表单允许配置的
