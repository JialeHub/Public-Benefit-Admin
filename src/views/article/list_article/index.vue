<template>
  <div id="article">
    <el-card class="box-card" v-show="!editFlag&&!addFlag">
      <div slot="header" class="clearfix">
        <el-input placeholder="输入文章标题搜索" v-model="searchName" clearable class="w-200" @keyup.enter.native="getArticleList"/>
        <el-button type="success" class="el-icon-search ml-5" @click="getArticleList">搜索</el-button>
        <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
        <el-button class="float-right" type="danger" icon="el-icon-delete" @click="deleteMoreArticle">批量删除</el-button>
      </div>
      <el-table v-loading="isTableLoading"
                :data="formData"
                row-key="id"
                :default-expand-all="false"
                @selection-change="getSelected"
                :tree-props="{children: 'children'}">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="文章内容">
                <span>{{ props.row.content }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
            :selectable="(row,index)=>{return ($storeGet.user.userLevel===1 || $storeGet.user.deptId===row.deptId)}"
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column prop="picture" label="项目图片" width="120">
          <template slot-scope="scope">
            <img :src="$addBaseURL(scope.row.cover)" width="100px" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="deptName" label="发布组织" sortable></el-table-column>
        <el-table-column prop="title" label="文章标题" sortable></el-table-column>
        <el-table-column prop="userNickName" label="作者" sortable></el-table-column>
        <el-table-column prop="updateTime" label="发布时间" sortable>
          <template slot-scope="scope">
            <span>{{scope.row.updateTime | formatDateTime2}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)" :disabled="!($storeGet.user.userLevel===1 || $storeGet.user.deptId===scope.row.deptId)"></el-button>
            <delete-button :disabled="!($storeGet.user.userLevel===1 || $storeGet.user.deptId===scope.row.deptId)"
                :ref="scope.row.id"
                :id="scope.row.id"
                @start="deleteArticle"/>
          </template>
        </el-table-column>
      </el-table>
      <pagination ref="Pagination" @getNewData="getArticleList"></pagination>
    </el-card>
    <add-article ref="AddArticle" :article="article" @update="getArticleList" v-show="!editFlag&&addFlag"/>
    <edit-article ref="EditArticle" :article="article" @update="getArticleList" v-show="editFlag&&!addFlag"/>
  </div>

</template>

<script>
  import { pageArticleApi, delArticleApi} from '@/api/article'
  import AddArticle from './add'
  import {objectEvaluate} from "@/utils/common";
  import EditArticle from './edit'

  export default {
    name: "Article",
    components: {AddArticle, EditArticle},
    data() {
      return {
        isTableLoading: false,
        editFlag: false,
        addFlag: false,
        formData: [],
        article: [],
        searchName: '',
        isDeleteMoreDisabled: true,
        deleteList: []
      }
    },
    mounted() {
      this.getArticleList()
    },
    methods: {
      getArticleList() {
        this.isTableLoading = true;
        let pagination = this.$refs.Pagination;
        pageArticleApi(`current=${pagination.current}&size=${pagination.size}&title=${this.searchName}&isShow=${1}&typeId=${0}`).then(result => {
          this.isTableLoading = false;
          this.formData = result.resultParam.articlePage.records;
          this.article = result.resultParam.articlePage.records;
          pagination.total = result.resultParam.articlePage.total;
        })
      },
      add() {
        this.editFlag=false;
        this.addFlag=true;
      },
      edit(obj) {
        let _this = this.$refs.EditArticle;
        //if (obj.pid === 0) obj.pid = null;
        objectEvaluate(_this.form, obj);
        this.addFlag=false;
        this.editFlag=true;
      },
      getSelected(array) {
        this.deleteList = array.map(item => item.id);
        this.isDeleteMoreDisabled = array.length === 0;
      },
      deleteArticle(id) {
        delArticleApi({ids: id})
          .then(() => {
            this.getArticleList();
            this.$refs[id].close()
          })
          .catch(() => {
            this.$refs[id].stop();
          })
      },
      deleteMoreArticle() {
        this.$msgBox('确定批量删除操作吗？').then(() => {
          delArticleApi({ids: [this.deleteList]}).then(() => {
            this.getArticleList();
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
