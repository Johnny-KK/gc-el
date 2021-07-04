import { Input } from 'element-gc';
import { extractProperty } from '../utils/tools';

/**
 * gc-input 接受的全部prop选项
 */
const GC_INPUT_PROPS = {
  value: { type: [String, Number], default: '', required: true },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  suffixIcon: { type: String, default: '' },
  show: { type: Boolean, default: true },
  prefixText: { type: String, default: '' },
  suffixText: { type: String, default: '' },
  tips: { type: Array, default: () => [] }
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
  name: 'gc-input',
  props: { ...GC_INPUT_PROPS },
  computed: {
    elProps() {
      return extractProperty(this.$props, propKeys);
    },
    attrs() {
      return extractProperty(this.$props, attrKeys);
    }
  },
  methods: {
    handleTipClick(event) {
      this.$emit('input', event.target.innerHTML);
    }
  },
  render(h) {
    const tipStyle = {
      cursor: 'pointer',
      color: '#09f',
      'font-size': '20px',
      'margin-right': '30px',
      'background-color': '#EEE9E9'
    };
    return h('div', {}, [
      h(
        'el-input',
        {
          props: { ...this.elProps },
          on: this.$listeners,
          attrs: { ...this.attrs }
        },
        [
          this.prefixText === ''
            ? null
            : h(
                'template',
                {
                  slot: 'prepend'
                },
                this.prefixText
              ),
          this.suffixText === ''
            ? null
            : h(
                'template',
                {
                  slot: 'append'
                },
                this.suffixText
              )
        ]
      ),
      this.tips.map(x => h('span', { style: tipStyle, on: { click: this.handleTipClick } }, x))
    ]);
  }
};
