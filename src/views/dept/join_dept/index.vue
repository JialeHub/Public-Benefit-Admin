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
        <el-table-column prop="name" label="组织名称"  sortable></el-table-column>
        <el-table-column prop="nickName" label="昵称" sortable></el-table-column>
        <el-table-column prop="userRealName" label="姓名" sortable></el-table-column>
        <el-table-column prop="phone" label="联系电话" sortable></el-table-column>
        <el-table-column prop="email" label="邮箱" sortable></el-table-column>
        <el-table-column prop="address" label="居住地址">
          <template slot-scope="scope">
            {{scope.row.province+scope.row.city+scope.row.area+scope.row.address}}
          </template>
        </el-table-column>
        <el-table-column prop="count" label="人数" sortable></el-table-column>
        <el-table-column prop="foundTime" label="创立时间" sortable>
          <template slot-scope="scope">
            <span>{{scope.row.foundTime | formatDateTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间" sortable>
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
        <el-table-column label="操作" fixed="right" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"></el-button>
            <delete-button
                :ref="scope.row.id"
                :id="scope.row.id"
                @start="deleteDept"/>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>

</template>

<script>

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

    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
