<template>
    <el-dialog :visible.sync="dialogFormVisible" title="查看领养申请表" width="30%" center>
        <el-form ref="adoptionForm" :model="adoptionForm" label-width="80px">
            <el-form-item label="性别" class="bold-label">
                <div class="formText" v-if="adoptionForm.sex === 0">男</div>
                <div class="formText" v-if="adoptionForm.sex === 1">女</div>
            </el-form-item>
            <el-form-item label="年龄" class="bold-label">
                <div class="formText">{{ adoptionForm.age }}</div>
            </el-form-item>
            <el-form-item label="手机号" class="bold-label">
                <div class="formText">{{ adoptionForm.mobile }}</div>
            </el-form-item>
            <el-form-item label="养宠经验" class="bold-label">
                <div class="formText" v-if="adoptionForm.isExp === 0">无</div>
                <div class="formText" v-if="adoptionForm.isExp === 1">有</div>
            </el-form-item>
            <el-form-item label="住房情况" class="bold-label">
                <div class="formText" v-if="adoptionForm.housing === 0">合租</div>
                <div class="formText" v-if="adoptionForm.housing === 1">整租</div>
                <div class="formText" v-if="adoptionForm.housing === 2">自有房</div>
            </el-form-item>
            <el-form-item label="婚姻状况" class="bold-label">
                <div class="formText" v-if="adoptionForm.marital === 0">单身</div>
                <div class="formText" v-if="adoptionForm.marital === 1">恋爱中</div>
                <div class="formText" v-if="adoptionForm.marital === 2">已婚</div>
            </el-form-item>
            <el-form-item label="职业" class="bold-label">
                <div class="formText">{{ adoptionForm.profession }}</div>
            </el-form-item>
            <el-form-item label="个人简介" class="bold-label">
                <div class="formText">{{ adoptionForm.profile }}</div>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
  import {getOneAdoption} from '@/api/user';

  export default {
    name: "selectAdoption",
    data() {
      return {
        dialogFormVisible: false,
        adoptionForm: {
          sex: '',
          age: '',
          mobile: '',
          isExp: '',
          housing: '',
          marital: '',
          profession: '',
          profile: ''
        },
      }
    },
    methods: {
      open(id) {
        this.dialogFormVisible = true
        if (id) {
          getOneAdoption(id).then(result => {
            this.adoptionForm = result.data.adoptionInfo
          })
        }
      },
      close() {
        this.dialogFormVisible = false
        this.adoptionForm.sex = ''
        this.adoptionForm.age = ''
        this.adoptionForm.mobile = ''
        this.adoptionForm.isExp = ''
        this.adoptionForm.housing = ''
        this.adoptionForm.marital = ''
        this.adoptionForm.profession = ''
        this.adoptionForm.profile = ''
      },
    }
  };
</script>

<style lang="scss">
    .formText {
        padding: 0 15px;
    }

    .bold-label .el-form-item__label{
        font-weight: 700 !important;
    }
</style>
