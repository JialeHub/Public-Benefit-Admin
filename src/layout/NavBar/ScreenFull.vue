<template>
  <div id="screen-full">
    <i class="el-icon-full-screen" @click="click"></i>
  </div>
</template>

<script>
  import screenfull from 'screenfull'

  export default {
    name: 'ScreenFull',
    data() {
      return {
        isFullscreen: false
      }
    },
    mounted() {
      this.init()
    },
    beforeDestroy() {
      this.destroy()
    },
    methods: {
      click() {
        if (!screenfull.isEnabled) {
          this.$warnMsg('您的浏览器不支持该功能！');
          return false
        }
        screenfull.toggle()
      },
      change() {
        this.isFullscreen = screenfull.isFullscreen
      },
      init() {
        if (screenfull.isEnabled) {
          screenfull.on('change', this.change)
        }
      },
      destroy() {
        if (screenfull.isEnabled) {
          screenfull.off('change', this.change)
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../scss/index';

  #screen-full {
    line-height: $header-height;
    font-size: 22px;

    i {
      color: #909399;
      cursor: pointer;
    }

    i:hover {
      color: rgb(80, 80, 80);
    }
  }
</style>
