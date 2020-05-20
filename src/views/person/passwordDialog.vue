<template>
  <el-dialog
          title="修改密码"
          width="450px"
          :visible.sync="visible"
          @close="cancel"
          :close-on-click-modal="false">
    <el-form :model="form" :rules="rules" ref="Form" label-width="120px">
      <el-form-item label="旧密码:" prop="oldPass">
        <el-input type="password" v-model="form.oldPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="newPass">
        <el-input type="password" v-model="form.newPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop="checkPass">
        <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <submit-button ref="SubmitButton" @submit="submitForm"/>
    </div>
  </el-dialog>
</template>

<script>
  import {updatePassApi} from '../../api/person'
  import {encrypt} from "@/utils/encrypt";

  export default {
    name: "PasswordDialog",
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'))
        } else if (value !== this.form.newPass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      };
      return {
        visible: false,
        form: {
          oldPass: '',
          newPass: '',
          checkPass: ''
        },
        rules: {
          oldPass: {required: true, message: '请输入旧密码', trigger: 'blur'},
          newPass: {required: true, message: '请输入新密码', trigger: 'blur'},
          checkPass: {required: true, validator: validatePass, trigger: 'blur'}
        }
      }
    },
    methods: {
      submitForm() {
        this.$refs["Form"].validate((valid) => {
          if (valid) {
            let data = {};
            data.oldPass = encrypt(this.form.oldPass);
            data.newPass = encrypt(this.form.newPass);
            this.$refs.SubmitButton.start();
            updatePassApi(data).then(() => {
              this.$refs.SubmitButton.stop();
              this.$storeSet('quitLogin')
            }).catch(() => {
              this.$refs.SubmitButton.stop();
            })
          } else {
            return false;
          }
        })
      },
      cancel() {
        this.visible = false;
        Object.assign(this.$data.form, this.$options.data().form);
        this.$refs['Form'].resetFields()
      }
    }
  }
</script>

<style scoped>

</style>
