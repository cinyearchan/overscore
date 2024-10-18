import { describe, it, expect } from 'vitest'
import { Guid, guid, uuid } from '@overscore/guid'

describe('单元测试', () => {
  describe('Guid', () => {
    it('normal', () => {
      const g1 = new Guid()
      const g2 = new Guid(10)

      expect(g1.guid()).to.equal('0')
      expect(g1.guid()).to.equal('1')
      expect(g2.guid()).to.equal('10')
      expect(g2.guid()).to.equal('11')
    })
  })

  describe('guid', () => {
    it('无参数', () => {
      expect(guid()).to.equal('0')
      expect(guid()).to.equal('1')
      expect(guid()).to.equal('2')
      expect(guid()).to.equal('3')
      expect(guid()).to.equal('4')
    })

    it('有参数', () => {
      expect(guid('a')).to.equal('a5')
      expect(guid('a')).to.equal('a6')
      expect(guid('b')).to.equal('b7')
      expect(guid('c')).to.equal('c8')
      expect(guid('d')).to.equal('d9')
    })

    it('多次不相等测试', () => {
      let i = 1000
      while (i--) {
        expect(guid()).not.to.equal(guid())
      }
    })
  })

  describe('uuid', () => {
    it('类型测试', () => {
      const id = uuid()
      expect(typeof id).to.equal('string')
    })

    it('格式测试', () => {
      const id = uuid()
      expect(
        /^[0-9A-Z]{8}-[0-9A-Z]{4}-4[0-9A-Z]{3}-[0-9A-Z]{4}-[0-9A-Z]{12}$/.test(
          id,
        ),
      ).to.equal(true)
    })

    it('多次不相等测试', () => {
      let i = 20
      while (i--) {
        expect(uuid()).not.to.equal(uuid())
      }
    })
  })
}, 1000)
