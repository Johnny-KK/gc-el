import { Select } from 'element-gc';
import { extractProperty } from '../utils/tools';

/**
 * gc-select-dept-tree 接受的全部prop选项
 */
const GC_SELECT_TREE_PROPS = {
  value: { type: [String, Number], default: '', required: true },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
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
  name: 'gc-select-tree',
  props: { ...GC_SELECT_TREE_PROPS },
  data() {
    return {
      treeData: [],
      treeProps: { value: 'orgCode', label: 'orgName', children: 'children' },
    };
  },
  created() {
    const apiQueryDeptTree = this.$gcEl.apiQueryDeptTree;
    // 树数据查询
    apiQueryDeptTree()
      .then((data) => (this.treeData = data))
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
  methods: {
    handleNodeClick(node) {
      this.value = node[this.treeProps.label];
    },
  },
  render(h) {
    const styles = { width: '100%' };
    return h(
      'el-select',
      {
        props: { ...this.elProps },
        on: this.$listeners,
        attrs: { ...this.attrs },
        style: { ...styles },
      },
      [
        h(
          'el-option',
          {
            props: { label: '999' },
          },
          [
            h('el-tree', {
              props: { data: this.treeData, props: this.treeProps, 'node-key': this.treeProps.value },
              on: {
                'node-click': this.handleNodeClick,
              },
            }),
          ]
        ),
      ]
    );
  },
};
