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
      <el-form-item label="选择单品" >
        <el-select
                v-model="singleItemIdList"
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
      <el-form-item v-for="item in form.subItems" :key="item.singleMenuItemId">
        <el-col :span="6">
          {{ findSingleName(item.singleMenuItemId) }}
        </el-col>
        <el-col :span="6">
          <el-input-number :min="1" :max="10" size="mini" v-model="item.quantity" :key="item.singleMenuItemId" @change="handleChange(item)"></el-input-number>
        </el-col>
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
    watch: {
      singleItemIdList: function (val) {
        console.log('result')
        console.log(this.form.subItems)
        for (const id of val) {
          const index = this.findSingleIndex(id)
          if (index < 0) {
            continue
          }
          this.$set(this.form.subItems, index, {
            singleMenuItemId: id,
            quantity: 1
          })
        }
      }
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
          subItems: []
        },
        singleItemIdList: [],
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
            console.log(data)
            this.form = Object.assign({}, data)
            const singleItemIdList = []
            const subItems = []
            for (const item of data.subItemViews) {
              subItems.push({
                singleMenuItemId: item.singleMenuItemView.id,
                quantity: item.quantity
              })
              singleItemIdList.push(item.singleMenuItemView.id)
            }

            this.$set(this.form, 'subItems', subItems)
            this.singleItemIdList = singleItemIdList
          } else {
            this.form = {
              name: '',
              price: '',
              subItems: []
            }
          }
        })
      },
      formSubmit() {
        this.$emit(this.dialogStatus, this.form, this.$refs.formDialog.successCallback)
      },
      findSingleName(id) {
        for(const item of this.singleList) {
          if(item.id === id) {
            return item.name
          }
        }
      },
      findSingleIndex(id) {
        if(this.form.subItems.length === 0) {
          return -1
        }
        for(const index in this.form.subItems) {
          if(this.form.subItems[index].id === id) {
            return index
          }
        }

        return -1
      }
    }
  }
</script>

<style scoped>

</style>
