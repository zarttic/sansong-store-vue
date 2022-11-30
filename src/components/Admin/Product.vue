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
        <el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
        <el-input style="width: 200px" placeholder="输入商品名称进行查询" suffix-icon="el-icon-search" v-model="searchAccount"></el-input>
        <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
        <el-button type="warning" @click="reset">重置</el-button>

      </div>

      <el-main>
        <el-table :data="tableData" @selection-change="handleSelectionChange" height="80vh">
          <el-table-column type="selection" width="55"/>
          <el-table-column prop="productId" label="商品id"></el-table-column>
          <el-table-column prop="categoryId" label="商品分类id" ></el-table-column>
          <el-table-column prop="productName" label="商品名称"></el-table-column>

          <el-table-column prop="productPicture" label="商品预览图">
            <template slot-scope="scope" >
<!--              <img :src="$lc +scope.row.productPicture" alt  style="width: 100px; height: 100px"/>-->
              <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row.productPicture">
              </el-image>
            </template>

          </el-table-column>
          <el-table-column prop="productTitle" label="商品标题"></el-table-column>

          <el-table-column prop="productIntro" label="商品描述"></el-table-column>
          <el-table-column prop="productPrice" label="商品价格"></el-table-column>
          <el-table-column prop="productSellingPrice" label="实际销售价格"></el-table-column>
          <el-table-column prop="productNum" label="商品库存"></el-table-column>
          <el-table-column prop="productSales" label="销售数量"></el-table-column>
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
                  @confirm="handleDelete(scope.row.productId)">
                <el-button type="danger" slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div style="padding: 10px 0;margin-left: 500px" >
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
<!--    信息编辑框-->
<!--    :disabled="true" 不可选中-->
    <el-dialog title="商品信息" :visible.sync="dialogFormVisible" width="40%">
      <el-form label-width="150px" size="big">
        <el-form-item label="商品种类">
          <el-input v-model="form.categoryId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="form.productName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品标题" >
          <el-input v-model="form.productTitle" autocomplete="off" ></el-input>
        </el-form-item>
        <!--        <el-form-item label="邮箱">-->
        <!--          <el-input v-model="form.phone" autocomplete="off"></el-input>-->
        <!--        </el-form-item>-->

        <el-form-item label="商品图片路径">
          <el-input v-model="form.productPicture" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品图片预览">
          <el-image
              style="width: 100px; height: 100px"
              :src="form.productPicture">
          </el-image>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.productPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="实际销售价格">
          <el-input v-model="form.productSellingPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品介绍">
          <el-input v-model="form.productIntro" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="商品库存">
          <el-input v-model="form.productNum" autocomplete="off" type="text"></el-input>
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
  name: "Product",
  data() {
    // const item = {
    //   date: '2016-05-02',
    //   name: '王小虎',
    //   address: '上海市普陀区金沙江路 1518 弄'
    // };
    return {
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
    //新增
    handleAdd(){
      this.dialogFormVisible = true
      this.form = {}
    },
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    // 批量删除
    handleDeleteBatch(){
      let ids = this.multipleSelection.map(v => v.productId)//将对象数组转化为纯数组
      console.log(this.multipleSelection)
      console.log("输出ids")
      console.log(ids)
      this.request.delete("/productController/deleteProByIds",{
        data : ids
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
      this.searchAccount = ""
      this.load()
    },
    //根据id删除
    handleDelete(id) {
      console.log(id)
      this.request.delete('/productController/deleteProById',{
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
      this.form = row;
      this.dialogFormVisible = true;
      console.log(row)
    },
    //保存更新
    save() {
      this.request.post('/productController/updPro',{
        "productId": this.form.productId,
        "productName": this.form.productName ,
        "categoryId": this.form.categoryId ,
        "productNum": this.form.productNum ,
        "productTitle": this.form.productTitle ,
        "productIntro": this.form.productIntro ,
        "productPicture": this.form.productPicture ,
        "productPrice": this.form.productPrice ,
        "productSellingPrice": this.form.productSellingPrice ,
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
      this.request.get("/productController/getProductBySearch", {
        params: {
          pageNo: this.pageData.page,
          pageSize: this.pageData.pageSize,
          search: this.searchAccount,
        }
      }).then(res => {
        this.tableData = res.data.records;
        this.pageData.pageTotal = res.data.total;
      })
    },
    //修改页面大小
    handleSizeChange(pageSize) {
      this.pageData.pageSize = pageSize
      this.load()
    },
    //修改当前页数
    handleCurrentChange(pageNum) {
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
        .get("/productController/getProductBySearch", {
          params: {
            pageNo: 1,
            pageSize: 5,
          }
        })
        .then(res => {
          console.log(res)
          this.tableData = res.data.records;
          this.pageData.pageSize = 5;
          this.pageData.page = 1;
          this.pageData.pageTotal = res.data.total;
          console.log(this.tableData)
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
