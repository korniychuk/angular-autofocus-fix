import { browser, by, element } from 'protractor';
import { AppComponent } from '../../src/app/app.component';

export class AppPage {
  public navigateTo() {
    return browser.get(browser.baseUrl);
  }

  public getAngularVersion() {
    return element(by.css('app-root')).getAttribute('ng-version');
  }

  public getTitleText() {
    return element(by.css('app-root h1')).getText();
  }

  public getE2eAttrOfFocusedElement() {
    return element(by.css(':focus')).getAttribute('e2e-attr') as Promise<string>;
  }

  public getElementByE2eAttr(value: string) {
    return element(by.css(`[e2e-attr=${value}]`));
  }

  public getElementsCount(selector: string) {
    return browser.$$(selector).count();
  }

  //
  // Simple Inputs
  //

  public getSimpleInputCount() {
    return this.getElementsCount('.autofocus-input');
  }

  public getSimpleRunButton() {
    return element(by.css('[e2e-attr=run]'));
  }

  //
  // Material Inputs
  //

  public getMaterialInputCount() {
    return this.getElementsCount('.autofocus-material-input');
  }

  public getMaterialRunButton() {
    return element(by.css('[e2e-attr=run-material]'));
  }


}
