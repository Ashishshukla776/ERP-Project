import routes from "../../support/route";
import store_msg from "../../support/store_msg";

let store_id: Number;
let store_id_1: Number;
let store_code: String;
let codelength
let exist_code
let blank_req
let number_req
let boolean_req
let check_dc_id
let string_req
let check_cst
let createUrl
let updateUrl
let fetchUrl

before(() => {
  cy.GetCompanyToken();
  cy.GetCustomerId();
  cy.GetdcId();
  createUrl = routes.post_cst_store;
  updateUrl = `${routes.post_cst_store}${store_id}`;
  fetchUrl = `${routes.post_cst_store}${"fetch"}`;
});

beforeEach(() => {
  cy.Random();
  cy.RandomNumber();
  cy.RandomNum();
  cy.RandomDesc();
  cy.randomBoolean();
  codelength = req_cstStore({ code: Cypress.env("RandomDesc")})
  exist_code =req_cstStore({code: store_code})
  blank_req =req_cstStore({
    customer_id: "",
    code: "",
    contact_name: "",
    type: "",
    address_1: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    status: ""
  });
  number_req =req_cstStore({ 
    dc_id: Cypress.env("RandomNum"),
    customer_id: Cypress.env("RandomNum"),
    status: Cypress.env("RandomNum")
  });
  boolean_req = req_cstStore({ status: Cypress.env("RandomNumber")})
  check_dc_id = req_cstStore({ dc_id: Cypress.env("RandomNumber") });
  check_cst = req_cstStore({ customer_id: Cypress.env("RandomNumber") });
  string_req = req_cstStore({
    code: Cypress.env("RandomNumber"),
    edi_store_no: Cypress.env("RandomNumber"),
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
  })
});

