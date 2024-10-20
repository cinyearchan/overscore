export function create(prototype) {
  //临时构造函数
  var F = function () {}
  F.prototype = prototype
  return new F()
}

export function setPrototypeOf(C, P, force) {
  // 静态属性继承，慎用，有坑
  if (Object.setPrototypeOf) {
    // setPrototypeOf es6
    Object.setPrototypeOf(C, P)
  } else if (C.__proto__) {
    // __proto__ es6引入，但是部分浏览器早已支持
    C.__proto__ = P
  } else if (force) {
    // 兼容ie10-等陈旧浏览器
    // 将P上的静态属性和方法拷贝一份到C上，不会覆盖C上的方法
    for (var k in P) {
      // eslint-disable-next-line no-prototype-builtins
      if (P.hasOwnProperty(k) && !(k in C)) {
        C[k] = P[k]
      }
    }
  }
}
