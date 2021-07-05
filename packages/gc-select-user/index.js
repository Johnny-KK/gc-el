import { Select } from 'element-gc';
import { extractProperty } from '../utils/tools';

/**
 * gc-select-dict 接受的全部prop选项
 */
const GC_SELECT_USER_PROPS = {
  value: { type: [String, Number], default: '', required: true },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  clearable: { type: Boolean, default: false },
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
  name: 'gc-select-user',
  props: { ...GC_SELECT_USER_PROPS },
  computed: {
    elProps() {
      return extractProperty(this.$props, propKeys);
    },
    attrs() {
      return extractProperty(this.$props, attrKeys);
    },
  },
  render(h) {
    const apiGetSysUser = this.$gcEl.apiGetSysUser;
    return h('gc-select-api', {
      props: { ...this.elProps, api: apiGetSysUser, labelName: 'userName', valueName: 'userAccount' },
      on: this.$listeners,
    });
  },
};