function req_cstStore(payload,ignoredata=[]){
  let reqBody = {
    code: payload.hasOwnProperty("code")?payload.code :Cypress.env("Random"),
    dc_id: payload.hasOwnProperty("dc_id")?payload.dc_id :Cypress.env("dcId"),
    edi_store_no: payload.hasOwnProperty("edi_store_no")?payload.edi_store_no :Cypress.env("Random"),
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
    customer_id: payload.hasOwnProperty("customer_id")?payload.customer_id :Cypress.env("cstId"),
    status: payload.hasOwnProperty("status")?payload.status :1
  };
  ignoredata.forEach((itemrow)=>{
    delete reqBody[itemrow];
  })
  return reqBody
}

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {

  it("Test cases for create API", () => {
    let requestData = req_cstStore({});
    cy.request({
      method: routes.post,
      url: createUrl,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res =body.result.data;
      store_id = res.id;
      store_code = res.code;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("customer_id",requestData.customer_id);
      expect(res).has.property("code",requestData.code)
      expect(res).has.property("dc_id",requestData.dc_id);
      expect(res).has.property("edi_store_no",requestData.edi_store_no);
      expect(res).has.property("status",requestData.status);
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("is_verified");
      expect(res).has.property("contact_name",requestData.contact_name)
      expect(res).has.property("type",requestData.type)
      expect(res).has.property("address_1",requestData.address_1)
      expect(res).has.property("address_2",requestData.address_2)
      expect(res).has.property("address_3",requestData.address_3);
      expect(res).has.property("address_4",requestData.address_4)
      expect(res).has.property("city",requestData.city)
      expect(res).has.property("state",requestData.state)
      expect(res).has.property("zip",requestData.zip)
      expect(res).has.property("country",requestData.country)
    });
  });

  it("Test cases for create API when optional fields are blank", () => {
    let requestData = req_cstStore({
      dc_id: "",
      edi_store_no: "",
      address_2: "",
      address_3: "",
      address_4: ""
    });
    cy.request({
      method: routes.post,
      url: createUrl,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      store_id_1 = body.result.data.id;
      let res =body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("customer_id",requestData.customer_id);
      expect(res).has.property("code",requestData.code)
      expect(res).has.property("dc_id");
      expect(res).has.property("edi_store_no");
      expect(res).has.property("status",requestData.status);
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("is_verified");
      expect(res).has.property("contact_name",requestData.contact_name)
      expect(res).has.property("type",requestData.type)
      expect(res).has.property("address_1",requestData.address_1)
      expect(res).has.property("address_2")
      expect(res).has.property("address_3");
      expect(res).has.property("address_4")
      expect(res).has.property("city",requestData.city)
      expect(res).has.property("state",requestData.state)
      expect(res).has.property("zip",requestData.zip)
      expect(res).has.property("country",requestData.country)
    });
  });

  it("Test cases for create API when optional fields are null", () => {
    let requestData = req_cstStore({
      dc_id:null,
      edi_store_no:null,
      address_2:null,
      address_3:null,
      address_4:null
    });
    cy.request({
      method: routes.post,
      url: createUrl,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      let res =body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("customer_id",requestData.customer_id);
      expect(res).has.property("code",requestData.code)
      expect(res).has.property("dc_id",requestData.dc_id);
      expect(res).has.property("edi_store_no",requestData.edi_store_no);
      expect(res).has.property("status",requestData.status);
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("is_verified");
      expect(res).has.property("contact_name",requestData.contact_name)
      expect(res).has.property("type",requestData.type)
      expect(res).has.property("address_1",requestData.address_1)
      expect(res).has.property("address_2",requestData.address_2)
      expect(res).has.property("address_3",requestData.address_3);
      expect(res).has.property("address_4",requestData.address_4)
      expect(res).has.property("city",requestData.city)
      expect(res).has.property("state",requestData.state)
      expect(res).has.property("zip",requestData.zip)
      expect(res).has.property("country",requestData.country)
    });
  });

  it("Test cases for create API when not providing optional fields", () => {
    let requestData = req_cstStore({},
      ["dc_id","edi_store_no","address_2","address_3","address_4","status"]
    );
    cy.request({
      method: routes.post,
      url: createUrl,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      let res =body.result.data;
      cy.Success(body);
      expect(res).has.property("status");
      expect(res).has.property("id");
      expect(res).has.property("customer_id",requestData.customer_id);
      expect(res).has.property("code",requestData.code)
      expect(res).has.property("dc_id");
      expect(res).has.property("edi_store_no");
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("is_verified");
      expect(res).has.property("contact_name",requestData.contact_name)
      expect(res).has.property("type",requestData.type)
      expect(res).has.property("address_1",requestData.address_1)
      expect(res).has.property("address_2")
      expect(res).has.property("address_3");
      expect(res).has.property("address_4")
      expect(res).has.property("city",requestData.city)
      expect(res).has.property("state",requestData.state)
      expect(res).has.property("zip",requestData.zip)
      expect(res).has.property("country",requestData.country)
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {

  it("Test case for update API when optionan field are blank", () => {
    let requestData = req_cstStore({
      code:store_code,
      dc_id: "",
      edi_store_no: "",
      address_2: "",
      address_3: "",
      address_4: ""
    });
    cy.request({
      method: routes.put,
      url: `${createUrl}${store_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res =body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("customer_id",requestData.customer_id);
      expect(res).has.property("code",requestData.code)
      expect(res).has.property("dc_id");
      expect(res).has.property("edi_store_no");
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("status",requestData.status);
      expect(res).has.property("contact_name",requestData.contact_name)
      expect(res).has.property("type",requestData.type)
      expect(res).has.property("address_1",requestData.address_1)
      expect(res).has.property("address_2")
      expect(res).has.property("address_3");
      expect(res).has.property("address_4")
      expect(res).has.property("city",requestData.city)
      expect(res).has.property("state",requestData.state)
      expect(res).has.property("zip",requestData.zip)
      expect(res).has.property("country",requestData.country)
      expect(res).has.property("verification_source");      
      expect(res).has.property("is_verified");
      expect(res).has.property("verified_date");
      expect(res).has.property("verified_by");
    });
  });

  it("Test case for update API when optionan field are Null", () => {
    let requestData = req_cstStore({
      code:store_code,
      dc_id: null,
      edi_store_no: null,
      address_2: null,
      address_3: null,
      address_4: null
    });
    cy.request({
      method: routes.put,
      url: `${createUrl}${store_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res =body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("customer_id",requestData.customer_id);
      expect(res).has.property("code",requestData.code)
      expect(res).has.property("dc_id",requestData.dc_id);
      expect(res).has.property("edi_store_no",requestData.edi_store_no);
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("status",requestData.status);
      expect(res).has.property("contact_name",requestData.contact_name)
      expect(res).has.property("type",requestData.type)
      expect(res).has.property("address_1",requestData.address_1)
      expect(res).has.property("address_2",requestData.address_2)
      expect(res).has.property("address_3",requestData.address_3);
      expect(res).has.property("address_4",requestData.address_4)
      expect(res).has.property("city",requestData.city)
      expect(res).has.property("state",requestData.state)
      expect(res).has.property("zip",requestData.zip)
      expect(res).has.property("country",requestData.country)
      expect(res).has.property("verification_source");      
      expect(res).has.property("is_verified");
      expect(res).has.property("verified_date");
      expect(res).has.property("verified_by");
    });
  });

  it("Test case for update API when not providing optionan field", () => {
    let requestData = req_cstStore({code:store_code},
      ["dc_id","edi_store_no","address_2","address_3","address_4","status"]
    );
    cy.request({
      method: routes.put,
      url: `${createUrl}${store_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res =body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("customer_id",requestData.customer_id);
      expect(res).has.property("code",requestData.code)
      expect(res).has.property("dc_id");
      expect(res).has.property("edi_store_no");
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("status");
      expect(res).has.property("contact_name",requestData.contact_name)
      expect(res).has.property("type",requestData.type)
      expect(res).has.property("address_1",requestData.address_1)
      expect(res).has.property("address_2")
      expect(res).has.property("address_3");
      expect(res).has.property("address_4")
      expect(res).has.property("city",requestData.city)
      expect(res).has.property("state",requestData.state)
      expect(res).has.property("zip",requestData.zip)
      expect(res).has.property("country",requestData.country)
      expect(res).has.property("verification_source");      
      expect(res).has.property("is_verified");
      expect(res).has.property("verified_date");
      expect(res).has.property("verified_by");
    });
  });

  it("Test case for update API when not providing required fields", () => {
    let requestData = req_cstStore({code:store_code},
      ["code","customer_id","contact_name","type","address_1","city","state","zip","country"]
    );
    cy.request({
      method: routes.put,
      url: `${createUrl}${store_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res =body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("customer_id");
      expect(res).has.property("code")
      expect(res).has.property("dc_id",requestData.dc_id);
      expect(res).has.property("edi_store_no",requestData.edi_store_no);
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("status",requestData.status);
      expect(res).has.property("contact_name")
      expect(res).has.property("type")
      expect(res).has.property("address_1")
      expect(res).has.property("address_2",requestData.address_2)
      expect(res).has.property("address_3",requestData.address_3);
      expect(res).has.property("address_4",requestData.address_4)
      expect(res).has.property("city")
      expect(res).has.property("state")
      expect(res).has.property("zip")
      expect(res).has.property("country")
      expect(res).has.property("verification_source");      
      expect(res).has.property("is_verified");
      expect(res).has.property("verified_date");
      expect(res).has.property("verified_by");
    });
  });

  it("Test case for update API when does not provide any field", () => {
    cy.request({
      method: routes.put,
      url: `${createUrl}${store_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {}
    }).then(({ body }) => {
      let res =body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("customer_id");
      expect(res).has.property("code")
      expect(res).has.property("dc_id");
      expect(res).has.property("edi_store_no");
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("status");
      expect(res).has.property("contact_name")
      expect(res).has.property("type")
      expect(res).has.property("address_1")
      expect(res).has.property("address_2")
      expect(res).has.property("address_3");
      expect(res).has.property("address_4")
      expect(res).has.property("city")
      expect(res).has.property("state")
      expect(res).has.property("zip")
      expect(res).has.property("country")
      expect(res).has.property("verification_source");      
      expect(res).has.property("is_verified");
      expect(res).has.property("verified_date");
      expect(res).has.property("verified_by");
    });
  });

  it("Test case for update API with all field", () => {
    let requestData = req_cstStore({ code:store_code });
    cy.request({
      method: routes.put,
      url: `${createUrl}${store_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res =body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("customer_id",requestData.customer_id);
      expect(res).has.property("code",requestData.code)
      expect(res).has.property("dc_id",requestData.dc_id);
      expect(res).has.property("edi_store_no",requestData.edi_store_no);
      expect(res).has.property("created_date");
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("status",requestData.status);
      expect(res).has.property("contact_name",requestData.contact_name)
      expect(res).has.property("type",requestData.type)
      expect(res).has.property("address_1",requestData.address_1)
      expect(res).has.property("address_2",requestData.address_2)
      expect(res).has.property("address_3",requestData.address_3);
      expect(res).has.property("address_4",requestData.address_4)
      expect(res).has.property("city",requestData.city)
      expect(res).has.property("state",requestData.state)
      expect(res).has.property("zip",requestData.zip)
      expect(res).has.property("country",requestData.country)
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
          key: "customer_store.id",
          operation: "=",
          val: store_id,
        },
      ],
      select: [
        "customer_store.code",
        "customer_store.dc_id",
        "address.country",
        "address.status",
        "address.contact_name",
        "customers.id as cid",
      ],
      sort: "customer_store.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: fetchUrl,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index) => {
        expect(ele).has.property("id", requestData.search[index].val);
        expect(ele).has.property("code");
        expect(ele).has.property("dc_id");
        expect(ele).has.property("country");
        expect(ele).has.property("status");
        expect(ele).has.property("contact_name");
        expect(ele).has.property("cid");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
      method: routes.post,
      url: fetchUrl,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {}
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("customer_id");
        expect(ele).has.property("code");
        expect(ele).has.property("dc_id");
        expect(ele).has.property("edi_store_no");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("status");
        expect(ele).has.property("reference_id");
        expect(ele).has.property("customers_code");
        expect(ele).has.property("name");
        expect(ele).has.property("retail_type_id");
        expect(ele).has.property("master_code");
        expect(ele).has.property("contact_name");
        expect(ele).has.property("type");
        expect(ele).has.property("address_1");
        expect(ele).has.property("address_2");
        expect(ele).has.property("address_3");
        expect(ele).has.property("address_4");
        expect(ele).has.property("city");
        expect(ele).has.property("state");
        expect(ele).has.property("country");
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
        "customer_store.code",
        "customer_store.dc_id",
        "address.country",
        "address.status",
        "address.contact_name",
        "customers.id as cid",
      ],
      sort: "customer_store.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: fetchUrl,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index) => {
        expect(ele).has.property("id");
        expect(ele).has.property("code");
        expect(ele).has.property("dc_id");
        expect(ele).has.property("country");
        expect(ele).has.property("status");
        expect(ele).has.property("contact_name");
        expect(ele).has.property("cid");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when not provide select field", () => {
    let requestData = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [],
      sort: "customer_store.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: fetchUrl,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("customer_id");
        expect(ele).has.property("code");
        expect(ele).has.property("dc_id");
        expect(ele).has.property("edi_store_no");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("status");
        expect(ele).has.property("reference_id");
        expect(ele).has.property("customers_code");
        expect(ele).has.property("name");
        expect(ele).has.property("retail_type_id");
        expect(ele).has.property("master_code");
        expect(ele).has.property("contact_name");
        expect(ele).has.property("type");
        expect(ele).has.property("address_1");
        expect(ele).has.property("address_2");
        expect(ele).has.property("address_3");
        expect(ele).has.property("address_4");
        expect(ele).has.property("city");
        expect(ele).has.property("state");
        expect(ele).has.property("country");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: fetchUrl,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "customer_store.id",
            operation: "=",
            val: Cypress.env("RandomNumber")
          }
        ],
        select: [ "customer_store.id","address.country", "address.status"],
        sort: "customer_store.id",
        orderby: "desc",
        page:1,
        perPage: 20
      }
    }).then(({ body }) => {
      cy.Success(body);
    });
  });
});

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {

  it("Code should be maximum 40 charector", () => {
    cy.request({
      method: routes.post,
      url: createUrl,
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
      url: createUrl,
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
      url: createUrl,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body)
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("contact_name");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("address_1");
      expect(body.error.errorDetails).has.property("city");
      expect(body.error.errorDetails).has.property("state");
      expect(body.error.errorDetails).has.property("zip");
      expect(body.error.errorDetails).has.property("country");
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: routes.post,
      url: createUrl,
      headers: { Authorization: Cypress.env("companyToken") },
      body: blank_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body)
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("contact_name");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("address_1");
      expect(body.error.errorDetails).has.property("city");
      expect(body.error.errorDetails).has.property("state");
      expect(body.error.errorDetails).has.property("zip");
      expect(body.error.errorDetails).has.property("country");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("Test cases When dc_id doesn't exist", () => {
    cy.request({
      method: routes.post,
      url: createUrl,
      headers: { Authorization: Cypress.env("companyToken") },
      body: check_dc_id,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("dc_id");
    });
  });

  it("Test cases When customer_id doesn't exist", () => {
    cy.request({
      method: routes.post,
      url: createUrl,
      headers: { Authorization: Cypress.env("companyToken") },
      body: check_cst,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
    });
  });

  it("dc_id, customer_id and status should be number", () => {
    cy.request({
      method: routes.post,
      url: createUrl,
      headers: { Authorization: Cypress.env("companyToken") },
      body: number_req,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("dc_id");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("edi_store_no, contact_name, type, address, city, state, zip and country should be String", () => {
    cy.request({
      method: routes.post,
      url: createUrl,
      headers: { Authorization: Cypress.env("companyToken") },
      body: string_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("edi_store_no");
      expect(body.error.errorDetails).has.property("contact_name");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("address_1");
      expect(body.error.errorDetails).has.property("address_2");
      expect(body.error.errorDetails).has.property("address_3");
      expect(body.error.errorDetails).has.property("address_4");
      expect(body.error.errorDetails).has.property("city");
      expect(body.error.errorDetails).has.property("state");
      expect(body.error.errorDetails).has.property("zip");
      expect(body.error.errorDetails).has.property("country");
    });
  });

  it("Status must be on of [0 and 1]", () => {
    cy.request({
      method: routes.post,
      url: createUrl,
      headers: { Authorization: Cypress.env("companyToken") },
      body: boolean_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {

  it("Code should be maximum 40 charector", () => {
    cy.request({
      method: routes.put,
      url: `${createUrl}${store_id}`,
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
      url: `${createUrl}${store_id_1}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: exist_code,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When alphabet provides along with Id ", () => {
    cy.request({
      method: routes.put,
      url: `${createUrl}${Cypress.env("Random")}`,
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
      url: `${createUrl}${Cypress.env("RandomNumber")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.id);
    });
  });

  it("Test cases When customer_id doesn't exist", () => {
    cy.request({
      method: routes.put,
      url: `${createUrl}${store_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: check_cst,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
    });
  });

  it("Test cases When dc_id doesn't exist", () => {
    cy.request({
      method: routes.put,
      url: `${createUrl}${store_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: check_dc_id,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("dc_id");

    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: routes.put,
      url: `${createUrl}${store_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: blank_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body)
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("contact_name");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("address_1");
      expect(body.error.errorDetails).has.property("city");
      expect(body.error.errorDetails).has.property("state");
      expect(body.error.errorDetails).has.property("zip");
      expect(body.error.errorDetails).has.property("country");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("dc_id, customer_id and status should be number", () => {
    cy.request({
      method: routes.put,
      url: `${createUrl}${store_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: number_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("dc_id");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("edi_store_no, contact_name, type, address, city, state, zip and country should be String", () => {
    cy.request({
      method: routes.put,
      url: `${createUrl}${store_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body:string_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("edi_store_no");
      expect(body.error.errorDetails).has.property("contact_name");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("address_1");
      expect(body.error.errorDetails).has.property("address_2");
      expect(body.error.errorDetails).has.property("address_3");
      expect(body.error.errorDetails).has.property("address_4");
      expect(body.error.errorDetails).has.property("city");
      expect(body.error.errorDetails).has.property("state");
      expect(body.error.errorDetails).has.property("zip");
      expect(body.error.errorDetails).has.property("country");
    });
  });

  it("Status must be on of [0 and 1]", () => {
    cy.request({
      method: routes.put,
      url: `${createUrl}${store_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: boolean_req,
      failOnStatusCode: false
    }).then(({ body }) => {
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
        module_name: "customer_store",
        search: [
          {
            key: "createdAt",
            operation: "date_range",
            val: [today, today],
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
    let recordId = store_id.toString();
    cy.request({
      method: routes.post,
      url: routes.track_change,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        module: "customer_store",
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
    let name = "Customer_store";
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
            "dc_id",
            "edi_store_no",
            "created_date",
            "updated_date",
            "created_by",
            "updated_by",
            "status"
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
                    "updated_by",
                  ]
                }
              }
            },
            dc_id: {
              object: "customer_distribution_center",
              fields: [
                "id",
                "customer_id",
                "code",
                "edi_dc_no",
                "created_date",
                "updated_date",
                "created_by",
                "updated_by",
                "status"
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
                  ]
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
                    ]
                  }
                }
              }
            }
          },
          child: {}
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
