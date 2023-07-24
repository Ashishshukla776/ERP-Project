import routes from "../../support/route";
import store_msg from "../../support/store_msg";

let res_company_id: any;
let res_company_id_1: any;
let res_company_name: any;
let getCompany_id: Number[];
let userId
let baseurl = Cypress.env("apiUrl");

beforeEach(() => {
  cy.Random();
  cy.Random1();
  cy.RandomDesc();
  cy.RandomNum();
  cy.randomEmail();
  cy.RandomNum_2();
  cy.RandomNumber();
});

before(() => {
  cy.admin_login();
});


function AssignMultiRole(payload){
  let reqBody = [
    {
      roles: payload.hasOwnProperty("roles")?payload.roles :[1, 2],
      user_id: payload.hasOwnProperty("user_id")?payload.user_id :userId[0]
    },
    {
      roles: payload.hasOwnProperty("roles")?payload.roles :[1, 2],
      user_id: payload.hasOwnProperty("user_id")?payload.user_id :userId[1]
    }
  ]
  return reqBody
}

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {
 
  //Create company
  it("Test case for create company with all field", () => {
    cy.request({
      method: "POST",
      url: `${routes.post_company}${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("Random"),
        address: Cypress.env("RandomDesc"),
        ein_cin: Cypress.env("RandomNum"),
        state_id: Cypress.env("RandomNum"),
        fax: Cypress.env("RandomNum"),
        telephone: Cypress.env("RandomNum"),
        email: Cypress.env("testEmail"),
        status: Cypress.env("randomBoolean"),
      },
    }).then(({ body }) => {
      res_company_id = body.result.data.id;
      res_company_name = body.result.data.name;
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("data", body.result.data);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("name", body.result.data.name);
      expect(body.result.data).has.property(
        "address",
        body.result.data.address
      );
      expect(body.result.data).has.property(
        "ein_cin",
        body.result.data.ein_cin
      );
      expect(body.result.data).has.property(
        "state_id",
        body.result.data.state_id
      );
      expect(body.result.data).has.property("fax", body.result.data.fax);
      expect(body.result.data).has.property(
        "telephone",
        body.result.data.telephone
      );
      expect(body.result.data).has.property("email", body.result.data.email);
      expect(body.result.data).has.property("status", body.result.data.status);
      expect(body.result.data).has.property(
        "created_date",
        body.result.data.created_date
      );
      expect(body.result.data).has.property(
        "created_by",
        body.result.data.created_by
      );
      expect(body.result.data).has.property("org_id", body.result.data.org_id);
      expect(body.result.data).has.property(
        "mongo_id",
        body.result.data.mongo_id
      );
    });
  });

  it("Test case for create company when optional field are not provided", () => {
    cy.request({
      method: "POST",
      url: `${routes.post_company}${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("Random"),
        address: Cypress.env("RandomDesc"),
        ein_cin: Cypress.env("RandomNum"),
        state_id: Cypress.env("RandomNum"),
        fax: Cypress.env("RandomNum"),
        telephone: Cypress.env("RandomNum"),
        email: Cypress.env("testEmail")
      },
    }).then(({ body }) => {
      res_company_id_1 = body.result.data.id;
      // res_company_name = body.result.data.name;
      cy.log(JSON.stringify(body));
     cy.Success(body);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("name", body.result.data.name);
      expect(body.result.data).has.property(
        "address",
        body.result.data.address
      );
      expect(body.result.data).has.property(
        "ein_cin",
        body.result.data.ein_cin
      );
      expect(body.result.data).has.property(
        "state_id",
        body.result.data.state_id
      );
      expect(body.result.data).has.property("fax", body.result.data.fax);
      expect(body.result.data).has.property(
        "telephone",
        body.result.data.telephone
      );
      expect(body.result.data).has.property("email", body.result.data.email);
      expect(body.result.data).has.property("status", body.result.data.status);
      expect(body.result.data).has.property(
        "created_date",
        body.result.data.created_date
      );
      expect(body.result.data).has.property(
        "created_by",
        body.result.data.created_by
      );
      expect(body.result.data).has.property("org_id", body.result.data.org_id);
      expect(body.result.data).has.property(
        "mongo_id",
        body.result.data.mongo_id
      );
    });
  });

  it("Test case for update API when do not provide any field", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/company/${Cypress.env(
        "org_id"
      )}/${res_company_id}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
    });
  });

  it("Test case for update company", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/company/${Cypress.env(
        "org_id"
      )}/${res_company_id}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: res_company_name,
        address: Cypress.env("Random"),
        ein_cin: Cypress.env("RandomNum"),
        state_id: Cypress.env("RandomNum"),
        fax: Cypress.env("RandomNum"),
        telephone: Cypress.env("RandomNum"),
        email: Cypress.env("testEmail"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("data", body.result.data);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("name", body.result.data.name);
      expect(body.result.data).has.property(
        "address",
        body.result.data.address
      );
      expect(body.result.data).has.property(
        "ein_cin",
        body.result.data.ein_cin
      );
      expect(body.result.data).has.property(
        "state_id",
        body.result.data.state_id
      );
      expect(body.result.data).has.property("fax", body.result.data.fax);
      expect(body.result.data).has.property(
        "telephone",
        body.result.data.telephone
      );
      expect(body.result.data).has.property("email", body.result.data.email);
      expect(body.result.data).has.property(
        "mongo_id",
        body.result.data.mongo_id
      );
      expect(body.result.data).has.property(
        "created_date",
        body.result.data.created_date
      );
      expect(body.result.data).has.property(
        "created_by",
        body.result.data.created_by
      );
      expect(body.result.data).has.property("org_id", body.result.data.org_id);
      expect(body.result.data).has.property(
        "updated_by",
        body.result.data.updated_by
      );
      expect(body.result.data).has.property(
        "updated_date",
        body.result.data.updated_date
      );
      expect(body.result.data).has.property("status", body.result.data.status);
    });
  });

  //Fetch company by organization Id
  it("Test case for fetch company", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: res_company_id,
          },
        ],
        select: [
          "id",
          "name",
          "address",
          "ein_cin",
          "state_id",
          "fax",
          "telephone",
          "email",
          "status",
        ],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("data", body.result.data);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("name", ele.name);
        expect(ele).has.property("address", ele.address);
        expect(ele).has.property("ein_cin", ele.ein_cin);
        expect(ele).has.property("state_id", ele.state_id);
        expect(ele).has.property("fax", ele.fax);
        expect(ele).has.property("telephone", ele.telephone);
        expect(ele).has.property("email", ele.email);
        expect(ele).has.property("status", ele.status);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch company when do not provide any fields", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("data", body.result.data);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("name", ele.name);
        expect(ele).has.property("org_id", ele.org_id);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("address", ele.address);
        expect(ele).has.property("ein_cin", ele.ein_cin);
        expect(ele).has.property("state_id", ele.state_id);
        expect(ele).has.property("mongo_id", ele.mongo_id);
        expect(ele).has.property("fax", ele.fax);
        expect(ele).has.property("telephone", ele.telephone);
        expect(ele).has.property("email", ele.email);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch company when search fields are blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [],
        select: [
          "id",
          "name",
          "address",
          "ein_cin",
          "state_id",
          "fax",
          "telephone",
          "email",
          "status",
        ],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("data", body.result.data);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("name", ele.name);
        expect(ele).has.property("address", ele.address);
        expect(ele).has.property("ein_cin", ele.ein_cin);
        expect(ele).has.property("state_id", ele.state_id);
        expect(ele).has.property("fax", ele.fax);
        expect(ele).has.property("telephone", ele.telephone);
        expect(ele).has.property("email", ele.email);
        expect(ele).has.property("status", ele.status);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch company when search and select fields are blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [],
        select: [],
        sort: "id",
        orderby: "asc",
        page: 1,
        perPage: 20,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      getCompany_id = body.result.data.map((ele: any) => ele.id);
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("data", body.result.data);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("name", ele.name);
        expect(ele).has.property("org_id", ele.org_id);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("address", ele.address);
        expect(ele).has.property("ein_cin", ele.ein_cin);
        expect(ele).has.property("state_id", ele.state_id);
        expect(ele).has.property("mongo_id", ele.mongo_id);
        expect(ele).has.property("fax", ele.fax);
        expect(ele).has.property("telephone", ele.telephone);
        expect(ele).has.property("email", ele.email);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch company when only select fields are blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: res_company_id,
          },
        ],
        select: [],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("data", body.result.data);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("name", ele.name);
        expect(ele).has.property("org_id", ele.org_id);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("address", ele.address);
        expect(ele).has.property("ein_cin", ele.ein_cin);
        expect(ele).has.property("state_id", ele.state_id);
        expect(ele).has.property("mongo_id", ele.mongo_id);
        expect(ele).has.property("fax", ele.fax);
        expect(ele).has.property("telephone", ele.telephone);
        expect(ele).has.property("email", ele.email);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  // Get company user list by company id and organization Id
  it("Test case to get list of companies assigned to users by org_id and company_id", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}/${
        getCompany_id[0]
      }/company-user-list`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });

  // Manage company pdf layouts
  it("Test case for manage company pdf layouts", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}/${Cypress.env(
        "layout_copm"
      )}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("layout_name"),
        type: Cypress.env("layout_type"),
        status: 1,
      },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("name");
      expect(body.result.data).has.property("type");
      expect(body.result.data).has.property("status");
    });
  });

  it("Test case for assign role for multiple users ", () => {

    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/users/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [],
        select: ["email_id", "user_id"],
        sort: "_id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
       userId = body.result.data.map((ele: any) => ele._id);
    
      cy.request({
        method: "POST",
        url: `${routes.post_company}${Cypress.env("org_id")}/${res_company_id}/assign-users/`,
        headers: {
          Authorization: "Bearer " + Cypress.env("authToken"),
        },
        body:AssignMultiRole({})
      }).then(({ body }) => {
        expect(body).has.property("statusCode", 200);
        expect(body).has.property("success", true);
        expect(body).has.property("error", null);
        expect(body).has.property("result");
        expect(body.result).has.property("message");
      })
    });
  });

});

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {
  it("Test case when wrong orginization id is provided", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("Random")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("Random"),
        address: Cypress.env("RandomDesc"),
        ein_cin: Cypress.env("RandomNum"),
        state_id: Cypress.env("RandomNum"),
        fax: Cypress.env("RandomNum"),
        telephone: Cypress.env("RandomNum"),
        email: Cypress.env("testEmail"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("Company name should be Unique for a organization", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: res_company_name,
        address: Cypress.env("RandomDesc"),
        ein_cin: Cypress.env("RandomNum"),
        state_id: Cypress.env("RandomNum"),
        fax: Cypress.env("RandomNum"),
        telephone: Cypress.env("RandomNum"),
        email: Cypress.env("testEmail"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("Test case when do not provide required fields", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body.error.errorDetails).has.property(
        "name",
        body.error.errorDetails.name
      );
      expect(body.error.errorDetails).has.property(
        "address",
        body.error.errorDetails.address
      );
      expect(body.error.errorDetails).has.property(
        "ein_cin",
        body.error.errorDetails.ein_cin
      );
      expect(body.error.errorDetails).has.property(
        "state_id",
        body.error.errorDetails.state_id
      );
      expect(body.error.errorDetails).has.property(
        "fax",
        body.error.errorDetails.fax
      );
      expect(body.error.errorDetails).has.property(
        "telephone",
        body.error.errorDetails.telephone
      );
      expect(body.error.errorDetails).has.property(
        "email",
        body.error.errorDetails.email
      );
    });
  });

  it("Test case when required body are empty", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: "",
        address: "",
        ein_cin: "",
        state_id: "",
        fax: "",
        telephone: "",
        email: "",
        status: "",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body.error.errorDetails).has.property(
        "name",
        body.error.errorDetails.name
      );
      expect(body.error.errorDetails).has.property(
        "address",
        body.error.errorDetails.address
      );
      expect(body.error.errorDetails).has.property(
        "ein_cin",
        body.error.errorDetails.ein_cin
      );
      expect(body.error.errorDetails).has.property(
        "state_id",
        body.error.errorDetails.state_id
      );
      expect(body.error.errorDetails).has.property(
        "fax",
        body.error.errorDetails.fax
      );
      expect(body.error.errorDetails).has.property(
        "telephone",
        body.error.errorDetails.telephone
      );
      expect(body.error.errorDetails).has.property(
        "email",
        body.error.errorDetails.email
      );
      expect(body.error.errorDetails).has.property(
        "status",
        body.error.errorDetails.status
      );
    });
  });

  it("name, address, ein_cin, state_id, fax, telephone, email should be string", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("RandomNumber"),
        address: Cypress.env("RandomNumber"),
        ein_cin: Cypress.env("RandomNumber"),
        state_id: Cypress.env("RandomNumber"),
        fax: Cypress.env("RandomNumber"),
        telephone: Cypress.env("RandomNumber"),
        email: Cypress.env("RandomNumber"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body.error.errorDetails).has.property(
        "name",
        body.error.errorDetails.name
      );
      expect(body.error.errorDetails).has.property(
        "address",
        body.error.errorDetails.address
      );
      expect(body.error.errorDetails).has.property(
        "ein_cin",
        body.error.errorDetails.ein_cin
      );
      expect(body.error.errorDetails).has.property(
        "state_id",
        body.error.errorDetails.state_id
      );
      expect(body.error.errorDetails).has.property(
        "fax",
        body.error.errorDetails.fax
      );
      expect(body.error.errorDetails).has.property(
        "telephone",
        body.error.errorDetails.telephone
      );
      expect(body.error.errorDetails).has.property(
        "email",
        body.error.errorDetails.email
      );
    });
  });

  it("status should be number", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("Random1"),
        address: Cypress.env("RandomDesc"),
        ein_cin: Cypress.env("RandomNum"),
        state_id: Cypress.env("RandomNum"),
        fax: Cypress.env("RandomNum"),
        telephone: Cypress.env("RandomNum"),
        email: Cypress.env("testEmail"),
        status: Cypress.env("RandomNum"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body.error.errorDetails).has.property(
        "status",
        body.error.errorDetails.status
      );
    });
  });

  it("status must be one of [0 and 1]", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("Random1"),
        address: Cypress.env("RandomDesc"),
        ein_cin: Cypress.env("RandomNum"),
        state_id: Cypress.env("RandomNum"),
        fax: Cypress.env("RandomNum"),
        telephone: Cypress.env("RandomNum"),
        email: Cypress.env("testEmail"),
        status: Cypress.env("RandomNum_2"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body.error.errorDetails).has.property(
        "status",
        body.error.errorDetails.status
      );
    });
  });

  it("email should be valid email", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("Random1"),
        address: Cypress.env("RandomDesc"),
        ein_cin: Cypress.env("RandomNum"),
        state_id: Cypress.env("RandomNum"),
        fax: Cypress.env("RandomNum"),
        telephone: Cypress.env("RandomNum"),
        email: Cypress.env("Random"),
        status: Cypress.env("RandomNum_2"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body.error.errorDetails).has.property(
        "email",
        body.error.errorDetails.email
      );
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {
  it("Test case when wrong orginization id is provided", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/company/${Cypress.env(
        "Random"
      )}/${res_company_id}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("Random"),
        address: Cypress.env("RandomDesc"),
        ein_cin: Cypress.env("RandomNum"),
        state_id: Cypress.env("RandomNum"),
        fax: Cypress.env("RandomNum"),
        telephone: Cypress.env("RandomNum"),
        email: Cypress.env("testEmail"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("Test case when company_id does not exist", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}/${Cypress.env(
        "RandomNumber"
      )}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: res_company_name,
        address: Cypress.env("RandomDesc"),
        ein_cin: Cypress.env("RandomNum"),
        state_id: Cypress.env("RandomNum"),
        fax: Cypress.env("RandomNum"),
        telephone: Cypress.env("RandomNum"),
        email: Cypress.env("testEmail"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("Test case when required body are empty", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/company/${Cypress.env(
        "org_id"
      )}/${res_company_id}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: "",
        address: "",
        ein_cin: "",
        state_id: "",
        fax: "",
        telephone: "",
        email: "",
        status: "",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body.error.errorDetails).has.property(
        "name",
        body.error.errorDetails.name
      );
      expect(body.error.errorDetails).has.property(
        "address",
        body.error.errorDetails.address
      );
      expect(body.error.errorDetails).has.property(
        "ein_cin",
        body.error.errorDetails.ein_cin
      );
      expect(body.error.errorDetails).has.property(
        "state_id",
        body.error.errorDetails.state_id
      );
      expect(body.error.errorDetails).has.property(
        "fax",
        body.error.errorDetails.fax
      );
      expect(body.error.errorDetails).has.property(
        "telephone",
        body.error.errorDetails.telephone
      );
      expect(body.error.errorDetails).has.property(
        "email",
        body.error.errorDetails.email
      );
      expect(body.error.errorDetails).has.property(
        "status",
        body.error.errorDetails.status
      );
    });
  });

  it("name, address, ein_cin, state_id, fax, telephone, email should be string", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/company/${Cypress.env(
        "org_id"
      )}/${res_company_id}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("RandomNumber"),
        address: Cypress.env("RandomNumber"),
        ein_cin: Cypress.env("RandomNumber"),
        state_id: Cypress.env("RandomNumber"),
        fax: Cypress.env("RandomNumber"),
        telephone: Cypress.env("RandomNumber"),
        email: Cypress.env("RandomNumber"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body.error.errorDetails).has.property(
        "name",
        body.error.errorDetails.name
      );
      expect(body.error.errorDetails).has.property(
        "address",
        body.error.errorDetails.address
      );
      expect(body.error.errorDetails).has.property(
        "ein_cin",
        body.error.errorDetails.ein_cin
      );
      expect(body.error.errorDetails).has.property(
        "state_id",
        body.error.errorDetails.state_id
      );
      expect(body.error.errorDetails).has.property(
        "fax",
        body.error.errorDetails.fax
      );
      expect(body.error.errorDetails).has.property(
        "telephone",
        body.error.errorDetails.telephone
      );
      expect(body.error.errorDetails).has.property(
        "email",
        body.error.errorDetails.email
      );
    });
  });

  it("status should be number", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/company/${Cypress.env(
        "org_id"
      )}/${res_company_id}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("Random1"),
        address: Cypress.env("RandomDesc"),
        ein_cin: Cypress.env("RandomNum"),
        state_id: Cypress.env("RandomNum"),
        fax: Cypress.env("RandomNum"),
        telephone: Cypress.env("RandomNum"),
        email: Cypress.env("testEmail"),
        status: Cypress.env("RandomNum"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body.error.errorDetails).has.property(
        "status",
        body.error.errorDetails.status
      );
    });
  });

  it("status must be one of [0 and 1]", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/company/${Cypress.env(
        "org_id"
      )}/${res_company_id}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("Random1"),
        address: Cypress.env("RandomDesc"),
        ein_cin: Cypress.env("RandomNum"),
        state_id: Cypress.env("RandomNum"),
        fax: Cypress.env("RandomNum"),
        telephone: Cypress.env("RandomNum"),
        email: Cypress.env("testEmail"),
        status: Cypress.env("RandomNum_2"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body.error.errorDetails).has.property(
        "status",
        body.error.errorDetails.status
      );
    });
  });

  it("email should be valid email", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/company/${Cypress.env(
        "org_id"
      )}/${res_company_id}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("Random1"),
        address: Cypress.env("RandomDesc"),
        ein_cin: Cypress.env("RandomNum"),
        state_id: Cypress.env("RandomNum"),
        fax: Cypress.env("RandomNum"),
        telephone: Cypress.env("RandomNum"),
        email: Cypress.env("Random"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body.error.errorDetails).has.property(
        "email",
        body.error.errorDetails.email
      );
    });
  });
});

describe(`${store_msg.fail_fetch}${Cypress.spec["fileName"]}`, () => {
  it("Test case for fetch company when providing wrong/invalid input", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: Cypress.env("RandomNumber"),
          },
        ],
        select: [
          "id",
          "name",
          "address",
          "ein_cin",
          "state_id",
          "fax",
          "telephone",
          "email",
          "status",
        ],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("data", body.result.data);
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch company when providing wrong org_id", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("Random")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: res_company_id,
          },
        ],
        select: [
          "id",
          "name",
          "address",
          "ein_cin",
          "state_id",
          "fax",
          "telephone",
          "email",
          "status",
        ],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error", body.error);
      expect(body).has.property("error", body.error);
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "org_id",
        body.error.errorDetails.org_id
      );
    });
  });
});

describe(`${store_msg.fail_get}${"company-user-list API"} - ${Cypress.spec["fileName"]}`, () => {
  it("Test case for company-user-list when company is not assign to any user", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}/${res_company_id_1}/company-user-list`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("Test case when providing wrong org_id", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/admin/company/${Cypress.env(
        "Random"
      )}/${res_company_id}/company-user-list`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("Test case when company id doesn't exist", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}/${Cypress.env(
        "RandomNumber"
      )}/company-user-list`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });
});

