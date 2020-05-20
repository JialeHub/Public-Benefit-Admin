import Vue from "vue";
import store from "@/store";
import {
  Message,
  MessageBox,
  Notification,
  Button,
  Container,
  Header,
  Tooltip,
  Dropdown,
  Avatar,
  DropdownMenu,
  DropdownItem,
  Main,
  Form,
  FormItem,
  Input,
  Breadcrumb,
  BreadcrumbItem,
  Menu,
  MenuItem,
  Pagination,
  Table,
  TableColumn,
  Tag,
  Scrollbar,
  Submenu,
  Dialog,
  Col,
  Row,
  Upload,
  Card,
  Popover,
  Loading,
  Option,
  Select,
  InputNumber,
  PageHeader,
  Image,
  Cascader,
  TabPane,
  Tabs,
  Radio,
  Switch,
  Drawer,
  Footer,
  RadioGroup,
  RadioButton,
  MenuItemGroup,
  Checkbox,
  Tree,
  Progress,
  DatePicker
} from 'element-ui';

Vue.prototype.$ELEMENT = {size: store.getters.setting.layoutSize};

Vue.component('ElDatePicker', DatePicker);
Vue.component('ElButton', Button);
Vue.component('ElContainer', Container);
Vue.component('ElHeader', Header);
Vue.component('ElTooltip', Tooltip);
Vue.component('ElDropdown', Dropdown);
Vue.component('ElDropdownMenu', DropdownMenu);
Vue.component('ElDropdownItem', DropdownItem);
Vue.component('ElAvatar', Avatar);
Vue.component('ElMain', Main);
Vue.component('ElForm', Form);
Vue.component('ElFormItem', FormItem);
Vue.component('ElInput', Input);
Vue.component('ElBreadcrumb', Breadcrumb);
Vue.component('ElBreadcrumbItem', BreadcrumbItem);
Vue.component('ElMenu', Menu);
Vue.component('ElMenuItem', MenuItem);
Vue.component('ElPagination', Pagination);
Vue.component('ElTable', Table);
Vue.component('ElTableColumn', TableColumn);
Vue.component('ElTag', Tag);
Vue.component('ElScrollbar', Scrollbar);
Vue.component('ElSubmenu', Submenu);
Vue.component('ElDialog', Dialog);
Vue.component('ElCol', Col);
Vue.component('ElRow', Row);
Vue.component('ElUpload', Upload);
Vue.component('ElCard', Card);
Vue.component('ElPopover', Popover);
Vue.component('ElOption', Option);
Vue.component('ElSelect', Select);
Vue.component('ElInputNumber', InputNumber);
Vue.component('ElPageHeader', PageHeader);
Vue.component('ElImage', Image);
Vue.component('ElCascader', Cascader);
Vue.component('ElTabPane', TabPane);
Vue.component('ElTabs', Tabs);
Vue.component('ElRadio', Radio);
Vue.component('ElSwitch', Switch);
Vue.component('ElDrawer', Drawer);
Vue.component('ElFooter', Footer);
Vue.component('ElRadioGroup', RadioGroup);
Vue.component('ElRadioButton', RadioButton);
Vue.component('ElMenuItemGroup', MenuItemGroup);
Vue.component('ElCheckbox', Checkbox);
Vue.component('ElTree', Tree);
Vue.component('ElProgress', Progress);
Vue.use(Loading.directive);

/**
 * @param {String} msg 提示信息
 */
const warnMsg = msg => Message.warning(msg);
const infoMsg = msg => Message.info(msg);
export const successMsg = msg => Message.success(msg);
export const errorMsg = msg => Message.error(msg);

const successNotify = msg => {
  Notification.success({
    title: "成功",
    message: msg
  });
};

const warnNotify = msg => {
  Notification.warning({
    title: "警告",
    message: msg
  });
};

const infoNotify = msg => {
  Notification.info({
    title: "消息",
    message: msg
  });
};

const errorNotify = msg => {
  Notification.error({
    title: "错误",
    message: msg
  });
};

/**
 * @param {String} text 提示信息
 * @param {String} confirmText 确认文字
 * @param {String} title 提示文字
 */
export const msgBox = (text = "确定执行此操作吗？", confirmText = "确定", title = "提示") => {
  return new Promise((resolve, reject) => {
    MessageBox.confirm(text, title, {
      confirmButtonText: confirmText,
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(result => resolve(result))
      .catch(error => reject(error))
  })
};

/**
 * @param {String} msg
 * @param {String} time
 * @description 报错信息不重复
 */
let errorText = '';
let isForbid = false;
export const errorMessage = (msg, time = 3000) => {
  if (isForbid && msg === errorText) return;
  isForbid = true;
  errorMsg(msg);
  errorText = msg;
  setTimeout(() => {
    isForbid = false;
  }, time);
};

/**
 * @description 全局注册
 */
Vue.prototype.$successMsg = successMsg;
Vue.prototype.$errorMsg = errorMsg;
Vue.prototype.$infoMsg = infoMsg;
Vue.prototype.$warnMsg = warnMsg;
Vue.prototype.$successNotify = successNotify;
Vue.prototype.$errorNotify = errorNotify;
Vue.prototype.$infoNotify = infoNotify;
Vue.prototype.$warnNotify = warnNotify;
Vue.prototype.$msgBox = msgBox;

import DeleteButton from '@/components/DeleteButton'
import SubmitButton from '@/components/SubmitButton'
import CustomizedPagination from '@/components/Pagination'

Vue.component('DeleteButton', DeleteButton);
Vue.component('SubmitButton', SubmitButton);
Vue.component('Pagination', CustomizedPagination);
