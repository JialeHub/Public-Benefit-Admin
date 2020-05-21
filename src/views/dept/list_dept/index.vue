<template>
  <div id="dept">
    <el-card class="box-card" v-if="!editFlag&&!addFlag">
      <div slot="header" class="clearfix">
        <el-input placeholder="输入组织名称搜索" v-model="searchName" clearable class="w-200" @keyup.enter.native="getDeptTree"/>
        <el-button type="success" class="el-icon-search ml-5" @click="getDeptTree">搜索</el-button>
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
              <el-form-item label="简介">
                <span>{{ props.row.content }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="picture" label="组织图片" width="100">
          <template slot-scope="scope">
            <el-avatar :size="50" :src="$addBaseURL(scope.row.picture)"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="组织名称" sortable></el-table-column>
        <el-table-column prop="userRealName" label="联系人" sortable></el-table-column>
        <el-table-column prop="phone" label="联系电话" sortable></el-table-column>
        <el-table-column prop="email" label="邮箱" sortable></el-table-column>
        <el-table-column prop="address" label="组织地址">
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
      <pagination ref="Pagination" @getNewData="getDeptTree"></pagination>
    </el-card>
    <add-dept ref="AddDept" :dept="dept" @update="getDeptTree" v-show="!editFlag&&addFlag"/>
    <edit-dept ref="EditDept" :dept="dept" @update="getDeptTree" v-show="editFlag&&!addFlag"/>
  </div>

</template>

<script>
  import {getDeptTreeApi, deleteDeptApi} from '@/api/dept'
  import AddDept from './add'
  import {TextToCode} from 'element-china-area-data';
  import {objectEvaluate} from "@/utils/common";
  import EditDept from './edit'

  export default {
    name: "Dept",
    components: {AddDept, EditDept},
    data() {
      return {
        isTableLoading: false,
        editFlag: false,
        addFlag: false,
        formData: [],
        dept: [],
        searchName: ''
      }
    },
    mounted() {
      this.getDeptTree()
    },
    methods: {
      getDeptTree() {
        this.isTableLoading = true;
        let pagination = this.$refs.Pagination;
        getDeptTreeApi(`current=${pagination.current}&size=${pagination.size}&deptName=${this.searchName}`).then(result => {
          this.isTableLoading = false;
          this.formData = result.resultParam.deptPage.records;
          this.dept = result.resultParam.deptPage.records;
          pagination.total = result.resultParam.deptPage.count;
        })
      },
      add() {
        this.editFlag=false;
        this.addFlag=true;
      },
      edit(obj) {
        let _this = this.$refs.EditDept;
        //if (obj.pid === 0) obj.pid = null;
        obj.selectedOptions=[];
        if (obj.province && obj.province !== "") {
          obj.selectedOptions[0] = TextToCode[obj.province].code;
        }
        if (obj.city && obj.city !== "") {
          obj.selectedOptions[1] = TextToCode[obj.province][obj.city].code;
        }
        if (obj.area && obj.area !== "") {
          obj.selectedOptions[2] = TextToCode[obj.province][obj.city][obj.area].code;
        }
        objectEvaluate(_this.form, obj);
        this.addFlag=false;
        this.editFlag=true;
      },
      deleteDept(id) {
        deleteDeptApi(id)
            .then(() => {
              this.getDeptTree();
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
