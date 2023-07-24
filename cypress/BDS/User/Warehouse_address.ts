import routes from "../../support/route";
import store_msg from "../../support/store_msg";
let warehouse_addr_id: Number;

before(() => {
  cy.GetCompanyToken();
  cy.GetWarehouseId();
  cy.Random();
  cy.randomBoolean();
  cy.RandomNum();
  cy.RandomNumber();
});

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {

  it("Test cases for create API", () => {
    let requestData = {
      contact_name: Cypress.env("Random"),
      type: Cypress.env("Random"),
      address_1: Cypress.env("Random"),
      address_2: Cypress.env("Random"),
      address_3: Cypress.env("Random"),
      address_4: Cypress.env("Random"),
      city: Cypress.env("Random"),
      state: Cypress.env("Random"),
      zip: Cypress.env("Random"),
      country: Cypress.env("Random"),
      status: Cypress.env("randomBoolean"),
      warehouse_id: Cypress.env("warehouseId")
    };
    cy.request({
      method: routes.post, body: requestData,
      url: routes.post_warehouse_address,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      warehouse_addr_id = body.result.data.id;
      expect(requestData).has.property("warehouse_id");
      cy.Success(body);
      expect(body.result.data).has.property("is_verified");
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property(
        "contact_name",requestData.contact_name).to.be.string;
      expect(body.result.data).has.property(
        "type", requestData.type).to.be.string;
      expect(body.result.data).has.property(
        "address_1", requestData.address_1).to.be.string;
      expect(body.result.data).has.property(
        "address_2", requestData.address_2).to.be.string;
      expect(body.result.data).has.property(
        "address_3", requestData.address_3).to.be.string;
      expect(body.result.data).has.property(
        "address_4", requestData.address_4).to.be.string;
      expect(body.result.data).has.property(
        "city", requestData.city).to.be.string;
      expect(body.result.data).has.property(
        "state", requestData.state).to.be.string;
      expect(body.result.data).has.property(
        "zip", requestData.zip).to.be.string;
      expect(body.result.data).has.property(
        "country", requestData.country).to.be.string;
      expect(body.result.data).has.property("status", requestData.status);
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
    });
  });

  it("Test cases for create API when not providing optional field", () => {
    let requestData = {
      contact_name: Cypress.env("Random"),
      type: Cypress.env("Random"),
      address_1: Cypress.env("Random"),
      city: Cypress.env("Random"),
      state: Cypress.env("Random"),
      zip: Cypress.env("Random"),
      country: Cypress.env("Random"),
      warehouse_id: Cypress.env("warehouseId"),
    };
    cy.request({
      method: routes.post, body: requestData,
      url: routes.post_warehouse_address,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(requestData).has.property("warehouse_id");
      cy.Success(body);
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("is_verified");
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property(
        "contact_name",requestData.contact_name).to.be.string;
      expect(body.result.data).has.property(
        "type", requestData.type).to.be.string;
      expect(body.result.data).has.property(
        "address_1", requestData.address_1).to.be.string;
      expect(body.result.data).has.property(
        "city", requestData.city).to.be.string;
      expect(body.result.data).has.property(
        "state", requestData.state).to.be.string;
      expect(body.result.data).has.property(
        "zip", requestData.zip).to.be.string;
      expect(body.result.data).has.property(
        "country", requestData.country).to.be.string;
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
    });
  });

  it("Test cases for create API when optional fields are null", () => {
    let requestData = {
      contact_name: Cypress.env("Random"),
      type: Cypress.env("Random"),
      address_1: Cypress.env("Random"),
      address_2: null,
      address_3: null,
      address_4: null,
      city: Cypress.env("Random"),
      state: Cypress.env("Random"),
      zip: Cypress.env("Random"),
      country: Cypress.env("Random"),
      status: Cypress.env("randomBoolean"),
      warehouse_id: Cypress.env("warehouseId"),
    };
    cy.request({
      method: routes.post,
      url: routes.post_warehouse_address,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(requestData).has.property("warehouse_id");
      cy.Success(body);
      expect(body.result.data).has.property("is_verified");
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property(
        "contact_name",requestData.contact_name).to.be.string;
      expect(body.result.data).has.property(
        "type", requestData.type).to.be.string;
      expect(body.result.data).has.property(
        "address_1", requestData.address_1).to.be.string;
      expect(body.result.data).has.property(
        "address_2", requestData.address_2).to.be.string;
      expect(body.result.data).has.property(
        "address_3", requestData.address_3).to.be.string;
      expect(body.result.data).has.property(
        "address_4", requestData.address_4).to.be.string;
      expect(body.result.data).has.property(
        "city", requestData.city).to.be.string;
      expect(body.result.data).has.property(
        "state", requestData.state).to.be.string;
      expect(body.result.data).has.property(
        "zip", requestData.zip).to.be.string;
      expect(body.result.data).has.property(
        "country", requestData.country).to.be.string;
      expect(body.result.data).has.property("status", requestData.status);
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
    });
  });

  it("Test cases for create API when optional fields are blank", () => {
    let requestData = {
      contact_name: Cypress.env("Random"),
      type: Cypress.env("Random"),
      address_1: Cypress.env("Random"),
      address_2: "",
      address_3: "",
      address_4: "",
      city: Cypress.env("Random"),
      state: Cypress.env("Random"),
      zip: Cypress.env("Random"),
      country: Cypress.env("Random"),
      status: Cypress.env("randomBoolean"),
      warehouse_id: Cypress.env("warehouseId"),
    };
    cy.request({
      method: routes.post,
      url: routes.post_warehouse_address,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(requestData).has.property("warehouse_id");
      cy.Success(body);
      expect(body.result.data).has.property("is_verified");
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property(
        "contact_name",requestData.contact_name).to.be.string;
      expect(body.result.data).has.property(
        "type", requestData.type).to.be.string;
      expect(body.result.data).has.property(
        "address_1", requestData.address_1).to.be.string;
      expect(body.result.data).has.property(
        "address_2", requestData.address_2).to.be.string;
      expect(body.result.data).has.property(
        "address_3", requestData.address_3).to.be.string;
      expect(body.result.data).has.property(
        "address_4", requestData.address_4).to.be.string;
      expect(body.result.data).has.property(
        "city", requestData.city).to.be.string;
      expect(body.result.data).has.property(
        "state", requestData.state).to.be.string;
      expect(body.result.data).has.property(
        "zip", requestData.zip).to.be.string;
      expect(body.result.data).has.property(
        "country", requestData.country).to.be.string;
      expect(body.result.data).has.property("status", requestData.status);
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {

  it("Test cases When not providing any field", () => {
    
    cy.request({
      method: routes.put, body: {},
      url: `${routes.post_warehouse_address}${warehouse_addr_id}`,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("contact_name");
      expect(body.result.data).has.property("type");
      expect(body.result.data).has.property("address_1");
      expect(body.result.data).has.property("address_2");
      expect(body.result.data).has.property("address_3");
      expect(body.result.data).has.property("address_4");
      expect(body.result.data).has.property("city");
      expect(body.result.data).has.property("state");
      expect(body.result.data).has.property("zip");
      expect(body.result.data).has.property("country");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property("verification_source");
      expect(body.result.data).has.property("is_verified");
      expect(body.result.data).has.property("verified_date");
      expect(body.result.data).has.property("verified_by");
    });
  });

  it("Test cases When not providing optional fields", () => {
    let requestData = {
      contact_name: Cypress.env("Random"),
      type: Cypress.env("Random"),
      address_1: Cypress.env("Random"),
      city: Cypress.env("Random"),
      state: Cypress.env("Random"),
      zip: Cypress.env("Random"),
      country: Cypress.env("Random"),
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_address}${warehouse_addr_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("is_verified");
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property(
        "contact_name",requestData.contact_name)
      expect(body.result.data).has.property(
        "type", requestData.type)
      expect(body.result.data).has.property(
        "address_1", requestData.address_1)
      expect(body.result.data).has.property("address_2")
      expect(body.result.data).has.property("address_3")
      expect(body.result.data).has.property("address_4")
      expect(body.result.data).has.property(
        "city", requestData.city)
      expect(body.result.data).has.property(
        "state", requestData.state)
      expect(body.result.data).has.property(
        "zip", requestData.zip)
      expect(body.result.data).has.property(
        "country", requestData.country)
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property("verification_source");
      expect(body.result.data).has.property("is_verified");
      expect(body.result.data).has.property("verified_date");
      expect(body.result.data).has.property("verified_by");
    });
  });

  it("Test cases When optional fields are null and not provided required field", () => {
    let requestData = {
      address_2: null,
      address_3: null,
      address_4: null
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_address}${warehouse_addr_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("is_verified");
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("contact_name")
      expect(body.result.data).has.property("type")
      expect(body.result.data).has.property("address_1")
      expect(body.result.data).has.property(
        "address_2", requestData.address_2)
      expect(body.result.data).has.property(
        "address_3", requestData.address_3)
      expect(body.result.data).has.property(
        "address_4", requestData.address_4)
      expect(body.result.data).has.property("city")
      expect(body.result.data).has.property("state")
      expect(body.result.data).has.property("zip")
      expect(body.result.data).has.property("country")
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property("verification_source");
      expect(body.result.data).has.property("is_verified");
      expect(body.result.data).has.property("verified_date");
      expect(body.result.data).has.property("verified_by");
    });
  });

  it("Test cases When optional fields are blank", () => {
    let requestData = {
      address_2: "",
      address_3: "",
      address_4: ""
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_address}${warehouse_addr_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("is_verified");
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("contact_name")
      expect(body.result.data).has.property("type")
      expect(body.result.data).has.property("address_1")
      expect(body.result.data).has.property(
        "address_2", requestData.address_2)
      expect(body.result.data).has.property(
        "address_3", requestData.address_3)
      expect(body.result.data).has.property(
        "address_4", requestData.address_4)
      expect(body.result.data).has.property("city")
      expect(body.result.data).has.property("state")
      expect(body.result.data).has.property("zip")
      expect(body.result.data).has.property("country")
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property("verification_source");
      expect(body.result.data).has.property("is_verified");
      expect(body.result.data).has.property("verified_date");
      expect(body.result.data).has.property("verified_by");
    });
  });

  it("Test case for update API with all field", () => {
    let requestData = {
      contact_name: Cypress.env("Random"),
      type: Cypress.env("Random"),
      address_1: Cypress.env("Random"),
      address_2: Cypress.env("Random"),
      address_3: Cypress.env("Random"),
      address_4: Cypress.env("Random"),
      city: Cypress.env("Random"),
      state: Cypress.env("Random"),
      zip: Cypress.env("Random"),
      country: Cypress.env("Random"),
      status: Cypress.env("randomBoolean")
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_address}${warehouse_addr_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("is_verified");
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property(
        "contact_name",requestData.contact_name).to.be.string;
      expect(body.result.data).has.property(
        "type", requestData.type).to.be.string;
      expect(body.result.data).has.property(
        "address_1", requestData.address_1).to.be.string;
      expect(body.result.data).has.property(
        "address_2", requestData.address_2).to.be.string;
      expect(body.result.data).has.property(
        "address_3", requestData.address_3).to.be.string;
      expect(body.result.data).has.property(
        "address_4", requestData.address_4).to.be.string;
      expect(body.result.data).has.property(
        "city", requestData.city).to.be.string;
      expect(body.result.data).has.property(
        "state", requestData.state).to.be.string;
      expect(body.result.data).has.property(
        "zip", requestData.zip).to.be.string;
      expect(body.result.data).has.property(
        "country", requestData.country).to.be.string;
      expect(body.result.data).has.property("status", requestData.status);
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property("verification_source");
      expect(body.result.data).has.property("is_verified");
      expect(body.result.data).has.property("verified_date");
      expect(body.result.data).has.property("verified_by");
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {

  it("Test case for fetch API", () => {
    let requestData = {
      search: [
        {
          key: "address.id",
          operation: "=",
          val: warehouse_addr_id
        }
      ],
      searchOr: [
        {
          key: "address.id",
          operation: "=",
          val: warehouse_addr_id
        }
      ],
      searchOrAnd: [
        {
          key: "address.id",
          operation: "=",
          val: warehouse_addr_id
        }
      ],
      select: [
        "address.id",
        "address.contact_name",
        "address.type",
        "address.address_1",
        "address.city",
        "address.state",
        "address.zip",
        "address.country",
        "address.status",
        "warehouse.id as warehouse_id",
        "warehouse.code"
      ],
      sort: "address.id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_warehouse_address,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      body.result.data.forEach((ele: any, index: any) => {
        expect(ele).has.property("id", requestData.search[index].val);
        expect(ele).has.property("contact_name");
        expect(ele).has.property("type");
        expect(ele).has.property("address_1");
        expect(ele).has.property("city");
        expect(ele).has.property("state");
        expect(ele).has.property("zip");
        expect(ele).has.property("country");
        expect(ele).has.property("status");
        expect(ele).has.property("warehouse_id");
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
      url: routes.fetch_warehouse_address,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("contact_name", ele.contact_name);
        expect(ele).has.property("type", ele.type);
        expect(ele).has.property("address_1", ele.address_1);
        expect(ele).has.property("address_2", ele.address_2);
        expect(ele).has.property("address_3", ele.address_3);
        expect(ele).has.property("address_4", ele.address_4);
        expect(ele).has.property("city", ele.city);
        expect(ele).has.property("state", ele.state);
        expect(ele).has.property("zip", ele.zip);
        expect(ele).has.property("country", ele.country);
        expect(ele).has.property("warehouse_id", ele.warehouse_id);
        expect(ele).has.property("code", ele.code);
        expect(ele).has.property("name", ele.name);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch API when not provide search field", () => {
    let requestData = {
      select: [
        "address.id",
        "address.contact_name",
        "address.type",
        "address.address_1",
        "address.city",
        "address.state",
        "address.zip",
        "address.country",
        "address.status",
        "warehouse.id as warehouse_id",
        "warehouse.code",
      ],
      sort: "address.id",
      orderby: "desc",
      page: "1",
      perPage: "20",
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_warehouse_address,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("contact_name", ele.contact_name);
        expect(ele).has.property("type", ele.type);
        expect(ele).has.property("address_1", ele.address_1);
        expect(ele).has.property("city", ele.city);
        expect(ele).has.property("state", ele.state);
        expect(ele).has.property("zip", ele.zip);
        expect(ele).has.property("country", ele.country);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("warehouse_id", ele.warehouse_id);
        expect(ele).has.property("code", ele.code);
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch API when select field is left blank", () => {
    let requestData = {
      search: [
        {
          key: "address.id",
          operation: "=",
          val: warehouse_addr_id,
        },
      ],
      select: [],
      sort: "address.id",
      orderby: "desc",
      page: "1",
      perPage: "20",
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_warehouse_address,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      expect(body.result.data.map((ele: any) => ele.id)).to.deep.equal(
        requestData.search.map((item: any) => item.val)
      );
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("contact_name", ele.contact_name);
        expect(ele).has.property("type", ele.type);
        expect(ele).has.property("address_1", ele.address_1);
        expect(ele).has.property("address_2", ele.address_2);
        expect(ele).has.property("address_3", ele.address_3);
        expect(ele).has.property("address_4", ele.address_4);
        expect(ele).has.property("city", ele.city);
        expect(ele).has.property("state", ele.state);
        expect(ele).has.property("zip", ele.zip);
        expect(ele).has.property("country", ele.country);
        expect(ele).has.property("warehouse_id", ele.warehouse_id);
        expect(ele).has.property("code", ele.code);
        expect(ele).has.property("name", ele.name);
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch API when not provide search and select field", () => {
    let requestData = {
      sort: "address.id",
      orderby: "desc",
      page: "1",
      perPage: "20",
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_warehouse_address,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("contact_name", ele.contact_name);
        expect(ele).has.property("type", ele.type);
        expect(ele).has.property("address_1", ele.address_1);
        expect(ele).has.property("address_2", ele.address_2);
        expect(ele).has.property("address_3", ele.address_3);
        expect(ele).has.property("address_4", ele.address_4);
        expect(ele).has.property("city", ele.city);
        expect(ele).has.property("state", ele.state);
        expect(ele).has.property("zip", ele.zip);
        expect(ele).has.property("country", ele.country);
        expect(ele).has.property("warehouse_id", ele.warehouse_id);
        expect(ele).has.property("code", ele.code);
        expect(ele).has.property("name", ele.name);
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: routes.fetch_warehouse_address,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "address.id",
            operation: "=",
            val: Cypress.env("RandomNumber"),
          },
          {
            key: "address.country",
            operation: "like",
            val: Cypress.env("RandomNumber"),
          },
        ],
        searchOr: [
          {
            key: "address.id",
            operation: "=",
            val: Cypress.env("RandomNumber"),
          },
        ],
        searchOrAnd: [
          {
            key: "address.id",
            operation: "=",
            val: Cypress.env("RandomNumber"),
          },
        ],
        select: ["address.id", "address.country", "address.status"],
        sort: "address.id",
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

describe(`${store_msg.success_log}${Cypress.spec["fileName"]}`, () => {
  it("Test cases for get-log API", () => {
    let today = new Date().toISOString().slice(0, 10);
    let requestData = {
      module_name: "warehouse_address",
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
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.get_log,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.check_log(body);
    });
  });

  it("Test case for track-change-data API", () => {
    let recordId = warehouse_addr_id.toString();
    let requestData = {
      module: "warehouse_address",
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
    let name = "warehouse_address";
    let obj = {
      statusCode: 200,
      success: true,
      error: null,
      result: {
        message: "Module fields fetched successfully",
        data: {
          fields: [
            "id",
            "contact_name",
            "type",
            "address_1",
            "address_2",
            "address_3",
            "address_4",
            "city",
            "state",
            "zip",
            "country",
            "status",
            "created_date",
            "updated_date",
            "created_by",
            "updated_by",
            "verification_source",
            "is_verified",
            "verified_date",
            "verified_by",
          ],
          foreignKey: {},
          child: {
            reference_address: {
              fields: [
                "id",
                "reference_id",
                "address_id",
                "type",
                "status",
                "created_date",
                "updated_date",
                "created_by",
                "updated_by",
              ],
            },
          },
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

  it("Test cases When do not provide required field", () => {
    cy.request({
      method: routes.post,
      body: {},
      url: routes.post_warehouse_address,
   headers: { Authorization: Cypress.env("companyToken") },

      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("contact_name");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("address_1");
      expect(body.error.errorDetails).has.property("city");
      expect(body.error.errorDetails).has.property("state");
      expect(body.error.errorDetails).has.property("zip");
      expect(body.error.errorDetails).has.property("country");
      expect(body.error.errorDetails).has.property("warehouse_id");
    });
  });

  it("Test cases When required fields are empty", () => {
    let requestData = {
      contact_name: "",
      type: "",
      address_1: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      status: "",
      warehouse_id: "",
    };
    cy.request({
      method: routes.post,
      url: routes.post_warehouse_address,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("contact_name");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("address_1");
      expect(body.error.errorDetails).has.property("city");
      expect(body.error.errorDetails).has.property("state");
      expect(body.error.errorDetails).has.property("zip");
      expect(body.error.errorDetails).has.property("country");
      expect(body.error.errorDetails).has.property("warehouse_id");
    });
  });

  it("Test cases When warehouse_id doesn't exist", () => {
    let requestData = {
      contact_name: Cypress.env("Random"),
      type: Cypress.env("Random"),
      address_1: Cypress.env("Random"),
      city: Cypress.env("Random"),
      state: Cypress.env("Random"),
      zip: Cypress.env("Random"),
      country: Cypress.env("Random"),
      status: Cypress.env("randomBoolean"),
      warehouse_id: Cypress.env("RandomNumber"),
    };
    cy.request({
      method: routes.post,
      url: routes.post_warehouse_address,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it("warehouse_id and status should be number", () => {
    let requestData = {
      contact_name: Cypress.env("Random"),
      type: Cypress.env("Random"),
      address_1: Cypress.env("Random"),
      city: Cypress.env("Random"),
      state: Cypress.env("Random"),
      zip: Cypress.env("Random"),
      country: Cypress.env("Random"),
      status: Cypress.env("RandomNum"),
      warehouse_id: Cypress.env("RandomNum"),
    };
    cy.request({
      method: routes.post,
      url: routes.post_warehouse_address,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
      expect(body.error.errorDetails).has.property("warehouse_id");
    });
  });

  it("Status mest be one of [0 abd 1]", () => {
    let requestData = {
      contact_name: Cypress.env("Random"),
      type: Cypress.env("Random"),
      address_1: Cypress.env("Random"),
      city: Cypress.env("Random"),
      state: Cypress.env("Random"),
      zip: Cypress.env("Random"),
      country: Cypress.env("Random"),
      status: Cypress.env("RandomNumber"),
      warehouse_id: Cypress.env("warehouseId"),
    };
    cy.request({
      method: routes.post,
      url: routes.post_warehouse_address,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {
  it("Test cases When alphabet provides along with Id ", () => {
    let requestData = {};
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_address}${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.chk_id);
    });
  });

  it("Test cases When Id doesn't exist", () => {
    let requestData = {};
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_address}${Cypress.env("RandomNumber")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "warehouse_address_id",`{warehouse_address_id} is invalid`);
    });
  });

  it("Test cases When required fields are empty", () => {
    let requestData = {
      contact_name: "",
      type: "",
      address_1: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      status: "",
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_address}${warehouse_addr_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("contact_name");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("address_1");
      expect(body.error.errorDetails).has.property("city");
      expect(body.error.errorDetails).has.property("state");
      expect(body.error.errorDetails).has.property("zip");
      expect(body.error.errorDetails).has.property("country");
    });
  });

  it("Status should be number", () => {
    let requestData = {
      status: Cypress.env("RandomNum"),
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_address}${warehouse_addr_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "status",
        body.error.errorDetails.status
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Status mest be one of [0 abd 1]", () => {
    let requestData = {
      status: Cypress.env("RandomNumber"),
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_address}${warehouse_addr_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

});
