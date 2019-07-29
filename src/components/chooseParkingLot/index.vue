<template>
    <div>
        <MyHeader :title="'选择停车场'"></MyHeader>
        <mt-cell v-for="parkingLot in parkingLots" :key="parkingLot.parkingLotId" :title="parkingLot.name"
                 :label="`剩余空位：${parkingLot.residualPosition}`">
            <img slot="icon" src="@/assets/parkingLot-icon.svg" width="24" height="24" />
            <input type="radio" name="parkingLotRadio" :value="parkingLot" v-model="selectedParkingLot">
        </mt-cell>
        <mt-button type="primary" size="large" @click="confirmPark" :disabled="notSelected">确定停车</mt-button>
    </div>
</template>

<script>
    import MyHeader from '@/components/MyHeader/index'
    import { Toast } from 'mint-ui';
    import { getParkingLotsByParkingBoyId } from '@/api/chooseParkingLot'

    export default {
        name: "index.vue",
        components: {
            MyHeader
        },
        created: function () {

            // eslint-disable-next-line no-console
                getParkingLotsByParkingBoyId(this.parkingboyId).then((res)=>{
                    this.parkingLots = res.data
                }).catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err.message)
                });

        },
        data() {
            return {
                selectedParkingLot: ``,
                parkingboyId: 1,
                parkingLots: [],
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