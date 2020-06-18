<template>
    <div>
        <MyHeader/>
        <div class="userBox">
            <div class="row">
                <!-- 面包屑 -->
                <div class="crumbs">
                    <router-link to="/">首页</router-link>
                    <div class="icon icon-right_s"></div>
                    <span class="">个人中心</span>
                </div>
                <div class="content">
                    <!-- 侧栏 -->
                    <UserSide/>
                    <!-- 内容 -->
                    <div class="main">
                        <div class="userInfo">
                            <div class="assets">
                                <el-form ref="userForm" :model="userForm" :rules="userRules" label-width="80px">
                                    <el-form-item label="昵称" prop="name">
                                        <el-input v-model="userForm.name"
                                                  placeholder="请输入昵称"
                                                  auto-complete="off"
                                                  maxlength="20"
                                        />
                                    </el-form-item>
                                    <el-form-item label="性别" prop="sex">
                                        <el-radio-group v-model="userForm.sex">
                                            <el-radio :label="0">男</el-radio>
                                            <el-radio :label="1">女</el-radio>
                                        </el-radio-group>
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
  import {validIdcard} from '@/utils/validate';
  import {getUserData, updateUserData} from '@/api/user';

  export default {
    components: {
      MyHeader,
      MyFooter,
      UserSide
    },
    name: "user",
    data() {
      const validateIdcard = (rule, value, callback) => {
        if (!validIdcard(value)) {
          callback(new Error("请输入正确的身份证号"));
        } else {
          callback();
        }
      }
      return {
        userForm: {
          name: '',
          sex: '',
          idcard: ''
        },
        userRules: {
          name: [{required: true, trigger: 'blur', message: '请填写昵称'}],
          sex: [{required: true, message: '请选择性别'}],
          idcard: [{required: true, trigger: 'blur', validator: validateIdcard}]
        }
      }
    },
    created() {
      this.getUserList()
    },
    methods: {
      getUserList() {
        getUserData().then(result => {
          this.userForm = result.data.userInfo
        })
      },
      handleUpdate() {
        this.$refs.userForm.validate(valid => {
          if (valid) {
            updateUserData(this.userForm).then(result => {
              if (result.code === 200) {
                this.$message.success('修改成功')
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

