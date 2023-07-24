import routes from "../../support/route";
import store_msg from "../../support/store_msg";

let cst_cont_id: any;
let cst_cont_id_1: any;
let rescontact_info_id = [];

before(() => {
  cy.GetCompanyToken();
  cy.Random();
  cy.RandomNumber();
  cy.RandomNum();
  cy.GetCustomerId();
  cy.randomEmail();
});


function reqCstContact(payload, ignoredata = [], adddata = {}) {
  let reqBody = {
    customer_id: payload.hasOwnProperty("customer_id") ? payload.customer_id : Cypress.env("cstId"),
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

  //adddata.forEach((itemrow,index)=>{
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

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => { 

  it("Test cases for create API", () => {
    let requestData = reqCstContact({});
    cy.request({
      method: routes.post,
      url: routes.post_cst_contact,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data
      cst_cont_id = res.id;
      rescontact_info_id = res.contact_info.map((element: any) => element.id);
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("first_name",requestData.first_name).be.string;
      expect(res).has.property("middle_name",requestData.middle_name).be.string;
      expect(res).has.property("last_name", requestData.last_name).be.string;
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("type");
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("customer_id",requestData.customer_id);
      res.contact_info.forEach((ele: any, index: any) => {
        let res_info = requestData.contact_info[index];
        expect(ele).has.property("id");
        expect(ele).has.property("customer_contact_id");
        expect(ele).has.property("type", res_info.type).be.string;
        expect(ele).has.property("value",res_info.value).be.string;
        expect(ele).has.property("label",res_info.label).be.string;
        expect(ele).has.property("status",res_info.status);
        expect(ele).has.property("created_date");
        expect(ele).has.property("created_by");
      });
    });
  });

  it("Test cases for create API when optional fields are null", () => {
    let requestData = reqCstContact({
      middle_name: null,
      last_name: null
    });
    cy.request({
      method: routes.post,
      url: routes.post_cst_contact,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res = body.result.data
      cst_cont_id_1 = res.id;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("first_name",requestData.first_name).be.string;
      expect(res).has.property("middle_name",requestData.middle_name).be.string;
      expect(res).has.property("last_name", requestData.last_name).be.string;
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("type");
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("customer_id",requestData.customer_id);
      res.contact_info.forEach((ele: any, index: any) => {
        let res_info = requestData.contact_info[index];
        expect(ele).has.property("id");
        expect(ele).has.property("customer_contact_id");
        expect(ele).has.property("type", res_info.type).be.string;
        expect(ele).has.property("value",res_info.value).be.string;
        expect(ele).has.property("label",res_info.label).be.string;
        expect(ele).has.property("status",res_info.status);
        expect(ele).has.property("created_date");
        expect(ele).has.property("created_by");
      });
    });
  });

  it("Test cases for create API when optional fields are blank", () => {
    let requestData = reqCstContact({
      middle_name: "",
      last_name: ""
    });
    cy.request({
      method: routes.post,
      url: routes.post_cst_contact,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("first_name",requestData.first_name).be.string;
      expect(res).has.property("middle_name");
      expect(res).has.property("last_name");
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("type");
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("customer_id",requestData.customer_id);
      res.contact_info.forEach((ele: any, index: any) => {
        let res_info = requestData.contact_info[index];
        expect(ele).has.property("id");
        expect(ele).has.property("customer_contact_id");
        expect(ele).has.property("type", res_info.type).be.string;
        expect(ele).has.property("value",res_info.value).be.string;
        expect(ele).has.property("label",res_info.label).be.string;
        expect(ele).has.property("status",res_info.status);
        expect(ele).has.property("created_date");
        expect(ele).has.property("created_by");
      });
    });
  });

  it("Test cases for create API when not providing optional fields", () => {
    let requestData = reqCstContact({},["middle_name","last_name","status"]);
    cy.request({
      method: routes.post,
      url: routes.post_cst_contact,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res = body.result.data
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("first_name",requestData.first_name);
      expect(res).has.property("status");
      expect(res).has.property("type");
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("customer_id",requestData.customer_id);
      res.contact_info.forEach((ele: any, index: any) => {
        let res_info = requestData.contact_info[index];
        expect(ele).has.property("id");
        expect(ele).has.property("customer_contact_id");
        expect(ele).has.property("type", res_info.type);
        expect(ele).has.property("value",res_info.value);
        expect(ele).has.property("label",res_info.label);
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("created_by");
      });
    });
  });

  it("Test cases for create API when contact_info Array is blank", () => {
    let requestData = reqCstContact({ contact_info: [] });
    cy.request({
      method: routes.post,
      url: routes.post_cst_contact,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res = body.result.data
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("first_name",requestData.first_name).be.string;
      expect(res).has.property("middle_name",requestData.middle_name).be.string;
      expect(res).has.property("last_name", requestData.last_name).be.string;
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("type");
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("customer_id",requestData.customer_id);
      expect(res).has.deep.property("contact_info",requestData.contact_info)
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {

  it("Test case for update API when not providing any fields", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_cst_contact}${cst_cont_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
    }).then(({ body }) => {
      let res = body.result.data
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("first_name").be.string;
      expect(res).has.property("middle_name").be.string;
      expect(res).has.property("last_name").be.string;
      expect(res).has.property("status");
      expect(res).has.property("type");
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("customer_id");
      res.contact_info.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("customer_contact_id");
        expect(ele).has.property("type").be.string;
        expect(ele).has.property("value").be.string;
        expect(ele).has.property("label").be.string;
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
      });
    });
  });

  it("Test case for update API when not providing optional fields", () => {
    let requestData = reqCstContact({},
      ["middle_name","last_name","status"],{
      "contact_info": [
        { "id": rescontact_info_id[0] },
        { "id": rescontact_info_id[1] },
        { "id": rescontact_info_id[2] }
      ]
    });
    cy.request({
      method: routes.put,
      url: `${routes.post_cst_contact}${cst_cont_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res = body.result.data
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("first_name",requestData.first_name).be.string;
      expect(res).has.property("middle_name").be.string;
      expect(res).has.property("last_name").be.string;
      expect(res).has.property("status");
      expect(res).has.property("type");
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("customer_id",requestData.customer_id);
      res.contact_info.forEach((ele: any, index: any) => {
        let res_info = requestData.contact_info[index];
        expect(ele).has.property("id");
        expect(ele).has.property("customer_contact_id");
        expect(ele).has.property("type", res_info.type).be.string;
        expect(ele).has.property("value",res_info.value).be.string;
        expect(ele).has.property("label",res_info.label).be.string;
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
      });
    });
  });

  it("Test case for update API when optional fields are null", () => {
    let requestData = reqCstContact({
      middle_name: null,
      last_name: null
      },[],{
        "contact_info": [
          { "id": rescontact_info_id[0] },
          { "id": rescontact_info_id[1] },
          { "id": rescontact_info_id[2] }
        ]
      });
    cy.request({
      method: routes.put,
      url: `${routes.post_cst_contact}${cst_cont_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("first_name",requestData.first_name).be.string;
      expect(res).has.property("middle_name",requestData.middle_name).be.string;
      expect(res).has.property("last_name", requestData.last_name).be.string;
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("type");
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("customer_id",requestData.customer_id);
      res.contact_info.forEach((ele: any, index: any) => {
        let res_info = requestData.contact_info[index];
        expect(ele).has.property("id");
        expect(ele).has.property("customer_contact_id");
        expect(ele).has.property("type", res_info.type).be.string;
        expect(ele).has.property("value",res_info.value).be.string;
        expect(ele).has.property("label",res_info.label).be.string;
        expect(ele).has.property("status",res_info.status);
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
      });
    });
  });

  it("Test case for update API when optional fields are blank", () => {
    let requestData = reqCstContact({
      middle_name: "",
      last_name: ""
      },[],{
        "contact_info": [
          { "id": rescontact_info_id[0] },
          { "id": rescontact_info_id[1] },
          { "id": rescontact_info_id[2] }
        ]
      });
    cy.request({
      method: routes.put,
      url: `${routes.post_cst_contact}${cst_cont_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      let res = body.result.data
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("first_name",requestData.first_name).be.string;
      expect(res).has.property("middle_name").be.string;
      expect(res).has.property("last_name").be.string;
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("type");
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("customer_id",requestData.customer_id);
      res.contact_info.forEach((ele: any, index: any) => {
        let res_info = requestData.contact_info[index];
        expect(ele).has.property("id");
        expect(ele).has.property("customer_contact_id");
        expect(ele).has.property("type", res_info.type).be.string;
        expect(ele).has.property("value",res_info.value).be.string;
        expect(ele).has.property("label",res_info.label).be.string;
        expect(ele).has.property("status",res_info.status);
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
      });
    });
  });

  it("Test case for update API when not providing required fields", () => {
    let requestData = reqCstContact({},
      ["customer_id","first_name","contact_info"]);
    cy.request({
      method: routes.put,
      url: `${routes.post_cst_contact}${cst_cont_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      let res = body.result.data
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("first_name").be.string;
      expect(res).has.property("middle_name",requestData.middle_name).be.string;
      expect(res).has.property("last_name", requestData.last_name).be.string;
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("type");
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("customer_id");
      res.contact_info.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("customer_contact_id");
        expect(ele).has.property("type").be.string;
        expect(ele).has.property("value").be.string;
        expect(ele).has.property("label").be.string;
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
      });
    });
  });

  it("Test case for update API when contact_info array are blank", () => {
    let requestData = reqCstContact({contact_info: [] });
    cy.request({
      method: routes.put,
      url: `${routes.post_cst_contact}${cst_cont_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res = body.result.data
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("first_name",requestData.first_name).be.string;
      expect(res).has.property("middle_name",requestData.middle_name).be.string;
      expect(res).has.property("last_name", requestData.last_name).be.string;
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("type");
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("customer_id",requestData.customer_id);
      res.contact_info.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("customer_contact_id");
        expect(ele).has.property("type").be.string;
        expect(ele).has.property("value").be.string;
        expect(ele).has.property("label").be.string;
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
      });
    });
  });

  it("Test case for update API when contact_info object are blank", () => {
    let requestData = reqCstContact({},[],{
      "contact_info": [
        { "id": rescontact_info_id[0] },
        { "id": rescontact_info_id[1] },
        { "id": rescontact_info_id[2] }
      ]
    });
    cy.request({
      method: routes.put,
      url: `${routes.post_cst_contact}${cst_cont_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      let res = body.result.data
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("first_name",requestData.first_name).be.string;
      expect(res).has.property("middle_name",requestData.middle_name).be.string;
      expect(res).has.property("last_name", requestData.last_name).be.string;
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("type");
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("customer_id",requestData.customer_id);
      res.contact_info.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("customer_contact_id");
        expect(ele).has.property("type").be.string;
        expect(ele).has.property("value").be.string;
        expect(ele).has.property("label").be.string;
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
      });
    });
  });

  it("Test case for update API with all field", () => {
    let requestData = reqCstContact({},[],{
      "contact_info": [
        { "id": rescontact_info_id[0] },
        { "id": rescontact_info_id[1] },
        { "id": rescontact_info_id[2] }
      ]
    });
    cy.request({
      method: routes.put,
      url: `${routes.post_cst_contact}${cst_cont_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("first_name",requestData.first_name).be.string;
      expect(res).has.property("middle_name",requestData.middle_name).be.string;
      expect(res).has.property("last_name", requestData.last_name).be.string;
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("type");
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("customer_id",requestData.customer_id);
      res.contact_info.forEach((ele: any, index: any) => {
        let res_info = requestData.contact_info[index];
        expect(ele).has.property("id");
        expect(ele).has.property("customer_contact_id");
        expect(ele).has.property("type", res_info.type).be.string;
        expect(ele).has.property("value",res_info.value).be.string;
        expect(ele).has.property("label",res_info.label).be.string;
        expect(ele).has.property("status",res_info.status);
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
      });
    });
  });

  it("Test case for delete function", () => {
    let requestData = {
      contact_info: [
        {
          id: rescontact_info_id[2],
          delete: 1,
        }
      ],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_cst_contact}${cst_cont_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("first_name").be.string;
      expect(res).has.property("middle_name").be.string;
      expect(res).has.property("last_name").be.string;
      expect(res).has.property("status");
      expect(res).has.property("type");
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("customer_id");
      res.contact_info.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("customer_contact_id");
        expect(ele).has.property("type").be.string;
        expect(ele).has.property("value").be.string;
        expect(ele).has.property("label").be.string;
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
      })
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {

  it("Test case for fetch API", () => {
    let reqData = {
      search: [
        {
          key: "reference_contact.id",
          operation: "=",
          val: cst_cont_id,
        },
      ],
      searchOr: [
        {
          key: "reference_contact.id",
          operation: "=",
          val: cst_cont_id,
        },
      ],
      searchOrAnd: [
        {
          key: "reference_contact.id",
          operation: "=",
          val: cst_cont_id,
        },
      ],
      select: [
        "customers.id as customer_id",
        "reference_contact.first_name",
        "reference_contact.middle_name",
        "reference_contact.last_name",
        "reference_contact.created_date",
        "reference_contact.updated_date",
        "reference_contact.created_by",
        "reference_contact.updated_by",
        "customers.status",
      ],
      sort: "reference_contact.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_cst_contact}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqData
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index:any) => {
        expect(ele).has.property("customer_id");
        expect(ele).has.property("first_name");
        expect(ele).has.property("middle_name");
        expect(ele).has.property("last_name");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("status");
        expect(ele).has.property("id",reqData.search[index].val);
        ele.contact_info.forEach((element: any) => {
          expect(element).has.property("id");
          expect(element).has.property("type");
          expect(element).has.property("value");
          expect(element).has.property("label");
        });
      });
      expect(body.result).has.property("page", reqData.page);
      expect(body.result).has.property("perPage", reqData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_cst_contact}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {}
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("customer_id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
        expect(ele).has.property("retail_type_id");
        expect(ele).has.property("master_code");
        expect(ele).has.property("id");
        expect(ele).has.property("first_name");
        expect(ele).has.property("middle_name");
        expect(ele).has.property("last_name");
        expect(ele).has.property("type");
        expect(ele).has.property("contact_info");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when not provide search field", () => {
    let reqData = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [
        "customers.id as customer_id",
        "reference_contact.first_name",
        "reference_contact.middle_name",
        "reference_contact.last_name",
        "reference_contact.created_date",
        "reference_contact.updated_date",
        "reference_contact.created_by",
        "reference_contact.updated_by",
        "customers.status",
      ],
      sort: "reference_contact.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_cst_contact}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqData
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("customer_id");
        expect(ele).has.property("first_name");
        expect(ele).has.property("middle_name");
        expect(ele).has.property("last_name");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("status");
        expect(ele).has.property("id");
        expect(ele).has.property("contact_info");
      });
      expect(body.result).has.property("page", reqData.page);
      expect(body.result).has.property("perPage", reqData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case when select field left blank", () => {
    let reqData = {
      search: [
        {
          key: "reference_contact.id",
          operation: "=",
          val: cst_cont_id,
        },
      ],
      select: [],
      sort: "reference_contact.id",
      orderby: "desc",
      page: "1",
      perPage: "20",
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_cst_contact}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqData
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("customer_id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
        expect(ele).has.property("retail_type_id");
        expect(ele).has.property("master_code");
        expect(ele).has.property("id");
        expect(ele).has.property("first_name");
        expect(ele).has.property("middle_name");
        expect(ele).has.property("last_name");
        expect(ele).has.property("type");
        ele.contact_info.forEach((element: any) => {
          expect(element).has.property("id");
          expect(element).has.property("type");
          expect(element).has.property("value");
          expect(element).has.property("label");
        });
      });
      expect(body.result).has.property("page", reqData.page);
      expect(body.result).has.property("perPage", reqData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when search and select field are left blank", () => {
    let reqData = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [],
      sort: "reference_contact.id",
      orderby: "desc",
      page: "1",
      perPage: "20",
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_cst_contact}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqData
    }).then(({ body }) => {
       cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("customer_id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
        expect(ele).has.property("retail_type_id");
        expect(ele).has.property("master_code");
        expect(ele).has.property("id");
        expect(ele).has.property("first_name");
        expect(ele).has.property("middle_name");
        expect(ele).has.property("last_name");
        expect(ele).has.property("type");
        expect(ele).has.property("contact_info");
      });
      expect(body.result).has.property("page", reqData.page);
      expect(body.result).has.property("perPage", reqData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_cst_contact}${"fetch"}`,
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
          "customers.id as customer_id",
          "reference_contact.first_name"
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
      url: routes.post_cst_contact,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("first_name");
      expect(body.error.errorDetails).has.property("contact_info");
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: routes.post,
      url: routes.post_cst_contact,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqCstContact({
        customer_id: "",
        first_name: "",
        status: 1,
        contact_info: [
          {
            type: "",
            value: "",
            label: ""
          }
        ]
      }),
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("first_name");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("value");
      expect(body.error.errorDetails).has.property("label");
    });
  });

  it("Test cases When customer_id doesn't exist", () => {
    cy.request({
      method: routes.post,
      url: routes.post_cst_contact,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqCstContact({ customer_id: Cypress.env("RandomNumber") }),
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it("customer_id and status should be number", () => {
    cy.request({
      method: routes.post,
      url: routes.post_cst_contact,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqCstContact({
        customer_id: Cypress.env("RandomNum"),
        status: Cypress.env("RandomNum")
      }),
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("status must be one of [0 and 1]", () => {
    cy.request({
      method: routes.post,
      url: routes.post_cst_contact,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqCstContact({status: Cypress.env("RandomNumber")}),
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("first_name, middle_name, last_name, type, value and label should be String", () => {
    cy.request({
      method: routes.post,
      url: routes.post_cst_contact,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqCstContact({
        first_name: Cypress.env("RandomNumber"),
        middle_name: Cypress.env("RandomNumber"),
        last_name: Cypress.env("RandomNumber"),
        contact_info: [
          {
            type: Cypress.env("RandomNumber"),
            value: Cypress.env("RandomNumber"),
            label: Cypress.env("RandomNumber")
          }
        ]
      }),
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("first_name");
      expect(body.error.errorDetails).has.property("last_name");
      expect(body.error.errorDetails).has.property("middle_name");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("value");
      expect(body.error.errorDetails).has.property("label");
    });
  });

  it("Test case when contact_info object are blank", () => {
    cy.request({
      method: routes.post,
      url: routes.post_cst_contact,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqCstContact({ contact_info: [{}] }),
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("value");
      expect(body.error.errorDetails).has.property("label");
    });
  });

  it("contact_info- status should be number", () => {
    cy.request({
      method:routes.post,
      url: routes.post_cst_contact,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqCstContact({
        "contact_info": [
          { 
            status: Cypress.env("RandomNum")
          }
        ]}),
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("contact_info- status must be one of [1 or 0]", () => {
    cy.request({
      method:routes.post,
      url: routes.post_cst_contact,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqCstContact({
        "contact_info": [
          { 
            status: Cypress.env("RandomNumber")
          }
        ]}),
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {

  it("Test cases When alphabet provides along with Id ", () => {
    cy.request({
      method:routes.put,
      url: `${routes.post_cst_contact}${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.chk_id);
    });
  });

  it("Test cases When customer_contact_id doesn't exist", () => {
    cy.request({
      method:routes.put,
      url: `${routes.post_cst_contact}${Cypress.env("RandomNumber")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "customer_contact_id",`{customer_contacts_id} is invalid`);
    })
  });

  it("Test cases When contact_info_id doesn't exist", () => {
    cy.request({
      method:routes.put,
      url: `${routes.post_cst_contact}${cst_cont_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqCstContact({},[],{"contact_info": [
          { "id": Cypress.env("RandomNumber") }
        ]
      }),
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("contact_info_id");
    });
  });

  it(" Test cases When contact_id is not associated with contact_info_id", () => {
    cy.request({
      method:routes.put,
      url: `${routes.post_cst_contact}${cst_cont_id_1}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqCstContact({},[],{"contact_info": [
        { "id": rescontact_info_id[0] }
      ]
    }),
    failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("contact_info_id");
    });
  });

  it("delete function should work only with associate contact_id and contact_info_id", () => {
    cy.request({
      method:routes.put,
      url: `${routes.post_cst_contact}${cst_cont_id_1}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        contact_info: [
          {
            id: rescontact_info_id[0],
            delete: 1
          }
        ]
      },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("contact_info_id");
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method:routes.put,
      url: `${routes.post_cst_contact}${cst_cont_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqCstContact({
        customer_id: "",
        first_name: "",
        contact_info: [
          {
            type: "",
            value: "",
            label: ""
          }
        ]
      }),
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("first_name");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("value");
      expect(body.error.errorDetails).has.property("label");
    });
  });

  it("Test cases When customer_id doesn't exist", () => {
    cy.request({
      method:routes.put,
      url: `${routes.post_cst_contact}${cst_cont_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqCstContact({ customer_id: Cypress.env("RandomNumber") }),
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it("customer_id and status should be number", () => {
    cy.request({
      method:routes.put,
      url: `${routes.post_cst_contact}${cst_cont_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqCstContact({
        customer_id: Cypress.env("RandomNum"),
        status: Cypress.env("RandomNum"),
      }),
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("status must be one of [0 and 1]", () => {
    cy.request({
      method:routes.put,
      url: `${routes.post_cst_contact}${cst_cont_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: { status: Cypress.env("RandomNumber") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    })
  });

  it("first_name, middle_name, last_name, type, value and label should be String", () => {
    cy.request({
      method:routes.put,
      url: `${routes.post_cst_contact}${cst_cont_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqCstContact({
        first_name: Cypress.env("RandomNumber"),
        middle_name: Cypress.env("RandomNumber"),
        last_name: Cypress.env("RandomNumber"),
        contact_info: [
          {
            type: Cypress.env("RandomNumber"),
            value: Cypress.env("RandomNumber"),
            label: Cypress.env("RandomNumber")
          },
          {
            type: Cypress.env("RandomNumber"),
            value: Cypress.env("RandomNumber"),
            label: Cypress.env("RandomNumber")
          }
        ]
      }),
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("first_name");
      expect(body.error.errorDetails).has.property("last_name");
      expect(body.error.errorDetails).has.property("middle_name");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("value");
      expect(body.error.errorDetails).has.property("label");
    });
  });

  it("contact_info- status should be number", () => {
    cy.request({
      method:routes.put,
      url: `${routes.post_cst_contact}${cst_cont_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        "contact_info": [
          { 
            id: rescontact_info_id[0],
            status: Cypress.env("RandomNum")
          }
        ]},
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("contact_info- status must be one of [1 or 0]", () => {
    cy.request({
      method:routes.put,
      url: `${routes.post_cst_contact}${cst_cont_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        "contact_info": [
          { 
            id: rescontact_info_id[0],
            status: Cypress.env("RandomNumber")
          }
        ]},
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
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
        module_name: "customer_contacts",
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
    let recordId = cst_cont_id.toString();
    cy.request({
      method: routes.post,
      url: routes.track_change,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        module: "customer_contacts",
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
    let name = "Customer_contacts";
    let obj = {
      statusCode: 200,
      success: true,
      error: null,
      result: {
        message: "Module fields fetched successfully",
        data: {
          fields: [
            "id",
            "customer_id",
            "first_name",
            "last_name",
            "middle_name",
            "status",
            "created_date",
            "updated_date",
            "created_by",
            "updated_by",
          ],
          foreignKey: {
            customer_id: {
              object: "customers",
              fields: [
                "id",
                "code",
                "name",
                "retail_type_id",
                "master_code",
                "status",
                "created_date",
                "updated_date",
                "created_by",
                "updated_by",
              ],
            },
          },
          child: {
            customer_contacts_info: {
              fields: [
                "id",
                "customer_contact_id",
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
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      expect(JSON.stringify(body)).to.deep.equal(JSON.stringify(obj));
    });
  });
});
