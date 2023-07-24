import routes from "../../support/route";
import store_msg from "../../support/store_msg";
let template_id: Number;
let template_code: String;
let template_id_1: Number;
let resTemp_SizeId: Number[];
let templateCreateReq
let templateUpdateReq
let templateContFetchReq
before(() => {
  cy.GetCompanyToken();
});

beforeEach(() => {
  cy.Random();
  cy.RandomNum();
  cy.RandomNumber();
  cy.randomBoolean();
});

function req_template(payload, ignoredata = [], adddata = {}) {
  let reqBody = {
    code: payload.hasOwnProperty("code") ? payload.code : Cypress.env("Random"),
    name: payload.hasOwnProperty("name") ? payload.name : Cypress.env("Random"),
    status: payload.hasOwnProperty("status") ? payload.status : 1,
    template_sizes: payload.hasOwnProperty("template_sizes") ? payload.template_sizes : [
      {
        nrf_code: payload.hasOwnProperty("nrf_code") ? payload.nrf_code : Cypress.env("Random"),
        seq_x: payload.hasOwnProperty("seq_x") ? payload.seq_x : 1,
        seq_y: payload.hasOwnProperty("seq_y") ? payload.seq_y : 1,
        size_x: payload.hasOwnProperty("size_x") ? payload.size_x : Cypress.env("Random"),
        size_y: payload.hasOwnProperty("size_y") ? payload.size_y : Cypress.env("Random"),
        status: payload.hasOwnProperty("status") ? payload.status : 1
      },
      {
        nrf_code: payload.hasOwnProperty("nrf_code") ? payload.nrf_code : "",
        seq_x: payload.hasOwnProperty("seq_x") ? payload.seq_x : 1,
        seq_y: payload.hasOwnProperty("seq_y") ? payload.seq_y : 2,
        size_x: payload.hasOwnProperty("size_x") ? payload.size_x : "",
        size_y: payload.hasOwnProperty("size_y") ? payload.size_y : "",
        status: payload.hasOwnProperty("status") ? payload.status : 1
      },
      {
        nrf_code: payload.hasOwnProperty("nrf_code") ? payload.nrf_code : null,
        seq_x: payload.hasOwnProperty("seq_x") ? payload.seq_x : 1,
        seq_y: payload.hasOwnProperty("seq_y") ? payload.seq_y : 3,
        size_x: payload.hasOwnProperty("size_x") ? payload.size_x : null,
        size_y: payload.hasOwnProperty("size_y") ? payload.size_y : null,
        status: payload.hasOwnProperty("status") ? payload.status : 1
      }
    ]
  };
  ignoredata.forEach((itemrow, index) => {
    if (Array.isArray(itemrow)) {
      itemrow.forEach((nextrow) => {
        if (reqBody.hasOwnProperty(index) && reqBody[index].hasOwnProperty(nextrow))
          delete reqBody[index][nextrow];
      });
    } else {
      delete reqBody[itemrow];
    }
  })
  for (const itemrow in adddata) {
    if (Array.isArray(adddata[itemrow])) {
      adddata[itemrow].forEach((nextrow, innerrow) => {
        if (nextrow.hasOwnProperty("id"))
          reqBody[itemrow][innerrow]["id"] = nextrow["id"];
      });
    }
  }
  return reqBody
};

function templateCreateResp(data: any) {
  expect(data).has.property("id");
  expect(data).has.property("code", templateCreateReq.code);
  expect(data).has.property("name", templateCreateReq.name);
  if (templateCreateReq.hasOwnProperty("status")) {
    expect(data).has.property("status", templateCreateReq.status);
  } else {
    expect(data).has.property("first_name");
  }
  data.template_sizes.forEach((ele: any, index: any) => {
    let temtSize = templateCreateReq.template_sizes[index];
    expect(ele).has.property("id");
    if (temtSize.hasOwnProperty("nrf_code")) {
      if (temtSize.nrf_code == "") {
        expect(ele).has.property("nrf_code");
      } else {
        expect(ele).has.property("nrf_code", temtSize.nrf_code);
      }
    } else {
      expect(ele).has.property("nrf_code");
    }
    expect(ele).has.property("seq_x", temtSize.seq_x);
    expect(ele).has.property("seq_y", temtSize.seq_y);
    if (temtSize.hasOwnProperty("size_x")) {
      if (temtSize.size_x == "") {
        expect(ele).has.property("size_x");
      } else {
        expect(ele).has.property("size_x", temtSize.size_x);
      }
    }
    if (temtSize.hasOwnProperty("size_y")) {
      if (temtSize.size_y == "") {
        expect(ele).has.property("size_y");
      } else {
        expect(ele).has.property("size_y", temtSize.size_y);
      }
    }
    if (temtSize.hasOwnProperty("status")) {
      expect(ele).has.property("status", temtSize.status);
    } else {
      expect(ele).has.property("status");
    }
    expect(ele).has.property("created_date");
    expect(ele).has.property("created_by");
  });
}

