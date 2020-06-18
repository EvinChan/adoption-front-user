<template>
    <!-- 主信息 -->
    <div class="funcTab" :class="showNavTop ? 'funcTab-fixed' : ''">
        <div class="row" style="height: 100%;">
            <!-- logo -->
            <router-link to="/" v-show="!showNavTop" class="tabLogo">
                <i class="logo"></i>
            </router-link>

            <!-- nav -->
            <ul class="tabNav">
                <li class="tabNav-item">
                    <router-link to="/" class="topLevel" exact>首页</router-link>
                </li>
                <li class="tabNav-item" :class="index == tabNav.length-1 ? 'last' :''"
                    v-for="(item,index) in tabNav" :key='index'>
                    <router-link :to="item.url" class="topLevel" exact>{{item.text}}</router-link>
                </li>
            </ul>

            <!-- search -->
            <div v-show="!showNavTop" class="search">
                <div class="searchInputWrap">
                    <i class="search-gray icon icon-search"></i>
                    <input type="text" v-model="inputQuery" class="searchInput" autocomplete="off" maxlength="30"
                           name="searchInput" placeholder="请输入要搜索的宠物品种" clearable>
                </div>
                <div @click="handleSearch" class="searchButton">
                    <span class="searchButtonName">搜索</span>
                </div>
                <div class="hotKeywordListWrap">
                    <div class="hotKeywordList">
                        <div class="hotKeywordRow">
                            <div @click="handleHot(item)" class="hotKeyword"
                                 v-for="(item,index) in hotSearch" :key="index">
                                {{item}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import {searchHotCategory} from '@/api/main'

  export default {
    name: 'MyTop',
    data() {
      return {
        showNavTop: false,
        isShowInfo: true,
        inputQuery: '',
        tabNav: [
          {text: '宠物狗', url: '/category?category=狗'},
          {text: '宠物猫', url: '/category?category=猫'},
          {text: '领养准则', url: '/notice?id=6'},
          {text: '系统公告', url: '/noticeList'},
          {text: '宠物机构', url: '/organizationList'},
          {text: '联系我们', url: '/centerInfo'},
        ],
        hotSearch: []
      }
    },
    created() {
      this.initHot()
    },
    methods: {
      initHot() {
        searchHotCategory().then(result => {
          for (let i = 0; i < 5; i++) {
            this.hotSearch.push(result.data.hotInfo[i].category.name)
          }
        })
      },
      // 搜索热词
      handleHot(e) {
        this.inputQuery = e;
        this.handleSearch();
      },
      // 点击搜索
      handleSearch() {
        this.$router.push(`/search?keyword=${this.inputQuery}`)
        this.inputQuery = ''
      }
    }
  }

</script>

<style lang="scss" scoped>
    .funcTab {
        position: relative;
        height: 140px;
        background-color: #fff;
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, .2);

        .tabLogo {
            position: absolute;
            top: 15px;
            left: 0;

            .logo {
                height: 80px;
                width: 250px;
                display: block;
                background-image: url('http://localhost:5000/system/logo.png');
            }
        }

        .tabNav {
            line-height: 1;
            font-weight: 700;
            position: absolute;
            height: 30px;
            line-height: 30px;
            bottom: 9px;
            width: 100%;

            .tabNav-item:hover {
                display: block;
            }

            .tabNav-item {
                float: left;
                margin: 0 26px;
                font-size: 14px;

                .router-link-active {
                    color: #b4a078;
                    border-bottom: 3px solid #b4a078;
                }

                &:nth-child(1) {
                    margin-left: 0;
                    margin-left: 0;
                }

                &:last-child {
                    margin-right: 0;
                }

                .topLevel {
                    display: block;
                    padding-bottom: 7px;
                    color: #000;
                }

            }
        }

        .search {
            z-index: 3;
            position: relative;
            margin-top: 26px;
            float: right;
            width: 532px;
            height: 36px;

            .searchInputWrap {

                .search-gray {
                    font-size: 14px;
                    background-position: 0 -312px;
                    height: 14px;
                    width: 14px;
                    position: absolute;
                    left: 18px;
                    top: 12px;
                }

                .searchInput {
                    color: #999;
                    position: absolute;
                    box-sizing: border-box;
                    left: 0;
                    top: 0;
                    z-index: 1;
                    display: block;
                    height: 38px;
                    line-height: 38px;
                    padding-top: 2px;
                    padding-bottom: 2px;
                    border: 1px solid #B4A078;
                    border-bottom-left-radius: 19px;
                    border-top-left-radius: 19px;
                    font-size: 14px;
                    width: 442px;
                    padding-left: 38px;
                    outline: 0;
                    overflow: hidden;
                    background: 0 0;
                }
            }

            .searchButton {
                width: 90px;
                height: 38px;
                background-color: #B4A078;
                border-top-right-radius: 19px;
                border-bottom-right-radius: 19px;
                cursor: pointer;
                float: right;
                color: #fff;
                line-height: 38px;
                text-align: center;
                font-size: 16px;
                letter-spacing: 1px;
                box-sizing: border-box;
            }

            .hotKeywordListWrap {
                margin-top: 46px;
                margin-left: 8px;
                width: 444px;
                height: 18px;
                overflow: hidden;

                .hotKeywordList {
                    position: relative;
                    overflow: hidden;
                    top: 0;

                    .hotKeywordRow {
                        height: 18px;
                        line-height: 18px;
                        margin-bottom: 18px;
                        font-size: 0;

                        .hotKeyword {
                            display: inline-block;
                            color: #999;
                            padding: 0 10px;
                            border-right: 1px solid #ccc;
                            cursor: pointer;
                            line-height: 12px;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                            max-width: 444px;
                            font-size: 12px;

                            &:last-child {
                                border-right: 0;
                            }
                        }
                    }
                }
            }
        }
    }

</style>
