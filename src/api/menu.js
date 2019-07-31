import request from '@/utils/request'

export function getSingleMenus(id, params) {
  return request({
    url: `/get-restaurant/${id}/single-menu-item-list`,
    method: 'get',
    params
  })
}

export function getAllSingleMenus(id) {
  return request({
    url: `/get-restaurant/${id}/all-single-menu-items`,
    method: 'get'
  })
}

export function createSingleMenu(data) {
  return request({
    url: `/create-single-menu-item`,
    method: 'post',
    data
  })
}

export function updateSingleMenu(restId, id, data) {
  return request({
    url: `/update-restaurant/${restId}/single-menu-item/${id}`,
    method: 'post',
    data
  })
}

export function getSetMenus(id, params) {
  return request({
    url: `/get-restaurant/${id}/set-menu-item-list`,
    method: 'get',
    params
  })
}

export function createSetMenu(data) {
  return request({
    url: `/create-set-menu-item`,
    method: 'post',
    data
  })
}

export function updateSetMenu(id, data) {
  return request({
    url: `/update-restaurant/${id}/set-menu-item`,
    method: 'post',
    data
  })
}

export function getDishTypeList() {
  return request({
    url: '/get-all-dish-type',
    method: 'get'
  })
}

export function getTasteList() {
  return request({
    url: '/get-all-taste',
    method: 'get'
  })
}

export function deleteSingleMenuItem(id, restId) {
  return request({
    url: `/delete-single-menu-item/${id}/of-restaurant/${restId}`,
    method: 'post'
  })
}

export function deleteSetMenuItem(id, restId) {
  return request({
    url: `/delete-set-menu-item/${id}/of-restaurant/${restId}`,
    method: 'post'
  })
}

