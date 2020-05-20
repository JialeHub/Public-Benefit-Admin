import store from '@/store'
import router from '@/router'

/**
 * @param {String} value
 * @description 下划线转大驼峰 edit_form => EditForm
 *
 * */
const transformName = value =>
      value.replace(/[_](\w)|\b(\w)/g, name =>
          name.toUpperCase().replace(/[_]/g, ''));

const type = {
  SET_CACHE: 'SET_CACHE',
  REFRESH_ROUTER: 'REFRESH_ROUTER'
};

const state = {
  cache: []
};

const getters = {
  cache: state => state.cache
};

const mutations = {
  [type.SET_CACHE](state) {
    let tags = store.getters.tags;
    let cacheList = [];
    tags.forEach(item => {
      if (item.cache) cacheList.push(transformName(item.name))
    });
    state.cache = cacheList
  },
  [type.REFRESH_ROUTER](state, name) {
    let Name = transformName(name);
    state.cache.some((item, index) => {
      if (item === Name) {
        state.cache.splice(index, 1);
        return true
      }
    });
    router.replace({
      name: 'redirect',
      query: {name: name}
    }).then(() => {
      store.dispatch('setCache')
    })
  }
};

const actions = {
  setCache: ({commit}) => {
    commit(type.SET_CACHE)
  },
  refreshRouter: ({commit}, name) => {
    commit(type.REFRESH_ROUTER, name)
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
