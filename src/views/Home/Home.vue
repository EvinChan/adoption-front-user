<template>
    <div>
        <MyHeader/>
        <div>
            <!-- 轮播图 -->
            <div>
                <el-carousel indicator-position="outside" height="420px">
                    <el-carousel-item v-for="(item, index) in carouselList" :key="index">
                        <img :src="item.src"/>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <!-- 宠物图集 -->
            <div class="picture g-row">
                <div class="commonHeader">
                    <div class="f-left lh1">
                        <div class="moreItems f-fz14">
                            <h3 class="name">萌宠图集</h3>
                        </div>
                        <small class="frontName f-fz14">等待你的宠爱</small>
                    </div>
                    <div class="f-right lh1">
                        <router-link class="moreItems f-fz14" to="morePicture" target="_blank">
                            查看更多 <span class="icon icon-right_s"></span>
                        </router-link>
                    </div>
                </div>
                <div class="pictureList">
                    <router-link class="pictures large" :to="'/detail?id=' + item.id"
                                 v-for="(item, index) in petPic" :key="index" target="_blank">
                        <div style="width:100%;height:100%;">
                            <img class="img img-noBgPic img-lazyload j-lazyload img-lazyloaded"
                                 :src="item.petInformation.imageSrc"/>
                        </div>
                    </router-link>
                </div>
            </div>
            <!-- 宠物狗展示 -->
            <div class="newPets g-row">
                <div class="commonHeader">
                    <div class="f-left lh1">
                        <div class="moreItems f-fz14">
                            <h3 class="name">宠物狗</h3>
                        </div>
                        <small class="frontName f-fz14">待领养宠物狗</small>
                    </div>
                    <div class="f-right lh1">
                        <router-link class="moreItems f-fz14" to="more?category=狗" target="_blank">
                            查看更多 <span class="icon icon-right_s"></span>
                        </router-link>
                    </div>
                </div>
                <div class="itemList">
                    <div class="newProduct product" v-for="(item, index) in dogList" :key="index">
                        <div class="hd">
                            <router-link class="imgWrap" :to="'/detail?id=' + item.id" target="_blank">
                                <div style="width:100%;height:100%;">
                                    <img class="img  img-lazyload img-lazyloaded" :src="item.petInformation.imageSrc"/>
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
            </div>
            <!-- 宠物猫展示 -->
            <div class="newPets g-row">
                <div class="commonHeader">
                    <div class="f-left lh1">
                        <div class="moreItems f-fz14">
                            <h3 class="name">宠物猫</h3>
                        </div>
                        <small class="frontName f-fz14">待领养宠物猫</small>
                    </div>
                    <div class="f-right lh1">
                        <router-link class="moreItems f-fz14" to="/more?category=猫" target="_blank">
                            查看更多 <span class="icon icon-right_s"></span>
                        </router-link>
                    </div>
                </div>
                <div class="itemList">
                    <div class="newProduct product" v-for="(item, index) in catList" :key="index">
                        <div class="hd">
                            <router-link :to="'/detail?id=' + item.id" class="imgWrap" target="_blank">
                                <div style="width:100%;height:100%;">
                                    <img class="img  img-lazyload img-lazyloaded" :src="item.petInformation.imageSrc"/>
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
            </div>
        </div>
        <!-- 底部 -->
        <MyFooter/>
    </div>
</template>

<script>
  import MyHeader from "@/components/MyHeader/MyHeader.vue";
  import MyFooter from "@/components/MyFooter/MyFooter.vue";

  import {getCarousel, getIndexPicture, getIndexPet} from '@/api/main';

  export default {
    components: {
      MyHeader,
      MyFooter
    },
    name: "home",
    data() {
      return {
        // 轮播图
        carouselList: [],
        //宠物图集
        petPic: [],
        //宠物狗
        dogList: [],
        //宠物猫
        catList: []
      };
    },
    created() {
      getCarousel().then(result => {
        result.data.carouselInfo.forEach(carousel => {
          this.carouselList.push(carousel)
        })
      })
      getIndexPicture().then(result => {
        result.data.petInfo.forEach(pet => {
          this.petPic.push(pet)
        })
      })
      getIndexPet('狗').then(result => {
        result.data.petInfo.forEach(pet => {
          this.dogList.push(pet)
        })
      })
      getIndexPet('猫').then(result => {
        result.data.petInfo.forEach(pet => {
          this.catList.push(pet)
        })
      })
    }
  };
