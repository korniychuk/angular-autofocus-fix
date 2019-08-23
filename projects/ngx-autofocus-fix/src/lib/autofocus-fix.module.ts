import { ModuleWithProviders, NgModule, Optional } from '@angular/core';

import { AutofocusFixDirective } from './autofocus-fix.directive';
import { AutofocusFixConfig, AutofocusFixOptions } from './autofocus-fix-config';

function noConfigError() {
  const moduleName = AutofocusFixModule.prototype.constructor.name;

  throw new Error(`${moduleName}: Can't inject ${AutofocusFixConfig.name}.
    Did you forgot to import the module using .forRoot() ?

    @NgModule({
      ...
      imports: [
        ...
        ${moduleName}.forRoot(),     <---
      ],
      ...
    })
    export class AppModule {}
`);
}

@NgModule({
  declarations: [AutofocusFixDirective],
  exports: [AutofocusFixDirective]
})
export class AutofocusFixModule {

  public constructor(@Optional() $config: AutofocusFixConfig) {
    if (!$config) { noConfigError(); }
    // @todo: check multiple config instances
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
