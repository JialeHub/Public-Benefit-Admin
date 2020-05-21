<template>
  <div id="deptJoin">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-input placeholder="输入组织名称搜索" v-model="searchName" clearable class="w-200"
                  @keyup.enter.native="searchDeptJoin"/>
        <el-button type="success" class="el-icon-search ml-5" @click="searchDeptJoin">搜索</el-button>
      </div>
      <el-table v-loading="isTableLoading"
                :data="formData"
                row-key="id"
                :default-expand-all="false"
                :tree-props="{children: 'children'}">
        <el-table-column prop="deptName" label="组织名称" sortable></el-table-column>
        <el-table-column prop="userDto.nickName" label="昵称" sortable></el-table-column>
        <el-table-column prop="realName" label="姓名" sortable></el-table-column>
        <el-table-column prop="phone" label="联系电话" sortable></el-table-column>
        <el-table-column prop="userDto.email" label="邮箱" sortable></el-table-column>
        <el-table-column prop="userDto.politicsStatus" label="政治面貌" sortable></el-table-column>
        <el-table-column prop="userDto.sex" label="性别" sortable></el-table-column>
        <el-table-column prop="userDto.address" label="居住地址">
          <template slot-scope="scope">
            {{scope.row.userDto.province+scope.row.userDto.city+scope.row.userDto.area+scope.row.userDto.address}}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="申请时间" sortable>
          <template slot-scope="scope">
            <span>{{scope.row.createTime | formatDateTime2}}</span>
          </template>
        </el-table-column>
        <!--<el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.enabled">启用</el-tag>
            <el-tag type="info" v-else>停用</el-tag>
          </template>
        </el-table-column>-->
        <el-table-column label="操作" fixed="right" align="center" width="200">
          <template slot-scope="scope">

            <el-popconfirm
                title="确认拒绝并删除此条审核？"
                iconColor="red"
                @onConfirm="disagreeJoin(scope.row)"
            >
              <el-button
                  class="float-right ml-5 mb-10"
                  :ref="'del_'+scope.row.id"
                  type="danger"
                  icon="el-icon-delete"
                  :loading="scope.row.delLoading"
                  slot="reference"
              >
                <span> 拒绝 </span>
              </el-button>
            </el-popconfirm>
            <el-popconfirm
                title="确认通过审核吗？"
                @onConfirm="agreeJoin(scope.row)"
            >
              <el-button
                  :ref="'pass_'+scope.row.id"
                  class="float-right mb-10"
                  type="success"
                  icon="el-icon-check"
                  :loading="scope.row.passLoading"
                  :disabled="scope.row.updateId && scope.row.updateId===1"
                  slot="reference"
              >
                <span v-if="scope.row.updateId && scope.row.updateId===1">已通过</span>
                <span v-else>通过</span>
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <pagination ref="Pagination" @getNewData="searchDeptJoin"></pagination>
    </el-card>
  </div>

</template>

<script>

  import {agreeJoinApi, disagreeJoinApi, pageJoinOrgApi} from "@/api/dept";

  export default {
    name: "DeptJoin",
    data() {
      return {
        isTableLoading: false,
        formData: [],
        dept: [],
        searchName: ''
      }
    },
    mounted() {
      this.searchDeptJoin()
    },
    methods: {
      searchDeptJoin() {
        let pagination = this.$refs.Pagination;
        pageJoinOrgApi(`current=${pagination.current}&size=${pagination.size}&name=${this.searchName}`).then(response => {
          let temp = response.resultParam.listPageUtil.list;
          temp.forEach(item => {
            item.delLoading = false;
            item.passLoading = false;
          });
          this.formData = temp;
          pagination.total = response.resultParam.listPageUtil.total;
        }).catch(error => {
          console.log(error);
        })
      },
      agreeJoin(row) {
        row.passLoading = true;
        agreeJoinApi({id: row.id}).then(() => {
          this.searchDeptJoin();
          row.delLoading = false;
        }).catch(error => {
          this.searchDeptJoin();
          row.delLoading = false;
        })
      },
      disagreeJoin(row) {
        row.delLoading = true;
        disagreeJoinApi({id: row.id}).then(() => {
          this.searchDeptJoin();
          row.passLoading = true;
        }).catch(error => {
          this.searchDeptJoin();
          row.passLoading = true;
        })
      }
    }
  }
</script>

<style scoped>

</style>
