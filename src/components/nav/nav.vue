<template>
  <div  style="height: 100%;">

    <el-menu :collapse="isCollapse"  @select="select" text-color="#E6F3FB" background-color="#2F4155" :default-active="this.$route.path" style="height:100%; color: #FAFDFF;">
      <div class="logo_area">
        <img style="vertical-align: middle;" src="../../assets/sdut_logo.png" height="25px">
        <transition name="el-fade-in-linear">
               <span v-show="!isCollapse">
                 宿舍管理系统
               </span>
        </transition>

      </div>
      <navItem @navto="$emit('navto', $event)"  v-for="(n, index) in nav_data" v-bind:key="index" v-bind:title="n.title" :index="index+1" :sub="n.sub"
        :icon='n.icon'></navItem>
    </el-menu>
  </div>

</template>

<script>
  import navItem from './nav-item'
  export default {
    name: 'Nav',
    components: {
      navItem
    },
    methods:{
      select(index, indexpath) {
        console.log(index)
      }
    },
    data() {
      return {
        isCollapse: false,
        nav_data: [{
            title: '主页',
            icon: 'el-icon-s-home',
            sub: [{
                title: '主页',
                to: '/home'
              },
              {
                title: '个人信息'
              }
            ]
          },
          {
            title: '宿舍管理',
            icon: 'el-icon-office-building',
            sub: [{
                title: '录入宿舍',
                to: '/add_dorm'
              },
              {
                title: '宿舍管理',
                to: '/manage_dorm'
              }
            ]
          },
          {
            title: '学生管理',
            icon: 'el-icon-user',
            sub: [{
                title: '学生信息录入',
                to: '/add_stu'
              },
              {
                title: '学生信息管理',
                to: '/manage_stu'
              }
            ]
          },
          {
            title: '报修管理',
            icon: 'el-icon-s-release',
            sub: [{
                title: '添加报修',
                to: '/add_repair'
              },
              {
                title: '报修管理',
                to: '/manage_repair'
              }
            ]
          },
          {
            title: '管理员管理',
            icon: 'el-icon-s-custom',
            sub: [{
                title: '添加管理员',
                to: '/add_admin'
              },
              {
                title: '管理管理员',
                to: '/manage_admin'
              }
            ]
          }
        ]
      }
    }
  };
</script>

<style>
  .logo_area {
    background-color: #283b4c;
    text-align: center;
    font-size: 16px;
    padding: 20px 0;
  }
</style>
