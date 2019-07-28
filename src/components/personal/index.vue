<template>
  <div>
    <Header :title="'个人信息'"></Header>
    <mt-field label="手机号" type="tel" readonly value="13866668888" disableClear></mt-field>
    <mt-field label="邮箱" type="email" readonly value="clerk@oocl.com" disableClear></mt-field>
    <mt-field label="角色" readonly value="Parking Boy" disableClear></mt-field>
    <mt-field label="冻结状态" readonly value="Active" disableClear></mt-field>
    <mt-field label="直属上司" readonly value="Parking Manager" disableClear></mt-field>
  </div>
</template>

<script>
import Header from "@/components/header/index";

export default {
  name: "personal",
  components: {
    Header
  }
};
</script>

<style scoped>
</style>