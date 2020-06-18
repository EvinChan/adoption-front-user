<template>
    <el-dialog :visible.sync="dialogFormVisible" title="查看机构申请表" width="45%" center>
        <el-form ref="organizationForm" :model="organizationForm" label-width="80px">
            <el-form-item label="省份" class="bold-label">
                <div class="formText">{{ organizationForm.orgProvince.name }}</div>
            </el-form-item>
            <el-form-item label="市" class="bold-label">
                <div class="formText">{{ organizationForm.orgCity.name }}</div>
            </el-form-item>
            <el-form-item label="详细地址" class="bold-label">
                <div class="formText">{{ organizationForm.detail }}</div>
        </el-form-item>
            <el-form-item label="描述" class="bold-label">
                <div class="formText" v-html="organizationForm.desc"></div>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
  import {getOneOrganization} from '@/api/user';

  export default {
    name: "selectOrganization",
    data() {
      return {
        dialogFormVisible: false,
        organizationForm: {
          detail: '',
          desc: '',
          orgProvince: {
            name: ''
          },
          orgCity: {
           name: ''
          }
        },
      }
    },
    methods: {
      open(id) {
        this.dialogFormVisible = true
        if (id) {
          getOneOrganization(id).then(result => {
            this.organizationForm = result.data.organizationInfo
            const regex = new RegExp('<img', 'gi')
            this.organizationForm.desc = this.organizationForm.desc.replace(regex, `<img style="max-width: 100%; height: auto"`)
          })
        }
      },
      close() {
        this.dialogFormVisible = false
        this.organizationForm.detail = ''
        this.organizationForm.desc = ''
        this.organizationForm.orgProvince.name = ''
        this.organizationForm.orgCity.name = ''
      },
    }
  }
</script>

<style lang="scss" scoped>
    .formText {
        padding: 0 15px;
    }
</style>
