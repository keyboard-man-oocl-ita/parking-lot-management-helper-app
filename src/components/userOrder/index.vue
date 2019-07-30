<template>
  <div>
    <MyHeader :title="'用户订单'"></MyHeader>

    <el-collapse>
      <el-collapse-item
        :title="`订单号：${item.orderId}
        订单状态：${item.status}`"
        :name="index"
        v-for="(item, index) in orders"
        :key="index"
      >
        <el-card class="box-card">
          <div>车牌号：{{item.carLicense}}</div>
          <div>停车场：{{item.parkingLotName}}</div>
          <div>下单时间：{{formatDateTest(item.createdTime)}}</div>
          <div v-if="item.endTime">结单时间：{{formatDateTest(item.endTime)}}</div>
          <div class="order_details">
            <el-button
              type="success"
              round
              size="mini"
              icon="el-icon-check"
              @click="comfirmOrder(item.userId)"
            >确认订单</el-button>
          </div>
        </el-card>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { formatDate } from "@/utils/dateFormat";
import { updateOrderStatusByUserId } from "@/api/userOrder";
import { MessageBox, Toast } from "mint-ui";
import MyHeader from "@/components/MyHeader/index";

export default {
  name: "userOrder",
  created() {
    this.fetchData();
  },
  mounted() {
    this.userOrderSetInterval = setInterval(() => {
      this.fetchData();
    }, 4000);
  },
  data() {
    return {
      userId: "f3a947d6-5eb6-4135-9e63-a0b239bf3519",
      userOrderSetInterval: ""
    };
  },
  components: {
    MyHeader
  },
  methods: {
    formatDateTest(timeStamp) {
      return formatDate(timeStamp);
    },
    fetchData() {
      this.$store.dispatch("fetchUserOrderHistory", this.userId);
    },
    comfirmOrder(userId) {
      MessageBox.confirm("是否确认订单完成", "提示").then(
        action => {
          if (action == "confirm") {
            updateOrderStatusByUserId(userId)
              .then(() => {
                this.fetchData();
                Toast({
                  message: "订单完成",
                  iconClass: "el-icon-circle-check",
                  duration: 1500
                });
              })
              .catch(error =>
                Toast({
                  message: `${error.message}`,
                  iconClass: "el-icon-circle-close",
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
  },
  computed: {
    orders() {
      return this.$store.state.userOrder;
    }
  },
  beforeDestroy() {
    clearInterval(this.userOrderSetInterval);
  }
};
</script>

<style>
.order_details {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-collapse-item__header {
  font-weight: 200;
  font-size: 6px;
  height: 48px;
  line-height: 24px;
}
</style>
