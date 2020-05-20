<template>
  <el-upload
      ref="ImageUploaderBatch"
      class="image-uploader"
      action="image-upload"
      list-type="picture-card"
      :limit="limit"
      :accept="accept"
      :file-list="fileList"
      :multiple="true"
      :on-success="uploadSuccess"
      :on-remove="emitImage"
      :on-exceed="exceed"
      :http-request="uploadFile">
    <i class="el-icon-plus"></i>
  </el-upload>
</template>

<script>
  import {uploadPicturePlusApi} from "@/api/file";

  export default {
    name: "ImageUploaderBatch",
    props: {
      pathString: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        limit: 9,
        accept: ".jpg, .png",
        fileList: []
      };
    },
    watch: {
      pathString(value) {
        let list = value.split(',');
        let baseUrl = process.env.VUE_APP_BASE_API;
        list = list.map(item => ({pathUrl: item, url: baseUrl + item}));
        this.fileList = list;
      }
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
          this.$errorMsg(`上传视屏封面只能是 ${accept} 格式!`);
          param.onError();
          return;
        }
        if (size > 2) {
          this.$errorMsg("上传视屏封面大小不能超过 2MB!");
          param.onError();
          return;
        }
        let data = {};
        data.file = file;
        data.typePath = 'article';
        uploadPicturePlusApi(data)
          .then(result => {
            param.onSuccess(result.resultParam.uploadFilePath, file);
          })
          .catch(() => {
            param.onError();
          });
      },
      uploadSuccess(path, file) {
        let uploadFiles = this.$refs['ImageUploaderBatch'].uploadFiles;
        uploadFiles.some(item => {
          if (item.uid === file.uid) {
            item.pathUrl = path;
            return true
          }
        });
        this.emitImage()
      },
      emitImage() {
        let pathStr = '';
        this.$refs['ImageUploaderBatch'].uploadFiles
          .forEach(item => {
            pathStr = pathStr + `${item.pathUrl},`;
          });
        pathStr = pathStr.substr(0, pathStr.length - 1);
        this.$emit("getImage", pathStr);
      },
      exceed() {
        this.$errorMsg(`至多上传${this.limit}张图片`)
      },
      // 清理文件
      clearFiles() {
        this.$refs.ImageUploaderBatch.clearFiles();
      },
    }
  };
</script>

<style lang="scss">
  .image-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .image-uploader .el-upload:hover {
    border-color: #409eff;
  }
</style>
