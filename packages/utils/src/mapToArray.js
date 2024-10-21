/**
 * 将map字典对象转化为List
 * @param {Object} map Map对象
 * @param {String} [key = name] 键名
 * @param {String} [val = value] 键值
 * @returns {Array<Object>} 返回数组
 */
export function mapToArray(map, key = 'name', val = 'value') {
  let res = []
  for (let k in map) {
    var temp = Object.create(null)
    temp[key] = k
    temp[val] = map[k]
    res.push(temp)
  }
  return res
}
