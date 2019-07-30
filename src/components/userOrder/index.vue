<template>
  <div>
    <MyHeader :title="'用户订单'"></MyHeader>

    <el-collapse @change="handleChange">
      <el-collapse-item
        :title="`订单号：${item.orderId}`"
        :name="index"
        v-for="(item, index) in orders"
        :key="index"
      >
        <el-card class="box-card">
          <div>车牌号：{{item.carLicense}}</div>
          <div>停车场：{{item.parkinglotName}}</div>
          <div>下单时间：{{formatDateTest(item.createTime)}}</div>
          <div>结单时间：{{formatDateTest(item.endTime)}}</div>
          <div class="order_details">
            <el-button type="success" round size="mini" icon="el-icon-check">确认订单</el-button>
          </div>
        </el-card>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { formatDate } from "@/utils/dateFormat";
import MyHeader from "@/components/MyHeader/index";
import axios from "axios"

export default {
  name: "userOrder",
  created(){
    this.fetchData()
  },
  data() {
    return {
      orders: [
        // {
        //   orderId: "88848484484",
        //   carLicense: "粤R 12345",
        //   parkinglotName: "parkingLot1",
        //   createTime: 1564392583977,
        //   endTime: 1564392604264
        // },
        // {
        //   orderId: "88848485511",
        //   carLicense: "粤R 23456",
        //   parkinglotName: "parkingLot2",
        //   createTime: 1564392583977,
        //   endTime: 1564392604264
        // }
      ]
    };
  },
  components: {
    MyHeader
  },
  methods: {
    handleChange() {},
    formatDateTest(timeStamp) {
      return formatDate(timeStamp);
    },
    fetchData(){
      var self = this
      axios.get("https://www.easy-mock.com/mock/5d3f954630a01f68880d074a").then((res) => {
        self.orders = res.data
      })
    }
  }
};
</script>

<style scoped>
.order_details {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
