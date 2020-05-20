<template>
  <div :class="[isNight ? 'admin-menu-night' : 'admin-menu-light']"
       :id="isVertical ? 'admin-vertical-menu' : 'admin-horizontal-menu'"
       v-show="!isSmall || !isVertical">
    <scroll-pane :has-x="!isVertical" :has-y="isVertical">
      <el-menu
              :default-active="active"
              :class="isVertical ? 'el-menu-vertical-demo' : 'el-menu-demo'"
              :collapse="isVertical ? isCollapse : null"
              :unique-opened="isUniqueOpened"
              :mode="isVertical ? 'vertical' : 'horizontal'"
              :text-color="isNight ? '#bfcbd9' : '#444444'"
              :background-color="isNight ? style.menuNightBg : style.menuLightBg"
              active-text-color="#409eff">
        <logo :isCollapse="isCollapse"></logo>
        <nav-menu :navMenus=navMenus></nav-menu>
      </el-menu>
    </scroll-pane>
  </div>
</template>

<script>
  import ScrollPane from "../ScrollPane";
  import Logo from "./Logo";
  import NavMenu from "./NavMenu";
  import Style from "../scss/index.scss"

  export default {
    name: 'AdminMenu',
    components: {ScrollPane, NavMenu, Logo},
    props: {
      isSmall: {
        type: Boolean,
        default: false
      },
      isCollapse: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      //获取菜单
      navMenus() {
        return this.$storeGet.menu
      },
      //获取当前激活菜单
      active() {
        return this.$storeGet.active
      },
      isShowLogo() {
        return this.$storeGet.setting.isShowLogo
      },
      isVertical() {
        return this.$storeGet.setting.isVertical
      },
      isUniqueOpened() {
        return this.$storeGet.setting.isUniqueOpened
      },
      isNight() {
        return this.$storeGet.setting.isNight
      },
      style() {
        return Style
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/index';

  .admin-menu-night,
  .admin-menu-light {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* 夜间模式 */
  .admin-menu-night,
  .admin-menu-night .el-menu--horizontal {
    background-color: $night-menu-bg-color;
  }

  /* 白昼模式 */
  .admin-menu-light {
    background-color: $light-menu-bg-color;
  }

  /* 水平菜单 */
  #admin-horizontal-menu {
    .__vuescroll {
      height: $horizontal-menu-height !important;
    }

    .el-menu--horizontal {
      display: flex;
      height: $horizontal-menu-height;
    }

    .el-menu--horizontal > .navMenu-horizontal {
      display: flex;
    }
  }

  /* 垂直菜单 */
  #admin-vertical-menu {
    .el-menu {
      border: 0;
    }

    .el-menu--collapse {
      width: $menu-collapse-width;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: $menu-width;
    }
  }
</style>
