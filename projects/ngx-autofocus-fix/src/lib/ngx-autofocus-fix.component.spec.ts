import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAutofocusFixComponent } from './ngx-autofocus-fix.component';

describe('NgxAutofocusFixComponent', () => {
  let component: NgxAutofocusFixComponent;
  let fixture: ComponentFixture<NgxAutofocusFixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxAutofocusFixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxAutofocusFixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
