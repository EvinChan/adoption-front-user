<template>
    <div>
        <MyHeader/>
        <div class="detailBox">
            <div class="row" v-for="(item1, index) in petInfo" :key="index">
                <!-- 面包屑 -->
                <div class="crumbs">
                    <router-link to="/">首页</router-link>
                    <div class="icon icon-right_s"></div>
                    <span>{{item1.name}}</span>
                </div>
                <!-- content -->
                <div class="content">
                    <!-- 主信息 -->
                    <div class="detailHd">
                        <div class="slide">
                            <img class="thumbImg" :src="item1.petInformation.imageSrc" alt="">
                        </div>
                        <div class="info">
                            <div class="name">
                                {{item1.name}}
                                {{item1.sex === 0 ? '公' : '母'}}
                                {{item1.category.name}}
                            </div>
                            <div class="price">
                                <div class="field">
                                    <span class="label">品种</span>
                                    <span class="text">{{item1.category.name}}</span>
                                </div>
                                <div class="field">
                                    <span class="label">昵称</span>
                                    <span class="text">{{item1.name}}</span>
                                </div>
                                <div class="field">
                                    <span class="label">性别</span>
                                    <span class="text">{{item1.sex === 0 ? '公' : '母'}}</span>
                                </div>
                                <div class="field">
                                    <span class="label">年龄</span>
                                    <span class="text" v-if="item1.age === 0">0-3个月</span>
                                    <span class="text" v-if="item1.age === 1">4-6个月</span>
                                    <span class="text" v-if="item1.age === 2">7-12个月</span>
                                    <span class="text" v-if="item1.age === 3">1岁</span>
                                    <span class="text" v-if="item1.age === 4">2岁</span>
                                    <span class="text" v-if="item1.age === 5">3岁</span>
                                    <span class="text" v-if="item1.age === 6">4岁</span>
                                    <span class="text" v-if="item1.age === 7">5岁</span>
                                    <span class="text" v-if="item1.age === 8">6岁</span>
                                    <span class="text" v-if="item1.age === 9">7岁</span>
                                    <span class="text" v-if="item1.age === 10">8岁</span>
                                    <span class="text" v-if="item1.age === 11">9岁</span>
                                    <span class="text" v-if="item1.age === 12">10岁</span>
                                    <span class="text" v-if="item1.age === 13">11岁</span>
                                    <span class="text" v-if="item1.age === 14">12岁</span>
                                    <span class="text" v-if="item1.age === 15">13岁</span>
                                    <span class="text" v-if="item1.age === 16">14岁</span>
                                    <span class="text" v-if="item1.age === 17">15岁</span>
                                    <span class="text" v-if="item1.age === 18">16岁</span>
                                    <span class="text" v-if="item1.age === 19">17岁</span>
                                    <span class="text" v-if="item1.age === 20">18岁</span>
                                    <span class="text" v-if="item1.age === 21">19岁</span>
                                    <span class="text" v-if="item1.age === 22">20岁</span>
                                </div>
                                <div class="field">
                                    <span class="label">体重</span>
                                    <span class="text">{{item1.weight}}kg</span>
                                </div>
                                <div class="field">
                                    <span class="label">发布省份</span>
                                    <span class="text">{{item1.provinceName.name}}</span>
                                </div>
                                <div class="field">
                                    <span class="label">发布时间</span>
                                    <span class="text">{{item1.gmt_create}}</span>
                                </div>
                                <div class="field">
                                    <span class="label">疫苗情况</span>
                                    <span class="text" v-if="item1.isVaccine === 0">不详</span>
                                    <span class="text" v-if="item1.isVaccine === 1">未接种</span>
                                    <span class="text" v-if="item1.isVaccine === 2">接种中</span>
                                    <span class="text" v-if="item1.isVaccine === 3">已接种</span>
                                </div>
                                <div class="field">
                                    <span class="label">驱虫情况</span>
                                    <span class="text" v-if="item1.isRepellant === 0">不详</span>
                                    <span class="text" v-if="item1.isRepellant === 1">未驱虫</span>
                                    <span class="text" v-if="item1.isRepellant === 2">已驱虫</span>
                                </div>
                                <div class="field">
                                    <span class="label">绝育情况</span>
                                    <span class="text" v-if="item1.isSterilization === 0">不详</span>
                                    <span class="text" v-if="item1.isSterilization === 1">未绝育</span>
                                    <span class="text" v-if="item1.isSterilization === 2">已绝育</span>
                                </div>
                                <div class="field">
                                    <span class="label">所属机构</span>
                                    <span class="text">{{item1.organization.organizationName.name}}</span>
                                </div>
                            </div>
                            <div class="btns">
                                <el-button @click.native.prevent="handleAdoption(item1.status)" class="adoptionbtn">
                                    {{item1.status === 0 ? '申请领养' : '已被领养'}}
                                </el-button>
                                <!--                                <el-button class="addbtn" type="warning" icon="el-icon-star-off" circle></el-button>-->
                                <!--                                <div class="addSc">-->
                                <!--                                    <div class="icon icon-star"></div>-->
                                <!--                                    <div class="text">收藏</div>-->
                                <!--                                </div>-->
                            </div>
                        </div>
                    </div>
                    <!-- 详情 -->
                    <div class="detailBd">
                        <!-- 左侧 -->
                        <div class="leftInfo">
                            <!-- navTab -->
                            <div class="detailNavTab">
                                <ul>
                                    <li class="item active">详情</li>
                                </ul>
                            </div>
                            <!-- tabContent -->
                            <div class="info">
                                <div class="name" v-html="item1.petInformation.petDesc"></div>
                            </div>
                        </div>
                    </div>
                    <!-- 详情 -->
                    <div class="detailBd" v-if="item1.status && revisitInfo.length > 0">
                        <!-- 左侧 -->
                        <div class="leftInfo">
                            <!-- navTab -->
                            <div class="detailNavTab">
                                <ul>
                                    <li class="item active">领养回访</li>
                                </ul>
                            </div>
                            <!-- tabContent -->
                            <div class="info" v-for="(item2, index) in revisitInfo" :key="index">
                                <div class="name" style="width: 400px">
                                    <p>领养人：</p>
                                    <p>{{item2.revisitUser.name}}</p>
                                    <p>发布时间：</p>
                                    <p>{{item2.gmt_create}}</p>
                                </div>
                                <div class="name">
                                    <p>回访信息：</p>
                                    <div class="visit" v-html="item2.content"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <MyFooter/>

        <!-- adoption -->
        <create-adoption
                ref="createAdoption"/>
    </div>
