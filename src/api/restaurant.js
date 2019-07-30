import request from '@/utils/request'

export function getRestaurants(params) {
  return request({
    url: '/get-restaurant-list',
    method: 'get',
    params
  })
}

export function createRestaurant(data) {
  return request({
    url: '/create-restaurant',
    method: 'post',
    data
  })
}

export function updateRestaurant(data) {
  return request({
    url: '/create-user',
    method: 'put',
    data
  })
}

export function getRestaurant(id) {
  return request({
    url: `/get-details-of-restaurant/${id}`,
    method: 'get'
  })
}
