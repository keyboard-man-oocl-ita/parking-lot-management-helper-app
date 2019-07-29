<template>
  <div>
    <MyHeader :title="'订单详细信息'"></MyHeader>

    <div class="details_content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{'车牌号： ' + details.carLicense }}</span>
        </div>
        <div class="text item">{{'订单ID： ' + details.orderId }}</div>
        <div class="text item">{{'停车时间： ' + details.parktime }}</div>
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
  mounted() {},
  data() {
    return {
      details: {
        orderId: "111111",
        carLicense: "粤A 88888",
        parktime: "1小时20分"
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