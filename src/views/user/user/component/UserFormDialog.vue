<template>
  <form-dialog
          ref="formDialog"
          :title="textMap[dialogStatus]"
          :form="form"
          :rules="rules"
          @submit-form="formSubmit"
  >
    <template v-slot:form>
      <el-form-item label="用户名" prop="username" v-if="dialogStatus==='create'">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="真实名称" prop="realName">
        <el-input v-model="form.realName" />
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="dialogStatus==='create'">
        <el-input v-model="form.password" show-password/>
      </el-form-item>
    </template>
  </form-dialog>
</template>

<script>
  import FormDialog from '@/components/Dialog/FormDialog'

  export default {
    name: 'UserFormDialog',
    components: {
      FormDialog
    },
    data() {
      return {
        dialogStatus: 'create',
        textMap: {
          update: '编辑用户',
          create: '创建用户'
        },
        dialog: false,
        btnLoading: false,
        form: {
          username: '',
          realName: '',
          password: ''
        },
        rules: {
          username: [
            {
              required: true, message: '请输入用户名', trigger: 'blur'
            }
          ],
          realName: [
            {
              required: true, message: '请输入真实名称', trigger: 'blur'
            }
          ],
          password: [
            {
              required: true, message: '请输入密码', trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      open(status, data) {
        this.btnLoading = false
        this.dialog = true
        this.dialogStatus = status
        this.$refs.formDialog.open()

        this.$nextTick(() => {
          if(data) {
            this.form = Object.assign({}, data)
          }
        })
      },
      successCallback(msg) {
        this.$refs.formDialog.close()
        this.$notify({
          title: '成功',
          message: msg,
          type: 'success',
          duration: 2000
        })
      },
      formSubmit() {
        console.log('user-form')
        this.$emit(this.dialogStatus, this.form, this.successCallback)
      }
    }
  }
</script>

<style scoped>

</style>
