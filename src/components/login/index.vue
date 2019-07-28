<template>
  <div class="login_all">
    <Header :title="'登录'"></Header>
    <div class="logo">
      <el-image style="width: 100px; height: 100px" :src="url"></el-image>
    </div>
    <div class="login_content">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
        <el-form-item prop="username">
          <el-input placeholder="请输入手机号码" v-model="loginForm.username" clearable>
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
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;margin-top:16px;margin-bottom:30px;"
          @click.native.prevent="handleLogin"
          size="small"
        >Login</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/index";

export default {
  name: "login",
  components: {
    Header
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      url: require("@/assets/logo.png"),
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
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
          this.$router.push("/")
          // this.$store
          //   .dispatch("user/login", this.loginForm)
          //   .then(() => {
          //     this.$router.push({
          //       path: this.redirect || "/",
          //       query: this.otherQuery
          //     });
          //     this.loading = false;
          //   })
          //   .catch(() => {
          //     this.loading = false;
          //   });
        } else {
          return false;
        }
      });
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