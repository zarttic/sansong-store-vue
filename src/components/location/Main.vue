<template>
  <el-main>
    <el-table
        :data="tableData"
        style="width: 100%" v-loading="loading">
      <el-table-column
          label="收货人姓名"
          width="180">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column
          label="收货手机号"
          width="180">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column
          label="收货地址">
        <template slot-scope="scope">
          {{ scope.row.location }}
        </template>
      </el-table-column>
      <el-table-column
          label="备注">
        <template slot-scope="scope">
          <el-tag size="medium" :type="scope.row.tabs === '家' ? 'primary': 'success'">
            {{ scope.row.tabs }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--          <el-button-->
          <!--              size="mini"-->
          <!--              @click="handleEdit(scope.$index, scope.row)">保存编辑</el-button>-->

          <el-link icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-link>

          <el-link icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)" style="margin-left: 10px">删除
          </el-link>
          <!--          <el-button-->
          <!--              size="mini"-->
          <!--              type="danger"-->
          <!--              @click="handleDelete(scope.$index, scope.row)">-->
          <!--            -->
          <!--          </el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <!--    新增-->
    <div style="text-align: center; margin-top: 20px">
      <el-button type="primary" style="font-size: 20px" round @click="addLocation">
        <i class="el-icon-circle-plus-outline"></i>
        新增地址
      </el-button>
    </div>
    <!--        点击事件框-->
    <el-dialog title="用户信息" :visible.sync="dialogShow" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="用户名">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.location" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="form.tabs" autocomplete="off" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>


</template>

<script>
export default {
  mounted() {
    this.request.get('/LocationController/getLocationById', {
      params: {
        userId: this.$store.getters.getUserId
      }
    }).then(res => {
      this.tableData = res.data
      this.loading = false
    })
  },
  data() {
    return {
      tableData: [],
      form: [],
      dialogShow: false,
      loading: true,
    }
  },
  methods: {
    //新增地址
    addLocation() {
      this.dialogShow = true
    },
    //编辑打开对话框
    handleEdit(index, row) {
      console.log(index, row);
      this.form = row
      this.dialogShow = true
    },
    save() {
      this.request.post('/LocationController/updateLocation', {
        location: this.form
      }).then(res => {
        console.log(res)
      })
    },
    //删除操作
    handleDelete(index, row) {
      console.log(index, row);
      this.request.get('/LocationController/deleteLocation', {
        params: {
          id: row.id
        }
      }).then(res => {
        console.log(res)
      })
    },
  }
}
</script>

<style scoped>

</style>
