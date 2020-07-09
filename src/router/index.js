import Vue from 'vue'
import Router from 'vue-router'
import home from '@/home'
import Info from '../components/info.vue'
import addDorm from '@/components/dorm/add-dorm'
import manageDorm from '@/components/dorm/manage_dorm'
import login from '@/login'
import addStu from '../components/stu/add-stu.vue'
import manageStu from '../components/stu/manage_stu.vue'
import replyRepair from '../components/repair/reply_repair.vue'
import manageRepair from '../components/repair/manage_repair.vue'
import stuLogin from '@/student/student_login.vue'
import clientHome from '@/student/student_home.vue'
import manageAdmin from '../components/admin/manage_admin.vue'
import addAdmin from '../components/admin/add-admin.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/stuLogin'
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: '/',
          component: Info
        },
        {
          path: '/add_dorm',
          component: addDorm
        },
        {
          path:'/manage_dorm',
          component: manageDorm
        },
        {
          path:'/manage_stu',
          component: manageStu
        },
        {
          path:'/add_stu',
          component: addStu
        },
        {
          path:'/manage_repair',
          component: manageRepair
        },
        {
          path:'/add_repair',
          component: replyRepair
        },
        {
          path: '/manage_admin',
          component: manageAdmin
        },
        {
          path: '/add_admin',
          component: addAdmin
          }
      ]
    }, {
      path: "/login",
      name:"login",
      component: login
    }, {
      path: '/stulogin',
      component: stuLogin
    }, {
      path: '/student_home',
      component: clientHome
    }

  ]
})
