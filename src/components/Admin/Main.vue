<template>
  <el-container style="height:100%; border: 1px solid #eee">


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
        <span>{{ this.$store.getters.getAccount }}</span>
      </el-header>
      <div style="margin: 10px 0">
        <el-popconfirm
            class="ml-5"
            confirm-button-text='确定'
            cancel-button-text='我再想想'
            icon="el-icon-info"
            icon-color="red"
            title="您确定批量删除这些数据吗？"
            @confirm="handleDeleteBatch">
          <el-button type="danger" slot="reference">批量删除 <i class="el-icon-remove-outline" /></el-button>
        </el-popconfirm>
        <el-input style="width: 200px" placeholder="搜索用户账号" suffix-icon="el-icon-search" v-model="searchAccount"></el-input>
        <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
        <el-button type="warning" @click="reset">重置</el-button>

      </div>

      <el-main>
        <el-table :data="tableData" @selection-change="handleSelectionChange" v-loading="loading" height="40vh">
          <el-table-column type="selection" width="55"/>
          <el-table-column prop="userId" label="用户id" width="140"></el-table-column>
          <el-table-column prop="username" label="用户名" width="120"></el-table-column>
          <el-table-column prop="account" label="用户账号"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间"></el-table-column>
          <el-table-column prop="role" label="角色"></el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button type="success" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
              <el-popconfirm
                  class="ml-5"
                  confirm-button-text='确定'
                  cancel-button-text='我再想想'
                  icon="el-icon-info"
                  icon-color="red"
                  title="您确定删除吗？"
                  @confirm="handleDelete(scope.row.userId)">
                <el-button type="danger" slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div style="padding: 10px 0">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageData.page"
              :page-sizes="[ 5, 10, 20]"
              :page-size="pageData.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageData.pageTotal">
          </el-pagination>
        </div>
      </el-main>
    </el-container>
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="用户名">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" >
          <el-input v-model="form.account" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
<!--        <el-form-item label="邮箱">-->
<!--          <el-input v-model="form.phone" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="电话">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="form.role" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>


</template>

<script>
import request from "@/utils/request";

export default {
  name: "Admin_Main",
  data() {
    // const item = {
    //   date: '2016-05-02',
    //   name: '王小虎',
    //   address: '上海市普陀区金沙江路 1518 弄'
    // };
    return {
      loading:true,
      tableData: [],
      pageData: {
        pageTotal: 0,
        page: 1,
        pageSize: 10,
        pageSizeList: [10, 20, 30],
      },
      form: {},
      dialogFormVisible: false, //对话框
      searchAccount:'',//模糊搜索
      multipleSelection: [] //多选框
    }
  },
  computed: {
    total() {
      return this.pageData.pageTotal || 0;
    },
  },
  methods: {
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    // 批量删除
    handleDeleteBatch(){
      let ids = this.multipleSelection.map(v => v.userId)//将对象数组转化为纯数组
      console.log(this.multipleSelection)
      console.log("输出ids")
      console.log(ids)
      this.request.delete("/userController/delUserByIds",{
        data: ids
      }).then(res => {
        if(res.code == 200){
          this.$notify.success(res.message)
          this.load()
        }else{
          this.$notify.error("批量删除失败")
        }
      })
    },
    //重置
    reset(){
      this.loading = true
      this.searchAccount = ""
      this.load()
    },
    //根据id删除
    handleDelete(id) {
      console.log(id)
      this.request.delete('/userController/delUserById',{
        params:{
          id
        }
      }).then(res =>{
        if (res.code == 200){
          this.$notify.success("删除成功")
          this.load()
        }
      })
    },
    //修改某一行
    handleEdit(row) {
      this.loading = true
      this.form = row;
      this.dialogFormVisible = true;
      console.log(row)
    },
    //保存更新
    save() {
        this.request.post('/userController/updateUser',{
          "userId": this.form.userId,
          "username": this.form.username ,
          "phone": this.form.phone ,
          "role": this.form.role ,
        }).then(res =>{
          if (res.code == 200){
            this.$notify.success(res.message)
            this.dialogFormVisible = false
            this.load()
          }
        })
    },
    //刷新加载
    load() {
      this.request.get("/userController/getUserPage", {
        params: {
          pageNo: this.pageData.page,
          pageSize: this.pageData.pageSize,
          account: this.searchAccount,
        }
      }).then(res => {
        this.tableData = res.data.records;
        this.pageData.pageTotal = res.data.total;
      })
      this.loading = false
    },
    //修改页面大小
    handleSizeChange(pageSize) {
      this.loading = true
      this.pageData.pageSize = pageSize
      this.load()
    },
    //修改当前页数
    handleCurrentChange(pageNum) {
      this.loading = true
      this.pageData.page = pageNum
      this.load()
    },
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
        .get("/userController/getUserPage", {
          params: {
            pageNo: 1,
            pageSize: 5,
          }
        })
        .then(res => {
          this.tableData = res.data.records;
          this.pageData.pageSize = 5;
          this.pageData.page = 1;
          this.pageData.pageTotal = res.data.total;
          console.log(this.tableData)
          console.log(res);
        })
    this.loading = false
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
