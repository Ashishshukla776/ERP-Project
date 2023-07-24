import axios, { AxiosResponse } from "axios";
import routes from "../support/route";

let resUser_id: String;
let Admin_userId: String;

before(() => {
  cy.Random();
  cy.randomBoolean();
  cy.RandomNumber();
  cy.RandomDesc();
  cy.RandomNum_2();
});

export {};
declare global {
  namespace Cypress {
    interface Chainable {
      admin_login(): Chainable<Element>;
    }
    interface Chainable {
      UserLogin(): Chainable<Element>;
    }
    interface Chainable {
      GetCompanyToken(): Chainable<Element>;
    }

    interface Chainable {
      GetCompanylist(): Chainable<Element>;
    }
    interface Chainable {
      Success(body: Object): Chainable<Element>;
    }
    interface Chainable {
      Failure(body: Object): Chainable<Element>;
    }
    interface Chainable {
      FetchCompByOrg(body: Object): Chainable<Element>;
    }
    interface Chainable {
      Code(body: Object): Chainable<Element>;
    }
    interface Chainable {
      Track_change(body: Object): Chainable<Element>;
    }
    interface Chainable {
      Random(): Chainable<Element>;
    }
    interface Chainable {
      Random1(): Chainable<Element>;
    }
    interface Chainable {
      Random2(): Chainable<Element>;
    }
    interface Chainable {
      Random3(): Chainable<Element>;
    }
    interface Chainable {
      Random4(): Chainable<Element>;
    }
    interface Chainable {
      randomBoolean(): Chainable<Element>;
    }
    interface Chainable {
      RandomNumber(): Chainable<Element>;
    }
    interface Chainable {
      RandomDesc(): Chainable<Element>;
    }
    interface Chainable {
      RandomNum_2(): Chainable<Element>;
    }
    interface Chainable {
      randomDesimal(): Chainable<Element>;
    }
    interface Chainable {
      RandomNum_1(): Chainable<Element>;
    }
    interface Chainable {
      RandomNum(): Chainable<Element>;
    }
    interface Chainable {
      randomEmail(): Chainable<Element>;
    }
    interface Chainable {
      GetCustomerId(): Chainable<Element>;
    }
    interface Chainable {
      GetRetailTypeId(): Chainable<Element>;
    }
    interface Chainable {
      GetSalesPersonId(): Chainable<Element>;
    }
    interface Chainable {
      GetFactorId(): Chainable<Element>;
    }
    interface Chainable {
      Getship_viaIdId(): Chainable<Element>;
    }
    interface Chainable {
      GetDivisionId(): Chainable<Element>;
    }
    interface Chainable {
      GetseasonId(): Chainable<Element>;
    }
    interface Chainable {
      GetgroupId(): Chainable<Element>;
    }
    interface Chainable {
      GetcategoryId(): Chainable<Element>;
    }
    interface Chainable {
      GetdesignId(): Chainable<Element>;
    }
    interface Chainable {
      GetbodyId(): Chainable<Element>;
    }
    interface Chainable {
      GetroyaltyId(): Chainable<Element>;
    }
    interface Chainable {
      GetcolorId(): Chainable<Element>;
    }
    interface Chainable {
      GetstoreId(): Chainable<Element>;
    }
    interface Chainable {
      GetdcId(): Chainable<Element>;
    }
    interface Chainable {
      Get_termId(): Chainable<Element>;
    }
    interface Chainable {
      Get_deptId(): Chainable<Element>;
    }
    interface Chainable {
      Get_itemId_I(): Chainable<Element>;
    }
    interface Chainable {
      Get_itemId_P(): Chainable<Element>;
    }
    interface Chainable {
      Get_itemId_S(): Chainable<Element>;
    }
    interface Chainable {
      Get_vendor_id(): Chainable<Element>;
    }
    interface Chainable {
      GetWarehouseId(): Chainable<Element>;
    }
    interface Chainable {
      Get_stage_id(): Chainable<Element>;
    }
    interface Chainable {
      Get_PO_id(): Chainable<Element>;
    }
    interface Chainable {
      Get_Email_id(): Chainable<Element>;
    }
    interface Chainable {
      Get_Role_id(): Chainable<Element>;
    }
    interface Chainable {
      date_formate(): Chainable<Element>;
    }
    interface Chainable {
      Fail(body: Object): Chainable<Element>;
    }
    interface Chainable {
      Status_500(body: Object): Chainable<Element>;
    }
    interface Chainable {
      SO_SuccessGetResp(body: Object): Chainable<Element>;
    }
    interface Chainable {
      SO_FailResp(body: Object): Chainable<Element>;
    }
    interface Chainable {
      Get_emailId(): Chainable<Element>;
    }
    interface Chainable {
      Get_Org_id(): Chainable<Element>;
    }
    interface Chainable {
      check_log(body: Object): Chainable<Element>;
    }
    interface Chainable {
      Get_config(keyname:String): Chainable<Element>;
    }
    interface Chainable<Subject = any> {
      postFormData(
        url: string,
        formData: FormData,
        token: string
      ): Chainable<AxiosResponse>;
    }
  }
}
//Get AuthToken for Admin
Cypress.Commands.add("admin_login", () => {
  let baseUrl = Cypress.env("apiUrl");
  cy.request({
    method: "POST",
    url: `${baseUrl}v1/admin/auth/`,
    body: {
      email: Cypress.env("admin_username"),
      password: Cypress.env("admin_Password"),
    },
  }).then(({ body }) => {
    Cypress.env("authToken", body.result.auth);
    Admin_userId = body.result.user_id;
  });
});
//Get AuthToken for user
Cypress.Commands.add("UserLogin", () => {
  let baseurl = Cypress.env("apiUrl");
  cy.request({
    method: "POST",
    url: `${baseurl}v1/auth/`,
    body: {
      email: Cypress.env("username"),
      password: Cypress.env("Password"),
    },
  }).then(({ body }) => {
    Cypress.env("authToken", body.result.auth);
    resUser_id = body.result.user_id;
  });
});

