<template>
  <div class="panel">
    <div class="search" v-if="!asComponent">
      <div class="search_item">
        <div class="label">学号:</div>
        <el-input class="si" v-model="student_no" label="bm"></el-input>
      </div>
      <div class="search_item">
        <div class="label">姓名:</div>
        <el-input class="si" v-model="student_name" label="bm"></el-input>
      </div>
      <div class="search_item">
        <el-button type="primary" @click="refresh" icon="el-icon-search"></el-button>
      </div>
      <div class="search_item">
        <el-button type="primary" @click="clearCondition"> 清除条件</el-button>
      </div>

    </div>
    <el-table :data="tableData" @row-click="getDetail" style="width: 100%;">
      <el-table-column prop="studentNo" label="学号">

      </el-table-column>
      <el-table-column prop="name" label="姓名">

      </el-table-column>
      <el-table-column prop="dormNo" label="宿舍编号">

      </el-table-column>
      <el-table-column prop="bedNo" label="床号">

      </el-table-column>
      <el-table-column prop="password" label="密码">

      </el-table-column>
      <el-table-column width="150px" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <Pag @changePage="chagePage($event)" :max="page_count">

    </Pag>
    <el-dialog title="宿舍详情" :visible.sync="visableDetail">
      <manageStu :p_dorm_no="detail_dormNo" asComponent v-if="layer == 1 && !asComponent" :layer="layer+1"></manageStu>
    </el-dialog>

  </div>
</template>

<script>
  import pag from '../pag/pag.vue'
  import addStu from './add-stu.vue'
  export default {
    name: 'manageStu',
    props: {
      p_dorm_no: {
        type: String,
        default () {
          return ''
        }
      },
      p_student: {
        type: String,
        default () {
          return ''
        }
      },
      asComponent: {
        type: Boolean,
        default () {
          return false
        }
      },
      layer: {
        type: Number,
        default () {
          return 1
        }
      }
    },
    data() {
      return {
        tableData: [],
        student_no: this.p_student == '' ? '' : this.p_student,
        student_name: '',
        page: 1,
        limit: 10,
        end: false,
        room: '',
        page_count: 1,
        dorm_no: this.p_dorm_no,
        visableDetail: false,
        detail_dormNo: ''
      }
    },
    created() {
      console.log("stu created")
      this.refresh()
    },
    watch: {
      p_dorm_no(val) {
        this.dorm_no = val;
        this.refresh()
      },
      p_student(val) {
        this.student_no = val;
        this.refresh()
      }
    },
    methods: {
      refresh() {
        var _this = this
        this.$http
          .get('student?' + _this.Qs.stringify({
            page: _this.page,
            limit: _this.limit,
            student_no: _this.student_no,
            student_name: _this.student_name,
            dorm_no: _this.dorm_no
          }))
          .then(function(response) {
            _this.tableData = response.data.data;
            _this.page_count = parseInt(response.data.total_count / _this.limit) + 1;
          })
      },
      clearCondition() {
        this.student_name = ''
        this.student_no = ''
        this.refresh()
      },
      getDetail(row, col) {
        if ("操作" == col.label || this.asComponent) return
        this.visableDetail = true
        this.detail_dormNo = row.dormNo
      },
      edit(index, row) {
        var h = this.$createElement;
        console.log(row)
        console.log(typeof(row.bedNo))
        this.$msgbox({
          title: '修改',
          showConfirmButton: false,
          message: h('addStu', {
            props: {
              edit: true,
              initstuForm: {
                studentNo: row.studentNo,
                name: row.name,
                dormNo: row.dormNo,
                bedNo: parseInt(row.bedNo),
                password: row.password,
              }
            }
          }),
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {} else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: 'action: ' + action
          });
        }).catch(function(error) {
          console.log(error)
        })
      },
      del(index, row) {
        console.log(index, row)
        var _this = this
        this.$http
          .delete('student?' + _this.Qs.stringify({
            studentNo: row.studentNo
          }))
          .then(function(response) {
            if (response.data) {
              _this.$message({
                message: '删除成功',
                type: 'success'
              });
              _this.refresh()
            }

          })
      },
      chagePage(page_parm) {
        this.limit = page_parm.limit
        this.page = page_parm.page
        this.refresh()
        console.log(page_parm)
      }
    },
    components: {
      Pag: pag,
      addStu: addStu
    }
  }
</script>

<style>
  .search {
    margin: 10px 0;
    display: flex;
    justify-content: flex-end;
  }

  .search_item {
    display: flex;
    align-items: center;
    margin: 0 5px;

  }

  .label {
    min-width: 60px;
    margin: 0 5px;
  }

</style>
