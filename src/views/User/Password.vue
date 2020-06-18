<template>
    <div>
        <MyHeader/>
        <div class="passwordBox">
            <div class="row">
                <!-- 面包屑 -->
                <div class="crumbs">
                    <router-link to="/">首页</router-link>
                    <div class="icon icon-right_s"></div>
                    <span class="">修改密码</span>
                </div>
                <div class="content">
                    <!-- 侧栏 -->
                    <UserSide/>
                    <!-- 内容 -->
                    <div class="main">
                        <div class="passwordInfo">
                            <div class="assets">
                                <el-form ref="passwordForm" :model="passwordForm" :rules="passwordRules"
                                         label-width="100px">
                                    <el-form-item label="原密码" prop="oldPwd">
                                        <el-input v-model="passwordForm.oldPwd"
                                                  placeholder="请输入原密码"
                                                  auto-complete="off"
                                                  show-password
                                                  maxlength="20"
                                        />
                                    </el-form-item>
                                    <el-form-item label="新密码" prop="pwd">
                                        <el-input v-model="passwordForm.pwd"
                                                  placeholder="请输入新密码"
                                                  auto-complete="off"
                                                  show-password
                                                  maxlength="20"
                                        />
                                    </el-form-item>
                                    <el-form-item label="确认新密码" prop="repeatPwd">
                                        <el-input v-model="passwordForm.repeatPwd"
                                                  placeholder="请再次输入新密码"
                                                  auto-complete="off"
                                                  show-password
                                                  maxlength="20"
                                        />
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button class="updatebtn" type="primary"
                                                   @click.native.prevent="handleUpdate">确认修改
                                        </el-button>
                                    </el-form-item>
                                </el-form>
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
  import MyHeader from "@/components/MyHeader/MyHeader.vue";
  import MyFooter from "@/components/MyFooter/MyFooter.vue";
  import UserSide from "@/components/UserSide/UserSide.vue";
  import { validPwd } from '@/utils/validate';
  import { updateUserPwd } from '@/api/user';

  export default {
    components: {
      MyHeader,
      MyFooter,
      UserSide
    },
    name: "password",
    data() {
      const validateOldPwd = (rule, value, callback) => {
        if (!validPwd(value)) {
          callback(new Error("请输入6-20位包含数字、字母的密码，区分大小写"));
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
      const validateRepeatPwd = (rule, value, callback) => {
        if (!validPwd(value)) {
          callback(new Error("请输入6-20位包含数字、字母的密码，区分大小写"));
        } else if (value !== this.passwordForm.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
      return {
        passwordForm: {
          oldPwd: '',
          pwd: '',
          repeatPwd: ''
        },
        passwordRules: {
          oldPwd: [{required: true, trigger: 'blur', validator: validateOldPwd}],
          pwd: [{required: true, trigger: 'blur', validator: validatePwd}],
          repeatPwd: [{required: true, trigger: 'blur', validator: validateRepeatPwd}]
        }
      }
    },
    methods: {
      handleUpdate() {
        this.$refs.passwordForm.validate(valid => {
          if (valid) {
            updateUserPwd(this.passwordForm).then(result => {
              if(result.code === 200) {
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
    }
  }
</script>

<style lang="scss" scoped>
    .passwordBox {

        .content {
            display: flex;

            .main {
                position: relative;
                width: 890px;
                margin-left: 20px;
                overflow: hidden;
                z-index: 1;

                .passwordInfo {
                    display: flex;
                    border: 1px solid #eaeaea;
                    font-size: 14px;

                    .assets {
                        width: 400px;
                        padding: 52px 240px 30px 240px;
                        line-height: 22px;
                        overflow: hidden;

                        .updatebtn {
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
