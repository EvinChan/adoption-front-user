<template>
    <div>
        <MyHeader/>
        <div class="content">
            <div class="row">
                <div class="confirmRoot">
                    <div class="panel">
                        <div class="hd">
                            <span>收货信息</span>
                        </div>
                        <div class="bd">
                            <div class="orderAddress">
                                <div class="leftInfo">
                                    <div v-if="addressList.name">
                                        <p class="line">
                                            <i class="icon icon-dingwei"></i>
                                            <span class="defaultTxt">默认地址</span>
                                        </p>
                                        <p class="line">
                                            <label>收货人：</label>
                                            <span class="text">{{addressList.name}}</span>
                                        </p>
                                        <p class="line">
                                            <label>联系方式：</label>
                                            <span class="text">{{addressList.mobile}}</span>
                                        </p>
                                        <p class="line">
                                            <label>收货地址：</label>
                                            <span class="text">
                                                {{addressList.addressProvince.name}}
                                                {{addressList.addressCity.name}}
                                                {{addressList.detail}}
                                            </span>
                                        </p>
                                    </div>
                                    <div v-else>
                                        <router-link to="address" style="color:#409EFF">请先设置默认地址</router-link>
                                    </div>
                                </div>
                                <div class="rightInfo">
                                    <div v-if="addressList.name">
                                        <router-link to="address" style="color:#409EFF">修改默认地址</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="itemInfo">
                        <div class="packageList">
                            <div class="m-table">
                                <table>
                                    <thead class="hd">
                                    <tr>
                                        <td>宠物信息</td>
                                        <td>年龄</td>
                                        <td>体重</td>
                                        <td>发布省份</td>
                                    </tr>
                                    </thead>
                                    <tbody class="tbody">
                                    <tr v-for="(item,index) in petList" :key='index'>
                                        <td>
                                            <div class="imgWrap">
                                                <router-link :to="'/detail?id='+item.id" target="_blank">
                                                    <img :src="item.petInformation.imageSrc" alt="">
                                                </router-link>
                                            </div>
                                            <div class="infoWrap">
                                                <router-link :to="'/detail?id='+item.id" class="name" target="_blank">
                                                    {{item.name}}
                                                    {{item.sex === 0 ? '公' : '母'}}
                                                    {{item.category.name}}
                                                </router-link>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="age">
                                                {{item.age}}岁
                                            </div>
                                        </td>
                                        <td>
                                            <div class="weight">
                                                {{item.weight}}kg
                                            </div>
                                        </td>
                                        <td>
                                            <div class="provinceName">
                                                {{item.provinceName.name}}
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="itemInfoFt">
                            <div class="row2">
                                <div class="leftInfo">
                                    <div class="line1">
                                        <label>备注：</label>
                                        <el-input v-model="remark"
                                                  maxlength="50"
                                                  show-word-limit
                                                  type="textarea"
                                                  style="width: 420px"
                                                  :rows="2"
                                                  placeholder="选填"
                                                  auto-complete="off"/>
                                    </div>
                                </div>
                                <div class="rightInfo">
                                    <div class="confirmPayInfo">
                                        <div class="line1">
                                            <label>配送方式:</label>
                                            <el-switch
                                                    v-model="value1"
                                                    active-text="自提"
                                                    inactive-text="托运"
                                                    @change="changeShipping">
                                            </el-switch>
                                        </div>
                                        <div class="line1">
                                            <label>运费:</label>
                                            <span class="data" :model="freight">{{freight}}元</span>
                                        </div>
                                        <div class="line2">
                                            <label>应付总额:</label>
                                            <span class="data" :model="freight">{{freight}}元</span>
                                        </div>
                                        <div class="line3">
                                            <button @click="submissionOrder">
                                                {{freight === 0 ? '提交订单' : '去付款'}}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <MyFooter/>
    </div>
</template>

