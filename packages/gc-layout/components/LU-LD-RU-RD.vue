<template>
  <div class="l-r">
    <section class="l" :style="{ 'flex-basis': lWidth }">
      <section class="u">
        <slot name="LU"></slot>
      </section>
      <section class="d">
        <slot name="LD"></slot>
      </section>
    </section>
    <section class="r">
      <section class="u">
        <slot name="RU"></slot>
      </section>
      <section class="d">
        <slot name="RD"></slot>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: 'LU-LD-RU-RD',
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

    display: flex;
    flex-direction: column;
  }

  .r {
    flex: 1;
    overflow-x: auto;
    padding-left: 8px;

    display: flex;
    flex-direction: column;
  }

  .d {
    flex: 1;
  }
}
</style>
