describe("Automation testing for success test cases for modules API's", () => {
  let baseurl = Cypress.env("apiUrl");

  before(() => {
    cy.admin_login();
    cy.Get_Org_id();
  });
  /********************Create new modules***************************/
  it("Test case for create new modules", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/modules/${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("name"),
        display_name: Cypress.env("display_name"),
        access: {
          show_menu: Cypress.env("show_menu"),
          read: Cypress.env("read"),
          update: Cypress.env("update"),
          create: Cypress.env("create"),
        },
        order: Cypress.env("order"),
        menu_icon: Cypress.env("menu_icon"),
        link: Cypress.env("link"),
        parent_menu_name: Cypress.env("parent_menu_name"),
        parent_menu_icon: Cypress.env("parent_menu_icon"),
        status: Cypress.env("status"),
      },
    }).then(({ body }) => {
      resmodules_id = body.result.data.id;
      resmodules_name = body.result.data.name;
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("data", body.result.data);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("name", body.result.data.name);
      expect(body.result.data).has.property(
        "display_name",
        body.result.data.display_name
      );
      expect(body.result.data.access).has.property(
        "show_menu",
        body.result.data.access.show_menu
      );
      expect(body.result.data.access).has.property(
        "read",
        body.result.data.access.read
      );
      expect(body.result.data.access).has.property(
        "update",
        body.result.data.access.update
      );
      expect(body.result.data.access).has.property(
        "create",
        body.result.data.access.create
      );
      expect(body.result.data).has.property("order", body.result.data.order);
      expect(body.result.data).has.property(
        "menu_icon",
        body.result.data.menu_icon
      );
      expect(body.result.data).has.property("link", body.result.data.link);
      expect(body.result.data).has.property(
        "parent_menu_name",
        body.result.data.parent_menu_name
      );
      expect(body.result.data).has.property(
        "parent_menu_icon",
        body.result.data.parent_menu_icon
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

  /***************Update modules*****************/
  it("Test case for update modules", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/modules/${Cypress.env(
        "org_id"
      )}/${resmodules_id}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("name"),
        display_name: Cypress.env("display_name"),
        access: {
          show_menu: Cypress.env("show_menu"),
          read: Cypress.env("read"),
          update: Cypress.env("update"),
          create: Cypress.env("create"),
        },
        order: Cypress.env("order"),
        menu_icon: Cypress.env("menu_icon"),
        link: Cypress.env("link"),
        parent_menu_name: Cypress.env("parent_menu_name"),
        parent_menu_icon: Cypress.env("parent_menu_icon"),
        status: Cypress.env("status"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("data", body.result.data);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("name", body.result.data.name);
      expect(body.result.data).has.property(
        "display_name",
        body.result.data.display_name
      );
      expect(body.result.data.access).has.property(
        "show_menu",
        body.result.data.access.show_menu
      );
      expect(body.result.data.access).has.property(
        "read",
        body.result.data.access.read
      );
      expect(body.result.data.access).has.property(
        "update",
        body.result.data.access.update
      );
      expect(body.result.data.access).has.property(
        "create",
        body.result.data.access.create
      );
      expect(body.result.data).has.property("order", body.result.data.order);
      expect(body.result.data).has.property(
        "menu_icon",
        body.result.data.menu_icon
      );
      expect(body.result.data).has.property("link", body.result.data.link);
      expect(body.result.data).has.property(
        "parent_menu_name",
        body.result.data.parent_menu_name
      );
      expect(body.result.data).has.property(
        "parent_menu_icon",
        body.result.data.parent_menu_icon
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
