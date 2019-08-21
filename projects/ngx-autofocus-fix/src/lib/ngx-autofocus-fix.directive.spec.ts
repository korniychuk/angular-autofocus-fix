import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NgxAutofocusFixDirective } from './ngx-autofocus-fix.directive';

@Component({
  selector: 'wrapper',
  template: `
    <div *ngIf="show1">
      <input class="input-1" type="text" [autofocus]="hasAutofocus">
    </div>
    <div *ngIf="show2">
      <input class="input-2" type="text" [autofocus]="hasAutofocus">
    </div>
    <div *ngIf="show3">
      <input class="input-3" type="text" autofocus>
    </div>
  `,
})

export class TestWrapperComponent {
  public show1 = false;
  public show2 = false;
  public show3 = false;
  public hasAutofocus = true;
}

describe('NgxAutofocusFixDirective', () => {
  let comp: TestWrapperComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  function getInput(num: number): HTMLElement | undefined {
    const debugElement = fixture.debugElement.query(By.css('.input-' + num));
    return debugElement && debugElement.nativeElement;
  }

  function getFocused(): HTMLElement | undefined {
    const debugElement = fixture.debugElement.query(By.css(':focus'));
    return debugElement && debugElement.nativeElement;
  }

  beforeEach(async () => {
    await TestBed
      .configureTestingModule({
        imports: [CommonModule],
        declarations: [TestWrapperComponent, NgxAutofocusFixDirective],
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
        expect(comp.show1).toBe(false);
        expect(comp.show2).toBe(false);
        expect(comp.show3).toBe(false);
        expect(comp.hasAutofocus).toBe(true);
      });
    });

    for (let i = 1; i <= 3; i++) {
      describe(`GIVEN: The <input class="input-${i}"> should be inserted and deleted from HTML depend of .show${i}`, () => {

        describe(`WHEN: .show${i} === false`, () => {
          it('THEN: <input> must be absent', () => {
            expect(getInput(i)).toBeFalsy();
          });
        });

        describe(`WHEN: .show${i} become false`, () => {
          it('THEN: <input> must be inserted', () => {
            // act
            comp['show' + i] = true;
            fixture.detectChanges();

            // assert
            expect(getInput(i)).toBeTruthy();
          });
        });
      });
    }

  }); // end :: SCENARIO: Testing TestWrapperComponent

  describe('SCENARIO: Input autofocus on creation', () => {

    describe('GIVEN: Autofocus in case one input', () => {
      describe('WHEN: Input created', () => {
        it('THEN: Should be autofocused', () => {
          // act
          comp.show1 = true;
          fixture.detectChanges();

          // assert
          const input = getInput(1);
          expect(input).toBeTruthy();
          expect(input).toBe(getFocused());
        });
      });

      describe('WHEN: Input created with no value for @Input(\'autofocus\')', () => {
        it('THEN: Should be autofocused', () => {
          // act
          comp.show3 = true;
          fixture.detectChanges();

          // assert
          const input = getInput(3);
          expect(input).toBeTruthy();
          expect(input).toBe(getFocused());
        });
      });
    });

    describe('GIVEN: Disable autofocus on creation in case @Input(\'autofocus\') falsy', () => {
      describe('WHEN: Input created with @Input(\'autofocus\') === false', () => {
        it('THEN: Should not be autofocused', () => {
          // arrange
          comp.hasAutofocus = false;

          // act
          comp.show1 = true;
          fixture.detectChanges();

          // assert
          const input = getInput(1);
          expect(input).toBeTruthy();
          expect(getFocused()).toBeFalsy();
        });
      });

      describe('WHEN: Input created with @Input(\'autofocus\') === undefined', () => {
        it('THEN: Should not be autofocused', () => {
          // arrange
          comp.hasAutofocus = undefined;

          // act
          comp.show1 = true;
          fixture.detectChanges();

          // assert
          const input = getInput(1);
          expect(input).toBeTruthy();
          expect(getFocused()).toBeFalsy();
        });
      });
    });

    describe('GIVEN: Autofocus in case multiple inputs', () => {
      describe('WHEN: Second input created', () => {
        it('THEN: Second input should be autofocused', () => {
          // arrange
          comp.show1 = true;
          fixture.detectChanges();

          // act
          comp.show2 = true;
          fixture.detectChanges();

          // assert
          const input1 = getInput(1);
          const input2 = getInput(2);
          expect(input1).toBeTruthy();
          expect(input2).toBeTruthy();
          expect(input2).toBe(getFocused());
        });
      });
    });

  }); // end :: SCENARIO: Autofocus on creation

});
