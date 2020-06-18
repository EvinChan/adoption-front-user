<template>
    <div>
        <MyHeader/>
        <div class="mobileBox">
            <div class="row">
                <!-- 面包屑 -->
                <div class="crumbs">
                    <router-link to="/">首页</router-link>
                    <div class="icon icon-right_s"></div>
                    <span class="">修改账号</span>
                </div>
                <div class="content">
                    <!-- 侧栏 -->
                    <UserSide/>
                    <!-- 内容 -->
                    <div class="main">
                        <div class="mobileInfo">
                            <div class="assets">
                                <el-steps
                                        :active="active"
                                        finish-status="success"
                                        align-center
                                        style="padding: 20px 0;">
                                    <el-step title="验证身份"></el-step>
                                    <el-step title="修改账号"></el-step>
                                </el-steps>
                                <div style="padding: 20px 215px 0 215px;">
                                    <el-form ref="mobileForm"
                                             :model="mobileForm"
                                             :rules="mobileRules"
                                             label-width="100px">
                                        <el-form-item label="新账号" prop="mobile">
                                            <el-input v-model="mobileForm.mobile"
                                                      placeholder="请输入手机号"
                                                      auto-complete="off"
                                                      maxlength="11"/>
                                        </el-form-item>
                                        <el-form-item label="验证码" prop="verificationCode">
                                            <el-input v-model="mobileForm.verificationCode"
                                                      placeholder="请输入验证码"
                                                      auto-complete="off"
                                                      maxlength="6"
                                                      style="width: 145px; padding-right: 10px"/>
                                            <el-button type="primary"
                                                       class="verificationBtn"
                                                       :disabled="disabled=!show"
                                                       @click.native.prevent="sendVerification">
                                                <span v-show="show">发送验证码</span>
                                                <span v-show="!show" class="count">{{ count + `秒可再次发送`}}</span>
                                            </el-button>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button class="updateBtn"
                                                       type="primary"
                                                       @click.native.prevent="handleUpdate">
                                                确认修改
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <MyFooter/>
    </div>
</template>

<script>
  import MyHeader from '@/components/MyHeader/MyHeader';
  import MyFooter from '@/components/MyFooter/MyFooter';
  import UserSide from '@/components/UserSide/UserSide';
  import {validMobile, validVerificationCode} from '@/utils/validate';
  import {checkCode, checkMobileFalse, getUserSms, updateUserMobile} from '@/api/user';

  const TIME_COUNT = 60; //更改倒计时时间

  export default {
    components: {
      MyHeader,
      MyFooter,
      UserSide
    },
    name: "mobileSet",
    data() {
      const validateMobile = (rule, value, callback) => {
        if (!validMobile(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      }
      const validateVerificationCode = (rule, value, callback) => {
        if (!validVerificationCode(value)) {
          callback(new Error("请输入正确的验证码"));
        } else {
          callback()
        }
      }
      return {
        show: true,  // 初始启用按钮
        count: '',   // 初始化次数
        timer: null,
        mobileForm: {
          mobile: '',
          verificationCode: ''
        },
        mobileRules: {
          mobile: [{required: true, trigger: 'blur', validator: validateMobile}],
          verificationCode: [{required: true, trigger: 'blur', validator: validateVerificationCode}]
        },
        active: 1
      }
    },
    methods: {
      sendVerification() {
        if (!validMobile(this.mobileForm.mobile)) {
          this.$message.error("请输入正确的手机号")
          return false
        } else {
          checkMobileFalse(this.mobileForm.mobile).then(result => {
            if (result.code === 200) {
              getUserSms(this.mobileForm.mobile).then(result => {
                if (result.code === 200) {
                  this.$message.success("验证码发送成功")
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
      handleUpdate() {
        this.$refs.mobileForm.validate(valid => {
          if (valid) {
            checkCode(this.mobileForm.mobile, this.mobileForm.verificationCode).then(result => {
              if (result.code === 200) {
                updateUserMobile(this.mobileForm).then(result => {
                  if (result.code === 200) {
                    this.$message.success('修改成功')
                    this.$store.dispatch('user/logout').then(() => {
                      this.$router.push({path: '/login'})
                      window.location.reload()
                    }).catch(() => {})
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
  }
</script>

<style lang="scss" scoped>
    .mobileBox {
        .content {
            display: flex;

            .main {
                position: relative;
                width: 890px;
                margin-left: 20px;
                overflow: hidden;
                z-index: 1;

                .mobileInfo {
                    display: flex;
                    border: 1px solid #eaeaea;
                    font-size: 14px;

                    .assets {
                        width: 100%;
                        padding: 30px;
                        line-height: 22px;
                        overflow: hidden;

                        .verificationBtn {
                            color: #fff;
                            border-color: #b4a078;
                            background: #b4a078;
                            font-size: 14px;
                            width: 142px;
                        }

                        .updateBtn {
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
</style>
