import routes from "../../support/route";
import store_msg from "../../support/store_msg";
let group_id: Number;
let group_id_1: Number;
let group_code: String;
let codelength
let exist_code
let blank_req
let number_req
let boolean_req
let string_req
let requestData
let reqData

before(() => {
  cy.GetCompanyToken();
});

beforeEach(() => {
  cy.Random();
  cy.RandomDesc();
  cy.RandomNumber();
  cy.RandomNum();
  cy.randomBoolean();
  codelength = req_group({ code: Cypress.env("RandomDesc") })
  exist_code = req_group({ code: group_code })
  blank_req = req_group({ code: "", name: "" })
  number_req = req_group({ status: Cypress.env("RandomNum") })
  boolean_req = req_group({ status: Cypress.env("RandomNumber") })
  string_req = req_group({
    code: Cypress.env("RandomNumber"),
    name: Cypress.env("RandomNumber"),
    description: Cypress.env("RandomNumber")
  });
});

function req_group(payload, ignoredata = []) {
  let reqBody = {
    code: payload.hasOwnProperty("code") ? payload.code : Cypress.env("Random"),
    name: payload.hasOwnProperty("name") ? payload.name : Cypress.env("Random"),
    description: payload.hasOwnProperty("description") ? payload.description : Cypress.env("RandomDesc"),
    status: payload.hasOwnProperty("status") ? payload.status : 1
  };
  ignoredata.forEach((itemrow) => {
    delete reqBody[itemrow];
  })
  return reqBody
}

function groupCreateRes(data) {
  expect(data).has.property("id");
  expect(data).has.property("code", requestData.code);
  expect(data).has.property("name", requestData.name);

  if (requestData.hasOwnProperty("description")) {
    expect(data).has.property("description", requestData.description)
  }

  if (requestData.hasOwnProperty("status")) {
    expect(data).has.property("status", requestData.status)
  } else { expect(data).has.property("status") }

  expect(data).has.property("created_date");
  expect(data).has.property("created_by");
}

function groupUpdateRes(data) {
  expect(data).has.property("id");
  if (requestData.hasOwnProperty("code")) {
    expect(data).has.property("code", requestData.code)
  } else { expect(data).has.property("code") }

  if (requestData.hasOwnProperty("name")) {
    expect(data).has.property("name", requestData.name)
  } else { expect(data).has.property("name") }

  if (requestData.hasOwnProperty("description")) {
    expect(data).has.property("description", requestData.description)
  } else { expect(data).has.property("description") }

  if (requestData.hasOwnProperty("status")) {
    expect(data).has.property("status", requestData.status)
  } else { expect(data).has.property("status") }

  expect(data).has.property("created_date");
  expect(data).has.property("updated_date");
  expect(data).has.property("created_by");
  expect(data).has.property("updated_by");
}

