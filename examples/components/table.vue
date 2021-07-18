<template>
  <div class="table-box">
    <el-row>
      <el-button @click="add">新增</el-button>
    </el-row>
    <gc-table :table-config="tableConfig"></gc-table>
  </div>
</template>

<script>
// import localData from './data';

// const apiQueryUser = () => Promise.resolve([]);

const localData = [
  { name: '检修工作要求工作许可人员执行的安全措施;', content1: '', content2: '', __group__: { group: 1, title: true } },
  { name: '1号高压油泵停止运行;', content1: '', content2: '', __group__: { group: 1 } },
  { name: '断开1号高压油泵电机电源;', content1: '', content2: '', __group__: { group: 1 } },
  { name: '1号高压油泵电机电源处悬挂“禁止合闸，有人工作”标识牌;', content1: '', content2: '', __group__: { group: 1 } },
  { name: '关闭高压油泵出口门;', content1: '', content2: '', __group__: { group: 1 } },
  { name: '检修工作要求检修人员自行执行的安全措施;', content1: '已执行', content2: '已恢复', __group__: { group: 2, title: true } },
  { name: '作业前检查工作人员精神状态良好;', content1: '', content2: '', __group__: { group: 2 } },
  { name: '严禁带火种进入现场;', content1: '', content2: '', __group__: { group: 2 } },
];

// eslint-disable-next-line no-unused-vars
const spanMethod = ({ row, column, rowIndex, columnIndex }) => {
  if (row.__group__.group === 1) {
    if (columnIndex === 2) {
      return [1, 2];
    }
    if (columnIndex === 3) {
      return [0, 0];
    }
  }
};

export default {
  name: 'x-table',
  data() {
    return {
      // tableConfig: {
      //   localData: localData,
      //   // isPage: false,
      //   api: apiQueryUser,
      //   apiParams: { userName: '', userAcnt: '', logName: '', succeed: '', operTime: '' },
      //   fieldList: [
      //     { type: 'index', label: '序号' },
      //     { prop: 'userId', label: '主键id' },
      //     { prop: 'userAccount', label: '用户帐号' },
      //     { prop: 'userName', label: '用户名称' },
      //     { label: '用户头像' },
      //     { prop: 'deptName', label: '部门' },
      //     { prop: 'userStatus', label: '状态', catCode: 'user_status' },
      //     { prop: 'enabled', label: '是否启用', catCode: 'enabled' },
      //     { prop: 'validTime', label: '启用时间', formatter: (r, c, v) => v.substring(0, 10) },
      //     { prop: 'remark', label: '备注' },
      //     {
      //       label: '操作',
      //       type: 'link',
      //       link: [
      //         { name: '编辑', click: (val) => this.handleEdit(val) },
      //         { name: '删除', click: (val) => this.handleDelete(val) },
      //       ],
      //     },
      //   ],
      // },
      tableConfig: {
        localData: localData,
        isPage: false,
        // api: apiQueryUser,
        spanMethod: spanMethod,
        group: true,
        apiParams: { userName: '', userAcnt: '', logName: '', succeed: '', operTime: '' },
        border: true,
        fieldList: [
          { type: 'input', prop: 'name', label: '安全措施' },
          { type: 'input', prop: 'content1', label: '已执行' },
          { type: 'input', prop: 'content2', label: '已恢复' },
          {
            label: '操作',
            type: 'link',
            link: [
              { name: '新增', click: (row, i) => this.handleAdd(row, i), show: (row, i) => this.showAdd(row, i) },
              { name: '删除', click: (row, i) => this.handleDelete(row, i), show: (row, i) => this.showDelete(row, i) },
            ],
          },
        ],
      },
    };
  },
  methods: {
    add() {
      localData.push({ name: '', content: '' });
    },
    handleDelete(row, i) {
      localData.splice(i, 1);
    },
    handleAdd(row) {
      const a = { name: '', content1: '', content2: '', __group__: { group: row.__group__.group } };
      localData.push(a);
    },
    showAdd(row) {
      return row.__group__.title === true;
    },
    showDelete(row) {
      return row.__group__.title !== true;
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-input__inner {
  border: none;
}
</style>
