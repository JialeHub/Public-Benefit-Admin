<template>
  <el-row :gutter="20">
    <el-col :sm="24" :md="17" class="mb-15">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-input placeholder="输入角色名称搜索" v-model="searchRoleName" clearable class="w-200"
                    @keyup.enter.native="getRoleList"/>
          <el-button type="success" class="el-icon-search ml-5" @click="getRoleList">搜索</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="add" class="float-right">新增</el-button>
        </div>
        <el-table
                v-loading="isTableLoading"
                :data="formData"
                ref="roleTable"
                @row-click="getTreeChecked"
                :highlight-current-row="true">
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="dataScope" label="数据权限"></el-table-column>
          <el-table-column prop="permission" label="角色权限"></el-table-column>
          <el-table-column prop="level" label="角色级别"></el-table-column>
          <el-table-column prop="remark" label="描述" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="创建时间" :show-overflow-tooltip="true">
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
                      @start="deleteRole"/>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :sm="24" :md="7">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="header">菜单分配</span>
          <submit-button
                  ref="SubmitButton"
                  icon="el-icon-check"
                  class="float-right"
                  @submit="update"
                  text="保存"/>
        </div>
        <div>
          <el-tree
                  ref="RoleMenuTree"
                  :check-strictly="true"
                  :data="tree"
                  show-checkbox
                  node-key="id"
                  :prop="treeProps"
                  accordion
                  :default-checked-keys="menuIds"
          >
          </el-tree>
        </div>
      </el-card>
    </el-col>
    <add-role ref="AddRole" :dept="dept" :level="level" @update="getRoleList"/>
    <edit-role ref="EditRole" :dept="dept" :level="level" @update="getRoleList"/>
  </el-row>
</template>

<script>
  import {getRoleListApi, deleteRoleApi, getRoleTreeApi} from '@/api/role'
  import {editRolesMenusApi} from '@/api/menu'
  import {getUserLevelApi} from '@/api/user'
  import {getDeptTreeApi} from '@/api/dept'
  import AddRole from './add'
  import EditRole from './edit'
  import {objectEvaluate} from "@/utils/common";

  export default {
    name: "Role",
    components: {AddRole, EditRole},
    data() {
      return {
        isTableLoading: false,
        formData: [],
        dept: [],
        tree: [],
        menuIds: [],
        id: null,
        level: null,
        searchRoleName: '',
        treeProps: {
          label: 'name'
        }
      }
    },
    mounted() {
      this.getRoleListAndRoleTree();
      this.getDeptTree();
      this.getUserLevel();
    },
    methods: {
      getDeptTree() {
        getDeptTreeApi('').then(result => {
          this.dept = result.resultParam.deptTree
        })
      },
      getUserLevel() {
        getUserLevelApi().then(result => {
          this.level = result.resultParam.level
        })
      },
      getRoleListAndRoleTree() {
        getRoleListApi('')
            .then(result => {
              this.formData = result.resultParam.roleList;
              return getRoleTreeApi()
            })
            .then(result => {
              this.tree = result.resultParam.roleTree
            })
      },
      getRoleList() {
        this.isTableLoading = true;
        getRoleListApi(this.searchRoleName).then(result => {
          this.isTableLoading = false;
          this.formData = result.resultParam.roleList;
          this.clearChecked();
          this.$refs.SubmitButton.ban();
        })
      },
      // 清除选中
      clearChecked() {
        this.$refs.RoleMenuTree.setCheckedKeys([])
      },
      // 点击行
      getTreeChecked(row) {
        this.$refs.SubmitButton.cancelBan();
        this.clearChecked();
        this.menuIds = row.menus.map(item => item.id);
        this.id = row.id
      },
      // 更新权限
      update() {
        let data = {};
        data.roleId = this.id;
        data.menuIds = this.$refs.RoleMenuTree.getCheckedNodes().map(item => item.id);
        this.$refs.SubmitButton.start();
        editRolesMenusApi(data).then(() => {
          this.$refs.SubmitButton.stop();
          this.getRoleList()
        }).catch(() => {
          this.$refs.SubmitButton.stop();
        })
      },
      add() {
        let _this = this.$refs.AddRole;
        _this.visible = true
      },
      edit(obj) {
        let _this = this.$refs.EditRole;
        objectEvaluate(_this.form, obj);
        _this.form.deptIds = obj.depts.map(item => item.id);
        _this.visible = true
      },
      deleteRole(id) {
        deleteRoleApi(id)
            .then(() => {
              this.getRoleList();
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
