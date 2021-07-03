<template>
  <div class="l-r">
    <section class="l" :style="{ 'flex-basis': lWidth }">
      <slot name="L"></slot>
    </section>
    <section class="r">
      <slot name="R"></slot>
    </section>
  </div>
</template>

<script>
export default {
  name: 'L-R',
  props: {
    lWidth: { type: String, default: '20%' } // L宽度
  }
};
</script>

<style lang="scss" scoped>
.l-r {
  display: flex;
  flex-direction: row;

  .l {
    flex-shrink: 1;
    flex-grow: 0;
    overflow-x: auto;
    padding-right: 8px;
  }

  .r {
    flex: 1;
    overflow-x: auto;
    padding-left: 8px;
  }
}
</style>
