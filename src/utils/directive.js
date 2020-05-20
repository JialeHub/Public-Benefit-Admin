import Vue from "vue";
import store from '../store'


/**
 * @description 权限控制
 **/
Vue.directive('permission', {
  inserted(el, binding) {
    const {value} = binding;
    const roles = store.getters && store.getters.user.roles;
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value;
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      });
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`使用方式： v-permission="['admin']"`)
    }
  }
});


/**
 * @description 改变窗口标题
 **/
Vue.directive("title", {
  // 第一种方式  v-title="'haha'"  这样使用---传参方法
  bind(el, binding) {
    document.title = binding.value
  },
  //第二种方式 v-title data-title="所需要的标题"  这样使用
  inserted: function (el) {
    document.title = el.dataset.title
  }
});

/**
 * @description 防止同一时间多次点击
 **/
let openDelay = false;
Vue.directive("intervalClick", (el, binding) => {
  el.onclick = function () {
    if (openDelay) return;
    openDelay = !openDelay;
    if (!binding.value) {
      alert("未传入Value数据！");
      return;
    }
    let func = binding.value["func"];
    let time = binding.value["time"];
    if (typeof time !== "number") {
      alert("传入等待时间错误");
      return;
    }
    let args = [];
    for (const key in binding.value) {
      if (binding.value.hasOwnProperty(key)) {
        if (key === "func" || key === "time") continue;
        args.push(binding.value[key]);
      }
    }
    setTimeout(() => {
      openDelay = !openDelay;
    }, time);
    func(...args);
  };
});
