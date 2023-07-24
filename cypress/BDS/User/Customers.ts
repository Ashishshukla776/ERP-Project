import routes from "../../support/route";
import store_msg from "../../support/store_msg";

let cst_id: any;
let cst_id_1: any;
let customer_code: any;
let codelength
let exist_code
let blank_req
let number_req
let boolean_req
let check_retail
let string_req

before(() => {
  cy.GetCompanyToken();
  cy.GetRetailTypeId();
});

beforeEach(() => {
  cy.Random();
  cy.randomBoolean();
  cy.RandomNumber();
  cy.RandomNum();
  cy.RandomNum_2();
  codelength = req_customer({ code: Cypress.env("RandomDesc")})
  exist_code =req_customer({code: customer_code})
  blank_req =req_customer({code: "", name:""})
  number_req =req_customer({ 
    retail_type_id: Cypress.env("RandomNum"),
    status: Cypress.env("RandomNum")
  });
  boolean_req = req_customer({ status: Cypress.env("RandomNumber")})
  check_retail = req_customer({ retail_type_id: Cypress.env("RandomNumber") });
  string_req = req_customer({
    code: Cypress.env("RandomNumber"),
    name: Cypress.env("RandomNumber"),
    master_code: Cypress.env("RandomNumber")
  })
});

