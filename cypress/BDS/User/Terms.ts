import routes from "../../support/route";
import store_msg from "../../support/store_msg";

let term_id: Number;
let term_code: String;
let term_code_1: String;
before(() => {
  cy.GetCompanyToken();
});

beforeEach(() => {
  cy.Random();
  cy.RandomNum();
  cy.RandomNum_2();
  cy.RandomDesc();
  cy.RandomNumber();
  cy.randomBoolean();
});

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {
  it("Test cases for create API", () => {
    let requestData = {
      code: Cypress.env("Random"),
      name: Cypress.env("Random"),
      description: Cypress.env("RandomDesc"),
      term_netdays: Cypress.env("Random"),
      discount: Cypress.env("Random"),
      months: Cypress.env("Random"),
      cutoffday: Cypress.env("Random"),
      is_prepaid: Cypress.env("randomBoolean"),
      status: Cypress.env("randomBoolean"),
    };
    cy.request({
      method: routes.post,
      url: routes.post_terms,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      term_id = body.result.data.id;
      term_code = body.result.data.code;
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("code", requestData.code);
      expect(body.result.data).has.property("name", requestData.name);
      expect(body.result.data).has.property(
        "description",
        requestData.description
      );
      expect(body.result.data).has.property(
        "term_netdays",
        requestData.term_netdays
      );
      expect(body.result.data).has.property("discount", requestData.discount);
      expect(body.result.data).has.property("months", requestData.months);
      expect(body.result.data).has.property("cutoffday", requestData.cutoffday);
      expect(body.result.data).has.property(
        "is_prepaid",
        requestData.is_prepaid
      );
      expect(body.result.data).has.property("status", requestData.status);
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
    });
  });

  it("Test cases for create API when not providing optional fields", () => {
    let requestData = {
      code: Cypress.env("Random"),
      name: Cypress.env("Random"),
    };
    cy.request({
      method: routes.post,
      url: routes.post_terms,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      term_code_1 = body.result.data.code;
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("code", requestData.code);
      expect(body.result.data).has.property("name", requestData.name);
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
    });
  });

  it("Test cases for create API when optional fields are null", () => {
    let requestData = {
      code: Cypress.env("Random"),
      name: Cypress.env("Random"),
      description: null,
      term_netdays: null,
      discount: null,
      months: null,
      cutoffday: null,
    };
    cy.request({
      method: routes.post,
      url: routes.post_terms,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("code", requestData.code);
      expect(body.result.data).has.property("name", requestData.name);
      expect(body.result.data).has.property(
        "description",
        requestData.description
      );
      expect(body.result.data).has.property(
        "term_netdays",
        requestData.term_netdays
      );
      expect(body.result.data).has.property("discount", requestData.discount);
      expect(body.result.data).has.property("months", requestData.months);
      expect(body.result.data).has.property("cutoffday", requestData.cutoffday);
      expect(body.result.data).has.property("is_prepaid");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
    });
  });

  it("Test cases for create API when optional fields are blank", () => {
    let requestData = {
      code: Cypress.env("Random"),
      name: Cypress.env("Random"),
      description: "",
      term_netdays: "",
      discount: "",
      months: "",
      cutoffday: "",
    };
    cy.request({
      method: routes.post,
      url: routes.post_terms,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("code", requestData.code);
      expect(body.result.data).has.property("name", requestData.name);
      expect(body.result.data).has.property(
        "description",
        requestData.description
      );
      expect(body.result.data).has.property(
        "term_netdays",
        requestData.term_netdays
      );
      expect(body.result.data).has.property("discount", requestData.discount);
      expect(body.result.data).has.property("months", requestData.months);
      expect(body.result.data).has.property("cutoffday", requestData.cutoffday);
      expect(body.result.data).has.property("is_prepaid");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {
  it("Test case for update API when not providing any field", () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_terms}${term_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("code");
      expect(body.result.data).has.property("name");
      expect(body.result.data).has.property("description");
      expect(body.result.data).has.property("term_netdays");
      expect(body.result.data).has.property("discount");
      expect(body.result.data).has.property("months");
      expect(body.result.data).has.property("cutoffday");
      expect(body.result.data).has.property("is_prepaid");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
    });
  });

  it("Test case for update API when not providing optional field", () => {
    let requestData = {
      code: Cypress.env("Random"),
      name: Cypress.env("Random"),
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_terms}${term_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("code", requestData.code);
      expect(body.result.data).has.property("name", requestData.name);
      expect(body.result.data).has.property("description");
      expect(body.result.data).has.property("term_netdays");
      expect(body.result.data).has.property("discount");
      expect(body.result.data).has.property("months");
      expect(body.result.data).has.property("cutoffday");
      expect(body.result.data).has.property("is_prepaid");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
    });
  });

  it("Test case for update API when not providing required field", () => {
    let requestData = {
      description: Cypress.env("RandomDesc"),
      term_netdays: Cypress.env("Random"),
      discount: Cypress.env("Random"),
      months: Cypress.env("Random"),
      cutoffday: Cypress.env("Random"),
      is_prepaid: Cypress.env("randomBoolean"),
      status: Cypress.env("randomBoolean"),
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_terms}${term_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("code");
      expect(body.result.data).has.property("name");
      expect(body.result.data).has.property(
        "description",
        requestData.description
      );
      expect(body.result.data).has.property(
        "term_netdays",
        requestData.term_netdays
      );
      expect(body.result.data).has.property("discount", requestData.discount);
      expect(body.result.data).has.property("months", requestData.months);
      expect(body.result.data).has.property("cutoffday", requestData.cutoffday);
      expect(body.result.data).has.property(
        "is_prepaid",
        requestData.is_prepaid
      );
      expect(body.result.data).has.property("status", requestData.status);
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
    });
  });

  it("Test case for update API when optional fielda are null", () => {
    let requestData = {
      description: null,
      term_netdays: null,
      discount: null,
      months: null,
      cutoffday: null,
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_terms}${term_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("code");
      expect(body.result.data).has.property("name");
      expect(body.result.data).has.property(
        "description",
        requestData.description
      );
      expect(body.result.data).has.property(
        "term_netdays",
        requestData.term_netdays
      );
      expect(body.result.data).has.property("discount", requestData.discount);
      expect(body.result.data).has.property("months", requestData.months);
      expect(body.result.data).has.property("cutoffday", requestData.cutoffday);
      expect(body.result.data).has.property("is_prepaid");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
    });
  });

  it("Test case for update API when optional fielda are blank", () => {
    let requestData = {
      description: "",
      term_netdays: "",
      discount: "",
      months: "",
      cutoffday: "",
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_terms}${term_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("code");
      expect(body.result.data).has.property("name");
      expect(body.result.data).has.property(
        "description",
        requestData.description
      );
      expect(body.result.data).has.property(
        "term_netdays",
        requestData.term_netdays
      );
      expect(body.result.data).has.property("discount", requestData.discount);
      expect(body.result.data).has.property("months", requestData.months);
      expect(body.result.data).has.property("cutoffday", requestData.cutoffday);
      expect(body.result.data).has.property("is_prepaid");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
    });
  });

  it("Test case for update API with all field", () => {
    let requestData = {
      code: term_code,
      name: Cypress.env("Random"),
      description: Cypress.env("RandomDesc"),
      term_netdays: Cypress.env("Random"),
      discount: Cypress.env("Random"),
      months: Cypress.env("Random"),
      cutoffday: Cypress.env("Random"),
      is_prepaid: Cypress.env("randomBoolean"),
      status: 1,
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_terms}${term_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("code", requestData.code);
      expect(body.result.data).has.property("name", requestData.name);
      expect(body.result.data).has.property(
        "description",
        requestData.description
      );
      expect(body.result.data).has.property(
        "term_netdays",
        requestData.term_netdays
      );
      expect(body.result.data).has.property("discount", requestData.discount);
      expect(body.result.data).has.property("months", requestData.months);
      expect(body.result.data).has.property("cutoffday", requestData.cutoffday);
      expect(body.result.data).has.property(
        "is_prepaid",
        requestData.is_prepaid
      );
      expect(body.result.data).has.property("status", requestData.status);
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {
  it("Test case for fetch API", () => {
    let requestData = {
      search: [
        {
          key: "id",
          operation: "=",
          val: term_id,
        },
      ],
      select: ["id", "code", "name", "description", "term_netdays", "status"],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      body: requestData,
      url: `${routes.post_terms}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any, index: any) => {
        expect(ele).has.property("id", requestData.search[index].val);
        expect(ele).has.property("code");
        expect(ele).has.property("name");
        expect(ele).has.property("description");
        expect(ele).has.property("term_netdays");
        expect(ele).has.property("status");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
      method: routes.post,
      body: {},
      url: `${routes.post_terms}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("description");
        expect(ele).has.property("term_netdays");
        expect(ele).has.property("discount");
        expect(ele).has.property("months");
        expect(ele).has.property("cutoffday");
        expect(ele).has.property("is_prepaid");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when search field left blank", () => {
    let requestData = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: ["id", "code", "name", "description", "term_netdays", "status"],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      body: requestData,
      url: `${routes.post_terms}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
        expect(ele).has.property("description");
        expect(ele).has.property("term_netdays");
        expect(ele).has.property("status");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when select field left blank", () => {
    let requestData = {
      search: [
        {
          key: "id",
          operation: "=",
          val: term_id,
        },
      ],
      select: [],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      body: requestData,
      url: `${routes.post_terms}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any, index: any) => {
        expect(ele).has.property("id", requestData.search[index].val);
        expect(ele).has.property("code");
        expect(ele).has.property("name");
        expect(ele).has.property("description");
        expect(ele).has.property("term_netdays");
        expect(ele).has.property("status");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when search and select field left blank", () => {
    let requestData = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [],
      sort: "id",
      orderby: "desc",
      page: "1",
      perpage: "20",
    };
    cy.request({
      method: routes.post,
      body: requestData,
      url: `${routes.post_terms}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("description");
        expect(ele).has.property("term_netdays");
        expect(ele).has.property("discount");
        expect(ele).has.property("months");
        expect(ele).has.property("cutoffday");
        expect(ele).has.property("is_prepaid");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_terms}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: Cypress.env("RandomNumber"),
          },
        ],

        select: ["id", "description", "name", "code", "status"],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
    }).then(({ body }) => {
      cy.Success(body);
    });
  });
});

describe(`${store_msg.success_log}${Cypress.spec["fileName"]}`, () => {
  it("Test cases for get-log API", () => {
    let today = new Date().toISOString().slice(0, 10);
    let requestData = {
      module_name: "terms",
      search: [
        {
          key: "createdAt",
          operation: "date_range",
          val: [today, today],
        },
      ],
      select: ["createdAt", "modules"],
      sort: "_id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.get_log,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.check_log(body);
    });
  });

  it("Test case for track-change-data API", () => {
    let recordId = term_id.toString();
    let requestData = {
      module: "terms",
      record_id: recordId,
      sort: "_id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.track_change,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Track_change(body);
    });
  });

  it("Test case for look-up API", () => {
    let name = "terms";
    let obj = {
      statusCode: 200,
      success: true,
      error: null,
      result: {
        message: "Module fields fetched successfully",
        data: {
          fields: [
            "id",
            "code",
            "name",
            "is_prepaid",
            "description",
            "term_netdays",
            "discount",
            "months",
            "cutoffday",
            "status",
            "created_date",
            "updated_date",
            "created_by",
            "updated_by",
          ],
          foreignKey: {},
          child: {},
        },
      },
    };
    cy.request({
      method: routes.get,
      url: `${routes.look_up}${name}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(JSON.stringify(body)).to.deep.equal(JSON.stringify(obj));
    });
  });
});

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {
  it("Code will be maximum 40 charector", () => {
    let requestData = {
      code: Cypress.env("RandomDesc"),
      name: Cypress.env("Random"),
    };
    cy.request({
      method: routes.post,
      url: routes.post_terms,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When code already exist", () => {
    let requestData = {
      code: term_code,
      name: Cypress.env("Random"),
    };
    cy.request({
      method: routes.post,
      url: routes.post_terms,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When do not provide any field data", () => {
    cy.request({
      method: routes.post,
      url: routes.post_terms,
      body: {},
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
    });
  });

  it("Test cases When reuired fields are empty", () => {
    let requestData = {
      code: "",
      name: "",
    };
    cy.request({
      method: routes.post,
      url: routes.post_terms,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
    });
  });

  it("code, name, description, term_netdays, discount, months and cutoffday should be string", () => {
    let requestData = {
      code: Cypress.env("RandomNumber"),
      name: Cypress.env("RandomNumber"),
      description: Cypress.env("RandomNumber"),
      term_netdays: Cypress.env("RandomNumber"),
      discount: Cypress.env("RandomNumber"),
      months: Cypress.env("RandomNumber"),
      cutoffday: Cypress.env("RandomNumber"),
    };
    cy.request({
      method: routes.post,
      url: routes.post_terms,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
      expect(body.error.errorDetails).has.property("description");
      expect(body.error.errorDetails).has.property("term_netdays");
      expect(body.error.errorDetails).has.property("discount");
      expect(body.error.errorDetails).has.property("months");
      expect(body.error.errorDetails).has.property("cutoffday");
    });
  });

  it("is_prepaid and status should be number", () => {
    let requestData = {
      is_prepaid: Cypress.env("RandomNum"),
      status: Cypress.env("RandomNum"),
    };
    cy.request({
      method: routes.post,
      url: routes.post_terms,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("is_prepaid");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("is_prepaid and status must be one of [0 and 1]", () => {
    let requestData = {
      is_prepaid: Cypress.env("RandomNumber"),
      status: Cypress.env("RandomNumber"),
    };
    cy.request({
      method: routes.post,
      url: routes.post_terms,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("is_prepaid");
      expect(body.error.errorDetails).has.property("status");
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {
  it("Code will be maximum 40 charector", () => {
    let requestData = {
      code: Cypress.env("RandomDesc"),
      name: Cypress.env("Random"),
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_terms}${term_id}`,
      body: requestData,
      failOnStatusCode: false,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When code already exist", () => {
    let requestData = {
      code: term_code_1,
      name: Cypress.env("Random"),
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_terms}${term_id}`,
      body: requestData,
      failOnStatusCode: false,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("Test cases term_id is provided as string ", () => {
    cy.request({
      method: routes.put,
      body: {},
      failOnStatusCode: false,
      url: `${routes.post_terms}${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.chk_id);    
    });
  });

  it("Test cases When Id doesn't exist", () => {
    cy.request({
      method: routes.put,
      body: {},
      failOnStatusCode: false,
      url: `${routes.post_terms}${Cypress.env("RandomNumber")}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.id);
    });
  });

  it("Test cases When required fields are empty", () => {
    let requestData = {
      code: "",
      name: "",
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_terms}${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
    });
  });

  it("code, name, description, term_netdays, discount, months and cutoffday should be string", () => {
    let requestData = {
      code: Cypress.env("RandomNumber"),
      name: Cypress.env("RandomNumber"),
      description: Cypress.env("RandomNumber"),
      term_netdays: Cypress.env("RandomNumber"),
      discount: Cypress.env("RandomNumber"),
      months: Cypress.env("RandomNumber"),
      cutoffday: Cypress.env("RandomNumber"),
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_terms}${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
      expect(body.error.errorDetails).has.property("description");
      expect(body.error.errorDetails).has.property("term_netdays");
      expect(body.error.errorDetails).has.property("discount");
      expect(body.error.errorDetails).has.property("months");
      expect(body.error.errorDetails).has.property("cutoffday");
    });
  });

  it("is_prepaid and status should be number", () => {
    let requestData = {
      is_prepaid: Cypress.env("RandomNum"),
      status: Cypress.env("RandomNum"),
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_terms}${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("is_prepaid");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("is_prepaid and status must be one of [0 and 1]", () => {
    let requestData = {
      is_prepaid: Cypress.env("RandomNumber"),
      status: Cypress.env("RandomNumber"),
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_terms}${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("is_prepaid");
      expect(body.error.errorDetails).has.property("status");
    });
  });
});
