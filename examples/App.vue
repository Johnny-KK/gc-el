<template>
  <div id="app">
    <gc-layout type="L-R">
      <template #L>
        <el-button @click="changeActive('form')">form</el-button>
        <el-button @click="changeActive('table')">table</el-button>
      </template>

      <template #R>
        <x-table v-if="active === 'table'"></x-table>
        <x-form v-if="active === 'form'"></x-form>
      </template>
    </gc-layout>
  </div>
</template>

<script>
import XTable from './components/table.vue';
import XForm from './components/form.vue';

export default {
  name: 'App',
  components: { 'x-table': XTable, 'x-form': XForm },
  data() {
    return {
      active: 'table',
    };
  },
  methods: {
    changeActive(type) {
      this.active = type;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.table-box {
  height: 600px;
}
</style>
