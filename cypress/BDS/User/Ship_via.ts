import routes from "../../support/route";
import store_msg from "../../support/store_msg";
let ship_via_id: Number;
let ship_via_code: String;
let shipViaId_Nxt: Number;
let createBody
let updateBody
let fetchBody
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
  cy.RandomNumber();
  cy.RandomNum();
  cy.randomBoolean();
  codelength = req_shipVia({ code: Cypress.env("RandomDesc") })
  exist_code = req_shipVia({ code: ship_via_code })
  blank_req = req_shipVia({ code: "", name: "" })
  number_req = req_shipVia({ status: Cypress.env("RandomNum") })
  boolean_req = req_shipVia({ status: Cypress.env("RandomNumber") })
  string_req = req_shipVia({
    code: Cypress.env("RandomNumber"),
    name: Cypress.env("RandomNumber"),
    description: Cypress.env("RandomNumber"),
    scac_code: Cypress.env("RandomNumber")
  });
});

function req_shipVia(payload, ignoredata = []) {
  let reqBody = {
    code: payload.hasOwnProperty("code") ? payload.code : Cypress.env("Random"),
    name: payload.hasOwnProperty("name") ? payload.name : Cypress.env("Random"),
    description: payload.hasOwnProperty("description") ? payload.description : Cypress.env("RandomDesc"),
    scac_code: payload.hasOwnProperty("scac_code") ? payload.scac_code : Cypress.env("Random"),
    status: payload.hasOwnProperty("status") ? payload.status : 1
  };
  ignoredata.forEach((itemrow) => {
    delete reqBody[itemrow];
  })
  return reqBody
}

function shipviaCreateRes(data) {
  expect(data).has.property("id");
  expect(data).has.property("code", createBody.code);
  expect(data).has.property("name", createBody.name);

  if (createBody.hasOwnProperty("description")) {
    expect(data).has.property("description", createBody.description)
  }

  if (createBody.hasOwnProperty("scac_code")) {
    expect(data).has.property("scac_code", createBody.scac_code)
  }

  if (createBody.hasOwnProperty("status")) {
    expect(data).has.property("status", createBody.status)
  } else { expect(data).has.property("status") }

  expect(data).has.property("created_date");
  expect(data).has.property("created_by");
}

function shipViaUpdateRes(data) {
  expect(data).has.property("id");

  if (updateBody.hasOwnProperty("code")) {
    expect(data).has.property("code", updateBody.code)
  } else { expect(data).has.property("code") }

  if (updateBody.hasOwnProperty("name")) {
    expect(data).has.property("name", updateBody.name)
  } else { expect(data).has.property("name") }

  if (updateBody.hasOwnProperty("description")) {
    expect(data).has.property("description", updateBody.description)
  } else { expect(data).has.property("description") }

  if (updateBody.hasOwnProperty("scac_code")) {
    expect(data).has.property("scac_code", updateBody.scac_code)
  } else { expect(data).has.property("scac_code") }

  if (updateBody.hasOwnProperty("status")) {
    expect(data).has.property("status", updateBody.status)
  } else { expect(data).has.property("status") }

  expect(data).has.property("created_date");
  expect(data).has.property("updated_date");
  expect(data).has.property("created_by");
  expect(data).has.property("updated_by");
}

