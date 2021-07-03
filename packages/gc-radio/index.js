import { Radio } from 'element-gc';
import { extractProperty } from '../utils/tools';

/**
 * gc-radio 接受的全部prop选项
 */
const GC_Radio_PROPS = {
  value: { type: [String, Number], default: '', required: true },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  options: { type: Array, default: () => [] }
};

/**
 * element-gc 能配置的prop选项
 */
const propKeys = Object.keys(Radio.props);

/**
 * 以attr方式绑定到DOM上的选项
 */
const attrKeys = ['placeholder'];

/**
 * TODO $listeners 过滤
 */

export default {
  name: 'gc-radio',
  props: { ...GC_Radio_PROPS },
  computed: {
    elProps() {
      return extractProperty(this.$props, propKeys);
    },
    attrs() {
      return extractProperty(this.$props, attrKeys);
    }
  },
  render(h) {
    const styles = { height: '32px', 'line-height': '32px', padding: '0 10px' };
    return h(
      'el-radio-group',
      { props: { ...this.elProps }, on: this.$listeners, attrs: { ...this.attrs }, style: { ...styles } },
      this.options.map(x => h('el-radio', { props: { label: x.label } }, [x.text]))
    );
  }
};
