<template>
    <div>
        <MyHeader/>
        <div class="headingBox">
            <div class="row">
                <!-- 面包屑 -->
                <div class="crumbs">
                    <router-link to="/">首页</router-link>
                    <div class="icon icon-right_s"></div>
                    <span class="">我的头像</span>
                </div>
                <div class="content">
                    <!-- 侧栏 -->
                    <UserSide/>
                    <div class="main">
                        <div class="headingContent">
                            <div class="headingHeader">
                                <span>选择图片</span>
                                <el-upload
                                        class="avatar-uploader"
                                        action="http://localhost:3000/user/uploadHeading"
                                        accept="image/jpeg,image/png"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <img v-if="newHeading" :src="newHeadingBase64" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                            <div class="headingHeader">
                                <div class="demo-image">
                                    <span>当前头像</span>
                                    <div class="block">
                                        <el-image
                                                style="width: 170px; height: 170px"
                                                :src="heading"
                                                fit="fill"/>
                                    </div>
                                </div>
                            </div>
                            <div class="headingFooter">
                                <p>请选择图片上传：支持JPG、PNG格式，图片需小于1M</p>
                                <el-button class="updatebtn" type="primary"
                                           @click.native.prevent="handleUpdate">更新
                                </el-button>
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
  import { mapGetters } from 'vuex'
  import { updateHeading } from '@/api/user'
  import { setToken } from '@/utils/auth'

  export default {
    computed:{
      ...mapGetters([
        'id',
        'heading'
      ])
    },
    components: {
      MyHeader,
      MyFooter,
      UserSide
    },
    name: "heading",
    data() {
      return {
        newHeading: '',
        newHeadingBase64: ''
      };
    },
    methods: {
      // 头像上传成功回调
      handleAvatarSuccess(res, file) {
        this.newHeadingBase64 = URL.createObjectURL(file.raw)    //base64编码
        this.newHeading = res.data.newHeading
      },
      // 头像上传前检查
      beforeAvatarUpload(file) {
        const isIMAGE = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isIMAGE) {
          this.$message.error('上传图片只能是 JPG 或 PNG 格式！');
          return isIMAGE
        }
        if (!isLt1M) {
          this.$message.error('上传图片大小不能超过 1MB！');
          return isLt1M
        }
      },
      handleUpdate() {
        updateHeading(this.id, this.newHeading).then(result => {
          if(result.code === 200) {
            //1. 接受后端新的token
            const token = result.data.token
            //2. 将token存入Vuex和Cookies
            this.$store.commit('user/SET_TOKEN', token)
            setToken(token)
            this.$message.success('修改成功')
            //3. 刷新页面
            window.location.reload()
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 170px;
        height: 170px;
        line-height: 170px;
        text-align: center;
        border: 1px solid #eaeaea;
    }

    .avatar {
        width: 170px;
        height: 170px;
        display: block;
    }

    .headingBox {
        .content {
            display: flex;

            .main {
                width: 890px;
                margin-left: 20px;
                overflow: hidden;
                z-index: 1;

                .headingContent {
                    position: relative;
                    border: 1px solid #eaeaea;
                    font-size: 14px;
                    text-align: center;

                    .headingHeader {
                        width: 100%;
                        line-height: 22px;
                        overflow: hidden;
                        text-align: center;
                        color: #606266;
                        padding: 20px;
                    }

                    .headingFooter {
                        width: 100%;
                        padding: 20px;

                        p{
                            color: #606266;
                            padding: 20px;
                        }

                        .updatebtn {
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
