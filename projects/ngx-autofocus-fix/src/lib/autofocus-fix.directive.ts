import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  SimpleChange,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { normalizeInputAsBoolean } from './utils';
import { AutofocusFixConfig } from './autofocus-fix-config';

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
 * @dynamic
 * Notice: @dynamic used for correctly Document inject
 *         https://github.com/angular/angular/issues/20351
 */
@Directive({
  selector: '[autofocus]',
})
export class AutofocusFixDirective implements OnChanges, AfterViewInit {

  /** Raw value. Always have default value: '' */
  @Input()
  public autofocus: any;

  /** @see {@link AutofocusFixConfig.smartEmptyCheck} */
  @Input()
  public autofocusFixSmartEmptyCheck?: boolean;

  /** @see {@link AutofocusFixConfig.triggerDetectChanges} */
  @Input()
  public autofocusFixTriggerDetectChanges?: boolean;

  /** @see {@link AutofocusFixConfig.async} */
  @Input()
  public autofocusFixAsync?: boolean;

  private autofocusEnabled = false;
  private control?: HTMLElement;

  public constructor(
    private readonly $er: ElementRef,
    private readonly $cdr: ChangeDetectorRef,
    @Inject(DOCUMENT)
    private readonly $document: Document,
    private readonly $config: AutofocusFixConfig,
  ) {}

  public ngOnChanges(changes: { [key in keyof AutofocusFixDirective]?: SimpleChange }) {
    let needCheckFocus = false;

    if (changes.autofocus || changes.autofocusFixSmartEmptyCheck) {
      this.autofocusEnabled = normalizeInputAsBoolean(this.autofocus, this.isSmartEmptyCheck);
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
  }

  private checkFocus(): void {
    this.isAsync ? setTimeout(this.checkFocusInternal.bind(this)) : this.checkFocusInternal();
  }

  private checkFocusInternal(): void {
    if (!this.control || !this.autofocusEnabled || this.amIFocused) { return; }

    this.control.focus();
    if (this.isTriggerChangeDetection) { this.$cdr.detectChanges(); }
  }

  // @todo: test it
  protected get isAsync(): boolean {
    return this.autofocusFixAsync !== undefined ? !!this.autofocusFixAsync : this.$config.async;
  }

  // @todo: test it
  protected get isSmartEmptyCheck(): boolean {
    return this.autofocusFixSmartEmptyCheck !== undefined
           ? !!this.autofocusFixSmartEmptyCheck
           : this.$config.smartEmptyCheck;
  }

  // @todo: test it
  protected get isTriggerChangeDetection(): boolean {
    return this.autofocusFixTriggerDetectChanges !== undefined
           ? !!this.autofocusFixTriggerDetectChanges
           : this.$config.triggerDetectChanges;
  }

  // @todo: test it
  private get amIFocused(): boolean {
    return this.$document.activeElement === this.$er.nativeElement;
  }

}
