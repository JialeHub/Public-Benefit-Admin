<template>
  <div class="out">
    <div id="container">
      <img class="png" src="../../assets/error/403.png"/>
      <div class="msg">很抱歉，您似乎没有权限访问该接口</div>
      <p class="go-back">
        <a class="pointer" @click.stop="$router.go(-1)" target="_blank">
          <span class="btn">返回上一页</span>
        </a>
      </p>
    </div>
    <div id="cloud"></div>
  </div>
</template>

<script>
  export default {
    name: "Error403"
  }
</script>

<style scoped lang="scss">
  .out {
    height: calc(100% - 25px);
    background: url("../../assets/error/error_bg.jpg") repeat-x scroll 0 0 #67ACE4;
    overflow: hidden;
    position: absolute;
    right: 12px;
    top: 12px;
    width: calc(100% - 25px);
  }

  .btn {
    background-color: white;
    padding: 8px 20px;
    letter-spacing: 0.8px;
    color: rgb(72, 151, 217);
    border-radius: 20px;
  }

  .png {
    margin-bottom: 5vh !important;
    max-height: 100%;
    @media screen and (max-height: 660px) {
      height: 33vh;
    }
  }

  #container {
    margin: 0 auto;
    padding-top: 10vh;
    text-align: center;
    width: 560px;
  }

  #container img {
    border: medium none;
    margin-bottom: 6vh;
  }

  #container .go-back {
    position: relative;
    z-index: 999;
  }

  #container .msg {
    margin-bottom: 65px;
    max-height: 60px;
    height: 2vh;
    color: rgba(244, 249, 253, 1);
    font-size: 25px;
    font-family: '幼圆', 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  }

  #cloud {
    background: url("../../assets/error/error_cloud.png") repeat-x scroll 0 0 transparent;
    bottom: 0;
    max-height: 170px;
    height: 20vh;
    position: absolute;
    width: 100%;
  }
</style>
