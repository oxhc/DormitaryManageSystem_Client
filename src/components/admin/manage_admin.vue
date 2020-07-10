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
    <el-table :data="tableData"  style="width: 100%;">
      <el-table-column prop="username" label="用户名">

      </el-table-column>

      <el-table-column prop="auLevel" label="等级">
          <template slot-scope="scope">
            <div>
             {{scope.row.auLevel==0?'普通管理员':'超级管理员'}}
            </div>
          </template>
      </el-table-column>
      <el-table-column prop="realname" label="真实姓名">

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
  </div>
</template>

<script>
  import pag from '../pag/pag.vue'
  import addAdmin from './add-admin.vue'
  export default {
    data() {
      return {
        tableData: [{
          username: '1234',
          name: '6号公寓',
          auLevel: '203',
          realname: '',
          password: ''
        }],
        build: '1#',
        username: '',
        page: 1,
        limit: 10,
        end: false,
        room: '',
        page_count: 1
      }
    },
    created() {
      this.refresh()
    },
    methods: {
      refresh() {
        var _this = this
        this.$http
          .get('user/admin?' + _this.Qs.stringify({
            page: _this.page,
            limit: _this.limit,
          }))
          .then(function(response) {
            _this.tableData = response.data.data;
            _this.page_count = parseInt(response.data.total_count / _this.limit) + 1;
            console.log(_this.page_count)
          })
      },
      edit(index, row) {
        var h = this.$createElement;
        this.$msgbox({
          title: '修改',
          showConfirmButton: false,
          message: h('addAdmin', {
            props: {
              edit: true,
              initadminForm: {
                username:row.username,
                name: row.name,
                auLevel: parseInt(row.auLevel),
                realname: row.realname,
                password: row.password,
              }
            }
          }),
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              console.log("ff")
            } else {
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
          .delete('user/admin?' + _this.Qs.stringify({
            username: row.username
          }))
          .then(function(response) {
            if (response.data) {
              _this.$message({
                message: '删除成功',
                type: 'success'
              });
              _this.refresh()
            } else {
              _this.$message.error("删除失败")
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
      addAdmin: addAdmin
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
