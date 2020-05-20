import {axiosD, axiosG, axiosK, axiosL, axiosM, axiosP} from "../request";

const activityApplyCheckUrl = "activity/activityApplyCheck"; // 审核活动报名
const addActivityUrl = "activity/addActivity"; // 添加活动
const addActivityApplyUrl = "activity/addActivityApply"; // 添加活动报名列表
const delActivityUrl = "activity/delActivity?id="; // 删除活动
const delApplyCheckUrl = "activity/delApplyCheck?ids="; // 删除活动报名
const downloadActivityApplyUrl = "activity/downloadActivityApply?activityId="; // 下载活动报名名单
const downloadActivityUrl = "activity/downloadActivity"; // 下载活动报名
const editActivityUrl = "activity/editActivity"; // 编辑活动
const getActivityUrl = "activity/getArticle?id="; // 获得活动详情
const pageActivityUrl = "activity/pageActivity?"; //分页获得活动列表
const pageActivityApplyUrl = "activity/pageActivityApply?"; //分页获得活动列表

export const activityApplyCheckApi = data => axiosP(activityApplyCheckUrl, data);
export const addActivityApi = data => axiosK(addActivityUrl, data);
export const delActivityApi = data => axiosM(delActivityUrl , data, 'delete');
export const delApplyCheckApi = data => axiosM(delApplyCheckUrl , data, 'delete');
export const editActivityApi = data => axiosP(editActivityUrl, data);
export const downloadActivityApplyApi = data => axiosL(downloadActivityApplyUrl+data);
export const downloadActivityApi = data => axiosL(downloadActivityUrl);
export const getActivityApi = data => axiosG(getActivityUrl + data);
export const pageActivityApi = data => axiosG(pageActivityUrl + data);
export const pageActivityApplyApi = data => axiosG(pageActivityApplyUrl + data);

