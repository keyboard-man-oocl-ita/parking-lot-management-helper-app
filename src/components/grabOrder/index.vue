<template>
  <div>
    <Header :title="'订单'"></Header>
    <div @click="grabOrder">
      <mt-cell
        :title="`${item.carLicense}`"
        v-for="(item, index) in orders"
        :key="index"
        value="抢单"
        is-link
        :label="`订单创建时间：${item.createdTime}`"
      >
        <img slot="icon" src="@/assets/car_order.svg" width="24" height="24" />
      </mt-cell>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/index";
import { fetchOrdersByParkingBoyId } from "@/api/grabOrder";
import { MessageBox, Toast } from "mint-ui";

export default {
  name: "grabOrder",
  created: function() {
    fetchOrdersByParkingBoyId(this.parkingboy.id)
      .then(res => {
        this.orders = res.data;
      })
      .catch(error => console.log(error));
  },
  data() {
    return {
      orders: [],
      parkingboy: {
        id: "1"
      }
    };
  },
  components: {
    Header
  },
  methods: {
    grabOrder() {
      MessageBox.confirm("是否抢单", "提示").then(
        action => {
          if (action == "confirm") {
            this.$router.push("/chooseParkingLot");
            Toast({
              message: "抢单成功",
              duration: 1000
            });
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
</style>