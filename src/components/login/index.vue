<template>
  <div class="login_all">
    <MyHeader :title="'登录'"></MyHeader>
    <div class="logo">
      <el-image style="width: 100px; height: 100px" :src="url"></el-image>
    </div>
    <div class="login_content">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
        <el-form-item prop="username">
          <el-input placeholder="请输入手机号码" v-model="loginForm.phoneNumber" clearable>
            <i class="el-input__icon el-icon-user" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
              v-model="loginForm.password"
              show-password
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
            ></el-input>
          </el-form-item>
        </el-tooltip>
        <el-form-item label="用户类型" prop="role">
          <el-radio-group v-model="loginForm.role">
            <el-radio label="clerk">停车员</el-radio>
            <el-radio label="user">普通用户</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;margin-top:16px;margin-left: 0px"
          @click.native.prevent="handleLogin"
          size="small"
        >登录</el-button>
        <el-button
          style="width:100%;margin-top:16px;margin-left: 0px"
          @click.native.prevent="addUser"
          size="small"
        >普通用户注册</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader/index";
import { appLogin } from "@/api/login";
import {validatePhoneNumber} from "../../utils/validate";

export default {
  name: "login",
  components: {
    MyHeader
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("手机号码不能为空"));
      } else if (!validatePhoneNumber(value)) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码长度不能小于6位"));
      } else {
        callback();
      }
    };
    return {
      url: require("@/assets/parkCar.svg"),
      loginForm: {
        phoneNumber: "",
        password: "",
        role: ""
      },
      loginRules: {
        phoneNumber: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ],
        role: [
          { required: true, message: '请选择用户类型', trigger: 'change' }
        ],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false
    };
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && (key >= "a" && key <= "z")) ||
          (!shiftKey && (key >= "A" && key <= "Z"))
        ) {
          this.capsTooltip = true;
        } else {
          this.capsTooltip = false;
        }
      }
      if (key === "CapsLock" && this.capsTooltip === true) {
        this.capsTooltip = false;
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          appLogin(this.loginForm).then((res)=>{
            localStorage.setItem("token", res.data.token);
            if (this.loginForm.role == 'user') {
              this.$router.push("/parkCar");
            }else {
              this.$router.push("/grabOrder");
            }
            this.loading = false;
          }).catch((err) => {
            this.loading=false;
            this.$message.error(err.response.data);
          });
        } else {
          return false;
        }
      });
    },
    addUser() {
      this.$router.push("register");
    }
  }
};
</script>

<style scoped>
.login_content {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
.login_all {
  margin-top: 100px;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>