describe("Automation testing for success test cases for create businessFlow API", () => {
  const baseurl = Cypress.env("apiUrl");
  before(() => {
    cy.admin_login();
  });
  it("Test cases for create businessFlow API", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/settings/business-flow/${Cypress.env(
        "seqOrg_id"
      )}/${Cypress.env("seqCompany_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        has_virtual_styles: 1,
        collect_sales_tax: 1,
        substitution: 0,
        auto_order_num: 1,
        auto_invoice_num: 0,
        auto_credit_hold: 0,
        ats_lt_order: 0,
        qoh_lt_order: 0,
        oversold: 1,
        change_factor: 0,
        auto_allocation: 0,
        auto_send_invoice: 0,
        confirm_totals: 0,
        use_wh_location: 1,
        hold_confirmation: 0,
        date_format: "DD/MM/YYYY",
        division_specific: 0,
        template_max_size: 4,
      },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });

  it("Test cases for update businessFlow API", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/settings/business-flow/${Cypress.env(
        "seqOrg_id"
      )}/${Cypress.env("seqCompany_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        has_virtual_styles: 1,
        collect_sales_tax: 0,
        substitution: 0,
        auto_order_num: 1,
        auto_invoice_num: 0,
        auto_credit_hold: 0,
        ats_lt_order: 0,
        qoh_lt_order: 0,
        oversold: 1,
        change_factor: 0,
        auto_allocation: 0,
        auto_send_invoice: 0,
        confirm_totals: 0,
        use_wh_location: 1,
        hold_confirmation: 0,
        date_format: "DD/MM/YYYY",
        division_specific: 0,
        template_max_size: 4,
      },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });

  it("Test cases for fetch businessFlow API", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/settings/business-flow/${Cypress.env(
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
          "has_virtual_styles",
          "collect_sales_tax",
          "substitution",
          "auto_order_num",
          "auto_invoice_num",
          "auto_credit_hold",
          "ats_lt_order",
          "qoh_lt_order",
          "oversold",
          "change_factor",
          "auto_allocation",
          "auto_send_invoice",
          "confirm_totals",
          "use_wh_location",
          "hold_confirmation",
          "date_format",
          "division_specific",
          "template_max_size",
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
