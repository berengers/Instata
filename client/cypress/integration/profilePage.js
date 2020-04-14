import config from "../config/config.dev";

describe("Profile Page", () => {
  it("Display settings button to user 1", () => {
    cy.fastLogin(config.user1.email, config.user1.password);
    cy.visit(`/${config.user1.username}`);
    cy.get('[data-test="settings-button"]');
  });

  it("Display unsubscribe button to user 2", () => {
    cy.fastLogin(config.user1.email, config.user1.password);
    cy.visit(`/${config.user2.username}`);
    cy.get('[data-test="unsubscribe-button"]');
  });

  it("Display follow button to user 3", () => {
    cy.fastLogin(config.user1.email, config.user1.password);
    cy.visit(`/${config.user3.username}`);
    cy.get('[data-test="subscribe-button"]');
  });
});
