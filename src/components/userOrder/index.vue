<template>
  <div>
    <MyHeader :title="'用户订单'"></MyHeader>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader/index";

export default {
  name: "userOrder",
  data(){
    return {
      
    }
  },
  components: {
    MyHeader
  },
}
</script>

<style scoped>

</style>
