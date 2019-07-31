<template>
  <div>
    <MyHeader :title="'车辆停取'"></MyHeader>

    <div class="park_logo">
      <el-button
        v-if="parkcar"
        @click="parkCar"
        type="primary"
        :loading="accepting"
        icon="el-icon-place"
        :disabled="ableClick"
      >{{parkText}}</el-button>
      <el-button
        v-else
        @click="fetchCar"
        icon="el-icon-message-solid"
        type="success"
        :loading="accepting"
        :disabled="ableClick"
      >{{pickText}}</el-button>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader/index";
import { Toast, MessageBox } from "mint-ui";
import { parkCarByUserIdAndCar, fetchCarByUserId } from "@/api/createOrder";
import { fetchUserProfile } from "@/api/userProfile";
import { fetchUserOrder } from "@/api/userOrder";
import { setInterval, clearInterval } from "timers";

const REQUEST_PICKCAR = 3;

export default {
  name: "parkCar",
  created() {},
  mounted() {
    var self = this;
    fetchUserProfile().then(res => {
      self.$store.state.currentUser = res.data;
    });
    fetchUserOrder().then(res => {
       self.myOrder = res.data[0]
      if (res.data[0].status == "已完成") {
        if (self.ableClick == false) {
          self.ableClick == true;
        }
      } else if (res.data[0].status == "已停车") {
      
        self.$store.dispatch("setParkCar");
        if(self.$store.state.parkCar == true){
          self.$store.dispatch("setParkCar");
          self.pickText = "PB已停车，点击按钮取车";
       
        }
         else {
           self.pickText = "PB已停车，点击按钮取车";
         }
      } else {
        self.ableClick = !self.ableClick;
        Toast({
          message: "有订单未完成，请到订单页完成订单",
          position: "bottom",
          iconClass: "el-icon-warning-outline",
          duration: 1500
        });
      }
    });
  },
  data() {
    return {
      parkUrl: require("@/assets/parkCar.svg"),
      fetchUrl: require("@/assets/fetchCar.svg"),
      myOrder: '',
      ableClick: false,
      accepting: false,
      parkText: "点击停车",
      pickText: "点击取车",
      parkInterval: "",
      pickInterval: "",
      havedParkInterval: "",
      canParkInter: ""
    };
  },
  components: {
    MyHeader
  },
  computed: {
    parkcar() {
      return this.$store.state.parkCar;
    }
    // myOrder(){
    //   return this.$store.state.curOrder
    // }
  },
  methods: {
    parkCar() {
      var self = this;
      MessageBox.confirm("是否下单", "提示").then(
        action => {
          if (action == "confirm") {
            let data = {
              userId: self.$store.state.currentUser.userId,
              carLicense: self.$store.state.currentUser.carLicense
            };
            parkCarByUserIdAndCar(data)
              .then(res => {
                self.$store.state.curOrder = res.data;
                self.accepting = !self.accepting;
                self.ableClick = !self.ableClick;
                self.parkText = "正在为您寻找PB";
                Toast({
                  message: "下单成功",
                  iconClass: "el-icon-circle-check",
                  position: "bottom",
                  duration: 1500
                });
                self.parkInterval = setInterval(() => {
                  fetchUserOrder().then(res => {
                    res.data.forEach(item => {
                      if (item.status == "已接单") {
                        self.pickText = "PB已接单，正在为您停车";
                        self.clearParkInter();
                      }
                    });
                  });
                }, 4000);
                self.havedParkInterval = setInterval(() => {
                  fetchUserOrder().then(res => {
                    res.data.forEach(item => {
                      if (item.status == "已停车") {
                        self.accepting = !self.accepting;
                        self.pickText = "PB已停车，点击按钮取车";
                        self.ableClick = !self.ableClick;
                        self.clearHavedParkInter();
                      }
                    });
                  });
                }, 4000);
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
            fetchCarByUserId(self.myOrder)
              .then(() => {
                self.accepting = !self.accepting;
                self.ableClick = !self.ableClick;
                self.pickText = "正在取车";
                Toast({
                  message: "取车成功",
                  iconClass: "el-icon-circle-check",
                  position: "bottom",
                  duration: 1500
                });
                self.pickInterval = setInterval(() => {
                  fetchUserOrder().then(res => {
                    res.data.forEach(item => {
                      if (item.status == "取车中") {
                        self.accepting = !self.accepting;
                        self.ableClick = !self.ableClick;
                        self.$store.dispatch("setParkCar");
                        self.clearHavedPickInter();
                        self.$router.push("/userOrder");
                      }
                    });
                  });
                }, 4000);
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
    clearParkInter() {
      clearInterval(this.parkInterval);
      this.$store.dispatch("setParkCar");
    },
    clearHavedParkInter() {
      clearInterval(this.havedParkInterval);
    },
    clearHavedPickInter() {
      clearInterval(this.pickInterval);
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
