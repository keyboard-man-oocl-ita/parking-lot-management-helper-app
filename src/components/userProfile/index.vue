<template>
  <div>
    <MyHeader :title="'用户信息'"></MyHeader>
    <div class="logo">
      <el-image style="width: 100px; height: 100px" :src="url"></el-image>
    </div>
    <mt-field label="名称" readonly :value="`${userProfile.userName}`" disableClear></mt-field>
    <mt-field label="车牌号" readonly :value="`${userProfile.carLicense}`" disableClear></mt-field>
    <mt-field label="手机号" type="tel" readonly :value="`${userProfile.phoneNumber}`" disableClear></mt-field>
    <el-button
          type="primary"
          style="width:100%;margin-top:20px;margin-bottom:30px;"
          @click.native.prevent="handleUpdate"
          size="small"
        >更新信息</el-button>
  </div>
</template>

<script>
import axios from "axios"
import MyHeader from "@/components/MyHeader/index";

export default {
  name: "personal",
  created(){
    this.fetchData()
  },
  data(){
    return {
      url: require("@/assets/profile.svg"),
      userProfile: ''
    }
  },
  components: {
    MyHeader
  },
  methods:{
    handleUpdate(){

    },
    fetchData(){
      var self = this
      axios.get("https://www.easy-mock.com/mock/5d3f954630a01f68880d074a/profile").then((res) => {
        self.userProfile = res.data
      })
    }
  }
};
</script>

<style scoped>
.logo {
  margin: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>