import routes from "../../support/route";
import store_msg from "../../support/store_msg";

before(() => {
  cy.GetCompanyToken();
  cy.Random();
  cy.RandomNumber();
  cy.RandomNum();
  cy.RandomNum_2();
  cy.Getship_viaIdId();
  cy.randomEmail();
});

let ship_via_cont_id: Number;
let ship_via_cont_id_1: Number;
let Ship_via_contInfo_id: Number[];
let svContCreateReq
let svContUpdateReq
let svContFetchReq

function reqShipvaiCont(payload, ignoredata = [], adddata = {}) {
  let reqBody = {
    ship_via_id: payload.hasOwnProperty("ship_via_id") ? payload.ship_via_id : Cypress.env("ship_viaId"),
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
};

function svContCreateResp(data) {
  expect(data).has.property("id");
  if (svContCreateReq.hasOwnProperty("first_name")) {
    expect(data).has.property("first_name", svContCreateReq.first_name);
  } else {
    expect(data).has.property("first_name");
  }

  if (svContCreateReq.middle_name == "") {
    expect(data).has.property("middle_name");
  } else if (data.hasOwnProperty("middle_name")) {
    expect(data).has.property("middle_name", svContCreateReq.middle_name);
  }

  if (svContCreateReq.last_name == "") {
    expect(data).has.property("last_name");
  } else if (data.hasOwnProperty("last_name")) {
    expect(data).has.property("last_name", svContCreateReq.last_name);
  }

  if (svContCreateReq.hasOwnProperty("status")) {
    expect(data).has.property("status", svContCreateReq.status);
  } else if (data.hasOwnProperty("status")) {
    expect(data).has.property("status");
  }
  expect(data).has.property("type");
  expect(data).has.property("created_date");
  expect(data).has.property("created_by");

  if (svContCreateReq.hasOwnProperty("ship_via_id")) {
    expect(data).has.property("ship_via_id", svContCreateReq.ship_via_id);
  } else {
    expect(data).has.property("ship_via_id");
  }

  if (svContCreateReq.contact_info.length === 0) {
    expect(data).has.deep.property("contact_info", svContCreateReq.contact_info);
  } else {
    data.contact_info.forEach((ele: any, index: any) => {
      expect(ele).has.property("id");
      expect(ele).has.property("ship_via_contact_id");
      expect(ele).has.property("type", svContCreateReq.contact_info[index].type);
      expect(ele).has.property("value", svContCreateReq.contact_info[index].value);
      expect(ele).has.property("label", svContCreateReq.contact_info[index].label);
      expect(ele).has.property("status", svContCreateReq.contact_info[index].status);
      expect(ele).has.property("created_date");
      expect(ele).has.property("created_by");
    })
  }
};

function svContUpdateResp(result) {
  expect(result).has.property("id");
  if (svContUpdateReq.hasOwnProperty("first_name")) {
    expect(result).has.property("first_name", svContUpdateReq.first_name);
  } else {
    expect(result).has.property("first_name");
  }

  if (svContUpdateReq.middle_name == "") {
    expect(result).has.property("middle_name");
  } else if (svContUpdateReq.hasOwnProperty("middle_name")) {
    expect(result).has.property("middle_name", svContUpdateReq.middle_name);
  } else { expect(result).has.property("middle_name") }

  if (svContUpdateReq.last_name == "") {
    expect(result).has.property("last_name");
  } else if (svContUpdateReq.hasOwnProperty("last_name")) {
    expect(result).has.property("last_name", svContUpdateReq.last_name);
  } else { expect(result).has.property("last_name") }

  if (svContUpdateReq.hasOwnProperty("status")) {
    expect(result).has.property("status", svContUpdateReq.status);
  } else if (result.hasOwnProperty("status")) {
    expect(result).has.property("status");
  }
  expect(result).has.property("type");
  expect(result).has.property("created_date");
  expect(result).has.property("updated_date");
  expect(result).has.property("created_by");
  expect(result).has.property("updated_by");

  if (svContUpdateReq.hasOwnProperty("ship_via_id")) {
    expect(result).has.property("ship_via_id", svContUpdateReq.ship_via_id);
  } else {
    expect(result).has.property("ship_via_id");
  }
  result.contact_info.forEach((ele: any, index: any) => {
    if(svContUpdateReq.contact_info == 0){
      expect(ele).has.property("id");
      expect(ele).has.property("ship_via_contact_id");
      expect(ele).has.property("type");
      expect(ele).has.property("value");
      expect(ele).has.property("label");
      expect(ele).has.property("status");
      expect(ele).has.property("created_date");
      expect(ele).has.property("updated_date");
      expect(ele).has.property("created_by");
      expect(ele).has.property("updated_by");
    }else if (svContUpdateReq.hasOwnProperty("contact_info")) {
      let svContInfo = svContUpdateReq.contact_info[index]
    if (svContInfo.hasOwnProperty("id")) {
      expect(ele).has.property("id", svContInfo.id)
    } else { expect(ele).has.property("id") }

    expect(ele).has.property("ship_via_contact_id");

    if (svContInfo.hasOwnProperty("type")) {
      expect(ele).has.property("type", svContInfo.type)
    } else { expect(ele).has.property("type") }

    if (svContInfo.hasOwnProperty("value")) {
      expect(ele).has.property("value", svContInfo.value)
    } else { expect(ele).has.property("value") }

    if (svContInfo.hasOwnProperty("label")) {
      expect(ele).has.property("label", svContInfo.label)
    } else { expect(ele).has.property("label") }

    if (svContInfo.hasOwnProperty("status")) {
      expect(ele).has.property("status", svContInfo.status)
    } else { expect(ele).has.property("status") }
    expect(ele).has.property("created_date");
    expect(ele).has.property("updated_date");
    expect(ele).has.property("created_by");
    expect(ele).has.property("updated_by");
    } else {
      expect(ele).has.property("id");
      expect(ele).has.property("ship_via_contact_id");
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
};

function svContFetchResp(result){
  result.data.forEach((ele: any, index: any) => {
    expect(ele).has.property("id");
    expect(ele).has.property("ship_via_id");
    expect(ele).has.property("code");
    expect(ele).has.property("name");
    expect(ele).has.property("description");
    expect(ele).has.property("scac_code");
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
  if (svContFetchReq.hasOwnProperty("page")) {
    expect(result).has.property("page", svContFetchReq.page)
  } else { expect(result).has.property("page") }
  if (svContFetchReq.hasOwnProperty("page")) {
    expect(result).has.property("perPage", svContFetchReq.perPage);
  } else { expect(result).has.property("perPage") }
  expect(result).has.property("totalRecords");
}

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {

  it("Test cases for create API", () => {
    svContCreateReq = reqShipvaiCont({});
    cy.request({
      method: routes.post,
      url: routes.post_SV_contact,
      body: svContCreateReq,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      ship_via_cont_id = body.result.data.id;
      Ship_via_contInfo_id = body.result.data.contact_info.map(
        (element) => element.id
      );
      cy.Success(body);
      svContCreateResp(body.result.data)
    });
  });

  it("Test cases for create API when optional fields are null", () => {
    svContCreateReq = reqShipvaiCont({
      middle_name: null,
      last_name: null
    });
    cy.request({
      method: routes.post,
      url: routes.post_SV_contact,
      body: svContCreateReq,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      ship_via_cont_id_1 = body.result.data.id;
      cy.Success(body);
      svContCreateResp(body.result.data)
    });
  });

  it("Test cases for create API when optional fields are blank", () => {
    svContCreateReq = reqShipvaiCont({
      middle_name: "",
      last_name: ""
    });
    cy.request({
      method: routes.post,
      url: routes.post_SV_contact,
      body: svContCreateReq,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      svContCreateResp(body.result.data)
    });
  });

  it("Test cases for create API when not providing optional fields", () => {
    svContCreateReq = reqShipvaiCont({}, ["middle_name", "last_name", "status"]);
    cy.request({
      method: routes.post,
      url: routes.post_SV_contact,
      body: svContCreateReq,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      svContCreateResp(body.result.data)
    });
  });

  it("Test cases for create API when contact_info Array is blank", () => {
    svContCreateReq = reqShipvaiCont({ contact_info: [] });
    cy.request({
      method: routes.post,
      url: routes.post_SV_contact,
      body: svContCreateReq,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      svContCreateResp(body.result.data)
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {
  it("Test case for update API when not providing any fields", () => {
    svContUpdateReq = {}
    cy.request({
      method: routes.put,
      body: svContUpdateReq,
      url: `${routes.post_SV_contact}${ship_via_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      svContUpdateResp(body.result.data)
    });
  });

  it("Test case for update API when not providing optional fields", () => {
    svContUpdateReq = reqShipvaiCont({},["middle_name","last_name","status"],
    {contact_info: [
      {id: Ship_via_contInfo_id[0]},
      {id: Ship_via_contInfo_id[1]},
      {id: Ship_via_contInfo_id[2]}
    ]});
    cy.request({
      method: routes.put,
      body: svContUpdateReq,
      url: `${routes.post_SV_contact}${ship_via_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      svContUpdateResp(body.result.data)
    });
  });

  it("Test case for update API when optional fields are null", () => {
    svContUpdateReq= reqShipvaiCont({
       middle_name: null, last_name: null
    },[],{contact_info: [
      {id: Ship_via_contInfo_id[0]},
      {id: Ship_via_contInfo_id[1]},
      {id: Ship_via_contInfo_id[2]}
    ]});
    cy.request({
      method: routes.put,
      body: svContUpdateReq,
      url: `${routes.post_SV_contact}${ship_via_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      svContUpdateResp(body.result.data)
    });
  });

  it("Test case for update API when optional fields are blank", () => {
    svContUpdateReq = reqShipvaiCont({
      middle_name: "",
      last_name: ""
    },[],{contact_info: [
      {id: Ship_via_contInfo_id[0]},
      {id: Ship_via_contInfo_id[1]},
      {id: Ship_via_contInfo_id[2]}
    ]});
    cy.request({
      method: routes.put,
      body: svContUpdateReq,
      url: `${routes.post_SV_contact}${ship_via_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      svContUpdateResp(body.result.data)
    });
  });

  it("Test case for update API when not providing required fields", () => {
    svContUpdateReq = reqShipvaiCont({},["ship_via_id","first_name","contact_info"]);
    cy.request({
      method: routes.put,
      body: svContUpdateReq,
      url: `${routes.post_SV_contact}${ship_via_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      svContUpdateResp(body.result.data)
    });
  });

  it("Test case for update API when contact_info array are blank", () => {
    svContUpdateReq = reqShipvaiCont({ contact_info: [] });
    cy.request({
      method: routes.put,
      body: svContUpdateReq,
      url: `${routes.post_SV_contact}${ship_via_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      svContUpdateResp(body.result.data)
    });
  });

  it("Test case for update API when contact_info object are blank", () => {
    svContUpdateReq = reqShipvaiCont({},[],{
      contact_info: [
        {id: Ship_via_contInfo_id[0]},
        {id: Ship_via_contInfo_id[1]},
        {id: Ship_via_contInfo_id[2]}
      ]
    });
    cy.request({
      method: routes.put,
      body: svContUpdateReq,
      url: `${routes.post_SV_contact}${ship_via_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
       cy.Success(body);
       svContUpdateResp(body.result.data)
    });
  });

  it("Test case for update API", () => {
    svContUpdateReq = reqShipvaiCont({},[],{
      contact_info: [
        {id: Ship_via_contInfo_id[0]},
        {id: Ship_via_contInfo_id[1]},
        {id: Ship_via_contInfo_id[2]}
      ]
    });
    cy.request({
      method: routes.put,
      body: svContUpdateReq,
      url: `${routes.post_SV_contact}${ship_via_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      svContUpdateResp(body.result.data)
    });
  });

  it("Test case for delete function", () => {
    svContUpdateReq = {
      contact_info: [
        {
          id: Ship_via_contInfo_id[2],
          delete: 1,
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: svContUpdateReq,
      url: `${routes.post_SV_contact}${ship_via_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      svContUpdateResp(body.result.data)
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {

  it("Test case for fetch API", () => {
    svContFetchReq = {
      search: [
        {
          key: "reference_contact.id",
          operation: "=",
          val: ship_via_cont_id
        }
      ],
      select: [
        "reference_contact.id",
        "ship_via.id as ship_via_id",
        "ship_via.code",
        "ship_via.name",
        "ship_via.description",
        "ship_via.scac_code",
        "reference_contact.first_name",
        "reference_contact.middle_name",
        "reference_contact.last_name",
        "reference_contact.type"
      ],
      sort: "reference_contact.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      body: svContFetchReq,
      url: `${routes.post_SV_contact}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      svContFetchResp(body.result)
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    svContFetchReq = {}
    cy.request({
      method: routes.post,
      body: svContFetchReq,
      url: `${routes.post_SV_contact}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      svContFetchResp(body.result)
    });
  });

  it("Test case for fetch API when search field left blank", () => {
    svContFetchReq = {
      search: [],
      select: [
        "reference_contact.id",
        "ship_via.id as ship_via_id",
        "ship_via.code",
        "ship_via.name",
        "ship_via.description",
        "ship_via.scac_code",
        "reference_contact.first_name",
        "reference_contact.middle_name",
        "reference_contact.last_name",
        "reference_contact.type"
      ],
      sort: "reference_contact.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      body: svContFetchReq,
      url: `${routes.post_SV_contact}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      svContFetchResp(body.result)
    });
  });

  it("Test case for fetch API when search and  select field left blank", () => {
    svContFetchReq = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [],
      sort: "reference_contact.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      body: svContFetchReq,
      url: `${routes.post_SV_contact}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      svContFetchResp(body.result)
    });
  });

  it("Test case when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_SV_contact}${"fetch"}`,
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
          "ship_via.id as ship_via_id",
          "reference_contact.first_name",
          "reference_contact.middle_name",
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

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {
  it("Test cases When do not provide any field ", () => {
    cy.request({
      method: routes.post,
      url: routes.post_SV_contact,
      body: {},
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("ship_via_id");
      expect(body.error.errorDetails).has.property("first_name");
      expect(body.error.errorDetails).has.property("contact_info");
    });
  });

  it("Test cases When required fields are empty", () => {
    let requestData = {
      ship_via_id: "",
      first_name: "",
      status: "",
      contact_info: [
        {
          type: "",
          value: "",
          label: ""
        }
      ]
    };
    cy.request({
      method: routes.post,
      url: routes.post_SV_contact,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("ship_via_id");
      expect(body.error.errorDetails).has.property("first_name");
      expect(body.error.errorDetails).has.property("status");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("value");
      expect(body.error.errorDetails).has.property("label");
    });
  });

  it("Test cases When ship_via_id doesn't exist", () => {
    let requestData = reqShipvaiCont({
      ship_via_id: Cypress.env("RandomNumber")
    });
    cy.request({
      method: routes.post,
      url: routes.post_SV_contact,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("ship_via_id");
    });
  });

  it("ship_via_id and status should be number", () => {
    let requestData = reqShipvaiCont({
      ship_via_id: Cypress.env("RandomNum"),
      status: Cypress.env("RandomNum")
    });
    cy.request({
      method: routes.post,
      url: routes.post_SV_contact,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("ship_via_id");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("status must be one of [0 and 1]", () => {
    let requestData = reqShipvaiCont({
      status: Cypress.env("RandomNumber")
    });
    cy.request({
      method: routes.post,
      url: routes.post_SV_contact,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("first_name, middle_name, last_name, type, value and label should be String", () => {
    let requestData = reqShipvaiCont({
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
      url: routes.post_SV_contact,
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
    let requestData = reqShipvaiCont({contact_info: [{}]});
    cy.request({
      method: routes.post,
      url: routes.post_SV_contact,
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
    let requestData = reqShipvaiCont({
      contact_info: [{ status: Cypress.env("RandomNum") }],
    });
    cy.request({
      method: routes.post,
      url: routes.post_SV_contact,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("contact_info - status must be one of [0 or 1]", () => {
    let requestData = reqShipvaiCont({
      contact_info: [{ status: Cypress.env("RandomNumber") }],
    });
    cy.request({
      method: routes.post,
      url: routes.post_SV_contact,
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
  it("ship_via_contact_id should be Number data-type", () => {
    cy.request({
      method: routes.put,
      body: {},
      failOnStatusCode: false,
      url: `${routes.post_SV_contact}${Cypress.env("Random")}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id", store_msg.chk_id);
    });
  });

  it("Test cases When ship_via_contact_id doesn't exist", () => {
    cy.request({
      method: routes.put,
      body: {},
      failOnStatusCode: false,
      url: `${routes.post_SV_contact}${Cypress.env("RandomNumber")}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("ship_via_contact_id");
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
      url: `${routes.post_SV_contact}${ship_via_cont_id}`,
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
          id: Ship_via_contInfo_id[0],
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_SV_contact}${ship_via_cont_id_1}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("contact_info_id");
    });
  });

  it("delete function should work only with associate contact_id and contact_info_id", () => {
    let requestData = {
      contact_info: [
        {
          id: Ship_via_contInfo_id[0],
          delete: 1,
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_SV_contact}${ship_via_cont_id_1}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("contact_info_id");
    });
  });

  it("Test cases When required fields are empty", () => {
    let requestData = {
      ship_via_id: "",
      first_name: "",
      status: "",
      contact_info: [
        {
          id: "",
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
      url: `${routes.post_SV_contact}${ship_via_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("ship_via_id");
      expect(body.error.errorDetails).has.property("first_name");
      expect(body.error.errorDetails).has.property("status");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("value");
      expect(body.error.errorDetails).has.property("label");
    });
  });

  it("Test cases When ship_via_id id doesn't exist", () => {
    let requestData = {
      ship_via_id: Cypress.env("RandomNumber"),
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_SV_contact}${ship_via_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("ship_via_id");
    });
  });

  it("ship_via_id and status should be number", () => {
    let requestData = {
      ship_via_id: Cypress.env("RandomNum"),
      status: Cypress.env("RandomNum"),
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_SV_contact}${ship_via_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("ship_via_id");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("status must be one of [0 and 1]", () => {
    let requestData = {
      status: Cypress.env("RandomNumber"),
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_SV_contact}${ship_via_cont_id}`,
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
          id: Ship_via_contInfo_id[0],
          type: Cypress.env("RandomNumber"),
          value: Cypress.env("RandomNumber"),
          label: Cypress.env("RandomNumber"),
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_SV_contact}${ship_via_cont_id}`,
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
          id: Ship_via_contInfo_id[0],
          status: Cypress.env("RandomNum"),
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_SV_contact}${ship_via_cont_id}`,
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
          id: Ship_via_contInfo_id[0],
          status: Cypress.env("RandomNumber"),
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_SV_contact}${ship_via_cont_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
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
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.check_log(body);
    });
  });

  it("Test case for track-change-data API", () => {
    let recordId = ship_via_cont_id.toString();
    let requestData = {
      module: "ship_via_contact",
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
            "ship_via_id",
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
          child: {
            Ship_via_contact_info: {
              fields: [
                "id",
                "ship_via_contact_id",
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
