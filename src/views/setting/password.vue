<template>
  <div class="app-container">
    <el-form ref="dataForm" :rules="rules" :model="form" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" show-password/>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" >
        <el-input v-model="form.checkPass" show-password/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSavePassword">保存</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { updatePassword } from '@/api/user'
  import md5 from 'crypto-js/md5'

  export default {
    name: "SettingPassword",
    computed: {
      ...mapGetters([
        'userDetail'
      ])
    },
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.dataForm.validateField('checkPass')
          }
          callback()
        }
      };
      const validateCheckPass = (rule, value, callback) => {
        console.log(value)
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      };

      return {
        form: {
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
      onSavePassword () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const data = {
              userPasswordId: this.userDetail.userPasswordId,
              newUserPassword: md5(this.form.password).toString()
            }
            updatePassword(data).then(res => {
              this.resetForm()
              this.$notify({
                title: '成功',
                message: '密码修改成功',
                type: 'success',
                duration: 2000
              })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm () {
        this.$refs['dataForm'].resetFields()
      }
    }
  }
</script>

<style scoped>

</style>
