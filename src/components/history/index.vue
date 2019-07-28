<template>
  <div>
    <Header :title="'历史'"></Header>
    
    <mt-cell
      :title="`${item.carLicense}`"
      v-for="(item, index) in orders"
      :key="index"
      to="/details"
      value="详细信息"
      is-link
      :label="`${item.createTime} - ${item.endTime}`"
    >
      <img slot="icon" src="@/assets/complete.svg" width="24" height="24" />
    </mt-cell>

  </div>
</template>

<script>
import Header from "@/components/header/index";

export default {
  name: "history",
  components: {
    Header
  },
  data(){
    return {
      data:'www',
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
        },
        {
          carLicense: "粤C 88888",
          createTime: "19:00",
          endTime: "20:00"
        }
      ]
    }
  }
};
</script>

<style scoped>
</style>