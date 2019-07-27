<template>
  <div>
    <mt-header fixed title="P.L.M.H">
      <div slot="left">
        <mt-button v-link="'/'" icon="back">返回</mt-button>
      </div>
      <div slot="right">
        <mt-button @click="handleClose">关闭</mt-button>
      </div>
    </mt-header>

    <mt-tabbar v-model="selected">
      <mt-tab-item id="tab1">
        <img slot="icon" src="../../assets/list.svg" />
        抢单
      </mt-tab-item>
      <mt-tab-item id="tab2">
        <img slot="icon" src="../../assets/car.svg" />
        停取
      </mt-tab-item>
      <mt-tab-item id="tab3">
        <img slot="icon" src="../../assets/history.svg" />
        历史
      </mt-tab-item>
      <mt-tab-item id="tab4">
        <img slot="icon" src="../../assets/person.svg" />
        个人
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "ExampleComponent",
  data() {
    return {
      selected: ""
    };
  },
  methods:{
    handleClose(){
      
    }
  }
};
</script>