function req_customer(payload,ignoredata=[]){
  let reqBody = {
    code: payload.hasOwnProperty("code")?payload.code :Cypress.env("Random"),
    name: payload.hasOwnProperty("name")?payload.name :Cypress.env("Random"),
    retail_type_id: payload.hasOwnProperty("retail_type_id")?payload.retail_type_id :Cypress.env("retailId"),
    master_code: payload.hasOwnProperty("master_code")?payload.master_code :Cypress.env("Random"),
    status: payload.hasOwnProperty("status")?payload.status :1
  };
  ignoredata.forEach((itemrow)=>{
    delete reqBody[itemrow];
  })
  return reqBody
}

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {

  it("Test cases for create API", () => {
    let requestData = req_customer({});
    cy.request({
      method: routes.post,
      url: routes.post_cst,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res = body.result.data;
      cst_id = res.id;
      customer_code = res.code;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("code",requestData.code).be.string
      expect(res).has.property("name",requestData.name).be.string
      expect(res).has.property("retail_type_id",requestData.retail_type_id)
      expect(res).has.property("master_code",requestData.master_code).be.string
      expect(res).has.property("status",requestData.status)
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API When not providing optional field", () => {
    let requestData = req_customer({},["retail_type_id","master_code","status"]);
    cy.request({
      method: routes.post,
      url: routes.post_cst,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res = body.result.data;
      cst_id_1 = res.id;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("code",requestData.code).be.string
      expect(res).has.property("name",requestData.name).be.string
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API When optional field are null", () => {
    let requestData = req_customer({
      retail_type_id: null,
      master_code: null
    });
    cy.request({
      method: routes.post,
      url: routes.post_cst,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("code",requestData.code).be.string
      expect(res).has.property("name",requestData.name).be.string
      expect(res).has.property("retail_type_id",requestData.retail_type_id)
      expect(res).has.property("master_code",requestData.master_code).be.string
      expect(res).has.property("status",requestData.status)
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API When optional field are blank", () => {
    let requestData = req_customer({
      retail_type_id: "",
      master_code: ""
    });
    cy.request({
      method: routes.post,
      url: routes.post_cst,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("code",requestData.code).be.string
      expect(res).has.property("name",requestData.name).be.string
      expect(res).has.property("retail_type_id")
      expect(res).has.property("master_code",requestData.master_code).be.string
      expect(res).has.property("status",requestData.status)
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {

  it("Test case for update API when not providing any fields", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_cst}${cst_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {}
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("code").be.string;
      expect(res).has.property("name").be.string;
      expect(res).has.property("retail_type_id");
      expect(res).has.property("master_code").be.string;
      expect(res).has.property("status");
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test case for update API when not providing optional fields", () => {
   let requestData = req_customer({},["retail_type_id","master_code","status"]);
    cy.request({
      method: routes.put,
      url: `${routes.post_cst}${cst_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("code",requestData.code).be.string;
      expect(res).has.property("name",requestData.name).be.string;
      expect(res).has.property("retail_type_id");
      expect(res).has.property("master_code").be.string;
      expect(res).has.property("status");
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test case for update API when not providing required fields", () => {
    let requestData = req_customer({},["code","name"]);
    cy.request({
      method: routes.put,
      url: `${routes.post_cst}${cst_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("code").be.string;
      expect(res).has.property("name").be.string;
      expect(res).has.property("retail_type_id",requestData.retail_type_id);
      expect(res).has.property("master_code",requestData.master_code).be.string;
      expect(res).has.property("status",requestData.status);
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test case for update API when optional fields are null", () => {
    let requestData = req_customer({
      retail_type_id: null,
      master_code: null
    });
    cy.request({
      method: routes.put,
      url: `${routes.post_cst}${cst_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("code",requestData.code).be.string;
      expect(res).has.property("name",requestData.name).be.string;
      expect(res).has.property("retail_type_id",requestData.retail_type_id);
      expect(res).has.property("master_code",requestData.master_code).be.string;
      expect(res).has.property("status",requestData.status);
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test case for update API when optional fields are blank", () => {
    let requestData = req_customer({
      code: customer_code,
      retail_type_id: "",
      master_code: ""
    });
    cy.request({
      method: routes.put,
      url: `${routes.post_cst}${cst_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("code",requestData.code).be.string;
      expect(res).has.property("name",requestData.name).be.string;
      expect(res).has.property("retail_type_id");
      expect(res).has.property("master_code",requestData.master_code);
      expect(res).has.property("status",requestData.status);
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
    });
  });

  it("Test case for update API", () => {
    let requestData = req_customer({ code: customer_code});
    cy.request({
      method: routes.put,
      url: `${routes.post_cst}${cst_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("code",requestData.code).be.string;
      expect(res).has.property("name",requestData.name).be.string;
      expect(res).has.property("retail_type_id",requestData.retail_type_id);
      expect(res).has.property("master_code",requestData.master_code).be.string;
      expect(res).has.property("status",requestData.status);
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
          key: "customers.id",
          operation: "=",
          val: cst_id,
        },
      ],

      select: [
        "customers.id",
        "customers.name",
        "customers.code",
        "customers.retail_type_id",
        "customers.master_code",
        "customers.status",
        "retail_type.name as retail_type_code",
        "retail_type.name as retail_type_name",
      ],
      sort: "customers.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_cst}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index) => {
        expect(ele).has.property("id", requestData.search[index].val);
        expect(ele).has.property("name");
        expect(ele).has.property("code");
        expect(ele).has.property("retail_type_id");
        expect(ele).has.property("master_code");
        expect(ele).has.property("status");
        expect(ele).has.property("retail_type_code");
        expect(ele).has.property("retail_type_name");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_cst}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {}
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("name");
        expect(ele).has.property("code");
        expect(ele).has.property("retail_type_id");
        expect(ele).has.property("master_code");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("retail_type_code");
        expect(ele).has.property("retail_type_name");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when not provide search field", () => {
    let requestData = {
      search: [],
      searchOrAnd: [],
      searchOr: [],
      select: [
        "customers.id",
        "customers.name",
        "customers.code",
        "customers.retail_type_id",
        "customers.master_code",
        "customers.status",
        "retail_type.name as retail_type_code",
        "retail_type.name as retail_type_name",
      ],
      sort: "customers.id",
      orderby: "desc",
      page: 1,
      perPage:20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_cst}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index) => {
        expect(ele).has.property("id");
        expect(ele).has.property("name");
        expect(ele).has.property("code");
        expect(ele).has.property("retail_type_id");
        expect(ele).has.property("master_code");
        expect(ele).has.property("status");
        expect(ele).has.property("retail_type_code");
        expect(ele).has.property("retail_type_name");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  
  });

  it("Test case for fetch API when not provide select field", () => {
    let requestData = {
      search: [],
      searchOrAnd: [],
      searchOr: [],
      select: [],
      sort: "customers.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_cst}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("name");
        expect(ele).has.property("code");
        expect(ele).has.property("retail_type_id");
        expect(ele).has.property("master_code");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("retail_type_code");
        expect(ele).has.property("retail_type_name");
      });
      expect(body.result).has.property("page",requestData.page);
      expect(body.result).has.property("perPage",requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_cst}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "customers.id",
            operation: "=",
            val: Cypress.env("RandomNumber")
          }
        ],
        select: [
          "customers.id",
          "customers.name",
          "customers.status",
          "customers.retail_type_id",
          "retail_type.name as retail_type_name"
        ],
        sort: "customers.id",
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
        module_name: "customers",
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
    let recordId = cst_id.toString();
    cy.request({
      method: routes.post,
      url:routes.track_change,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        module: "customers",
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
    let name = "Customers";
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
            "retail_type_id",
            "master_code",
            "status",
            "created_date",
            "updated_date",
            "created_by",
            "updated_by",
          ],
          foreignKey: {
            retail_type_id: {
              object: "retail_type",
              fields: [
                "id",
                "code",
                "name",
                "status",
                "created_date",
                "updated_date",
                "created_by",
                "updated_by",
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
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      expect(JSON.stringify(body)).to.deep.equal(JSON.stringify(obj));
    });
  });
});

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {

  it("Code should be maximum 40 charector", () => {
    cy.request({
      method: routes.post,
      url: routes.post_cst,
   headers: { Authorization: Cypress.env("companyToken") },
      body: codelength,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When code already exist", () => {
    cy.request({
      method: routes.post,
      url: routes.post_cst,
   headers: { Authorization: Cypress.env("companyToken") },
      body: exist_code,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When do not provide any field data", () => {
    cy.request({
      method: routes.post,
      url: routes.post_cst,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: routes.post,
      url: routes.post_cst,
   headers: { Authorization: Cypress.env("companyToken") },
      body: blank_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
    });
  });

  it("code, name and master_code should be string", () => {
    cy.request({
      method: routes.post,
      url: routes.post_cst,
   headers: { Authorization: Cypress.env("companyToken") },
      body: string_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
      expect(body.error.errorDetails).has.property("master_code");
    });
  });

  it("retail_type_id and status should be number", () => {
    cy.request({
      method: routes.post,
      url: routes.post_cst,
   headers: { Authorization: Cypress.env("companyToken") },
      body: number_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("retail_type_id");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("status must be one of [0 and 1]", () => {
    cy.request({
      method: routes.post,
      url: routes.post_cst,
   headers: { Authorization: Cypress.env("companyToken") },
      body: boolean_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("Test case when retail_type_id doesn't exist", () => {
    cy.request({
      method: routes.post,
      url: routes.post_cst,
   headers: { Authorization: Cypress.env("companyToken") },
      body: check_retail,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("retail_type_id");
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {

  it("Test cases When alphabet provides along with Id ", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_cst}${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.chk_id);
    });
  });

  it("Test cases When Id doesn't exist", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_cst}${Cypress.env("RandomNumber")}`,
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
      url: `${routes.post_cst}${cst_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: blank_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
    });
  });

  it("Code should be maximum 40 charector", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_cst}${cst_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: codelength,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When code already exist", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_cst}${cst_id_1}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: exist_code,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("retail_type_id and status should be number", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_cst}${cst_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: number_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("retail_type_id");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("code, name and master_code should be string", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_cst}${cst_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: string_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
      expect(body.error.errorDetails).has.property("master_code");
    });
  });

  it("status must be one of [0 and 1]", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_cst}${cst_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: boolean_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("Test case when retail_type_id doesn't exist", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_cst}${cst_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: check_retail,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("retail_type_id");
    });
  });
});
