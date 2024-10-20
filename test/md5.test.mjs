import { describe, it, expect } from 'vitest'
import { md5 } from '@overscore/utils/md5'

describe('单元测试', function () {
  describe('正确加密', function () {
    it('test: a', function () {
      expect(md5('a')).to.equal('0cc175b9c0f1b6a831c399e269772661')
    })
    it('test: _', function () {
      expect(md5('_')).to.equal('b14a7b8059d9c055954c92674ce60032')
    })
  })

  describe('错误处理', function () {
    it('test: 空值', function () {
      try {
        expect(md5())
      } catch (err) {
        expect(err.message).to.equal('Missing required parameters.')
      }
    })
  })
}, 1000)
