import store_msg from "../../support/store_msg";

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {
  let baseurl = Cypress.env("apiUrl");
  before(() => {
    cy.GetCompanyToken();
    cy.Random();
    cy.RandomNumber();
  });

  it("Test cases to get company Id", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/company/${Cypress.env("org_id")}/select/${Cypress.env(
        "company_id"
      )}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("result", body.result.data.result);
      body.result.data.menu.forEach((ele: any) => {
        expect(ele).has.property("display_name", ele.display_name);
        expect(ele).has.property("parent_menu_name", ele.parent_menu_name);
        expect(ele).has.property("parent_menu_icon", ele.parent_menu_icon);
        expect(ele).has.property("menu_icon", ele.menu_icon);
        expect(ele).has.property("link", ele.link);
        expect(ele).has.property("order", ele.order);
        expect(ele).has.property("access", ele.access);
        expect(ele.access).has.property("show_menu", ele.access.show_menu);
        expect(ele.access).has.property("read", ele.access.read);
        //expect(ele.access).has.property("update", ele.access.update);
        //expect(ele.access).has.property("create", ele.access.create);
        expect(ele).has.property("moduleName", ele.moduleName);
        expect(ele).has.property("module_id", ele.module_id);
      });
    });
  });

  //Fetch company by organization Id
  it("Test case for fetch company", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/company/${Cypress.env("org_id")}/fetch`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: Cypress.env("company_id"),
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
          "mongo_id",
          "org_id",
          "created_by",
          "updated_by",
          "status",
        ],
        sort: "id",
        orderby: "desc",
        page: "1",
        perPage: "20",
      },
      //failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((element: any) => {
        expect(element).has.property("id", element.id);
        expect(element).has.property("name", element.name);
        expect(element).has.property("address", element.address);
        expect(element).has.property("ein_cin", element.ein_cin);
        expect(element).has.property("state_id", element.state_id);
        expect(element).has.property("fax", element.fax);
        expect(element).has.property("telephone", element.telephone);
        expect(element).has.property("email", element.email);
        expect(element).has.property("mongo_id", element.mongo_id);
        expect(element).has.property("org_id", element.org_id);
        expect(element).has.property("created_by", element.created_by);
        expect(element).has.property("updated_by", element.updated_by);
        expect(element).has.property("status", element.status);
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
      url: `${baseurl}v1/company/${Cypress.env("org_id")}/fetch`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((element: any) => {
        expect(element).has.property("id", element.id);
        expect(element).has.property("name", element.name);
        expect(element).has.property("org_id", element.org_id);
        expect(element).has.property("created_by", element.created_by);
        expect(element).has.property("updated_by", element.updated_by);
        expect(element).has.property("created_date", element.created_date);
        expect(element).has.property("updated_date", element.updated_date);
        expect(element).has.property("status", element.status);
        expect(element).has.property("address", element.address);
        expect(element).has.property("ein_cin", element.ein_cin);
        expect(element).has.property("state_id", element.state_id);
        expect(element).has.property("mongo_id", element.mongo_id);
        expect(element).has.property("fax", element.fax);
        expect(element).has.property("telephone", element.telephone);
        expect(element).has.property("email", element.email);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch company when search feild are blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/company/${Cypress.env("org_id")}/fetch`,
      headers: { Authorization: Cypress.env("companyToken") },
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
          "mongo_id",
          "org_id",
          "created_by",
          "updated_by",
          "status",
        ],
        sort: "id",
        orderby: "desc",
        page: "1",
        perPage: "20",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((element: any) => {
        expect(element).has.property("id", element.id);
        expect(element).has.property("name", element.name);
        expect(element).has.property("address", element.address);
        expect(element).has.property("ein_cin", element.ein_cin);
        expect(element).has.property("state_id", element.state_id);
        expect(element).has.property("fax", element.fax);
        expect(element).has.property("telephone", element.telephone);
        expect(element).has.property("email", element.email);
        expect(element).has.property("mongo_id", element.mongo_id);
        expect(element).has.property("org_id", element.org_id);
        expect(element).has.property("created_by", element.created_by);
        expect(element).has.property("updated_by", element.updated_by);
        expect(element).has.property("status", element.status);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch company when select field are blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/company/${Cypress.env("org_id")}/fetch`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: Cypress.env("company_id"),
          },
        ],
        select: [],
        sort: "id",
        orderby: "desc",
        page: "1",
        perPage: "20",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((element: any) => {
        expect(element).has.property("id", element.id);
        expect(element).has.property("name", element.name);
        expect(element).has.property("org_id", element.org_id);
        expect(element).has.property("created_by", element.created_by);
        expect(element).has.property("updated_by", element.updated_by);
        expect(element).has.property("created_date", element.created_date);
        expect(element).has.property("updated_date", element.updated_date);
        expect(element).has.property("status", element.status);
        expect(element).has.property("address", element.address);
        expect(element).has.property("ein_cin", element.ein_cin);
        expect(element).has.property("state_id", element.state_id);
        expect(element).has.property("mongo_id", element.mongo_id);
        expect(element).has.property("fax", element.fax);
        expect(element).has.property("telephone", element.telephone);
        expect(element).has.property("email", element.email);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch company when search and select field are blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/company/${Cypress.env("org_id")}/fetch`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [],
        select: [],
        sort: "id",
        orderby: "desc",
        page: "1",
        perPage: "20",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((element: any) => {
        expect(element).has.property("id", element.id);
        expect(element).has.property("name", element.name);
        expect(element).has.property("org_id", element.org_id);
        expect(element).has.property("created_by", element.created_by);
        expect(element).has.property("updated_by", element.updated_by);
        expect(element).has.property("created_date", element.created_date);
        expect(element).has.property("updated_date", element.updated_date);
        expect(element).has.property("status", element.status);
        expect(element).has.property("address", element.address);
        expect(element).has.property("ein_cin", element.ein_cin);
        expect(element).has.property("state_id", element.state_id);
        expect(element).has.property("mongo_id", element.mongo_id);
        expect(element).has.property("fax", element.fax);
        expect(element).has.property("telephone", element.telephone);
        expect(element).has.property("email", element.email);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });
});

describe(`${store_msg.fail}${"get company token"} - ${Cypress.spec["fileName"]}`, () => {
  let baseurl = Cypress.env("apiUrl");
  it("Test cases when providing wrong/invalid organization_id", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/company/${Cypress.env("Random")}/select/${Cypress.env(
        "company_id"
      )}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("Test cases when companyId does not exist", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/company/${Cypress.env("org_id")}/select/${Cypress.env(
        "RandomNumber"
      )}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("company",`{company} not found`);
    });
  });
});

describe(`${store_msg.fail_fetch}${Cypress.spec["fileName"]}`, () => {
  let baseurl = Cypress.env("apiUrl");
  it("Test case for fetch company when org_id doesn't exist", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/company/${Cypress.env("Random")}/fetch`,
     headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "id",
            operation: "=",
            val: Cypress.env("company_id"),
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
          "mongo_id",
          "org_id",
          "created_by",
          "updated_by",
          "status",
        ],
        sort: "id",
        orderby: "desc",
        page: "1",
        perPage: "20",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));

      cy.Failure(body);
    });
  });

  it("Test case for fetch company when providing wrong input", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/company/${Cypress.env("org_id")}/fetch`,
   headers: { Authorization: Cypress.env("companyToken") },
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
          "mongo_id",
          "org_id",
          "created_by",
          "updated_by",
          "status",
        ],
        sort: "id",
        orderby: "desc",
        page: "1",
        perPage: "20",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });
});
