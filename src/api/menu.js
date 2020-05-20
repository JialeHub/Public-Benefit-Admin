import {axiosD, axiosG, axiosJ, axiosK, axiosP} from "./request";

const addMenuUrl = "admin/menu/addMenu"; // 新增菜单
const deleteMenuUrl = "admin/menu/delMenu?menuId="; // 删除菜单
const editMenuUrl = "admin/menu/editMenu"; // 编辑菜单
const editRolesMenusUrl = "admin/menu/editRolesMenus"; // 编辑权限
const getMenuUrl = "admin/menu/treeMenu"; // 获取菜单
const getAllMenuUrl = "admin/menu/treeAllMenu?title="; // 获取所有菜单

export const addMenuApi = data => axiosK(addMenuUrl, data);
export const deleteMenuApi = data => axiosD(deleteMenuUrl + data);
export const editMenuApi = data => axiosP(editMenuUrl, data);
export const editRolesMenusApi = data => axiosJ(editRolesMenusUrl, data);
export const getMenuApi = () => axiosG(getMenuUrl);
export const getAllMenuApi = data => axiosG(getAllMenuUrl + data);
