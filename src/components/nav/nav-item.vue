<template>
  <el-submenu :index="index.toString()">
    <template slot="title">
      <i :class="icon"></i>
      <span>{{title}}</span>
    </template>

    <el-menu-item @click="nav_to(s.to, s.title)" v-for="(s,si) in sub" :key="si" :index="s.to">{{s.title}}</el-menu-item>

  </el-submenu>
</template>

<script>
  export default {
    props: {
      index: Number,
      title: String,
      sub: Array,
      icon: String,
    },
    methods: {
      nav_to: function(destination, title) {
        if (destination) {
          this.$emit('navto', title)
          console.log(destination)
          if(this.$route.path != destination){
            this.$router.replace(destination) 
          }

        } else {
          console.log("no")
        }
      }
    },
    return() {
    }

  }
</script>

<style>

</style>
