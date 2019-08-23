import {
  AfterContentInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnChanges, OnInit,
  SimpleChange,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { normalizeInputAsBoolean, MutablePartial, Mutable } from './utils';
import { AutofocusFixConfig } from './autofocus-fix-config';

// @todo: check configuration

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
export class AutofocusFixDirective implements OnChanges, OnInit, AfterContentInit {

  /** Raw value. Always have default value: '' */
  @Input()
  public autofocus: any;

  /** @see {@link AutofocusFixConfig.smartEmptyCheck} */
  @Input()
  public autofocusFixSmartEmptyCheck?: boolean | any;

  /** @see {@link AutofocusFixConfig.triggerDetectChanges} */
  @Input()
  public autofocusFixTriggerDetectChanges?: boolean | any;

  /** @see {@link AutofocusFixConfig.async} */
  @Input()
  public autofocusFixAsync?: boolean | any;

  private wasInitialized = false;
  private localConfig: MutablePartial<AutofocusFixConfig> = {};
  private config!: Mutable<AutofocusFixConfig>;
  private autofocusEnabled = false;
  private control?: HTMLElement;

  public constructor(
    private readonly $er: ElementRef,
    private readonly $cdr: ChangeDetectorRef,
    @Inject(DOCUMENT)
    private readonly $document: Document,
    private readonly $config: AutofocusFixConfig,
  ) {}

  public ngOnChanges(changes: { [key in keyof AutofocusFixDirective]?: SimpleChange }): void {
    // Autofocus works only once. No need to do the initialization on each change detection cycle.
    if (this.wasInitialized) { return; }

    this.normalizeLocalConfigItem('async', changes.autofocusFixAsync);
    this.normalizeLocalConfigItem('smartEmptyCheck', changes.autofocusFixSmartEmptyCheck);
    this.normalizeLocalConfigItem('triggerDetectChanges', changes.autofocusFixTriggerDetectChanges);
  }

  public ngOnInit(): void {
    this.config = {} as AutofocusFixConfig;
    AutofocusFixConfig.keys.forEach(key => {
      const local = this.localConfig[key];
      this.config[key] = local !== undefined ? local : this.$config[key];
    });

    this.autofocusEnabled = normalizeInputAsBoolean(this.autofocus, this.config.smartEmptyCheck);
  }

  public ngAfterContentInit(): void {
    this.wasInitialized = true;
    const el: HTMLElement = this.$er.nativeElement;
    if (!el.focus) {
      return console.warn(
        'AutofocusFixDirective: There is no .focus() method on the element: %O. Directive initialized',
        el,
      );
    }

    this.control = el;
    this.checkFocus();
  }

  private checkFocus(): void {
    this.config.async ? setTimeout(this.checkFocusInternal.bind(this)) : this.checkFocusInternal();
  }

  private checkFocusInternal(): void {
    if (!this.control || !this.autofocusEnabled || this.amIFocused) { return; }

    this.control.focus();
    if (this.config.triggerDetectChanges) {
      this.$cdr.detectChanges();
    }
  }

  // @todo: test it
  private get amIFocused(): boolean {
    return this.$document.activeElement === this.$er.nativeElement;
  }

  private normalizeLocalConfigItem(configKey: keyof AutofocusFixConfig, change?: SimpleChange): void {
    if (change) {
      this.localConfig[configKey] = normalizeInputAsBoolean(change.currentValue);
    }
  }

}
