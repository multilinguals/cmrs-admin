<template>
  <div class="app-container">
    <el-tabs tab-position="right" @tab-click="handleTabClick">
      <el-tab-pane label="基础信息">用户管理</el-tab-pane>
      <el-tab-pane
              label="单品列表"
              name="menu-table-tab"
      >
        <menu-table ref="menuTable" :restaurant-id="restaurantId" ></menu-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {MenuTable} from './component'
  export default {
    name: "RestaurantDetail",
    components: {
      MenuTable
    },
    computed: {
      restaurantId() {
        return this.$route.params['id']
      }
    },
    methods: {
      handleTabClick(tab, event) {
        if(tab.name === 'menu-table-tab') {
          console.log(this.$refs)
          this.$refs['menuTable'].getList()
        }
      }
    }
  }
</script>

<style scoped>

</style>
