import {axiosDs, axiosGs, axiosK, axiosP} from "../request";

const addProject = "project/addProject"; // 添加项目
const delProject = "project/delProject"; // 删除项目
const editProject = "project/editProject"; // 编辑项目
const pageProject = "project/pageProject"; // 获得项目
const pageDonation = "project/pageOrders"; // 获得捐款

export const addProjectApi = data => axiosK(addProject, data);
export const delProjectApi = data => axiosDs(delProject, data);
export const editProjectApi = data => axiosP(editProject, data);
export const pageProjectApi = data => axiosGs(pageProject, data);
export const pageDonationApi = data => axiosGs(pageDonation, data);




