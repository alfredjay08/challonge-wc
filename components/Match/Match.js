const tempt = document.createElement("template");
tempt.innerHTML = `
    <style>
      :host {
        display: flex;
        flex-direction: column;
        background: #181818;
        color: #fff;
        width: 130px;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
        border-radius: 3px;

        position: relative;
      }

      :host(:first-child) {
        margin-bottom: 50px;
      }

      :host([semi]) {
        margin-bottom: 140px !important;
      }

      :host::before {
        content: attr(matchId);
        position: absolute;
        top: 50%;
        left: -20px;
        transform: translateY(-50%) !important;
        color: gray;
      }

      :host::after {
        content: '';
        position: absolute;
        top: 50%;
        right: -30px;
        transform: translateY(-50%) !important;

        width: 15px;
        height: 4px;
        background: gray;
      }
    </style>
    <slot></slot>
  `;

class Match extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(tempt.content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const style = `
    <style>
      .player-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .player-card > div {
        padding: 0.5rem;
      }

      p {
        margin: 0;

      }

      .card-score {
        background: gray
      }

      .card-score.winner {
        background: orange
      }
    </style>
  `;

    this.innerHTML += style;
  }
}

customElements.define("match-container", Match);
