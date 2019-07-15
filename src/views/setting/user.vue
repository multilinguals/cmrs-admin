<template>
  <div class="app-container" style="width: 500px;margin-left:50px;">
    <div class="user-profile">
      <div class="box-center">
        <el-avatar style="width: 100px;height: 100px;" :src="avatar+'?imageView2/1/w/100/h/100'"></el-avatar>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ name }}</div>
        <div class="user-role text-center text-muted">{{ userDetail.id }}</div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="eye"/>
          <span>权限</span></div>
        <div class="user-bio-section-body">
          <el-tag
                  v-for="item in userDetail.roleViewList"
                  :key="item.id"
          >{{ item.name }}
          </el-tag>
        </div>
      </div>
      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="switch-user"/>
          <span>账号</span></div>
        <div class="user-bio-section-body">
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
        </div>
      </div>

      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="time-circle"/>
          <span>创建时间</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ userDetail.createdAt }}
          </div>
        </div>
      </div>
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="time-circle"/>
          <span>更新时间</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ userDetail.updatedAt }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import BioSection from '@/components/BioSection'

  export default {
    name: "SettingUser",
    components: {
      BioList
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

