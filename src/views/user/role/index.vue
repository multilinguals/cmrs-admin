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
        添加角色
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
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限" width="110px" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleShowPermissionList(scope.row.permissionItems)">查看</el-button>
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
          <el-button size="mini" type="danger" >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size"
                @pagination="getList"/>

    <!--<user-form-dialog-->
            <!--ref="userFormDialog"-->
            <!--@create-data="createData"-->
    <!--&gt;</user-form-dialog>-->
    <table-dialog title="权限列表" :head="permissionListHead" ref="permissionListDialog"></table-dialog>
  </div>
</template>

<script>
  import {getRoles, createRole, updateRole} from '@/api/role'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import TableDialog from '@/components/Dialog/TableDialog'
  // import UserFormDialog from './UserFormDialog'

  export default {
    name: 'UserRole',
    components: {
      Pagination,
      TableDialog
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
        permissionListHead: [
          {label: '用户名', key: 'idInType', width: 150},
          {label: '类型', key: 'type', width: 150},
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
        getRoles(query).then(response => {
          this.list = response.data.content
          this.total = response.data.totalElements

          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleShowPermissionList(data) {
        this.$refs.permissionListDialog.open(data)
      },
      handleCreate() {
        this.$refs.userFormDialog.open('create')
      },
      createData(data, callback) {
        createRole(data).then(() => {
          callback("创建用户成功")
        })
      },
      handleUpdate(row) {
        this.$refs.userFormDialog.open('edit', row)
      },
      updateData(data, callback) {
        updateRole(data).then(() => {
          callback("修改用户成功")
        })
      },
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
