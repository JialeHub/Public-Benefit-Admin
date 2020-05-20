<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <submit-button class="submitBtn float-right " ref="SubmitButton" @submit="submitForm"/>
      <el-page-header @back="cancel" content="添加活动" style="height: 32px;line-height: 32px;"></el-page-header>
    </div>
    <el-form :model="form" class="addActivity" :rules="rules" ref="Form" label-width="7rem" hide-required-asterisk>
      <el-row>
        <el-col :span="20">
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="发布组织" prop="deptId">
            <el-input v-model="form.deptId"></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="realName">
            <el-input v-model="form.realName"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-row style="display: flex">
            <el-form-item label="活动地址" prop="selectedOptions" style="flex: 0 1 300px;margin-right: 20px;">
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
          <el-form-item label="已报人数" prop="count">
            <el-input-number v-model="form.count" :min="0" label="已报人数"></el-input-number>
          </el-form-item>
          <el-form-item label="服务时长" prop="time">
            <el-input-number v-model="form.time" :min="0" label="服务时长"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="封面图片" prop="picture">
            <activity-picture-uploader-plus @getImage="getImage" ref="pictureUploader"></activity-picture-uploader-plus>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="活动简介" prop="content">
<!--            <custom-editor :editor-key="0" ref="Editor"></custom-editor>-->
            <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 20}"
                placeholder="请输入活动简介"
                v-model="form.content">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row>
        <el-col :span="20">
          <submit-button class="submitBtn float-right " ref="SubmitButton" @submit="submitForm"/>
        </el-col>
      </el-row>-->
    </el-form>
  </el-card>

</template>

<script>
  import ActivityPictureUploaderPlus from '../component/picture_uploader';
  import {validatePhone} from "@/utils/validate";
  import {addActivityApi} from "@/api/activity/activity";
  import {formatDateTime} from "@/utils/common";
  import CustomEditor from '../component/CustomEditor'
  import {CodeToText, regionData} from "element-china-area-data";

  export default {
    name: "AddOngoingActivity",
    components: {ActivityPictureUploaderPlus, CustomEditor},
    props: {},
    data() {
      return {
        visible: false,
        options: regionData,
        selectedOptions: [],
        form: {
          deptId: '',
          count: '',
          time: '',
          selectedOptions: [],
          ActivityTime: [],
          RegisterTime: [],
          name: '',
          beginTime: '',
          endTime: '',
          registerBeginTime: '',
          registerEndTime: '',
          content: '',
          picture: '',
          address: '',
          phone: '',
          realName: ''
        },
        rules: {
          selectedOptions: {required: true, message: '请选择地区', trigger: 'change'},
          count: {required: true, message: '请选择已报人数', trigger: 'blur'},
          time: {required: true, message: '请选择服务时长', trigger: 'blur'},
          deptId: {required: true, message: '请输入发布组织', trigger: 'blur'},
          name: {required: true, message: '请输入活动名称', trigger: 'blur'},
          address: {required: true, message: '请输入具体地址', trigger: 'blur'},
          realName: {required: true, message: '请输入联系人姓名', trigger: 'blur'},
          ActivityTime: {type: 'array', message: '请选择活动时间', required: true, trigger: 'blur'},
          RegisterTime: {type: 'array', message: '请选择报名时间', required: true, trigger: 'blur'},
          price: {required: true, message: '请输入价格', trigger: 'blur'},
          phone: {validator: validatePhone, trigger: 'blur'},
          picture: {required: true, message: '请选择活动图片', trigger: 'blur'},
          content: {required: true, message: '请输入活动简介', trigger: 'blur'}
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
            // data.content = this.$refs.Editor.getContent();
            this.$refs.SubmitButton.start();
            if (data.selectedOptions.length > 0) data.province = CodeToText[data.selectedOptions[0]];
            if (data.selectedOptions.length > 1) data.city = CodeToText[data.selectedOptions[1]];
            if (data.selectedOptions.length > 2) data.area = CodeToText[data.selectedOptions[2]];
            delete data.selectedOptions;
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
        this.form.picture = value;
        this.$refs.Form.validateField('picture');
      },
      cancel() {
        this.$parent.addFlag = false;
        Object.assign(this.$data.form, this.$options.data().form);
        this.$refs['pictureUploader'].url = '';
        this.$refs['Form'].resetFields();
        // this.$refs.Editor.setContent();
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
