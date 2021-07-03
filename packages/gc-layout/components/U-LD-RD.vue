<template>
  <div class="u-d">
    <section class="u">
      <slot name="U"></slot>
    </section>
    <section class="d">
      <section class="l" :style="{ 'flex-basis': lWidth }">
        <slot name="LD"></slot>
      </section>
      <section class="r">
        <slot name="RD"></slot>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: 'U-LD-RD',
  props: {
    lWidth: { type: String, default: '20%' } // L宽度
  }
};
</script>

<style lang="scss" scoped>
.u-d {
  display: flex;
  flex-direction: column;

  .d {
    flex: 1;

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
}
</style>
