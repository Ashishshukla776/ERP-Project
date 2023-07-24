import routes from "../../support/route";
import store_msg from "../../support/store_msg";

before(() => {
  cy.GetCompanyToken();
  cy.Random();
  cy.RandomNumber();
});
describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {
  it("Test case for fetch organization", () => {
    let requestData = {
      search: [
        {
          key: "_id",
          operation: "=",
          val: Cypress.env("org_id"),
        },
      ],
      select: [
        "status",
        "_id",
        "org_name",
        "c_host",
        "c_username",
        "c_database",
        "createdAt",
        "updatedAt",
      ],
      sort: "_id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_org,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      expect(body.result.data.map((ele: any) => ele._id)).to.deep.equal(
        requestData.search.map((item: any) => item.val)
      );
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("status");
        expect(ele).has.property("_id");
        expect(ele).has.property("org_name");
        expect(ele).has.property("c_host");
        expect(ele).has.property("c_username");
        expect(ele).has.property("c_database");
        expect(ele).has.property("createdAt");
        expect(ele).has.property("updatedAt");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch organization when select field are left blank", () => {
    let requestData = {
      search: [
        {
          key: "_id",
          operation: "=",
          val: Cypress.env("org_id"),
        },
      ],
      select: [],
      sort: "_id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_org,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      expect(body.result.data.map((ele: any) => ele._id)).to.deep.equal(
        requestData.search.map((item: any) => item.val)
      );
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("status");
        expect(ele).has.property("_id");
        expect(ele).has.property("org_name");
        expect(ele).has.property("c_host");
        expect(ele).has.property("c_username");
        expect(ele).has.property("c_database");
        expect(ele).has.property("createdAt");
        expect(ele).has.property("updatedAt");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch organization when search field are left blank", () => {
    let requestData = {
      search: [],
      select: [
        "status",
        "_id",
        "org_name",
        "c_host",
        "c_username",
        "c_database",
        "createdAt",
        "updatedAt",
      ],
      sort: "_id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_org,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("status");
        expect(ele).has.property("_id");
        expect(ele).has.property("org_name");
        expect(ele).has.property("c_host");
        expect(ele).has.property("c_username");
        expect(ele).has.property("c_database");
        expect(ele).has.property("createdAt");
        expect(ele).has.property("updatedAt");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch organization when search and select field are left blank", () => {
    let requestData = {
      search: [],
      select: [],
      sort: "_id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_org,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("status");
        expect(ele).has.property("_id");
        expect(ele).has.property("org_name");
        expect(ele).has.property("c_host");
        expect(ele).has.property("c_username");
        expect(ele).has.property("c_database");
        expect(ele).has.property("createdAt");
        expect(ele).has.property("updatedAt");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch organization when do not provide any field", () => {
    cy.request({
      method: routes.post,
      url: routes.fetch_org,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("status");
        expect(ele).has.property("_id");
        expect(ele).has.property("org_name");
        expect(ele).has.property("c_host");
        expect(ele).has.property("c_username");
        expect(ele).has.property("c_database");
        expect(ele).has.property("createdAt");
        expect(ele).has.property("updatedAt");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch organization when wrong data is provided", () => {
    cy.request({
      method: routes.post,
      url: routes.fetch_org,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "_id",
            operation: "=",
            val: Cypress.env("Random"),
          },
        ],
        select: ["_id", "org_name", "status"],
        sort: "_id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
    }).then(({ body }) => {
      cy.Success(body);
    });
  });
});

describe(`${store_msg.success}${"fetch-company"} - ${Cypress.spec["fileName"]}`, () => {
  let baseurl = Cypress.env("apiUrl");

  it("Test case for company by org_id", () => {
    cy.request({
      method: routes.post,
      url: `${baseurl}v1/organization/${Cypress.env("org_id")}/fetch-company`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "org_id",
            operation: "=",
            val: Cypress.env("org_id"),
          },
        ],
        select: [
          "id",
          "name",
          "org_id",
          "created_by",
          "updated_by",
          "created_date",
          "updated_date",
          "status",
          "address",
          "ein_cin",
          "state_id",
          "mongo_id",
          "fax",
          "telephone",
          "email",
        ],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
    }).then(({ body }) => {
      cy.FetchCompByOrg(body);
    });
  });

  it("Test case when serch field are left blank", () => {
    cy.request({
      method: routes.post,
      url: `${baseurl}v1/organization/${Cypress.env("org_id")}/fetch-company`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [],
        select: [
          "id",
          "name",
          "org_id",
          "created_by",
          "updated_by",
          "created_date",
          "updated_date",
          "status",
          "address",
          "ein_cin",
          "state_id",
          "mongo_id",
          "fax",
          "telephone",
          "email",
        ],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
    }).then(({ body }) => {
      cy.FetchCompByOrg(body);
    });
  });

  it("Test case when serch and select field are left blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/organization/${Cypress.env("org_id")}/fetch-company`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [],
        select: [],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
    }).then(({ body }) => {
      cy.FetchCompByOrg(body);
    });
  });

  it("Test case when select field are left blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/organization/${Cypress.env("org_id")}/fetch-company`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "org_id",
            operation: "=",
            val: Cypress.env("org_id"),
          },
        ],
        select: [],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.FetchCompByOrg(body);
    });
  });

  it("Test case when wrong input is provided", () => {
    cy.request({
      method: routes.post,
      url: `${baseurl}v1/organization/${Cypress.env("org_id")}/fetch-company`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: Cypress.env("RandomNumber"),
          },
        ],
        select: ["id", "name", "status"],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
    }).then(({ body }) => {
      cy.Success(body);
    });
  });

  it("Test case when organization id is wrong", () => {
    cy.request({
      method: routes.post,
      url: `${baseurl}v1/organization/${Cypress.env("Random")}/fetch-company`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: "1",
          },
        ],
        select: ["id", "name", "status"],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "org_id","{org_id} is not valid");
    });
  });
});
