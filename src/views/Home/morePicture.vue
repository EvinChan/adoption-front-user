<template>
    <div>
        <MyHeader/>
        <div class="CategoryList">
            <div class="row">
                <div class="crumbs">
                    <router-link to="/">首页</router-link>
                    <div class="icon icon-right_s"></div>
                    <span>萌宠图集</span>
                </div>
                <div class="pictureList">
                    <router-link :to="'/detail?id=' + item.id" class="pictures large" v-for="(item, index) in petPic"
                                 :key="index">
                        <div style="width:100%;height:100%;">
                            <img class="img img-noBgPic img-lazyload j-lazyload img-lazyloaded"
                                 :src="item.petInformation.imageSrc"/>
                        </div>
                    </router-link>
                </div>
                <!-- 分页 -->
                <el-pagination
                        :current-page="page"
                        :page-size="limit"
                        :total="total"
                        background
                        layout="total, prev, pager, next, jumper"
                        @current-change="initMorePet"/>
            </div>
        </div>
        <MyFooter/>
    </div>
</template>

<script>
  import MyHeader from "@/components/MyHeader/MyHeader.vue";
  import MyFooter from "@/components/MyFooter/MyFooter.vue";

  import {getMorePicture} from '@/api/main';

  export default {
    components: {
      MyHeader,
      MyFooter
    },
    name: "morePicture",
    data() {
      return {
        petPic: [],
        total: 0,   // 总记录数
        page: 1,    //页码
        limit: 20,  //每页记录数
      }
    },
    created() {
      this.initMorePet()
    },
    methods: {
      initMorePet(page = 1) {
        this.petPic = []
        this.page = page
        getMorePicture(this.page, this.limit).then(result => {
          result.data.petInfo.rows.forEach(pet => {
            this.petPic.push(pet)
          })
          this.total = result.data.petInfo.count
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
    .CategoryList {

        .pictureList {
            overflow: hidden;

            .pictures {
                z-index: 1;
                width: 205px;
                float: left;
                margin-left: 10px;
                margin-bottom: 10px;
                overflow: hidden;
                position: relative;
                text-align: center;

                &.large {
                    height: 205px;
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
</style>

