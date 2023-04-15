const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      background-color: var(--color-base-accent-1);
    }
    button {
      background-color: transparent;
      border: none;
    }
  </style>

  <button id="increaseBtn">+</button>
  <span id="label"></span>
  <button id="decreaseBtn">-</button>
`;

class CounterComponent extends HTMLElement {
  static get observedAttributes() {
    return ["value", "step"];
  }

  get value() {
    return this.getAttribute('value')??0;
  }

  set value(val) {
    if (val) {
      this.setAttribute('value', val);
    } else {
      this.removeAttribute('value');
    }
  }

  get step() {
    return this.getAttribute('step')??0;
  }

  set step(val) {
    if (val) {
      this.setAttribute('step', val);
    } else {
      this.removeAttribute('step');
    }
  }

  $increaseButton:HTMLElement;
  $decreaseButton:HTMLElement;
  $label:HTMLElement;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    
    this.$increaseButton = this.shadowRoot?.querySelector('#increaseBtn')!;
    this.$decreaseButton = this.shadowRoot?.querySelector('#decreaseBtn')!;
    this.$label = this.shadowRoot?.querySelector('#label')!;
  }

  createTemplate(): HTMLTemplateElement {
    const template = document.createElement("template");
    template.innerHTML = `<button>test</button>`;
    return template;
  }

  connectedCallback() {
    this.$increaseButton.addEventListener('click', this._increase.bind(this));
    this.$decreaseButton.addEventListener('click', this._decrease.bind(this));
  }
  disconnectedCallback() {
    this.$increaseButton.removeEventListener('click', this._increase.bind(this));
    this.$decreaseButton.removeEventListener('click', this._decrease.bind(this));
  }
  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    if (name === 'value') {
      this.$label.innerHTML = newValue;
    }
  }

  adoptedCallback() {}

  private _increase() {
    const step = +this.step;
    const value = +this.value;
    this.value = String(value + step);
  }

  private _decrease() {
    const step = +this.step;
    const value = +this.value;
    this.value = String(value - step);
  }
}

window.customElements.define("counter-component", CounterComponent);
