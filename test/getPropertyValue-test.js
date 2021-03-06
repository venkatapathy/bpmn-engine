'use strict';

const Code = require('code');
const Lab = require('lab');

const lab = exports.lab = Lab.script();
const expect = Code.expect;

const getPropertyValue = require('../lib/getPropertyValue');

lab.experiment('getPropertyValue', () => {
  lab.describe('property path', () => {
    lab.test('returns object value', (done) => {
      expect(getPropertyValue({
        a: {
          b: [1]
        }
      }, 'a.b[0]')).to.equal(1);
      done();
    });

    lab.test('returns undefined if value is not found', (done) => {
      expect(getPropertyValue({
        a: {
          b: [1]
        }
      }, 'a.b[1]')).to.be.undefined();
      done();
    });

    lab.test('returns undefined if source is null', (done) => {
      expect(getPropertyValue(null, 'a.b[1]')).to.be.undefined();
      done();
    });

    lab.test('returns length of array', (done) => {
      expect(getPropertyValue({
        a: {
          b: [1]
        }
      }, 'a.b.length')).to.equal(1);
      done();
    });

    lab.test('returns named property value', (done) => {
      expect(getPropertyValue({
        a: {
          'b-c': 1
        }
      }, 'a[b-c]')).to.equal(1);
      done();
    });

    lab.test('path beginning with named property returns value', (done) => {
      expect(getPropertyValue({
        'a-c': {
          b: 1
        }
      }, '[a-c].b')).to.equal(1);
      done();
    });
  });

  lab.describe('array', () => {
    lab.test('returns value at index', (done) => {
      expect(getPropertyValue({
        a: {
          b: [1, 2, 3]
        }
      }, 'a.b[2]')).to.equal(3);
      expect(getPropertyValue([1, 2, 3], '[2]')).to.equal(3);
      done();
    });

    lab.test('returns length', (done) => {
      expect(getPropertyValue({
        a: {
          b: [1, 2, 3]
        }
      }, 'a.b.length')).to.be.equal(3);
      done();
    });

    lab.test('returns named value', (done) => {
      const list = [1, 2, 3];
      list.arb = 10;
      expect(getPropertyValue({
        a: {
          b: list
        }
      }, 'a.b.arb')).to.be.equal(10);
      done();
    });

    lab.test('returns undefined if out of bounds', (done) => {
      expect(getPropertyValue({
        a: {
          b: [1, 2, 3]
        }
      }, 'a.b[4]')).to.be.undefined();
      done();
    });

    lab.test('returns from last if negative index', (done) => {
      expect(getPropertyValue({
        a: {
          b: [1, 2, 3]
        }
      }, 'a.b[-1]')).to.equal(3);
      expect(getPropertyValue({
        a: {
          b: [1, 2, 3]
        }
      }, 'a.b[-2]')).to.equal(2);
      expect(getPropertyValue({
        a: {
          b: [1, 2, 3]
        }
      }, 'a.b[-3]')).to.equal(1);
      done();
    });

    lab.test('-0 returns first item', (done) => {
      expect(getPropertyValue({
        a: {
          b: [1, 2, 3]
        }
      }, 'a.b[-0]')).to.equal(1);
      done();
    });

    lab.test('returns undefined value if negative index is out of bounds', (done) => {
      expect(getPropertyValue({
        a: {
          b: [1, 2, 3]
        }
      }, 'a.b[-4]')).to.be.undefined();
      done();
    });

    lab.test('returns undefined value if negative index has trailing spaces', (done) => {
      expect(getPropertyValue({
        a: {
          b: [1, 2, 3]
        }
      }, 'a.b[-1 ]')).to.be.undefined();
      done();
    });

    lab.test('returns undefined value if negative index has preceding spaces', (done) => {
      expect(getPropertyValue({
        a: {
          b: [1, 2, 3]
        }
      }, 'a.b[ -1]')).to.be.undefined();
      done();
    });

    lab.test('returns undefined value if negative index has any spaces', (done) => {
      expect(getPropertyValue({
        a: {
          b: [1, 2, 3]
        }
      }, 'a.b[- 1]')).to.be.undefined();
      done();
    });
  });

  lab.describe('default value', () => {
    lab.test('undefined returns default value', (done) => {
      expect(getPropertyValue(undefined, 'input', 1)).to.equal(1);
      done();
    });
  });
});
