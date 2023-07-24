import routes from "../../support/route";
import store_msg from "../../support/store_msg"
let comp_id: Number[];
let flow_id: Number[];
let reqdata
let updateUrl

before(() => {
  cy.admin_login();
  cy.Random();
  cy.RandomNum();
  cy.RandomNumber();
});

function businessFlowRes(data){
  expect(data).has.property("id");
  expect(data).has.property("company_id");
  expect(data).has.property("has_virtual_styles",reqdata.has_virtual_styles);
  expect(data).has.property("collect_sales_tax",reqdata.collect_sales_tax);
  expect(data).has.property("substitution",reqdata.substitution);
  expect(data).has.property("auto_order_num",reqdata.auto_order_num);
  expect(data).has.property("auto_invoice_num",reqdata.auto_invoice_num);
  expect(data).has.property("auto_credit_hold",reqdata.auto_credit_hold);
  expect(data).has.property("ats_lt_order",reqdata.ats_lt_order);
  expect(data).has.property("qoh_lt_order",reqdata.qoh_lt_order);
  expect(data).has.property("oversold",reqdata.oversold);
  expect(data).has.property("change_factor",reqdata.change_factor);
  expect(data).has.property("auto_allocation",reqdata.auto_allocation);
  expect(data).has.property("auto_send_invoice",reqdata.auto_send_invoice);
  expect(data).has.property("confirm_totals",reqdata.confirm_totals);
  expect(data).has.property("use_wh_location",reqdata.use_wh_location);
  expect(data).has.property("hold_confirmation",reqdata.hold_confirmation);
  expect(data).has.property("date_format",reqdata.date_format);
  expect(data).has.property("division_specific",reqdata.division_specific);
  expect(data).has.property("template_max_size",reqdata.template_max_size);
  expect(data).has.property("created_date");
  expect(data).has.property("updated_date");
  expect(data).has.property("created_by");
  expect(data).has.property("updated_by");
};

