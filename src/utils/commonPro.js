import Vue from "vue";
/**
 * @param string
 * @param noAddBase
 * @return {String}
 * @description 添加URL地址+自动去除第一斜杠
 * */
export const addBaseURL = (string, noAddBase) => {
  if (string && string !== "") {
    if (string.charAt(0) !== "/" && string.charAt(0) !== "\\")
      string = "/" + string;
    if (string.charAt(string.length - 1) === "/")
      string = string.substr(0, string.length - 1);
    if (noAddBase === true) {
      return string;
    } else {
      return process.env.VUE_APP_BASE_API + string;
    }
  } else {
    return "";
  }
};

Vue.prototype.$addBaseURL = addBaseURL;
