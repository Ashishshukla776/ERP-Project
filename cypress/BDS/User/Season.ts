import routes from "../../support/route";
import store_msg from "../../support/store_msg";
let season_id: Number;
let season_code: String;
let requestData
let codelength
let exist_code
let blank_req
let number_req
let boolean_req
let string_req
let season_id_1

before(() => {
  cy.GetCompanyToken();
});

beforeEach(() => {
  cy.Random();
  cy.RandomDesc();
  cy.RandomNum();
  cy.RandomNumber();
  cy.randomBoolean();
  codelength = req_season({ code: Cypress.env("RandomDesc") })
  exist_code = req_season({ code: season_code })
  blank_req = req_season({ code: "", name: "" })
  number_req = req_season({ status: Cypress.env("RandomNum") })
  boolean_req = req_season({ status: Cypress.env("RandomNumber") })
  string_req = req_season({
    code: Cypress.env("RandomNumber"),
    name: Cypress.env("RandomNumber"),
    description: Cypress.env("RandomNumber")
  });
});

function req_season(payload, ignoredata = []) {
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

function seasonCreateRes(data) {
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

function seasonupdateRes(data) {
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
  if (requestData.hasOwnProperty("page")) {
    expect(result).has.property("page", requestData.page)
  } else { expect(result).has.property("page") }
  if (requestData.hasOwnProperty("page")) {
    expect(result).has.property("perPage", requestData.perPage);
  } else { expect(result).has.property("perPage") }
  expect(result).has.property("totalRecords");
}

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {

  it("Test cases for create API", () => {
    requestData = req_season({});
    cy.request({
      method: routes.post,
      url: routes.post_season,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      season_id = body.result.data.id;
      cy.Success(body);
      seasonCreateRes(body.result.data)
    });
  });

  it("Test cases for create API When not providing optional field", () => {
    requestData = req_season({}, ["description", "status"]);
    cy.request({
      method: routes.post,
      url: routes.post_season,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      season_id_1 = body.result.data.id;
      cy.Success(body);
      seasonCreateRes(body.result.data)
    });
  });

  it("Test cases for create API When optional field are blank", () => {
    requestData = req_season({ description: "" });
    cy.request({
      method: routes.post,
      url: routes.post_season,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      seasonCreateRes(body.result.data)
    });
  });

  it("Test cases for create API When optional field are null", () => {
    requestData = req_season({ description: null });
    cy.request({
      method: routes.post,
      url: routes.post_season,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      seasonCreateRes(body.result.data)
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {
  before(() => { expect(season_id).to.be.not.undefined });

  it("Test cases When not providing any field", () => {
    requestData = {}
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_season}${season_id}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      seasonupdateRes(body.result.data)
    });
  });

  it("Test cases When optional field are null", () => {
    requestData = req_season({ description: null });
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_season}${season_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      seasonupdateRes(body.result.data)
    });
  });

  it("Test cases When optional field are blank", () => {
    requestData = req_season({ description: "" });
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_season}${season_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      seasonupdateRes(body.result.data)
    });
  });

  it("Test cases When required field are not provided", () => {
    requestData = req_season({}, ["code", "name"]);
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_season}${season_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      seasonupdateRes(body.result.data)
    });
  });

  it("Test cases When optional field are not provided", () => {
    requestData = req_season({}, ["description", "status"]);
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_season}${season_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      seasonupdateRes(body.result.data)
    });
  });

  it("Test case for update API with all field", () => {
    requestData = req_season({});
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_season}${season_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      season_code = body.result.data.code;
      cy.Success(body);
      seasonupdateRes(body.result.data)
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {
  it("Test case for fetch API", () => {
    requestData = {
      search: [
        {
          key: "id",
          operation: "=",
          val: season_id
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
        "code"
      ],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      body: requestData,
      url: `${routes.post_season}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      seasonFetchRes(body.result)
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    requestData = {}
    cy.request({
      method: routes.post,
      body: requestData,
      url: `${routes.post_season}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      seasonFetchRes(body.result)
    });
  });

  it("Test case for fetch API when not provide search field", () => {
    requestData = {
      search: [],
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
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      body: requestData,
      url: `${routes.post_season}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      seasonFetchRes(body.result)
    });
  });

  it("Test case for fetch API when not provide select field", () => {
    requestData = {
      search: [
        {
          key: "id",
          operation: "=",
          val: season_id,
        },
      ],
      select: [],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      body: requestData,
      url: `${routes.post_season}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      seasonFetchRes(body.result)
    });
  });

  it("Test case for fetch API when not provide select field", () => {
    requestData = {
      search: [],
      select: [],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      body: requestData,
      url: `${routes.post_season}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      seasonFetchRes(body.result)
    });
  });

  it("Test case for fetch API when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_season}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: Cypress.env("RandomNumber"),
          },
        ],
        select: ["id", "name", "code", "status"],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
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
      module_name: "season",
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
    let recordId = season_id.toString();
    let requestData = {
      module: "season",
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
    let name = "season";
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
      url: routes.post_season,
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
      url: routes.post_season,
      body: exist_code,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code",store_msg.err_code2);
    });
  });

  it("Test cases When do not provide any field data", () => {
    cy.request({
      method: routes.post,
      url: routes.post_season,
      body: {},
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
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
      url: routes.post_season,
      body: blank_req,
      headers: { Authorization: Cypress.env("companyToken") },
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
      method: routes.post,
      url: routes.post_season,
      body: boolean_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status", store_msg.err_status);
    });
  });

  it("Status should be number", () => {
    cy.request({
      method: routes.post,
      url: routes.post_season,
      body: number_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status", store_msg.err_status1);
    });
  });

  it("code, name and description should be String", () => {
    cy.request({
      method: routes.post,
      url: routes.post_season,
      body: string_req,
      headers: { Authorization: Cypress.env("companyToken") },
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
  before(() => { expect(season_id).to.be.not.undefined });

  it("Test cases When send alphabets along with Id", () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_season}${Cypress.env("Random")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id", store_msg.chk_id);
    });
  });

  it("Code will be maximum 40 charector", () => {
    cy.request({
      method: routes.put,
      body: codelength,
      url: `${routes.post_season}${season_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When code already exist", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_season}${season_id_1}`,
      body: exist_code,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code",store_msg.err_code2);
    });
  });

  it("Test cases When Id doesn't exist", () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_season}${Cypress.env("RandomNumber")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id", store_msg.id);
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: routes.put,
      body: blank_req,
      url: `${routes.post_season}${season_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code",store_msg.err_code);
      expect(err).has.property("name",store_msg.err_name);
    });
  });

  it("Status must be one of [0 and 1]", () => {
    cy.request({
      method: routes.put,
      body: boolean_req,
      url: `${routes.post_season}${season_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status",store_msg.err_status);
    });
  });

  it("Status should be number", () => {
    cy.request({
      method: routes.put,
      body: number_req,
      url: `${routes.post_season}${season_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status",store_msg.err_status1);
    });
  });

  it("code, name and description should be String", () => {
    cy.request({
      method: routes.put,
      body: string_req,
      url: `${routes.post_season}${season_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("code",store_msg.err_code1);
      expect(err).has.property("name",store_msg.err_name1);
      expect(err).has.property("description",store_msg.err_disc);
    });
  });
});
