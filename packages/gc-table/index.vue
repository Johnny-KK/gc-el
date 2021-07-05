<template>
  <div class="gc-table" v-loading="loading">
    <el-table :data="tableData" stripe height="100%">
      <template v-for="(item, i) in fieldList">
        <el-table-column v-if="item.type === COLUMN_TYPE.INDEX" :key="i" type="index" :label="item.label" width="50"></el-table-column>
        <el-table-column v-else :key="i" :prop="item.prop" :label="item.label"></el-table-column>
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
// 本地数据默认处理--根据是否分页来判断是否包装数据
const DEFAULT_HANDLE_LOCAL_DATA = (data) => {
  if (this.isPage) {
    const actData = data.slice((this.page.currentPage - 1) * this.page.pageSize, this.page.currentPage * this.page.pageSize);
    return Promise.resolve({ current: '', total: data.length, records: actData });
  }
  return Promise.resolve(data);
};
// 远程接口数据默认处理--根据success字段判断是否成功
const DEFAULT_HANDLE_API_DATA = (data) => {
  return new Promise((reslove, reject) => (data.success === true ? reslove(data.data) : reject({ msg: data.content })));
};

// 数据不分页处理--直接返回
const DEFAULT_HANDLE_NO_PAGE = (data) => Promise.resolve({ records: data, page: null });
// 数据分页处理--分别提取数据和分页信息
const DEFAULT_HANDLE_USE_PAGE = (data) => {
  // TODO 处理分页对象
  return Promise.resolve({ records: data.records, page: { currentPage: data.current, total: data.total } });
};

export default {
  name: 'gc-table',
  props: {
    tableConfig: { required: true }, // 表格配置项
  },
  data() {
    return {
      loading: false,
      COLUMN_TYPE: Object.freeze({ TEXT: 'text', INDEX: 'index' }), // 表格列类型
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
        // 从数据源加载数据 -- 拿到原始数据
        const res = await this.loadDataFromDatasource(this.apiParamsWithPage);
        // 数据初步处理 -- 拿到数据本身或者分页模式数据
        const data = await this.handleDataByDatasource(res);
        // 分页处理 -- 根据当前是否分页来将数据和分页信息剥离
        const { records, page } = await this.handlePageByDatasource(data);
        if (this.isPage) {
          Object.assign(this.page, page);
        }
        this.tableData = records;
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    /// 从数据源加载数据
    loadDataFromDatasource(params) {
      if (this.isLocalData) {
        return Promise.resolve(this.tableConfig.localData);
      }
      return this.tableConfig.api(params);
    },
    // 数据源数据获取后处理
    handleDataByDatasource(res) {
      // TODO 允许用户自定义处理方式
      if (this.isLocalData) {
        return DEFAULT_HANDLE_LOCAL_DATA(res);
      }
      return DEFAULT_HANDLE_API_DATA(res);
    },
    // 分页数据处理
    handlePageByDatasource(data) {
      // TODO 允许用户自定义处理方式
      if (!this.isPage) {
        return DEFAULT_HANDLE_NO_PAGE(data);
      }
      return DEFAULT_HANDLE_USE_PAGE(data);
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
