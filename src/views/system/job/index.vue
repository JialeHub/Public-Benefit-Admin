<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-input placeholder="输入岗位名称搜索" v-model="searchJobName" clearable class="w-200"
                @keyup.enter.native="getJobList"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getJobList">搜索</el-button>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <div>
      <el-table
              v-loading="isTableLoading"
              :data="formData"
      >
        <el-table-column prop="name" label="岗位名称"></el-table-column>
        <el-table-column label="所属部门">
          <template slot-scope="scope">
            <span>{{scope.row.dept.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.enabled">启用</el-tag>
            <el-tag type="info" v-else>停用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建日期">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | formatDateTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"></el-button>
            <delete-button
                    :ref="scope.row.id"
                    :id="scope.row.id"
                    @start="deleteJob"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination ref="Pagination" @getNewData="getJobList"></pagination>
    <add-job ref="AddJob" :dept="tree" @update="getJobList"></add-job>
    <edit-job ref="EditJob" :dept="tree" @update="getJobList"></edit-job>
  </el-card>
</template>

<script>
  import {getJobListApi, deleteJobApi} from '@/api/job'
  import {getDeptTreeApi} from '@/api/dept'
  import AddJob from './add'
  import EditJob from './edit'
  import {objectEvaluate} from "@/utils/common";

  export default {
    name: "Job",
    components: {EditJob, AddJob},
    data() {
      return {
        isTableLoading: false,
        formData: [],
        tree: [],
        searchJobName: ''
      }
    },
    mounted() {
      this.getJobList();
      getDeptTreeApi('').then(result => {
        this.tree = result.resultParam.deptTree
      })
    },
    methods: {
      getJobList() {
        this.isTableLoading = true;
        let pagination = this.$refs.Pagination;
        let param = `current=${pagination.current}&size=${pagination.size}&jobName=${this.searchJobName}`;
        getJobListApi(param).then(result => {
          this.isTableLoading = false;
          let response = result.resultParam.jobList;
          this.formData = response.records;
          pagination.total = response.total;
        })
      },
      add() {
        let _this = this.$refs.AddJob;
        _this.visible = true
      },
      edit(obj) {
        let _this = this.$refs.EditJob;
        if (obj.deptId === 0) obj.deptId = null;
        objectEvaluate(_this.form, obj);
        _this.visible = true
      },
      deleteJob(id) {
        deleteJobApi(id)
            .then(() => {
              this.getJobList();
              this.$refs[id].close()
            })
            .catch(() => {
              this.$refs[id].stop();
            })
      }
    }
  }
</script>

<style scoped>

</style>
