import routes from "../../support/route";
import store_msg from "../../support/store_msg";
before(() => {
  cy.GetCompanyToken();
  cy.RandomNumber();
});
let fetchRole_id: Number[];

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {
  it("Test case when don't provide any field", () => {
    cy.request({
      method: routes.post,
      url: routes.fetch_role,
      body: {},
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      fetchRole_id = body.result.data.map((ele: any) => ele.id);
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      body.result.data.forEach((element: any) => {
        expect(element).has.property("id");
        expect(element).has.property("name");
        expect(element).has.property("status");
        expect(element).has.property("created_date");
        expect(element).has.property("updated_date");
        expect(element).has.property("created_by");
        expect(element).has.property("updated_by");
        expect(element).has.property("created_role_id");
        expect(element).has.property("is_all_access");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case when provide all field", () => {
    let requestData = {
      search: [
        {
          key: "id",
          operation: "=",
          val: fetchRole_id[0],
        },
      ],
      select: ["id", "name", "status", "created_by", "created_role_id"],
      sort: "id",
      orderby: "asc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_role,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data.map((ele: any) => ele.id)).to.deep.equal(
        requestData.search.map((item: any) => item.val)
      );
      body.result.data.forEach((element: any) => {
        expect(element).has.property("id");
        expect(element).has.property("name");
        expect(element).has.property("status");
        expect(element).has.property("created_by");
        expect(element).has.property("created_role_id");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case when search field are left blank", () => {
    let requestData = {
      search: [],
      select: ["id", "name", "status", "created_by", "created_role_id"],
      sort: "id",
      orderby: "asc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_role,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((element: any) => {
        expect(element).has.property("id");
        expect(element).has.property("name");
        expect(element).has.property("status");
        expect(element).has.property("created_by");
        expect(element).has.property("created_role_id");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case when search and select field are left blank", () => {
    let requestData = {
      search: [],
      select: [],
      sort: "id",
      orderby: "asc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_role,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      body.result.data.forEach((element: any) => {
        expect(element).has.property("id");
        expect(element).has.property("name");
        expect(element).has.property("status");
        expect(element).has.property("created_date");
        expect(element).has.property("updated_date");
        expect(element).has.property("created_by");
        expect(element).has.property("updated_by");
        expect(element).has.property("created_role_id");
        expect(element).has.property("is_all_access");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case when select field are left blank", () => {
    let requestData = {
      search: [
        {
          key: "id",
          operation: "=",
          val: fetchRole_id[0],
        },
      ],
      select: [],
      sort: "id",
      orderby: "asc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_role,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      expect(body.result.data.map((ele: any) => ele.id)).to.deep.equal(
        requestData.search.map((item: any) => item.val)
      );
      body.result.data.forEach((element: any) => {
        expect(element).has.property("id");
        expect(element).has.property("name");
        expect(element).has.property("status");
        expect(element).has.property("created_date");
        expect(element).has.property("updated_date");
        expect(element).has.property("created_by");
        expect(element).has.property("updated_by");
        expect(element).has.property("created_role_id");
        expect(element).has.property("is_all_access");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case when invalid input is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: routes.fetch_role,
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
});
