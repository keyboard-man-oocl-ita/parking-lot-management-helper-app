<template>
  <div>
    <mt-header fixed :title="title">
      <div slot="right">
        <mt-button @click="handleClose">退出登录</mt-button>
      </div>
    </mt-header>
  </div>
</template>

<script>
export default {
  name: "MyHeader",
  props: ["title"],
  data() {
    return {};
  },
  methods: {
    handleClose() {
      localStorage.removeItem("token")
      this.$router.push("/login");
    },
  }
};
</script>