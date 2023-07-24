import routes from "../../support/route";
import store_msg from "../../support/store_msg";
let royalty_id: Number;
let royalty_code: String;
let codelength
let exist_code
let blank_req
let number_req
let boolean_req
let check_type
let string_req
let validateType = `{type} must be one of [F, P]`
let nulltype

before(() => {
  cy.GetCompanyToken();
  cy.Get_config("Decimal");
});

beforeEach(() => {
  cy.Random();
  cy.RandomDesc();
  cy.RandomNumber();
  cy.RandomNum();
  cy.RandomNum_2();
  codelength = req_royalty({ code: Cypress.env("RandomDesc")})
  exist_code =req_royalty({code: royalty_code})
  blank_req =req_royalty({company_name:"",code: "", name:"",type: ""})
  number_req =req_royalty({ 
    amount: Cypress.env("RandomNum"),
    status: Cypress.env("RandomNum")
  });
  boolean_req = req_royalty({ status: Cypress.env("RandomNumber")})
  check_type = req_royalty({ type: Cypress.env("Random") });
  string_req = req_royalty({
    company_name: Cypress.env("RandomNumber"),
    code: Cypress.env("RandomNumber"),
    name: Cypress.env("RandomNumber"),
    description: Cypress.env("RandomNumber"),
    type: Cypress.env("RandomNumber")
  });
  nulltype =req_royalty({ type:null });
});

