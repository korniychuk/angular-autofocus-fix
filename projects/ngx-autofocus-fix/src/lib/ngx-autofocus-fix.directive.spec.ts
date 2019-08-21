import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NgxAutofocusFixDirective } from './ngx-autofocus-fix.directive';

@Component({
  selector: 'wrapper',
  template: `
    <div *ngIf="show">
      <input type="text" [autofocus]="hasAutofocus">
    </div>
  `,
})

export class TestWrapperComponent {
  public show = false;
  public hasAutofocus = true;
}

describe('NgxAutofocusFixDirective', () => {
  let comp: TestWrapperComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  const getInput = () => fixture.debugElement.query(By.css('input'));

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
        expect(comp.show).toBe(false);
        expect(comp.hasAutofocus).toBe(true);
      });
    });

    describe('GIVEN: The <input> should be inserted and deleted from HTML depend of .show', () => {

      describe('WHEN: .show === false', () => {
        it('THEN: <input> must be absent', () => {
          expect(getInput()).toBeFalsy();
        });
      });

      describe('WHEN: .show become false', () => {
        it('THEN: <input> must be inserted', () => {
          // act
          comp.show = true;
          fixture.detectChanges();

          // assert
          expect(getInput()).toBeTruthy();
        });
      });

    });
  }); // end :: SCENARIO: Testing TestWrapperComponent

});
