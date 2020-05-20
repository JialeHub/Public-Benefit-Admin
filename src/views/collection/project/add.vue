<template>
  <el-dialog
      title="新增项目"
      width="600px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="80px">
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="realName">
        <el-input v-model="form.realName"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="捐款时间" prop="time">
        <el-date-picker
            v-model="form.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="项目图片" prop="picture">
        <image-uploader ref="ImageUploader" :imageUrl="form.picture" @getImage="getImage"/>
      </el-form-item>
      <el-form-item label="项目内容" prop="content">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="SubmitButton" @submit="submitForm"/>
    </div>
  </el-dialog>
</template>

<script>
  import {addProjectApi} from '../../../api/project'
  import {formatDateTime} from "../../../utils/common";
  import ImageUploader from './ImageUploader';

  export default {
    name: "AddProject",
    components: {ImageUploader},
    data() {
      return {
        visible: false,
        form: {
          name: '',
          picture: '',
          realName: '',
          phone: '',
          beginTime: '',
          endTime: '',
          content: '',
          time: ''
        },
        rules: {
          name: {required: true, message: '请输入项目名称', trigger: 'blur'},
          picture: {required: true, message: '请上传项目图片', trigger: 'blur'},
          realName: {required: true, message: '请输入联系人', trigger: 'blur'},
          phone: {required: true, message: '请输入联系电话', trigger: 'blur'},
          content: {required: true, message: '请输入项目内容', trigger: 'blur'},
          time: {required: true, message: '请选择捐款时间', trigger: 'change'}
        }
      }
    },
    methods: {
      getImage(value) {
        this.form.picture = value;
        this.$refs['Form'].validateField('picture');
      },
      submitForm() {
        this.$refs['Form'].validate((valid) => {
          if (valid) {
            let data = {...this.form};
            data.beginTime = formatDateTime(data.time[0]);
            data.endTime = formatDateTime(data.time[1]);
            delete data.time;
            this.$refs.SubmitButton.start();
            addProjectApi(data).then(() => {
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
        this.visible = false;
        Object.assign(this.$data.form, this.$options.data().form);
        this.$refs['Form'].resetFields();
        this.$refs['ImageUploader'].clearFiles();
      }
    }
  }
</script>
