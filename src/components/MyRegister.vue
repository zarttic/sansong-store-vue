<!--
 * @Description: 用户注册组件
 -->
<template>
  <div id="register">
    <el-dialog title="注册" width="300px" center :visible.sync="isRegister">
      <el-form
        :model="RegisterUser"
        :rules="rules"
        status-icon
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="account">
          <el-input
            prefix-icon="el-icon-user-solid"
            placeholder="请输入账号"
            v-model="RegisterUser.account"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-view"
            type="password"
            placeholder="请输入密码"
            v-model="RegisterUser.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="confirmPass">
          <el-input
            prefix-icon="el-icon-view"
            type="password"
            placeholder="请再次输入密码"
            v-model="RegisterUser.confirmPass"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="primary" @click="Register" style="width:100%;">注册</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "MyRegister",
  props: ["register"],
  data() {
    // 账户的校验方法
    let validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入用户名"));
      }
      // 账户名account以字母开头,长度在4-16之间,允许字母数字下划线  !后续修改校验长度
     const accountRule = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
      if(accountRule.test(value)){
        this.$refs.ruleForm.validateField("checkPass");
        return callback();
      }else{
        return callback(
            new Error("字母开头,长度5-16之间,允许字母数字下划线")
        )
      }
    };
    // 密码的校验方法
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入密码"));
      }
      // 密码以字母开头,长度在6-18之间,允许字母数字和下划线  !后续修改校验长度
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
    // 确认密码的校验方法
    let validateConfirmPass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入确认密码"));
      }
      // 校验是否以密码一致
      if (this.RegisterUser.password !== "" && value === this.RegisterUser.password) {
        this.$refs.ruleForm.validateField("checkPass");
        return callback();
      } else {
        return callback(new Error("两次输入的密码不一致"));
      }
    };
    return {
      isRegister: false, // 控制注册组件是否显示
      RegisterUser: {
        account: "",
        password: "",
        confirmPass: ""
      },
      // 用户信息校验规则,validator(校验方法),trigger(触发方式),blur为在组件 Input 失去焦点时触发
      rules: {
        account: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        confirmPass: [{ validator: validateConfirmPass, trigger: "blur" }]
      }
    };
  },
  watch: {
    // 监听父组件传过来的register变量，设置this.isRegister的值
    register: function(val) {
      if (val) {
        this.isRegister = val;
      }
    },
    // 监听this.isRegister变量的值，更新父组件register变量的值
    isRegister: function(val) {
      if (!val) {
        this.$refs["ruleForm"].resetFields();
        this.$emit("fromChild", val);
      }
    }
  },
  methods: {
    Register() {
      // 通过element自定义表单校验规则，校验用户输入的用户信息
      this.$refs["ruleForm"].validate(valid => {
        //如果通过校验开始注册
        if (valid) {
          this.request
              .post(this.$lc +"sysController/register", {
                account: this.RegisterUser.account,
                password: this.RegisterUser.password,

              })
              .then(res => {
                // “200”代表注册成功，其他的均为失败
                if (res.code === 200) {
                  // 隐藏注册组件
                  this.isRegister = false;
                  // 弹出通知框提示注册成功信息
                  this.notifySucceed(res.message);
                } else {
                  // 弹出通知框提示注册失败信息
                  this.notifyError(res.message);
                }
              })
              .catch(err => {
                return Promise.reject(err);
              });
        } else {
          this.notifyError("校验失败,请输入合法账户和密码！")
          return false;
        }
      });


    }
  }
};
</script>
<style>
</style>
