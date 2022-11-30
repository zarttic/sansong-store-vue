<template>
  <el-container>
    <Aside></Aside>
    <MMain></MMain>
  </el-container>
</template>

<script >
import MMain from "@/components/Admin/Product"
import Aside from "@/components/Admin/aside";
export default {
  components: {Aside,MMain}
}
</script>

<style scoped>

</style>
