<template>
  <div>
    <MyHeader :title="'注册'"></MyHeader>This is register component
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader/index";

export default {
  name: "register",
  components: {
    MyHeader
  }
};
</script>

<style scoped>
</style>