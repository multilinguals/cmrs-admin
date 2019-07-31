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
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="单价" prop="price">
        <el-input-number v-model="form.price" :precision="2" :step="0.1" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="选择单品" prop="name">
        <el-select
                v-model="form.singleItemIdList"
                multiple
                filterable
                default-first-option
                placeholder="请选择单品">
          <el-option
                  v-for="item in singleList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </template>
  </form-dialog>
</template>

<script>
  import FormDialog from '@/components/Dialog/FormDialog'
  import {getAllSingleMenus} from '@/api/menu'

  export default {
    name: 'SetMenuFormDialog',
    props: {
      restaurantId: String
    },
    components: {
      FormDialog
    },
    data() {
      return {
        dialogStatus: 'create',
        textMap: {
          update: '编辑套餐',
          create: '创建套餐'
        },
        singleList: [],
        dialog: false,
        btnLoading: false,
        form: {
          name: '',
          price: '',
          singleItemIdList: []
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
    created() {
      getAllSingleMenus(this.restaurantId).then(res => {
        this.singleList = res
      })
    },
    methods: {
      open(status, data) {
        this.btnLoading = false
        this.dialog = true
        this.dialogStatus = status
        this.$refs.formDialog.open()

        this.$nextTick(() => {
          if (data) {
            this.form = Object.assign({}, data)
          }else {
            this.form = {
              name: '',
              price: '',
              singleItemIdList: []
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
