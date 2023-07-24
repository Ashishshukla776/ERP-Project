import routes from "../../support/route";
import store_msg from "../../support/store_msg";

before(() => {
  cy.GetCompanyToken();
  cy.Random();
  cy.RandomNum();
  cy.RandomNum_2();
  cy.Getship_viaIdId();
  cy.randomBoolean();
});

let ship_via_addrs_id: Number;
let svCreateBody
let svUpdateBody
let svFetchBody

function req_shiviapAdd(payload, ignoredata = []) {
  let reqBody = {
    contact_name: payload.hasOwnProperty("contact_name") ? payload.contact_name : Cypress.env("Random"),
    type: payload.hasOwnProperty("type") ? payload.type : Cypress.env("Random"),
    address_1: payload.hasOwnProperty("address_1") ? payload.address_1 : Cypress.env("Random"),
    address_2: payload.hasOwnProperty("address_2") ? payload.address_2 : Cypress.env("Random"),
    address_3: payload.hasOwnProperty("address_3") ? payload.address_3 : Cypress.env("Random"),
    address_4: payload.hasOwnProperty("address_4") ? payload.address_4 : Cypress.env("Random"),
    city: payload.hasOwnProperty("city") ? payload.city : Cypress.env("Random"),
    state: payload.hasOwnProperty("state") ? payload.state : Cypress.env("Random"),
    zip: payload.hasOwnProperty("zip") ? payload.zip : Cypress.env("Random"),
    country: payload.hasOwnProperty("country") ? payload.country : Cypress.env("Random"),
    status: payload.hasOwnProperty("status") ? payload.status : 1,
    ship_via_id: payload.hasOwnProperty("ship_via_id") ? payload.ship_via_id : Cypress.env("ship_viaId")
  };
  ignoredata.forEach((itemrow) => {
    delete reqBody[itemrow];
  })
  return reqBody
};

function shipviaCreateRes(data) {
  expect(data).has.property("is_verified");
  expect(data).has.property("id");
  expect(data).has.property("contact_name", svCreateBody.contact_name);
  expect(data).has.property("type", svCreateBody.type);
  expect(data).has.property("address_1", svCreateBody.address_1);
  if (svCreateBody.hasOwnProperty("address_2")) {
    expect(data).has.property("address_2", svCreateBody.address_2);
  }
  if (svCreateBody.hasOwnProperty("address_3")) {
    expect(data).has.property("address_3", svCreateBody.address_3);
  }
  if (svCreateBody.hasOwnProperty("address_4")) {
    expect(data).has.property("address_4", svCreateBody.address_4);
  }
  expect(data).has.property("city", svCreateBody.city);
  expect(data).has.property("state", svCreateBody.state);
  expect(data).has.property("zip", svCreateBody.zip);
  expect(data).has.property("country", svCreateBody.country);
  if (data.hasOwnProperty("address_4")) {
    expect(data).has.property("status", svCreateBody.status);
  }
  expect(data).has.property("created_date");
  expect(data).has.property("created_by");
};

