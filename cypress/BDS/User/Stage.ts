import routes from "../../support/route";
import store_msg from "../../support/store_msg";
let stage_id: Number;
let stage_code: String;
let stageCreateReq: any
let stageUpdateReq: any
let stageFetchReq: any
let codelength: any
let exist_code: any
let blank_req: any
let number_req: any
let boolean_req: any
let string_req: any
let stage_id_1: Number;

before(() => {
  cy.GetCompanyToken();
});

beforeEach(() => {
  cy.Random();
  cy.RandomNum();
  cy.RandomDesc();
  cy.RandomNumber();
  cy.randomBoolean();
  codelength = req_stage({ code: Cypress.env("RandomDesc") })
  exist_code = req_stage({ code: stage_code })
  blank_req = req_stage({ code: "", name: "" })
  number_req = req_stage({ status: Cypress.env("RandomNum") })
  boolean_req = req_stage({ status: Cypress.env("RandomNumber") })
  string_req = req_stage({
    code: Cypress.env("RandomNumber"),
    name: Cypress.env("RandomNumber"),
    description: Cypress.env("RandomNumber")
  });
});

function req_stage(payload:any, ignoredata = []) {
  let reqBody = {
    code: payload.hasOwnProperty("code") ? payload.code : Cypress.env("Random"),
    name: payload.hasOwnProperty("name") ? payload.name : Cypress.env("Random"),
    description: payload.hasOwnProperty("description") ? payload.description : Cypress.env("RandomDesc"),
    status: payload.hasOwnProperty("status") ? payload.status : 1
  };
  ignoredata.forEach((itemrow) => {
    delete reqBody[itemrow];
  })
  return reqBody
};

function stageCreateRes(data:any) {
  expect(data).has.property("id");
  expect(data).has.property("code", stageCreateReq.code);
  expect(data).has.property("name", stageCreateReq.name);

  if (stageCreateReq.hasOwnProperty("description")) {
    expect(data).has.property("description", stageCreateReq.description)
  }

  if (stageCreateReq.hasOwnProperty("status")) {
    expect(data).has.property("status", stageCreateReq.status)
  } else { expect(data).has.property("status") }

  expect(data).has.property("created_date");
  expect(data).has.property("created_by");
};

function stageUpdateRes(data:any) {
  expect(data).has.property("id");
  if (stageUpdateReq.hasOwnProperty("code")) {
    expect(data).has.property("code", stageUpdateReq.code)
  } else { expect(data).has.property("code") }

  if (stageUpdateReq.hasOwnProperty("name")) {
    expect(data).has.property("name", stageUpdateReq.name)
  } else { expect(data).has.property("name") }

  if (stageUpdateReq.hasOwnProperty("description")) {
    expect(data).has.property("description", stageUpdateReq.description)
  } else { expect(data).has.property("description") }

  if (stageUpdateReq.hasOwnProperty("status")) {
    expect(data).has.property("status", stageUpdateReq.status)
  } else { expect(data).has.property("status") }

  expect(data).has.property("created_date");
  expect(data).has.property("updated_date");
  expect(data).has.property("created_by");
  expect(data).has.property("updated_by");
};

function stageFetchRes(result:any) {
  result.data.forEach((ele: any) => {
    expect(ele).has.property("id")
    expect(ele).has.property("name");
    expect(ele).has.property("description");
    expect(ele).has.property("status");
    expect(ele).has.property("created_date");
    expect(ele).has.property("updated_date");
    expect(ele).has.property("created_by");
    expect(ele).has.property("updated_by");
    expect(ele).has.property("code");
  });
  if (stageFetchReq.hasOwnProperty("page")) {
    expect(result).has.property("page", stageFetchReq.page)
  } else { expect(result).has.property("page") }
  if (stageFetchReq.hasOwnProperty("page")) {
    expect(result).has.property("perPage", stageFetchReq.perPage);
  } else { expect(result).has.property("perPage") }
  expect(result).has.property("totalRecords");
};

