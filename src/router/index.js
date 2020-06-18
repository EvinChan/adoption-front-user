import Vue from 'vue';
import Router from 'vue-router';

import Home from '../views/Home/Home';
import Login from '../views/Home/Login';
import Register from '../views/Home/Register';
import forgotPassword from '../views/Home/forgotPassword';

import Search from '../views/Home/Search';
import Category from '../views/Home/Category';
import noticeList from '../views/Home/noticeList';
import Notice from '../views/Home/Notice';
import organizationList from '../views/Home/organizationList';
import centerInfo from '../views/Home/centerInfo';

import morePicture from '../views/Home/morePicture';
import More from '../views/Home/More';
import Detail from '../views/Home/Detail';

import User from '../views/User/User';
import userVerification from '../views/User/userVerification';
import Heading from '../views/User/Heading';
import Password from '../views/User/Password';
import mobileVerify from '../views/User/mobileVerify';
import mobileSet from '../views/User/mobileSet';
import Address from '../views/User/Address';
// import UserCollection from '../views/User/UserCollection';

import userAdoption from '../views/User/userAdoption';
import userOrganization from '../views/User/userOrganization';
import userOrder from '../views/User/userOrder';

import Order from '../views/Home/Order';
import payOrder from '../views/Home/payOrder';

Vue.use(Router);

export const constantRoutes = [
  {path: '/', name: 'home', component: Home, meta: { title: '首页'}},  // 首页
  {path: '/login', name: 'login', component: Login, meta: { title: '登录'}},  // 登录
  {path: '/register', name: 'register', component: Register, meta: { title: '注册'}},  // 注册
  {path: '/forgotPassword', name: 'forgotPassword', component: forgotPassword, meta: { title: '找回密码'}},  // 忘记密码

  {path: '/search', name: 'search', component: Search, meta: { title: '搜素'}},  // 搜索
  {path: '/category', name: 'category', component: Category, meta: { title: '宠物'}},  // 分类
  {path: '/noticeList', name: 'noticeList', component: noticeList, meta: { title: '系统公告'}},  // 公告
  {path: '/notice', name: 'notice', component: Notice, meta: { title: '公告详情'}},  // 公告详情
  {path: '/organizationList', name: 'organizationList', component: organizationList, meta: { title: '宠物机构'}},  // 宠物机构
  {path: '/centerInfo', name: 'centerInfo', component: centerInfo, meta: { title: '联系我们'}},  // 联系我们

  {path: '/morePicture', name: 'morePicture', component: morePicture, meta: { title: '萌宠图集'}},  // 查看更多萌宠图集
  {path: '/more', name: 'more', component: More, meta: { title: '更多宠物'}},  // 查看更多宠物
  {path: '/detail', name: 'detail', component: Detail, meta: { title: '宠物详情'}},  // 详情
]

export const asyncRoutes = [
  {path: '/user', name: 'user', component: User, meta: { title: '个人信息'}},  // 个人中心
  {path: '/userVerification', name: 'userVerification', component: userVerification, meta: { title: '实名验证'}},  // 实名验证
  {path: '/heading', name: 'heading', component: Heading, meta: { title: '我的头像'}},  // 我的头像
  {path: '/password', name: 'password', component: Password, meta: { title: '修改密码'}},  // 修改密码
  {path: '/mobile/verify', name: 'mobileVerify', component: mobileVerify, meta: { title: '修改账号'}},  // 修改账号 验证身份
  {path: '/mobile/set', name: 'mobileSet', component: mobileSet, meta: { title: '修改账号'}},  // 修改账号 修改账号
  {path: '/address', name: 'address', component: Address, meta: { title: '地址管理'}},  // 地址管理
  // {path: '/userCollection', name: 'userCollection', component: UserCollection},  // 我的收藏

  {path: '/userAdoption', name: 'userAdoption', component: userAdoption, meta: { title: '领养申请表'}},  // 领养申请表
  {path: '/userOrganization', name: 'userOrganization', component: userOrganization, meta: { title: '机构申请表'}},  // 机构申请表
  {path: '/userOrder', name: 'userOrder', component: userOrder, meta: { title: '订单管理'}},  // 订单管理

  {path: '/order', name: 'order', component: Order, meta: { title: '订单'}},  // 提交订单
  {path: '/payOrder', name: 'payOrder', component: payOrder, meta: { title: '支付'}},  // 支付订单
]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
