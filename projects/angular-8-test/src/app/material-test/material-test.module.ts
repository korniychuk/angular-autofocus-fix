import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { AutofocusFixModule } from 'ngx-autofocus-fix';

import { MaterialTestComponent } from './material-test.component';

@NgModule({
  imports: [
    CommonModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    MatInputModule,

    AutofocusFixModule,
  ],
  declarations: [MaterialTestComponent],
  exports: [MaterialTestComponent],
})
export class MaterialTestModule { }
