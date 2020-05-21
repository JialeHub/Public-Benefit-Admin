import {axiosD, axiosG, axiosK, axiosL, axiosM, axiosP} from "../request";

const agreeActivityApplyUrl = "activity/agreeActivityApply"; // 同意活动报名
const disagreeActivityApplyUrl = "activity/disagreeActivityApply"; // 不同意活动报名
const addActivityUrl = "activity/addActivity"; // 添加活动
const addActivityApplyUrl = "activity/addActivityApply"; // 添加活动报名
const delActivityUrl = "activity/delActivity?id="; // 删除活动
const editActivityUrl = "activity/editActivity"; // 编辑活动
const getActivityUrl = "activity/getArticle?id="; // 获得活动详情
const pageActivityUrl = "activity/pageActivity?"; //分页获得活动列表
const pageActivityApplyUrl = "activity/pageActivityApply?"; //分页获得活动列表
const pageUserActivityUrl = "activity/pageUserActivity?"; //分页获得参加过的活动列表


export const agreeActivityApplyApi = data => axiosP(agreeActivityApplyUrl, data);
export const disagreeActivityApplyApi = data => axiosP(disagreeActivityApplyUrl, data);
export const addActivityApi = data => axiosK(addActivityUrl, data);
export const addActivityApplyApi = data => axiosK(addActivityApplyUrl, data);
export const delActivityApi = data => axiosM(delActivityUrl , data, 'delete');
export const editActivityApi = data => axiosP(editActivityUrl, data);
export const getActivityApi = data => axiosG(getActivityUrl + data);
export const pageActivityApi = data => axiosG(pageActivityUrl + data);
export const pageActivityApplyApi = data => axiosG(pageActivityApplyUrl + data);
export const pageUserActivityApi = data => axiosG(pageUserActivityUrl + data);

