import router from './routers'
import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {isEmpty} from '../utils/common'
import {getMenuApi} from '../api/menu'
import {getUserInfoApi} from '../api/person'
import {title} from '../settings'
import {TraverseTree} from './TraverseTree'

NProgress.configure({showSpinner: false});

let layout = {
  name: 'index',
  path: '/index',
  redirect: "/home",
  component: () => import('@/layout'),
  children: [
    {
      name: 'home',
      path: '/home',
      meta: {title: '首页'},
      component: () => import('@/views/home')
    },
    {
      name: 'person',
      path: '/person',
      meta: {title: '个人中心'},
      component: () => import('@/views/person')
    },
    {
      name: 'error403',
      path: '/403',
      meta: {title: '403'},
      component: () => import('@/views/error/error403')
    },
    {
      name: 'redirect',
      path: '/redirect',
      meta: {title: ""},
      component: () => import('@/views/redirect')
    }
  ]
};

// 动态路由
export function generateRouter() {
  return new Promise(resolve => {
    getUserInfoApi().then(result => {
      store.dispatch('setUser', result.resultParam.user)
    });
    getMenuApi().then(result => {
      let menu = result.resultParam.content;
      layout = new TraverseTree(menu, layout).get();
      store.dispatch('setMenu', menu);
      store.dispatch('setHasGenerateRouter');
      router.addRoutes([layout]);
      router.addRoutes([{path: "*", redirect: "/404"}]);
      resolve()
    })
  })
}

// 路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + title
  }
  let isLogin = !isEmpty(store.getters.token);
  if (to.path === "/") {
    isLogin
      ? next('/home')
      : next('/login');
    return
  }
  if (to.path === "/login") {
    next();
    return;
  }
  if (!isLogin) {
    next('/login');
    return;
  }
  if (
    process.env.NODE_ENV === 'production'
    && (to.path === "/system/menu" || to.path === "/system/role")
  ) {
    next('/404');
    return
  }
  if (store.getters.hasGenerateRouter) {
    next()
  } else {
    generateRouter();
    next()
  }
});

router.afterEach(() => {
  NProgress.done()
});

export default router
