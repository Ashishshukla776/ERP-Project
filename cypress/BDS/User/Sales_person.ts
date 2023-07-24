import routes from "../../support/route";
import store_msg from "../../support/store_msg";
let sp_id: Number;
let sp_code: String;
let codelength:Object;
let exist_code:Object;
let blank_req:Object;
let number_req:Object;
let boolean_req:Object;
let string_req :Object;

before(() => {
  cy.GetCompanyToken();
});
beforeEach(() => {
  cy.Random();
  cy.RandomNum();
  cy.RandomNum_2();
  cy.RandomNumber();
  cy.randomBoolean();
  codelength= req_sales_person({code: Cypress.env("RandomDesc")})
  exist_code =req_sales_person({code: sp_code})
  blank_req =req_sales_person({code: "", first_name:""})
  number_req =req_sales_person({ 
    status: Cypress.env("RandomNum")
  });
  boolean_req = req_sales_person({ status: Cypress.env("RandomNumber")})
  string_req = req_sales_person({
    code: Cypress.env("RandomNumber"),
    first_name: Cypress.env("RandomNumber"),
    middle_name: Cypress.env("RandomNumber"),
    last_name: Cypress.env("RandomNumber")
  });
});

function req_sales_person(payload, ignoredata =[]){
  let reqBody = {
    code: payload.hasOwnProperty("code")?payload.code :Cypress.env("Random"),
    first_name: payload.hasOwnProperty("first_name")?payload.first_name :Cypress.env("Random"),
    middle_name: payload.hasOwnProperty("middle_name")?payload.middle_name :Cypress.env("Random"),
    last_name: payload.hasOwnProperty("last_name")?payload.last_name :Cypress.env("Random"),
    status: payload.hasOwnProperty("status")?payload.status :1
  };
  ignoredata.forEach((itemrow)=>{
    delete reqBody[itemrow];
  })
  return reqBody
}

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {
  it("Test cases for create API", () => {
    let reqData = req_sales_person({});
    cy.request({
      method: routes.post,
      url: routes.post_SP,
      body: reqData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      sp_id = res.id;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("code", reqData.code);
      expect(res).has.property("first_name",reqData.first_name);
      expect(res).has.property("middle_name",reqData.middle_name);
      expect(res).has.property("last_name", reqData.last_name);
      expect(res).has.property("status", reqData.status);
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API when not providing optional fields", () => {
    let reqData = req_sales_person({},["middle_name","last_name","status"]);
    cy.request({
      method: routes.post,
      url: routes.post_SP,
      body: reqData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("status");
      expect(res).has.property("id");
      expect(res).has.property("code", reqData.code);
      expect(res).has.property("first_name",reqData.first_name);
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API when optional fields are null", () => {
    let reqData = req_sales_person({
      middle_name: null,
      last_name: null
    });
    cy.request({
      method: routes.post,
      url: routes.post_SP,
      body: reqData,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("code", reqData.code);
      expect(res).has.property("first_name",reqData.first_name);
      expect(res).has.property("middle_name",reqData.middle_name);
      expect(res).has.property("last_name", reqData.last_name);
      expect(res).has.property("status", reqData.status);
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API when optional fields are blank", () => {
    let reqData = req_sales_person({
      middle_name: "",
      last_name: ""
    });
    cy.request({
      method: routes.post,
      url: routes.post_SP,
      body: reqData,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("code", reqData.code);
      expect(res).has.property("first_name",reqData.first_name);
      expect(res).has.property("middle_name");
      expect(res).has.property("last_name");
      expect(res).has.property("status", reqData.status);
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {
  before(() => {
    expect(sp_id,"sales_person_id").not.undefined
  });
  it("Test case for update API when not providing any field", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_SP}${sp_id}`,
      body: {},
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("code");
      expect(body.result.data).has.property("first_name");
      expect(body.result.data).has.property("middle_name");
      expect(body.result.data).has.property("last_name");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
    });
  });

  it("Test case for update API when not providing required field", () => {
    let reqData = req_sales_person({},["code","first_name",]);
    cy.request({
      method: routes.put,
      url: `${routes.post_SP}${sp_id}`,
      body: reqData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("code");
      expect(res).has.property("first_name");
      expect(res).has.property("middle_name",reqData.middle_name);
      expect(res).has.property("last_name", reqData.last_name);
      expect(res).has.property("status", reqData.status);
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test case for update API when not providing optional field", () => {
    let reqData = req_sales_person({},
      ["middle_name","last_name","status"]
    );
    cy.request({
      method: routes.put,
      url: `${routes.post_SP}${sp_id}`,
      body: reqData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("code", reqData.code);
      expect(res).has.property("first_name",reqData.first_name);
      expect(res).has.property("middle_name");
      expect(res).has.property("last_name");
      expect(res).has.property("status");
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test case for update API when optional fielda are null", () => {
    let reqData = req_sales_person({
      middle_name: null,
      last_name: null
    });
    cy.request({
      method: routes.put,
      url: `${routes.post_SP}${sp_id}`,
      body: reqData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("code", reqData.code);
      expect(res).has.property("first_name",reqData.first_name);
      expect(res).has.property("middle_name",reqData.middle_name);
      expect(res).has.property("last_name", reqData.last_name);
      expect(res).has.property("status", reqData.status);
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test case for update API when optional fielda are blank", () => {
    let reqData = req_sales_person({
      middle_name: "",
      last_name: ""
    });
    cy.request({
      method: routes.put,
      url: `${routes.post_SP}${sp_id}`,
      body: reqData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("code", reqData.code);
      expect(res).has.property("first_name",reqData.first_name);
      expect(res).has.property("middle_name");
      expect(res).has.property("last_name");
      expect(res).has.property("status", reqData.status);
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test case for update API", () => {
    let reqData = req_sales_person({});
    cy.request({
      method: routes.put,
      url: `${routes.post_SP}${sp_id}`,
      body: reqData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      sp_code = res.code;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("code", reqData.code);
      expect(res).has.property("first_name",reqData.first_name);
      expect(res).has.property("middle_name",reqData.middle_name);
      expect(res).has.property("last_name", reqData.last_name);
      expect(res).has.property("status", reqData.status);
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {
 
  it("Test case for fetch API", () => {
    let requestData = {
      search: [
        {
          key: "id",
          operation: "=",
          val: sp_id
        }
      ],
      searchOr: [
        {
          key: "id",
          operation: "=",
          val: sp_id
        }
      ],
      searchOrAnd: [
        {
          key: "id",
          operation: "=",
          val: sp_id
        }
      ],
      select: ["id", "code", "first_name", "middle_name", "status"],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: "POST",
      url: routes.fetch_SP,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any, index: any) => {
        expect(ele).has.property("id", requestData.search[index].val);
        expect(ele).has.property("code");
        expect(ele).has.property("first_name");
        expect(ele).has.property("middle_name");
        expect(ele).has.property("status");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
      method: "POST",
      url: routes.fetch_SP,
      body: {},
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("code");
        expect(ele).has.property("first_name");
        expect(ele).has.property("middle_name");
        expect(ele).has.property("last_name");
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

  it("Test case for fetch API when not provide search field", () => {
    let requestData = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: ["id", "code", "first_name", "middle_name", "status"],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: "POST",
      url: routes.fetch_SP,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("code");
        expect(ele).has.property("first_name");
        expect(ele).has.property("middle_name");
        expect(ele).has.property("status");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when not provide select field", () => {
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
      method: "POST",
      url: routes.fetch_SP,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result).has.property("message");
      body.result.data.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("code");
        expect(ele).has.property("first_name");
        expect(ele).has.property("middle_name");
        expect(ele).has.property("last_name");
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
      method: "POST",
      url: routes.fetch_SP,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: Cypress.env("RandomNumber"),
          },
        ],
        select: ["id", "first_name", "status", "code"],
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
      module_name: "sales_person",
      search: [
        {
          key: "createdAt",
          operation: "date_range",
          val: [today, today]
        },
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
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.check_log(body);
    });
  });

  it("Test case for track-change-data API", () => {
    let recordId = sp_id.toString();
    let requestData = {
      module: "sales_person",
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
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Track_change(body);
    });
  });

  it("Test case for look-up API", () => {
    let name = "sales_person";
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
            "first_name",
            "middle_name",
            "last_name",
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
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(JSON.stringify(body)).to.deep.equal(JSON.stringify(obj));
    });
  });
});

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {
  it("Code will be maximum 40 charector", () => {
    cy.request({
      method: routes.post,
      url: routes.post_SP,
      body: codelength,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When code already exist", () => {
    cy.request({
      method: routes.post,
      url: routes.post_SP,
      body: exist_code,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      let err =body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code",store_msg.err_code2);    
    });
  });

  it("Test cases When do not provide any field data", () => {
    cy.request({
      method: routes.post,
      url: routes.post_SP,
      body: {},
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err =body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code",store_msg.err_code3);
      expect(err).has.property("first_name",`{first_name} is required`);
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: routes.post,
      url: routes.post_SP,
      body: blank_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err =body.error.errorDetails;
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(err).has.property("code",store_msg.err_code);
      expect(err).has.property("first_name",`{first_name} is not allowed to be empty`);
    });
  });

  it("code, first_name, middle_name and last_name should be string", () => {
    cy.request({
      method: routes.post,
      url: routes.post_SP,
      body: string_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err =body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code",store_msg.err_code1);
      expect(err).has.property("first_name",`{first_name} must be a string`);
      expect(err).has.property("middle_name",`{middle_name} must be a string`);
      expect(err).has.property("last_name",`{last_name} must be a string`);
    });
  });

  it("Status should be number", () => {
    cy.request({
      method: routes.post,
      url: routes.post_SP,
      body: number_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      let err =body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status",store_msg.err_status1);
    });
  });

  it("Status must be one of [0 and 1]", () => {
  
    cy.request({
      method: routes.post,
      url: routes.post_SP,
      body: boolean_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err =body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status",store_msg.err_status);
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {
  before(() => {
    expect(sp_id,"sales_person_id").not.undefined
    expect(sp_id,store_msg.chk_id).not.string
  });

  it("Code will be maximum 40 charector ", () => {
    let requestData = { code: Cypress.env("RandomDesc") };
    cy.request({
      method: routes.put,
      url: `${routes.post_SP}${sp_id}`,
      body: codelength,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Sales_person_id is provided as string", () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_SP}${Cypress.env("Random")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      let err =body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("id",store_msg.chk_id);
    });
  });

  it("Test cases When Id doesn't exist", () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_SP}${Cypress.env("RandomNumber")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      let err =body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("id",store_msg.id);
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_SP}${sp_id}`,
      body: blank_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err =body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code",store_msg.err_code);
      expect(err).has.property("first_name",`{first_name} is not allowed to be empty`);
    });
  });

  it("code, first_name, middle_name and last_name should be string", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_SP}${sp_id}`,
      body: string_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err =body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code",store_msg.err_code1);
      expect(err).has.property("first_name",`{first_name} must be a string`);
      expect(err).has.property("middle_name",`{middle_name} must be a string`);
      expect(err).has.property("last_name",`{last_name} must be a string`);
    });
  });

  it("Status should be number", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_SP}${sp_id}`,
      body: number_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      let err =body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status",store_msg.err_status1);
    });
  });

  it("Status must be one of [0 and 1]", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_SP}${sp_id}`,
      body: boolean_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      let err =body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status",store_msg.err_status);
    });
  });
});
