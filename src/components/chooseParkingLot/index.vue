<template>
    <div>
        <MyHeader :title="'选择停车场'"></MyHeader>
        <mt-cell v-for="parkingLot in parkingLots" :key="parkingLot.parkingLotId" :title="parkingLot.name"
                 :label="`剩余空位：${parkingLot.residualPosition}`">
            <img slot="icon" src="@/assets/parkingLot-icon.svg" width="24" height="24" />
            <input :disabled="parkingLot.residualPosition === 0" type="radio" name="parkingLotRadio" :value="parkingLot" v-model="selectedParkingLot">
        </mt-cell>
        <mt-button type="primary" size="large" @click="confirmPark" :disabled="notSelected">确定停车</mt-button>
    </div>
</template>

<script>
    import MyHeader from '@/components/MyHeader/index'
    import { Toast } from 'mint-ui';
    import { getParkingLotsByParkingBoyId, updateOrdersParkingLotAndStatus } from '@/api/chooseParkingLot'
    import {mapState} from 'vuex'

    export default {
        name: "index.vue",
        components: {
            MyHeader
        },
        mounted: function () {
            this.loadParkingLot();
        },
        data() {
            return {
                selectedParkingLot: ``,
                parkingLots: [],
            }
        },
        computed: {
            ...mapState({
                parkingBoyId: state => state.parkingBoyId,
                operatedOrder: state => state.operatedOrder,
            }),
            notSelected() {
                return this.selectedParkingLot === `` ? true : false;
            }
        },
        methods: {
            confirmPark() {
                this.operatedOrder.parkingLotId = this.selectedParkingLot.parkingLotId;
                delete this.operatedOrder.parkingLotName;
                updateOrdersParkingLotAndStatus(this.operatedOrder).then(() => {
                    this.$store.dispatch('getOrderList');
                    this.loadParkingLot();
                    Toast({
                        message: `已停车至${this.selectedParkingLot.name}`,
                        iconClass: "el-icon-circle-check"
                    });
                }).catch(error => {
                    // eslint-disable-next-line no-console
                    console.log(error)
                })
                this.$router.push('/parkAndFetch');
            },
            loadParkingLot() {
                getParkingLotsByParkingBoyId(this.parkingBoyId).then((res)=>{
                    this.parkingLots = res.data
                    this.$store.dispatch('getOrderList');
                    // eslint-disable-next-line no-console
                    console.log("load Parking Lot Success")
                }).catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err.message)
                });
            }
        }
    }
</script>

<style scoped>

</style>