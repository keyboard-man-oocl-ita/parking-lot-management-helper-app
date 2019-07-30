<template>
  <div>
    <MyHeader :title="'个人信息'"></MyHeader>
    <div class="logo">
      <el-image style="width: 100px; height: 100px" :src="url"></el-image>
    </div>
    <mt-field label="手机号" type="tel" readonly value="13866668888" disableClear></mt-field>
    <mt-field label="邮箱" type="email" readonly value="clerk@oocl.com" disableClear></mt-field>
    <mt-field label="角色" readonly value="Parking Boy" disableClear></mt-field>
    <mt-field label="冻结状态" readonly value="Active" disableClear></mt-field>
    <mt-field label="直属上司" readonly value="Parking Manager" disableClear></mt-field>
    <el-button
      type="primary"
      style="width:100%;margin-top:20px;margin-bottom:30px;"
      @click.native.prevent="handleUpdate"
      size="small"
    >更新信息</el-button>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader/index";

export default {
  name: "personal",
  created() {},
  data() {
    return {
      url: require("@/assets/profile.svg")
    };
  },
  components: {
    MyHeader
  },
  methods: {
    handleUpdate() {}
  }
};
</script>

<style scoped>
.logo {
  margin: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>