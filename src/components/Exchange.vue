<template>
    <div class="bbb">
        <h1 style="
        text-align:center
        background: #2B6695;
        border-radius: 6px 6px 6px 6px;
        color: #FFA500;
        font-family:Arial;
        font-size: 40px;
        font-weight: bold;
        height: 25px;
        line-height: 25px;
        margin: 18px 0 !important;
        text-shadow: 2px 2px 3px #DB7093;
        ">积分兑换中心</h1>
        <el-button plain class="el-icon-back" type="success" @click="returnPage" style="position:relative;left:0px; top: -80px;">返回</el-button>
        <el-row class="demo-avatar demo-basic" style = "position:relative; top: -90px;float: right;">
            <el-col :span="30">
            <div class="sub-title">{{ "欢迎，" + userName }}</div>
            <div class="sub-title">{{ "积分余额:" + coinCount }}</div>
            <div class="demo-basic--circle">
                <div>
                </div>
                <div class="block">
                <el-avatar :size="50" :src="circleUrl">
                </el-avatar>
                </div>
            </div>
            </el-col>  
        </el-row>
        <el-carousel height="150px">
            <el-carousel-item v-for="item in coinRankList" :key="item">
                <h3 class="large" style="text-align:center">{{ item.nickName + "， 积分： " + item.coinCount }}</h3>
            </el-carousel-item>
        </el-carousel>
        <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleAllChange">全选</el-checkbox> -->
        <div style="margin: 15px 0;"></div>
        <el-form v-model="checkedGoods" class="aaa" text-color="#FFD700">
            <el-checkbox v-for="good in goods" :label="good.name" :key="good.id" @change="handleClick(good.id)" :checked="good.checked">
                <span style="width:150px;display:inline-block">商品名称： {{good.name}}</span>
                <span style="width:150px;display:inline-block;">
                <img style="height:80px; width:80px" :src="good.image"/></span>
                <span style="width:150px;display:inline-block;margin-left:10px;margin-right:100px">商品所需积分： {{good.price}} </span>
                <span> 商品数量：<el-input-number v-model="good.num" @change="handleChangeNum(good.id)" :min="0" label="描述文字" size="small"></el-input-number></span>
                <span style="width:150px;display:inline-block;margin-left:100px;margin-right:100px">小计： {{good.OnePrice}} </span>
            </el-checkbox>
        </el-form>
        <div style="margin-top:40px;margin-left:450px;text-align:left">
            <span style="margin-right:20px;display:inline-block">所需积分总计：{{allPrice}}</span>
            <el-button type="primary" size="small" @click="submitBtn">去结算<i class="el-icon-upload el-icon--right"></i></el-button>
        </div>

        <div style="margin-top:50px">
            <h2 style="text-align:center">积分兑换记录</h2>
            <el-timeline v-for="(record, index) in records" :key="index">
                <el-timeline-item :timestamp="record.createTime" placement="top">
                    <el-card>
                        <h4>{{ record.exchangeDetail }}</h4>
                        <p><strong color="green">{{ record.submitPersonName }}</strong> 兑换于{{ record.createTime }}</p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            circleUrl: require("../assets/images/avatar.png"),
            userName: '',
            coinCount: 0,
            records: [],
            goods: [
                {
                    id: 10,
                    name: "洗衣液",
                    price: 100,
                    checked: true,
                    num: 0,
                    image: require("../assets/images/xiyiye.jpeg")
                },
                {
                    id: 11,
                    name: "三体书",
                    price: 1000,
                    checked: false,
                    num: 0,
                    image: require("../assets/images/santi.jpeg")
                },
                {
                    id: 12,
                    name: "aj",
                    price: 15000,
                    checked: false,
                    num: 0,
                    image: require("../assets/images/aj.jpeg")
                },
                {
                    id: 13,
                    name: "ipad",
                    price: 30000,
                    checked: false,
                    num: 0,
                    image: require("../assets/images/ipad.jpeg")
                }
            ],
            isIndeterminate: true,
            checkedGoods: [],
            allPrice: 0,
            coinRankList: []
        };
    },
    created() {
        this.userName = localStorage.getItem("userName");
        this.coinCount = localStorage.getItem("coinCount");
        this.getExchangeInfo();
        this.getCoinRankList();
    },
    methods: {
        returnPage() {
            this.$router.push({ path: "/question_view" });
        },
        // handleAllChange(val) {
        //     console.log(val, "555");
        //     this.checkedGoods = val ? goodOptions : [];
        //     this.isIndeterminate = false;
        //     if (val) {
        //         this.getAllPrice();
        //     } else {
        //         this.allPrice = 0;
        //     }
        // },
        // handleOneChange(value) {
        //     let a = 0;
        //     let checkedCount = value.length;
        //     // this.checkAll = checkedCount === this.checkedGoods.length;
        //     this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkedGoods.length;
        //     value.filter((it, id) => {
        //         if (it == this.goods[id].name) {
        //             if (this.goods[id].OnePrice) {
        //                 a += this.goods[id].OnePrice;
        //             }
        //         }
        //     });
        //     this.allPrice = a;
        // },
        handleChangeNum(val) {
            this.goods.filter((it, id) => {
                if (it.id == val) {
                    it.OnePrice = it.num * it.price;
                     it.checked = true;
                    if (it.num !== 0) {
                        it.checked = true;
                    } else {
                        it.checked = false;
                    }
                }
            });
            this.getAllPrice();
        },
        getUserInfo() {
            let postData = JSON.stringify({
                "id": localStorage.getItem("userId"),
            });
            this.axios({
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'post',
                url:'/getUserInfo',
                data:postData
            }).then(response =>
            {  
                localStorage.setItem("coinCount", response.data.data.coinCount);
                this.coinCount = response.data.data.coinCount;
            }).catch(error =>
            {
            console.log(error);
            });
        },
        getExchangeInfo() {
            let postData = JSON.stringify({
                "id": localStorage.getItem("userId"),
            });
            this.axios({
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'post',
                url:'/point/getCoinExchangeInfoList',
                data:postData
            }).then(response =>
            {  
                this.records = response.data.data;
            }).catch(error =>
            {
            console.log(error);
            });
        },
        getCoinRankList() {
            this.axios({
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'post',
                url:'/getCoinRankList',
                data: null
            }).then(response =>
            {  
                this.coinRankList = response.data.data;
            }).catch(error =>
            {
            console.log(error);
            });
        },
        getAllPrice() {
            //获取总价方法封装
            let money = 0;
            this.goods.filter((it, id) => {
                if (it.OnePrice) {
                    money += it.OnePrice;
                }
            });
            this.allPrice = money;
        },
        submitBtn() {
            if (this.allPrice === 0) {
                this.$message('请选择要兑换的商品');
                return;
            }
            if (this.coinCount < this.allPrice) {
                this.$message('积分不足');
                return;
            }
            var detail = "兑换了";
            var number = 0;
            this.goods.filter((it, id) => {
                if (it.num > 0) {
                    if (number === 0) {
                      detail += it.num + "个" + it.name;
                    } else {
                      detail += "、" + it.num + "个" + it.name;
                    }
                }
            });
            let postData = JSON.stringify({
                "needCoin": this.allPrice,
                "exchangeDetail": detail,
                "submitPersonName": localStorage.getItem("userName"),
                "submitPersonId": localStorage.getItem("userId")
            });
            this.axios({
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'post',
                url:'point/addCoinExchangeInfo',
                data:postData
            }).then(response =>
            {   
                this.$message({
                    type: 'success',
                    message: '兑换成功!'
                });
                this.getUserInfo();
                this.getExchangeInfo();
                console.log(response);
            }).catch(error =>
            {
                console.log(error);
            });
        }
    }
};
</script>
<style lang="postcss" scoped>
.el-carousel__item h3 {
    color: #fa0f07;
    font-size: 30px;
    opacity: 0.5;
    line-height: 150px;
    background-image: url("../assets/images/book.jpg");
    margin: 0;
}

.bbb {
    margin-left: 40px;
    margin-top: 80px;
}
.aaa > label {
    display: block;
    text-align: left;
    margin-top: 20px;
}
.el-checkbox {
    display: block;
    text-align: left;
}
</style>