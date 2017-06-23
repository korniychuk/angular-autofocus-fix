import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutofocusDirective } from './autofocus.directive';

export * from './autofocus.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AutofocusDirective,
  ],
  exports: [
    AutofocusDirective,
  ],
})
export class AutofocusModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AutofocusModule,
    };
  }
}
