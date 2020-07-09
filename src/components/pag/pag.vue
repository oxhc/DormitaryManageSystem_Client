<template>
  <div class="pag">
    <el-button :disabled="page==1" @click="changePage(-1)" icon="el-icon-arrow-left"></el-button>
    <el-input  style="width: 100px;" v-model="page">

    </el-input>
    <el-button @click="changePage()" icon="el-icon-position"></el-button>
    <el-button :disabled="page==max" @click="changePage(1)" icon="el-icon-arrow-right"></el-button>

    <el-select @change="changePage()" v-model="limit" >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.value.toString()+'条/页'"
        :value="item.value">
      </el-option>
    </el-select>

  </div>
</template>

<script>
  export default {
    props: {
      max:Number
    },
    data() {
      return {
        options: [
          {
            value:10,
          },
          {
            value:20,
          },
          {
            value:30,
          },
          {
            value:50,
          }
        ],
        limit:10,
        page:1,
      }
    },
    methods: {
      changePage(p=0) {
        this.page = parseInt(this.page)
        if(this.page + p > 0 && this.page + p <= this.max) {
          this.page += p
        } else if (this.page <= 0 || this.page > this.max) {
          this.page = this.max
          this.$message({
                        message: '页数不合法',
                        type: 'error'
                      });
        }
        this.$emit('changePage', {
          page: this.page,
          limit: this.limit
        })
      }

    }
  }

</script>

<style>
  .pag {
    margin:10px 0;
    text-align: center;
  }

</style>
