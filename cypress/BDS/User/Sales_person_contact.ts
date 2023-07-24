import routes from "../../support/route";
import store_msg from "../../support/store_msg";

before(() => {
  cy.GetCompanyToken();
  cy.GetSalesPersonId();
  cy.Random();
  cy.RandomNumber();
  cy.RandomNum();
  cy.randomEmail();
});
let sales_cont_id: Number;
let sales_cont_id_1: Number;
let sales_contInfo_id: Number;
let requestData
let spContFetchReq

function reqSpContact(payload, ignoredata = [], adddata = {}) {
  let reqBody = {
    sales_person_id: payload.hasOwnProperty("sales_person_id") ? payload.sales_person_id : Cypress.env("salesId"),
    first_name: payload.hasOwnProperty("first_name") ? payload.first_name : Cypress.env("Random"),
    middle_name: payload.hasOwnProperty("middle_name") ? payload.middle_name : Cypress.env("Random"),
    last_name: payload.hasOwnProperty("last_name") ? payload.last_name : Cypress.env("Random"),
    status: payload.hasOwnProperty("status") ? payload.status : 1,
    contact_info: payload.hasOwnProperty("contact_info") ? payload.contact_info : [
      {
        type: payload.hasOwnProperty("type") ? payload.type : "phone",
        value: payload.hasOwnProperty("value") ? payload.value : Cypress.env("Random"),
        label: payload.hasOwnProperty("label") ? payload.label : "office phone",
        status: payload.hasOwnProperty("status") ? payload.status : 1
      },
      {
        type: payload.hasOwnProperty("type") ? payload.type : "email",
        value: payload.hasOwnProperty("value") ? payload.value : Cypress.env("testEmail"),
        label: payload.hasOwnProperty("label") ? payload.label : "office email",
        status: payload.hasOwnProperty("status") ? payload.status : 1
      },
      {
        type: payload.hasOwnProperty("type") ? payload.type : "fax",
        value: payload.hasOwnProperty("value") ? payload.value : Cypress.env("Random"),
        label: payload.hasOwnProperty("label") ? payload.label : "office fax",
        status: payload.hasOwnProperty("status") ? payload.status : 1
      }
    ]
  };
  ignoredata.forEach((itemrow, index) => {
    if (Array.isArray(itemrow)) {
      itemrow.forEach((nextrow) => {
        if (reqBody.hasOwnProperty(index) && reqBody[index].hasOwnProperty(nextrow))
          delete reqBody[index][nextrow];
      });
    } else {
      delete reqBody[itemrow];
    }
  })

  for (const itemrow in adddata) {
    if (Array.isArray(adddata[itemrow])) {
      adddata[itemrow].forEach((nextrow, innerrow) => {
        if (nextrow.hasOwnProperty("id"))
          reqBody[itemrow][innerrow]["id"] = nextrow["id"];
      });
    }
  }

  return reqBody
}

function spContCreateResponse(result) {
  expect(result).has.property("id");
  if (requestData.hasOwnProperty("first_name")) {
    expect(result).has.property("first_name", requestData.first_name);
  } else {
    expect(result).has.property("first_name");
  }

  if (requestData.middle_name == "") {
    expect(result).has.property("middle_name");
  } else if (result.hasOwnProperty("middle_name")) {
    expect(result).has.property("middle_name", requestData.middle_name);
  }

  if (requestData.last_name == "") {
    expect(result).has.property("last_name");
  } else if (result.hasOwnProperty("last_name")) {
    expect(result).has.property("last_name", requestData.last_name);
  }

  if (requestData.hasOwnProperty("status")) {
    expect(result).has.property("status", requestData.status);
  } else if (result.hasOwnProperty("status")) {
    expect(result).has.property("status");
  }
  expect(result).has.property("type");
  expect(result).has.property("created_date");
  expect(result).has.property("created_by");

  if (requestData.hasOwnProperty("sales_person_id")) {
    expect(result).has.property("sales_person_id", requestData.sales_person_id);
  } else {
    expect(result).has.property("sales_person_id");
  }

  if (requestData.contact_info.length === 0) {
    expect(result).has.deep.property("contact_info", requestData.contact_info);
  } else {
    result.contact_info.forEach((ele: any, index: any) => {
      expect(ele).has.property("id");
      expect(ele).has.property("sales_contact_id");
      expect(ele).has.property("type", requestData.contact_info[index].type);
      expect(ele).has.property("value", requestData.contact_info[index].value);
      expect(ele).has.property("label", requestData.contact_info[index].label);
      expect(ele).has.property("status", requestData.contact_info[index].status);
      expect(ele).has.property("created_date");
      expect(ele).has.property("created_by");
    })
  }
}

