import {axiosD, axiosM, axiosF, axiosG, axiosK, axiosP} from "@/api/request";

const addUserUrl = "admin/user/addUser"; // 新增用户
const deleteUserUrl = "admin/user/delUser"; // 删除用户
const editUserUrl = "admin/user/editUser"; // 编辑用户
const editAvatarUrl = "admin/user/editAvatar"; // 编辑头像
const getUserListUrl = "admin/user/pageUser?"; // 获得用户列表
const getUserLevelUrl = "admin/user/getUserLevel"; // 获得角色级别
const getOnlineUserUrl = "admin/user/online/pageOnLineUser?"; // 查询在线用户
const deleteOnlineUserUrl = "admin/user/online/kickOut?keys="; // 踢出用户

export const addUserApi = data => axiosK(addUserUrl, data);
export const deleteUserApi = data => axiosM(deleteUserUrl, data, "delete");
export const editUserApi = data => axiosP(editUserUrl, data);
export const editAvatarApi = data => axiosF(editAvatarUrl, data);
export const getUserListApi = data => axiosG(getUserListUrl + data);
export const getUserLevelApi = () => axiosG(getUserLevelUrl);
export const getOnlineUserApi = data => axiosG(getOnlineUserUrl + data);
export const deleteOnlineUserApi = data => axiosD(deleteOnlineUserUrl + data);
