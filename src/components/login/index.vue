<template>
  <div>
    <Header :title="'登录'"></Header>This is login component
  </div>
</template>

<script>
import Header from "../header/index";

export default {
  name: "login",
  components: {
    Header
  }
};
</script>

<style scoped>
</style>