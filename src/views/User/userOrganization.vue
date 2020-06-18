<template>
    <div>
        <MyHeader/>
        <div class="organizationBox">
            <div class="row">
                <!-- 面包屑 -->
                <div class="crumbs">
                    <router-link to="/">首页</router-link>
                    <div class="icon icon-right_s"></div>
                    <span class="">机构申请表</span>
                </div>
                <div class="content">
                    <UserSide/>
                    <div class="organizationMain">
                        <div v-if="organizationList.length !== 0" class="organizationContent">
                            <div class="item" v-for="(item,index) in organizationList" :key='index'>
                                <div class="itemHead">
                                    <div class="textInfo">
                                        <span class="id">申请表编号：{{item.id}}</span>
                                    </div>
                                </div>
                                <div class="itemMain">
                                    <div class="name">
                                        机构地址：
                                        {{item.orgProvince.name}}
                                        {{item.orgCity.name}}
                                        {{item.detail}}
                                    </div>
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
                                    </div>
                                    <div class="btn">
                                        <el-button @click.native.prevent="openSelectOrganization(item.id)"
                                                   type="text">
                                            查看申请表
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <NoData v-if="organizationList.length === 0" position="0 -760px"/>
                        <!-- 分页 -->
                        <el-pagination
                                :current-page="page"
                                :page-size="limit"
                                :total="total"
                                background
                                layout="total, prev, pager, next, jumper"
                                @current-change="initOrganization"/>
                    </div>
                </div>
            </div>
        </div>
        <MyFooter/>

        <!-- 查看机构申请表表单对话框 -->
        <select-organization
                ref="selectOrganization"/>
    </div>
</template>

<script>
  import MyHeader from "@/components/MyHeader/MyHeader.vue";
  import MyFooter from "@/components/MyFooter/MyFooter.vue";
  import UserSide from "@/components/UserSide/UserSide.vue";
  import selectOrganization from '@/components/Organization/selectOrganization';

  import {mapGetters} from 'vuex';
  import {cancelOrganization, getOrganization} from '@/api/user';

  export default {
    components: {
      MyHeader,
      MyFooter,
      UserSide,
      selectOrganization
    },
    name: "userOrganization",
    computed: {
      ...mapGetters([
        'id'
      ])
    },
    data() {
      return {
        organizationList: [],
        listLoading: true,  //是否显示loading信息
        total: 0,   // 总记录数
        page: 1,    //页码
        limit: 10,  //每页记录数
        searchParams: {
          id: ''
        }
      }
    },
    created() {
      this.initOrganization()
    },
    methods: {
      initOrganization(page = 1) {
        this.searchParams.id = this.id
        this.organizationList = []
        this.page = page
        this.listLoading = true
        getOrganization(this.page, this.limit, this.searchParams).then(result => {
          if (result.code === 200) {
            this.organizationList = result.data.organizationInfo.rows
            this.total = result.data.organizationInfo.count
          }
          this.listLoading = false
        })
      },
      refreshList() {
        this.initOrganization()
      },
      messageBoxCancel(id) {
        this.$confirm(`确认要取消申请吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.openCancelOrganization(id)
        }).catch((result) => {
          if (result === 'cancel') {
            this.$message({
              type: 'info',
              message: '已取消操作！'
            })
          }
        })
      },
      openCancelOrganization(id) {
        if (id) {
          cancelOrganization(id).then(result => {
            if (result.code === 200) {
              this.$message.success('取消申请成功')
              this.refreshList()
            }
          })
        }
      },
      openSelectOrganization(id) {
        this.$refs.selectOrganization.open(id)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .organizationBox {
        .content {
            display: flex;

            .organizationMain {
                width: 890px;
                margin-left: 20px;
                overflow: hidden;

                .organizationContent {

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
                                width: 400px;
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
