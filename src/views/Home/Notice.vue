<template>
    <div>
        <MyHeader/>
        <div class="detailBox">
            <div class="row" v-for="(item, index) in noticeInfo" :key="index">
                <!-- 面包屑 -->
                <div class="crumbs">
                    <router-link to="/">首页</router-link>
                    <div class="icon icon-right_s"></div>
                    <router-link to="/noticeList">系统公告</router-link>
                    <div class="icon icon-right_s"></div>
                    <span>{{item.title}}</span>
                </div>
                <!-- content -->
                <div class="content">
                    <!-- 主信息 -->
                    <div class="info">
                        <div class="name">
                            {{item.title}}
                        </div>
                        <div class="detail" v-html="item.content">
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
  import {getNoticeDetail} from '@/api/main';

  export default {
    components: {
      MyHeader,
      MyFooter
    },
    name: "notice",
    data() {
      return {
        noticeInfo: [],
        queryParams: {id: ''},
      }
    },
    created() {
      this.initNoticeDetail()
    },
    methods: {
      // 获取id
      initNoticeDetail() {
        this.queryParams.id = this.$route.query.id
        this.noticeInfo = []
        getNoticeDetail(this.queryParams).then(result => {
          result.data.noticeInfo.forEach(notice => {
            this.noticeInfo.push(notice)
          })
        })
      }
    },
    watch: {
      '$route': 'initNoticeDetail'
    }
  }
</script>

<style lang="scss" scoped>
    .detailBox {
        .content {
            .info {
                min-height: 350px;
                border: 1px dotted #dedede;
                padding: 15px 20px;

                .name {
                    overflow: hidden;
                    padding: 15px 20px;
                    border-bottom: 1px dotted #dedede;
                    display: flex;
                    font-size: 16px;
                    line-height: 25px;
                    position: relative;
                }

                .detail {
                    padding: 15px 20px;
                    line-height: 30px;
                    font-size: 16px;
                    position: relative;
                }
            }
        }
    }
</style>
