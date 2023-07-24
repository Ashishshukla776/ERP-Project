import routes from "../../support/route";
import store_msg from "../../support/store_msg";
let retail_type_id: Number;
let retail_type_code: String;
let codelength
let exist_code
let blank_req
let number_req
let boolean_req
let string_req

before(() => {
  cy.GetCompanyToken();
});

beforeEach(() => {
  cy.Random();
  cy.RandomDesc();
  cy.randomBoolean();
  cy.RandomNumber();
  cy.RandomNum_2();
  cy.RandomNum();

  codelength = req_retail({ code: Cypress.env("RandomDesc")})
  exist_code =req_retail({code: retail_type_code})
  blank_req =req_retail({code: "", name:""})
  number_req =req_retail({ status: Cypress.env("RandomNum")})
  boolean_req = req_retail({ status: Cypress.env("RandomNumber")})
  string_req = req_retail({
    code: Cypress.env("RandomNumber"),
    name: Cypress.env("RandomNumber")
  });
});


function req_retail(payload,ignoredata=[]){
  let reqBody = {
    code: payload.hasOwnProperty("code")?payload.code :Cypress.env("Random"),
    name: payload.hasOwnProperty("name")?payload.name :Cypress.env("Random"),
    status: payload.hasOwnProperty("status")?payload.status :1
  };
  ignoredata.forEach((itemrow)=>{
    delete reqBody[itemrow];
  })
  return reqBody
}

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {
  it("Test cases for create API", () => {
    let requestData = req_retail({});
    cy.request({
      method: routes.post,
      url: routes.post_retail,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data
      retail_type_id = res.id;
      cy.Success(body)
      expect(res).has.property("id");
      expect(res).has.property("code", requestData.code);
      expect(res).has.property("name", requestData.name);
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API when not providing optional fields", () => {
    let requestData = req_retail({},["status"]);
    cy.request({
      method: routes.post,
      url: routes.post_retail,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body)
      expect(res).has.property("status");
      expect(res).has.property("id");
      expect(res).has.property("code", requestData.code);
      expect(res).has.property("name", requestData.name);
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {
  before(() => {expect(retail_type_id).to.be.not.undefined});

  it("Test case for update API when not providing any field", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_retail}${retail_type_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
    }).then(({ body }) => {
      cy.Success(body)
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("code");
      expect(body.result.data).has.property("name");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
    });
  });

  it("Test case for update API when not providing required field", () => {
    let requestData = req_retail({},["code","name"]);
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_retail}${retail_type_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body)
      expect(body.result).has.property("message");
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("code");
      expect(body.result.data).has.property("name");
      expect(body.result.data).has.property("status", requestData.status);
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
    });
  });

  it("Test case for update API when not providing optional field", () => {
    let requestData = req_retail({},["status"]);
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_retail}${retail_type_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body)
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("code", requestData.code);
      expect(body.result.data).has.property("name", requestData.name);
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
    });
  });

  it("Test case for update API", () => {
    let requestData = req_retail({});
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_retail}${retail_type_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      retail_type_code = body.result.data.code;
      cy.Success(body)
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("code", requestData.code);
      expect(body.result.data).has.property("name", requestData.name);
      expect(body.result.data).has.property("status", requestData.status);
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {
  before(() => {expect(retail_type_id).to.be.not.undefined});

  it("Test case for fetch API", () => {
    let requestData = {
      search: [
        {
          key: "id",
          operation: "=",
          val: retail_type_id,
        },
      ],
      searchOr: [
        {
          key: "id",
          operation: "=",
          val: retail_type_id,
        },
      ],
      searchOrAnd: [
        {
          key: "id",
          operation: "=",
          val: retail_type_id,
        },
      ],
      select: ["id", "name", "code", "status"],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_retail,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body)
      body.result.data.forEach((ele: any,index) => {
        expect(ele).has.property("id",requestData.search[index].val);
        expect(ele).has.property("name");
        expect(ele).has.property("code");
        expect(ele).has.property("status");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
      method: routes.post,
      url: routes.fetch_retail,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {},
    }).then(({ body }) => {
      cy.Success(body)
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("name");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("code");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when not provide search field", () => {
    let requestData = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: ["id", "name", "code", "status"],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_retail,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body)
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("name");
        expect(ele).has.property("code");
        expect(ele).has.property("status");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when not provide select field", () => {
    let requestData = {
      search: [
        {
          key: "id",
          operation: "=",
          val: retail_type_id,
        },
      ],
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
      url: routes.fetch_retail,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body)
      body.result.data.forEach((ele: any,index) => {
        expect(ele).has.property("id",requestData.search[index].val);
        expect(ele).has.property("name");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("code");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when not provide search and select field", () => {
    let requestData = {
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
      url: routes.fetch_retail,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body)
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("name");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("code");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: routes.fetch_retail,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: Cypress.env("RandomNumber")
          }
        ],
        select: ["id", "name", "code", "status"],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20
      },
    }).then(({ body }) => {
      cy.Success(body);
    });
  });
});

