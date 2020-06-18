import request from '@/utils/request'

// Home 首页 轮播图
export function getCarousel() {
  return request({
    url: '/front/getCarousel',
    method: 'get'
  })
}

// Home 首页 萌宠图集
export function getIndexPicture() {
  return request({
    url: '/front/getIndexPicture',
    method: 'get'
  })
}

// Home 首页 萌宠图集 更多
export function getMorePicture(page, limit) {
  return request({
    url: `/front/getMorePicture/${page}/${limit}/`,
    method: 'get'
  })
}

// Home 首页 宠物狗/猫
export function getIndexPet(classification) {
  return request({
    url: `/front/getIndexPet/${classification}`,
    method: 'get',
  })
}

// category 宠物 待领养
export function getNotAdopted(page, limit, data) {
  return request({
    url: `/front/getNotAdopted/${page}/${limit}/`,
    method: 'get',
    params: data
  })
}

// category 宠物 已领养
export function getAdopted(page, limit, data) {
  return request({
    url: `/front/getAdopted/${page}/${limit}/`,
    method: 'get',
    params: data
  })
}

// detail 宠物详情
export function getPetDetail(data) {
  return request({
    url: '/front/getPetDetail',
    method: 'get',
    params: data
  })
}

// detail 宠物回访
export function getRevisit(data) {
  return request({
    url: '/front/getRevisit',
    method: 'get',
    params: data
  })
}

// Home 首页 系统公告
export function getNotice() {
  return request({
    url: '/front/getNotice',
    method: 'get'
  })
}

// Home 首页 某个系统公告
export function getNoticeDetail(data) {
  return request({
    url: '/front/getNoticeDetail',
    method: 'get',
    params: data
  })
}

// Home 首页 宠物机构
export function getOrganization() {
  return request({
    url: '/front/getOrganization',
    method: 'get'
  })
}

// search 热词
export function searchHotCategory() {
  return request({
    url: '/front/searchHotCategory',
    method: 'get',
  })
}

// search 关键字查询
export function searchCategoryList(page, limit, queryParams) {
  return request({
    url: `/front/searchCategoryList/${page}/${limit}/`,
    method: 'get',
    params: queryParams
  })
}

// 省份选择器
export function getProvinceList() {
  return request({
    url: '/front/getProvinceList',
    method: 'get'
  })
}

// 市选择器
export function getCityList(code) {
  return request({
    url: '/front/getCityList',
    method: 'get',
    params: {
      code
    }
  })
}

// address 市选择器
export function getCityList2(name) {
  return request({
    url: '/front/getCityList2',
    method: 'get',
    params: {
      name
    }
  })
}
