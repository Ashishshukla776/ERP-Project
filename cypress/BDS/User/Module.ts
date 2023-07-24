import routes from "../../support/route";
import store_msg from "../../support/store_msg";
before(() => {
  cy.GetCompanyToken();
  cy.Random();
});
let Module_id: Number[];
describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {
  it("Test case for fetch Module when don't provide any field", () => {
    cy.request({
      method: routes.post,
      url: routes.fetch_module,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
    }).then(({ body }) => {
      Module_id = body.result.data.map((ele: any) => ele.id);
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      expect(body.result).has.property("data");
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("name");
        expect(ele).has.property("display_name");
        expect(ele).has.property("parent_menu_name");
        expect(ele).has.property("parent_menu_icon");
        expect(ele).has.property("menu_icon");
        expect(ele).has.property("link");
        expect(ele).has.property("order");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele.access).has.property("show_menu");
        expect(ele.access).has.property("read");
        expect(ele.access).has.property("update");
        expect(ele.access).has.property("create");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch Module when do not provide search field", () => {
    let requestData = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [
        "id",
        "name",
        "display_name",
        "parent_menu_name",
        "order",
        "status",
      ],
      sort: "id",
      orderby: "desc",
      page: "1",
      perPage: "20",
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_module,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      expect(body.result).has.property("data");
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("name");
        expect(ele).has.property("display_name");
        expect(ele).has.property("parent_menu_name");
        expect(ele).has.property("order");
        expect(ele).has.property("status");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch Module when do not provide search and select field", () => {
    let requestData = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [],
      sort: "id",
      orderby: "desc",
      page: "1",
      perPage: "50",
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_module,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      expect(body.result).has.property("data");
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("name");
        expect(ele).has.property("display_name");
        expect(ele).has.property("parent_menu_name");
        expect(ele).has.property("parent_menu_icon");
        expect(ele).has.property("menu_icon");
        expect(ele).has.property("link");
        expect(ele).has.property("order");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("access");
        // expect(ele.access).has.property("read");
        // expect(ele.access).has.property("update");
        // expect(ele.access).has.property("create");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch Module", () => {
    let requestData = {
      search: [
        {
          key: "id",
          operation: "=",
          val: Module_id[0],
        },
      ],
      select: [
        "id",
        "name",
        "display_name",
        "parent_menu_name",
        "order",
        "status",
      ],
      sort: "id",
      orderby: "desc",
      page: "1",
      perPage: "20",
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_module,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      expect(body.result).has.property("data");
      expect(body.result.data.map((ele: any) => ele.id)).to.deep.equal(
        requestData.search.map((item: any) => item.val)
      );
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("name");
        expect(ele).has.property("display_name");
        expect(ele).has.property("parent_menu_name");
        expect(ele).has.property("order");
        expect(ele).has.property("status");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch Module when  provide invalid data in search field", () => {
    cy.request({
      method: routes.post,
      url: routes.fetch_module,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: "1111111111",
          },
        ],
        select: ["id", "name", "status"],
        sort: "id",
        orderby: "desc",
        page: "1",
        perPage: "20",
      },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });
});

describe(`${store_msg.fail}${"look-up"} - ${Cypress.spec["fileName"]}`, () => {
  
  it("Test case for look-up API when wrong/invalid module_name is provided", () => {
    cy.request({
      method: routes.get,
      url: `${routes.look_up}${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });
});
