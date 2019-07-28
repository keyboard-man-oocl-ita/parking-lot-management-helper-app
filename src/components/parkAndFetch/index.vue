<template>
  <div>
    <Header :title="'正在进行的订单'"></Header>

    <el-table :data="ordering" stripe style="width: 100%">
      <el-table-column prop="orderNumber" label="订单号" width="80"></el-table-column>
      <el-table-column prop="carLicense" label="车牌号" width="80"></el-table-column>
      <el-table-column prop="parkinglot" label="停车场"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
    </el-table>

  </div>
</template>

<script>
import Header from "../header/index";

export default {
  name: "parkAndFetch",
  components: {
    Header
  },
  data() {
    return {
      ordering: [
        {
          orderNumber: "454545",
          carLicense: "粤A 88888",
          parkinglot: "yangming",
          status: "已接单"
        },
        {
          orderNumber: "454545",
          carLicense: "粤B 88888",
          parkinglot: "yangming",
          status: "未接单"
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>