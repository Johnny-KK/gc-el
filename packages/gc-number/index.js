import { Input } from 'element-gc';
import { extractProperty } from '../utils/tools';

/**
 * gc-number 接受的全部prop选项
 *
 * TODO 提供数字范围
 */
const GC_NUMBER_PROPS = {
  value: { type: Number, default: 0, required: true },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  unit: { type: String, default: '' }
};

/**
 * element-gc 能配置的prop选项
 */
const propKeys = Object.keys(Input.props);

/**
 * 以attr方式绑定到DOM上的选项
 */
const attrKeys = ['placeholder'];

/**
 * TODO $listeners 过滤
 */

export default {
  name: 'gc-number',
  props: { ...GC_NUMBER_PROPS },
  computed: {
    elProps() {
      return extractProperty(this.$props, propKeys);
    },
    attrs() {
      return extractProperty(this.$props, attrKeys);
    }
  },
  render(h) {
    return h(
      'el-input',
      {
        props: { ...this.elProps, type: 'number' },
        on: this.$listeners,
        attrs: { ...this.attrs }
      },
      [this.$props.unit !== '' && this.$props.unit !== null && this.$props.unit !== undefined ? <template slot="append">{this.$props.unit}</template> : '']
    );
  }
};
