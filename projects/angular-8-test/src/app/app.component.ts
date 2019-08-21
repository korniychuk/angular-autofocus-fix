import { Component, OnInit } from '@angular/core';

import { interval } from 'rxjs/internal/observable/interval';
import { scan, take } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'angular-8-test';
  public numbers$: Observable<number[]>;

  public ngOnInit() {
    this.numbers$ = interval(1000).pipe(
      take(5),
      scan((acc: number[], i: number) => [...acc, i], []),
    );
  }

}
