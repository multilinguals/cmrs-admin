<template>
  <div class="app-container" style="width: 500px;margin-left:50px;">
    <div class="user-profile">
      <div class="box-center">
        <vue-letter-avatar :name="name" size="100" :rounded=true />
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ name }}</div>
        <div class="user-role text-center text-muted">{{ userDetail.id }}</div>
      </div>
    </div>

    <div class="user-bio">
      <bio-section
              title="权限"
              icon="eye"
      >
        <el-tag
                v-for="item in userDetail.roleViewList"
                :key="item.id"
        >{{ item.name }}
        </el-tag>
      </bio-section>
      <bio-section
              title="账号"
              icon="switch-user"
      >
        <el-alert
                v-for="account in userDetail.accountViewList"
                :key="account.id"
                :title="account.type"
                type="info"
                :closable="false"
        >
          <template
                  slot="default"
          >
            <span>{{ account.idInType }}</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{ account.id }}</span>
          </template>
        </el-alert>
      </bio-section>
      <bio-section
              title="创建时间"
              icon="time-circle"
              :description="userDetail.createdAt"/>
      <bio-section
              title="更新时间"
              icon="time-circle"
              :description="userDetail.updatedAt"/>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import BioSection from '@/components/BioSection'

  export default {
    name: "SettingUser",
    components: {
      BioSection
    },
    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'userDetail'
      ])
    },
    data () {
      return {
        items: [
          {icon: 'eye', title: '权限'}
        ]
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
      text-align: center;
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
  }
</style>

