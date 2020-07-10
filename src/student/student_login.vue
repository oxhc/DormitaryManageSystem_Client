<template>
  <div class="login">
    <div id="banner">
      <div class="sbalcklayer">
        <div id="banner_text">
          <div id="logo">
            <img style="vertical-align: middle;" height="60px" src="../assets/sdut_logo.png">
          </div>
          <div id="vertical_line">

          </div>
          <div>
            <span id="sysname">学生宿舍管理系统</span> <br>
            <span id="title">学生登录</span>
             <span @click="toAdmin" class="toadmin">管理员端</span>
          </div>
        </div>
      </div>
    </div>
    <el-form status-icon ref="login_form" :rules="rules" :model="login_form" id="login_form" label-width="80px">
      <el-form-item prop="studentNo" label="学号">
        <el-input v-model="login_form.studentNo"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" v-model="login_form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm('login_form')" type="primary">登录</el-button>
        <el-button @click="$refs.login_form.resetFields">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      var validateUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('学号不能为空'));
        }
        setTimeout(() => {
          if (value.length <= 3 || value.length > 17) {
            return callback(new Error('学号长度为4-16个字符'))
          }
        }, 1000);
        callback();
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (!value) {
            return callback(new Error('密码不能为空'));
          }
        }
        callback()
      };

      return {
        login_form: {
          studentNo: '',
          password: '',
        },
        rules: {
          studentNo: [{
            validator: validateUsername,
            trigger: 'blur'
          }],
          password: [{
            validator: validatePass,
            trigger: 'blur'
          }]
        },
        encry_pass: ''
      };
    },
    methods: {
      toAdmin() {
        this.$router.push("/login")
      },
      submitForm(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.encry_pass = this.$md5(this.login_form.password)
            this.$http
              .post("student/login",
                _this.Qs.stringify({
                  studentNo: _this.login_form.studentNo,
                  password: _this.encry_pass
                }))
              .then(function(response) {
                console.log(response.data);
                if (response.data.result == "true") {
                  _this.$router.push({
                    path: '/student_home',
                  });
                } else {
                  _this.$message({
                    message: '学号或密码错误',
                    type: 'error'
                  });
                }
              })
              .catch(function(error) {
                console.log("error");
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style>
  .toadmin {
    font-size: 12px;
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
    padding:1px;
    border-color: #2B8E74;
    color: #2B8E74;
    opacity: 0;
  }
  .toadmin:hover {
    background-color: white;
    color: #01B487;
    cursor: pointer;
    opacity: 1;
  }


  #banner {
    height: 260px;
    background-image: url(../assets/login_bg.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    color: white;
    margin-bottom: 30px;

  }

  #sysname {
    font-size: 34px;
  }

  #title {
    font-size: 22px;
  }

  .sbalcklayer {
    animation: sturn_to_black 4s;
    background-color: rgba(33, 140, 116, 0.95);
    height: 100%;
  }

  #banner_text {
    animation: title_fall 4s;
    padding-top: 70px;
    margin: 0 auto;
    width: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #banner_text>div {
    margin-right: 10px;
  }

  #vertical_line {
    width: 2px;
    height: 60px;
    background-color: white;
  }

  #login_form {
    width: 350px;
    margin: 0 auto;
  }

  @keyframes sturn_to_black {
    from {
      background: rgba(33, 140, 116, 0.65);
    }

    to {
      background-color: rgba(33, 140, 116, 0.95);
    }
  }

  @keyframes title_fall {
    from {
      padding-top: 0px;
    }

    to {
      padding-top: 70px;
    }
  }

</style>
