<template>
  <div :class="[isNight ? 'navMenu-night' : 'navMenu-light', isVertical ? '' : 'navMenu-horizontal']">

    <template v-for="navMenu in navMenus">
      <el-submenu
              v-if="hasChildren(navMenu.children)"
              v-show="!navMenu.hidden"
              :key="navMenu.id"
              :index="navMenu.title"
              class="submenu-title">
        <template slot="title">
          <item :title="navMenu.title" :icon="navMenu.icon"></item>
        </template>
        <nav-menu :navMenus="navMenu.children"></nav-menu>
      </el-submenu>

      <el-menu-item
              v-else
              v-show="!navMenu.hidden"
              :key="navMenu.id"
              :index="navMenu.title"
              @click="jump($event, navMenu)"
              class="menu-item">
        <item :title="navMenu.title" :icon="navMenu.icon"></item>
      </el-menu-item>
    </template>

  </div>
</template>

<script>
  import Item from './Item'
  import {isEmpty} from "@/utils/common";

  export default {
    name: "NavMenu",
    props: ["navMenus"],
    computed: {
      isNight() {
        return this.$storeGet.setting.isNight
      },
      isVertical() {
        return this.$storeGet.setting.isVertical
      },
    },
    components: {Item},
    methods: {
      jump(e, navMenu) {
        let name = navMenu.name;
        if (navMenu.iframe) {
          window.open(name);
          return
        }
        if (this.$route.name !== name) {
          // 改变面包屑
          this.$storeSet('setBreadcrumb', e.indexPath);
          // 添加tags
          this.$storeSet('addTags', {title: e.index, name: name, cache: navMenu.cache, indexPath: e.indexPath});
          // 改变当前激活菜单
          this.$storeSet('setActive', e.index);
          // 跳转
          this.$router.push({name: name});
        }
      },
      hasChildren(value) {
        if (isEmpty(value)) return false;
        return value.some(item => {
          return !item.hidden
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../scss/index';

  .navMenu-horizontal {
    .menu-item,
    .submenu-title > .el-submenu__title {
      height: $horizontal-menu-height;
      line-height: $horizontal-menu-height;
      border: 0;
    }

    .el-submenu__icon-arrow {
      display: none;
    }
  }

  /* 水平菜单箭头隐藏 */
  .el-menu--collapse > .navMenu-light > .submenu-title > .el-submenu__title > i,
  .el-menu--collapse > .navMenu-light > .submenu-title > .el-submenu__title > span,
  .el-menu--collapse > .navMenu-night > .submenu-title > .el-submenu__title > i,
  .el-menu--collapse > .navMenu-night > .submenu-title > .el-submenu__title > span {
    display: none;
  }

  /* 弹出菜单 */
  .el-menu--popup {
    padding: 0;
  }

  /* 白昼模式 */
  .navMenu-light {
    .submenu-title > .el-submenu__title,
    .menu-item,
    .menu-item:focus {
      background-color: $light-menu-bg-color;
    }

    .el-submenu__title:hover,
    .menu-item:hover {
      background-color: $light-menu-title-bg-hover-color;
    }

    .submenu-title.is-active .el-submenu__title {
      color: #1e1e1e !important;
    }

    .submenu-title > .el-menu--inline .el-menu-item {
      background-color: $light-menu-item-bg-color !important;
    }

    .submenu-title.is-opened > .el-menu--inline .el-menu-item {
      &:hover {
        background-color: $light-menu-item-bg-hover-color !important;
      }
    }
  }

  /* 夜间模式 */
  .navMenu-night {
    .submenu-title > .el-submenu__title,
    .menu-item,
    .menu-item:focus {
      background-color: $night-menu-bg-color !important;
    }

    .el-submenu__title:hover,
    .menu-item:hover {
      background-color: $night-menu-title-bg-hover-color !important;
    }

    .submenu-title.is-active .el-submenu__title {
      color: #f4f4f5 !important;
    }

    .submenu-title > .el-menu--inline .el-menu-item {
      background-color: $night-menu-item-bg-color !important;
    }

    .submenu-title.is-opened > .el-menu--inline .el-menu-item {
      &:hover {
        background-color: $night-menu-item-bg-hover-color !important;
      }
    }
  }
</style>
