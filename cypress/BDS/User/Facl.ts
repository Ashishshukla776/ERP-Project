import store_msg from "../../support/store_msg";

let csku_module_id: Number[];
let resFacl_id: Number;
describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");
  before(() => {
    cy.GetCompanyToken();
    cy.Get_Role_id();
    cy.Get_Email_id();
    cy.Random();
    cy.RandomDesc();
    cy.RandomNum_2();
    cy.RandomNum();
    cy.RandomNumber();
    cy.randomBoolean();
  });

  it("Test cases for create Facl API when optional field are not provided", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/modules/fetch`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "name",
            operation: "=",
            val: "csku",
          },
        ],
        select: ["id"],
        sort: "id",
        orderby: "desc",
        page: "1",
        perPage: "20",
      },
    }).then(({ body }) => {
      csku_module_id = body.result.data.map((ele) => ele.id);
      cy.request({
        method: "POST",
        url: `${baseurl}v1/facl/`,
        headers: { Authorization: Cypress.env("companyToken") },
        body: {
          fields: {
            sell_price: "show",
          },
          role_id: Cypress.env("roleId"),
          module_id: csku_module_id[0],
          // user_id: Cypress.env("user_id"),
          // status :1
        },
      }).then(({ body }) => {
        resFacl_id = body.result.data.id;
        cy.log(JSON.stringify(body));
        expect(body).has.property("statusCode", 200);
        expect(body).has.property("success", true);
        expect(body).has.property("error", null);
        expect(body).has.property("result");
        expect(body.result).has.property("message", body.result.message);
        expect(body.result.data).has.property("id", body.result.data.id);
        expect(body.result.data).has.property(
          "role_id",
          body.result.data.role_id
        );
        expect(body.result.data).has.property(
          "module_id",
          body.result.data.module_id
        );
        expect(body.result.data).has.property(
          "user_id",
          body.result.data.user_id
        );
        expect(body.result.data.fields).has.property(
          "sell_price",
          body.result.data.fields.sell_price
        );
        expect(body.result.data).has.property(
          "status",
          body.result.data.status
        );
        expect(body.result.data).has.property(
          "created_date",
          body.result.data.created_date
        );
      });
    });
  });

  it("Test cases for create Facl API when optional field are blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/modules/fetch`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "name",
            operation: "=",
            val: "csku",
          },
        ],
        select: ["id"],
        sort: "id",
        orderby: "desc",
        page: "1",
        perPage: "20",
      },
    }).then(({ body }) => {
      csku_module_id = body.result.data.map((ele) => ele.id);
      cy.request({
        method: "POST",
        url: `${baseurl}v1/facl/`,
        headers: { Authorization: Cypress.env("companyToken") },
        body: {
          fields: {
            sell_price: "hide",
          },
          role_id: Cypress.env("roleId"),
          module_id: csku_module_id[0],
          user_id: "",
          status: 1,
        },
        failOnStatusCode: false,
      }).then(({ body }) => {
        expect(body).has.property("statusCode", 200);
        expect(body).has.property("success", true);
        expect(body).has.property("error", null);
        expect(body).has.property("result");
        expect(body.result).has.property("message", body.result.message);
        expect(body.result).has.property("data", body.result.data);
        expect(body.result.data).has.property("id", body.result.data.id);
        expect(body.result.data).has.property(
          "role_id",
          body.result.data.role_id
        );
        expect(body.result.data).has.property(
          "module_id",
          body.result.data.module_id
        );
        expect(body.result.data).has.property(
          "user_id",
          body.result.data.user_id
        );
        expect(body.result.data.fields).has.property(
          "sell_price",
          body.result.data.fields.sell_price
        );
        expect(body.result.data).has.property(
          "status",
          body.result.data.status
        );
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

  it("Test cases for create Facl API when optional field are null", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/modules/fetch`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "name",
            operation: "=",
            val: "csku",
          },
        ],
        select: ["id"],
        sort: "id",
        orderby: "desc",
        page: "1",
        perPage: "20",
      },
    }).then(({ body }) => {
      csku_module_id = body.result.data.map((ele) => ele.id);
      cy.request({
        method: "POST",
        url: `${baseurl}v1/facl/`,
        headers: { Authorization: Cypress.env("companyToken") },
        body: {
          fields: {
            sell_price: "show",
          },
          role_id: Cypress.env("roleId"),
          module_id: csku_module_id[0],
          user_id: null,
          status: 1,
        },
        failOnStatusCode: false,
      }).then(({ body }) => {
        expect(body).has.property("statusCode", 200);
        expect(body).has.property("success", true);
        expect(body).has.property("error", null);
        expect(body).has.property("result");
        expect(body.result).has.property("message", body.result.message);
        expect(body.result).has.property("data", body.result.data);
        expect(body.result.data).has.property("id", body.result.data.id);
        expect(body.result.data).has.property(
          "role_id",
          body.result.data.role_id
        );
        expect(body.result.data).has.property(
          "module_id",
          body.result.data.module_id
        );
        expect(body.result.data).has.property(
          "user_id",
          body.result.data.user_id
        );
        expect(body.result.data.fields).has.property(
          "sell_price",
          body.result.data.fields.sell_price
        );
        expect(body.result.data).has.property(
          "status",
          body.result.data.status
        );
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

  it("Test cases for create Facl API with all field", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/facl/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        fields: {
          sell_price: "hide",
        },
        role_id: Cypress.env("roleId"),
        module_id: csku_module_id[0],
        user_id: Cypress.env("user_id"),
        status: 1,
      },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("data", body.result.data);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property(
        "role_id",
        body.result.data.role_id
      );
      expect(body.result.data).has.property(
        "module_id",
        body.result.data.module_id
      );
      expect(body.result.data).has.property(
        "user_id",
        body.result.data.user_id
      );
      expect(body.result.data.fields).has.property(
        "sell_price",
        body.result.data.fields.sell_price
      );
      expect(body.result.data).has.property("status", body.result.data.status);
      expect(body.result.data).has.property(
        "created_date",
        body.result.data.created_date
      );
    });
  });

  it("Test case for get Facl by", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/facl/${csku_module_id[0]}/${Cypress.env("roleId")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
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
        module_name: "facl",
        search: [
          {
            key: "createdAt",
            operation: "date_range",
            val: ["2022-10-01", today],
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
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property(
        "message",
        "Logs(s) fetched successfully"
      );
      expect(body.result).has.property("data", body.result.data);
      body.result.data.forEach((element) => {
        expect(element).has.property("_id", element._id);
        expect(element).has.property("modules", element.modules);
        expect(element).has.property("createdAt", element.createdAt);
      });
    });
  });

  it("Test case for track-change-data API", () => {
    let recordId = resFacl_id.toString();
    cy.request({
      method: "POST",
      url: `${baseurl}v1/log/track_change`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        module: "facl",
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
      body.result.data.forEach((element) => {
        expect(element).has.property("_id", element._id);
        expect(element).has.property("operation", element.operation);
        expect(element).has.property("userId", element.userId);
        expect(element).has.property("username", element.username);
        expect(element).has.property("createdAt", element.createdAt);
      });
    });
  });

  it("Test case for look-up API", () => {
    let name = "facl";
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

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");

  it("Test cases when module_id doesn't exist", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/facl/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        fields: {
          sell_price: "hide",
        },
        role_id: Cypress.env("roleId"),
        module_id: Cypress.env("RandomNumber"),
        user_id: Cypress.env("user_id"),
        status: 1,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("module_id");
    });
  });

  it("Test cases when role_id doesn't exist", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/facl/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        fields: {
          sell_price: "show",
        },
        role_id: Cypress.env("RandomNumber"),
        module_id: csku_module_id[0],
        user_id: Cypress.env("user_id"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("role_id");
    });
  });

  it("Test cases when user_id doesn't exist", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/facl/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        fields: {
          sell_price: "show",
        },
        role_id: Cypress.env("roleId"),
        module_id: csku_module_id[0],
        user_id: Cypress.env("Random"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("user_id");
    });
  });

  it("Test cases When do not provide required field", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/facl/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        user_id: Cypress.env("user_id"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("fields");
      expect(body.error.errorDetails).has.property("role_id");
      expect(body.error.errorDetails).has.property("module_id");
    });
  });

  it("Test cases When fields object are empty", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/facl/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        fields: {},
        role_id: Cypress.env("roleId"),
        module_id: csku_module_id[0],
        user_id: Cypress.env("user_id"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("sell_price");
    });
  });

  it("Test cases When fields values are empty", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/facl/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        fields: {
          sell_price: "",
        },
        role_id: Cypress.env("roleId"),
        module_id: csku_module_id[0],
        user_id: Cypress.env("user_id"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("sell_price");
    });
  });

  it("Test cases When role_id, module_id, and status are empty", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/facl/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        fields: {
          sell_price: "hide",
        },
        role_id: "",
        module_id: "",
        user_id: Cypress.env("user_id"),
        status: "",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("role_id");
      expect(body.error.errorDetails).has.property("module_id");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("role_id, module_id and status should be number ", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/facl/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        fields: {
          sell_price: "hide",
        },
        role_id: "1",
        module_id: "19",
        user_id: Cypress.env("user_id"),
        status: "1",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("role_id");
      expect(body.error.errorDetails).has.property("module_id");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("status must be on of [0 and 1]", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/facl/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        fields: {
          sell_price: "show",
        },
        role_id: Cypress.env("roleId"),
        module_id: csku_module_id[0],
        user_id: Cypress.env("user_id"),
        status: Cypress.env("RandomNum_2"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("fields values must be on of [hide and show]", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/facl/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        fields: {
          sell_price: Cypress.env("Random"),
        },
        role_id: Cypress.env("roleId"),
        module_id: csku_module_id[0]
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("sell_price");
    });
  });
});

describe(`${store_msg.fail_get}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");

  it("Test cases When moduleId doesn't exist", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/facl/${Cypress.env("RandomNumber")}/${Cypress.env(
        "roleId"
      )}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("module_id");
    });
  });

  it("Test cases When alphabet are provided as moduleId", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/facl/${Cypress.env("Random")}/${Cypress.env(
        "roleId"
      )}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("module_id");
    });
  });

  it("Test cases When roleId doesn't exist", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/facl/${csku_module_id[0]}/${Cypress.env(
        "RandomNumber"
      )}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("role_id");
    });
  });

  it("Test cases When alphabet are provided as roleId", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/facl/${csku_module_id[0]}/${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("role_id");
    });
  });
});
