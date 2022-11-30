<template>
  <el-container>
    <Aside></Aside>
    <Main></Main>
  </el-container>
</template>

<script>
import Main from "@/components/Admin/Main";
import Aside from "@/components/Admin/aside";
export default {
  name: "Admin",
  components: {Aside, Main},
}
</script>

<style scoped>

</style>
