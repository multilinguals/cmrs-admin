<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
              class="filter-item"
              style="float: right;"
              type="primary"
              icon="el-icon-plus"
              @click="handleDialog('restaurantFormDialog', 'create')"
              size="medium"
      >
        添加餐厅
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
<!--      <el-table-column label="餐厅ID" width="250px" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ scope.row.id }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="名称" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="简介" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" sortable align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.creatorRealName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" sortable align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="220" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <router-link :to="'/restaurant/detail/'+row.id">
            <el-button size="mini" type="success">
              查看
            </el-button>
          </router-link>
          <el-button type="primary" size="mini" @click="handleDialog('userFormDialog', 'update', row)">
            编辑
          </el-button>

        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size"
                @pagination="getList"/>

    <restaurant-form-dialog
            ref="restaurantFormDialog"
            @create="createData"
            @update="updateData"
    ></restaurant-form-dialog>
  </div>
</template>

<script>
  import {getRestaurants, createRestaurant, updateRestaurant} from '@/api/restaurant'
  import Pagination from '@/components/Pagination'
  import {RestaurantFormDialog} from './component'

  export default {
    name: 'RestaurantIndex',
    components: {
      Pagination,
      RestaurantFormDialog
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
        getRestaurants(query).then(response => {
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
        createRestaurant(data).then(() => {
          callback("创建餐厅成功")
          this.getList()
        })
      },
      updateData(form, callback) {
        const data = {
          realName: form.realName,
          id: form.id
        }
        updateRestaurant(data).then(() => {
          callback("修改餐厅成功")
          this.getList()
        })
      }
    }
  }
</script>
