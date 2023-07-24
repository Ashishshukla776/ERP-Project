import routes from "../../support/route";
import store_msg from "../../support/store_msg";

before(() => {
  cy.admin_login();
  cy.Random();
  cy.RandomNum();
  cy.RandomNumber();
});

describe("success test cases Get layouts", () => {
  it("Test case for get list of layout available in Db", () => {
    let requestData = {
      type: Cypress.env("layout_type"),
      status: 1,
    };
    cy.request({
      method: routes.post,
      body: requestData,
      url: `${routes.post_layout}${Cypress.env("org_id")}/${Cypress.env(
        "layout_copm"
      )}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("company_id");
      expect(body.result.data).has.property("name");
      expect(body.result.data).has.property("type");
      expect(body.result.data).has.property("status");
    });
  });

  it("Test case for get list of layout available for this type", () => {
    let requestData = { type: Cypress.env("layout_type") };
    cy.request({
      method: routes.post,
      body: requestData,
      url: `${routes.post_layout}${Cypress.env("org_id")}${"/"}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", store_msg.layout_msg);
      expect(body.result).has.property("data");
    });
  });
});

describe("Failure test cases Get list of layout available in Db", () => {
  it("Test case when org_id is invalid", () => {
    let requestData = {
      type: Cypress.env("layout_type"),
      status: 1,
    };
    cy.request({
      method: routes.post,
      body: requestData,
      url: `${routes.post_layout}${Cypress.env("Random")}/${Cypress.env(
        "layout_copm"
      )}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("org_id");
    });
  });

  it("Test case when company_id is invalid", () => {
    let requestData = {
      type: Cypress.env("layout_type"),
      status: 1,
    };
    cy.request({
      method: routes.post,
      body: requestData,
      url: `${routes.post_layout}${Cypress.env("org_id")}/${Cypress.env(
        "RandomNumber"
      )}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("company_id");
    });
  });

  it("Test case when required field is not provided", () => {
    cy.request({
      method: routes.post,
      body: {},
      url: `${routes.post_layout}${Cypress.env("org_id")}/${Cypress.env(
        "layout_copm"
      )}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("type");
    });
  });

  it("Test case when required field is left blank", () => {
    let requestData = { type: "" };
    cy.request({
      method: routes.post,
      body: requestData,
      url: `${routes.post_layout}${Cypress.env("org_id")}/${Cypress.env(
        "layout_copm"
      )}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("type");
    });
  });

  it("type must be define like [SO, PT]", () => {
    let requestData = { type: Cypress.env("Random") };
    cy.request({
      method: routes.post,
      body: requestData,
      url: `${routes.post_layout}${Cypress.env("org_id")}/${Cypress.env(
        "layout_copm"
      )}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("type");
    });
  });

  it("type must be String", () => {
    let requestData = { type: Cypress.env("RandomNumber") };
    cy.request({
      method: routes.post,
      body: requestData,
      url: `${routes.post_layout}${Cypress.env("org_id")}/${Cypress.env(
        "layout_copm"
      )}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("type");
    });
  });

  it("status must be Number", () => {
    let requestData = {
      type: Cypress.env("layout_type"),
      status: Cypress.env("RandomNum"),
    };
    cy.request({
      method: routes.post,
      body: requestData,
      url: `${routes.post_layout}${Cypress.env("org_id")}/${Cypress.env(
        "layout_copm"
      )}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("status must be one of [0 or 1]", () => {
    let requestData = {
      type: Cypress.env("layout_type"),
      status: Cypress.env("RandomNumber"),
    };
    cy.request({
      method: routes.post,
      body: requestData,
      url: `${routes.post_layout}${Cypress.env("org_id")}/${Cypress.env(
        "layout_copm"
      )}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });
});

describe("Failure test cases Get list of layout available for this type", () => {
  it("Test case when org_id is invalid", () => {
    let requestData = {
      type: Cypress.env("layout_type"),
    };
    cy.request({
      method: routes.post,
      body: requestData,
      url: `${routes.post_layout}${Cypress.env("Random")}${"/"}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("org_id");
    });
  });

  it("Test case when required field is not provided", () => {
    cy.request({
      method: routes.post,
      body: {},
      url: `${routes.post_layout}${Cypress.env("org_id")}${"/"}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("type");
    });
  });

  it("Test case when required field is left blank", () => {
    let requestData = { type: "" };
    cy.request({
      method: routes.post,
      body: requestData,
      url: `${routes.post_layout}${Cypress.env("org_id")}${"/"}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("type");
    });
  });

  it("type must be define like [SO, PT,IP or IS]", () => {
    let requestData = {
      type: Cypress.env("Random"),
    };
    cy.request({
      method: routes.post,
      body: requestData,
      url: `${routes.post_layout}${Cypress.env("org_id")}${"/"}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("type");
    });
  });

  it("type must be String", () => {
    let requestData = {
      type: Cypress.env("RandomNumber"),
    };
    cy.request({
      method: routes.post,
      body: requestData,
      url: `${routes.post_layout}${Cypress.env("org_id")}${"/"}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("type").to.be.string;
    });
  });
});
