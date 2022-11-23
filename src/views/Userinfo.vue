
<template>
      <el-container>
        <Aside></Aside>
        <Main></Main>
      </el-container>
</template>

<script>
import Aside from "@/components/User/Aside";
import Main from "@/components/User/Main";
export default {

  name: "Userinfo",
  components: {Aside,Main},
  mounted() {

  }
}
</script>

<style scoped>

</style>