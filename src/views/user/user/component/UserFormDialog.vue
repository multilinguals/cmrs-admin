<template>
  <form-dialog
          ref="formDialog"
          :title="textMap[dialogStatus]"
          :form="form"
          :rules="rules"
          @submit-form="formSubmit"
  >
    <template v-slot:form>
      <el-form-item label="真实名称" prop="realName">
        <el-input v-model="form.realName" />
      </el-form-item>
      <template v-if="dialogStatus==='create'">
        <el-form-item label="用户名" prop="username" >
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input v-model="form.password" show-password/>
        </el-form-item>
        <el-form-item label="角色">
          <el-select disabled value="ROLE_CLERK">
            <el-option
                    key="ROLE_CLERK"
                    label="职员"
                    value="ROLE_CLERK">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
    </template>
  </form-dialog>
</template>

<script>
  import FormDialog from '@/components/Dialog/FormDialog'
  import { validPassword } from '@/utils/validate'

  export default {
    name: 'UserFormDialog',
    components: {
      FormDialog
    },
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          try {
            validPassword(value)
            callback()
          }catch (e) {
            callback(e)
          }
        }
      }

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
              required: true, message: '请输入用户名', trigger: 'blur',
            },
            { max: 20, message: '长度不得大于 20 个字符', trigger: 'blur' }
          ],
          realName: [
            {
              required: true, message: '请输入真实名称', trigger: 'blur'
            },
            { max: 11, message: '长度不得大于 11 个字符', trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
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
          }else {
            this.form = {
              username: '',
              realName: '',
              password: ''
            }
          }
        })
      },
      formSubmit() {
        this.$emit(this.dialogStatus, this.form, this.$refs.formDialog.successCallback)
      }
    }
  }
</script>

<style scoped>

</style>
