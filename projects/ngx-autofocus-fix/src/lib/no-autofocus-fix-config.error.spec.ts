import { noAutofocusFixConfigError } from './no-autofocus-fix-config.error';

describe('noAutofocusFixConfigError()', () => {
  it('should throw the error', () => {
    const cb = () => noAutofocusFixConfigError();

    expect(cb).toThrow();
  });
});
