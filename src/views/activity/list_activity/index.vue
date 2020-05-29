<template>
  <div class="">
    <el-card v-show="!addFlag&&!editFlag" class="box-card">
      <div slot="header" class="clearfix">
        <el-select v-model="searchDeptId" @change="getActivityList" filterable remote reserve-keyword placeholder="输入组织名称搜索" :remote-method="remoteMethod" :loading="deptTreeloading" v-if="$storeGet.user.userLevel===1">
          <el-option label="全部组织" value=""> </el-option>
          <el-option
              v-for="item in deptTree"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
        <el-input placeholder="输入活动名称搜索" v-model="searchActivityName" clearable class="w-200" style="margin-left: 10px;"
                  @keyup.enter.native="getActivityList"/>
        <el-button type="success" class="el-icon-search ml-5" @click="getActivityList">搜索</el-button>
        <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
      </div>
      <div class="">
        <el-table
            v-loading="isTableLoading"
            :data="formData"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="简介">
                  <span>{{ props.row.content }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="picture" label="活动图片" width="120">
            <template slot-scope="scope">
              <img :src="$addBaseURL(scope.row.picture)" height="50px" alt="">
            </template>
          </el-table-column>
          <el-table-column prop="deptName" label="发布组织" sortable></el-table-column>
          <el-table-column prop="name" label="活动名称" sortable></el-table-column>
          <el-table-column prop="realName" label="联系人" sortable></el-table-column>
          <el-table-column prop="phone" label="联系方式" sortable></el-table-column>
          <el-table-column prop="address" label="活动地点">
            <template slot-scope="scope">
              {{scope.row.province+scope.row.city+scope.row.area+scope.row.address}}
            </template>
          </el-table-column>
          <el-table-column prop="count" label="已报人数" sortable></el-table-column>
          <el-table-column label="活动时间" sortable>
            <template slot-scope="scope">
              <span>{{scope.row.beginTime | formatDateTime2}}</span>
            </template>
          </el-table-column>
          <el-table-column label="截止时间" sortable>
            <template slot-scope="scope">
              <span>{{scope.row.endTime | formatDateTime2}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="服务时长" sortable>
            <template slot-scope="scope">
              <span>{{scope.row.time}} 小时</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" align="center" width="150">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
              <delete-button
                  :ref="scope.row.id"
                  :id="scope.row.id"
                  @start="deleteActivity"/>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination ref="Pagination" @getNewData="getActivityList"></pagination>
    </el-card>
    <add-ongoing-activity v-show="addFlag&&!editFlag" ref="AddOngoingActivity"
                          @update="getActivityList"></add-ongoing-activity>
    <edit-activity v-show="!addFlag&&editFlag" ref="EditActivity"
                           @update="getActivityList"></edit-activity>
  </div>

</template>

<script>
  import { delActivityApi, pageActivityApi, } from '@/api/activity'
  import AddOngoingActivity from './add/index'
  import EditActivity from './edit/index'
  import {getDeptTreeApi} from "@/api/dept";

  export default {
    name: "OngoingActivity",
    components: {EditActivity, AddOngoingActivity},
    data() {
      return {
        deptTreeloading: false,
        deptTree: [],
        searchDeptId: '',
        isTableLoading: false,
        formData: [],
        searchActivityName: '',
        addFlag: false,
        editFlag: false,
      }
    },
    mounted() {
      if (this.$route.query.id) {
        this.edit({id: this.$route.query.id})
        this.$refs.EditActivity.getActivity();
      } else {
        this.getActivityList();
      }
      this.getDeptTree();
    },
    methods: {
      getActivityList() {
        this.isTableLoading = true;
        let pagination = this.$refs.Pagination;
        let param;
        if (this.$storeGet.user.userLevel!==1) {
          param = `current=${pagination.current}&size=${pagination.size}&name=${this.searchActivityName}&deptId=${this.$storeGet.user.deptId}&timeState=1`
        }else{
          if (this.searchDeptId!==''){
            param = `current=${pagination.current}&size=${pagination.size}&name=${this.searchActivityName}&timeState=1&deptId=${this.searchDeptId}`;
          }else{
            param = `current=${pagination.current}&size=${pagination.size}&name=${this.searchActivityName}&timeState=1`;
          }
        }
        pageActivityApi(param).then(result => {
          this.isTableLoading = false;
          let response = result.resultParam.activityPage;
          this.formData = response.records;
          pagination.total = response.total;
        })
      },
      add() {
        /*let _this = this.$refs.AddOngoingActivity;
        _this.visible = true*/
        this.addFlag = true;
        this.editFlag = false;
      },
      edit(obj) {
        /*let _this = this.$refs.EditActivity;
        objectEvaluate(_this.form, obj);
        _this.visible = true*/
        this.addFlag = false;
        this.editFlag = true;
        this.$router.push({name: "list_activity", query: {id: obj.id}});
        let _this = this.$refs.EditActivity;
        _this.getActivity();
        //_this.$refs['Editor'].setContent(obj.content);
        //objectEvaluate(_this.form, obj);
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
      deleteActivity(id) {
        delActivityApi(id)
          .then(() => {
            this.getActivityList();
            this.$refs[id].close()
          })
          .catch(() => {
            this.$refs[id].stop();
          })
      },
    }
  }
</script>

<style scoped>

</style>
