import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxAutofocusFixDirective } from '../../projects/ngx-autofocus-fix/src/lib/autofocus.directive';

export * from '../../projects/ngx-autofocus-fix/src/lib/autofocus.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    NgxAutofocusFixDirective,
  ],
  exports: [
    NgxAutofocusFixDirective,
  ],
})
export class AutofocusModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AutofocusModule,
    };
  }
}
