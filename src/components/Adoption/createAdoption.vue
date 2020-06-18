<template>
    <el-dialog :visible.sync="dialogFormVisible" title="领养申请表" width="35%" center @close="close">
        <el-form ref="adoptionForm" :model="adoptionForm" :rules="adoptionRules" label-width="80px">
            <el-form-item label="性别" prop="sex" class="bold-label">
                <el-radio-group v-model="adoptionForm.sex">
                    <el-radio :label="0">男</el-radio>
                    <el-radio :label="1">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄" prop="age" class="bold-label">
                <el-input v-model="adoptionForm.age"
                          maxlength="3"
                          placeholder="请输入年龄"
                          auto-complete="off"/>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile" class="bold-label">
                <el-input v-model="adoptionForm.mobile"
                          maxlength="11"
                          placeholder="请输入手机号"
                          auto-complete="off"/>
            </el-form-item>
            <el-form-item label="养宠经验" prop="isExp" class="bold-label">
                <el-radio-group v-model="adoptionForm.isExp">
                    <el-radio :label="0">无</el-radio>
                    <el-radio :label="1">有</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="住房情况" prop="housing" class="bold-label">
                <el-radio-group v-model="adoptionForm.housing">
                    <el-radio :label="0">合租</el-radio>
                    <el-radio :label="1">整租</el-radio>
                    <el-radio :label="2">自有房</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="婚姻状况" prop="marital" class="bold-label">
                <el-radio-group v-model="adoptionForm.marital">
                    <el-radio :label="0">单身</el-radio>
                    <el-radio :label="1">恋爱中</el-radio>
                    <el-radio :label="2">已婚</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="职业" prop="profession" class="bold-label">
                <el-input v-model="adoptionForm.profession"
                          maxlength="20"
                          placeholder="请输入职业"
                          auto-complete="off"/>
            </el-form-item>
            <el-form-item label="个人简介" prop="profile" class="bold-label">
                <el-input v-model="adoptionForm.profile"
                          type="textarea"
                          :autosize="{minRows:2, maxRows:4}"
                          placeholder="请输入个人简介"
                          auto-complete="off"/>
            </el-form-item>
            <el-button type="primary" @click.native.prevent="handleAdoption">提交申请</el-button>
        </el-form>
    </el-dialog>
</template>

<script>
  import Tinymce from '@/components/Tinymce/index';
  import {validAge, validMobile} from '@/utils/validate'
  import {createAdoption} from '@/api/user'
  import {mapGetters} from 'vuex';

  export default {
    name: "createAdoption2",
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
    components: {Tinymce},
    data() {
      const validateAge = (rule, value, callback) => {
        if (!validAge(value)) {
          callback(new Error("请输入正确的年龄，必须为整数"));
        } else {
          callback();
        }
      }
      const validateMobile = (rule, value, callback) => {
        if (!validMobile(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      }
      return {
        dialogFormVisible: false,
        adoptionForm: {
          userId: '',
          petId: '',
          sex: '',
          age: '',
          mobile: '',
          isExp: '',
          housing: '',
          marital: '',
          profession: '',
          profile: ''
        },
        adoptionRules: {
          sex: [{required: true, trigger: 'blur', message: '请选择性别'}],
          age: [{required: true, trigger: 'blur', validator: validateAge}],
          mobile: [{required: true, trigger: 'blur', validator: validateMobile}],
          isExp: [{required: true, trigger: 'blur', message: '请选择养宠经验'}],
          housing: [{required: true, trigger: 'blur', message: '请选择住房情况'}],
          marital: [{required: true, trigger: 'blur', message: '请选择婚姻状况'}],
          profession: [{required: true, trigger: 'blur', message: '请输入职业'}],
          profile: [{required: true, trigger: 'blur', message: '请输入个人简介'}]
        },
      }
    },
    methods: {
      open() {
        this.dialogFormVisible = true
      },
      close() {
        this.dialogFormVisible = false
        this.adoptionForm.sex = ''
        this.adoptionForm.age = ""
        this.adoptionForm.mobile = ""
        this.adoptionForm.isExp = ''
        this.adoptionForm.housing = ''
        this.adoptionForm.marital = ''
        this.adoptionForm.profession = ""
        this.adoptionForm.profile = ""
      },
      handleAdoption() {
        this.$refs.adoptionForm.validate(valid => {
          if (valid) {
            this.adoptionForm.userId = this.id
            this.adoptionForm.petId = this.$route.query.id
            createAdoption(this.adoptionForm).then(result => {
              if (result.code === 200) {
                this.close()
                this.$message.success('提交成功')
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
