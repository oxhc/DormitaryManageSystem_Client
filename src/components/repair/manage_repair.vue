<template>
  <div class="panel">
    <div class="search">
      <div class="search_item">
        <div class="label">楼名:</div>
        <el-input class="si" v-model="build" label="bm"></el-input>
      </div>
      <div class="search_item">
        <div class="label">宿舍编号:</div>
        <el-input class="si" v-model="room" label="bm"></el-input>
      </div>
      <div class="search_item">
        <el-button type="primary" @click="refresh" icon="el-icon-search"></el-button>
      </div>

    </div>
    <el-table :data="tableData"  style="width: 100%;">
      <el-table-column prop="rno" label="报修编号">

      </el-table-column>
      <el-table-column prop="studentNo" label="报修学号">

      </el-table-column>
      <el-table-column prop="dormNo" label="宿舍编号">

      </el-table-column>
      <el-table-column prop="status" label="状态">

      </el-table-column>
      <el-table-column prop="createDate" label="创建时间">

      </el-table-column>
      <el-table-column prop="note" width="300px" label="备注">
        <template slot-scope="scope">
          <div v-for="item in scope.row.notes" >
            {{item}}
          </div>
        </template>

      </el-table-column>
      <el-table-column width="150px" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="openReply(scope.$index, scope.row)">反馈</el-button>
          <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <Pag @changePage="chagePage($event)" :max="page_count">

    </Pag>
    <el-dialog title="提交反馈" :visible.sync="visibleReply">
        <replyRepair @replySubmit="reply"></replyRepair>
    </el-dialog>

  </div>
</template>

<script>
  import pag from '../pag/pag.vue'
  import replyRepair from './reply_repair.vue'
  export default {
    data() {
      return {
        tableData: [{
          rno: '1234',
          studentNo: '6号公寓',
          dormNo: '203',
          size: '',
          studentCount: 3
        }],
        build: '1#',
        rno: '',
        page: 1,
        limit: 10,
        end: false,
        room: '',
        page_count: 1,
        visibleReply: false,
        current_data: {}
      }
    },
    created() {
      this.refresh()
    },
    methods: {
      refresh() {
        var _this = this
        this.$http
          .get('repair?' + _this.Qs.stringify({
            page: _this.page,
            limit: _this.limit,
          }))
          .then(function(response) {
            _this.tableData = response.data.data;
            _this.tableData.forEach((item) => {
              item.notes = item.note.split('\n')
            })
            _this.page_count = parseInt(response.data.total_count / _this.limit) + 1;
          })
      },
      openReply(index, row) {
        this.visibleReply = true
        this.current_data = row
      },
      del(index, row) {
        console.log(index, row)
        var _this = this
        this.$http
          .delete('repair?' + _this.Qs.stringify({
            rno: row.rno
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
      reply(note, status){
        let time = new Date()
        if(this.current_data.status != '待处理')
        this.current_data.note +='\n'+time.toLocaleString()+'反馈:\n'+note+'\n\n';
        this.current_data.status = status
        this.$http.put('repair', this.Qs.stringify(this.current_data))
        .then(res => {
          if(res.data) {
            console.log(res)
            this.$message.success("反馈成功")
            this.refresh()
          } else {
            this.$message.error("反馈失败")
            this.refresh()
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
      replyRepair: replyRepair,
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
