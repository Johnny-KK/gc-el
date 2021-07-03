// 深拷贝对象
export function deepClone(obj) {
  const _toString = Object.prototype.toString;

  // null, undefined, non-object, function
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  // DOM Node
  if (obj.nodeType && 'cloneNode' in obj) {
    return obj.cloneNode(true);
  }

  // Date
  if (_toString.call(obj) === '[object Date]') {
    return new Date(obj.getTime());
  }

  // RegExp
  if (_toString.call(obj) === '[object RegExp]') {
    const flags = [];
    if (obj.global) {
      flags.push('g');
    }
    if (obj.multiline) {
      flags.push('m');
    }
    if (obj.ignoreCase) {
      flags.push('i');
    }

    return new RegExp(obj.source, flags.join(''));
  }

  const result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {};

  for (const key in obj) {
    result[key] = deepClone(obj[key]);
  }

  return result;
}

/**
 * 从整体中抽取所需属性值
 *
 * @param {Object} source 整体值来源
 * @param {String[]} keyList 所需抽取key列表
 * @returns {Object} target
 */
export function extractProperty(source, keyList) {
  const result = {};
  keyList.forEach(x => (result[x] = source[x]));
  return result;
}
