<template>
  <div id="addDept">
    <el-card
        title="新增文章"
        width="500px"
        @close="cancel"
        :close-on-click-modal="false">
      <div slot="header" class="clearfix">
        <submit-button ref="SubmitButton" class="float-right" type="success" icon="el-icon-plus" @submit="submitForm"
                       :text="'提交'"></submit-button>
        <el-page-header @back="cancel" content="添加文章" style="height: 32px;line-height: 32px;"></el-page-header>
      </div>
      <el-form :model="form" :rules="rules" ref="Form" label-width="5rem" hide-required-asterisk>
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="userNickName">
          <el-input v-model="form.userNickName"></el-input>
        </el-form-item>
        <el-form-item label="文章图片" prop="cover">
          <edit-cover ref="AddFramework" @getImage="getImage" style="padding-top: 10px;"
                     :imageUrl="$addBaseURL(form.cover)"></edit-cover>
        </el-form-item>
        <el-form-item label="文章简介" prop="content">
          <el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 20}"
              placeholder="请输入内容"
              v-model="form.content">
          </el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import editCover from "./component/ImageUploaderPlus";
  import {editArticleApi} from "@/api/article";

  export default {
    name: "AddDept",
    components: {editCover},
    data() {
      return {
        normalizer(node) {
          return {
            label: node.name
          }
        },
        form: {
          id: '',
          userNickName: '',
          title: '',
          cover: '',
          content: '',
          sort: '',
          typeId: 0,
          typeName: '',
        },
        rules: {
          title: {required: true, message: '请输入内容', trigger: 'blur'},
          userNickName: {required: true, message: '请输入内容', trigger: 'blur'},
          cover: {required: true, message: '请上传图片', trigger: 'blur'},
          content: {required: true, message: '请输入内容', trigger: 'blur'},
        }
      }
    },
    methods: {
      getImage(url) {
        this.form.cover = url;
        this.$refs.Form.validateField('cover');
      },
      submitForm() {
        this.$refs['Form'].validate((valid) => {
          if (valid) {
            let data = {...this.form};
            this.$refs.SubmitButton.start();
            editArticleApi(data).then(() => {
              this.$refs.SubmitButton.stop();
              this.cancel()
            }).catch(() => {
              this.$refs.SubmitButton.stop();
            })
          } else {
            return false;
          }
        });
      },
      cancel() {
        this.$parent.editFlag = false;
        Object.assign(this.$data.form, this.$options.data().form);
        this.$refs['Form'].clearValidate()
      }
    }
  }
</script>

<style lang="scss">
  #editDept {
    .address {
      .el-input__inner {
        height: 40px !important;
        line-height: 40px !important;
      }
    }
  }

  .el-cascader-panel {
    height: 50vh;

    .el-cascader-menu__wrap {
      overflow-x: hidden;
    }
  }
</style>
