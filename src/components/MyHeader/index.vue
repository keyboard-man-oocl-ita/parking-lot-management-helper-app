<template>
  <div>
    <mt-header fixed :title="title">
      <div slot="right">
        <mt-button @click="handleClose">退出</mt-button>
      </div>
    </mt-header>
  </div>
</template>

<script>
import { MessageBox, Toast } from "mint-ui";

export default {
  name: "MyHeader",
  props: ["title"],
  data() {
    return {};
  },
  methods: {
    handleClose() {
      MessageBox.confirm("是否注销", "提示").then(
        action => {
          if (action == "confirm") {
            localStorage.removeItem("token");
            this.$router.push("/login");
          }
        },
        action => {
          if (action == "cancel") {
            Toast({
              message: "已取消",
              position: "bottom",
              duration: 1000
            });
          }
        }
      );
    }
  }
};
</script>