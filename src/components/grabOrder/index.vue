<template>
  <div>
    <Header :title="'订单'"></Header>
    <mt-cell :title="`${item.carLicense}`" v-for="(item, index) in orders" :key="index" to="/chooseParkingLot" value="抢单" is-link :label="`停车时间：${item.parkTime}`" >
      <img slot="icon" src="../../assets/car_order.svg" width="24" height="24" />
    </mt-cell>
  </div>
</template>

<script>
import Header from '../header/index'
import { setTimeout } from 'timers';

export default {
  name: "grabOrder",
  created(){
    // this.fetchOrder()
  },
  data(){
      return{
          orders:[
              {
                carLicense: "粤A 88888",
                parkTime: "19:00"
              },
              {
                carLicense: "粤B 88888",
                parkTime: "19:00"
              },
              {
                carLicense: "粤C 88888",
                parkTime: "19:00"
              }
          ],
      }
  },
  components:{
      Header
  },
  methods:{
      fetchOrder(){
          setTimeout(() => {
              
          }, 3000);
      }
  }
};
</script>

<style scoped>
</style>