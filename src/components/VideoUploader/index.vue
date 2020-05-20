<template>
  <div class="video-uploader-plus">
    <el-upload
            v-loading="isLoading"
            ref="VideoUploader"
            class="video-uploader"
            action="video-upload"
            :accept="accept"
            :http-request="uploadFile"
            :show-file-list="false">
      <i v-show="isLoading"
         class="el-icon-close close-uploader-icon"
         @click.stop="cancelUpload"
      ></i>
      <video v-if="url" :src="url" class="custom-video"></video>
      <i v-else :class="['el-icon-plus', 'video-uploader-icon', isLoading ? 'hidden' : 'visible']"></i>
    </el-upload>
    <el-progress
            v-show="isLoading"
            :percentage="percentage"
            :color="customColor"
    ></el-progress>
  </div>
</template>

<script>
  import {uploadVideoPlusApi} from "@/api/file";
  import axios from "axios";

  export default {
    name: "VideoUploader",
    props: {
      videoUrl: {
        type: String,
        default: "",
        source: null
      }
    },
    data() {
      return {
        isLoading: false,
        url: "",
        percentage: 0,
        accept: ".avi, .mp4, .flv, .wmv, .mkv",
        customColor: [
          {color: "#909399", percentage: 40},
          {color: "#1989fa", percentage: 80},
          {color: "#67c23a", percentage: 100}
        ]
      };
    },
    watch: {
      videoUrl(value) {
        this.url = value;
      }
    },
    mounted() {
      this.reset();
    },
    methods: {
      /* 自定义上传 */
      uploadFile(param) {
        const {file} = param;
        const type = file.name
          .substring(file.name.lastIndexOf(".") + 1)
          .toLowerCase();
        const size = file.size / 1024 / 1024;
        if (!this.accept.includes(type)) {
          let accept = this.accept.replace(/[.]|[,]/g, "");
          this.$errorMsg(`上传视屏只能是 ${accept} 格式!`);
          return;
        }
        if (size > 40) {
          this.$errorMsg("上传视屏大小不能超过 40MB!");
          return;
        }
        this.isLoading = true;
        let data = {};
        data.file = file;
        data.typePath = 'article';
        uploadVideoPlusApi(data, this.update, this.source)
          .then(result => {
            this.reset();
            this.$emit("getVideo", result.resultParam.uploadFilePath);
            this.url = URL.createObjectURL(file);
          })
          .catch(error => {
            this.reset();
            if (
              axios.isCancel(error) &&
              error.message === "Request Interruption"
            ) {
              this.$infoMsg("已取消上传");
            }
          });
      },
      // 重置
      reset() {
        this.isLoading = false;
        this.percentage = 0;
        let CancelToken = axios.CancelToken;
        this.source = CancelToken.source();
      },
      // 中断上传
      cancelUpload() {
        this.source.cancel("Request Interruption");
      },
      // 清理文件
      clearFiles() {
        this.url = "";
        this.percentage = 0;
        if (this.isLoading) this.cancelUpload();
        this.$refs.VideoUploader.clearFiles();
      },
      // 滚动条更新
      update(value) {
        this.percentage = value;
      }
    }
  };
</script>

<style lang="scss">
  .video-uploader-plus {
    .video-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .video-uploader .el-upload:hover {
      border-color: #409eff;
    }

    .close-uploader-icon {
      position: absolute;
      z-index: 2500;
    }

    .close-uploader-icon,
    .video-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }

    .visible {
      visibility: visible;
    }

    .hidden {
      visibility: hidden;
    }

    .custom-video {
      width: 178px;
      height: 178px;
      display: block;
    }

    .video-uploader {
      .el-loading-mask {
        width: 168px;
        height: 168px;
        margin: 5px;
      }
    }
  }
</style>