function templateUpdateResp(data: any) {
  expect(data).has.property("id");
  if (templateUpdateReq.hasOwnProperty("code")) {
    expect(data).has.property("code", templateUpdateReq.code);
  } else { expect(data).has.property("code") }
  if (templateUpdateReq.hasOwnProperty("name")) {
    expect(data).has.property("name", templateUpdateReq.name);
  } else { expect(data).has.property("name") }
  if (templateUpdateReq.hasOwnProperty("status")) {
    expect(data).has.property("status", templateUpdateReq.status);
  } else { expect(data).has.property("status") }
  data.template_sizes.forEach((ele: any, index: any) => {
    if (templateUpdateReq.template_sizes == 0) {
      expect(ele).has.property("id");
      expect(ele).has.property("nrf_code");
      expect(ele).has.property("seq_x");
      expect(ele).has.property("seq_y");
      expect(ele).has.property("size_x");
      expect(ele).has.property("size_y");
      expect(ele).has.property("status");
      expect(ele).has.property("created_date");
      expect(ele).has.property("updated_date");
      expect(ele).has.property("created_by");
      expect(ele).has.property("updated_by");
    }
    else if (templateUpdateReq.hasOwnProperty("template_sizes")) {
      let temtSize = templateUpdateReq.template_sizes[index];
      if (temtSize.hasOwnProperty("id")) {
        expect(ele).has.property("id", temtSize.id);
      } else { expect(ele).has.property("id") }

      if (temtSize.hasOwnProperty("nrf_code")) {
        if (temtSize.nrf_code == "") {
          expect(ele).has.property("nrf_code");
        } else {
          expect(ele).has.property("nrf_code", temtSize.nrf_code);
        }
      } else {
        expect(ele).has.property("nrf_code");
      }

      if (temtSize.hasOwnProperty("seq_x")) {
        expect(ele).has.property("seq_x", temtSize.seq_x);
      } else { expect(ele).has.property("seq_x") }

      if (temtSize.hasOwnProperty("seq_y")) {
        expect(ele).has.property("seq_y", temtSize.seq_y);
      } else { expect(ele).has.property("seq_y") }


      if (temtSize.hasOwnProperty("size_x")) {
        if (temtSize.size_x == "") {
          expect(ele).has.property("size_x");
        } else {
          expect(ele).has.property("size_x", temtSize.size_x);
        }
      } else { expect(ele).has.property("size_x") }

      if (temtSize.hasOwnProperty("size_y")) {
        if (temtSize.size_y == "") {
          expect(ele).has.property("size_y");
        } else {
          expect(ele).has.property("size_y", temtSize.size_y);
        }
      } else { expect(ele).has.property("size_y") }

      if (temtSize.hasOwnProperty("status")) {
        expect(ele).has.property("status", temtSize.status);
      } else { expect(ele).has.property("status"); }
      expect(ele).has.property("created_date");
      expect(ele).has.property("updated_date");
      expect(ele).has.property("created_by");
      expect(ele).has.property("updated_by");
    }
    else {
      expect(ele).has.property("id");
      expect(ele).has.property("nrf_code");
      expect(ele).has.property("seq_x");
      expect(ele).has.property("seq_y");
      expect(ele).has.property("size_x");
      expect(ele).has.property("size_y");
      expect(ele).has.property("status");
      expect(ele).has.property("created_date");
      expect(ele).has.property("updated_date");
      expect(ele).has.property("created_date");
      expect(ele).has.property("updated_date");
      expect(ele).has.property("created_by");
      expect(ele).has.property("updated_by");
    }
  });
}

