import { TestBed } from '@angular/core/testing';
import { AutofocusFixConfig } from './autofocus-fix-config';
import { AutofocusFixModule } from './autofocus-fix.module';

const moduleName = AutofocusFixModule.prototype.constructor.name;

describe(moduleName, () => {
  describe('SCENARIO: Module importing', () => {

    describe(`WHEN: Importing just '${moduleName}'`, () => {
      it('THEN: Should throw an error that can\'t inject config', () => {
        TestBed.configureTestingModule({
          imports: [AutofocusFixModule],
        });
        const cb = () => TestBed.get(AutofocusFixConfig);

        expect(cb).toThrow();
      });
    });

    describe(`WHEN: Importing '${moduleName}'.forRoot()`, () => {
      it('THEN: Should get instance', () => {
        TestBed.configureTestingModule({
          imports: [AutofocusFixModule.forRoot()],
        });
        const ins = TestBed.get(AutofocusFixConfig);

        expect(ins instanceof AutofocusFixConfig).toBeTruthy();
      });
    });

    describe(`WHEN: Importing just '${moduleName}' and providing config manually`, () => {
      it('THEN: Should get instance', () => {
        TestBed.configureTestingModule({
          imports: [AutofocusFixModule],
          providers: [
            {
              provide: AutofocusFixConfig,
              useValue: new AutofocusFixConfig({}),
            }]
        });
        const ins = TestBed.get(AutofocusFixConfig);

        expect(ins instanceof AutofocusFixConfig).toBeTruthy();
      });
    });

  });
});
