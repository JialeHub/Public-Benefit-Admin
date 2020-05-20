import {axiosD, axiosG, axiosK, axiosP} from "@/api/request";

const addJobUrl = "admin/job/addJob"; // 新增职业
const deleteJobUrl = "admin/job/delJob?jobId="; // 删除职业
const editJobUrl = "admin/job/editJob"; // 编辑职业
const getJobListPageUrl = "admin/job/pageJob?"; // 分页获得职业列表
const getJobByDeptIdUrl = "admin/job/listJob?deptId="; // 新增职业名列表（模糊搜索职业名）

export const addJobApi = data => axiosK(addJobUrl, data);
export const deleteJobApi = data => axiosD(deleteJobUrl + data);
export const editJobApi = data => axiosP(editJobUrl, data);
export const getJobListApi = data => axiosG(getJobListPageUrl + data);
export const getJobByDeptIdApi = data => axiosG(getJobByDeptIdUrl + data);
