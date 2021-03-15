<template>
  <div class="login-container">
    <el-form :model="form" :rules="rules"
        status-icon
        ref="form" 
        label-position="left" 
        label-width="0px" 
        class="demo-ruleForm login-page">
        <h2 class="title" style="text-align:center;">在线答疑系统注册</h2>
        <el-form-item prop="name">
            <el-input type="text" 
                v-model="form.name"
                auto-complete="off" 
                placeholder="用户名"
            ></el-input>
        </el-form-item>
        <el-form-item prop="nickName">
            <el-input type="text" 
                v-model="form.nickName"
                auto-complete="off" 
                placeholder="昵称"
            ></el-input>
        </el-form-item>
         <el-form-item prop="password">
            <el-input type="password" 
                v-model="form.password"
                auto-complete="off" 
                placeholder="密码"
            ></el-input>
        </el-form-item>
        <el-form-item prop="email">
            <el-input type="text" 
                v-model="form.email"
                auto-complete="off" 
                placeholder="邮箱"
            ></el-input>
        </el-form-item>
         <el-form-item>
            <!-- <el-radio-group v-model="radio">
                <el-radio :label="3">学生登录</el-radio>
                <el-radio :label="6">老师登录</el-radio>
            </el-radio-group> -->
            <el-radio v-model="form.sex" :label=1>男</el-radio>
            <el-radio v-model="form.sex" :label=2>女</el-radio>
        </el-form-item>
        <el-form-item>
            <!-- <el-radio-group v-model="radio">
                <el-radio :label="3">学生登录</el-radio>
                <el-radio :label="6">老师登录</el-radio>
            </el-radio-group> -->
            <el-radio v-model="form.role" :label=1>学生</el-radio>
            <el-radio v-model="form.role" :label=2>老师</el-radio>
            <span style="color:	#7B68EE" @click="login">已有账号？登录</span>
        </el-form-item>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click="register" :loading="logining">注册</el-button>
        </el-form-item>

      <!-- <el-form ref="form" :model="form" label-width="80px">
          <el-row type="flex" justify="center">
            <el-form-item style="width: 400px">
            <p align="center" style="position:relative; left:-20px; top:20px"><font color="#000080" size="6">注册新账号</font></p>
            </el-form-item>
          </el-row> -->
          <!-- <el-row type="flex" justify="center">
            <el-form-item label="用户名：" prop="name" style="width: 400px">
                <el-input v-model="form.name" size="small"></el-input>
            </el-form-item>
          </el-row>
          <el-row type="flex" justify="center">
            <el-form-item label="昵称：" prop="password" style="width: 400px">
                <el-input v-model="form.nickName" size="small"></el-input>
            </el-form-item>
          </el-row>
          <el-row type="flex" justify="center">
            <el-form-item label="密码：" prop="name" style="width: 400px">
                <el-input v-model="form.password" size="small"></el-input>
            </el-form-item>
          </el-row>
          <el-row type="flex" justify="center">
            <el-form-item label="邮箱：" prop="name" style="width: 400px">
                <el-input v-model="form.email" size="small"></el-input>
            </el-form-item>
          </el-row>
          <el-row type="flex" justify="center">
            <el-form-item label="性别：" style="width: 400px">
                <el-radio v-model="form.sex" :label=1>男</el-radio>
                <el-radio v-model="form.sex" :label=2>女</el-radio>
            </el-form-item>
          </el-row>
          <el-row type="flex" justify="center">
            <el-form-item label="身份：" style="width: 400px">
                <el-radio v-model="form.role" :label=1>学生</el-radio>
                <el-radio v-model="form.role" :label=2>老师</el-radio>
            </el-form-item>
          </el-row>
          <el-row type="flex" justify="center">
                <el-form-item>
                    <el-button type="success" @click="register"> 注册 </el-button>
                    <span style="color:#7B68EE" @click="login">已有账号？登录</span>
                </el-form-item>
          </el-row> -->
      </el-form>
         
  </div>
</template>
 
 
<!--数据存贮交互，事件控制地区-->
<script>
export default {
  name: 'firstdemo',
  data () {
    return {
        imgSrc: require('../assets/images/bg2.jpeg'),
        form:{
            name:'',
            nickName: '',
            password:'',
            email: '',
            role: 1,
            sex: 1
        },
      
    }
  },
  methods:{
      /*提交进行判断的函数 */
      submit(){
          if(this.form.name==="张三"&&this.form.password==="123456")
          alert("登陆成功")
          else
          alert("账号或密码错误")
      },
      register() {
          let postData = JSON.stringify({
              "name": this.form.name,
              "nickName": this.form.nickName,
              "password": this.form.password,
              "email": this.form.email,
              "role": this.form.role,
              "sex": this.form.sex
          });
          this.axios({
              headers: {
                  'Content-Type': 'application/json'
              },
              method: 'post',
              url:'/register',
              data:postData
          }).then(response =>
          {   
            this.$message({
                type: 'success',
                message: '注册成功!'
            });
            this.login();
          }).catch(error =>
          {
              console.log(error);
          });
      },
      login(){
          this.$router.push({
            path: "/"
          });
      },
  },
}
</script>
 
<!-- 写样式的地方 -->
<style scoped>
 .login-container {
    padding: 0;
    margin: 0;
    width: 100%;
    left: -0.1%;
    height: 100%;
    position: fixed;
    background-image: url("../assets/images/book.jpg");
    background-repeat:no-repeat;
    background-size:100% 100%;
}
.login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 100px auto;
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