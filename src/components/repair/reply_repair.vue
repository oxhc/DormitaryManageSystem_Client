<template>
  <div class="panel">
    <el-form status-icon label-width="80px">
      <el-form-item prop="status" label="状态">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>


      <el-form-item prop="note" label="反馈">
        <el-input type="textarea"  v-model="note"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="submit" type="primary">提交反馈</el-button>
        <el-button>重置</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
          note: '',
          options: [
            {
              value: '已处理',
              label: '已处理'
            },
            {
              value: '待处理',
              label: '待处理'
            }
          ],
          value: '已处理'
      }
    },
    methods: {
      submit() {
        this.$emit('replySubmit', this.note, this.value)
      }
    }
  }
</script>

<style>

</style>
