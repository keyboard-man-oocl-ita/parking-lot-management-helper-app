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
      >{{parkText}}
      </el-button>
      <el-button
              v-else
              @click="fetchCar"
              icon="el-icon-message-solid"
              type="success"
              :loading="accepting"
              :disabled="ableClick"
      >{{pickText}}
      </el-button>
    </div>
</template>

<script>
  import MyHeader from "@/components/MyHeader/index";
  import {Toast, MessageBox} from "mint-ui";
  import {parkCarByUserIdAndCar, fetchCarByUserId} from "@/api/createOrder";
  import {fetchUserProfile} from "@/api/userProfile";
  import {fetchUserOrder} from "@/api/userOrder";
  import {setInterval, clearInterval} from "timers";

  const REQUEST_PICKCAR = 3;

  export default {
    name: "parkCar",
    created() {
      this.mountHavedParkCar()
    },
    mounted() {
      var self = this;
      fetchUserProfile().then(res => {
        self.$store.state.currentUser = res.data;
      });
      fetchUserOrder().then(res => {
        self.$store.state.myOrder = res.data[0]
        if (res.data && res.data[0].status === "已完成") {
          if (self.ableClick === true) {
            self.ableClick === false;
          }
        } else if (res.data && res.data[0].status === "已停车") {
          self.$store.dispatch("setParkCar");
          if (self.$store.state.parkCar === true) {
            self.$store.dispatch("setParkCar");
            self.pickText = "PB已停车，点击按钮取车";
            self.ableClick = false
          } else {
            self.ableClick = false
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
        ableClick: false,
        accepting: false,
        parkText: "点击停车",
        pickText: "正在处理中...",
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
      },
      myParkOrder: {
        set() {
        },
        get() {
          return this.$store.state.myOrder;
        }
      }
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
                              this.$store.dispatch("setMyOrder", res.data);
                              self.myParkOrder = res.data;
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
                                  if (res.data[0].status === "已接单") {
                                    self.pickText = "PB已接单，正在为您停车";
                                    self.clearParkInter();
                                  }
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
                    self.myParkOrder.status = REQUEST_PICKCAR;
                    fetchCarByUserId(self.myParkOrder)
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
      },
      mountHavedParkCar() {
        var self = this
        this.havedParkInterval = setInterval(() => {
          fetchUserOrder().then(res => {
            self.$store.state.myParkOrder = res.data[0]
            if (res.data[0].status === "已停车") {
              self.pickText = "PB已停车，点击按钮取车";
              if (self.ableClick === true) {
                self.ableClick = !self.ableClick;
                self.accepting = false
              }
              self.accepting = false
            }
          });
        }, 4000);
      }
    },
    beforeDestroy() {
      clearInterval(this.havedParkInterval)
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
