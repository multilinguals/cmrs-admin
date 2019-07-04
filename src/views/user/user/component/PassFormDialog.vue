<template>
  <form-dialog
          ref="formDialog"
          title="修改密码"
          :form="form"
          :rules="rules"
          @submit-form="updatePassword"
  >
    <template v-slot:form>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" show-password/>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="form.checkPass" show-password/>
      </el-form-item>
    </template>
  </form-dialog>
</template>

<script>
  import FormDialog from '@/components/Dialog/FormDialog'

  export default {
    name: "PassFormDialog",
    components: {
      FormDialog
    },
    data () {
      let validatePass = (rule, value, callback) => {
        console.log(rule)
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.form.checkPass !== '') {
            console.log(this.$refs['formDialog'])
            this.$refs['formDialog'].$refs.dataForm.validateField('checkPass')
          }
          callback()
        }
      }
      let validateCheckPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }

      return {
        form: {
          userId: '',
          userPasswordId: '',
          password: '',
          checkPass: ''
        },
        checkPass: '',
        rules: {
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validateCheckPass, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      successCallback(msg) {
        this.$refs.formDialog.close()
        this.$notify({
          title: '成功',
          message: msg,
          type: 'success',
          duration: 2000
        })
      },
      updatePassword () {
        this.$emit('update-pass', this.form, this.successCallback)
      },
      open(data) {
        this.form.userId = data.id
        this.form.userPasswordId = data.userPasswordId
        this.$refs.formDialog.open()
      }
    }
  }
</script>

<style scoped>

</style>
