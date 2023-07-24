import store_msg from "../../support/store_msg";

let vendor_type_id: Number;
let vendor_type_code: String;
describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");
  before(() => {
    cy.GetCompanyToken();
  });

  beforeEach(() => {
    cy.Random();
    cy.RandomNum();
    cy.RandomDesc();
    cy.RandomNumber();
    cy.randomBoolean();
  });

  it("Test cases for create API", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/vendor_types/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        code: Cypress.env("Random"),
        name: Cypress.env("Random"),
        description: Cypress.env("RandomDesc"),
        status: Cypress.env("randomBoolean"),
      },
    }).then(({ body }) => {
      vendor_type_id = body.result.data.id;
      vendor_type_code = body.result.data.code;
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("code", body.result.data.code);
      expect(body.result.data).has.property("name", body.result.data.name);
      expect(body.result.data).has.property(
        "description",
        body.result.data.description
      );
      expect(body.result.data).has.property("status", body.result.data.status);
      expect(body.result.data).has.property(
        "created_date",
        body.result.data.created_date
      );
      expect(body.result.data).has.property(
        "created_by",
        body.result.data.created_by
      );
    });
  });

  it("Test cases when optional field are not provided", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/vendor_types/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        code: Cypress.env("Random"),
        name: Cypress.env("Random"),
        // description: Cypress.env("RandomDesc"),
        // status: Cypress.env("randomBoolean"),
      },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("code", body.result.data.code);
      expect(body.result.data).has.property("name", body.result.data.name);
      expect(body.result.data).has.property(
        "created_date",
        body.result.data.created_date
      );
      expect(body.result.data).has.property(
        "created_by",
        body.result.data.created_by
      );
    });
  });

  it("Test cases when optional field are left blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/vendor_types/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        code: Cypress.env("Random"),
        name: Cypress.env("Random"),
        description: "",
        status: Cypress.env("randomBoolean"),
      },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("code", body.result.data.code);
      expect(body.result.data).has.property("name", body.result.data.name);
      expect(body.result.data).has.property(
        "description",
        body.result.data.description
      );
      expect(body.result.data).has.property("status", body.result.data.status);
      expect(body.result.data).has.property(
        "created_date",
        body.result.data.created_date
      );
      expect(body.result.data).has.property(
        "created_by",
        body.result.data.created_by
      );
    });
  });

  it("Test cases when optional field are left null", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/vendor_types/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        code: Cypress.env("Random"),
        name: Cypress.env("Random"),
        description: null,
        status: Cypress.env("randomBoolean"),
      },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("code", body.result.data.code);
      expect(body.result.data).has.property("name", body.result.data.name);
      expect(body.result.data).has.property(
        "description",
        body.result.data.description
      );
      expect(body.result.data).has.property("status", body.result.data.status);
      expect(body.result.data).has.property(
        "created_date",
        body.result.data.created_date
      );
      expect(body.result.data).has.property(
        "created_by",
        body.result.data.created_by
      );
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");
  it("Test cases When do not provide body", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/vendor_types/${vendor_type_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("code", body.result.data.code);
      expect(body.result.data).has.property("name", body.result.data.name);
      expect(body.result.data).has.property(
        "description",
        body.result.data.description
      );
      expect(body.result.data).has.property("status", body.result.data.status);
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

  it("Test cases When do not provide required field", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/vendor_types/${vendor_type_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        // code: vendor_type_code,
        // name: Cypress.env("Random"),
        description: Cypress.env("RandomDesc"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("code", body.result.data.code);
      expect(body.result.data).has.property("name", body.result.data.name);
      expect(body.result.data).has.property(
        "description",
        body.result.data.description
      );
      expect(body.result.data).has.property("status", body.result.data.status);
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

  it("Test cases When do not provide optional field", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/vendor_types/${vendor_type_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        code: vendor_type_code,
        name: Cypress.env("Random"),
        // description: Cypress.env("RandomDesc"),
        // status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("code", body.result.data.code);
      expect(body.result.data).has.property("name", body.result.data.name);
      expect(body.result.data).has.property(
        "description",
        body.result.data.description
      );
      expect(body.result.data).has.property("status", body.result.data.status);
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

  it("Test cases When optional field are left blank", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/vendor_types/${vendor_type_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        description: "",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("code", body.result.data.code);
      expect(body.result.data).has.property("name", body.result.data.name);
      expect(body.result.data).has.property(
        "description",
        body.result.data.description
      );
      expect(body.result.data).has.property("status", body.result.data.status);
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

  it("Test cases When optional field are left null", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/vendor_types/${vendor_type_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        description: null,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("code", body.result.data.code);
      expect(body.result.data).has.property("name", body.result.data.name);
      expect(body.result.data).has.property(
        "description",
        body.result.data.description
      );
      expect(body.result.data).has.property("status", body.result.data.status);
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

  it("Test case for update API", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/vendor_types/${vendor_type_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        code: vendor_type_code,
        name: Cypress.env("Random"),
        description: Cypress.env("RandomDesc"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("code", body.result.data.code);
      expect(body.result.data).has.property("name", body.result.data.name);
      expect(body.result.data).has.property(
        "description",
        body.result.data.description
      );
      expect(body.result.data).has.property("status", body.result.data.status);
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

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");

  it("Test case for fetch API", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/vendor_types/fetch`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: vendor_type_id,
          },
          {
            key: "code",
            operation: "like",
            val: vendor_type_code,
          },
        ],
        searchOr: [
          {
            key: "id",
            operation: "=",
            val: vendor_type_id,
          },
        ],
        searchOrAnd: [
          {
            key: "id",
            operation: "=",
            val: vendor_type_id,
          },
        ],
        select: [
          "id",
          "name",
          "code",
          "description",
          "status",
          "created_date",
          "updated_date",
          "created_by",
          "updated_by",
          "code",
        ],
        sort: "id",
        orderby: "desc",
        page: "1",
        perPage: "20",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("name", ele.name);
        expect(ele).has.property("description", ele.description);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
        expect(ele).has.property("code", ele.code);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch body when do not provide any fields", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/vendor_types/fetch`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("name", ele.name);
        expect(ele).has.property("description", ele.description);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
        expect(ele).has.property("code", ele.code);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch body when not provide search field", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/vendor_types/fetch`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [],
        searchOr: [],
        searchOrAnd: [],
        select: [
          "id",
          "name",
          "code",
          "description",
          "status",
          "created_date",
          "updated_date",
          "created_by",
          "updated_by",
          "code",
        ],
        sort: "id",
        orderby: "desc",
        page: "1",
        perPage: "30",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("name", ele.name);
        expect(ele).has.property("description", ele.description);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
        expect(ele).has.property("code", ele.code);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch body when not provide search and select field", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/vendor_types/fetch`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [],
        searchOr: [],
        searchOrAnd: [],
        select: [],
        sort: "id",
        orderby: "desc",
        page: "1",
        perPage: "10",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("name", ele.name);
        expect(ele).has.property("description", ele.description);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
        expect(ele).has.property("code", ele.code);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch API when not provide select field", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/vendor_types/fetch`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: vendor_type_id,
          },
          {
            key: "code",
            operation: "like",
            val: vendor_type_code,
          },
        ],
        searchOr: [
          {
            key: "id",
            operation: "=",
            val: vendor_type_id,
          },
        ],
        searchOrAnd: [
          {
            key: "id",
            operation: "=",
            val: vendor_type_id,
          },
        ],
        select: [],
        sort: "id",
        orderby: "desc",
        page: "1",
        perPage: "20",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("name", ele.name);
        expect(ele).has.property("description", ele.description);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
        expect(ele).has.property("code", ele.code);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch API when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/vendor_types/fetch`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: Cypress.env("RandomNumber"),
          },
          {
            key: "code",
            operation: "like",
            val: Cypress.env("RandomNumber"),
          },
        ],
        searchOr: [
          {
            key: "id",
            operation: "=",
            val: Cypress.env("RandomNumber"),
          },
        ],
        searchOrAnd: [
          {
            key: "id",
            operation: "=",
            val: Cypress.env("RandomNumber"),
          },
        ],
        select: ["id", "name", "code", "description", "status"],
        sort: "id",
        orderby: "desc",
        page: "1",
        perPage: "20",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });
});

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");

  it("Code should be maximum 40 charector", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/vendor_types/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        code: Cypress.env("RandomDesc"),
        name: Cypress.env("Random"),
        description: Cypress.env("RandomDesc"),
        status: 0,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When code already exist", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/vendor_types/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        code: vendor_type_code,
        name: Cypress.env("Random"),
        description: Cypress.env("RandomDesc"),
        status: 1,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When do not provide required field", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/vendor_types/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "code",
        body.error.errorDetails.code
      );
      expect(body.error.errorDetails).has.property(
        "name",
        body.error.errorDetails.name
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/vendor_types/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        code: "",
        name: "",
        description: Cypress.env("RandomDesc"),
        status: 0,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "code",
        body.error.errorDetails.code
      );
      expect(body.error.errorDetails).has.property(
        "name",
        body.error.errorDetails.name
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Code, name and description should be string", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/vendor_types/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        code: Cypress.env("RandomNumber"),
        name: Cypress.env("RandomNumber"),
        description: Cypress.env("RandomNumber"),
        status: 0,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "code",
        body.error.errorDetails.code
      );
      expect(body.error.errorDetails).has.property(
        "name",
        body.error.errorDetails.name
      );
      expect(body.error.errorDetails).has.property(
        "description",
        body.error.errorDetails.description
      );

      expect(body).has.property("result", body.result);
    });
  });

  it("status should be number", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/vendor_types/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        code: Cypress.env("Random"),
        name: Cypress.env("Random"),
        description: Cypress.env("RandomFucn"),
        status: Cypress.env("RandomNum"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body).has.property("result", body.result);
    });
  });

  it("status must be one of [0 and 1]", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/vendor_types/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        code: Cypress.env("Random"),
        name: Cypress.env("Random"),
        description: Cypress.env("RandomFucn"),
        status: Cypress.env("RandomNumber"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "status",
        body.error.errorDetails.status
      );
      expect(body).has.property("result", body.result);
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");

  it("Test cases When send alphabets along with Id", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/vendor_types/${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        code: Cypress.env("Random"),
        name: Cypress.env("Random"),
        description: Cypress.env("RandomDesc"),
        status: 0,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.chk_id);
    });
  });

  it("Test cases When Id doesn't exist", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/vendor_types/${Cypress.env("RandomNumber")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        code: Cypress.env("Random"),
        name: Cypress.env("Random"),
        description: Cypress.env("RandomDesc"),
        status: 0,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.id);
    });
  });

  it("Test cases When code and name field are empty", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/vendor_types/${vendor_type_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        code: "",
        name: "",
        description: Cypress.env("RandomDesc"),
        status: 0,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "code",
        body.error.errorDetails.code
      );
      expect(body.error.errorDetails).has.property(
        "name",
        body.error.errorDetails.name
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Code should be maximum 40 charector", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/vendor_types/${vendor_type_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        code: Cypress.env("RandomDesc"),
        name: Cypress.env("Random"),
        description: Cypress.env("RandomDesc"),
        status: 0,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Code, name and description should be string", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/vendor_types/${vendor_type_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        code: Cypress.env("RandomNumber"),
        name: Cypress.env("RandomNumber"),
        description: Cypress.env("RandomNumber"),
        status: 0,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "code",
        body.error.errorDetails.code
      );
      expect(body.error.errorDetails).has.property(
        "name",
        body.error.errorDetails.name
      );
      expect(body.error.errorDetails).has.property(
        "description",
        body.error.errorDetails.description
      );

      expect(body).has.property("result", body.result);
    });
  });

  it("status should be number", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/vendor_types/${vendor_type_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        code: Cypress.env("Random"),
        name: Cypress.env("Random"),
        description: Cypress.env("RandomFucn"),
        status: Cypress.env("RandomNum"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("status must be one of [0 and 1]", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/vendor_types/${vendor_type_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        code: Cypress.env("Random"),
        name: Cypress.env("Random"),
        description: Cypress.env("RandomFucn"),
        status: Cypress.env("RandomNumber"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "status",
        body.error.errorDetails.status
      );
      expect(body).has.property("result", body.result);
    });
  });
});

describe(`${store_msg.success_log}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");

  it("Test cases for get-log API", () => {
    let today = new Date().toISOString().slice(0, 10);
    cy.request({
      method: "POST",
      url: `${baseurl}v1/log/getlog`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        module_name: "vendor_types",
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
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.check_log(body);
    });
  });

  it("Test case for track-change-data API", () => {
    let recordId = vendor_type_id.toString();
    cy.request({
      method: "POST",
      url: `${baseurl}v1/log/track_change`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        module: "vendor_types",
        record_id: recordId,
        sort: "_id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property(
        "message",
        "Track-change logs(s) fetched successfully"
      );
      expect(body.result).has.property("data", body.result.data);
      body.result.data.forEach((element: any) => {
        expect(element).has.property("_id", element._id);
        expect(element).has.property("operation", element.operation);
        expect(element).has.property("userId", element.userId);
        expect(element).has.property("username", element.username);
        expect(element).has.property("createdAt", element.createdAt);
      });
    });
  });

  it("Test case for look-up API", () => {
    let name = "vendor_types";
    cy.request({
      method: "GET",
      url: `${baseurl}v1/modules/lookup/${name}`,
   headers: { Authorization: Cypress.env("companyToken") },

      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });
});
