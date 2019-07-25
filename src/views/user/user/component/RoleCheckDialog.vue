<template>
  <el-dialog title="分配权限" :visible.sync="dialog" width="300px">
    <div v-loading="loading">
    <template v-for="item in roles">
      <div style="margin-top: 20px">
        <el-checkbox v-model="item.status"  :label="item.name" @change="switchRole(item.id, item.status)"></el-checkbox>
      </div>
    </template>
    </div>
  </el-dialog>
</template>

<script>
  import {getRoles} from '@/api/role'
  import {assignRole, removeRole} from "@/api/user"

  export default {
    name: "RoleCheckDialog",
    data () {
      return {
        loading: false,
        dialog: false,
        userId: '',
        roles: []
      }
    },
    created() {
      getRoles().then(res => {
        const roles = res.data.content
        this.roles = roles.map(v => {
          v.status = false
          return v
        })
      })
    },
    methods: {
      switchRole(id, value) {
        this.loading = true
        let method = value ? assignRole : removeRole

        method({
          userId: this.userId,
          roleId: id
        }).then(res => {
          this.loading = false
        })
      },
      open(data) {
        this.dialog = true
        this.loading = true

        this.userId = data.id
        this.roles.forEach(role => {
          data.roleViewList.forEach(v => {
            if(role.id === v.id) {
              role.status = true
            }
          })
        })

        this.loading = false
      }
    }
  }
</script>

<style scoped>

</style>
