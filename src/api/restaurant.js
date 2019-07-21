import request from '@/utils/request'

export function getRestaurants(params) {
  return request({
    url: '/admin/get-restaurant-list',
    method: 'get',
    params
  })
}

export function createRestaurant(data) {
  return request({
    url: '/admin/create-restaurant',
    method: 'post',
    data
  })
}

export function updateRestaurant(data) {
  return request({
    url: '/admin/create-user',
    method: 'put',
    data
  })
}

export function getRestaurant(id) {
  return request({
    url: `/admin/get-restaurant-details/${id}`,
    method: 'get'
  })
}
