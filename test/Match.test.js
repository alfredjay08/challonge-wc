import { expect, fixture, html } from "@open-wc/testing";
import "../components/Match/Match.js";

describe("Validate Match Render", () => {
  it("should not render without children", async () => {
    const el = await fixture(html`<match-container></match-container>`);

    expect(el).lightDom.to.equal("");
  });

  it("should able to accept attribute for custom style", async () => {
    const withAttr = await fixture(
      html`<match-container semi></match-container>`
    );
    const withoutAttr = await fixture(
      html`<match-container></match-container>`
    );

    expect(getComputedStyle(withAttr).marginBottom).to.equal("140px");
    expect(getComputedStyle(withoutAttr).marginBottom).to.equal("50px");
  });

  it("should render match with any number of players", async () => {
    const el = await fixture(html`<match-container>
      <div class="player-card"></div>
      <div class="player-card"></div>
      <div class="player-card"></div>
    </match-container>`);

    await el.updateComplete;

    expect(el).lightDom.to.equal(`
        <div class="player-card"></div>
        <div class="player-card"></div>
        <div class="player-card"></div>
    `);

    expect(el).shadowDom.to.equal(`
        <slot></slot>
    `);
  });
});
