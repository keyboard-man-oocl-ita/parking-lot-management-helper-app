<template>
  <div>
    <MyHeader :title="'订单详细信息'"></MyHeader>

    <div class="details_content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{'订单号： ' +  details.orderId }}</span>
        </div>
        <div class="text item">{{'车牌号： ' + details.carLicense }}</div>
        <div class="text item">{{'下单时间： ' + formatDateTest(details.createdTime) }}</div>
        <div class="text item">{{'结单时间： ' + formatDateTest(details.endTime) }}</div>
        <div class="text item">{{'停车时间： ' + details.parkTime }}</div>
      </el-card>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader/index";
import { formatDate } from '@/utils/dateFormat'


export default {
  name: "historyDetails",
  components: {
    MyHeader
  },
  created() {
    this.$store.state.orderHistory.forEach(item => {
      if (item.orderId == this.$route.params.id) {
        this.details = item;
        let parkTime = item.endTime - item.createdTime
        this.details.parkTime = `${parseInt(parkTime/1000/60/60%24)}时${parseInt(parkTime/1000/60%60)}分${parseInt(parkTime/1000%60)}秒`
      }
    });
  },
  data() {
    return {
      details: ''
    };
  },
  computed: {
  },
  methods: {
    formatDateTest(timeStamp){
      return formatDate(timeStamp)
    }
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