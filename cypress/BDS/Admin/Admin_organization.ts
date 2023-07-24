import store_msg from "../../support/store_msg";

let resOrg: any;
let org_id: String[];
let org_name: String[];

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {
  let baseurl = Cypress.env("apiUrl");
  //Get authToken
  before(() => {
    cy.admin_login();
    cy.Random();
    cy.RandomNumber();
  });

  /*******fetch organization**********/

  it("Test case for fetch organization when body are left blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      org_id = body.result.data.map((ele: any) => ele._id);
      org_name = body.result.data.map((ele: any) => ele.org_name);
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("_id", ele._id);
        expect(ele).has.property("org_name", ele.org_name);
        expect(ele).has.property("c_host", ele.c_host);
        expect(ele).has.property("c_username", ele.c_username);
        expect(ele).has.property("c_database", ele.c_database);
        expect(ele).has.property("createdAt", ele.createdAt);
        expect(ele).has.property("updatedAt", ele.updatedAt);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch organization", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
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
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("_id", ele._id);
        expect(ele).has.property("org_name", ele.org_name);
        expect(ele).has.property("c_host", ele.c_host);
        expect(ele).has.property("c_username", ele.c_username);
        expect(ele).has.property("c_database", ele.c_database);
        expect(ele).has.property("createdAt", ele.createdAt);
        expect(ele).has.property("updatedAt", ele.updatedAt);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch organization when search field are left blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
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
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("_id", ele._id);
        expect(ele).has.property("org_name", ele.org_name);
        expect(ele).has.property("c_host", ele.c_host);
        expect(ele).has.property("c_username", ele.c_username);
        expect(ele).has.property("c_database", ele.c_database);
        expect(ele).has.property("createdAt", ele.createdAt);
        expect(ele).has.property("updatedAt", ele.updatedAt);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch organization when search and select field are left blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [],
        select: [],
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
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("_id", ele._id);
        expect(ele).has.property("org_name", ele.org_name);
        expect(ele).has.property("c_host", ele.c_host);
        expect(ele).has.property("c_username", ele.c_username);
        expect(ele).has.property("c_database", ele.c_database);
        expect(ele).has.property("createdAt", ele.createdAt);
        expect(ele).has.property("updatedAt", ele.updatedAt);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch organization select field are left blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
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
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("_id", ele._id);
        expect(ele).has.property("org_name", ele.org_name);
        expect(ele).has.property("c_host", ele.c_host);
        expect(ele).has.property("c_username", ele.c_username);
        expect(ele).has.property("c_database", ele.c_database);
        expect(ele).has.property("createdAt", ele.createdAt);
        expect(ele).has.property("updatedAt", ele.updatedAt);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch organization when wrong/invalid input is provided", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
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
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
      //cy.True(body)
    });
  });

  //Table migration
  it("Test case for table migration", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/admin/organization/migrate/${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });

  //Migration-Status
  it("Test case for table migration-status", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/admin/organization/migrate-status/${Cypress.env(
        "org_id"
      )}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });
});

