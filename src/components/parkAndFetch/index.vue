<template>
  <div>
    <Header :title="'正在进行的订单'"></Header>This is parkAndFetch component
  </div>
</template>

<script>
import Header from "../header/index";

export default {
  name: "parkAndFetch",
  components: {
    Header
  }
};
</script>

<style scoped>
</style>