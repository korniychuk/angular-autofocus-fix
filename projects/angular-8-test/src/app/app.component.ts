import { Component, OnInit } from '@angular/core';

import { Observable, Subject, interval } from 'rxjs';
import { scan, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
