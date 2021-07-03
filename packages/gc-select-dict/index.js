import { Select } from 'element-gc';
import { extractProperty } from '../utils/tools';

/**
 * gc-select-dict 接受的全部prop选项
 */
const GC_SELECT_DICT_PROPS = {
  value: { type: [String, Number], default: '', required: true },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  clearable: { type: Boolean, default: false },
  catCode: { type: String, default: '', required: true }
};

/**
 * element-gc 能配置的prop选项
 */
const propKeys = Object.keys(Select.props);

/**
 * 以attr方式绑定到DOM上的选项
 */
const attrKeys = ['placeholder'];

/**
 * TODO $listeners 过滤
 */

export default {
  name: 'gc-select-dict',
  props: { ...GC_SELECT_DICT_PROPS },
  computed: {
    elProps() {
      return extractProperty(this.$props, propKeys);
    },
    attrs() {
      return extractProperty(this.$props, attrKeys);
    }
  },
  render(h) {
    const apiQueryDictList = this.$gcEl.apiQueryDictList;
    return h('gc-select-api', {
      props: { ...this.elProps, api: apiQueryDictList, apiParams: this.catCode, labelName: 'dictName', valueName: 'dictCode' },
      on: this.$listeners
    });
  }
};
