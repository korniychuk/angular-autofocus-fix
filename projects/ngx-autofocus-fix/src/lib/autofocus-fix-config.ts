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
   * This is helpful when to the same HTMLElement besides this directive, there are others, that have
   * some binding for the focus event. In this case
   */
  public readonly triggerDetectChanges: boolean = false;
}

export type AutofocusFixOptions = Partial<AutofocusFixConfig>;