function seasonFetchRes(result) {
  result.data.forEach((ele: any) => {
    expect(ele).has.property("id")
    expect(ele).has.property("name");
    expect(ele).has.property("description");
    expect(ele).has.property("status");
    expect(ele).has.property("created_date");
    expect(ele).has.property("updated_date");
    expect(ele).has.property("created_by");
    expect(ele).has.property("updated_by");
    expect(ele).has.property("code");
  });
  if (reqData.hasOwnProperty("page")) {
    expect(result).has.property("page", reqData.page)
  } else { expect(result).has.property("page") }
  if (reqData.hasOwnProperty("page")) {
    expect(result).has.property("perPage", reqData.perPage);
  } else { expect(result).has.property("perPage") }
  expect(result).has.property("totalRecords");
}

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {

  it("Test cases for create body", () => {
    requestData = req_group({});
    cy.request({
      method: routes.post,
      url: routes.post_group,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data;
      group_id = res.id;
      cy.Success(body);
      groupCreateRes(body.result.data)
    });
  });

  it("Test cases for create API When not providing optional field", () => {
    requestData = req_group({}, ["description", "status"]);
    cy.request({
      method: routes.post,
      url: routes.post_group,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      group_id_1 = body.result.data.id
      groupCreateRes(body.result.data)
    });
  });

  it("Test cases for create API When optional field are blank", () => {
    requestData = req_group({ description: "" });
    cy.request({
      method: routes.post,
      url: routes.post_group,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      cy.Success(body);
      groupCreateRes(body.result.data)
    });
  });

  it("Test cases for create API When optional field are null", () => {
    requestData = req_group({ description: null });
    cy.request({
      method: routes.post,
      url: routes.post_group,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      cy.Success(body);
      groupCreateRes(body.result.data)
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {
  before(() => { expect(group_id).to.be.not.undefined });

  it("Test cases When not providing any field", () => {
    requestData = {};
    cy.request({
      method: routes.put,
      url: `${routes.post_group}${group_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      cy.Success(body);
      groupUpdateRes(body.result.data)
    });
  });

  it("Test cases When optional field are null", () => {
    requestData = req_group({ description: null });
    cy.request({
      method: routes.put,
      url: `${routes.post_group}${group_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      groupUpdateRes(body.result.data)
    });
  });

  it("Test cases When optional field are blank", () => {
    requestData = req_group({ description: "" });
    cy.request({
      method: routes.put,
      url: `${routes.post_group}${group_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      cy.Success(body);
      groupUpdateRes(body.result.data)
    });
  });

  it("Test cases When required field are not provided", () => {
    requestData = req_group({}, ["code", "name"]);
    cy.request({
      method: routes.put,
      url: `${routes.post_group}${group_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      cy.Success(body);
      groupUpdateRes(body.result.data)
    });
  });

  it("Test cases When optional field are not provided", () => {
    let requestData = req_group({}, ["description", "status"]);
    cy.request({
      method: routes.put,
      url: `${routes.post_group}${group_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      cy.Success(body);
      groupUpdateRes(body.result.data)
    });
  });

  it("Test case for update body with all field", () => {
    requestData = req_group({});
    cy.request({
      method: routes.put,
      url: `${routes.post_group}${group_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      group_code = body.result.data.code;
      cy.Success(body);
      groupUpdateRes(body.result.data)
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {

  it("Test case for fetch API", () => {
    reqData = {
      search: [
        {
          key: "id",
          operation: "=",
          val: group_id
        }
      ],
      searchOr: [
        {
          key: "id",
          operation: "=",
          val: group_id
        }
      ],
      searchOrAnd: [
        {
          key: "id",
          operation: "=",
          val: group_id
        }
      ],
      select: [
        "id",
        "name",
        "description",
        "status",
        "created_date",
        "updated_date",
        "created_by",
        "updated_by",
        "code",
      ],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_group}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData
    }).then(({ body }) => {
      cy.Success(body);
      seasonFetchRes(body.result)
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_group}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {}
    }).then(({ body }) => {
      cy.Success(body);
      seasonFetchRes(body.result)
    });
  });

  it("Test case for fetch API when not provide search field", () => {
    reqData = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [
        "id",
        "name",
        "description",
        "status",
        "created_date",
        "updated_date",
        "created_by",
        "updated_by",
        "code"
      ],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_group}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData
    }).then(({ body }) => {
      cy.Success(body);
      seasonFetchRes(body.result)
    });
  });

  it("Test case for fetch API when not provide select field", () => {
    reqData = {
      search: [
        {
          key: "id",
          operation: "=",
          val: group_id,
        },
      ],

      select: [],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_group}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData
    }).then(({ body }) => {
      cy.Success(body);
      seasonFetchRes(body.result)
    });
  });

  it("Test case for fetch API when not provide select field", () => {
    reqData = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20
    }
    cy.request({
      method: routes.post,
      url: `${routes.post_group}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData
    }).then(({ body }) => {
      cy.Success(body);
      seasonFetchRes(body.result)
    });
  });

  it("Test case when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_group}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
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
      }
    }).then(({ body }) => {
      cy.Success(body);
    });
  });
});

describe(`${store_msg.success_log}${Cypress.spec["fileName"]}`, () => {

  it("Test cases for get-log API", () => {
    let today = new Date().toISOString().slice(0, 10);
    cy.request({
      method: routes.post,
      url: routes.get_log,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        module_name: "group",
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
      }
    }).then(({ body }) => {
      cy.check_log(body);
    });
  });

  it("Test case for track-change-data API", () => {
    let recordId = group_id.toString();
    cy.request({
      method: routes.post,
      url: routes.track_change,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        module: "group",
        record_id: recordId,
        sort: "_id",
        orderby: "desc",
        page: 1,
        perPage: 20
      }
    }).then(({ body }) => {
      cy.Track_change(body);
    });
  });

  it("Test case for look-up API", () => {
    let name = "Group";
    let obj = {
      statusCode: 200,
      success: true,
      error: null,
      result: {
        message: "Module fields fetched successfully",
        data: {
          fields: [
            "id",
            "name",
            "code",
            "description",
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
      url: routes.post_group,
      headers: { Authorization: Cypress.env("companyToken") },
      body: codelength,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When code already exist", () => {
    cy.request({
      method: routes.post,
      url: routes.post_group,
      headers: { Authorization: Cypress.env("companyToken") },
      body: exist_code,
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code", store_msg.err_code2);
    });
  });

  it("Test cases When do not provide any field", () => {
    cy.request({
      method: routes.post,
      url: routes.post_group,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code", store_msg.err_code3);
      expect(err).has.property("name", store_msg.err_name2);
    });
  });

  it("Test cases When fields are empty", () => {
    cy.request({
      method: routes.post,
      url: routes.post_group,
      headers: { Authorization: Cypress.env("companyToken") },
      body: blank_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code", store_msg.err_code);
      expect(err).has.property("name", store_msg.err_name);
    });
  });

  it("Status must be one of [0 and 1]", () => {
    cy.request({
      method: routes.post,
      url: routes.post_group,
      headers: { Authorization: Cypress.env("companyToken") },
      body: boolean_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status", store_msg.err_status);
    });
  });

  it("Status should be number", () => {
    cy.request({
      method: routes.post,
      url: routes.post_group,
      headers: { Authorization: Cypress.env("companyToken") },
      body: number_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status", store_msg.err_status1);
    });
  });

  it("code, name, and description should be string", () => {
    cy.request({
      method: routes.post,
      url: routes.post_group,
      headers: { Authorization: Cypress.env("companyToken") },
      body: string_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code", store_msg.err_code1);
      expect(err).has.property("name", store_msg.err_name1);
      expect(err).has.property("description", store_msg.err_disc);
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {
  before(() => { expect(group_id).to.be.not.undefined });

  it("Code will be maximum 40 charector", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_group}${group_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: codelength,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When code already exist", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_group}${group_id_1}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: exist_code,
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code", store_msg.err_code2);
    });
  });

  it("Test cases When alphabet provides along with Id", () => {
    cy.request({
      method: "PUT",
      url: `${routes.post_group}${Cypress.env("Random")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id", store_msg.chk_id);
    });
  });

  it("Test cases When Id doesn't exist", () => {
    cy.request({
      method: "PUT",
      url: `${routes.post_group}${Cypress.env("RandomNumber")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id", store_msg.id);
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_group}${group_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: blank_req,
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code", store_msg.err_code);
      expect(err).has.property("name", store_msg.err_name);
    });
  });

  it("Status must be one of [0 and 1]", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_group}${group_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: boolean_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status", store_msg.err_status);
    });
  });

  it("Status should be number", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_group}${group_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: number_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status", store_msg.err_status1);
    });
  });

  it("code, name, and description should be string", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_group}${group_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: string_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code", store_msg.err_code1);
      expect(err).has.property("name", store_msg.err_name1);
      expect(err).has.property("description", store_msg.err_disc);
    });
  });
});