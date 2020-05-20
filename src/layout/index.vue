<template>
  <div id="index">
    <el-container>
      <!-- 菜单 -->
      <admin-menu v-if="isVertical" :isCollapse="isCollapse" :isSmall="isSmall"></admin-menu>
      <el-drawer
              v-if="isVertical"
              :class="[isNight ? 'night-drawer-menu' : 'light-drawer-menu']"
              :destroy-on-close="true"
              :visible.sync="isShowDrawerMenu"
              direction="ltr"
              :with-header="false">
        <admin-menu/>
      </el-drawer>
      <el-container>
        <!-- 菜单 -->
        <admin-menu v-if="!isVertical" :isCollapse="isCollapse" :isSmall="isSmall"></admin-menu>
        <!-- 头部 -->
        <el-header class="header">
          <!-- 上 -->
          <div class="header-up">
            <!-- 上左 -->
            <breadcrumb :isCollapse="isCollapse" @showDrawerMenu="showDrawerMenu"></breadcrumb>
            <!-- 上右侧 -->
            <nav-bar/>
          </div>
          <!-- 下 -->
          <div class="header-down" v-show="isShowTag">
            <tag/>
          </div>
        </el-header>
        <!-- 内容 -->
        <el-main class="main">
          <scroll-pane ref="ScrollPane" :isUseGoBackTop="true">
            <transition name="Ryan-animation">
              <keep-alive :include="cache">
                <router-view :key="key"/>
              </keep-alive>
            </transition>
          </scroll-pane>
        </el-main>
        <el-footer class="footer" v-show="isShowFooter">
          <div class="footer-text">
            <span>{{footerTxt}} - {{caseNumber}}</span>
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import ScrollPane from './ScrollPane'
  import AdminMenu from './AdminMenu'
  import Breadcrumb from './Breadcrumb'
  import NavBar from './NavBar'
  import Tag from './Tag'
  import {footerTxt, caseNumber} from '@/settings'

  export default {
    name: 'Layout',
    components: {ScrollPane, NavBar, AdminMenu, Breadcrumb, Tag},
    data() {
      return {
        isCollapse: false,
        isSmall: false,
        isShowDrawerMenu: false,
        cacheViews: 'home'
      }
    },
    computed: {
      key() {
        return this.$route.name
      },
      cache() {
        return this.$storeGet.cache
      },
      isShowTag() {
        return this.$storeGet.setting.isShowTag
      },
      isShowFooter() {
        return this.$storeGet.setting.isShowFooter
      },
      isVertical() {
        return this.$storeGet.setting.isVertical
      },
      isNight() {
        return this.$storeGet.setting.isNight
      },
      footerTxt() {
        return footerTxt
      },
      caseNumber() {
        return caseNumber
      }
    },
    mounted() {
      this.initialListener();
      this.getWindowWidth();
    },
    methods: {
      // 事件监听
      initialListener() {
        window.addEventListener('resize', () => {
          this.getWindowWidth()
        })
      },
      // 获取屏幕宽度
      getWindowWidth() {
        if (window.innerWidth < 1100) {
          this.isSmall = true;
          this.isCollapse = true
        } else {
          this.isSmall = false;
          this.isShowDrawerMenu = false
        }
      },
      // 显示抽屉菜单
      showDrawerMenu() {
        if (this.isSmall) {
          this.isShowDrawerMenu = !this.isShowDrawerMenu
        } else {
          this.isCollapse = !this.isCollapse
        }
      }
    }
  };
</script>

<style lang="scss">
  @import './scss/index';

  #index {
    width: 100%;
    height: 100%;

    .night-drawer-menu {
      .el-drawer {
        width: $menu-width !important;
        background-color: $night-menu-bg-color
      }
    }

    .light-drawer-menu {
      .el-drawer {
        width: $menu-width !important;
        background-color: $light-menu-bg-color
      }
    }

    .header {
      height: auto !important;
      padding: 0;

      .header-up {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        border-bottom: 1px solid rgb(233, 235, 239);
      }

      .header-bottom {
        height: 37px;
      }
    }

    .main {
      padding: 0;
      background-color: $main-bg-color;
      overflow: hidden;

      .__view {
        padding: 15px;

        .Ryan-animation-enter-active {
          transition: all .5s .6s;
        }

        .Ryan-animation-leave-active {
          transition: all .5s;
        }

        .Ryan-animation-enter {
          transform: translateX(-30px);
          opacity: 0;
        }

        .Ryan-animation-leave-to {
          transform: translateX(30px);
          opacity: 0;
        }
      }
    }


    .footer {
      padding: 0;
      height: $footer-height !important;
      overflow-y: hidden;
      overflow-x: auto;
      background-color: $footer-bg-color;

      .footer-text {
        position: relative;
        line-height: 30px;
        border-top: 1px solid #dcdfe6;
        color: #666;
        white-space: nowrap;
        text-indent: 1.3rem;
        letter-spacing: 1px;
        font-size: 0.7rem;
      }
    }
  }
</style>
