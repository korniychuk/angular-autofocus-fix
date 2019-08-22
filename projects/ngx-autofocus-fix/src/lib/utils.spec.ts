import { normalizeBoolean } from './utils';

describe('Utils -> normalizeBoolean()', () => {

  describe('SCENARIO: .smartEmptyCheck === false', () => {
    describe('GIVEN: Should be false', () => {
      it('false', () => {
        expect(normalizeBoolean(false)).toBe(false);
      });
      it('null', () => {
        expect(normalizeBoolean(null)).toBe(false);
      });
      it('undefined', () => {
        expect(normalizeBoolean(undefined)).toBe(false);
      });
      it('0', () => {
        expect(normalizeBoolean(0)).toBe(false);
      });

      it(`'false'`, () => {
        expect(normalizeBoolean('false')).toBe(false);
      });
      it(`'null'`, () => {
        expect(normalizeBoolean('null')).toBe(false);
      });
      it(`'undefined'`, () => {
        expect(normalizeBoolean('undefined')).toBe(false);
      });
      it(`'0'`, () => {
        expect(normalizeBoolean('0')).toBe(false);
      });

      it('NaN', () => {
        expect(normalizeBoolean(NaN)).toBe(false);
      });
      it(`'NaN'`, () => {
        expect(normalizeBoolean('NaN')).toBe(false);
      });
    });

    describe('GIVEN: Should be true', () => {
      it(`'a string'`, () => {
        expect(normalizeBoolean('a string')).toBe(true);
      });
      it(`''`, () => {
        expect(normalizeBoolean('')).toBe(true);
      });
      it('[]', () => {
        expect(normalizeBoolean([])).toBe(true);
      });
      it('{}', () => {
        expect(normalizeBoolean({})).toBe(true);
      });
    });
  }); // end :: SCENARIO: .smartEmptyCheck === false

  describe('SCENARIO: .smartEmptyCheck === true', () => {
    describe('GIVEN: Should be false', () => {
      it('false', () => {
        expect(normalizeBoolean(false, true)).toBe(false);
      });
      it('null', () => {
        expect(normalizeBoolean(null, true)).toBe(false);
      });
      it('undefined', () => {
        expect(normalizeBoolean(undefined, true)).toBe(false);
      });
      it('0', () => {
        expect(normalizeBoolean(0, true)).toBe(false);
      });

      it(`'false'`, () => {
        expect(normalizeBoolean('false', true)).toBe(false);
      });
      it(`'null'`, () => {
        expect(normalizeBoolean('null', true)).toBe(false);
      });
      it(`'undefined'`, () => {
        expect(normalizeBoolean('undefined', true)).toBe(false);
      });
      it(`'0'`, () => {
        expect(normalizeBoolean('0', true)).toBe(false);
      });

      it('NaN', () => {
        expect(normalizeBoolean(NaN, true)).toBe(false);
      });
      it(`'NaN'`, () => {
        expect(normalizeBoolean('NaN', true)).toBe(false);
      });

      it(`''`, () => {
        expect(normalizeBoolean('', true)).toBe(false);
      });
      it('[]', () => {
        expect(normalizeBoolean([], true)).toBe(false);
      });
      it('{}', () => {
        expect(normalizeBoolean({}, true)).toBe(false);
      });
    });

    describe('GIVEN: Should be true', () => {
      it(`'a string'`, () => {
        expect(normalizeBoolean('a string', true)).toBe(true);
      });
      it('[1]', () => {
        expect(normalizeBoolean([1], true)).toBe(true);
      });
      it('{ a: 1 }', () => {
        expect(normalizeBoolean({ a: 1 }, true)).toBe(true);
      });
    });
  }); // end :: SCENARIO: .smartEmptyCheck === false

});
