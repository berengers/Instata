import config from "../config";

describe("Create Post", () => {
  it("Create post and find this post first in profile page", () => {
    cy.fastLogin();
    cy.visit("/newPost");

    cy.get('[data-test="input-media-url"]').type(config.post1.mediaUrl);
    cy.get('[data-test="input-description"]').type(config.post1.description);
    cy.get('[data-test="submit-button"]').click();
    cy.get('[data-test="success-container"]');
    cy.visit(`/${config.user1.username}`);
    cy.get('[data-test="profile-page"]');
    cy.get('[data-test="postPreview-component"] img')
      .first()
      .should("have.attr", "src", config.post1.mediaUrl);
  });
});