function req_royalty(payload,ignoredata=[]){
  let reqBody = {
    company_name: payload.hasOwnProperty("company_name")?payload.company_name :Cypress.env("Random"),
    code: payload.hasOwnProperty("code")?payload.code :Cypress.env("Random"),
    name: payload.hasOwnProperty("name")?payload.name :Cypress.env("Random"),
    description: payload.hasOwnProperty("description")?payload.description :Cypress.env("RandomDesc"),
    amount: payload.hasOwnProperty("amount")?payload.amount :Cypress.env("RandomNum_2"),
    type: payload.hasOwnProperty("type")?payload.type :"P",
    status: payload.hasOwnProperty("status")?payload.status :1
  };
  ignoredata.forEach((itemrow)=>{
    delete reqBody[itemrow];
  })
  return reqBody
}

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {
  it("Test cases for create API", () => {
    let req = req_royalty({});
    cy.request({
      method: routes.post,
      url: routes.post_royalty,
      body: req,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      royalty_id = res.id;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("company_name",req.company_name);
      expect(res).has.property("code", req.code);
      expect(res).has.property("name", req.name);
      expect(res).has.property("description",req.description);
      let req_amount = req.amount.toString();
      if(Cypress.env("meta_value")>0){
        req_amount = req.amount.toFixed(Cypress.env("meta_value"))
      }else{
        req_amount = req.amount.toFixed(Cypress.env("def_metaValue"))
      }
      expect(res).has.deep.property("amount",req_amount);
      expect(res).has.property("type", req.type);
      expect(res).has.property("status", req.status);
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API when not providing optional fields", () => {
    let requestData = req_royalty({},
      ["description","amount","type","status"]);
    cy.request({
      method: routes.post,
      url: routes.post_royalty,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("company_name",requestData.company_name);
      expect(res).has.property("code", requestData.code);
      expect(res).has.property("name", requestData.name);
      expect(res).has.property("status");
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API when optional fields are null", () => {
    let req = req_royalty({
      description: null,
      amount: null,
      type: "F"
    });
    cy.request({
      method: routes.post,
      url: routes.post_royalty,
      body: req,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);      
      expect(res).has.property("id");
      expect(res).has.property("company_name",req.company_name);
      expect(res).has.property("code", req.code);
      expect(res).has.property("name", req.name);
      expect(res).has.property("description",req.description);
      expect(res).has.property("amount");
      expect(res).has.property("type", req.type);
      expect(res).has.property("status", req.status);
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API when optional fields are blank", () => {
    let req = req_royalty({
      description: "",
      amount: ""
    });
    cy.request({
      method: routes.post,
      url: routes.post_royalty,
      body: req,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("company_name",req.company_name);
      expect(res).has.property("code", req.code);
      expect(res).has.property("name", req.name);
      expect(res).has.property("description",req.description);
      expect(res).has.property("amount");
      expect(res).has.property("type", req.type);
      expect(res).has.property("status", req.status);
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {
  before(() => {expect(royalty_id).to.be.not.undefined});
  it("Test case for update API when not providing any field", () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_royalty}${royalty_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("company_name");
      expect(res).has.property("code");
      expect(res).has.property("name");
      expect(res).has.property("description");
      expect(res).has.property("amount");
      expect(res).has.property("type");
      expect(res).has.property("status");
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test case for update API when not providing optional field", () => {
    let req = req_royalty({},
      ["description","amount","type","status"]);
    cy.request({
      method: routes.put,
      body: req,
      url: `${routes.post_royalty}${royalty_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("company_name",req.company_name);
      expect(res).has.property("code", req.code);
      expect(res).has.property("name", req.name);
      expect(res).has.property("description");
      expect(res).has.property("amount");
      expect(res).has.property("type");
      expect(res).has.property("status");
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test case for update API when not providing required field", () => {
    let req = req_royalty({},["company_name","code","name"]);
    cy.request({
      method: routes.put,
      body: req,
      url: `${routes.post_royalty}${royalty_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("company_name");
      expect(res).has.property("code");
      expect(res).has.property("name");
      expect(res).has.property("description",req.description);
      let req_amount = req.amount.toString();
      if(Cypress.env("meta_value")>0){
        req_amount = req.amount.toFixed(Cypress.env("meta_value"))
      }else{
        req_amount = req.amount.toFixed(Cypress.env("def_metaValue"))
      }
      expect(res).has.deep.property("amount",req_amount);
      expect(res).has.property("type", req.type);
      expect(res).has.property("status", req.status);
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test case for update API when optional fielda are null", () => {
    let req = req_royalty({
      description: null,
      amount: null,
      type: "F"
    });
    cy.request({
      method: routes.put,
      body: req,
      url: `${routes.post_royalty}${royalty_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("company_name",req.company_name);
      expect(res).has.property("code", req.code);
      expect(res).has.property("name", req.name);
      expect(res).has.property("description",req.description);
      expect(res).has.property("amount");
      expect(res).has.property("type", req.type);
      expect(res).has.property("status", req.status);
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test case for update API when optional fielda are blank", () => {
    let req = req_royalty({
      description: "",
      amount: "",
      type: "F"
    });
    cy.request({
      method: routes.put,
      body: req,
      url: `${routes.post_royalty}${royalty_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("company_name",req.company_name);
      expect(res).has.property("code", req.code);
      expect(res).has.property("name", req.name);
      expect(res).has.property("description",req.description);
      expect(res).has.property("amount");
      expect(res).has.property("type", req.type);
      expect(res).has.property("status", req.status);
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test case for update API", () => {
    let req = req_royalty({});
    cy.request({
      method: routes.put,
      body: req,
      url: `${routes.post_royalty}${royalty_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      royalty_code = res.code;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("company_name",req.company_name);
      expect(res).has.property("code", req.code);
      expect(res).has.property("name", req.name);
      expect(res).has.property("description",req.description);
      let req_amount = req.amount.toString();
      if(Cypress.env("meta_value")>0){
        req_amount = req.amount.toFixed(Cypress.env("meta_value"))
      }else{
        req_amount = req.amount.toFixed(Cypress.env("def_metaValue"))
      }
      expect(res).has.deep.property("amount",req_amount);
      expect(res).has.property("type", req.type);
      expect(res).has.property("status", req.status);
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {
  before(() => {expect(royalty_id).to.be.not.undefined});
  it("Test case for fetch API", () => {
    let requestData = {
      search: [
        {
          key: "id",
          operation: "=",
          val: royalty_id,
        },
      ],
      searchOr: [
        {
          key: "id",
          operation: "=",
          val: royalty_id,
        },
      ],
      searchOrAnd: [
        {
          key: "id",
          operation: "=",
          val: royalty_id,
        },
      ],
      select: [
        "id",
        "company_name",
        "name",
        "description",
        "amount",
        "type",
        "status",
        "code",
      ],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_royalty,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
   
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("company_name");
        expect(ele).has.property("name");
        expect(ele).has.property("description");
        expect(ele).has.property("amount");
        expect(ele).has.property("type");
        expect(ele).has.property("status");
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
      url: routes.fetch_royalty,
      body: {},
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("company_name");
        expect(ele).has.property("name");
        expect(ele).has.property("description");
        expect(ele).has.property("amount");
        expect(ele).has.property("type");
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
        "company_name",
        "name",
        "description",
        "amount",
        "type",
        "status",
        "code",
      ],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_royalty,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("company_name");
        expect(ele).has.property("name");
        expect(ele).has.property("description");
        expect(ele).has.property("amount");
        expect(ele).has.property("type");
        expect(ele).has.property("status");
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
          val: royalty_id,
        },
      ],
      select: [],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_royalty,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data.map((ele: any) => ele.id)).to.deep.equal(
        requestData.search.map((item: any) => item.val)
      );
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("company_name");
        expect(ele).has.property("name");
        expect(ele).has.property("description");
        expect(ele).has.property("amount");
        expect(ele).has.property("type");
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

  it("Test case for fetch API when not provide search and select field", () => {
    let requestData = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_royalty,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("company_name");
        expect(ele).has.property("name");
        expect(ele).has.property("description");
        expect(ele).has.property("amount");
        expect(ele).has.property("type");
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

  it("Test case when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: routes.fetch_royalty,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: Cypress.env("RandomNumber"),
          },
        ],
        select: ["id", "description", "name", "code", "status"],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
    }).then(({ body }) => {
      cy.Success(body);
    });
  });
});

describe(`${store_msg.success_log}${Cypress.spec["fileName"]}`, () => {
  it("Test cases for get-log API", () => {
    let today = new Date().toISOString().slice(0, 10);
    let requestData = {
      module_name: "royalty",
      search: [
        {
          key: "createdAt",
          operation: "date_range",
          val: ["2022-08-01", today],
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
    let recordId = royalty_id.toString();
    let requestData = {
      module: "royalty",
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
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property(
        "message",
        "Track-change logs(s) fetched successfully"
      );
      body.result.data.map((element: any) => {
        expect(element).has.property("_id", element._id);
        expect(element).has.property("operation", element.operation);
        expect(element).has.property("userId", element.userId);
        expect(element).has.property("username", element.username);
        expect(element).has.property("createdAt", element.createdAt);
      });
    });
  });

  it("Test case for look-up API", () => {
    let name = "royalty";
    let obj = {
      statusCode: 200,
      success: true,
      error: null,
      result: {
        message: "Module fields fetched successfully",
        data: {
          fields: [
            "id",
            "company_name",
            "code",
            "name",
            "description",
            "amount",
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
      method: routes.get,
      url: `${routes.look_up}${name}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(JSON.stringify(body)).to.deep.equal(JSON.stringify(obj));
    });
  });
});

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {
  it("Code will be maximum 40 charector", () => {
    cy.request({
      method: routes.post,
      url: routes.post_royalty,
      body: codelength,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When code already exist", () => {
    cy.request({
      method: routes.post,
      url: routes.post_royalty,
      body: exist_code,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When do not provide any field data", () => {
    cy.request({
      method: routes.post,
      url: routes.post_royalty,
      body: {},
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("company_name",`{company_name} is required`);
      expect(err).has.property("code",store_msg.err_code3);
      expect(err).has.property("name",store_msg.err_name2);
    });
  });

  it("Test cases When fields are empty", () => {
    cy.request({
      method: routes.post,
      url: routes.post_royalty,
      body: blank_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("company_name");
      expect(err).has.property("code",store_msg.err_code);
      expect(err).has.property("name",store_msg.err_name);
      expect(err).has.property("type",validateType);
    });
  });

  it("company_name, code, name, description and type should be string", () => {
    cy.request({
      method: routes.post,
      url: routes.post_royalty,
      body: string_req,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("company_name");
      expect(err).has.property("code",store_msg.err_code1);
      expect(err).has.property("name",store_msg.err_name1);
      expect(err).has.property("description",store_msg.err_disc);
      expect(err).has.property("type");
    });
  });

  it("amount and status shuold be number", () => {
    cy.request({
      method: routes.post,
      url: routes.post_royalty,
      body: number_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("amount");
      expect(err).has.property("status",store_msg.err_status1);
    });
  });

  it("Status must be one of [0 and 1]", () => {
    cy.request({
      method: routes.post,
      url: routes.post_royalty,
      body: boolean_req,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status",store_msg.err_status);
    });
  });

  it("type must be on of [F and P]", () => {
    cy.request({
      method: routes.post,
      url: routes.post_royalty,
      body: check_type,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("type",validateType);
    });
  });

  it("Test case when providing null in type ", () => {
    cy.request({
      method: routes.post,
      url: routes.post_royalty,
      body: nulltype,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails
      cy.Failure(body);
      expect(err).has.property("type",`{type} must be a string`);
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {
  before(() => {expect(royalty_id).to.be.not.undefined});
  it("Code will be maximum 40 charector ", () => {
    cy.request({
      method: routes.put,
      body: codelength,
      url: `${routes.post_royalty}${royalty_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When alphabet provides along with Id ", () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_royalty}${Cypress.env("Random")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("id",store_msg.chk_id);
    });
  });

  it("Test cases When Id doesn't exist", () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_royalty}${Cypress.env("RandomNumber")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("id",store_msg.id);
    });
  });

  it("company_name, code, name, description, amount and type should be string", () => {
    cy.request({
      method: routes.put,
      body: string_req,
      url: `${routes.post_royalty}${royalty_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
       cy.Failure(body);
      expect(err).has.property("company_name",`{company_name} must be a string`);
      expect(err).has.property("code",store_msg.err_code1);
      expect(err).has.property("name",store_msg.err_name1);
      expect(err).has.property("description",store_msg.err_disc);
      expect(err).has.property("type",`{type} must be a string`);
    });
  });

  it("amount and status shuold be number", () => {
    cy.request({
      method: routes.put,
      body: number_req,
      url: `${routes.post_royalty}${royalty_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
       cy.Failure(body);
      expect(err).has.property("amount",`{amount} must be a number`);
      expect(err).has.property("status",store_msg.err_status1);
    });
  });

  it("status must be one of [0 and 1]", () => {
    cy.request({
      method: routes.put,
      body: boolean_req,
      url: `${routes.post_royalty}${royalty_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
       cy.Failure(body);
      expect(err).has.property("status",store_msg.err_status);
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: routes.put,
      body: blank_req,
      url: `${routes.post_royalty}${royalty_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.log(JSON.stringify(body));
       cy.Failure(body);
      // expect(err).has.property("company_name",
      //   err.company_name);
      expect(err).has.property("code",store_msg.err_code);
      expect(err).has.property("name",store_msg.err_name);
      expect(err).has.property("type",validateType);
    });
  });

  it("type must be on of [F and P]", () => {
    cy.request({
      method: routes.put,
      body: check_type,
      url: `${routes.post_royalty}${royalty_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
       cy.Failure(body);
      expect(err).has.property("type",validateType);
    });
  });

  it("Test case when providing null in type ", () => {
    cy.request({
      method: routes.put,
      body: nulltype,
      url: `${routes.post_royalty}${royalty_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails
      cy.Failure(body);
      expect(err).has.property("type",`{type} must be a string`);
    });
  });
});