function shipviaUpdateRes(data) {
  expect(data).has.property("is_verified");
  expect(data).has.property("id");
  if (svUpdateBody.hasOwnProperty("contact_name")) {
    expect(data).has.property("contact_name", svUpdateBody.contact_name)
  } else { expect(data).has.property("contact_name") }

  if (svUpdateBody.hasOwnProperty("type")) {
    expect(data).has.property("type", svUpdateBody.type)
  } else { expect(data).has.property("type") }

  if (svUpdateBody.hasOwnProperty("address_1")) {
    expect(data).has.property("address_1", svUpdateBody.address_1)
  } else { expect(data).has.property("address_1") }

  if (svUpdateBody.hasOwnProperty("address_2")) {
    expect(data).has.property("address_2", svUpdateBody.address_2)
  } else { expect(data).has.property("address_2") }

  if (svUpdateBody.hasOwnProperty("address_3")) {
    expect(data).has.property("address_3", svUpdateBody.address_3)
  } else { expect(data).has.property("address_3") }

  if (svUpdateBody.hasOwnProperty("address_4")) {
    expect(data).has.property("address_4", svUpdateBody.address_4)
  } else { expect(data).has.property("address_4") }

  if (svUpdateBody.hasOwnProperty("state")) {
    expect(data).has.property("state", svUpdateBody.state);
  } else { expect(data).has.property("state") }

  if (svUpdateBody.hasOwnProperty("zip")) {
    expect(data).has.property("zip", svUpdateBody.zip);
  } else { expect(data).has.property("zip") }

  if (svUpdateBody.hasOwnProperty("country")) {
    expect(data).has.property("country", svUpdateBody.country);
  } else { expect(data).has.property("country") }

  if (svUpdateBody.hasOwnProperty("status")) {
    expect(data).has.property("status", svUpdateBody.status);
  } else { expect(data).has.property("status") }

  expect(data).has.property("created_date");
  expect(data).has.property("updated_date");
  expect(data).has.property("created_by");
  expect(data).has.property("updated_by");
  expect(data).has.property("verification_source");
  expect(data).has.property("is_verified");
  expect(data).has.property("verified_date");
  expect(data).has.property("verified_by");
}