describe(`${store_msg.fail_post}${"manage company layouts-list"} - ${Cypress.spec["fileName"]}`, () => {
  it("Test case when org_id is invalid", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("Random")}/${Cypress.env(
        "layout_copm"
      )}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("layout_name"),
        type: Cypress.env("layout_type"),
        status: 1,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it("Test case when company_id is invalid", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}/${Cypress.env(
        "RandomNumber"
      )}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("layout_name"),
        type: Cypress.env("layout_type"),
        status: 1,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it("Test case when required field is not provided", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}/${Cypress.env(
        "layout_copm"
      )}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("name");
      expect(body.error.errorDetails).has.property("type");
    });
  });

  it("Test case when required field is left blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}/${Cypress.env(
        "layout_copm"
      )}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: "",
        type: "",
        status: 1,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("name");
      expect(body.error.errorDetails).has.property("type");
    });
  });

  it("type must be define like [SO, PT]", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}/${Cypress.env(
        "layout_copm"
      )}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("layout_name"),
        type: Cypress.env("Random"),
        status: 1,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("type");
    });
  });

  it("layout_name must be exist", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}/${Cypress.env(
        "layout_copm"
      )}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("Random"),
        type: Cypress.env("layout_type"),
        status: 1,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("name");
    });
  });

  it("layout_name and type must be String", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}/${Cypress.env(
        "layout_copm"
      )}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("RandomNumber"),
        type: Cypress.env("RandomNumber"),
        status: 1,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("name");
      expect(body.error.errorDetails).has.property("type");
    });
  });

  it("status must be Number", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}/${Cypress.env(
        "layout_copm"
      )}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("layout_name"),
        type: Cypress.env("layout_type"),
        status: Cypress.env("RandomNum"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("status must be one of [0 or 1]", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}/${Cypress.env(
        "layout_copm"
      )}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        name: Cypress.env("layout_name"),
        type: Cypress.env("layout_type"),
        status: Cypress.env("RandomNumber"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });
});

