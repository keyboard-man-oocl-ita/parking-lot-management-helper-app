<template>
  <div>
    <MyHeader :title="'抢单'"></MyHeader>
    <div v-for="(item, index) in orders" :key="index" @click="grabOrder(item)">
      <mt-cell
        :title="`${item.carLicense}`"
        value="抢单"
        is-link
        :label="`订单创建时间：${formatDateTest(item.createdTime)}`"
      >
        <img slot="icon" src="@/assets/car_order.svg" width="24" height="24" />
      </mt-cell>
    </div>
    <div v-if="this.orders.length === 0" style="text-align: center; font-size: 15px;">
      <span>暂无订单可抢</span>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader/index";
import {
  fetchOrdersByParkingBoyId,
  updateOrdersClerkIdAndStatus
} from "@/api/grabOrder";
import { MessageBox, Toast } from "mint-ui";
import { formatDate } from "@/utils/dateFormat";

const HAVE_RECEIVE_ORDER = 1;

export default {
  name: "grabOrder",
  created() {
    this.fetchData();
  },
  computed: {},
  mounted() {
    this.idOfSetInterval = setInterval(() => {
      this.fetchData();
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.idOfSetInterval);
  },
  data() {
    return {
      orders: [],
      idOfSetInterval: "",
      selectedOrder: {}
    };
  },
  components: {
    MyHeader
  },
  methods: {
    fetchData() {
      fetchOrdersByParkingBoyId()
        .then(res => {
          this.orders = res.data;
        })
        .catch(error =>
          Toast({
            message: `${error.message}`,
            position: "bottom",
            duration: 1000
          })
        );
    },
    grabOrder(item) {
      this.selectedOrder = item;
      this.selectedOrder.status = HAVE_RECEIVE_ORDER;
      MessageBox.confirm("是否抢单", "提示").then(
        action => {
          if (action == "confirm") {
            updateOrdersClerkIdAndStatus(this.selectedOrder)
              .then(() => {
                this.fetchData();
                Toast({
                  message: "抢单成功",
                  iconClass: "el-icon-circle-check",
                  duration: 1000
                });
                this.$router.push("/parkAndFetch")
              })
              .catch(error =>
                Toast({
                  message: `抢单失败`,
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
    formatDateTest(timeStamp) {
      return formatDate(timeStamp);
    }
  }
};
</script>

<style scoped>
</style>