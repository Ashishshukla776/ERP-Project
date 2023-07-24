import routes from "../../support/route";
import store_msg from "../../support/store_msg";

var cst_saleparson_id: any;
var ressales_person_id: any;
var resCustomer_id: any;
let cstId
let blank_req
let number_req
let boolean_req
let check_sp
let check_cst
let string_req
let checkType


before(() => {
  cy.GetCompanyToken();
  cy.GetCustomerId();
  cy.GetSalesPersonId();
  cy.Get_config("Decimal");
});

beforeEach(() => {
  cy.RandomNumber();
  cy.RandomNum_2();
  cy.RandomNum();
  cy.randomBoolean();
  cy.Random();
  
  blank_req =req_cstSales({
    customer_id: "",
    sales_person_id: "",
    commission_type: "",
    commission: "",
    status: ""
  });
  number_req =req_cstSales({
    customer_id: Cypress.env("RandomNum"),
    sales_person_id: Cypress.env("RandomNum"),
    commission: Cypress.env("RandomNum"),
    status: Cypress.env("RandomNum")
  });
  boolean_req = req_cstSales({ status: Cypress.env("RandomNumber")})
  check_sp = req_cstSales({sales_person_id: Cypress.env("RandomNumber")});
  check_cst = req_cstSales({ customer_id: Cypress.env("RandomNumber") });
  string_req = req_cstSales({commission_type: Cypress.env("RandomNumber")})
  checkType = req_cstSales({commission_type: Cypress.env("Random")})
});

