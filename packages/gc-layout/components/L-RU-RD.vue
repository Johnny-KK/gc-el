<template>
  <div class="l-ru-rd">
    <section class="l" :style="{ 'flex-basis': lWidth }"><slot name="L"></slot></section>
    <section class="r">
      <section class="u"><slot name="RU"></slot></section>
      <section class="d"><slot name="RD"></slot></section>
    </section>
  </div>
</template>

<script>
export default {
  name: 'L-RU-RD',
  props: {
    lWidth: { type: String, default: '20%' }, // L宽度
  },
};
</script>

<style lang="scss" scoped>
.l-ru-rd {
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

    width: 1px;

    display: flex;
    flex-direction: column;

    .d {
      flex: 1;
    }
  }
}
</style>
