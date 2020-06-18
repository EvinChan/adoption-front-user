<template>
    <div>
        <MyHeader/>
        <div class="detailBox">
            <div class="row">
                <!-- 面包屑 -->
                <div class="crumbs">
                    <router-link to="/">首页</router-link>
                    <div class="icon icon-right_s"></div>
                    <span>联系我们</span>
                </div>
                <!-- content -->
                <div class="content">
                    <!-- 主信息 -->
                    <div class="info">
                        <p class="detail">
                            联系电话 ：胡宇乔 ：13652746899
                        </p>
                        <p class="detail">
                            地址 ：广东省东莞市寮步镇小坑村文昌路一号东莞理工学院城市学院
                        </p>
                        <img src="http://localhost:5000/system/微信.jpg"
                             style="height: 400px;width: 300px;padding: 15px 20px;">
                        <img src="http://localhost:5000/system/QQ.jpg"
                             style="height: 400px;width: 300px;padding: 15px 20px;">
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

  export default {
    components: {
      MyHeader,
      MyFooter
    },
    name: "centerInfo"
  }
</script>

<style lang="scss" scoped>
    .detailBox {
        .content {
            .info {
                border: 1px dotted #dedede;
                padding: 15px 20px;

                .detail {
                    padding: 15px 20px;
                    line-height: 30px;
                    font-size: 16px;
                    position: relative;
                }
            }
        }
    }
</style>