</template>

<script>
  import MyHeader from "@/components/MyHeader/MyHeader.vue";
  import MyFooter from "@/components/MyFooter/MyFooter.vue";
  import createAdoption from "@/components/Adoption/createAdoption.vue";

  import {getPetDetail, getRevisit} from '@/api/main';
  import {checkUserIdcard} from '@/api/user';
  import {mapGetters} from 'vuex';

  export default {
    components: {
      MyHeader,
      MyFooter,
      createAdoption
    },
    name: "detail",
    computed: {
      ...mapGetters([
        'token'
      ])
    },
    data() {
      return {
        petInfo: [],
        revisitInfo: [],
        queryParams: {id: ''},
      }
    },
    created() {
      this.initPetDetail()
    },
    methods: {
      // 获取id
      initPetDetail() {
        this.queryParams.id = this.$route.query.id
        this.getPetDetail()
        this.getRevisitInfo()
      },
      // 添加详情到petInfo
      getPetDetail() {
        this.petInfo = []
        getPetDetail(this.queryParams).then(result => {
          result.data.petInfo.forEach(pet => {
            this.petInfo.push(pet)
          })
        })
      },
      // 添加领养回访到revisitInfo
      getRevisitInfo() {
        this.revisitInfo = []
        getRevisit(this.queryParams).then(result => {
          result.data.revisitInfo.forEach(revisit => {
            this.revisitInfo.push(revisit)
          })
        })
        console.log(this.revisitInfo);
      },
      // 显示 Adoption
      handleAdoption(status) {
        if (status !== 0) {
          return false
        } else if (!this.token) {
          this.$message.error('请先登录')
        } else {
          checkUserIdcard().then(result => {
            if (result.code === 200) {
              this.$refs.createAdoption.open()
            }
          })
        }
      },
    },
    watch: {
      '$route': 'initPetDetail'
    }
  }
