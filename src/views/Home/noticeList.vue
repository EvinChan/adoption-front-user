<template>
    <div>
        <MyHeader/>
        <div class="detailBox">
            <div class="row">
                <!-- 面包屑 -->
                <div class="crumbs">
                    <router-link to="/">首页</router-link>
                    <div class="icon icon-right_s"></div>
                    <span>系统公告</span>
                </div>
                <!-- content -->
                <div class="content">
                    <!-- 主信息 -->
                    <div class="info">
                        <div class="name">
                            系统公告
                        </div>
                        <div class="detail" v-for="(item, index) in noticeList" :key="index">
                            <router-link :to="'/notice?id=' + item.id" target="_blank">
                                <span class="title">{{item.title}}</span>
                            </router-link>
                            <span class="time">发布时间： {{item.gmt_create}}</span>

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
  import {getNotice} from '@/api/main';

  export default {
    components: {
      MyHeader,
      MyFooter
    },
    name: "noticeList",
    data() {
      return {
        noticeList: [],
      }
    },
    created() {
      this.initNotice()
    },
    methods: {
      initNotice() {
        getNotice().then(result => {
          result.data.noticeInfo.forEach(notice => {
            this.noticeList.push(notice)
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
    .detailBox {
        .content {
            .info {
                min-height: 380px;

                .name {
                    overflow: hidden;
                    margin: 0 505px 20px 505px;
                    display: flex;
                    font-size: 20px;
                    font-weight: 700;
                    line-height: 20px;
                    position: relative;
                }

                .detail {
                    border-top: 1px dotted #dedede;
                    border-bottom: 1px dotted #dedede;
                    padding: 15px 0 15px;
                    line-height: 24px;
                    font-size: 14px;
                    position: relative;
                    display: flex;

                    a:hover {
                        text-decoration: none;
                        color: #b4a078;
                    }

                    .title {
                        width: 800px;
                        font-size: 14px;
                        float: left;
                        margin-left: 30px;
                    }

                    .time {
                        font-size: 14px;
                        float: right;
                        margin-right: 15px;
                    }
                }
            }
        }
    }
</style>
