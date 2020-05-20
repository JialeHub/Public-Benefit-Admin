<template>
  <div id="breadcrumb">
    <div class="menu-button" v-show="isVertical">
      <i :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']" @click="showDrawerMenu"></i>
    </div>
    <div class="clear-button" v-show="isShowTag">
      <i class="el-icon-circle-close" @click="removeAllTags"></i>
    </div>
    <el-breadcrumb separator="/" v-show="isShowBreadcrumb">
      <transition-group name="bread-list">
        <el-breadcrumb-item key="首页">
          <router-link :to="{name: 'home'}">
            <span @click="jumpToHome">首页</span>
          </router-link>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in breadcrumb" :key="item">{{item}}</el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: 'Breadcrumb',
    props: {isCollapse: Boolean},
    computed: {
      // 面包屑
      breadcrumb: function () {
        return this.$storeGet.breadcrumb;
      },
      // 标签
      isShowTag() {
        return this.$storeGet.setting.isShowTag
      },
      isVertical() {
        return this.$storeGet.setting.isVertical
      },
      isShowBreadcrumb() {
        return this.$storeGet.setting.isShowBreadcrumb
      }
    },
    methods: {
      // 跳转到首页
      jumpToHome() {
        // 面包屑
        this.$storeSet("setBreadcrumb");
        // 激活菜单
        this.$storeSet("setActive");
      },
      // 清除所有标签
      removeAllTags() {
        // 标签
        this.$storeSet('setTags');
        this.jumpToHome();
        this.$router.push({name: 'home'})
      },
      // 打开抽屉菜单
      showDrawerMenu() {
        this.$emit('showDrawerMenu')
      }
    }
  };
</script>

<style lang="scss">
  @import '../scss/index';

  #breadcrumb {
    display: flex;
    line-height: $header-height;
    color: #909399;
    font-size: 22px;

    .menu-button, .clear-button {
      margin-right: 15px;
    }

    .menu-button > i, .clear-button i {
      cursor: pointer;
    }

    .menu-button > i:hover, .clear-button i:hover {
      color: rgb(80, 80, 80);
    }

    .el-breadcrumb > span {
      display: flex;
      white-space: nowrap;
    }

    .el-breadcrumb__item {
      line-height: $header-height;
    }

    .bread-list-enter-active {
      transition: all 0.5s 0.6s;
    }

    .bread-list-leave-active {
      transition: all 0.5s;
    }

    .bread-list-enter {
      transform: translateX(25px);
      opacity: 0;
    }

    .bread-list-leave-to {
      transform: translateX(-25px);
      opacity: 0;
    }
  }
</style>