</script>

<style lang="scss" scoped>
    a:hover {
        color: #b4a078;
    }

    /*轮播*/
    .el-carousel__container {
        img {
            width: 100%;
            height: 100%;
        }
    }

    /*公用列表头*/
    .commonHeader {
        padding-bottom: 20px;
        height: 48px;

        .name {
            font-size: 28px;
            font-weight: 700;
            line-height: 1;
            float: left;
            margin-right: 20px;
        }

        .frontName {
            padding-top: 13px;
            display: inline-block;
            line-height: 1;
        }

        .moreItems {
            display: inline-block;
            line-height: 1;
            padding-top: 14px;
        }
    }

    /*萌宠图集*/
    .picture {
        margin-top: 20px;

        .pictureList {
            overflow: hidden;

            .pictures {
                z-index: 1;
                width: 210px;
                float: left;
                margin-left: 10px;
                overflow: hidden;
                position: relative;
                text-align: center;

                /*第一个pictures的margin-left为0*/
                &:first-child {
                    margin-left: 0;
                }

                &.large {
                    height: 210px;
                }

                /*鼠标浮动于img放大1.05倍*/
                &:hover .img {
                    transform: scale(1.05);
                    transition: transform 1s;
                }

                .img {
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    position: absolute;
                    text-align: center;
                    -webkit-transition: -webkit-transform 1s;
                    -moz-transition: -moz-transform 1s;
                    -o-transition: -o-transform 1s;
                    transition: transform 1s;
                    z-index: 1;
                }
            }
        }
    }

    /*宠物*/
    .newPets {
        height: 395px;
        margin-top: 25px;

        .itemList {
            .newProduct {
                width: 265px;
                margin-right: 10px;

                &:last-child {
                    margin-right: 0;
                }

                &:hover {
                    -webkit-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.2);
                    -moz-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.2);
                    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.2);
                    background-color: #f4f0ea;
                }

                .hd {
                    background-color: #f4f4f4;
                    position: relative;
                    margin-bottom: 8px;
                    overflow: hidden;
                }

                .img {
                    width: 265px;
                    height: 265px;
                }

                .promBanner {
                    text-align: left;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 30px;
                    background-repeat: no-repeat;
                    padding-right: 10px;

                    .promTitle {
                        background-color: #999;
                        max-width: 200px;
                        height: 36px;
                        background-repeat: no-repeat;
                        background-size: auto 100%;
                        background-position: right;
                        margin-top: -6px;
                        z-index: 1;
                        padding-left: 8px;
                        padding-right: 14px;
                        float: left;
                        border-top-left-radius: 3px;

                        .title {
                            font-size: 12px;
                            height: 15px;
                            margin-top: 5px;
                            margin-left: 0;
                            padding-top: 0;
                            text-align: center;
                            color: #fff;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }

                        .subTitle {
                            font-size: 14px;
                            height: 20px;
                            line-height: 14px;
                            margin-top: 0;
                            font-weight: 700;
                            text-align: center;
                            color: #fff;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;

                            .qi {
                                font-weight: 400;
                                font-size: 12px;
                                vertical-align: top;
                                margin-top: -1px;
                                display: inline-block;
                            }
                        }
                    }

                    .promContent {
                        background-color: #f38245;
                        color: #fff;
                        text-align: left;
                        overflow: hidden;
                        height: 30px;
                        line-height: 30px;
                        font-size: 12px;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        margin-left: 4px;
                        padding-left: 4px;
                    }
                }

                .bd {
                }
            }

            .product {
                float: left;
                line-height: 1;
                text-align: center;
                font-size: 13px;
                height: 325px;
                position: relative;

                .prdtTags {
                    height: 20px;
                    font-size: 0;
                    color: #fff;
                    width: 200px;
                    margin: 0 auto 3px;
                    overflow: hidden;

                    .itemTag {
                        display: inline-block;
                        height: 20px;
                        line-height: 20px;
                        color: #fff;
                        padding: 0 5px;
                        font-size: 12px;
                        background-color: #e36844;

                        /*&:first-child {*/
                        /*    margin-left: 0;*/
                        /*}*/
                    }
                }

                .name {
                    margin-bottom: 4px;
                    line-height: 20px;
                }

                h4.name {
                    padding: 0 10px;
                }

            }
        }
    }
</style>
