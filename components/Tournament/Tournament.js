import "../Bracket/Bracket.js";
import "../Match/Match.js";

const matches = [
  {
    _id: 1,
    players: [
      { _id: 1, name: "Alicred", score: 1 },
      { _id: 2, name: "Derkila", score: 4 },
    ],
    round: 1,
  },
  {
    _id: 2,
    players: [
      { _id: 3, name: "Luffy", score: 1 },
      { _id: 4, name: "Roger", score: 4 },
    ],
    round: 1,
  },
  {
    _id: 3,
    players: [
      { _id: 5, name: "Doflamingo", score: 5 },
      { _id: 6, name: "Crocodile", score: 0 },
    ],
    round: 1,
  },
  {
    _id: 4,
    players: [
      { _id: 7, name: "Dendi", score: 4 },
      { _id: 8, name: "Pudge", score: 1 },
    ],
    round: 1,
  },
  {
    _id: 5,
    players: [
      { _id: 2, name: "Derkila", score: 2 },
      { _id: 4, name: "Roger", score: 3 },
    ],
    round: 2,
  },
  {
    _id: 6,
    players: [
      { _id: 5, name: "Doflamingo", score: 5 },
      { _id: 7, name: "Dendi", score: 0 },
    ],

    round: 2,
  },
  {
    _id: 7,
    players: [
      { _id: 4, name: "Roger", score: 3 },
      { _id: 5, name: "Doflamingo", score: 2 },
    ],

    round: 3,
  },
];

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

      slot {
        box-sizing: border-box;
        width: 33%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    </style>

    <slot name="round-1"></slot>
    <slot name="round-2"></slot>
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

  generateMatchMarkup(match) {
    return `
      <match-container matchId="${match._id}" ${
      match.round === 2 && match._id % 2 !== 0 ? "semi" : ""
    }>
        ${match.players
          .map(
            (player) => `
            <div class="player-card" data-playerId="${player._id}">
              <div class="card-name">
                <p>${player.name}</p>
              </div>
              <div class="card-score ${player.score > 2 ? "winner" : ""}">
                <p>${player.score}</p>
              </div>
            </div>
        `
          )
          .join("")}
      </match-container>
    `;
  }

  render() {
    let markup = "";

    for (let i = 0; i < matches.length - 1; i += 2) {
      markup += `
        <bracket-container slot="round-${matches[i].round}">
          ${this.generateMatchMarkup(matches[i])}
          
          ${this.generateMatchMarkup(matches[i + 1])}
        </bracket-container>
      `;
    }

    markup += this.generateMatchMarkup(matches[6]);

    this.innerHTML = markup;
  }
}

customElements.define("tournament-container", Tournament);
