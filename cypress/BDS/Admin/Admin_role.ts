import routes from "../../support/route";
import store_msg from "../../support/store_msg";
let resrole_id
let resRole_name: String;
let copyRole_name: String; 
beforeEach(() => {
  cy.admin_login();
  cy.Random();
  cy.randomBoolean();
  cy.RandomNumber();
  cy.RandomNum();
  cy.RandomNum_2();
});


function roleFetchRes(result) {
  result.data.forEach((element: any) => {
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
  expect(result).has.property("page");
  expect(result).has.property("perPage");
  expect(result).has.property("totalRecords");
}

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {

  it("Test case when do not provide required body", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_role}${Cypress.env("org_id")}/${Cypress.env("role_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken")
      },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("name");
      expect(body.result.data).has.property("created_role_id");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property("status");
    });
  });

  it("Test case for update role", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_role}${Cypress.env("org_id")}/${Cypress.env("role_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("Random"),
        status: 1
      }
    }).then(({ body }) => {
      resRole_name = body.result.data.name;
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("name");
      expect(body.result.data).has.property("created_role_id");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property("status");
    });
  });

  it("Test case for copy role", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_role}${Cypress.env("org_id")}/copy-role/${Cypress.env("role_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken")
      },
      body: {
        name: Cypress.env("Random"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      copyRole_name = body.result.data.name;
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("name");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("created_role_id");
      expect(body.result.data).has.property("status");
    });
  });

  it("Test case for fetch role", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_role}${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: Cypress.env("role_id"),
          },
        ],
        select: ["id", "name", "status", "created_date", "updated_date", "created_by", "updated_by", "created_role_id", "is_all_access"],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Success(body);
      roleFetchRes(body.result)
    });
  });

  it("Test case for fetch role when select field are left blank", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_role}${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: Cypress.env("role_id")
          }
        ],
        select: [],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20
      }
    }).then(({ body }) => {
      cy.Success(body);
      roleFetchRes(body.result)
    });
  });

  it("Test case for fetch role when do not provide any field", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_role}${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken")
      },
      body: {}
    }).then(({ body }) => {
      cy.Success(body);
      roleFetchRes(body.result)
    });
  });

  it("Test case for fetch role when select and search field are left blank", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_role}${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken")
      },
      body: {
        search: [],
        select: [],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20
      }
    }).then(({ body }) => {
      cy.Success(body);
      roleFetchRes(body.result)
    });
  });

  it("Test case for fetch role when search field are left blank", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_role}${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken")
      },
      body: {
        search: [],
        select: ["id", "name", "status", "created_date", "updated_date", "created_by", "updated_by", "created_role_id", "is_all_access"],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20
      }
    }).then(({ body }) => {
      cy.Success(body);
      roleFetchRes(body.result)
    });
  });
});

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {

  it("Test case when wrong orginization id is provided", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_role}${Cypress.env("Random")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken")
      },
      body: {
        name: Cypress.env("Random"),
        status: Cypress.env("randomBoolean")
      },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("org_id");
    });
  });

  it("Role name should be Unique for a organization", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_role}${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: resRole_name,
        status: Cypress.env("randomBoolean")
      },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("role");
    });
  });

  it("Test case when do not provide required body", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_role}${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {},
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("name");
    });
  });

  it("Test case when required field are left empty", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_role}${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: "",
        status: "",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("name");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("Role name should be string", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_role}${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("RandomNumber"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("name");
    });
  });

  it("status must be a number", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_role}${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("Random"),
        status: Cypress.env("RandomNum"),
      },
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status", store_msg.err_status1);
    });
  });

  it("status must be one of [1, 0]", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_role}${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("Random"),
        status: Cypress.env("RandomNum_2")
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status", store_msg.err_status);
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {

  it("Test case when wrong orginization_id is provided", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_role}${Cypress.env("Random")}/${Cypress.env("role_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("Random"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("org_id");
    });
  });

  it("Test case when wrong role_id is provided", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_role}${Cypress.env("org_id")}/${Cypress.env("RandomNumber")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken")
      },
      body: {
        name: Cypress.env("Random"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("role_id");
    });
  });

  it("Test case when required field are left empty", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_role}${Cypress.env("org_id")}/${Cypress.env("role_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: "",
        status: "",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("name");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("Role name should be string", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_role}${Cypress.env("org_id")}/${Cypress.env("role_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("RandomNumber"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("name");
    });
  });

  it("status must be a number", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_role}${Cypress.env("org_id")}/${Cypress.env("role_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("Random"),
        status: Cypress.env("RandomNum"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status", store_msg.err_status1);
    });
  });

  it("status must be on of [0 or 1]", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_role}${Cypress.env("org_id")}/${Cypress.env("role_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("Random"),
        status: Cypress.env("RandomNum_2"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status", store_msg.err_status);
    });
  });
});

describe(`${store_msg.fail_fetch}${Cypress.spec["fileName"]}`, () => {

  it("Test case when wrong orginization id is provided", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_role}${Cypress.env("Random")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: Cypress.env("role_id")
          }
        ],
        select: ["id", "name", "status"],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("org_id");
    });
  });

  it("Test case when invalid input is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_role}${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken")
      },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: Cypress.env("RandomNumber")
          }
        ],
        select: ["id", "name", "status"],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Success(body);
    });
  });
});

describe(`${store_msg.fail}${"copy-role"}`, () => {

  it("Test case when wrong orginization id is provided", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_role}${Cypress.env("Random")}/copy-role/${Cypress.env("role_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("Random"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("org_id");
    });
  });

  it("Test case when wrong role_id is provided", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_role}${Cypress.env("org_id")}/copy-role/${Cypress.env("RandomNumber")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken")
      },
      body: {
        name: Cypress.env("Random"),
        status: Cypress.env("randomBoolean")
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("role_id");
    });
  });

  it("Role name should be Unique for a organization", () => {
    cy.request({
      method:routes.post,
      url: `${routes.post_role}${Cypress.env("org_id")}/copy-role/${Cypress.env("role_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: copyRole_name,
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("role");
    });
  });

  it("Test case when required field are left empty", () => {
    cy.request({
      method:routes.post,
      url: `${routes.post_role}${Cypress.env("org_id")}/copy-role/${Cypress.env("role_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: "",
        status: "",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("name");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("Role name should be string", () => {
    cy.request({
      method:routes.post,
      url: `${routes.post_role}${Cypress.env("org_id")}/copy-role/${Cypress.env("role_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("RandomNumber"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("name");
    });
  });

  it("status must be number", () => {
    cy.request({
      method:routes.post,
      url: `${routes.post_role}${Cypress.env("org_id")}/copy-role/${Cypress.env("role_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("Random"),
        status: Cypress.env("RandomNum"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status", store_msg.err_status1);
    });
  });

  it("status must be one of [0 or 1]", () => {
    cy.request({
      method:routes.post,
      url: `${routes.post_role}${Cypress.env("org_id")}/copy-role/${Cypress.env("role_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("Random"),
        status: Cypress.env("RandomNum_2"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status", store_msg.err_status);
    });
  });
});
