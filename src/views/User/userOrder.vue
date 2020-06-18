<template>
    <div>
        <MyHeader/>
        <div class="orderBox">
            <div class="row">
                <!-- 面包屑 -->
                <div class="crumbs">
                    <router-link to="/">首页</router-link>
                    <div class="icon icon-right_s"></div>
                    <span class="">订单管理</span>
                </div>
                <div class="content">
                    <UserSide/>
                    <div class="orderMain">
                        <NavTab :tabList="tabList"
                                :init="searchParams.init"
                                @Click="handleClick"
                                :searchParams.init='searchParams.init'/>
                        <div v-if="orderList.length !== 0" class="orderContent">
                            <div class="item" v-for="(item,index) in orderList" :key='index'>
                                <div class="itemHead">
                                    <div class="textInfo">
                                        <span class="time">下单时间：{{item.gmt_create}}</span>
                                        <span class="id">订单号：{{item.id}}</span>
                                        <span class="id">申请表编号：{{item.adopId}}</span>
                                    </div>
                                </div>
                                <div class="itemMain">
                                    <div class="img">
                                        <router-link :to="'/detail?id='+item.petId" target="_blank">
                                            <img :src="item.orderPet.petInformation.imageSrc" alt="">
                                        </router-link>
                                    </div>
                                    <router-link :to="'/detail?id='+item.petId" class="name" target="_blank">
                                        {{item.orderPet.name}}
                                        {{item.orderPet.sex === 0 ? '公' : '母'}}
                                        {{item.orderPet.category.name}}
                                    </router-link>
                                    <div class="state">
                                        <div class="status" v-if="item.status === 0">待付款</div>
                                        <div class="status" v-if="item.status === 1">待发货</div>
                                        <div class="status" v-if="item.status === 2">待收货</div>
                                        <div class="status" v-if="item.status === 3">已完成</div>
                                    </div>
                                    <div class="price">
                                        <div class="shipping">配送方式：{{item.shipping === 0 ? '托运' : '自提'}}</div>
                                        <div class="mainPrice">运费：{{item.freight}}元</div>
                                    </div>
                                    <div class="btn">
                                        <div v-if="item.status === 0">
                                            <el-button @click.native.prevent="messageBoxCancel(item.id)"
                                                       type="text">
                                                取消订单
                                            </el-button>
                                            <el-button @click.native.prevent="openPayOrder(item.adopId)"
                                                       type="text"
                                                       target="_blank">
                                                去支付
                                            </el-button>
                                        </div>
                                        <el-button v-if="item.status === 2"
                                                   @click.native.prevent="messageBoxConfirm(item.id)"
                                                   type="text">
                                            确认收货
                                        </el-button>
                                        <el-button v-if="item.status === 3"
                                                   @click.native.prevent="openRevisit(item.id)"
                                                   type="text">
                                            发布宠物回访
                                        </el-button>
                                    </div>
                                    <div class="btn">
                                        <el-button @click.native.prevent="openSelectOrder(item.id)"
                                                   type="text">
                                            查看订单
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <NoData v-if="orderList.length === 0" position="0 -760px"/>
                        <!-- 分页 -->
                        <el-pagination
                                :current-page="page"
                                :page-size="limit"
                                :total="total"
                                background
                                layout="total, prev, pager, next, jumper"
                                @current-change="initOrder"/>
                    </div>
                </div>
            </div>
        </div>
        <MyFooter/>

        <!-- 查看订单信息表单对话框 -->
        <select-order
                ref="selectOrder"/>

        <!-- 查看订单信息表单对话框 -->
        <creat-revisit
                ref="creatRevisit"/>
    </div>