describe(`${store_msg.success_log}${Cypress.spec["fileName"]}`, () => {

  it("Test cases for get-log API", () => {
    let today = new Date().toISOString().slice(0, 10);
    let requestData = {
      module_name: "retail_type",
      search: [
        {
          key: "createdAt",
          operation: "date_range",
          val: ["2022-08-01", today],
        },
      ],
      select: ["createdAt", "modules"],
      sort: "_id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.get_log,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.check_log(body);
    });
  });

  it("Test case for track-change-data API", () => {
    let recordId = retail_type_id.toString();
    let requestData = {
      module: "retail_type",
      record_id: recordId,
      sort: "_id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: routes.track_change,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Track_change(body);
    });
  });

  it("Test case for look-up API", () => {
    let name = "retail_type";
    let obj = {
      statusCode: 200,
      success: true,
      error: null,
      result: {
        message: "Module fields fetched successfully",
        data: {
          fields: [
            "id",
            "code",
            "name",
            "status",
            "created_date",
            "updated_date",
            "created_by",
            "updated_by",
          ],
          foreignKey: {},
          child: {},
        },
      },
    };
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
    cy.request({
      method: routes.post,
      url: routes.post_retail,
      body: codelength,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When code already exist", () => {
    cy.request({
      method: routes.post,
      url: routes.post_retail,
      body: exist_code,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code",store_msg.err_code2);
    });
  });

  it("Test cases When do not provide any field data", () => {
    cy.request({
      method: routes.post,
      url: routes.post_retail,
      body: {},
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code",store_msg.err_code3);
      expect(err).has.property("name",store_msg.err_name2);
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: routes.post,
      url: routes.post_retail,
      body: blank_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code",store_msg.err_code);
      expect(err).has.property("name",store_msg.err_name);
    });
  });

  it("Status should be number", () => {
    let requestData = {
      code: Cypress.env("Random"),
      name: Cypress.env("Random"),
      status: Cypress.env("RandomNum"),
    };
    cy.request({
      method: routes.post,
      url: routes.post_retail,
      body: number_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status",store_msg.err_status1);
    });
  });

  it("Status must be one of [0 and 1]", () => {
    cy.request({
      method: routes.post,
      url: routes.post_retail,
      body: boolean_req,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status",store_msg.err_status);
    });
  });

  it("code and name must be string", () => {
    cy.request({
      method: routes.post,
      url: routes.post_retail,
      body: string_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code",store_msg.err_code1);
      expect(err).has.property("name",store_msg.err_name1);
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {
  before(() => {expect(retail_type_id).to.be.not.undefined});

  it("Code will be maximum 40 charector", () => {
    cy.request({
      method: routes.put,
      body: codelength,
      url: `${routes.post_retail}${retail_type_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When send alphabets along with Id", () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_retail}${Cypress.env("Random")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.chk_id);
    });
  });

  it("Test cases When Id doesn't exist", () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_retail}${Cypress.env("RandomNumber")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.id);
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: routes.put,
      body: blank_req,
      url: `${routes.post_retail}${retail_type_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code",store_msg.err_code);
      expect(err).has.property("name",store_msg.err_name);
    });
  });

  it("Status should be number", () => {
    let requestData = { status: Cypress.env("RandomNum") };
    cy.request({
      method: routes.put,
      body: number_req,
      url: `${routes.post_retail}${retail_type_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status",store_msg.err_status1);
    });
  });

  it("Status must be one of [0 and 1]", () => {
    let requestData = { status: Cypress.env("RandomNumber") };
    cy.request({
      method: routes.put,
      body: boolean_req,
      url: `${routes.post_retail}${retail_type_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status",store_msg.err_status);
    });
  });

  it("code and name must be string", () => {
    let requestData = {
      code: Cypress.env("RandomNumber"),
      name: Cypress.env("RandomNumber"),
    };
    cy.request({
      method: routes.put,
      body: string_req,
      url: `${routes.post_retail}${retail_type_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code",store_msg.err_code1);
      expect(err).has.property("name",store_msg.err_name1);
    });
  });
});
