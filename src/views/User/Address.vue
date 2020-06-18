<template>
    <div>
        <MyHeader/>
        <div class="addressBox">
            <div class="row">
                <!-- 面包屑 -->
                <div class="crumbs">
                    <router-link to="/">首页</router-link>
                    <div class="icon icon-right_s"></div>
                    <span class="">地址管理</span>
                </div>
                <div class="content">
                    <UserSide/>
                    <div class="main">
                        <div class="addressContent">
                            <div class="addressHeader">
                                <div class="leftInfo">已保存收货地址(地址最多20条，还能保存{{20-addressList.length}}条)</div>
                                <a @click="openCreateAddress" class="rightInfo" href="javascript:;">+新建地址</a>
                            </div>

                            <el-table
                                    :data="addressList"
                                    element-loading-text="数据加载中"
                                    style="width: 100%;margin: 20px 0">
                                <el-table-column
                                        prop="name"
                                        label="收货人姓名"
                                        align="center"
                                        width="120">
                                </el-table-column>
                                <el-table-column
                                        prop="mobile"
                                        label="收货人号码"
                                        align="center"
                                        width="120">
                                </el-table-column>
                                <el-table-column
                                        prop="addressProvince.name"
                                        label="省份"
                                        align="center"
                                        width="90">
                                </el-table-column>
                                <el-table-column
                                        prop="addressCity.name"
                                        label="市"
                                        align="center"
                                        width="90">
                                </el-table-column>
                                <el-table-column
                                        prop="detail"
                                        label="详细地址"
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        align="center"
                                        width="190">
                                    <template slot-scope="scope">
                                        <el-button @click.native.prevent="openUpdateAddress(scope.row.id)" type="text">
                                            编辑
                                        </el-button>
                                        <el-button @click.native.prevent="messageBoxDelete(scope.row.id)" type="text">
                                            删除
                                        </el-button>
                                        <el-button v-if="scope.row.isDefault === 1" type="text" disabled>
                                            默认地址
                                        </el-button>
                                        <el-button v-else @click.native.prevent="messageBoxDefault(scope.row.id)"
                                                   type="text">
                                            设为默认地址
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- 分页 -->
                            <el-pagination
                                    :current-page="page"
                                    :page-size="limit"
                                    :total="total"
                                    background
                                    layout="total, prev, pager, next, jumper"
                                    @current-change="initAddress"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <MyFooter/>

        <!-- 添加地址信息表单对话框 -->
        <create-address
                ref="createAddress"
                @onSaveSuccess="refreshList"/>

        <!-- 修改地址信息表单对话框 -->
        <update-address
                ref="updateAddress"
                @onSaveSuccess="refreshList"/>

    </div>
</template>

<script>
  import MyHeader from "@/components/MyHeader/MyHeader.vue";
  import MyFooter from "@/components/MyFooter/MyFooter.vue";
  import UserSide from "@/components/UserSide/UserSide.vue";
  import createAddress from "@/components/Address/createAddress";
  import updateAddress from "@/components/Address/updateAddress";
  import {mapGetters} from 'vuex';
  import {getAddress, deleteAddress, updateDefault} from '@/api/user';

  export default {
    components: {
      MyHeader,
      MyFooter,
      UserSide,
      createAddress,
      updateAddress
    },
    // name: "address",
    computed: {
      ...mapGetters([
        'id'
      ])
    },
    data() {
      return {
        addressList: [],
        listLoading: true,  //是否显示loading信息
        total: 0,   // 总记录数
        page: 1,    //页码
        limit: 10,  //每页记录数
        searchParams: {
          userId: ''
        }
      }
    },
    created() {
      this.initAddress()
    },
    methods: {
      initAddress(page = 1) {
        this.searchParams.userId = this.id
        this.addressList = []
        this.page = page
        this.listLoading = true
        getAddress(this.page, this.limit, this.searchParams).then(result => {
          if (result.code === 200) {
            this.addressList = result.data.addressInfo.rows
            this.total = result.data.addressInfo.count
          }
          this.listLoading = false
        })
      },
      refreshList() {
        this.initAddress()
      },
      openCreateAddress() {
        if (this.addressList.length < 20) {
          this.$refs.createAddress.open()
        } else {
          this.$message.error('收货地址已达上限')
        }
      },
      openUpdateAddress(id) {
        this.$refs.updateAddress.open(id)
      },
      messageBoxDelete(id) {
        this.$confirm(`确认要删除地址吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.openDeleteAddress(id)
        }).catch((result) => {
          if (result === 'cancel') {
            this.$message({
              type: 'info',
              message: '已取消删除！'
            })
          }
        })
      },
      openDeleteAddress(id) {
        deleteAddress(id).then(result => {
          if (result.code === 200) {
            this.$message.success('删除成功')
            this.refreshList()
          }
        })
      },
      messageBoxDefault(id) {
        this.$confirm(`确认要设置为默认地址吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.updateAddressDefault(id)
        }).catch((result) => {
          if (result === 'cancel') {
            this.$message({
              type: 'info',
              message: '已取消设置！'
            })
          }
        })
      },
      updateAddressDefault(id) {
        this.searchParams.userId = this.id
        this.searchParams.id = id
        updateDefault(this.searchParams).then(result => {
          if (result.code === 200) {
            this.$message.success('设置默认地址成功')
            this.refreshList()
          }
        })
      },

    }
  }
</script>

<style lang="scss" scoped>
    .addressBox {
        .content {
            display: flex;

            .main {
                width: 890px;
                overflow: hidden;
                z-index: 1;
                margin-left: 20px;

                .addressContent {
                    border: 1px solid #eaeaea;
                    padding: 20px;

                    .addressHeader {
                        display: flex;
                        justify-content: space-between;

                        .leftInfo {
                            color: #666666;
                            font-size: 14px;
                            padding-left: 10px;
                        }

                        .rightInfo {
                            color: #409EFF;
                            font-size: 14px;
                            padding-right: 10px;
                        }
                    }

                    .el-table {
                        color: #666666;

                        .el-table__header th, .el-table__header tr {
                            height: 60px;
                        }

                        .el-table__body th, .el-table__body tr {
                            height: 100px;
                        }
                    }
                }
            }
        }
    }
</style>

