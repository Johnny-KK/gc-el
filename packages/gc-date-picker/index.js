import { extractProperty } from '../utils/tools';

/**
 * gc-date-picker 接受的全部prop选项
 */
const GC_DATE_PICKER_PROPS = {
  value: { required: true },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  valueFormat: { type: String, default: 'yyyy-MM-dd' },
  // FIXME 与element type prop相同 名称有冲突
  dateType: { type: String, default: 'date' },
  startPlaceholder: { type: String, default: '' },
  endPlaceholder: { type: String, default: '' },
  rangeSeparator: { type: String, default: '' }
};

/**
 * element-gc 能配置的prop选项
 */
const propKeys = ['value', 'readonly', 'disabled', 'valueFormat', 'startPlaceholder', 'endPlaceholder', 'rangeSeparator'];

/**
 * 以attr方式绑定到DOM上的选项
 */
const attrKeys = ['placeholder'];

/**
 * TODO $listeners 过滤
 */

export default {
  name: 'gc-date-picker',
  props: { ...GC_DATE_PICKER_PROPS },
  computed: {
    elProps() {
      return extractProperty(this.$props, propKeys);
    },
    attrs() {
      return extractProperty(this.$props, attrKeys);
    }
  },
  render(h) {
    const styles = { width: '100%' };
    return h('el-date-picker', {
      props: { ...this.elProps, type: this.dateType },
      on: this.$listeners,
      attrs: { ...this.attrs },
      style: { ...styles }
    });
  }
};
