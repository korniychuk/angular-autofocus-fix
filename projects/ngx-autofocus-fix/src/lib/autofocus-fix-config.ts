// import { Injectable, InjectionToken, Optional, Provider, SkipSelf } from '@angular/core';

/**
 * Default Autofocus Fix params
 */
// @Injectable()
export class AutofocusFixConfig {

  public constructor(config: AutofocusFixOptions) {
    const keys: (keyof AutofocusFixConfig)[] = ['async', 'smartEmptyCheck', 'triggerDetectChanges'];

    keys
      .filter(name => config[name] !== undefined)
      // @ts-ignore
      .forEach(name => this[name] = config[name]);
  }

  /**
   * In case `true` .focus() and .blur() events will be wrapped by `setTimeout(() => ...)`
   */
  public readonly async: boolean = false;
  /**
   */
  public readonly smartEmptyCheck: boolean = false;
  /**
   */
  public readonly triggerDetectChanges: boolean = false;
}

export type AutofocusFixOptions = Partial<AutofocusFixConfig>;
