<template>
  <gc-table :table-config="tableConfig"></gc-table>
</template>

<script>
import localData from './data';

const apiQueryUser = () => Promise.resolve([]);

export default {
  name: 'x-table',
  data() {
    return {
      tableConfig: {
        localData: localData,
        // isPage: false,
        api: apiQueryUser,
        apiParams: { userName: '', userAcnt: '', logName: '', succeed: '', operTime: '' },
        fieldList: [
          { type: 'index', label: '序号' },
          { prop: 'userId', label: '主键id' },
          { prop: 'userAccount', label: '用户帐号' },
          { prop: 'userName', label: '用户名称' },
          { label: '用户头像' },
          { prop: 'deptName', label: '部门' },
          { prop: 'userStatus', label: '状态', catCode: 'user_status' },
          { prop: 'enabled', label: '是否启用', catCode: 'enabled' },
          { prop: 'validTime', label: '启用时间', formatter: (r, c, v) => v.substring(0, 10) },
          { prop: 'remark', label: '备注' },
          {
            label: '操作',
            type: 'link',
            link: [
              { name: '编辑', click: (val) => this.handleEdit(val) },
              { name: '删除', click: (val) => this.handleDelete(val) },
            ],
          },
        ],
      },
    };
  },
  methods: {
    handleEdit(x) {
      console.warn(x);
    },
  },
};
</script>
