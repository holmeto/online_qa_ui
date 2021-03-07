<template>
    <div class="login-container" style>
        <!-- <el-image
            style="width: 100px; height: 100px"
            :src="imgSrc"
            :fit="fit">
        </el-image> -->
        <el-form :model="loginForm" :rules="rules"
        status-icon
        ref="loginForm" 
        label-position="left" 
        label-width="0px" 
        class="demo-ruleForm login-page">
        <h2 class="title" style="text-align:center;">在线答疑系统登录</h2>
        <el-form-item prop="username">
            <el-input type="text" 
                v-model="loginForm.username"
                auto-complete="off" 
                placeholder="用户名"
            ></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" 
                v-model="loginForm.password"
                auto-complete="off" 
                placeholder="密码"
            ></el-input>
        </el-form-item>
        <el-form-item>
            <!-- <el-radio-group v-model="radio">
                <el-radio :label="3">学生登录</el-radio>
                <el-radio :label="6">老师登录</el-radio>
            </el-radio-group> -->
            <el-radio v-model="loginForm.role" :label=1>学生登录</el-radio>
            <el-radio v-model="loginForm.role" :label=2>老师登录</el-radio>
            <span style="color:	#7B68EE" @click="registerAccount">没有账号？注册</span>
        </el-form-item>
        <el-checkbox 
            v-model="checked"
            class="rememberme"
        >记住密码</el-checkbox>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click="login" :loading="logining">登录</el-button>
        </el-form-item>
    </el-form>
       
    </div>
</template>


<script>
import Bg from "./bg.vue"
export default {
    data(){
        return {
            // leftBg: {
            //   background: "#235d8b url(" + require("../assets/images/bg2.jpeg") + ") center center no-repeat",
            // },
            imgSrc: require('../assets/images/bg2.jpeg'),
            fit: 'fill',
            logining: false,                      //设置登录按钮状态
            loginForm: {
                username: '',
                password: '',
                role: 1
            },
            rules: {
                username: [{required: true, message: '请输入用户名', trigger: 'blur'}],   //登录时验证用户名密码是否为空
                password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                role: [{required: true, message: '请选择角色', trigger: 'blur'}]
            },
            checked: false                        //设置是否记住密码初始状态
        }
    },
    components:{
		Bg
	},
    methods: {
        registerAccount() {
            this.$router.push({ path: "/register" });
        },
        login(event) {
            this.$refs.loginForm.validate((valid) => {
                if(valid){
                    let postData = JSON.stringify({
                        "userName": this.loginForm.username,
                        "password": this.loginForm.password,
                        "role": this.loginForm.role
                    });
                    this.axios.defaults.headers.post['Content-Type'] = 'application/json';
                    this.axios({
                        method: 'post',
                        url: '/login',
                        data: postData
                    }).then(response => {
                        this.$message({
                            type: 'success',
                            message: '登录成功!欢迎' + response.data.data.userName
                        });
                        //登录成功后跳转到指定页面
                        this.$router.push("/question_view");
                        console.log(response);
                        localStorage.setItem("userId", response.data.data.id);
                        localStorage.setItem("userName", response.data.data.nickName);
                        localStorage.setItem("coinCount", response.data.data.coinCount);
                        console.log(localStorage.getItem("userName"));
                        console.log(localStorage.getItem("userId"));
                    }).catch(error => {
                        this.$message({
                            type: 'success',
                            message: '登录失败!'
                        });
                        console.log(error);
                    });
                }
            });
        }
    }
};
</script>

<style scoped>
.login-container {
    padding: 0;
    margin: 0;
    width: 100%;
    left: -0.1%;
    height: 100%;
    position: fixed;
    background-image: url("../assets/images/bg2.jpeg");
}
.login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
}
</style>