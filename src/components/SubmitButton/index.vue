<template>
  <el-button
          :loading="isLoading"
          type="primary"
          :icon="icon"
          :disabled="isDisabled"
          @click="confirm">{{text}}
  </el-button>
</template>

<script>
  export default {
    name: "SubmitButton",
    props: {
      text: {
        type: String,
        default: '确 定'
      },
      icon: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isLoading: false,
        isDisabled: false,
      }
    },
    methods: {
      ban() {
        this.isDisabled = true
      },
      cancelBan() {
        this.isDisabled = false
      },
      confirm() {
        this.$emit('submit');
      },
      start() {
        this.isLoading = true;
      },
      stop() {
        this.isLoading = false
      }
    }
  }
</script>

<style scoped>

</style>
