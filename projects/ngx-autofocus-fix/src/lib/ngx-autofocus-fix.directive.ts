import { Directive, ElementRef, Input, AfterViewInit, OnChanges, SimpleChange, ChangeDetectorRef } from '@angular/core';
import { normalizeBoolean } from './utils';

/**
 * ## Ways to turn off autofocus: any js-falsely value, except empty string
 *
 *     <!-- with data binding -->
 *     <input [autofocus]=""> <!-- undefined value -->
 *     <input [autofocus]="undefined">
 *     <input [autofocus]="false">
 *     <input [autofocus]="null">
 *     <input [autofocus]="0">
 *     <input [autofocus]="NaN">
 *
 *     <!-- without data binding -->
 *     <input autofocus="undefined">
 *     <input autofocus="false">
 *     <input autofocus="null">
 *     <input autofocus="0">
 *     <input autofocus="NaN">
 *
 *     <input> <!-- disabled by default -->
 *
 *
 * ## Ways to enable autofocus: any js-true value and empty string
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
 * @todo: async
 */
@Directive({
  selector: '[autofocus]',
})
export class NgxAutofocusFixDirective implements OnChanges, AfterViewInit {

  @Input()
  /** Raw value. Always have default value: '' */
  public autofocus: any;

  @Input()
  public autofocusFixSmartEmptyCheck = false;

  @Input()
  public autofocusFixTriggerDetectChanges = false;

  private hasAutofocus = false;
  private control?: HTMLElement;

  public constructor(
    private readonly el: ElementRef,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  public ngOnChanges(changes: { [key in keyof NgxAutofocusFixDirective]?: SimpleChange }) {
    let needCheckFocus = false;

    if (changes.autofocus || changes.autofocusFixSmartEmptyCheck) {
      this.hasAutofocus = normalizeBoolean(this.autofocus, this.autofocusFixSmartEmptyCheck);
      needCheckFocus = true;
    }

    if (needCheckFocus) {
      this.checkFocus();
    }
  }

  public ngAfterViewInit(): void {
    const el: HTMLElement = this.el.nativeElement;
    if (el.focus) {
      this.control = el;
      this.checkFocus();
    } else {
      console.warn(
        'NgxAutofocusFixDirective: There is no .focus() method on the element: %O. Directive initialized',
        el,
      );
    }
  }

  private checkFocus(): void {
    if (!this.control) { return; }

    if (this.hasAutofocus) {
      this.control.focus();
      // if (this.autofocusFixTriggerDetectChanges) { this.cdr.detectChanges(); }
    } else {
      // @todo: blur
      // this.control
    }
  }

}