function shipViaFetchRes(result) {
  result.data.forEach((ele: any) => {
    expect(ele).has.property("id")
    expect(ele).has.property("code");
    expect(ele).has.property("name");
    expect(ele).has.property("description");
    expect(ele).has.property("scac_code");
    expect(ele).has.property("status");
    expect(ele).has.property("created_date");
    expect(ele).has.property("updated_date");
    expect(ele).has.property("created_by");
    expect(ele).has.property("updated_by");
  });
  if (fetchBody.hasOwnProperty("page")) {
    expect(result).has.property("page", fetchBody.page)
  } else { expect(result).has.property("page") }
  if (fetchBody.hasOwnProperty("page")) {
    expect(result).has.property("perPage", fetchBody.perPage);
  } else { expect(result).has.property("perPage") }
  expect(result).has.property("totalRecords");
}

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {
  it("Test cases for create API", () => {
    createBody = req_shipVia({});
    cy.request({
      method: routes.post,
      url: routes.post_SV,
      body: createBody,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      ship_via_id = body.result.data.id;
      cy.Success(body);
      shipviaCreateRes(body.result.data)
    });
  });

  it("Test cases for create API When not providing optional field", () => {
    createBody = req_shipVia({}, ["description", "scac_code", "status"]);
    cy.request({
      method: routes.post,
      url: routes.post_SV,
      body: createBody,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      shipViaId_Nxt = body.result.data.id;
      cy.Success(body);
      shipviaCreateRes(body.result.data)
    });
  });

  it("Test cases for create API When optional field are null", () => {
    createBody = req_shipVia({
      description: null,
      scac_code: null
    });
    cy.request({
      method: routes.post,
      url: routes.post_SV,
      body: createBody,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      shipviaCreateRes(body.result.data)
    });
  });

  it("Test cases for create API When optional field are blank", () => {
    createBody = req_shipVia({
      description: "",
      scac_code: ""
    });
    cy.request({
      method: routes.post,
      url: routes.post_SV,
      body: createBody,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      shipviaCreateRes(body.result.data)
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {
  before(() => { expect(ship_via_id).to.be.not.undefined });

  it("Test case for update API when not providing any fields", () => {
    updateBody = {}
    cy.request({
      method: routes.put,
      body: updateBody,
      url: `${routes.post_SV}${ship_via_id}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      shipViaUpdateRes(body.result.data)
    });
  });

  it("Test case for update API when not providing optional fields", () => {
    updateBody = req_shipVia({}, ["description", "scac_code", "status"]);
    cy.request({
      method: routes.put,
      body: updateBody,
      url: `${routes.post_SV}${ship_via_id}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      shipViaUpdateRes(body.result.data)
    });
  });

  it("Test case for update API when not providing required fields", () => {
    updateBody = req_shipVia({}, ["code", "name"]);
    cy.request({
      method: routes.put,
      body: updateBody,
      url: `${routes.post_SV}${ship_via_id}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      shipViaUpdateRes(body.result.data)
    });
  });

  it("Test case for update API when optional fields are null", () => {
    updateBody = req_shipVia({
      description: null,
      scac_code: null
    });
    cy.request({
      method: routes.put,
      body: updateBody,
      url: `${routes.post_SV}${ship_via_id}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      shipViaUpdateRes(body.result.data)
    });
  });

  it("Test case for update API when optional fields are blank", () => {
    updateBody = req_shipVia({
      description: "",
      scac_code: ""
    });
    cy.request({
      method: routes.put,
      body: updateBody,
      url: `${routes.post_SV}${ship_via_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      shipViaUpdateRes(body.result.data)
    });
  });

  it("Test case for update API with all field", () => {
    updateBody = req_shipVia({});
    cy.request({
      method: routes.put,
      body: updateBody,
      url: `${routes.post_SV}${ship_via_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      ship_via_code = body.result.data.code;
      cy.Success(body);
      shipViaUpdateRes(body.result.data)
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {
  it("Test case for fetch API", () => {
    fetchBody = {
      search: [
        {
          key: "id",
          operation: "=",
          val: ship_via_id,
        },
      ],
      select: ["id", "name", "code", "description", "scac_code", "status", "created_date", "updated_date", "created_by", "updated_by"],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      body: fetchBody,
      url: `${routes.post_SV}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      shipViaFetchRes(body.result)
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
      method: routes.post,
      body: {},
      url: `${routes.post_SV}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      shipViaFetchRes(body.result)
    });
  });

  it("Test case for fetch API when not provide search field", () => {
    fetchBody = {
      select: ["id", "name", "code", "description", "scac_code", "status", "created_date", "updated_date", "created_by", "updated_by"],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      body: fetchBody,
      url: `${routes.post_SV}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      shipViaFetchRes(body.result)
    });
  });

  it("Test case for fetch API when search and select field are left blank", () => {
    fetchBody = {
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
      body: fetchBody,
      url: `${routes.post_SV}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      shipViaFetchRes(body.result)
    });
  });

  it("Test case for fetch API when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_SV}${"fetch"}`,
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
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });
});

describe(`${store_msg.success_log}${Cypress.spec["fileName"]}`, () => {
  it("Test cases for get-log API", () => {
    let today = new Date().toISOString().slice(0, 10);
    let requestData = {
      module_name: "ship_via",
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
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.check_log(body);
    });
  });

  it("Test case for track-change-data API", () => {
    let recordId = ship_via_id.toString();
    let requestData = {
      module: "ship_via",
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
    let name = "ship_via";
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
            "description",
            "scac_code",
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

  it("Code should be maximum 40 charector", () => {
    cy.request({
      method: routes.post,
      url: routes.post_SV,
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
      url: routes.post_SV,
      body: exist_code,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code", store_msg.err_code2);
    });
  });

  it("Test cases When do not provide any field data", () => {
    cy.request({
      method: routes.post,
      url: routes.post_SV,
      body: {},
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code", store_msg.err_code3);
      expect(err).has.property("name", store_msg.err_name2);
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: routes.post,
      url: routes.post_SV,
      body: blank_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code", store_msg.err_code);
      expect(err).has.property("name", store_msg.err_name);
    });
  });

  it("code, name, description and scac_code should be string", () => {
    cy.request({
      method: routes.post,
      url: routes.post_SV,
      body: string_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code", store_msg.err_code1);
      expect(err).has.property("name", store_msg.err_name1);
      expect(err).has.property("description", store_msg.err_disc);
      expect(err).has.property("scac_code", `{scac_code} must be a string`);
    });
  });

  it("status should be number", () => {
    cy.request({
      method: routes.post,
      url: routes.post_SV,
      body: number_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status", store_msg.err_status1);
    });
  });

  it("status must be one of [0 and 1]", () => {
    cy.request({
      method: routes.post,
      url: routes.post_SV,
      body: boolean_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status", store_msg.err_status);
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {
  before(() => { expect(ship_via_id).to.be.not.undefined });

  it("Code will be maximum 40 charector", () => {
    cy.request({
      method: routes.put,
      body: codelength,
      url: `${routes.post_SV}${ship_via_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When code already exist", () => {
    cy.request({
      method: routes.put,
      body: exist_code,
      failOnStatusCode: false,
      url: `${routes.post_SV}${shipViaId_Nxt}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code", store_msg.err_code2);
    });
  });

  it("Test cases When send alphabets along with Id", () => {
    cy.request({
      method: routes.put,
      body: {},
      failOnStatusCode: false,
      url: `${routes.post_SV}${Cypress.env("Random")}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id", store_msg.chk_id);
    });
  });

  it("Test cases When Id doesn't exist", () => {
    cy.request({
      method: routes.put,
      body: {},
      failOnStatusCode: false,
      url: `${routes.post_SV}${Cypress.env("RandomNumber")}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id", store_msg.id);
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: routes.put,
      body: blank_req,
      failOnStatusCode: false,
      url: `${routes.post_SV}${ship_via_id}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code", store_msg.err_code);
      expect(err).has.property("name", store_msg.err_name);
    });
  });

  it("code, name, description and scac_code should be string", () => {
    cy.request({
      method: routes.put,
      body: string_req,
      failOnStatusCode: false,
      url: `${routes.post_SV}${ship_via_id}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code", store_msg.err_code1);
      expect(err).has.property("name", store_msg.err_name1);
      expect(err).has.property("description", store_msg.err_disc);
      expect(err).has.property("scac_code", `{scac_code} must be a string`);
    });
  });

  it("status should be number", () => {
    cy.request({
      method: routes.put,
      body: number_req,
      failOnStatusCode: false,
      url: `${routes.post_SV}${ship_via_id}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status", store_msg.err_status1);
    });
  });

  it("status must be one of [0 and 1]", () => {
    cy.request({
      method: routes.put,
      body: boolean_req,
      failOnStatusCode: false,
      url: `${routes.post_SV}${ship_via_id}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status", store_msg.err_status);
    });
  });
});
