export class AutofocusFixConfig {
  public static readonly keys: (keyof AutofocusFixConfig)[] = ['async', 'smartEmptyCheck', 'triggerDetectChanges'];

  public constructor(config: AutofocusFixOptions) {
    AutofocusFixConfig.keys
      .filter(name => config[name] !== undefined)
      // @ts-ignore
      .forEach(name => this[name] = config[name]);
  }

  /**
   * In case `true` .focus() events will be wrapped by `setTimeout(() => ...)`.
   *
   * Notice:
   * I'm not sure that the action is a good practice, however this ability added because of next issues:
   * - https://github.com/korniychuk/angular-autofocus-fix/issues/1
   * - https://github.com/spirosikmd/angular2-focus/issues/46
   */
  public readonly async: boolean = false;
  /**
   * In case `true`: treat an empty string, an empty array and an empty object as a falsy value.
   * In case `false`(default): each of these values treats as truthy.
   */
  public readonly smartEmptyCheck: boolean = false;
  /**
   * In case `true`: trigger {@link ChangeDetectorRef.detectChanges}() after {@link HTMLElement.focus}().
   *
   * This is helpful in the case when the HTMLElement to which {@link AutofocusFixDirective} added
   * wrapped by another directive/component that has some binding related to focus of the element.
   * In this case without enabling .triggerChangeDetection option Angular throws ExpressionChangedAfterItHasBeenCheckedError.
   *
   * A striking example is the <mat-form-field> from the Angular Material that wraps <input> control.
   */
  public readonly triggerDetectChanges: boolean = false;
}

export type AutofocusFixOptions = Partial<AutofocusFixConfig>;
