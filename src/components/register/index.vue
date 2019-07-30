<template>
    <div>
        <MyHeader :title="'注册'"></MyHeader>
        <div style="margin: auto;width: 50px;">
            <el-avatar size="large" icon="el-icon-user-solid" style="margin-top: 50px"></el-avatar>
        </div>
        <div class="login_content">
            <el-form ref="registerForm" :model="registerForm" :rules="registerRules">
                <el-form-item prop="phoneNumber">
                    <el-input placeholder="请输入手机号码" v-model="registerForm.phoneNumber" clearable>
                        <i class="el-input__icon el-icon-phone" slot="prefix"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="name">
                    <el-input placeholder="请输入姓名" v-model="registerForm.name" clearable>
                        <i class="el-input__icon el-icon-user" slot="prefix"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="carLicense">
                    <el-input placeholder="请输入车牌号" v-model="registerForm.carLicense" clearable>
                        <i class="el-input__icon el-icon-truck" slot="prefix"></i>
                    </el-input>
                </el-form-item>
                <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                    <el-form-item prop="password">
                        <el-input
                                prefix-icon="el-icon-unlock"
                                placeholder="请输入密码"
                                v-model="registerForm.password"
                                show-password
                                @keyup.native="checkCapslock"
                                @blur="capsTooltip = false"
                        ></el-input>
                    </el-form-item>
                </el-tooltip>
                <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                    <el-form-item prop="confirmPassword">
                        <el-input
                                prefix-icon="el-icon-lock"
                                placeholder="确认密码"
                                v-model="registerForm.confirmPassword"
                                show-password
                                @keyup.native="checkCapslock"
                                @blur="capsTooltip = false"
                        ></el-input>
                    </el-form-item>
                </el-tooltip>
                <el-form-item>
                    <el-button
                            style="width:100%;margin-top:16px;"
                            @click.native.prevent="resetRegisterForm"
                    >重置
                    </el-button>
                    <el-button
                            :loading="loading"
                            type="primary"
                            style="width:100%;margin-top:16px;margin-left: 0px"
                            @click.native.prevent="handleRegister"
                    >注册用户
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
  import MyHeader from "@/components/MyHeader/index";
  import {userRegister} from "../../api/register";
  import {validateChineseName, validatePhoneNumber, validateVehicleNumber} from "../../utils/validate";

  export default {
    name: "register",
    components: {
      MyHeader
    },
    data() {
      const validateUserName = (rule, value, callback) => {
        if (!value) {
          callback(new Error("手机号码不能为空"));
        } else if (!validatePhoneNumber(value)) {
          callback(new Error("请输入正确的手机号码"));
        } else {
          callback();
        }
      };
      const validateCarLicense = (rule, value, callback) => {
        if (!value) {
          callback(new Error("车牌号不能为空"));
        } else if (!validateVehicleNumber(value)) {
          callback(new Error("请输入正确的车牌号"));
        } else {
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length < 6) {
          callback(new Error("密码长度不能小于6位"));
        } else {
          if (this.registerForm.confirmPassword !== '') {
            this.$refs.registerForm.validateField('checkPass');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      const validateName = (rule, value, callback) => {
        if (!value) {
          callback(new Error("姓名不能为空"));
        } else if (!validateChineseName(value)) {
          callback(new Error('请输入正确的姓名'));
        } else {
          callback();
        }
      };
      return {
        url: require("@/assets/logo.png"),
        registerForm: {
          phoneNumber: "",
          name: "",
          carLicense: "",
          password: "",
          confirmPassword: "",
        },
        registerRules: {
          phoneNumber: [
            {required: true, trigger: "blur", validator: validateUserName}
          ],
          password: [
            {trigger: "blur", validator: validatePass}
          ],
          confirmPassword: [
            {trigger: "blur", validator: validatePass2}
          ],
          carLicense: [
            {required: true, trigger: 'blur', validator: validateCarLicense}
          ],
          name: [
            {required: true, trigger: 'blur', validator: validateName}
          ],
        },
        passwordType: "password",
        capsTooltip: false,
        loading: false
      }
    },
    methods: {
      checkCapslock({shiftKey, key} = {}) {
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
      handleRegister() {
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            this.loading = true;
            userRegister(this.registerForm).then(() => {
              this.$router.push("/login");
              this.loading = false;
            }).catch((err) => {
              this.loading = false;
              this.$message.error(err.response.data);
            });
          } else {
            return false;
          }
        });
      },
      resetRegisterForm() {
        this.$refs['registerForm'].resetFields();
      }
    }
  }
</script>

<style scoped>
</style>