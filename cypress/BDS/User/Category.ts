import routes from "../../support/route";
import store_msg from "../../support/store_msg";

before(() => {
  cy.GetCompanyToken();
});

beforeEach(() => {
  cy.Random();
  cy.RandomDesc();
  cy.RandomNumber();
  cy.randomBoolean();
  cy.RandomNum();
  codelength = req_category({ code: Cypress.env("RandomDesc")})
  exist_code =req_category({code: res_code})
  blank_req =req_category({code: "", name:""})
  number_req =req_category({ status: Cypress.env("RandomNum")})
  boolean_req = req_category({ status: Cypress.env("RandomNumber")})
});

let resId: Number;
let res_code: String;
let category_id: Number;
let codelength
let exist_code
let blank_req
let number_req
let boolean_req

function req_category(payload,ignoredata=[]){
  let reqBody = {
    code: payload.hasOwnProperty("code")?payload.code :Cypress.env("Random"),
    name: payload.hasOwnProperty("name")?payload.name :Cypress.env("Random"),
    description: payload.hasOwnProperty("description")?payload.description :Cypress.env("RandomDesc"),
    type: payload.hasOwnProperty("type")?payload.type :Cypress.env("Random"),
    status: payload.hasOwnProperty("status")?payload.status :1
  };
  ignoredata.forEach((itemrow)=>{
    delete reqBody[itemrow];
  })
  return reqBody
}

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => { 

  it("Test cases for create API", () => {
    let requestData = req_category({});
    cy.request({
      method: routes.post, body: requestData,
      url: routes.post_category,
       headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      let res = body.result.data;
      resId = res.id;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("code",requestData.code).to.be.string
      expect(res).has.property("name",requestData.name).to.be.string
      expect(res).has.property("description",requestData.description).to.be.string
      expect(res).has.property("type",requestData.type).to.be.string
      expect(res).has.property("status",requestData.status)
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API when optional field are not provided", () => {
    let requestData = req_category({},["description","type","status"]);
    cy.request({
      method: routes.post, body: requestData,
      url: routes.post_category,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      let res = body.result.data;
      category_id = res.id;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("code",requestData.code).to.be.string
      expect(res).has.property("name",requestData.name).to.be.string
      expect(res).has.property("status")
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API when optional field are blank", () => {
    let requestData = req_category({
      description: "",
      type: ""
    });
    cy.request({
      method: routes.post, body: requestData,
      url: routes.post_category,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      let res = body.result.data;
      expect(res).has.property("id");
      expect(res).has.property("code",requestData.code).to.be.string
      expect(res).has.property("name",requestData.name).to.be.string
      expect(res).has.property("description",requestData.description).to.be.string
      expect(res).has.property("type",requestData.type).to.be.string
      expect(res).has.property("status",requestData.status)
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API when optional field are null", () => {
    let requestData = req_category({
      description: null,
      type: null
    });
    cy.request({
      method: routes.post, body: requestData,
      url: routes.post_category,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      let res = body.result.data;
      expect(res).has.property("id");
      expect(res).has.property("code",requestData.code).to.be.string
      expect(res).has.property("name",requestData.name).to.be.string
      expect(res).has.property("description",requestData.description).to.be.string
      expect(res).has.property("type",requestData.type).to.be.string
      expect(res).has.property("status",requestData.status)
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {

  it("Test cases When do not provide any field", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_category}${resId}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {}
    }).then(({ body }) => {
      cy.Success(body);
      let res = body.result.data;
      expect(res).has.property("id");
      expect(res).has.property("code").to.be.string
      expect(res).has.property("name").to.be.string
      expect(res).has.property("description").to.be.string
      expect(res).has.property("type").to.be.string
      expect(res).has.property("status")
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test cases When optional field are left blank", () => {
    let requestData = req_category({
      description: "",
      type: ""
    });
    cy.request({
      method: routes.put, body: requestData,
      url: `${routes.post_category}${resId}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      let res = body.result.data;
      expect(res).has.property("id");
      expect(res).has.property("code").to.be.string
      expect(res).has.property("name").to.be.string
      expect(res).has.property("description",requestData.description).to.be.string
      expect(res).has.property("type",requestData.type).to.be.string
      expect(res).has.property("status")
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test cases When optional field are null and required field are not provided", () => {
    let requestData = req_category({
      description: null,
      type: null
    },["code","name"]);
    cy.request({
      method: routes.put, body: requestData,
      url: `${routes.post_category}${resId}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      let res = body.result.data;
      expect(res).has.property("id");
      expect(res).has.property("code").to.be.string
      expect(res).has.property("name").to.be.string
      expect(res).has.property("description",requestData.description).to.be.string
      expect(res).has.property("type",requestData.type).to.be.string
      expect(res).has.property("status")
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test case when optional field are not provided", () => {
    let requestData = req_category({},["description","type","status"]);
    cy.request({
      method: routes.put, body: requestData,
      url: `${routes.post_category}${resId}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      let res = body.result.data;
      expect(res).has.property("id");
      expect(res).has.property("code").to.be.string
      expect(res).has.property("name").to.be.string
      expect(res).has.property("description").to.be.string
      expect(res).has.property("type").to.be.string
      expect(res).has.property("status")
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test case for update API with all field", () => {
    let requestData =   req_category({});;
    cy.request({
      method: routes.put, body: requestData,
      url: `${routes.post_category}${resId}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      let res = body.result.data;
      res_code = res.code;
      expect(res).has.property("id");
      expect(res).has.property("code",requestData.code).to.be.string
      expect(res).has.property("name",requestData.name).to.be.string
      expect(res).has.property("description",requestData.description).to.be.string
      expect(res).has.property("type",requestData.type).to.be.string
      expect(res).has.property("status",requestData.status)
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
          val: resId
        },
        {
          key: "code",
          operation: "like",
          val: res_code
        }
      ],
      searchOr: [
        {
          key: "id",
          operation: "=",
          val: resId
        }
      ],
      searchOrAnd: [
        {
          key: "id",
          operation: "=",
          val: resId
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
    }
    cy.request({
      method: routes.post, body: requestData,
      url: `${routes.post_category}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index:any) => {
        expect(ele).has.property("id",requestData.search[index].val);
        expect(ele).has.property("name");
        expect(ele).has.property("description");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("code");
      });
      expect(body.result).has.property("page",requestData.page);
      expect(body.result).has.property("perPage",requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
      method: routes.post, body: {},
      url: `${routes.post_category}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index:any) => {
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

  it("Test case for fetch API when search field left blank", () => {
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
        "code",
      ],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post, body: requestData,
      url: `${routes.post_category}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index:any) => {
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
      expect(body.result).has.property("page",requestData.page);
      expect(body.result).has.property("perPage",requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when search and select field left blank", () => {
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
      method: routes.post, body: requestData,
      url: `${routes.post_category}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index:any) => {
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
      expect(body.result).has.property("page",requestData.page);
      expect(body.result).has.property("perPage",requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when select field left blank", () => {
    let requestData = {
      search: [
        {
          key: "id",
          operation: "=",
          val: resId,
        }
      ],
      select: [],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20
    }
    cy.request({
      method: routes.post, body: requestData,
      url: `${routes.post_category}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index:any) => {
        expect(ele).has.property("id",requestData.search[index].val);
        expect(ele).has.property("name");
        expect(ele).has.property("description");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("code");
      });
      expect(body.result).has.property("page",requestData.page);
      expect(body.result).has.property("perPage",requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_category}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: Cypress.env("RandomNumber")
          }
        ],
        
        select: ["id", "name", "code", "description", "status"],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
      failOnStatusCode: false,
    }).then(({ body }) => { cy.Success(body) });
  });

});

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {

  it("Code should be maximum 40 charector", () => {
    cy.request({
      method: routes.post, failOnStatusCode: false,
      url: routes.post_category,
       headers: { Authorization: Cypress.env("companyToken") },
      body: codelength
    }).then(({ body }) => { cy.Code(body) })
  });

  it("Test cases When code already exist", () => {
    cy.request({
      method: routes.post, failOnStatusCode: false,
      url: routes.post_category,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        code: exist_code,
        name: Cypress.env("Random")
      }
    }).then(({ body }) => { cy.Code(body) })
  });

  it("Test cases When do not provide any field data", () => {
    cy.request({
      method: routes.post, failOnStatusCode: false,
      url: routes.post_category, body: {},
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
    });
  });

  it("Test cases When fields are empty", () => {
    cy.request({
      method: routes.post, failOnStatusCode: false,
      url: routes.post_category,
       headers: { Authorization: Cypress.env("companyToken") },
      body: blank_req
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
    });
  });

  it("status should be Boolean data-type", () => {
    cy.request({
      method: routes.post, failOnStatusCode: false,
      url: routes.post_category,
       headers: { Authorization: Cypress.env("companyToken") },
      body: boolean_req
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("status must be one of [1 or 0]", () => {
    cy.request({
      method: routes.post, failOnStatusCode: false,
      url: routes.post_category,
       headers: { Authorization: Cypress.env("companyToken") },
      body: number_req
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {

  it("Test cases When send alphabets along with Id", () => {
    cy.request({
      method: routes.put,  body: {}, failOnStatusCode: false,
      url: `${routes.post_category}${Cypress.env("Random")}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.chk_id);
    });
  });

  it("Test cases When Id doesn't exist", () => {
    cy.request({
      method: routes.put,  body: {}, failOnStatusCode: false,
      url: `${routes.post_category}${Cypress.env("RandomNumber")}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => { 
      cy.Failure(body)
      expect(body.error.errorDetails).has.property("id",store_msg.id); 
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: routes.put, failOnStatusCode: false,
      url: `${routes.post_category}${resId}`,
       headers: { Authorization: Cypress.env("companyToken") },
      body: blank_req
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
    });
  });

  it("Code should be maximum 40 charector", () => {
    cy.request({
      method: routes.put, failOnStatusCode: false,
      url: `${routes.post_category}${resId}`,
       headers: { Authorization: Cypress.env("companyToken") },
      body: codelength
    }).then(({ body }) => { cy.Code(body) })
  });

  it("Test cases When code already exist", () => {
    cy.request({
      method: routes.put, failOnStatusCode: false,
      url: `${routes.post_category}${category_id}`,
       headers: { Authorization: Cypress.env("companyToken") },
      body: exist_code
    }).then(({ body }) => { cy.Code(body) })
  });

  it("status should be Number data-type", () => {
    cy.request({
      method: routes.put, failOnStatusCode: false,
      url: `${routes.post_category}${resId}`,
       headers: { Authorization: Cypress.env("companyToken") },
      body: number_req
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("status must be one of [1 or 0]", () => {
    cy.request({
      method: routes.put, failOnStatusCode: false,
      url: `${routes.post_category}${resId}`,
       headers: { Authorization: Cypress.env("companyToken") },
      body: boolean_req
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
      method: routes.post, url: routes.get_log,
       headers: { Authorization: Cypress.env("companyToken") },
      body: {
        module_name: "category",
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
    }).then(({ body }) => { cy.check_log(body) });
  });

  it("Test case for track-change-data API", () => {
    let recordId = resId.toString();
    cy.request({
      method: routes.post,
      url: routes.track_change,
       headers: { Authorization: Cypress.env("companyToken") },
      body: {
        module: "category",
        record_id: recordId,
        sort: "_id",
        orderby: "desc",
        page: 1,
        perPage: 20
      }
    }).then(({ body }) => { cy.Track_change(body) })
  });

  it("Test case for look-up API", () => {
    let name = "category";
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
            "type",
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
      method:routes.get,
      url: `${routes.look_up}${name}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      expect(JSON.stringify(body)).to.deep.equal(JSON.stringify(obj));
    });
  });
});
