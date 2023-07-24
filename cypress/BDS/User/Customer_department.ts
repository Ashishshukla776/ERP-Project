import routes from "../../support/route";
import store_msg from "../../support/store_msg";

let dept_id: Number;
let dept_id_1: Number;
let dept_code: String;
let codelength
let exist_code
let blank_req
let number_req
let boolean_req
let string_req
let check_cst

before(() => {
  cy.GetCompanyToken();
  cy.GetCustomerId();
});

beforeEach(() => {
  cy.Random();
  cy.RandomDesc();
  cy.randomBoolean();
  cy.RandomNumber();
  cy.RandomNum();

  codelength = req_dept({ code: Cypress.env("RandomDesc")})
  exist_code =req_dept({code: dept_code})
  blank_req =req_dept({customer_id:"",code: "", name:""})
  number_req =req_dept({ 
    customer_id:Cypress.env("RandomNum"),
    status: Cypress.env("RandomNum")})
  boolean_req = req_dept({ status: Cypress.env("RandomNumber")})
  string_req = req_dept({
    code: Cypress.env("RandomNumber"),
    name : Cypress.env("RandomNumber"),
    description:Cypress.env("RandomNumber")
  });
  check_cst = req_dept({customer_id:Cypress.env("RandomNumber")})
});

function req_dept(payload, ignoredata = [], adddata = {}) {
  let reqBody = {
    customer_id: payload.hasOwnProperty("customer_id") ? payload.customer_id : Cypress.env("cstId"),
    code: payload.hasOwnProperty("code") ? payload.code : Cypress.env("Random"),
    name: payload.hasOwnProperty("name") ? payload.name : Cypress.env("Random"),
    description: payload.hasOwnProperty("description") ? payload.description : Cypress.env("Random"),
    status: payload.hasOwnProperty("status") ? payload.status : 1,
    
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
    let requestData = req_dept({});
    cy.request({
      method: routes.post,
      url: routes.post_dept,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data
      dept_id = res.id;
      dept_code = res.code;
      cy.Success(body);
      expect(res).has.property("id")
      expect(res).has.property("customer_id",requestData.customer_id)
      expect(res).has.property("code",requestData.code)
      expect(res).has.property("name",requestData.name)
      expect(res).has.property("description",requestData.description)
      expect(res).has.property("status",requestData.status)
      expect(res).has.property("created_date")
      expect(res).has.property("created_by")
    });
  });

  it("Test cases for create API When not providing optional field", () => {
    let requestData = req_dept({},["description","status"]);
    cy.request({
      method: routes.post,
      url: routes.post_dept,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data
      dept_id_1 =res.id;
      cy.Success(body);
      expect(res).has.property("id")
      expect(res).has.property("customer_id",requestData.customer_id)
      expect(res).has.property("code",requestData.code)
      expect(res).has.property("name",requestData.name)
      expect(res).has.property("status")
      expect(res).has.property("created_date")
      expect(res).has.property("created_by")
    });
  });

  it("Test cases for create API When optional field are null", () => {
    let requestData = req_dept({description: null});
    cy.request({
      method: routes.post,
      url: routes.post_dept,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data
      cy.Success(body);
      expect(res).has.property("id")
      expect(res).has.property("customer_id",requestData.customer_id)
      expect(res).has.property("code",requestData.code)
      expect(res).has.property("name",requestData.name)
      expect(res).has.property("description",requestData.description)
      expect(res).has.property("status",requestData.status)
      expect(res).has.property("created_date")
      expect(res).has.property("created_by")
    });
  });

  it("Test cases for create API When optional field are blank", () => {
    let requestData = req_dept({description: ""});
    cy.request({
      method: routes.post,
      url: routes.post_dept,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data
      cy.Success(body);
      expect(res).has.property("id")
      expect(res).has.property("customer_id",requestData.customer_id)
      expect(res).has.property("code",requestData.code)
      expect(res).has.property("name",requestData.name)
      expect(res).has.property("description")
      expect(res).has.property("status",requestData.status)
      expect(res).has.property("created_date")
      expect(res).has.property("created_by")
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {

  it("Test case when not providing any fields", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_dept}${dept_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("customer_id");
      expect(body.result.data).has.property("code");
      expect(body.result.data).has.property("name");
      expect(body.result.data).has.property("description");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property("status");
    });
  });

  it("Test case when not providing optional fields", () => {
    let requestData = req_dept({ code: dept_code},["description","status"]);
    cy.request({
      method: routes.put,
      url: `${routes.post_dept}${dept_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("customer_id",requestData.customer_id);
      expect(body.result.data).has.property("code",requestData.code);
      expect(body.result.data).has.property("name",requestData.name);
      expect(body.result.data).has.property("description");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property("status");
    });
  });

  it("Test case when not providing required fields", () => {
    let requestData = req_dept({ code: dept_code},["customer_id","code","name"]);
    cy.request({
      method: routes.put,
      url: `${routes.post_dept}${dept_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("customer_id");
      expect(body.result.data).has.property("code");
      expect(body.result.data).has.property("name");
      expect(body.result.data).has.property("description",requestData.description);
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property("status",requestData.status);
    });
  });

  it("Test case when optional fields are null", () => {
    let requestData = req_dept({
      code: dept_code,
      description: null
    });
    cy.request({
      method: routes.put,
      url: `${routes.post_dept}${dept_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("customer_id",requestData.customer_id);
      expect(body.result.data).has.property("code",requestData.code);
      expect(body.result.data).has.property("name",requestData.name);
      expect(body.result.data).has.property("description",requestData.description);
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property("status",requestData.status);
    });
  });

  it("Test case when optional fields are blank", () => {
    let requestData = req_dept({
      code: dept_code,
      description: ""
    });
    cy.request({
      method: routes.put,
      url: `${routes.post_dept}${dept_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("customer_id",requestData.customer_id);
      expect(body.result.data).has.property("code",requestData.code);
      expect(body.result.data).has.property("name",requestData.name);
      expect(body.result.data).has.property("description");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property("status",requestData.status);
    });
  });

  it("Test case with all data", () => {
    let requestData = req_dept({ code: dept_code});
    cy.request({
      method: routes.put,
      url: `${routes.post_dept}${dept_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("customer_id",requestData.customer_id);
      expect(body.result.data).has.property("code",requestData.code);
      expect(body.result.data).has.property("name",requestData.name);
      expect(body.result.data).has.property("description",requestData.description);
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property("status",requestData.status);
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {

  it("Test case for fetch API", () => {
    let reqData = {
      search: [
        {
          key: "customer_department.id",
          operation: "=",
          val: dept_id
        }
      ],
      select: [
        "customer_department.id",
        "customer_department.name",
        "customer_department.code",
        "customer_department.description",
        "customer_department.status",
        "customer_department.customer_id",
        "customers.name as customer_name",
        "customers.retail_type_id"
      ],
      sort: "customer_department.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_dept}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqData
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index:any) => {
        expect(ele).has.property("id", reqData.search[index].val);
        expect(ele).has.property("name");
        expect(ele).has.property("code");
        expect(ele).has.property("description");
        expect(ele).has.property("status");
        expect(ele).has.property("customer_id");
        expect(ele).has.property("customer_name");
        expect(ele).has.property("retail_type_id");
      });
      expect(body.result).has.property("page", reqData.page);
      expect(body.result).has.property("perPage", reqData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_dept}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("customer_id");
        expect(ele).has.property("name");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("status");
        expect(ele).has.property("description");
        expect(ele).has.property("code");
        expect(ele).has.property("customer_name");
        expect(ele).has.property("retail_type_id");
        expect(ele).has.property("master_code");
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
        "customer_department.id",
        "customer_department.name",
        "customer_department.code",
        "customer_department.description",
        "customer_department.status",
        "customer_department.customer_id",
        "customers.name as customer_name",
        "customers.retail_type_id",
      ],
      sort: "customer_department.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_dept}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqData
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index:any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("name");
        expect(ele).has.property("code");
        expect(ele).has.property("description");
        expect(ele).has.property("status");
        expect(ele).has.property("customer_id");
        expect(ele).has.property("customer_name");
        expect(ele).has.property("retail_type_id");
      });
      expect(body.result).has.property("page", reqData.page);
      expect(body.result).has.property("perPage", reqData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when select field is left blank", () => {
    let reqData = {
      search: [
        {
          key: "customer_department.id",
          operation: "=",
          val: dept_id
        }
      ],
      select: [],
      sort: "customer_department.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_dept}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqData
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("customer_id");
        expect(ele).has.property("name");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("status");
        expect(ele).has.property("description");
        expect(ele).has.property("code");
        expect(ele).has.property("customer_name");
        expect(ele).has.property("retail_type_id");
        expect(ele).has.property("master_code");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API searc and select field are left blank", () => {
    let reqData = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [],
      sort: "customer_department.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_dept}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqData
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("customer_id");
        expect(ele).has.property("name");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("status");
        expect(ele).has.property("description");
        expect(ele).has.property("code");
        expect(ele).has.property("customer_name");
        expect(ele).has.property("retail_type_id");
        expect(ele).has.property("master_code");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_dept}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "customer_department.id",
            operation: "=",
            val: Cypress.env("RandomNumber")
          }
        ],
        select: [
          "customer_department.name",
          "customer_department.customer_id",
          "customers.name as customers_name",
        ],
        sort: "customer_department.id",
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
        module_name: "customer_department",
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
    let recordId = dept_id.toString();
    cy.request({
      method: routes.post,
      url: routes.track_change,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        module: "customer_department",
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
    let name = "Customer_department";
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
            "code",
            "name",
            "description",
            "created_date",
            "updated_date",
            "created_by",
            "updated_by",
            "status",
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
      url: routes.post_dept,
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
      url: routes.post_dept,
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
      url: routes.post_dept,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: routes.post,
      url: routes.post_dept,
   headers: { Authorization: Cypress.env("companyToken") },
      body: blank_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
    });
  });

  it("code, name and description should be string", () => {
    cy.request({
      method: routes.post,
      url: routes.post_dept,
   headers: { Authorization: Cypress.env("companyToken") },
      body: string_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
      expect(body.error.errorDetails).has.property("description");
    });
  });

  it("customer_id and status should be number", () => {
    cy.request({
      method: routes.post,
      url: routes.post_dept,
   headers: { Authorization: Cypress.env("companyToken") },
      body: number_req,
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
      url: routes.post_dept,
   headers: { Authorization: Cypress.env("companyToken") },
      body: boolean_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("Test cases When customer_id doesn't exist", () => {
    cy.request({
      method: routes.post,
      url: routes.post_dept,
   headers: { Authorization: Cypress.env("companyToken") },
      body: check_cst,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {

  it("Test cases When alphabet provides along with Id ", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_dept}${Cypress.env("Random")}`,
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
      url: `${routes.post_dept}${Cypress.env("RandomNumber")}`,
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
      url: `${routes.post_dept}${dept_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: blank_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
    });
  });

  it("Code should be maximum 40 charector", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_dept}${dept_id}`,
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
      url: `${routes.post_dept}${dept_id_1}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: exist_code,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("code, name and description should be string", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_dept}${dept_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: string_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("name");
      expect(body.error.errorDetails).has.property("description");
    });
  });

  it("customer_id and status should be number", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_dept}${dept_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: number_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("status must be one of [0 and 1]", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_dept}${dept_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: boolean_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("Test cases When customer_id doesn't exist", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_dept}${dept_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: check_cst,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });
});
