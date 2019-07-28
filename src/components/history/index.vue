<template>
  <div>
    <Header :title="'历史'"></Header>This is history component
  </div>
</template>

<script>
import Header from "../header/index";

export default {
  name: "history",
  components: {
    Header
  }
};
</script>

<style scoped>
</style>