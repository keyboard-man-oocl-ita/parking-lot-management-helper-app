<template>
  <div>
<<<<<<< HEAD
    <mt-cell title="车牌号" to="/chooseParkingLot" is-link icon="../../assets/car_order.svg" label="停车时间：">
=======
    <Header :title="'订单'"></Header>
    <mt-cell title="车牌号" to="/parkAndFetch" is-link icon="../../assets/car_order.svg" label="停车时间：">
>>>>>>> 6a97ebf91e972cbadc40df0e8441e41236d914f3
      <span>抢单</span>
      <img slot="icon" src="../../assets/car_order.svg" width="24" height="24" />
    </mt-cell>
  </div>
</template>

<script>
import Header from '../header/index'

export default {
  name: "grabOrder",
  data(){
      return{
      }
  },
  components:{
      Header
  }
};
</script>

<style scoped>
</style>