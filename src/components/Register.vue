<template>
  <div class="firstdemo">
      <el-form ref="form" :model="form" label-width="80px">
          <el-row type="flex" justify="center">
            <el-form-item style="width: 400px">
            <p align="center" style="position:relative; left:-20px; top:20px"><font color="#000080" size="6">注册新账号</font></p>
            </el-form-item>
          </el-row>
          <el-row type="flex" justify="center">
            <el-form-item label="用户名：" prop="name" style="width: 400px">
                <el-input v-model="form.userName" size="small"></el-input>
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
            <el-form-item>
                <el-radio v-model="form.sex" :label=1>男</el-radio>
                <el-radio v-model="form.sex" :label=2>女</el-radio>
            </el-form-item>
          </el-row>
           <el-row type="flex" justify="center">
            <el-form-item>
                <el-radio v-model="form.role" :label=1>学生</el-radio>
                <el-radio v-model="form.role" :label=2>老师</el-radio>
            </el-form-item>
          </el-row>
          <el-row type="flex" justify="center">
                <el-form-item>
                    <el-button type="success" @click="register">注册</el-button>
                </el-form-item>
          </el-row>
      </el-form>
         
  </div>
</template>
 
 
<!--数据存贮交互，事件控制地区-->
<script>
export default {
  name: 'firstdemo',
  data () {
    return {
        form:{
            name:'',
            password:'',
            role: 1,
            sex: 1
        },
      
    }
  },
  methods:{
      /*提交进行判断的函数 */
      submit:function(){
          if(this.form.name==="张三"&&this.form.password==="123456")
          alert("登陆成功")
          else
          alert("账号或密码错误")
      },
      register:function(){},
  },
}
</script>
 
<!-- 写样式的地方 -->
<style scoped>
 
</style>