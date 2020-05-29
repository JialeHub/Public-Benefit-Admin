<template>
  <div class="person">
    <el-card class="box-card" style="width: 60%;margin: 0 auto">
      <div slot="header" class="clearfix">
<!--        <el-button class="float-right" type="text" style="font-size: 14px;">编辑</el-button>-->
        <span style="line-height: 32px;">个人信息</span>
      </div>
      <div style="text-align: center; margin-bottom: 20px">
        <avatar-uploader :avatarUrl="$addBaseURL(user.avatar)"></avatar-uploader>
      </div>
      <ul class="personInfo">
        <li>
          <span>用户名称</span>
          <span>{{user.username}}</span>
        </li>
        <li>
          <span>昵称</span>
          <span>{{user.nickName}}</span>
        </li>
        <li>
          <span>政治面貌</span>
          <span>{{user.politicsStatus}}</span>
        </li>
        <li>
          <span>性别</span>
          <span>{{user.sex}}</span>
        </li>
        <li>
          <span>手机号码</span>
          <span>{{user.phone}}</span>
        </li>
        <li>
          <span>用户邮箱</span>
          <span>{{user.email}}</span>
        </li>
        <li>
          <span>地址</span>
          <span>{{user.province+user.city+user.area+user.address}}</span>
        </li><!--
        <li>
          <span>所属组织</span>
          <span>{{user.dept.name}}</span>
        </li>-->
        <li>
          <span>创建日期</span>
          <span>{{user.createTime | formatDate}}</span>
        </li>
        <li>
          <span>安全设置</span>
          <span>
                <a style="color: #317ef3; cursor: pointer" @click="changePassword">修改密码</a>
              </span>
        </li>
      </ul>
    </el-card>
    <password-dialog ref="PasswordDialog"></password-dialog>
<!--    <edit-list ref="EditUser" :dept="dept" @update="getUpdate"></edit-list>-->
  </div>
</template>

<script>
  import PasswordDialog from './passwordDialog'
  import PersonalLog from './log'
  import AvatarUploader from '@/components/AvatarUploader'
  import EditUser from "@/views/system/user/edit";

  export default {
    components: {PasswordDialog, PersonalLog, AvatarUploader, EditUser},
    name: 'person',
    computed: {
      user() {
        return this.$storeGet.user
      },
    },
    methods: {
      // 修改密码
      // getUpdate(){
      //
      // },
      changePassword() {
        const _this = this.$refs.PasswordDialog;
        _this.visible = true
      }
    }
  }
</script>

<style lang="scss">
  .person {
    .personInfo li {
      border-bottom: 1px solid #f0f3f4;
      border-top: 1px solid #f0f3f4;
      padding: 11px 0;
      font-size: 13px;
      display: flex;
      justify-content: space-between;
    }

    .el-avatar > img {
      width: 100%;
    }
  }
</style>
