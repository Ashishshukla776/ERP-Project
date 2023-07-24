import routes from "../../support/route";
import store_msg from "../../support/store_msg";
let size_id: Number;
let resSize: String;
let sizeCreateReq
let sizeUpdateReq
let sizeFetchReq
let exist_size
let blank_req
let number_req
let boolean_req
let string_req

before(() => {
  cy.GetCompanyToken();
});

beforeEach(() => {
  cy.Random();
  cy.RandomNum();
  cy.RandomNumber();
  cy.randomBoolean();
  exist_size = req_size({ size: resSize })
  blank_req = req_size({ size: "", size_x: "" })
  number_req = req_size({ status: Cypress.env("RandomNum") })
  boolean_req = req_size({ status: Cypress.env("RandomNumber") })
  string_req = req_size({
    size: Cypress.env("RandomNumber"),
    size_x: Cypress.env("RandomNumber"),
    size_y: Cypress.env("RandomNumber"),
    nrf_code: Cypress.env("RandomNumber")
  });
});

function req_size(payload, ignoredata = []) {
  let reqBody = {
    size: payload.hasOwnProperty("size") ? payload.size : Cypress.env("Random"),
    size_x: payload.hasOwnProperty("size_x") ? payload.size_x : Cypress.env("Random"),
    size_y: payload.hasOwnProperty("size_y") ? payload.size_y : Cypress.env("Random"),
    nrf_code: payload.hasOwnProperty("nrf_code") ? payload.nrf_code : Cypress.env("Random"),
    status: payload.hasOwnProperty("status") ? payload.status : 1
  };
  ignoredata.forEach((itemrow) => {
    delete reqBody[itemrow];
  })
  return reqBody
}

const sizeCreateRes = (data)=>{
  expect(data).has.property("id");
  expect(data).has.property("size", sizeCreateReq.size);
  expect(data).has.property("size_x", sizeCreateReq.size_x);

  if (sizeCreateReq.hasOwnProperty("size_y")) {
    expect(data).has.property("size_y", sizeCreateReq.size_y)
  }

  if (sizeCreateReq.hasOwnProperty("nrf_code")) {
    expect(data).has.property("nrf_code", sizeCreateReq.nrf_code)
  }

  if (sizeCreateReq.hasOwnProperty("status")) {
    expect(data).has.property("status", sizeCreateReq.status)
  } else { expect(data).has.property("status") }

  expect(data).has.property("created_date");
  expect(data).has.property("created_by");
}

const  sizeUpdateRes = (data)=>{
  expect(data).has.property("id");

  if (sizeUpdateReq.hasOwnProperty("size")) {
    expect(data).has.property("size", sizeUpdateReq.size)
  } else { expect(data).has.property("size") }

  if (sizeUpdateReq.hasOwnProperty("size_x")) {
    expect(data).has.property("size_x", sizeUpdateReq.size_x)
  } else { expect(data).has.property("size_x") }

  if (sizeUpdateReq.hasOwnProperty("size_y")) {
    expect(data).has.property("size_y", sizeUpdateReq.size_y)
  } else { expect(data).has.property("size_y") }

  if (sizeUpdateReq.hasOwnProperty("nrf_code")) {
    expect(data).has.property("nrf_code", sizeUpdateReq.nrf_code)
  } else { expect(data).has.property("nrf_code") }

  if (sizeUpdateReq.hasOwnProperty("status")) {
    expect(data).has.property("status", sizeUpdateReq.status)
  } else { expect(data).has.property("status") }

  expect(data).has.property("created_date");
  expect(data).has.property("updated_date");
  expect(data).has.property("created_by");
  expect(data).has.property("updated_by");
}

