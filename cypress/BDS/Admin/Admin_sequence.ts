import store_msg from "../../support/store_msg";

let compId: Number[];
let sequence_id: Number[];
describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");
  before(() => {
    cy.admin_login();
    cy.Random();
    cy.RandomNum();
    cy.RandomNum_2();
    cy.RandomNumber();
  });
  it("Test cases for update sequence API when do not provide any field", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [],
        select: [],
        sort: "id",
        orderby: "asc",
        page: 1,
        perPage: 20,
      },
    }).then(({ body }) => {
      compId = body.result.data.map((ele: any) => ele.id);
      cy.request({
        method: "PUT",
        url: `${baseurl}v1/admin/settings/sequence/${Cypress.env("org_id")}/${
          compId[0]
        }`,
        headers: {
          Authorization: "Bearer " + Cypress.env("authToken"),
        },
        body: {},
      }).then(({ body }) => {
        cy.log(JSON.stringify(body));
        expect(body).has.property("statusCode", 200);
        expect(body).has.property("success", true);
        expect(body).has.property("error", null);
        expect(body).has.property("result");
        expect(body.result).has.property("message", body.result.message);
        expect(body.result).has.property("data", body.result.data);
        expect(body.result.data).has.property("id", body.result.data.id);
        expect(body.result.data).has.property(
          "company_id",
          body.result.data.company_id
        );
        expect(body.result.data).has.property(
          "order_prefix",
          body.result.data.order_prefix
        );
        expect(body.result.data).has.property(
          "order_next",
          body.result.data.order_next
        );
        expect(body.result.data).has.property(
          "order_length",
          body.result.data.order_length
        );
        expect(body.result.data).has.property(
          "pickticket_prefix",
          body.result.data.pickticket_prefix
        );
        expect(body.result.data).has.property(
          "pickticket_next",
          body.result.data.pickticket_next
        );
        expect(body.result.data).has.property(
          "pickticket_length",
          body.result.data.pickticket_length
        );
        expect(body.result.data).has.property(
          "import_prefix",
          body.result.data.import_prefix
        );
        expect(body.result.data).has.property(
          "import_next",
          body.result.data.import_next
        );
        expect(body.result.data).has.property(
          "import_length",
          body.result.data.import_length
        );
        expect(body.result.data).has.property(
          "domestic_prefix",
          body.result.data.domestic_prefix
        );
        expect(body.result.data).has.property(
          "domestic_next",
          body.result.data.domestic_next
        );
        expect(body.result.data).has.property(
          "domestic_length",
          body.result.data.domestic_length
        );
        expect(body.result.data).has.property(
          "created_date",
          body.result.data.created_date
        );
        expect(body.result.data).has.property(
          "updated_date",
          body.result.data.updated_date
        );
        expect(body.result.data).has.property(
          "created_by",
          body.result.data.created_by
        );
        expect(body.result.data).has.property(
          "updated_by",
          body.result.data.updated_by
        );
      });
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");

  it("Test cases for fetch sequence API when do not provide any field", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/settings/sequence/${Cypress.env(
        "org_id"
      )}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {},
    }).then(({ body }) => {
      sequence_id = body.result.data.map((ele: any) => ele.id);
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("data", body.result.data);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("company_id", ele.company_id);
        expect(ele).has.property("order_prefix", ele.order_prefix);
        expect(ele).has.property("order_next", ele.order_next);
        expect(ele).has.property("order_length", ele.order_length);
        expect(ele).has.property("pickticket_prefix", ele.pickticket_prefix);
        expect(ele).has.property("pickticket_next", ele.pickticket_next);
        expect(ele).has.property("pickticket_length", ele.pickticket_length);
        expect(ele).has.property("import_prefix", ele.import_prefix);
        expect(ele).has.property("import_next", ele.import_next);
        expect(ele).has.property("import_length", ele.import_length);
        expect(ele).has.property("domestic_prefix", ele.domestic_prefix);
        expect(ele).has.property("domestic_next", ele.domestic_next);
        expect(ele).has.property("domestic_length", ele.domestic_length);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test cases for fetch sequence API", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/settings/sequence/${Cypress.env(
        "org_id"
      )}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: sequence_id[0],
          },
        ],
        select: [
          "id",
          "company_id",
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
          "created_date",
          "updated_date",
          "created_by",
          "updated_by",
        ],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("data", body.result.data);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("company_id", ele.company_id);
        expect(ele).has.property("order_prefix", ele.order_prefix);
        expect(ele).has.property("order_next", ele.order_next);
        expect(ele).has.property("order_length", ele.order_length);
        expect(ele).has.property("pickticket_prefix", ele.pickticket_prefix);
        expect(ele).has.property("pickticket_next", ele.pickticket_next);
        expect(ele).has.property("pickticket_length", ele.pickticket_length);
        expect(ele).has.property("import_prefix", ele.import_prefix);
        expect(ele).has.property("import_next", ele.import_next);
        expect(ele).has.property("import_length", ele.import_length);
        expect(ele).has.property("domestic_prefix", ele.domestic_prefix);
        expect(ele).has.property("domestic_next", ele.domestic_next);
        expect(ele).has.property("domestic_length", ele.domestic_length);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test cases for fetch sequence API when search and selest field are left blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/settings/sequence/${Cypress.env(
        "org_id"
      )}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [],
        select: [
          "id",
          "company_id",
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
          "created_date",
          "updated_date",
          "created_by",
          "updated_by",
        ],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("data", body.result.data);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("company_id", ele.company_id);
        expect(ele).has.property("order_prefix", ele.order_prefix);
        expect(ele).has.property("order_next", ele.order_next);
        expect(ele).has.property("order_length", ele.order_length);
        expect(ele).has.property("pickticket_prefix", ele.pickticket_prefix);
        expect(ele).has.property("pickticket_next", ele.pickticket_next);
        expect(ele).has.property("pickticket_length", ele.pickticket_length);
        expect(ele).has.property("import_prefix", ele.import_prefix);
        expect(ele).has.property("import_next", ele.import_next);
        expect(ele).has.property("import_length", ele.import_length);
        expect(ele).has.property("domestic_prefix", ele.domestic_prefix);
        expect(ele).has.property("domestic_next", ele.domestic_next);
        expect(ele).has.property("domestic_length", ele.domestic_length);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test cases for fetch sequence API when search field is left blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/settings/sequence/${Cypress.env(
        "org_id"
      )}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [],
        select: [],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("data", body.result.data);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("company_id", ele.company_id);
        expect(ele).has.property("order_prefix", ele.order_prefix);
        expect(ele).has.property("order_next", ele.order_next);
        expect(ele).has.property("order_length", ele.order_length);
        expect(ele).has.property("pickticket_prefix", ele.pickticket_prefix);
        expect(ele).has.property("pickticket_next", ele.pickticket_next);
        expect(ele).has.property("pickticket_length", ele.pickticket_length);
        expect(ele).has.property("import_prefix", ele.import_prefix);
        expect(ele).has.property("import_next", ele.import_next);
        expect(ele).has.property("import_length", ele.import_length);
        expect(ele).has.property("domestic_prefix", ele.domestic_prefix);
        expect(ele).has.property("domestic_next", ele.domestic_next);
        expect(ele).has.property("domestic_length", ele.domestic_length);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test cases for fetch sequence API when select field is left blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/settings/sequence/${Cypress.env(
        "org_id"
      )}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: sequence_id[0],
          },
        ],
        select: [],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("data", body.result.data);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("company_id", ele.company_id);
        expect(ele).has.property("order_prefix", ele.order_prefix);
        expect(ele).has.property("order_next", ele.order_next);
        expect(ele).has.property("order_length", ele.order_length);
        expect(ele).has.property("pickticket_prefix", ele.pickticket_prefix);
        expect(ele).has.property("pickticket_next", ele.pickticket_next);
        expect(ele).has.property("pickticket_length", ele.pickticket_length);
        expect(ele).has.property("import_prefix", ele.import_prefix);
        expect(ele).has.property("import_next", ele.import_next);
        expect(ele).has.property("import_length", ele.import_length);
        expect(ele).has.property("domestic_prefix", ele.domestic_prefix);
        expect(ele).has.property("domestic_next", ele.domestic_next);
        expect(ele).has.property("domestic_length", ele.domestic_length);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");

  it("Test cases for update sequence API when org_id is invalid", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/settings/sequence/${Cypress.env("Random")}/${
        compId[0]
      }`,
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
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("Test cases for update sequence API when company_id is invalid", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/settings/sequence/${Cypress.env(
        "org_id"
      )}/${Cypress.env("RandomNumber")}`,
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
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it(`order_next,order_length, pickticket_next, pickticket_length, import_next,import_length, domestic_next,
    domestic_length must be Number`, () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/settings/sequence/${Cypress.env("org_id")}/${
        compId[0]
      }`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        order_prefix: "ORD",
        order_next: Cypress.env("RandomNum"),
        order_length: Cypress.env("RandomNum"),
        pickticket_prefix: "PIC",
        pickticket_next: Cypress.env("RandomNum"),
        pickticket_length: Cypress.env("RandomNum"),
        import_prefix: "IMP",
        import_next: Cypress.env("RandomNum"),
        import_length: Cypress.env("RandomNum"),
        domestic_prefix: "DOM",
        domestic_next: Cypress.env("RandomNum"),
        domestic_length: Cypress.env("RandomNum"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body.error.errorDetails).has.property(
        "order_next",
        body.error.errorDetails.order_next
      );
      expect(body.error.errorDetails).has.property(
        "order_length",
        body.error.errorDetails.order_length
      );
      expect(body.error.errorDetails).has.property(
        "pickticket_next",
        body.error.errorDetails.pickticket_next
      );
      expect(body.error.errorDetails).has.property(
        "pickticket_length",
        body.error.errorDetails.pickticket_length
      );
      expect(body.error.errorDetails).has.property(
        "import_next",
        body.error.errorDetails.import_next
      );
      expect(body.error.errorDetails).has.property(
        "import_length",
        body.error.errorDetails.import_length
      );
      expect(body.error.errorDetails).has.property(
        "domestic_next",
        body.error.errorDetails.domestic_next
      );
      expect(body.error.errorDetails).has.property(
        "domestic_length",
        body.error.errorDetails.domestic_length
      );
    });
  });

  it("order_prefix, pickticket_prefix, import_prefix and domestic_prefix must be string data type", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/settings/sequence/${Cypress.env("org_id")}/${
        compId[0]
      }`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        order_prefix: Cypress.env("RandomNumber"),
        order_next: 1001,
        order_length: 10,
        pickticket_prefix: Cypress.env("RandomNumber"),
        pickticket_next: 2001,
        pickticket_length: 20,
        import_prefix: Cypress.env("RandomNumber"),
        import_next: 3001,
        import_length: 30,
        domestic_prefix: Cypress.env("RandomNumber"),
        domestic_next: 4001,
        domestic_length: 40,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "order_prefix",
        body.error.errorDetails.order_prefix
      );
      expect(body.error.errorDetails).has.property(
        "pickticket_prefix",
        body.error.errorDetails.pickticket_prefix
      );
      expect(body.error.errorDetails).has.property(
        "import_prefix",
        body.error.errorDetails.import_prefix
      );
      expect(body.error.errorDetails).has.property(
        "domestic_prefix",
        body.error.errorDetails.domestic_prefix
      );
    });
  });
});

describe(`${store_msg.fail_fetch}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");

  it("FAilure test cases for fetch sequence API when org_id is invalid", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/settings/sequence/${Cypress.env(
        "Random"
      )}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: sequence_id[0],
          },
        ],
        select: [
          "id",
          "company_id",
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
          "created_date",
          "updated_date",
          "created_by",
          "updated_by",
        ],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("Failure Test cases for fetch sequence API when wrong input provided in search", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/settings/sequence/${Cypress.env(
        "org_id"
      )}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: Cypress.env("RandomNumber"),
          },
        ],
        select: [
          "id",
          "company_id",
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
          "created_date",
          "updated_date",
          "created_by",
          "updated_by",
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
