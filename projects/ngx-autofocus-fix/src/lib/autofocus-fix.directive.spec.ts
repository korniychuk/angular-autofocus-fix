import { Component, Directive, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AutofocusFixDirective } from './autofocus-fix.directive';
import { AutofocusFixConfig } from './autofocus-fix-config';
import { Mutable, MutablePartial } from './utils';

class TestAutofocusFixDirective extends AutofocusFixDirective {
  public localConfig!: MutablePartial<AutofocusFixConfig>;
}

@Component({
  selector: 'no-focusable',
  template: ``
})
class NoFocusableComponent implements OnInit {
  constructor(private $element: ElementRef) {}

  ngOnInit() {
    (this.$element.nativeElement as HTMLElement).focus = undefined as any;
  }
}



@Directive({ selector: '[focus-binding]', exportAs: 'focusBinding' })
class FocusBindingDirective {

  public constructor(
    @Inject(DOCUMENT)
    private readonly $document: Document,
    private readonly $el: ElementRef,
  ) {}

  public get isFocused(): boolean {
    return this.$el.nativeElement === this.$document.activeElement;
  }
}

@Component({
  selector: 'wrapper',
  template: `
    <div *ngIf="show[0]">
      <input class="input-0" type="text" [autofocus]="autofocusValue" [autofocusFixSmartEmptyCheck]="smartEmptyCheck">
    </div>
    <div *ngIf="show[1]">
      <input class="input-1" type="text" [autofocus]="autofocusValue">
    </div>
    <div *ngIf="show[2]">
      <input class="input-2" type="text" autofocus>
    </div>
    <div *ngIf="show[3]">
      <input class="input-3" type="text" autofocus [autofocusFixSmartEmptyCheck]="smartEmptyCheck">
    </div>
    <div *ngIf="showNoFocusable">
      <no-focusable autofocus></no-focusable>
    </div>
    <div *ngIf="showFocusBinding">
      <input type="text" autofocus focus-binding>
      {{ focusBinding?.isFocused }} <!-- for triggering ExpressionChangedAfterItHasBeenCheckedError -->
    </div>
    <div *ngIf="showFocusBindingWithTriggerChangeDetection">
      <input type="text" autofocus autofocusFixTriggerDetectChanges focus-binding>
      {{ focusBinding?.isFocused }} <!-- for triggering ExpressionChangedAfterItHasBeenCheckedError -->
    </div>
    <div *ngIf="showAsync">
      <input type="text" autofocus autofocusFixAsync>
    </div>
  `,
})
class TestWrapperComponent {
  @ViewChild(FocusBindingDirective, { static: false })
  public focusBinding!: FocusBindingDirective;

  @ViewChild(AutofocusFixDirective, { static: false })
  public dir!: TestAutofocusFixDirective;

  public showNoFocusable = false;
  public show: boolean[] = Array(4).fill(false);
  public autofocusValue: any = true;
  public smartEmptyCheck = false;

  public showFocusBinding = false;
  public showFocusBindingWithTriggerChangeDetection = false;

  public showAsync = false;
}

const configMock = (): Mutable<AutofocusFixConfig> => ({
  async: false,
  triggerDetectChanges: false,
  smartEmptyCheck: false,
});

