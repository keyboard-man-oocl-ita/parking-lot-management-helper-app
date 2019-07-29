<template>
  <div>
    <mt-header fixed :title="title">
      <mt-button icon="back" slot="left" @click="backClick">返回</mt-button>
      <div slot="right">
        <mt-button @click="handleClose">关闭</mt-button>
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
    handleClose() {},
    backClick() {
      this.$router.go(-1);
    }
  }
};
</script>