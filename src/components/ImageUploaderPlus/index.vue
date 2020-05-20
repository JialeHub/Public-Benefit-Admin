<template>
  <div class="image-uploader-plus">
    <el-upload
            ref="ImageUploaderPlus"
            class="image-uploader"
            action="image-upload"
            :accept="accept"
            :auto-upload="false"
            :on-change="changeUpload"
            :show-file-list="false">
      <img v-if="url" :src="url" class="custom-image" alt="图片"/>
      <i v-else class="el-icon-plus image-uploader-icon"></i>
    </el-upload>
    <el-dialog
            title="图片剪裁"
            width="700px"
            :visible.sync="visible"
            append-to-body
            :close-on-click-modal="false"
            @close="closeUpload">
      <div class="cropper">
        <vueCropper
                ref="cropper"
                :img="options.img"
                :output-size="options.size"
                :output-type="options.outputType"
                :info="options.info"
                :full="options.full"
                :fixed="options.fixed"
                :fixed-number="options.fixedNumber"
                :can-move="options.canMove"
                :can-move-box="options.canMoveBox"
                :fixed-box="options.fixedBox"
                :original="options.original"
                :auto-crop="options.autoCrop"
                :auto-crop-width="options.autoCropWidth"
                :auto-crop-height="options.autoCropHeight"
                :center-box="options.centerBox"
                :high="options.high"
                @imgLoad="imgLoad"
        />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeUpload">取 消</el-button>
        <submit-button ref="SubmitButton" @submit="submit"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {VueCropper} from 'vue-cropper'
  import {uploadPictureApi} from "@/api/file";

  export default {
    name: "ImageUploaderPlus",
    components: {VueCropper},
    props: {
      imageUrl: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        url: "",
        accept: ".jpg, .png",
        fileName: '',
        visible: false,
        options: {
          img: '', // 裁剪图片的地址
          info: false, // 裁剪框的大小信息
          outputSize: 1, // 裁剪生成图片的质量
          outputType: 'png', // 裁剪生成图片的格式 jpeg、png、webp
          canScale: false, // 图片是否允许滚轮缩放
          fixedBox: false, // 固定截图框大小 不允许改变
          fixed: true, // 是否开启截图框宽高固定比例
          fixedNumber: [1, 1], // 截图框的宽高比例
          autoCrop: true, // 是否默认生成截图框
          full: false, // 是否输出原图比例的截图
          canMoveBox: true, // 截图框能否拖动
          original: false, // 上传图片按照原始比例渲染
          centerBox: true, // 截图框是否被限制在图片里面
          infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
          high: true,
          size: 1
        }
      };
    },
    watch: {
      imageUrl(value) {
        this.url = value;
      }
    },
    methods: {
      changeUpload(result) {
        let file = result.raw;
        this.fileName = file.name;
        const type = file.name
          .substring(file.name.lastIndexOf(".") + 1)
          .toLowerCase();
        const size = file.size / 1024 / 1024;
        if (!this.accept.includes(type)) {
          let accept = this.accept.replace(/[.]|[,]/g, "");
          this.$errorMsg(`上传头像只能是 ${accept} 格式!`);
          return;
        }
        if (size > 2) {
          this.$errorMsg("上传头像大小不能超过 2MB!");
          return;
        }
        this.$nextTick(() => {
          this.options.img = URL.createObjectURL(file);
          this.visible = true
        })
      },
      submit() {
        this.$refs.cropper.getCropBlob(data => {
          let formData = new FormData();
          formData.append('file', data, this.fileName);
          formData.append('typePath', 'article');
          this.$refs.SubmitButton.start();
          uploadPictureApi(formData)
            .then(result => {
              this.url = URL.createObjectURL(data);
              this.$emit('getImage', result.resultParam.uploadFilePath);
              this.$refs.SubmitButton.stop();
              this.closeUpload();
            })
            .catch(() => {
              this.$refs.SubmitButton.stop();
            })
        })
      },
      // 关闭上传及裁剪
      closeUpload() {
        this.options.img = '';
        this.visible = false;
      },
      // 图片加载情况
      imgLoad(msg) {
        if (msg !== 'success') {
          this.$errorMsg("图片加载失败！")
        }
      },
      // 清理文件
      clearFiles() {
        this.url = "";
        this.$refs.ImageUploaderPlus.clearFiles();
      },
    }
  };
</script>

<style lang="scss">
  $image-uploader-plus-width: 170px;
  $image-uploader-plus-height: 170px;

  .cropper {
    width: 100%;
    height: 340px;
    display: inline-block;
  }

  .image-uploader-plus {
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

    .image-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: $image-uploader-plus-width;
      height: $image-uploader-plus-height;
      line-height: $image-uploader-plus-height;
      text-align: center;
    }

    .custom-image {
      width: $image-uploader-plus-width;
      height: $image-uploader-plus-height;
      display: block;
    }
  }
</style>
