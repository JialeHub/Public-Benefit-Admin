import {axiosD, axiosG, axiosK, axiosP} from "./request";

const getUserUrl = "login/getUser"; // 获取用户信息
const logoutUrl = "admin/login/logout"; // 退出登录
const updatePassUrl = "admin/user/editPass"; // 修改密码
const getUserLogUrl = "test/pageUserLog"; // 个人日志

export const getUserInfoApi = () => axiosG(getUserUrl);
export const logoutApi = () => axiosD(logoutUrl);
export const updatePassApi = data => axiosP(updatePassUrl, data);
export const getUserLogApi = () => axiosG(getUserLogUrl);