function spContUpdateResponse(result) {
  expect(result).has.property("id");
  if (requestData.hasOwnProperty("first_name")) {
    expect(result).has.property("first_name", requestData.first_name);
  } else {
    expect(result).has.property("first_name");
  }

  if (requestData.middle_name == "") {
    expect(result).has.property("middle_name");
  } else if (requestData.hasOwnProperty("middle_name")) {
    expect(result).has.property("middle_name", requestData.middle_name);
  } else { expect(result).has.property("middle_name") }

  if (requestData.last_name == "") {
    expect(result).has.property("last_name");
  } else if (requestData.hasOwnProperty("last_name")) {
    expect(result).has.property("last_name", requestData.last_name);
  } else { expect(result).has.property("last_name") }

  if (requestData.hasOwnProperty("status")) {
    expect(result).has.property("status", requestData.status);
  } else if (result.hasOwnProperty("status")) {
    expect(result).has.property("status");
  }
  expect(result).has.property("type");
  expect(result).has.property("created_date");
  expect(result).has.property("updated_date");
  expect(result).has.property("created_by");
  expect(result).has.property("updated_by");

  if (requestData.hasOwnProperty("sales_person_id")) {
    expect(result).has.property("sales_person_id", requestData.sales_person_id);
  } else {
    expect(result).has.property("sales_person_id");
  }
  result.contact_info.forEach((ele: any, index: any) => {
    if(requestData.contact_info == 0){
      expect(ele).has.property("id");
      expect(ele).has.property("sales_contact_id");
      expect(ele).has.property("type");
      expect(ele).has.property("value");
      expect(ele).has.property("label");
      expect(ele).has.property("status");
      expect(ele).has.property("created_date");
      expect(ele).has.property("updated_date");
      expect(ele).has.property("created_by");
      expect(ele).has.property("updated_by");
    }else if (requestData.hasOwnProperty("contact_info")) {
      if (requestData.contact_info[index].hasOwnProperty("id")) {
        expect(ele).has.property("id",requestData.contact_info[index].id)
      } else { expect(ele).has.property("id") }
     
      expect(ele).has.property("sales_contact_id");
      if (requestData.contact_info[index].hasOwnProperty("type")) {
        expect(ele).has.property("type", requestData.contact_info[index].type)
      } else { expect(ele).has.property("type") }

      if (requestData.contact_info[index].hasOwnProperty("value")) {
        expect(ele).has.property("value", requestData.contact_info[index].value)
      } else { expect(ele).has.property("value") }

      if (requestData.contact_info[index].hasOwnProperty("label")) {
        expect(ele).has.property("label", requestData.contact_info[index].label)
      } else { expect(ele).has.property("label") }

      if (requestData.contact_info[index].hasOwnProperty("status")) {
        expect(ele).has.property("status", requestData.contact_info[index].status)
      } else { expect(ele).has.property("status") }
      expect(ele).has.property("created_date");
      expect(ele).has.property("updated_date");
      expect(ele).has.property("created_by");
      expect(ele).has.property("updated_by");
    } else {
      expect(ele).has.property("id");
      expect(ele).has.property("sales_contact_id");
      expect(ele).has.property("type");
      expect(ele).has.property("value");
      expect(ele).has.property("label");
      expect(ele).has.property("status");
      expect(ele).has.property("created_date");
      expect(ele).has.property("updated_date");
      expect(ele).has.property("created_by");
      expect(ele).has.property("updated_by");
    }
  })
  
}

