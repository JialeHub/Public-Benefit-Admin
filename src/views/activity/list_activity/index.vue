<template>
  <div class="">
    <el-card v-show="!addFlag&&!editFlag" class="box-card">
      <div slot="header" class="clearfix">
        <el-input placeholder="输入活动名称搜索" v-model="searchActivityName" clearable class="w-200"
                  @keyup.enter.native="getActivityList"/>
        <el-button type="success" class="el-icon-search ml-5" @click="getActivityList">搜索</el-button>
        <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
        <el-button class="float-right" type="danger" icon="el-icon-delete" @click="deleteMoreActivity">批量删除</el-button>
        <el-button class="float-right" type="warning" icon="el-icon-download" @click="downloadActivity">导出</el-button>
      </div>
      <div class="">
        <el-table
            v-loading="isTableLoading"
            :data="formData"
            @selection-change="getSelected"
        >
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column prop="title" label="活动名称"></el-table-column>
          <el-table-column label="活动开始时间" sortable>
            <template slot-scope="scope">
              <span>{{scope.row.beginTime | formatDateTime2}}</span>
            </template>
          </el-table-column>
          <el-table-column label="活动结束时间" sortable>
            <template slot-scope="scope">
              <span>{{scope.row.endTime | formatDateTime2}}</span>
            </template>
          </el-table-column>
          <!--<el-table-column label="报名开始时间">
            <template slot-scope="scope">
              <span>{{scope.row.registerBeginTime | formatDateTime2}}</span><br>
            </template>
          </el-table-column>
          <el-table-column label="报名结束时间">
            <template slot-scope="scope">
              <span>{{scope.row.registerEndTime | formatDateTime2}}</span>
            </template>
          </el-table-column>-->
          <el-table-column prop="number" label="已报名人数" sortable></el-table-column>
          <el-table-column prop="maxNumber" label="限报人数" sortable></el-table-column>
          <el-table-column prop="name" label="负责人"></el-table-column>
          <el-table-column prop="phone" label="联系方式"></el-table-column>
          <el-table-column prop="address" label="活动地点"></el-table-column>
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
        isDeleteMoreDisabled: true,
        deleteList: []
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
        let param = `current=${pagination.current}&size=${pagination.size}&title=${this.searchActivityName}&timeState=1`;
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
      getSelected(array) {
        this.deleteList = array.map(item => item.id);
        this.isDeleteMoreDisabled = array.length === 0;
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
      deleteMoreActivity() {
        this.$msgBox('确定批量删除操作吗？').then(() => {
          delActivityApi({ids: [this.deleteList]}).then(() => {
            this.getActivityList();
          })
        })
      },
      downloadActivity(){
        downloadActivityApi().then(result => {
          let blob = new Blob([result]);
          let downloadElement = document.createElement('a');
          let href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = '活动信息.xls'; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        }).catch(error => { })
      }
    }
  }
</script>

<style scoped>

</style>
