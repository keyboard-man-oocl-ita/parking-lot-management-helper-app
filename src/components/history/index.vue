<template>
  <div>
    <MyHeader :title="'历史'"></MyHeader>

    <div v-for="(item, index) in orders" :key="index">
      <mt-cell
        :title="`${item.carLicense}`"
        :to="`/details/${item.order_id}`"
        value="详细信息"
        is-link
        :label="`${item.createTime} - ${item.endTime}`"
      >
        <img slot="icon" src="@/assets/complete.svg" width="24" height="24" />
      </mt-cell>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader/index";
import { mapState } from "vuex";

export default {
  name: "history",
  components: {
    MyHeader
  },
  mounted() {
    this.$store.dispatch("fetchOrderHistory", this.parkingBoyId);
  },
  data() {
    return {
      orders: [
        {
          carLicense: "粤A 88888",
          createTime: "19:00",
          endTime: "20:00"
        },
        {
          carLicense: "粤B 88888",
          createTime: "19:00",
          endTime: "20:00"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      orders: state => state.clerkOrderList,
      parkingBoyId: state => state.parkingBoyId
    })
  },
  methods: {}
};
</script>

<style scoped>
</style>