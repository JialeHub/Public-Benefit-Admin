<template>
  <div id="editDept">
    <el-card
        title="新增组织"
        width="500px"
        @close="cancel"
        :close-on-click-modal="false">
      <div slot="header" class="clearfix">
        <submit-button ref="SubmitButton" class="float-right" type="success" icon="el-icon-plus" @submit="submitForm"
                       :text="'提交'"></submit-button>
        <el-page-header @back="cancel" content="组织编辑" style="height: 32px;line-height: 32px;"></el-page-header>
      </div>
      <el-form :model="form" :rules="rules" ref="Form" label-width="5rem" hide-required-asterisk>
        <el-form-item label="组织名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="userRealName">
          <el-input v-model="form.userRealName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" sortable>
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-row style="display: flex">
          <el-form-item label="地址" prop="selectedOptions" style="flex: 0 1 300px;margin-right: 20px;">
            <el-col>
              <el-cascader
                  size="large"
                  :options="options"
                  v-model="form.selectedOptions"
              >
              </el-cascader>
            </el-col>
          </el-form-item>
          <el-form-item label="" style="flex: 1" prop="address" label-width="0">
            <el-col class="address">
              <el-input v-model="form.address" style="line-height: 40px;height: 40px;"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-form-item label="创立时间" prop="foundTime">
          <el-date-picker
              v-model="form.foundTime"
              type="datetime"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="人数" prop="count">
          <el-input-number v-model="form.count" :min="0" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="组织图片" prop="picture">
          <add-picture ref="AddFramework" @getImage="getImage" style="padding-top: 10px;"
                       :imageUrl="$addBaseURL(form.picture)"></add-picture>
        </el-form-item>
        <el-form-item label="组织简介" prop="content">
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
  import TreeSelect from '@riophae/vue-treeselect';
  import addPicture from "./component/ImageUploaderPlus";
  import {editDeptApi} from '@/api/dept';
  import {regionData, CodeToText} from 'element-china-area-data';
  import {validateEmali, validatePhone} from "@/utils/validate";
  import {formatDateTime} from "@/utils/common";

  export default {
    name: "editDept",
    components: {TreeSelect, addPicture},
    props: {
      dept: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        normalizer(node) {
          return {
            label: node.name
          }
        },
        options: regionData,
        selectedOptions: [],
        form: {
          name: '',
          enabled: true,
          id: '',
          selectedOptions: [],
          userRealName: '',
          phone: '',
          email: '',
          address: '',
          count: '',
          foundTime: '',
          picture: '',
          content: ''
        },
        rules: {
          name: {required: true, message: '请输入内容', trigger: 'blur'},
          userRealName: {required: true, message: '请输入内容', trigger: 'blur'},
          phone: {validator: validatePhone, trigger: 'blur'},
          email: {validator: validateEmali, trigger: 'blur'},
          address: {required: true, message: '请输入具体地址', trigger: 'blur'},
          selectedOptions: {required: true, message: '请选择地区', trigger: 'change'},
          foundTime: {required: true, message: '请输入内容', trigger: 'blur'},
          picture: {required: true, message: '请上传图片', trigger: 'blur'},
          content: {required: true, message: '请输入内容', trigger: 'blur'},
        }
      }
    },
    methods: {
      getImage(url) {
        this.form.picture = url;
        this.$refs.Form.validateField('picture');
      },
      submitForm() {
        this.$refs['Form'].validate((valid) => {
          if (valid) {
            let data = {...this.form};
            if (data.selectedOptions.length > 0) data.province = CodeToText[data.selectedOptions[0]];
            if (data.selectedOptions.length > 1) data.city = CodeToText[data.selectedOptions[1]];
            if (data.selectedOptions.length > 2) data.area = CodeToText[data.selectedOptions[2]];
            data.foundTime=formatDateTime(data.foundTime);
            delete data.selectedOptions;
            this.$refs.SubmitButton.start();
            editDeptApi(data).then(() => {
              this.$refs.SubmitButton.stop();
              this.$emit('update');
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
