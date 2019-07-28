<template>
    <div>
        <Header :title="'选择停车场'"></Header>
        <mt-cell v-for="(parkingLot,index) in parkingLots" :key="index" :title="parkingLot.name" :label="`剩余空位：${parkingLot.remaining}`">
            <img slot="icon" src="../../assets/parkingLot-icon.svg" width="24" height="24" />
            <input type="radio" name="parkingLotRadio" :value="parkingLot" v-model="selectedParkingLot">
        </mt-cell>
        <mt-button type="primary" size="large" @click="confirmPark" :disabled="notSelected">确定停车</mt-button>
    </div>
</template>

<script>
    import Header from '../header/index'
    import { Toast } from 'mint-ui';
    export default {
        name: "index.vue",
        components: {
            Header
        },
        data() {
            return {
                selectedParkingLot: ``,
                remaining: 10,
                parkingLots: [{
                    name: '停车场一号',
                    remaining: 10,
                },{
                    name: '停车场二号',
                    remaining: 9,
                },{
                    name: '停车场三号',
                    remaining: 5,
                },{
                    name: '停车场四号',
                    remaining: 2,
                },]
            }
        },
        computed: {
            notSelected() {
                return this.selectedParkingLot === `` ? true : false;
            }
        },
        methods: {
            confirmPark() {
                Toast({
                    message: `已停车至${this.selectedParkingLot.name}`,
                    iconClass: 'icon icon-success'
                });
                this.$router.push('/parkAndFetch');
            }
        }
    }
</script>

<style scoped>

</style>