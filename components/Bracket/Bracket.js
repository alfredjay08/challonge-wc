import "../Match/Match.js";

const tempt = document.createElement("template");
tempt.innerHTML = `
    <style>
      :host {
        position: relative;
        margin-bottom: 20px;
      }

      :host::after {
        content: '';
        position: absolute;
        top: 50%;
        right: -42px;
        transform: translateY(-50%) !important;

        width: 15px;
        height: 4px;
        background: gray;
      }

      :host::before {
        content: '';
        position: absolute;
        top: 50%;
        right: -30px;
        transform: translateY(-50%) !important;

        width: 4px;
        height: calc(100% - 70px);
        background: gray;
      }
    </style>
    <slot></slot>
  `;

class Bracket extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(tempt.content.cloneNode(true));
  }
}

customElements.define("bracket-container", Bracket);
