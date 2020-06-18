<template>
    <div>
        <MyHeader/>
        <div class="userBox">
            <div class="row">
                <!-- 面包屑 -->
                <div class="crumbs">
                    <router-link to="/">首页</router-link>
                    <div class="icon icon-right_s"></div>
                    <span class="">实名认证</span>
                </div>
                <div class="content">
                    <!-- 侧栏 -->
                    <UserSide/>
                    <!-- 内容 -->
                    <div class="main">
                        <div class="userInfo">
                            <div class="text">
                                <i class="el-icon-warning-outline"></i>
                                <span> 注意事项</span>
                                <p>1.每个证件只能绑定一个账号。</p>
                                <p>2.您提供的证件信息将受到严格保护,仅用于身份验证,未经本人许可不会用于其他用途。</p>
                                <p>3.除原证件无效（如：改名、移民）等特殊情况外，实名认证审核通过后将不能修改。</p>
                            </div>
                            <div class="assets">
                                <el-form ref="userForm" :model="userForm" :rules="userRules" label-width="80px">
                                    <el-form-item label="真实姓名" prop="realName">
                                        <el-input v-model="userForm.realName"
                                                  placeholder="请输入真实姓名"
                                                  auto-complete="off"
                                                  maxlength="6"
                                        />
                                    </el-form-item>
                                    <el-form-item label="身份证号" prop="idcard">
                                        <el-input v-model="userForm.idcard"
                                                  placeholder="请输入身份证号"
                                                  auto-complete="off"
                                                  maxlength="18"
                                        />
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button class="updatebtn" type="primary"
                                                   @click.native.prevent="handleUpdate">提交认证
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
  import {validRealName, validIdcard} from '@/utils/validate';
  import {getUserReal, createVerification} from '@/api/user';

  export default {
    components: {
      MyHeader,
      MyFooter,
      UserSide
    },
    name: "userVerification",
    data() {
      const validateRealName = (rule, value, callback) => {
        if (!validRealName(value)) {
          callback(new Error("请输入正确的姓名"));
        } else {
          callback();
        }
      }
      const validateIdcard = (rule, value, callback) => {
        if (!validIdcard(value)) {
          callback(new Error("请输入正确的身份证号"));
        } else {
          callback();
        }
      }
      return {
        userForm: {
          realName: '',
          idcard: ''
        },
        userRules: {
          realName: [{required: true, trigger: 'blur', validator: validateRealName}],
          idcard: [{required: true, trigger: 'blur', validator: validateIdcard}]
        }
      }
    },
    created() {
      this.getUserList()
    },
    methods: {
      getUserList() {
        getUserReal().then(result => {
          this.userForm = result.data.userInfo
        })
      },
      handleUpdate() {
        this.$refs.userForm.validate(valid => {
          if (valid) {
            createVerification(this.userForm).then(result => {
              if (result.code === 200) {
                this.$message.success('认证成功')
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
    .userBox {
        .content {
            display: flex;

            .main {
                position: relative;
                width: 890px;
                margin-left: 20px;
                overflow: hidden;
                z-index: 1;

                .userInfo {
                    display: block;
                    border: 1px solid #eaeaea;
                    font-size: 14px;

                    .text {
                        padding: 52px 175px 15px 175px;
                        overflow: hidden;
                        color: #606266;
                        line-height: 30px;
                    }

                    .assets {
                        padding: 15px 240px 30px 240px;
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

