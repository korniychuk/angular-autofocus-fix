import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { take, tap } from 'rxjs/operators';
import { timer } from 'rxjs/internal/observable/timer';

describe('Angular 8', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  describe('SCENARIO: App initialization', () => {
    describe('WHEN: Page opened', () => {
      it('THEN: should display welcome message', () => {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('Welcome to angular-8-test!');
      });
    });
  });

  describe('SCENARIO: Autofocusing', () => {
    it('Should move focus to the each newly create input', async () => {
      await timer(100, 250).pipe(
        take(3),
        tap((i) => {
          expect(page.getIdOfFocusedElement()).toBe('input-' + i);
        }),
      ).toPromise();
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
