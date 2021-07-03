// export default {
//   name: 'gc-table',
//   props: {
//     api() {}
//   },
//   data() {
//     return {
//       tableData: [
//         { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
//         { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' },
//         { date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },
//         { date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1516 弄' }
//       ],
//       tableHeader: [
//         { prop: 'date', label: '日期', bind: { align: 'center', width: 'auto' } },
//         { prop: 'name', label: '姓名', bind: { align: 'center', width: 'auto' } },
//         { prop: 'address', label: '地址', bind: { align: 'center', width: 'auto' } }
//       ]
//     };
//   },
//   methods: {
//     // 获取数据
//     queryData() {}
//   },
//   render(h) {
//     return h('div', {}, [
//       h(
//         'el-table',
//         {
//           props: {
//             data: this.tableData
//           }
//         },
//         [
//           this.tableHeader.map(x =>
//             h('el-table-column', {
//               props: {
//                 prop: x.prop,
//                 label: x.label,
//                 width: x.bind.width
//               }
//             })
//           )
//         ]
//       )
//     ]);
//   }
// };

import GcTable from './index.vue';

export default GcTable;
