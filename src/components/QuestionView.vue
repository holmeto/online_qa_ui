<template>
  <div>
      <el-row class="demo-avatar demo-basic" style = "float: right;">
        <el-col :span="30">
          <div class="sub-title">{{ "欢迎，" + userName }}</div>
          <div class="sub-title">{{ "积分:" + coinCount }}</div>
          <div class="demo-basic--circle">
            <div>
              <!-- <span>{{ userName }}</span> -->
              <!-- <span>{{ coinCount }}</span> -->
            </div>
            <div class="block">
              <el-avatar :size="50" :src="circleUrl">
              </el-avatar>
            </div>
          </div>
        </el-col>  
      </el-row>
      <el-form :inline="true" class="demo-form-inline" style="position: relative; top: 30px;">
          <el-form-item>
            <el-input
              v-model="search"
              class="search_name"
              size="mini"
              placeholder="输入问题查询">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="text"
              @click="onSearch()"
              class="el-icon-search">查询
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              class="el-icon-refresh"
              type="text"
              @click="refreshData">刷新
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              class="el-icon-circle-plus-outline"
              type="text"
              @click="dialogVisible = true">添加
            </el-button>
          </el-form-item>
      </el-form>
      <el-table
        :data="tableData"
        highlight-current-row
        border
        style="width: 100%;"
        :row-class-name="tableRowClassName"
        :header-cell-style="{textAlign: 'center'}"
        :cell-style="{ textAlign: 'center' }"
        >
        <el-table-column
          label="编号">
          <template slot-scope="scope">
            <span>{{ scope.$index }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="编号">
          <template slot-scope="scope">
            <span>{{ scope.row.userId }}</span>
          </template>
        </el-table-column> -->
        <el-table-column
          label="问题标题">
          <template slot-scope="scope">
            <i class="el-icon-time hidden-sm-and-down"></i>
            <span>{{ scope.row.questionName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="问题分类">
          <template slot-scope="scope">
            <span>{{ scope.row.questionType }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="提问人">
          <template slot-scope="scope">
            <span>{{ scope.row.submitPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="提问时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="300">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              icon="el-icon-search"
              @click="getQuestionDetail(scope.$index, scope.row)">查看详情
            </el-button>
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
        <el-dialog
          title="添加"
          :append-to-body='true'
          :visible.sync="dialogVisible"
          width="80%"
          :before-close="handleClose">
          <el-input type="hidden" v-model="ruleForm.userId"/>
          <!-- <el-form-item label="时间" prop="userDate">
            <el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.userDate" style="width: 100%;"></el-date-picker>
          </el-form-item> -->
          <el-form-item label="标题" prop="questionName" style="width: 50%">
            <el-input v-model="ruleForm.questionName"></el-input>
          </el-form-item>
          <el-form-item label="问题描述" prop="questionContent">
            <el-input type="textarea" rows="10" v-model="ruleForm.questionContent"></el-input>
          </el-form-item>
          <el-form-item label="问题分类" prop="questionType" style="width: 50%">
            <el-select v-model="ruleForm.questionType" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item>

          <span slot="footer" class="dialog-footer">
            <el-button @click="cancel()" size="medium">取 消</el-button>
            <el-button @click="addQuestion()" type="primary" size="medium">确 定</el-button>
          </span>
        </el-dialog>
      </el-form>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm" size="medium">
      <el-dialog
        title="编辑"
        :append-to-body='true'
        :visible.sync="dialogUpdate"
        width="80%"
        :before-close="handleClose">
        <el-input type="hidden" v-model="ruleForm.userId"/>
        <el-form-item label="时间" prop="userDate">
          <el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.userDate" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="userAddress">
          <el-input v-model="ruleForm.userAddress"></el-input>
        </el-form-item>

        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel()" size="medium">取 消</el-button>
            <el-button @click="updateUser()" type="primary" size="medium">确 定</el-button>
          </span>
      </el-dialog>
    </el-form>
      <br>
      <div class="pages">
        <el-pagination
          background
          :disabled = "disablePage"
          :current-page.sync="currentPage"
          small
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                userName: '',
                coinCount: 0,
                circleUrl: require("../assets/images/avatar.png"),
                options: [{
                  value: '大学物理',
                  label: '大学物理'
                }, {
                  value: '大学化学',
                  label: '大学化学',
                }, {
                  value: '高等数学',
                  label: '高等数学'
                }, {
                  value: '大学英语',
                  label: '大学英语'
                }, {
                  value: '计算机科学',
                  label: '计算机科学'
                }],
                ruleForm: {
                    questionName: '',
                    questionContent: '',
                    questionType: '',
                },
                rules: {
                    questionName: [
                        { required: true, message: '请输入标题', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 7 个字符', trigger: 'blur' }
                    ],
                    questionContent: [
                        { required: true, message: '请输入问题描述', trigger: 'blur' },
                        { min: 5, max: 200, message: '在 5 到 200 个字符之间', trigger: 'blur' }
                    ],
                    questionType: [
                        { required: true, message: '请选择问题分类', trigger: 'blur' }
                    ],
                },
                tableData: [],
                search: '',
                dialogVisible: false,
                dialogUpdate: false,
                pageSize: 10,
                currentPage: 1,
                total: 0,
                disablePage: false
            }
        },
        methods: {
            tableRowClassName({row, rowIndex}) {
              if (rowIndex === 1) {
                return 'warning-row';
              } else if (rowIndex === 3) {
                return 'success-row';
              }
              return '';
            },
            getQuestionDetail(index, row) {
              this.$router.push({
                path: "/question_detail",
                query: {
                  questionId: row.id
                }
              });
            },
            handleEdit(index, row) {
                this.dialogVisible = true;
                this.ruleForm = Object.assign({}, row); //这句是关键！！！
            },
            handleDelete(index, row) {
                console.log(index, row);
                this.$confirm('删除操作, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let postData = this.qs.stringify({
                        userId: row.userId,
                    });
                    this.axios({
                        method: 'post',
                        url:'/delete',
                        data:postData
                    }).then(response =>
                    {
                        this.getPages();
                        this.currentPage = 1;
                        this.axios.post('/page').then(response =>
                        {
                            this.tableData = response.data;
                        }).catch(error =>
                        {
                            console.log(error);
                        });
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        console.log(response);
                    }).catch(error =>
                    {
                        console.log(error);
                    });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            handleCurrentChange() {
                console.log(`当前页: ${this.currentPage}`);
                this.getTableList();
            },
            cancel() {
                this.dialogUpdate = false;
                this.dialogVisible = false;
                this.emptyUserData();
            },
            emptyUserData(){
                this.ruleForm = {
                    userName: '',
                    userDate: '',
                    userAddress: ''
                }
            },
            getTableList() {
              let postData = JSON.stringify({
                  "questionName": this.search,
                  "pageNo": this.currentPage,
                  "pageSize": this.pageSize,
              });
              this.axios({
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'post',
                url:'/question/getQuestionList',
                data:postData
              })
              .then(response =>
              {
                  this.tableData = response.data.data.data;
                  this.total = response.data.data.total;
                  this.$message({
                      type: 'success',
                      message: '查询成功!'
                  });
              }).catch(error =>
              {
                  console.log(error);
              });
            },
            addQuestion() {
                console.log("开始提问");
                console.log(localStorage.getItem("userName"));
                console.log(localStorage.getItem("userId"));
                let postData = JSON.stringify({
                    "questionName": this.ruleForm.questionName,
                    "questionContent": this.ruleForm.questionContent,
                    "questionType": this.ruleForm.questionType,
                    "submitPersonId": localStorage.getItem("userId")
                });
                this.axios({
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'post',
                    url:'/question/addQuestion',
                    data:postData
                }).then(response =>
                {   
                    this.getTableList();
                    this.getPages();
                    this.dialogVisible = false
                    console.log(response);
                }).catch(error =>
                {
                    console.log(error);
                });
            },
            updateUser() {
                let postData = this.qs.stringify({
                    userId: this.ruleForm.userId,
                    userDate: this.ruleForm.userDate,
                    userName: this.ruleForm.userName,
                    userAddress: this.ruleForm.userAddress
                });
                this.axios({
                    method: 'post',
                    url:'/update',
                    data:postData
                }).then(response =>
                {
                    this.handleCurrentChange();
                    this.cancel();
                    this.$message({
                        type: 'success',
                        message: '更新成功!'
                    });
                    console.log(response);
                }).catch(error =>
                {
                    this.$message({
                        type: 'success',
                        message: '更新失败!'
                    });
                    console.log(error);
                });
            },
            onSearch() {
                this.getTableList();
            },
            getPages() {
                // this.axios.post('/rows').then(response =>
                // {
                //     this.total = response.data;
                // }).catch(error =>
                // {
                //     console.log(error);
                // });
            },
            refreshData() {
                location.reload();
            }
        },
        created() {
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
}
</script>
<style scoped>
  .el-table.warning-row {
    background: rgb(253, 233, 196);
  }
  .el-table.success-row {
    background: #cbf0b7;
  }
  .search_name{
    width: 200px;
  }
  .pages{
    margin: 0px;
    padding: 0px;
    text-align: right;
  }
</style>