function spContFetchResp(result){
  result.data.forEach((ele: any, index: any) => {
    expect(ele).has.property("id");
    expect(ele).has.property("sales_person_id");
    expect(ele).has.property("code");
    expect(ele).has.property("sales_person_first_name");
    expect(ele).has.property("sales_person_middle_name");
    expect(ele).has.property("sales_person_last_name");
    expect(ele).has.property("id");
    expect(ele).has.property("first_name");
    expect(ele).has.property("middle_name");
    expect(ele).has.property("last_name");
    expect(ele).has.property("type");
    if(ele.contact_info ==0){
      expect(ele).has.deep.property("contact_info");
    }else{
    ele.contact_info.forEach((element: any) => {
      expect(element).has.property("id");
      expect(element).has.property("type");
      expect(element).has.property("value");
      expect(element).has.property("label");
    });
  }
  });
  if (spContFetchReq.hasOwnProperty("page")) {
    expect(result).has.property("page", spContFetchReq.page)
  } else { expect(result).has.property("page") }
  if (spContFetchReq.hasOwnProperty("page")) {
    expect(result).has.property("perPage", spContFetchReq.perPage);
  } else { expect(result).has.property("perPage") }
  expect(result).has.property("totalRecords");
}

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {

  it("Test cases for create API", () => {
    requestData = reqSpContact({});
    cy.request({
      method: routes.post,
      url: routes.post_SP_contact,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      sales_cont_id = body.result.data.id;
      sales_contInfo_id = body.result.data.contact_info.map(
        (element) => element.id
      );
      cy.Success(body);
      spContCreateResponse(body.result.data)
    });
  });

  it("Test cases for create API when optional fields are null", () => {
    requestData = reqSpContact({
      middle_name: null,
      last_name: null
    });
    cy.request({
      method: routes.post,
      url: routes.post_SP_contact,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      sales_cont_id_1 = body.result.data.id;
      cy.Success(body);
      spContCreateResponse(body.result.data)
    });
  });

  it("Test cases for create API when optional fields are blank", () => {
    requestData = reqSpContact({
      middle_name: "",
      last_name: ""
    });
    cy.request({
      method: routes.post,
      url: routes.post_SP_contact,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      spContCreateResponse(body.result.data)
    });
  });

  it("Test cases for create API when not providing optional fields", () => {
    requestData = reqSpContact({}, ["status", "middle_name", "last_name"]);
    cy.request({
      method: routes.post,
      url: routes.post_SP_contact,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      spContCreateResponse(body.result.data)
    });
  });

  it("Test cases for create API when contact_info Array is blank", () => {
    requestData = reqSpContact({ contact_info: [] });
    cy.request({
      method: routes.post,
      url: routes.post_SP_contact,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      spContCreateResponse(body.result.data)
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {

  it("Test case for update API when not providing any fields", () => {
    requestData = {}
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_SP_contact}${sales_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      spContUpdateResponse(body.result.data)
    });
  });

  it("Test case for update API when not providing optional fields", () => {
    requestData = reqSpContact({}, ["middle_name", "last_name", "status"], {
      "contact_info": [
        { "id": sales_contInfo_id[0] },
        { "id": sales_contInfo_id[1] },
        { "id": sales_contInfo_id[2] }
      ]

    });
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_SP_contact}${sales_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      spContUpdateResponse(body.result.data)
    });
  });

  it("Test case for update API when optional fields are null", () => {
    requestData = reqSpContact({
      middle_name: null,
      last_name: null
    }, [], {
      "contact_info": [
        { "id": sales_contInfo_id[0] },
        { "id": sales_contInfo_id[1] },
        { "id": sales_contInfo_id[2] }
      ]

    });
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_SP_contact}${sales_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      spContUpdateResponse(body.result.data)
    });
  });

  it("Test case for update API when optional fields are blank", () => {
    requestData = reqSpContact({
      middle_name: "",
      last_name: ""
    }, [], {
      "contact_info": [
        { "id": sales_contInfo_id[0] },
        { "id": sales_contInfo_id[1] },
        { "id": sales_contInfo_id[2] }
      ]
    });
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_SP_contact}${sales_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      spContUpdateResponse(body.result.data)
    });
  });

  it("Test case for update API when not providing required fields", () => {
    requestData = reqSpContact({}, ["first_name", "contact_info", "sales_person_id"]);
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_SP_contact}${sales_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      spContUpdateResponse(body.result.data)
    });
  });

  it("Test case for update API when contact_info array are blank", () => {
    requestData = reqSpContact({ contact_info: [] });
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_SP_contact}${sales_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      spContUpdateResponse(body.result.data)
      // expect(body.result.data).has.property("id");
      // expect(body.result.data).has.property("first_name");
      // expect(body.result.data).has.property("middle_name");
      // expect(body.result.data).has.property("last_name");
      // expect(body.result.data).has.property("status");
      // expect(body.result.data).has.property("type");
      // expect(body.result.data).has.property("created_date");
      // expect(body.result.data).has.property("updated_date");
      // expect(body.result.data).has.property("created_by");
      // expect(body.result.data).has.property("updated_by");
      // expect(body.result.data).has.property("sales_person_id");
      // body.result.data.contact_info.forEach((ele: any) => {
      //   expect(ele).has.property("id");
      //   expect(ele).has.property("sales_contact_id");
      //   expect(ele).has.property("type");
      //   expect(ele).has.property("value");
      //   expect(ele).has.property("label");
      //   expect(ele).has.property("status");
      //   expect(ele).has.property("created_date");
      //   expect(ele).has.property("updated_date");
      //   expect(ele).has.property("created_by");
      //   expect(ele).has.property("updated_by");
      // });
    });
  });

  it("Test case for update API when contact_info object are blank", () => {
    requestData = {
      contact_info: [
        {
          id: sales_contInfo_id[0]
        },
        {
          id: sales_contInfo_id[1]
        },
        {
          id: sales_contInfo_id[2]
        }
      ]
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_SP_contact}${sales_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      spContUpdateResponse(body.result.data)
    });
  });

  it("Test case for update API with all field", () => {
    requestData = reqSpContact({}, [], {
      "contact_info": [
        { "id": sales_contInfo_id[0] },
        { "id": sales_contInfo_id[1] },
        { "id": sales_contInfo_id[2] }
      ]
    });
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_SP_contact}${sales_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      spContUpdateResponse(body.result.data)
    });
  });

  it("Test case for delete function", () => {
    requestData = {
      contact_info: [
        {
          id: sales_contInfo_id[2],
          delete: 1
        }
      ]
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_SP_contact}${sales_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.log(JSON.stringify(requestData))
      cy.Success(body);
      spContUpdateResponse(body.result.data)
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {
  it("Test case for fetch API", () => {
    spContFetchReq = {
      search: [
        {
          key: "reference_contact.id",
          operation: "=",
          val: sales_cont_id
        }
      ],
      select: [
        "reference_contact.id",
        "sales_person.id as sales_person_id",
        "sales_person.code",
        "sales_person.first_name as sales_person_first_name",
        "reference_contact.first_name",
        "reference_contact.middle_name as sales_person_middle_name",
        "reference_contact.last_name as sales_person_last_name",
        "reference_contact.first_name",
        "reference_contact.middle_name",
        "reference_contact.last_name",
        "reference_contact.type"
      ],
      sort: "reference_contact.id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      body: spContFetchReq,
      url: `${routes.post_SP_contact}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      spContFetchResp(body.result)
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
      method: routes.post,
      body: {},
      url: `${routes.post_SP_contact}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      spContFetchResp(body.result)
    });
  });

  it("Test case for fetch API when not provide search field", () => {
    spContFetchReq = {
      select: [
        "reference_contact.id",
        "sales_person.id as sales_person_id",
        "sales_person.code",
        "sales_person.first_name as sales_person_first_name",
        "reference_contact.first_name",
        "reference_contact.middle_name as sales_person_middle_name",
        "reference_contact.last_name as sales_person_last_name",
        "reference_contact.first_name",
        "reference_contact.middle_name",
        "reference_contact.last_name",
        "reference_contact.type"
      ],
      sort: "reference_contact.id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      body: spContFetchReq,
      url: `${routes.post_SP_contact}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      spContFetchResp(body.result)
    });
  });

  it("Test case for fetch API when not provide search and select field", () => {
    spContFetchReq = {
      sort: "reference_contact.id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      body: spContFetchReq,
      url: `${routes.post_SP_contact}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      spContFetchResp(body.result)
    });
  });

  it("Test case when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_SP_contact}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "reference_contact.id",
            operation: "=",
            val: Cypress.env("RandomNumber")
          }
        ],
        select: [
          "sales_person.id as sales_person_id",
          "sales_person.first_name",
          "reference_contact.first_name",
        ],
        sort: "reference_contact.id",
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
    let requestData = {
      module_name: Cypress.spec["fileName"],
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
    let recordId = sales_cont_id.toString();
    let requestData = {
      module: "sales_person_contact",
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
            "sales_person_id",
            "first_name",
            "last_name",
            "middle_name",
            "status",
            "created_date",
            "updated_date",
            "created_by",
            "updated_by",
          ],
          foreignKey: {},
          child: {
            sales_person_contact_info: {
              fields: [
                "id",
                "sales_contact_id",
                "type",
                "value",
                "label",
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
  it("Test cases When do not provide any field ", () => {
    cy.request({
      method: routes.post,
      url: routes.post_SP_contact,
      body: {},
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("sales_person_id");
      expect(body.error.errorDetails).has.property("first_name");
      expect(body.error.errorDetails).has.property("contact_info");
    });
  });

  it("Test cases When required fields are empty", () => {
    let requestData = {
      sales_person_id: "",
      first_name: "",
      status: "",
      contact_info: [
        {
          type: "",
          value: "",
          label: "",
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_SP_contact,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("sales_person_id");
      expect(body.error.errorDetails).has.property("first_name");
      expect(body.error.errorDetails).has.property("status");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("value");
      expect(body.error.errorDetails).has.property("label");
    });
  });

  it("Test cases When sales_person id doesn't exist", () => {
    let requestData = reqSpContact({
      sales_person_id: Cypress.env("RandomNumber")
    });
    cy.request({
      method: routes.post,
      url: routes.post_SP_contact,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("sales_person_id");
    });
  });

  it("sales_person_id and status should be number", () => {
    let requestData = reqSpContact({
      sales_person_id: Cypress.env("RandomNum"),
      status: Cypress.env("RandomNum")
    });
    cy.request({
      method: routes.post,
      url: routes.post_SP_contact,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("sales_person_id");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("status must be one of [0 and 1]", () => {
    let requestData = reqSpContact({
      status: Cypress.env("RandomNumber")
    });
    cy.request({
      method: routes.post,
      url: routes.post_SP_contact,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("first_name, middle_name, last_name, type, value and label should be String", () => {
    let requestData = reqSpContact({
      first_name: Cypress.env("RandomNumber"),
      middle_name: Cypress.env("RandomNumber"),
      last_name: Cypress.env("RandomNumber"),
      contact_info: [
        {
          type: Cypress.env("RandomNumber"),
          value: Cypress.env("RandomNumber"),
          label: Cypress.env("RandomNumber"),
        },
      ],
    });
    cy.request({
      method: routes.post,
      url: routes.post_SP_contact,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("first_name");
      expect(body.error.errorDetails).has.property("middle_name");
      expect(body.error.errorDetails).has.property("last_name");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("value");
      expect(body.error.errorDetails).has.property("label");
    });
  });

  it("contact_info - type, value and label should be required", () => {
    let requestData = reqSpContact({
      contact_info: [{}],
    });
    cy.request({
      method: routes.post,
      url: routes.post_SP_contact,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("value");
      expect(body.error.errorDetails).has.property("label");
    });
  });

  it("contact_info - status should be Number", () => {
    let requestData = reqSpContact({
      contact_info: [{ status: Cypress.env("RandomNum") }],
    });
    cy.request({
      method: routes.post,
      url: routes.post_SP_contact,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("contact_info - status must be one of [0 or 1]", () => {
    let requestData = reqSpContact({
      contact_info: [{ status: Cypress.env("RandomNumber") }]
    });
    cy.request({
      method: routes.post,
      url: routes.post_SP_contact,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {
  it("sales_person_contact_id must be Number data-type", () => {
    cy.request({
      method: routes.put,
      body: {},
      failOnStatusCode: false,
      url: `${routes.post_SP_contact}${Cypress.env("Random")}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id", store_msg.chk_id);
    });
  });

  it("Test cases When sales_person_contact_id doesn't exist", () => {
    cy.request({
      method: routes.put,
      body: {},
      failOnStatusCode: false,
      url: `${routes.post_SP_contact}${Cypress.env("RandomNumber")}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "sales_person_contact_id", `{sales_person_contact_id} is invalid`);
    });
  });

  it("Test cases When contact_info_id doesn't exist", () => {
    let requestData = {
      contact_info: [
        {
          id: Cypress.env("RandomNumber"),
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_SP_contact}${sales_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("contact_info_id");
    });
  });

  it(" Test cases When contact_id is not associated with contact_info_id", () => {
    let requestData = {
      contact_info: [
        {
          id: sales_contInfo_id[0],
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_SP_contact}${sales_cont_id_1}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("contact_info_id");
    });
  });

  it("delete function should work only with associate contact_id and contact_info_id", () => {
    let requestData = {
      contact_info: [
        {
          id: sales_contInfo_id[0],
          delete: 1,
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_SP_contact}${sales_cont_id_1}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("contact_info_id");
    });
  });

  it("Test cases When required fields are empty", () => {
    let requestData = {
      sales_person_id: "",
      first_name: "",
      status: "",
      contact_info: [
        {
          type: "",
          value: "",
          label: "",
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_SP_contact}${sales_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("sales_person_id");
      expect(body.error.errorDetails).has.property("first_name");
      expect(body.error.errorDetails).has.property("status");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("value");
      expect(body.error.errorDetails).has.property("label");
    });
  });

  it("Test cases When sales_person id doesn't exist", () => {
    let requestData = {
      sales_person_id: Cypress.env("RandomNumber"),
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_SP_contact}${sales_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("sales_person_id");
    });
  });

  it("sales_person_id and status should be number", () => {
    let requestData = {
      sales_person_id: Cypress.env("RandomNum"),
      status: Cypress.env("RandomNum"),
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_SP_contact}${sales_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("sales_person_id");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("status must be one of [0 and 1]", () => {
    let requestData = {
      status: Cypress.env("RandomNumber")
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_SP_contact}${sales_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("first_name, middle_name, last_name, type, value and label should be String", () => {
    let requestData = {
      first_name: Cypress.env("RandomNumber"),
      middle_name: Cypress.env("RandomNumber"),
      last_name: Cypress.env("RandomNumber"),
      contact_info: [
        {
          id: Cypress.env("RandomNumber"),
          type: Cypress.env("RandomNumber"),
          value: Cypress.env("RandomNumber"),
          label: Cypress.env("RandomNumber")
        }
      ]
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_SP_contact}${sales_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("first_name");
      expect(body.error.errorDetails).has.property("middle_name");
      expect(body.error.errorDetails).has.property("last_name");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("value");
      expect(body.error.errorDetails).has.property("label");
    });
  });

  it("contact_info - status should be Number", () => {
    let requestData = {
      contact_info: [
        {
          id: sales_contInfo_id[0],
          status: Cypress.env("RandomNum"),
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_SP_contact}${sales_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("contact_info - status must be one of [0 or 1]", () => {
    let requestData = {
      contact_info: [
        {
          id: sales_contInfo_id[0],
          status: Cypress.env("RandomNumber")
        }
      ]
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_SP_contact}${sales_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });
});
