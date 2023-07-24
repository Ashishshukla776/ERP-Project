import routes from "../../support/route";
import store_msg from "../../support/store_msg";
let warehouse_contact_id: Number;
let warehouse_contact_id_1: Number;
let warehouse_conInfo_id: Number[];

before(() => {
  cy.GetCompanyToken();
  cy.Random();
  cy.RandomNumber();
  cy.RandomNum();
  cy.GetWarehouseId();
  cy.randomEmail();
});

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {
  it("Test cases for create API", () => {
    let requestData = {
      warehouse_id: Cypress.env("warehouseId"),
      first_name: Cypress.env("Random"),
      middle_name: Cypress.env("Random"),
      last_name: Cypress.env("Random"),
      status: Cypress.env("randomBoolean"),
      contact_info: [
        {
          type: "phone",
          value: Cypress.env("Random"),
          label: "office phone",
          status: Cypress.env("randomBoolean"),
        },
        {
          type: "email",
          value: Cypress.env("testEmail"),
          label: "office email",
          status: Cypress.env("randomBoolean"),
        },
        {
          type: "fax",
          value: Cypress.env("Random"),
          label: "office fax",
          status: Cypress.env("randomBoolean"),
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_warehouse_conatct,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      warehouse_contact_id = body.result.data.id;
      warehouse_conInfo_id = body.result.data.contact_info.map(
        (element) => element.id
      );
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property(
        "first_name",
        requestData.first_name
      );
      expect(body.result.data).has.property(
        "middle_name",
        requestData.middle_name
      );
      expect(body.result.data).has.property("last_name", requestData.last_name);
      expect(body.result.data).has.property("status", requestData.status);
      expect(body.result.data).has.property("type");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property(
        "warehouse_id",
        requestData.warehouse_id
      );
      body.result.data.contact_info.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("warehouse_contact_id");
        expect(ele).has.property("type", requestData.contact_info[index].type);
        expect(ele).has.property(
          "value",
          requestData.contact_info[index].value
        );
        expect(ele).has.property(
          "label",
          requestData.contact_info[index].label
        );
        expect(ele).has.property(
          "status",
          requestData.contact_info[index].status
        );
        expect(ele).has.property("created_date");
        expect(ele).has.property("created_by");
      });
    });
  });

  it("Test cases for create API when optional fields are null", () => {
    let requestData = {
      warehouse_id: Cypress.env("warehouseId"),
      first_name: Cypress.env("Random"),
      middle_name: null,
      last_name: null,
      status: Cypress.env("randomBoolean"),
      contact_info: [
        {
          type: "phone",
          value: Cypress.env("Random"),
          label: "office phone",
          status: Cypress.env("randomBoolean"),
        },
        {
          type: "email",
          value: Cypress.env("testEmail"),
          label: "office email",
          status: Cypress.env("randomBoolean"),
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_warehouse_conatct,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      warehouse_contact_id_1 = body.result.data.id;
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property(
        "first_name",
        requestData.first_name
      );
      expect(body.result.data).has.property(
        "middle_name",
        requestData.middle_name
      );
      expect(body.result.data).has.property("last_name", requestData.last_name);
      expect(body.result.data).has.property("status", requestData.status);
      expect(body.result.data).has.property("type");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property(
        "warehouse_id",
        requestData.warehouse_id
      );
      body.result.data.contact_info.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("warehouse_contact_id");
        expect(ele).has.property("type", requestData.contact_info[index].type);
        expect(ele).has.property(
          "value",
          requestData.contact_info[index].value
        );
        expect(ele).has.property(
          "label",
          requestData.contact_info[index].label
        );
        expect(ele).has.property(
          "status",
          requestData.contact_info[index].status
        );
        expect(ele).has.property("created_date");
        expect(ele).has.property("created_by");
      });
    });
  });

  it("Test cases for create API when optional fields are blank", () => {
    let requestData = {
      warehouse_id: Cypress.env("warehouseId"),
      first_name: Cypress.env("Random"),
      middle_name: "",
      last_name: "",
      status: Cypress.env("randomBoolean"),
      contact_info: [
        {
          type: "phone",
          value: Cypress.env("Random"),
          label: "office phone",
          status: Cypress.env("randomBoolean"),
        },
        {
          type: "email",
          value: Cypress.env("testEmail"),
          label: "office email",
          status: Cypress.env("randomBoolean"),
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_warehouse_conatct,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property(
        "first_name",
        requestData.first_name
      );
      expect(body.result.data).has.property(
        "middle_name",
        requestData.middle_name
      );
      expect(body.result.data).has.property("last_name", requestData.last_name);
      expect(body.result.data).has.property("status", requestData.status);
      expect(body.result.data).has.property("type");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property(
        "warehouse_id",
        requestData.warehouse_id
      );
      body.result.data.contact_info.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("warehouse_contact_id");
        expect(ele).has.property("type", requestData.contact_info[index].type);
        expect(ele).has.property(
          "value",
          requestData.contact_info[index].value
        );
        expect(ele).has.property(
          "label",
          requestData.contact_info[index].label
        );
        expect(ele).has.property(
          "status",
          requestData.contact_info[index].status
        );
        expect(ele).has.property("created_date");
        expect(ele).has.property("created_by");
      });
    });
  });

  it("Test cases for create API when not providing optional fields", () => {
    let requestData = {
      warehouse_id: Cypress.env("warehouseId"),
      first_name: Cypress.env("Random"),
      contact_info: [
        {
          type: "phone",
          value: Cypress.env("Random"),
          label: "office phone",
        },
        {
          type: "email",
          value: Cypress.env("testEmail"),
          label: "office email",
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_warehouse_conatct,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property(
        "first_name",
        requestData.first_name
      );
      expect(body.result.data).has.property("type");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property(
        "warehouse_id",
        requestData.warehouse_id
      );
      body.result.data.contact_info.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("warehouse_contact_id");
        expect(ele).has.property("type", requestData.contact_info[index].type);
        expect(ele).has.property(
          "value",
          requestData.contact_info[index].value
        );
        expect(ele).has.property(
          "label",
          requestData.contact_info[index].label
        );
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("created_by");
      });
    });
  });

  it("Test cases for create API when contact_info Array is blank", () => {
    let requestData = {
      warehouse_id: Cypress.env("warehouseId"),
      first_name: Cypress.env("Random"),
      middle_name: "",
      last_name: "",
      status: Cypress.env("randomBoolean"),
      contact_info: [],
    };
    cy.request({
      method: routes.post,
      url: routes.post_warehouse_conatct,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property(
        "first_name",
        requestData.first_name
      );
      expect(body.result.data).has.property(
        "middle_name",
        requestData.middle_name
      );
      expect(body.result.data).has.property("last_name", requestData.last_name);
      expect(body.result.data).has.property("status", requestData.status);
      expect(body.result.data).has.property("type");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property(
        "warehouse_id",
        requestData.warehouse_id
      );
      expect(body.result.data).has.deep.property(
        "contact_info",
        requestData.contact_info
      );
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {
  it("Test case for update API when not providing any fields", () => {
    let requestData = {};
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_conatct}${warehouse_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("type");
      expect(body.result.data).has.property("first_name");
      expect(body.result.data).has.property("last_name");
      expect(body.result.data).has.property("middle_name");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property("warehouse_id");
      body.result.data.contact_info.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("warehouse_contact_id");
        expect(ele).has.property("type");
        expect(ele).has.property("value");
        expect(ele).has.property("label");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
      });
    });
  });

  it("Test case for update API when not providing optional fields", () => {
    let requestData = {
      warehouse_id: Cypress.env("warehouseId"),
      first_name: Cypress.env("Random"),
      contact_info: [
        {
          id: warehouse_conInfo_id[0],
          type: "phone",
          value: Cypress.env("Random"),
          label: "office phone",
        },
        {
          id: warehouse_conInfo_id[1],
          type: "email",
          value: Cypress.env("testEmail"),
          label: "office email",
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_conatct}${warehouse_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property(
        "first_name",
        requestData.first_name
      );
      expect(body.result.data).has.property("middle_name");
      expect(body.result.data).has.property("last_name");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("type");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property(
        "warehouse_id",
        requestData.warehouse_id
      );
      body.result.data.contact_info.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("warehouse_contact_id");
        expect(ele).has.property("type", requestData.contact_info[index].type);
        expect(ele).has.property(
          "value",
          requestData.contact_info[index].value
        );
        expect(ele).has.property(
          "label",
          requestData.contact_info[index].label
        );
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("created_by");
      });
    });
  });

  it("Test case for update API when optional fields are null", () => {
    let requestData = {
      warehouse_id: Cypress.env("warehouseId"),
      first_name: Cypress.env("Random"),
      middle_name: null,
      last_name: null,
      status: Cypress.env("randomBoolean"),
      contact_info: [
        {
          id: warehouse_conInfo_id[0],
          type: "phone",
          value: Cypress.env("Random"),
          label: "office phone",
          status: Cypress.env("randomBoolean"),
        },
        {
          id: warehouse_conInfo_id[1],
          type: "email",
          value: Cypress.env("testEmail"),
          label: "office email",
          status: Cypress.env("randomBoolean"),
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_conatct}${warehouse_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property(
        "first_name",
        requestData.first_name
      );
      expect(body.result.data).has.property(
        "middle_name",
        requestData.middle_name
      );
      expect(body.result.data).has.property("last_name", requestData.last_name);
      expect(body.result.data).has.property("status", requestData.status);
      expect(body.result.data).has.property("type");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property(
        "warehouse_id",
        requestData.warehouse_id
      );
      body.result.data.contact_info.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("warehouse_contact_id");
        expect(ele).has.property("type", requestData.contact_info[index].type);
        expect(ele).has.property(
          "value",
          requestData.contact_info[index].value
        );
        expect(ele).has.property(
          "label",
          requestData.contact_info[index].label
        );
        expect(ele).has.property(
          "status",
          requestData.contact_info[index].status
        );
        expect(ele).has.property("created_date");
        expect(ele).has.property("created_by");
      });
    });
  });

  it("Test case for update API when optional fields are blank", () => {
    let requestData = {
      warehouse_id: Cypress.env("warehouseId"),
      first_name: Cypress.env("Random"),
      middle_name: "",
      last_name: "",
      status: Cypress.env("randomBoolean"),
      contact_info: [
        {
          id: warehouse_conInfo_id[0],
          type: "phone",
          value: Cypress.env("Random"),
          label: "office phone",
          status: Cypress.env("randomBoolean"),
        },
        {
          id: warehouse_conInfo_id[1],
          type: "email",
          value: Cypress.env("testEmail"),
          label: "office email",
          status: Cypress.env("randomBoolean"),
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_conatct}${warehouse_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property(
        "first_name",
        requestData.first_name
      );
      expect(body.result.data).has.property(
        "middle_name",
        requestData.middle_name
      );
      expect(body.result.data).has.property("last_name", requestData.last_name);
      expect(body.result.data).has.property("status", requestData.status);
      expect(body.result.data).has.property("type");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property(
        "warehouse_id",
        requestData.warehouse_id
      );
      body.result.data.contact_info.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("warehouse_contact_id");
        expect(ele).has.property("type", requestData.contact_info[index].type);
        expect(ele).has.property(
          "value",
          requestData.contact_info[index].value
        );
        expect(ele).has.property(
          "label",
          requestData.contact_info[index].label
        );
        expect(ele).has.property(
          "status",
          requestData.contact_info[index].status
        );
        expect(ele).has.property("created_date");
        expect(ele).has.property("created_by");
      });
    });
  });

  it("Test case for update API when not providing required fields", () => {
    let requestData = {
      middle_name: Cypress.env("Random"),
      last_name: Cypress.env("Random"),
      status: Cypress.env("randomBoolean"),
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_conatct}${warehouse_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("first_name");
      expect(body.result.data).has.property(
        "middle_name",
        requestData.middle_name
      );
      expect(body.result.data).has.property("last_name", requestData.last_name);
      expect(body.result.data).has.property("status", requestData.status);
      expect(body.result.data).has.property("type");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property("warehouse_id");
      body.result.data.contact_info.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("warehouse_contact_id");
        expect(ele).has.property("type");
        expect(ele).has.property("value");
        expect(ele).has.property("label");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
      });
    });
  });

  it("Test case for update API when contact_info array are blank", () => {
    let requestData = {
      warehouse_id: Cypress.env("warehouseId"),
      first_name: Cypress.env("Random"),
      middle_name: Cypress.env("Random"),
      last_name: Cypress.env("Random"),
      status: Cypress.env("randomBoolean"),
      contact_info: [],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_conatct}${warehouse_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property(
        "first_name",
        requestData.first_name
      );
      expect(body.result.data).has.property(
        "middle_name",
        requestData.middle_name
      );
      expect(body.result.data).has.property("last_name", requestData.last_name);
      expect(body.result.data).has.property("status", requestData.status);
      expect(body.result.data).has.property("type");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property(
        "warehouse_id",
        requestData.warehouse_id
      );
      body.result.data.contact_info.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("warehouse_contact_id");
        expect(ele).has.property("type");
        expect(ele).has.property("value");
        expect(ele).has.property("label");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
      });
    });
  });

  it("Test case for update API when contact_info object are blank", () => {
    let requestData = {
      warehouse_id: Cypress.env("warehouseId"),
      first_name: Cypress.env("Random"),
      middle_name: Cypress.env("Random"),
      last_name: Cypress.env("Random"),
      status: Cypress.env("randomBoolean"),
      contact_info: [
        { id: warehouse_conInfo_id[0] },
        { id: warehouse_conInfo_id[1] },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_conatct}${warehouse_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property(
        "first_name",
        requestData.first_name
      );
      expect(body.result.data).has.property(
        "middle_name",
        requestData.middle_name
      );
      expect(body.result.data).has.property("last_name", requestData.last_name);
      expect(body.result.data).has.property("status", requestData.status);
      expect(body.result.data).has.property("type");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property(
        "warehouse_id",
        requestData.warehouse_id
      );

      body.result.data.contact_info.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("warehouse_contact_id");
        expect(ele).has.property("type");
        expect(ele).has.property("value");
        expect(ele).has.property("label");
        expect(ele).has.property("status");
        expect(ele).has.property("created_date");
        expect(ele).has.property("created_by");
      });
    });
  });

  it("Test case for update API", () => {
    let requestData = {
      warehouse_id: Cypress.env("warehouseId"),
      first_name: Cypress.env("Random"),
      middle_name: Cypress.env("Random"),
      last_name: Cypress.env("Random"),
      status: 1,
      contact_info: [
        {
          id: warehouse_conInfo_id[0],
          type: "phone",
          value: Cypress.env("Random"),
          label: "office phone",
          status: Cypress.env("randomBoolean"),
        },
        {
          id: warehouse_conInfo_id[1],
          type: "email",
          value: Cypress.env("testEmail"),
          label: "office email",
          status: Cypress.env("randomBoolean"),
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_conatct}${warehouse_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property(
        "first_name",
        requestData.first_name
      );
      expect(body.result.data).has.property(
        "middle_name",
        requestData.middle_name
      );
      expect(body.result.data).has.property("last_name", requestData.last_name);
      expect(body.result.data).has.property("status", requestData.status);
      expect(body.result.data).has.property("type");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property(
        "warehouse_id",
        requestData.warehouse_id
      );
      body.result.data.contact_info.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("warehouse_contact_id");
        expect(ele).has.property("type", requestData.contact_info[index].type);
        expect(ele).has.property(
          "value",
          requestData.contact_info[index].value
        );
        expect(ele).has.property(
          "label",
          requestData.contact_info[index].label
        );
        expect(ele).has.property(
          "status",
          requestData.contact_info[index].status
        );
        expect(ele).has.property("created_date");
        expect(ele).has.property("created_by");
      });
    });
  });

  it("Test case for delete function", () => {
    let requestData = {
      warehouse_id: Cypress.env("warehouseId"),
      last_name: Cypress.env("Random"),
      contact_info: [
        {
          id: warehouse_conInfo_id[2],
          delete: 1,
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_conatct}${warehouse_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {
  it("Test case for fetch API", () => {
    let requestData = {
      search: [
        {
          key: "reference_contact.id",
          operation: "=",
          val: warehouse_contact_id,
        },
      ],
      select: [
        "warehouse.id as warehouse_id",
        "reference_contact.first_name",
        "reference_contact.middle_name",
        "reference_contact.last_name",
        "reference_contact.created_date",
        "reference_contact.created_by",
        "reference_contact.updated_date",
        "reference_contact.updated_by",
        "reference_contact.status",
      ],
      sort: "reference_contact.id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_warehouse_contact,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any, index: any) => {
        expect(ele).has.property("warehouse_id");
        expect(ele).has.property("first_name");
        expect(ele).has.property("middle_name");
        expect(ele).has.property("last_name");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("status");
        expect(ele).has.property("id", requestData.search[index].val);
        ele.contact_info.forEach((element: any) => {
          expect(element).has.property("id");
          expect(element).has.property("type");
          expect(element).has.property("value");
          expect(element).has.property("label");
        });
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
      method: routes.post,
      url: routes.fetch_warehouse_contact,
      body: {},
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("warehouse_id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
        expect(ele).has.property("id");
        expect(ele).has.property("first_name");
        expect(ele).has.property("middle_name");
        expect(ele).has.property("last_name");
        expect(ele).has.property("type");
        expect(ele).has.property("contact_info");
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
        "warehouse.id as warehouse_id",
        "reference_contact.first_name",
        "reference_contact.middle_name",
        "reference_contact.last_name",
        "reference_contact.created_date",
        "reference_contact.created_by",
        "reference_contact.updated_date",
        "reference_contact.updated_by",
        "reference_contact.status",
      ],
      sort: "reference_contact.id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_warehouse_contact,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("warehouse_id");
        expect(ele).has.property("first_name");
        expect(ele).has.property("middle_name");
        expect(ele).has.property("last_name");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("status");
        expect(ele).has.property("id");
        ele.contact_info.forEach((element: any) => {
          expect(element).has.property("id");
          expect(element).has.property("type");
          expect(element).has.property("value");
          expect(element).has.property("label");
        });
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when select field left blank", () => {
    let requestData = {
      search: [
        {
          key: "reference_contact.id",
          operation: "=",
          val: warehouse_contact_id,
        },
      ],
      select: [],
      sort: "reference_contact.id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_warehouse_contact,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any, index: any) => {
        expect(ele).has.property("warehouse_id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
        expect(ele).has.property("id", requestData.search[index].val);
        expect(ele).has.property("first_name");
        expect(ele).has.property("middle_name");
        expect(ele).has.property("last_name");
        expect(ele).has.property("type");
        ele.contact_info.forEach((element: any) => {
          expect(element).has.property("id");
          expect(element).has.property("type");
          expect(element).has.property("value");
          expect(element).has.property("label");
        });
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when not provide search and select field", () => {
    let requestData = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [],
      sort: "reference_contact.id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_warehouse_contact,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("warehouse_id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
        expect(ele).has.property("id");
        expect(ele).has.property("first_name");
        expect(ele).has.property("middle_name");
        expect(ele).has.property("last_name");
        expect(ele).has.property("type");
        expect(ele).has.property("contact_info");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: routes.fetch_warehouse_contact,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "reference_contact.id",
            operation: "=",
            val: Cypress.env("RandomNumber"),
          },
        ],
        select: [
          "warehouse.id as warehouse_id",
          "reference_contact.first_name",
          "reference_contact.middle_name",
          "reference_contact.last_name",
          "reference_contact.created_date",
          "reference_contact.created_by",
          "reference_contact.updated_date",
          "reference_contact.updated_by",
          "warehouse.status",
        ],
        sort: "reference_contact.id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });
});

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {
  it("Test cases When do not provide any field ", () => {
    let requestData = {};
    cy.request({
      method: routes.post,
      url: routes.post_warehouse_conatct,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("warehouse_id");
      expect(body.error.errorDetails).has.property("first_name");
      expect(body.error.errorDetails).has.property("contact_info");
    });
  });

  it("Test cases When required fields are empty", () => {
    let requestData = {
      warehouse_id: "",
      first_name: "",

      status: "",
      contact_info: [
        {
          type: "",
          value: "",
          label: "",
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_warehouse_conatct,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("warehouse_id");
      expect(body.error.errorDetails).has.property("first_name");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("value");
      expect(body.error.errorDetails).has.property("label");
    });
  });

  it("Test cases When warehouse_id doesn't exist", () => {
    let requestData = {
      warehouse_id: Cypress.env("RandomNumber"),
      first_name: Cypress.env("Random"),
      contact_info: [
        {
          type: "phone",
          value: Cypress.env("Random"),
          label: "office phone",
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_warehouse_conatct,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("warehouse_id");
    });
  });

  it("warehouse_id and status should be number", () => {
    let requestData = {
      warehouse_id: Cypress.env("RandomNum"),
      first_name: Cypress.env("Random"),
      status: Cypress.env("RandomNum"),
      contact_info: [
        {
          type: "phone",
          value: Cypress.env("Random"),
          label: "office phone",
          status: Cypress.env("RandomNum"),
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_warehouse_conatct,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("warehouse_id");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("status must be one of [0 and 1]", () => {
    let requestData = {
      warehouse_id: Cypress.env("warehouseId"),
      first_name: Cypress.env("Random"),
      status: Cypress.env("RandomNumber"),
      contact_info: [
        {
          type: "phone",
          value: Cypress.env("Random"),
          label: "office phone",
          status: Cypress.env("RandomNumber"),
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_warehouse_conatct,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("first_name, middle_name, last_name, type, value and label should be String", () => {
    let requestData = {
      warehouse_id: Cypress.env("warehouseId"),
      first_name: Cypress.env("RandomNumber"),
      middle_name: Cypress.env("RandomNumber"),
      last_name: Cypress.env("RandomNumber"),
      contact_info: [
        {
          type: Cypress.env("RandomNumber"),
          value: Cypress.env("RandomNumber"),
          label: Cypress.env("RandomNumber"),
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_warehouse_conatct,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("first_name");
      expect(body.error.errorDetails).has.property("last_name");
      expect(body.error.errorDetails).has.property("middle_name");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("value");
      expect(body.error.errorDetails).has.property("label");
    });
  });

  it("Test case when contact_info object are blank", () => {
    let requestData = {
      warehouse_id: Cypress.env("warehouseId"),
      first_name: Cypress.env("Random"),
      contact_info: [{}, {}],
    };
    cy.request({
      method: routes.post,
      url: routes.post_warehouse_conatct,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("value");
      expect(body.error.errorDetails).has.property("label");
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {
  it("Test cases When alphabet provides along with Id ", () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_warehouse_conatct}${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.chk_id);
    });
  });

  it("Test cases When warehouse_contact_id doesn't exist", () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_warehouse_conatct}${Cypress.env("RandomNumber")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "warehouse_contact_id",`{warehouse_contact_id} is invalid`);
    });
  });

  it("Test cases When contact_info_id doesn't exist", () => {
    let requestData = {
      contact_info: [{ id: Cypress.env("RandomNumber") }],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_conatct}${warehouse_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("contact_info_id");
    });
  });

  it(" Test cases When contact_id is not associated with contact_info_id", () => {
    let requestData = { contact_info: [{ id: warehouse_conInfo_id[0] }] };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_conatct}${warehouse_contact_id_1}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("contact_info_id");
    });
  });

  it("delete function should work only with associate contact_id and contact_info_id", () => {
    let requestData = {
      contact_info: [
        {
          id: warehouse_conInfo_id[0],
          delete: 1,
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_conatct}${warehouse_contact_id_1}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("contact_info_id");
    });
  });

  it("Test cases When required fields are empty", () => {
    let requestData = {
      warehouse_id: "",
      first_name: "",
      status: "",
      contact_info: [
        {
          type: "",
          value: "",
          label: "",
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_conatct}${warehouse_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("warehouse_id");
      expect(body.error.errorDetails).has.property("first_name");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("value");
      expect(body.error.errorDetails).has.property("label");
    });
  });

  it("Test cases When warehouse_id doesn't exist", () => {
    let requestData = { warehouse_id: Cypress.env("RandomNumber") };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_conatct}${warehouse_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("warehouse_id");
    });
  });

  it("warehouse_id and status should be number", () => {
    let requestData = {
      warehouse_id: Cypress.env("RandomNum"),
      status: Cypress.env("RandomNum"),
      contact_info: [
        {
          status: Cypress.env("RandomNum"),
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_conatct}${warehouse_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("warehouse_id");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("status must be one of [0 and 1]", () => {
    let requestData = {
      status: Cypress.env("RandomNumber"),
      contact_info: [{ status: Cypress.env("RandomNumber") }],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_conatct}${warehouse_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("first_name, middle_name, last_name, type, value and label should be String", () => {
    let requestData = {
      first_name: Cypress.env("RandomNumber"),
      middle_name: Cypress.env("RandomNumber"),
      last_name: Cypress.env("RandomNumber"),
      contact_info: [
        {
          type: Cypress.env("RandomNumber"),
          value: Cypress.env("RandomNumber"),
          label: Cypress.env("RandomNumber"),
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_warehouse_conatct}${warehouse_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property("first_name");
      expect(body.error.errorDetails).has.property("last_name");
      expect(body.error.errorDetails).has.property("middle_name");
      expect(body.error.errorDetails).has.property("type");
      expect(body.error.errorDetails).has.property("value");
      expect(body.error.errorDetails).has.property("label");
    });
  });
});

describe(`${store_msg.success_log}${Cypress.spec["fileName"]}`, () => {
  it("Test cases for get-log API", () => {
    let today = new Date().toISOString().slice(0, 10);
    let requestData = {
      module_name: "warehouse_contact",
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
    let recordId = warehouse_contact_id.toString();
    let requestData = {
      module: "warehouse_contact",
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
    let name = "warehouse_contact";
    let obj = {
      statusCode: 200,
      success: true,
      error: null,
      result: {
        message: "Module fields fetched successfully",
        data: {
          fields: [
            "id",
            "warehouse_id",
            "first_name",
            "last_name",
            "middle_name",
            "status",
            "created_date",
            "updated_date",
            "created_by",
            "updated_by",
          ],
          foreignKey: {},
          child: {
            warehouse_contact_info: {
              fields: [
                "id",
                "warehouse_contact_id",
                "type",
                "value",
                "label",
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
