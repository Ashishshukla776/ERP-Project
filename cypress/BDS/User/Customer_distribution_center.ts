import routes from "../../support/route";
import store_msg from "../../support/store_msg";

let cst_dc_id: Number;
let cst_dc_id_1: Number;
let cst_dc_code: String;
let customer_id: Number;
let blank_req
let check_cst
let exist_code
let boolean_req
let number_req
let codelenth
let string_check

  before(() => {
    cy.GetCompanyToken();
    cy.GetCustomerId();
  });
  beforeEach(() => {
    cy.Random();
    cy.RandomDesc();
    cy.RandomNumber();
    cy.randomBoolean();
    cy.RandomNum();
    blank_req =req_dc({
      customer_id: "",
      code: "",
      type: "",
      address_1: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      contact_name: ""
    })
    check_cst = req_dc({ customer_id: Cypress.env("RandomNumber") });
    boolean_req =  req_dc({ status: Cypress.env("RandomNum_2") });
    number_req = req_dc({
      customer_id: Cypress.env("RandomNum"),
      status: Cypress.env("RandomNum")
    });
    codelenth = req_dc({code: Cypress.env("RandomDesc")});
    exist_code = req_dc({code: cst_dc_code});
    string_check = req_dc({
      code: Cypress.env("RandomNumber"),
      edi_dc_no: Cypress.env("RandomNumber"),
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
    });
 });

