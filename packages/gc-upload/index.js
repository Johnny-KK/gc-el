import { Upload } from 'element-gc';
import { extractProperty } from '../utils/tools';

/**
 * gc-input 接受的全部prop选项
 */
const GC_UPLOAD_PROPS = {
  action: { type: String, required: true, default: 'https://jsonplaceholder.typicode.com/posts/' },
  value: { type: [String, Number], default: '', required: true },
  headers: { type: Object },
  class: { type: String },
  multiple: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  showFileFirst: { type: Boolean, default: true },
};

/**
 * element-gc 能配置的prop选项
 */
const propKeys = Object.keys(Upload.props);

/**
 * 以attr方式绑定到DOM上的选项
 */
const attrKeys = ['placeholder'];

/**
 * TODO $listeners 过滤
 */

export default {
  name: 'gc-upload',
  props: { ...GC_UPLOAD_PROPS },
  computed: {
    elProps() {
      return extractProperty(this.$props, propKeys);
    },
    attrs() {
      return extractProperty(this.$props, attrKeys);
    },
  },
  render(h) {
    const styles = { border: '1px dashed #eee', 'border-radius': '5px' };
    return h('el-upload', {
      props: { ...this.elProps },
      on: this.$listeners,
      attrs: { ...this.attrs },
      style: { ...styles },
    });
  },
};
