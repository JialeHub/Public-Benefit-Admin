import router from '@/router'
import store from '@/store'

const type = {
  SET_USER: 'SET_USER',
  HAS_GENERATE_ROUTER: 'HAS_GENERATE_ROUTER',
  QUIT_LOGIN: 'QUIT_LOGIN'
};

const state = {
  user: {},
  hasGenerateRouter: false
};

const getters = {
  user: state => state.user,
  hasGenerateRouter: state => state.hasGenerateRouter
};

const mutations = {
  [type.SET_USER](state, user) {
    if (user) state.user = user;
    else state.user = {}
  },
  [type.HAS_GENERATE_ROUTER](state) {
    state.hasGenerateRouter = true;
  },
  [type.QUIT_LOGIN]() {
    router.push({name: 'login'});
    store.dispatch('setActive');
    store.dispatch('setTags');
    store.dispatch('setBreadcrumb');
    store.dispatch('setToken');
    location.reload();
  }
};

const actions = {
  setUser: ({commit}, user) => {
    commit(type.SET_USER, user)
  },
  setHasGenerateRouter: ({commit}) => {
    commit(type.HAS_GENERATE_ROUTER)
  },
  quitLogin: ({commit}) => {
    commit(type.QUIT_LOGIN)
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
