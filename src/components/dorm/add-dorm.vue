<template>
  <div class="panel">
    <el-form status-icon ref="dormForm" :rules="rules" :model="dormForm" id="dormForm" label-width="80px">
      <el-form-item label="楼名">
        <el-tag class="tag" @close="handleClose(item)" v-for="(item, index) in nameList" :key="index" closable>{{item}}</el-tag>
        <el-input placeholder="请输入楼宇名称, 回车添加" v-on:change="addNameTag" v-model="dormForm.name"></el-input>
      </el-form-item>
      <el-form-item label="房间号">
        <el-tag class="tag" type="warning" @close="handleClose2(item)" v-for="(item, index) in roomList" :key="index"
          closable>{{item}}</el-tag>
        <el-input placeholder="请输入房间号(可输入区间, 如101-135)" v-on:change="addRoomTag" type="roomNo" v-model="dormForm.roomNo"></el-input>
      </el-form-item>
      <el-form-item prop="size" label="容量">
        <el-input type="number" v-model="dormForm.size"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="addSubmit" v-if="!edit" type="primary">添加</el-button>
        <el-button @click="editSubmit" v-if="edit" type="primary">确认修改</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: {
      initdormForm: {
        type: Object,
        default () {
          return {
            dormNo: '',
            name: '',
            roomNo: '',
            size: '',
            studentCount: 0,
          }
        }
      },
      edit: Boolean,
    },
    watch: {
      initdormForm(val) {
        if (this.edit)
          this.dormForm = val
      }
    },
    data() {
      return {
        nameList: [],
        roomList: [],
        rules: {

        },
        dormForm: this.edit ? this.initdormForm : {
          dormNo: '',
          name: '',
          roomNo: '',
          size: 6,
          studentCount: 0,
        }

      }
    },
    methods: {
      addSubmit() {
        if (this.nameList.length == 0 || this.roomList.length == 0 || this.dormForm.size <= 0) {
          this.$message.error("提交项不能为空")
          return
        }
        if (this.dormForm.size > 20) {
          this.$message.error("容量不能大于20")
          return
        }
        var _this = this
        var data = {
          dormList: this.nameList.join(','),
          roomList: this.roomList.join(','),
          size: this.dormForm.size,
          studentCount: this.dormForm.studentCount
        }
        this.$http
          .post('dorm', _this.Qs.stringify(data))
          .then(response => {
            if (response.data.result == 'true') {
              _this.$message({
                message: '添加成功',
                type: 'success'
              });
              setTimeout(() => {
                _this.nameList = []
                _this.roomList = []
              }, 2000)

            }
          }).catch(error => {
            console.log(error)
          })
      },
      editSubmit() {
        if (!/^[a-zA-Z0-9#\u4e00-\u9fa5]+$/.test(this.dormForm.name)) {
          this.$message.error("只允许汉字, 字母, 数字, #号的组合")
          return
        }
        if (!/^([a-zA-Z0-9\u4e00-\u9fa5]+)$/.test(this.dormForm.roomNo)) {
          this.$message.error("只允许汉字, 字母, 数字, #号的组合")
          return
        }

        if(this.dormForm.size <= 0) {
          this.$message.error("容量不能小于0")
          return
        }
        var _this = this
        this.$http.put('dorm', this.Qs.stringify(this.dormForm))
          .then((response) => {
            if (response.data == true) {
              this.$message.success("修改成功")
            } else {
              this.$message.error("修改失败")
            }
          })

      },
      handleClose(tag) {
        this.nameList.splice(this.nameList.indexOf(tag), 1);
      },
      handleClose2(tag) {
        this.roomList.splice(this.roomList.indexOf(tag), 1);
      },
      addNameTag() {
        if (this.edit) return
        if(this.dormForm.name.length > 10) {
          this.$message.error("长度应小于10")
          return
        }
        if (/^[a-zA-Z0-9#\u4e00-\u9fa5]+$/.test(this.dormForm.name)) {
          this.nameList.push(this.dormForm.name)
          this.dormForm.name = ''
        } else {
          this.$message.error("只允许汉字, 字母, 数字, #号的组合")
        }

      },
      addRoomTag() {
        if (this.edit) return
        if(this.dormForm.name.length > 10) {
          this.$message.error("长度应小于10")
          return
        }
        if (/^(([0-9]+-[0-9]+)|([a-zA-Z0-9\u4e00-\u9fa5]+))$/.test(this.dormForm.roomNo)) {
          this.roomList.push(this.dormForm.roomNo)
          this.dormForm.roomNo = ''
        } else {
          this.$message.error("只允许汉字, 字母, 数字的组合或数字-数字格式")
        }

      }
    }
  }
</script>

<style>
  #dormForm {
    max-width: 500px;
  }

  .tag {
    margin-right: 3px;
  }
</style>
