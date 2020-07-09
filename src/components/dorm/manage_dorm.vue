<template>
  <div class="panel">
    <div class="search">
      <div class="search_item">
        <div class="label">楼名:</div>
        <el-input class="si" v-model="build" label="bm"></el-input>
      </div>
      <div class="search_item">
        <div class="label">房间号:</div>
        <el-input class="si" v-model="room" label="bm"></el-input>
      </div>
      <div class="search_item">
        <el-button type="primary" @click="refresh" icon="el-icon-search"></el-button>
      </div>

    </div>
    <el-table :data="tableData" style="width: 100%;" @row-click="getDetail">
      <el-table-column prop="dormNo" label="编号">

      </el-table-column>
      <el-table-column prop="name" label="楼名">

      </el-table-column>
      <el-table-column prop="roomNo" label="房间号">

      </el-table-column>
      <el-table-column prop="size" label="容量">

      </el-table-column>
      <el-table-column prop="studentCount" label="入住人数">

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

    <el-dialog title="查看详情" :visible.sync="visbleDetail">
      <detail asComponent :p_dorm_no="detail_dormNo"></detail>
    </el-dialog>

  </div>
</template>

<script>
  import pag from '../pag/pag.vue'
  import addDorm from './add-dorm.vue'
  import detail from '../stu/manage_stu.vue'
  export default {
    data() {
      return {
        tableData: [],
        build: '1#',
        dormNo: '',
        page: 1,
        limit: 10,
        end: false,
        room: '',
        page_count: 1,
        visbleDetail: false,
        detail_dormNo: '23'
      }
    },
    created() {
      this.refresh()
    },
    methods: {
      refresh() {
        this.$request
          .get('dorm', {
            build: this.build,
            page: this.page,
            limit: this.limit,
            room: this.room
          })
          .then(response => {
            this.tableData = response.data.data;
            this.page_count = parseInt(response.data.total_count / this.limit) + 1;
            console.log(this.page_count)
          }).catch(err => {}
          )
      },
      getDetail(row, column) {

        if ("操作" == column.label) return
        console.log(row.dormNo)
        this.visbleDetail = true;
        this.detail_dormNo = row.dormNo;


      },
      edit(index, row) {
        var h = this.$createElement;
        this.$msgbox({
          title: '修改',
          showConfirmButton: false,
          message: h('addDorm', {
            props: {
              edit: true,
              initdormForm: {
                dormNo: row.dormNo,
                name: row.name,
                roomNo: row.roomNo,
                size: row.size,
                studentCount: row.studentCount,
              }
            }
          })
        }).catch(err => {
          this.refresh()
        })
      },
      del(index, row) {
        var _this = this
        this.$http
          .delete('dorm?' + _this.Qs.stringify({
            dormNo: row.dormNo
          }))
          .then(function(response) {
            if (response.data) {
              _this.$message({
                message: '删除成功',
                type: 'success'
              });
              _this.refresh()
            }

          }).catch(error=>{})
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
      addDorm: addDorm,
      detail: detail
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

  .si {}
</style>
