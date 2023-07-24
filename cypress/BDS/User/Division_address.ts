import routes from "../../support/route";
import store_msg from "../../support/store_msg";
let division_addr_id: Number;

before(() => {
  cy.GetCompanyToken();
  cy.GetDivisionId();
  cy.Random();
  cy.randomBoolean();
  cy.RandomNum();
  cy.RandomNumber();
});

function req_division(payload,ignoredata=[]){
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
        division_id: payload.hasOwnProperty("division_id")?payload.division_id :Cypress.env("divisionId")
      };
      ignoredata.forEach((itemrow)=>{
        delete reqBody[itemrow];
      })
      return reqBody
}

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {

  it("Test cases for create API", () => {
    let requestData = req_division({})
    cy.request({
        method: routes.post, body: requestData,
        url: routes.post_division_address,
       headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
        division_addr_id = body.result.data.id;
        expect(requestData).has.property("division_id");
        let res = body.result.data;
        cy.Success(body);
        expect(res).has.property("is_verified");
        expect(res).has.property("id");
        expect(res).has.property("contact_name",requestData.contact_name).to.be.string;
        expect(res).has.property("type", requestData.type).to.be.string;
        expect(res).has.property("address_1", requestData.address_1).to.be.string;
        expect(res).has.property("address_2", requestData.address_2).to.be.string;
        expect(res).has.property("address_3", requestData.address_3).to.be.string;
        expect(res).has.property("address_4", requestData.address_4).to.be.string;
        expect(res).has.property("city", requestData.city).to.be.string;
        expect(res).has.property("state", requestData.state).to.be.string;
        expect(res).has.property("zip", requestData.zip).to.be.string;
        expect(res).has.property("country", requestData.country).to.be.string;
        expect(res).has.property("status", requestData.status);
        expect(res).has.property("created_date");
        expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API when not providing optional field", () => {
    let requestData = req_division({},["address_2","address_3","address_4"])
  
    cy.request({
        method: routes.post, body: requestData,
        url: routes.post_division_address,
       headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
        expect(requestData).has.property("division_id");
        let res = body.result.data;
        cy.Success(body);
        expect(res).has.property("status");
        expect(res).has.property("is_verified");
        expect(res).has.property("id");
        expect(res).has.property("contact_name",requestData.contact_name).to.be.string;
        expect(res).has.property("type", requestData.type).to.be.string;
        expect(res).has.property("address_1", requestData.address_1).to.be.string;
        expect(res).has.property("city", requestData.city).to.be.string;
        expect(res).has.property("state", requestData.state).to.be.string;
        expect(res).has.property("zip", requestData.zip).to.be.string;
        expect(res).has.property("country", requestData.country).to.be.string;
        expect(res).has.property("created_date");
        expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API when optional fields are null", () => {
    let requestData = req_division({
        address_2: null,
        address_3: null,
        address_4: null
    });
    
    cy.request({
        method: routes.post, body: requestData,
        url: routes.post_division_address,
       headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
        expect(requestData).has.property("division_id");
        let res = body.result.data;
        cy.Success(body);
        expect(res).has.property("is_verified");
        expect(res).has.property("id");
        expect(res).has.property("contact_name",requestData.contact_name).to.be.string;
        expect(res).has.property("type", requestData.type).to.be.string;
        expect(res).has.property("address_1", requestData.address_1).to.be.string;
        expect(res).has.property("address_2", requestData.address_2).to.be.string;
        expect(res).has.property("address_3", requestData.address_3).to.be.string;
        expect(res).has.property("address_4", requestData.address_4).to.be.string;
        expect(res).has.property("city", requestData.city).to.be.string;
        expect(res).has.property("state", requestData.state).to.be.string;
        expect(res).has.property("zip", requestData.zip).to.be.string;
        expect(res).has.property("country", requestData.country).to.be.string;
        expect(res).has.property("status", requestData.status);
        expect(res).has.property("created_date");
        expect(res).has.property("created_by");
    });
  });

  it("Test cases for create API when optional fields are blank", () => {
    let requestData = req_division({
        address_2: "",
        address_3: "",
        address_4: ""
    });
   
    cy.request({
        method: routes.post, body: requestData,
        url: routes.post_division_address,
       headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
        expect(requestData).has.property("division_id");
        let res = body.result.data;
        cy.Success(body);
        expect(res).has.property("is_verified");
        expect(res).has.property("id");
        expect(res).has.property("contact_name",requestData.contact_name).to.be.string;
        expect(res).has.property("type", requestData.type).to.be.string;
        expect(res).has.property("address_1", requestData.address_1).to.be.string;
        expect(res).has.property("address_2", requestData.address_2).to.be.string;
        expect(res).has.property("address_3", requestData.address_3).to.be.string;
        expect(res).has.property("address_4", requestData.address_4).to.be.string;
        expect(res).has.property("city", requestData.city).to.be.string;
        expect(res).has.property("state", requestData.state).to.be.string;
        expect(res).has.property("zip", requestData.zip).to.be.string;
        expect(res).has.property("country", requestData.country).to.be.string;
        expect(res).has.property("status", requestData.status);
        expect(res).has.property("created_date");
        expect(res).has.property("created_by");
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {

  it("Test cases When not providing any field", () => {
    
    cy.request({
        method: routes.put, body: {},
        url: `${routes.post_division_address}${division_addr_id}`,
       headers: { Authorization: Cypress.env("companyToken") },
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

  it("Test cases When not providing optional fields", () => {
    let requestData = req_division({},["address_2","address_3","address_4","division_id"])
   
    cy.request({
        method: routes.put,
        body: requestData,
        url: `${routes.post_division_address}${division_addr_id}`,
       headers: { Authorization: Cypress.env("companyToken") },
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

  it("Test cases When optional fields are null and not provided required field", () => {
    let requestData = req_division({
      address_2: null,
      address_3: null,
      address_4: null
    },["contact_name","type","address_1","city","state","zip","country","division_id"])
   
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_division_address}${division_addr_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
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

  it("Test cases When optional fields are blank", () => {
    let requestData = req_division({
      address_2: "",
      address_3: "",
      address_4: ""
    },["division_id"])
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_division_address}${division_addr_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
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

  it("Test case for update API with all field", () => {
    let reqData = req_division({},["division_id"])
   
    cy.request({
      method: routes.put,
      body: reqData,
      url: `${routes.post_division_address}${division_addr_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
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
    let requestData = {
      search: [
        {
          key: "address.id",
          operation: "=",
          val: division_addr_id
        }
      ],
      searchOr: [
        {
          key: "address.id",
          operation: "=",
          val: division_addr_id
        }
      ],
      searchOrAnd: [
        {
          key: "address.id",
          operation: "=",
          val: division_addr_id
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
        "division.id as division_id",
        "division.code"
      ],
      sort: "address.id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_division_address}${"fetch"}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
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
        expect(ele).has.property("division_id");
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
      url: `${routes.post_division_address}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {}
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
        expect(ele).has.property("division_id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
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
        "division.id as division_id",
        "division.code"
      ],
      sort: "address.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_division_address}${"fetch"}`,
      body: requestData,
     headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("contact_name");
        expect(ele).has.property("type");
        expect(ele).has.property("address_1");
        expect(ele).has.property("city");
        expect(ele).has.property("state");
        expect(ele).has.property("zip");
        expect(ele).has.property("country");
        expect(ele).has.property("status");
        expect(ele).has.property("division_id");
        expect(ele).has.property("code");
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
          val: division_addr_id,
        },
      ],
      select: [],
      sort: "address.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_division_address}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any, index: any) => {
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
        expect(ele).has.property("division_id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when not provide search and select field", () => {
    let requestData = {
      sort: "address.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_division_address}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
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
        expect(ele).has.property("division_id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_division_address}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "address.id",
            operation: "=",
            val: Cypress.env("RandomNumber")
          }
        ],
        select: ["address.id", "address.country", "address.status"],
        sort: "address.id",
        orderby: "desc",
        page: 1,
        perPage:20,
      }
    }).then(({ body }) => {
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
      // cy.check_log(body);
      cy.log(JSON.stringify(body))
    });
  });

  it("Test case for track-change-data API", () => {
    let recordId = division_addr_id.toString();
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
      cy.log(JSON.stringify(body))
      // expect(body).has.property("statusCode", 200);
      // expect(body).has.property("success", true);
      // expect(body).has.property("error", null);
      // expect(body).has.property("result");
      // expect(body.result).has.property(
      //   "message",
      //   "Track-change logs(s) fetched successfully"
      // );
      // body.result.data.map((element: any) => {
      //   expect(element).has.property("_id", element._id);
      //   expect(element).has.property("operation", element.operation);
      //   expect(element).has.property("userId", element.userId);
      //   expect(element).has.property("username", element.username);
      //   expect(element).has.property("createdAt", element.createdAt);
      // });
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
      cy.log(JSON.stringify(body))
      // expect(JSON.stringify(body)).to.deep.equal(JSON.stringify(obj));
    });
  });
});

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {

  it("Test cases When do not provide required field", () => {
    cy.request({
      method: routes.post,
      body: {},
      url: routes.post_division_address,
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
      expect(body.error.errorDetails).has.property("division_id");
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
      division_id: "",
    };
    cy.request({
      method: routes.post,
      url: routes.post_division_address,
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
      expect(body.error.errorDetails).has.property("division_id");
    });
  });

  it("Test cases When division_id doesn't exist", () => {
    let requestData = req_division({ division_id: Cypress.env("RandomNumber")})
   
    cy.request({
      method: routes.post,
      url: routes.post_division_address,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(requestData))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("division_id");
    });
  });

  it("division_id and status should be number", () => {
    let requestData = req_division({ 
        division_id: Cypress.env("RandomNum"),
        status: Cypress.env("RandomNum")
    });
    
    cy.request({
      method: routes.post,
      url: routes.post_division_address,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(requestData))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
      expect(body.error.errorDetails).has.property("division_id");
    });
  });

  it("Status mest be one of [0 abd 1]", () => {
    let requestData = req_division({ status: Cypress.env("RandomNumber") });
    cy.request({
      method: routes.post,
      url: routes.post_division_address,
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
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_division_address}${Cypress.env("Random")}`,
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
      url: `${routes.post_division_address}${Cypress.env("RandomNumber")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "division_address_id",`{division_address_id} is invalid`);
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
      url: `${routes.post_warehouse_address}${division_addr_id}`,
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
    let requestData = req_division({ status: Cypress.env("RandomNum")},[ "division_id"]);
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_address}${division_addr_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("Status mest be one of [0 abd 1]", () => {
    let requestData = req_division({ status: Cypress.env("RandomNumber")},[ "division_id"]);
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_address}${division_addr_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

});
