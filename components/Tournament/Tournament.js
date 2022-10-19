import "../Bracket/Bracket.js";
import "../Match/Match.js";

const tempt = document.createElement("template");
tempt.innerHTML = `
    <style>
      :host {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 97vh;
        max-width: 700px;
        width: 100%;

        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        }
    </style>
    <slot></slot>
  `;

class Tournament extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(tempt.content.cloneNode(true));
  }
  connectedCallback() {
    this.render();

    this.addEventListener("mouseover", function (e) {
      const players = [
        ...e.currentTarget.getElementsByClassName("player-card"),
      ];
      const player = e.target.closest(".player-card");

      if (!player) return;

      const playerId = player.dataset.playerid;

      players
        .filter((player) => {
          return player.dataset.playerid !== playerId;
        })
        .forEach((player) => {
          player.style.opacity = "0.2";
        });
    });

    this.addEventListener("mouseout", function (e) {
      const players = [
        ...e.currentTarget.getElementsByClassName("player-card"),
      ];

      players.forEach((player) => {
        player.style.opacity = "1";
      });
    });
  }

  render() {
    const style = `
    <style>
      .stage {
        box-sizing: border-box;
        width: 33%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    </style>
    `;

    const markup = `
      ${style}
      <div class="stage">
        <bracket-container bracketId="1"></bracket-container>
        
        <bracket-container bracketId="2"></bracket-container>
      </div>
      <div class="stage">
        <bracket-container bracketId="3" semi="semi"></bracket-container>
      </div>
      <div class="stage">
        <match-container matchId="7"></match-container>
      </div>
    `;

    this.innerHTML = markup;
  }
}

customElements.define("tournament-container", Tournament);
