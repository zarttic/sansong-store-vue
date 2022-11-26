<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1','2', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-user"></i>用户</template>
        <el-menu-item-group>
          <el-menu-item index="1-1">用户详情</el-menu-item>
<!--          <el-menu-item index="1-2" onclick="javascript:openUpdateModal();">信息修改</el-menu-item>-->
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-shopping-cart-1"></i>收货地址</template>
        <el-menu-item-group>
          <template slot="title"></template>
          <el-menu-item index="2-1">我的收获地址</el-menu-item>
          <el-menu-item index="2-2">添加收获地址</el-menu-item>
        </el-menu-item-group>
        </el-submenu>
<!--      <el-submenu index="3">-->
<!--        <template slot="title"><i class="el-icon-goods"></i>订单</template>-->
<!--        <el-menu-item-group>-->
<!--          <template slot="title">分组一</template>-->
<!--          <el-menu-item index="3-1">选项1</el-menu-item>-->
<!--          <el-menu-item index="3-2">选项2</el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--        <el-menu-item-group title="分组2">-->
<!--          <el-menu-item index="3-3">选项3</el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--        <el-submenu index="3-4">-->
<!--          <template slot="title">选项4</template>-->
<!--          <el-menu-item index="3-4-1">选项4-1</el-menu-item>-->
<!--        </el-submenu>-->
<!--      </el-submenu>-->
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "Aside"
}
</script>

<style scoped>

</style>
