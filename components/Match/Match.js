import { matches } from "../../model.js";

const tempt = document.createElement("template");
tempt.innerHTML = `
    <style>
      :host {
        display: flex;
        flex-direction: column;
        background: #181818;
        color: #fff;
        width: 130px;
        margin-bottom: 20px;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
        border-radius: 3px;

        position: relative;
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
    const match = matches.find(
      (match) => match._id === +this.getAttribute("matchId")
    );

    this.players = match.players;
    this.render();
  }

  render() {
    const [playerOne, playerTwo] = this.players;

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

    this.innerHTML = `
      ${style}
      <div class="player-card" data-playerId="${playerOne._id}">
        <div class="card-name">
          <p>${playerOne.name}</p>
        </div>
        <div class="card-score ${
          playerOne.score > playerTwo.score ? "winner" : ""
        }">
          <p>${playerOne.score}</p>
        </div>
      </div>  

      <div class="player-card" data-playerId="${playerTwo._id}">
        <div class="card-name">
          <p>${playerTwo.name}</p>
        </div>
        <div class="card-score ${
          playerOne.score < playerTwo.score ? "winner" : ""
        }">
          <p>${playerTwo.score}</p>
        </div>
      </div>  
    `;
  }
}

customElements.define("match-container", Match);
