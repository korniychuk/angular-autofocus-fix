import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { NgxAutofocusFixModule } from 'ngx-autofocus-fix';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgxAutofocusFixModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
