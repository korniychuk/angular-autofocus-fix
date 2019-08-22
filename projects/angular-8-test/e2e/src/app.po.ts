import { browser, by, element } from 'protractor';
import { AppComponent } from '../../src/app/app.component';

export class AppPage {
  public navigateTo() {
    return browser.get(browser.baseUrl);
  }

  public getTitleText() {
    return element(by.css('app-root h1')).getText();
  }

  public getE2eAttrOfFocusedElement() {
    return element(by.css(':focus')).getAttribute('e2e-attr') as Promise<string>;
  }

  public getInputsCount() {
    return browser.$$('.autofocus-input').count();
  }

  public getRunButton() {
    return element(by.css('[e2e-attr=run]'));
  }

  public getElementByE2eAttr(value: string) {
    return element(by.css(`[e2e-attr=${value}]`));
  }

  public getAngularVersion() {
    return element(by.css('app-root')).getAttribute('ng-version');
  }

}
