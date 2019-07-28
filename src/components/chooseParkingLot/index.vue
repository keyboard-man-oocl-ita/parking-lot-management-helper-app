<template>
    <div>
        <Header :title="'选择停车场'"></Header>
        <mt-cell v-for="(parkingLot,index) in parkingLots" :key="index" :title="parkingLot.name" to="/chooseParkingLot" is-link :label="`剩余空位：${parkingLot.remaining}`">
            <span>选择</span>
            <img slot="icon" src="../../assets/parkingLot-icon.svg" width="24" height="24" />
        </mt-cell>
    </div>
</template>

<script>
    import Header from '../header/index'
    export default {
        name: "index.vue",
        components: {
            Header
        },
        data() {
            return {
                remaining: 10,
                parkingLots: [{
                    name: '停车场一号',
                    remaining: 10
                },{
                    name: '停车场二号',
                    remaining: 9
                },{
                    name: '停车场三号',
                    remaining: 5
                },{
                    name: '停车场四号',
                    remaining: 2
                },]
            }
        }
    }
</script>

<style scoped>

</style>