import config from "../config/config.dev";

describe("Profile Page", () => {
  it("Display follow button ti user 3", () => {
    cy.fastLogin(config.user1.email, config.user1.password);
    cy.visit(`/${config.user1.username}`);
    cy.get('[data-test="settings-button"]');
    cy.visit(`/${config.user3.username}`);
    cy.get('[data-test="subscribe-button"]');
  });
});
