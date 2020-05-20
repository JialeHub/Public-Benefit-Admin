import Vue from "vue";

/**
 * @description 过滤时间
 * @return YYYY-MM-DD
 **/
Vue.filter("formatDate", value => {
  let date = new Date(value);
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
});

/**
 * @description 过滤时间
 * @return YYYY-MM-DD hh:mm:ss
 **/
Vue.filter("formatDateTime", value => {
  let date = new Date(value);
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let seconds = date.getSeconds().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
});

/**
 * @description 过滤时间
 * @return YYYY-MM-DD hh:mm
 **/
Vue.filter("formatDateTime2", value => {
  let date = new Date(value);
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
});
