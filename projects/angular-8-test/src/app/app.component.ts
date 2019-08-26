import { Component, OnInit } from '@angular/core';

import { Observable, Subject, interval } from 'rxjs';
import * as $ from 'rxjs/operators';

import { environment } from '../environments';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    .autofocus-input {
      width: 50px;
    }
    .autofocus-input + .autofocus-input {
      margin-left: 10px;
    }
  `],
})
export class AppComponent implements OnInit {
  public title = 'angular-*-test';
  public showInput = false;
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
