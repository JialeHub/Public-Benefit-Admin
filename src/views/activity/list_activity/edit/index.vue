<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button v-show="activeName==='details'&& !editFlag" class="float-right" type="primary" icon="el-icon-edit"
                 @click="edit">编辑
      </el-button>
      <el-button v-show="activeName==='details'&& editFlag" class="float-right" type="success" icon="el-icon-check"
                 @click="saveEdit" :loading="saveLoading">保存
      </el-button>
      <el-button v-show="activeName==='details'&& editFlag" class="float-right" type="warning" icon="el-icon-close"
                 @click="cancelEdit" :loading="saveLoading">取消
      </el-button>
      <el-page-header @back="back" content="活动详情" style="height: 32px;line-height: 32px;"></el-page-header>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="活动详情" name="details">
        <el-form :model="form" class="addActivity" :rules="rules" ref="Form"
                 label-width="7rem" hide-required-asterisk>
          <div class="loadingShow" v-loading="isTableLoading2">
            <el-row>
              <el-col :span="12">
                <el-form-item label="活动名称" prop="title">
                  <span v-show="!editFlag">{{this.form.title}}</span>
                  <el-input v-show="editFlag" v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="phone">
                  <span v-show="!editFlag">{{this.form.phone}}</span>
                  <el-input v-show="editFlag" v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="负责人" prop="name">
                  <span v-show="!editFlag">{{this.form.name}}</span>
                  <el-input v-show="editFlag" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="活动地点" prop="address">
                  <span v-show="!editFlag">{{this.form.address}}</span>
                  <el-input v-show="editFlag" v-model="form.address"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否收费" prop="isPrice">
                  <el-switch
                      :disabled="!editFlag"
                      v-model="form.isPrice"
                      active-color="#13ce66">
                  </el-switch>
                </el-form-item>
                <el-form-item label="个人费用" prop="ownPrice" v-show="form.isPrice">
                  <span v-show="!editFlag">{{this.form.ownPrice}}</span>
                  <el-input-number v-show="editFlag" v-model="form.ownPrice" :step="0.01" step-strictly
                                   controls-position="right"></el-input-number>
                </el-form-item>
                <el-form-item label="团体费用" prop="groupPrice" v-show="form.isPrice">
                  <span v-show="!editFlag">{{this.form.groupPrice}}</span>
                  <el-input-number v-show="editFlag" v-model="form.groupPrice" :step="0.01" step-strictly
                                   controls-position="right"></el-input-number>
                </el-form-item>
                <el-form-item label="限报人数" prop="maxNumber">
                  <span v-show="!editFlag">{{this.form.maxNumber}}</span>
                  <el-input-number v-show="editFlag" v-model="form.maxNumber"
                                   controls-position="right"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="活动时间" prop="beginTime">
                  <span v-show="!editFlag">{{this.form.beginTime | formatDateTime}} 至 </span>
                  <span v-show="!editFlag">{{this.form.endTime | formatDateTime}}</span>
                  <el-date-picker
                      v-show="editFlag"
                      v-model="ActivityTime"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="报名时间" prop="registerBeginTime">
                  <span v-show="!editFlag">{{this.form.registerBeginTime | formatDateTime}} 至 </span>
                  <span v-show="!editFlag">{{this.form.registerEndTime | formatDateTime}}</span>
                  <el-date-picker
                      v-show="editFlag"
                      v-model="RegisterTime"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="封面图片" prop="picture">
                  <img v-show="!editFlag" :src="form.picture===''?'':baseUrl+form.picture" alt="">
                  <activity-picture-uploader-plus
                      v-show="editFlag" @getImage="getImage"
                      :imageUrl="form.picture===''?'':baseUrl+form.picture"
                      ref="pictureUploader"></activity-picture-uploader-plus>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-row v-loading="isTableLoading2">
            <el-col :span="24">
              <el-form-item label="活动简介" prop="content">
                <div v-show="!editFlag" class="watch" v-html="form.content"></div>
                <custom-editor v-show="editFlag" :editor-key="2" ref="Editor"></custom-editor>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <!--<submit-button class="submitBtn float-right " ref="SubmitButton" @submit="submitForm"/>-->
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="参与者" name="participant">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-input placeholder="输入姓名搜索" v-model="searchActivityName" clearable class="w-200"
                      @keyup.enter.native="getActivityApplyList"/>
            <el-button type="success" class="el-icon-search ml-5" @click="getActivityApplyList">搜索</el-button>
            <el-button class="float-right" type="danger" icon="el-icon-delete" @click="delMoreApplyCheck">批量删除
            </el-button>
            <el-button class="float-right" type="warning" icon="el-icon-download" @click="download">导出</el-button>
          </div>
          <div class="">
            <el-table
                v-loading="isTableLoading"
                :data="formData"
                @selection-change="getSelected"
            >
              <el-table-column
                  type="selection"
                  width="55">
              </el-table-column>
              <el-table-column align="center" header-align="center" prop="name" label="姓名" sortable></el-table-column>
              <el-table-column align="center" header-align="center" prop="phone" label="联系方式" sortable></el-table-column>
              <el-table-column align="center" header-align="center" prop="way" label="类型">
                <template slot-scope="scope">
                  {{scope.row.way === 0 ? '个人' : '团体'}}
                </template>
              </el-table-column>
              <el-table-column align="center" header-align="center" prop="number" label="参与人数" sortable></el-table-column>
              <el-table-column align="center" header-align="center" prop="unit" label="公司/单位"></el-table-column>
              <el-table-column align="center" header-align="center" prop="state" label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.state===0" style="color: red">已拒绝</span>
                  <span v-if="scope.row.state===1">待审核</span>
                  <span v-if="scope.row.state===2" style="color: green">已通过</span>
                </template>
              </el-table-column>
              <el-table-column align="center" header-align="center" label="操作" fixed="right" width="200">
                <template slot-scope="scope">
                  <el-button type="success" icon="el-icon-check" :disabled="scope.row.state===2"
                             @click="activityApplyCheck(scope.row,2)">
                    <span v-if="scope.row.state===2">已</span>
                    通过
                  </el-button>
                  <el-button type="danger" icon="el-icon-close" :disabled="scope.row.state===0"
                             @click="activityApplyCheck(scope.row,0)">
                    <span v-if="scope.row.state===0">已</span>
                    拒绝
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <pagination ref="Pagination" @getNewData="getActivityApplyList"></pagination>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </el-card>