const  sizeFetchRes = (result)=>{
  result.data.forEach((ele: any) => {
    expect(ele).has.property("id")
    expect(ele).has.property("size");
    expect(ele).has.property("size_x");
    expect(ele).has.property("size_y");
    expect(ele).has.property("status");
    expect(ele).has.property("nrf_code");
    expect(ele).has.property("created_date");
    expect(ele).has.property("updated_date");
    expect(ele).has.property("created_by");
    expect(ele).has.property("updated_by");
  });
  if (sizeFetchReq.hasOwnProperty("page")) {
    expect(result).has.property("page", sizeFetchReq.page)
  } else { expect(result).has.property("page") }
  if (sizeFetchReq.hasOwnProperty("page")) {
    expect(result).has.property("perPage", sizeFetchReq.perPage);
  } else { expect(result).has.property("perPage") }
  expect(result).has.property("totalRecords");
}

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {
  it("Test cases for create new API", () => {
    sizeCreateReq = req_size({});
    cy.request({
      method: routes.post,
      url: routes.post_size,
      body: sizeCreateReq,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      size_id = body.result.data.id;
      cy.Success(body);
      sizeCreateRes(body.result.data)
    });
  });

  it("Test cases for create API when not providing optional fields", () => {
    sizeCreateReq = req_size({
      size: Cypress.env("Random"),
      size_x: Cypress.env("Random"),
    },["size_y","nrf_code","nrf_code"]);
    cy.request({
      method: routes.post,
      url: routes.post_size,
      body: sizeCreateReq,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      sizeCreateRes(body.result.data)
    });
  });

  it("Test cases for create API when optional fields are null", () => {
    sizeCreateReq = req_size({
      size_y: null,
      nrf_code: null
    });
    cy.request({
      method: routes.post,
      url: routes.post_size,
      body: sizeCreateReq,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      sizeCreateRes(body.result.data)
    });
  });

  it("Test cases for create API when optional fields are blank", () => {
    sizeCreateReq = req_size({
      size_y: "",
      nrf_code: ""
    });
    cy.request({
      method: routes.post,
      url: routes.post_size,
      body: sizeCreateReq,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      sizeCreateRes(body.result.data)
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {

  it("Test case for update API when not providing any field", () => {
    sizeUpdateReq ={}
    cy.request({
      method: routes.put,
      url: `${routes.post_size}${size_id}`,
      body: sizeUpdateReq,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      sizeUpdateRes(body.result.data)
    });
  });

  it("Test case for update API when not providing optional field", () => {
    sizeUpdateReq = req_size({},["size_y","nrf_code","status"]);
    cy.request({
      method: routes.put,
      body: sizeUpdateReq,
      url: `${routes.post_size}${size_id}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      sizeUpdateRes(body.result.data)
    });
  });

  it("Test case for update API when not providing required field", () => {
    sizeUpdateReq = req_size({},["size","size_x"]);
    cy.request({
      method: routes.put,
      body: sizeUpdateReq,
      url: `${routes.post_size}${size_id}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      sizeUpdateRes(body.result.data)
    });
  });

  it("Test case for update API when optional fielda are null", () => {
    sizeUpdateReq = req_size({
      size_y: null,
      nrf_code: null
    });
    cy.request({
      method: routes.put,
      body: sizeUpdateReq,
      url: `${routes.post_size}${size_id}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      sizeUpdateRes(body.result.data)
    });
  });

  it("Test case for update API when optional fielda are blank", () => {
    sizeUpdateReq = req_size({
      size_y: "",
      nrf_code: ""
    });
    cy.request({
      method: routes.put,
      body: sizeUpdateReq,
      url: `${routes.post_size}${size_id}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      sizeUpdateRes(body.result.data)
    });
  });

  it("Test case for update API with all field", () => {
    sizeUpdateReq = req_size({});
    cy.request({
      method: routes.put,
      body: sizeUpdateReq,
      url: `${routes.post_size}${size_id}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      resSize = body.result.data.size;
      cy.Success(body);
      sizeUpdateRes(body.result.data)
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {

  it("Test case for fetch API", () => {
    sizeFetchReq = {
      search: [
        {
          key: "id",
          operation: "=",
          val: size_id,
        },
      ],
      select: ["id", "size", "size_x", "size_y", "status","nrf_code","created_date","updated_date","created_by","updated_by"],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      body: sizeFetchReq,
      url: `${routes.post_size}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      sizeFetchRes(body.result)
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
      method: routes.post,
      body: {},
      url: `${routes.post_size}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      sizeFetchRes(body.result)
    });
  });

  it("Test case for fetch API when search field field left blank", () => {
    sizeFetchReq = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: ["id", "size", "size_x", "size_y", "status","nrf_code","created_date","updated_date","created_by","updated_by"],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      body: sizeFetchReq,
      url: `${routes.post_size}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      sizeFetchRes(body.result)
    });
  });

  it("Test case for fetch API when search and select field left blank", () => {
    sizeFetchReq = {
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
      body: sizeFetchReq,
      url: `${routes.post_size}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      sizeFetchRes(body.result)
    });
  });

  it("Test case for fetch API when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_size}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: Cypress.env("RandomNumber")
          }
        ],
        select: ["id", "size", "status", "nrf_code"],
        sort: "id",
        orderby:"desc",
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
      module_name: Cypress.spec["fileName"],
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
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.check_log(body);
    });
  });

  it("Test case for track-change-data API", () => {
    let recordId = size_id.toString();
    let requestData = {
      module: "sizes",
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
    let name = Cypress.spec["fileName"];
    let obj = {
      statusCode: 200,
      success: true,
      error: null,
      result: {
        message: "Module fields fetched successfully",
        data: {
          fields: [
            "id",
            "size",
            "size_x",
            "size_y",
            "status",
            "nrf_code",
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

  it("Test cases When size already exist", () => {
    cy.request({
      method: routes.post,
      url: routes.post_size,
      body: exist_size,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("size");
    });
  });

  it("Test cases When do not provide any field data", () => {
    cy.request({
      method: routes.post,
      url: routes.post_size,
      body: {},
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("size");
      expect(body.error.errorDetails).has.property("size_x");
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: routes.post,
      url: routes.post_size,
      body: blank_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("size");
      expect(body.error.errorDetails).has.property("size_x");
    });
  });

  it("size, size_x, size_y and nrf_code should be string", () => {
    cy.request({
      method: routes.post,
      url: routes.post_size,
      body: string_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("size");
      expect(body.error.errorDetails).has.property("size_x");
      expect(body.error.errorDetails).has.property("size_y");
      expect(body.error.errorDetails).has.property("nrf_code");
    });
  });

  it("status should be number", () => {
    cy.request({
      method: routes.post,
      url: routes.post_size,
      body: number_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status", store_msg.err_status1);
    });
  });

  it("status must be one of [0 and 1]", () => {
    cy.request({
      method: routes.post,
      url: routes.post_size,
      body: boolean_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status", store_msg.err_status);
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {

  it("Test cases When send alphabets along with Id", () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_size}${Cypress.env("Random")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.chk_id);
    });
  });

  it("Test cases When Id doesn't exist", () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_size}${Cypress.env("RandomNumber")}`,
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
      url: `${routes.post_size}${size_id}`,
      body: blank_req,
      failOnStatusCode: false,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("size");
      expect(body.error.errorDetails).has.property("size_x");
    });
  });

  it("size, size_x, size_y and nrf_code should be string", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_size}${size_id}`,
      body: string_req,
      failOnStatusCode: false,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("size");
      expect(body.error.errorDetails).has.property("size_x");
      expect(body.error.errorDetails).has.property("size_y");
      expect(body.error.errorDetails).has.property("nrf_code");
    });
  });

  it("status should be number", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_size}${size_id}`,
      body: number_req,
      failOnStatusCode: false,
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
      url: `${routes.post_size}${size_id}`,
      body: boolean_req,
      failOnStatusCode: false,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status", store_msg.err_status);
    });
  });
});
