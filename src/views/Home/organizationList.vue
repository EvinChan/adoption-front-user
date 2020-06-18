<template>
    <div>
        <MyHeader/>
        <div class="detailBox">
            <div class="row">
                <!-- 面包屑 -->
                <div class="crumbs">
                    <router-link to="/">首页</router-link>
                    <div class="icon icon-right_s"></div>
                    <span>宠物机构</span>
                </div>
                <!-- content -->
                <div class="content">
                    <!-- 主信息 -->
                    <div class="info">
                        <div class="name">
                            宠物机构
                        </div>
                        <div class="detail" v-for="(item, index) in organizationList" :key="index">
                            <div class="title">
                                机构名：
                                {{item.organizationName.name}}
                            </div>
                            <div class="title">
                                机构地址：
                                {{item.orgProvince.name}}
                                {{item.orgCity.name}}
                                {{item.detail}}
                            </div>
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
  import {getOrganization} from '@/api/main';

  export default {
    components: {
      MyHeader,
      MyFooter
    },
    name: "organizationList",
    data() {
      return {
        organizationList: [],
      }
    },
    created() {
      this.initOrganization()
    },
    methods: {
      initOrganization() {
        getOrganization().then(result => {
          result.data.organizationInfo.forEach(organization => {
            this.organizationList.push(organization)
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
                    display: grid;
                    margin: 0 150px;

                    .title {
                        font-size: 14px;
                        margin: 0 30px;
                    }
                }
            }
        }
    }
</style>
