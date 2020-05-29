<template>
  <div id="activityJoin">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-select v-model="state" placeholder="请选择审核状态" @change="searchActivityJoin">
          <el-option label="待审核" value="1"></el-option>
          <el-option label="已拒绝" value="0"></el-option>
          <el-option label="已通过" value="2"></el-option>
        </el-select>
        <el-input placeholder="输入昵称搜索" v-model="searchName" clearable class="w-200" style="margin-left: 10px;"
                  @keyup.enter.native="searchActivityJoin"/>
        <el-button type="success" class="el-icon-search ml-5" @click="searchActivityJoin">搜索</el-button>
      </div>
      <el-table v-loading="isTableLoading"
                :data="formData"
                row-key="id"
                :default-expand-all="false"
                :tree-props="{children: 'children'}">
<!--        <el-table-column prop="deptName" label="发布组织" sortable></el-table-column>-->
        <el-table-column prop="realName" label="姓名" sortable></el-table-column>
        <el-table-column prop="activityName" label="活动名称" sortable></el-table-column>
        <el-table-column prop="phone" label="联系电话" sortable></el-table-column>
        <el-table-column prop="userDto.nickName" label="昵称" sortable></el-table-column>
        <el-table-column prop="userDto.email" label="邮箱" sortable></el-table-column>
        <el-table-column prop="userDto.politicsStatus" label="政治面貌" sortable></el-table-column>
        <el-table-column prop="userDto.sex" label="性别" sortable></el-table-column>
        <el-table-column prop="userDto.address" label="居住地址">
          <template slot-scope="scope">
            {{scope.row.userDto.province+scope.row.userDto.city+scope.row.userDto.area+scope.row.userDto.address}}
          </template>
        </el-table-column>
        <!--<el-table-column prop="createTime" label="申请时间" sortable>
          <template slot-scope="scope">
            <span>{{scope.row.createTime | formatDateTime2}}</span>
          </template>
        </el-table-column>-->
        <!--<el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.enabled">启用</el-tag>
            <el-tag type="info" v-else>停用</el-tag>
          </template>
        </el-table-column>-->
        <el-table-column label="操作" align="center" width="200" header-align="center">
          <template slot-scope="scope">
            <el-popconfirm
                title="确认拒绝并删除此条审核？"
                iconColor="red"
                @onConfirm="disagreeJoin(scope.row)"
            >
              <el-button
                  :disabled="state==='0'"
                  class="float-right ml-5 mb-10"
                  :ref="'del_'+scope.row.id"
                  type="danger"
                  icon="el-icon-delete"
                  :loading="scope.row.delLoading"
                  slot="reference"
              >
                <span v-if="state==='0'">已</span>
                <span>拒绝</span>
              </el-button>
            </el-popconfirm>
            <el-popconfirm
                title="确认通过审核吗？"
                @onConfirm="agreeJoin(scope.row)"
            >
              <el-button
                  :disabled="state==='2'"
                  :ref="'pass_'+scope.row.id"
                  class="float-right mb-10"
                  type="success"
                  icon="el-icon-check"
                  :loading="scope.row.passLoading"
                  slot="reference"
              >
                <span v-if="state==='2'">已</span>
                <span>通过</span>
              </el-button>
            </el-popconfirm>

          </template>

        </el-table-column>
      </el-table>
      <pagination ref="Pagination" @getNewData="searchActivityJoin"></pagination>
    </el-card>
  </div>

</template>

<script>

  import {agreeActivityApplyApi, disagreeActivityApplyApi, pageActivityApplyApi} from "@/api/activity";

  export default {
    name: "ActivityJoin",
    data() {
      return {
        state: '1',
        isTableLoading: false,
        formData: [],
        activity: [],
        searchName: ''
      }
    },
    mounted() {
      this.searchActivityJoin()
    },
    methods: {
      searchActivityJoin() {
        this.isTableLoading=true;
        let pagination = this.$refs.Pagination;
        pageActivityApplyApi(`current=${pagination.current}&size=${pagination.size}&name=${this.searchName}&state=${this.state}`).then(response => {
          this.isTableLoading=false;
          let temp = response.resultParam.listPageUtil.list;
          temp.forEach(item => {
            item.delLoading = false;
            item.passLoading = false;
          });
          this.formData = temp;
          pagination.total = response.resultParam.listPageUtil.total;
        }).catch(error => {
          this.isTableLoading=false;
        })
      },
      agreeJoin(row) {
        row.passLoading = true;
        agreeActivityApplyApi({id: row.id}).then(() => {
          this.searchActivityJoin();
          row.delLoading = false;
        }).catch(error => {
          this.searchActivityJoin();
          row.delLoading = false;
        })
      },
      disagreeJoin(row) {
        row.delLoading = true;
        disagreeActivityApplyApi({id: row.id}).then(() => {
          this.searchActivityJoin();
          row.passLoading = true;
        }).catch(error => {
          this.searchActivityJoin();
          row.passLoading = true;
        })
      }
    }
  }
</script>

<style scoped>

</style>
