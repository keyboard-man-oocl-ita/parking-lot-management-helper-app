<template>
  <div>
    <MyHeader :title="'停车'"></MyHeader>

    <div class="park_logo">
      <el-image v-if="parkcar" @click="parkCar" style="width: 100px; height: 100px" :src="parkUrl"></el-image>
      <el-image v-else @click="fetchCar" style="width: 100px; height: 100px" :src="fetchUrl"></el-image>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader/index";
import { Toast } from "mint-ui";
import { setTimeout } from "timers";

export default {
  name: "parkCar",
  mounted() {
    Toast({
      message: "点击中间按钮下单停车",
      position: "bottom",
      duration: 2000
    });
  },
  data() {
    return {
      parkcar: true,
      parkUrl: require("@/assets/parkCar.svg"),
      fetchUrl: require("@/assets/fetchCar.svg")
    };
  },
  components: {
    MyHeader
  },
  methods: {
    parkCar() {
      this.parkcar = !this.parkcar;
      // this.$store.dispatch("")
      Toast({
        message: "下单成功",
        position: "bottom",
        duration: 1500
      });
      setTimeout(() => {
        Toast({
          message: "再次点击即可取车",
          position: "bottom",
          duration: 2000
        });
      }, 1500);
    },
    fetchCar() {
      this.parkcar = !this.parkcar;
      // this.$store.dispatch("")
      Toast({
        message: "取车成功",
        position: "bottom",
        duration: 1000
      });
    }
  }
};
</script>

<style scoped>
.park_logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
}
</style>
