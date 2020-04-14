import config from "../config";

describe("Login", () => {
  it("Can login and move to feed page", () => {
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

  it("Not logged, you can view profile page and their pictures", () => {
    cy.visit(`/${config.user1.username}`);
    cy.get('[data-test="profile-page"]');
    cy.get('[data-test="postPreview-component"]');
  });
});
