<template>
    <div>
        <MyHeader/>
        <div class="adoptionBox">
            <div class="row">
                <!-- 面包屑 -->
                <div class="crumbs">
                    <router-link to="/">首页</router-link>
                    <div class="icon icon-right_s"></div>
                    <span class="">领养申请表</span>
                </div>
                <div class="content">
                    <UserSide/>
                    <div class="adoptionMain">
                        <div v-if="adoptionList.length !== 0" class="adoptionContent">
                            <div class="item" v-for="(item,index) in adoptionList" :key='index'>
                                <div class="itemHead">
                                    <div class="textInfo">
                                        <span class="id">申请表编号：{{item.id}}</span>
                                    </div>
                                </div>
                                <div class="itemMain">
                                    <div class="img">
                                        <router-link :to="'/detail?id='+item.petId" target="_blank">
                                            <img :src="item.adoptionPet.petInformation.imageSrc" alt="">
                                        </router-link>
                                    </div>
                                    <router-link :to="'/detail?id='+item.petId" class="name" target="_blank">
                                        {{item.adoptionPet.name}}
                                        {{item.adoptionPet.sex === 0 ? '公' : '母'}}
                                        {{item.adoptionPet.category.name}}
                                    </router-link>
                                    <div class="state">
                                        <div class="status" v-if="item.status === 0">未审核</div>
                                        <div class="status" v-if="item.status === 1">审核失败</div>
                                        <div class="status" v-if="item.status === 2">审核通过</div>
                                        <div class="status" v-if="item.status === 3">用户取消</div>
                                    </div>
                                    <div class="btn">
                                        <el-button v-if="item.status === 0"
                                                   @click.native.prevent="messageBoxCancel(item.id)"
                                                   type="text">
                                            取消申请
                                        </el-button>
                                        <router-link
                                                :to="'/order?adopId='+item.id"
                                                v-if="item.status === 2 && !item.orderAdoption"
                                                style="color: #409EFF"
                                                target="_blank">
                                            提交订单
                                        </router-link>
                                        <router-link
                                                to="userOrder"
                                                v-if="item.status === 2 && item.orderAdoption"
                                                style="color: #409EFF"
                                                target="_blank">
                                            查看订单
                                        </router-link>
                                    </div>
                                    <div class="btn">
                                        <el-button @click.native.prevent="openSelectAdoption(item.id)" type="text">
                                            查看申请表
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <NoData v-if="adoptionList.length === 0" position="0 -760px"/>
                        <!-- 分页 -->
                        <el-pagination
                                :current-page="page"
                                :page-size="limit"
                                :total="total"
                                background
                                layout="total, prev, pager, next, jumper"
                                @current-change="initAdoption"/>
                    </div>
                </div>
            </div>
        </div>
        <MyFooter/>

        <!-- 查看领养申请表表单对话框 -->
        <select-adoption
                ref="selectAdoption"/>
    </div>
</template>

<script>
  import MyHeader from "@/components/MyHeader/MyHeader.vue";
  import MyFooter from "@/components/MyFooter/MyFooter.vue";
  import UserSide from "@/components/UserSide/UserSide.vue";
  import selectAdoption from '@/components/Adoption/selectAdoption';

  import {mapGetters} from 'vuex';
  import {getAdoption, cancelAdoption} from '@/api/user';

  export default {
    components: {
      MyHeader,
      MyFooter,
      UserSide,
      selectAdoption
    },
    name: "userAdoption",
    computed: {
      ...mapGetters([
        'id'
      ])
    },
    data() {
      return {
        adoptionList: [],
        listLoading: true,  //是否显示loading信息
        total: 0,   // 总记录数
        page: 1,    //页码
        limit: 10,  //每页记录数
        searchParams: {
          id: ''
        },
        adoption: true
      }
    },
    created() {
      this.initAdoption()
    },
    methods: {
      initAdoption(page = 1) {
        this.searchParams.id = this.id
        this.adoptionList = []
        this.page = page
        this.listLoading = true
        getAdoption(this.page, this.limit, this.searchParams).then(result => {
          if (result.code === 200) {
            this.adoptionList = result.data.adoptionInfo.rows
            this.total = result.data.adoptionInfo.count
          }
          this.listLoading = false
        })
      },
      refreshList() {
        this.initAdoption()
      },
      messageBoxCancel(id) {
        this.$confirm(`确认要取消申请吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.openCancelAdoption(id)
        }).catch((result) => {
          if (result === 'cancel') {
            this.$message({
              type: 'info',
              message: '已取消操作！'
            })
          }
        })
      },
      openCancelAdoption(id) {
        if (id) {
          cancelAdoption(id).then(result => {
            if (result.code === 200) {
              this.$message.success('取消申请成功')
              this.refreshList()
            }
          })
        }
      },
      openSelectAdoption(id) {
        this.$refs.selectAdoption.open(id)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .adoptionBox {
        .content {
            display: flex;

            .adoptionMain {
                width: 890px;
                margin-left: 20px;
                overflow: hidden;

                .adoptionContent {

                    .item {
                        border: 1px solid #e8e8e8;

                        .itemHead {
                            background-color: #f5f5f5;
                            height: 43px;
                            border-bottom: 1px solid #e8e8e8;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            font-size: 12px;

                            .textInfo {
                                .id {
                                    margin-left: 20px;
                                }
                            }
                        }

                        .itemMain {
                            text-align: center;
                            font-size: 14px;
                            display: flex;
                            padding: 20px 0;
                            align-items: center;

                            .img {
                                margin-left: 20px;

                                img {
                                    width: 100px;
                                    height: 100px;
                                    background-color: #f4f4f4;
                                    margin-right: 10px;
                                }
                            }

                            .name {
                                margin-left: 10px;
                                width: 250px;
                                text-align: left;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                            }

                            .state {
                                width: 150px;
                                border-left: 1px solid #e8e8e8;
                                border-right: 1px solid #e8e8e8;
                            }

                            .btn {
                                width: 160px;
                            }

                        }
                    }
                }

                .el-pagination {
                    margin-top: 20px;
                }
            }
        }
    }
</style>