function templateFetchResp(result) {
  result.data.forEach((ele: any) => {
    expect(ele).has.property("id");
    expect(ele).has.property("name");
    expect(ele).has.property("code");
    expect(ele).has.property("status");
    expect(ele).has.property("created_date");
    expect(ele).has.property("updated_date");
    expect(ele).has.property("created_by");
    expect(ele).has.property("updated_by");
  });
  if (templateContFetchReq.hasOwnProperty("page")) {
    expect(result).has.property("page", templateContFetchReq.page)
  } else { expect(result).has.property("page") }
  if (templateContFetchReq.hasOwnProperty("page")) {
    expect(result).has.property("perPage", templateContFetchReq.perPage);
  } else { expect(result).has.property("perPage") }
  expect(result).has.property("totalRecords");
}
describe(`${store_msg.success}${Cypress.spec["fileName"]}`, () => {

  context(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {
    it("Test cases for create API", () => {
      templateCreateReq = req_template({});
      cy.request({
        method: routes.post,
        url: routes.post_template,
        body: templateCreateReq,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        template_id = body.result.data.id;
        resTemp_SizeId = body.result.data.template_sizes.map((elem) => elem.id);
        cy.Success(body);
        templateCreateResp(body.result.data)
      });
    });

    it("Test cases for create API when not providing optional fields", () => {
      templateCreateReq = req_template({
        template_sizes: [
          {
            seq_x: 1,
            seq_y: 1
          }
        ]
      });
      cy.request({
        method: routes.post,
        url: routes.post_template,
        body: templateCreateReq,
        headers: { Authorization: Cypress.env("companyToken") }
      }).then(({ body }) => {
        template_id_1 = body.result.data.id;
        cy.Success(body);
        templateCreateResp(body.result.data)
      });
    });
  });

  context(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {
    it("when not providing any fields", () => {
      templateUpdateReq = {}
      cy.request({
        method: routes.put,
        body: templateUpdateReq,
        url: `${routes.post_template}${template_id}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Success(body);
        templateUpdateResp(body.result.data)
      });
    });

    it("when not providing optional fields", () => {
      templateUpdateReq = req_template({
        template_sizes: [
          {
            id: resTemp_SizeId[0],
            seq_x: 1,
            seq_y: 1,
          },
        ],
      }, ["status"]);
      cy.request({
        method: routes.put,
        body: templateUpdateReq,
        url: `${routes.post_template}${template_id}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Success(body);
        templateUpdateResp(body.result.data)
      });
    });

    it("when not providing required fields", () => {
      templateUpdateReq = req_template({}, ["code", "name", "template_sizes"]);
      cy.request({
        method: routes.put,
        body: templateUpdateReq,
        url: `${routes.post_template}${template_id}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Success(body);
        templateUpdateResp(body.result.data)
      });
    });

    it("when template_sizes array are blank", () => {
      templateUpdateReq = req_template({ template_sizes: [] });
      cy.request({
        method: routes.put,
        body: templateUpdateReq,
        url: `${routes.post_template}${template_id}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Success(body);
        templateUpdateResp(body.result.data)
      });
    });

    it("when template_sizes object are blank", () => {
      templateUpdateReq = req_template({
        template_sizes: [
          { id: resTemp_SizeId[0] }, { id: resTemp_SizeId[1] }, { id: resTemp_SizeId[2] }]
      });
      cy.request({
        method: routes.put,
        body: templateUpdateReq,
        url: `${routes.post_template}${template_id}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Success(body);
        templateUpdateResp(body.result.data)
      });
    });

    it("with proper request", () => {
      templateUpdateReq = req_template({}, [], {
        template_sizes: [
          { id: resTemp_SizeId[0] }, { id: resTemp_SizeId[1] }, { id: resTemp_SizeId[2] }]
      });
      cy.request({
        method: routes.put,
        body: templateUpdateReq,
        url: `${routes.post_template}${template_id}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        template_code = body.result.data.code;
        cy.Success(body);
        templateUpdateResp(body.result.data)
      });
    });

    it("Test case for delete function", () => {
      templateUpdateReq = {
        template_sizes: [
          {
            id: resTemp_SizeId[2],
            delete: 1
          }
        ]
      };
      cy.request({
        method: routes.put,
        body: templateUpdateReq,
        url: `${routes.post_template}${template_id}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Success(body);
        expect(body.result.data).has.property("id");
        expect(body.result.data).has.property("code");
        expect(body.result.data).has.property("name");
        expect(body.result.data).has.property("status");
        body.result.data.template_sizes.forEach((ele: any, index: any) => {
          expect(ele).has.property("id");
          expect(ele).has.property("nrf_code");
          expect(ele).has.property("seq_x");
          expect(ele).has.property("seq_y");
          expect(ele).has.property("size_x");
          expect(ele).has.property("size_y");
          expect(ele).has.property("status");
          expect(ele).has.property("created_date");
          expect(ele).has.property("updated_date");
          expect(ele).has.property("created_by");
          expect(ele).has.property("updated_by");
        });
      });
    });
  });

  context(`${store_msg.success_get}${Cypress.spec["fileName"]}`, () => {
    it("Test cases for get API", () => {
      cy.request({
        method: routes.get,
        url: `${routes.post_template}${template_id}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Success(body);
        expect(body.result.data).has.property("id");
        expect(body.result.data).has.property("code");
        expect(body.result.data).has.property("name");
        expect(body.result.data).has.property("status");
        expect(body.result.data).has.property("created_date");
        expect(body.result.data).has.property("updated_date");
        expect(body.result.data).has.property("created_by");
        expect(body.result.data).has.property("updated_by");
        body.result.data.template_sizes.forEach((ele: any) => {
          expect(ele).has.property("id");
          expect(ele).has.property("template_id");
          expect(ele).has.property("nrf_code");
          expect(ele).has.property("seq_x");
          expect(ele).has.property("seq_y");
          expect(ele).has.property("size_x");
          expect(ele).has.property("size_y");
          expect(ele).has.property("status");
          expect(ele).has.property("created_date");
          expect(ele).has.property("updated_date");
          expect(ele).has.property("created_by");
          expect(ele).has.property("updated_by");
        });
      });
    });
  });

  context(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {
    it("Test case for fetch API", () => {
      templateContFetchReq = {
        search: [
          {
            key: "template.id",
            operation: "=",
            val: template_id,
          },
        ],
        select: [
          "template.id",
          "template.name",
          "template.code",
          "template.status",
          "template.created_date",
          "template.updated_date",
          "template.created_by",
          "template.updated_by"
        ],
        sort: "template.id",
        orderby: "desc",
        page: 1,
        perPage: 20
      };
      cy.request({
        method: routes.post,
        body: templateContFetchReq,
        url: `${routes.post_template}${"fetch"}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Success(body);
        templateFetchResp(body.result)
      });
    });

    it("Test case for fetch API when do not provide any fields", () => {
      cy.request({
        method: routes.post,
        body: {},
        url: `${routes.post_template}${"fetch"}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Success(body);
        templateFetchResp(body.result)
      });
    });

    it("Test case when search field left blank", () => {
      templateContFetchReq = {
        search: [],
        searchOr: [],
        searchOrAnd: [],
        select: [
          "template.id",
          "template.name",
          "template.code",
          "template.status",
          "template.created_date",
          "template.updated_date",
          "template.created_by",
          "template.updated_by"
        ],
        sort: "template.id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      };
      cy.request({
        method: routes.post,
        body: templateContFetchReq,
        url: `${routes.post_template}${"fetch"}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Success(body);
        templateFetchResp(body.result)
      });
    });

    it("Test case when search and select field are left blank", () => {
      templateContFetchReq = {
        search: [],
        searchOr: [],
        searchOrAnd: [],
        select: [],
        sort: "template.id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      };
      cy.request({
        method: routes.post,
        body: templateContFetchReq,
        url: `${routes.post_template}${"fetch"}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Success(body);
        templateFetchResp(body.result)
      });
    });

    it("Test case when wrong/invalid data is provided in search field", () => {
      cy.request({
        method: routes.post,
        url: `${routes.post_template}${"fetch"}`,
        headers: { Authorization: Cypress.env("companyToken") },
        body: {
          search: [
            {
              key: "template.id",
              operation: "=",
              val: Cypress.env("RandomNumber")
            }
          ],
          select: ["template.id", "template.name"],
          sort: "template.id",
          orderby: "desc",
          page: 1,
          perpage: 20
        }
      }).then(({ body }) => {
        cy.Success(body);
      });
    });
  });

  context(`${store_msg.success_log}${Cypress.spec["fileName"]}`, () => {

    it("Test cases for get-log API", () => {
      let today = new Date().toISOString().slice(0, 10);
      let requestData = {
        module_name: "template",
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
      }).then(({ body }) => {
        cy.check_log(body);
      });
    });

    it("Test case for track-change-data API", () => {
      let recordId = template_id.toString();
      let requestData = {
        module: "template",
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
      let name = "template";
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
              "status",
              "created_date",
              "updated_date",
              "created_by",
              "updated_by"
            ],
            foreignKey: {},
            child: {
              template_size: {
                fields: [
                  "id",
                  "template_id",
                  "nrf_code",
                  "seq_x",
                  "seq_y",
                  "size_x",
                  "size_y",
                  "status",
                  "created_date",
                  "updated_date",
                  "created_by",
                  "updated_by"
                ]
              }
            }
          }
        }
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
})

describe(`${store_msg.fail}${Cypress.spec["fileName"]}`, () => {

  context(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {
    it("Code will be maximum 40 charector", () => {
      let requestData = req_template({code: Cypress.env("RandomDesc")});
      cy.request({
        method: routes.post,
        url: routes.post_template,
        body: requestData,
        headers: { Authorization: Cypress.env("companyToken") },
        failOnStatusCode: false
      }).then(({ body }) => {
        cy.Code(body);
      });
    });

    it("Test cases When code already exist", () => {
      let requestData = req_template({code: template_code});
      cy.request({
        method: routes.post,
        url: routes.post_template,
        body: requestData,
        headers: { Authorization: Cypress.env("companyToken") },
        failOnStatusCode: false,
      }).then(({ body }) => {
        let err = body.error.errorDetails;
        cy.Failure(body);
        expect(err).has.property("code",store_msg.err_code2);
      });
    });

    it("Test cases When do not provide any field data", () => {
      cy.request({
        method: routes.post,
        url: routes.post_template,
        body: {},
        headers: { Authorization: Cypress.env("companyToken") },
        failOnStatusCode: false
      }).then(({ body }) => {
        cy.Failure(body);
        expect(body.error.errorDetails).has.property("code");
        expect(body.error.errorDetails).has.property("name");
        expect(body.error.errorDetails).has.property("template_sizes");
      });
    });

    it("Test cases When required fields are empty", () => {
      let requestData = {
        code: "",
        name: "",
        template_sizes: [
          {
            seq_x: "",
            seq_y: "",
          },
        ],
      };
      cy.request({
        method: routes.post,
        url: routes.post_template,
        body: requestData,
        headers: { Authorization: Cypress.env("companyToken") },
        failOnStatusCode: false,
      }).then(({ body }) => {
        cy.Failure(body);
        expect(body.error.errorDetails).has.property("code");
        expect(body.error.errorDetails).has.property("name");
        expect(body.error.errorDetails).has.property("seq_x");
        expect(body.error.errorDetails).has.property("seq_y");
      });
    });

    it("status should be number", () => {
      let requestData = req_template({status: Cypress.env("RandomNum")});
      cy.request({
        method: routes.post,
        url: routes.post_template,
        body: requestData,
        headers: { Authorization: Cypress.env("companyToken") },
        failOnStatusCode: false,
      }).then(({ body }) => {
        cy.Failure(body);
        expect(body.error.errorDetails).has.property("status");
      });
    });

    it("status must be one of [0 and 1]", () => {
      let requestData = req_template({status: Cypress.env("RandomNumber")});
      cy.request({
        method: routes.post,
        url: routes.post_template,
        body: requestData,
        headers: { Authorization: Cypress.env("companyToken") },
        failOnStatusCode: false,
      }).then(({ body }) => {
        cy.Failure(body);
        expect(body.error.errorDetails).has.property("status");
      });
    });

    it("template_sizes -status, seq_x and seq_y should be number", () => {
      let requestData = req_template({
        template_sizes: [
          {
            seq_x: Cypress.env("RandomNum"),
            seq_y: Cypress.env("RandomNum"),
            status: Cypress.env("RandomNum")
          }
        ]
      });
      cy.request({
        method: routes.post,
        url: routes.post_template,
        body: requestData,
        headers: { Authorization: Cypress.env("companyToken") },
        failOnStatusCode: false,
      }).then(({ body }) => {
        cy.Failure(body);
        expect(body.error.errorDetails).has.property("status");
        expect(body.error.errorDetails).has.property("seq_x");
        expect(body.error.errorDetails).has.property("seq_y");
      });
    });

    it("template_sizes -status must be one of [0 and 1]", () => {
      let requestData = req_template({
        template_sizes: [
          {
            status: Cypress.env("RandomNumber")
          }
        ]
      });
      cy.request({
        method: routes.post,
        url: routes.post_template,
        body: requestData,
        headers: { Authorization: Cypress.env("companyToken") },
        failOnStatusCode: false
      }).then(({ body }) => {
        cy.Failure(body);
        expect(body.error.errorDetails).has.property("status");
      });
    });

    it("code, name, nrf_code, size_x and size_y should be string", () => {
      let requestData = {
        code: Cypress.env("RandomNumber"),
        name: Cypress.env("RandomNumber"),
        template_sizes: [
          {
            nrf_code: Cypress.env("RandomNumber"),
            seq_x: 1,
            seq_y: 1,
            size_x: Cypress.env("RandomNumber"),
            size_y: Cypress.env("RandomNumber")
          }
        ]
      };
      cy.request({
        method: routes.post,
        url: routes.post_template,
        body: requestData,
        headers: { Authorization: Cypress.env("companyToken") },
        failOnStatusCode: false,
      }).then(({ body }) => {
        cy.Failure(body);
        expect(body.error.errorDetails).has.property("code");
        expect(body.error.errorDetails).has.property("name");
        expect(body.error.errorDetails).has.property("nrf_code");
        expect(body.error.errorDetails).has.property("size_x");
        expect(body.error.errorDetails).has.property("size_y");
      });
    });

    it("seq_x and seq_y should be required field", () => {
      let requestData = req_template({template_sizes: [{}]});
      cy.request({
        method: routes.post,
        url: routes.post_template,
        body: requestData,
        headers: { Authorization: Cypress.env("companyToken") },
        failOnStatusCode: false,
      }).then(({ body }) => {
        cy.Failure(body);
        expect(body.error.errorDetails).has.property("seq_x");
        expect(body.error.errorDetails).has.property("seq_y");
      });
    });

    it("seq_x and seq_y should be unique", () => {
      let requestData = req_template({
        template_sizes: [
          {
            seq_x: 1,
            seq_y: 1
          },
          {
            seq_x: 1,
            seq_y: 1
          }
        ]
      });
      cy.request({
        method: routes.post,
        url: routes.post_template,
        body: requestData,
        headers: { Authorization: Cypress.env("companyToken") },
        failOnStatusCode: false
      }).then(({ body }) => {
        cy.Failure(body);
        expect(body.error.errorDetails).has.property("seq_x");
        expect(body.error.errorDetails).has.property("seq_y");
      });
    });

    it("template_sizes must contain atleast one value(s)", () => {
      let requestData = req_template({template_sizes: []});
      cy.request({
        method: routes.post,
        url: routes.post_template,
        body: requestData,
        headers: { Authorization: Cypress.env("companyToken") },
        failOnStatusCode: false,
      }).then(({ body }) => {
        cy.Failure(body);
      });
    });

    it(`template_sizes must be less than or equel to as 
        we provided in Bussiness_flow_template_max_size`, () => {
      let requestData = req_template({
        template_sizes: [
          {
            seq_x: 1,
            seq_y: 1
          },
          {
            seq_x: 1,
            seq_y: 2
          },
          {
            seq_x: 1,
            seq_y: 3
          },
          {
            seq_x: 1,
            seq_y: 4
          },
          {
            seq_x: 1,
            seq_y: 5
          }
        ]
      });
      cy.request({
        method: routes.post,
        url: routes.post_template,
        body: requestData,
        headers: { Authorization: Cypress.env("companyToken") },
        failOnStatusCode: false
      }).then(({ body }) => {
        cy.Failure(body);
      });
    });
  });

  context(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {
    it("Code will be maximum 40 charector", () => {
      let requestData = { code: Cypress.env("RandomDesc") };
      cy.request({
        method: routes.put,
        url: `${routes.post_template}${template_id}`,
        body: requestData,
        failOnStatusCode: false,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Code(body);
      });
    });

    it("Test cases When code already exist", () => {
      let requestData = req_template({code: template_code});
      cy.request({
        method: routes.put,
        url: `${routes.post_template}${template_id_1}`,
        body: requestData,
        headers: { Authorization: Cypress.env("companyToken") },
        failOnStatusCode: false,
      }).then(({ body }) => {
        let err = body.error.errorDetails;
        cy.Failure(body);
        expect(err).has.property("code",store_msg.err_code2);
      });
    });

    it("Test cases When alphabet provides along with Id ", () => {
      cy.request({
        method: routes.put,
        failOnStatusCode: false,
        body: {},
        url: `${routes.post_template}${Cypress.env("Random")}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Failure(body);
        expect(body.error.errorDetails).has.property("id", store_msg.chk_id);
      });
    });

    it("Test cases When template_id doesn't exist", () => {
      cy.request({
        method: routes.put,
        failOnStatusCode: false,
        body: {},
        url: `${routes.post_template}${Cypress.env("RandomNumber")}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Failure(body);
        expect(body.error.errorDetails).has.property(
          "template_id", `{template_id} is invalid`);
      });
    });

    it("Test cases When required fields are empty", () => {
      let requestData = {
        code: "",
        name: "",
        template_sizes: [
          {
            id: "",
            seq_x: "",
            seq_y: ""
          }
        ]
      };
      cy.request({
        method: routes.put,
        url: `${routes.post_template}${template_id}`,
        body: requestData,
        failOnStatusCode: false,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Failure(body);
        expect(body.error.errorDetails).has.property("code");
        expect(body.error.errorDetails).has.property("name");
        expect(body.error.errorDetails).has.property("id");
        expect(body.error.errorDetails).has.property("seq_x");
        expect(body.error.errorDetails).has.property("seq_y");
      });
    });

    it("Test case when template_size id doesn't exist", () => {
      let requestData = {
        template_sizes: [
          {
            id: Cypress.env("RandomNumber")
          }
        ]
      };
      cy.request({
        method: routes.put,
        url: `${routes.post_template}${template_id}`,
        body: requestData,
        failOnStatusCode: false,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Failure(body);
        expect(body.error.errorDetails).has.property("template_sizes_id");
      });
    });

    it("Test cases When template_id is not associated with template_size_id", () => {
      let requestData = {
        template_sizes: [
          {
            id: resTemp_SizeId[0]
          }
        ]
      };
      cy.request({
        method: routes.put,
        url: `${routes.post_template}${template_id_1}`,
        body: requestData,
        failOnStatusCode: false,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Failure(body);
        expect(body.error.errorDetails).has.property("template_sizes_id");
      });
    });

    it("delete function should work only with associate template_id and template_size_id", () => {
      let requestData = {
        template_sizes: [
          {
            id: resTemp_SizeId[0],
            delete: 1
          }
        ]
      };
      cy.request({
        method: routes.put,
        url: `${routes.post_template}${template_id_1}`,
        body: requestData,
        failOnStatusCode: false,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Failure(body);
        expect(body.error.errorDetails).has.property("template_sizes_id");
      });
    });

    it("status should be number", () => {
      let requestData = {status: Cypress.env("RandomNum")};
      cy.request({
        method: routes.put,
        url: `${routes.post_template}${template_id}`,
        body: requestData,
        failOnStatusCode: false,
        headers: { Authorization: Cypress.env("companyToken") }
      }).then(({ body }) => {
        cy.Failure(body);
        expect(body.error.errorDetails).has.property("status");
      });
    });

    it("status must be one of [0 and 1]", () => {
      let requestData = {
        status: Cypress.env("RandomNumber"),
        template_sizes: [
          {
            status: Cypress.env("RandomNumber"),
          },
        ],
      };
      cy.request({
        method: routes.put,
        url: `${routes.post_template}${template_id}`,
        body: requestData,
        failOnStatusCode: false,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Failure(body);
        expect(body.error.errorDetails).has.property("status");
      });
    });

    it("template_sizes -status, seq_x and seq_y should be number", () => {
      let requestData = {
        template_sizes: [
          {
            seq_x: Cypress.env("RandomNum"),
            seq_y: Cypress.env("RandomNum"),
            status: Cypress.env("RandomNum"),
          },
        ],
      };
      cy.request({
        method: routes.put,
        url: `${routes.post_template}${template_id}`,
        body: requestData,
        failOnStatusCode: false,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Failure(body);
        expect(body.error.errorDetails).has.property("status");
        expect(body.error.errorDetails).has.property("seq_x");
        expect(body.error.errorDetails).has.property("seq_y");
      });
    });

    it("template_sizes - status must be one of [0 and 1]", () => {
      let requestData = {
        template_sizes: [
          {
            status: Cypress.env("RandomNumber")
          }
        ]
      };
      cy.request({
        method: routes.put,
        url: `${routes.post_template}${template_id}`,
        body: requestData,
        failOnStatusCode: false,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Failure(body);
        expect(body.error.errorDetails).has.property("status");
      });
    });

    it("code, name, nrf_code, size_x and size_y should be string", () => {
      let requestData = {
        code: Cypress.env("RandomNumber"),
        name: Cypress.env("RandomNumber"),
        template_sizes: [
          {
            id: resTemp_SizeId[0],
            nrf_code: Cypress.env("RandomNumber"),
            size_x: Cypress.env("RandomNumber"),
            size_y: Cypress.env("RandomNumber"),
          },
        ],
      };
      cy.request({
        method: routes.put,
        url: `${routes.post_template}${template_id}`,
        body: requestData,
        failOnStatusCode: false,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Failure(body);
        expect(body.error.errorDetails).has.property("code");
        expect(body.error.errorDetails).has.property("name");
        expect(body.error.errorDetails).has.property("nrf_code");
        expect(body.error.errorDetails).has.property("size_x");
        expect(body.error.errorDetails).has.property("size_y");
      });
    });

    it("seq_x and seq_y should be unique", () => {
      let requestData = {
        template_sizes: [
          {
            seq_x: 1,
            seq_y: 1,
          },
          {
            seq_x: 1,
            seq_y: 1,
          },
        ],
      };
      cy.request({
        method: routes.put,
        url: `${routes.post_template}${template_id}`,
        body: requestData,
        failOnStatusCode: false,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Failure(body);
        expect(body.error.errorDetails).has.property("seq_x");
        expect(body.error.errorDetails).has.property("seq_y");
      });
    });

    it("seq_x and seq_y should be required", () => {
      let requestData = {template_sizes: [{}]};
      cy.request({
        method: routes.put,
        url: `${routes.post_template}${template_id}`,
        body: requestData,
        failOnStatusCode: false,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Failure(body);
        cy.Failure(body);
        expect(body.error.errorDetails).has.property("seq_x");
        expect(body.error.errorDetails).has.property("seq_y");
      });
    });

    it(`template_sizes must be less than or equel to as
        we provided Bussiness_flow_template_max_size`, () => {
      let requestData = {
        code: Cypress.env("Random"),
        name: Cypress.env("Random"),
        template_sizes: [
          {
            id: resTemp_SizeId[0],
            seq_x: 1,
            seq_y: 1
          },
          {
            id: resTemp_SizeId[1],
            seq_x: 1,
            seq_y: 2
          },
          {
            id: resTemp_SizeId[2],
            seq_x: 1,
            seq_y: 3
          },
          {
            seq_x: 1,
            seq_y: 4
          },
          {
            seq_x: 1,
            seq_y: 5
          }
        ]
      };
      cy.request({
        method: routes.put,
        url: `${routes.post_template}${template_id}`,
        body: requestData,
        failOnStatusCode: false,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Failure(body);
      });
    });
  });

  context(`${store_msg.fail_get}${Cypress.spec["fileName"]}`, () => {
    it("when template_id is provided as string", () => {
      cy.request({
        method: routes.get,
        failOnStatusCode: false,
        url: `${routes.post_template}${Cypress.env("Random")}`,
        headers: { Authorization: Cypress.env("companyToken") }
      }).then(({ body }) => {
        cy.Failure(body);
        expect(body.error.errorDetails).has.property(
          "template_id", `{template_id} is invalid`);
      });
    });

    it("when template_id is invalid", () => {
      cy.request({
        method: routes.get,
        failOnStatusCode: false,
        url: `${routes.post_template}${Cypress.env("RandomNumber")}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cy.Failure(body);
        expect(body.error.errorDetails).has.property(
          "template_id", `{template_id} is invalid`);
      });
    });
  });
})
