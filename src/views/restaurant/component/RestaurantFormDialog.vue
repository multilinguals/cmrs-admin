<template>
  <form-dialog
          ref="formDialog"
          :title="textMap[dialogStatus]"
          :form="form"
          :rules="rules"
          @submit-form="formSubmit"
  >
    <template v-slot:form>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="简介" >
        <el-input
                type="textarea"
                :rows="3"
                v-model="form.description"
        />
      </el-form-item>
    </template>
  </form-dialog>
</template>

<script>
  import FormDialog from '@/components/Dialog/FormDialog'
  import { validPassword } from '@/utils/validate'

  export default {
    name: 'RestaurantFormDialog',
    components: {
      FormDialog
    },
    data() {
      return {
        dialogStatus: 'create',
        textMap: {
          update: '编辑餐厅',
          create: '创建餐厅'
        },
        dialog: false,
        btnLoading: false,
        form: {
          name: '',
          description: ''
        },
        rules: {
          name: [
            {
              required: true, message: '请输入用户名', trigger: 'blur',
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
        this.$emit(this.dialogStatus, this.form, this.successCallback)
      }
    }
  }
</script>

<style scoped>

</style>
