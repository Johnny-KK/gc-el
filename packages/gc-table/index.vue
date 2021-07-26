<template>
  <div class="gc-table" v-loading="loading">
    <el-table
      :data="actTableData"
      :stripe="isStripe"
      height="100%"
      :border="isBorder"
      :span-method="typeof tableConfig.spanMethod === 'function' ? tableConfig.spanMethod : null"
    >
      <!-- 分组行号 -->
      <el-table-column v-if="isGroup" label="序号" width="50">
        <template #default="{ row }">
          {{ row.__group__.index }}
        </template>
      </el-table-column>
      <template v-for="(item, i) in fieldList">
        <!-- 行号 -->
        <el-table-column v-if="item.type === COLUMN_TYPE.INDEX" :key="i" type="index" :label="item.label" width="50"></el-table-column>
        <!-- 操作列 -->
        <el-table-column v-else-if="item.type === COLUMN_TYPE.LINK" :key="i" :label="item.label" :width="item.width">
          <template #default="{ row, $index }">
            <el-link
              v-for="link in item.link"
              :key="link.name"
              type="primary"
              fixed="right"
              v-show="typeof link.show === 'function' ? link.show(row, $index) : true"
              @click.native.stop="link.click(row, $index)"
              >{{ link.name }}</el-link
            >
          </template>
        </el-table-column>
        <!-- 可编辑输入框 -->
        <el-table-column v-else-if="item.type === COLUMN_TYPE.INPUT" :key="i" :label="item.label" :width="item.width">
          <template #default="{ row }">
            <gc-input v-model="row[item.prop]"></gc-input>
          </template>
        </el-table-column>
        <el-table-column v-else :key="i" :prop="item.prop" :label="item.label" :formatter="handleFormatter(item)" :width="item.width"></el-table-column>
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
    data: { required: true }, // 表格数据
  },
  data() {
    return {
      loading: false,
      /**
       * 表格列类型
       * text 默认类型 直接显示文本
       * index 行号索引 显示当前行号 无需指定内容
       * link 操作列 提供操作文字链接
       * input 可编辑列 编辑形式为普通input输入框
       */
      COLUMN_TYPE: Object.freeze({ TEXT: 'text', INDEX: 'index', LINK: 'link', INPUT: 'input' }),
      actTableData: [], // 表格数据 考虑到本地分页的情况下table显示的数据和提供的数据将不一致
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
    // 是否斑马线
    isStripe() {
      return this.tableConfig.stripe === false ? false : true;
    },
    // 是否有边框
    isBorder() {
      return this.tableConfig.border === true ? true : false;
    },
    // 是否分组
    isGroup() {
      return this.tableConfig.group === true ? true : false;
    },
    // 是否分页
    isPage() {
      return this.tableConfig.isPage === false ? false : true;
    },
    // 是否本地数据
    isLocalData() {
      return this.tableConfig.isLocalData === true ? true : false;
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
  watch: {
    data: {
      deep: true,
      handler() {
        this.getData();
      },
    },
    // tableConfig: {
    //   deep: true,
    //   handler() {
    //     this.getData();
    //   },
    // },
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
        this.actTableData = records;
        page !== null && Object.assign(this.page, page);
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    // 从远程/本地数据源加载数据以及分页信息
    async loadDataAndPageFromSource() {
      let { records, page } = { records: null, page: null };
      // 本地分页
      if (this.isLocalData && this.isPage) {
        records = this.data.slice((this.page.currentPage - 1) * this.page.pageSize, this.page.currentPage * this.page.pageSize);
        page = { currentPage: this.page.currentPage, total: this.tableConfig.localData.length };
      }
      // 本地不分页
      if (this.isLocalData && !this.isPage) {
        records = this.data;
        page = null;
      }
      // 远程加载分页
      if (!this.isLocalData && this.isPage) {
        const res = await this.tableConfig.api(this.apiParamsWithPage);
        records = res.records;
        page = { currentPage: res.current, total: res.total };
      }
      // 远程加载不分页
      if (!this.isLocalData && !this.isPage) {
        const res = await this.tableConfig.api(this.apiParamsWithPage);
        records = res;
        page = null;
      }

      // 如果表格需要分组显示则进行分组索引生成 分组逻辑 根据__group__属性中 group为组名 title为组标题
      if (this.isGroup) {
        records.forEach((x) => {
          if (x.__group__ === null || typeof x.__group__ !== 'object') {
            x.__group__ = { group: -1 };
          } else {
            if (x.__group__.group === null || x.__group__.group === undefined) {
              x.__group__.group = -1;
            }
          }
        });
        records = handleRecords(records);
      }
      return { records, page };
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
    // 数据字段显示格式化
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

/**
 * 根据某个属性将对象数组分组
 */
function handleRecords(list) {
  // TODO 这里仅仅考虑了9组
  const ia = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  let result = {};
  list.forEach((x) => {
    if (!Array.isArray(result[x.__group__.group])) {
      result[x.__group__.group] = [x];
    } else {
      result[x.__group__.group].push(x);
    }
  });
  result = Object.keys(result).map((key) => result[key]);
  result.forEach((x, i) =>
    x.forEach((y, j) => {
      if (y.__group__.title === true) {
        y.__group__.index = `${ia[i + 1]}、`;
      } else {
        // TODO 这里默认有且仅有一个title j+1-1相互抵消
        y.__group__.index = j + 1 - 1;
      }
    })
  );
  return result.flat().sort((a, b) => {
    const o = a.__group__.group - b.__group__.group;
    const i = a.__group__.inde - b.__group__.index;
    return o !== 0 ? o : i;
  });
}
</script>

<style lang="scss" scoped>
.gc-table {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
