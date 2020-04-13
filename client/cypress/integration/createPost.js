import config from "../config";

describe("Create Post", () => {
  it("Display an error if missing email", () => {
    cy.fastLogin();
    cy.visit("/newPost");

    cy.get('[data-test="input-media-url"]').type(config.post1.mediaUrl);
    cy.get('[data-test="input-description"]').type(config.post1.description);
    cy.get('[data-test="submit-button"]').click();
    cy.get('[data-test="success-container"]');
    cy.visit(`/${config.user1.username}`);
    cy.get('[data-test="PostPreview-component"] img')
      .first()
      .should("have.attr", "src", config.post1.mediaUrl);
  });
});
