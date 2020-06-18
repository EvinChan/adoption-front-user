<template>
    <div class="footer">
        <div class="ft2">
            <div class="row">
                <div class="hr"></div>
                <div class="siteInfo">
                    <p class="copyright">
                        地址 ：广东省东莞市寮步镇小坑村文昌路一号东莞理工学院城市学院
                    </p>
                    <p class="copyright">
                        联系电话 ：胡宇乔 ：13652746899
                    </p>
                    <p class="copyright">
                        QQ ：1303389746
                    </p>
                </div>
            </div>
        </div>

        <!-- FixedTool -->
        <FixedTool/>
    </div>
</template>

<script>
  import FixedTool from "../FixedTool/FixedTool"

  export default {
    components: {
      FixedTool
    },
    name: 'MyFooter'
  }
</script>

<style lang="scss" scoped>
    .footer {
        clear: both;
        padding-top: 40px;

        .ft2 {
            height: 120px;
            padding-top: 37px;
            background-color: #414141;

            .siteEnsure {
                height: 50px;
                margin-bottom: 30px;
                padding-left: 17px;

                &::after {
                    content: " ";
                    display: table;
                }

                .item {
                    float: left;
                    margin-right: 122px;

                    &:nth-child(4) {
                        margin-right: 0;
                    }

                    .inner {
                        color: #fff;
                        font-size: 18px;
                        line-height: 51px;
                        display: inline-block;
                        vertical-align: middle;

                        .icon {
                            float: left;
                            margin-right: 17px;
                            font-size: 40px;
                            border: 3px solid #fff;
                            border-radius: 50%;
                            padding: 5px;
                            width: 40px;
                            line-height: 40px;
                            height: 40px;
                            display: inline-block;
                        }

                        .text {
                            float: left;
                        }
                    }
                }

            }

            .hr {
                height: 1px;
                margin-bottom: 27px;
                background-color: #4f4f4f;
                border: 0;
            }

            .siteInfo {
                font-size: 12px;
                text-align: center;
                color: #999;
                position: relative;
                text-align: center;
                color: #999;
                position: relative;

                .text {
                    color: #999;
                }

                .split {
                    margin: auto 13px;
                }

                .copyright {
                    white-space: nowrap;
                    margin: 11px 0;
                }
            }
        }
    }
</style>
