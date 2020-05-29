<template>
  <div id="editUser">
    <el-dialog
        title="编辑用户"
        width="800px"
        @close="cancel"
        :close-on-click-modal="false"
        :visible.sync="visible">
      <el-form :model="form" :rules="rules" ref="Form" label-width="80px" hide-required-asterisk>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名" prop="username" autocomplete="off">
              <a href="" @click.prevent="changeUsernameFlag=true" v-if="!changeUsernameFlag" style="text-decoration: none">点击编辑用户名</a>
              <el-input v-model="form.username" v-if="changeUsernameFlag"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" autocomplete="off" v-if="!changePassFlag">
              <a href="" @click.prevent="changePassFlag=true" style="text-decoration: none">点击编辑密码</a>
            </el-form-item>
            <el-form-item label="密码" prop="password" autocomplete="off" v-if="changePassFlag">
              <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="真实姓名" prop="realName">
              <el-input v-model="form.realName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="form.nickName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="电话" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属组织" prop="deptId">
              <tree-select v-model="form.deptId"
                           :disabled="$storeGet.user.userLevel!==1"
                           :options="dept"
                           :normalizer="normalizer"
                           :default-expand-level="1"
                           sort-value-by="INDEX"
                           placeholder=""/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="政治面貌" prop="politicsStatus">
              <el-input v-model="form.politicsStatus"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="角色">
              <el-select v-model="form.rolesId" placeholder="请选择用户角色">
                <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id" :disabled="item.level<=$storeGet.user.userLevel"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别">
              <el-radio-group v-model="form.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="display: flex">
            <el-form-item label="地址" prop="selectedOptions" style="margin-right: 20px;">
              <el-col>
                <el-cascader
                    size="large"
                    :options="regionData"
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
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <submit-button ref="SubmitButton" @submit="submitForm"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import TreeSelect from '@riophae/vue-treeselect'
  import { editUserApi} from '@/api/user'
  import {validateEmali, validatePhone} from "@/utils/validate";
  import {regionData, CodeToText} from 'element-china-area-data';
  import {getRoleListApi} from "@/api/role";

  export default {
    name: "EditUser",
    components: {TreeSelect},
    props: {
      dept: {
        type: Array,
        default: []
      },
    },
    mounted() {
      this.getRoleList();
    },
    data() {
      return {
        normalizer(node) {
          return {
            label: node.name
          }
        },
        changePassFlag: false,
        changeUsernameFlag: false,
        visible: false,
        regionData: regionData,
        selectedOptions: [],
        roleList: [],
        form: {
          id: '',
          address: '',
          selectedOptions: [],
          politicsStatus: '',
          username: '',
          realName: '',
          nickName: '',
          password: '',
          sex: '男',
          phone: '',
          email: '',
          province: '',
          city: '',
          area: '',
          enabled: true,
          deptId: null,
          jobId: null,
          rolesId: 2
        },
        options: [],
        rules: {
          username: {required: true, message: '请输入内容', trigger: 'blur'},
          realName: {required: true, message: '请输入内容', trigger: 'blur'},
          nickName: {required: true, message: '请输入内容', trigger: 'blur'},
          password: {required: true, message: '请输入内容', trigger: 'blur'},
          politicsStatus: {required: true, message: '请输入内容', trigger: 'blur'},
          deptId: {required: true, message: '请选择组织', trigger: 'change'},
          jobId: {required: true, message: '请选择岗位', trigger: 'change'},
          rolesId: {required: true, message: '请选择角色', trigger: 'change'},
          userRealName: {required: true, message: '请输入内容', trigger: 'blur'},
          phone: {validator: validatePhone, trigger: 'blur'},
          email: {validator: validateEmali, trigger: 'blur'},
          address: {required: true, message: '请输入具体地址', trigger: 'blur'},
          selectedOptions: {required: true, message: '请选择地区', trigger: 'change'},
          createTime: {required: true, message: '请输入内容', trigger: 'blur'},
          picture: {required: true, message: '请上传图片', trigger: 'blur'},
          content: {required: true, message: '请输入内容', trigger: 'blur'},
        }
      }
    },
    methods: {
      changePass(){

      },
      getRoleList(){
        getRoleListApi('').then(result => {
          this.roleList = result.resultParam.roleList;
          if (this.$storeGet.user.userLevel!==1) this.form.deptId=this.$storeGet.user.deptId;
        })
      },
      submitForm() {
        this.$refs['Form'].validate((valid) => {
          if (valid) {
            let data = {...this.form};
            if (data.selectedOptions.length > 0) data.province = CodeToText[data.selectedOptions[0]];
            if (data.selectedOptions.length > 1) data.city = CodeToText[data.selectedOptions[1]];
            if (data.selectedOptions.length > 2) data.area = CodeToText[data.selectedOptions[2]];
            if (!this.changePassFlag) delete data.password;
            if (!this.changeUsernameFlag) delete data.username;
            if (data.email===this.$storeGet.user.email) delete data.email;
            delete data.selectedOptions;
            this.$refs.SubmitButton.start();
            editUserApi(data).then(() => {
              this.$refs.SubmitButton.stop();
              this.visible = false;
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
        this.$emit('update');
        this.visible = false;
        Object.assign(this.$data.form, this.$options.data().form);
        this.$refs['Form'].clearValidate()
      }
    }
  }
</script>

<style lang="scss">
  #editUser {
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