//Get CompanyToken
Cypress.Commands.add("GetCompanyToken", () => {
  let baseurl = Cypress.env("apiUrl");
  cy.UserLogin().then(() => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/users/companylist`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
    }).then(({ body }) => {
      let org_id = body.result.data.map((ele: any) => ele.org_mongo_id);
      let company_id = body.result.data.map((ele: any) => ele.company_mysql_id);
      Cypress.env("org_id", org_id[0]);
      Cypress.env("company_id", company_id[0]);
      cy.request({
        method: "GET",
        url: `${baseurl}v1/company/${org_id[0]}/select/${company_id[0]}`,
        headers: {
          Authorization: "Bearer " + Cypress.env("authToken"),
        },
      }).then(({ body }) => {
        let companyToken = "Bearer " +  body.result.data.result
        Cypress.env("companyToken", companyToken);
      });
    });
  });
});

//response for  testcases when status code 200
Cypress.Commands.add("Success", (body: any) => {
  expect(body).has.property("statusCode", 200);
  expect(body).has.property("success", true);
  expect(body).has.property("error", null);
  expect(body).has.property("result");
  expect(body.result).has.property("message");
  expect(body.result).has.property("data");
});

//response for  testcases when status code 400
Cypress.Commands.add("Failure", (body: any) => {
  expect(body).has.property("statusCode", 400);
  expect(body).has.property("success", false);
  expect(body).has.property("error");
  expect(body.error).has.property("message","Please provide the following data");
  expect(body.error).has.property("errorDetails");
  expect(body).has.property("result");
});

//response for  testcases when status code 401
Cypress.Commands.add("Fail", (body) => {
  expect(body).has.property("statusCode", 401);
  expect(body).has.property("success", false);
  expect(body).has.property("result");
});

//response for  testcases when status code 500
Cypress.Commands.add("Status_500", (body: any) => {
  expect(body).has.property("statusCode", 500);
  expect(body).has.property("success", false);
  expect(body).has.property("error");
  expect(body.error).has.property("message", body.error.message);
  expect(body.error).has.property("errorDetails", body.error.errorDetails);
});

//success response of sales_order for GET API
Cypress.Commands.add("SO_SuccessGetResp", (body: any) => {
  expect(body).has.property("statusCode", 200);
  expect(body).has.property("success", true);
  expect(body).has.property("error", null);
  expect(body).has.property("result");
  expect(body.result).has.property("message");
  expect(body.result).has.property("data");
  expect(body.result.data).has.property("id");
  expect(body.result.data).has.property("order_no");
  expect(body.result.data).has.property("order_type");
  expect(body.result.data).has.property("order_date");
  expect(body.result.data).has.property("start_date");
  expect(body.result.data).has.property("cancel_date");
  expect(body.result.data).has.property("order_hold");
  expect(body.result.data).has.property("credit_hold");
  expect(body.result.data).has.property("bulk_order_no");
  expect(body.result.data).has.property("special_instruction");
  expect(body.result.data).has.property("total_amount");
  expect(body.result.data).has.property("freight_amount");
  expect(body.result.data).has.property("total_discount");
  expect(body.result.data).has.property("total_quantity");
  expect(body.result.data).has.property("grand_total");
  expect(body.result.data).has.property("purchase_order").be.string;
  expect(body.result.data).has.property("master_order").be.string;
  expect(body.result.data).has.property("internal_order").be.string;
  expect(body.result.data).has.property("customer_id");
  expect(body.result.data).has.property("customer_code");
  expect(body.result.data).has.property("customer_name");
  expect(body.result.data).has.property("store_id");
  expect(body.result.data).has.property("store_code");
  expect(body.result.data).has.property("ship_to_dc");
  expect(body.result.data).has.property("dc_id");
  expect(body.result.data).has.property("dc_code");
  expect(body.result.data).has.property("ship_via_id");
  expect(body.result.data).has.property("ship_via_code");
  expect(body.result.data).has.property("ship_via_name");
  expect(body.result.data).has.property("division_id");
  expect(body.result.data).has.property("division_code");
  expect(body.result.data).has.property("division_name");
  expect(body.result.data).has.property("department_id");
  expect(body.result.data).has.property("department_code");
  expect(body.result.data).has.property("department_name");
  expect(body.result.data).has.property("factor_id");
  expect(body.result.data).has.property("factor_code");
  expect(body.result.data).has.property("factor_name");
  expect(body.result.data).has.property("term_id");
  expect(body.result.data).has.property("term_code");
  expect(body.result.data).has.property("term_code");
  expect(body.result.data.bill_to).has.property("contact_name");
  expect(body.result.data.bill_to).has.property("address_1");
  expect(body.result.data.bill_to).has.property("address_2");
  expect(body.result.data.bill_to).has.property("address_3");
  expect(body.result.data.bill_to).has.property("address_4");
  expect(body.result.data.bill_to).has.property("city");
  expect(body.result.data.bill_to).has.property("state");
  expect(body.result.data.bill_to).has.property("zip");
  expect(body.result.data.bill_to).has.property("country");
  expect(body.result.data.ship_to).has.property("contact_name");
  expect(body.result.data.ship_to).has.property("address_1");
  expect(body.result.data.ship_to).has.property("address_2");
  expect(body.result.data.ship_to).has.property("address_3");
  expect(body.result.data.ship_to).has.property("address_4");
  expect(body.result.data.ship_to).has.property("city");
  expect(body.result.data.ship_to).has.property("state");
  expect(body.result.data.ship_to).has.property("zip");
  expect(body.result.data.ship_to).has.property("country");
  body.result.data.sales_person.forEach((ele, index) => {
    expect(ele).has.property("id");
    expect(ele).has.property("code");
    expect(ele).has.property("name");
  });
  body.result.data.lines.forEach((element: any) => {
    expect(element).has.property("id");
    expect(element).has.property("line");
    expect(element).has.property("discount_rate");
    expect(element).has.property("item_id");
    expect(element).has.property("item_code");
    expect(element).has.property("item_name");
    expect(element).has.property("color_id");
    expect(element).has.property("color_code");
    expect(element).has.property("color_name");
    element.variants.forEach((element1: any) => {
      expect(element1).has.property("id");
      expect(element1).has.property("csku_id");
      expect(element1).has.property("qty");
      expect(element1).has.property("price");
      expect(element1).has.property("discount");
      expect(element1).has.property("row_num");
      expect(element1).has.property("row_name");
      expect(element1).has.property("col_num");
      expect(element1).has.property("col_name");
      expect(element1).has.property("item_grid_id");
    });
    element.commissions.forEach((element2: any) => {
      expect(element2).has.property("sales_person_id");
      expect(element2).has.property("sales_person_code");
      expect(element2).has.property("sales_person_name");
      expect(element2).has.property("commission_rate");
      expect(element2).has.property("commission_amt");
    });
  });
});

Cypress.Commands.add("check_log", (body: any) => {
  expect(body).has.property("statusCode", 200);
  expect(body).has.property("success", true);
  expect(body).has.property("error", null);
  expect(body).has.property("result");
  expect(body.result).has.property("message", "Logs(s) fetched successfully");
  expect(body.result).has.property("data");
  body.result.data.forEach((element) => {
    expect(element).has.property("_id");
    expect(element).has.property("modules");
    expect(element).has.property("createdAt");
  });
  expect(body.result).has.property("page");
  expect(body.result).has.property("perPage");
  expect(body.result).has.property("totalRecords");
});

Cypress.Commands.add("Track_change", (body: any) => {
  expect(body).has.property("statusCode", 200);
  expect(body).has.property("success", true);
  expect(body).has.property("error", null);
  expect(body).has.property("result");
  expect(body.result).has.property(
    "message",
    "Track-change logs(s) fetched successfully"
  );
  body.result.data.map((element: any) => {
    expect(element).has.property("_id");
    expect(element).has.property("operation");
    expect(element).has.property("userId");
    expect(element).has.property("username");
    expect(element).has.property("createdAt");
  });
});

Cypress.Commands.add("FetchCompByOrg", (body: any) => {
  expect(body).has.property("statusCode", 200);
  expect(body).has.property("success", true);
  expect(body).has.property("error", null);
  expect(body).has.property("result");
  expect(body.result).has.property("message");
  body.result.data.forEach((ele: any) => {
    expect(ele).has.property("id");
    expect(ele).has.property("name");
    expect(ele).has.property("org_id");
    expect(ele).has.property("created_by");
    expect(ele).has.property("updated_by");
    expect(ele).has.property("created_date");
    expect(ele).has.property("updated_date");
    expect(ele).has.property("status");
    expect(ele).has.property("address");
    expect(ele).has.property("ein_cin");
    expect(ele).has.property("state_id");
    expect(ele).has.property("mongo_id");
    expect(ele).has.property("fax");
    expect(ele).has.property("telephone");
    expect(ele).has.property("email");
  });
  expect(body.result).has.property("page");
  expect(body.result).has.property("perPage");
  expect(body.result).has.property("totalRecords");
});

Cypress.Commands.add("Code", (body: any) => {
  expect(body).has.property("statusCode", 400);
  expect(body).has.property("success", false);
  expect(body).has.property("error");
  expect(body.error).has.property(
    "message",
    "Please provide the following data"
  );
  expect(body.error.errorDetails).has.property("code");
  expect(body).has.property("result");
});

//Random function for code
Cypress.Commands.add("Random", () => {
  let Random = "";
  var pattern =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 10; i++)
    Cypress.env(
      "Random",
      (Random += pattern.charAt(Math.floor(Math.random() * pattern.length)))
    );
});

Cypress.Commands.add("Random1", () => {
  let Random1 = "";
  var pattern =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-0123456789";
  for (var i = 0; i < 10; i++)
    Cypress.env(
      "Random1",
      (Random1 += pattern.charAt(Math.floor(Math.random() * pattern.length)))
    );
});

Cypress.Commands.add("Random2", () => {
  let Random2 = "";
  var pattern =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-0123456789";
  for (var i = 0; i < 10; i++)
    Cypress.env(
      "Random2",
      (Random2 += pattern.charAt(Math.floor(Math.random() * pattern.length)))
    );
});

//Random function charector needs more than 40
Cypress.Commands.add("RandomDesc", () => {
  let RandomDesc = "";
  var pattern =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-0123456789";
  for (var i = 0; i < 50; i++)
    Cypress.env(
      "RandomDesc",
      (RandomDesc += pattern.charAt(Math.floor(Math.random() * pattern.length)))
    );
});

//Random function for number equal to 1)
Cypress.Commands.add("RandomNum_1", () => {
  let RandomNum_1 = Math.floor(Math.random() * 10 + 1);
  Cypress.env("RandomNum_1", RandomNum_1);
});

//Random function for number equal to 2)
Cypress.Commands.add("RandomNum_2", () => {
  const RandomNum_2 = Cypress._.random(10, 99);
  Cypress.env("RandomNum_2", RandomNum_2);
});

//Random function for decimal number)
Cypress.Commands.add("randomDesimal", () => {
  let randomDesimal = Math.floor(Math.random() * (1000 - 100) + 100) / 100;
  Cypress.env("randomDesimal", randomDesimal);
});

//Random function for number equal to 5
Cypress.Commands.add("RandomNumber", () => {
  const RandomNumber = Cypress._.random(10000, 99999);
  Cypress.env("RandomNumber", RandomNumber);
});

//Random function for number(less than 10)
Cypress.Commands.add("RandomNum", () => {
  let RandomNum = "";
  var pattern = "0123456789";
  for (var i = 0; i <= 10; i++)
    Cypress.env(
      "RandomNum",
      (RandomNum += pattern.charAt(Math.floor(Math.random() * pattern.length)))
    );
});

//Random function for Boolean
Cypress.Commands.add("randomBoolean", () => {
  let booleanVAlue = Math.random() < 0.5;
  let randomBoolean = Number(booleanVAlue);
  Cypress.env("randomBoolean", randomBoolean);
});

//Random email
Cypress.Commands.add("randomEmail", () => {
  let patternEmail = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  let randomEmail = "";
  for (let k = 0; k < 10; k++) {
    randomEmail += patternEmail.charAt(
      Math.floor(Math.random() * patternEmail.length)
    );
  }
  let testEmail = randomEmail + "@gmail.com";
  Cypress.env("testEmail", testEmail);
});

//Get customer Id
Cypress.Commands.add("GetCustomerId", () => {
  cy.request({
    method: routes.post,
    url: routes.fetch_cst,
    headers: { Authorization:Cypress.env("companyToken")},
    body: {
      search: [],
      select: ["customers.id"],
      sort: "customers.id",
      orderby: "desc",
      page: "1",
      perPage: "20",
    },
  }).then(({ body }) => {
    let cstId = body.result.data.map((element: any) => element.id);
    Cypress.env("cstId", cstId[0]);
  });
});

Cypress.Commands.add("GetRetailTypeId", () => {
  cy.request({
    method: routes.post,
    url: routes.fetch_retail,
    headers: { Authorization: Cypress.env("companyToken") },
    body: {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [],
      sort: "id",
      orderby: "desc",
      page: "1",
      perPage: "20",
    },
  }).then(({ body }) => {
    let retailId = body.result.data.map((ele: any) => ele.id);
    Cypress.env("retailId", retailId[0]);
  });
});

//Get sales_person Id
Cypress.Commands.add("GetSalesPersonId", () => {
  cy.request({
    method: routes.post,
    url: routes.fetch_sales_person,
    headers: { Authorization: Cypress.env("companyToken") },
    body: {
      search: [],
      select: ["id"],
      sort: "id",
      orderby: "desc",
      page: "1",
      perPage: "20",
    },
    failOnStatusCode: false,
  }).then(({ body }) => {
    let salesId = body.result.data.map((element: any) => element.id);
    Cypress.env("salesId", salesId[0]);
    Cypress.env("salesId_1", salesId[1]);
  });
});

//Get factor Id
Cypress.Commands.add("GetFactorId", () => {
  let baseurl = Cypress.env("apiUrl");
  cy.request({
    method: routes.post,
    url: routes.fetch_factor,
    headers: {Authorization: Cypress.env("companyToken")},
    body: {
      search: [],
      select: ["id"],
      sort: "id",
      orderby: "desc",
      page: "1",
      perPage: "20",
    },
    failOnStatusCode: false,
  }).then(({ body }) => {
    let factorId = body.result.data.map((element: any) => element.id);
    Cypress.env("factorId", factorId[0]);
  });
});

//Get ship_via Id
Cypress.Commands.add("Getship_viaIdId", () => {
  cy.request({
    method: routes.post,
    url: routes.fetch_ship_via,
   headers: {Authorization: Cypress.env("companyToken")},
    body: {
      search: [],
      select: ["id"],
      sort: "id",
      orderby: "desc",
      page: "1",
      perPage: "20",
    },
  }).then(({ body }) => {
    let ship_viaId = body.result.data.map((element: any) => element.id);
    Cypress.env("ship_viaId", ship_viaId[0]);
  });
});

//Get Division Id
Cypress.Commands.add("GetDivisionId", () => {
  cy.request({
    method: routes.post,
    url: routes.fetch_division,
   headers: {Authorization: Cypress.env("companyToken")},
    body: {
      search: [],

      select: ["division.id"],
      sort: "division.id",
      orderby: "desc",
      page: "1",
      perpage: "20",
    },
  }).then(({ body }) => {
    let divisionId = body.result.data.map((element: any) => element.id);
    Cypress.env("divisionId", divisionId[0]);
  });
});

//Get season Id
Cypress.Commands.add("GetseasonId", () => {
  cy.request({
    method: routes.post,
    url: routes.post_season,
   headers: {Authorization: Cypress.env("companyToken")},
    body: {
      code: Cypress.env("Random"),
      name: Cypress.env("Random"),
      description: Cypress.env("RandomDesc"),
      status: 1,
    },
  }).then(({ body }) => {
    Cypress.env("seasonId", body.result.data.id);
  });
});

//Get group Id
Cypress.Commands.add("GetgroupId", () => {
  cy.request({
    method: routes.post,
    url: routes.post_group,
   headers: {Authorization: Cypress.env("companyToken")},
    body: {
      code: Cypress.env("Random"),
      name: Cypress.env("Random"),
      description: Cypress.env("RandomDesc"),
      status: 1,
    },
  }).then(({ body }) => {
    Cypress.env("groupId", body.result.data.id);
  });
});

//Get category Id
Cypress.Commands.add("GetcategoryId", () => {
  cy.request({
    method: routes.post,
    url: routes.post_category,
   headers: {Authorization: Cypress.env("companyToken")},
    body: {
      code: Cypress.env("Random"),
      name: Cypress.env("Random"),
      description: Cypress.env("RandomDesc"),
      type: Cypress.env("Random"),
      status: 1,
    },
  }).then(({ body }) => {
    Cypress.env("categoryId", body.result.data.id);
  });
});

//Get design Id
Cypress.Commands.add("GetdesignId", () => {
  cy.request({
    method: routes.post,
    url: routes.post_design,
   headers: {Authorization: Cypress.env("companyToken")},
    body: {
      code: Cypress.env("Random"),
      name: Cypress.env("Random"),
      description: Cypress.env("RandomDesc"),
      status: 1,
    },
  }).then(({ body }) => {
    Cypress.env("designId", body.result.data.id);
  });
});

//Get body Id
Cypress.Commands.add("GetbodyId", () => {
  cy.request({
    method: routes.post,
    url: routes.post_body,
   headers: {Authorization: Cypress.env("companyToken")},
    body: {
      code: Cypress.env("Random"),
      name: Cypress.env("Random"),
      description: Cypress.env("RandomDesc"),
      status: 1,
    },
  }).then(({ body }) => {
    Cypress.env("bodyId", body.result.data.id);
  });
});

//Get royalty Id
Cypress.Commands.add("GetroyaltyId", () => {
  cy.request({
    method: routes.post,
    url: routes.post_royalty,
   headers: {Authorization: Cypress.env("companyToken")},
    body: {
      company_name: Cypress.env("Random"),
      code: Cypress.env("Random"),
      name: Cypress.env("Random"),
      description: Cypress.env("RandomDesc"),
      amount: Cypress.env("RandomNum_2"),
      type: "P",
      status: 1,
    },
  }).then(({ body }) => {
    Cypress.env("royaltyId", body.result.data.id);
  });
});

//Get color Id
Cypress.Commands.add("GetcolorId", () => {
  cy.request({
    method: routes.post,
    url: routes.fetch_color,
   headers: {Authorization: Cypress.env("companyToken")},
    body: {
      search: [],
      select: [],
      sort: "id",
      orderby: "desc",
      page: "1",
      perPage: "20",
    },
  }).then(({ body }) => {
    let colorId = body.result.data.map((ele: any) => ele.id);
    Cypress.env("colorId", colorId[0]);
    Cypress.env("colorId_again", colorId[1]);
  });
});

//Get store Id
Cypress.Commands.add("GetstoreId", () => {
  cy.request({
    method: routes.post,
    url: `${routes.post_cst_store}${"fetch"}`,
   headers: {Authorization: Cypress.env("companyToken")},
    body: {
      search: [
        {
          key: "customer_store.status",
          operation: "=",
          val: 1
        }
      ],
      select: [],
      sort: "customer_store.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    },
  }).then(({ body }) => {
    let storeId = body.result.data.map((element: any) => element.id);
    Cypress.env("storeId", storeId[0]);
  });
});

//Get dc Id
Cypress.Commands.add("GetdcId", () => {
  cy.log(Cypress.env("cstId"));
  cy.request({
    method: routes.post,
    url: `${routes.post_dc}${"fetch"}`,
   headers: {Authorization: Cypress.env("companyToken")},
    body: {
      search: [
        {
          key: "customer_distribution_center.status",
          operation: "=",
          val: 1
        }
      ],
      select: [],
      sort: "customer_distribution_center.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    },
  }).then(({ body }) => {
    let dcId = body.result.data.map((element: any) => element.id);
    Cypress.env("dcId", dcId[0]);
  });
});

//Get term Id
Cypress.Commands.add("Get_termId", () => {
  cy.request({
    method: routes.post,
    url: routes.fetch_terms,
   headers: {Authorization: Cypress.env("companyToken")},
    body: {
      search: [],
      select: ["id"],
      sort: "id",
      orderby: "desc",
      page: "1",
      perPage: "20",
    },
  }).then(({ body }) => {
    let termId = body.result.data.map((element: any) => element.id);
    Cypress.env("termId", termId[0]);
  });
});

//Get department Id
Cypress.Commands.add("Get_deptId", () => {
  cy.request({
    method: routes.post,
    url: routes.fetch_cst_dept,
   headers: {Authorization: Cypress.env("companyToken")},
    body: {
      search: [],
      select: ["customer_department.id"],
      sort: "customer_department.id",
      orderby: "desc",
      page: "1",
      perPage: "20",
    },
  }).then(({ body }) => {
    let deptId = body.result.data.map((element: any) => element.id);
    Cypress.env("deptId", deptId[0]);
  });
});

//Get Item Id when type is I form item fetch API
Cypress.Commands.add("Get_itemId_I", () => {
  cy.request({
    method: routes.post,
    url: routes.fetch_item,
   headers: {Authorization: Cypress.env("companyToken")},
    body: {
      search: [
        {
          key: "item.type",
          operation: "=",
          val: "I",
        },
        {
          key: "item.status",
          operation: "=",
          val: "1",
        },
      ],

      select: ["item.id"],
      sort: "item.id",
      orderby: "desc",
      page: 1,
      perPage: 100,
    },
  }).then(({ body }) => {
    let ItemId_I = body.result.data.map((ele: any) => ele.id);
    Cypress.env("ItemId_I", ItemId_I[0]);
    cy.request({
      method: routes.get,
      url: `${routes.post_item}${ItemId_I[0]}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let resColorId_I = body.result.data.color_list.map(
        (elem: any) => elem.id
      );
      Cypress.env("resColorId_I", resColorId_I[0]);
    });
  });
});

