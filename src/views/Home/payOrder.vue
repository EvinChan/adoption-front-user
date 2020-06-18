<template>
    <div>
        <MyHeader/>
        <div class="detailBox">
            <div class="row">
                <div class="crumbs">
                </div>
                <div class="content">
                    <div class="info">
                        <div class="name">
                            <el-button @click.native.prevent="payOrder()"
                                       type="primary"
                                       round
                                       style="margin-right: 20px">
                                支付订单
                            </el-button>
                            <el-button @click.native.prevent="cancelOrder()"
                                       type="danger"
                                       round>
                                取消支付
                            </el-button>
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
  import {payOrder} from '@/api/user'

  export default {
    components: {
      MyHeader,
      MyFooter
    },
    name: "payOrder",
    data() {
      return {
        adopId: ''
      }
    },
    methods: {
      payOrder() {
        this.adopId = this.$route.query.adopId
        payOrder(this.adopId).then(result => {
          if (result.code === 200) {
            this.$message.success('支付成功')
            this.$router.push('/userOrder')
          }
        })
      },
      cancelOrder() {
        this.$router.push('/userOrder')
      }
    }
  }
</script>

<style lang="scss" scoped>
    .detailBox {
        .content {
            .info {
                border: 1px dotted #dedede;
                padding: 15px 20px;
                height: 320px;

                .name {
                    overflow: hidden;
                    padding: 15px 20px;
                    margin: 100px 385px;
                    display: flex;
                    font-size: 16px;
                    line-height: 25px;
                    position: relative;
                }
            }
        }
    }
</style>
