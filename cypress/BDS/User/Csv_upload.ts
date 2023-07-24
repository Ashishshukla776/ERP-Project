import routes from "../../support/route";
import store_msg from "../../support/store_msg";

let cst_csv_id: Number;
let csv_error_id: Number[];
before(() => {
  cy.GetCompanyToken();
  cy.Random();
  cy.RandomNumber();
});

describe(`${store_msg.success}${Cypress.spec["fileName"]}`, () => {
  it(`Success test case for csv_upload`, () => {
    let allmodules = [
      "body",
      "category",
      "color",
      "customer_address",
      "customer_contacts",
      "customer_department",
      "customer_distribution_center",
      "customer_salesperson",
      "customer_store",
      "customers",
      "design",
      "division_address",
      "division_contact",
      "division",
      "factor_address",
      "factor_contact",
      "factor",
      "group",
      "retail_type",
      "royalty",
      "sales_person_addresses",
      "sales_person_contact",
      "sales_person",
      "season",
      "ship_via_addresses",
      "ship_via_contact",
      "ship_via",
      "sizes",
      "stage",
      "template",
      "terms",
      "vendor_address",
      "vendor_contact",
      "vendor_types",
      "vendor",
      "warehouse_address",
      "warehouse_contact",
      "warehouse"
    ];
    allmodules.forEach((value) => {
      cy.fixture(value + ".csv").then((binary) => {
        const filedata = Cypress.Blob.binaryStringToBlob(binary, "text/csv");
        const formData = new FormData();
        formData.set("csv", filedata);
        formData.set("module", value);
        cy.postFormData(
          routes.csv_import,
          formData,
          Cypress.env("companyToken")
        ).then((body) => {
          cy.log(JSON.stringify(value))
          cst_csv_id = body.data.result.data.id;
          expect(body.data).has.property("statusCode", 200);
          expect(body.data).has.property("success", true);
          expect(body.data).has.property("error", null);
          expect(body.data).has.property("result");
          expect(body.data.result).has.property("message");
          expect(body.data.result.data).has.property("id");
          expect(body.data.result.data).has.property("file_name");
        })
      });
    });
  });

  it("Success test case for fetch fetchErrors API", () => {
    cy.request({
      method: routes.post,
      url: routes.csv_fetch,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "msg_failed",
            operation: "!=",
            val: 0,
          }
        ],
        select: [],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20
      },
    }).then(({ body }) => {
      csv_error_id = body.result.data.map((ele: any) => ele.id);
      cy.request({
        method: routes.get,
        url: `${routes.csv_fetch_error}${csv_error_id[0]}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        expect(body).has.property("statusCode", 200);
        expect(body).has.property("success", true);
        expect(body).has.property("error", null);
        expect(body).has.property("result");
        expect(body.result).has.property("message");
        body.result.data.forEach((ele: any) => {
          expect(ele).has.property("_id");
          expect(ele).has.property("org_id");
          expect(ele).has.property("type");
          expect(ele).has.property("company_id");
          expect(ele).has.property("queue_id");
          expect(ele).has.property("data");
          expect(ele.error).has.property("error");
          expect(ele.error).has.property("status");
        });
      });
    });
  });

  it("Success test case for fetch checkQueueStatus API", () => {
    cy.request({
      method: routes.get,
      url: `${routes.check_queue_status}${cst_csv_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      expect(body.result.data).has.property("queue_id");
      expect(body.result.data).has.property("msg_delivered");
      expect(body.result.data).has.property("msg_count");
      expect(body.result.data).has.property("queue_status");
    });
  });

  it("Success test case for downloadCsv API", () => {
    cy.request({
      method: routes.get,
      url: `${routes.csv_download}${csv_error_id[0]}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      expect(body.result.data).has.property("fileurl");
    });
  });

  it("Success test case for download_sample API", () => {
    let allmodules = [
      "body",
      "category",
      "color",
      "customer_address",
      "customer_contacts",
      "customer_department",
      "customer_distribution_center",
      "customer_salesperson",
      "customer_store",
      "customers",
      "design",
      "division_address",
      "division_contact",
      "division",
      "factor_address",
      "factor_contact",
      "factor",
      "group",
      "retail_type",
      "royalty",
      "sales_person_addresses",
      "sales_person_contact",
      "sales_person",
      "season",
      "ship_via_addresses",
      "ship_via_contact",
      "ship_via",
      "sizes",
      "stage",
      "template",
      "terms",
      "vendor_address",
      "vendor_contact",
      "vendor_types",
      "vendor",
      "warehouse_address",
      "warehouse_contact",
      "warehouse"
    ];
    allmodules.forEach((value) => {
      cy.request({
        method: routes.get,
        url: `${routes.csv_sample_download}${value}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        let res =  body.result.data
        expect(body).has.property("statusCode", 200);
        expect(body).has.property("success", true);
        expect(body).has.property("error", null);
        expect(body).has.property("result");
        expect(body.result).has.property("message");
        expect(res).has.property("fileurl",res.fileurl);
      });
    });
  });

  it("Test case for look-up API for Csv_upload_detail API", () => {
    let name = "Csv_upload_detail";
    let obj = {
      statusCode: 200,
      success: true,
      error: null,
      result: {
        message: "Module fields fetched successfully",
        data: {
          fields: [
            "id",
            "user_id",
            "msg_count",
            "msg_delivered",
            "is_active",
            "msg_success",
            "msg_failed",
            "file_name",
            "queue_status",
            "timestamp",
            "company_id",
          ],
          foreignKey: {
            company_id: {
              object: "company",
              fields: [
                "id",
                "name",
                "org_id",
                "fax",
                "telephone",
                "email",
                "created_date",
                "updated_date",
                "created_by",
                "updated_by",
                "status",
                "mongo_id",
                "address",
                "ein_cin",
                "state_id",
              ],
            },
          },
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

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {
  it("Success test case for fetch csv_upload API", () => {
    let requestData = {
      search: [
        {
          key: "id",
          operation: "=",
          val: cst_csv_id,
        },
      ],
      searchOr: [
        {
          key: "id",
          operation: "=",
          val: cst_csv_id,
        },
      ],
      searchOrAnd: [
        {
          key: "id",
          operation: "=",
          val: cst_csv_id,
        },
      ],
      select: [
        "id",
        "user_id",
        "timestamp",
        "msg_count",
        "msg_delivered",
        "is_active",
        "msg_failed",
        "msg_success",
        "file_name",
        "queue_status",
        "company_id",
      ],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.csv_fetch,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      expect(body.result.data.map((ele: any) => ele.id)).to.deep.equal(
        requestData.search.map((item: any) => item.val)
      );
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("user_id");
        expect(ele).has.property("timestamp");
        expect(ele).has.property("msg_count");
        expect(ele).has.property("msg_delivered");
        expect(ele).has.property("is_active");
        expect(ele).has.property("msg_failed");
        expect(ele).has.property("msg_success");
        expect(ele).has.property("file_name");
        expect(ele).has.property("queue_status");
        expect(ele).has.property("company_id");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Success test case for fetch csv_upload API when request body are left empty", () => {
    let requestData = {};
    cy.request({
      method: routes.post,
      url: routes.csv_fetch,
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
        expect(ele).has.property("user_id");
        expect(ele).has.property("timestamp");
        expect(ele).has.property("msg_count");
        expect(ele).has.property("msg_delivered");
        expect(ele).has.property("is_active");
        expect(ele).has.property("msg_failed");
        expect(ele).has.property("msg_success");
        expect(ele).has.property("file_name");
        expect(ele).has.property("queue_status");
        expect(ele).has.property("company_id");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Success test case for fetch csv_upload API when search field are left blank", () => {
    let requestData = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [
        "id",
        "user_id",
        "timestamp",
        "msg_count",
        "msg_delivered",
        "is_active",
        "msg_failed",
        "msg_success",
        "file_name",
        "queue_status",
        "company_id",
      ],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 25,
    };
    cy.request({
      method: routes.post,
      url: routes.csv_fetch,
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
        expect(ele).has.property("user_id");
        expect(ele).has.property("timestamp");
        expect(ele).has.property("msg_count");
        expect(ele).has.property("msg_delivered");
        expect(ele).has.property("is_active");
        expect(ele).has.property("msg_failed");
        expect(ele).has.property("msg_success");
        expect(ele).has.property("file_name");
        expect(ele).has.property("queue_status");
        expect(ele).has.property("company_id");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Success test case for fetch csv_upload API when select field are left blank", () => {
    let requestData = {
      search: [
        {
          key: "csv_upload_detail.id",
          operation: "=",
          val: cst_csv_id,
        },
      ],
      select: [],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.csv_fetch,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      expect(body.result.data.map((ele: any) => ele.id)).to.deep.equal(
        requestData.search.map((item: any) => item.val)
      );
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("user_id");
        expect(ele).has.property("timestamp");
        expect(ele).has.property("msg_count");
        expect(ele).has.property("msg_delivered");
        expect(ele).has.property("is_active");
        expect(ele).has.property("msg_failed");
        expect(ele).has.property("msg_success");
        expect(ele).has.property("file_name");
        expect(ele).has.property("queue_status");
        expect(ele).has.property("company_id");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Success test case for fetch csv_upload API when search and select field are left blank", () => {
    let requestData = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [],
      sort: "id",
      orderby: "desc",
      page: 1,
      perPage: 10,
    };
    cy.request({
      method: routes.post,
      url: routes.csv_fetch,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("user_id");
        expect(ele).has.property("timestamp");
        expect(ele).has.property("msg_count");
        expect(ele).has.property("msg_delivered");
        expect(ele).has.property("is_active");
        expect(ele).has.property("msg_failed");
        expect(ele).has.property("msg_success");
        expect(ele).has.property("file_name");
        expect(ele).has.property("queue_status");
        expect(ele).has.property("company_id");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });
});

describe(`${store_msg.fail}${Cypress.spec["fileName"]}`, () => {
  it("Failure test case for fetchErrors API when queue_id doesn't exist", () => {
    cy.request({
      method: routes.get,
      url: `${routes.csv_fetch_error}${Cypress.env("RandomNumber")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("queue_id",`{queue_id} is invalid`);
    });
  });

  it("Failure test case for fetchErrors API when queue_id is provided as String", () => {
    cy.request({
      method: routes.get,
      url: `${routes.csv_fetch_error}${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "queue_id",`{queue_id} must be a number`);
    });
  });

  it("Failure test case for checkQueueStatus API when queue_id doesn't exist", () => {
    cy.request({
      method: routes.get,
      url: `${routes.check_queue_status}${Cypress.env("RandomNumber")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("queue_id",`{queue_id} is invalid`);
    });
  });

  it("Failure test case for checkQueueStatus API queue_id is provided as String", () => {
    cy.request({
      method: routes.get,
      url: `${routes.check_queue_status}${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "queue_id",`{queue_id} must be a number`);
    });
  });

  it("Failure test case for downloadCsv API when queue_id doesn't exist", () => {
    cy.request({
      method: routes.get,
      url: `${routes.csv_download}${Cypress.env("RandomNumber")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("queue_id",`{queue_id} is invalid`);
    });
  });

  it("Failure test case for fetch downloadCsv API queue_id is provided as String", () => {
    cy.request({
      method: routes.get,
      url: `${routes.csv_download}${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "queue_id",`{queue_id} must be a number`);
    });
  });

  it("Failure test case for download_sample csv API", () => {
    cy.request({
      method: routes.get,
      url: `${routes.csv_sample_download}${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("module_name",`{module_name} is invalid`);
    });
  });

  it("Failure test case for fetch csv_upload API when wrong input is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: routes.csv_fetch,
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
          "user_id",
          "timestamp",
          "msg_count",
          "msg_delivered",
          "is_active",
          "msg_failed",
          "msg_success",
          "file_name",
          "queue_status",
          "company_id",
        ],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
    }).then(({ body }) => {
      cy.Success(body);
    });
  });
});
