<template>
    <div>
        <MyHeader :title="'正在进行中的订单'"></MyHeader>
        <el-table :data="orders" stripe style="width: 100%" size="small">
            <el-table-column prop="orderId" label="订单号" width="80"></el-table-column>
            <el-table-column prop="carLicense" label="车牌号" width="80"></el-table-column>
            <el-table-column prop="userPhoneNumber" label="手机号码" width="80"></el-table-column>
            <el-table-column prop="parkingLotName" label="停车场"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="parkCar(scope.row)" v-if="scope.row.status === '已接单'">停车</el-button>
                    <el-button type="primary" size="mini" @click="fetchCar(scope.row)" v-if="scope.row.status === '请求取车'">取车</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    import MyHeader from '@/components/MyHeader/index';
    import {mapState} from 'vuex'
    import { Toast } from 'mint-ui';
    import { updateOrdersStatus } from '@/api/parkAndFetch';

    const HAVE_PARKED_CAR = 2;
    const HAVE_FETCHED_CAR = 4;

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
            return {
                status: '',
                operatedOrder: {},
                getOrderInterval:''
            };
        },
        mounted() {
            this.$store.dispatch('getOrderList');
            this.getOrderInterval = setInterval(() => {
                this.$store.dispatch('getOrderList');
            }, 3000);
        },
        beforeDestroy(){
            clearInterval(this.getOrderInterval)
        },
        methods: {
            parkCar(order) {
                this.operatedOrder = order;
                this.operatedOrder.status = HAVE_PARKED_CAR;
                this.$store.state.operatedOrder = this.operatedOrder;
                this.$router.push('/chooseParkingLot');
            },
            fetchCar(order) {
                this.operatedOrder = order;
                this.operatedOrder.status = HAVE_FETCHED_CAR;
                this.$store.state.operatedOrder = this.operatedOrder;
                updateOrdersStatus(this.$store.state.operatedOrder).then(() => {
                    this.$store.dispatch('getOrderList');
                    Toast({
                        message: '取车成功',
                        iconClass: "el-icon-circle-check"
                    });
                }).catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err.message)
                });
            }
        }
    };
</script>

<style scoped>
</style>