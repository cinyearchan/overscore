/**
 * @class Cookies
 */
export class Cookies {
  constructor() {}

  /*设置cookie*/
  /**
   * @param {string} name: cookie的key值
   * @param {any} value: 保存的cookie值
   * @param {number} day: 过期天数
   * @memberof Cookies
   */
  setCookie(name, value, day) {
    console.log('setting' + value) // 修改为 value
    if (Object.prototype.toString.call(value).slice(8, -1) === 'Object') {
      for (let i in value) {
        const oDate = new Date()
        oDate.setDate(oDate.getDate() + day)
        document.cookie = i + '=' + value[i] + ';expires=' + oDate.toUTCString() // 添加 toUTCString() 方法
      }
    } else {
      const oDate = new Date()
      oDate.setDate(oDate.getDate() + day)
      document.cookie = name + '=' + value + ';expires=' + oDate.toUTCString() // 添加 toUTCString() 方法
    }
  }

  /*获取cookie*/
  getCookie(name) {
    var arr = document.cookie.split('; ')
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('=')
      if (arr2[0] === name) {
        return arr2[1]
      }
    }
    return ''
  }

  /*删除cookie*/
  removeCookie(name) {
    this.setCookie(name, '', -1) // 修改为 '' 以确保删除 cookie
  }
}