function businessFlowFetchRes(result){
  result.data.forEach((ele: any) => {
    expect(ele).has.property("id");
    expect(ele).has.property("company_id");
    expect(ele).has.property("has_virtual_styles");
    expect(ele).has.property("collect_sales_tax");
    expect(ele).has.property("substitution");
    expect(ele).has.property("auto_order_num");
    expect(ele).has.property("auto_invoice_num");
    expect(ele).has.property("auto_credit_hold");
    expect(ele).has.property("ats_lt_order");
    expect(ele).has.property("qoh_lt_order");
    expect(ele).has.property("oversold");
    expect(ele).has.property("change_factor");
    expect(ele).has.property("auto_allocation");
    expect(ele).has.property("auto_send_invoice");
    expect(ele).has.property("confirm_totals");
    expect(ele).has.property("use_wh_location");
    expect(ele).has.property("hold_confirmation");
    expect(ele).has.property("date_format");
    expect(ele).has.property("division_specific");
    expect(ele).has.property("created_date");
    expect(ele).has.property("updated_date");
    expect(ele).has.property("created_by");
    expect(ele).has.property("updated_by");
    expect(ele).has.property("template_max_size");
  });
  expect(result).has.property("page");
  expect(result).has.property("perPage");
  expect(result).has.property("totalRecords");
}

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {
 
  it("Test cases for update businessFlow API when do not provide any field", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_company}${Cypress.env("org_id")}${"/fetch"}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [],
        select: [],
        sort: "id",
        orderby: "asc",
        page: 1,
        perPage: 20
      }
    }).then(({ body }) => {
      comp_id = body.result.data.map((ele: any) => ele.id);
      cy.request({
        method: routes.put,
        url: `${routes.business_flow}${Cypress.env("org_id")}/${comp_id[0]}`,
        headers: {
          Authorization: "Bearer " + Cypress.env("authToken")
        },
        body: {}
      }).then(({ body }) => {
        cy.Success(body)
        expect(body.result.data).has.property("id");
        expect(body.result.data).has.property("company_id");
        expect(body.result.data).has.property("has_virtual_styles");
        expect(body.result.data).has.property("collect_sales_tax");
        expect(body.result.data).has.property("substitution");
        expect(body.result.data).has.property("auto_order_num");
        expect(body.result.data).has.property("auto_invoice_num");
        expect(body.result.data).has.property("auto_credit_hold");
        expect(body.result.data).has.property("ats_lt_order");
        expect(body.result.data).has.property("qoh_lt_order");
        expect(body.result.data).has.property("oversold");
        expect(body.result.data).has.property("change_factor");
        expect(body.result.data).has.property("auto_allocation");
        expect(body.result.data).has.property("auto_send_invoice");
        expect(body.result.data).has.property("confirm_totals");
        expect(body.result.data).has.property("use_wh_location");
        expect(body.result.data).has.property("hold_confirmation");
        expect(body.result.data).has.property("date_format");
        expect(body.result.data).has.property("division_specific");
        expect(body.result.data).has.property("template_max_size");
        expect(body.result.data).has.property("created_date");
        expect(body.result.data).has.property("updated_date");
        expect(body.result.data).has.property("created_by");
        expect(body.result.data).has.property("updated_by");
      });
    });
  });

  it(`has_virtual_styles,collect_sales_tax, substitution, auto_order_num, auto_invoice_num,auto_credit_hold, ats_lt_order,
    oversold, change_factor, auto_allocation,auto_send_invoice, confirm_totals, use_wh_location, hold_confirmation, division_specific
    are false(0)`, () => {
    reqdata = {
      has_virtual_styles: 0,
      collect_sales_tax: 0,
      substitution: 0,
      auto_order_num: 0,
      auto_invoice_num: 0,
      auto_credit_hold: 0,
      ats_lt_order: 0,
      qoh_lt_order: 0,
      oversold: 0,
      change_factor: 0,
      auto_allocation: 0,
      auto_send_invoice: 0,
      confirm_totals: 0,
      use_wh_location: 0,
      hold_confirmation: 0,
      date_format: "DD/MM/YYYY",
      division_specific: 0,
      template_max_size: 4,
    };
    cy.request({
      method: routes.put,
      url: `${routes.business_flow}${Cypress.env("org_id")}/${comp_id[0]}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: reqdata,
    }).then(({ body }) => {
      cy.Success(body)
      businessFlowRes(body.result.data)
    });
  });

  it(`has_virtual_styles,collect_sales_tax, substitution, auto_order_num, auto_invoice_num,auto_credit_hold, ats_lt_order,
    oversold, change_factor, auto_allocation,auto_send_invoice, confirm_totals, use_wh_location, hold_confirmation, division_specific
    are true(1)`, () => {
    reqdata ={
      has_virtual_styles: 1,
      collect_sales_tax: 1,
      substitution: 1,
      auto_order_num: 1,
      auto_invoice_num: 1,
      auto_credit_hold: 1,
      ats_lt_order: 1,
      qoh_lt_order: 1,
      oversold: 1,
      change_factor: 1,
      auto_allocation: 1,
      auto_send_invoice: 1,
      confirm_totals: 1,
      use_wh_location: 1,
      hold_confirmation: 1,
      date_format: "DD/MM/YYYY",
      division_specific: 1,
      template_max_size: 4,
    };
    cy.request({
      method: routes.put,
      url: `${routes.business_flow}${Cypress.env("org_id")}/${comp_id[0]}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: reqdata,
    }).then(({ body }) => {
     cy.Success(body)
     businessFlowRes(body.result.data)
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {

  it("Test cases for fetch businessFlow API when do not provide any field", () => {
    cy.request({
      method: routes.post,
      url: `${routes.business_flow}${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {},
    }).then(({ body }) => {
      flow_id = body.result.data.map((ele: any) => ele.id);
      cy.Success(body)
      businessFlowFetchRes( body.result)
    });
  });

  it("Test cases for fetch businessFlow API", () => {
    cy.request({
      method: routes.post,
      url: `${routes.business_flow}${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: flow_id[0],
          },
        ],
        select: [
          "id",
          "company_id",
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
          "created_date",
          "updated_date",
          "created_by",
          "updated_by",
          "template_max_size",
        ],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
    }).then(({ body }) => {
      cy.Success(body)
      businessFlowFetchRes( body.result)
    });
  });

  it("Test cases for fetch businessFlow API when search and selest field are left blank", () => {
    cy.request({
      method: routes.post,
      url: `${routes.business_flow}${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [],
        select: [
          "id",
          "company_id",
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
          "created_date",
          "updated_date",
          "created_by",
          "updated_by",
          "template_max_size",
        ],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20
      },
    }).then(({ body }) => {
      cy.Success(body)
      businessFlowFetchRes( body.result)
    });
  });

  it("Test cases for fetch businessFlow API when search field is left blank", () => {
    cy.request({
      method: routes.post,
      url: `${routes.business_flow}${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [],
        select: [],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20
      }
    }).then(({ body }) => {
      cy.Success(body)
      businessFlowFetchRes( body.result)
    });
  });

  it("Test cases for fetch businessFlow API when select field is left blank", () => {
    cy.request({
      method: routes.post,
      url: `${routes.business_flow}${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: flow_id[0]
          }
        ],
        select: [],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
    }).then(({ body }) => {
      cy.Success(body)
      businessFlowFetchRes( body.result)
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {

  it("Test cases for update businessFlow API when org_id is invalid", () => {
    cy.request({
      method: routes.put,
      url: `${routes.business_flow}${Cypress.env("Random")}/${comp_id[0]}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("org_id", store_msg.invalid_org);
    });
  });

  it("Test cases for update businessFlow API when company_id is invalid", () => {
    cy.request({
      method: routes.put,
      url: `${routes.business_flow}${Cypress.env("org_id")}/${Cypress.env("RandomNumber")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("companyId", store_msg.invalid_company);
    });
  });

  it(`has_virtual_styles,collect_sales_tax, substitution, auto_order_num, auto_invoice_num,auto_credit_hold, ats_lt_order,
      oversold, change_factor, auto_allocation,auto_send_invoice, confirm_totals, use_wh_location, hold_confirmation,division_specific
      and template_max_size must be Number`, () => {
    cy.request({
      method: routes.put,
      url: `${routes.business_flow}${Cypress.env("org_id")}/${comp_id[0]}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        has_virtual_styles: Cypress.env("RandomNum"),
        collect_sales_tax: Cypress.env("RandomNum"),
        substitution: Cypress.env("RandomNum"),
        auto_order_num: Cypress.env("RandomNum"),
        auto_invoice_num: Cypress.env("RandomNum"),
        auto_credit_hold: Cypress.env("RandomNum"),
        ats_lt_order: Cypress.env("RandomNum"),
        qoh_lt_order: Cypress.env("RandomNum"),
        oversold: Cypress.env("RandomNum"),
        change_factor: Cypress.env("RandomNum"),
        auto_allocation: Cypress.env("RandomNum"),
        auto_send_invoice: Cypress.env("RandomNum"),
        confirm_totals: Cypress.env("RandomNum"),
        use_wh_location: Cypress.env("RandomNum"),
        hold_confirmation: Cypress.env("RandomNum"),
        division_specific: Cypress.env("RandomNum"),
        template_max_size: Cypress.env("RandomNum"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("has_virtual_styles");
      expect(body.error.errorDetails).has.property("collect_sales_tax");
      expect(body.error.errorDetails).has.property("substitution");
      expect(body.error.errorDetails).has.property("auto_order_num");
      expect(body.error.errorDetails).has.property("auto_invoice_num");
      expect(body.error.errorDetails).has.property("auto_credit_hold");
      expect(body.error.errorDetails).has.property("ats_lt_order");
      expect(body.error.errorDetails).has.property("qoh_lt_order");
      expect(body.error.errorDetails).has.property("oversold");
      expect(body.error.errorDetails).has.property("change_factor");
      expect(body.error.errorDetails).has.property("auto_allocation");
      expect(body.error.errorDetails).has.property("auto_send_invoice");
      expect(body.error.errorDetails).has.property("confirm_totals");
      expect(body.error.errorDetails).has.property("use_wh_location");
      expect(body.error.errorDetails).has.property("hold_confirmation");
      expect(body.error.errorDetails).has.property("division_specific");
      expect(body.error.errorDetails).has.property("template_max_size");
    });
  });

  it(`has_virtual_styles,collect_sales_tax, substitution, auto_order_num, auto_invoice_num,auto_credit_hold, ats_lt_order,
    oversold, change_factor, auto_allocation,auto_send_invoice, confirm_totals, use_wh_location, hold_confirmation, division_specific
     must be one of [0 or 1]`, () => {
    cy.request({
      method: routes.put,
       url: `${routes.business_flow}${Cypress.env("org_id")}/${comp_id[0]}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        has_virtual_styles: Cypress.env("RandomNumber"),
        collect_sales_tax: Cypress.env("RandomNumber"),
        substitution: Cypress.env("RandomNumber"),
        auto_order_num: Cypress.env("RandomNumber"),
        auto_invoice_num: Cypress.env("RandomNumber"),
        auto_credit_hold: Cypress.env("RandomNumber"),
        ats_lt_order: Cypress.env("RandomNumber"),
        qoh_lt_order: Cypress.env("RandomNumber"),
        oversold: Cypress.env("RandomNumber"),
        change_factor: Cypress.env("RandomNumber"),
        auto_allocation: Cypress.env("RandomNumber"),
        auto_send_invoice: Cypress.env("RandomNumber"),
        confirm_totals: Cypress.env("RandomNumber"),
        use_wh_location: Cypress.env("RandomNumber"),
        hold_confirmation: Cypress.env("RandomNumber"),
        division_specific: Cypress.env("RandomNumber"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("has_virtual_styles");
      expect(body.error.errorDetails).has.property("collect_sales_tax");
      expect(body.error.errorDetails).has.property("substitution");
      expect(body.error.errorDetails).has.property("auto_order_num");
      expect(body.error.errorDetails).has.property("auto_invoice_num");
      expect(body.error.errorDetails).has.property("auto_credit_hold");
      expect(body.error.errorDetails).has.property("ats_lt_order");
      expect(body.error.errorDetails).has.property("qoh_lt_order");
      expect(body.error.errorDetails).has.property("oversold");
      expect(body.error.errorDetails).has.property("change_factor");
      expect(body.error.errorDetails).has.property("auto_allocation");
      expect(body.error.errorDetails).has.property("auto_send_invoice");
      expect(body.error.errorDetails).has.property("confirm_totals");
      expect(body.error.errorDetails).has.property("use_wh_location");
      expect(body.error.errorDetails).has.property("hold_confirmation");
      expect(body.error.errorDetails).has.property("division_specific");
    });
  });

  it("date_format must be accept only date format", () => {
    cy.request({
      method: routes.put,
      url: `${routes.business_flow}${Cypress.env("org_id")}/${comp_id[0]}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        date_format: Cypress.env("Random")
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "date_format","{date_format} must be one of [DD/MM/YYYY, MM/DD/YYYY, YYYY/MM/DD]");
    });
  });

  it("date_format must be string data type", () => {
    cy.request({
      method: routes.put,
      url: `${routes.business_flow}${Cypress.env("org_id")}/${comp_id[0]}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        date_format: Cypress.env("RandomNumber")
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "date_format","{date_format} must be a string");
    });
  });
});

describe(`${store_msg.fail_fetch}${Cypress.spec["fileName"]}`, () => {

  it("Failure test cases for fetch businessFlow API when org_id is invalid", () => {
    cy.request({
      method: routes.post,
      url: `${routes.business_flow}${Cypress.env("Random")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("org_id", store_msg.invalid_org);
    });
  });

  it("Failure Test cases for fetch businessFlow API when wrong input provided in search", () => {
    cy.request({
      method: routes.post,
      url: `${routes.business_flow}${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken")
      },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: Cypress.env("RandomNumber")
          }
        ],
        select: [
          "has_virtual_styles",
          "collect_sales_tax"
        ],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20
      },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });
});
