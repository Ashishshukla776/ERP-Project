import { any } from "cypress/types/bluebird";
import routes from "../../support/route";
import store_msg from "../../support/store_msg";

let resDivision_id: Number;
let resDivision_code: String;
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

  codelength= req_division({code: Cypress.env("RandomDesc")})
  exist_code =req_division({code: resDivision_code})
  blank_req =req_division({code: "", name:""})
  number_req =req_division({ status: Cypress.env("RandomNum")})
  boolean_req = req_division({ status: Cypress.env("RandomNumber")})
  string_req = req_division({
    code: Cypress.env("RandomNumber"),
    name: Cypress.env("RandomNumber"),
    dba: Cypress.env("RandomNumber"),
    def_factor_id: Cypress.env("RandomNumber"),
  });
});

function req_division(payload, ignoredata =[]){
  let reqBody = {
    code: payload.hasOwnProperty("code")?payload.code :Cypress.env("Random"),
    name: payload.hasOwnProperty("name")?payload.name :Cypress.env("Random"),
    dba: payload.hasOwnProperty("dba")?payload.dba :Cypress.env("Random"),
    def_factor_id: payload.hasOwnProperty("def_factor_id")?payload.def_factor_id :Cypress.env("Random"),
    status: payload.hasOwnProperty("status")?payload.status :1
  };
  ignoredata.forEach((itemrow)=>{
    delete reqBody[itemrow];
  })
  return reqBody
}

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {  

  it("Test cases for create API", () => {
    let req = req_division({});
    cy.request({
      method: routes.post,
      url: routes.post_division,
   headers: { Authorization: Cypress.env("companyToken") },
      body: req
    }).then(({ body }) => {
      let res = body.result.data;
      resDivision_id = res.id;
      resDivision_code = res.code;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("code",req.code)
      expect(res).has.property("name",req.name)
      expect(res).has.property("dba",req.dba)
      expect(res).has.property("def_factor_id",req.def_factor_id)
      expect(res).has.property("status",req.status)
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test cases when not providing optional field", () => {
    let req = req_division({},
      ["dba","def_factor_id","status"]);
    cy.request({
      method: routes.post,
      url: routes.post_division,
   headers: { Authorization: Cypress.env("companyToken") },
      body: req,
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("code",req.code)
      expect(res).has.property("name",req.name)
      expect(res).has.property("status")
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API When optional field are blank", () => {
    let req = req_division({
      dba: "",
      def_factor_id: ""
    });
    cy.request({
      method: routes.post,
      url: routes.post_division,
   headers: { Authorization: Cypress.env("companyToken") },
      body: req,
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("code",req.code)
      expect(res).has.property("name",req.name)
      expect(res).has.property("dba",req.dba)
      expect(res).has.property("def_factor_id",req.def_factor_id)
      expect(res).has.property("status",req.status)
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API When optional field are null", () => {
    let req = req_division({
      dba: null,
      def_factor_id: null
    });
    cy.request({
      method: routes.post,
      url: routes.post_division,
   headers: { Authorization: Cypress.env("companyToken") },
      body: req
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("code",req.code)
      expect(res).has.property("name",req.name)
      expect(res).has.property("dba",req.dba)
      expect(res).has.property("def_factor_id",req.def_factor_id)
      expect(res).has.property("status",req.status)
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {

  it("Test cases When not providing any field", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_division}${resDivision_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {}
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("code")
      expect(res).has.property("name")
      expect(res).has.property("dba")
      expect(res).has.property("def_factor_id")
      expect(res).has.property("status")
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test cases When optional field are null", () => {
    let req = req_division({
      code: resDivision_code,
      dba: null,
      def_factor_id: null
    });
    cy.request({
      method: routes.put,
      url: `${routes.post_division}${resDivision_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: req,
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("code",req.code)
      expect(res).has.property("name",req.name)
      expect(res).has.property("dba",req.dba)
      expect(res).has.property("def_factor_id",req.def_factor_id)
      expect(res).has.property("status",req.status)
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test cases When optional field are blank", () => {
    let req = req_division({
      code: resDivision_code,
      dba: "",
      def_factor_id: ""
    });
    cy.request({
      method: routes.put,
      url: `${routes.post_division}${resDivision_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: req
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("code",req.code)
      expect(res).has.property("name",req.name)
      expect(res).has.property("dba",req.dba)
      expect(res).has.property("def_factor_id",req.def_factor_id)
      expect(res).has.property("status",req.status)
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test cases When required field are not provided", () => {
    let req = req_division({},["code","name"]);
    cy.request({
      method: routes.put,
      url: `${routes.post_division}${resDivision_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: req,
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("code")
      expect(res).has.property("name")
      expect(res).has.property("dba",req.dba)
      expect(res).has.property("def_factor_id",req.def_factor_id)
      expect(res).has.property("status",req.status)
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test cases When optional field are not provided", () => {
    let req = req_division({},
      ["dba","def_factor_id","status"]);
    cy.request({
      method: routes.put,
      url: `${routes.post_division}${resDivision_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: req,
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("code",req.code)
      expect(res).has.property("name",req.name)
      expect(res).has.property("dba")
      expect(res).has.property("def_factor_id")
      expect(res).has.property("status")
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test case for update API", () => {
    let req = req_division({code: resDivision_code});
    cy.request({
      method: routes.put,
      url: `${routes.post_division}${resDivision_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: req
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("code",req.code)
      expect(res).has.property("name",req.name)
      expect(res).has.property("dba",req.dba)
      expect(res).has.property("def_factor_id",req.def_factor_id)
      expect(res).has.property("status",req.status)
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {

  it("Test case for fetch API", () => {
    let req = {
      search: [
        {
          key: "division.id",
          operation: "=",
          val: resDivision_id
        }
      ],
      searchOr: [
        {
          key: "division.id",
          operation: "=",
          val: resDivision_id
        }
      ],
      searchOrAnd: [
        {
          key: "division.id",
          operation: "=",
          val: resDivision_id
        }
      ],
      select: [
        "division.id",
        "division.company_id",
        "division.name",
        "division.code",
        "division.status",
        "division.dba",
        "division.def_factor_id"
      ],
      sort: "division.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_division}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: req
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index: any) => {
        expect(ele).has.property("id", req.search[index].val);
        expect(ele).has.property("company_id");
        expect(ele).has.property("name");
        expect(ele).has.property("code");
        expect(ele).has.property("status");
        expect(ele).has.property("dba");
        expect(ele).has.property("def_factor_id");
      });
      expect(body.result).has.property("page", req.page);
      expect(body.result).has.property("perPage", req.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
       method: routes.post,
      url: `${routes.post_division}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("company_id");
        expect(ele).has.property("name");
        expect(ele).has.property("status");
        expect(ele).has.property("dba");
        expect(ele).has.property("def_factor_id");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("code");
        expect(ele).has.property("company_name");
        expect(ele).has.property("org_id");
        expect(ele).has.property("telephone");
        expect(ele).has.property("email");
        expect(ele).has.property("mongo_id");
        expect(ele).has.property("ein_cin");
        expect(ele).has.property("state_id");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when not provide search field", () => {
    let req = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [
        "division.id",
        "division.company_id",
        "division.name",
        "division.code",
        "division.status",
        "division.dba",
        "division.def_factor_id"
      ],
      sort: "division.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
       method: routes.post,
      url: `${routes.post_division}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: req
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("company_id");
        expect(ele).has.property("name");
        expect(ele).has.property("code");
        expect(ele).has.property("status");
        expect(ele).has.property("dba");
        expect(ele).has.property("def_factor_id");
      });
      expect(body.result).has.property("page", req.page);
      expect(body.result).has.property("perPage", req.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when not provide select field", () => {
    let req = {
      search: [
        {
          key: "division.id",
          operation: "=",
          val: resDivision_id
        }
      ],
      select: [],
      sort: "division.id",
      orderby: "desc",
      page: 1,
      perpage: 20
    };
    cy.request({
       method: routes.post,
      url: `${routes.post_division}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: req
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index) => {
        expect(ele).has.property("id",req.search[index].val);
        expect(ele).has.property("company_id");
        expect(ele).has.property("name");
        expect(ele).has.property("status");
        expect(ele).has.property("dba");
        expect(ele).has.property("def_factor_id");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("code");
        expect(ele).has.property("company_name");
        expect(ele).has.property("org_id");
        expect(ele).has.property("telephone");
        expect(ele).has.property("email");
        expect(ele).has.property("mongo_id");
        expect(ele).has.property("ein_cin");
        expect(ele).has.property("state_id");
      });
      expect(body.result).has.property("page",req.page);
      expect(body.result).has.property("perPage",req.perpage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when not provide search and select field", () => {
    let req = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [],
      sort: "division.id",
      orderby: "desc",
      page: 1,
      perpage: 20
    };
    cy.request({
       method: routes.post,
      url: `${routes.post_division}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: req
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index) => {
        expect(ele).has.property("id");
        expect(ele).has.property("company_id");
        expect(ele).has.property("name");
        expect(ele).has.property("status");
        expect(ele).has.property("dba");
        expect(ele).has.property("def_factor_id");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("code");
        expect(ele).has.property("company_name");
        expect(ele).has.property("org_id");
        expect(ele).has.property("telephone");
        expect(ele).has.property("email");
        expect(ele).has.property("mongo_id");
        expect(ele).has.property("ein_cin");
        expect(ele).has.property("state_id");
      });
      expect(body.result).has.property("page",req.page);
      expect(body.result).has.property("perPage",req.perpage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when wrong/invalid data is provided in search field", () => {
    cy.request({
       method: routes.post,
      url: `${routes.post_division}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "division.id",
            operation: "=",
            val: Cypress.env("RandomNumber")
          }
        ],
        select: [
          "division.id",
          "division.name",
          "division.code",
          "division.status"
        ],
        sort: "division.id",
        orderby: "desc",
        page: 1,
        perpage: 20
      }
    }).then(({ body }) => {
      cy.Success(body);
    });
  });
});

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {

  it("Test cases When code already exist", () => {
    cy.request({
      method: routes.post,
      url: routes.post_division,
   headers: { Authorization: Cypress.env("companyToken") },
      body: exist_code,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Code will be maximum 40 charector", () => {
    cy.request({
      method: routes.post,
      url: routes.post_division,
   headers: { Authorization: Cypress.env("companyToken") },
      body: codelength,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When do not provide any field data", () => {
    cy.request({
      method: routes.post,
      url: routes.post_division,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
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
      url: routes.post_division,
   headers: { Authorization: Cypress.env("companyToken") },
      body: blank_req,
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
      url: routes.post_division,
   headers: { Authorization: Cypress.env("companyToken") },
      body: boolean_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("Status should be number", () => {
    cy.request({
      method: routes.post,
      url: routes.post_division,
   headers: { Authorization: Cypress.env("companyToken") },
      body: number_req,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("code, name, dba and def_factor_id should be String", () => {
    cy.request({
      method: routes.post,
      url: routes.post_division,
   headers: { Authorization: Cypress.env("companyToken") },
      body:string_req,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
      expect(body.error.errorDetails).has.property("dba");
      expect(body.error.errorDetails).has.property("def_factor_id");
    });
  }); 
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {

  it("Test cases When send alphabets along with Id", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_division}${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.chk_id);
    });
  });

  it("Code will be maximum 40 charector", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_division}${resDivision_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: codelength,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When Id doesn't exist", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_division}${Cypress.env("RandomNumber")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.id);
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_division}${resDivision_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: blank_req,
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
      url: `${routes.post_division}${resDivision_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: boolean_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("Status should be number", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_division}${resDivision_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: number_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("code, name, dba and def_factor_id should be String", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_division}${resDivision_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: string_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
      expect(body.error.errorDetails).has.property("dba");
      expect(body.error.errorDetails).has.property("def_factor_id");
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
        module_name: "division",
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
    let recordId = resDivision_id.toString();
    cy.request({
      method:routes.post,
      url: routes.track_change,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        module: "division",
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
    let name = "Division";
    let obj = {
      statusCode: 200,
      success: true,
      error: null,
      result: {
        message: "Module fields fetched successfully",
        data: {
          fields: [
            "id",
            "company_id",
            "name",
            "code",
            "status",
            "dba",
            "def_factor_id",
            "created_date",
            "updated_date",
            "created_by",
            "updated_by"
          ],
          foreignKey: {
            company_id: {
              object: "company",
              fields: [
                "id",
                "name",
                "org_id",
                "fax",
                "telephone",
                "email",
                "created_date",
                "updated_date",
                "created_by",
                "updated_by",
                "status",
                "mongo_id",
                "address",
                "ein_cin",
                "state_id"
              ]
            }
          },
          child: {}
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
