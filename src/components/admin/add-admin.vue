<template>
  <div class="panel">
    <el-form  status-icon ref="adminForm" :rules="rules" :model="adminForm" id="adminForm" label-width="80px">
      <el-form-item prop="username" label="用户名">
        <el-input placeholder="请输入用户名" v-model="adminForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="realname" label="真实姓名">
        <el-input placeholder="请输入真实姓名" type="realname" v-model="adminForm.realname"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" v-model="adminForm.password"></el-input>
      </el-form-item>
      <el-form-item label="级别">

        <el-select v-model="adminForm.auLevel" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>

      </el-form-item>
      <el-form-item>
        <el-button @click="validate(addSubmit)" v-if="!edit" type="primary">添加</el-button>
        <el-button @click="validate(editSubmit)" v-if="edit" type="primary">确认修改</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: {
      initadminForm: {
        type: Object,
        default () {
          return {
            username: '',
            realname: '',
            password: '',
            auLevel: 0
          }
        }
      },
      edit: Boolean,
    },
    watch: {
      initadminForm(val) {
        if (this.edit)
          this.adminForm = val
      }
    },
    data() {

      var validatePassword = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空'))
        }
        setTimeout(() => {
          if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{10,31}$/.test(value) && !(this.edit && value.length==32)) {
            callback(new Error('密码10-31个字符，至少1个大写字母，1个小写字母和1个数字'))
          } else {
            callback()
          }
        }, 500)
      }
      var validateRealname = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('姓名不能为空'))
        }
        if(!/^(([\u4e00-\u9fa5]+)|([A-Za-z. ]+))$/.test(value)) {
          return callback(new Error('姓名为字母或汉字'))
        }
        callback()
      }
      return {
        rules: {
          password: [{
            validator: validatePassword, trigger: 'blur'
          }],
          realname: [{
            validator: validateRealname, trigger: 'blur'
          }]
        },
        adminForm: this.edit ? this.initadminForm : {
          username: '',
          realname: '',
          password: '',
          auLevel: 0
        },
        options: [{
          value: 0,
          label: "普通管理员"
        }, {
          value: 1,
          label: "超级管理员"
        }]
      }
    },
    methods: {
      validate(func) {
        this.$refs.adminForm.validate((valid) => {
          if(valid) {
            func()
          } else {
            this.$message.error("数据不符合要求")
          }
        })
      },
      addSubmit() {
        var _this = this
        var data = {
          username: this.adminForm.username,
          password: this.$md5(this.adminForm.password),
          auLevel: this.adminForm.auLevel,
          realname: this.adminForm.realname
        }
        console.log(data)
        this.$http
          .post('user/admin', _this.Qs.stringify(data))
          .then(response => {
            if (response.data) {
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
          username: this.adminForm.username,
          password: this.adminForm.password.length == 32 ? this.adminForm.password : this.$md5(this.adminForm.password),
          auLevel: this.adminForm.auLevel,
          realname: this.adminForm.realname
        }
        console.log(data)
        this.$http
          .put('user/admin', _this.Qs.stringify(data))
          .then(response => {
            if (response.data) {
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
      }
    }
  }
</script>

<style>
  #adminForm {
    max-width: 500px;
  }
</style>
