import {axiosD, axiosG, axiosK, axiosM, axiosP} from "../request";

const addArticleUrl = "article/addArticle"; //添加文章
const delArticleUrl = "article/delArticle"; //删除文章
const editArticleUrl = "article/editArticle"; //更改文章
const pageArticleUrl = "article/pageArticle?"; //获得文章列表


export const editArticleApi = data => axiosP(editArticleUrl, data);
export const addArticleApi = data => axiosK(addArticleUrl, data);
export const delArticleApi = data => axiosM(delArticleUrl , data, 'delete');
export const pageArticleApi = data => axiosG(pageArticleUrl + data);





