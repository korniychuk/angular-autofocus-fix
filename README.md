# ngx-autofocus-fix

Angular 5+ directive for fix autofocus on dynamically created controls (`*ngIf`, `*ngFor`, etc.).

TODO: add an image, may be gif here

## Advantages over other libraries

* **Uses native HTML attribute `autofocus` as the selector!**  
* There are no custom selectors, no need to change your HTML template.
* Works with native DOM. Doesn't use any dependencies(jQuery, lodash, etc.).
* 100% Coverage, over 60 unit tests.
* E2E tests for 8,7,6 and 5 versions of Angular including e2e test for Angular Material Input.
* The library understands an extensive list of input data. (`null/NaN/'true'/[]/...`, not only boolean). See [Advanced examples](#advanced-examples)
* Supports asynchronous focusing (Useful for infinite scroll).
* Works perfectly with Angular Material. (there is an E2E test)
* Works with AOT mode.
* Configurable. Use can use input attributes or provide global options via `AutofocusFixConfig`

## Installation

To install this library, run:

```bash
$ npm i ngx-autofocus-fix --save
```
or
```bash
$ yarn add ngx-autofocus-fix
```

## Quick start

1. Import the library in your Angular application, for example in `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgxAutofocusFixModule } from 'ngx-autofocus-fix'; // <--- new code

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,

    NgxAutofocusFixModule, // <--- new code
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

## Online demos:**

* [The simplest case](...)
* [Smart mode](...)
* [Global config (`AutofocusFixConfig`) - simple example](...)
* [Complex example (Angular Material, Infinite scroll, Multiple global configs)](...)

## Advanced examples

### Default params normalization mode

Ways to **disable autofocus:** any js-falsely value, except empty string

```html
   <!-- with data binding -->
   <input [autofocus]=""> <!-- undefined value -->
   <input [autofocus]="undefined">
   <input [autofocus]="false">
   <input [autofocus]="null">
   <input [autofocus]="0">
   <input [autofocus]="NaN">
   
   <!-- without data binding -->
   <input autofocus="undefined">
   <input autofocus="false">
   <input autofocus="null">
   <input autofocus="0">
   <input autofocus="NaN">
   
   <input> <!-- disabled by default -->
``` 

Ways to **enable autofocus:** any js-true value and empty string

```html
   <!-- empty string will enable autofocus, this is default html behavior -->
   <input [autofocus]="{}">
   <input [autofocus]="[]">
   <input [autofocus]="''">
   <input autofocus="">
   <input autofocus>
   
   <input autofocus="autofocus">
   
   <input [autofocus]="true">
   <input [autofocus]="1">
   <input autofocus="true">
   
   <input [autofocus]="'any other values'">
   <input autofocus="any other values">
```

### Smart Empty Check params normalization mode

Smart Empty Check mode can be enabled locally by adding `autofocusFixSmartEmptyCheck` attribute or using global options. See (Configuration)[#configuration]

TODO: finish

## Configuration

**There are three ways to change the `AutofocusFixDirective`:**  
### 1. Specify attribute-options for specific HTML Element
   ```html
   <input type="text"
          autofocus
          autofocusFixAsync
   >
   ```
TODO: finish
### 2. Specify global options for the whole application by passing it to `.forRoot({ ... })`
TODO: finish
### 3. Provide Lazy-Route level or Component level config `new AutofocusFixConfig({ ... })`
TODO: finish

## Development
TODO: finish

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
