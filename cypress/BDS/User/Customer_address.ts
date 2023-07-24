import routes from "../../support/route";
import store_msg from "../../support/store_msg";

let cst_add_id: any;
let resCstId: any;

before(() => {
  cy.GetCompanyToken();
  cy.GetCustomerId();
});

beforeEach(() => {
  cy.Random();
  cy.RandomNum();
  cy.randomBoolean();
  cy.RandomNumber();
});

function req_cstAdd(payload,ignoredata=[]){
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
          customer_id: payload.hasOwnProperty("customer_id")?payload.customer_id :Cypress.env("cstId")
        };
        ignoredata.forEach((itemrow)=>{
          delete reqBody[itemrow];
        })
        return reqBody
  }

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {
 
  it("Test cases for create API", () => {
    let requestData = req_cstAdd({});
    cy.request({
      method:routes.post,
      url: routes.post_cst_add,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      cst_add_id = body.result.data.id;
      expect(requestData).has.property("customer_id");
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("is_verified");
      expect(res).has.property("id");
      expect(res).has.property("contact_name",requestData.contact_name).be.string;
      expect(res).has.property("type", requestData.type).be.string;
      expect(res).has.property("address_1", requestData.address_1).be.string;
      expect(res).has.property("address_2", requestData.address_2).be.string;
      expect(res).has.property("address_3", requestData.address_3).be.string;
      expect(res).has.property("address_4", requestData.address_4).be.string;
      expect(res).has.property("city", requestData.city).be.string;
      expect(res).has.property("state", requestData.state).be.string;
      expect(res).has.property("zip", requestData.zip).be.string;
      expect(res).has.property("country", requestData.country).be.string;
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API When not providing optional field", () => {
    let requestData = req_cstAdd({},
      ["address_2","address_3","address_4","status"]);
    cy.request({
      method:routes.post,
      url: routes.post_cst_add,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      expect(requestData).has.property("customer_id");
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("is_verified");
      expect(res).has.property("id");
      expect(res).has.property("contact_name",requestData.contact_name).to.be.string;
      expect(res).has.property("type", requestData.type).to.be.string;
      expect(res).has.property("address_1", requestData.address_1).to.be.string;
      expect(res).has.property("city", requestData.city).to.be.string;
      expect(res).has.property("state", requestData.state).to.be.string;
      expect(res).has.property("zip", requestData.zip).to.be.string;
      expect(res).has.property("country", requestData.country).to.be.string;
      expect(res).has.property("status");
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API When optional field are null", () => {
    let requestData = req_cstAdd({
      address_2: null,
      address_3: null,
      address_4: null
    });
    cy.request({
      method:routes.post,
      url: routes.post_cst_add,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      expect(requestData).has.property("customer_id");
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("is_verified");
      expect(res).has.property("id");
      expect(res).has.property("contact_name",requestData.contact_name).be.string;
      expect(res).has.property("type", requestData.type).be.string;
      expect(res).has.property("address_1", requestData.address_1).be.string;
      expect(res).has.property("address_2", requestData.address_2).be.string;
      expect(res).has.property("address_3", requestData.address_3).be.string;
      expect(res).has.property("address_4", requestData.address_4).be.string;
      expect(res).has.property("city", requestData.city).be.string;
      expect(res).has.property("state", requestData.state).be.string;
      expect(res).has.property("zip", requestData.zip).be.string;
      expect(res).has.property("country", requestData.country).be.string;
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API When optional field are blank", () => {
    let requestData = req_cstAdd({
      address_2: "",
      address_3: "",
      address_4: ""
    });
    cy.request({
      method:routes.post,
      url: routes.post_cst_add,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      expect(requestData).has.property("customer_id");
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("is_verified");
      expect(res).has.property("id");
      expect(res).has.property("contact_name",requestData.contact_name).be.string;
      expect(res).has.property("type", requestData.type).be.string;
      expect(res).has.property("address_1", requestData.address_1).be.string;
      expect(res).has.property("address_2", requestData.address_2).be.string;
      expect(res).has.property("address_3", requestData.address_3).be.string;
      expect(res).has.property("address_4", requestData.address_4).be.string;
      expect(res).has.property("city", requestData.city).be.string;
      expect(res).has.property("state", requestData.state).be.string;
      expect(res).has.property("zip", requestData.zip).be.string;
      expect(res).has.property("country", requestData.country).be.string;
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {

  it("Test case for update API when not providing any fields", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_cst_add}${cst_add_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
    }).then(({ body }) => {
        let res = body.result.data;
        cy.Success(body)
        expect(res).has.property("id");
        expect(res).has.property("contact_name");
        expect(res).has.property("type");
        expect(res).has.property("address_1");
        expect(res).has.property("address_2");
        expect(res).has.property("address_3");
        expect(res).has.property("address_4");
        expect(res).has.property("city");
        expect(res).has.property("state");
        expect(res).has.property("zip");
        expect(res).has.property("country");
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

  it("Test case for update API when not providing optional fields", () => {
    let requestData = req_cstAdd({},["customer_id","address_2","address_3","address_4","status"]);
    cy.request({
      method: routes.put,
      url: `${routes.post_cst_add}${cst_add_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("is_verified");
      expect(res).has.property("id");
      expect(res).has.property("contact_name",requestData.contact_name)
      expect(res).has.property("type", requestData.type)
      expect(res).has.property("address_1", requestData.address_1)
      expect(res).has.property("address_2")
      expect(res).has.property("address_3")
      expect(res).has.property("address_4")
      expect(res).has.property("city", requestData.city)
      expect(res).has.property("state", requestData.state)
      expect(res).has.property("zip", requestData.zip)
      expect(res).has.property("country", requestData.country)
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

  it("Test case when optional fields are null and not providing required fields", () => {
    let requestData = req_cstAdd({
      address_2: null,
      address_3: null,
      address_4: null
    },
    ["customer_id","contact_name","type","address_1","city","state","zip","country"]);
    cy.request({
      method: routes.put,
      url: `${routes.post_cst_add}${cst_add_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("is_verified");
      expect(res).has.property("id");
      expect(res).has.property("contact_name")
      expect(res).has.property("type")
      expect(res).has.property("address_1")
      expect(res).has.property("address_2", requestData.address_2)
      expect(res).has.property("address_3", requestData.address_3)
      expect(res).has.property("address_4", requestData.address_4)
      expect(res).has.property("city")
      expect(res).has.property("state")
      expect(res).has.property("zip")
      expect(res).has.property("country")
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

  it("Test case for update API when optional fields are blank", () => {
    let requestData = req_cstAdd({
      address_2: "",
      address_3: "",
      address_4: ""
    },["customer_id"]);
    cy.request({
      method: routes.put,
      url: `${routes.post_cst_add}${cst_add_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("is_verified");
      expect(res).has.property("id");
      expect(res).has.property("contact_name")
      expect(res).has.property("type")
      expect(res).has.property("address_1")
      expect(res).has.property("address_2", requestData.address_2)
      expect(res).has.property("address_3", requestData.address_3)
      expect(res).has.property("address_4", requestData.address_4)
      expect(res).has.property("city")
      expect(res).has.property("state")
      expect(res).has.property("zip")
      expect(res).has.property("country")
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

  it("Test case for update API", () => {
    let reqData = req_cstAdd({},["customer_id"]);
    cy.request({
      method: routes.put,
      url: `${routes.post_cst_add}${cst_add_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      let res =body.result.data;
      cy.Success(body);
      expect(res).has.property("is_verified");
      expect(res).has.property("id");
      expect(res).has.property("contact_name",reqData.contact_name).to.be.string;
      expect(res).has.property("type", reqData.type).to.be.string;
      expect(res).has.property("address_1", reqData.address_1).to.be.string;
      expect(res).has.property("address_2", reqData.address_2).to.be.string;
      expect(res).has.property("address_3", reqData.address_3).to.be.string;
      expect(res).has.property("address_4", reqData.address_4).to.be.string;
      expect(res).has.property("city", reqData.city).to.be.string;
      expect(res).has.property("state", reqData.state).to.be.string;
      expect(res).has.property("zip", reqData.zip).to.be.string;
      expect(res).has.property("country", reqData.country).to.be.string;
      expect(res).has.property("status", reqData.status);
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
    let reqData= {
      search: [
        {
          key: "address.id",
          operation: "=",
          val: cst_add_id,
        },
      ],
      searchOr: [
        {
          key: "address.id",
          operation: "=",
          val: cst_add_id,
        },
      ],
      searchOrAnd: [
        {
          key: "address.id",
          operation: "=",
          val: cst_add_id,
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
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_cst_add}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index) => {
        expect(ele).has.property("id", reqData.search[index].val);
        expect(ele).has.property("contact_name");
        expect(ele).has.property("type");
        expect(ele).has.property("address_1");
        expect(ele).has.property("city");
        expect(ele).has.property("state");
        expect(ele).has.property("zip");
        expect(ele).has.property("country");
        expect(ele).has.property("status");
      });
      expect(body.result).has.property("page", reqData.page);
      expect(body.result).has.property("perPage", reqData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_cst_add}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false,
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
        expect(ele).has.property("customers_id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
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
      url: `${routes.post_cst_add}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
      failOnStatusCode: false,
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
      sort: "address.id",
      orderby: "desc",
      page:1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_cst_add}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqData
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
        expect(ele).has.property("customers_id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
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
      url: `${routes.post_cst_add}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "customers.id",
            operation: "=",
            val: Cypress.env("RandomNumber")
          }
        ],
        select: ["customers.id", "address.country", "address.status"],
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
        module_name: "customer_address",
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
    let recordId = cst_add_id.toString();
    cy.request({
      method: routes.post,
      url: routes.track_change,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        module: "customer_address",
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
    let name = "Customer_address";
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
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      expect(JSON.stringify(body)).to.deep.equal(JSON.stringify(obj));
    });
  });
});

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {

  it("Test cases When do not provide required field ", () => {
    cy.request({
      method:routes.post,
      url: routes.post_cst_add,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false
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
      expect(err).has.property("customer_id",`{customer_id} is required`);
    });
  });

  it("Test cases When customer_id don't exist", () => {
    cy.request({
      method:routes.post,
      url: routes.post_cst_add,
      headers: { Authorization: Cypress.env("companyToken") },
      body: req_cstAdd({ customer_id: Cypress.env("RandomNumber") }),      
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("customer_id",`{customer_id} is invalid`);
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method:routes.post,
      url: routes.post_cst_add,
      headers: { Authorization: Cypress.env("companyToken") },
      body: req_cstAdd({
        contact_name: "",
        type: "",
        address_1: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        customer_id: ""
      }),
      failOnStatusCode: false
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
      expect(err).has.property("customer_id",`{customer_id} must be a number`);
    });
  });

  it("contact_name, type, address, city, state, zip and country should be string", () => {
    cy.request({
      method:routes.post,
      url: routes.post_cst_add,
   headers: { Authorization: Cypress.env("companyToken") },
      body: req_cstAdd({
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
      }),
      failOnStatusCode: false
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

  it("customer_id and status should be number", () => {
    cy.request({
      method:routes.post,
      url: routes.post_cst_add,
   headers: { Authorization: Cypress.env("companyToken") },
      body: req_cstAdd({
        status: Cypress.env("RandomNum"),
        customer_id: Cypress.env("RandomNum")
      }),
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status",store_msg.err_status1);
      expect(err).has.property("customer_id",`{customer_id} must be a number`);
    });
  });

  it("status must be one of [0 and 1]", () => {
    cy.request({
      method:routes.post,
      url: routes.post_cst_add,
   headers: { Authorization: Cypress.env("companyToken") },
      body: { status: Cypress.env("RandomNumber") },
      failOnStatusCode: false
    }).then(({ body }) => {
      let err = body.error.errorDetails;
      cy.Failure(body);
      expect(err).has.property("status",store_msg.err_status);
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {

  it("Test cases When alphabet provides along with Id ", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_cst_add}${Cypress.env("Random")}`,
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
      url: `${routes.post_cst_add}${Cypress.env("RandomNumber")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "customer_address_id",`{customer_address_id} is invalid`);
    });
  });

  it("contact_name, type, address, city, state, zip and country should be string", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_cst_add}${cst_add_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: req_cstAdd({
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
      }),
      failOnStatusCode: false
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

  it("status should be number", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_cst_add}${cst_add_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: req_cstAdd({ status: Cypress.env("RandomNum") }),
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status",store_msg.err_status1);
    });
  });

  it("status must be one of [0 and 1]", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_cst_add}${cst_add_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: req_cstAdd({ status: Cypress.env("RandomNumber") }),
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status",store_msg.err_status);
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_cst_add}${cst_add_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: req_cstAdd({
        contact_name: "",
        type: "",
        address_1: "",
        city: "",
        state: "",
        zip: "",
        country: ""
      }),
      failOnStatusCode: false
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
    });
  });
});