</template>

<script>
  import ActivityPictureUploaderPlus from '../component/picture_uploader';
  import CustomEditor from '../component/CustomEditor'
  import {validatePhone} from "@/utils/validate";
  import {
    activityApplyCheckApi,
    delApplyCheckApi,
    downloadActivityApplyApi, editActivityApi,
    getActivityApi,
    pageActivityApplyApi
  } from "@/api/activity/activity";
  import {formatDateTime, isEmpty} from "@/utils/common";

  export default {
    name: "EditOngoingActivity",
    components: {CustomEditor, ActivityPictureUploaderPlus},
    props: {},
    data() {
      return {
        visible: false,
        baseUrl: process.env.VUE_APP_BASE_API,
        activeName: 'details',
        isTableLoading: false,
        isTableLoading2: false,
        formData: [],
        searchActivityName: '',
        isDeleteMoreDisabled: true,
        deleteList: [],
        editFlag: false,
        ActivityTime: [],
        RegisterTime: [],
        saveLoading: false,
        form: {
          title: '',
          maxNumber: '',
          beginTime: '',
          endTime: '',
          registerBeginTime: '',
          registerEndTime: '',
          content: '',
          picture: '',
          isPrice: false,
          address: '',
          phone: '',
          ownPrice: 0,
          groupPrice: 0,
          name: '',
          id: null,
        },
        rules: {
          title: {required: true, message: '请输入名称', trigger: 'blur'},
          address: {required: true, message: '请输入地址', trigger: 'blur'},
          name: {required: true, message: '请输入负责人姓名', trigger: 'blur'},
          beginTime: {message: '请选择活动时间', required: true, trigger: 'change'},
          registerBeginTime: {message: '请选择报名时间', required: true, trigger: 'change'},
          price: {required: true, message: '请输入价格', trigger: 'blur'},
          phone: {validator: validatePhone, trigger: 'blur'},
          picture: {required: true, message: '请选择封面图片', trigger: 'blur'}
        }
      }
    },
    mounted() {
      //this.$refs.Editor.setContent(this.form.content);
      //this.getActivity();
    },
    methods: {
      edit() {
        this.editFlag = true;
      },
      saveEdit() {
        this.$refs['Form'].validate((valid) => {
          if (valid) {
            this.$msgBox("确定更改该活动信息吗？")
              .then(response => {
                this.saveLoading = true;
                let data = {...this.form};
                data.content = this.$refs.Editor.getContent();
                editActivityApi(data).then(response => {
                  this.saveLoading = false;
                  this.getActivity();
                  this.editFlag = false;
                }).catch(error => {
                  this.saveLoading = false;
                });
              }).catch(error => {
            })
          } else {
            return false;
          }
        })
      },
      cancelEdit() {
        this.$msgBox("是否放弃更改改活动信息？")
          .then(response => {
            this.editFlag = false;
            this.getActivity()
          }).catch(error => {
        })
      },
      getImage(value) {
        this.form.picture = value;
        this.$refs.Form.validateField('picture');
      },
      getActivity() {
        this.isTableLoading2 = true;
        getActivityApi(this.$route.query.id)
          .then(response => {
            this.isTableLoading2 = false;
            this.form = {...response.resultParam.activity};
            this.$refs.Editor.setContent(this.form.content);
            this.ActivityTime = [new Date(formatDateTime(this.form.beginTime)), new Date(formatDateTime(this.form.endTime))];
            this.RegisterTime = [new Date(formatDateTime(this.form.registerBeginTime)), new Date(formatDateTime(this.form.registerEndTime))];
            if (!isEmpty(this.form.picture)) {
              let temp = (this.form.picture.split(","));
              for (let i = 0; i < temp.length; i++) {
                temp[i] = process.env.VUE_APP_BASE_API + '/' + temp[i]
              }
              this.form.picture2 = temp;
            } else {
              this.form.picture2 = []
            }
          }).catch(error => {
          this.isTableLoading2 = false;
        })
      },
      download() {
        downloadActivityApplyApi(this.$route.query.id).then(result => {
          let blob = new Blob([result]);
          let downloadElement = document.createElement('a');
          let href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = '报名信息.xls'; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        }).catch(error => {
        })
      },
      getActivityApplyList() {
        this.isTableLoading = true;
        let pagination = this.$refs.Pagination;
        let param = `current=${pagination.current}&size=${pagination.size}&name=${this.searchActivityName}&activityId=${this.$route.query.id}`;
        pageActivityApplyApi(param).then(result => {
          this.isTableLoading = false;
          let response = result.resultParam.activityApplyPage;
          this.formData = response.records;
          pagination.total = response.total;
        })
      },
      getSelected(array) {
        this.deleteList = array.map(item => item.id);
        this.isDeleteMoreDisabled = array.length === 0;
      },
      delApplyCheck(id) {
        delApplyCheckApi({ids: id})
          .then(() => {
            this.getActivityApplyList();
            this.$refs[id].close()
          })
          .catch(() => {
            this.$refs[id].stop();
          })
      },
      delMoreApplyCheck() {
        this.$msgBox('确定批量删除操作吗？').then(() => {
          delApplyCheckApi({ids: [this.deleteList]}).then(() => {
            this.getActivityApplyList();
          })
        })
      },
      activityApplyCheck(row, v) {
        let data = {
          activityId: row.activityId,
          ids: row.id,
          state: v
        };
        activityApplyCheckApi(data).then(response => {
          if (response.status === 200) {
            this.getActivityApplyList();
          }
        }).catch(error => {
        })
      },
      back() {
        if (this.editFlag) {
          this.$msgBox("是否放弃更改改活动信息？")
            .then(response => {
              this.backGo()
            }).catch(error => {
          })
        } else {
          this.backGo()
        }
      },
      backGo() {
        this.editFlag = false;
        this.$parent.getActivityList();
        this.$parent.editFlag = false;
        this.$router.push({name: 'ongoing_activity'});
        Object.assign(this.$data.form, this.$options.data().form);
        this.$refs['pictureUploader'].url = '';
        this.$refs['Form'].resetFields();
        this.$refs.Editor.setContent();
      },
      handleClick(tab, event) {
        if (tab.name === "details" && !this.editFlag) {
          this.getActivity()
        } else if (tab.name === "participant") {
          this.getActivityApplyList()
        }
      }
    },
    watch: {
      ActivityTime(v) {
        if (v && v.length === 2) {
          this.form.beginTime = formatDateTime(v[0]);
          this.form.endTime = formatDateTime(v[1]);
        } else {
          this.form.beginTime = this.form.endTime = '';
        }
      },
      RegisterTime(v) {
        if (v && v.length === 2) {
          this.form.registerBeginTime = formatDateTime(v[0]);
          this.form.registerEndTime = formatDateTime(v[1]);
        } else {
          this.form.registerBeginTime = this.form.registerEndTime = '';
        }
      },
      'form.isPrice'(v) {
        if (!v) this.form.ownPrice = this.form.groupPrice = 0;
      },
      immediate: true,
      deep: true
    },
  }
</script>

<style lang="scss">
  .addActivity {
    padding: 20px 0;

    .el-range-editor--small.el-input__inner {
      width: 100%;
    }

    .watch {
      border: 1px solid rgba(200, 200, 200, 0.8);
      border-radius: 5px;
      padding: 5px;

      img {
        max-width: 100%;
        height: auto;
      }
    }

    .el-range-editor--small.el-input__inner {
      width: 100%;
    }

    .submitBtn {
      margin-right: 40px;
    }
  }
</style>
