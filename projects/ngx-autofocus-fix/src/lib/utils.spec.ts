import { normalizeInputAsBoolean } from './utils';

describe('Utils -> normalizeInputAsBoolean()', () => {

  describe('SCENARIO: .smartEmptyCheck === false', () => {
    describe('GIVEN: Should be false', () => {
      it('false', () => {
        expect(normalizeInputAsBoolean(false)).toBe(false);
      });
      it('null', () => {
        expect(normalizeInputAsBoolean(null)).toBe(false);
      });
      it('undefined', () => {
        expect(normalizeInputAsBoolean(undefined)).toBe(false);
      });
      it('0', () => {
        expect(normalizeInputAsBoolean(0)).toBe(false);
      });

      it(`'false'`, () => {
        expect(normalizeInputAsBoolean('false')).toBe(false);
      });
      it(`'null'`, () => {
        expect(normalizeInputAsBoolean('null')).toBe(false);
      });
      it(`'undefined'`, () => {
        expect(normalizeInputAsBoolean('undefined')).toBe(false);
      });
      it(`'0'`, () => {
        expect(normalizeInputAsBoolean('0')).toBe(false);
      });

      it('NaN', () => {
        expect(normalizeInputAsBoolean(NaN)).toBe(false);
      });
      it(`'NaN'`, () => {
        expect(normalizeInputAsBoolean('NaN')).toBe(false);
      });
    });

    describe('GIVEN: Should be true', () => {
      it(`'a string'`, () => {
        expect(normalizeInputAsBoolean('a string')).toBe(true);
      });
      it(`''`, () => {
        expect(normalizeInputAsBoolean('')).toBe(true);
      });
      it('[]', () => {
        expect(normalizeInputAsBoolean([])).toBe(true);
      });
      it('{}', () => {
        expect(normalizeInputAsBoolean({})).toBe(true);
      });
    });
  }); // end :: SCENARIO: .smartEmptyCheck === false

  describe('SCENARIO: .smartEmptyCheck === true', () => {
    describe('GIVEN: Should be false', () => {
      it('false', () => {
        expect(normalizeInputAsBoolean(false, true)).toBe(false);
      });
      it('null', () => {
        expect(normalizeInputAsBoolean(null, true)).toBe(false);
      });
      it('undefined', () => {
        expect(normalizeInputAsBoolean(undefined, true)).toBe(false);
      });
      it('0', () => {
        expect(normalizeInputAsBoolean(0, true)).toBe(false);
      });

      it(`'false'`, () => {
        expect(normalizeInputAsBoolean('false', true)).toBe(false);
      });
      it(`'null'`, () => {
        expect(normalizeInputAsBoolean('null', true)).toBe(false);
      });
      it(`'undefined'`, () => {
        expect(normalizeInputAsBoolean('undefined', true)).toBe(false);
      });
      it(`'0'`, () => {
        expect(normalizeInputAsBoolean('0', true)).toBe(false);
      });

      it('NaN', () => {
        expect(normalizeInputAsBoolean(NaN, true)).toBe(false);
      });
      it(`'NaN'`, () => {
        expect(normalizeInputAsBoolean('NaN', true)).toBe(false);
      });

      it(`''`, () => {
        expect(normalizeInputAsBoolean('', true)).toBe(false);
      });
      it('[]', () => {
        expect(normalizeInputAsBoolean([], true)).toBe(false);
      });
      it('{}', () => {
        expect(normalizeInputAsBoolean({}, true)).toBe(false);
      });
    });

    describe('GIVEN: Should be true', () => {
      it(`'a string'`, () => {
        expect(normalizeInputAsBoolean('a string', true)).toBe(true);
      });
      it('[1]', () => {
        expect(normalizeInputAsBoolean([1], true)).toBe(true);
      });
      it('{ a: 1 }', () => {
        expect(normalizeInputAsBoolean({ a: 1 }, true)).toBe(true);
      });
    });
  }); // end :: SCENARIO: .smartEmptyCheck === false

});
