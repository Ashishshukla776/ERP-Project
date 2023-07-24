import store_msg from "../../support/store_msg";

let resmodules_id: any;
let resmodules_name: any;
let resmodulesId: any;
let resmodulesName: any;
let fetchModule_id: Number[];
let fetchModule_name: String[];

describe(`${store_msg.success}${"look-up and re-cache"} - ${Cypress.spec["fileName"]}`, () => {
  let baseurl = Cypress.env("apiUrl");

  before(() => {
    cy.admin_login();
    cy.Random();
    cy.Random1();
    cy.Random2();
    cy.RandomNum();
    cy.RandomNum_2();
    cy.RandomNum_1();
    cy.randomBoolean();
  });
  //Look-up
  it("Test case for look-up", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/modules/${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [],
        searchOr: [],
        searchOrAnd: [],
        select: [],
        sort: "id",
        orderby: "desc",
        page: "1",
        perPage: "50",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      for (let item of body.result.data) {
        if (item.name == "users"||item.name == "queue"||item.name == "prepack"||item.name == "item_set") {
        } else
          cy.request({
            method: "GET",
            url: `${baseurl}v1/admin/modules/${Cypress.env("org_id")}/lookup/${
              item.name
            }`,
            headers: {
              Authorization: "Bearer " + Cypress.env("authToken"),
            },
            failOnStatusCode: false,
          }).then(({ body }) => {
            cy.log(JSON.stringify(body));
            cy.Success(body);
          });
      }
    });
  });

  //Re-cache
  it("Test case for re-cache", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/admin/modules/${Cypress.env("org_id")}/recache`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {
  let baseurl = Cypress.env("apiUrl");
  //Get authToken

  it("Test case when do not provide any field", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/modules/${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      fetchModule_id = body.result.data.map((ele: any) => ele.id);
      fetchModule_name = body.result.data.map((ele: any) => ele.name);
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("data", body.result.data);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("name", ele.name);
        expect(ele).has.property("display_name", ele.display_name);
        expect(ele).has.property("parent_menu_name", ele.parent_menu_name);
        expect(ele).has.property("parent_menu_icon", ele.parent_menu_icon);
        expect(ele).has.property("menu_icon", ele.menu_icon);
        expect(ele).has.property("link", ele.link);
        expect(ele).has.property("order", ele.order);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
        expect(ele.access).has.property("show_menu", ele.access.show_menu);
        expect(ele.access).has.property("read", ele.access.read);
        expect(ele.access).has.property("update", ele.access.update);
        expect(ele.access).has.property("create", ele.access.create);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch modules", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/modules/${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: fetchModule_id[0],
          },
        ],
        select: [
          "id",
          "name",
          "display_name",
          "access",
          "order",
          "menu_icon",
          "link",
          "parent_menu_name",
          "parent_menu_icon",
          "status",
          "created_date",
          "created_by",
        ],
        sort: "id",
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
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("data", body.result.data);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("name", ele.name);
        expect(ele).has.property("display_name", ele.display_name);
        expect(ele.access).has.property("show_menu", ele.access.show_menu);
        expect(ele.access).has.property("read", ele.access.read);
        expect(ele.access).has.property("update", ele.access.update);
        expect(ele.access).has.property("create", ele.access.create);
        expect(ele).has.property("order", ele.order);
        expect(ele).has.property("menu_icon", ele.menu_icon);
        expect(ele).has.property("link", ele.link);
        expect(ele).has.property("parent_menu_name", ele.parent_menu_name);
        expect(ele).has.property("parent_menu_icon", ele.parent_menu_icon);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("created_by", ele.created_by);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case do not provide search field", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/modules/${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [],
        select: [
          "id",
          "name",
          "display_name",
          "access",
          "order",
          "menu_icon",
          "link",
          "parent_menu_name",
          "parent_menu_icon",
          "status",
          "created_date",
          "created_by",
        ],
        sort: "id",
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
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("data", body.result.data);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("name", ele.name);
        expect(ele).has.property("display_name", ele.display_name);
        expect(ele.access).has.property("show_menu", ele.access.show_menu);
        expect(ele.access).has.property("read", ele.access.read);
        expect(ele.access).has.property("update", ele.access.update);
        expect(ele.access).has.property("create", ele.access.create);
        expect(ele).has.property("order", ele.order);
        expect(ele).has.property("menu_icon", ele.menu_icon);
        expect(ele).has.property("link", ele.link);
        expect(ele).has.property("parent_menu_name", ele.parent_menu_name);
        expect(ele).has.property("parent_menu_icon", ele.parent_menu_icon);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("created_by", ele.created_by);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case when search and select field are blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/modules/${Cypress.env("org_id")}/fetch`,
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
      failOnStatusCode: false,
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
        expect(ele).has.property("name", ele.name);
        expect(ele).has.property("display_name", ele.display_name);
        expect(ele).has.property("parent_menu_name", ele.parent_menu_name);
        expect(ele).has.property("parent_menu_icon", ele.parent_menu_icon);
        expect(ele).has.property("menu_icon", ele.menu_icon);
        expect(ele).has.property("link", ele.link);
        expect(ele).has.property("order", ele.order);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
        expect(ele.access).has.property("show_menu", ele.access.show_menu);
        expect(ele.access).has.property("read", ele.access.read);
        expect(ele.access).has.property("update", ele.access.update);
        expect(ele.access).has.property("create", ele.access.create);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case when select field are blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/modules/${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: fetchModule_id[0],
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
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("data", body.result.data);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("name", ele.name);
        expect(ele).has.property("display_name", ele.display_name);
        expect(ele).has.property("parent_menu_name", ele.parent_menu_name);
        expect(ele).has.property("parent_menu_icon", ele.parent_menu_icon);
        expect(ele).has.property("menu_icon", ele.menu_icon);
        expect(ele).has.property("link", ele.link);
        expect(ele).has.property("order", ele.order);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
        expect(ele.access).has.property("show_menu", ele.access.show_menu);
        expect(ele.access).has.property("read", ele.access.read);
        expect(ele.access).has.property("update", ele.access.update);
        expect(ele.access).has.property("create", ele.access.create);
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

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {
  let baseurl = Cypress.env("apiUrl");

  it("Test case when wrong/invalid orginization id is provided", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/modules/${Cypress.env("Random")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("Random"),
        display_name: Cypress.env("Random"),
        access: {
          show_menu: Cypress.env("randomBoolean"),
          read: Cypress.env("randomBoolean"),
          update: Cypress.env("randomBoolean"),
          create: Cypress.env("randomBoolean"),
        },
        order: Cypress.env("RandomNum_1"),
        menu_icon: Cypress.env("Random"),
        link: "/",
        parent_menu_name: Cypress.env("Random"),
        parent_menu_icon: Cypress.env("Random"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case for modules name - modules name should be unique", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/modules/${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: fetchModule_name[0],
        display_name: Cypress.env("Random"),
        access: {
          show_menu: Cypress.env("randomBoolean"),
          read: Cypress.env("randomBoolean"),
          update: Cypress.env("randomBoolean"),
          create: Cypress.env("randomBoolean"),
        },
        order: Cypress.env("RandomNum_1"),
        menu_icon: Cypress.env("Random"),
        link: "/",
        parent_menu_name: Cypress.env("Random"),
        parent_menu_icon: Cypress.env("Random"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body).has.property("result", body.result);
    });
  });

  it("name, display_name, menu_icon, link, parent_menu_name and parent_menu_icon should be string", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/modules/${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("RandomNumber"),
        display_name: Cypress.env("RandomNumber"),
        access: {
          show_menu: Cypress.env("randomBoolean"),
          read: Cypress.env("randomBoolean"),
          update: Cypress.env("randomBoolean"),
          create: Cypress.env("randomBoolean"),
        },
        order: Cypress.env("RandomNum_1"),
        menu_icon: Cypress.env("RandomNumber"),
        link: "/",
        parent_menu_name: Cypress.env("RandomNumber"),
        parent_menu_icon: Cypress.env("RandomNumber"),
        status: Cypress.env("randomBoolean"),
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
        "name",
        body.error.errorDetails.name
      );
      expect(body.error.errorDetails).has.property(
        "display_name",
        body.error.errorDetails.display_name
      );
      expect(body.error.errorDetails).has.property(
        "parent_menu_name",
        body.error.errorDetails.parent_menu_name
      );
      expect(body.error.errorDetails).has.property(
        "parent_menu_icon",
        body.error.errorDetails.parent_menu_icon
      );
      expect(body.error.errorDetails).has.property(
        "menu_icon",
        body.error.errorDetails.menu_icon
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("access-{show_menu, read, update, create}, order and status should be number", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/modules/${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("Random"),
        display_name: Cypress.env("Random"),
        access: {
          show_menu: "1",
          read: "1",
          update: "1",
          create: "1",
        },
        order: Cypress.env("RandomNum"),
        menu_icon: Cypress.env("Random"),
        link: "/",
        parent_menu_name: Cypress.env("Random"),
        parent_menu_icon: Cypress.env("Random"),
        status: "1",
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
        "status",
        body.error.errorDetails.status
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("access-{show_menu, read, update, create} and status must be one of [0 and 1]", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/modules/${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("Random1"),
        display_name: Cypress.env("Random"),
        access: {
          show_menu: 10,
          read: 10,
          update: 10,
          create: 10,
        },
        order: Cypress.env("RandomNum_1"),
        menu_icon: Cypress.env("Random"),
        link: "/",
        parent_menu_name: Cypress.env("Random"),
        parent_menu_icon: Cypress.env("Random"),
        status: 10,
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
        "status",
        body.error.errorDetails.status
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when do not provide required body", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/modules/${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body.error.errorDetails).has.property(
        "name",
        body.error.errorDetails.name
      );
      expect(body.error.errorDetails).has.property(
        "display_name",
        body.error.errorDetails.display_name
      );
      expect(body.error.errorDetails).has.property(
        "access",
        body.error.errorDetails.access
      );
      expect(body.error.errorDetails).has.property(
        "order",
        body.error.errorDetails.order
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when required body are empty", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/modules/${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: "",
        display_name: "",
        access: {
          // "show_menu": Cypress.env("randomBoolean"),
          // "read": Cypress.env("randomBoolean"),
          // "update": Cypress.env("randomBoolean"),
          // "create": Cypress.env("randomBoolean")
        },
        order: "",
        menu_icon: Cypress.env("Random"),
        link: "/",
        parent_menu_name: Cypress.env("Random"),
        parent_menu_icon: Cypress.env("Random"),
        status: Cypress.env("randomBoolean"),
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
        "name",
        body.error.errorDetails.name
      );
      expect(body.error.errorDetails).has.property(
        "display_name",
        body.error.errorDetails.display_name
      );
      expect(body.error.errorDetails).has.property(
        "order",
        body.error.errorDetails.order
      );
      expect(body).has.property("result", body.result);
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {
  let baseurl = Cypress.env("apiUrl");

  it("Test case when wrong/invalid orginization id is provided", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/modules/${Cypress.env("Random")}/${
        fetchModule_id[0]
      }`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("Random"),
        display_name: Cypress.env("Random"),
        access: {
          show_menu: Cypress.env("randomBoolean"),
          read: Cypress.env("randomBoolean"),
          update: Cypress.env("randomBoolean"),
          create: Cypress.env("randomBoolean"),
        },
        order: Cypress.env("RandomNum_1"),
        menu_icon: Cypress.env("Random"),
        link: "/",
        parent_menu_name: Cypress.env("Random"),
        parent_menu_icon: Cypress.env("Random"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when modules_id doesn't exist", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/modules/${Cypress.env("org_id")}/${Cypress.env(
        "RandomNumber"
      )}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: fetchModule_name[0],
        display_name: Cypress.env("Random"),
        access: {
          show_menu: Cypress.env("randomBoolean"),
          read: Cypress.env("randomBoolean"),
          update: Cypress.env("randomBoolean"),
          create: Cypress.env("randomBoolean"),
        },
        order: Cypress.env("RandomNum_1"),
        menu_icon: Cypress.env("Random"),
        link: "/",
        parent_menu_name: Cypress.env("Random"),
        parent_menu_icon: Cypress.env("Random"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body).has.property("result", body.result);
    });
  });

  it("name, display_name, menu_icon, link, parent_menu_name and parent_menu_icon should be string", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/modules/${Cypress.env("org_id")}/${
        fetchModule_id[0]
      }`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("RandomNumber"),
        display_name: Cypress.env("RandomNumber"),
        access: {
          show_menu: Cypress.env("randomBoolean"),
          read: Cypress.env("randomBoolean"),
          update: Cypress.env("randomBoolean"),
          create: Cypress.env("randomBoolean"),
        },
        order: Cypress.env("RandomNum_1"),
        menu_icon: Cypress.env("RandomNumber"),
        link: "/",
        parent_menu_name: Cypress.env("RandomNumber"),
        parent_menu_icon: Cypress.env("RandomNumber"),
        status: Cypress.env("randomBoolean"),
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
        "name",
        body.error.errorDetails.name
      );
      expect(body.error.errorDetails).has.property(
        "display_name",
        body.error.errorDetails.display_name
      );
      expect(body.error.errorDetails).has.property(
        "parent_menu_name",
        body.error.errorDetails.parent_menu_name
      );
      expect(body.error.errorDetails).has.property(
        "parent_menu_icon",
        body.error.errorDetails.parent_menu_icon
      );
      expect(body.error.errorDetails).has.property(
        "menu_icon",
        body.error.errorDetails.menu_icon
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("access-{show_menu, read, update, create}, order and status should be number", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/modules/${Cypress.env("org_id")}/${
        fetchModule_id[0]
      }`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("Random1"),
        display_name: Cypress.env("Random"),
        access: {
          show_menu: "1",
          read: "1",
          update: "1",
          create: "1",
        },
        order: Cypress.env("RandomNum"),
        menu_icon: Cypress.env("Random"),
        link: "/",
        parent_menu_name: Cypress.env("Random"),
        parent_menu_icon: Cypress.env("Random"),
        status: "1",
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
        "status",
        body.error.errorDetails.status
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("access-{show_menu, read, update, create} and status must be one of [0 and 1]", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/modules/${Cypress.env("org_id")}/${
        fetchModule_id[0]
      }`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("Random1"),
        display_name: Cypress.env("Random"),
        access: {
          show_menu: 10,
          read: 10,
          update: 10,
          create: 10,
        },
        order: Cypress.env("RandomNum_1"),
        menu_icon: Cypress.env("Random"),
        link: "/",
        parent_menu_name: Cypress.env("Random"),
        parent_menu_icon: Cypress.env("Random"),
        status: 10,
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
        "status",
        body.error.errorDetails.status
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when required body are empty", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/modules/${Cypress.env("org_id")}/${
        fetchModule_id[0]
      }`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: "",
        display_name: "",
        access: {
          // "show_menu": Cypress.env("randomBoolean"),
          // "read": Cypress.env("randomBoolean"),
          // "update": Cypress.env("randomBoolean"),
          // "create": Cypress.env("randomBoolean")
        },
        order: "",
        menu_icon: Cypress.env("Random"),
        link: "/",
        parent_menu_name: Cypress.env("Random"),
        parent_menu_icon: Cypress.env("Random"),
        status: Cypress.env("randomBoolean"),
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
        "name",
        body.error.errorDetails.name
      );
      expect(body.error.errorDetails).has.property(
        "display_name",
        body.error.errorDetails.display_name
      );
      expect(body.error.errorDetails).has.property(
        "order",
        body.error.errorDetails.order
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Module should not be update with another module_id", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/modules/${Cypress.env("org_id")}/${
        fetchModule_id[0]
      }`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: fetchModule_name[1],
        display_name: Cypress.env("Random"),
        access: {
          show_menu: Cypress.env("randomBoolean"),
          read: Cypress.env("randomBoolean"),
          update: Cypress.env("randomBoolean"),
          create: Cypress.env("randomBoolean"),
        },
        order: Cypress.env("RandomNum_1"),
        menu_icon: Cypress.env("Random"),
        link: "/",
        parent_menu_name: Cypress.env("Random"),
        parent_menu_icon: Cypress.env("Random"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });
});

describe(`${store_msg.fail_fetch}${Cypress.spec["fileName"]}`, () => {
  let baseurl = Cypress.env("apiUrl");

  it("Test case when providing wrong/invalid org_id", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/modules/${Cypress.env("Random")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: resmodules_id,
          },
        ],
        select: [
          "id",
          "name",
          "display_name",
          "access",
          "order",
          "menu_icon",
          "link",
          "parent_menu_name",
          "parent_menu_icon",
          "status",
          "created_date",
          "created_by",
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

  it("Test case when providing wrong/invalid input", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/modules/${Cypress.env("org_id")}/fetch`,
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
          "name",
          "display_name",
          "access",
          "order",
          "menu_icon",
          "link",
          "parent_menu_name",
          "parent_menu_icon",
          "status",
          "created_date",
          "created_by",
        ],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });
});

describe(`${store_msg.fail}${"look-up"}`, () => {
  let baseurl = Cypress.env("apiUrl");

  it("Test case when providing wrong/invalid org_id", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/modules/${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [],
        searchOr: [],
        searchOrAnd: [],
        select: [],
        sort: "id",
        orderby: "desc",
        page: "1",
        perPage: "50",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      for (let item of body.result.data) {
        if (item.name == "users") {
        } else
          cy.request({
            method: "GET",
            url: `${baseurl}v1/admin/modules/${Cypress.env("Random")}/lookup/${
              item.name
            }`,
            headers: {
              Authorization: "Bearer " + Cypress.env("authToken"),
            },
            failOnStatusCode: false,
          }).then(({ body }) => {
            cy.log(JSON.stringify(body));
            cy.Failure(body);
          });
      }
    });
  });

  it("Test case when providing wrong/invalid module_id", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/admin/modules/${Cypress.env(
        "org_id"
      )}/lookup/${Cypress.env("RandomNumber")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });
});

describe(`${store_msg.fail}${"re-cache"}`, () => {
  let baseurl = Cypress.env("apiUrl");

  it("Test case when wrong/invalid orginization is provided", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/admin/modules/${Cypress.env("Random")}/recache`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });
});