//Get Item Id when type is P form item fetch API
Cypress.Commands.add("Get_itemId_P", () => {
  cy.request({
    method: routes.post,
    url: routes.fetch_item,
   headers: {Authorization: Cypress.env("companyToken")},
    body: {
      search: [
        {
          key: "item.type",
          operation: "=",
          val: "P",
        },
        {
          key: "item.status",
          operation: "=",
          val: "1",
        },
      ],
      select: ["item.id"],
      sort: "item.id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    },
  }).then(({ body }) => {
    let ItemId_P = body.result.data.map((ele: any) => ele.id);
    Cypress.env("ItemId_P", ItemId_P[0]);
    cy.request({
      method: routes.get,
      url: `${routes.post_item}${ItemId_P[0]}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let resColorId_P = body.result.data.color_list.map(
        (elem: any) => elem.id
      );
      Cypress.env("resColorId_P", resColorId_P[0]);
    });
  });
});

//Get Item Id when type is S form item fetch API
Cypress.Commands.add("Get_itemId_S", () => {
  cy.request({
    method: routes.post,
    url: routes.fetch_item,
   headers: {Authorization: Cypress.env("companyToken")},
    body: {
      search: [
        {
          key: "item.type",
          operation: "=",
          val: "S",
        },
        {
          key: "item.status",
          operation: "=",
          val: "1",
        },
      ],

      select: ["item.id"],
      sort: "item.id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    },
  }).then(({ body }) => {
    let ItemId_S = body.result.data.map((ele: any) => ele.id);
    Cypress.env("ItemId_S", ItemId_S[0]);
    cy.request({
      method: routes.get,
      url: `${routes.post_item}${ItemId_S[0]}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let ColorId_S = body.result.data.color_list.map((elem: any) => elem.id);
      Cypress.env("ColorId_S", ColorId_S[0]);
    });
  });
});

//Get vendor_id by fetch API
Cypress.Commands.add("Get_vendor_id", () => {
  cy.request({
    method: routes.post,
    url: routes.fetch_vendor,
   headers: {Authorization: Cypress.env("companyToken")},
    body: {
      search: [],
      select: ["vendor.id"],
      sort: "vendor.id",
      orderby: "desc",
      page: "1",
      perPage: "20",
    },
  }).then(({ body }) => {
    let vendor_id = body.result.data.map((ele: any) => ele.id);
    Cypress.env("vendor_id", vendor_id[0]);
  });
});

//Get statge_id by fetch API
Cypress.Commands.add("Get_stage_id", () => {
  cy.request({
    method: routes.post,
    url: routes.fetch_statge,
   headers: {Authorization: Cypress.env("companyToken")},
    body: {
      search: [],
      select: ["id"],
      sort: "id",
      orderby: "desc",
      page: "1",
      perPage: "20",
    },
  }).then(({ body }) => {
    let stage_id = body.result.data.map((ele: any) => ele.id);
    Cypress.env("stage_id", stage_id[0]);
  });
});

//Get warehouse Id by fetch API
Cypress.Commands.add("GetWarehouseId", () => {
  cy.request({
    method: routes.post,
    url: routes.fetch_warehouse,
   headers: {Authorization: Cypress.env("companyToken")},
    body: {
      search: [
        {
          key: "status",
          operation: "=",
          val: "1",
        }
      ],
      select: ["id"],
      sort: "id",
      orderby: "desc",
      page: "1",
      perPage: "20",
    },
  }).then(({ body }) => {
    let warehouseId = body.result.data.map((element: any) => element.id);
    Cypress.env("warehouseId", warehouseId[0]);
  });
});

Cypress.Commands.add("Get_PO_id", () => {
  cy.request({
    method: routes.post,
    url: routes.fetch_PO,
   headers: {Authorization: Cypress.env("companyToken")},
    body: {
      search: [
        {
          key: "import_po.status",
          operation: "=",
          val: "1",
        }
      ],
      select: ["import_po.id"],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20
    },
  }).then(({ body }) => {
    let PO = body.result.data.map((ele: any) => ele.id);
    Cypress.env("PO", PO[0]);
    cy.request({
      method: routes.get,
      url: `${routes.post_PO}${PO[0]}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let po_line_id = body.result.data.lines.map((ele: any) => ele.id);
      let po_csku_id = [];
      let variantsId = body.result.data.lines.forEach((ele: any) => {
        ele.variants.forEach((elem: any) => {
          po_csku_id.push(elem.csku_id);
        });
      });
      Cypress.env("line_id", po_line_id[0]);
      Cypress.env("line_id_1", po_line_id[1]);
      Cypress.env("csku_id", po_csku_id[0]);
      Cypress.env("csku_id1", po_csku_id[1]);
      Cypress.env("csku_id2", po_csku_id[2]);
      Cypress.env("csku_id3", po_csku_id[3]);
    });
  });
});

//Get email_id by User fetch API
Cypress.Commands.add("Get_Email_id", () => {
  let baseurl = Cypress.env("apiUrl");
  cy.request({
    method: "POST",
    url: `${baseurl}v1/users/fetch`,
   headers: {Authorization: Cypress.env("companyToken")},
    body: {
      search: [
        {
          key: "_id",
          operation: "=",
          val: resUser_id,
        },
      ],
      select: ["email_id", "user_id"],
      sort: "_id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    },
    failOnStatusCode: false,
  }).then(({ body }) => {
    let Email_id = body.result.data.map((ele: any) => ele.email_id);
    let user_id = body.result.data.map((ele: any) => ele._id);
    Cypress.env("Email_id", Email_id[0]);
    Cypress.env("user_id", user_id[0]);
  });
});

//Get email_id by Adnmin User fetch API
Cypress.Commands.add("Get_emailId", () => {
  let baseurl = Cypress.env("apiUrl");
  cy.admin_login().then(() => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/users/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [
          {
            key: "_id",
            operation: "=",
            val: Admin_userId,
          },
        ],
        select: ["email_id", "user_id"],
        sort: "_id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let emailId = body.result.data.map((ele: any) => ele.email_id);
      let userId = body.result.data.map((ele: any) => ele._id);
      Cypress.env("emailId", emailId[0]);
      Cypress.env("userId", userId[0]);
    });
  });
});

//Get role_id by role fetch API
Cypress.Commands.add("Get_Role_id", () => {
  let baseurl = Cypress.env("apiUrl");
  cy.request({
    method: "POST",
    url: `${baseurl}v1/roles/fetch`,
   headers: {Authorization: Cypress.env("companyToken")},
    body: {
      search: [],
      select: ["id"],
      sort: "id",
      orderby: "asc",
      page: "1",
      perPage: "20",
    },
  }).then(({ body }) => {
    let roleId = body.result.data.map((ele: any) => ele.id);
    Cypress.env("roleId", roleId[0]);
  });
});

// Fuction for date-formate
Cypress.Commands.add("date_formate", () => {
  let date = new Date();
  let MM = (date.getMonth() + 1).toString().padStart(2, "0");
  let DD = date.getDate().toString().padStart(2, "0");
  let YYYY = date.getFullYear();
  let date_formate = [YYYY, MM, DD].join("-");
  Cypress.env("date_formate", date_formate);
});

Cypress.Commands.add(
  "postFormData",
  (url, formData, token): Cypress.Chainable<any> => {
    return cy.wrap(
      axios(url, {
        method: routes.post,
        url: routes.csv_import,
        data: formData,
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data"
        }
      }),{timeout:30000});
  });

  Cypress.Commands.add("Get_config", (keyname:String) => {
    let baseurl = Cypress.env("apiUrl");
    cy.admin_login().then(() => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/organization/config/${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        "search": [],
        "select": [],
        "sort": "id",
        "orderby": "desc",
        "page": 1,
        "perPage": 20
      },
    }).then(({ body }) => {
      let meta_value = body.result.data.filter((ele: any) => ele.meta_name==keyname);
      Cypress.env("meta_value", meta_value.length>0?meta_value[0].meta_value:"0");
    });
  })
  });
