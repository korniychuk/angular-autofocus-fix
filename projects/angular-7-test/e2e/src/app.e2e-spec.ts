import { AppPage } from './app.po';
import { browser, logging, protractor } from 'protractor';

const expectedAngularMajorVersion = 7;

describe(`Angular ${expectedAngularMajorVersion}`, () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  describe('SCENARIO: App initialization', () => {
    describe('WHEN: Page opened', () => {
      it('THEN: should display welcome message', () => {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('Welcome to angular-*-test!');
      });
    });
    it(`Angular version should be ${expectedAngularMajorVersion}.*.*`, () => {
      expect(page.getAngularVersion()).toMatch(new RegExp(`^${expectedAngularMajorVersion}\\.\\d+\.\\d+$`));
    });
  });

  describe('SCENARIO: Autofocusing', () => {

    beforeAll( () => {
      browser.waitForAngularEnabled(false);
    });

    afterAll(() => {
      browser.waitForAngularEnabled(true);
    });

    it('Should move focus to the each newly create input', async () => {
      page.getRunButton().click();
      expect(page.getInputsCount()).toBe(0);

      await browser.sleep(25);
      expect(page.getInputsCount()).toBe(0);

      const until = protractor.ExpectedConditions;
      for (let i = 0; i < 5; i++) {
        await browser.wait(until.presenceOf(page.getElementByE2eAttr('input-' + i)), 150, 'Element taking too long to appear in the DOM');

        expect(page.getInputsCount()).toBe(i + 1);
        const focusIndex = i - i % 2;
        expect(page.getE2eAttrOfFocusedElement()).toBe('input-' + focusIndex);
      }
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
