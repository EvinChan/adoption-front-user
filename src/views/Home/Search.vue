<template>
    <div>
        <MyHeader/>
        <div class="searchBox">
            <div class="row">
                <!-- 面包屑 -->
                <div class="crumbs">
                    <router-link to="/">首页</router-link>
                    <div class="icon icon-right_s"></div>
                    <span class="">{{$route.query.keyword}}</span>
                </div>
                <!-- content -->
                <div class="content">
                    <div class="itemList">
                        <div class="newProduct product" v-for="(item, index) in PetList" :key="index">
                            <div class="hd">
                                <router-link :to="'/detail?id=' + item.id" class="imgWrap">
                                    <div style="width:100%;height:100%;">
                                        <img class="img img-lazyload img-lazyloaded"
                                             :src="item.petInformation.imageSrc"/>
                                    </div>
                                </router-link>
                            </div>
                            <div class="bd">
                                <h3 class="name">
                                    {{item.name}}
                                    {{item.sex === 0 ? '公' : '母' }}
                                    {{item.age}}岁
                                </h3>
                                <h4 class="name">
                                    {{item.category.name}}
                                </h4>
                            </div>
                        </div>
                    </div>
                    <NoData v-if="PetList.length === 0" position="0 -760px"/>
                    <!-- 分页 -->
                    <el-pagination
                            :current-page="page"
                            :page-size="limit"
                            :total="total"
                            background
                            layout="total, prev, pager, next, jumper"
                            @current-change="getPetList"/>
                </div>
            </div>
        </div>
        <MyFooter/>
    </div>
</template>

<script>
  import MyHeader from "@/components/MyHeader/MyHeader.vue";
  import MyFooter from "@/components/MyFooter/MyFooter.vue";
  import { searchCategoryList } from '@/api/main';

  export default {
    components: {
      MyHeader,
      MyFooter
    },
    name: "search",
    data() {
      return {
        queryParams: {
          keyword: ''
        },
        PetList: [],
        total: 0,   // 总记录数
        page: 1,    //页码
        limit: 8,  //每页记录数
      }
    },
    created() {
      this.initPetList()
    },
    methods: {
      // 获取keyword
      initPetList() {
        this.queryParams.keyword = this.$route.query.keyword
        this.getPetList()
      },
      // 添加详情到petInfo
      getPetList(page = 1) {
        this.PetList = []
        this.page = page
        searchCategoryList(this.page, this.limit, this.queryParams).then(result => {
          if (result.code === 200) {
            this.PetList = result.data.petInfo.rows
            this.total = result.data.petInfo.count
          }
        })
      }
    },
    watch: {
      '$route': 'initPetList'
    }
  }
</script>

<style lang="scss" scoped>
    .searchBox {
        .content {
            .itemList {
                display: inline-block;

                .newProduct {
                    width: 260px;
                    margin-right: 10px;
                    float: left;
                    line-height: 1;
                    text-align: center;
                    font-size: 13px;
                    height: 320px;
                    position: relative;

                    &:last-child {
                        margin-right: 0;
                    }

                    .hd {
                        background-color: #f4f4f4;
                        position: relative;
                        overflow: hidden;
                    }

                    .img {
                        width: 260px;
                        height: 260px;
                    }

                    .name {
                        margin-bottom: 4px;
                        height: 20px;
                        line-height: 20px;
                    }
                }
            }
        }
    }
</style>

