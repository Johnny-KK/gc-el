import { Cascader } from 'element-gc';
import { extractProperty } from '../utils/tools';

/**
 * gc-select-dept 接受的全部prop选项
 *
 * TODO labelName valueName 添加默认值
 */
const GC_SELECT_DEPT_PROPS = {
  value: { type: [String, Number, Array], default: '', required: true },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  clearable: { type: Boolean, default: false },
  filterable: { type: Boolean, default: false },
  showAllLevels: { type: Boolean, default: false }
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
  name: 'gc-select-dept',
  props: { ...GC_SELECT_DEPT_PROPS },
  data() {
    return {
      options: [],
      deptName: ''
    };
  },
  created() {
    const apiQueryDeptTree = this.$gcEl.apiQueryDeptTree;
    apiQueryDeptTree()
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
  methods: {
    //递归获取当前部门信息
    getDeptName(list, deptCode) {
      for (let i in list) {
        if (list[i].orgCode === deptCode) {
          return list[i].orgName;
        }
        if (list[i].children) {
          const node = this.getDeptName(list[i].children, deptCode);
          if (node !== undefined) {
            return node;
          }
        }
      }
    }
  },
  render(h) {
    const styles = { width: '100%' };
    const props = { label: 'orgName', value: 'orgCode' };
    this.deptName = this.getDeptName(this.options, this.value);
    this.$emit('changeDept', this.value, this.deptName);
    return h('el-cascader', { props: { ...this.elProps, options: this.options, props: props }, on: this.$listeners, style: { ...styles } });
  }
};
