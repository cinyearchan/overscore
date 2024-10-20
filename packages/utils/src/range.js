const CHARTER =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

function rangeNumber(start, stop, step) {
  start = isNaN(+start) ? 0 : +start
  stop = isNaN(+stop) ? 1 : +stop
  step = isNaN(+step) || +step === 0 ? 1 : +step
  // 保证step正确
  if (start > stop && step > 0) {
    step = -step
  }

  const arr = []
  const decimal = String(step).split('.')[1]
  const fixNum = decimal ? decimal.length : 0
  for (let i = start; start > stop ? i > stop : i < stop; i += step) {
    arr.push(Number(i.toFixed(fixNum)))
  }

  return arr
}
function rangeChar(start, stop, step) {
  // 非单个字符 a-z A-Z
  if (!(/^[a-zA-Z]$/.test(start) && /^[a-zA-Z]$/.test(stop))) {
    return []
  }
  step = Math.ceil(step)
  step = isNaN(step) || step === 0 ? 1 : step

  const arr = []
  start = CHARTER.indexOf(start)
  stop = CHARTER.indexOf(stop)
  // 保证step正确
  if (start > stop && step > 0) {
    step = -step
  }

  for (let i = start; start > stop ? i > stop : i < stop; i += step) {
    arr.push(CHARTER[i])
  }
  return arr
}
export function range(start, stop, step = 1) {
  const startType = typeof start

  if (startType === 'number' && !isNaN(start)) {
    // 只传递一个参数
    if (typeof stop === 'undefined') {
      stop = start
      start = 0
    }

    return rangeNumber(start, stop, step)
  }

  if (startType === 'string') {
    // ruby
    const res = start.match(/^(\w+)(\.{2,3})(\w+)$/)

    if (res) {
      step = Math.ceil(stop)
      start = res[1]
      stop = res[3]

      // 加一
      if (res[2] === '..') {
        const temp = +stop
        const index = CHARTER.indexOf(stop)
        stop = isNaN(temp) ? CHARTER[index + 1] : temp + 1
      }

      // 能否转为数字
      if (!isNaN(+start)) {
        return rangeNumber(start, stop, step)
      } else {
        return rangeChar(start, stop, step)
      }
    } else {
      if (typeof stop === 'undefined') {
        stop = start
        start = /[a-z]/.test(start) ? 'a' : 'A' // a A
      }
      return rangeChar(start, stop, step)
    }
  }

  return []
}
