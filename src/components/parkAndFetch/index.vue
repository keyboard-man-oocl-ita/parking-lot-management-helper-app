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

    const FINISHED = 3;
    const PARKED = 2;
    const RECEIPTED = 1;
    const SNATCHING = 0;
    export default {
        name: "parkAndFetch",
        components: {
            MyHeader
        },
        computed:mapState({

            orders : state => state.clerkOrderList

        }),
        data() {
            return {

            };
        },
        methods: {
            getStatus(row, column, cellValue) {

                if (cellValue === SNATCHING) {
                    return '抢单中'
                } else if (cellValue === RECEIPTED) {
                    return '已接单'
                } else if (cellValue === PARKED) {
                    return '已停车'
                } else if (cellValue === FINISHED) {
                    return '已完成'
                }


            }
        },
        mounted() {
            this.$store.dispatch('getOrderList')
        }
    };
</script>

<style scoped>
</style>