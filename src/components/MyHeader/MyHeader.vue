<template>
    <div class="header" style="height: 176px;">
        <div class="top">
            <!-- topInfo -->
            <div class="siteNav">
                <div class="row">
                    <!-- left信息 -->
                    <div class="siteNav-l">
                        <div class="siteNavItem">
                            <div class="siteNavItemHd">
                                <div class="noticeList">
                                    <div class="noticeListUL">
                                        <div class="noticeItem">
                                            <a href="javascript:;" class="noticeTxt">欢迎光临宠物领养中心！</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- right信息 -->
                    <div class="siteNav-r">
                        <div class="siteNavItem">
                            <div class="siteNavItemHd">
                                <router-link to="login" v-if="token == null">
                                    登录
                                </router-link>
                                <a href="javascript:;" @click="handleOrganization" v-if="token != null && this.org">
                                    申请为机构
                                </a>
                            </div>
                        </div>
                        <div class="siteNavItem">
                            <div class="siteNavItemHd">
                                <router-link to="register" v-if="token == null">
                                    注册
                                </router-link>
                                <a href="javascript:;" @click="messageBoxLogout" v-if="token != null">
                                    注销
                                </a>
                            </div>
                        </div>
                        <div class="siteNavItem" v-for="(item,index) in siteNavList" :key="index">
                            <div class="siteNavItemHd pipe">
                                <a :href="item.url" target="_blank">{{item.text}}</a>
                            </div>
                        </div>
                        <el-avatar class="avatar" :src="heading" v-if="token != null"></el-avatar>
                    </div>
                </div>
            </div>
            <!-- 主信息 -->
            <MyTop v-if="isShowTitle"/>
            <!-- 次信息 -->
            <div v-else class="systemTop">
                <div class="row">
                    <div class="left">
                        <router-link to="/">
                            <i class="logoIcon"></i>
                        </router-link>
                        <span class="systemName">{{title}}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- organization -->
        <create-organization
                ref="createOrganization"/>
    </div>
</template>

<script>
  import MyTop from "../MyTop/MyTop.vue"
  import createOrganization from '@/components/Organization/createOrganization.vue'
  import { getHeaderOrganization, checkUserIdcard } from '@/api/user';
  import { mapGetters } from 'vuex'

  export default {
    components: {
      createOrganization,
      MyTop
    },
    name: 'MyHeader',
    props: {
      headType: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ''
      }
    },
    computed: {
      ...mapGetters([
        'token',
        'heading'
      ])
    },
    data() {
      return {
        isShowTitle: this.headType,
        siteNavList: [
          {text: '我的订单', url: '/userOrder'},
          {text: '个人中心', url: '/user'},
        ],
        org: true
      }
    },
    created() {
      this.organizationBtn()
    },
    methods: {
      // 是否显示 申请为机构
      organizationBtn(){
        if(this.token) {
          getHeaderOrganization().then(result => {
            if (result.code === 200) {
              if(result.data.organizationInfo) {
                this.org = false
              } else {
                this.org = true
              }
            }
          })
        }
      },
      // 显示机构申请表
      handleOrganization() {
        checkUserIdcard().then(result => {
          if(result.code === 200) {
            this.$refs.createOrganization.open()
          }
        })
      },
      // 注销
      messageBoxLogout() {
        this.$confirm(`确认要注销吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.logout()
        }).catch((result) => {
          if (result === 'cancel') {
            this.$message({
              type: 'info',
              message: '已取消操作！'
            })
          }
        })
      },
      logout() {
        this.$store.dispatch('user/logout')
        // this.$router.push('/')
        window.location.reload()
        this.$message.success('成功注销!')
      }
    }
  }
</script>

<style lang="scss" scoped>
    .header {
        .top {
            position: relative;
            z-index: 2;

            .siteNav {
                position: relative;
                height: 36px;
                line-height: 36px;
                background-color: #333;
                z-index: 5;

                a {
                    display: inline-block;
                    color: #ccc;
                }

                .siteNav-l {
                    .siteNavItem {
                        cursor: pointer;
                        float: left;
                        margin-left: 10px;
                        position: relative;
                        color: #ccc;

                        .siteNavItemHd {
                            font-size: 12px;
                            height: 36px;
                            line-height: 36px;
                            cursor: pointer;

                            .noticeList {
                                margin-left: 2px;
                                overflow: hidden;
                                height: 36px;
                                line-height: 36px;
                                background: url(//yanxuan.nosdn.127.net/d132c2561f18f1149d566a60d05fd9b7.gif) center left no-repeat;

                                .noticeListUL {
                                    position: relative;
                                    list-style: none;
                                    top: 0;

                                    .noticeItem {
                                        padding-left: 26px;
                                        height: 36px;

                                        .noticeTxt {
                                            color: #b4a078;
                                            font-size: 12px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                .siteNav-r {
                    float: right;

                    .siteNavItem {
                        float: left;
                        margin-left: 10px;
                        position: relative;
                        color: #ccc;

                        .pipe:before {
                            content: '';
                            display: inline-block;
                            height: 16px;
                            border-left: 1px solid #5c5c5c;
                            vertical-align: middle;
                        }

                        .pipe:before {
                            margin-right: 10px;
                        }

                        .siteNavItemHd {
                            font-size: 12px;
                            height: 36px;
                            line-height: 36px;
                            cursor: pointer;
                        }
                    }

                    .avatar {
                        float: right;
                        margin-left: 10px;
                        width: 36px;
                        height: 36px;
                    }
                }
            }
        }

        .systemTop {
            height: 100px;
            line-height: 100px;
            background: #fff;
            box-shadow: 0 1px 10px 0 rgba(0, 0, 0, .1);

            .row {
                height: 100%;

                .left {
                    display: flex;
                    align-content: center;
                    height: 100%;
                    align-items: center;

                    a {
                        display: inline-block;
                    }

                    .logoIcon {
                        display: block;
                        background-position: 0 -98px;
                        height: 30px;
                        width: 90px;
                        background-image: -webkit-image-set(url(../../assets/img/iconMore.png) 2x);
                        background-position: 0 -272px;
                    }

                    .systemName {
                        display: inline-block;
                        padding-left: 17px;
                        margin-left: 20px;
                        font-size: 24px;
                        line-height: 24px;
                        font-weight: 400;
                        color: #b4a078;
                        border-left: 1px solid #b4a078;
                        vertical-align: middle;
                    }
                }
            }
        }
    }
</style>
