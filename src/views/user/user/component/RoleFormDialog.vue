<template>
  <form-dialog
          ref="formDialog"
          title="分配权限"
          :form="form"
          :rules="rules"
          @submit-form="updatePassword"
  >
    <template v-slot:form>
      <el-form-item label="权限" prop="password">
        <el-select
                v-model="form.password"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择文章标签">
          <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </template>
  </form-dialog>
</template>

<script>
  import FormDialog from '@/components/Dialog/FormDialog'
  import { validPassword } from '@/utils/validate'

  export default {
    name: "PassFormDialog",
    components: {
      FormDialog
    },
    data () {
      return {
        form: {
          userId: ''
        },
        rules: {
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
