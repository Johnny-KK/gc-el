<template>
  <div class="gc-layout">
    <component class="layout-content" :is="actLayout" :l-width="lWidth">
      <template #L><slot name="L"></slot></template>
      <template #R><slot name="R"></slot></template>
      <template #U><slot name="U"></slot></template>
      <template #D><slot name="D"></slot></template>
      <!--  -->
      <template #LU><slot name="LU"></slot></template>
      <template #LD><slot name="LD"></slot></template>
      <template #RU><slot name="RU"></slot></template>
      <template #RD><slot name="RD"></slot></template>
    </component>
  </div>
</template>

<script>
import L_R from './components/L-R.vue';
import U_D from './components/U-D.vue';
import L_RU_RD from './components/L-RU-RD.vue';
import LU_LD_RU_RD from './components/LU-LD-RU-RD.vue';
import U_LD_RD from './components/U-LD-RD.vue';

export default {
  name: 'gc-layout',
  props: {
    type: { type: String, default: 'L-R' }, // 布局样式
    lWidth: { type: String, default: '20%' }, // L宽度
  },
  components: { 'L-R': L_R, 'U-D': U_D, 'L-RU-RD': L_RU_RD, 'LU-LD-RU-RD': LU_LD_RU_RD, 'U-LD-RD': U_LD_RD },
  computed: {
    actLayout() {
      const allowList = ['L-R', 'U-D', 'L-RU-RD', 'LU-LD-RU-RD', 'U-LD-RD'];
      const defaultType = 'L-R';
      return allowList.includes(this.type) ? this.type : defaultType;
    },
  },
};
</script>

<style lang="scss" scoped>
.gc-layout {
  height: 100%;
  width: 100%;
  padding: 10px 30px;

  .layout-content {
    height: 100%;
    width: 100%;
  }
}
</style>
