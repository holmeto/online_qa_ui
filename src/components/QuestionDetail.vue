<template>
    <div class="login-container" style="margin-top:20px;">
        <el-button plain class="el-icon-back" type="success" @click="returnPage" style="position:relative;left:80px; top: -10px;">返回列表页面</el-button>
        <el-row class="demo-avatar demo-basic" style = "float: right;">
            <el-col :span="30">
            <div class="sub-title">{{ "欢迎，" + userName }}</div>
            <div class="sub-title">{{ "积分:" + coinCount }}</div>
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
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="问题标题" style="width: 700px">
                <el-input v-model="form.questionName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="问题描述" style="position: relative; width: 900px; top: -30px">
                <el-input 
                v-model="form.questionContent" 
                type="textarea"
                :rows="5"
                :disabled="true"
                ></el-input>
            </el-form-item>
            <el-form-item label="问题分类">
                <el-checkbox-group :disabled="true">
                <el-checkbox :label="form.questionType" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item label="回答">
                <el-input type="textarea" v-model="form.answerContent"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-form-item>
        </el-form>

        <el-timeline v-for="(answer, index) in answers" :key="index">
            <el-timeline-item :timestamp="answer.createTime" placement="top">
                <el-card>
                    <h4>{{ answer.answerContent }}</h4>
                    <p><strong color="green">{{ answer.submitPersonName }}</strong> 提交于{{ answer.createTime }}</p>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        circleUrl: require("../assets/images/avatar.png"),
        userName: '',
        coinCount: 0,
        form: {
          questionId: null,
          questionName: '',
          questionContent: '',
          questionType: '',
          answerContent: ''
        },
        answers: [{answerContent: "sdsdfsfs"}],
        answer: null,
        rules: {
            answerContent: [
                { required: true, message: '请输入回复', trigger: 'blur' },
                { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
            ]
        },
      }
    },
    created() {
        this.questionId = this.$route.query.questionId;
        this.userName = localStorage.getItem("userName");
        this.coinCount = localStorage.getItem("coinCount");
        /*this.axios.get('static/user.json').then(response =>
        {
            this.tableData = response.data.tableData;
            this.total = response.data.tableData.length;
            // console.log(JSON.parse(JSON.stringify(response.data))['tableData'])
        });*/
        this.getTableList();
    },
    methods: {
        returnPage() {
            this.$router.push({ path: "/question_view" });
        },
        getTableList() {
            let postData = JSON.stringify({
                "questionId": this.questionId,
            });
            this.axios({
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            url:'/answer/getQuestionAndAnswer',
            data:postData
            })
            .then(response =>
            {
                this.form = response.data.data.question;
                this.answers = response.data.data.answerList;
                console.log(this.answers);
                // this.total = response.data.data.total;
                this.$message({
                    type: 'success',
                    message: '查询问题及回复成功!'
                });
            }).catch(error =>
            {
                console.log(error);
            });
        },
        onSubmit() {
            console.log('submit!');
            let postData = JSON.stringify({
                "answerContent": this.form.answerContent,
                "questionId": this.questionId,
                "submitPersonId": localStorage.getItem("userId"),
                "submitPersonName": localStorage.getItem("userName")
            });
            this.axios({
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'post',
                url:'/answer/addAnswer',
                data:postData
            }).then(response =>
            {   
                this.getTableList();
            }).catch(error =>
            {
                console.log(error);
            });
        }
    }
  }
</script>