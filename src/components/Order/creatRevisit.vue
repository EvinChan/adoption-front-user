<template>
    <el-dialog :visible.sync="dialogFormVisible" title="发布宠物回访" width="45%" center @close="close">
        <el-form ref="revisitForm" :model="revisitForm" :rules="revisitRules" label-width="80px">
            <el-form-item label="回访内容" prop="content" class="bold-label">
                <tinymce :height="300" v-model="revisitForm.content" v-if="dialogFormVisible"/>
            </el-form-item>
            <el-button type="primary" @click.native.prevent="handleRevisit">提交回访</el-button>
        </el-form>
    </el-dialog>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import {createRevisit} from '@/api/user';
  import {mapGetters} from 'vuex';

  export default {
    name: "creatRevisit",
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
        revisitForm: {
          content: ''
        },
        revisitRules: {
          content: [{required: true, trigger: 'blur', message: '请输入回访内容'}]
        },
        provinceList: [],
        cityList: []
      }
    },
    methods: {
      open(id) {
        this.revisitForm.orderId = id
        this.dialogFormVisible = true
      },
      close() {
        this.dialogFormVisible = false
        this.revisitForm.content = ""
      },
      handleRevisit() {
        this.$refs.revisitForm.validate(valid => {
          if (valid) {
            this.revisitForm.userId = this.id
            createRevisit(this.revisitForm).then(result => {
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

