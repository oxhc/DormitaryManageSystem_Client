<template>
  <div class="main">

    <el-row id="top">
      <el-col :xs="{span:24}" :sm="{span:16, offset:4}">
        <div class="topbar">
          <div>学生报修系统</div>
          <div>
            <el-dropdown @command="handleCommand" trigger="click">
              <span style="color: white;" class="el-dropdown-link">
                {{studentData.name}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu  slot="dropdown">
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="{span:24}" :sm="{span:16, offset:4}" id="dataGroup">

        <el-collapse v-model="activeName">
          <el-collapse-item name="1">
            <template slot="title">

              <div class="cotitle"><i class="el-icon-edit"></i>提交报修</div>

            </template>
            <div id="isGroup">
              <div class="hidden-xs-only" id="infoGroup">
                <div>
                  个人信息
                </div>
                <div>
                  学号: {{studentData.studentNo}} <br>
                  姓名: {{studentData.name}} <br>

                </div>
              </div>
              <div id="sumitGroup">
                <div>
                  提交报修
                </div>
                <el-input maxlength="60"
  show-word-limit type="textarea" :rows="4" placeholder="请输入内容" v-model="textarea">
                </el-input>
                <div style="text-align: right;">
                  <el-button @click="submit" style="margin-top: 4px;" type="success" size="mini">提交</el-button>
                </div>

              </div>
            </div>


          </el-collapse-item>
          <el-collapse-item name="2">
            <template slot="title">

              <div class="cotitle"><i class="el-icon-document-copy"></i>查看报修</div>

            </template>
            <el-table :data="repairForm" style="width: 100%;">
              <el-table-column width="100px" prop="createDate" label="创建时间">

              </el-table-column>
              <el-table-column prop="note" label="备注">

              </el-table-column>
              <el-table-column prop="status" label="状态">

              </el-table-column>


              <el-table-column width="100px" label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" :disabled="scope.row.status!='待处理'" :type="scope.row.status=='待处理'?'success':'info'" @click="cancel(scope.$index, scope.row)">取消</el-button>
                </template>
              </el-table-column>

            </el-table>
          </el-collapse-item>

        </el-collapse>



      </el-col>
    </el-row>
  </div>

</template>

<script>
  import 'element-ui/lib/theme-chalk/display.css';
  export default {
    data() {
      return {
        repairForm: [{
          createDate: '2018-05-21',
          note: 'note',
          status: 'status'
        }],
        activeName: ['1', '2'],
        textarea: '',
        page: '1',
        limit: '10',
        studentData: {
          bedNo: 1,
          dormNo: "",
          name: "",
          password: "",
          studentNo: ""
        },
      }
    },
    methods: {
      refresh() {
        var _this = this
        this.$http.get('student/login').then(response => {
          console.log(response.data)
          if (response.data.result == "false") {
            this.$message.error("未登录")
            setTimeout(() => {
              this.$router.push('/stuLogin')
            }, 1000)
            return
          }
          console.log(response.data.data)
          this.studentData = response.data.data
        })
        this.$http
          .get('repair/student')
          .then(function(response) {
            _this.repairForm = response.data.data;
            _this.page_count = parseInt(response.data.total_count / _this.limit) + 1;
            console.log(_this.page_count)
          })
      },
      handleCommand(command) {
        if (command == 'logout') {
          this.$http.get('student/logout').then(res => {
            if (res.data) {
              this.$message.success("退出成功")
              setTimeout(()=>{
                this.$router.push('/stuLogin')
              },1000)
            }
          })
        }
      },
      cancel(index, row) {
          this.$http.put('repair/student', this.Qs.stringify({rno: row.rno}))
          .then((res) => {
            if(res.data.result == "true") {
              this.$message.success("取消成功")
              this.refresh()
            }
          })
      }
      ,submit() {
        if(this.textarea.length <= 3) {
          this.$message.error("报修信息过短")
        } else {
          this.$http.post('/repair/student', this.Qs.stringify({
            note: this.textarea
          }))
          .then(response => {
            if(response.data.result == "true") {
              this.$message.success("报修成功")
              setTimeout(()=>{
                this.refresh()
              }, 1000)
            }
          })
        }
      }
    },
    created() {
      this.refresh()
    }
  }
</script>

<style>
  #top {
    background-color: #01B487;
    color: white;
    height: 50px;
    line-height: 50px;
    padding-left: 5px;
  }

  .cotitle {
    padding: 5px;
    font-size: 15px;
  }

  #isGroup {
    display: flex;
    padding: 8px;
  }

  #sumitGroup {
    flex-grow: 1;
  }

  .el-collapse-item__wrap {
    border-bottom: none;
  }

  #infoGroup {
    width: 170px;
  }

  .topbar {
    display: flex;
    justify-content: space-between;
  }
</style>
