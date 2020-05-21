import {axiosD, axiosG, axiosK, axiosP} from "@/api/request";

const addDeptUrl = "admin/dept/addDept"; // 新增部门
const deleteDeptUrl = "admin/dept/delDept?deptId="; // 删除部门
const editDeptUrl = "admin/dept/editDept"; // 编辑部门
const getDeptTreeUrl = "admin/dept/treeDept?deptName="; // 分页获得部门列表
const getDeptPageUrl = "/admin/dept/pageDept?"; // 分页获得部门列表

export const addDeptApi = data => axiosK(addDeptUrl, data);
export const deleteDeptApi = data => axiosD(deleteDeptUrl + data);
export const editDeptApi = data => axiosP(editDeptUrl, data);
export const getDeptTreeApi = data => axiosG(getDeptTreeUrl + data);
export const getDeptPageApi = data => axiosG(getDeptPageUrl + data);


const addJoinOrgUrl = "dept/addJoinOrg"; //加入组织申请
const agreeJoinUrl = "dept/agreeJoin"; //同意加入组织申请
const disagreeJoinUrl = "dept/disagreeJoin"; //不同意加入组织申请
const pageJoinOrgUrl = "dept/pageJoinOrg?"; //分页获得组织申请


export const addJoinOrgApi = data => axiosP(addJoinOrgUrl, data);
export const agreeJoinApi = data => axiosP(agreeJoinUrl, data);
export const disagreeJoinApi = data => axiosP(disagreeJoinUrl, data);
export const pageJoinOrgApi = data => axiosG(pageJoinOrgUrl + data);