</script>

<style lang="scss" scoped>
    .detailBox {
        .content {
            .detailHd {
                display: flex;
                /*项目位于各行之间留有空白的容器内。*/
                justify-content: space-between;

                .slide {
                    width: 430px;
                    height: 430px;
                    position: relative;
                    border: 1px solid #e8e8e8;
                    margin-right: 16px;

                    .thumbImg {
                        display: block;
                        width: 100%;
                        height: 100%;
                        background-color: #f4f4f4;
                    }
                }

                .info {
                    width: 620px;
                    /*允许在单词内换行。*/
                    word-break: break-all;
                    /*在长单词或 URL 地址内部进行换行。*/
                    word-wrap: break-word;
                    position: relative;

                    .name {
                        overflow: hidden;
                        margin-bottom: 10px;
                        display: flex;
                        font-size: 20px;
                        font-weight: 700;
                        line-height: 20px;
                        position: relative;
                        padding-right: 65px;
                    }

                    .price {
                        background-color: #f5f3ef;
                        border-top: 1px dotted #dedede;
                        border-bottom: 1px dotted #dedede;
                        padding: 10px 0 10px;
                        line-height: 24px;
                        font-size: 14px;
                        position: relative;

                        .field {
                            display: flex;
                            margin-bottom: 5px;

                            .label {
                                width: 80px;
                                font-size: 14px;
                                float: left;
                                color: #666;
                                margin-left: 10px;
                            }

                            .text {
                                font-size: 14px;
                                float: left;
                                color: #666;
                                margin-left: 10px;
                            }
                        }
                    }

                    .btns {
                        margin-top: 10px;
                        font-size: 0;
                        display: flex;

                        .adoptionbtn {
                            margin-right: 15px;
                            width: 170px;
                            height: 50px;
                            font-size: 18px;
                            color: #b4a078;
                            border: 1px solid #b4a078;
                            background-color: #f5f3ef;
                        }

                        .addbtn {
                            height: 50px;
                            border-color: #b4a078;
                            background-color: #b4a078;
                        }

                        .addSc {
                            position: relative;
                            display: inline-block;
                            height: 50px;
                            width: 50px;
                            border: 1px solid #b4a078;
                            overflow: hidden;
                            text-align: center;
                            cursor: pointer;

                            .icon {
                                position: relative;
                                margin-top: 5px;
                                overflow: hidden;
                                font-size: 20px;
                            }

                            .text {
                                font-size: 13px;
                                line-height: 23px;
                                color: #b4a078;
                            }
                        }
                    }
                }
            }

            .detailBd {
                margin: 30px 0;
                display: flex;

                .leftInfo {
                    width: 100%;

                    .detailNavTab {
                        border-top: 1px solid #e8e8e8;
                        border-bottom: 1px solid #e8e8e8;
                        background-color: #f5f5f5;

                        ul {
                            display: flex;
                        }

                        .item {
                            width: 124px;
                            border: 1px solid #e8e8e8;
                            height: 42px;
                            line-height: 40px;
                            font-size: 14px;
                            position: relative;
                            text-align: center;
                            cursor: pointer;

                            &.active {
                                border-top: 3px solid #b4a078;
                                background-color: #fff;
                                border-bottom: 1px solid #fff;
                                color: #b4a078;
                            }
                        }
                    }

                    .info {
                        display: flex;
                        margin: 10px 0;
                        border: 1px dotted #dedede;

                        .name {
                            margin: 10px;
                            font-size: 16px;
                            line-height: 30px;

                            .visit {

                                /*border: 1px dotted #dedede;*/
                                /*padding: 20px;*/
                                width: 800px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>

