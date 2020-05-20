import {axiosG, axiosK} from "./request";

const getCodeUrl = "admin/login/getCode"; // 获取验证码
const loginUrl = "admin/login/login"; // 登陆

export const getCodeApi = () => axiosG(getCodeUrl);
export const loginApi = data => axiosK(loginUrl, data);
