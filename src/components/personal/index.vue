<template>
  <div>
    <Header :title="'个人信息'"></Header>
    <mt-field label="phone_number" type="tel" readonly="true" value="13866668888"></mt-field>
    <mt-field label="email" type="email" readonly="true" value="clerk@oocl.com"></mt-field>
    <mt-field label="role" readonly="true" value="Parking Boy"></mt-field>
    <mt-field label="status" readonly="true" value="Active"></mt-field>
    <mt-field label="managed_by" readonly="true" value="Parking Manager"></mt-field>
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