<template>
  <el-row :gutter="20">
    <el-col :sm="24" :md="20" class="mb-15">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-input placeholder="输入用户名搜索" v-model="searchUsername" clearable class="w-200"
                    @keyup.enter.native="searchUserList"/>
          <el-button type="success" class="el-icon-search ml-5" @click="searchUserList">搜索</el-button>
          <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
        </div>
        <el-table v-loading="isTableLoading" :data="formData">
          <el-table-column prop="username" label="用户名"></el-table-column>
          <el-table-column prop="nickName" label="昵称"></el-table-column>
          <el-table-column prop="realName" label="真实姓名"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="address" label="地址">
            <template slot-scope="scope">
              <span>{{scope.row.province+scope.row.city+scope.row.area+scope.row.address}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userAvatar" label="政治面貌"></el-table-column>
          <el-table-column prop="dept.name" label="所属组织"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <!--<el-table-column label="组织/岗位">
            <template slot-scope="scope">
              {{getDeptNameAndJobName(scope.row)}}
            </template>
          </el-table-column>-->
          <!--<el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag type="info" v-if="scope.row.enabled">正常</el-tag>
              <el-tag type="danger" v-else>禁用</el-tag>
            </template>
          </el-table-column>-->
          <el-table-column label="创建时间">
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
                      @start="deleteUser"/>
            </template>
          </el-table-column>
        </el-table>
        <pagination ref="Pagination" @getNewData="getUserList"></pagination>
      </el-card>
    </el-col>
    <el-col :sm="24" :md="4" class="mb-15" v-show="true">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-input
              clearable
              size="small"
              placeholder="输入组织名称"
              prefix-icon="el-icon-search"
              @keyup.enter.native="searchDept"
              class="w-100"
              v-model="searchDeptName">
          </el-input>
        </div>
        <div>
          <el-tree
              ref="deptTree"
              :data="deptTree"
              node-key="id"
              :props="treeProps"
              @node-click="searchByDeptId"
              default-expand-all
              :expand-on-click-node="false"
          >
          </el-tree>
        </div>
      </el-card>
    </el-col>
    <add-user ref="AddUser" :dept="dept" @update="getUserList" :roleList="roleList"></add-user>
    <edit-user ref="EditUser" :dept="dept" @update="getUserList" :roleList="roleList"></edit-user>
  </el-row>
</template>

<script>
  import {getUserListApi, deleteUserApi} from '@/api/user'
  import {getDeptTreeApi} from '@/api/dept'
  import {getRoleListApi} from '@/api/role'
  import AddUser from './add'
  import EditUser from './edit'
  import {objectEvaluate, objectExchange} from "@/utils/common";

  export default {
    name: "User",
    components: {AddUser, EditUser},
    data() {
      return {
        searchUsername: '',
        searchDeptId: '',
        formData: [],
        isTableLoading: false,
        dept: [],
        deptTree: [],
        searchDeptName: '',
        roleList: [],
        treeProps: {
          label: 'name'
        }
      }
    },
    mounted() {
      this.getUserList();
      this.getDeptTree();
      this.getRoleList()
    },
    methods: {
      getRoleList() {
        getRoleListApi('').then(result => {
          this.roleList = result.resultParam.roleList;
        })
      },
      getDeptTree() {
        getDeptTreeApi("").then(result => {
          this.dept = result.resultParam.deptTree;
          this.deptTree = result.resultParam.deptTree
        })
      },
      searchDept() {
        getDeptTreeApi(this.searchDeptName).then(result => {
          this.deptTree = result.resultParam.deptTree
        })
      },
      searchUserList() {
        this.searchDeptId = "";
        this.getUserList();
      },
      searchByDeptId(obj) {
        this.searchDeptId = obj.id;
        this.getUserList();
      },
      getUserList() {
        this.isTableLoading = true;
        let pagination = this.$refs.Pagination;
        let param = `current=${pagination.current}&size=${pagination.size}&deptId=${this.searchDeptId}&username=${this.searchUsername}`;
        getUserListApi(param).then(result => {
          this.isTableLoading = false;
          let response = result.resultParam.userList;
          this.formData = response.records;
          pagination.total = response.total;
        })
      },
      getDeptNameAndJobName(obj) {
        return ''
        // return `${obj.dept.name}/${obj.job.name}`
      },
      add() {
        let _this = this.$refs.AddUser;
        _this.visible = true
      },
      edit(obj) {
        let _this = this.$refs.EditUser;
        delete obj.jobId;
        objectEvaluate(_this.form, obj);
        objectExchange(_this.FORM, _this.form);
        _this.initDept(obj.deptId);
        _this.visible = true
      },
      deleteUser(id) {
        deleteUserApi({ids: id})
          .then(() => {
            this.getUserList();
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
