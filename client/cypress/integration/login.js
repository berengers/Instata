import config from "../config";

describe("Login", () => {
  it("Can login and content page change", () => {
    cy.visit("");
    cy.get('[data-test="input-email"]').type(config.user1.email);
    cy.get('[data-test="input-password"]').type(config.user1.password);
    cy.get('[data-test="submit-button"]').click();
    cy.get('[data-test="feed-page"]');
  });

  it("Display an error if wrong email", () => {
    cy.visit("");
    cy.get('[data-test="input-email"]').type(config.user1.email);
    cy.get('[data-test="input-password"]').type("wrong_password");
    cy.get('[data-test="submit-button"]').click();
    cy.get('[data-test="error-container"]');
  });
});