describe(`${store_msg.success}${Cypress.spec["fileName"]}`,()=>{
  context(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {
    it("with proper request", () => {
      stageCreateReq = req_stage({});
      cy.request({
        method: routes.post,
        url: routes.post_stage,
        body: stageCreateReq,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        stage_id = body.result.data.id;
        cy.Success(body);
        stageCreateRes(body.result.data)
      });
    });

    it("when optional field are not provided", () => {
      stageCreateReq = req_stage({},["description","status"]);
      cy.request({
        method: routes.post,
        url: routes.post_stage,
        body: stageCreateReq,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        stage_id_1 = body.result.data.id;
        cy.Success(body);
        stageCreateRes(body.result.data)
      });
    });

    it("when optional field are left blank", () => {
      stageCreateReq = req_stage({description: ""});
      cy.request({
        method: routes.post,
        url: routes.post_stage,
        body: stageCreateReq,
        headers: { Authorization: Cypress.env("companyToken") }
      }).then(({ body }) => {
        cy.Success(body);
        stageCreateRes(body.result.data)
      });
    });

    it("when optional field are left null", () => {
      stageCreateReq = req_stage({description: null});
      cy.request({
        method: routes.post,
        url: routes.post_stage,
        body: stageCreateReq,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Success(body);
        stageCreateRes(body.result.data)
      });
    });
  });

  context(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {
    before(() => { expect(stage_id).to.be.not.undefined });

    it("When do not provide body", () => {
      stageUpdateReq ={}
      cy.request({
        method: routes.put,
        body: stageUpdateReq,
        url: `${routes.post_stage}${stage_id}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Success(body);
        stageUpdateRes(body.result.data)
      });
    });

    it("When do not provide optional field", () => {
      stageUpdateReq = req_stage({},["description","status"]);
      cy.request({
        method: routes.put,
        body: stageUpdateReq,
        url: `${routes.post_stage}${stage_id}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Success(body);
        stageUpdateRes(body.result.data)
      });
    });

    it("When do not provide required field", () => {
      stageUpdateReq = req_stage({},["code","code"]);
      cy.request({
        method: routes.put,
        body: stageUpdateReq,
        url: `${routes.post_stage}${stage_id}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Success(body);
        stageUpdateRes(body.result.data)
      });
    });

    it("When optional field are left blank", () => {
      stageUpdateReq = req_stage({ description: "" });
      cy.request({
        method: routes.put,
        body: stageUpdateReq,
        url: `${routes.post_stage}${stage_id}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Success(body);
        stageUpdateRes(body.result.data)
      });
    });

    it("When optional field are left null", () => {
      stageUpdateReq = req_stage({ description: null });
      cy.request({
        method: routes.put,
        body: stageUpdateReq,
        url: `${routes.post_stage}${stage_id}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Success(body);
        stageUpdateRes(body.result.data)
      });
    });

    it("with proper request", () => {
      stageUpdateReq = req_stage({});
      cy.request({
        method: routes.put,
        body: stageUpdateReq,
        url: `${routes.post_stage}${stage_id}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        stage_code = body.result.data.code;
        cy.Success(body);
        stageUpdateRes(body.result.data)
      });
    });
  });

  context(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {

    it("Test case for fetch API", () => {
      stageFetchReq = {
        search: [
          {
            key: "id",
            operation: "=",
            val: stage_id,
          },
        ],
        select: [
          "id",
          "name",
          "code",
          "description",
          "status",
          "created_date",
          "updated_date",
          "created_by",
          "updated_by",
          "code",
        ],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      };
      cy.request({
        method: routes.post,
        body: stageFetchReq,
        url: `${routes.post_stage}${"fetch"}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Success(body);
        stageFetchRes(body.result)
      });
    });
  
    it("Test case for fetch body when do not provide any fields", () => {
      cy.request({
        method: routes.post,
        body: {},
        url: `${routes.post_stage}${"fetch"}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Success(body);
        stageFetchRes(body.result)
      });
    });
  
    it("Test case for fetch body when not provide search field", () => {
      stageFetchReq = {
        search: [],
        searchOr: [],
        searchOrAnd: [],
        select: [
          "id",
          "name",
          "code",
          "description",
          "status",
          "created_date",
          "updated_date",
          "created_by",
          "updated_by",
          "code",
        ],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20
      };
      cy.request({
        method: routes.post,
        body: stageFetchReq,
        url: `${routes.post_stage}${"fetch"}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Success(body);
        stageFetchRes(body.result)
      });
    });
  
    it("Test case for fetch body when search and select field left blank", () => {
      stageFetchReq = {
        search: [],
        searchOr: [],
        searchOrAnd: [],
        select: [],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      };
      cy.request({
        method: routes.post,
        body: stageFetchReq,
        url: `${routes.post_stage}${"fetch"}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Success(body);
        stageFetchRes(body.result)
      });
    });
  
    it("Test case for fetch API when select field left blank", () => {
      stageFetchReq = {
        search: [
          {
            key: "id",
            operation: "=",
            val: stage_id,
          },
        ],
        select: [],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20
      };
      cy.request({
        method: routes.post,
        body: stageFetchReq,
        url: `${routes.post_stage}${"fetch"}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Success(body);
        stageFetchRes(body.result)
      });
    });
  
    it("Test case for fetch API when wrong/invalid data is provided in search field", () => {
      cy.request({
        method: routes.post,
        url: `${routes.post_stage}${"fetch"}`,
        headers: { Authorization: Cypress.env("companyToken") },
        body: {
          search: [
            {
              key: "id",
              operation: "=",
              val: Cypress.env("RandomNumber")
            }
          ],
          select: ["id", "name", "code", "description", "status"],
          sort: "id",
          orderby: "desc",
          page: 1,
          perPage: 20
        },
      }).then(({ body }) => {
        cy.Success(body);
      });
    });
  });

  context(`${store_msg.success_log}${Cypress.spec["fileName"]}`, () => {
    it("Test cases for get-log API", () => {
      let today = new Date().toISOString().slice(0, 10);
      let requestData = {
        module_name: "stage",
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
      let recordId = stage_id.toString();
      let requestData = {
        module: "stage",
        record_id: recordId,
        sort: "_id",
        orderby: "desc",
        page: 1,
        perPage: 20
      };
      cy.request({
        method: routes.post,
        url: routes.track_change,
        body: requestData,
        headers: { Authorization: Cypress.env("companyToken") }
      }).then(({ body }) => {
        cy.Track_change(body);
      });
    });
  
    it("Test case for look-up API", () => {
      let name = "stage";
      let obj = {
        statusCode: 200,
        success: true,
        error: null,
        result: {
          message: "Module fields fetched successfully",
          data: {
            fields: [
              "id",
              "code",
              "name",
              "description",
              "status",
              "created_date",
              "updated_date",
              "created_by",
              "updated_by",
            ],
            foreignKey: {},
            child: {},
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
});

describe(`${store_msg.fail}${Cypress.spec["fileName"]}`,()=>{

  context(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {
    it("Code should be maximum 40 charector", () => {
      cy.request({
        method: routes.post,
        url: routes.post_stage,
        body: codelength,
        headers: { Authorization: Cypress.env("companyToken") },
        failOnStatusCode: false
      }).then(({ body }) => {
        cy.Code(body);
      });
    });

    it("Test cases When code already exist", () => {
      cy.request({
        method: routes.post,
        url: routes.post_stage,
        body: exist_code,
        headers: { Authorization: Cypress.env("companyToken") },
        failOnStatusCode: false
      }).then(({ body }) => {
        let err = body.error.errorDetails;
        cy.Failure(body);
        expect(err).has.property("code",store_msg.err_code2);
      });
    });

    it("Test cases When do not provide required field", () => {
      cy.request({
        method: routes.post,
        url: routes.post_stage,
        body: {},
        headers: { Authorization: Cypress.env("companyToken") },
        failOnStatusCode: false,
      }).then(({ body }) => {
        let err = body.error.errorDetails;
        cy.Failure(body);
        expect(err).has.property("code", store_msg.err_code3);
        expect(err).has.property("name", store_msg.err_name2);
      });
    });

    it("Test cases When required fields are empty", () => {
      cy.request({
        method: routes.post,
        url: routes.post_stage,
        body: blank_req,
        headers: { Authorization: Cypress.env("companyToken") },
        failOnStatusCode: false,
      }).then(({ body }) => {
        let err = body.error.errorDetails;
        cy.Failure(body);
        expect(err).has.property("code", store_msg.err_code);
        expect(err).has.property("name", store_msg.err_name);
      });
    });

    it("Code, name and description should be string", () => {
      cy.request({
        method: routes.post,
        url: routes.post_stage,
        body: string_req,
        headers: { Authorization: Cypress.env("companyToken") },
        failOnStatusCode: false,
      }).then(({ body }) => {
        let err = body.error.errorDetails;
        cy.Failure(body);
        expect(err).has.property("code", store_msg.err_code1);
        expect(err).has.property("name", store_msg.err_name1);
        expect(err).has.property("description", store_msg.err_disc);
      });
    });

    it("status should be number", () => {
      cy.request({
        method: routes.post,
        url: routes.post_stage,
        body: number_req,
        headers: { Authorization: Cypress.env("companyToken") },
        failOnStatusCode: false,
      }).then(({ body }) => {
        let err = body.error.errorDetails;
        cy.Failure(body);
        expect(err).has.property("status", store_msg.err_status1);
      });
    });

    it("status must be one of [0 and 1]", () => {
      cy.request({
        method: routes.post,
        url: routes.post_stage,
        body: boolean_req,
        headers: { Authorization: Cypress.env("companyToken") },
        failOnStatusCode: false,
      }).then(({ body }) => {
        let err = body.error.errorDetails;
        cy.Failure(body);
        expect(err).has.property("status", store_msg.err_status);
      });
    });
  });

  context(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {
    before(() => { expect(stage_id).to.be.not.undefined });

    it("Test cases When send alphabets along with Id", () => {
      cy.request({
        method: routes.put,
        body: {},
        failOnStatusCode: false,
        url: `${routes.post_stage}${Cypress.env("Random")}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Failure(body);
        expect(body.error.errorDetails).has.property("id",store_msg.chk_id);
      });
    });

    it("Test cases When Id doesn't exist", () => {
      cy.request({
        method: routes.put,
        body: {},
        failOnStatusCode: false,
        url: `${routes.post_stage}${Cypress.env("RandomNumber")}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Failure(body);
        expect(body.error.errorDetails).has.property("id",store_msg.id);
      });
    });

    it("Test cases When required field are empty", () => {
      cy.request({
        method: routes.put,
        body: blank_req,
        failOnStatusCode: false,
        url: `${routes.post_stage}${stage_id}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        let err = body.error.errorDetails;
        cy.Failure(body);
        expect(err).has.property("code", store_msg.err_code);
        expect(err).has.property("name", store_msg.err_name);
      });
    });

    it("Code should be maximum 40 charector", () => {
      cy.request({
        method: routes.put,
        body: codelength,
        failOnStatusCode: false,
        url: `${routes.post_stage}${stage_id}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Code(body);
      });
    });

    it("Test cases When code already exist", () => {
      cy.request({
        method: routes.put,
        url: `${routes.post_stage}${stage_id_1}`,
        body: exist_code,
        headers: { Authorization: Cypress.env("companyToken") },
        failOnStatusCode: false
      }).then(({ body }) => {
        let err = body.error.errorDetails;
        cy.Failure(body);
        expect(err).has.property("code",store_msg.err_code2);
      });
    });

    it("Code, name and description should be string", () => {
      cy.request({
        method: routes.put,
        body: string_req,
        failOnStatusCode: false,
        url: `${routes.post_stage}${stage_id}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        let err = body.error.errorDetails;
        cy.Failure(body);
        expect(err).has.property("code", store_msg.err_code1);
        expect(err).has.property("name", store_msg.err_name1);
        expect(err).has.property("description", store_msg.err_disc);
      });
    });

    it("status should be number", () => {
      cy.request({
        method: routes.put,
        body: number_req,
        failOnStatusCode: false,
        url: `${routes.post_stage}${stage_id}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        let err = body.error.errorDetails;
        cy.Failure(body);
        expect(err).has.property("status", store_msg.err_status1);
      });
    });

    it("status must be one of [0 and 1]", () => {
      cy.request({
        method: routes.put,
        body: boolean_req,
        failOnStatusCode: false,
        url: `${routes.post_stage}${stage_id}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        let err = body.error.errorDetails;
        cy.Failure(body);
        expect(err).has.property("status", store_msg.err_status);
      });
    });
  });
});
