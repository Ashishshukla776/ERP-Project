import routes from "../../support/route";
import store_msg from "../../support/store_msg";

let Color_id: Number;
let color_code: String;
let Color_id_1: Number;
let codelength
let exist_code
let blank_req
let number_req
let boolean_req

before(() => {
  cy.GetCompanyToken();
});
beforeEach(() => {
  cy.Random();
  cy.RandomDesc();
  cy.RandomNumber();
  cy.RandomNum();
  cy.RandomNum_2();
  cy.randomBoolean();
  codelength = req_color({ code: Cypress.env("RandomDesc")})
  exist_code =req_color({code: color_code})
  blank_req =req_color({code: "", name:""})
  number_req =req_color({ status: Cypress.env("RandomNum")})
  boolean_req = req_color({ status: Cypress.env("RandomNumber")})
});

function req_color(payload,ignoredata=[]){
  let reqBody = {
    code: payload.hasOwnProperty("code")?payload.code :Cypress.env("Random"),
    name: payload.hasOwnProperty("name")?payload.name :Cypress.env("Random"),
    status: payload.hasOwnProperty("status")?payload.status :1
  };
  ignoredata.forEach((itemrow)=>{
    delete reqBody[itemrow];
  })
  return reqBody
}


describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {

  it("Test cases for create API", () => {
    let requestData = req_color({});
    cy.request({
      method: routes.post,
      url: routes.post_color,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data
      Color_id = res.id;
      color_code = res.code;
      cy.Success(body)
      expect(res).has.property("id", res.id);
      expect(res).has.property("code",requestData.code).be.string
      expect(res).has.property("name",requestData.name).be.string
      expect(res).has.property("status",requestData.status)
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API when optional field is not provided", () => {
    let requestData = req_color({},["status"]);
    cy.request({
      method: routes.post,
      url: routes.post_color,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res = body.result.data
      Color_id_1 = res.id;
      cy.Success(body)
      expect(res).has.property("status")
      expect(res).has.property("id", res.id);
      expect(res).has.property("code",requestData.code).be.string
      expect(res).has.property("name",requestData.name).be.string    
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {

  it("Test cases When do not provide any field", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_color}${Color_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      let res = body.result.data
      cy.Success(body)
      expect(res).has.property("id");
      expect(res).has.property("code").be.string
      expect(res).has.property("name").be.string
      expect(res).has.property("status")
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test case for update API when required field are not provided", () => {
    let requestData = req_color({},["code","name"]);
    cy.request({
      method: routes.put,
      url: `${routes.post_color}${Color_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res = body.result.data
      cy.Success(body)
      expect(res).has.property("id", res.id);
      expect(res).has.property("code").be.string
      expect(res).has.property("name").be.string
      expect(res).has.property("status",requestData.status)
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test case for update API", () => {
    let requestData = req_color({code:color_code});
    cy.request({
      method: routes.put,
      url: `${routes.post_color}${Color_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res = body.result.data
      cy.Success(body)
      expect(res).has.property("id", res.id);
      expect(res).has.property("code",requestData.code).be.string
      expect(res).has.property("name",requestData.name).be.string
      expect(res).has.property("status",requestData.status)
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });
})

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {

  it("Test case for fetch API", () => {
    let reqData = {
      search: [
        {
          key: "id",
          operation: "=",
          val: Color_id,
        }
      ],
      searchOr: [
        {
          key: "id",
          operation: "=",
          val: Color_id,
        },
      ],
      searchOrAnd: [
        {
          key: "id",
          operation: "=",
          val: Color_id,
        },
      ],
      select: [
        "id",
        "name",
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
      method: routes.post,
      url: `${routes.post_color}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqData
    }).then(({ body }) => {
     cy.Success(body);
      body.result.data.forEach((ele: any,index) => {
        expect(ele).has.property("id", reqData.search[index].val);
        expect(ele).has.property("name");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("code");
      });
      expect(body.result).has.property("page", reqData.page);
      expect(body.result).has.property("perPage", reqData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_color}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index) => {
        expect(ele).has.property("id");
        expect(ele).has.property("name");
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
    let reqData = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [
        "id",
        "name",
        "status",
        "created_date",
        "updated_date",
        "created_by",
        "updated_by",
        "code",
      ],
      sort: "id",
      orderby: "desc",
      page:1,
      perPage: 20
    }
    cy.request({
      method: routes.post,
      url: `${routes.post_color}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index) => {
        expect(ele).has.property("id");
        expect(ele).has.property("name");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("code");
      });
      expect(body.result).has.property("page", reqData.page);
      expect(body.result).has.property("perPage", reqData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when not provide serarch and select field", () => {
    let reqData ={
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage:20
    }
    cy.request({
      method: routes.post,
      url: `${routes.post_color}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqData
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index) => {
        expect(ele).has.property("id");
        expect(ele).has.property("name");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("code");
      });
      expect(body.result).has.property("page", reqData.page);
      expect(body.result).has.property("perPage", reqData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when not provide select field", () => {
    let reqData ={
      search: [
        {
          key: "id",
          operation: "=",
          val: Color_id,
        },
      ],
      select: [],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20
    }
    cy.request({
      method: routes.post,
      url: `${routes.post_color}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqData
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index) => {
        expect(ele).has.property("id");
        expect(ele).has.property("name");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("code");
      });
      expect(body.result).has.property("page", reqData.page);
      expect(body.result).has.property("perPage", reqData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_color}${"fetch"}`,
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
        page: "1",
        perPage: "20",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Success(body);
    });
  });
})

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");

  it("Code should be maximum 40 charector", () => {
    cy.request({
      method: routes.post,
      url: routes.post_color,
   headers: { Authorization: Cypress.env("companyToken") },
      body: codelength,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When code already exist", () => {
    cy.request({
      method: routes.post,
      url: routes.post_color,
   headers: { Authorization: Cypress.env("companyToken") },
      body: exist_code,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When do not provide any field data", () => {
    cy.request({
      method: routes.post,
      url: routes.post_color,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
    });
  });

  it("Test cases When fields are empty", () => {
    cy.request({
      method: routes.post,
      url: routes.post_color,
   headers: { Authorization: Cypress.env("companyToken") },
      body:blank_req,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
    });
  });

  it("status should be Number data-type", () => {
    cy.request({
      method: routes.post,
      url: routes.post_color,
   headers: { Authorization: Cypress.env("companyToken") },
      body: number_req,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("status must be one of [0 or 1]", () => {
    cy.request({
      method: routes.post,
      url: routes.post_color,
   headers: { Authorization: Cypress.env("companyToken") },
      body:boolean_req,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {

  it("Test cases When send alphabets along with Id", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_color}${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.chk_id);
    });
  });

  it("Test cases When Id doesn't exist", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_color}${Cypress.env("RandomNumber")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.id);
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_color}${Color_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: blank_req,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
    });
  });

  it("Code should be maximum 40 charector", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_color}${Color_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: codelength,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When code already exist", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_color}${Color_id_1}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: exist_code,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("status should be Number data-type", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_color}${Color_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body:number_req,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("status must be one of [0 or 1]", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_color}${Color_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: boolean_req,
      failOnStatusCode: false,
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
      method:routes.post,
      url: routes.get_log,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        module_name: "color",
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
    let recordId = Color_id.toString();
    cy.request({
      method: routes.post,
      url: routes.track_change,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        module: "color",
        record_id: recordId,
        sort: "_id",
        orderby: "desc",
        page: 1,
        perPage: 20
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Track_change(body);
    });
  });

  it("Test case for look-up API", () => {
    let name = "color";
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
            "status",
            "created_date",
            "updated_date",
            "created_by",
            "updated_by"
          ],
          foreignKey: {},
          child: {},
        }
      }
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