describe(`${store_msg.success_fetch}${"fetch company by organization_id"}`, () => {
  let baseurl = Cypress.env("apiUrl");

  it("Test case for company by org_id", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/${Cypress.env("org_id")}/fetch-company`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
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
          "status",
          "org_id",
          "address",
          "ein_cin",
          "state_id",
          "mongo_id",
          "fax",
          "telephone",
          "email",
          "status",
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

  it("Test case when serch field are left blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/${Cypress.env("org_id")}/fetch-company`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [],
        select: [
          "id",
          "name",
          "status",
          "org_id",
          "address",
          "ein_cin",
          "state_id",
          "mongo_id",
          "fax",
          "telephone",
          "email",
          "status",
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

  it("Test case when serch and select field are left blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/${Cypress.env("org_id")}/fetch-company`,
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
      cy.Success(body);
    });
  });

  it("Test case when select field are left blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/${Cypress.env("org_id")}/fetch-company`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
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
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });

  it("Test case when wrong input is provided", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/${Cypress.env("org_id")}/fetch-company`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [
          {
            key: "org_id",
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
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });

  it("Test case when organization id is wrong", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/${Cypress.env(
        "Random"
      )}/fetch-company`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: "1",
          },
          {
            key: "name",
            operation: "like",
            val: "abc",
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
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });
});

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {
  let baseurl = Cypress.env("apiUrl");

  it("Test case when Required field c_host is provided wrong/invalid", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        org_name: Cypress.env("org_name"),
        c_host: Cypress.env("Random"),
        c_username: Cypress.env("c_username"),
        c_password: Cypress.env("c_password"),
        c_database: Cypress.env("c_database"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
    });
  });

  it("Test case when Required field c_username is provided wrong/invalid", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        org_name: Cypress.env("org_name"),
        c_host: Cypress.env("c_host"),
        c_username: Cypress.env("Random"),
        c_password: Cypress.env("c_password"),
        c_database: Cypress.env("c_database"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Status_500(body);
    });
  });

  it("Test case when Required field c_password is provided wrong/invalid", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        org_name: Cypress.env("org_name"),
        c_host: Cypress.env("c_host"),
        c_username: Cypress.env("c_username"),
        c_password: Cypress.env("Random"),
        c_database: Cypress.env("c_database"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Status_500(body);
    });
  });

  it("Test case when Required field c_database is provided wrong/invalid", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        org_name: Cypress.env("org_name"),
        c_host: Cypress.env("c_host"),
        c_username: Cypress.env("c_username"),
        c_password: Cypress.env("c_password"),
        c_database: Cypress.env("Random"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Status_500(body);
    });
  });

  it("org_name, c_host, c_username, c_password and c_database must be string", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        org_name: Cypress.env("RandomNumber"),
        c_host: Cypress.env("RandomNumber"),
        c_username: Cypress.env("RandomNumber"),
        c_password: Cypress.env("RandomNumber"),
        c_database: Cypress.env("RandomNumber"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "org_name",
        body.error.errorDetails.org_name
      );
      expect(body.error.errorDetails).has.property(
        "c_host",
        body.error.errorDetails.c_host
      );
      expect(body.error.errorDetails).has.property(
        "c_username",
        body.error.errorDetails.c_username
      );
      expect(body.error.errorDetails).has.property(
        "c_password",
        body.error.errorDetails.c_password
      );
      expect(body.error.errorDetails).has.property(
        "c_database",
        body.error.errorDetails.c_database
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when Required field are left blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        org_name: "",
        c_host: "",
        c_username: "",
        c_password: "",
        c_database: "",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "org_name",
        body.error.errorDetails.org_name
      );
      expect(body.error.errorDetails).has.property(
        "c_host",
        body.error.errorDetails.c_host
      );
      expect(body.error.errorDetails).has.property(
        "c_username",
        body.error.errorDetails.c_username
      );
      expect(body.error.errorDetails).has.property(
        "c_password",
        body.error.errorDetails.c_password
      );
      expect(body.error.errorDetails).has.property(
        "c_database",
        body.error.errorDetails.c_database
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when body are left blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/`,
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
      expect(body.error.errorDetails).has.property(
        "org_name",
        body.error.errorDetails.org_name
      );
      expect(body.error.errorDetails).has.property(
        "c_host",
        body.error.errorDetails.c_host
      );
      expect(body.error.errorDetails).has.property(
        "c_username",
        body.error.errorDetails.c_username
      );
      expect(body.error.errorDetails).has.property(
        "c_password",
        body.error.errorDetails.c_password
      );
      expect(body.error.errorDetails).has.property(
        "c_database",
        body.error.errorDetails.c_database
      );
      expect(body).has.property("result", body.result);
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {
  let baseurl = Cypress.env("apiUrl");

  it("Test case when invalid/wrong org_id is provided ", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/organization/${Cypress.env("Random")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        org_name: Cypress.env("org_name"),
        c_host: Cypress.env("c_host"),
        c_username: Cypress.env("c_username"),
        c_password: Cypress.env("c_password"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("Test case when required field are left blank", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/organization/${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        org_name: "",
        c_host: "",
        c_username: "",
        c_password: "",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "org_name",
        body.error.errorDetails.org_name
      );
      expect(body.error.errorDetails).has.property(
        "c_host",
        body.error.errorDetails.c_host
      );
      expect(body.error.errorDetails).has.property(
        "c_username",
        body.error.errorDetails.c_username
      );
      expect(body.error.errorDetails).has.property(
        "c_password",
        body.error.errorDetails.c_password
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("org_name, c_host, c_username and c_password must be string", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/organization/${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        org_name: Cypress.env("RandomNumber"),
        c_host: Cypress.env("RandomNumber"),
        c_username: Cypress.env("RandomNumber"),
        c_password: Cypress.env("RandomNumber"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "org_name",
        body.error.errorDetails.org_name
      );
      expect(body.error.errorDetails).has.property(
        "c_host",
        body.error.errorDetails.c_host
      );
      expect(body.error.errorDetails).has.property(
        "c_username",
        body.error.errorDetails.c_username
      );
      expect(body.error.errorDetails).has.property(
        "c_password",
        body.error.errorDetails.c_password
      );
      expect(body).has.property("result", body.result);
    });
  });
});

describe(`${store_msg.fail}${"database connection"}-${Cypress.spec["fileName"]}`, () => {
  let baseurl = Cypress.env("apiUrl");

  it("Test case when Required field is wrong", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/test-connection`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        c_host: Cypress.env("Random"),
        c_username: Cypress.env("Random"),
        c_password: Cypress.env("Random"),
        c_db: Cypress.env("Random"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Fail(body);
    });
  });

  it("Test case when Required field is empty", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/test-connection`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        c_host: "",
        c_username: "",
        c_password: "",
        c_db: "",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "c_host",
        body.error.errorDetails.c_host
      );
      expect(body.error.errorDetails).has.property(
        "c_username",
        body.error.errorDetails.c_username
      );
      expect(body.error.errorDetails).has.property(
        "c_password",
        body.error.errorDetails.c_password
      );
      expect(body.error.errorDetails).has.property(
        "c_db",
        body.error.errorDetails.c_db
      );

      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when do not provide Required field", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/test-connection`,
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
      expect(body.error.errorDetails).has.property(
        "c_host",
        body.error.errorDetails.c_host
      );
      expect(body.error.errorDetails).has.property(
        "c_username",
        body.error.errorDetails.c_username
      );
      expect(body.error.errorDetails).has.property(
        "c_password",
        body.error.errorDetails.c_password
      );
      expect(body.error.errorDetails).has.property(
        "c_db",
        body.error.errorDetails.c_db
      );
    });
  });

  it("c_host, c_username, c_password and c_db must be string", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/test-connection`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        c_host: Cypress.env("RandomNumber"),
        c_username: Cypress.env("RandomNumber"),
        c_password: Cypress.env("RandomNumber"),
        c_db: Cypress.env("RandomNumber"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "c_host",
        body.error.errorDetails.c_host
      );
      expect(body.error.errorDetails).has.property(
        "c_username",
        body.error.errorDetails.c_username
      );
      expect(body.error.errorDetails).has.property(
        "c_password",
        body.error.errorDetails.c_password
      );
      expect(body.error.errorDetails).has.property(
        "c_db",
        body.error.errorDetails.c_db
      );
    });
  });
});

describe(`${store_msg.fail}${"migration and migration-status"}-${Cypress.spec["fileName"]}`, () => {
  let baseurl = Cypress.env("apiUrl");

  it("Test case when invalid/wrong org_id is provided for migration-status API", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/admin/organization/migrate/${Cypress.env("Random")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("Test case when invalid/wrong org_id is provided for migration API", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/admin/organization/migrate-status/${Cypress.env(
        "Random"
      )}`,
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
