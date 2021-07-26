import { Upload } from 'element-gc';
import { extractProperty } from '../utils/tools';

/**
 * gc-input 接受的全部prop选项
 */
const GC_PIC_PROPS = {
  value: { type: [String, Number], default: '', required: true },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
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
  name: 'gc-pic',
  props: { ...GC_PIC_PROPS },
  computed: {
    elProps() {
      return extractProperty(this.$props, propKeys);
    },
    attrs() {
      return extractProperty(this.$props, attrKeys);
    },
  },
  data() {
    return {
      imgPath: null,
      imgPathList: [],
    };
  },
  async created() {
    const apiDownloadFile = this.$gcEl.apiDownloadFile;
    if (Array.isArray(this.value)) {
      for (const x of this.value) {
        this.imgPathList.push(`data:image/png;base64,${await apiDownloadFile(x)}`);
      }
    }
  },
  beforeDestroy() {
    // 释放内存
    if (Array.isArray(this.imgPathList) && this.imgPathList.length > 0) {
      this.imgPathList.forEach((x) => {
        URL.revokeObjectURL(x);
      });
    }
  },
  methods: {
    handleClick() {
      const input = this.$el.querySelector('.file-input');
      if (input !== null && input !== undefined) {
        input.click();
      }
    },
    handleFileChange(e) {
      const files = e.target.files;
      // TODO 文件大小限制
      // const fileSize = files[0].size;
      // if (fileSize > 6164000) {
      //   console.warn('选择的图片不能超过6MB,请重新选择!');
      //   return false;
      // }
      if (files.length > 0) {
        for (const x of files) {
          this.imgPathList.push(URL.createObjectURL(x));
        }
        this.$emit('input', files);
      }
    },
  },
  render(h) {
    const picBoxStyle = {
      display: 'flex',
      'flex-direction': 'row',
      'flex-wrap': 'warp',
    };
    const iconStyle = {
      'font-size': '28px',
      color: '#8c939d',
      width: '178px',
      height: '178px',
      'line-height': '178px',
      'text-align': 'center',
      border: '1px dashed #d9d9d9',
      cursor: 'pointer',
    };
    const inputStyle = { display: 'none' };
    const imgStyle = { width: '178px', height: '178px', display: 'block', border: '1px dashed #d9d9d9', cursor: 'pointer' };

    return h(
      'div',
      {
        style: { ...picBoxStyle },
      },
      [
        Array.isArray(this.imgPathList) && this.imgPathList.length > 0
          ? this.imgPathList.map((imgItem) =>
              h('img', {
                attrs: { src: imgItem },
                style: { ...imgStyle },
                on: {
                  click: this.handleClick,
                },
              })
            )
          : h('i', {
              class: 'el-icon-plus',
              style: { ...iconStyle },
              on: {
                click: this.handleClick,
              },
            }),
        h('input', {
          attrs: { type: 'file', accept: '.jpg, .jpeg, .gif, .png, .bmp, .tiff', multiple: true },
          class: 'file-input',
          style: { ...inputStyle },
          on: {
            change: this.handleFileChange,
          },
        }),
      ]
    );
  },
};
