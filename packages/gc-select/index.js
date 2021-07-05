import { Select } from 'element-gc';
import { extractProperty } from '../utils/tools';

/**
 * gc-select 接受的全部prop选项
 */
const GC_SELECT_PROPS = {
  value: { type: [String, Number], default: '', required: true },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  labelName: { type: String, default: 'label' },
  valueName: { type: String, default: 'value' },
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
  name: 'gc-select',
  props: { ...GC_SELECT_PROPS },
  computed: {
    elProps() {
      return extractProperty(this.$props, propKeys);
    },
    attrs() {
      return extractProperty(this.$props, attrKeys);
    },
  },
  render(h) {
    const styles = { width: '100%' };
    return h(
      'el-select',
      { props: { ...this.elProps }, on: this.$listeners, attrs: { ...this.attrs }, style: { ...styles } },
      this.options.map((x) => h('el-option', { props: { label: x[this.labelName], value: x[this.valueName] } }))
    );
  },
};
