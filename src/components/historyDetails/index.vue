<template>
  <div>
    <MyHeader :title="'订单详细信息'"></MyHeader>

    <div class="details_content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{'订单ID： ' +  details.order_id }}</span>
        </div>
        <div class="text item">{{'车牌号： ' + details.car_license }}</div>
        <div class="text item">{{'下单时间： ' + details.created_time }}</div>
        <div class="text item">{{'结单时间： ' + details.end_time }}</div>
        <div class="text item">{{'停车时间： ' + details.park_time }}</div>
      </el-card>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader/index";
import { mapState } from "vuex";

export default {
  name: "historyDetails",
  components: {
    MyHeader
  },
  mounted() {
    // this.$store.state.orderHistory.forEach(item => {
    //   if (item.order_Id == this.$route.params) {
    //     this.details = item;
    //   }
    // });
  },
  data() {
    return {
      details: {
        order_id: "123456789",
        car_license: "粤A 88888",
        created_time: "19:00",
        end_time: "20:00",
        park_time: "1小时0分"
      }
    };
  },
  computed: {
    ...mapState({
      orders: state => state.clerkOrderList
    })
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 16px 0;
}

.box-card {
  margin-top: 20px;
  width: 100%;
}

.details_content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>