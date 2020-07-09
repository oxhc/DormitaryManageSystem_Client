<template>
  <div>
    <div class="row">
      <div class="mpanel" style="flex-grow: 1;">
        <div class="title">
          <i class="el-icon-search"> </i>
          学生检索
        </div>
        <el-form :inline="true" status-icon label-width="58px">

          <el-form-item prop="" label="学号">
            <el-input v-model="studentNo" placeholder="请输入学号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="visbleStudent=true" plain type="primary">搜索</el-button>
          </el-form-item>

        </el-form>
      </div>
      <div id="dormSearch" class="mpanel" style="flex-grow: 2;">
        <div class="title">
          <i class="el-icon-office-building">
          </i>
          宿舍检索
        </div>
        <el-form :inline="true" status-icon label-width="58px">

          <el-form-item prop="" label="楼号 ">
            <el-input v-model="build" placeholder="请输入楼号  "></el-input>
          </el-form-item>

          <el-form-item prop="" label="房间号">
            <el-input v-model="room" placeholder="请输入房间号"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="searchByDorm" plain type="primary">搜索</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>

    <div class="mpanel">
      <div class="title">
        <i class="el-icon-position"></i>
        快速导航
      </div>
      <div class="fast_nav">
        <div v-for="item in navs" class="nav_button" @click="item.click">
          {{item.title}}
        </div>
      </div>
    </div>

    <div class="mpanel">
      <div class="title">
        <i class="el-icon-s-order"></i>
        最近报修
      </div>
      <div>
        <div v-for="item in repairs" class="repair_item" v-if="item.status=='待处理'">
          学号{{item.studentNo}} 申请 {{item.dormNo}} {{item.size}} 报修
          : {{item.note}}
        </div>
      </div>
    </div>

    <el-dialog title="查看详情" :visible.sync="visbleDorm">
      <detail asComponent :p_dorm_no="dormNo"></detail>
    </el-dialog>

    <el-dialog title="查看详情" :visible.sync="visbleStudent">
      <detail asComponent :p_student="studentNo"></detail>
    </el-dialog>


  </div>

</template>

<script>
  import detail from './stu/manage_stu.vue'
  export default {
    components:{
      detail: detail
    },
    data() {
      return {
        visbleStudent:false,
        visbleDorm:false,
        b_studentNo:'',
        studentNo:'',
        dormNo: '',
        build: '',
        room: '',
        repairs: [],
        navs: [
          {
            title: '添加学生',
            click: () => {
              this.$router.push("/add_stu")
            }
          },
          {
            title: '添加宿舍',
            click: () => {
              this.$router.push("/add_dorm")
            }
          }
        ]
      }
    },
    methods: {
      searchByStu() {
        this.studentNo = this.b_studentNo
      },
      searchByDorm() {

        this.$http.get('dormNo?'+this.Qs.stringify({room:this.room, build: this.build}))
        .then(response => {
          if(response.data) {
            this.dormNo = response.data
            this.visbleDorm = true
          } else {
            this.$message.error("宿舍不存在")
          }
        })
      }
    },
    created() {
      this.$http.get('repair')
      .then(res => {
        this.repairs = res.data.data
        this.repairs.forEach(item => {
          this.$http.get('dormInfo?'+ this.Qs.stringify({dormNo:item.dormNo}))
          .then(dormInfo => {
          console.log(dormInfo)
           item.dormNo = dormInfo.data.build
           item.size = dormInfo.data.room
        })
        })

      })
    }
  }
</script>

<style>
  .mpanel {
    background-color: white;
    padding: 5px;
    margin: 10px;
    box-shadow: 2px 2px 20px -10px #9C9C9C;
  }

  .title {
    margin: 10px;
    font-size: 14px;
    color: #747474;
  }

  .fast_nav {
    display: flex;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
  }

  .nav_button {
    color: #409EFF;
    background: #ecf5ff;
    border-color: #b3d8ff;
    height: 60px;
    margin: 10px;
    text-align: center;
    line-height: 60px;
    border-radius: 5px;
    padding: 0 15px;
    font-size: 14px;
    cursor: pointer;
  }
  .nav_button:hover{
    background: #409EFF;
        border-color: #409EFF;
        color: #FFF;
  },

  #dormSearch {
    flex-grow: 2;
    margin-left: 5px;
  }

  .repair_item {
    padding: 8px 10px;
    font-size: 14px;
    color: #64696f;
    border-radius: 4px;
  }

  .repair_item:hover {
    background-color: #ECF5FF;
  }
</style>
