<template>
  <div>
    <MyHeader :title="'历史'"></MyHeader>

    <div v-for="(item, index) in orders" :key="index">
      <mt-cell
        :title="`${item.carLicense}`"
        :to="`/history/${item.orderId}`"
        value="详细信息"
        is-link
        :label="`${formatDateTest(item.createdTime)} - ${formatDateTest(item.endTime)}`"
      >
        <img slot="icon" src="@/assets/complete.svg" width="24" height="24" />
      </mt-cell>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader/index";
import { mapState } from "vuex";
import { formatDate } from '@/utils/dateFormat'

const HAVED_FINISH_ORDER = 4

export default {
  name: "history",
  components: {
    MyHeader
  },
  mounted() {
    this.$store.dispatch("fetchOrderHistory", { id:this.parkingBoyId, status:HAVED_FINISH_ORDER });
  },
  data() {
    return {
    };
  },
  computed: {
    orders(){
      return this.$store.state.orderHistory
    },
    ...mapState({
      parkingBoyId: state => state.parkingBoyId
    })
  },
  methods: {
    formatDateTest(timeStamp){
      return formatDate(timeStamp)
    }
  }
};
</script>

<style scoped>
</style>