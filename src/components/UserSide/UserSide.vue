<template>
    <div class="sub">
        <div class="sideBar">
            <div class="sideItem" v-for="(item,index) in sideData" :key='index'>
                <div class="sideText">{{item.title}}</div>
                <div class="bd">
                    <ul>
                        <li v-for="(itema,indexa) in item.list" :key='indexa'>
                            <router-link :to="itema.url" :class="nowRouter == itema.url ? 'active' : ''"
                                         class="sideText">{{itema.text}}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        nowRouter: this.$route.path,
        sideData: [
          {
            title: '帐号管理', list: [
              {url: '/user', text: '个人信息'},
              {url: '/userVerification', text: '实名认证'},
              {url: '/heading', text: '我的头像'},
              {url: '/password', text: '修改密码'},
              {url: '/mobile/verify', text: '修改账号'},
              {url: '/address', text: '地址管理'},
              // {url: '/userCollection', text: '我的收藏'},
            ]
          },
          {
            title: '交易管理', list: [
              {url: '/userAdoption', text: '领养申请表'},
              {url: '/userOrganization', text: '机构申请表'},
              {url: '/userOrder', text: '订单管理'},
            ]
          }
        ]
      }
    },
    created() {}
  }
</script>

<style lang="scss" scoped>
    .sub {
        position: relative;
        width: 180px;
        margin-bottom: 10px;

        .sideBar {
            border: 1px solid #eaeaea;
            padding-top: 24px;
            width: 180px;

            .sideItem {
                text-align: left;
                color: #333;
                margin-bottom: 40px;

                .sideText {
                    padding-left: 43px;
                    font-size: 16px;
                    color: #333;
                    font-weight: 700;
                    line-height: 18px;
                    margin: 16px 0;
                }

                .bd {
                    text-align: left;

                    ul {
                        li {
                            a.sideText {
                                display: block;
                                font-size: 14px;
                                display: block;
                                padding-left: 41px;
                                border-left: 2px solid #fff;
                                border-right: 2px solid #fff;
                                color: #666;
                                line-height: 18px;
                                margin: 16px 0;

                                &:hover {
                                    color: #b4a078;
                                }

                                &.active {
                                    color: #b4a078;
                                    border-left-color: #BEA988;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
