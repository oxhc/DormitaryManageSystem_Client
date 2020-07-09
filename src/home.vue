<template>
  <div class="home">
    <el-container style="height:100%;">
      <transition name="el-zoom-in-top">
        <el-aside class="transition-box side" width="200px" v-show="isSideShow">
          <Nav  v-on:navto="changeTitle($event)" ></Nav>
        </el-aside>
      </transition>
      <el-container style="height:100%;">
        <el-header height="64px" class="header">

          <div>
            <el-button @click="changeSide" type="text" size="small" icon="el-icon-arrow-left">

            </el-button>
            {{active_title}}
          </div>
          <div>
            <el-dropdown @command="handleCommand" trigger="click">
              <span class="el-dropdown-link">
                {{this.user.realname}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout" icon="el-icon-switch-button">
                  退出
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

        </el-header>
        <el-main id='main-content'>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isSideShow: true,
        active_title: '主页',
        nav_title: {
          '/manage_dorm':'宿舍信息管理',
          '/add_dorm':'宿舍信息录入'
        },
        user: {
          username: '未登录',
          realname: '未登录'
        }
      }
    },

    created() {
      if(!this.active_title && this.nav_title[this.$route.path]) {
          this.active_title = this.nav_title[this.$route.path]
      }
      this.getAdminInfo()
    },
    methods: {
      changeSide: function() {
        if (this.isSideShow) {
          this.isSideShow = false
        } else {
          this.isSideShow = true
        }
      },
      changeTitle:function(event) {
        this.active_title = event
      },
      handleCommand(com) {
        if(com=='logout') {
          var _this = this
          this.$http.get('user/logout')
          .then(res => {
            this.$message.success("退出成功")
            setTimeout(()=>{
              this.$router.push('/login')
            },1000)
          })
        }
      },
      getAdminInfo() {
        this.$http.get('user/login')
        .then(res => {
          if(res.data.result == 'true') {
            this.user = res.data.user
          } else {
            this.$message.error("未登录")
            setTimeout(()=>{
              this.$router.push('/login')
            },1000)
          }
        })
      }
    }
  };
</script>

<style>
  .header {
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    -moz-box-shadow: 0px 5px 5px -2px #DEDEDE;
    -webkit-box-shadow: 0px 5px 5px -2px #DEDEDE;
    box-shadow: 0px 5px 5px -2px #DEDEDE;
    height: 65px;

  }

  .header img {
    vertical-align: middle;

  }

  .side {
    display: block;
    position: relative;
    height: 100%;
  }

  .home {
    height: 100%;
  }

  #main-content {
    background-color: #F1F2F6;
    padding: 10px;
  }

  .el-submenu .el-menu-item {
    min-width: 0px;
  }
</style>
