<template>
  <el-dialog :title="title" :visible.sync="dialog">
    <el-form ref="dataForm" :rules="rules" :model="form" label-position="left" :label-width="formLabelWidth"
             style="width: 400px; margin-left:50px;">
      <slot name="form"></slot>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog = false">
        取消
      </el-button>
      <el-button
              type="primary"
              @click="submitForm"
              :loading="btnLoading"
      >
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "FormDialog",
    props: {
      title: String,
      form: Object,
      rules: Object,
      formLabelWidth: {
        type: [Number, String],
        default: '90px'
      }
    },
    data() {
      return {
        dialog: false,
        btnLoading: false
      }
    },
    methods: {
      submitForm() {
        console.log('form-dialog')
        this.btnLoading = true
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$emit('submit-form', this.form)
          } else {
            this.btnLoading = false
            return false
          }
        })
      },
      close() {
        this.btnLoading = false
        this.dialog = false
      },
      open() {
        this.btnLoading = false
        this.dialog = true

        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
      },
      successCallback(msg) {
        this.close()
        this.$notify({
          title: '成功',
          message: msg,
          type: 'success',
          duration: 2000
        })
      },
    }
  }
</script>

<style scoped>

</style>
