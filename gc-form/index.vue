<template>
  <el-form
    :model="form"
    ref="form"
    :rules="rulesResult"
    :label-width="`${mainConfig.labelWidth}px`"
    :label-position="mainConfig.labelPosition"
    v-loading="loading"
  >
    {{ form }}

    <el-row v-for="(row, rowIndex) in fieldListConfig" :key="rowIndex">
      <el-col v-for="item in row" :key="item.name" :span="item.span">
        <el-row>
          <el-col>
            <el-form-item :label="item.label" :prop="item.name" @click.native="$emit('clickFormItem', item)">
              <!-- input -->
              <el-input
                v-if="item.type === 'input'"
                v-model="form[item.name]"
                :name="item.formDataName"
                :disabled="item.disabled"
                :readonly="item.readonly"
                :placeholder="item.placeholder"
              ></el-input>

              <!-- password -->
              <el-input
                v-if="item.type === 'password'"
                v-model="form[item.name]"
                :name="item.formDataName"
                :disabled="item.disabled"
                :readonly="item.readonly"
                :placeholder="item.placeholder"
                :show-password="true"
              ></el-input>

              <!-- number -->
              <el-input
                v-else-if="item.type === 'number'"
                v-model.number="form[item.name]"
                :name="item.formDataName"
                type="number"
                :disabled="item.disabled"
                :placeholder="item.placeholder"
              >
                <template v-if="item.append !== null && item.append !== undefined" slot="append">{{ item.append }}</template>
              </el-input>

              <!-- input-number -->
              <el-input-number v-else-if="item.type === 'input-number'" v-model="form[item.name]" :min="item.min" :max="item.max"></el-input-number>

              <!-- textarea -->
              <el-input
                v-else-if="item.type === 'textarea'"
                v-model="form[item.name]"
                :name="item.formDataName"
                type="textarea"
                :disabled="item.disabled"
                :readonly="item.readonly"
                :placeholder="item.placeholder"
              ></el-input>

              <!-- radio -->
              <el-radio-group v-else-if="item.type === 'radio'" v-model="form[item.name]" :disabled="item.disabled">
                <el-radio v-for="option in item.options" :label="option.value" :key="option.name" :name="item.formDataName">{{ option.name }}</el-radio>
              </el-radio-group>

              <!-- select -->
              <el-select
                v-else-if="item.type === 'select'"
                v-model="form[item.name]"
                :name="item.formDataName"
                :disabled="item.disabled"
                :placeholder="item.placeholder"
                style="width: 100%;"
              >
                <el-option v-for="option in item.options" :label="option.name" :key="option.value" :value="option.value"></el-option>
              </el-select>

              <select-api
                v-else-if="item.type === 'select-api'"
                v-model="form[item.name]"
                :name="item.formDataName"
                :disabled="item.disabled"
                :readonly="item.readonly"
                :api="item.api"
                :keyName="item.keyName"
                :labelName="item.labelName"
                :valueName="item.valueName"
              ></select-api>

              <select-dict
                v-else-if="item.type === 'select-dict'"
                v-model="form[item.name]"
                :name="item.formDataName"
                :disabled="item.disabled"
                :readonly="item.readonly"
                :catCode="item.catCode"
              ></select-dict>

              <!-- date -->
              <el-date-picker
                v-else-if="item.type === 'date'"
                v-model="form[item.name]"
                :name="item.formDataName"
                :disabled="item.disabled"
                :placeholder="item.placeholder"
                :type="item.dateType"
                :value-format="item.valueFormat || 'yyyy-MM-dd'"
                :readonly="item.readonly"
                style="width: 100%;"
              >
              </el-date-picker>

              <!-- 头像 -->
              <el-avatar v-else-if="item.type === 'avatar'" shape="square" :size="200" :src="item.value" alt="点击上传照片" fit="cover">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
              </el-avatar>

              <!-- file -->
              <template v-else-if="item.type === 'file'">
                <el-input v-model="form[item.filePathName]" :name="item.filePathName" readonly :placeholder="item.placeholder">
                  <template slot="append" v-if="item.operate.length > 0">
                    <div v-for="(operate, i) in item.operate" :key="i" class="file-operate">
                      <!-- 文件上传 -->
                      <template v-if="operate.type === 'upload'">
                        <div class="file-upload-text">{{ operate.label }}</div>
                        <input
                          :disabled="item.disabled"
                          :name="item.formDataName"
                          class="file-upload-input"
                          :style="{ cursor: item.disabled ? 'not-allowed' : 'pointer' }"
                          type="file"
                          accept="*"
                          @change="getFile($event, item)"
                        />
                      </template>

                      <!-- 文件下载 -->
                      <template v-else-if="operate.type === 'download'">
                        <span @click="downloadFile(form[item.filePathName])">{{ operate.label }}</span>
                      </template>

                      <template v-else>
                        <span>{{ operate.label }}</span>
                      </template>
                    </div>
                  </template>
                </el-input>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row>
      <el-form-item style="float: right;">
        <template>
          <el-button v-if="operateConfig.submit === true" @click="operateSubmit">提交</el-button>
          <el-button v-if="operateConfig.reset === true" @click="operateReset">重置</el-button>
        </template>
      </el-form-item>
    </el-row>
  </el-form>
