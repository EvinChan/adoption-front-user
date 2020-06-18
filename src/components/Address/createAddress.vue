<template>
    <el-dialog :visible.sync="dialogFormVisible" title="新增地址" width="30%" center @close="close">
        <el-form ref="addressForm" :model="addressForm" :rules="addressRules" label-width="100px">
            <el-form-item label="收货人姓名" prop="name" class="bold-label">
                <el-input v-model="addressForm.name"
                          placeholder="请输入姓名"
                          auto-complete="off"
                          maxlength="20"/>
            </el-form-item>
            <el-form-item label="收货人号码" prop="mobile" class="bold-label">
                <el-input v-model="addressForm.mobile"
                          placeholder="请输入手机号"
                          auto-complete="off"
                          maxlength="11"/>
            </el-form-item>
            <el-form-item label="省份" prop="provinceName" class="bold-label">
                <el-select
                        v-model="addressForm.provinceName"
                        placeholder="请选择省份"
                        clearable
                        filterable
                        @change="provinceChanged">
                    <el-option
                            v-for="item in provinceList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"/>
                </el-select>
            </el-form-item>
            <el-form-item label="市" prop="cityName" class="bold-label">
                <el-select
                        v-model="addressForm.cityName"
                        placeholder="请选择市"
                        clearable
                        filterable>
                    <el-option
                            v-for="item in cityList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"/>
                </el-select>
            </el-form-item>
            <el-form-item label="详细地址" prop="detail" class="bold-label">
                <el-input v-model="addressForm.detail"
                          maxlength="100"
                          show-word-limit
                          type="textarea"
                          :rows="4"
                          placeholder="请输入详细地址"
                          auto-complete="off"/>
            </el-form-item>
            <el-button type="primary" @click.native.prevent="handleAddress">添加</el-button>
        </el-form>
    </el-dialog>
</template>

<script>
  import {validMobile} from '@/utils/validate';
  import {mapGetters} from 'vuex';
  import {getCityList, getProvinceList} from '@/api/main';
  import {createAddress} from '@/api/user';

  export default {
    name: "createAddress",
    computed: {
      ...mapGetters([
        'id'
      ])
    },
    data() {
      const validateMobile = (rule, value, callback) => {
        if (!validMobile(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      }
      return {
        dialogFormVisible: false,
        addressForm: {
          userId: '',
          name: '',
          mobile: '',
          provinceName: '',
          cityName: '',
          detail: ''
        },
        addressRules: {
          name: [{required: true, trigger: 'blur', message: '请填写昵称'}],
          mobile: [{required: true, trigger: 'blur', validator: validateMobile}],
          provinceName: [{required: true, trigger: 'change', message: '请选择省份'}],
          cityName: [{required: true, trigger: 'change', message: '请选择市'}],
          detail: [{required: true, trigger: 'blur', message: '请输入详细地址'}]
        },
        provinceList: [],
        cityList: [],
      }
    },
    created() {
      this.InitOptionList()
    },
    methods: {
      InitOptionList() {
        getProvinceList().then(result => {
          result.data.ProvinceInfo.forEach(province => {
            this.provinceList.push(province)
          })
        })
      },
      provinceChanged(label) {
        this.addressForm.cityName = ''
        this.cityList = []
        for (let i = 0; i < this.provinceList.length; i++) {
          if (this.provinceList[i].code === label) {
            getCityList(label).then(result => {
              result.data.cityInfo.forEach(city => {
                this.cityList.push(city)
              })
            })
          }
        }
      },
      open() {
        this.dialogFormVisible = true
      },
      close() {
        this.dialogFormVisible = false
        this.addressForm.userId = ''
        this.addressForm.name = ''
        this.addressForm.mobile = ''
        this.addressForm.provinceName = ''
        this.addressForm.cityName = ''
        this.addressForm.detail = ''
      },
      handleAddress() {
        this.$refs.addressForm.validate(valid => {
          if (valid) {
              this.addressForm.userId = this.id
              createAddress(this.addressForm).then(result => {
                if (result.code === 200) {
                  this.close()
                  this.$message.success('提交成功')
                  // 调用父组件监听函数
                  this.$emit('onSaveSuccess')
                }
              })
          } else {
            return false
          }
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
    /*普通输入框*/
    .el-input {
        width: 221.4px;
    }

    .el-button--primary {
        width: 100%;
        color: #FFF;
        background-color: #b4a078;
        border-color: #b4a078;
    }
    .el-button--primary:focus, .el-button--primary:hover {
        background: #b4a078;
        border-color: #b4a078;
        color: #FFF;
    }
</style>
