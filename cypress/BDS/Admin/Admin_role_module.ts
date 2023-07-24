import store_msg from "../../support/store_msg";

let module_id: Number[];
describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {
  let baseurl = Cypress.env("apiUrl");
  before(() => {
    cy.admin_login();
    cy.RandomNumber();
    cy.Random();
    cy.RandomNum();
    cy.RandomNum_2();
  });

  //Create new role_module
  it("Test case when show_menu, read, update and create are false(0)", () => {

      cy.request({
        method: "POST",
        url: `${baseurl}v1/admin/modules/${Cypress.env("org_id")}/fetch`,
        headers: {
          Authorization: "Bearer " + Cypress.env("authToken"),
        },
        body: {
          search: [],
          select: ["id"],
          sort: "id",
          orderby: "desc",
          page: 1,
          perPage: 20,
        }
      }).then(({ body }) => {
        module_id = body.result.data.map((ele: any) => ele.id);
        cy.request({
          method: "POST",
          url: `${baseurl}v1/admin/role-module/${Cypress.env("org_id")}`,
          headers: {
            Authorization: "Bearer " + Cypress.env("authToken"),
          },
          body: {
            role_id: Cypress.env("role_id"),
            access: [
              {
                module_id: module_id[0],
                access: {
                  show_menu: 0,
                  read: 0,
                  update: 0,
                  create: 0,
                },
              },
            ],
          }
        }).then(({ body }) => {
          expect(body).has.property("statusCode", 200);
          expect(body).has.property("success", true);
          expect(body).has.property("error", null);
          expect(body).has.property("result");
          expect(body.result).has.property("message", body.result.message);
          body.result.data.forEach((ele: any) => {
            expect(ele).has.property("id", ele.id);
            expect(ele).has.property("role_id", ele.role_id);
            expect(ele).has.property("module_id", ele.module_id);
            expect(ele.access).has.property("show_menu", ele.access.show_menu);
            expect(ele.access).has.property("read", ele.access.read);
            expect(ele.access).has.property("update", ele.access.update);
            expect(ele.access).has.property("create", ele.access.create);
            expect(ele).has.property("status", ele.status);
            expect(ele).has.property("created_date", ele.created_date);
            //expect(ele).has.property("updated_date", ele.updated_date);
            // expect(ele).has.property("created_by", ele.created_by);
            // expect(ele).has.property("updated_by", ele.updated_by);
        });
      });
    });
  });

  it("Test case when access field is left blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/role-module/${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        role_id: Cypress.env("role_id"),
        access: [
          {
            module_id: module_id[0],
            access: {},
          },
        ],
      },
      //failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("role_id", ele.role_id);
        expect(ele).has.property("module_id", ele.module_id);
        expect(ele).has.property("access", ele.access);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
      });
    });
  });

  it("Test case when show_menu, read, update and create are true(1)", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/role-module/${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        role_id: Cypress.env("role_id"),
        access: [
          {
            module_id: module_id[0],
            access: {
              show_menu: 1,
              read: 1,
              update: 1,
              create: 1,
            },
          },
        ],
      },
      //failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("role_id", ele.role_id);
        expect(ele).has.property("module_id", ele.module_id);
        expect(ele.access).has.property("show_menu", ele.access.show_menu);
        expect(ele.access).has.property("read", ele.access.read);
        expect(ele.access).has.property("update", ele.access.update);
        expect(ele.access).has.property("create", ele.access.create);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
      });
    });
  });

  //Get the role_module br orgId and roleId
  it("Test case for get role_module", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/admin/role-module/${Cypress.env("org_id")}/${
        Cypress.env("role_id")
      }`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },

      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("roleName", ele.roleName);
        expect(ele).has.property("moduleName", ele.moduleName);
        expect(ele).has.property("display_name", ele.display_name);
        expect(ele).has.property("parent_menu_name", ele.parent_menu_name);
        expect(ele).has.property("p_icon", ele.p_icon);
        expect(ele).has.property("icon", ele.icon);
        expect(ele).has.property("link", ele.link);
        expect(ele).has.property("menuorder", ele.menuorder);
        expect(ele).has.property("module_id", ele.module_id);
        expect(ele).has.property("access", ele.access);
      });
    });
  });
});

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {
  let baseurl = Cypress.env("apiUrl");

  //Create new role_module
  it("Test case when org_id doesn't exist", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/role-module/${Cypress.env("Random")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        role_id: Cypress.env("role_id"),
        access: [
          {
            module_id: module_id[0],
            access: {
              show_menu: 0,
              read: 0,
              update: 0,
              create: 0,
            },
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when role_id doesn't exist", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/role-module/${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        role_id: Cypress.env("RandomNumber"),
        access: [
          {
            module_id: module_id[0],
            access: {},
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when module_id doesn't exist", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/role-module/${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        role_id: Cypress.env("role_id"),
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
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify({ body }));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body).has.property("result", body.result);
    });
  });

  it("role_id, module_id, access{show_menu, read, update, create} should be Number", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/role-module/${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
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
      },
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

  it("access{show_menu, read, update, create} must be one of [0 or 1]", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/role-module/${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        role_id: Cypress.env("role_id"),
        access: [
          {
            module_id: module_id[0],
            access: {
              show_menu: Cypress.env("RandomNum_2"),
              read: Cypress.env("RandomNum_2"),
              update: Cypress.env("RandomNum_2"),
              create: Cypress.env("RandomNum_2"),
            },
          },
        ],
      },
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
      method: "POST",
      url: `${baseurl}v1/admin/role-module/${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {},
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
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/role-module/${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
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
      },
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
  let baseurl = Cypress.env("apiUrl");

  it("Failure test case for get role_module when org_id doesn't exist", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/admin/role-module/${Cypress.env("Random")}/${
        Cypress.env("role_id")
      }`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },

      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body).has.property("result", body.result);
    });
  });

  it("Failure test case for get role_module when role_id doesn't exist", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/admin/role-module/${Cypress.env(
        "org_id"
      )}/${Cypress.env("RandomNumber")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },

      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body).has.property("result", body.result);
    });
  });
});
