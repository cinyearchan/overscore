import { type } from './type'

export function getAnypath(obj, paths) {
  if (type(paths) !== 'array' || !paths.length) {
    return undefined
  }
  let parent = obj
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i]
    const t = type(parent)
    if (t === 'object' || t === 'array') {
      parent = parent[path.key]
    } else if (t === 'map') {
      parent = parent.get(path.key)
    } else {
      return undefined
    }
  }
  return parent
}

function getDefaultValue(path) {
  if (path.defaultValue) {
    return path.defaultValue()
  }
  if (path.type === 'array') {
    return []
  }
  if (path.type === 'map') {
    return new Map()
  }

  return {}
}
export function setAnypath(obj, paths, value) {
  if (type(paths) !== 'array' || !paths.length) {
    return false
  }
  let parent = obj
  // 获取容器元素

  for (let i = 0; i < paths.length - 1; i++) {
    const path = paths[i]
    const t = type(parent)
    if (t === 'object' || t === 'array') {
      // undefined | null
      // eslint-disable-next-line eqeqeq
      if (parent[path.key] != null) {
        parent = parent[path.key]
      } else {
        parent[path.key] = getDefaultValue(path)
        parent = parent[path.key]
      }
    } else if (t === 'map') {
      // undefined | null
      // eslint-disable-next-line eqeqeq
      if (parent.get(path.key) != null) {
        parent = parent.get(path.key)
      } else {
        parent.set(path.key, getDefaultValue(path))
        parent = parent.get(path.key)
      }
    } else {
      return false
    }
  }

  // 目标节点设置值
  const t = type(parent)
  const path = paths[paths.length - 1]
  if (t === 'object' || t === 'array') {
    parent[path.key] = value
  } else if (t === 'map') {
    parent.set(path.key, value)
  } else {
    return false
  }

  return true
}

function parseKeys(keys) {
  if (typeof keys !== 'string' && typeof keys !== 'number') {
    return []
  }
  // keys = 'a.0[].c:map.e'
  const paths = String(keys)
    .split('.')
    .map((item) => {
      if (item.indexOf('[]') !== -1) {
        // [] 语法
        return {
          key: item.replace('[]', ''),
          type: 'array',
        }
      } else if (item.indexOf(':') !== -1) {
        // : 语法
        const arr = item.split(':')
        return {
          key: arr[0],
          type: arr[1],
        }
      } else {
        // object
        return {
          key: item,
          type: 'object',
        }
      }
    })

  return paths
}

export function get(obj, keys) {
  return getAnypath(obj, parseKeys(keys))
}
export function set(obj, keys, value) {
  const paths = parseKeys(keys)
  if (!paths.length) {
    return false
  }
  return setAnypath(obj, paths, value)
}
