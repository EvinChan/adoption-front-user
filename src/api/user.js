import request from '@/utils/request';

// register 检验手机号是否注册
export function checkMobileFalse(mobile) {
  return request({
    url: `/user/checkMobileFalse/${mobile}`,
    method: 'get'
  })
}

// register 发送验证码
export function getUserSms(mobile) {
  return request({
    url: `/user/getUserSms/${mobile}`,
    method: 'get'
  })
}

// 检验原手机号验证码是否正确
export function checkCode(mobile, code) {
  return request({
    url: `/user/checkCode/${mobile}/${code}`,
    method: 'get'
  })
}

// register 注册
export function register(data) {
  return request({
    url:'/user/register',
    method: "post",
    data
  })
}

// login 登录
export function login(data) {
  return request({
    url:'/user/login',
    method: "post",
    data
  })
}

// forgotPassword 检验手机号是否注册
export function checkMobileTrue(mobile) {
  return request({
    url: `/user/checkMobileTrue/${mobile}`,
    method: 'get'
  })
}

// forgotPassword 找回密码
export function resetPassword(data) {
  return request({
    url:'/user/resetPassword',
    method: "post",
    data
  })
}

// 根据token获取用户信息
export function getData() {
  return request({
    url: '/user/getData',
    method: 'get',
  })
}

// MyHeader 是否显示 申请为机构 超链接
export function getHeaderOrganization() {
  return request({
    url: '/user/getHeaderOrganization',
    method: 'get',
  })
}

// 检测用户是否填写身份证号
export function checkUserIdcard() {
  return request({
    url: '/user/checkUserIdcard',
    method: 'get',
  })
}

// user 个人中心
export function getUserData() {
  return request({
    url: '/user/getUserData',
    method: 'get',
  })
}

// user 确认修改个人资料
export function updateUserData(data) {
  return request({
    url: '/user/updateUserData',
    method: 'put',
    data
  })
}

// userVerification 实名认证
export function getUserReal() {
  return request({
    url: '/user/getUserReal',
    method: 'get',
  })
}

// userVerification 提交认证
export function createVerification(data) {
  return request({
    url: '/user/createVerification',
    method: 'put',
    data
  })
}

// hading 更新头像
export function updateHeading(id, newHeading) {
  return request({
    url: '/user/updateHeading',
    method: 'post',
    data: {
      id,
      newHeading
    }
  })
}

// password  修改密码
export function updateUserPwd(data) {
  return request({
    url: '/user/updateUserPwd',
    method: 'put',
    data
  })
}

// mobile 检验原手机号是否正确
export function checkOldMobile(mobile) {
  return request({
    url: `/user/checkOldMobile/${mobile}`,
    method: 'get'
  })
}

// mobile 确认修改账号
export function updateUserMobile(data) {
  return request({
    url: '/user/updateUserMobile',
    method: 'put',
    data
  })
}

// address 地址管理
export function getAddress(page, limit, searchParams) {
  return request({
    url: `/user/getAddress/${page}/${limit}/`,
    method: 'get',
    params: searchParams
  })
}

// address 编辑地址
export function getOneAddress(id) {
  return request({
    url: '/user/getOneAddress',
    method: 'get',
    params: {
      id
    }
  })
}

// address 修改地址
export function updateAddress(data) {
  return request({
    url: '/user/updateAddress',
    method: 'put',
    data
  })
}

// address 删除地址
export function deleteAddress(id) {
  return request({
    url: `/user/deleteAddress/${id}`,
    method: 'delete',
  })
}

// address 设置默认地址
export function updateDefault(data) {
  return request({
    url: '/user/updateDefault/',
    method: 'put',
    data
  })
}

// address 新增地址
export function createAddress(data) {
  return request({
    url: '/user/createAddress',
    method: 'post',
    data
  })
}

// 提交领养申请
export function createAdoption(data) {
  return request({
    url: '/user/createAdoption',
    method: 'post',
    data
  })
}

// userAdoption 领养申请表
export function getAdoption(page, limit, searchParams) {
  return request({
    url: `/user/getAdoption/${page}/${limit}/`,
    method: 'get',
    params: searchParams
  })
}

// userAdoption 查看领养申请表
export function getOneAdoption(id) {
  return request({
    url: '/user/getOneAdoption',
    method: 'get',
    params: {
      id
    }
  })
}

// userAdoption 取消领养申请表
export function cancelAdoption(id) {
  return request({
    url: `/user/cancelAdoption/${id}`,
    method: 'put',
  })
}

// order 提交订单的宠物信息
export function getOrderPet(queryParams) {
  return request({
    url: '/user/getOrderPet',
    method: 'get',
    params: queryParams
  })
}

// order 提交订单的地址信息
export function getOrderAddress() {
  return request({
    url: '/user/getOrderAddress',
    method: 'get',
  })
}

// order 提交订单时查找该订单是否已经生成
export function selectOrder(id) {
  return request({
    url: '/user/selectOrder',
    method: 'get',
    params: {
      id
    }
  })
}

// order 提交订单
export function createOrder(data) {
  return request({
    url: '/user/createOrder',
    method: 'post',
    data
  })
}

// userOrder 支付订单
export function payOrder(id) {
  return request({
    url: `/user/payOrder/${id}`,
    method: 'put',
  })
}

// userOrder 用户订单
export function getOrder(page, limit, searchParams) {
  return request({
    url: `/user/getOrder/${page}/${limit}/`,
    method: 'get',
    params: searchParams
  })
}

// userOrder 查看用户订单
export function getOneOrder(id) {
  return request({
    url: '/user/getOneOrder',
    method: 'get',
    params: {
      id
    }
  })
}

// userOrder 取消订单
export function cancelOrder(id) {
  return request({
    url: `/user/cancelOrder/${id}`,
    method: 'put',
  })
}

// userOrder 确认收货
export function confirmOrder(id) {
  return request({
    url: `/user/confirmOrder/${id}`,
    method: 'put',
  })
}

// userOrder 发布宠物回访
export function createRevisit(data) {
  return request({
    url: '/user/createRevisit',
    method: 'post',
    data
  })
}

// 提交机构申请表
export function createOrganization(data) {
  return request({
    url: '/user/createOrganization',
    method: 'post',
    data
  })
}

// userApplication 机构申请表
export function getOrganization(page, limit, searchParams) {
  return request({
    url: `/user/getOrganization/${page}/${limit}/`,
    method: 'get',
    params: searchParams
  })
}

// userApplication 查看机构申请表
export function getOneOrganization(id) {
  return request({
    url: '/user/getOneOrganization',
    method: 'get',
    params: {
      id
    }
  })
}

// userApplication 取消申请
export function cancelOrganization(id) {
  return request({
    url: `/user/cancelOrganization/${id}`,
    method: 'put',
  })
}
