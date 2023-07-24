import routes from "../../support/route";
import store_msg from "../../support/store_msg";

before(() => {
  cy.GetCompanyToken();
  cy.Random();
  cy.RandomNum();
  cy.RandomNumber();
  cy.randomBoolean();
  cy.GetSalesPersonId();
});

let sales_addrs_id: Number;
let requestData
let spUpdateBody

function req_spAdd(payload,ignoredata=[]){
  let reqBody = {
          contact_name: payload.hasOwnProperty("contact_name")?payload.contact_name :Cypress.env("Random"),
          type: payload.hasOwnProperty("type")?payload.type :Cypress.env("Random"),
          address_1: payload.hasOwnProperty("address_1")?payload.address_1 :Cypress.env("Random"),
          address_2: payload.hasOwnProperty("address_2")?payload.address_2 :Cypress.env("Random"),
          address_3: payload.hasOwnProperty("address_3")?payload.address_3 :Cypress.env("Random"),
          address_4: payload.hasOwnProperty("address_4")?payload.address_4 :Cypress.env("Random"),
          city: payload.hasOwnProperty("city")?payload.city :Cypress.env("Random"),
          state: payload.hasOwnProperty("state")?payload.state :Cypress.env("Random"),
          zip: payload.hasOwnProperty("zip")?payload.zip :Cypress.env("Random"),
          country: payload.hasOwnProperty("country")?payload.country :Cypress.env("Random"),
          status: payload.hasOwnProperty("status")?payload.status :1,
          sales_person_id: payload.hasOwnProperty("sales_person_id")?payload.sales_person_id :Cypress.env("salesId")
        };
        ignoredata.forEach((itemrow)=>{
          delete reqBody[itemrow];
        })
        return reqBody
};

function spResonse(res){
  expect(res).has.property("is_verified");
  expect(res).has.property("id");
  expect(res).has.property("contact_name",requestData.contact_name);
  expect(res).has.property("type", requestData.type);
  expect(res).has.property("address_1", requestData.address_1);
  if(res.hasOwnProperty("address_2")){
    expect(res).has.property("address_2", requestData.address_2);
  }
  if(res.hasOwnProperty("address_3")){
    expect(res).has.property("address_3", requestData.address_3);
  }
  if(res.hasOwnProperty("address_4")){
    expect(res).has.property("address_4", requestData.address_4);
  }
  expect(res).has.property("city", requestData.city);
  expect(res).has.property("state", requestData.state);
  expect(res).has.property("zip", requestData.zip);
  expect(res).has.property("country", requestData.country);
  if(res.hasOwnProperty("address_4")){
    expect(res).has.property("status", requestData.status);
  }
  expect(res).has.property("created_date");
  expect(res).has.property("created_by");
};