describe(`${store_msg.fail}${"assign role for multiple users"} - ${Cypress.spec["fileName"]}`, () => {

  it("Test case when org_id is invalid", () => {
    cy.request({
      method: "POST",
      url: `${routes.post_company}${Cypress.env("Random")}/${res_company_id}/assign-users/`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body:AssignMultiRole({}),
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("org_id");
    });
  });

  it("Test case when company_id is invalid", () => {
    cy.request({
      method: "POST",
      url: `${routes.post_company}${Cypress.env("org_id")}/${Cypress.env("RandomNumber")}/assign-users/`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body:AssignMultiRole({}),
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("company_id");
    });
  });

  it("Test case when role_id is invalid", () => {
    cy.request({
      method: "POST",
      url: `${routes.post_company}${Cypress.env("org_id")}/${res_company_id}/assign-users/`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body:AssignMultiRole({
        roles:[Cypress.env("RandomNumber")]
      }),
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "role",`{role} is invalid`);
    });
  });

  it("Test case when user_id is invalid", () => {
    cy.request({
      method: "POST",
      url: `${routes.post_company}${Cypress.env("org_id")}/${res_company_id}/assign-users/`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body:AssignMultiRole({
        user_id:Cypress.env("RandomNum")
      }),
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("user_id");    
    });
  });

  it("Test case when required field left blank", () => {
    cy.request({
      method: "POST",
      url: `${routes.post_company}${Cypress.env("org_id")}/${res_company_id}/assign-users/`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body:AssignMultiRole({
        roles:"",
        user_id:""
      }),
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("roles");
      expect(body.error.errorDetails).has.property("user_id");    
    });
  });

  it("Test case when not providing any field", () => {
    cy.request({
      method: "POST",
      url: `${routes.post_company}${Cypress.env("org_id")}/${res_company_id}/assign-users/`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body:[],
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("roles");
      expect(body.error.errorDetails).has.property("user_id");       
    });
  });

  it("Test case when not providing any object in array", () => {
    cy.request({
      method: "POST",
      url: `${routes.post_company}${Cypress.env("org_id")}/${res_company_id}/assign-users/`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body:[{}],
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("roles");
      expect(body.error.errorDetails).has.property("user_id");
    });
  });

  it("role_id must be number", () => {
    cy.request({
      method: "POST",
      url: `${routes.post_company}${Cypress.env("org_id")}/${res_company_id}/assign-users/`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body:AssignMultiRole({
        roles:["1"]
      }),
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("role_id");
    });
  });

  it("user_id must be string", () => {
    cy.request({
      method: "POST",
      url: `${routes.post_company}${Cypress.env("org_id")}/${res_company_id}/assign-users/`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body:AssignMultiRole({
        user_id:Cypress.env("RandomNumber")
      }),
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("user_id");    
    });
  });
})
