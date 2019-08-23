import { Component, OnInit } from '@angular/core';

import { Observable, Subject, interval } from 'rxjs';
import * as $ from 'rxjs/operators';

import { environment } from '../../environments';

@Component({
  selector: 'app-material-test',
  styles: [
      `
      input {
        border: 1px solid #CCC;
      }
      input:focus {
        outline: #18E auto 5px;
      }
    `,
  ],
  template: `
    <h3>Angular Material inputs:</h3>
    <button e2e-attr="run-material" (click)="run()">Run Material Test</button>
    <form>
      <div class="material-inputs">
        <mat-form-field *ngFor="let v of numbers$ | async; index as i">
          <input type="text"
                 class="autofocus-material-input"
                 name="hello"
                 [value]="v"
                 matInput
                 [autofocus]="!(i % 2)"
                 autofocusFixTriggerDetectChanges
                 [attr.e2e-attr]="'material-input-' + i"
          >
        </mat-form-field>
      </div>
    </form>
  `,
})
export class MaterialTestComponent implements OnInit {

  public numbers$!: Observable<number[]>;

  private run$ = new Subject<void>();

  public ngOnInit() {
    this.numbers$ = this.run$.pipe(
      $.switchMap(() => interval(environment.inputsGenerationIntervalMs)),
      $.take(5),
      $.scan((acc: number[], i: number) => (acc.push(i), acc), []),
    );
  }

  public run(): void {
    this.run$.next();
  }

}
