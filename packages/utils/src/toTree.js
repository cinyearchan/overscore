/**
 * 将List结构的对象数组转化为树形结构
 * @param data {Array<object>} 源数据
 * @param parentIdKey {string} 关联节点名称
 * @param idKey {string} 主键
 * @returns {Array<object>} 返回的树形结构数据
 */
export function toTree(data, parentIdKey, idKey = 'id') {
  let _idMap = Object.create(null)

  data.forEach((row) => {
    _idMap[row[idKey]] = row
  })
  const result = []

  data.forEach((row) => {
    let parent = _idMap[row[parentIdKey]]
    if (parent) {
      let v = parent.children || (parent.children = [])
      v.push(row)
    } else {
      result.push(row)
    }
  })
  return result
}
