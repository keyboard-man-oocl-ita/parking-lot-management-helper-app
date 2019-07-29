<template>
    <div>
        <MyHeader :title="'正在进行的订单'"></MyHeader>
        <el-table :data="orders" stripe style="width: 100%" size="small">
            <el-table-column prop="orderId" label="订单号" width="80"></el-table-column>
            <el-table-column prop="carLicense" label="车牌号" width="80"></el-table-column>
            <el-table-column prop="parkinglot" label="停车场"></el-table-column>
            <el-table-column prop="status" :formatter="getStatus" label="状态"></el-table-column>
        </el-table>

    </div>
</template>

<script>
    import MyHeader from '@/components/MyHeader/index';
    import {mapState} from 'vuex'

    export default {
        name: "parkAndFetch",
        components: {
            MyHeader
        },
        computed: {
            ...mapState({
                orders: state => state.clerkOrderList,
                parkingBoyId: state => state.parkingBoyId
            })
        },
        data() {
            return {};
        },
        mounted() {
            this.$store.dispatch('getOrderList', this.parkingBoyId)
        }
    };
</script>

<style scoped>
</style>