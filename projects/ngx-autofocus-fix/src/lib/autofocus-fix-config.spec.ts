import { AutofocusFixConfig } from './autofocus-fix-config';

describe('AutofocusFixConfig', () => {
  describe('SCENARIO: Instantiating', () => {

    describe('GIVEN: Have default values', () => {
      describe('WHEN: Instance created with empty options', () => {
        it('THEN: All fields should have default values', () => {
          // arrange
          const expected: {[key in keyof AutofocusFixConfig]: any} = {
            async: jasmine.any(Boolean),
            smartEmptyCheck: jasmine.any(Boolean),
            triggerDetectChanges: jasmine.any(Boolean),
          };

          // act
          const ins = new AutofocusFixConfig({});

          // assert
          expect(ins).toEqual(jasmine.objectContaining(expected));
        });
      });
    });

    describe('GIVEN: Partial options overriding', () => {
      describe('WHEN: Instance created with not all options', () => {
        it('THEN: Custom options should override default', () => {
          // arrange
          const expected: {[key in keyof AutofocusFixConfig]: any} = {
            async: jasmine.any(Boolean),
            smartEmptyCheck: jasmine.any(Boolean),
            triggerDetectChanges: jasmine.any(Boolean),
          };

          // act
          const insDefault = new AutofocusFixConfig({});
          const ins = new AutofocusFixConfig({ async: true });

          // assert
          expect(ins).toEqual(jasmine.objectContaining(expected));
          expect(insDefault.async).toBe(false);
          expect(ins.async).toBe(true);
        });
      });
    });

  });
});
