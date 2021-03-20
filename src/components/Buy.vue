<template>
    <div class="bbb">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedGoods" @change="handleOneChange" class="aaa">
            <el-checkbox v-for="good in goods" :label="good.name" :key="good.id">
                <span style="width:150px;display:inline-block">商品名称： {{good.name}}</span>
                <span style="width:150px;display:inline-block;margin-left:100px;margin-right:100px">商品价格： {{good.price}} 元</span>
                <span> 商品数量：<el-input-number v-model="good.num" @change="handleChangeNum(good.id)" label="描述文字" size="small"></el-input-number></span>
                <span style="width:150px;display:inline-block;margin-left:100px;margin-right:100px">小计： {{good.OnePrice}}元</span>
            </el-checkbox>
        </el-checkbox-group>
        <div style="margin-top:40px;margin-left:450px;text-align:left">
            <span style="margin-right:20px;display:inline-block">总价：{{allPrice}}元</span>
            <el-button type="primary" size="small" @click="submitBtn">去结算<i class="el-icon-upload el-icon--right"></i></el-button>
        </div>

    </div>
</template>
<script>
const goodOptions = ["哇哈哈", "辣条", "矿泉水", "西瓜", "苹果"];
export default {
    data() {
        return {
            goods: [
                {
                    id: 10,
                    name: "哇哈哈",
                    price: 32
                },
                {
                    id: 11,
                    name: "辣条",
                    price: 10
                },
                {
                    id: 12,
                    name: "矿泉水",
                    price: 2
                },
                {
                    id: 13,
                    name: "西瓜",
                    price: 88
                },
                {
                    id: 14,
                    name: "苹果",
                    price: 66
                }
            ],
            checkAll: false,
            isIndeterminate: true,
            checkedGoods: [],
            allPrice: 0
        };
    },
    methods: {
        handleAllChange(val) {
            console.log(val, "555");
            this.checkedGoods = val ? goodOptions : [];
            this.isIndeterminate = false;
            if (val) {
                this.getAllPrice();
            } else {
                this.allPrice = 0;
            }
        },
        handleOneChange(value) {
            let a = 0;
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.checkedGoods.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkedGoods.length;
            value.filter((it, id) => {
                if (it == this.goods[id].name) {
                    if (this.goods[id].OnePrice) {
                        a += this.goods[id].OnePrice;
                    }
                }
            });
            this.allPrice = a;
        },
        handleChangeNum(val) {
            this.goods.filter((it, id) => {
                if (it.id == val) {
                    it.OnePrice = it.num * it.price;
                }
            });
            this.getAllPrice();
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
            this.$alert( this.allPrice+"元", "所有商品总计",{
                confirmButtonText: "确定",
                callback: action => {
                    this.$message({
                        type: "info",
                        message: "哈哈哈"
                    });
                }
            });
        }
    }
};
</script>
<style lang="postcss" scoped>
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