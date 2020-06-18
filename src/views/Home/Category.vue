<template>
    <div>
        <MyHeader/>
        <div class="CategoryList">
            <div class="row">
                <!-- 面包屑 -->
                <div class="crumbs">
                    <router-link to="/">首页</router-link>
                    <div class="icon icon-right_s"></div>
                    <span>宠物{{this.$route.query.category}}</span>
                </div>
                <!-- 分类 -->
                <div class="course-nav">
                    <dl class="m-center">
                        <dt>{{ `分类` }}：</dt>
                        <dd v-for="(classification,index) in classificationList"
                            :key="index"
                            :class="{active: index === currentClassificationIndex}"
                            @click="handleClassificationClick(classification,index)"
                        >
                            {{ classification.name }}
                        </dd>
                    </dl>
                </div>
                <!-- 排序 -->
                <div class="course-nav">
                    <dl class="m-center">
                        <dt>{{ `排序` }}：</dt>
                        <dd v-for="(sort,index) in sortList"
                            :key="index"
                            :class="{active: index === currentSortIndex}"
                            @click="handleSortClick(sort,index)"
                        >
                            {{ sort.name }}
                        </dd>
                    </dl>
                </div>
                <!-- 机构 -->
                <div class="course-nav">
                    <dl class="m-center">
                        <dt>{{ `机构` }}：</dt>
                        <dd v-for="(sort,index) in organizationList"
                            :key="index"
                            :class="{active: index === currentOrganizationIndex}"
                            @click="handleOrganizationClick(sort,index)"
                        >
                            {{ sort.name }}
                        </dd>
                    </dl>
                </div>
                <div class="itemList">
                    <div class="newProduct product" v-for="(item, index) in petList" :key="index">
                        <div class="hd">
                            <router-link :to="'/detail?id=' + item.id" class="imgWrap" target="_blank">
                                <div style="width:100%;height:100%;">
                                    <img class="img  img-lazyload img-lazyloaded"
                                         :src="item.petInformation.imageSrc"/>
                                </div>
                            </router-link>
                        </div>
                        <div class="bd">
                            <h3 class="name">
                                {{item.name}}
                                {{item.sex === 0 ? '公' : '母' }}
                                <span class="text" v-if="item.age === 0"> 0-3个月</span>
                                <span class="text" v-if="item.age === 1"> 4-6个月</span>
                                <span class="text" v-if="item.age === 2"> 7-12个月</span>
                                <span class="text" v-if="item.age === 3"> 1岁</span>
                                <span class="text" v-if="item.age === 4"> 2岁</span>
                                <span class="text" v-if="item.age === 5"> 3岁</span>
                                <span class="text" v-if="item.age === 6"> 4岁</span>
                                <span class="text" v-if="item.age === 7"> 5岁</span>
                                <span class="text" v-if="item.age === 8"> 6岁</span>
                                <span class="text" v-if="item.age === 9"> 7岁</span>
                                <span class="text" v-if="item.age === 10"> 8岁</span>
                                <span class="text" v-if="item.age === 11"> 9岁</span>
                                <span class="text" v-if="item.age === 12"> 10岁</span>
                                <span class="text" v-if="item.age === 13"> 11岁</span>
                                <span class="text" v-if="item.age === 14"> 12岁</span>
                                <span class="text" v-if="item.age === 15"> 13岁</span>
                                <span class="text" v-if="item.age === 16"> 14岁</span>
                                <span class="text" v-if="item.age === 17"> 15岁</span>
                                <span class="text" v-if="item.age === 18"> 16岁</span>
                                <span class="text" v-if="item.age === 19"> 17岁</span>
                                <span class="text" v-if="item.age === 20"> 18岁</span>
                                <span class="text" v-if="item.age === 21"> 19岁</span>
                                <span class="text" v-if="item.age === 22"> 20岁</span>
                            </h3>
                            <h4 class="name">
                                {{item.category.name}}
                            </h4>
                        </div>
                    </div>
                </div>
                <NoData v-if="petList.length === 0" position="0 -760px"/>
                <!-- 分页 -->
                <el-pagination
                        :current-page="page"
                        :page-size="limit"
                        :total="total"
                        background
                        layout="total, prev, pager, next, jumper"
                        @current-change="getCategoryList"/>
            </div>
        </div>
        <MyFooter/>
    </div>
