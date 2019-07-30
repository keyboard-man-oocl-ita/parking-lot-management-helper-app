<template>
  <div>
    <div class="body">
      <router-view />
    </div>

    <mt-tabbar v-model="selected" fixed class="bottom_tab">
      <mt-tab-item id="tab1">
        <img slot="icon" src="@/assets/car.svg" />
        停取
      </mt-tab-item>
      <mt-tab-item id="tab2">
        <img slot="icon" src="@/assets/person.svg" />
        个人
      </mt-tab-item>
      <mt-tab-item id="tab3">
        <img slot="icon" src="@/assets/userorder.svg" />
        订单
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "UserLayout",
  created() {
    this.$router.push("/parkCar");
  },
  data() {
    return {
      selected: ""
    };
  },
  components: {},
  watch: {
    selected() {
      switch (this.selected) {
        case "tab1":
          this.$router.push("/parkCar");
          break;
        case "tab2":
          this.$router.push("/userProfile");
          break;
        case "tab3":
          this.$router.push("/userOrder");
          break;
        default:
          this.$router.push("parkCar");
      }
    }
  },
  methods: {}
};
</script>

<style scoped>
.body {
  margin-top: 40px;
  margin-bottom: 55px;
}
</style>
