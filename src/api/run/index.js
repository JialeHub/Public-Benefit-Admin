import {axiosM, axiosG} from "@/api/request";

/**
 * @module run
 * */

const getRunListUrl = "run/pageCallRun?"; // 获得约跑列表
const checkRunUrl = "run/check"; // 审核约跑
const delCallRunUrl = "run/delCallRun"; // 删除约跑

export const getRunListApi = data => axiosG(getRunListUrl + data);
export const checkRunApi = data => axiosM(checkRunUrl, data, 'put');
export const delCallRunApi = data => axiosM(delCallRunUrl, data, 'delete');

/**
 * @module article
 * */
const pageArticleUrl = "article/pageArticle?"; // 获得约跑列表
const articleCheckUrl = "article/articleCheck"; // 审核约跑
const delArticleUrl = "article/delArticle"; // 删除约跑

export const pageArticleApi = data => axiosG(pageArticleUrl + data);
export const articleCheckApi = data => axiosM(articleCheckUrl, data, 'put');
export const delArticleApi = data => axiosM(delArticleUrl, data, 'delete');
