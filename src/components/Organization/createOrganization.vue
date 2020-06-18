<template>
    <el-dialog :visible.sync="dialogFormVisible" title="机构申请表" width="45%" center @close="close">
        <el-form ref="organizationForm" :model="organizationForm" :rules="organizationRules" label-width="80px">
            <el-form-item label="省份" prop="provinceName" class="bold-label">
                <el-select
                        v-model="organizationForm.provinceName"
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
                        v-model="organizationForm.cityName"
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
                <el-input v-model="organizationForm.detail"
                          maxlength="100"
                          show-word-limit
                          type="textarea"
                          :rows="3"
                          placeholder="请输入详细地址"
                          auto-complete="off"/>
            </el-form-item>
            <el-form-item label="描述" prop="desc" class="bold-label">
                <tinymce :height="300" v-model="organizationForm.desc" v-if="dialogFormVisible"/>
            </el-form-item>
            <el-button type="primary" @click.native.prevent="handleOrganization">提交申请</el-button>
        </el-form>
    </el-dialog>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import {getCityList, getProvinceList} from '@/api/main'
  import {createOrganization} from '@/api/user';
  import {mapGetters} from 'vuex';

  export default {
    name: "createOrganization",
    props: {
      isShowClose: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      ...mapGetters([
        'id'
      ])
    },
    components: {
      Tinymce
    },
    data() {
      return {
        dialogFormVisible: false,
        organizationForm: {
          userId: '',
          provinceName: '',
          cityName: '',
          detail: '',
          desc: ''
        },
        organizationRules: {
          provinceName: [{required: true, trigger: 'change', message: '请选择省份'}],
          cityName: [{required: true, trigger: 'change', message: '请选择市'}],
          detail: [{required: true, trigger: 'blur', message: '请输入详细地址'}],
          desc: [{required: true, trigger: 'blur', message: '请输入机构描述'}]
        },
        provinceList: [],
        cityList: []
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
        this.organizationForm.cityName = ''
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
        this.organizationForm.provinceName = ""
        this.organizationForm.cityName = ""
        this.organizationForm.detail = ""
        this.organizationForm.desc = ""
      },
      handleOrganization() {
        this.$refs.organizationForm.validate(valid => {
          if (valid) {
            this.organizationForm.userId = this.id
            createOrganization(this.organizationForm).then(result => {
              if (result.code === 200) {
                this.close()
                this.$message.success('提交成功')

              }
            })
          } else {
            return false
          }
        })
      },
    }
  };
</script>

<style lang="scss" scoped>
    /*富文本*/
    .tinymce-container {
        position: relative;
        line-height: normal;
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
