<template>
    <el-dialog :visible.sync="dialogFormVisible" title="查看订单" width="35%" center>
        <el-form ref="orderForm" :model="orderForm" label-width="100px">
            <el-form-item label="收货人姓名" class="bold-label">
                <div class="formText">{{ orderForm.orderAddress.name }}</div>
            </el-form-item>
            <el-form-item label="收货人号码" class="bold-label">
                <div class="formText">{{ orderForm.orderAddress.mobile }}</div>
            </el-form-item>
            <el-form-item label="省份" class="bold-label">
                <div class="formText">{{ orderForm.orderAddress.addressProvince.name }}</div>
            </el-form-item>
            <el-form-item label="市" class="bold-label">
                <div class="formText">{{ orderForm.orderAddress.addressCity.name }}</div>
            </el-form-item>
            <el-form-item label="详细地址" class="bold-label">
                <div class="formText">{{ orderForm.orderAddress.detail }}</div>
            </el-form-item>
            <el-form-item label="备注" class="bold-label">
                <div class="formText">{{ orderForm.remark }}</div>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
  import {getOneOrder} from '@/api/user';

  export default {
    name: "selectOrder",
    data() {
      return {
        dialogFormVisible: false,
        orderForm: {
          remark: '',
          orderAddress: {
            name: '',
            mobile: '',
            detail: '',
            addressProvince: {
              name: ''
            },
            addressCity: {
              name: ''
            }
          }
        }
      }
    },
    methods: {
      open(id) {
        this.dialogFormVisible = true
        if (id) {
          getOneOrder(id).then(result => {
            this.orderForm = result.data.orderInfo
          })
        }
      },
      close() {
        this.dialogFormVisible = false
        this.orderForm.remark = ''
        this.orderForm.orderAddress.name = ''
        this.orderForm.orderAddress.mobile = ''
        this.orderForm.orderAddress.detail = ''
        this.orderForm.orderAddress.addressProvince.name = ''
        this.orderForm.orderAddress.addressCity.name = ''
      }
    }
  };
</script>

<style lang="scss" scoped>
    .formText {
        padding: 0 15px;
    }
</style>