function req_dc(payload,ignoredata=[]){
  let reqBody = {
    customer_id: payload.hasOwnProperty("customer_id")?payload.customer_id :Cypress.env("cstId"),
    code: payload.hasOwnProperty("code")?payload.code :Cypress.env("Random"),
    edi_dc_no: payload.hasOwnProperty("edi_dc_no")?payload.edi_dc_no :Cypress.env("Random"),
    contact_name:payload.hasOwnProperty("contact_name")?payload.contact_name : Cypress.env("Random"),
    type: payload.hasOwnProperty("type")?payload.type :Cypress.env("Random"),
    address_1: payload.hasOwnProperty("address_1")?payload.address_1 :Cypress.env("Random"),
    address_2:payload.hasOwnProperty("address_2")?payload.address_2 : Cypress.env("Random"),
    address_3: payload.hasOwnProperty("address_3")?payload.address_3 :Cypress.env("Random"),
    address_4: payload.hasOwnProperty("address_4")?payload.address_4 :Cypress.env("Random"),
    city: payload.hasOwnProperty("city")?payload.city :Cypress.env("Random"),
    state: payload.hasOwnProperty("state")?payload.state :Cypress.env("Random"),
    zip: payload.hasOwnProperty("zip")?payload.zip :Cypress.env("Random"),
    country: payload.hasOwnProperty("country")?payload.country :Cypress.env("Random"),
    status: payload.hasOwnProperty("status")?payload.status :1
  };
  ignoredata.forEach((itemrow)=>{
    delete reqBody[itemrow];
  })
  return reqBody
}

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {  

  it("Test cases for create API", () => {
    let requestData = req_dc({});;
    cy.request({
      method: routes.post,
      url: routes.post_dc,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data;
      cst_dc_id = res.id;
      cst_dc_code = res.code;
      customer_id = res.customer_id;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("customer_id",requestData.customer_id)
      expect(res).has.property("code",requestData.code)
      expect(res).has.property("edi_dc_no",requestData.edi_dc_no)
      expect(res).has.property("status",requestData.status)
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("is_verified");
      expect(res).has.property("contact_name",requestData.contact_name)
      expect(res).has.property("type",requestData.type)
      expect(res).has.property("address_1",requestData.address_1)
      expect(res).has.property("address_2",requestData.address_2)
      expect(res).has.property("address_3",requestData.address_3)
      expect(res).has.property("address_4",requestData.address_4)
      expect(res).has.property("city",requestData.city)
      expect(res).has.property("state",requestData.state)
      expect(res).has.property("zip",requestData.zip)
      expect(res).has.property("country",requestData.country)
    });
  });

  it("Test cases for create API when optional fields are blank", () => {
    let requestData = req_dc({
      edi_dc_no: "",
      address_2: "",
      address_3: "",
      address_4: ""
    });
    cy.request({
      method: routes.post,
      url: routes.post_dc,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data;
      cst_dc_id_1 = res.id;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("customer_id",requestData.customer_id)
      expect(res).has.property("code",requestData.code)
      expect(res).has.property("edi_dc_no")
      expect(res).has.property("status",requestData.status)
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("is_verified");
      expect(res).has.property("contact_name",requestData.contact_name)
      expect(res).has.property("type",requestData.type)
      expect(res).has.property("address_1",requestData.address_1)
      expect(res).has.property("address_2")
      expect(res).has.property("address_3")
      expect(res).has.property("address_4")
      expect(res).has.property("city",requestData.city)
      expect(res).has.property("state",requestData.state)
      expect(res).has.property("zip",requestData.zip)
      expect(res).has.property("country",requestData.country)
    });
  });

  it("Test cases for create API when optional fields are null", () => {
    let requestData = req_dc({
      edi_dc_no: null,
      address_2: null,
      address_3: null,
      address_4: null
    });
    cy.request({
      method: routes.post,
      url: routes.post_dc,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("customer_id",requestData.customer_id)
      expect(res).has.property("code",requestData.code)
      expect(res).has.property("edi_dc_no",requestData.edi_dc_no)
      expect(res).has.property("status",requestData.status)
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("is_verified");
      expect(res).has.property("contact_name",requestData.contact_name)
      expect(res).has.property("type",requestData.type)
      expect(res).has.property("address_1",requestData.address_1)
      expect(res).has.property("address_2",requestData.address_2)
      expect(res).has.property("address_3",requestData.address_3)
      expect(res).has.property("address_4",requestData.address_4)
      expect(res).has.property("city",requestData.city)
      expect(res).has.property("state",requestData.state)
      expect(res).has.property("zip",requestData.zip)
      expect(res).has.property("country",requestData.country)
    });
  });

  it("Test cases for create API when not providing optional fields", () => {
    let requestData = req_dc({},
      ["edi_dc_no","address_2","address_3","address_4","status"]);
    cy.request({
      method: routes.post,
      url: routes.post_dc,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("customer_id",requestData.customer_id)
      expect(res).has.property("code",requestData.code)
      expect(res).has.property("status")
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("is_verified");
      expect(res).has.property("contact_name",requestData.contact_name)
      expect(res).has.property("type",requestData.type)
      expect(res).has.property("address_1",requestData.address_1)
      expect(res).has.property("city",requestData.city)
      expect(res).has.property("state",requestData.state)
      expect(res).has.property("zip",requestData.zip)
      expect(res).has.property("country",requestData.country)
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {

  it("Test case for update API when optionan field are left blank", () => {
    let requestData = req_dc({
      code:cst_dc_code,
      edi_dc_no: "",
      address_2: "",
      address_3: "",
      address_4: ""
    });
    cy.request({
      method: routes.put,
      url: `${routes.post_dc}${cst_dc_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("customer_id",requestData.customer_id)
      expect(res).has.property("code",requestData.code)
      expect(res).has.property("edi_dc_no")
      expect(res).has.property("status",requestData.status)
      expect(res).has.property("created_date"); 
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("contact_name",requestData.contact_name)
      expect(res).has.property("type",requestData.type)
      expect(res).has.property("address_1",requestData.address_1)
      expect(res).has.property("address_2")
      expect(res).has.property("address_3")
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

  it("Test case for update API when optionan field are left null", () => {
    let requestData = req_dc({
      code:cst_dc_code,
      edi_dc_no: null,
      address_2: null,
      address_3: null,
      address_4: null
    });
    cy.request({
      method: routes.put,
      url: `${routes.post_dc}${cst_dc_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("customer_id",requestData.customer_id)
      expect(res).has.property("code",requestData.code)
      expect(res).has.property("edi_dc_no",requestData.edi_dc_no)
      expect(res).has.property("status",requestData.status)
      expect(res).has.property("created_date"); 
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("contact_name",requestData.contact_name)
      expect(res).has.property("type",requestData.type)
      expect(res).has.property("address_1",requestData.address_1)
      expect(res).has.property("address_2",requestData.address_2)
      expect(res).has.property("address_3",requestData.address_3)
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

  it("Test case for update API when optionan field are not provided", () => {
    let requestData = req_dc({code:cst_dc_code},
      ["edi_dc_no","address_2","address_3","address_4","status"]);
    cy.request({
      method: routes.put,
      url: `${routes.post_dc}${cst_dc_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("customer_id",requestData.customer_id)
      expect(res).has.property("code",requestData.code)
      expect(res).has.property("edi_dc_no")
      expect(res).has.property("status")
      expect(res).has.property("created_date"); 
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("contact_name",requestData.contact_name)
      expect(res).has.property("type",requestData.type)
      expect(res).has.property("address_1",requestData.address_1)
      expect(res).has.property("address_2")
      expect(res).has.property("address_3")
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

  it("Test case for update API when required field are not provided", () => {
    let requestData = req_dc({},
      ["customer_id","code","contact_name","address_1","city","state","zip","country"]);
    cy.request({
      method: routes.put,
      url: `${routes.post_dc}${cst_dc_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("customer_id")
      expect(res).has.property("code")
      expect(res).has.property("edi_dc_no",requestData.edi_dc_no)
      expect(res).has.property("status",requestData.status)
      expect(res).has.property("created_date"); 
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("contact_name")
      expect(res).has.property("type")
      expect(res).has.property("address_1")
      expect(res).has.property("address_2",requestData.address_2)
      expect(res).has.property("address_3",requestData.address_3)
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
      url: `${routes.post_dc}${cst_dc_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {},
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("customer_id")
      expect(res).has.property("code")
      expect(res).has.property("edi_dc_no")
      expect(res).has.property("status")
      expect(res).has.property("created_date"); 
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("contact_name")
      expect(res).has.property("type")
      expect(res).has.property("address_1")
      expect(res).has.property("address_2")
      expect(res).has.property("address_3")
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

  it("Test case for update API", () => {
    let requestData = req_dc({code:cst_dc_code,});
    cy.request({
      method: routes.put,
      url: `${routes.post_dc}${cst_dc_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("customer_id",requestData.customer_id)
      expect(res).has.property("code",requestData.code)
      expect(res).has.property("edi_dc_no",requestData.edi_dc_no)
      expect(res).has.property("status",requestData.status)
      expect(res).has.property("created_date"); 
      expect(res).has.property("updated_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("contact_name",requestData.contact_name)
      expect(res).has.property("type",requestData.type)
      expect(res).has.property("address_1",requestData.address_1)
      expect(res).has.property("address_2",requestData.address_2)
      expect(res).has.property("address_3",requestData.address_3)
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
    let reqData = {
      search: [
        {
          key: "customer_distribution_center.id",
          operation: "=",
          val: cst_dc_id
        }
      ],
      select: [
        "customer_distribution_center.id",
        "customer_distribution_center.code",
        "customer_distribution_center.edi_dc_no",
        "address.id as address_id",
        "address.type as address_type",
        "address.city",
        "address.state",
        "address.country",
        "address.status as address_status",
        "address.contact_name",
      ],
      sort: "customer_distribution_center.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_dc}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index: any) => {
        expect(ele).has.property("id",reqData.search[index].val);
        expect(ele).has.property("reference_address_type");
        expect(ele).has.property("code");
        expect(ele).has.property("edi_dc_no");
        expect(ele).has.property("address_id");
        expect(ele).has.property("address_type");
        expect(ele).has.property("city");
        expect(ele).has.property("state");
        expect(ele).has.property("country");
        expect(ele).has.property("address_status");
        expect(ele).has.property("contact_name");
      });
      expect(body.result).has.property("page", reqData.page);
      expect(body.result).has.property("perPage", reqData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_dc}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("customer_id");
        expect(ele).has.property("code");
        expect(ele).has.property("edi_dc_no");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("reference_address_type");
        expect(ele).has.property("customers_code");
        expect(ele).has.property("customers_name");
        expect(ele).has.property("customers_retail_type_id");
        expect(ele).has.property("address_id");
        expect(ele).has.property("contact_name");
        expect(ele).has.property("address_type");
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
    let reqData = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [
        "customer_distribution_center.id",
        "customer_distribution_center.code",
        "customer_distribution_center.edi_dc_no",
        "address.id as address_id",
        "address.type as address_type",
        "address.city",
        "address.state",
        "address.country",
        "address.status as address_status",
        "address.contact_name"
      ],
      sort: "customer_distribution_center.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_dc}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("reference_address_type");
        expect(ele).has.property("code");
        expect(ele).has.property("edi_dc_no");
        expect(ele).has.property("address_id");
        expect(ele).has.property("address_type");
        expect(ele).has.property("city");
        expect(ele).has.property("state");
        expect(ele).has.property("country");
        expect(ele).has.property("address_status");
        expect(ele).has.property("contact_name");
      });
      expect(body.result).has.property("page", reqData.page);
      expect(body.result).has.property("perPage", reqData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when select field are balnk", () => {
    let reqData =  {
      search: [
        {
          key: "customer_distribution_center.id",
          operation: "=",
          val: cst_dc_id,
        },
      ],
      select: [],
      sort: "customer_distribution_center.id",
      orderby: "desc",
      page: "1",
      perPage: "20",
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_dc}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("customer_id");
        expect(ele).has.property("code");
        expect(ele).has.property("edi_dc_no");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("reference_address_type");
        expect(ele).has.property("customers_code");
        expect(ele).has.property("customers_name");
        expect(ele).has.property("customers_retail_type_id");
        expect(ele).has.property("address_id");
        expect(ele).has.property("contact_name");
        expect(ele).has.property("address_type");
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

  it("Test case for fetch API when search and select field are left blank", () => {
    let reqData = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [],
      sort: "customer_distribution_center.id",
      orderby: "desc",
      page:1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_dc}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("customer_id");
        expect(ele).has.property("code");
        expect(ele).has.property("edi_dc_no");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("reference_address_type");
        expect(ele).has.property("customers_code");
        expect(ele).has.property("customers_name");
        expect(ele).has.property("customers_retail_type_id");
        expect(ele).has.property("address_id");
        expect(ele).has.property("contact_name");
        expect(ele).has.property("address_type");
        expect(ele).has.property("address_1");
        expect(ele).has.property("address_2");
        expect(ele).has.property("address_3");
        expect(ele).has.property("address_4");
        expect(ele).has.property("city");
        expect(ele).has.property("state");
        expect(ele).has.property("country");
      });
      expect(body.result).has.property("page", reqData.page);
      expect(body.result).has.property("perPage", reqData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_dc}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "customer_distribution_center.id",
            operation: "=",
            val: Cypress.env("RandomNumber")
          }
        ],
        select: [
          "customer_distribution_center.id as dcid",
          "customer_distribution_center.edi_dc_no",
          "address.country",
          "address.status",
          "address.contact_name",
          "customers.id as cid",
        ],
        sort: "customer_distribution_center.id",
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

  it("Code should be maximum 40 charector", () => {
    cy.request({
      method: routes.post,
      url: routes.post_dc,
   headers: { Authorization: Cypress.env("companyToken") },
      body: codelenth,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When code already exist", () => {
    cy.request({
      method: routes.post,
      url: routes.post_dc,
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
      url: routes.post_dc,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("address_1");
      expect(body.error.errorDetails).has.property("city");
      expect(body.error.errorDetails).has.property("state");
      expect(body.error.errorDetails).has.property("zip");
      expect(body.error.errorDetails).has.property("country");
      expect(body.error.errorDetails).has.property("contact_name");
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: routes.post,
      url: routes.post_dc,
   headers: { Authorization: Cypress.env("companyToken") },
      body: blank_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("address_1");
      expect(body.error.errorDetails).has.property("city");
      expect(body.error.errorDetails).has.property("state");
      expect(body.error.errorDetails).has.property("zip");
      expect(body.error.errorDetails).has.property("country");
      expect(body.error.errorDetails).has.property("contact_name");
    });
  });

  it("Test cases When customer_id does not exist", () => {
   cy.request({
      method: routes.post,
      url: routes.post_dc,
   headers: { Authorization: Cypress.env("companyToken") },
      body: check_cst,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("Status must be one of [0 ans 1]", () => {
    cy.request({
      method: routes.post,
      url: routes.post_dc,
   headers: { Authorization: Cypress.env("companyToken") },
      body: boolean_req,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("customer_id and Status should be number", () => {
   cy.request({
      method: routes.post,
      url: routes.post_dc,
   headers: { Authorization: Cypress.env("companyToken") },
      body: number_req,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("code, edi_dc_no, contact_name, type, address,city, state, zip and country should be string", () => {
    cy.request({
      method: routes.post,
      url: routes.post_dc,
   headers: { Authorization: Cypress.env("companyToken") },
      body: string_check,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("edi_dc_no");
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
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {

  it("Code should be maximum 40 charector", () => {
   cy.request({
      method: routes.put,
      url: `${routes.post_dc}${cst_dc_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: codelenth,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Code(body);  
    });
  });

  it("Test cases When code already exist", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_dc}${cst_dc_id_1}`,
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
      url: `${routes.post_dc}${Cypress.env("Random")}`,
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
      url: `${routes.post_dc}${Cypress.env("RandomNumber")}`,
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
      url: `${routes.post_dc}${cst_dc_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: blank_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("address_1");
      expect(body.error.errorDetails).has.property("city");
      expect(body.error.errorDetails).has.property("state");
      expect(body.error.errorDetails).has.property("zip");
      expect(body.error.errorDetails).has.property("country");
      expect(body.error.errorDetails).has.property("contact_name");
    });
  });

  it("Status must be one of [0 ans 1]", () => {
     cy.request({
      method: routes.put,
      url: `${routes.post_dc}${cst_dc_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: boolean_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("customer_id and Status should be number", () => {
     cy.request({
      method: routes.put,
      url: `${routes.post_dc}${cst_dc_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: number_req,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("code, edi_dc_no, contact_name, type, address,city, state, zip and country should be string", () => {
   cy.request({
      method: routes.put,
      url: `${routes.post_dc}${cst_dc_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: string_check,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("edi_dc_no");
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
});

describe(`${store_msg.success_log}${Cypress.spec["fileName"]}`, () => {

  it("Test cases for get-log API", () => {
    let today = new Date().toISOString().slice(0, 10);
    cy.request({
      method:routes.post,
      url: routes.get_log,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        module_name: "customer_distribution_center",
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
        perPage: 20,
      }
    }).then(({ body }) => {
      cy.check_log(body);
    });
  });

  it("Test case for track-change-data API", () => {
    let recordId = cst_dc_id.toString();
    cy.request({
      method: routes.post,
      url: routes.track_change,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        module: "customer_distribution_center",
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
    let name = "Customer_distribution_center";
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
                  "updated_by"
                ]
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
