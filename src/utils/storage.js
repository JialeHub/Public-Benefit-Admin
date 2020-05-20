import Vue from 'vue'
import * as Cookies from "js-cookie"

/**
 * @description localStorage
 * */

const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
};

const getLocalStorage = key => {
  return JSON.parse(localStorage.getItem(key))
};

export const removeLocalStorage = key => {
  localStorage.removeItem(key)
};

const clearLocalStorage = () => {
  localStorage.clear()
};

/**
 * @description sessionStorage
 * */

const setSessionStorage = (key, data) => {
  sessionStorage.setItem(key, JSON.stringify(data))
};

const getSessionStorage = key => {
  return JSON.parse(sessionStorage.getItem(key))
};

export const removeSessionStorage = key => {
  sessionStorage.removeItem(key)
};

const clearSessionStorage = () => {
  sessionStorage.clear()
};

/**
 * @description cookiesStorage
 * */

export const removeCookiesStorage = (key) => {
  Cookies.remove(key);
};

Vue.prototype.$setLocalStorage = setLocalStorage;
Vue.prototype.$getLocalStorage = getLocalStorage;
Vue.prototype.$removeLocalStorage = removeLocalStorage;
Vue.prototype.$clearLocalStorage = clearLocalStorage;
Vue.prototype.$setSessionStorage = setSessionStorage;
Vue.prototype.$getSessionStorage = getSessionStorage;
Vue.prototype.$removeSessionStorage = removeSessionStorage;
Vue.prototype.$clearSessionStorage = clearSessionStorage;
Vue.prototype.$removeCookiesStorage = removeCookiesStorage;
