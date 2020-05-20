<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>操作日志</span>
      <i class="float-right pointer"
         :class="isLoading ? 'el-icon-loading':'el-icon-refresh'"
         @click="update"></i>
    </div>
    <div>
      <el-table v-loading="isTableLoading" :data="formData">
        <el-table-column prop="description" label="行为"></el-table-column>
        <el-table-column prop="requestIp" label="IP" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="address" label="IP来源" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="browser" label="浏览器"></el-table-column>
        <el-table-column prop="time" label="请求耗时" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.time }}ms</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | formatDateTime}}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination ref="Pagination" @getNewData="getLog"></pagination>
    </div>
  </el-card>
</template>

<script>
  import {getUserLogApi} from '../../api/person'

  export default {
    name: "PersonalLog",
    data() {
      return {
        isLoading: false,
        isTableLoading: false,
        formData: []
      }
    },
    mounted() {
      this.getLog()
    },
    methods: {
      // 更新操作日志
      update() {
        this.isLoading = true;
        this.getLog();
      },
      // 获得个人操作日志
      getLog() {
        this.isTableLoading = true;
        let pagination = this.$refs.Pagination;
        let param = `page=${pagination.current}&size=${pagination.size}`;
        getUserLogApi(param).then(result => {
          this.isTableLoading = false;
          this.isLoading = false;
          let response = result.resultParam.logIPage;
          this.formData = response.records;
          pagination.total = response.total
        })
      }
    }
  }
</script>

<style scoped>

</style>
