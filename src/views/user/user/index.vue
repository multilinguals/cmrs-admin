<template>
  <div class="app-container">
    <div class="filter-container">
      <!--<el-input v-model="listQuery.title" placeholder="名称" style="width: 200px;" class="filter-item"-->
                <!--@keyup.enter.native="handleFilter"/>-->
      <!--<el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">-->
        <!--搜索-->
      <!--</el-button>-->
      <el-button class="filter-item" style="float: right;" type="primary" icon="el-icon-plus"
                 @click="handleCreate">
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
          <el-button type="text" @click="handleShowAccountList(scope.row.accountViewList)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="用户角色" width="110px" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleShowRoleList(scope.row.roleViewList)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" sortable align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="330" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(row,'deleted')">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size"
                @pagination="getList"/>

    <user-form-dialog
            ref="userFormDialog"
    ></user-form-dialog>
    <table-dialog title="账号列表" :head="accountListHead" ref="accountListDialog"></table-dialog>
    <table-dialog title="角色列表" :head="roleListHead" ref="roleListDialog"></table-dialog>
  </div>
</template>

<script>
  import {getUsers, createUser, updateUser} from '@/api/user'
  import waves from '@/directive/waves' // waves directive
  import {parseTime} from '@/utils'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import TableDialog from '@/components/Dialog/TableDialog'
  import UserFormDialog from './UserFormDialog'

  export default {
    name: 'User',
    components: {
      Pagination,
      TableDialog,
      UserFormDialog
    },
    directives: {waves},
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
        getUsers(this.listQuery).then(response => {
          this.list = response.data.content
          this.total = response.data.totalElements

          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleShowAccountList(data) {
        this.$refs.accountListDialog.open(data)
      },
      handleShowRoleList(data) {
        this.$refs.roleListDialog.open(data)
      },
      handleCreate() {
        this.$refs.userFormDialog.open('create')
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            this.temp.author = 'vue-element-admin'
            createUser(this.temp).then(() => {
              this.list.unshift(this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Created Successfully',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      handleUpdate(row) {
        this.$refs.userFormDialog.open('edit', row)
      },
      // updateData() {
      //   this.$refs['dataForm'].validate((valid) => {
      //     if (valid) {
      //       const tempData = Object.assign({}, this.temp)
      //       tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
      //       updateUser(tempData).then(() => {
      //         for (const v of this.list) {
      //           if (v.id === this.temp.id) {
      //             const index = this.list.indexOf(v)
      //             this.list.splice(index, 1, this.temp)
      //             break
      //           }
      //         }
      //         this.dialogFormVisible = false
      //         this.$notify({
      //           title: 'Success',
      //           message: 'Update Successfully',
      //           type: 'success',
      //           duration: 2000
      //         })
      //       })
      //     }
      //   })
      // },
      // handleDelete(row) {
      //   this.$notify({
      //     title: 'Success',
      //     message: 'Delete Successfully',
      //     type: 'success',
      //     duration: 2000
      //   })
      //   const index = this.list.indexOf(row)
      //   this.list.splice(index, 1)
      // },
    }
  }
</script>