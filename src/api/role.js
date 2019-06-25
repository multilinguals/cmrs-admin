import request from '@/utils/request'

export function getRoles(params) {
  return request({
    url: '/admin/get-role-list',
    method: 'get',
    params
  })
}

export function createRole(data) {
  return request({
    url: '/admin/create-user',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/admin/create-user',
    method: 'put',
    data
  })
}
