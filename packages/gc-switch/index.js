import { Switch } from 'element-gc';
import { extractProperty } from '../utils/tools';

const GC_INPUT_PROPS = {
  value: { type: [String, Number], default: '', required: true },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: '' }
};

export default {
  name: 'gc-switch',
  props: { ...GC_INPUT_PROPS },
  computed: {
    elProps() {
      return extractProperty(this.$props, Object.keys(Switch.props));
    },
    attrs() {
      const attrKeys = ['placeholder'];
      return extractProperty(this.$props, attrKeys);
    }
  },
  render(h) {
    return h('el-switch', { props: { ...this.elProps }, on: this.$listeners, attrs: { ...this.attrs } });
  }
};
