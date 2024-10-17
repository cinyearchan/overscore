var expect = require('expect.js')
var sinon = require('sinon')

var isEqual = require('@overscore/equal').isEqual
var compose = require('@overscore/equal').compose
var functionMiddleware = require('@overscore/equal').functionMiddleware
var isEqualJSON = require('@overscore/equal').isEqualJSON

// item.r is return for isEqual
// item.rj is for isEqualJSON
var basicList = [
  { a: undefined, b: undefined, r: true },
  { a: null, b: null, r: true },
  { a: undefined, b: null, r: false },
  { a: 1, b: 1, r: true },
  { a: 1, b: 2, r: false },
  { a: 'aaa', b: 'aaa', r: true },
  { a: 'aaa', b: 'bbb', r: false },
  { a: true, b: true, r: true },
  { a: true, b: false, r: false },
  { a: +0, b: -0, r: false, rj: true },
  { a: /^jsmini$/, b: /^jsmini$/, r: true },
  { a: /^jsmini$/g, b: /^jsmini$/, r: false, rj: true },
  { a: /^jsmini$/, b: /^jsmini/, r: false, rj: true },
]

var pkgList = [
  { a: new Boolean(true), b: new Boolean(true), r: true },
  { a: new Boolean(true), b: new Boolean(false), r: false },
  { a: new Number(1), b: new Number(1), r: true },
  { a: new Number(1), b: new Number(2), r: false },
  { a: new String('1'), b: new String('1'), r: true },
  { a: new String('1'), b: new String('2'), r: false },
  { a: new RegExp('^jsmini$'), b: new RegExp('^jsmini$'), r: true },
  {
    a: new RegExp('^jsmini$', 'g'),
    b: new RegExp('^jsmini'),
    r: false,
    rj: true,
  },
  { a: new RegExp('^jsmini$'), b: new RegExp('^jsmini'), r: false, rj: true },
  { a: new Date(), b: new Date(), r: true },
]

if (typeof Set === 'function') {
  var setList = [
    { a: new Set([1, 2]), b: new Set([1, 2]), r: true },
    { a: new Set([1, 2]), b: new Set([1, 3]), r: false, rj: true },
  ]
}

if (typeof Map === 'function') {
  var mapList = [
    {
      a: new Map([
        ['a', '1'],
        ['b', '2'],
      ]),
      b: new Map([
        ['a', '1'],
        ['b', '2'],
      ]),
      r: true,
    },
    {
      a: new Map([
        ['a', '1'],
        ['b', '2'],
      ]),
      b: new Map([
        ['a', '1'],
        ['b', '3'],
      ]),
      r: false,
      rj: true,
    },
  ]
}

var complexList = [
  { a: [1, 2, 3], b: [1, 2, 3], r: true },
  { a: [1, 2, 3], b: [1, 2, 1], r: false },
  { a: [1, [2, [3]]], b: [1, [2, [3]]], r: true },
  { a: { a: 1, b: 2 }, b: { a: 1, b: 2 }, r: true },
  { a: { a: 1, b: 2 }, b: { a: 1, b: 1 }, r: false },
  { a: { a: { b: { c: 1 } } }, b: { a: { b: { c: 1 } } }, r: true },
]

describe('单元测试', function () {
  this.timeout(10000)

  describe('isEqual', function () {
    it('normal', function () {
      basicList.forEach(function (item) {
        expect(isEqual(item.a, item.b)).to.equal(item.r)
      })

      pkgList.forEach(function (item) {
        expect(isEqual(item.a, item.b)).to.equal(item.r)
      })

      complexList.forEach(function (item) {
        expect(isEqual(item.a, item.b)).to.equal(item.r)
      })

      if (typeof Set === 'function') {
        setList.forEach(function (item) {
          expect(isEqual(item.a, item.b)).to.equal(item.r)
        })
      }

      if (typeof Map === 'function') {
        mapList.forEach(function (item) {
          expect(isEqual(item.a, item.b)).to.equal(item.r)
        })
      }
    })

    it('compare', function () {
      // istanbul 会向空函数中注入代码用于计算代码覆盖率，从而导致 toString() 方法得到错误的结果
      var stubFunction1 = sinon.stub()
      var stubFunction2 = sinon.stub()

      var a = {
        a: stubFunction1,
      }
      var b = {
        a: stubFunction2,
      }

      expect(isEqual(a, b)).to.equal(false)
      expect(
        isEqual(a, b, function (o, v, next) {
          if (typeof o === 'function' && typeof v === 'function') {
            return o.toString() === v.toString()
          }

          return next()
        }),
      ).to.equal(true)
    })

    it('functionMiddleware', function () {
      // istanbul 会向空函数中注入代码用于计算代码覆盖率，从而导致 toString() 方法得到错误的结果
      var stubFunction1 = sinon.stub()
      var stubFunction2 = sinon.stub()
      var a = {
        a: stubFunction1,
      }
      var b = {
        a: stubFunction2,
      }

      expect(isEqual(a, b)).to.equal(false)
      expect(isEqual(a, b, functionMiddleware())).to.equal(true)
      expect(isEqual(a, b, compose(functionMiddleware()))).to.equal(true)
    })
  })

  describe('isEqualJSON', function () {
    it('normal', function () {
      basicList.forEach(function (item) {
        expect(isEqualJSON(item.a, item.b)).to.equal(item.rj || item.r)
      })

      pkgList.forEach(function (item) {
        expect(isEqualJSON(item.a, item.b)).to.equal(item.rj || item.r)
      })

      complexList.forEach(function (item) {
        expect(isEqualJSON(item.a, item.b)).to.equal(item.rj || item.r)
      })

      if (typeof Set === 'function') {
        setList.forEach(function (item) {
          expect(isEqualJSON(item.a, item.b)).to.equal(item.rj || item.r)
        })
      }

      if (typeof Map === 'function') {
        mapList.forEach(function (item) {
          expect(isEqualJSON(item.a, item.b)).to.equal(item.rj || item.r)
        })
      }
    })

    it('replacer', function () {
      var a = {
        a: function a() {
          console.log()
        },
      }
      var b = {
        a: function b() {
          console.log()
        },
      }

      expect(isEqualJSON(a, b)).to.equal(true)
      expect(
        isEqualJSON(a, b, function (k, v) {
          if (typeof v === 'function') {
            return v.toString()
          }

          return v
        }),
      ).to.equal(false)
    })
  })
})