function spUpdateRes(data) {
  expect(data).has.property("is_verified");
  expect(data).has.property("id");
  if (spUpdateBody.hasOwnProperty("contact_name")) {
    expect(data).has.property("contact_name", spUpdateBody.contact_name)
  } else { expect(data).has.property("contact_name") }

  if (spUpdateBody.hasOwnProperty("type")) {
    expect(data).has.property("type", spUpdateBody.type)
  } else { expect(data).has.property("type") }

  if (spUpdateBody.hasOwnProperty("address_1")) {
    expect(data).has.property("address_1", spUpdateBody.address_1)
  } else { expect(data).has.property("address_1") }

  if (spUpdateBody.hasOwnProperty("address_2")) {
    expect(data).has.property("address_2", spUpdateBody.address_2)
  } else { expect(data).has.property("address_2") }

  if (spUpdateBody.hasOwnProperty("address_3")) {
    expect(data).has.property("address_3", spUpdateBody.address_3)
  } else { expect(data).has.property("address_3") }

  if (spUpdateBody.hasOwnProperty("address_4")) {
    expect(data).has.property("address_4", spUpdateBody.address_4)
  } else { expect(data).has.property("address_4") }

  if (spUpdateBody.hasOwnProperty("state")) {
    expect(data).has.property("state", spUpdateBody.state);
  } else { expect(data).has.property("state") }

  if (spUpdateBody.hasOwnProperty("zip")) {
    expect(data).has.property("zip", spUpdateBody.zip);
  } else { expect(data).has.property("zip") }

  if (spUpdateBody.hasOwnProperty("country")) {
    expect(data).has.property("country", spUpdateBody.country);
  } else { expect(data).has.property("country") }

  if (spUpdateBody.hasOwnProperty("status")) {
    expect(data).has.property("status", spUpdateBody.status);
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

function fetchResponse(result){
  let res= result.data;
  res.forEach((ele: any) => {
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
    expect(ele).has.property("sales_person_id");
    expect(ele).has.property("code");
    expect(ele).has.property("first_name");
    expect(ele).has.property("middle_name");
    expect(ele).has.property("last_name");
  });
  expect(result).has.property("page");
  expect(result).has.property("perPage");
  expect(result).has.property("totalRecords");
};

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {
  it("Test cases for create API", () => {
    requestData = req_spAdd({});
    cy.request({
      method: routes.post,
      url: routes.post_SP_address,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      sales_addrs_id = body.result.data.id;
      cy.Success(body);
      spResonse(body.result.data)
    });
  });

  it("Test cases for create API when not providing option fields", () => {
    let requestData = req_spAdd({},
      ["address_2","address_3","address_4","status"]);
    cy.request({
      method: routes.post,
      url: routes.post_SP_address,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      // let res = body.result.data;
      cy.Success(body);
      spResonse(body.result.data)
      // expect(res).has.property("status");
      // expect(res).has.property("is_verified");
      // expect(res).has.property("id");
      // expect(res).has.property("contact_name",requestData.contact_name);
      // expect(res).has.property("type", requestData.type);
      // expect(res).has.property("address_1", requestData.address_1);
      // expect(res).has.property("city", requestData.city);
      // expect(res).has.property("state", requestData.state);
      // expect(res).has.property("zip", requestData.zip);
      // expect(res).has.property("country", requestData.country);
      // expect(res).has.property("created_date");
      // expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API when option fields are null", () => {
     requestData = req_spAdd({
      address_2: null,
      address_3: null,
      address_4: null
    });
    cy.request({
      method: routes.post,
      url: routes.post_SP_address,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      spResonse(body.result.data)
    });
  });

  it("Test cases for create API when option fields are blank", () => {
    requestData = req_spAdd({
      address_2: "",
      address_3: "",
      address_4: ""
    });
    cy.request({
      method: routes.post,
      url: routes.post_SP_address,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      spResonse(body.result.data)
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {

  it("Test case for update API when not providing any field", () => {
    spUpdateBody = {};
    cy.request({
      method: routes.put, 
      body: spUpdateBody,
      url: `${routes.post_SP_address}${sales_addrs_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      // let res = body.result.data
      cy.Success(body);
      spUpdateRes(body.result.data)
      // expect(res).has.property("id");
      // expect(res).has.property("contact_name");
      // expect(res).has.property("type");
      // expect(res).has.property("address_1");
      // expect(res).has.property("address_2");
      // expect(res).has.property("address_3");
      // expect(res).has.property("address_4");
      // expect(res).has.property("city");
      // expect(res).has.property("state");
      // expect(res).has.property("zip");
      // expect(res).has.property("country");
      // expect(res).has.property("status");
      // expect(res).has.property("created_date");
      // expect(res).has.property("updated_date");
      // expect(res).has.property("created_by");
      // expect(res).has.property("is_verified");
      // updateUse(body.result.data)
    });
  });

  it("Test case for update API when optional fields are not provided", () => {
    spUpdateBody = req_spAdd({},
      ["address_2","address_3","address_4","status","sales_person_id"]);
    cy.request({
      method: routes.put,
      body: spUpdateBody,
      url: `${routes.post_SP_address}${sales_addrs_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      // let res = body.result.data;
      cy.Success(body);
      spUpdateRes(body.result.data)
      // expect(res).has.property("is_verified");
      // expect(res).has.property("id");
      // expect(res).has.property("contact_name",requestData.contact_name);
      // expect(res).has.property("type", requestData.type);
      // expect(res).has.property("address_1", requestData.address_1);
      // expect(res).has.property("address_2");
      // expect(res).has.property("address_3");
      // expect(res).has.property("address_4");
      // expect(res).has.property("city", requestData.city);
      // expect(res).has.property("state", requestData.state);
      // expect(res).has.property("zip", requestData.zip);
      // expect(res).has.property("country", requestData.country);
      // expect(res).has.property("status");
      // expect(res).has.property("created_date");
      // expect(res).has.property("created_by");
      // expect(res).has.property("is_verified");
      // updateUse(body.result.data)
    });
  });

  it("Test case for update API when optional fields are blank", () => {
    spUpdateBody = req_spAdd({
      address_2: "",
      address_3: "",
      address_4: "",
    },["sales_person_id"]);
    cy.request({
      method: routes.put,
      body: spUpdateBody,
      url: `${routes.post_SP_address}${sales_addrs_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      spUpdateRes(body.result.data)
    });
  });

  it("Test case for update API when optional fields are null", () => {
    spUpdateBody = req_spAdd({
      address_2: null,
      address_3: null,
      address_4: null,
    },["sales_person_id"]);
    cy.request({
      method: routes.put,
      body: spUpdateBody,
      url: `${routes.post_SP_address}${sales_addrs_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      spUpdateRes(body.result.data)
    });
  });

  it("Test case for update API when not providing required field", () => {
    spUpdateBody = req_spAdd({},
      ["contact_name","type","address_1","city","state","zip","country","sales_person_id"]);
    cy.request({
      method: routes.put,
      body: spUpdateBody,
      url: `${routes.post_SP_address}${sales_addrs_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      spUpdateRes(body.result.data)
      // let res =body.result.data;
      // expect(res).has.property("id");
      // expect(res).has.property("contact_name");
      // expect(res).has.property("type");
      // expect(res).has.property("address_1");
      // expect(res).has.property("address_2", requestData.address_2);
      // expect(res).has.property("address_3", requestData.address_3);
      // expect(res).has.property("address_4", requestData.address_4);
      // expect(res).has.property("city");
      // expect(res).has.property("state");
      // expect(res).has.property("zip");
      // expect(res).has.property("country");
      // expect(res).has.property("status", requestData.status);
      // expect(res).has.property("created_date");
      // expect(res).has.property("created_by");
      // expect(res).has.property("is_verified");
      // updateUse(body.result.data)
    });
  });

  it("Test case for update API", () => {
    spUpdateBody = req_spAdd({},["sales_person_id"]);
    cy.request({
      method: routes.put,
      body: spUpdateBody,
      url: `${routes.post_SP_address}${sales_addrs_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      spUpdateRes(body.result.data)
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {

  it("Test case for fetch API", () => {
    let requestData = {
      search: [
        {
          key: "address.id",
          operation: "=",
          val: sales_addrs_id
        }
      ],
      searchOr: [
        {
          key: "address.id",
          operation: "=",
          val: sales_addrs_id
        }
      ],
      searchOrAnd: [
        {
          key: "address.id",
          operation: "=",
          val: sales_addrs_id
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
        "address.status",
        "sales_person.id as sales_person_id",
        "sales_person.code",
        "sales_person.first_name",
        "sales_person.middle_name",
        "sales_person.last_name"
      ],
      sort: "sales_person.id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_SP_address,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      fetchResponse(body.result)
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
      method: routes.post,
      url: routes.fetch_SP_address,
      body: {},
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      fetchResponse(body.result)
    });
  });

  it("Test case for fetch API when not provide search field", () => {
    let requestData = {
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
        "address.status",
        "sales_person.id as sales_person_id",
        "sales_person.code",
        "sales_person.first_name",
        "sales_person.middle_name",
        "sales_person.last_name"
      ],
      sort: "sales_person.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_SP_address,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      fetchResponse(body.result)
    });
  });

  it("Test case for fetch API when not provide select field", () => {
    let requestData = {
      search: [
        {
          key: "address.id",
          operation: "=",
          val: sales_addrs_id,
        },
      ],
      select: [],
      sort: "sales_person.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_SP_address,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      fetchResponse(body.result)
    });
  });

  it("Test case for fetch API when not provide search and select field", () => {
    let requestData = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [],
      sort: "sales_person.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_SP_address,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      fetchResponse(body.result)
    });
  });

  it("Test case when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: routes.fetch_SP_address,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "address.id",
            operation: "=",
            val: Cypress.env("RandomNumber")
          }
        ],
        select: ["sales_person.id", "address.country", "address.status"],
        sort: "sales_person.id",
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
    let requestData = {
      module_name: "sales_person_addresses",
      search: [
        {
          key: "createdAt",
          operation: "date_range",
          val: [today, today],
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
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.check_log(body);
    });
  });

  it("Test case for track-change-data API", () => {
    let recordId = sales_addrs_id.toString();
    let requestData = {
      module: "sales_person_addresses",
      record_id: recordId,
      sort: "_id",
      orderby: "desc",
      page: 1,
      perPage: 20,
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
    let name = "sales_person_addresses";
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
      url: routes.post_SP_address,
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
      expect(err).has.property("sales_person_id",`{sales_person_id} is required`);
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
      sales_person_id: ""
    };
    cy.request({
      method: routes.post,
      url: routes.post_SP_address,
      body: requestData,
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
      expect(err).has.property("sales_person_id",`{sales_person_id} must be a number`);
    });
  });

  it("Test case when sales_person id doesn't exist", () => {
    let requestData = req_spAdd({
      sales_person_id: Cypress.env("RandomNumber")
    });
    cy.request({
      method: routes.post,
      url: routes.post_SP_address,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "sales_person_id",`{sales_person_id} is invalid`);
    });
  });

  it("contact_name, type, address, city, state, zip and country should be string", () => {
    let requestData = req_spAdd({
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
      url: routes.post_SP_address,
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

  it("sales_person_id and status should be number", () => {
    let requestData = req_spAdd({
      status: Cypress.env("RandomNum"),
      sales_person_id: Cypress.env("RandomNum")
    });
    cy.request({
      method: routes.post,
      url: routes.post_SP_address,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status",store_msg.err_status1);
      expect(err).has.property("sales_person_id",`{sales_person_id} must be a number`);
    });
  });

  it("status must be one of [0 and 1]", () => {
    let requestData = req_spAdd({
      status: Cypress.env("RandomNumber"),
      sales_person_id: Cypress.env("salesId"),
    });
    cy.request({
      method: routes.post,
      url: routes.post_SP_address,
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
      url: `${routes.post_SP_address}${Cypress.env("Random")}`,
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
      url: `${routes.post_SP_address}${Cypress.env("RandomNumber")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "sales_person_address_id",`{sales_person_address_id} is invalid`);
    });
  });

  it("Test cases When required fields are empty", () => {
    let requestData = {
      contact_name: "",
      type: "",
      address_1: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      status:""
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_SP_address}${sales_addrs_id}`,
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
      url: `${routes.post_SP_address}${sales_addrs_id}`,
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
      status: Cypress.env("RandomNum")
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_SP_address}${sales_addrs_id}`,
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
      url: `${routes.post_SP_address}${sales_addrs_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status",store_msg.err_status);
    });
  });
});
