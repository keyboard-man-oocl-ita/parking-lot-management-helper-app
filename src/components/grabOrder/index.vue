<template>
  <div>
    <Header :title="'订单'"></Header>
    <mt-cell
      :title="`${item.carLicense}`"
      v-for="(item, index) in orders"
      :key="index"
      to="/chooseParkingLot"
      value="抢单"
      is-link
      :label="`订单创建时间：${item.createdTime}`"
    >
      <img slot="icon" src="../../assets/car_order.svg" width="24" height="24" />
    </mt-cell>
  </div>
</template>

<script>
import Header from "@/components/header/index";
import { fetchOrdersByParkingBoyId } from "@/api/grabOrder";


export default {
  name: "grabOrder",
  created: function() {
    fetchOrdersByParkingBoyId(this.parkingboy.id).then(res => {
      this.orders = res.data;
      // eslint-disable-next-line no-console
    }).catch(error => console.log(error))
  },
  data() {
    return {
      orders: [],
      parkingboy: {
          id: '1'
      }
    };
  },
  components: {
    Header
  },
  methods: {

  }
};
</script>

<style scoped>
</style>