<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-page-header @back="cancel" content="添加活动" style="height: 32px;line-height: 32px;"></el-page-header>
    </div>
    <el-form :model="form" class="addActivity" :rules="rules" ref="Form" label-width="7rem" hide-required-asterisk>
      <el-row>
        <el-col :span="12">
          <el-form-item label="活动名称" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="负责人" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="活动地点" prop="address">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="活动时间" prop="ActivityTime">
            <el-date-picker
                v-model="form.ActivityTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="报名时间" prop="RegisterTime">
            <el-date-picker
                v-model="form.RegisterTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否收费" prop="isPrice">
            <el-switch
                v-model="form.isPrice"
                active-color="#13ce66">
            </el-switch>
          </el-form-item>
          <el-form-item label="个人费用" prop="ownPrice" v-show="form.isPrice">
            <el-input-number v-model="form.ownPrice" :step="0.01" step-strictly
                             controls-position="right"></el-input-number>
          </el-form-item>
          <el-form-item label="团体费用" prop="groupPrice" v-show="form.isPrice">
            <el-input-number v-model="form.groupPrice" :step="0.01" step-strictly
                             controls-position="right"></el-input-number>
          </el-form-item>
          <el-form-item label="限报人数" prop="maxNumber">
            <el-input-number v-model="form.maxNumber" controls-position="right"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="封面图片" prop="cover">
            <activity-cover-uploader-plus @getImage="getImage" ref="coverUploader"></activity-cover-uploader-plus>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="活动简介" prop="content">
            <custom-editor :editor-key="0" ref="Editor"></custom-editor>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <submit-button class="submitBtn float-right " ref="SubmitButton" @submit="submitForm"/>
        </el-col>
      </el-row>
    </el-form>
  </el-card>

</template>

<script>
  import ActivityCoverUploaderPlus from '../component/cover_uploader';
  import {validatePhone} from "@/utils/validate";
  import {addActivityApi} from "@/api/activity/activity";
  import {formatDateTime} from "@/utils/common";
  import CustomEditor from '../component/CustomEditor'

  export default {
    name: "AddOngoingActivity",
    components: {ActivityCoverUploaderPlus, CustomEditor},
    props: {},
    data() {
      return {
        visible: false,
        form: {
          ActivityTime: [],
          RegisterTime: [],
          title: '',
          beginTime: '',
          maxNumber: '',
          endTime: '',
          registerBeginTime: '',
          registerEndTime: '',
          content: '',
          cover: '',
          isPrice: false,
          address: '',
          phone: '',
          ownPrice: 0,
          groupPrice: 0,
          name: ''
        },
        rules: {
          title: {required: true, message: '请输入名称', trigger: 'blur'},
          address: {required: true, message: '请输入地址', trigger: 'blur'},
          name: {required: true, message: '请输入负责人姓名', trigger: 'blur'},
          ActivityTime: {type: 'array', message: '请选择活动时间', required: true, trigger: 'blur'},
          RegisterTime: {type: 'array', message: '请选择报名时间', required: true, trigger: 'blur'},
          price: {required: true, message: '请输入价格', trigger: 'blur'},
          phone: {validator: validatePhone, trigger: 'blur'},
          cover: {required: true, message: '请选择封面图片', trigger: 'blur'}
        }
      }
    },
    watch: {
      'form.ActivityTime'(v) {
        this.form.beginTime = formatDateTime(v[0]);
        this.form.endTime = formatDateTime(v[1]);
      },
      'form.RegisterTime'(v) {
        this.form.registerBeginTime = formatDateTime(v[0]);
        this.form.registerEndTime = formatDateTime(v[1]);
      },
      'form.isPrice'(v) {
        if (!v) this.form.ownPrice = this.form.groupPrice = 0;
      },
      immediate: true,
      deep: true
    },
    methods: {
      submitForm() {

        this.$refs['Form'].validate((valid) => {
          if (valid) {
            let data = {...this.form};
            data.content = this.$refs.Editor.getContent();
            this.$refs.SubmitButton.start();
            delete data.ActivityTime;
            delete data.RegisterTime;
            addActivityApi(data).then(() => {
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
      getImage(value) {
        this.form.cover = value;
        this.$refs.Form.validateField('cover');
      },
      cancel() {
        this.$parent.addFlag = false;
        Object.assign(this.$data.form, this.$options.data().form);
        this.$refs['coverUploader'].url = '';
        this.$refs['Form'].resetFields();
        this.$refs.Editor.setContent();
      }
    }
  }
</script>

<style lang="scss">
  .addActivity {
    padding: 20px 0;

    .el-range-editor--small.el-input__inner {
      width: 100%;
    }

    .submitBtn {
      margin-right: 40px;
    }
  }
</style>
