<template>
  <div class="">
    <el-card v-show="!addFlag&&!editFlag" class="box-card">
      <div slot="header" class="clearfix">
        <el-input placeholder="输入活动名称搜索" v-model="searchActivityName" clearable class="w-200"
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
          <el-table-column prop="picture" label="活动图片" width="100">
            <template slot-scope="scope">
              <el-avatar :size="50" :src="$addBaseURL(scope.row.picture)"></el-avatar>
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
    <edit-ongoing-activity v-show="!addFlag&&editFlag" ref="EditOngoingActivity"
                           @update="getActivityList"></edit-ongoing-activity>
  </div>

</template>

<script>
  import {
    getActivityApi,
    delActivityApi,
    pageActivityApi,
    downloadActivityApplyApi,
    downloadActivityApi
  } from '@/api/activity/activity'
  import AddOngoingActivity from './add/index'
  import EditOngoingActivity from './edit/index'
  import {objectEvaluate} from "@/utils/common";

  export default {
    name: "OngoingActivity",
    components: {EditOngoingActivity, AddOngoingActivity},
    data() {
      return {
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
      } else {
        this.getActivityList();
      }
    },
    methods: {
      getActivityList() {
        this.isTableLoading = true;
        let pagination = this.$refs.Pagination;
        let param = `current=${pagination.current}&size=${pagination.size}&name=${this.searchActivityName}&timeState=0`;
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
        /*let _this = this.$refs.EditOngoingActivity;
        objectEvaluate(_this.form, obj);
        _this.visible = true*/
        this.addFlag = false;
        this.editFlag = true;
        this.$router.push({name: "ongoing_activity", query: {id: obj.id}});
        let _this = this.$refs.EditOngoingActivity;
        _this.editFlag = false;
        _this.getActivity();
        //_this.$refs['Editor'].setContent(obj.content);
        //objectEvaluate(_this.form, obj);
      },
      deleteActivity(id) {
        delActivityApi({ids: id})
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
