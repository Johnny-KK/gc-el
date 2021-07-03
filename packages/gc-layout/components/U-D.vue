<template>
  <div class="u-d">
    <section class="u">
      <slot name="U"></slot>
    </section>
    <section class="d">
      <slot name="D"></slot>
    </section>
  </div>
</template>

<script>
export default {
  name: 'U-D'
};
</script>

<style lang="scss" scoped>
.u-d {
  display: flex;
  flex-direction: column;

  .d {
    flex: 1;
  }
}
</style>
