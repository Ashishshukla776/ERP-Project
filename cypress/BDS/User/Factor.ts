import routes from "../../support/route";
import store_msg from "../../support/store_msg";
let factor_id: Number;
let factor_id_1: Number;
let factor_code: String;
let resaccount_number: String;
let codelength:Object;
let exist_code:Object;
let blank_req:Object;
let number_req:Object;
let boolean_req:Object;
let string_req :Object;
let exist_account_number:Object;

before(() => {
  cy.GetCompanyToken();
});

beforeEach(() => {
  cy.Random();
  cy.RandomNumber();
  cy.randomBoolean();
  cy.RandomNum();

  codelength= req_factor({code: Cypress.env("RandomDesc")})
  exist_code =req_factor({code: factor_code})
  exist_account_number = req_factor({account_number: resaccount_number})
  blank_req =req_factor({code: "", name:"",account_number:""})
  number_req =req_factor({ 
    status: Cypress.env("RandomNum"),
    account_number: Cypress.env("RandomNum")
  });
  boolean_req = req_factor({ status: Cypress.env("RandomNumber")})
  string_req = req_factor({
    code: Cypress.env("RandomNumber"),
    name: Cypress.env("RandomNumber")
  });
});

function req_factor(payload, ignoredata =[]){
  let reqBody = {
    code: payload.hasOwnProperty("code")?payload.code :Cypress.env("Random"),
    name: payload.hasOwnProperty("name")?payload.name :Cypress.env("Random"),
    account_number: payload.hasOwnProperty("account_number")?payload.account_number :Cypress.env("RandomNumber"),
    status: payload.hasOwnProperty("status")?payload.status :1
  };
  ignoredata.forEach((itemrow)=>{
    delete reqBody[itemrow];
  })
  return reqBody
}

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {

  it("Test cases for create API", () => {
    let requestData = req_factor({});
    cy.request({
      method: routes.post,
      url: routes.post_factor,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res = body.result.data;
      factor_id = res.id;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("code",requestData.code)
      expect(res).has.property("name",requestData.name)
      expect(res).has.property("account_number",requestData.account_number)
      expect(res).has.property("status",requestData.status)
      expect(res).has.property("created_date",);
      expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API When not providing optional field", () => {
    let requestData = req_factor({},["status"]);
    cy.request({
      method: routes.post,
      url: routes.post_factor,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res = body.result.data;
      factor_id_1 = res.id;
      cy.Success(body);
      expect(res).has.property("status")
      expect(res).has.property("id", res.id);
      expect(res).has.property("code",requestData.code)
      expect(res).has.property("name",requestData.name)
      expect(res).has.property("account_number",requestData.account_number)
      expect(res).has.property("created_date",);
      expect(res).has.property("created_by");
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {

  it("Test cases When do not provide field for update API", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_factor}${factor_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {},
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("status")
      expect(res).has.property("id");
      expect(res).has.property("code")
      expect(res).has.property("name")
      expect(res).has.property("account_number")
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test cases When not providing required field", () => {
    let requestData = req_factor({},["code","name","account_number"]);
    cy.request({
      method: routes.put,
      url: `${routes.post_factor}${factor_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("code")
      expect(res).has.property("name")
      expect(res).has.property("account_number")
      expect(res).has.property("status",requestData.status)
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test cases When not providing optional field", () => {
    let requestData = req_factor({},["status"]);
    cy.request({
      method: routes.put,
      url: `${routes.post_factor}${factor_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("code",requestData.code)
      expect(res).has.property("name",requestData.name)
      expect(res).has.property("account_number",requestData.account_number)
      expect(res).has.property("status")
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test case for update API", () => {
    let requestData = req_factor({});
    cy.request({
      method: routes.put,
      url: `${routes.post_factor}${factor_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
      failOnStatusCode: false
    }).then(({ body }) => {
      let res = body.result.data;
      factor_code = res.code;
      resaccount_number = res.account_number;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("code",requestData.code)
      expect(res).has.property("name",requestData.name)
      expect(res).has.property("account_number",requestData.account_number)
      expect(res).has.property("status",requestData.status)
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");

  it("Test case for fetch API", () => {
    let reqData = {
      search: [
        {
          key: "factor.id",
          operation: "=",
          val: factor_id,
        },
      ],
      searchOr: [
        {
          key: "factor.id",
          operation: "=",
          val: factor_id,
        },
      ],
      searchOrAnd: [
        {
          key: "factor.id",
          operation: "=",
          val: factor_id,
        },
      ],
      select: [
        "factor.id",
        "factor.name",
        "factor.code",
        "factor.account_number",
        "factor.company_id",
        "factor.status",
        "company.name as company_name",
      ],
      sort: "factor.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    }
    cy.request({
      method: routes.post,
      url: `${routes.post_factor}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index: any) => {
        expect(ele).has.property("id",reqData.search[index].val);
        expect(ele).has.property("name");
        expect(ele).has.property("code");
        expect(ele).has.property("account_number");
        expect(ele).has.property("company_id");
        expect(ele).has.property("status");
        expect(ele).has.property("company_name");
      });
      expect(body.result).has.property("page", reqData.page);
      expect(body.result).has.property("perPage", reqData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_factor}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {},
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("name");
        expect(ele).has.property("account_number");
        expect(ele).has.property("company_id");
        expect(ele).has.property("status");
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
        expect(ele).has.property("address");
        expect(ele).has.property("ein_cin");
        expect(ele).has.property("state_id");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when search field are blank", () => {
    let reqData = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [
        "factor.id",
        "factor.name",
        "factor.code",
        "factor.account_number",
        "factor.company_id",
        "factor.status",
        "company.name as company_name",
      ],
      sort: "factor.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    }
    cy.request({
      method: routes.post,
      url: `${routes.post_factor}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("name");
        expect(ele).has.property("code");
        expect(ele).has.property("account_number");
        expect(ele).has.property("company_id");
        expect(ele).has.property("status");
        expect(ele).has.property("company_name");
      });
      expect(body.result).has.property("page", reqData.page);
      expect(body.result).has.property("perPage", reqData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when search and select field are blank", () => {
    let reqData ={
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [],
      sort: "factor.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_factor}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("name");
        expect(ele).has.property("account_number");
        expect(ele).has.property("company_id");
        expect(ele).has.property("status");
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
        expect(ele).has.property("address");
        expect(ele).has.property("ein_cin");
        expect(ele).has.property("state_id");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when select field is left blank", () => {
    let reqData ={
      search: [
        {
          key: "factor.id",
          operation: "=",
          val: factor_id
        },
      ],
      select: [],
      sort: "factor.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_factor}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index) => {
        expect(ele).has.property("id",reqData.search[index].val);
        expect(ele).has.property("name");
        expect(ele).has.property("account_number");
        expect(ele).has.property("company_id");
        expect(ele).has.property("status");
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
        expect(ele).has.property("address");
        expect(ele).has.property("ein_cin");
        expect(ele).has.property("state_id");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_factor}${"fetch"}`,
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

describe(`${store_msg.success_log}${Cypress.spec["fileName"]}`, () => {

  it("Test cases for get-log API", () => {
    let today = new Date().toISOString().slice(0, 10);
    cy.request({
      method: routes.post,
      url: routes.get_log,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        module_name: "factor",
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
      }
    }).then(({ body }) => {
      cy.check_log(body);
    });
  });

  it("Test case for track-change-data API", () => {
    let recordId = factor_id.toString();
    cy.request({
      method: routes.post,
      url: routes.track_change,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        module: "factor",
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
    let name = "Factor";
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
            "account_number",
            "company_id",
            "status",
            "created_date",
            "updated_date",
            "created_by",
            "updated_by",
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
                "state_id",
              ],
            },
          },
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

let err_acNumber = `{account_number} must be a number`
let chk_acNumber =`{account_number} is required`

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {

  it("Code will be maximum 40 charector", () => {
    cy.request({
      method: routes.post,
      url: routes.post_factor,
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
      url: routes.post_factor,
      headers: { Authorization: Cypress.env("companyToken") },
      body: exist_code,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code",store_msg.err_code2);
    });
  });

  it("Test cases When account_number already exist", () => {
    cy.request({
      method: routes.post,
      url: routes.post_factor,
      headers: { Authorization: Cypress.env("companyToken") },
      body: exist_account_number,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      let err =body.error.errorDetails
      expect(err).has.property("account_number",`{account_number} already exists`);
    });
  });

  it("Test cases When do not provide any field data", () => {
    cy.request({
      method: routes.post,
      url: routes.post_factor,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      let err =body.error.errorDetails
      expect(err).has.property("code",store_msg.err_code3);
      expect(err).has.property("name",store_msg.err_name2);
      expect(err).has.property("account_number",chk_acNumber);
    });
  });

  it("Test cases When fields are empty", () => {
    cy.request({
      method: routes.post,
      url: routes.post_factor,
      headers: { Authorization: Cypress.env("companyToken") },
      body: blank_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      let err =body.error.errorDetails
      cy.Failure(body);
      expect(err).has.property("code",store_msg.err_code);
      expect(err).has.property("name",store_msg.err_name);
      expect(err).has.property("account_number",err_acNumber);
    });
  });

  it("Status must be one of [0 and 1]", () => {
    cy.request({
      method: routes.post,
      url: routes.post_factor,
      headers: { Authorization: Cypress.env("companyToken") },
      body: boolean_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      let err =body.error.errorDetails
      cy.Failure(body);
      expect(err).has.property("status",store_msg.err_status);
    });
  });

  it("account_number and status should be number", () => {
    cy.request({
      method: routes.post,
      url: routes.post_factor,
      headers: { Authorization: Cypress.env("companyToken") },
      body:number_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      let err =body.error.errorDetails
      cy.Failure(body);
      expect(err).has.property("account_number",err_acNumber);
      expect(err).has.property("status",store_msg.err_status1);
    });
  });

  it("code and name should be string", () => {
    cy.request({
      method: routes.post,
      url: routes.post_factor,
      headers: { Authorization: Cypress.env("companyToken") },
      body: string_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      let err =body.error.errorDetails
      cy.Failure(body);
      expect(err).has.property("code",store_msg.err_code1);
      expect(err).has.property("name",store_msg.err_name1);
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {

  it("Code will be maximum 40 charector", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_factor}${factor_id}`,
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
      url: `${routes.post_factor}${factor_id_1}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: exist_code,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code",store_msg.err_code2);
    });
  });

  it("Test cases When alphabet provides along with Id ", () => {
    cy.request({
      method: "PUT",
      url: `${routes.post_factor}${Cypress.env("Random")}`,
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
      method: "PUT",
      url: `${routes.post_factor}${Cypress.env("RandomNumber")}`,
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
      url: `${routes.post_factor}${factor_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: blank_req,
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails
      cy.Failure(body);
      expect(err).has.property("code",store_msg.err_code);
      expect(err).has.property("name",store_msg.err_name);
      expect(err).has.property("account_number",err_acNumber
      );
    });
  });

  it("Status must be one of [0 and 1]", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_factor}${factor_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: boolean_req,
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails
      cy.Failure(body);
      expect(err).has.property("status",store_msg.err_status);
    });
  });

  it("account_number and status should be number", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_factor}${factor_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body:number_req,
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails
      cy.Failure(body);
      expect(err).has.property("account_number",err_acNumber);
      expect(err).has.property("status",store_msg.err_status1);
    });
  });

  it("code and name should be string", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_factor}${factor_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: string_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails
      cy.Failure(body);
      expect(err).has.property("code",store_msg.err_code1);
      expect(err).has.property("name",store_msg.err_name1);
    });
  });
});
