import { describe, it, expect } from 'vitest'
import * as base from '@overscore/pubsub'

describe('单元测试', function () {
  describe('触发订阅', () => {
    it('相等', () => {
      base.sub('hello', (str) => {
        expect(str).to.equal('test')
      })
      base.pub('hello', 'test')
    })
  })

  describe('取消/订阅', () => {
    const flag = { num: 0 }
    const cb = (flag) => {
      flag.num++
    }

    it('正确订阅', () => {
      base.sub('test', cb)
      base.pub('test', flag)
      expect(flag.num).to.equal(1)
    })

    it('取消订阅', () => {
      base.unsub('test', cb)
      base.pub('test', flag)
      expect(flag.num).to.equal(1)
    })
  })

  describe('构造函数测试', () => {
    const foo = new base.PubSub()
    it('实例构造检测', () => {
      expect(foo.pub).to.equal(foo.publish)
      expect(foo.unsub).to.equal(foo.unsubscribe)
      expect(foo.sub).to.equal(foo.subscribe)
      expect(foo.ec).to.be.an('object')
    })
  })
}, 1000)
