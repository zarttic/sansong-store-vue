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
            <el-link icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-link>

          <el-popover
              placement="top-start"
              title="删除地址"
              width="200"
              trigger="hover"
              content="点击删除此地址">
            <el-link slot="reference" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)"
                     style="padding-left: 10px">删除
            </el-link>
          </el-popover>

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
      <el-form label-width="100px" size="small">
        <el-form-item label="收货人姓名">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-cascader
              size="large"
              :options="options"
              v-model="selectedOptions"
              @change="handleChange" style="width: 300px">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="form.location" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="form.tabs" autocomplete="off"></el-input>
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
const {regionData, CodeToText} = require('element-china-area-data/dist/app.commonjs')

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
      dialogShow: false,//修改新增对话框
      loading: true,//加载动画 加载完成后自动关闭
      options: regionData,
      selectedOptions: [],//地址选择器
      visible: false,//删除框
    }
  },
  methods: {
    //地址选择器
    handleChange(value) {
      console.log(value)
    },
    //新增地址
    addLocation() {
      this.dialogShow = true;
    },
    //编辑打开对话框
    handleEdit(index, row) {
      console.log(index, row);
      this.form = row
      this.dialogShow = true
    },
    save() {
      console.log(this.selectedOptions)
      let str = '';
      for (let i = 0; i < 3; i++) {
        str += CodeToText[this.selectedOptions[i]]
      }
      this.request.post('/LocationController/updateLocation', {
        "id": this.form.id,
        "userId": this.$store.getters.getUserId,
        "username": this.form.username,
        "phone": this.form.phone,
        "location": str + this.form.location,
        "tabs": this.form.tabs,
      }).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$notify.success(res.message)
        }
        this.dialogShow = false;
        //刷新
        window.location.reload();

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
        if (res.code == 200) {
          this.$notify.success(res.message)
        }
        this.visible = false;
        window.location.reload();
      })
    },
  }
}
</script>

<style scoped>

</style>
