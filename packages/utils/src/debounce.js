/**
 * 防抖函数
 * @param method {Function}  事件触发的操作，传入的函数
 * @param delay {Number} - [delay = 500]  多少毫秒内连续触发事件，不会执行
 * @returns {Function}  返回包装之后的函数
 */
export function debounce(method, delay = 500) {
  let timer = null
  return function () {
    let self = this
    let args = arguments
    timer && clearTimeout(timer)
    timer = setTimeout(function () {
      method.apply(self, args)
    }, delay)
  }
}
