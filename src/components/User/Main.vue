<template>

  <el-main>
    <el-descriptions class="des" :column="1" size="medium " border >
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          账号
        </template>
        <el-tooltip content="账号不可以修改">
          <div >
            {{ userForm.account }}
          </div>
        </el-tooltip>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          昵称
        </template>

        <el-tooltip content="点击即可修改用户名">
          <div>
            <el-link icon="el-icon-edit" @click="usernameChange = true">{{ userForm.username }}</el-link>
          </div>
        </el-tooltip>
        <!--        <el-button type="primary" icon="el-icon-edit" round></el-button>-->
      </el-descriptions-item>


      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-lock"></i>
          密码
        </template>
        <el-tooltip content="点击即可修改密码">
          <div>
            <el-link icon="el-icon-edit" @click="passwordChange = true">修改密码</el-link>
          </div>
        </el-tooltip>

        <!--        <el-button type="primary" icon="el-icon-edit"  round>修改密码</el-button>-->
      </el-descriptions-item>


      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          手机号
        </template>
        <el-tooltip content="点击即可修改手机号">
          <div>
            <el-link icon="el-icon-edit" @click="phoneChange = true">{{ userForm.phone }}</el-link>
          </div>
        </el-tooltip>

        <!--        <el-button type="primary" icon="el-icon-edit"  round>修改手机号</el-button>-->
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          IP属地
        </template>
        <el-tag effect="light">{{ ipJson.country }} ·
          {{ ipJson.province }} ·
          {{ ipJson.city }} ·
          {{ ipJson.area }}
        </el-tag>


      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-thumb"></i>
          信息更新时间
        </template>
        {{ userForm.updateTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-wind-power"></i>
          注册时间
        </template>
        {{ userForm.createTime }}
      </el-descriptions-item>
    </el-descriptions>
    <!--    username修改-->
    <el-dialog :visible.sync="usernameChange" title="用户名称修改" center width="50vh">
      <el-input v-model="userForm.username"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="usernameChange = false" round>取 消</el-button>
        <el-button type="primary" @click=" changeUserInfo" round @>确 定</el-button>
      </div>
    </el-dialog>
    <!--    密码修改-->
    <el-dialog :visible.sync="passwordChange" title="密码修改" width="50vh">
      <el-input v-model="passChange.oldPass" placeholder="旧密码" prefix-icon="el-icon-lock"
                oninput="value = userForm.password" show-password></el-input>
      <el-input v-model="passChange.newPass1" placeholder="新密码" prefix-icon="el-icon-lock" show-password></el-input>
      <el-input v-model="passChange.newPass2" placeholder="确认密码" prefix-icon="el-icon-lock" center
                show-password></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="passwordChange = false" round>取 消</el-button>
        <el-button type="primary" @click="changeUserInfo" round @>确 定</el-button>
      </div>
    </el-dialog>

    <!--    手机号修改-->
    <el-dialog :visible.sync="phoneChange" title="手机号修改" center width="50vh">
      <el-input v-model="userForm.phone" prefix-icon="el-icon-mobile-phone"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="phoneChange = false" round>取 消</el-button>
        <el-button type="primary" @click=" changeUserInfo" round @>确 定</el-button>
      </div>
    </el-dialog>

  </el-main>
</template>

<script>

export default {
  mounted() {
    this.request
        .get("sysController/info").then(res => {
      console.log("请求登录信息")
      console.log(res)
      this.userForm = res.data
      console.log(this.userForm)
    });
    //获取ip属地
    this.request.get("/ip/ip-address").then(res => {
      console.log(res)
      this.ip = res.data
    });
    this.request.get("https://ip.useragentinfo.com/json").then(res => {
      console.log(res)
      this.ipJson = res
    })
  },
  name: "Main",

  data() {
    // let validatePass = (rule,value,callback)=>{
    //     if (value === ''){
    //       callback(new Error("请输入密码"))
    //     }else {
    //       if (this.passChange.newPass1 !== ''){
    //         this.$refs.passChange.validateField('password1');
    //       }
    //       callback();
    //     }
    // };
    // let validatePass2 = (rule,value,callback)=>{
    //   if (value === ''){
    //     callback(new Error("请输入密码"))
    //   }else {
    //     if (this.passChange.newPass2 !== ''){
    //       this.$refs.passChange.validateField('password2');
    //     }
    //     callback();
    //   }
    // };
    return {

      infoChange: false,
      userForm: {},
      usernameChange: false,
      passwordChange: false,
      phoneChange: false,
      formLabelWidth: '120px',
      passChange: {
        oldPass: '',
        newPass1: '',
        newPass2: ''
      },
      ip: '',
      ipJson: '',

      // rules:{
      //   newPass1:[
      //     {
      //       required:true,message:'请输入密码',trigger:'blur'
      //     },
      //     { //长度校验
      //       min:6,max:16,message: '长度在6到16个字符',trigger:'blur'
      //     },
      //     {
      //       validator:validatePass,trigger: 'blur'
      //     }
      //   ],
      //   newPass2:[
      //     {
      //       required:true,message:'请输入密码',trigger:'blur'
      //     },
      //     { //长度校验
      //       min:6,max:16,message: '长度在6到16个字符',trigger:'blur'
      //     },
      //     {
      //       validator:validatePass2,trigger: 'blur'
      //     }
      //   ],
      //
      // },
    };
  },
  methods: {
    changeUserInfo() {
      let userId = this.userForm.userId;
      let account = this.userForm.account;
      let username = this.userForm.username;
      this.passChangeValidate()
      let password = this.userForm.password;
      console.log("密码为" + password)
      let phone = this.userForm.phone;
      let isDel = this.userForm.isDel;
      let role = this.userForm.role;
      let createTime = this.userForm.createTime;
      let updateTime = this.userForm.updateTime;
      this.request.post(this.$lc + "userController/updateUser", {
        userId, account, username, password, phone, isDel, role, createTime, updateTime
      }).then(res => {
        for (let resKey in res) {
          console.log("key = " + resKey);
        }
        if (res.code == "200") {
          //更新成功
          location.reload();
          window.alert(res.message)
        }
      })
      this.infoChange = false
    },
    passChangeValidate() {
      console.log(this.passChange.oldPass)
      console.log(this.passChange.newPass1)
      console.log(this.passChange.newPass2)
      if (this.passChange.oldPass !== '' && this.passChange.newPass1 !== null && this.passChange.newPass1 !== '' && this.passChange.newPass1 === this.passChange.newPass2) {
        this.userForm.password = this.passChange.newPass1
        console.log(this.userForm.password)
      }
    }
  }
}

</script>

<style scoped>
.des {
  width: 600px;
  margin: 100px auto;
}
</style>
