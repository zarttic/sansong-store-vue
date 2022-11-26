<template>
<el-container>
  <Aside></Aside>
  <Main></Main>
</el-container>
</template>

<script>
import Aside from "@/components/User/Aside";
import Main from "@/components/location/Main";
export default {

  name: "location",
  components: {Aside,Main},
  mounted() {

  }
}
</script>

<style scoped>

</style>
