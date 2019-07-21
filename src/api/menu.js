import request from '@/utils/request'

export function getMenus(id, params) {
  return request({
    url: `admin/get-restaurant/${id}/single-menu-item-list`,
    method: 'get',
    params
  })
}

export function createSingleMenu(data) {
  return request({
    url: `admin/create-single-menu-item`,
    method: 'post',
    data
  })
}

export function updateSingleMenu(id, data) {
  return request({
    url: `/admin/update-restaurant/${id}/single-menu-item`,
    method: 'post',
    data
  })
}


export function getDishTypeList() {
  return request({
    url: '/user/get-all-dish-type',
    method: 'get'
  })
}

export function getTasteList() {
  return request({
    url: '/user/get-all-taste',
    method: 'get'
  })
}
