let resOrg_name: any;
describe("Automation testing for success test cases of organization Module", () => {
  let baseurl = Cypress.env("apiUrl");
  before(() => {
    cy.admin_login();
  });

  /*****************Create organization*****************/
  it("Test case for create organization", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        org_name: Cypress.env("org_name"),
        c_host: Cypress.env("c_host"),
        c_username: Cypress.env("c_username"),
        c_password: Cypress.env("c_password"),
        c_database: Cypress.env("c_database"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      resOrg = body.result.data.organization_id;
      resOrg_name = body.result.data.org_name;
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property(
        "organization_id",
        body.result.data.organization_id
      );
      expect(body.result.data).has.property(
        "org_name",
        body.result.data.org_name
      );
    });
  });

  /********Update organization********/
  it("Test case when do not provide required field ", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/organization/${resOrg}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });

  it("Test case for update organization ", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/organization/${resOrg}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        org_name: Cypress.env("org_name"),
        c_host: Cypress.env("c_host"),
        c_username: Cypress.env("c_username"),
        c_password: Cypress.env("c_password"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });

  /********Test-connection of Database*********/
  it("Test case for DB test-connection", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/test-connection`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        c_host: Cypress.env("c_host"),
        c_username: Cypress.env("c_username"),
        c_password: Cypress.env("c_password"),
        c_db: Cypress.env("c_database"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
      //cy.True(body)
    });
  });

  it("Test case when org_name - org_name should be unique", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        org_name: resOrg_name,
        c_host: Cypress.env("c_host"),
        c_username: Cypress.env("c_username"),
        c_password: Cypress.env("c_password"),
        c_database: Cypress.env("c_database"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });
});
