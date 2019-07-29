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
import { Toast, MessageBox } from "mint-ui";
import { parkCarByUserIdAndCar, fetchCarByUserId } from "@/api/createOrder";

const REQUEST_PICKCAR = 3;

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
      parkUrl: require("@/assets/parkCar.svg"),
      fetchUrl: require("@/assets/fetchCar.svg"),
      userId: "1",
      carLicense: "粤C 88888",
      myOrder: ""
    };
  },
  components: {
    MyHeader
  },
  computed: {
    parkcar() {
      return this.$store.state.parkCar;
    }
  },
  methods: {
    parkCar() {
      var self = this;
      MessageBox.confirm("是否下单", "提示").then(
        action => {
          if (action == "confirm") {
            let data = {
              userId: this.userId,
              carLicense: this.carLicense
            };
            parkCarByUserIdAndCar(data)
              .then(res => {
                self.myOrder = res.data;
                self.$store.dispatch("setParkCar");
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
              })
              .catch(error =>
                Toast({
                  message: `${error.message}`,
                  position: "bottom",
                  duration: 1000
                })
              );
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
    },
    fetchCar() {
      var self = this;
      MessageBox.confirm("是否取车", "提示").then(
        action => {
          if (action == "confirm") {
            self.myOrder.status = REQUEST_PICKCAR;
            console.log(self.myOrder);
            fetchCarByUserId(self.myOrder)
              .then(() => {
                self.$store.dispatch("setParkCar");
                Toast({
                  message: "取车成功",
                  position: "bottom",
                  duration: 1500
                });
              })
              .catch(error =>
                Toast({
                  message: `${error.message}`,
                  position: "bottom",
                  duration: 1000
                })
              );
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

<style scoped>
.park_logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
}
</style>
