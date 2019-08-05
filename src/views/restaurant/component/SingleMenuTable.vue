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
        添加单品
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
<!--      <el-table-column label="单品ID" width="250px" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ scope.row.id }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="名称" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="菜品" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.localDishTypeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="口味" align="center" width="110px">
        <template slot-scope="scope">
          <span>{{ scope.row.localTasteName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单价" sortable align="center" width="110px">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" sortable align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="160" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleDialog('menuFormDialog', 'update', row)">
            编辑
          </el-button>

          <el-button type="danger" size="mini" @click="deleteItem(row)">
            删除
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
    ></menu-form-dialog>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import {getSingleMenus, createSingleMenu, updateSingleMenu, deleteSingleMenuItem} from '@/api/menu'
  import MenuFormDialog from './SingleMenuFormDialog'

  export default {
    name: "SingleMenuTable",
    props: {
      restaurantId: String
    },
    components: {
      Pagination,
      MenuFormDialog
    },
    data() {
      return {
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
        getSingleMenus(this.restaurantId, query).then(response => {
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
        console.log(data)
        createSingleMenu(data).then(() => {
          callback("创建单品成功")
          this.getList()
        })
      },
      updateData(form, callback) {
        const data = Object.assign({}, form)
        updateSingleMenu(this.restaurantId, data.id, data).then(() => {
          callback("修改单品成功")
          this.getList()
        })
      },
      deleteItem (row) {
        deleteSingleMenuItem(row.id, this.restaurantId).then(res => {
          this.$notify({
            title: '成功',
            message: '单品删除成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      }
    }
  }
</script>

<style scoped>

</style>
