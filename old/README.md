# angular-autofocus-fix

Angular 2+ directive for fix autofocus on dinamically created controls (`*ngIf`, `*ngFor`, etc.).

**Uses html native attribute `autofocus` as the selector!**  
There are no custom selectors, no need to change your html template.

Works with native DOM. Doesn't use any dependencies(jQuery, etc.).

## Installation

To install this library, run:

```bash
$ npm install angular-autofocus-fix --save
```

## Quick start

1. Import the library in your Angular application, for example in `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AutofocusModule } from 'angular-autofocus-fix'; // <--- new code

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,

    AutofocusModule, // <--- new code
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

2. You can now use autofocus directive in app.component.html

```html
<input autofocus
       placeholder="I have autofocus"
       *ngIf="showInput"
>
<button (click)="showInput = !showInput">Toggle Input</button>
```

## Advanced examples

Ways to **disable autofocus:** any js-falsely value, except empty string

```html
   <!-- with data binding -->
   <input [autofocus]=""> <!-- undefined value -->
   <input [autofocus]="undefined">
   <input [autofocus]="false">
   <input [autofocus]="null">
   <input [autofocus]="0">
   
   <!-- without data binding -->
   <input autofocus="undefined">
   <input autofocus="false">
   <input autofocus="null">
   <input autofocus="0">
   
   <input> <!-- disabled by default -->
``` 

Ways to **enable autofocus:** any js-true value and empty string

```html
   <!-- empty string will enable autofocus, this is default html behavior -->
   <input [autofocus]="''">
   <input autofocus="">
   <input autofocus>
   
   <input autofocus="autofocus">
   
   <input [autofocus]="true">
   <input autofocus="true">
   
   <input [autofocus]="'any other values'">
   <input autofocus="any other values">
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Anton Korniychuk](mailto:dev@korniychuk.pro)
