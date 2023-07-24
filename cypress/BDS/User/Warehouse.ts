import routes from "../../support/route";
import store_msg from "../../support/store_msg";

before(() => {
  cy.GetCompanyToken();
});

beforeEach(() => {
  cy.Random();
  cy.RandomDesc();
  cy.RandomNumber();
  cy.RandomNum();
  cy.RandomNum_2();
  cy.randomBoolean();
});

let warehouse_id: Number;
let warehouse_id_1: Number;
let warehouse_code: String;

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {

  it("Test cases for create API", () => {
    let reqBody = {
      code: Cypress.env("Random"),
      name: Cypress.env("Random"),
      status: Cypress.env("randomBoolean"),
    };
    cy.request({
      method: routes.post, 
      url: routes.post_warehouse, 
      body: reqBody,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      warehouse_id = body.result.data.id;
      warehouse_code = body.result.data.code;
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property(
        "code", reqBody.code).to.be.string;
      expect(body.result.data).has.property(
        "name", reqBody.name).to.be.string;
      expect(body.result.data).has.property("status", reqBody.status);
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
    });
  });

  it("Test cases for create API When not providing optional field", () => {
    let reqBody = {
      code: Cypress.env("Random"),
      name: Cypress.env("Random")
    }
    cy.request({
      method: routes.post, 
      url: routes.post_warehouse, 
      body: reqBody,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      warehouse_id_1 = body.result.data.id;
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property(
        "code", reqBody.code).to.be.string;
      expect(body.result.data).has.property(
        "name", reqBody.name).to.be.string;
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
    });
  });

});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {

  it("Test case for update API when not providing any fields", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_warehouse}${warehouse_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {}
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("code").to.be.string;
      expect(body.result.data).has.property("name").to.be.string;
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
    });
  });

  it("Test case for update API when not providing optional fields", () => {
    let reqBody = {
      code: warehouse_code,
      name: Cypress.env("Random")
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_warehouse}${warehouse_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property(
        "code", reqBody.code).to.be.string;
      expect(body.result.data).has.property(
        "name", reqBody.name).to.be.string;
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
    });
  });

  it("Test case for update API when not providing required fields", () => {
    let reqBody = { status: 1 };
    cy.request({
      method: routes.put,
      url: `${routes.post_warehouse}${warehouse_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("code").to.be.string;
      expect(body.result.data).has.property("name").to.be.string;
      expect(body.result.data).has.property("status", reqBody.status);
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
    });
  });

  it("Test case for update API with all field", () => {
    let reqBody = {
      code: warehouse_code,
      name: Cypress.env("Random"),
      status: 1
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_warehouse}${warehouse_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property(
        "code", reqBody.code).to.be.string;
      expect(body.result.data).has.property(
        "name", reqBody.name).to.be.string;
      expect(body.result.data).has.property("status", reqBody.status)
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {

  it("Test case for fetch API", () => {
    let reqBody = {
      search: [
        {
          key: "id",
          operation: "=",
          val: warehouse_id
        }
      ],
      select: ["id", "code", "name",  "status"],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    }
    cy.request({
      method: routes.post,
      url: `${routes.post_warehouse}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any, index: any) => {
        expect(ele).has.property("id", reqBody.search[index].val);
        expect(ele).has.property("code");
        expect(ele).has.property("name");
        expect(ele).has.property("status");
      });
      expect(body.result).has.property("page", reqBody.page);
      expect(body.result).has.property("perPage", reqBody.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_warehouse}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {}
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when search field left blank", () => {
    let reqBody = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: ["id", "code", "name", "status"],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_warehouse}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
        expect(ele).has.property("status");
      });
      expect(body.result).has.property("page", reqBody.page);
      expect(body.result).has.property("perPage", reqBody.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when select field left blank", () => {
    let reqBody = {
      search: [
        {
          key: "id",
          operation: "=",
          val: warehouse_id,
        }
      ],
      select: [],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20
    }
    cy.request({
      method: routes.post,
      url: `${routes.post_warehouse}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any, index: any) => {
        expect(ele).has.property("id", reqBody.search[index].val);
        expect(ele).has.property("code");
        expect(ele).has.property("name");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
      });
      expect(body.result).has.property("page", reqBody.page);
      expect(body.result).has.property("perPage", reqBody.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when search and select field left blank", () => {
    let reqBody = {
      search: [],
        searchOr: [],
        searchOrAnd: [],
        select: [],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_warehouse}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_warehouse}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: Cypress.env("RandomNumber"),
          }
        ],
        select: ["id", "name", "code", "status"],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      }
    }).then(({ body }) => {
      cy.Success(body);
    });
  });
});

describe(`${store_msg.success_log}${Cypress.spec["fileName"]}`, () => {
  
  it("Test cases for get-log API", () => {
    let today = new Date().toISOString().slice(0, 10);
    let reqBody =  {
      module_name: "warehouse",
      search: [
        {
          key: "createdAt",
          operation: "date_range",
          val: [today, today]
        }
      ],
      select: ["createdAt", "modules"],
      sort: "_id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: routes.get_log,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody
    }).then(({ body }) => {
      cy.check_log(body);
    });
  });

  it("Test case for track-change-data API", () => {
    let recordId = warehouse_id.toString();
    let reqBody =  {
      module: "warehouse",
      record_id: recordId,
      sort: "_id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.track_change,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody
    }).then(({ body }) => {
      cy.Track_change(body);
    });
  });

  it("Test case for look-up API", () => {
    let name = "warehouse";
    let obj = {"statusCode":200,"success":true,"error":null,"result":{"message":"Module fields fetched successfully","data":{"fields":["id","code","name","status","created_date","updated_date","created_by","updated_by"],"foreignKey":{},"child":{}}}};
    cy.request({
      method: routes.get,
      url: `${routes.look_up}${name}`,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      expect(JSON.stringify(body)).to.deep.equal(JSON.stringify(obj));
    });
  });
});

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {

  it("Code will be maximum 40 charector", () => {
    let reqBody = {
      code: Cypress.env("RandomDesc"),
      name: Cypress.env("Random")
    };
    cy.request({
      method: routes.post, 
      url: routes.post_warehouse, 
      body: reqBody,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When code already exist", () => {
    let reqBody = {
      code: warehouse_code,
      name: Cypress.env("Random")
    };
    cy.request({
      method: routes.post, 
      url: routes.post_warehouse, 
      body: reqBody,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When do not provide any field", () => {
    cy.request({
      method: routes.post, 
      url: routes.post_warehouse, 
      body: {},
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
    });
  });

  it("Test cases When required fields are empty", () => {
    let reqBody = {
      code: "",
      name: ""
    };
    cy.request({
      method: routes.post, 
      url: routes.post_warehouse, 
      body: reqBody,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
    });
  });

  it("status should be number", () => {
    let reqBody = {
      code: warehouse_code,
      name: Cypress.env("Random"),
      status: Cypress.env("RandomNum"),
    };
    cy.request({
      method: routes.post, 
      url: routes.post_warehouse, 
      body: reqBody,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("status should be number", () => {
    let reqBody = {
      code: warehouse_code,
      name: Cypress.env("Random"),
      status: Cypress.env("RandomNumber"),
    };
    cy.request({
      method: routes.post, 
      url: routes.post_warehouse, 
      body: reqBody,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {

  it("Code will be maximum 40 charector", () => {
    let reqBody = { code: Cypress.env("RandomDesc") };
    cy.request({
      method: routes.put,
      url: `${routes.post_warehouse}${warehouse_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When code already exist", () => {
    let reqBody = {
      code: warehouse_code,
      name: Cypress.env("Random")
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_warehouse}${warehouse_id_1}`,
      body: reqBody,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When alphabet provides along with Id ", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_warehouse}${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.chk_id);
    });
  });

  it("Test cases When Id doesn't exist", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_warehouse}${Cypress.env("RandomNumber")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.id);
    });
  });

  it("Test cases When required fields are empty", () => {
    let reqBody = { 
      code: "",
      name: ""
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_warehouse}${warehouse_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
    });
  });

  it("status should be number", () => {
    let reqBody = { status: Cypress.env("RandomNum") };
    cy.request({
      method: routes.put,
      url: `${routes.post_warehouse}${warehouse_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("status should be number", () => {
    let reqBody = { status: Cypress.env("RandomNumber") };
    cy.request({
      method: routes.put,
      url: `${routes.post_warehouse}${warehouse_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });
});
