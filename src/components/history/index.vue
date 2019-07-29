<template>
  <div>
    <MyHeader :title="'历史'"></MyHeader>

    <div v-for="(item, index) in orders" :key="index">
      <mt-cell
        :title="`${item.car_license}`"
        :to="`/history/${item.order_id}`"
        value="详细信息"
        is-link
        :label="`${item.created_time} - ${item.end_time}`"
      >
        <img slot="icon" src="@/assets/complete.svg" width="24" height="24" />
      </mt-cell>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader/index";
import { mapState } from "vuex";

const HAVED_FINISH_ORDER = 3

export default {
  name: "history",
  components: {
    MyHeader
  },
  mounted() {
    // this.$store.dispatch("fetchOrderHistory", this.parkingBoyId, HAVED_FINISH_ORDER);
  },
  data() {
    return {
      orders: [
        {
          order_id: "123456789",
          car_license: "粤A 88888",
          created_time: "19:00",
          end_time: "20:00"
        },
        {
          order_id: "00123456789",
          car_license: "粤B 88888",
          created_time: "19:00",
          end_time: "20:00"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      // orders: state => state.clerkOrderList,
      parkingBoyId: state => state.parkingBoyId
    })
  },
  methods: {}
};
</script>

<style scoped>
</style>