import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { interval } from 'rxjs/observable/interval';
import { scan, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public title = 'angular-*-test';
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
