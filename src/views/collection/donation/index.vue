<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-input placeholder="输入项目名称搜索" v-model="searchName" clearable class="w-200"
                @keyup.enter.native="pageDonation"/>
      <el-button type="success" class="el-icon-search ml-5" @click="pageDonation">搜索</el-button>
    </div>
    <el-table v-loading="isTableLoading" :data="formData">
      <el-table-column prop="projectName" label="项目名称"></el-table-column>
      <el-table-column prop="realName" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="联系电话"></el-table-column>
      <el-table-column prop="userDto.email" label="邮箱"></el-table-column>
      <el-table-column prop="userDto.address" label="居住地址"></el-table-column>
      <el-table-column prop="userDto.politicsStatus" label="政治面貌"></el-table-column>
      <el-table-column prop="dept.name" label="所属组织"></el-table-column>
      <el-table-column prop="price" label="捐款"></el-table-column>
      <el-table-column prop="createTime" label="捐款时间" width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | formatDateTime}}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="Pagination" @getNewData="pageDonation"/>
  </el-card>
</template>

<script>
  import {pageDonationApi} from '../../../api/project'

  export default {
    name: "Donation",
    data() {
      return {
        isTableLoading: false,
        formData: [],
        searchName: ''
      }
    },
    mounted() {
      this.pageDonation()
    },
    methods: {
      pageDonation() {
        this.isTableLoading = true;
        let pagination = this.$refs.Pagination;
        let param = {
          current: pagination.current,
          size: pagination.size,
          name: this.searchName
        };
        pageDonationApi(param).then(result => {
          this.isTableLoading = false;
          let response = result.resultParam.pageUtil;
          this.formData = response.list;
          pagination.total = response.total;
        })
      }
    }
  }
</script>
