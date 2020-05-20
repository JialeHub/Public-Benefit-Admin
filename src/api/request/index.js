import service from "./axios"
import qs from "qs";

/**
 * @param {String} url 请求地址
 * @description get
 * */
export const axiosG = url => {
  return new Promise((resolve, reject) => {
    service({
      method: "get",
      url: url
    })
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
};


/**
 * @param {String} url 请求地址
 * @description delete，删除单条数据。
 * */
export const axiosD = url => {
  return new Promise((resolve, reject) => {
    service({
      method: "delete",
      url: url
    })
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
};


/**
 * @param {String} url 请求地址
 * @param {Object} param {ids: [1, 2, 3], status: false}
 * @param {String} method "delete put..."
 * @description 批量操作数据。
 * */
export const axiosM = (url, param, method) => {
  return new Promise((resolve, reject) => {
    service({
      method: method,
      url: url,
      params: param,
      paramsSerializer: params => qs.stringify(params, {arrayFormat: 'repeat'})
    })
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
};


/**
 * @param {String} url 请求地址
 * @param {Object} param {name: LiHua, age: 18}
 * @description post，键值对格式。
 * */
export const axiosK = (url, param) => {
  return new Promise((resolve, reject) => {
    service({
      method: "post",
      url: url,
      data: param,
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      transformRequest: [data => qs.stringify(data)]
    })
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
};


/**
 * @param {String} url 请求地址
 * @param {Object} param {name: LiHua, age: 18}
 * @description put，键值对格式。
 * */
export const axiosP = (url, param) => {
  return new Promise((resolve, reject) => {
    service({
      method: "put",
      url: url,
      data: param,
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      transformRequest: [data => qs.stringify(data)]
    })
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
};


/**
 * @param {String} url 请求地址
 * @param {Object} param {name: LiHua, age: 18}
 * @description post，JSON格式。
 * */
export const axiosJ = (url, param) => {
  return new Promise((resolve, reject) => {
    service({
      method: "post",
      url: url,
      data: param,
      headers: {"Content-Type": "application/json"},
      transformRequest: [data => JSON.stringify(data)]
    })
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
};


/**
 * @param {String} url 请求地址
 * @param {Object} param {name: LiHua, age: 18}
 * @description put，JSON格式。
 * */
export const axiosU = (url, param) => {
  return new Promise((resolve, reject) => {
    service({
      method: "put",
      url: url,
      data: param,
      headers: {"Content-Type": "application/json"},
      transformRequest: [data => JSON.stringify(data)]
    })
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
};


/**
 * @param {String} url 请求地址
 * @param {FormData} param new FormData()
 * @description post，文件格式。
 * */
export const axiosF = (url, param) => {
  return new Promise((resolve, reject) => {
    service({
      method: "post",
      url: url,
      data: param,
      headers: {"Content-Type": "multipart/form-data"}
    })
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
};


/**
 * @param {String} url 请求地址
 * @param {Object} param {id: 1, file: [1.png, 2.png]}
 * @param {Function=} callback 回调函数
 * @param {Object=} source 中断请求
 * @description post，文件格式。
 * */
export const axiosFs = (url, param, callback, source) => {
  let cancelToken;
  if (source) cancelToken = source.token;
  return new Promise((resolve, reject) => {
    service({
      method: "post",
      timeout: 10 * 60 * 1000,
      url: url,
      data: param,
      headers: {
        "Content-Type": "multipart/form-data"
      },
      transformRequest: [
        data => {
          const formData = new FormData();
          for (let key in data) {
            if (data.hasOwnProperty(key)) {
              if (data[key] instanceof Array)
                for (let i = 0; i < data[key].length; i++)
                  formData.append(key, data[key][i]);
              else
                formData.append(key, data[key])
            }
          }
          return formData;
        }
      ],
      cancelToken: cancelToken,
      onUploadProgress: progress => {
        if (callback)
          callback(Math.round((progress.loaded / progress.total) * 100));
      }
    })
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
};


/**
 * @param {String} url 请求地址
 * @description 下载文件。
 * */
export const axiosL = url => {
  return new Promise((resolve, reject) => {
    service({
      method: "get",
      url: url,
      responseType: "blob"
    })
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
};
