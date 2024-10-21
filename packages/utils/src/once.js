/**
 * 单次执行函数，页面加载后只能执行一次
 * @param method {Function} 传入的函数
 * @returns {Function} 返回函数
 */
export function once(method) {
  let done = false
  return function () {
    return done ? undefined : ((done = true), method.apply(this, arguments))
  }
}
