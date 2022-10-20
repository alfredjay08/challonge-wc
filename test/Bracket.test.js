import { expect, fixture, html } from "@open-wc/testing";
import "../components/Bracket/Bracket.js";
import { Match } from "../components/Match/Match.js";

it("should not render without children", async () => {
  const el = await fixture(html`<bracket-container></bracket-container>`);

  expect(el).lightDom.to.equal("");
});

it("should render all light dom elements into shadow dom", async () => {
  const el = await fixture(html`<bracket-container>
    <match-container></match-container>
    <match-container></match-container>
  </bracket-container>`);

  const slotItems = el.shadowRoot.querySelector("slot").assignedElements();

  expect(slotItems[0] instanceof Match).to.be.equal(true);
  expect(slotItems[1] instanceof Match).to.be.equal(true);
});
