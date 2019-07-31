<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
              class="filter-item"
              style="float: right;"
              type="primary"
              icon="el-icon-plus"
              @click="handleDialog('userFormDialog', 'create')"
              size="medium"
      >
        添加用户
      </el-button>
    </div>

    <el-table
            :key="tableKey"
            v-loading="listLoading"
            :data="list"
            fit
            highlight-current-row
            style="width: 100%;"
    >
      <el-table-column label="名称" width="250px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.realName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="关联账号" width="110px" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDialog('accountListDialog', scope.row.accountViewList)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="用户角色" width="110px" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDialog('roleListDialog', scope.row.roleViewList)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" sortable align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="330" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleDialog('userFormDialog', 'update', row)">
            编辑
          </el-button>
          <el-button type="warning" size="mini" @click="handleDialog('passFormDialog', row)">
            修改密码
          </el-button>
          <el-button type="info" size="mini" @click="handleDialog('roleFormDialog', row)">
            分配权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size"
                @pagination="getList"/>

    <user-form-dialog
            ref="userFormDialog"
            @create="createData"
            @update="updateData"
    ></user-form-dialog>
    <pass-form-dialog ref="passFormDialog" @update-pass="updatePassword"></pass-form-dialog>
    <table-dialog title="账号列表" :head="accountListHead" ref="accountListDialog"></table-dialog>
    <table-dialog title="角色列表" :head="roleListHead" ref="roleListDialog"></table-dialog>
    <role-form-dialog ref="roleFormDialog" @assign-roles="assignRoles"></role-form-dialog>
  </div>
</template>

<script>
  import {getUsers, createClerk, updateUser, updateUserPassword, assignRole} from '@/api/user'
  import Pagination from '@/components/Pagination'
  import TableDialog from '@/components/Dialog/TableDialog'
  import { UserFormDialog, PassFormDialog, RoleFormDialog } from './component'
  import md5 from 'crypto-js/md5'

  export default {
    name: 'UserIndex',
    components: {
      Pagination,
      TableDialog,
      UserFormDialog,
      PassFormDialog,
      RoleFormDialog
    },
    filters: {},
    data() {
      return {
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          size: 20
        },
        accountListHead: [
          {label: '用户名', key: 'idInType', width: 150},
          {label: '类型', key: 'type', width: 150},
          {label: '创建时间', key: 'createdAt'}
        ],
        roleListHead: [
          {label: '名称', key: 'name', width: 250},
          {label: '创建时间', key: 'createdAt'}
        ]
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        const query = Object.assign({}, this.listQuery)
        query.page -= 1
        getUsers(query).then(response => {
          this.list = response.content
          this.total = response.pageInfo.totalElements

          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleDialog(ref, ...map) {
        this.$refs[ref].open(...map)
      },
      createData(form, callback) {
        const data = Object.assign({}, form)
        data.password = md5(data.password).toString()
        createClerk(data).then(() => {
          callback("创建用户成功")
          this.getList()
        })
      },
      updateData(form, callback) {
        const data = {
          realName: form.realName,
          id: form.id
        }
        updateUser(data.id, data).then(() => {
          callback("修改用户成功")
          this.getList()
        })
      },
      updatePassword(form, callback) {
        const data = {
          userId: form.userId,
          userPasswordId: form.userPasswordId,
          newUserPassword: md5(form.password).toString()
        }
        updateUserPassword(data).then(() => {
          callback("修改密码成功")
          this.getList()
        })
      },
      assignRoles(form, callback) {
        assignRole(
          form.userId,
          { roleIdList: form.roleIdList }
        ).then(() => {
          callback("分配权限成功")
          this.getList()
        })
      }
    }
  }
</script>
