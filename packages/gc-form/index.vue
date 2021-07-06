<template>
  <el-form
    ref="form"
    v-loading="loading"
    :model="model"
    :label-position="mainConfig.labelPosition"
    :label-width="`${mainConfig.labelWidth}px`"
    :rules="rulesConfig"
    :inline="mainConfig.layout === 'inline'"
    :class="formClass"
  >
    <!-- layout inline -->
    <template v-if="mainConfig.layout === 'inline'">
      <el-form-item
        v-for="config in fieldListConfig"
        :key="config.name"
        :label="config.label"
        :prop="config.name"
        v-show="config.show"
        @click.native="$emit('click-form-item', config)"
      >
        <component :is="`gc-${config.type}`" v-model="model[config.name]" v-bind="config" @changeDept="changeDept" />
      </el-form-item>

      <el-form-item v-for="(btn, i) in operateConfig" :key="i">
        <el-button v-if="btn.type === 'submit'" @click="submit(btn.action, btn.callback)">提交</el-button>
        <el-button class="line" v-else-if="btn.type === 'search'" :key="i" @click="btn.action">搜索</el-button>
        <el-button v-else :key="i" @click="btn.action">{{ btn.label }}</el-button>
      </el-form-item>

      <el-form-item>
        <slot name="btns"></slot>
      </el-form-item>
    </template>

    <!-- layout grid -->

    <!-- layout row-col -->
    <template v-else>
      <el-row v-for="(row, rowIndex) in fieldListConfig" :key="rowIndex">
        <!-- <el-divider content-position="left">分组</el-divider> -->
        <el-col v-for="config in row" :key="config.name" :span="config.span">
          <el-form-item :label="config.label" :prop="config.name" v-show="config.show" @click.native="$emit('click-form-item', config)">
            <component :is="`gc-${config.type}`" v-model="model[config.name]" v-bind="config" @changeDept="changeDept" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="operateConfig && operateConfig.length > 0">
        <el-form-item style="float: right">
          <template v-for="(btn, i) in operateConfig">
            <el-button v-if="btn.type === 'submit'" :key="i" @click="submit(btn.action, btn.callback)">提交</el-button>
            <el-button v-else-if="btn.type === 'submitForm'" :key="i" @click="submitForm(btn.action, btn.callback)">提交</el-button>
            <el-button v-else-if="btn.type === 'search'" :key="i" @click="btn.action">搜索</el-button>
            <el-button v-else :key="i" @click="btn.action">{{ btn.label }}</el-button>
          </template>
          <slot name="btns"></slot>
        </el-form-item>
      </el-row>
    </template>
  </el-form>
</template>

<script>
/**
 * TODO 集成 v-permission 指令 快捷根据权限显示隐藏
 * TODO 添加 clear 属性 允许值清空
 * TODO 尝试提供form-item插槽
 *
 * TODO select-api 回显问题 以及超量数据加载问题
 *
 * TODO 增加图片上传组件
 * TODO 增加级联选择器组件
 * TODO 增加通用树型下拉框组件 ？？
 * TODO 日期范围选择组件
 * TODO 分组表单
 *
 * FIXME
 */

import { formConfigValidator } from './tools';

export default {
  name: 'gc-form',
  props: {
    model: { type: Object, required: true, default: () => ({}) }, // 表单实体
    formConfig: { required: true, validator: formConfigValidator }, // 表单配置
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    // 表单主体配置
    mainConfig() {
      const config = Object.assign({}, this.formConfig.mainConfig);
      config.labelWidth = config.layout === 'inline' ? '' : config.labelWidth;
      return config;
    },
    // 表单项目配置
    fieldListConfig() {
      // 设置span 设置tagName
      const formConfigComplete = this.formConfig.fieldList.map((x) => {
        const item = Object.assign({}, x);
        // 修正span值
        if (item.span === null || item.span === undefined) {
          item.span = this.formConfig.mainConfig.span;
        }
        item.span = parseInt(item.span, 10);
        // 修正show值
        item.show = item.show === false ? false : true;
        return item;
      });
      // 布局类型为 inline
      if (this.formConfig.mainConfig.layout === 'inline') {
        return formConfigComplete;
      }

      // 布局类型为 col-row 根据span分行显示
      const result = [[]];
      formConfigComplete.forEach((x) => {
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
      return this.formConfig.operateConfig || [];
    },
    // 校验规则配置
    rulesConfig() {
      const result = {};
      this.formConfig.fieldList.forEach((x) => {
        if (Array.isArray(x.rules)) {
          result[x.name] = x.rules;
        }
      });
      return result;
    },
    // 表单样式
    formClass() {
      return { sBar: this.mainConfig.layout === 'inline', bg: this.mainConfig.layout === 'inline', font_medium: true };
    },
  },
  methods: {
    //部门选择问题->默认显示最后一级
    changeDept(deptCode, deptName) {
      this.$emit('changeDept', deptCode, deptName);
    },
    /**
     * 表单提交
     *
     * TODO 提供submit钩子函数 包括提交前 校验前 校验后 提交后等
     */
    submit(api, callback) {
      if (typeof api !== 'function') {
        console.error('配置没有提供保存接口');
        return false;
      }
      // TODO 提供配置控制loading是否显示
      this.loading = true;
      this.$refs.form.validate((valid) => {
        if (!valid) {
          this.$emit('error', valid);
          this.loading = false;
          return false;
        }
        api(this.model)
          .then((res) => {
            if (res.success === true) {
              this.$message.success(res.content);
              this.$emit('success', res);
            } else {
              this.$message.error(res.content);
              this.$emit('error', res);
            }
          })
          .catch((err) => {
            this.$message.error(err.content);
            this.$emit('error', err);
          })
          .finally(() => {
            this.loading = false;
            typeof callback === 'function' && callback();
          });
      });
    },
    submitForm(api, callback) {
      if (typeof api !== 'function') {
        console.error('配置没有提供保存接口');
        return false;
      }
      // TODO 提供配置控制loading是否显示
      this.loading = true;
      this.$refs.form.validate((valid) => {
        if (!valid) {
          this.$emit('error', valid);
          this.loading = false;
          return false;
        }
        const fd = new FormData();
        for (const key in this.model) {
          const value = this.model[key];
          if (value === null || value === undefined) {
            continue;
          }
          // 文件类型特殊处理
          const typeItem = this.formConfig.fieldList.find((x) => x.name === key);
          if (typeItem && typeItem.type === 'pic') {
            const file = this.model[key];
            // fd.append(key, '');
            file instanceof File && fd.append(typeItem.filename, file);
          } else {
            fd.append(key, this.model[key]);
          }
        }
        api(fd)
          .then((res) => {
            if (res.success === true) {
              this.$message.success(res.content);
              this.$emit('success', res);
            } else {
              this.$message.error(res.content);
              this.$emit('error', res);
            }
          })
          .catch((err) => {
            this.$message.error(err.content);
            this.$emit('error', err);
          })
          .finally(() => {
            this.loading = false;
            typeof callback === 'function' && callback();
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input-group__append > .file-operate:not(:first-child) {
  border-left: solid 1px #b9bec6;
  margin-left: 10px;
  padding-left: 10px;
}
</style>
