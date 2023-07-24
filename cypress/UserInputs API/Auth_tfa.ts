describe("Automation Testing for success test cases of Auth module", () => {
  before(() => {
    cy.admin_login();
  });

  /****************** Verify tfa ****************/
  it("Test case for tfa verify", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/tfa/verify`,
      headers: {
        Authorization: "Bearer " + Cypress.env("AuthToken"),
      },
      body: {
        email: Cypress.env("admin_username"),
        password: Cypress.env("admin_Password"),
        token: Cypress.env("token"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("data", body.result.data);
    });
  });

  /************** tfa setup by email_id **********************/
  it("Test case for tfa setup by email", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/tfa/setup/${Cypress.env("admin_username")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("AuthToken"),
      },
      body: {
        password: Cypress.env("admin_Password"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property(
        "verified",
        body.result.data.verified
      );
      expect(body.result.data.tfa).has.property(
        "secret",
        body.result.data.tfa.secret
      );
      expect(body.result.data.tfa).has.property(
        "tempSecret",
        body.result.data.tfa.tempSecret
      );
      expect(body.result.data.tfa).has.property(
        "dataURL",
        body.result.data.tfa.dataURL
      );
      expect(body.result.data).has.property("tfaURL", body.result.data.tfaURL);
    });
  });
});