<script>
  import MyHeader from "@/components/MyHeader/MyHeader.vue";
  import MyFooter from "@/components/MyFooter/MyFooter.vue";
  import {getOrderPet, getOrderAddress, createOrder, selectOrder} from '@/api/user';

  export default {
    components: {
      MyHeader,
      MyFooter
    },
    name: "order",
    data() {
      return {
        changeInit: 0,
        petList: [],
        addressList: {
          name: '',
          mobile: '',
          detail: '',
          addressProvince: {
            name: ''
          },
          addressCity: {
            name: ''
          }
        },
        queryParams: {
          adopId: ''
        },
        freight: 0,
        remark: '',
        orderList: {},  //配送方式、运费、状态、备注
        value1: true,
      }
    },
    created() {
      this.initOrder()
    },
    methods: {
      // 获取adopId
      initOrder() {
        this.queryParams.adopId = this.$route.query.adopId
        this.getPet()
        this.getAddress()
      },
      // 添加宠物信息到petList
      getPet() {
        this.petList = []
        getOrderPet(this.queryParams).then(result => {
          result.data.petInfo.forEach(pet => {
            this.petList.push(pet)
          })
        })
      },
      getAddress() {
        this.addressList = {}
        getOrderAddress().then(result => {
          this.addressList = result.data.addressInfo
        })
      },
      changeShipping() {
        if (this.value1) {
          this.freight = 0
        } else {
          this.freight = this.petList[0].weight * 20
        }
      },
      submissionOrder() {
        selectOrder(this.queryParams.adopId).then(result => {
          if (result.data.orderInfo) {
            this.$message.error('该订单已提交，请勿重复提交！')
            return false
          } else {
            if (!this.addressList.name) {
              this.$message.error('请先设置默认地址')
            } else {
              this.orderList.adopId = this.queryParams.adopId
              this.orderList.remark = this.remark
              if (this.value1) {
                this.orderList.shipping = 1
                this.orderList.freight = '0'
                this.orderList.status = 1
              } else {
                this.orderList.shipping = 0
                this.orderList.freight = this.freight
                this.orderList.status = 0
              }
              createOrder(this.orderList).then(result => {
                if (result.code === 200) {
                  this.$message.success('生成订单成功')
                  if (this.orderList.status === 0) {
                    this.$router.push('/payOrder?adopId=' + this.orderList.adopId)
                  } else {
                    this.$router.push('/userOrder')
                  }
                }
              })
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
    .content {
        margin: 30px 0;

        .confirmRoot {
            .panel {
                margin-bottom: 20px;
                border: 1px solid #e8e8e8;
                background-color: #fff;

                .hd {
                    padding-left: 21px;
                    background-color: #f5f5f5;
                    height: 42px;
                    border-bottom: 1px solid #e8e8e8;
                    line-height: 41px;
                    color: #999;
                    font-size: 14px;
                }

                .bd {
                    .orderAddress {
                        display: flex;
                        justify-content: space-between;
                        padding: 30px;
                        font-size: 14px;

                        .leftInfo {
                            width: 805px;

                            .icon {
                                font-size: 18px;
                            }

                            .line {
                                line-height: 24px;
                                margin-top: 10px;
                                display: flex;

                                .defaultTxt {
                                    letter-spacing: 5px;
                                    display: inline-block;
                                    height: 32px;
                                    line-height: 34px;
                                    padding-left: 10px;
                                }

                                &:first-child {
                                    margin: 0
                                }

                                label {
                                    color: #999;
                                    width: 70px;
                                    text-align: right;
                                    max-width: 720px;
                                }

                                .text {
                                    max-width: 720px;
                                }
                            }
                        }
                    }
                }
            }

            .itemInfo {

                .packageList {
                    font-size: 14px;

                    .m-table {
                        box-sizing: border-box;
                        border: 1px solid #e8e8e8;
                        position: relative;
                        width: 100%;
                        padding: 0 21px;
                        background-color: #fff;

                        table {
                            border-collapse: collapse;
                            border-spacing: 0;
                            table-layout: fixed;
                            position: relative;
                            z-index: 1;
                            text-align: center;

                            .hd {
                                line-height: 41px;
                                height: 42px;
                                color: #999;
                            }

                            td {
                                &:first-child {
                                    text-align: left;
                                    width: 360px
                                }

                                &:nth-child(2) {
                                    width: 165px;
                                }

                                &:nth-child(3) {
                                    width: 171px;
                                }

                                &:nth-child(4) {
                                    width: 191px;
                                }
                            }

                            .tbody {
                                .imgWrap img {
                                    width: 100px;
                                    height: 100px;
                                    background-color: #f4f4f4;
                                }

                                td {
                                    padding: 20px 0;

                                    .infoWrap {
                                        position: relative;
                                        margin-left: 15px;
                                        height: 100px;
                                        padding: 2px 0 0 10px;

                                        .name {
                                            margin-left: 10px;
                                            width: 250px;
                                            text-align: left;
                                            overflow: hidden;
                                            white-space: nowrap;
                                            text-overflow: ellipsis;
                                        }

                                    }

                                    &:first-child {
                                        display: flex;

                                        .type {
                                            max-width: 248px;
                                            overflow: hidden;
                                            line-height: 22px;
                                            font-size: 12px;
                                            color: #999;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                .itemInfoFt {
                    background-color: #f5f5f5;
                    border-left: 1px solid #E8E8E8;
                    border-right: 1px solid #E8E8E8;
                    border-bottom: 1px solid #E8E8E8;

                    .row2 {
                        display: flex;
                        justify-content: space-between;
                        flex-flow: row nowrap;
                        padding: 30px 30px 30px 30px;
                        overflow: hidden;

                        .leftInfo {
                            .line1 {
                                width: 480px;
                                font-size: 14px;
                                display: flex;
                                justify-content: space-between;

                                label {
                                    display: inline-block;
                                    width: 60px;
                                    text-align: left;
                                }
                            }
                        }

                        .rightInfo {
                            .confirmPayInfo {
                                text-align: right;
                                position: relative;

                                .line1 {
                                    width: 280px;
                                    font-size: 14px;
                                    margin-bottom: 20px;
                                    display: flex;
                                    justify-content: space-between;

                                    label {
                                        display: inline-block;
                                        width: 71px;
                                        text-align: right;
                                    }

                                    .data {
                                        text-align: right;
                                    }
                                }

                                .line2 {
                                    margin-bottom: 20px;
                                    padding-top: 24px;
                                    border-top: 1px solid #e8e8e8;
                                    font-size: 14px;
                                    width: 280px;
                                    display: flex;
                                    justify-content: space-between;

                                    label {
                                        display: inline-block;
                                        width: 71px;
                                        text-align: right;
                                    }

                                    .data {
                                        text-align: right;
                                        font-weight: 700;
                                        color: #d4282d;
                                        font-size: 20px;
                                    }
                                }

                                .line3 {
                                    button {
                                        outline: none;
                                        cursor: pointer;
                                        color: #fff;
                                        border: 1px solid #c0ae8a;
                                        background-color: #c0ae8a;
                                        width: 168px;
                                        height: 50px;
                                        line-height: 50px;
                                        font-size: 18px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>

