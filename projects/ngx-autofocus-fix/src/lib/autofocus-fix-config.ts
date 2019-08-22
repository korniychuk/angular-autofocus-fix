import { InjectionToken, Provider } from '@angular/core';

export const AutofocusFixConfigToken = new InjectionToken<AutofocusFixConfig>('AutofocusFixConfig');

/**
 * Default Autofocus Fix params
 */
export interface AutofocusFixConfig {
  /**
   * In case `true` .focus() and .blur() events will be wrapped by `setTimeout(() => ...)`
   * Default: `false`
   */
  async?: boolean;
  /**
   * Default: `false`
   */
  autofocusFixSmartEmptyCheck?: boolean;
  /**
   * Default: `false`
   */
  triggerDetectChanges?: boolean;
}

const defaultConfig: AutofocusFixConfig = {
  async: false,
  autofocusFixSmartEmptyCheck: false,
  triggerDetectChanges: false,
};

export function provideAutofocusFixConfig(config: AutofocusFixConfig): Provider {
  return {
    provide: AutofocusFixConfigToken,
    useValue: config,
  };
}
