import axios from "axios";
import router from "@/router";
import store from "@/store";
import {errorMessage, successMsg, errorMsg, msgBox} from "@/utils/EUI";
import {isEmpty} from "@/utils/common";
import {timeout} from "@/settings";

let errorStatus = null;
const service = axios.create({
  timeout: timeout,
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: false
});

//请求拦截
service.interceptors.request.use(
  config => {
    let token = store.getters.token;
    let url = config.url;
    if (isAddToken(url)) config.headers.Authorization = token;
    return config;
  },
  error => {
    errorMessage("请求错误！");
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  response => {
    const {message, status} = response.data;
    if (!isEmpty(message) && status === 200) successMsg(message);
    if (!isEmpty(message) && status !== 200) errorMsg(message);
    return response.data;
  },
  error => {
    /* 请求超时！*/
    if (error.toString().includes("timeout")) {
      errorMessage("网络请求超时！");
      return Promise.reject(error);
    }
    /* 请求中断 */
    if (
      error.hasOwnProperty("message") &&
      error.message === "Request Interruption"
    ) {
      return Promise.reject(error);
    }
    /* 网络错误 */
    if (
      error.response.hasOwnProperty("statusText") &&
      error.response.statusText === "Internal Server Error"
    ) {
      errorMessage("网络错误，无法连接到服务器！");
      return Promise.reject(error);
    }
    const {status, message} = error.response.data;
    /* 401 */
    if (status === 401) {
      if (errorStatus === status) return;
      errorStatus = status;
      msgBox("登录状态已过期，您可以继续留在该页面，或者重新登录", "重新登录", "系统提示")
        .then(() => router.push({name: "login"}))
        .catch(() => (errorStatus = null))
    } else if (status === 403) {
      /* 403 */
      router.push({name: "error403"});
    } else {
      /* elseStatus */
      if (!isEmpty(message)) errorMsg(message);
    }
    return Promise.reject(error);
  }
);

/**
 * @description 白名单，不添加token的接口
 * */
const isAddToken = url =>
  ["admin/login/login", "admin/login/getCode"].every(item => url !== item);

export default service;
