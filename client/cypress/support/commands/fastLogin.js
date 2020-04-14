import config from "../../config";

function fastLogin(
  email = config.user1.email,
  password = config.user1.password
) {
  cy.visit("");
  cy.get('[data-test="input-email"]').type(email);
  cy.get('[data-test="input-password"]').type(password);
  cy.get('[data-test="submit-button"]').click();
  cy.get('[data-test="feed-page"]');
}

module.exports = fastLogin;
