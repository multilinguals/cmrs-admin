<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>餐厅信息</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <template v-if="restaurant.name">
          <vue-letter-avatar :name="restaurant.name" size="100" :rounded=true />
        </template>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ restaurant.name }}</div>
      </div>
    </div>

    <div class="user-bio">
      <bio-section
              title="简介"
              icon="document"
              :description="restaurant.description"/>
      <bio-section
              title="创建人"
              icon="user"
              :description="restaurant.creatorRealName"/>
      <bio-section
              title="创建时间"
              icon="time-circle"
              :description="restaurant.createdAt"/>
    </div>
  </el-card>
</template>

<script>
  import BioSection from '@/components/BioSection'
  export default {
    name: 'RestaurantCard',
    components: { BioSection },
    props: {
      restaurant: {
        type: Object,
        default: () => {
          return {
            name: '',
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .box-center {
    margin: 0 auto;
    display: table;
  }

  .text-muted {
    color: #777;
  }

  .user-profile {
    .user-name {
      font-weight: bold;
    }

    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
      font-size: 14px;
    }

    .box-social {
      padding-top: 30px;

      .el-table {
        border-top: 1px solid #dfe6ec;
      }
    }

    .user-follow {
      padding-top: 20px;
    }
  }

  .user-bio {
    margin-top: 20px;
    color: #606266;

    span {
      padding-left: 4px;
    }

    .user-bio-section {
      font-size: 14px;
      padding: 15px 0;

      .user-bio-section-header {
        border-bottom: 1px solid #dfe6ec;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: bold;
      }
    }
  }
</style>

