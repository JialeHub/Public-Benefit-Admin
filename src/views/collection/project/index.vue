<template>
  <el-card class="box-card project">
    <div slot="header" class="clearfix">
      <el-select v-model="searchDeptId" @change="pageProject" filterable remote reserve-keyword placeholder="输入组织名称搜索" :remote-method="remoteMethod" :loading="deptTreeloading" v-if="$storeGet.user.userLevel===1">
        <el-option label="全部组织" value=""> </el-option>
        <el-option
            v-for="item in deptTree"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select>
      <el-input placeholder="输入项目名称搜索" v-model="searchName" clearable class="w-200" style="margin-left: 10px;"
                @keyup.enter.native="pageProject"/>
      <el-button type="success" class="el-icon-search ml-5" @click="pageProject">搜索</el-button>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <el-table v-loading="isTableLoading"
              :data="formData"
              row-key="id"
              :default-expand-all="false"
              :tree-props="{children: 'children'}">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="项目简介">
              <span>{{ props.row.content }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="项目名称"></el-table-column>
      <el-table-column prop="deptName" label="发布组织"></el-table-column>
      <el-table-column prop="picture" label="项目图片" width="120">
        <template slot-scope="scope">
          <img :src="$addBaseURL(scope.row.picture)" width="100px" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="realName" label="联系人"></el-table-column>
      <el-table-column prop="phone" label="联系电话"></el-table-column>
      <el-table-column prop="priceCount" label="已筹资金"></el-table-column>
      <el-table-column prop="count" label="捐款人数"></el-table-column>
      <el-table-column prop="createTime" label="发布时间" width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | formatDateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="count" label="捐款时间" width="155px">
        <template slot-scope="scope">
          <span>{{scope.row.beginTime | formatDateTime}}</span> ~ <span>{{scope.row.endTime | formatDateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"></el-button>
          <delete-button :ref="scope.row.id" :id="scope.row.id" @start="delProject"/>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="Pagination" @getNewData="pageProject"/>
    <add-project ref="AddProject" @update="pageProject"/>
    <edit-project ref="EditProject" @update="pageProject"/>
  </el-card>
</template>

<script>
  import AddProject from './add'
  import EditProject from './edit'
  import {pageProjectApi, delProjectApi} from '../../../api/project'
  import {objectEvaluate} from "@/utils/common";
  import {getDeptTreeApi} from "@/api/dept";

  export default {
    name: "Project",
    components: {AddProject, EditProject},
    data() {
      return {
        deptTreeloading: false,
        deptTree: [],
        searchDeptId: '',
        isTableLoading: false,
        formData: [],
        searchName: ''
      }
    },
    mounted() {
      this.getDeptTree();
      this.pageProject();
    },
    methods: {
      pageProject() {
        this.isTableLoading = true;
        let pagination = this.$refs.Pagination;
        let param = {
          current: pagination.current,
          size: pagination.size,
          name: this.searchName
        };
        if (this.$storeGet.user.userLevel!==1) {
          param.deptId = this.$storeGet.user.deptId;
        }else{
          param.deptId = this.searchDeptId;
          if (param.deptId==='') delete param.deptId;
        }
        pageProjectApi(param).then(result => {
          this.isTableLoading = false;
          let response = result.resultParam.projectPage;
          this.formData = response.records;
          pagination.total = response.total;
        })
      },
      add() {
        this.$refs.AddProject.visible = true
      },
      edit(obj) {
        let _this = this.$refs.EditProject;
        _this.visible = true;
        objectEvaluate(_this.form, obj);
        let time = [];
        time[0] = new Date(obj.beginTime);
        time[1] = new Date(obj.endTime);
        _this.form.time = time;
      },
      remoteMethod(query){
        this.deptTreeloading=true;
        getDeptTreeApi(query).then(result => {
          this.deptTreeloading=false;
          this.deptTree = result.resultParam.deptTree
        })
      },
      getDeptTree() {
        getDeptTreeApi("").then(result => {
          this.dept = result.resultParam.deptTree;
          this.deptTree = result.resultParam.deptTree
        })
      },
      delProject(id) {
        delProjectApi({id: id})
          .then(() => {
            this.pageProject();
            this.$refs[id].close()
          })
          .catch(() => {
            this.$refs[id].stop();
          })
      }
    }
  }
</script>

<style lang="scss">
  .project {
    .el-textarea__inner {
      height: 150px;
    }
  }
</style>
