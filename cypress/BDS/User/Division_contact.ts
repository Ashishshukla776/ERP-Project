import routes from "../../support/route";
import store_msg from "../../support/store_msg";
let division_contact_id: Number;
let division_contact_id_1: Number;
let division_conInfo_id: Number[];
let blankBody
let check_num

before(() => {
  cy.GetCompanyToken();
})

beforeEach(() => {
  cy.Random();
  cy.RandomNumber();
  cy.RandomNum();
  cy.GetDivisionId();
  cy.randomEmail();
  blankBody = reqDivContact({
    division_id: "",
    first_name: "",
    status: "",
    contact_info: [
      {
        type: "",
        value: "",
        label: ""
      }
    ]
  })

  check_num = reqDivContact({
    division_id: Cypress.env("RandomNum"),
    status: Cypress.env("RandomNum")
  });
});

function reqDivContact(payload, ignoredata = [], adddata = {}) {
  let reqBody = {
    division_id: payload.hasOwnProperty("division_id") ? payload.division_id : Cypress.env("divisionId"),
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
    let requestData = reqDivContact({});
    cy.request({
      method: routes.post,
      url: routes.post_division_conatct,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res = body.result.data
      division_contact_id = res.id;
      division_conInfo_id = res.contact_info.map((element) => element.id);
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("first_name",requestData.first_name).be.string;
      expect(res).has.property("middle_name",requestData.middle_name).be.string;
      expect(res).has.property("last_name", requestData.last_name).be.string;
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("type");
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("division_id",requestData.division_id);
      res.contact_info.forEach((ele: any, index: any) => {
        let res_info = requestData.contact_info[index];
        expect(ele).has.property("id");
        expect(ele).has.property("division_contact_id");
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
    let requestData = reqDivContact({ middle_name: null, last_name: null });
    cy.request({
      method: routes.post,
      url: routes.post_division_conatct,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res = body.result.data;
      division_contact_id_1 = res.id;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("first_name", requestData.first_name).be.string;
      expect(res).has.property("middle_name", requestData.middle_name);
      expect(res).has.property("last_name", requestData.last_name);
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("type");
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("division_id", requestData.division_id);
      res.contact_info.forEach((ele: any, index: any) => {
        let res_info = requestData.contact_info[index];
        expect(ele).has.property("id");
        expect(ele).has.property("division_contact_id");
        expect(ele).has.property("type", res_info.type).be.string;
        expect(ele).has.property("value", res_info.value).be.string;
        expect(ele).has.property("label", res_info.label).be.string;
        expect(ele).has.property("status", res_info.status);
        expect(ele).has.property("created_date");
        expect(ele).has.property("created_by");
      });
    });
  });

  it("Test cases for create API when optional fields are blank", () => {
    let requestData = reqDivContact({ middle_name: "", last_name: "" });
    cy.request({
      method: routes.post,
      url: routes.post_division_conatct,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("first_name", requestData.first_name).be.string;
      expect(res).has.property("middle_name", requestData.middle_name);
      expect(res).has.property("last_name", requestData.last_name);
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("type");
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("division_id", requestData.division_id);
      res.contact_info.forEach((ele: any, index: any) => {
        let res_info = requestData.contact_info[index];
        expect(ele).has.property("id");
        expect(ele).has.property("division_contact_id");
        expect(ele).has.property("type", res_info.type).be.string;
        expect(ele).has.property("value", res_info.value).be.string;
        expect(ele).has.property("label", res_info.label).be.string;
        expect(ele).has.property("status", res_info.status);
        expect(ele).has.property("created_date");
        expect(ele).has.property("created_by");
      });
    });
  });

  it("Test cases for create API when not providing optional fields", () => {
    let requestData = reqDivContact({}, ["middle_name", "last_name", "status"]);
    cy.request({
      method: routes.post,
      url: routes.post_division_conatct,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("first_name", requestData.first_name).be.string;
      expect(res).has.property("type");
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("division_id", requestData.division_id);
      res.contact_info.forEach((ele: any, index: any) => {
        let res_info = requestData.contact_info[index];
        expect(ele).has.property("id");
        expect(ele).has.property("division_contact_id");
        expect(ele).has.property("type", res_info.type).be.string;
        expect(ele).has.property("value", res_info.value).be.string;
        expect(ele).has.property("label", res_info.label).be.string;
        expect(ele).has.property("status", res_info.status);
        expect(ele).has.property("created_date");
        expect(ele).has.property("created_by");
      });
    });
  });

  it("Test cases for create API when contact_info Array is blank", () => {
    let requestData = reqDivContact({ contact_info: [] });

    cy.request({
      method: routes.post,
      url: routes.post_division_conatct,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("first_name", requestData.first_name);
      expect(res).has.property("middle_name", requestData.middle_name);
      expect(res).has.property("last_name", requestData.last_name);
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("type");
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("division_id", requestData.division_id);
      expect(res).has.deep.property("contact_info", requestData.contact_info);
    });
  });

});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {

  it("Test case for update API when not providing any fields", () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_division_conatct}${division_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("type");
      expect(body.result.data).has.property("first_name");
      expect(body.result.data).has.property("last_name");
      expect(body.result.data).has.property("middle_name");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property("division_id");
      body.result.data.contact_info.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("division_contact_id");
        expect(ele).has.property("type");
        expect(ele).has.property("value");
        expect(ele).has.property("label");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
      });
    });
  });

  it("Test case for update API when not providing optional fields", () => {
    let requestData = reqDivContact({},
      ["middle_name", "last_name", "status"],
      {
        "contact_info": [
          { "id": division_conInfo_id[0] },
          { "id": division_conInfo_id[1] },
          { "id": division_conInfo_id[2] }
        ]
      });
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_division_conatct}${division_contact_id}`,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
        let res = body.result.data;
        cy.Success(body);
        expect(res).has.property("id");
        expect(res).has.property("first_name",requestData.first_name);
        expect(res).has.property("middle_name");
        expect(res).has.property("last_name");
        expect(res).has.property("status");
        expect(res).has.property("type");
        expect(res).has.property("created_date");
        expect(res).has.property("created_by");
        expect(res).has.property("updated_date");
        expect(res).has.property("updated_by");
        expect(res).has.property("division_id",requestData.division_id);
        res.contact_info.forEach((ele: any, index: any) => {
            let resinfo = requestData.contact_info[index];
            expect(ele).has.property("id");
            expect(ele).has.property("division_contact_id");
            expect(ele).has.property("type", resinfo.type);
            expect(ele).has.property("value",resinfo.value);
            expect(ele).has.property("label",resinfo.label);
            expect(ele).has.property("status");
            expect(ele).has.property("created_date");
            expect(ele).has.property("created_by");
      });
    });
  });

  it("Test case for update API when optional fields are null", () => {

    let requestData = reqDivContact({
      middle_name: null,
      last_name: null
    }, [],
      {
        "contact_info": [
          { "id": division_conInfo_id[0] },
          { "id": division_conInfo_id[1] },
          { "id": division_conInfo_id[2] }
        ]
      });
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_division_conatct}${division_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("first_name", requestData.first_name);
      expect(res).has.property("middle_name", requestData.middle_name);
      expect(res).has.property("last_name", requestData.last_name);
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("type");
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_date");
      expect(res).has.property("updated_by");
      expect(res).has.property("division_id", requestData.division_id);
      res.contact_info.forEach((ele: any, index: any) => {
        let resinfo = requestData.contact_info[index];
        expect(ele).has.property("id");
        expect(ele).has.property("division_contact_id");
        expect(ele).has.property("type", resinfo.type);
        expect(ele).has.property("value", resinfo.value);
        expect(ele).has.property("label", resinfo.label);
        expect(ele).has.property("status", resinfo.status);
        expect(ele).has.property("created_date");
        expect(ele).has.property("created_by");
      });
    });
  });

  it("Test case for update API when optional fields are blank", () => {
    let requestData = reqDivContact({
      middle_name: "",
      last_name: ""
    }, [],
      {
        "contact_info": [
          { "id": division_conInfo_id[0] },
          { "id": division_conInfo_id[1] },
          { "id": division_conInfo_id[2] }
        ]
      });
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_division_conatct}${division_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("first_name", requestData.first_name);
      expect(res).has.property("middle_name", requestData.middle_name);
      expect(res).has.property("last_name", requestData.last_name);
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("type");
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_date");
      expect(res).has.property("updated_by");
      expect(res).has.property("division_id", requestData.division_id);
      res.contact_info.forEach((ele: any, index: any) => {
        let resinfo = requestData.contact_info[index];
        expect(ele).has.property("id");
        expect(ele).has.property("division_contact_id");
        expect(ele).has.property("type", resinfo.type);
        expect(ele).has.property("value", resinfo.value);
        expect(ele).has.property("label", resinfo.label);
        expect(ele).has.property("status", resinfo.status);
        expect(ele).has.property("created_date");
        expect(ele).has.property("created_by");
      });
    });
  });

  it("Test case for update API when not providing required fields", () => {
    let requestData = reqDivContact({}, ["first_name", "division_id", "contact_info"]);
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_division_conatct}${division_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("first_name");
      expect(res).has.property("middle_name", requestData.middle_name);
      expect(res).has.property("last_name", requestData.last_name);
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("type");
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_date");
      expect(res).has.property("updated_by");
      expect(res).has.property("division_id");
      res.contact_info.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("division_contact_id");
        expect(ele).has.property("type");
        expect(ele).has.property("value");
        expect(ele).has.property("label");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("created_by");
      })
    });
  });

  it("Test case for update API when contact_info array are blank", () => {
    let requestData = reqDivContact({ contact_info: [] });
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_division_conatct}${division_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("first_name");
      expect(body.result.data).has.property("middle_name");
      expect(body.result.data).has.property("last_name");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("type");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property("division_id");
      body.result.data.contact_info.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("division_contact_id");
        expect(ele).has.property("type");
        expect(ele).has.property("value");
        expect(ele).has.property("label");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
      });
    });
  });

  it("Test case for update API when contact_info object are blank", () => {
    let requestData = reqDivContact({}, ["type", "value", "label", "status"],
      {
        "contact_info": [
          { id: division_conInfo_id[0] },
          { id: division_conInfo_id[1] },
          { id: division_conInfo_id[2] }
        ]
      });
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_division_conatct}${division_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("first_name");
      expect(body.result.data).has.property("middle_name");
      expect(body.result.data).has.property("last_name");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("type");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property("division_id");
      body.result.data.contact_info.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("division_contact_id");
        expect(ele).has.property("type");
        expect(ele).has.property("value");
        expect(ele).has.property("label");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("created_by");
      });
    });
  });

  it("Test case for update API with all field", () => {
    let requestData = reqDivContact({}, [],
      {
        "contact_info": [
          { "id": division_conInfo_id[0] },
          { "id": division_conInfo_id[1] },
          { id: division_conInfo_id[2] }
        ]
      });

    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_division_conatct}${division_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("first_name", requestData.first_name).be.string;
      expect(res).has.property("middle_name", requestData.middle_name).be.string;
      expect(res).has.property("last_name", requestData.last_name).be.string;
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("type");
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_date");
      expect(res).has.property("updated_by");
      expect(res).has.property("division_id");
      res.contact_info.forEach((ele: any, index: any) => {
        let resinfo = requestData.contact_info[index];
        expect(ele).has.property("id");
        expect(ele).has.property("division_contact_id");
        expect(ele).has.property("type", resinfo.type).be.string;
        expect(ele).has.property("value", resinfo.value).be.string;
        expect(ele).has.property("label", resinfo.label).be.string;
        expect(ele).has.property("status", resinfo.status);
        expect(ele).has.property("created_date");
        expect(ele).has.property("created_by");
      });
    });
  });

  it("Test case for delete function", () => {
    let reqData = {
      contact_info: [
        {
          id: division_conInfo_id[2],
          delete: 1
        }
      ]
    };

    cy.request({
      method: routes.put,
      body: reqData,
      url: `${routes.post_division_conatct}${division_contact_id}`,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("first_name");
      expect(res).has.property("middle_name");
      expect(res).has.property("last_name");
      expect(res).has.property("status");
      expect(res).has.property("type");
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_date");
      expect(res).has.property("updated_by");
      expect(res).has.property("division_id");
      res.contact_info.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("division_contact_id");
        expect(ele).has.property("type");
        expect(ele).has.property("value");
        expect(ele).has.property("label");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("created_by");
      });
    });
  });

});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {
  it("Test case for fetch API", () => {
    let requestData = {
      search: [
        {
          key: "reference_contact.id",
          operation: "=",
          val: division_contact_id,
        },
      ],
      select: [
        "division.id as division_id",
        "reference_contact.first_name",
        "reference_contact.middle_name",
        "reference_contact.last_name",
        "reference_contact.created_date",
        "reference_contact.created_by",
        "reference_contact.updated_date",
        "reference_contact.updated_by",
        "reference_contact.status",
      ],
      sort: "reference_contact.id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_division_conatct}${"fetch"}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any, index: any) => {
        expect(ele).has.property("division_id");
        expect(ele).has.property("first_name");
        expect(ele).has.property("middle_name");
        expect(ele).has.property("last_name");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("status");
        expect(ele).has.property("id", requestData.search[index].val);
        ele.contact_info.forEach((element: any) => {
          expect(element).has.property("id");
          expect(element).has.property("type");
          expect(element).has.property("value");
          expect(element).has.property("label");
        });
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_division_conatct}${"fetch"}`,
      body: {},
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("division_id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
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
    let requestData = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [
        "division.id as division_id",
        "reference_contact.first_name",
        "reference_contact.middle_name",
        "reference_contact.last_name",
        "reference_contact.created_date",
        "reference_contact.created_by",
        "reference_contact.updated_date",
        "reference_contact.updated_by",
        "reference_contact.status",
      ],
      sort: "reference_contact.id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_division_conatct}${"fetch"}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("division_id");
        expect(ele).has.property("first_name");
        expect(ele).has.property("middle_name");
        expect(ele).has.property("last_name");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("status");
        expect(ele).has.property("id");
        ele.contact_info.forEach((element: any) => {
          expect(element).has.property("id");
          expect(element).has.property("type");
          expect(element).has.property("value");
          expect(element).has.property("label");
        });
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when select field left blank", () => {
    let requestData = {
      search: [
        {
          key: "reference_contact.id",
          operation: "=",
          val: division_contact_id,
        },
      ],
      select: [],
      sort: "reference_contact.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_division_conatct}${"fetch"}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any, index: any) => {
        expect(ele).has.property("division_id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
        expect(ele).has.property("id", requestData.search[index].val);
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
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when not provide search and select field", () => {
    let requestData = {
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
      url: `${routes.post_division_conatct}${"fetch"}`,
      body: requestData,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("division_id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
        expect(ele).has.property("id");
        expect(ele).has.property("first_name");
        expect(ele).has.property("middle_name");
        expect(ele).has.property("last_name");
        expect(ele).has.property("type");
        expect(ele).has.property("contact_info");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_division_conatct}${"fetch"}`,
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
          "division.id as division_id",
          "reference_contact.first_name",
          "reference_contact.middle_name",
          "reference_contact.last_name",
          "reference_contact.created_date",
          "reference_contact.created_by",
          "reference_contact.updated_date",
          "reference_contact.updated_by",
          "division.status"
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
      url: routes.post_division_conatct,
      body: {},
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("division_id");
      expect(body.error.errorDetails).has.property("first_name");
      expect(body.error.errorDetails).has.property("contact_info");
    });
  });

  it("Test cases When required fields are empty", () => {
    let requestData = blankBody

    cy.request({
      method: routes.post,
      url: routes.post_division_conatct,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.log(JSON.stringify(body))
      cy.log(JSON.stringify(requestData))
      cy.log(JSON.stringify(check_num))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("division_id");
      expect(body.error.errorDetails).has.property("first_name");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("value");
      expect(body.error.errorDetails).has.property("label");
    });
  });

  it("Test cases When division_id doesn't exist", () => {
    let requestData = reqDivContact({ division_id: Cypress.env("RandomNumber") });
    cy.request({
      method: routes.post,
      url: routes.post_division_conatct,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("division_id");
    });
  });

  it("division_id and status should be number", () => {
    let requestData = check_num
    cy.request({
      method: routes.post,
      url: routes.post_division_conatct,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("division_id");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("status must be one of [0 and 1]", () => {
    let requestData = reqDivContact({ status: Cypress.env("RandomNumber") });
    cy.request({
      method: routes.post,
      url: routes.post_division_conatct,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("contact_info - status must be one of [0 and 1]", () => {
    let requestData = reqDivContact({
      contact_info: [
        {
          status: Cypress.env("RandomNumber")
        }
      ]
    });
    cy.request({
      method: routes.post,
      url: routes.post_division_conatct,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("contact_info - status should be number", () => {
    let requestData = reqDivContact({
      contact_info: [
        {
          status: Cypress.env("RandomNum")
        }
      ]
    });
    cy.request({
      method: routes.post,
      url: routes.post_division_conatct,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("Test case when contact_info object are blank", () => {
    let requestData = reqDivContact({ contact_info: [{}] });
    cy.request({
      method: routes.post,
      url: routes.post_division_conatct,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("value");
      expect(body.error.errorDetails).has.property("label");
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {

  it("Test cases When alphabet provides along with Id ", () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_division_conatct}${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.chk_id);
    });
  });

  it("Test cases When division_contact_id doesn't exist", () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_division_conatct}${Cypress.env("RandomNumber")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "division_contact_id",`{division_contact_id} is invalid`);
    });
  });

  it("Test cases When contact_info_id doesn't exist", () => {
    let requestData = {
      contact_info: [
        {
          id: Cypress.env("RandomNumber")
        }
      ]
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_division_conatct}${division_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("contact_info_id");
    });
  });

  it(" Test cases When contact_id is not associated with contact_info_id", () => {
    let requestData = {
      contact_info: [
        {
          id: division_conInfo_id[1]
        }
      ]
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_division_conatct}${division_contact_id_1}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("contact_info_id");
    });
  });

  it("delete function should work only with associate contact_id and contact_info_id", () => {
    let requestData = {
      contact_info: [
        {
          id: division_conInfo_id[1],
          delete: 1
        }
      ]
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_division_conatct}${division_contact_id_1}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("contact_info_id");
    });
  });

  it("Test cases When required fields are empty", () => {
    let requestData = blankBody
   
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_division_conatct}${division_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("division_id");
      expect(body.error.errorDetails).has.property("first_name");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("value");
      expect(body.error.errorDetails).has.property("label");
    });
  });

  it("Test cases When division_id doesn't exist", () => {
    let requestData = reqDivContact({ division_id: Cypress.env("RandomNumber") });
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_division_conatct}${division_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("division_id");
    });
  });

  it("division_id and status should be number", () => {
    let requestData = check_num
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_division_conatct}${division_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("division_id");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("status must be one of [0 and 1]", () => {
    let requestData = reqDivContact({
      status: Cypress.env("RandomNumber")
    });
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_division_conatct}${division_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("contact_info- status should be number", () => {
    let requestData =  {
      "contact_info": [
        { 
          id: division_conInfo_id[0],
          status: Cypress.env("RandomNum")
        }
      ]}
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_division_conatct}${division_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("contact_info- status must be one of [0 and 1]", () => {
    let requestData =  {
      "contact_info": [
        { 
          id: division_conInfo_id[0],
          status: Cypress.env("RandomNumber")
        }
      ]}
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_division_conatct}${division_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
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
    let requestData = {
      module_name: "division_contact",
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
    let recordId = division_contact_id.toString();
    let requestData = {
      module: "division_contact",
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
    let name = "division_contact";
    let obj = {
      statusCode: 200,
      success: true,
      error: null,
      result: {
        message: "Module fields fetched successfully",
        data: {
          fields: [
            "id",
            "division_id",
            "first_name",
            "last_name",
            "middle_name",
            "status",
            "created_date",
            "updated_date",
            "created_by",
            "updated_by"
          ],
          foreignKey: {},
          child: {
            division_contact_info: {
              fields: [
                "id",
                "division_contact_id",
                "type",
                "value",
                "label",
                "status",
                "created_date",
                "updated_date",
                "created_by",
                "updated_by"
              ]
            }
          }
        }
      }
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
