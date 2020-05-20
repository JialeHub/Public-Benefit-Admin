import {axiosD, axiosG, axiosJ, axiosU} from "./request";

const addRoleUrl = "admin/role/addRole"; // 新增角色
const deleteRoleUrl = "admin/role/delRole?roleId="; // 删除角色
const editRoleUrl = "admin/role/editRole"; // 编辑角色
const getRoleListUrl = "admin/role/listRole?roleName="; // 获得角色列表
const getRoleTreeUrl = "admin/role/treeRole"; // 获得权限树

export const addRoleApi = data => axiosJ(addRoleUrl, data);
export const deleteRoleApi = data => axiosD(deleteRoleUrl + data);
export const editRoleApi = data => axiosU(editRoleUrl, data);
export const getRoleListApi = data => axiosG(getRoleListUrl + data);
export const getRoleTreeApi = () => axiosG(getRoleTreeUrl);

