import routes from "../../support/route";
import store_msg from "../../support/store_msg";
let factor_addrs_id: Number;
before(() => {
  cy.GetCompanyToken();
  cy.Random();
  cy.GetFactorId();
  cy.randomBoolean();
  cy.RandomNum();
  cy.RandomNumber();
});

function req_factorAdd(payload,ignoredata=[]){
  let reqBody = {
          contact_name: payload.hasOwnProperty("contact_name")?payload.contact_name :Cypress.env("Random"),
          type: payload.hasOwnProperty("type")?payload.type :Cypress.env("Random"),
          address_1: payload.hasOwnProperty("address_1")?payload.address_1 :Cypress.env("Random"),
          address_2: payload.hasOwnProperty("address_2")?payload.address_2 :Cypress.env("Random"),
          address_3: payload.hasOwnProperty("address_3")?payload.address_3 :Cypress.env("Random"),
          address_4: payload.hasOwnProperty("address_4")?payload.address_4 :Cypress.env("Random"),
          city: payload.hasOwnProperty("city")?payload.city :Cypress.env("Random"),
          state: payload.hasOwnProperty("state")?payload.state :Cypress.env("Random"),
          zip: payload.hasOwnProperty("zip")?payload.zip :Cypress.env("Random"),
          country: payload.hasOwnProperty("country")?payload.country :Cypress.env("Random"),
          status: payload.hasOwnProperty("status")?payload.status :1,
          factor_id: payload.hasOwnProperty("factor_id")?payload.factor_id :Cypress.env("factorId")
        };
        ignoredata.forEach((itemrow)=>{
          delete reqBody[itemrow];
        })
        return reqBody
  }

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {

  it("Test cases for create API", () => {
    let req = req_factorAdd({});
    cy.request({
      method: routes.post,
      url: routes.post_factor_address,
      body: req,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      factor_addrs_id = res.id;
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      expect(res).has.property("is_verified");
      expect(res).has.property("id", res.id);
      expect(res).has.property("contact_name",req.contact_name);
      expect(res).has.property("type", req.type);
      expect(res).has.property("address_1", req.address_1);
      expect(res).has.property("address_2", req.address_2);
      expect(res).has.property("address_3", req.address_3);
      expect(res).has.property("address_4", req.address_4);
      expect(res).has.property("city", req.city);
      expect(res).has.property("state", req.state);
      expect(res).has.property("zip", req.zip);
      expect(res).has.property("country", req.country);
      expect(res).has.property("status", req.status);
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API when not providing optional field", () => {
    let req = req_factorAdd({},
      ["address_2","address_3","address_4","status"]);
    cy.request({
      method: routes.post,
      url: routes.post_factor_address,
      body: req,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("status");
      expect(res).has.property("is_verified");
      expect(res).has.property("id", res.id);
      expect(res).has.property("contact_name",req.contact_name);
      expect(res).has.property("type", req.type);
      expect(res).has.property("address_1", req.address_1);
      expect(res).has.property("city", req.city);
      expect(res).has.property("state", req.state);
      expect(res).has.property("zip", req.zip);
      expect(res).has.property("country", req.country);
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API when optional fields are null", () => {
    let req = req_factorAdd({
      address_2: null,
      address_3: null,
      address_4: null
    });
    cy.request({
      method: routes.post,
      url: routes.post_factor_address,
      body: req,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("is_verified");
      expect(res).has.property("id", res.id);
      expect(res).has.property("contact_name",req.contact_name);
      expect(res).has.property("type", req.type);
      expect(res).has.property("address_1", req.address_1);
      expect(res).has.property("address_2", req.address_2);
      expect(res).has.property("address_3", req.address_3);
      expect(res).has.property("address_4", req.address_4);
      expect(res).has.property("city", req.city);
      expect(res).has.property("state", req.state);
      expect(res).has.property("zip", req.zip);
      expect(res).has.property("country", req.country);
      expect(res).has.property("status", req.status);
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API when optional fields are blank", () => {
    let req = req_factorAdd({
      address_2: "",
      address_3: "",
      address_4: ""
    });
    cy.request({
      method: routes.post,
      url: routes.post_factor_address,
      body: req,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("is_verified");
      expect(res).has.property("id", res.id);
      expect(res).has.property("contact_name",req.contact_name);
      expect(res).has.property("type", req.type);
      expect(res).has.property("address_1", req.address_1);
      expect(res).has.property("address_2", req.address_2);
      expect(res).has.property("address_3", req.address_3);
      expect(res).has.property("address_4", req.address_4);
      expect(res).has.property("city", req.city);
      expect(res).has.property("state", req.state);
      expect(res).has.property("zip", req.zip);
      expect(res).has.property("country", req.country);
      expect(res).has.property("status", req.status);
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {
  it("Test cases When not providing any field", () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_factor_address}${factor_addrs_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("is_verified");
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
    let req = req_factorAdd({},
      ["address_2","address_3","address_4","factor_id","status"]);
    cy.request({
      method: routes.put,
      body: req,
      url: `${routes.post_factor_address}${factor_addrs_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("is_verified");
      expect(res).has.property("id", res.id);
      expect(res).has.property("contact_name",req.contact_name);
      expect(res).has.property("type", req.type);
      expect(res).has.property("address_1", req.address_1);
      expect(res).has.property("address_2");
      expect(res).has.property("address_3");
      expect(res).has.property("address_4");
      expect(res).has.property("city", req.city);
      expect(res).has.property("state", req.state);
      expect(res).has.property("zip", req.zip);
      expect(res).has.property("country", req.country);
      expect(res).has.property("status");
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("verification_source");
      expect(res).has.property("is_verified");
      expect(res).has.property("verified_date");
      expect(res).has.property("verified_by");
    });
  });

  it("Test cases When not providing required fields", () => {
    let requestData = req_factorAdd({},
      ["contact_name","type","address_1","city","state","zip","country","factor_id"]);
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_factor_address}${factor_addrs_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("is_verified");
      expect(res).has.property("id", res.id);
      expect(res).has.property("contact_name");
      expect(res).has.property("type");
      expect(res).has.property("address_1");
      expect(res).has.property("address_2", requestData.address_2);
      expect(res).has.property("address_3", requestData.address_3);
      expect(res).has.property("address_4", requestData.address_4);
      expect(res).has.property("city");
      expect(res).has.property("state");
      expect(res).has.property("zip");
      expect(res).has.property("country");
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("verification_source");
      expect(res).has.property("is_verified");
      expect(res).has.property("verified_date");
      expect(res).has.property("verified_by");
    });
  });

  it("Test cases When optional fields are null", () => {
    let req = req_factorAdd({
      address_2: null,
      address_3: null,
      address_4: null
    },["factor_id"]);
    cy.request({
      method: routes.put,
      body: req,
      url: `${routes.post_factor_address}${factor_addrs_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("is_verified");
      expect(res).has.property("id", res.id);
      expect(res).has.property("contact_name",req.contact_name);
      expect(res).has.property("type", req.type);
      expect(res).has.property("address_1", req.address_1);
      expect(res).has.property("address_2", req.address_2);
      expect(res).has.property("address_3", req.address_3);
      expect(res).has.property("address_4", req.address_4);
      expect(res).has.property("city", req.city);
      expect(res).has.property("state", req.state);
      expect(res).has.property("zip", req.zip);
      expect(res).has.property("country", req.country);
      expect(res).has.property("status", req.status);
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("verification_source");
      expect(res).has.property("is_verified");
      expect(res).has.property("verified_date");
      expect(res).has.property("verified_by");
    });
  });

  it("Test cases When optional fields are blank", () => {
    let req = req_factorAdd({
      address_2: "",
      address_3: "",
      address_4: ""
    },["factor_id"]);
    cy.request({
      method: routes.put,
      body: req,
      url: `${routes.post_factor_address}${factor_addrs_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("is_verified");
      expect(res).has.property("id", res.id);
      expect(res).has.property("contact_name",req.contact_name);
      expect(res).has.property("type", req.type);
      expect(res).has.property("address_1", req.address_1);
      expect(res).has.property("address_2", req.address_2);
      expect(res).has.property("address_3", req.address_3);
      expect(res).has.property("address_4", req.address_4);
      expect(res).has.property("city", req.city);
      expect(res).has.property("state", req.state);
      expect(res).has.property("zip", req.zip);
      expect(res).has.property("country", req.country);
      expect(res).has.property("status", req.status);
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("verification_source");
      expect(res).has.property("is_verified");
      expect(res).has.property("verified_date");
      expect(res).has.property("verified_by");
    });
  });

  it("Test case for update API", () => {
    let req = req_factorAdd({},["factor_id"]);
    cy.request({
      method: routes.put,
      body: req,
      url: `${routes.post_factor_address}${factor_addrs_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("is_verified");
      expect(res).has.property("id", res.id);
      expect(res).has.property("contact_name",req.contact_name);
      expect(res).has.property("type", req.type);
      expect(res).has.property("address_1", req.address_1);
      expect(res).has.property("address_2", req.address_2);
      expect(res).has.property("address_3", req.address_3);
      expect(res).has.property("address_4", req.address_4);
      expect(res).has.property("city", req.city);
      expect(res).has.property("state", req.state);
      expect(res).has.property("zip", req.zip);
      expect(res).has.property("country", req.country);
      expect(res).has.property("status", req.status);
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("verification_source");
      expect(res).has.property("is_verified");
      expect(res).has.property("verified_date");
      expect(res).has.property("verified_by");
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
          val: factor_addrs_id,
        },
      ],
      searchOr: [
        {
          key: "address.id",
          operation: "=",
          val: factor_addrs_id,
        },
      ],
      searchOrAnd: [
        {
          key: "address.id",
          operation: "=",
          val: factor_addrs_id,
        },
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
      ],
      sort: "address.id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_factor_address,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index) => {
        expect(ele).has.property("id",requestData.search[index].val);
        expect(ele).has.property("contact_name");
        expect(ele).has.property("type");
        expect(ele).has.property("address_1");
        expect(ele).has.property("city");
        expect(ele).has.property("state");
        expect(ele).has.property("zip");
        expect(ele).has.property("country");
        expect(ele).has.property("status");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
      method: routes.post,
      url: routes.fetch_factor_address,
      body: {},
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("contact_name");
        expect(ele).has.property("type");
        expect(ele).has.property("address_1");
        expect(ele).has.property("address_2");
        expect(ele).has.property("address_3");
        expect(ele).has.property("address_4");
        expect(ele).has.property("city");
        expect(ele).has.property("state");
        expect(ele).has.property("zip");
        expect(ele).has.property("country");
        expect(ele).has.property("factor_id");
        expect(ele).has.property("name");
        expect(ele).has.property("code");
        expect(ele).has.property("account_number");
        expect(ele).has.property("company_id");
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
        "address.id",
        "address.contact_name",
        "address.type",
        "address.address_1",
        "address.city",
        "address.state",
        "address.zip",
        "address.country",
        "address.status",
      ],
      sort: "address.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_factor_address,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index) => {
        expect(ele).has.property("id");
        expect(ele).has.property("contact_name");
        expect(ele).has.property("type");
        expect(ele).has.property("address_1");
        expect(ele).has.property("city");
        expect(ele).has.property("state");
        expect(ele).has.property("zip");
        expect(ele).has.property("country");
        expect(ele).has.property("status");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when select field is left blank", () => {
    let requestData = {
      search: [
        {
          key: "address.id",
          operation: "=",
          val: factor_addrs_id,
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
      url: routes.fetch_factor_address,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index) => {
        expect(ele).has.property("id",requestData.search[index].val);
        expect(ele).has.property("contact_name");
        expect(ele).has.property("type");
        expect(ele).has.property("address_1");
        expect(ele).has.property("address_2");
        expect(ele).has.property("address_3");
        expect(ele).has.property("address_4");
        expect(ele).has.property("city");
        expect(ele).has.property("state");
        expect(ele).has.property("zip");
        expect(ele).has.property("country");
        expect(ele).has.property("factor_id");
        expect(ele).has.property("name");
        expect(ele).has.property("code");
        expect(ele).has.property("account_number");
        expect(ele).has.property("company_id");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when not provide search and select field", () => {
    let requestData = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [],
      sort: "address.id",
      orderby: "desc",
      page: "1",
      perPage: "20",
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_factor_address,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("contact_name");
        expect(ele).has.property("type");
        expect(ele).has.property("address_1");
        expect(ele).has.property("address_2");
        expect(ele).has.property("address_3");
        expect(ele).has.property("address_4");
        expect(ele).has.property("city");
        expect(ele).has.property("state");
        expect(ele).has.property("zip");
        expect(ele).has.property("country");
        expect(ele).has.property("factor_id");
        expect(ele).has.property("name");
        expect(ele).has.property("code");
        expect(ele).has.property("account_number");
        expect(ele).has.property("company_id");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: routes.fetch_factor_address,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "address.id",
            operation: "=",
            val: Cypress.env("RandomNumber")
          },
        ],
        select: ["address.id", "address.country", "address.status"],
        sort: "address.id",
        orderby: "desc",
        page: 1,
        perPage: 20
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
      module_name: "factor_address",
      search: [
        {
          key: "createdAt",
          operation: "date_range",
          val: [today, today]
        },
      ],
      select: ["createdAt", "modules"],
      sort: "_id",
      orderby: "desc",
      page: 1,
      perPage: 20
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
    let recordId = factor_addrs_id.toString();
    let requestData = {
      module: "factor_address",
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
      cy.Track_change(body);
    });
  });

  it("Test case for look-up API", () => {
    let name = "Factor_address";
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
      url: routes.post_factor_address,
      body: {},
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("contact_name",store_msg.err_contact_name);
      expect(err).has.property("type",store_msg.err_type);
      expect(err).has.property("address_1",store_msg.err_address1);
      expect(err).has.property("city",store_msg.err_city);
      expect(err).has.property("state",store_msg.err_state);
      expect(err).has.property("zip",store_msg.err_zip);
      expect(err).has.property("country",store_msg.err_country);
      expect(err).has.property("factor_id",`{factor_id} is required`);
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
      factor_id: ""
    };
    cy.request({
      method: routes.post,
      url: routes.post_factor_address,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("contact_name",store_msg.empty_contact_name);
      expect(err).has.property("type",store_msg.empty_type);
      expect(err).has.property("address_1",store_msg.empty_address1);
      expect(err).has.property("city",store_msg.empty_city);
      expect(err).has.property("state",store_msg.empty_state);
      expect(err).has.property("zip",store_msg.empty_zip);
      expect(err).has.property("country",store_msg.empty_country);
      expect(err).has.property("status",store_msg.err_status1);
      expect(err).has.property("factor_id",store_msg.chk_factor);
    });
  });

  it("Test cases When factor_id doesn't exist", () => {
    cy.request({
      method: routes.post,
      url: routes.post_factor_address,
      body: req_factorAdd({factor_id: Cypress.env("RandomNumber")}),
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("factor_id",`{factor_id} is invalid`);
    });
  });

  it("factor_id and status should be number", () => {
    cy.request({
      method: routes.post,
      url: routes.post_factor_address,
      body: req_factorAdd({
        status: Cypress.env("RandomNum"),
        factor_id: Cypress.env("RandomNum")
      }),
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status",store_msg.err_status1);
      expect(err).has.property("factor_id",store_msg.chk_factor);
    });
  });

  it("Status mest be one of [0 or 1]", () => {
    cy.request({
      method: routes.post,
      url: routes.post_factor_address,
      body: req_factorAdd({status: Cypress.env("RandomNumber")}),
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status",store_msg.err_status);
    });
  });

  it("contact_name, type, address, city, state and country should be string", () => {
    let requestData = req_factorAdd({
      contact_name: Cypress.env("RandomNumber"),
      type: Cypress.env("RandomNumber"),
      address_1: Cypress.env("RandomNumber"),
      address_2: Cypress.env("RandomNumber"),
      address_3: Cypress.env("RandomNumber"),
      address_4: Cypress.env("RandomNumber"),
      city: Cypress.env("RandomNumber"),
      state: Cypress.env("RandomNumber"),
      zip: Cypress.env("RandomNumber"),
      country: Cypress.env("RandomNumber"),
    });
    cy.request({
      method: routes.post,
      url: routes.post_factor_address,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("contact_name",store_msg.string_contact_name);
      expect(err).has.property("type",store_msg.string_type);
      expect(err).has.property("address_1",store_msg.string_address1);
      expect(err).has.property("address_2",store_msg.string_address2);
      expect(err).has.property("address_3",store_msg.string_address3);
      expect(err).has.property("address_4",store_msg.string_address4);
      expect(err).has.property("city",store_msg.string_city);
      expect(err).has.property("state",store_msg.string_state);
      expect(err).has.property("zip",store_msg.string_zip);
      expect(err).has.property("country",store_msg.string_country);
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {
  it("Test cases When alphabet provides along with Id ", () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_factor_address}${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.chk_id);
    });
  });

  it("Test cases When Id doesn't exist", () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_factor_address}${Cypress.env("RandomNumber")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "factor_address_id",`{factor_address_id} is invalid`);
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
      status: ""
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_factor_address}${factor_addrs_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("contact_name",store_msg.empty_contact_name);
      expect(err).has.property("type",store_msg.empty_type);
      expect(err).has.property("address_1",store_msg.empty_address1);
      expect(err).has.property("city",store_msg.empty_city);
      expect(err).has.property("state",store_msg.empty_state);
      expect(err).has.property("zip",store_msg.empty_zip);
      expect(err).has.property("country",store_msg.empty_country);
      expect(err).has.property("status",store_msg.err_status1);
    });
  });

  it("Status should be number", () => {
    let requestData = { status: Cypress.env("RandomNum") };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_factor_address}${factor_addrs_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status",store_msg.err_status1);
    });
  });

  it("Status mest be one of [0 or 1]", () => {
    let requestData = { status: Cypress.env("RandomNumber") };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_factor_address}${factor_addrs_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status",store_msg.err_status);
    });
  });

  it("contact_name, type, address, city, state and country should be string", () => {
    let requestData = {
      contact_name: Cypress.env("RandomNumber"),
      type: Cypress.env("RandomNumber"),
      address_1: Cypress.env("RandomNumber"),
      address_2: Cypress.env("RandomNumber"),
      address_3: Cypress.env("RandomNumber"),
      address_4: Cypress.env("RandomNumber"),
      city: Cypress.env("RandomNumber"),
      state: Cypress.env("RandomNumber"),
      zip: Cypress.env("RandomNumber"),
      country: Cypress.env("RandomNumber")
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_factor_address}${factor_addrs_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("contact_name",store_msg.string_contact_name);
      expect(err).has.property("type",store_msg.string_type);
      expect(err).has.property("address_1",store_msg.string_address1);
      expect(err).has.property("address_2",store_msg.string_address2);
      expect(err).has.property("address_3",store_msg.string_address3);
      expect(err).has.property("address_4",store_msg.string_address4);
      expect(err).has.property("city",store_msg.string_city);
      expect(err).has.property("state",store_msg.string_state);
      expect(err).has.property("zip",store_msg.string_zip);
      expect(err).has.property("country",store_msg.string_country);
    });
  });
});
