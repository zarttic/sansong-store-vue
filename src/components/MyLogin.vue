<template>
  <div id="myLogin">
    <el-dialog title="登录" width="300px" center :visible.sync="isLogin">
      <el-form :model="LoginAccount" :rules="rules" status-icon ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="account">
          <el-input prefix-icon="el-icon-user-solid" placeholder="请输入账号" v-model="LoginAccount.account"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-view"
            type="password"
            placeholder="请输入密码"
            v-model="LoginAccount.password"
          ></el-input>
        </el-form-item>
        验证码
        <el-form-item >
            <el-image
                style="position: absolute; width: 60px; height: 40px; "
                :src="url"
                @click="url='http://localhost:9001/sysController/getVerifyCodeImage'+'?time='+Math.random()">
            </el-image>
          <el-input prefix-icon="el-icon-lock" type="text" v-model="LoginAccount.verifyCode" style="margin-left: 60px; height: 40px; width: 190px;">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="primary" @click="Login" style="width:100%;">登录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script href="<%= BASE_URL %>js/md5.js" rel="external nofollow" ></script>
<script>
import { mapActions } from "vuex";

export default {
  name: "MyLogin",
  data() {
    // 用户名的校验方法
    let validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入用户名"));
      }
      // 用户名以字母开头,长度在5-16之间,允许字母数字下划线
      const userNameRule = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
      if (userNameRule.test(value)) {
        this.$refs.ruleForm.validateField("checkPass");
        return callback();
      } else {
        return callback(new Error("字母开头,长度5-16之间,允许字母数字下划线"));
      }
    };
    // 密码的校验方法
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入密码"));
      }
      // 密码以字母开头,长度在5-18之间,允许字母数字和下划线
      const passwordRule = /^[a-zA-Z]\w{4,17}$/;
      if (passwordRule.test(value)) {
        this.$refs.ruleForm.validateField("checkPass");
        return callback();
      } else {
        return callback(
          new Error("字母开头,长度5-18之间,允许字母数字和下划线")
        );
      }
    };
    return {
      LoginAccount: {
        account: "",
        password: "",
        verifyCode: "",
      },
      url: "http://localhost:9001/sysController/getVerifyCodeImage",



      // 用户信息校验规则,validator(校验方法),trigger(触发方式),blur为在组件 Input 失去焦点时触发
      rules: {
        account: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  computed: {
    // 获取vuex中的showLogin，控制登录组件是否显示
    isLogin: {
      get() {
        return this.$store.getters.getShowLogin;
      },
      set(val) {
        this.$refs["ruleForm"].resetFields();
        this.setShowLogin(val);
      }
    }
  },
  methods: {
    ...mapActions(["setAccount", "setShowLogin","setUserId"]),
    Login() {
      // 通过element自定义表单校验规则，校验用户输入的用户信息
      this.$refs["ruleForm"].validate(valid => {
        //如果通过校验开始登录
        if (valid) {
          console.log("通过验证")
          this.request
            .post("sysController/login", {
              account: this.LoginAccount.account,
              password: this.LoginAccount.password,
              verifyCode: this.LoginAccount.verifyCode
            })
            .then(res => {
              // 200代表登录成功，其他的均为失败
              if (res.code === 200) {
                // 隐藏登录组件
                this.isLogin = false;
                //保存token
                localStorage.setItem("token",res.data);
                //请求一个info
                this.request
                    .get("sysController/info",)
                    .then(function (res){
                      // 登录信息存到本地
                      let account1 = JSON.stringify(res.data.account);
                      console.log(account1)
                      localStorage.setItem("account",account1);
                      // 登录信息存到vuex
                      let id1 = JSON.parse(res.data.userId);
                      localStorage.setItem("userId",id1);

                      let role1=JSON.parse(res.data.role);
                      localStorage.setItem("role",role1);
                    })

                // 弹出通知框提示登录成功信息
                this.notifySucceed(res.message);
                location.reload();
              } else {
                // 清空输入框的校验状态
                this.$refs["ruleForm"].resetFields();
                // 弹出通知框提示登录失败信息
                this.notifyError(res.message);
              }
            })
            .catch(err => {
              return Promise.reject(err);
            });
        } else {
          this.$notify.error("未通过valid验证")
          return false;
        }
      });
    }
  }
};
</script>
<style>
</style>
