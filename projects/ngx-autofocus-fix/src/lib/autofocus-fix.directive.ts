import {
  Directive,
  ElementRef,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChange,
  ChangeDetectorRef,
  Injector,
} from '@angular/core';
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
export class AutofocusFixDirective implements OnChanges, AfterViewInit {

  @Input()
  /** Raw value. Always have default value: '' */
  public autofocus: any;

  @Input()
  public autofocusFixSmartEmptyCheck?: boolean;

  @Input()
  public autofocusFixTriggerDetectChanges?: boolean;

  private hasAutofocus = false;
  private control?: HTMLElement;

  public constructor(
    private readonly $er: ElementRef,
    private readonly $cdr: ChangeDetectorRef,
    private readonly $injector: Injector,
  ) {}

  public ngOnChanges(changes: { [key in keyof AutofocusFixDirective]?: SimpleChange }) {
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
    const el: HTMLElement = this.$er.nativeElement;
    if (el.focus) {
      this.control = el;
      this.checkFocus();
    } else {
      console.warn(
        'AutofocusFixDirective: There is no .focus() method on the element: %O. Directive initialized',
        el,
      );
    }
    // console.log('!!!', this.el, this.cdr, this.$injector.);
    const providers = (this.$injector as any).elDef.element.publicProviders;
    console.log('!!!', providers);
  }

  private checkFocus(): void {
    if (!this.control) { return; }

    if (this.hasAutofocus) {
      this.control.focus();
      // if (this.autofocusFixTriggerDetectChanges) { this.$cdr.detectChanges(); }
      this.$cdr.checkNoChanges();
    } else {
      // @todo: blur
      // this.control
    }
  }

}
