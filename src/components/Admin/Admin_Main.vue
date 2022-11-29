<template>
  <el-container style="height:100%; border: 1px solid #eee">
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

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="date" label="user_id" width="140"></el-table-column>
          <el-table-column prop="name" label="user_name" width="120"></el-table-column>
          <el-table-column prop="address" label="account"></el-table-column>
          <el-table-column prop="address" label="phone"></el-table-column>
          <el-table-column prop="address" label="createTime"></el-table-column>
          <el-table-column prop="address" label="updateTime"></el-table-column>
          <el-table-column prop="address" label="role"></el-table-column>
        </el-table>
        <pagination
            :page="pageData.page"
            :page-size="pageData.pageSize"
            :total="total"
            :on-page-change="onPage"
            :showSizes="true"
            :pageSizeList="pageData.pageSizeList"
            :on-page-size-change="onSize"
            class="pagi page-content"
        />
      </el-main>
    </el-container>
  </el-container>




</template>

<script>
import request from "@/utils/request";
import Pagination from "@/components/Admin/Pagination.vue";
export default {
  name: "Admin_Main",
  components: {
    Pagination,
  },
  data() {
    // const item = {
    //   date: '2016-05-02',
    //   name: '王小虎',
    //   address: '上海市普陀区金沙江路 1518 弄'
    // };
    return {
      tableData:[],
      pageData: {
        pageTotal: 0,
        page: 1,
        pageSize: 10,
        pageSizeList: [10, 20, 30],
      },
    }
  },
  computed:{
    total() {
      return this.pageData.pageTotal || 0;
    },
  },
  methods: {
    // 分页
    onPage(pageNow) {
      console.log('pageNow', pageNow);
      this.pageData.page = pageNow;
    },
    onSize(e) {
      this.pageData.pageSize = e;
    }
  },
  mounted() {
    request
        .get("userController/getUserPage",{
          params:{
            pageNo:1,
            pageSize:5,
            account:this.$store.getters.getAccount
          }
        })
        .then(res=>{
          console.log(res);
        })
  }
}
</script>
<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

</style>