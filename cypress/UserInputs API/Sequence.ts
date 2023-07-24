describe("Automation testing for success test cases for create sequence API", () => {
  const baseurl = Cypress.env("apiUrl");
  before(() => {
    cy.admin_login();
  });
  it("Test cases for create sequence API", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/settings/sequence/${Cypress.env(
        "seqOrg_id"
      )}/${Cypress.env("seqCompany_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        order_prefix: "ORD",
        order_next: 1001,
        order_length: 10,
        pickticket_prefix: "PIC",
        pickticket_next: 2001,
        pickticket_length: 20,
        import_prefix: "IMP",
        import_next: 3001,
        import_length: 30,
        domestic_prefix: "DOM",
        domestic_next: 4001,
        domestic_length: 40,
      },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });

  it("Test cases for update sequence API", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/settings/sequence/${Cypress.env(
        "seqOrg_id"
      )}/${Cypress.env("seqCompany_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        order_prefix: "ORD",
        order_next: 1001,
        order_length: 10,
        pickticket_prefix: "PIC",
        pickticket_next: 2001,
        pickticket_length: 20,
        import_prefix: "IMP",
        import_next: 3001,
        import_length: 30,
        domestic_prefix: "DOM",
        domestic_next: 4001,
        domestic_length: 40,
      },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });

  it("Test cases for fetch sequence API", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/settings/sequence/${Cypress.env(
        "seqOrg_id"
      )}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: 1,
          },
        ],
        select: [
          "order_prefix",
          "order_next",
          "order_length",
          "pickticket_prefix",
          "pickticket_next",
          "pickticket_length",
          "import_prefix",
          "import_next",
          "import_length",
          "domestic_prefix",
          "domestic_next",
          "domestic_length",
        ],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });
});
