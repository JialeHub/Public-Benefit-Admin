import {axiosL, axiosG, axiosM} from "../request";

const cooperationCheckUrl = "cooperation/cooperationCheck"; // 审核商务合作
const delCooperationUrl = "cooperation/delCooperation"; // 删除商务合作
const downloadCooperationUrl = "cooperation/downloadCooperation"; // 下载商务合作
const getCooperationUrl = "cooperation/getCooperation?id="; // 获得商务合作详情
const pageCooperationUrl = "cooperation/pageCooperation?"; // 获得商务合作列表

export const cooperationCheckApi = data => axiosM(cooperationCheckUrl, data, 'put');
export const delCooperationApi = data => axiosM(delCooperationUrl, data, 'delete');
export const downloadCooperationApi = () => axiosL(downloadCooperationUrl);
export const getCooperationApi = data => axiosG(getCooperationUrl + data);
export const pageCooperationApi = data => axiosG(pageCooperationUrl + data);
