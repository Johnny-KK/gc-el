import { Cascader } from 'element-gc';
import { extractProperty } from '../utils/tools';

/**
 * gc-select-menu 接受的全部prop选项
 *
 * TODO labelName valueName 添加默认值
 */
const GC_SELECT_MENU_PROPS = {
  value: { type: [String, Number], default: '', required: true },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  clearable: { type: Boolean, default: false }
};

/**
 * element-gc 能配置的prop选项
 */
const propKeys = Object.keys(Cascader.props);

/**
 * 以attr方式绑定到DOM上的选项
 */
const attrKeys = ['placeholder'];

/**
 * TODO $listeners 过滤
 */

export default {
  name: 'gc-select-menu',
  props: { ...GC_SELECT_MENU_PROPS },
  data() {
    return {
      options: []
    };
  },
  created() {
    const apiQueryAllMenuIncludeEnabled = this.$gcEl.apiQueryAllMenuIncludeEnabled;
    apiQueryAllMenuIncludeEnabled()
      .then(res => {
        if (res.success === true) {
          this.options = res.data;
        } else {
          console.error(res.content);
        }
      })
      .catch(err => {
        console.error(err);
      });
  },
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
    const props = { label: 'name', value: 'menuCode' };
    return h('el-cascader', { props: { ...this.elProps, options: this.options, props: props }, on: this.$listeners, style: { ...styles } });
  }
};
