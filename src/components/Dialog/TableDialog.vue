<template>
  <el-dialog :title="title" :visible.sync="dialog">
    <el-table
            :data="list"
    >
      <template v-for="item in head">
        <el-table-column
                :label="item.label"
                :width="item.width"
        >
          <template slot-scope="scope">
            <span>{{ scope.row[item.key] }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </el-dialog>
</template>

<script>
  export default {
    name: 'TableDialog',
    props: {
      title: {
        type: String,
        default: ''
      },
      head: {
        type: Array,
        default: () => { return [] }
      }
    },
    data () {
      return {
        dialog: false,
        list: []
      }
    },
    methods: {
      open (data) {
        console.log(data)
        this.dialog = true
        this.list = data
      }
    }
  }
</script>

<style scoped>

</style>
