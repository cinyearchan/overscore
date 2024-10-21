/**
 * 将数组转化为字典对象类型
 * @param {Array} array 数据
 * @param {String} [key = name] 键名
 * @param {String} [val = value] 键值
 * @returns {Object} 返回map对象字典
 */
export function arrayToMap(array, key = 'name', val = 'value') {
  var res = Object.create(null) // 新建一个纯粹对象

  array.forEach((row) => {
    res[row[key]] = row[val]
  })
  return res
}
