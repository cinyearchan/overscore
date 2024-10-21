/**
 * 节流函数
 * @param method {Function}  事件触发的操作，传入的函数
 * @param delay {Number} - [delay = 500]  间隔多少毫秒需要触发一次事件
 * @returns {Function}  返回包装之后的函数
 */
export function throttle(method, delay = 500) {
  let timer
  let args = arguments
  let start
  return function loop() {
    let self = this
    let now = Date.now()
    if (!start) {
      start = now
    }
    if (timer) {
      clearTimeout(timer)
    }
    if (now - start >= delay) {
      method.apply(self, args)
      start = now
    } else {
      timer = setTimeout(function () {
        loop.apply(self, args)
      }, 50)
    }
  }
}
