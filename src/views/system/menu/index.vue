<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-input placeholder="输入菜单名称搜索" v-model="searchTitle" clearable class="w-200"
                @keyup.enter.native="searchMenu"/>
      <el-button type="success" class="el-icon-search ml-5" @click="searchMenu">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="add" class="float-right">新增</el-button>
    </div>
    <el-table v-loading="isTableLoading"
              :data="formData"
              row-key="id"
              :tree-props="{children: 'children'}">
      <el-table-column prop="title" label="菜单名称"></el-table-column>
      <el-table-column prop="icon" label="图标" align="center">
        <template slot-scope="scope">
          <svg-icon slot="prefix" :icon-class="scope.row.icon" class="el-table-column-icon"/>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" align="center"></el-table-column>
      <el-table-column prop="name" label="路径名称"></el-table-column>
      <el-table-column prop="permission" label="权限标识"></el-table-column>
      <el-table-column label="外链">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.iframe">是</el-tag>
          <el-tag type="info" v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="缓存">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.cache">是</el-tag>
          <el-tag type="info" v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="可见">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.hidden">否</el-tag>
          <el-tag type="success" v-else>是</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"></el-button>
          <delete-button
                  :ref="scope.row.id"
                  :id="scope.row.id"
                  @start="deleteMenu"/>
        </template>
      </el-table-column>
    </el-table>
    <add-menu ref="AddMenu" :menu="menu" @update="getMenu"/>
    <edit-menu ref="EditMenu" :menu="menu" @update="getMenu"/>
  </el-card>
</template>

<script>
  import {getAllMenuApi, deleteMenuApi} from '@/api/menu'
  import AddMenu from './add'
  import EditMenu from './edit'
  import {objectEvaluate} from "@/utils/common";

  export default {
    name: "Menu",
    components: {AddMenu, EditMenu},
    data() {
      return {
        isTableLoading: false,
        isDeleteLoading: false,
        formData: [],
        menu: [],
        searchTitle: ''
      }
    },
    mounted() {
      this.getMenu()
    },
    methods: {
      getMenu() {
        this.isTableLoading = true;
        getAllMenuApi('').then(result => {
          this.isTableLoading = false;
          this.formData = result.resultParam.menuList;
          this.menu = result.resultParam.menuList
        })
      },
      searchMenu() {
        this.isTableLoading = true;
        getAllMenuApi(this.searchTitle).then(result => {
          this.isTableLoading = false;
          this.formData = result.resultParam.menuList;
        })
      },
      deleteMenu(id) {
        deleteMenuApi(id)
            .then(() => {
              this.getMenu();
              this.$refs[id].close()
            })
            .catch(() => {
              this.$refs[id].stop();
            })
      },
      add() {
        let _this = this.$refs.AddMenu;
        _this.visible = true;
      },
      edit(obj) {
        let _this = this.$refs.EditMenu;
        if (obj.pid === 0) obj.pid = null;
        objectEvaluate(_this.form, obj);
        _this.visible = true;
      }
    }
  }
</script>

<style scoped>

</style>
