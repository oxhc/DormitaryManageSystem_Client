<template>
  <div class="panel">
    <el-form status-icon ref="stuForm" :rules="rules"  :model="stuForm" id="stuForm" label-width="80px">
      <el-form-item prop="studentNo"  label="学号">
        <el-input placeholder="请输入学生学号"  v-model="stuForm.studentNo"></el-input>
      </el-form-item>
      <el-form-item  prop="name" label="姓名">
        <el-input placeholder="请输入学生姓名" v-model="stuForm.name"></el-input>
      </el-form-item>
      <el-form-item label="宿舍楼名">
        <el-input placeholder="请输入楼名"  @change="generateDormNo"  v-model="build"></el-input>
      </el-form-item>
      <el-form-item  label="房间号">
        <el-input placeholder="请输入房间号"  @change="generateDormNo"  v-model="room"></el-input>
      </el-form-item>
      <el-form-item  prop="dormNo" label="宿舍编号">
        <el-input placeholder="请输入宿舍编号"  type="dormNo" v-model="stuForm.dormNo"></el-input>
      </el-form-item>
      <el-form-item prop="bedNo" label="床号">
        <el-input type="number"  v-model="stuForm.bedNo"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" v-model="stuForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="!dormExist && !edit" @click="addSubmit" v-if="!edit" type="primary">添加</el-button>
        <el-button :disabled="!dormExist && !edit" @click="editSubmit" v-if="edit" type="primary">确认修改</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: {
      initstuForm: {
        type: Object,
        default () {
          return {
            dormNo: '',
            name: '',
            bedNo: 1,
            password: '',
            studentNo: '',
          }
        }
      },
      edit: {
        type:Boolean,
        default() {
          return false
        }
      },
    },
    watch: {
      initstuForm(val) {
        if(this.edit) {
          console.log(val)
          this.stuForm = val
        }
      }
    },
    data() {
      var validateSudentNo = (rule, value, callback) => {
        if(!value) {
          return callback(new Error('年龄不能为空'))
        }
        if(!/^[0-9]{11}$/.test(value)) {
          return callback(new Error('格式为11位数字'))
        }
        this.$http.get('existStudent?studentNo='+value)
        .then(res => {
          if(!res.data) {
            callback()
          } else {
            callback(new Error('学号已存在'))
          }
        })
      }
      var validateStudentName = (rule, value, callback) => {
        if(!value) {
          return callback(new Error('姓名不能为空'))
        }
        if(!/^(([\u4e00-\u9fa5]+)|([A-Za-z. ]+))$/.test(value)) {
          return callback(new Error('姓名为字母或汉字'))
        }
        callback()
      }
      var validateDormNo = (rule, value, callback) => {
        if(!value) {
          return callback(new Error('宿舍编号不能为空'))
        }
        this.$http.get('dormInfo?'+'dormNo='+value)
        .then(res => {
          console.log(res)
          if(res.data.result == 'true') {
            callback()
          } else {
            callback(new Error('宿舍不存在'))
          }
        })
      }
      return {
        stuForm: this.edit?this.initstuForm: {
          dormNo: '',
          name: '',
          bedNo: 1,
          password: '',
          studentNo:''
        },
        rules: {
          studentNo: [
            {validator: validateSudentNo, trigger: 'blur'}
          ],
          name: [
            {validator: validateStudentName, trigger: 'blur'}
          ],
          dormNo: [
            {validator: validateDormNo, trigger: 'blur'}
          ],
          password: [
            {min:6, max:25, message: '长度在6到25个字符', trigger:'blur'}
          ]
        },
        build: '',
        room: '',
        dormExist: false
      }
    },
    methods: {
      generateDormNo() {
        if(this.room != '' && this.build != '') {
          this.stuForm.dormNo = "获取中..."
          this.$http.get('dormNo?'+this.Qs.stringify({room:this.room, build: this.build}))
          .then(response => {
            if(response.data) {
              this.stuForm.dormNo = response.data
              this.dormExist = true
            } else {
              this.dormExist = false
              this.$message.error("宿舍不存在")
              this.stuForm.dormNo = ''
            }
          })

        }
      },
      addSubmit() {
        var _this = this
        var data = {
          studentNo: this.stuForm.studentNo,
          name: this.stuForm.name,
          dormNo: this.stuForm.dormNo,
          bedNo: this.stuForm.bedNo,
          password:this.$md5(this.stuForm.password)
        }
        this.$http
          .post('student', _this.Qs.stringify(data))
          .then(response => {
            console.log(response)
            if(response.data) {
              _this.$message({
                message: '添加成功',
                type: 'success'
              });
            } else {
              _this.$message({
                message: '添加失败',
                type: 'error'
              });
            }
          }).catch(error => {
            console.log(error)
          })
      },
      editSubmit() {
          var _this = this
          var data = {
            studentNo: this.stuForm.studentNo,
            name: this.stuForm.name,
            dormNo: this.stuForm.dormNo,
            bedNo: this.stuForm.bedNo,
            password:this.stuForm.password.length==32?this.stuForm.password:this.$md5(this.stuForm.password)
          }
          this.$http
            .put('student', _this.Qs.stringify(data))
            .then(response => {
              console.log(response)
              if(response.data) {
                _this.$message({
                  message: '修改成功',
                  type: 'success'
                });
              } else {
                _this.$message({
                  message: '修改失败',
                  type: 'error'
                });
              }
            }).catch(error => {
              console.log(error)
            })
      },
    }
  }
</script>

<style>


  #stuForm {
    max-width: 500px;
  }

  .tag {
    margin-right: 3px;
  }
</style>
