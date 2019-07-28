<template>
  <div>

    <div class="body">
      <router-view />
    </div>

    <mt-tabbar v-model="selected">
      <mt-tab-item id="tab1">
        <img slot="icon" src="@/assets/list.svg" />
        抢单
      </mt-tab-item>
      <mt-tab-item id="tab2">
        <img slot="icon" src="@/assets/car.svg" />
        进行中
      </mt-tab-item>
      <mt-tab-item id="tab3">
        <img slot="icon" src="@/assets/history.svg" />
        历史
      </mt-tab-item>
      <mt-tab-item id="tab4">
        <img slot="icon" src="@/assets/person.svg" />
        个人
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "ExampleComponent",
  created(){
    this.$router.push("/grabOrder")
  },
  data() {
    return {
      selected: ""
    };
  },
  components:{
  },
  watch: {
    selected() {
      switch (this.selected) {
        case "tab1":
          this.$router.push("grabOrder");
          break;

        case "tab2":
          this.$router.push("parkAndFetch");
          break;

        case "tab3":
          this.$router.push("history");
          break;

        case "tab4":
          this.$router.push("personal");
          break;

        default:
          this.$router.push("parkAndFetch");
      }
    }
  },
  methods: {
    handleClose() {},
    backClick(){
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.body {
  margin-top: 40px;
}
</style>
