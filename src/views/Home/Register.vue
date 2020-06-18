<template>
    <div>
        <MyHeader/>
        <div class="bg">
            <div class="registerFormWrap">
                <div class="content">
                    <div class="headerWrap">
                        <div class="registerHeader">
                            <div>用户注册</div>
                        </div>
                        <div class="registerContent">
                            <el-form ref="registerForm" :model="registerForm" :rules="registerRules" label-width="80px">
                                <el-form-item label="账号" prop="mobile">
                                    <el-input v-model="registerForm.mobile"
                                              placeholder="请输入手机号"
                                              auto-complete="off"
                                              prefix-icon="el-icon-phone"
                                              maxlength="11"/>
                                </el-form-item>
                                <el-form-item label="验证码" prop="verificationCode">
                                    <el-input v-model="registerForm.verificationCode"
                                              placeholder="请输入验证码"
                                              auto-complete="off"
                                              prefix-icon="el-icon-key"
                                              maxlength="6"
                                              style="width: 165px; padding-right: 10px"/>
                                    <el-button type="primary"
                                               class="verificationbtn"
                                               :disabled="disabled=!show"
                                               @click="sendVerification">
                                        <span v-show="show">发送验证码</span>
                                        <span v-show="!show" class="count">{{ count + `秒可再次发送`}}</span>
                                    </el-button>
                                </el-form-item>
                                <el-form-item label="密码" prop="pwd">
                                    <el-input v-model="registerForm.pwd"
                                              placeholder="请输入密码"
                                              auto-complete="off"
                                              show-password
                                              prefix-icon="el-icon-lock"
                                              maxlength="20"/>
                                </el-form-item>
                                <el-form-item label="确认密码" prop="repeatPwd">
                                    <el-input v-model="registerForm.repeatPwd"
                                              placeholder="请再次输入密码"
                                              auto-complete="off"
                                              show-password
                                              prefix-icon="el-icon-lock"
                                              maxlength="20"/>
                                </el-form-item>
                                <el-form-item label="昵称" prop="name">
                                    <el-input v-model="registerForm.name"
                                              placeholder="请输入昵称"
                                              auto-complete="off"
                                              prefix-icon="el-icon-user"
                                              maxlength="20"/>
                                </el-form-item>
                                <el-form-item label="性别" prop="sex">
                                    <el-radio-group v-model="registerForm.sex">
                                        <el-radio :label="0">男</el-radio>
                                        <el-radio :label="1">女</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-button class="registerbtn" type="primary" @click.native.prevent="handleRegister">
                                    注册
                                </el-button>
                                <div class="tips">
                                    <span>
                                        已有账号，<a href="/login">登录</a>
                                    </span>
                                    <span style="float: right">
                                        注册即代表您已阅读并同意《<a href="/notice?id=6" target="_blank">领养准则</a>》
                                    </span>
                                </div>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <MyFooter/>
    </div>
</template>

<script>
  import MyHeader from "@/components/MyHeader/MyHeader.vue";
  import MyFooter from "@/components/MyFooter/MyFooter.vue";
  import {validMobile, validVerificationCode, validPwd} from '@/utils/validate'
  import {checkMobileFalse, getUserSms, checkCode, register} from '@/api/user'

  const TIME_COUNT = 60; //更改倒计时时间

  export default {
    components: {
      MyHeader,
      MyFooter
    },
    name: "register",
    data() {
      const validateMobile = (rule, value, callback) => {
        if (!validMobile(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback()
        }
      }
      const validateVerificationCode = (rule, value, callback) => {
        if (!validVerificationCode(value)) {
          callback(new Error("请输入正确的验证码"));
        } else {
          callback()
        }
      }
      const validatePwd = (rule, value, callback) => {
        if (!validPwd(value)) {
          callback(new Error("请输入6-20位包含数字、字母的密码，区分大小写"));
        } else {
          callback();
        }
      }
      const validateRepeatPwd = (rule, value, callback) => {
        if (!validPwd(value)) {
          callback(new Error("请输入6-20位包含数字、字母的密码，区分大小写"));
        } else if (value !== this.registerForm.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
      return {
        show: true,  // 初始启用按钮
        count: '',   // 初始化次数
        timer: null,
        registerForm: {
          mobile: '',
          verificationCode: '',
          pwd: '',
          repeatPwd: '',
          name: '',
          sex: '',
        },
        registerRules: {
          mobile: [{required: true, trigger: 'blur', validator: validateMobile}],
          verificationCode: [{required: true, trigger: 'blur', validator: validateVerificationCode}],
          pwd: [{required: true, trigger: 'blur', validator: validatePwd}],
          repeatPwd: [{required: true, trigger: 'blur', validator: validateRepeatPwd}],
          name: [{required: true, trigger: 'blur', message: '请填写昵称'}],
          sex: [{required: true, message: '请选择性别'}]
        }
      }
    },
    methods: {
      sendVerification() {
        if (!validMobile(this.registerForm.mobile)) {
          this.$message.error("请输入正确的手机号")
          return false
        } else {
          checkMobileFalse(this.registerForm.mobile).then(result => {
            if (result.code === 200) {
              getUserSms(this.registerForm.mobile).then(result => {
                if (result.code === 200) {
                  this.$message.success("发送验证码成功")
                  // 计时器
                  if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                      if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                      } else {
                        this.show = true;
                        clearInterval(this.timer);  // 清除定时器
                        this.timer = null;
                      }
                    }, 1000)
                  }
                }
              })
            }
          })
        }
      },
      handleRegister() {
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            checkCode(this.registerForm.mobile, this.registerForm.verificationCode).then(result => {
              if (result.code === 200) {
                register(this.registerForm).then(result => {
                  if (result.code === 200) {
                    this.$router.push({path: '/login'})
                    this.$message.success('注册成功')
                  }
                })
              } else {
                return false
              }
            })
          }
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
    .bg {
        width: 100%;
        height: 570px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;

        .registerFormWrap {
            width: 400px;
            height: 100%;
            margin-right: auto;
            margin-left: auto;

            .content {
                .headerWrap {
                    position: relative;
                    overflow: hidden;
                    padding: 20px 0;

                    .registerHeader {
                        position: relative;
                        padding: 10px 0 10px;
                        font-size: 18px;
                        color: #606266;
                        letter-spacing: 0;
                        line-height: 18px;
                        width: 400px;
                        overflow: hidden;
                        text-align: center;
                    }

                    .registerContent {
                        padding-top: 20px;
                        width: 400px;
                        background-color: #fff;

                        .tips {
                            font-size: 14px;
                            color: #606266;
                            margin: 15px 0;

                            a {
                                color: #b4a078;
                            }
                        }

                        .verificationbtn {
                            color: #fff;
                            border-color: #b4a078;
                            background: #b4a078;
                            font-size: 14px;
                            width: 142px;
                        }

                        .registerbtn {
                            width: 100%;
                            color: #fff;
                            border-color: #b4a078;
                            background: #b4a078;
                            font-size: 16px;
                        }
                    }
                }
            }
        }
    }

    /*普通输入框*/
    .el-input {
        .el-input__inner:focus {
            border-color: #b4a078;
        }
    }

    /*单选框*/
    .el-radio-group {
        .el-radio__input.is-checked .el-radio__inner {
            border-color: #b4a078;
            background: #b4a078;
        }

        .el-radio__input .el-radio__inner {
            &:hover {
                border: 1px solid #b4a078;
            }
        }

        .el-radio__input.is-checked + .el-radio__label {
            color: #b4a078;
        }
    }
</style>