</template>

<script>
import Bus from './bus';

import { formConfigValidator } from './tools';

import SelectDict from '@/components/select_dict/index.vue';
import SelectApi from '@/components/select_api/index.vue';

// 浏览器浏览文件
function viewFile(path) {
  if (path == null) {
    return;
  } else {
    window.open(process.env.VUE_APP_API_BASE_URL + path);
  }
}

export default {
  name: 'gc-form',
  components: { 'select-dict': SelectDict, 'select-api': SelectApi },
  props: {
    value: { type: Object, required: true, default: () => ({}) }, // 表单实体
    formConfig: { required: true, validator: formConfigValidator }, // 表单配置
    api: { type: Function, required: false }, // 表单提交接口
    btns: { type: Array, default: () => [] } // 表单操作按钮
  },
  watch: {
    form: {
      deep: true,
      handler: function(nv, ov) {
        this.$emit('input', Object.assign({}, ov));
      }
    }
  },
  data() {
    return {
      loading: false,
      form: {} // 内部使用的表单实体
    };
  },
  computed: {
    // 表单主题配置
    mainConfig() {
      return this.formConfig.mainConfig;
    },
    // 表单项目配置
    fieldListConfig() {
      const formConfigComplete = this.formConfig.fieldList.map(x => {
        const item = Object.assign({}, x);
        if (item.span === null || item.span === undefined) {
          item.span = this.formConfig.mainConfig.span;
        }
        return item;
      });
      const result = [[]];
      formConfigComplete.forEach(x => {
        const reduceIndex = result[result.length - 1].reduce((ac, cu) => ac + (cu.show ? cu.span : 0), 0) + (x.show ? x.span : 0); // show: false 不展示的组件也不占用空间
        if (reduceIndex > 24) {
          result.push([x]);
        } else {
          result[result.length - 1].push(x);
        }
      });
      return result;
    },
    // 表单常用操作配置
    operateConfig() {
      return this.formConfig.operateConfig;
    },
    rulesResult() {
      return {};
    }
  },
  created() {
    Bus.$on('field-change', data => this.$emit('field-change', data));

    this.initDefaultValue();
  },
  methods: {
    // 初始值设置
    initDefaultValue() {
      // 有默认值的设置默认值
      this.formConfig.fieldList.forEach(x => {
        if (x.defaultValue !== null && x.defaultValue !== undefined) {
          this.form[x.name] = x.defaultValue;
        }
      });
    },
    // 校验表单
    validate() {
      return new Promise(resolve => {
        this.$refs.form.validate(valid => {
          if (valid) {
            resolve({ success: true });
          } else {
            resolve({ success: false });
          }
        });
      });
    },
    // 表单形式提交
    submitForm(prehandle) {
      const form = new FormData(this.$el);
      this.submit(prehandle, form);
    },
    // 实体形式提交
    submitEntity(prehandle) {
      const form = Object.assign({}, this.form);
      this.submit(prehandle, form);
    },
    // 选择文件
    getFile(event, item) {
      const file = event.target.files;
      if (file.length > 0) {
        this.$set(this.form, item.filePathName, file[0].name);
      }
    },
    // 下载文件
    downloadFile(path) {
      viewFile(path);
    },
    validateField(field) {
      return this.form[field];
    },
    // 重置
    operateReset() {
      this.initDefaultValue();
    },
    submit(prehandle, form) {
      typeof prehandle === 'function' && prehandle(form);
      this.loading = true;
      return new Promise((resolve, reject) => {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.api(form)
              .then(res => (res.success ? resolve(res) : reject(res)))
              .catch(err => reject(err))
              .finally(() => (this.loading = false));
          } else {
            this.loading = false;
            this.$message.warning('请正确填写信息');
            return false;
          }
        });
      });
    },
    // 提交
    operateSubmit() {
      if (typeof this.api !== 'function') {
        throw new Error('submit函数不正确');
      }
      const form = Object.assign({}, this.form);
      this.submit(null, form);
    }
  }
};
</script>

<style lang="scss" scoped>
.file-operate {
  position: relative;
  overflow: hidden;
  display: inline-block;
  cursor: pointer;
}

.file-upload-input {
  cursor: pointer;
  background-color: transparent;
  position: absolute;
  width: 999px;
  height: 999px;
  top: -10px;
  right: -10px;
  opacity: 0;
}

.el-input-group__append > .file-operate:not(:first-child) {
  border-left: solid 1px #b9bec6;
  margin-left: 10px;
  padding-left: 10px;
}
</style>