</template>
<script>
  import MyHeader from "@/components/MyHeader/MyHeader.vue";
  import MyFooter from "@/components/MyFooter/MyFooter.vue";
  import UserSide from "@/components/UserSide/UserSide.vue";
  import NavTab from "@/components/NavTab/NavTab.vue";
  import selectOrder from "@/components/Order/selectOrder";
  import creatRevisit from "@/components/Order/creatRevisit";
  import {getOrder, cancelOrder, confirmOrder} from '@/api/user'
  import {mapGetters} from 'vuex';

  export default {
    components: {
      selectOrder,
      creatRevisit,
      MyHeader,
      MyFooter,
      UserSide,
      NavTab
    },
    name: "userOrder",
    computed: {
      ...mapGetters([
        'id'
      ])
    },
    data() {
      return {
        tabList: [
          {text: '全部订单'},
          {text: '待付款'},
          {text: '待发货'},
          {text: '待收货'}
        ],
        orderList: [],
        listLoading: true,  //是否显示loading信息
        total: 0,   // 总记录数
        page: 1,    //页码
        limit: 10,  //每页记录数
        searchParams: {
          init: 0,
          id: ''
        }
      }
    },
    created() {
      this.initOrder()
    },
    methods: {
      initOrder(page = 1) {
        this.searchParams.id = this.id
        this.orderList = []
        this.page = page
        this.listLoading = true
        getOrder(this.page, this.limit, this.searchParams).then(result => {
          if (result.code === 200) {
            this.orderList = result.data.orderInfo.rows
            this.total = result.data.orderInfo.count
          }
          this.listLoading = false
        })
      },
      handleClick(i, page = 1) {
        if (i === this.searchParams.init) {
          return false
        }
        this.searchParams.init = i
        this.searchParams.id = this.id
        this.orderList = []
        this.page = page
        this.listLoading = true
        getOrder(this.page, this.limit, this.searchParams).then(result => {
          if (result.code === 200) {
            this.orderList = result.data.orderInfo.rows
            this.total = result.data.orderInfo.count
          }
          this.listLoading = false
        })
      },
      // 取消订单
      messageBoxCancel(id) {
        this.$confirm(`确认要取消订单吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.openCancelOrder(id)
        }).catch((result) => {
          if (result === 'cancel') {
            this.$message({
              type: 'info',
              message: '已取消操作！'
            })
          }
        })
      },
      openCancelOrder(id) {
        cancelOrder(id).then(result => {
          if (result.code === 200) {
            this.$message.success('取消订单成功')
            this.initOrder()
          }
        })
      },
      openPayOrder(adopId) {
        this.$router.push('/payOrder?adopId=' + adopId)
      },
      // 确认收货
      messageBoxConfirm(id) {
        this.$confirm(`确认要确认收货吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.openConfirmOrder(id)
        }).catch((result) => {
          if (result === 'cancel') {
            this.$message({
              type: 'info',
              message: '已取消操作！'
            })
          }
        })
      },
      openConfirmOrder(id) {
        confirmOrder(id).then(result => {
          if (result.code === 200) {
            this.$message.success('确认收货成功')
            this.initOrder()
          }
        })
      },
      // 上传回访信息
      openRevisit(id) {
        this.$refs.creatRevisit.open(id)
      },
      // 查看订单
      openSelectOrder(id) {
        this.$refs.selectOrder.open(id)
      }
    },
  }
</script>

<style lang="scss" scoped>
    .orderBox {
        .content {
            display: flex;

            .orderMain {
                width: 890px;
                margin-left: 20px;
                overflow: hidden;

                .orderContent {
                    margin-top: 20px;

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
                                margin-left: 20px;

                                .id {
                                    margin-left: 40px;
                                }
                            }

                            .delete {
                                margin-right: 20px;
                                cursor: pointer;
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
                                width: 190px;
                                text-align: left;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                            }

                            .state {
                                width: 130px;
                                border-left: 1px solid #e8e8e8;
                                border-right: 1px solid #e8e8e8;
                            }

                            .price {
                                width: 170px;

                                .mainPrice {
                                    font-size: 14px;
                                    font-weight: 700;
                                }
                            }

                            .btn {
                                width: 130px;
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
