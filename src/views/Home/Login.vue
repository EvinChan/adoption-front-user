<template>
    <div>
        <MyHeader/>
        <div class="bg">
            <div class="loginFormWrap">
                <div class="content">
                    <div class="headerWrap">
                        <div class="loginHeader">
                            <div>用户登录</div>
                        </div>
                        <div class="loginContent">
                            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="80px">
                                <el-form-item label="账号" prop="mobile">
                                    <el-input v-model="loginForm.mobile"
                                              placeholder="请输入手机号"
                                              auto-complete="off"
                                              prefix-icon="el-icon-phone"
                                              maxlength="11"
                                    />
                                </el-form-item>
                                <el-form-item label="密码" prop="pwd">
                                    <el-input v-model="loginForm.pwd"
                                              placeholder="请输入密码"
                                              auto-complete="off"
                                              show-password
                                              prefix-icon="el-icon-lock"
                                              maxlength="20"
                                    />
                                </el-form-item>
                                <el-button class="loginbtn" type="primary" @click.native.prevent="handleLogin">
                                    登录
                                </el-button>
                                <div class="tips">
                                    <span style="float:right;">
                                        <a href="/forgotPassword">忘记密码</a>
                                        <span style="margin: 0 10px;color: #b4a078;">|</span>
                                        <a href="/register">新用户注册</a>
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
  import {validMobile, validPwd} from '@/utils/validate'

  export default {
    name: "login",
    components: {
      MyHeader,
      MyFooter
    },
    data() {
      const validateMobile = (rule, value, callback) => {
        if (!validMobile(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      }
      const validatePwd = (rule, value, callback) => {
        if (!validPwd(value)) {
          callback(new Error("请输入6-20位包含数字、字母的密码，区分大小写"));
        } else {
          callback();
        }
      }
      return {
        loginForm: {
          mobile: '',
          pwd: ''
        },
        loginRules: {
          mobile: [{required: true, trigger: 'blur', validator: validateMobile}],
          pwd: [{required: true, trigger: 'blur', validator: validatePwd}]
        },
        redirect: undefined,
        loading: false,  // 按钮是否加载中状态
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect
        },
        // 是否立即执行handler函数
        immediate: true
      }
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/login', this.$qs.stringify(this.loginForm))
              .then(() => {
                this.$router.push({path: this.redirect || '/'})
                this.loading = false
                this.$message.success('登录成功!')
              }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
    .bg {
        width: 100%;
        height: 400px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;


        .loginFormWrap {
            width: 440px;
            margin-right: auto;
            margin-left: auto;

            .content {
                .headerWrap {
                    position: relative;
                    padding: 70px 20px;

                    .loginHeader {
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

                    .loginContent {
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

                        .loginbtn {
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
</style>

