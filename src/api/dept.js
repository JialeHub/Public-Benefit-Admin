import {axiosD, axiosG, axiosK, axiosP} from "@/api/request";

const addDeptUrl = "admin/dept/addDept"; // 新增部门
const deleteDeptUrl = "admin/dept/delDept?deptId="; // 删除部门
const editDeptUrl = "admin/dept/editDept"; // 编辑部门
const getDeptTreeUrl = "admin/dept/treeDept?deptName="; // 分页获得部门列表

export const addDeptApi = data => axiosK(addDeptUrl, data);
export const deleteDeptApi = data => axiosD(deleteDeptUrl + data);
export const editDeptApi = data => axiosP(editDeptUrl, data);
export const getDeptTreeApi = data => axiosG(getDeptTreeUrl + data);