function shipviaFetchRes(result) {
  result.data.forEach((ele: any) => {
    expect(ele).has.property("id");
    expect(ele).has.property("contact_name");
    expect(ele).has.property("type");
    expect(ele).has.property("address_1");
    expect(ele).has.property("address_2");
    expect(ele).has.property("address_3");
    expect(ele).has.property("address_4");
    expect(ele).has.property("city");
    expect(ele).has.property("state");
    expect(ele).has.property("zip");
    expect(ele).has.property("country");
    expect(ele).has.property("ship_via_id");
    expect(ele).has.property("code");
    expect(ele).has.property("name");
    expect(ele).has.property("description");
    expect(ele).has.property("scac_code");
  });
  if (svFetchBody.hasOwnProperty("page")) {
    expect(result).has.property("page", svFetchBody.page)
  } else { expect(result).has.property("page") }
  if (svFetchBody.hasOwnProperty("page")) {
    expect(result).has.property("perPage", svFetchBody.perPage);
  } else { expect(result).has.property("perPage") }
  expect(result).has.property("totalRecords");
}

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {

  it("Test cases for create API", () => {
    svCreateBody = req_shiviapAdd({});
    cy.request({
      method: routes.post,
      url: routes.post_SV_adress,
      body: svCreateBody,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      ship_via_addrs_id = body.result.data.id;
      cy.Success(body);
      shipviaCreateRes(body.result.data)
    });
  });

  it("Test cases for create API when not providing option fields", () => {
    svCreateBody = req_shiviapAdd({}, ["address_2", "address_3", "address_4", "status"]);
    cy.request({
      method: routes.post,
      url: routes.post_SV_adress,
      body: svCreateBody,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      shipviaCreateRes(body.result.data)
    });
  });

  it("Test cases for create API when option fields are null", () => {
    svCreateBody = req_shiviapAdd({
      address_2: null,
      address_3: null,
      address_4: null
    });
    cy.request({
      method: routes.post,
      url: routes.post_SV_adress,
      body: svCreateBody,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      shipviaCreateRes(body.result.data)
    });
  });

  it("Test cases for create API when option fields are blank", () => {
    svCreateBody = req_shiviapAdd({
      address_2: "",
      address_3: "",
      address_4: ""
    });
    cy.request({
      method: routes.post,
      url: routes.post_SV_adress,
      body: svCreateBody,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      shipviaCreateRes(body.result.data)
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {

  it("Test case for update API when not providing any field", () => {
    svUpdateBody = {}
    cy.request({
      method: routes.put,
      body: svUpdateBody,
      url: `${routes.post_SV_adress}${ship_via_addrs_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("contact_name");
      expect(body.result.data).has.property("type");
      expect(body.result.data).has.property("address_1");
      expect(body.result.data).has.property("address_2");
      expect(body.result.data).has.property("address_3");
      expect(body.result.data).has.property("address_4");
      expect(body.result.data).has.property("city");
      expect(body.result.data).has.property("state");
      expect(body.result.data).has.property("zip");
      expect(body.result.data).has.property("country");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property("verification_source");
      expect(body.result.data).has.property("is_verified");
      expect(body.result.data).has.property("verified_date");
      expect(body.result.data).has.property("verified_by");
    });
  });

  it("Test case for update API when optional fields are not provided", () => {
    svUpdateBody = req_shiviapAdd({},
      ["address_2", "address_3", "address_4", "ship_via_id", "status"]);
    cy.request({
      method: routes.put,
      body: svUpdateBody,
      url: `${routes.post_SV_adress}${ship_via_addrs_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      shipviaUpdateRes(body.result.data)
    });
  });

  it("Test case for update API when optional fields are blank", () => {
    svUpdateBody = req_shiviapAdd({
      address_2: "",
      address_3: "",
      address_4: ""
    }, ["ship_via_id"]);
    cy.request({
      method: routes.put,
      body: svUpdateBody,
      url: `${routes.post_SV_adress}${ship_via_addrs_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      shipviaUpdateRes(body.result.data)
    });
  });

  it("Test case for update API when optional fields are null", () => {
    svUpdateBody = req_shiviapAdd({
      address_2: null,
      address_3: null,
      address_4: null
    }, ["ship_via_id"]);
    cy.request({
      method: routes.put,
      body: svUpdateBody,
      url: `${routes.post_SV_adress}${ship_via_addrs_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      shipviaUpdateRes(body.result.data)
    });
  });

  it("Test case for update API when not providing required field", () => {
    svUpdateBody = req_shiviapAdd({},
      ["contact_name", "type", "address_1", "city", "state", "zip", "country", "ship_via_id"]);
    cy.request({
      method: routes.put,
      body: svUpdateBody,
      url: `${routes.post_SV_adress}${ship_via_addrs_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      shipviaUpdateRes(body.result.data)
    });
  });

  it("Test case for update API with all field", () => {
    svUpdateBody = req_shiviapAdd({}, ["ship_via_id"]);
    cy.request({
      method: routes.put,
      body: svUpdateBody,
      url: `${routes.post_SV_adress}${ship_via_addrs_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      shipviaUpdateRes(body.result.data)
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {

  it("Test case for fetch API", () => {
    svFetchBody = {
      search: [
        {
          key: "address.id",
          operation: "=",
          val: ship_via_addrs_id
        }
      ],
      select: [
        "address.id",
        "address.contact_name",
        "address.type",
        "address.address_1",
        "address.address_2",
        "address.address_3",
        "address.address_4",
        "address.city",
        "address.state",
        "address.zip",
        "address.country",
        "ship_via.id as ship_via_id",
        "ship_via.code",
        "ship_via.name",
        "ship_via.description",
        "ship_via.scac_code"
      ],
      sort: "address.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_SV_adress}${"fetch"}`,
      body: svFetchBody,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      shipviaFetchRes(body.result)
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_SV_adress}${"fetch"}`,
      body: {},
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      shipviaFetchRes(body.result)
    });
  });

  it("Test case for fetch API when not provide search field", () => {
    svFetchBody = {
      search: [],
      select: [
        "address.id",
        "address.contact_name",
        "address.type",
        "address.address_1",
        "address.address_2",
        "address.address_3",
        "address.address_4",
        "address.city",
        "address.state",
        "address.zip",
        "address.country",
        "ship_via.id as ship_via_id",
        "ship_via.code",
        "ship_via.name",
        "ship_via.description",
        "ship_via.scac_code"
      ],
      sort: "address.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_SV_adress}${"fetch"}`,
      body: svFetchBody,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      shipviaFetchRes(body.result)
    });
  });

  it("Test case for fetch API when not provide select field", () => {
    svFetchBody = {
      search: [
        {
          key: "address.id",
          operation: "=",
          val: ship_via_addrs_id,
        },
      ],
      select: [],
      sort: "address.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_SV_adress}${"fetch"}`,
      body: svFetchBody,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      shipviaFetchRes(body.result)
    });
  });

  it("Test case for fetch API when not provide search and select field", () => {
    svFetchBody = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [],
      sort: "address.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_SV_adress}${"fetch"}`,
      body: svFetchBody,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      shipviaFetchRes(body.result)
    });
  });

  it("Test case when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_SV_adress}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "address.id",
            operation: "=",
            val: Cypress.env("RandomNumber"),
          },
        ],
        select: ["address.id", "address.country", "address.status"],
        sort: "address.id",
        orderby: "desc",
        page: "1",
        perPage: "20",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Success(body);
    });
  });
});

describe(`${store_msg.success_log}${Cypress.spec["fileName"]}`, () => {

  it("Test cases for get-log API", () => {
    let today = new Date().toISOString().slice(0, 10);
    let requestData = {
      module_name: "ship_via_addresses",
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
    let recordId = ship_via_addrs_id.toString();
    let requestData = {
      module: "ship_via_addresses",
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
    let name = "ship_via_addresses";
    let obj = {
      statusCode: 200,
      success: true,
      error: null,
      result: {
        message: "Module fields fetched successfully",
        data: {
          fields: [
            "id",
            "contact_name",
            "type",
            "address_1",
            "address_2",
            "address_3",
            "address_4",
            "city",
            "state",
            "zip",
            "country",
            "status",
            "created_date",
            "updated_date",
            "created_by",
            "updated_by",
          ],
          foreignKey: {},
          child: {
            reference_address: {
              fields: [
                "id",
                "reference_id",
                "address_id",
                "type",
                "status",
                "created_date",
                "updated_date",
                "created_by",
                "updated_by",
              ],
            },
          },
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
  it("Test cases When do not provide any field data", () => {
    cy.request({
      method: routes.post,
      url: routes.post_SV_adress,
      body: {},
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("contact_name",store_msg.err_contact_name);
      expect(err).has.property("type",store_msg.err_type);
      expect(err).has.property("address_1",store_msg.err_address1);
      expect(err).has.property("city",store_msg.err_city);
      expect(err).has.property("state",store_msg.err_state);
      expect(err).has.property("zip",store_msg.err_zip);
      expect(err).has.property("country",store_msg.err_country);
      expect(err).has.property("ship_via_id",`{ship_via_id} is required`);
    });
  });

  it("Test cases When fields are empty", () => {
    let requestData = {
      contact_name: "",
      type: "",
      address_1: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      status: "",
      ship_via_id: ""
    };
    cy.request({
      method: routes.post,
      url: routes.post_SV_adress,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("contact_name",store_msg.empty_contact_name);
      expect(err).has.property("type",store_msg.empty_type);
      expect(err).has.property("address_1",store_msg.empty_address1);
      expect(err).has.property("city",store_msg.empty_city);
      expect(err).has.property("state",store_msg.empty_state);
      expect(err).has.property("zip",store_msg.empty_zip);
      expect(err).has.property("country",store_msg.empty_country);
      expect(err).has.property("status",store_msg.err_status1);
      expect(err).has.property("ship_via_id",`{ship_via_id} must be a number`);
    });
  });

  it("Test case when ship_via_id doesn't exist", () => {
    let requestData = req_shiviapAdd({
      ship_via_id: Cypress.env("RandomNumber")
    });
    cy.request({
      method: routes.post,
      url: routes.post_SV_adress,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "ship_via_id", `{ship_via_id} is invalid`);
    });
  });

  it("contact_name, type, address, city, state, zip and country should be string", () => {
    let requestData = req_shiviapAdd({
      contact_name: Cypress.env("RandomNumber"),
      type: Cypress.env("RandomNumber"),
      address_1: Cypress.env("RandomNumber"),
      address_2: Cypress.env("RandomNumber"),
      address_3: Cypress.env("RandomNumber"),
      address_4: Cypress.env("RandomNumber"),
      city: Cypress.env("RandomNumber"),
      state: Cypress.env("RandomNumber"),
      zip: Cypress.env("RandomNumber"),
      country: Cypress.env("RandomNumber")
    });
    cy.request({
      method: routes.post,
      url: routes.post_SV_adress,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("contact_name",store_msg.string_contact_name);
      expect(err).has.property("type",store_msg.string_type);
      expect(err).has.property("address_1",store_msg.string_address1);
      expect(err).has.property("address_2",store_msg.string_address2);
      expect(err).has.property("address_3",store_msg.string_address3);
      expect(err).has.property("address_4",store_msg.string_address4);
      expect(err).has.property("city",store_msg.string_city);
      expect(err).has.property("state",store_msg.string_state);
      expect(err).has.property("zip",store_msg.string_zip);
      expect(err).has.property("country",store_msg.string_country);
    });
  });

  it("ship_via_id and status should be number", () => {
    let requestData = req_shiviapAdd({
      status: Cypress.env("RandomNum"),
      ship_via_id: Cypress.env("RandomNum")
    });
    cy.request({
      method: routes.post,
      url: routes.post_SV_adress,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status",store_msg.err_status1);
      expect(err).has.property("ship_via_id",`{ship_via_id} must be a number`);
    });
  });

  it("status must be one of [0 and 1]", () => {
    let requestData =req_shiviapAdd({
      status: Cypress.env("RandomNumber")
    });
    cy.request({
      method: routes.post,
      url: routes.post_SV_adress,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status",store_msg.err_status);
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {
  it("Test cases When alphabet provides along with Id ", () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_SV_adress}${Cypress.env("Random")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id", store_msg.chk_id);
    });
  });

  it("Test cases When Id doesn't exist", () => {
    let requestData = {};
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_SV_adress}${Cypress.env("RandomNumber")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "ship_via_address_id", `{ship_via_address_id} is invalid`);
    });
  });

  it("Test cases When required fields are blank", () => {
    let requestData = {
      contact_name: "",
      type: "",
      address_1: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      status: ""
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_SV_adress}${ship_via_addrs_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("contact_name",store_msg.empty_contact_name);
      expect(err).has.property("type",store_msg.empty_type);
      expect(err).has.property("address_1",store_msg.empty_address1);
      expect(err).has.property("city",store_msg.empty_city);
      expect(err).has.property("state",store_msg.empty_state);
      expect(err).has.property("zip",store_msg.empty_zip);
      expect(err).has.property("country",store_msg.empty_country);
      expect(err).has.property("status",store_msg.err_status1);
    });
  });

  it("contact_name, type, address, city, state, zip and country should be string", () => {
    let requestData = {
      contact_name: Cypress.env("RandomNumber"),
      type: Cypress.env("RandomNumber"),
      address_1: Cypress.env("RandomNumber"),
      address_2: Cypress.env("RandomNumber"),
      address_3: Cypress.env("RandomNumber"),
      address_4: Cypress.env("RandomNumber"),
      city: Cypress.env("RandomNumber"),
      state: Cypress.env("RandomNumber"),
      zip: Cypress.env("RandomNumber"),
      country: Cypress.env("RandomNumber"),
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_SV_adress}${ship_via_addrs_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("contact_name",store_msg.string_contact_name);
      expect(err).has.property("type",store_msg.string_type);
      expect(err).has.property("address_1",store_msg.string_address1);
      expect(err).has.property("address_2",store_msg.string_address2);
      expect(err).has.property("address_3",store_msg.string_address3);
      expect(err).has.property("address_4",store_msg.string_address4);
      expect(err).has.property("city",store_msg.string_city);
      expect(err).has.property("state",store_msg.string_state);
      expect(err).has.property("zip",store_msg.string_zip);
      expect(err).has.property("country",store_msg.string_country);
    });
  });

  it("status should be number", () => {
    let requestData = {
      status: Cypress.env("RandomNum"),
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_SV_adress}${ship_via_addrs_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status",store_msg.err_status1);
    });
  });

  it("status must be one of [0 and 1]", () => {
    let requestData = {
      status: Cypress.env("RandomNumber"),
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_SV_adress}${ship_via_addrs_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status",store_msg.err_status);
    });
  });
});
