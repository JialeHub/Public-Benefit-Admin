import {axiosK, axiosG, axiosD, axiosP} from "../request";

const addPictureUrl = "systemConfig/addPicture"; // 添加图片
const delPictureUrl = "systemConfig/delPicture?id="; // 删除轮播图
const editDisclaimerUrl = "systemConfig/editDisclaimer"; // 更改免责声明
const editPriceUrl = "systemConfig/editPrice"; // 编辑会费配置
const getDisclaimerUrl = "systemConfig/getDisclaimer"; // 获得免责声明
const getPriceUrl = "systemConfig/getPrice"; // 获得会费配置
const listPictureUrl = "systemConfig/listPicture?type="; // 获得轮播图

export const addPictureApi = data => axiosK(addPictureUrl, data);
export const delPictureApi = data => axiosD(delPictureUrl + data);
export const editDisclaimerApi = data => axiosP(editDisclaimerUrl, data);
export const editPriceApi = data => axiosP(editPriceUrl, data);
export const getDisclaimerApi = () => axiosG(getDisclaimerUrl);
export const getPriceApi = () => axiosG(getPriceUrl);
export const listPictureApi = data => axiosG(listPictureUrl + data);
