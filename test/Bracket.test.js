import { expect, fixture, html } from "@open-wc/testing";
import "../components/Bracket/Bracket.js";

it("should not render without children", async () => {
  const el = await fixture(html`<bracket-container></bracket-container>`);

  expect(el).lightDom.to.equal("");
});

it("should render match without the need to import match in this file", async () => {
  const el = await fixture(html`<bracket-match>
    <match-container></match-container>
    <match-container></match-container>
  </bracket-match>`);

  expect(el).dom.to.equal(`<bracket-match>
  <match-container></match-container>
  <match-container></match-container>
  </bracket-match>`);
});
