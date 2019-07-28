<template>
  <div>
    <Header :title="'个人信息'"></Header>
    <mt-field label="phone_number" type="tel" readonly value="13866668888" disableClear></mt-field>
    <mt-field label="email" type="email" readonly value="clerk@oocl.com" disableClear></mt-field>
    <mt-field label="role" readonly value="Parking Boy" disableClear></mt-field>
    <mt-field label="status" readonly value="Active" disableClear></mt-field>
    <mt-field label="managed_by" readonly value="Parking Manager" disableClear></mt-field>
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