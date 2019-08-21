import { TestBed } from '@angular/core/testing';

import { NgxAutofocusFixService } from './ngx-autofocus-fix.service';

describe('NgxAutofocusFixService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxAutofocusFixService = TestBed.get(NgxAutofocusFixService);
    expect(service).toBeTruthy();
  });
});
