<template>
  <div>
    <div class="filter-container">
      <el-button
              class="filter-item"
              style="float: right;"
              type="primary"
              icon="el-icon-plus"
              @click="handleDialog('menuFormDialog', 'create')"
              size="medium"
      >
        添加套餐
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
<!--      <el-table-column label="套餐ID" width="250px" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ scope.row.id }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="名称" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单价" sortable align="center" width="110px">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="包含单品" align="center" width="110px">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDialog('singleListDialog', scope.row.singleMenuItems)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" sortable align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="80" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleDialog('menuFormDialog', 'update', row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size"
                @pagination="getList"/>

    <menu-form-dialog
            ref="menuFormDialog"
            @create="createData"
            @update="updateData"
            :restaurant-id="restaurantId"
    ></menu-form-dialog>
    <table-dialog title="套餐包含单品" :head="singleListHead" ref="singleListDialog"></table-dialog>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import TableDialog from '@/components/Dialog/TableDialog'
  import {getSetMenus, createSetMenu, updateSetMenu} from '@/api/menu'
  import MenuFormDialog from './SetMenuFormDialog'

  export default {
    name: "SetMenuTable",
    props: {
      restaurantId: String
    },
    components: {
      Pagination,
      TableDialog,
      MenuFormDialog
    },
    data() {
      return {
        singleListHead: [
          {label: '单品名称', key: 'name', width: 150},
          {label: '菜品', key: 'dishTypeName', width: 150},
          {label: '口味', key: 'tasteName', width: 150},
          {label: '单价', key: 'price'}
        ],
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          size: 20
        }
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
        getSetMenus(this.restaurantId, query).then(response => {
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
        data.restaurantId = this.restaurantId
        createSetMenu(data).then(() => {
          callback("创建套餐成功")
          this.getList()
        })
      },
      updateData(form, callback) {
        const data = Object.assign({}, form)
        console.log(data)
        updateSetMenu(this.restaurantId, data).then(() => {
          callback("修改套餐成功")
          this.getList()
        })
      }
    }
  }
</script>

<style scoped>

</style>
