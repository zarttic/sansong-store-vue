<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1','2', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>用户管理</template>
        <el-menu-item index="1-1">用户信息</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>订单管理</template>
        <el-menu-item index="2-1">订单信息</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>商品管理</template>
        <el-menu-item index="3-1">商品信息</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "Aside",
  methods:{
    jump(url){
      this.$router.push(url);
    }
  }
}
</script>

<style scoped>

</style>
