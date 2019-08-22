import { browser, by, element } from 'protractor';
import { AppComponent } from '../../src/app/app.component';

export class AppPage {
  public navigateTo() {
    return browser.get(browser.baseUrl);
  }

  public getTitleText() {
    return element(by.css('app-root h1')).getText();
  }

  public getIdOfFocusedElement() {
    return element(by.css(':focus')).getAttribute('id') as Promise<string>;
  }

}
