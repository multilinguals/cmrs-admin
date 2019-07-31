import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sign-in-with-password',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/get-self-details',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getUsers(params) {
  return request({
    url: '/get-user-list',
    method: 'get',
    params
  })
}

export function createClerk(data) {
  return request({
    url: '/create-clerk',
    method: 'post',
    data
  })
}

export function updateUser(id, data) {
  return request({
    url: `/update-details-of-user/${id}`,
    method: 'post',
    data
  })
}

export function updateUserPassword(data) {
  return request({
    url: '/update-user-password',
    method: 'post',
    data
  })
}

export function updatePassword(data) {
  return request({
    url: '/update-self-password',
    method: 'post',
    data
  })
}

export function assignRole(userId, data) {
  return request({
    url: `/set-roles-to-user/${userId}`,
    method: 'post',
    data
  })
}
