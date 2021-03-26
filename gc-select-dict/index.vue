<template>
  <el-select v-model="selectedValue" @change="handleChange" v-bind="$attrs" v-on="$listeners" class="select-dict">
    <el-option v-for="item in options" :key="item.dictId" :label="item.dictName" :value="item.dictCode"> </el-option>
  </el-select>
</template>

<script>
import { apiQueryDictList } from '@/api/business/sys/sysDict.js';

export default {
  name: 'gc-select-dict',
  meta: { name: '下拉框-数据字典' },
  props: {
    /** */
    value: { type: [String, Number] },
    /** 数据字典编码 */
    catCode: { required: true, type: String }
  },
  data() {
    return {
      options: [],
      selectedValue: ''
    };
  },
  created() {
    this.queryOptions();
  },
  watch: {
    catCode: function() {
      this.reload();
    },
    value() {
      this.queryOptions();
    }
  },
  methods: {
    /** 获取字典值 */
    queryOptions() {
      apiQueryDictList(this.catCode)
        .then(res => {
          if (res.success) {
            this.selectedValue = this.value;
            this.options = res.data;
          }
        })
        .catch()
        .finally();
    },
    /** 值发生改变 */
    handleChange(dictCode) {
      this.$emit('input', dictCode);
    },
    /** 字典分类值变化时重载重载 */
    reload() {
      this.options = [];
      this.selectedValue = '';
      this.queryOptions();
    },
    /** 获取当前选中值 */
    getSelected() {
      return this.options.find(x => x.dictCode === this.selectedValue);
    }
  }
};
</script>

<style lang="scss" scoped>
.select-dict {
  width: 100%;
}
</style>
