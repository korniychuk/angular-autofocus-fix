import { ModuleWithProviders, NgModule, Optional } from '@angular/core';

import { AutofocusFixDirective } from './autofocus-fix.directive';
import { AutofocusFixConfig, AutofocusFixOptions } from './autofocus-fix-config';
import { noAutofocusFixConfigError } from './no-autofocus-fix-config.error';

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

  public static forRoot(options: AutofocusFixOptions = {}): ModuleWithProviders {
    return {
      ngModule: AutofocusFixModule,
      providers: [
        {
          provide: AutofocusFixConfig,
          useValue: new AutofocusFixConfig(options),
        },
      ],
    };
  }

}
