import routes from "../../support/route";
import store_msg from "../../support/store_msg";
before(() => {
  cy.GetCompanyToken();
  cy.Get_Role_id();
  cy.RandomNumber();
  cy.Random();
  cy.RandomNum();
  cy.RandomNum_2();
});
let useModule_id: Number[];
describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {
  //Create new role_module
  it("Test case when show_menu, read, update and create are false(0)", () => {
    
    cy.request({
      method: routes.post,
      url: routes.fetch_module,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [],
        select: ["id"],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
    }).then(({ body }) => {
      useModule_id = body.result.data.map((ele: any) => ele.id);
      let requestData = {
        role_id: Cypress.env("roleId"),
        access: [
          {
            module_id: useModule_id[0],
            access: {
              show_menu: 0,
              read: 0,
              update: 0,
              create: 0,
            },
          },
        ],
      };
      cy.request({
        method: routes.post,
        url: routes.post_roleModule,
        body: requestData,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        expect(body).has.property("statusCode", 200);
        expect(body).has.property("success", true);
        expect(body).has.property("error", null);
        expect(body).has.property("result");
        expect(body.result).has.property("message");
        body.result.data.forEach((ele: any, index: any) => {
          expect(ele).has.property("id");
          expect(ele).has.property("role_id", requestData.role_id);
          expect(ele).has.property(
            "module_id",
            requestData.access[index].module_id
          );
          expect(ele.access).has.property(
            "show_menu",
            requestData.access[index].access.show_menu
          );
          expect(ele.access).has.property(
            "read",
            requestData.access[index].access.read
          );
          expect(ele.access).has.property(
            "update",
            requestData.access[index].access.update
          );
          expect(ele.access).has.property(
            "create",
            requestData.access[index].access.create
          );
          expect(ele).has.property("status");
          expect(ele).has.property("created_date");
        });
      });
    });
  });

  it("Test case when access field is left blank", () => {
    let requestData = {
      role_id: Cypress.env("roleId"),
      access: [
        {
          module_id: useModule_id[0],
          access: {},
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_roleModule,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      body.result.data.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("role_id", requestData.role_id);
        expect(ele).has.property(
          "module_id",
          requestData.access[index].module_id
        );
        expect(ele).has.property("access");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
      });
    });
  });

  it("Test case when show_menu, read, update and create are true(1)", () => {
    let requestData = {
      role_id: Cypress.env("roleId"),
      access: [
        {
          module_id: useModule_id[0],
          access: {
            show_menu: 1,
            read: 1,
            update: 1,
            create: 1,
          },
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_roleModule,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      body.result.data.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("role_id", requestData.role_id);
        expect(ele).has.property(
          "module_id",
          requestData.access[index].module_id
        );
        expect(ele.access).has.property(
          "show_menu",
          requestData.access[index].access.show_menu
        );
        expect(ele.access).has.property(
          "read",
          requestData.access[index].access.read
        );
        expect(ele.access).has.property(
          "update",
          requestData.access[index].access.update
        );
        expect(ele.access).has.property(
          "create",
          requestData.access[index].access.create
        );
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
      });
    });
  });

  //Get the role_module br orgId and roleId
  it("Test case for get role_module", () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_roleModule}${Cypress.env("roleId")}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("roleName");
        expect(ele).has.property("moduleName");
        expect(ele).has.property("display_name");
        expect(ele).has.property("parent_menu_name");
        expect(ele).has.property("p_icon");
        expect(ele).has.property("icon");
        expect(ele).has.property("link");
        expect(ele).has.property("menuorder");
        expect(ele).has.property("module_id");
        expect(ele).has.property("access");
      });
    });
  });
});

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {
  it("Test case when role_id doesn't exist", () => {
    let requestData = {
      role_id: Cypress.env("RandomNumber"),
      access: [
        {
          module_id: useModule_id[0],
          access: {},
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_roleModule,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it("Test case when module_id doesn't exist", () => {
    let requestData = {
      role_id: Cypress.env("roleId"),
      access: [
        {
          module_id: Cypress.env("RandomNumber"),
          access: {
            show_menu: 1,
            read: 1,
            update: 1,
            create: 1,
          },
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_roleModule,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it("role_id, module_id, access{show_menu, read, update, create} should be Number", () => {
    let requestData = {
      role_id: Cypress.env("RandomNum"),
      access: [
        {
          module_id: Cypress.env("RandomNum"),
          access: {
            show_menu: Cypress.env("RandomNum"),
            read: Cypress.env("RandomNum"),
            update: Cypress.env("RandomNum"),
            create: Cypress.env("RandomNum"),
          },
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_roleModule,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "role_id",
        body.error.errorDetails.role_id
      );
      expect(body.error.errorDetails).has.property(
        "module_id",
        body.error.errorDetails.module_id
      );
      expect(body.error.errorDetails).has.property(
        "show_menu",
        body.error.errorDetails.show_menu
      );
      expect(body.error.errorDetails).has.property(
        "read",
        body.error.errorDetails.read
      );
      expect(body.error.errorDetails).has.property(
        "create",
        body.error.errorDetails.create
      );
      expect(body.error.errorDetails).has.property(
        "update",
        body.error.errorDetails.update
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("access{show_menu, read, update, create} must be one of [0 or 1]", () => {
    let requestData = {
      role_id: Cypress.env("roleId"),
      access: [
        {
          module_id: useModule_id[0],
          access: {
            show_menu: Cypress.env("RandomNum_2"),
            read: Cypress.env("RandomNum_2"),
            update: Cypress.env("RandomNum_2"),
            create: Cypress.env("RandomNum_2"),
          },
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_roleModule,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "show_menu",
        body.error.errorDetails.show_menu
      );
      expect(body.error.errorDetails).has.property(
        "read",
        body.error.errorDetails.read
      );
      expect(body.error.errorDetails).has.property(
        "create",
        body.error.errorDetails.create
      );
      expect(body.error.errorDetails).has.property(
        "update",
        body.error.errorDetails.update
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when required field are not provided", () => {
    cy.request({
      method: routes.post,
      url: routes.post_roleModule,
      body: {},
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "role_id",
        body.error.errorDetails.role_id
      );
      expect(body.error.errorDetails).has.property(
        "access",
        body.error.errorDetails.access
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when required field are left blank", () => {
    let requestData = {
      role_id: "",
      access: [
        {
          module_id: "",
          access: {
            show_menu: "",
            read: "",
            update: "",
            create: "",
          },
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_roleModule,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "role_id",
        body.error.errorDetails.role_id
      );
      expect(body.error.errorDetails).has.property(
        "module_id",
        body.error.errorDetails.module_id
      );
      expect(body.error.errorDetails).has.property(
        "show_menu",
        body.error.errorDetails.show_menu
      );
      expect(body.error.errorDetails).has.property(
        "read",
        body.error.errorDetails.read
      );
      expect(body.error.errorDetails).has.property(
        "create",
        body.error.errorDetails.create
      );
      expect(body.error.errorDetails).has.property(
        "update",
        body.error.errorDetails.update
      );
      expect(body).has.property("result", body.result);
    });
  });
});

describe(`${store_msg.fail_get}${Cypress.spec["fileName"]}`, () => {
  it("Failure test case for get role_module when role_id doesn't exist", () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_roleModule}${Cypress.env("RandomNumber")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });
});
