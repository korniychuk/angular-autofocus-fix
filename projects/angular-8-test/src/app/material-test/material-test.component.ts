import { Component, OnInit } from '@angular/core';

import { scan, switchMap, take } from 'rxjs/operators';
import { Observable, Subject, interval } from 'rxjs';

@Component({
  selector: 'app-material-test',
  template: `
    <button e2e-attr="run-material" (click)="run()">Run Material Test</button>
    <form>
      <div class="material-inputs">
        <mat-form-field *ngFor="let v of numbers$ | async; index as i">
          <input type="text"
                 class="autofocus-input"
                 name="hello"
                 [ngModel]="v"
                 matInput
                 [autofocus]="!(i % 2)"
                 [attr.e2e-attr]="'input-' + i"
          >
          <!--                 [value]="v"-->
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
      switchMap(() => interval(100)),
      take(5),
      scan((acc: number[], i: number) => (acc.push(i), acc), []),
    );
  }

  public run(): void {
    this.run$.next();
  }

}
