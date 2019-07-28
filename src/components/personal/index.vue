<template>
  <div>
    <Header :title="'个人信息'"></Header>This is personal component
  </div>
</template>

<script>
import Header from "../header/index";

export default {
  name: "personal",
  components: {
    Header
  }
};
</script>

<style scoped>
</style>