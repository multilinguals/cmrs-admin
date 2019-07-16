<template>
  <div class="app-container">
    <el-row :gutter="20">

      <el-col :span="6" :xs="24">
        <restaurant-card :restaurant="detail"/>
      </el-col>

      <el-col :span="18" :xs="24">
        <el-card>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="单品列表" name="menu_single">
              <menu-table :restaurantId="restaurantId"></menu-table>
            </el-tab-pane>
            <el-tab-pane label="套餐列表" name="menu_multi">

            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>

    </el-row>
  </div>
</template>

<script>
  import {getRestaurant} from '@/api/restaurant'
  import {MenuTable, RestaurantCard} from './component'

  export default {
    name: "RestaurantDetail",
    components: {
      MenuTable,
      RestaurantCard
    },
    data() {
      return {
        detail: {},
        activeTab: 'menu_single'
      }
    },
    computed: {
      restaurantId() {
        return this.$route.params['id']
      }
    },
    mounted() {
      this.getDetail()
    },
    methods: {
      getDetail() {
        getRestaurant(this.restaurantId).then(res => {
          this.detail = res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
