import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/sign-in-with-password',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/get-self-details',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUsers() {
  return request({
    url: '/admin/get-user-list',
    method: 'get'
  })
}

export function createUser(data) {
  return request({
    url: '/admin/create-user',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/admin/create-user',
    method: 'put',
    data
  })
}
