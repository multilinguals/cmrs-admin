/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function validPassword(value) {
  if(value.length < 6) {
    throw new Error('密码长度不得小于6位')
  }
  if(0 > value.search(/(?!^\d+$)(?!^[A-Za-z]+$)(?!^_+$)^\w{6,}$/)) {
    throw new Error('密码至少包含数字、字母和特殊字符中的任意两种')
  }
}