describe('AutofocusFixDirective', () => {
  let comp: TestWrapperComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  function getInput(num: number): HTMLElement | undefined | null {
    const debugElement = fixture.debugElement.query(By.css('.input-' + num));
    return debugElement && debugElement.nativeElement;
  }

  function getFocused(): HTMLElement | undefined | null {
    const debugElement = fixture.debugElement.query(By.css(':focus'));
    return debugElement && debugElement.nativeElement;
  }

  beforeEach(async () => {
    await TestBed
      .configureTestingModule({
        imports: [CommonModule],
        declarations: [
          TestWrapperComponent,
          NoFocusableComponent,
          AutofocusFixDirective,
          FocusBindingDirective,
        ],
        providers: [
          {
            provide: AutofocusFixConfig,
            useFactory: configMock,
          },
        ],
      })
      .compileComponents();

    fixture = TestBed.createComponent(TestWrapperComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('SCENARIO: Testing TestWrapperComponent', () => {
    describe('GIVEN: Initialization', () => {
      it('should create', () => {
        expect(comp).toBeTruthy();
      });
      it('should have correct default values', () => {
        comp.show.forEach(v => expect(v).toBe(false));
        expect(comp.autofocusValue).toBe(true);
        expect(comp.smartEmptyCheck).toBe(false);
      });
    });

    for (let i = 0; i < 4; i++) {
      describe(`GIVEN: The <input class="input-${ i }"> should be inserted and deleted from HTML depend of .show${ i }`, () => {

        describe(`WHEN: .show${ i } === false`, () => {
          it('THEN: <input> must be absent', () => {
            expect(getInput(i)).toBeFalsy();
          });
        });

        describe(`WHEN: .show${ i } become false`, () => {
          it('THEN: <input> must be inserted', () => {
            // act
            comp.show[i] = true;
            fixture.detectChanges();

            // assert
            expect(getInput(i)).toBeTruthy();
          });
        });
      });
    }
  }); // end :: SCENARIO: Testing TestWrapperComponent

  describe('SCENARIO: Edge cases', () => {
    describe('GIVEN: No .focus() method on the HTMLElement', () => {
      describe('WHEN: Initialize autofocus', () => {
        it('THEN: Print console warning', () => {
          // arrange
          spyOn(console, 'warn');

          // act
          comp.showNoFocusable = true;
          fixture.detectChanges();

          // assert
          const noFocusable = fixture.debugElement.query(By.directive(NoFocusableComponent));
          expect(noFocusable).toBeTruthy();
          expect(console.warn).toHaveBeenCalled();
        });
      });
    });
  });

  describe('SCENARIO: Input autofocus on creation', () => {

    describe('GIVEN: Autofocus in case one input', () => {
      describe('WHEN: Input created', () => {
        it('THEN: Should be autofocused', () => {
          // act
          comp.show[0] = true;
          fixture.detectChanges();

          // assert
          const input = getInput(0);
          expect(input).toBeTruthy();
          expect(input).toBe(getFocused());
        });
      });

      describe('WHEN: Input created with no value for @Input(\'autofocus\')', () => {
        it('THEN: Should be autofocused', () => {
          // act
          comp.show[2] = true;
          fixture.detectChanges();

          // assert
          const input = getInput(2);
          expect(input).toBeTruthy();
          expect(input).toBe(getFocused());
        });
      });
    });

    describe('GIVEN: Opposite autofocus behavior for an empty string in case Smart Empty Check', () => {
      describe('WHEN: Input created', () => {
        it('THEN: Should be autofocused', () => {
          // arrange
          comp.smartEmptyCheck = true;
          comp.autofocusValue = '';

          // act
          comp.show[0] = true;
          fixture.detectChanges();

          // assert
          const input = getInput(0);
          expect(input).toBeTruthy();
          expect(getFocused()).toBeFalsy();
        });
      });

      describe('WHEN: Input created with no value for @Input(\'autofocus\')', () => {
        it('THEN: Should be autofocused', () => {
          // arrange
          comp.smartEmptyCheck = true;

          // act
          comp.show[3] = true;
          fixture.detectChanges();

          // assert
          const input = getInput(3);
          expect(input).toBeTruthy();
          expect(getFocused()).toBeFalsy();
        });
      });
    });

    describe('GIVEN: Disable autofocus on creation in case @Input(\'autofocus\') falsy', () => {
      describe('WHEN: Input created with @Input(\'autofocus\') === false', () => {
        it('THEN: Should not be autofocused', () => {
          // arrange
          comp.autofocusValue = false;

          // act
          comp.show[0] = true;
          fixture.detectChanges();

          // assert
          const input = getInput(0);
          expect(input).toBeTruthy();
          expect(getFocused()).toBeFalsy();
        });
      });

      describe('WHEN: Input created with @Input(\'autofocus\') === undefined', () => {
        it('THEN: Should not be autofocused', () => {
          // arrange
          comp.autofocusValue = undefined;

          // act
          comp.show[0] = true;
          fixture.detectChanges();

          // assert
          const input = getInput(0);
          expect(input).toBeTruthy();
          expect(getFocused()).toBeFalsy();
        });
      });
    });

    describe('GIVEN: Autofocus in case multiple inputs', () => {
      describe('WHEN: Second input created', () => {
        it('THEN: Second input should be autofocused', () => {
          // arrange
          comp.show[0] = true;
          fixture.detectChanges();

          // act
          comp.show[1] = true;
          fixture.detectChanges();

          // assert
          const input1 = getInput(0);
          const input2 = getInput(1);
          expect(input1).toBeTruthy();
          expect(input2).toBeTruthy();
          expect(input2).toBe(getFocused());
        });
      });
    });

    describe('GIVEN: Input params changes after directive initialized', () => {
      describe('WHEN: Change autofocusFixSmartEmptyCheck after directive initialized', () => {
        it('THEN: .localConfig should have the previous value', () => {
          // arrange
          comp.show[0] = true;
          comp.smartEmptyCheck = true;
          fixture.detectChanges();

          // pre assert
          expect(comp.dir.autofocusFixSmartEmptyCheck).toBe(true);
          expect(comp.dir.localConfig.smartEmptyCheck).toBe(true);

          // act
          comp.smartEmptyCheck = false;
          fixture.detectChanges();

          // assert
          expect(comp.dir.autofocusFixSmartEmptyCheck).toBe(false);
          expect(comp.dir.localConfig.smartEmptyCheck).toBe(true);
        });
      });
    });
  }); // end :: SCENARIO: Autofocus on creation

  describe('SCENARIO: Triggering Change Detection', () => {
    describe('GIVEN: Multiple directives on the same HTMLElement', () => {

      describe('WHEN: triggerChangeDetection === false (default)', () => {
        it('THEN: Should throw ExpressionChangedAfterItHasBeenCheckedError', () => {
          // act
          comp.showFocusBinding = true;
          const cb = () => fixture.detectChanges();

          // assert
          expect(cb).toThrowError(/ExpressionChangedAfterItHasBeenCheckedError/);
        });
      });

      describe('WHEN: With autofocusFixTriggerDetectChanges attribute', () => {
        it('THEN: Should NOT throw ExpressionChangedAfterItHasBeenCheckedError', () => {
          comp.showFocusBindingWithTriggerChangeDetection = true;
          fixture.detectChanges();
        });
      });

      describe('WHEN: .triggerDetectChanges enabled via global config', () => {
        it(
          'THEN: Should NOT throw ExpressionChangedAfterItHasBeenCheckedError',
          inject([AutofocusFixConfig], (config: Mutable<AutofocusFixConfig>) => {
            config.smartEmptyCheck = true;
            fixture.detectChanges();
          }),
        );
      });

    });
  });

  describe('SCENARIO: Asynchronous focusing', () => {
    describe('GIVEN: Input should not have focus in the main execution flow', () => {

      describe('WHEN: Async enabled via attribute autofocusFixAsync', () => {
        it('THEN: Input should not be focused immediately', async () => {
          // act
          comp.showAsync = true;
          fixture.detectChanges();

          // assert
          expect(getFocused()).toBeFalsy();
          await fixture.whenStable();
          expect(getFocused()).toBeTruthy();
        });
      });

      describe('WHEN: .async enabled via global config', () => {
        it(
          'THEN: Input should not be focused immediately',
          inject([AutofocusFixConfig], async (config: Mutable<AutofocusFixConfig>) => {
            // arrange
            config.async = true;

            // act
            comp.show[0] = true;
            fixture.detectChanges();

            // assert
            expect(getFocused()).toBeFalsy();
            await fixture.whenStable();
            expect(getFocused()).toBeTruthy();
          }),
        );
      });

    });
  });
});
