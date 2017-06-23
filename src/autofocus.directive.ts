import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

/**
 * # Ways to turn off autofocus: any js-falsely value, except empty string
 *
 *     <!-- with data binding -->
 *     <input [autofocus]=""> <!-- undefined value -->
 *     <input [autofocus]="undefined">
 *     <input [autofocus]="false">
 *     <input [autofocus]="null">
 *     <input [autofocus]="0">
 *
 *     <!-- without data binding -->
 *     <input autofocus="undefined">
 *     <input autofocus="false">
 *     <input autofocus="null">
 *     <input autofocus="0">
 *
 *     <input> <!-- disabled by default -->
 *
 *
 * # Ways to enable autofocus: any js-true value and empty string
 *
 *
 *     <!-- empty string will enable autofocus, this is default html behavior -->
 *     <input [autofocus]="''">
 *     <input autofocus="">
 *     <input autofocus>
 *
 *     <input [autofocus]="true">
 *     <input autofocus="true">
 *
 *     <input [autofocus]="'any other values'">
 *
 */
@Directive({
  selector: '[autofocus]'
})
export class AutofocusDirective implements AfterViewInit {

  private _autofocus;

  public constructor(
    private el: ElementRef,
  ) {
  }

  public ngAfterViewInit() {
    if (this._autofocus) {
      const el: HTMLInputElement = this.el.nativeElement;

      if (el.focus) {
        el.focus();
      } else {
        console.warn('AutofocusDirective: There is no .focus() method on the element:',
                     this.el.nativeElement);
      }
    }
  }

  @Input()
  public set autofocus(value: any) {
    this._autofocus = value !== false
                   && value !== null
                   && value !== undefined
                   && value !== 0
                   && value !== 'false'
                   && value !== 'null'
                   && value !== 'undefined'
                   && value !== '0'
    ;
  }
}
