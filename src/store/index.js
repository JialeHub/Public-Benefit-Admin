import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from "js-cookie";
import {tokenCookieExpires} from '@/settings'

Vue.use(Vuex);

// 自动获取modules下的*.js
const modulesFiles = require.context("./modules", true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

// vuex持久化
const plugins = [
  createPersistedState({
    key: 'VOLUNTEERS-ASSOCIATION-INFO',
    storage: window.localStorage,
    reducer: val => ({info: val.info})
  }),
  createPersistedState({
    key: 'VOLUNTEERS-ASSOCIATION-SETTINGS',
    storage: window.localStorage,
    reducer: val => ({settings: val.settings})
  }),
  createPersistedState({
    key: 'VOLUNTEERS-ASSOCIATION-LAYOUT',
    storage: window.sessionStorage,
    reducer: val => ({layout: val.layout})
  }),
  createPersistedState({
    key: 'VOLUNTEERS-ASSOCIATION-TOKEN',
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) =>
        Cookies.set(key, value, {expires: modules.user.state.rememberMe ? tokenCookieExpires : 1}),
      removeItem: key => Cookies.remove(key)
    },
    reducer: val => ({token: val.token})
  })
];

const store = new Vuex.Store({
  modules,
  plugins
});

Vue.prototype.$storeGet = store.getters;
Vue.prototype.$storeSet = store.dispatch;

export default store
