<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialog">
    <el-form ref="dataForm" :rules="rules" :model="form" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="真实名称" prop="realName">
        <el-input v-model="form.realName" />
      </el-form-item>
      <el-form-item label="密码" prop="password" >
        <el-input v-model="form.password" show-password/>
      </el-form-item>
      <el-form-item label="角色" prop="role" >
        <el-select v-model="form.role" multiple placeholder="请选择">
          <el-option
                  v-for="item in ruleOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog = false">
        取消
      </el-button>
      <el-button type="primary" @click="dialogStatus==='create' ? createData() : updateData()">
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'UserFormDialog',
    data() {
      return {
        dialogStatus: 'create',
        textMap: {
          update: '编辑用户',
          create: '创建用户'
        },
        dialog: false,
        form: {
          username: '',
          realName: '',
          password: '',
          role: []
        },
        rules: {},
        ruleOptions: [
          { value: 'Test1', label: 'Test1'},
          { value: 'Test2', label: 'Test2'},
          { value: 'Test3', label: 'Test3'}
        ]
      }
    },
    methods: {
      open(status, data) {
        this.dialog = true
        this.dialogStatus = status

        if(data) {
          this.form = Object.assign({}, data)
        }

        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      successCallback(msg) {
        this.dialog = false
        this.$notify({
          title: 'Success',
          message: msg,
          type: 'success',
          duration: 2000
        })
      },
      createData() {
        this.$emit('create-data', this.form, this.successCallback)
      },
      updateData() {
        this.$emit('update-data', this.form, this.successCallback)
      }
    }
  }
</script>

<style scoped>

</style>
