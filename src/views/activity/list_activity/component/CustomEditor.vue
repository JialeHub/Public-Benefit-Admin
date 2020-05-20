<template>
  <div>
    <textarea class="custom-editor"></textarea>
  </div>
</template>

<script>
  import tinymce from "tinymce/tinymce";
  import "tinymce/themes/silver";

  import "tinymce/plugins/image"; // 插入上传图片插件
  import "tinymce/plugins/table"; // 插入表格插件
  import "tinymce/plugins/lists"; // 列表插件
  import "tinymce/plugins/contextmenu"; //右键菜单插件
  import "tinymce/plugins/wordcount"; // 字数统计插件
  import "tinymce/plugins/colorpicker"; //选择颜色插件
  import "tinymce/plugins/textcolor"; //文本颜色插件
  import "tinymce/plugins/fullscreen"; //全屏
  import "tinymce/plugins/help"; // 帮助
  import "tinymce/plugins/paste"; // 粘贴图片
  import "tinymce/plugins/searchreplace"; // 全屏
  import "tinymce/plugins/insertdatetime"; // 插入时间
  import "tinymce/plugins/toc"; // 内容列表
  import "tinymce/plugins/codesample"; // 插入代码

  import {uploadPicturePlusApi} from '@/api/file'

  export default {
    name: "CustomEditor",
    props: {
      editorKey: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        content: "",
        DefaultInit: {
          language_url: "/assets/tinymce/langs/zh_CN.js", //导入语言文件
          language: "zh_CN", //语言设置
          skin_url: "/assets/tinymce/skins/ui/oxide", //主题样式
          height: 500, //高度
          menubar: false, // 最上方menu菜单
          browser_spellcheck: true, // 拼写检查
          branding: false, // 去水印
          statusbar: false, // 隐藏编辑器底部的状态栏
          elementpath: false, // 禁用下角的当前标签路径
          paste_data_images: true, // 允许粘贴图像
          toolbar: [
            "bold italic underline |formatselect | fontsizeselect | alignleft aligncenter alignright alignjustify | outdent indent |codeformat blockformats | removeformat undo redo ",
            "bullist numlist toc pastetext|lists image table | searchreplace fullscreen"
          ],
          plugins: "lists image table wordcount fullscreen help codesample toc searchreplace paste"
        }
      };
    },
    computed: {
      pictureBaseUrl() {
        return process.env.VUE_APP_BASE_API + '/';
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      // 获得富文本内容
      getContent() {
        return tinymce.editors[tinymce.editors.length - 1].getContent()
      },
      // 设置富文本内容
      setContent(value = "") {
        tinymce.editors[tinymce.editors.length - 1].setContent(value)
      },
      init() {
        const _this = this;
        tinymce.init({
          // 默认配置
          ...this.DefaultInit,
          // 图片上传
          images_upload_handler: function (blobInfo, success, failure) {
            let data = {};
            data.file = blobInfo.blob();
            data.typePath = 'activity';
            uploadPicturePlusApi(data).then(result => {
              let response = result.resultParam.uploadFilePath;
              let url = _this.pictureBaseUrl + response;
              if (result.status === 200) {
                success(url);
              } else {
                failure("上传失败！");
              }
            });
          },
          // 挂载的DOM对象
          selector: `.custom-editor`
        });
      }
    },
    beforeDestroy() {
      let list = document.querySelectorAll('.custom-editor');
      list.forEach(item => {
        item.style.visibility = 'hidden'
      });
      tinymce.remove();
    }
  };
</script>

<style></style>
