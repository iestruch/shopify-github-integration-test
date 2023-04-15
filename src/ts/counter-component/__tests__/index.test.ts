/**
 * @jest-environment jsdom
 */

import "../index";

describe("Counter component tests", () => {
  test("The initial value is 1", () => {
    document.body.innerHTML = `<counter-component id="test" value="1" step="2"></counter-component>`;
    const component =
      window.document.body.querySelector('counter-component');
    const rendered = component?.shadowRoot?.innerHTML;
    expect(rendered).toContain('<span id="label">1</span>');
  });

  test("The initial value is 1", () => {
    document.body.innerHTML = `<counter-component id="test" value="1" step="2"></counter-component>`;
    const component =
      window.document.body.querySelector('counter-component');
    const button = component?.shadowRoot?.querySelector('#increaseBtn') as HTMLButtonElement;
    button?.click();
    const rendered = component?.shadowRoot?.innerHTML;
    expect(rendered).toContain('<span id="label">3</span>');
  });


});
