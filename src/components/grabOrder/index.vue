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
        :label="`停车时间：${item.parkTime}`"
      >
        <img slot="icon" src="@/assets/car_order.svg" width="24" height="24" />
      </mt-cell>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/index";
import { fetchOrders } from "@/api/grabOrder";
import { MessageBox, Toast } from "mint-ui";

export default {
  name: "grabOrder",
  created() {
    // this.fetchOrder()
  },
  data() {
    return {
      orders: [
        {
          carLicense: "粤A 88888",
          parkTime: "19:00"
        },
        {
          carLicense: "粤B 88888",
          parkTime: "19:00"
        },
        {
          carLicense: "粤C 88888",
          parkTime: "19:00"
        }
      ],
      parkingboy: {
        id: "1"
      }
    };
  },
  components: {
    Header
  },
  methods: {
    fetchOrder() {
      setTimeout(() => {
        fetchOrders(this.parkingboy.id);
      }, 3000);
    },
    grabOrder() {
      MessageBox.confirm("是否抢单", "提示").then(
        action => {
          if (action == "confirm") {
            this.$router.push("/parkAndFetch");
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