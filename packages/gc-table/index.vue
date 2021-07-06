<template>
  <div class="gc-table" v-loading="loading">
    <el-table :data="tableData" stripe height="100%">
      <template v-for="(item, i) in fieldList">
        <el-table-column v-if="item.type === COLUMN_TYPE.INDEX" :key="i" type="index" :label="item.label" width="50"></el-table-column>
        <el-table-column v-else-if="item.type === COLUMN_TYPE.LINK" :key="i" :label="item.label">
          <template #default="{ row, $index }">
            <el-link @click.native.stop="link.click(row, $index)" v-for="link in item.link" :key="link.name" type="primary" fixed="right">{{
              link.name
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column v-else :key="i" :prop="item.prop" :label="item.label" :formatter="handleFormatter(item)"></el-table-column>
      </template>
    </el-table>

    <el-pagination
      v-if="isPage"
      :current-page="page.currentPage"
      :total="page.total"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :hide-on-single-page="page.hideOnSinglePage"
      :pager-count="page.pagerCount"
      background="background"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handlePageCurrentChange"
      @size-change="handlePageSizeChange"
    >
    </el-pagination>
  </div>
</template>

<script>
/**
 * TODO 无限虚拟表格
 */
export default {
  name: 'gc-table',
  props: {
    tableConfig: { required: true }, // 表格配置项
  },
  data() {
    return {
      loading: false,
      COLUMN_TYPE: Object.freeze({ TEXT: 'text', INDEX: 'index', LINK: 'link' }), // 表格列类型
      tableData: [], // 表格数据
      page: {
        currentPage: 1, // 当前页码
        total: 0, // 总数
        pageSize: 10, // 每页个数
        pageSizes: [5, 10, 20, 30, 40], // 每页个数选择器
        hideOnSinglePage: false, // 只有一页是否隐藏分页
        pagerCount: 5, // 页码按钮的数量
      }, // 分页对象
    };
  },
  computed: {
    //  是否分页
    isPage() {
      return this.tableConfig.isPage === false ? false : true;
    },
    // 是否本地数据
    isLocalData() {
      return Array.isArray(this.tableConfig.localData);
    },
    // 表格字段
    fieldList() {
      return this.tableConfig.fieldList.map((x) => {
        // type不指定则为默认类型
        if (x.type === null || x.type === undefined) {
          x.type = this.COLUMN_TYPE.TEXT;
        }
        return x;
      });
    },
    // 参数重构 添加分页信息
    apiParamsWithPage() {
      return Object.assign({}, this.tableConfig.apiParams, { currentPage: this.page.currentPage, pageSize: this.page.pageSize });
    },
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取数据
    async getData() {
      this.loading = true;
      try {
        const { records, page } = await this.loadDataAndPageFromSource();
        this.tableData = records;
        page !== null && Object.assign(this.page, page);
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    // 从远程/本地数据源加载数据以及分页信息
    async loadDataAndPageFromSource() {
      if (this.isLocalData && this.isPage) {
        return {
          records: this.tableConfig.localData.slice((this.page.currentPage - 1) * this.page.pageSize, this.page.currentPage * this.page.pageSize),
          page: { currentPage: this.page.currentPage, total: this.tableConfig.localData.length },
        };
      }
      if (this.isLocalData && !this.isPage) {
        return { records: this.tableConfig.localData, page: null };
      }
      if (!this.isLocalData && this.isPage) {
        const res = await this.tableConfig.api(this.apiParamsWithPage);
        return { records: res.records, page: { currentPage: res.current, total: res.total } };
      }
      if (!this.isLocalData && !this.isPage) {
        const res = await this.tableConfig.api(this.apiParamsWithPage);
        return { records: res, page: null };
      }
    },
    // 翻页查询
    handlePageCurrentChange(currentPage) {
      this.page.currentPage = currentPage;
      this.getData();
    },
    // 每页个数改变
    handlePageSizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.page.currentPage = 1;
      this.getData();
    },
    // 格式化行
    handleFormatter(item) {
      const isDictFormat = item.catCode !== undefined && item.catCode !== null && item.catCode !== '';
      if (isDictFormat) {
        return this.dictFormatter;
      }
      if (typeof item.formatter !== 'function') {
        return null;
      }
      return item.formatter;
    },
    async dictFormatter(row, column, cellValue) {
      const api = this.$gcEl.apiQueryDictList;
      if (typeof api !== 'function') {
        console.warn('请先配置数据字典查询函数');
        return cellValue;
      }
      const data = await api(row.catCode);
      const one = data.filter((x) => x.catCode === row.catCode).find((x) => x.dictCode === cellValue);
      return typeof one === 'object' && one !== null ? one.dictName : cellValue;
    },
  },
};
</script>

<style lang="scss" scoped>
.gc-table {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
