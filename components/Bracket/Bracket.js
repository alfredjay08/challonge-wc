import "../Match/Match.js";

const tempt = document.createElement("template");
tempt.innerHTML = `
    <style>
      :host {
        position: relative;
      }

      :host::after {
        content: '';
        position: absolute;
        top: 47%;
        right: -42px;
        transform: translateY(-47%) !important;

        width: 15px;
        height: 4px;
        background: gray;
      }

      :host::before {
        content: '';
        position: absolute;
        top: 39%;
        right: -30px;
        transform: translateY(-39%) !important;

        width: 4px;
        height: calc(100% - 90px);
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

  connectedCallback() {
    this.firstMatchId = +this.getAttribute("bracketId") * 2 - 2 + 1;
    this.isSemi = this.getAttribute("semi") === "semi" ? true : false;
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="match-div" ${
      this.isSemi ? 'style="margin-bottom: 100px"' : ""
    } >
      <match-container matchId=${this.firstMatchId}></match-container>
    </div>
    <div class="match-div">
      <match-container matchId=${this.firstMatchId + 1}></match-container>
    </div>
    `;
  }
}

customElements.define("bracket-container", Bracket);