</template>

<script>
  import MyHeader from "@/components/MyHeader/MyHeader.vue";
  import MyFooter from "@/components/MyFooter/MyFooter.vue";

  import {getNotAdopted, getAdopted, getOrganization} from '@/api/main';

  export default {
    components: {
      MyHeader,
      MyFooter
    },
    name: "categoryList",
    data() {
      return {
        queryParams: {
          category: '',
          sortIndex: 0
        },
        petList: [],
        total: 0,   // 总记录数
        page: 1,    // 页码
        limit: 8,   // 每页记录数
        classificationList: [   // 分类列表
          {name: '待领养'},
          {name: '已领养'}
        ],
        sortList: [     // 排序列表
          {name: '默认'},
          {name: '最新'}
        ],
        organizationList: [],     // 机构列表
        currentClassificationIndex: 0,  // 分类当前索引
        currentSortIndex: 0,            // 排序当前索引
        currentOrganizationIndex: 0,    // 排序当前索引
      }
    },
    created() {
      this.initCategoryList()
    },
    methods: {
      initCategoryList() {
        this.queryParams.category = this.$route.query.category
        this.getCategoryList()
        this.getOrganizationList()
      },
      getCategoryList(page = 1) {
        this.page = page
        this.petList = []
        if (this.currentClassificationIndex === 0) {
          getNotAdopted(this.page, this.limit, this.queryParams).then(result => {
            result.data.petInfo.rows.forEach(pet => {
              this.petList.push(pet)
            })
            this.total = result.data.petInfo.count
          })
        } else {
          getAdopted(this.page, this.limit, this.queryParams).then(result => {
            result.data.petInfo.rows.forEach(pet => {
              this.petList.push(pet)
            })
            this.total = result.data.petInfo.count
          })
        }
      },
      getOrganizationList() {
        this.organizationList = []
        getOrganization().then(result => {
          result.data.organizationInfo.forEach(organization => {
            this.organizationList.push(organization.organizationName)
          })
        })
        this.organizationList.splice(0, 0, {name: '全部'})
      },
      handleClassificationClick(classification, index) {
        //如果点击同样的排序
        if (this.currentClassificationIndex === index)
          return;
        this.currentClassificationIndex = index
        this.getCategoryList()
      },
      handleSortClick(sort, index) {
        //如果点击同样的排序
        if (this.currentSortIndex === index)
          return;
        this.currentSortIndex = index
        this.queryParams.sortIndex = this.currentSortIndex
        this.getCategoryList()
      },
      handleOrganizationClick(organization, index) {
        //如果点击同样的排序
        if (this.currentOrganizationIndex === index)
          return;
        this.currentOrganizationIndex = index
        this.queryParams.organizationIndex = this.organizationList[index].id
        this.getCategoryList()
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'initCategoryList'
    }
  }
</script>

<style lang="scss" scoped>
    .CategoryList {

        .course-nav {
            dl {
                position: relative;
                padding: 0px 15px 5px 50px;
                border-bottom: 1px dotted #dedede;
                margin-bottom: 5px;
                font-size: 14px;

                dt {
                    position: absolute;
                    left: 0px;
                    top: 10px;
                    color: #999999;
                    font-weight: 700;
                }

                dd {
                    display: inline-block;
                    padding: 0px 10px;
                    /*margin: 5px 10px 5px 10px;*/
                    height: 40px;
                    line-height: 40px;
                    font-weight: 500;
                    cursor: pointer;

                    &:hover {
                        color: #b4a078;
                        /*background-color: #FAF3E5;*/
                    }

                    &.active {
                        color: #b4a078;
                        /*background-color: #FAF3E5;*/
                    }
                }
            }
        }

        .itemList {
            margin-top: 15px;
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
</style>

