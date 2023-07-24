import routes from "../../support/route";
import store_msg from "../../support/store_msg";

let design_id: Number;
let design_id_1: Number;
let design_code: String;
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

  codelength= req_design({code: Cypress.env("RandomDesc")})
  exist_code =req_design({code: design_code})
  blank_req =req_design({code: "", name:""})
  number_req =req_design({ status: Cypress.env("RandomNum")})
  boolean_req = req_design({ status: Cypress.env("RandomNumber")})
  string_req = req_design({
    code: Cypress.env("RandomNumber"),
    name: Cypress.env("RandomNumber"),
    description: Cypress.env("RandomNumber")
  });
});

function req_design(payload, ignoredata =[]){
  let reqBody = {
    code: payload.hasOwnProperty("code")?payload.code :Cypress.env("Random"),
    name: payload.hasOwnProperty("name")?payload.name :Cypress.env("Random"),
    description: payload.hasOwnProperty("description")?payload.description :Cypress.env("RandomDesc"),
    status: payload.hasOwnProperty("status")?payload.status :1
  };
  ignoredata.forEach((itemrow)=>{
    delete reqBody[itemrow];
  })
  return reqBody
}

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {
  it("Test cases for create API", () => {
    let requestData = req_design({});
    cy.request({
      method: routes.post,
      url: routes.post_design,
      body: requestData,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      let res = body.result.data;
      design_id = res.id;
      design_code = res.code;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("code", requestData.code);
      expect(res).has.property("name", requestData.name);
      expect(res).has.property("description",requestData.description);
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test cases when not providing optional field", () => {
    let requestData = req_design({},["description","status"]);
    cy.request({
      method: routes.post,
      url: routes.post_design,
      body: requestData,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      let res = body.result.data;
      design_id_1 = res.id;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("code", requestData.code);
      expect(res).has.property("name", requestData.name);
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API When optional field are blank", () => {
    let requestData = req_design({description: ""});
    cy.request({
      method: routes.post,
      url: routes.post_design,
      body: requestData,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("code", requestData.code);
      expect(res).has.property("name", requestData.name);
      expect(res).has.property("description",requestData.description);
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API When optional field are null", () => {
    let requestData = req_design({ description: null });
    cy.request({
      method: routes.post,
      url: routes.post_design,
      body: requestData,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("code", requestData.code);
      expect(res).has.property("name", requestData.name);
      expect(res).has.property("description",requestData.description);
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {
  it("Test cases When not providing any field", () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_design}${design_id}`,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("code");
      expect(res).has.property("name");
      expect(res).has.property("description");
      expect(res).has.property("status");
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test cases When optional field are null", () => {
    let requestData = req_design({description: null});
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_design}${design_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("code");
      expect(res).has.property("name");
      expect(res).has.property("description",requestData.description);
      expect(res).has.property("status");
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test cases When optional field are blank", () => {
    let requestData = req_design({description: ""});
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_design}${design_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("code");
      expect(res).has.property("name");
      expect(res).has.property("description",requestData.description);
      expect(res).has.property("status");
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test cases When optional field are not provided", () => {
    let requestData = req_design({ code: design_code},[
      "description","status"
    ]);
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_design}${design_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("code", requestData.code);
      expect(body.result.data).has.property("name", requestData.name);
      expect(body.result.data).has.property("description");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
    });
  });

  it("Test cases When required field are not provided", () => {
    let req = req_design({},["code","name"]);
    cy.request({
      method: routes.put,
      body: req,
      url: `${routes.post_design}${design_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("code");
      expect(res).has.property("name");
      expect(res).has.property("description",req.description);
      expect(res).has.property("status", req.status);
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test case for update API", () => {
    let req = req_design({code: design_code});
    cy.request({
      method: routes.put,
      body: req,
      url: `${routes.post_design}${design_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("code", req.code);
      expect(res).has.property("name", req.name);
      expect(res).has.property("description",req.description);
      expect(res).has.property("status", req.status);
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {

  it("Test case for fetch API", () => {
    let requestData = {
      search: [
        {
          key: "id",
          operation: "=",
          val: design_id
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
      url: routes.fetch_design,
      body: requestData,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any, index: any) => {
        expect(ele).has.property("id", requestData.search[index].val);
        expect(ele).has.property("name");
        expect(ele).has.property("description");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("code");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
      method: routes.post,
      url: routes.fetch_design,
      body: {},
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("name");
        expect(ele).has.property("description");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("code");
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
      url: routes.fetch_design,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("name");
        expect(ele).has.property("description");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("code");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when not provide select field", () => {
    let requestData = {
      search: [
        {
          key: "id",
          operation: "=",
          val: design_id
        }
      ],
      select: [],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_design,
      body: requestData,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any, index: any) => {
        expect(ele).has.property("id", requestData.search[index].val);
        expect(ele).has.property("name");
        expect(ele).has.property("description");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("code");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when not provide select field", () => {
    let requestData = {
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
      url: routes.fetch_design,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("name");
        expect(ele).has.property("description");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("code");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: routes.fetch_design,
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
      }
    }).then(({ body }) => {
      cy.Success(body);
    });
  });
});

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {

  it("Code should be maximum 40 charector", () => {
    cy.request({
      method: routes.post,
      url: routes.post_design,
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
      url: routes.post_design,
      body: exist_code,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When do not provide any field data", () => {
    cy.request({
      method: routes.post,
      url: routes.post_design,
      body: {},
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
    });
  });

  it("Test cases When fields are empty", () => {
    cy.request({
      method: routes.post,
      url: routes.post_design,
      body: blank_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
    });
  });

  it("Status must be one of [0 and 1]", () => {
    cy.request({
      method: routes.post,
      url: routes.post_design,
      body: boolean_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("Status should be number", () => {
    cy.request({
      method: routes.post,
      url: routes.post_design,
      body: number_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("code, name and description should be String", () => {
    cy.request({
      method: routes.post,
      url: routes.post_design,
      body: string_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
      expect(body.error.errorDetails).has.property("description");
    });
  });

});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {

  it("Test cases When send alphabets along with Id", () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_design}${Cypress.env("Random")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.chk_id);
    });
  });

  it("Code will be maximum 40 charector", () => {
    cy.request({
      method: routes.put,
      body: codelength,
      url: `${routes.post_design}${design_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When code already exist", () => {
    cy.request({
      method: routes.put,
      body: exist_code,
      url: `${routes.post_design}${design_id_1}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When Id doesn't exist", () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_design}${Cypress.env("RandomNumber")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.id);
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: routes.put,
      body: blank_req,
      url: `${routes.post_design}${design_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
    });
  });

  it("Status must be one of [0 and 1]", () => {
    cy.request({
      method: routes.put,
      body: boolean_req,
      url: `${routes.post_design}${design_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("Status should be number", () => {
    cy.request({
      method: routes.put,
      body: number_req,
      url: `${routes.post_design}${design_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("code, name and description should be String", () => {
    cy.request({
      method: routes.put,
      body: string_req,
      url: `${routes.post_design}${design_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
      expect(body.error.errorDetails).has.property("description");
    });
  });

});

describe(`${store_msg.success_log}${Cypress.spec["fileName"]}`, () => {

  it("Test cases for get-log API", () => {
    let today = new Date().toISOString().slice(0, 10);
    let requestData = {
      module_name: "design",
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
    let recordId = design_id.toString();
    let requestData = {
      module: "design",
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
    let name = "Design";
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
            "updated_by"
          ],
          foreignKey: {},
          child: {}
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