function req_cstSales(payload,ignoredata=[]){
  let reqBody = {
    sales_person_id: payload.hasOwnProperty("sales_person_id")?payload.sales_person_id :Cypress.env("salesId"),
    commission_type: payload.hasOwnProperty("commission_type")?payload.commission_type :"F",
    commission: payload.hasOwnProperty("commission")?payload.commission :Cypress.env("RandomNum_2"),
    customer_id: payload.hasOwnProperty("customer_id")?payload.customer_id :cstId,
    status: payload.hasOwnProperty("status")?payload.status :1
  };
  ignoredata.forEach((itemrow)=>{
    delete reqBody[itemrow];
  })
  return reqBody
}

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {
 
  it("Test cases for create API", () => {
    cy.request({
      method:  routes.post,
      url: routes.post_cst,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        code: Cypress.env("Random"),
        name: Cypress.env("Random")
      },
    }).then(({ body }) => {
      cstId = body.result.data.id;
      let requestData = req_cstSales({});
      cy.request({
        method: routes.post,
        url: routes.post_cstSales,
        headers: { Authorization: Cypress.env("companyToken") },
        body: requestData,
      }).then(({ body }) => {
        cst_saleparson_id = body.result.data.id;
        resCustomer_id = body.result.data.customer_id;
        ressales_person_id = body.result.data.sales_person_id;
        let req_commission = requestData.commission.toString();
        cy.Success(body);
        expect(body.result.data).has.property("id");
        expect(body.result.data).has.property("customer_id",requestData.customer_id);
        expect(body.result.data).has.property("sales_person_id",requestData.sales_person_id);
        expect(body.result.data).has.property("commission_type",requestData.commission_type);
          if(Cypress.env("meta_value")>0){
            req_commission = requestData.commission.toFixed(Cypress.env("meta_value"))
          }else{
            req_commission = requestData.commission.toFixed(Cypress.env("def_metaValue"))
          }
        expect(body.result.data).has.property("commission",req_commission)
        expect(body.result.data).has.property("status",requestData.status);
        expect(body.result.data).has.property("created_date");
        expect(body.result.data).has.property("created_by");
      });
    });
  });

});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {

  it("Test case for update API when not providing any field", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_cstSales}${cst_saleparson_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {}
    }).then(({ body }) => {
        cy.Success(body);
        expect(body.result.data).has.property("id");
        expect(body.result.data).has.property("customer_id");
        expect(body.result.data).has.property("sales_person_id");
        expect(body.result.data).has.property("commission_type");
        expect(body.result.data).has.property("commission")
        expect(body.result.data).has.property("status");
        expect(body.result.data).has.property("created_date");
        expect(body.result.data).has.property("created_by");
    });
  });

  it("Test case for update API when not providing required field", () => {
    let requestData = req_cstSales({},
      ["customer_id","sales_person_id","commission_type","commission"]);
    cy.request({
      method: routes.put,
      url: `${routes.post_cstSales}${cst_saleparson_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("customer_id");
      expect(body.result.data).has.property("sales_person_id");
      expect(body.result.data).has.property("commission_type");
      expect(body.result.data).has.property("commission")
      expect(body.result.data).has.property("status",requestData.status);
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
    });
  });

  it("Test case for update API When not providing optional fields", () => {
    let requestData = req_cstSales({},["status"]);
    cy.request({
      method: routes.put,
      url: `${routes.post_cstSales}${cst_saleparson_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let req_commission = requestData.commission.toString();
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("customer_id",requestData.customer_id);
      expect(body.result.data).has.property("sales_person_id",requestData.sales_person_id);
      expect(body.result.data).has.property("commission_type",requestData.commission_type);
        if(Cypress.env("meta_value")>0){
          req_commission = requestData.commission.toFixed(Cypress.env("meta_value"))
        }else{
          req_commission = requestData.commission.toFixed(Cypress.env("def_metaValue"))
        }
      expect(body.result.data).has.property("commission",req_commission)
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
    });
  });

  it("Test case for update API with all field", () => {
    let requestData = req_cstSales({});
    cy.request({
      method: routes.put,
      url: `${routes.post_cstSales}${cst_saleparson_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let req_commission = requestData.commission.toString();
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("customer_id",requestData.customer_id);
      expect(body.result.data).has.property("sales_person_id",requestData.sales_person_id);
      expect(body.result.data).has.property("commission_type",requestData.commission_type);
        if(Cypress.env("meta_value")>0){
          req_commission = requestData.commission.toFixed(Cypress.env("meta_value"))
        }else{
          req_commission = requestData.commission.toFixed(Cypress.env("def_metaValue"))
        }
      expect(body.result.data).has.property("commission",req_commission)
      expect(body.result.data).has.property("status",requestData.status);
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
    });
  });

});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {

  it("Test case for fetch API", () => {
    let reqData = {
      search: [
        {
          key: "customer_salesperson.id",
          operation: "=",
          val: cst_saleparson_id
        }
      ],
      searchOr: [
        {
          key: "customer_salesperson.id",
          operation: "=",
          val: cst_saleparson_id
        }
      ],
      searchOrAnd: [
        {
          key: "customer_salesperson.id",
          operation: "=",
          val: cst_saleparson_id
        }
      ],
      select: [
        "customer_salesperson.id",
        "customer_salesperson.customer_id",
        "customer_salesperson.sales_person_id",
        "customer_salesperson.commission_type",
        "customer_salesperson.commission",
        "sales_person.code",
        "sales_person.first_name",
        "customers.name",
      ],
      sort: "customers.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_cstSales}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqData
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index) => {
        expect(ele).has.property("id", reqData.search[index].val);
        expect(ele).has.property("customer_id");
        expect(ele).has.property("sales_person_id");
        expect(ele).has.property("commission_type");
        expect(ele).has.property("commission");
        expect(ele).has.property("code");
        expect(ele).has.property("first_name");
        expect(ele).has.property("name");
      });
      expect(body.result).has.property("page", reqData.page);
      expect(body.result).has.property("perPage", reqData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_cstSales}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {}
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("customer_id");
        expect(ele).has.property("sales_person_id");
        expect(ele).has.property("commission_type");
        expect(ele).has.property("commission");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
        expect(ele).has.property("retail_type_id");
        expect(ele).has.property("master_code");
        expect(ele).has.property("sales_person_code",);
        expect(ele).has.property("first_name");
        expect(ele).has.property("middle_name");
        expect(ele).has.property("last_name");
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
        "customer_salesperson.id",
        "customer_salesperson.customer_id",
        "customer_salesperson.sales_person_id",
        "customer_salesperson.commission_type",
        "customer_salesperson.commission",
        "sales_person.code",
        "sales_person.first_name",
        "customers.name",
      ],
      sort: "customers.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    }
    cy.request({
      method: routes.post,
      url: `${routes.post_cstSales}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqData
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("customer_id");
        expect(ele).has.property("sales_person_id");
        expect(ele).has.property("commission_type");
        expect(ele).has.property("commission");
        expect(ele).has.property("code");
        expect(ele).has.property("first_name");
        expect(ele).has.property("name");
      });
      expect(body.result).has.property("page", reqData.page);
      expect(body.result).has.property("perPage", reqData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when not provide select field", () => {
    let reqData = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [],
      sort: "customers.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_cstSales}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqData
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("customer_id");
        expect(ele).has.property("sales_person_id");
        expect(ele).has.property("commission_type");
        expect(ele).has.property("commission");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
        expect(ele).has.property("retail_type_id");
        expect(ele).has.property("master_code");
        expect(ele).has.property("sales_person_code",);
        expect(ele).has.property("first_name");
        expect(ele).has.property("middle_name");
        expect(ele).has.property("last_name");
      });
      expect(body.result).has.property("page",reqData.page);
      expect(body.result).has.property("perPage",reqData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_cstSales}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "customer_salesperson.id",
            operation: "=",
            val: Cypress.env("RandomNumber")
          }
        ],
        select: [ "customer_salesperson.id" ],
        sort: "customer_salesperson.id",
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

  it("Record already exists against customer_id and sales_person_id", () => {
    cy.request({
      method: routes.post,
      url: routes.post_cstSales,
   headers: { Authorization: Cypress.env("companyToken") },
      body: req_cstSales({}),
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it("commission_type must be string", () => {
    cy.request({
      method: routes.post,
      url: routes.post_cstSales,
   headers: { Authorization: Cypress.env("companyToken") },
      body: string_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.log(JSON.stringify(string_req))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("commission_type");
    });
  });

  it("Test case when commission_type is different from [F and P]", () => {
    cy.request({
      method: routes.post,
      url: routes.post_cstSales,
   headers: { Authorization: Cypress.env("companyToken") },
      body: checkType,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.log(JSON.stringify(checkType))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("commission_type");
    });
  });

  it("Test case when customer_id doesn't exist", () => {
    cy.request({
      method: routes.post,
      url: routes.post_cstSales,
   headers: { Authorization: Cypress.env("companyToken") },
      body: check_cst,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.log(JSON.stringify(check_cst))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
    });
  });

  it("Test case when sales_person_id doesn't exist", () => {
    cy.request({
      method: routes.post,
      url: routes.post_cstSales,
   headers: { Authorization: Cypress.env("companyToken") },
      body: check_sp,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("sales_person_id");

    });
  });

  it("Test cases When do not provide any field data", () => {
    cy.request({
      method: routes.post,
      url: routes.post_cstSales,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("sales_person_id");
      expect(body.error.errorDetails).has.property("commission_type")
      expect(body.error.errorDetails).has.property("commission");
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: routes.post,
      url: routes.post_cstSales,
   headers: { Authorization: Cypress.env("companyToken") },
      body: blank_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.log(JSON.stringify(blank_req))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("sales_person_id",);
      expect(body.error.errorDetails).has.property("commission_type");
      expect(body.error.errorDetails).has.property("commission");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("customer_id, sales_person_id, commission and status should be number", () => {
    cy.request({
      method: routes.post,
      url: routes.post_cstSales,
   headers: { Authorization: Cypress.env("companyToken") },
      body: number_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.log(JSON.stringify(number_req))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("sales_person_id");
      expect(body.error.errorDetails).has.property("commission");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it(" status must be one of [0 and 1]", () => {
    cy.request({
      method: routes.post,
      url: routes.post_cstSales,
   headers: { Authorization: Cypress.env("companyToken") },
      body: boolean_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.log(JSON.stringify(boolean_req))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {

  it("Test cases When alphabet provides along with Id ", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_cstSales}${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.chk_id);
    });
  });

  it("commission_type must be string", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_cstSales}${cst_saleparson_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: string_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.log(JSON.stringify(string_req))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("commission_type");
    });
  });

  it("Test case when commission_type is different from [F and P]", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_cstSales}${cst_saleparson_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: checkType,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.log(JSON.stringify(checkType))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("commission_type");
    });
  });

  it("Test cases When customer Id doesn't exist", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_cstSales}${cst_saleparson_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: check_cst,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
    });
  });

  it("Test cases When sales_person Id doesn't exist", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_cstSales}${cst_saleparson_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: check_sp,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("sales_person_id");

    });
  });

  it("Test cases When Id doesn't exist", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_cstSales}${Cypress.env("RandomNumber")}`,
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
      url: `${routes.post_cstSales}${cst_saleparson_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: blank_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.log(JSON.stringify(blank_req))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("sales_person_id",);
      expect(body.error.errorDetails).has.property("commission_type");
      expect(body.error.errorDetails).has.property("commission");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("customer_id, sales_person_id, commission and status should be number", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_cstSales}${cst_saleparson_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: number_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.log(JSON.stringify(number_req))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("sales_person_id");
      expect(body.error.errorDetails).has.property("commission");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it(" status must be one of [0 and 1]", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_cstSales}${cst_saleparson_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: boolean_req,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(boolean_req))
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
        module_name: "customer_salesperson",
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
    let recordId = cst_saleparson_id.toString();
    cy.request({
      method:routes.post,
      url: routes.track_change,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        module: "customer_salesperson",
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
    let name = "Customer_salesperson";
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
            "sales_person_id",
            "commission_type",
            "commission",
            "status",
            "created_date",
            "updated_date",
            "created_by",
            "updated_by"
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
                "updated_by"
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
                    "updated_by"
                  ]
                }
              }
            },
            sales_person_id: {
              object: "sales_person",
              fields: [
                "id",
                "code",
                "first_name",
                "middle_name",
                "last_name",
                "status",
                "created_date",
                "updated_date",
                "created_by",
                "updated_by"
              ]
            },
            child: {}
          }
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
