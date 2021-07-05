import { Select } from 'element-gc';
import { extractProperty } from '../utils/tools';

/**
 * gc-select-dict 接受的全部prop选项
 *
 * TODO 校验 api 应当为一个promise函数 成功/失败时返回指定格式数据
 * TODO labelName valueName 添加默认值
 */
const GC_SELECT_API_PROPS = {
  value: { type: [String, Number], default: '', required: true },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  clearable: { type: Boolean, default: false },
  api: { type: Function, default: null, required: true },
  apiParams: { type: [String, Object], default: () => {}, required: false },
  labelName: { required: false, type: String, default: 'label' },
  valueName: { required: false, type: String, default: 'value' },
  filterable: { type: Boolean, default: false },
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
  name: 'gc-select-api',
  props: { ...GC_SELECT_API_PROPS },
  data() {
    return {
      options: [],
    };
  },
  created() {
    if (typeof this.api !== 'function') {
      console.error('请检查配置，请求方法应答为一个函数');
      return false;
    }
    this.api(this.apiParams)
      .then((data) => (this.options = data))
      .catch((err) => {
        console.error(err);
      });
  },
  computed: {
    elProps() {
      return extractProperty(this.$props, propKeys);
    },
    attrs() {
      return extractProperty(this.$props, attrKeys);
    },
  },
  render(h) {
    return h('gc-select', { props: { ...this.elProps, options: this.options, labelName: this.labelName, valueName: this.valueName }, on: this.$listeners });
  },
};
