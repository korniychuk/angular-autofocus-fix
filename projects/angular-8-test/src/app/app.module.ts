import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutofocusFixModule } from 'ngx-autofocus-fix';

import { AppComponent } from './app.component';
import { MaterialTestModule } from './material-test/material-test.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,

    AutofocusFixModule.forRoot({ smartEmptyCheck: true }),

    MaterialTestModule,
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule { }
