<template>
  <form-dialog
          ref="formDialog"
          title="分配角色"
          :form="form"
          @submit-form="assignRoles"
  >
    <template v-slot:form>
      <el-form-item label="角色" >
        <el-select v-model="form.roleIdList" multiple placeholder="请选择">
          <el-option
                  v-for="item in roles"
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
  import {getRoles} from '@/api/role'

  export default {
    name: "RoleFormDialog",
    components: {
      FormDialog
    },
    data () {
      return {
        loading: false,
        dialog: false,
        userId: '',
        roles: [],
        form: {
          userId: '',
          roleIdList: []
        }
      }
    },
    created() {
      getRoles().then(res => {
        const roles = res.content
        this.roles = roles.map(v => {
          v.status = false
          return v
        })
      })
    },
    methods: {
      open(data) {
        this.dialog = true
        this.loading = true

        this.form.userId = data.id
        const roleList = []
        data.roleViewList.forEach(v => {
          roleList.push(v.id)
        })
        this.form.roleIdList = roleList

        this.loading = false
        this.$refs.formDialog.open()
      },
      assignRoles () {
        this.$emit('assign-roles', this.form, this.$refs.formDialog.successCallback)
      }
    }
  }
</script>

<style scoped>

</style>
