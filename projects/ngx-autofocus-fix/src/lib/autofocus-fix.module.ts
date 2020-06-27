import { InjectionToken, ModuleWithProviders, NgModule, Optional } from '@angular/core';

import { AutofocusFixConfig, AutofocusFixOptions } from './autofocus-fix-config';
import { AutofocusFixDirective } from './autofocus-fix.directive';
import { noAutofocusFixConfigError } from './no-autofocus-fix-config.error';

// Exists for AoT support
export function configFactory(options: AutofocusFixOptions) {
  return new AutofocusFixConfig(options);
}
// Exists for AoT support
const AutofocusFixOptionsInternalToken = new InjectionToken('AutofocusFixOptions');

@NgModule({
  declarations: [AutofocusFixDirective],
  exports: [AutofocusFixDirective]
})
export class AutofocusFixModule {

  public constructor(@Optional() $config: AutofocusFixConfig) {
    if (!$config) {
      noAutofocusFixConfigError();
    }
  }

  public static forRoot(options: AutofocusFixOptions = {}): ModuleWithProviders<AutofocusFixModule> {

    return {
      ngModule: AutofocusFixModule,
      providers: [
        {
          provide: AutofocusFixOptionsInternalToken,
          useValue: options,
        },
        {
          provide: AutofocusFixConfig,
          useFactory: configFactory,
          deps: [AutofocusFixOptionsInternalToken],
        },
      ],
    };
  }

}
