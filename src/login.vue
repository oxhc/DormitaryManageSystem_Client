<template>
  <div class="login">
    <div id="banner">
      <div class="balcklayer">
        <div id="banner_text">
          <div id="logo">
            <img style="vertical-align: middle;" height="60px" src="./assets/sdut_logo.png">
          </div>
          <div id="vertical_line">

          </div>
          <div>
            <span id="sysname">学生宿舍管理系统</span> <br>
            <span id="title">管理员登录</span>
          </div>
        </div>
      </div>
    </div>
    <el-form status-icon ref="login_form" :rules="rules" :model="login_form" id="login_form" label-width="80px">
      <el-form-item prop="username" label="用户名">
        <el-input v-model="login_form.username"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" v-model="login_form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm('login_form')" type="primary">登录</el-button>
        <el-button>退出</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      var validateUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
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
          username: '',
          password: '',
        },
        rules: {
          username: [{
            validator: validateUsername,
            trigger: 'blur'
          }],
          password: [{
            validator: validatePass,
            trigger: 'blur'
          }]

        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log("emit")
            var user_data = {
              username: this.login_form.username,
              password: this.$md5(this.login_form.password)
            }
            this.$http
              .post("user/login", this.Qs.stringify(user_data))
              .then(response => {
                console.log(response.data);
                if (response.data.result == "true") {
                  this.$message.success("登录成功")
                  setTimeout(() => {
                    this.$router.push('/home');
                  }, 1000)

                } else {
                  this.$message.error("账号或密码错误")
                }
              })
          } else {
            this.$message.warning("请正确填写信息")
            return false;
          }
        });
      }
    }
  }
</script>

<style>
  #banner {
    height: 260px;
    background-image: url(assets/login_bg.jpg);
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

  .balcklayer {
    animation: turn_to_black 5s;
    background-color: rgba(47, 65, 85, 0.85);
    height: 100%;
  }

  #banner_text {
    animation: title_fall 5s;
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

  @keyframes turn_to_black {
    from {
      background: transparent;
    }

    to {
      background-color: rgba(47, 65, 85, 0.85);
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
