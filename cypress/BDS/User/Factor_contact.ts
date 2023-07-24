import store_msg from "../../support/store_msg";

let factor_contact_id: Number;
let factor_contact_id_1: Number;
let factor_conInfo_id: Number[];

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");
  before(() => {
    cy.GetCompanyToken();
    cy.Random();
    cy.RandomNumber();
    cy.RandomNum();
    cy.GetFactorId();
    cy.randomEmail();
  });

  it("Test cases for create API", () => {
    let requestData = {
      factor_id: Cypress.env("factorId"),
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
      method: "POST",
      url: `${baseurl}v1/factor_contact/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      factor_contact_id = body.result.data.id;
      factor_conInfo_id = body.result.data.contact_info.map(
        (element) => element.id
      );
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data)
        .has.property("first_name")
        .that.to.be.equal(requestData.first_name);
      expect(body.result.data)
        .has.property("middle_name")
        .that.to.be.equal(requestData.middle_name);
      expect(body.result.data)
        .has.property("last_name")
        .that.to.be.equal(requestData.last_name);
      expect(body.result.data)
        .has.property("status")
        .that.to.be.equal(requestData.status);
      expect(body.result.data).has.property("type", body.result.data.type);
      expect(body.result.data).has.property(
        "created_date",
        body.result.data.created_date
      );
      expect(body.result.data).has.property(
        "created_by",
        body.result.data.created_by
      );
      expect(body.result.data)
        .has.property("factor_id")
        .that.to.be.equal(requestData.factor_id);
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.type)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.type))
      );
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.value)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.value))
      );
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.label)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.label))
      );
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.status)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.status))
      );

      body.result.data.contact_info.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("factor_contact_id", ele.factor_contact_id);
        expect(ele).has.property("type", ele.type);
        expect(ele).has.property("value", ele.value);
        expect(ele).has.property("label", ele.label);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("created_by", ele.created_by);
      });
    });
  });

  it("Test cases for create API when optional fields are null", () => {
    let requestData = {
      factor_id: Cypress.env("factorId"),
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
      method: "POST",
      url: `${baseurl}v1/factor_contact/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      factor_contact_id_1 = body.result.data.id;
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data)
        .has.property("first_name")
        .that.to.be.equal(requestData.first_name);
      expect(body.result.data)
        .has.property("middle_name")
        .that.to.be.equal(requestData.middle_name);
      expect(body.result.data)
        .has.property("last_name")
        .that.to.be.equal(requestData.last_name);
      expect(body.result.data)
        .has.property("status")
        .that.to.be.equal(requestData.status);
      expect(body.result.data).has.property("type", body.result.data.type);
      expect(body.result.data).has.property(
        "created_date",
        body.result.data.created_date
      );
      expect(body.result.data).has.property(
        "created_by",
        body.result.data.created_by
      );
      expect(body.result.data)
        .has.property("factor_id")
        .that.to.be.equal(requestData.factor_id);
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.type)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.type))
      );
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.value)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.value))
      );
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.label)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.label))
      );
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.status)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.status))
      );

      body.result.data.contact_info.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("factor_contact_id", ele.factor_contact_id);
        expect(ele).has.property("type", ele.type);
        expect(ele).has.property("value", ele.value);
        expect(ele).has.property("label", ele.label);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("created_by", ele.created_by);
      });
    });
  });

  it("Test cases for create API when optional fields are blank", () => {
    let requestData = {
      factor_id: Cypress.env("factorId"),
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
      method: "POST",
      url: `${baseurl}v1/factor_contact/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data)
        .has.property("first_name")
        .that.to.be.equal(requestData.first_name);
      expect(body.result.data)
        .has.property("middle_name")
        .that.to.be.equal(requestData.middle_name);
      expect(body.result.data)
        .has.property("last_name")
        .that.to.be.equal(requestData.last_name);
      expect(body.result.data)
        .has.property("status")
        .that.to.be.equal(requestData.status);
      expect(body.result.data).has.property("type", body.result.data.type);
      expect(body.result.data).has.property(
        "created_date",
        body.result.data.created_date
      );
      expect(body.result.data).has.property(
        "created_by",
        body.result.data.created_by
      );
      expect(body.result.data)
        .has.property("factor_id")
        .that.to.be.equal(requestData.factor_id);
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.type)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.type))
      );
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.value)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.value))
      );
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.label)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.label))
      );
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.status)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.status))
      );

      body.result.data.contact_info.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("factor_contact_id", ele.factor_contact_id);
        expect(ele).has.property("type", ele.type);
        expect(ele).has.property("value", ele.value);
        expect(ele).has.property("label", ele.label);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("created_by", ele.created_by);
      });
    });
  });

  it("Test cases for create API when not providing optional fields", () => {
    let requestData = {
      factor_id: Cypress.env("factorId"),
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
      method: "POST",
      url: `${baseurl}v1/factor_contact/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data)
        .has.property("first_name")
        .that.to.be.equal(requestData.first_name);
      // expect(body.result.data).has.property("status").that.to.be.equal(requestData.status);
      expect(body.result.data).has.property("type", body.result.data.type);
      expect(body.result.data).has.property(
        "created_date",
        body.result.data.created_date
      );
      expect(body.result.data).has.property(
        "created_by",
        body.result.data.created_by
      );
      expect(body.result.data)
        .has.property("factor_id")
        .that.to.be.equal(requestData.factor_id);
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.type)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.type))
      );
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.value)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.value))
      );
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.label)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.label))
      );
      // expect(JSON.stringify(body.result.data.contact_info.map((ele:any)=>ele.status))).to.be.deep.equal( JSON.stringify(requestData.contact_info.map((elem:any)=>elem.status)));

      body.result.data.contact_info.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("factor_contact_id", ele.factor_contact_id);
        expect(ele).has.property("type", ele.type);
        expect(ele).has.property("value", ele.value);
        expect(ele).has.property("label", ele.label);
        // expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("created_by", ele.created_by);
      });
    });
  });

  it("Test cases for create API when contact_info Array is blank", () => {
    let requestData = {
      factor_id: Cypress.env("factorId"),
      first_name: Cypress.env("Random"),
      middle_name: "",
      last_name: "",
      status: Cypress.env("randomBoolean"),
      contact_info: [],
    };
    cy.request({
      method: "POST",
      url: `${baseurl}v1/factor_contact/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data)
        .has.property("first_name")
        .that.to.be.equal(requestData.first_name);
      expect(body.result.data)
        .has.property("middle_name")
        .that.to.be.equal(requestData.middle_name);
      expect(body.result.data)
        .has.property("last_name")
        .that.to.be.equal(requestData.last_name);
      expect(body.result.data)
        .has.property("status")
        .that.to.be.equal(requestData.status);
      expect(body.result.data).has.property("type", body.result.data.type);
      expect(body.result.data).has.property(
        "created_date",
        body.result.data.created_date
      );
      expect(body.result.data).has.property(
        "created_by",
        body.result.data.created_by
      );
      expect(body.result.data)
        .has.property("factor_id")
        .that.to.be.equal(requestData.factor_id);
      expect(body.result.data)
        .has.property("contact_info")
        .that.deep.equal(requestData.contact_info);
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");

  it("Test case for update API when not providing any fields", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/factor_contact/${factor_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("type", body.result.data.type);
      expect(body.result.data).has.property(
        "first_name",
        body.result.data.first_name
      );
      expect(body.result.data).has.property(
        "last_name",
        body.result.data.last_name
      );
      expect(body.result.data).has.property(
        "middle_name",
        body.result.data.middle_name
      );
      expect(body.result.data).has.property("status", body.result.data.status);
      expect(body.result.data).has.property(
        "created_date",
        body.result.data.created_date
      );
      expect(body.result.data).has.property(
        "updated_date",
        body.result.data.updated_date
      );
      expect(body.result.data).has.property(
        "created_by",
        body.result.data.created_by
      );
      expect(body.result.data).has.property(
        "updated_by",
        body.result.data.updated_by
      );
      expect(body.result.data).has.property(
        "factor_id",
        body.result.data.factor_id
      );
      body.result.data.contact_info.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("factor_contact_id", ele.factor_contact_id);
        expect(ele).has.property("type", ele.type);
        expect(ele).has.property("value", ele.value);
        expect(ele).has.property("label", ele.label);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
      });
    });
  });

  it("Test case for update API when not providing optional fields", () => {
    let requestData = {
      factor_id: Cypress.env("factorId"),
      first_name: Cypress.env("Random"),
      contact_info: [
        {
          id: factor_conInfo_id[0],
          type: "phone",
          value: Cypress.env("Random"),
          label: "office phone",
        },
        {
          id: factor_conInfo_id[1],
          type: "email",
          value: Cypress.env("testEmail"),
          label: "office email",
        },
      ],
    };
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/factor_contact/${factor_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("type", body.result.data.type);
      expect(body.result.data)
        .has.property("first_name")
        .that.to.be.equal(requestData.first_name);
      expect(body.result.data).has.property(
        "last_name",
        body.result.data.last_name
      );
      expect(body.result.data).has.property(
        "middle_name",
        body.result.data.middle_name
      );
      expect(body.result.data).has.property("status", body.result.data.status);
      expect(body.result.data).has.property(
        "created_date",
        body.result.data.created_date
      );
      expect(body.result.data).has.property(
        "updated_date",
        body.result.data.updated_date
      );
      expect(body.result.data).has.property(
        "created_by",
        body.result.data.created_by
      );
      expect(body.result.data).has.property(
        "updated_by",
        body.result.data.updated_by
      );
      expect(body.result.data)
        .has.property("factor_id")
        .that.to.be.equal(requestData.factor_id);
      expect(
        JSON.stringify(body.result.data.contact_info.map((ele: any) => ele.id))
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.id))
      );
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.type)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.type))
      );
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.value)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.value))
      );
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.label)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.label))
      );
      body.result.data.contact_info.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("factor_contact_id", ele.factor_contact_id);
        expect(ele).has.property("type", ele.type);
        expect(ele).has.property("value", ele.value);
        expect(ele).has.property("label", ele.label);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
      });
    });
  });

  it("Test case for update API when optional fields are null", () => {
    let requestData = {
      factor_id: Cypress.env("factorId"),
      first_name: Cypress.env("Random"),
      middle_name: null,
      last_name: null,
      status: Cypress.env("randomBoolean"),
      contact_info: [
        {
          id: factor_conInfo_id[0],
          type: "phone",
          value: Cypress.env("Random"),
          label: "office phone",
          status: Cypress.env("randomBoolean"),
        },
        {
          id: factor_conInfo_id[1],
          type: "email",
          value: Cypress.env("testEmail"),
          label: "office email",
          status: Cypress.env("randomBoolean"),
        },
      ],
    };
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/factor_contact/${factor_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("type", body.result.data.type);
      expect(body.result.data)
        .has.property("first_name")
        .that.to.be.equal(requestData.first_name);
      expect(body.result.data)
        .has.property("last_name")
        .that.to.be.equal(requestData.last_name);
      expect(body.result.data)
        .has.property("middle_name")
        .that.to.be.equal(requestData.middle_name);
      expect(body.result.data)
        .has.property("status")
        .that.to.be.equal(requestData.status);
      expect(body.result.data).has.property(
        "created_date",
        body.result.data.created_date
      );
      expect(body.result.data).has.property(
        "updated_date",
        body.result.data.updated_date
      );
      expect(body.result.data).has.property(
        "created_by",
        body.result.data.created_by
      );
      expect(body.result.data).has.property(
        "updated_by",
        body.result.data.updated_by
      );
      expect(body.result.data)
        .has.property("factor_id")
        .that.to.be.equal(requestData.factor_id);
      expect(
        JSON.stringify(body.result.data.contact_info.map((ele: any) => ele.id))
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.id))
      );
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.type)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.type))
      );
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.value)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.value))
      );
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.label)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.label))
      );
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.status)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.status))
      );
      body.result.data.contact_info.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("factor_contact_id", ele.factor_contact_id);
        expect(ele).has.property("type", ele.type);
        expect(ele).has.property("value", ele.value);
        expect(ele).has.property("label", ele.label);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
      });
    });
  });

  it("Test case for update API when optional fields are blank", () => {
    let requestData = {
      factor_id: Cypress.env("factorId"),
      first_name: Cypress.env("Random"),
      middle_name: "",
      last_name: "",
      status: Cypress.env("randomBoolean"),
      contact_info: [
        {
          id: factor_conInfo_id[0],
          type: "phone",
          value: Cypress.env("Random"),
          label: "office phone",
          status: Cypress.env("randomBoolean"),
        },
        {
          id: factor_conInfo_id[1],
          type: "email",
          value: Cypress.env("testEmail"),
          label: "office email",
          status: Cypress.env("randomBoolean"),
        },
      ],
    };
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/factor_contact/${factor_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("type", body.result.data.type);
      expect(body.result.data)
        .has.property("first_name")
        .that.to.be.equal(requestData.first_name);
      expect(body.result.data)
        .has.property("last_name")
        .that.to.be.equal(requestData.last_name);
      expect(body.result.data)
        .has.property("middle_name")
        .that.to.be.equal(requestData.middle_name);
      expect(body.result.data)
        .has.property("status")
        .that.to.be.equal(requestData.status);
      expect(body.result.data).has.property(
        "created_date",
        body.result.data.created_date
      );
      expect(body.result.data).has.property(
        "updated_date",
        body.result.data.updated_date
      );
      expect(body.result.data).has.property(
        "created_by",
        body.result.data.created_by
      );
      expect(body.result.data).has.property(
        "updated_by",
        body.result.data.updated_by
      );
      expect(body.result.data)
        .has.property("factor_id")
        .that.to.be.equal(requestData.factor_id);
      expect(
        JSON.stringify(body.result.data.contact_info.map((ele: any) => ele.id))
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.id))
      );
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.type)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.type))
      );
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.value)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.value))
      );
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.label)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.label))
      );
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.status)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.status))
      );
      body.result.data.contact_info.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("factor_contact_id", ele.factor_contact_id);
        expect(ele).has.property("type", ele.type);
        expect(ele).has.property("value", ele.value);
        expect(ele).has.property("label", ele.label);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
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
      method: "PUT",
      url: `${baseurl}v1/factor_contact/${factor_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("type", body.result.data.type);
      expect(body.result.data).has.property(
        "first_name",
        body.result.data.first_name
      );
      expect(body.result.data)
        .has.property("last_name")
        .that.to.be.equal(requestData.last_name);
      expect(body.result.data)
        .has.property("middle_name")
        .that.to.be.equal(requestData.middle_name);
      expect(body.result.data)
        .has.property("status")
        .that.to.be.equal(requestData.status);
      expect(body.result.data).has.property(
        "created_date",
        body.result.data.created_date
      );
      expect(body.result.data).has.property(
        "updated_date",
        body.result.data.updated_date
      );
      expect(body.result.data).has.property(
        "created_by",
        body.result.data.created_by
      );
      expect(body.result.data).has.property(
        "updated_by",
        body.result.data.updated_by
      );
      expect(body.result.data).has.property(
        "factor_id",
        body.result.data.factor_id
      );
      body.result.data.contact_info.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("factor_contact_id", ele.factor_contact_id);
        expect(ele).has.property("type", ele.type);
        expect(ele).has.property("value", ele.value);
        expect(ele).has.property("label", ele.label);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
      });
    });
  });

  it("Test case for update API when contact_info array are blank", () => {
    let requestData = {
      factor_id: Cypress.env("factorId"),
      first_name: Cypress.env("Random"),
      middle_name: Cypress.env("Random"),
      last_name: Cypress.env("Random"),
      status: Cypress.env("randomBoolean"),
      contact_info: [],
    };
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/factor_contact/${factor_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("type", body.result.data.type);
      expect(body.result.data)
        .has.property("first_name")
        .that.to.be.equal(requestData.first_name);
      expect(body.result.data)
        .has.property("last_name")
        .that.to.be.equal(requestData.last_name);
      expect(body.result.data)
        .has.property("middle_name")
        .that.to.be.equal(requestData.middle_name);
      expect(body.result.data)
        .has.property("status")
        .that.to.be.equal(requestData.status);
      expect(body.result.data).has.property(
        "created_date",
        body.result.data.created_date
      );
      expect(body.result.data).has.property(
        "updated_date",
        body.result.data.updated_date
      );
      expect(body.result.data).has.property(
        "created_by",
        body.result.data.created_by
      );
      expect(body.result.data).has.property(
        "updated_by",
        body.result.data.updated_by
      );
      expect(body.result.data)
        .has.property("factor_id")
        .that.to.be.equal(requestData.factor_id);
      body.result.data.contact_info.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("factor_contact_id", ele.factor_contact_id);
        expect(ele).has.property("type", ele.type);
        expect(ele).has.property("value", ele.value);
        expect(ele).has.property("label", ele.label);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
      });
    });
  });

  it("Test case for update API when contact_info object are blank", () => {
    let requestData = {
      factor_id: Cypress.env("factorId"),
      first_name: Cypress.env("Random"),
      middle_name: Cypress.env("Random"),
      last_name: Cypress.env("Random"),
      status: Cypress.env("randomBoolean"),
      contact_info: [
        { id: factor_conInfo_id[0] },
        { id: factor_conInfo_id[1] },
      ],
    };
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/factor_contact/${factor_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("type", body.result.data.type);
      expect(body.result.data)
        .has.property("first_name")
        .that.to.be.equal(requestData.first_name);
      expect(body.result.data)
        .has.property("last_name")
        .that.to.be.equal(requestData.last_name);
      expect(body.result.data)
        .has.property("middle_name")
        .that.to.be.equal(requestData.middle_name);
      expect(body.result.data)
        .has.property("status")
        .that.to.be.equal(requestData.status);
      expect(body.result.data).has.property(
        "created_date",
        body.result.data.created_date
      );
      expect(body.result.data).has.property(
        "updated_date",
        body.result.data.updated_date
      );
      expect(body.result.data).has.property(
        "created_by",
        body.result.data.created_by
      );
      expect(body.result.data).has.property(
        "updated_by",
        body.result.data.updated_by
      );
      expect(body.result.data)
        .has.property("factor_id")
        .that.to.be.equal(requestData.factor_id);
      expect(
        JSON.stringify(body.result.data.contact_info.map((ele: any) => ele.id))
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.id))
      );

      body.result.data.contact_info.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("factor_contact_id", ele.factor_contact_id);
        expect(ele).has.property("type", ele.type);
        expect(ele).has.property("value", ele.value);
        expect(ele).has.property("label", ele.label);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
      });
    });
  });

  it("Test case for update API", () => {
    let requestData = {
      factor_id: Cypress.env("factorId"),
      first_name: Cypress.env("Random"),
      middle_name: Cypress.env("Random"),
      last_name: Cypress.env("Random"),
      status: 1,
      contact_info: [
        {
          id: factor_conInfo_id[0],
          type: "phone",
          value: Cypress.env("Random"),
          label: "office phone",
          status: Cypress.env("randomBoolean"),
        },
        {
          id: factor_conInfo_id[1],
          type: "email",
          value: Cypress.env("testEmail"),
          label: "office email",
          status: Cypress.env("randomBoolean"),
        },
      ],
    };
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/factor_contact/${factor_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("type", body.result.data.type);
      expect(body.result.data)
        .has.property("first_name")
        .that.to.be.equal(requestData.first_name);
      expect(body.result.data)
        .has.property("last_name")
        .that.to.be.equal(requestData.last_name);
      expect(body.result.data)
        .has.property("middle_name")
        .that.to.be.equal(requestData.middle_name);
      expect(body.result.data)
        .has.property("status")
        .that.to.be.equal(requestData.status);
      expect(body.result.data).has.property(
        "created_date",
        body.result.data.created_date
      );
      expect(body.result.data).has.property(
        "updated_date",
        body.result.data.updated_date
      );
      expect(body.result.data).has.property(
        "created_by",
        body.result.data.created_by
      );
      expect(body.result.data).has.property(
        "updated_by",
        body.result.data.updated_by
      );
      expect(body.result.data)
        .has.property("factor_id")
        .that.to.be.equal(requestData.factor_id);
      expect(
        JSON.stringify(body.result.data.contact_info.map((ele: any) => ele.id))
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.id))
      );
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.type)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.type))
      );
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.value)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.value))
      );
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.label)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.label))
      );
      expect(
        JSON.stringify(
          body.result.data.contact_info.map((ele: any) => ele.status)
        )
      ).to.be.deep.equal(
        JSON.stringify(requestData.contact_info.map((elem: any) => elem.status))
      );
      body.result.data.contact_info.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("factor_contact_id", ele.factor_contact_id);
        expect(ele).has.property("type", ele.type);
        expect(ele).has.property("value", ele.value);
        expect(ele).has.property("label", ele.label);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
      });
    });
  });

  it("Test case for delete function", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/factor_contact/${factor_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        factor_id: Cypress.env("factorId"),
        first_name: Cypress.env("Random"),
        middle_name: Cypress.env("Random"),
        last_name: Cypress.env("Random"),
        status: Cypress.env("randomBoolean"),
        contact_info: [
          {
            id: factor_conInfo_id[0],
            type: "phone",
            value: Cypress.env("Random"),
            label: "office phone",
            status: Cypress.env("randomBoolean"),
          },
          {
            id: factor_conInfo_id[1],
            type: "email",
            value: Cypress.env("testEmail"),
            label: "office email",
            status: Cypress.env("randomBoolean"),
          },
          {
            id: factor_conInfo_id[2],
            delete: 1,
            // type: "email",
            // value: Cypress.env("testEmail"),
            // label: "office email",
            // status: Cypress.env("randomBoolean"),
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");

  it("Test case for fetch API", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/factor_contact/fetch`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "reference_contact.id",
            operation: "=",
            val: factor_contact_id,
          },
        ],
        searchOr: [
          {
            key: "reference_contact.id",
            operation: "=",
            val: factor_contact_id,
          },
        ],
        searchOrAnd: [
          {
            key: "reference_contact.id",
            operation: "=",
            val: factor_contact_id,
          },
        ],
        select: [
          "factor.id as factor_id",
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
      },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("factor_id", ele.factor_id);
        expect(ele).has.property("first_name", ele.first_name);
        expect(ele).has.property("middle_name", ele.middle_name);
        expect(ele).has.property("last_name", ele.last_name);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("id", ele.id);
        ele.contact_info.forEach((element: any) => {
          expect(element).has.property("id", element.id);
          expect(element).has.property("type", element.type);
          expect(element).has.property("value", element.value);
          expect(element).has.property("label", element.label);
        });
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/factor_contact/fetch`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("factor_id", ele.factor_id);
        expect(ele).has.property("code", ele.code);
        expect(ele).has.property("name", ele.name);
        expect(ele).has.property("account_number", ele.account_number);
        expect(ele).has.property("company_id", ele.company_id);
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("first_name", ele.first_name);
        expect(ele).has.property("middle_name", ele.middle_name);
        expect(ele).has.property("last_name", ele.last_name);
        expect(ele).has.property("type", ele.type);
        expect(ele).has.property("contact_info", ele.contact_info);
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
    cy.request({
      method: "POST",
      url: `${baseurl}v1/factor_contact/fetch`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [],
        searchOr: [],
        searchOrAnd: [],
        select: [
          "factor.id as factor_id",
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
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("factor_id", ele.factor_id);
        expect(ele).has.property("first_name", ele.first_name);
        expect(ele).has.property("middle_name", ele.middle_name);
        expect(ele).has.property("last_name", ele.last_name);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("id", ele.id);
        ele.contact_info.forEach((element: any) => {
          expect(element).has.property("id", element.id);
          expect(element).has.property("type", element.type);
          expect(element).has.property("value", element.value);
          expect(element).has.property("label", element.label);
        });
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch API when select field left blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/factor_contact/fetch`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "reference_contact.id",
            operation: "=",
            val: factor_contact_id,
          },
        ],
        select: [],
        sort: "reference_contact.id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("factor_id", ele.factor_id);
        expect(ele).has.property("code", ele.code);
        expect(ele).has.property("name", ele.name);
        expect(ele).has.property("account_number", ele.account_number);
        expect(ele).has.property("company_id", ele.company_id);
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("first_name", ele.first_name);
        expect(ele).has.property("middle_name", ele.middle_name);
        expect(ele).has.property("last_name", ele.last_name);
        expect(ele).has.property("type", ele.type);
        ele.contact_info.forEach((element: any) => {
          expect(element).has.property("id", element.id);
          expect(element).has.property("type", element.type);
          expect(element).has.property("value", element.value);
          expect(element).has.property("label", element.label);
        });
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch API when not provide search and select field", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/factor_contact/fetch`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [],
        searchOr: [],
        searchOrAnd: [],
        select: [],
        sort: "reference_contact.id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("factor_id", ele.factor_id);
        expect(ele).has.property("code", ele.code);
        expect(ele).has.property("name", ele.name);
        expect(ele).has.property("account_number", ele.account_number);
        expect(ele).has.property("company_id", ele.company_id);
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("first_name", ele.first_name);
        expect(ele).has.property("middle_name", ele.middle_name);
        expect(ele).has.property("last_name", ele.last_name);
        expect(ele).has.property("type", ele.type);
        expect(ele).has.property("contact_info", ele.contact_info);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/factor_contact/fetch`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "reference_contact.id",
            operation: "=",
            val: Cypress.env("RandomNumber"),
          },
        ],
        searchOr: [
          {
            key: "reference_contact.id",
            operation: "=",
            val: Cypress.env("RandomNumber"),
          },
        ],
        searchOrAnd: [
          {
            key: "reference_contact.id",
            operation: "=",
            val: Cypress.env("RandomNumber"),
          },
        ],
        select: [
          "factor.id as factor_id",
          "reference_contact.first_name",
          "reference_contact.middle_name",
          "reference_contact.last_name",
          "reference_contact.created_date",
          "reference_contact.created_by",
          "reference_contact.updated_date",
          "reference_contact.updated_by",
          "factor.status",
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
  const baseurl = Cypress.env("apiUrl");

  it("Test cases When do not provide any field ", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/factor_contact/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "factor_id",
        body.error.errorDetails.factor_id
      );
      expect(body.error.errorDetails).has.property(
        "first_name",
        body.error.errorDetails.first_name
      );
      expect(body.error.errorDetails).has.property(
        "contact_info",
        body.error.errorDetails.contact_info
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/factor_contact/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        factor_id: "",
        first_name: "",

        status: "",
        contact_info: [
          {
            type: "",
            value: "",
            label: "",
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "factor_id",
        body.error.errorDetails.factor_id
      );
      expect(body.error.errorDetails).has.property(
        "first_name",
        body.error.errorDetails.first_name
      );
      expect(body.error.errorDetails).has.property(
        "type",
        body.error.errorDetails.type
      );
      expect(body.error.errorDetails).has.property(
        "value",
        body.error.errorDetails.value
      );
      expect(body.error.errorDetails).has.property(
        "label",
        body.error.errorDetails.label
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test cases When factor_id doesn't exist", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/factor_contact/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        factor_id: Cypress.env("RandomNumber"),
        first_name: Cypress.env("Random"),
        middle_name: Cypress.env("Random"),
        last_name: Cypress.env("Random"),
        status: Cypress.env("randomBoolean"),
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
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("factor_id");
    });
  });

  it("factor_id and status should be number", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/factor_contact/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        factor_id: Cypress.env("RandomNum"),
        first_name: Cypress.env("Random"),
        middle_name: Cypress.env("Random"),
        last_name: Cypress.env("Random"),
        status: Cypress.env("RandomNum"),
        contact_info: [
          {
            type: "phone",
            value: Cypress.env("Random"),
            label: "office phone",
            status: Cypress.env("RandomNum"),
          },
          {
            type: "email",
            value: Cypress.env("testEmail"),
            label: "office email",
            status: Cypress.env("RandomNum"),
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "factor_id",
        body.error.errorDetails.factor_id
      );
      expect(body.error.errorDetails).has.property(
        "status",
        body.error.errorDetails.status
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("status must be one of [0 and 1]", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/factor_contact/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        factor_id: Cypress.env("factorId"),
        first_name: Cypress.env("Random"),
        middle_name: Cypress.env("Random"),
        last_name: Cypress.env("Random"),
        status: Cypress.env("RandomNumber"),
        contact_info: [
          {
            type: "phone",
            value: Cypress.env("Random"),
            label: "office phone",
            status: Cypress.env("RandomNumber"),
          },
          {
            type: "email",
            value: Cypress.env("testEmail"),
            label: "office email",
            status: Cypress.env("RandomNumber"),
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
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

  it("first_name, middle_name, last_name, type, value and label should be String", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/factor_contact/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        factor_id: Cypress.env("factorId"),
        first_name: Cypress.env("RandomNumber"),
        middle_name: Cypress.env("RandomNumber"),
        last_name: Cypress.env("RandomNumber"),
        status: 1,
        contact_info: [
          {
            type: Cypress.env("RandomNumber"),
            value: Cypress.env("RandomNumber"),
            label: Cypress.env("RandomNumber"),
            status: 1,
          },
          {
            type: Cypress.env("RandomNumber"),
            value: Cypress.env("RandomNumber"),
            label: Cypress.env("RandomNumber"),
            status: 1,
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "first_name",
        body.error.errorDetails.first_name
      );
      expect(body.error.errorDetails).has.property(
        "last_name",
        body.error.errorDetails.last_name
      );
      expect(body.error.errorDetails).has.property(
        "middle_name",
        body.error.errorDetails.middle_name
      );
      expect(body.error.errorDetails).has.property(
        "type",
        body.error.errorDetails.type
      );
      expect(body.error.errorDetails).has.property(
        "value",
        body.error.errorDetails.value
      );
      expect(body.error.errorDetails).has.property(
        "label",
        body.error.errorDetails.label
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when contact_info object are blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/factor_contact/`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        factor_id: Cypress.env("factorId"),
        first_name: Cypress.env("Random"),
        middle_name: Cypress.env("Random"),
        last_name: Cypress.env("Random"),
        status: 1,
        contact_info: [{}, {}],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "type",
        body.error.errorDetails.type
      );
      expect(body.error.errorDetails).has.property(
        "value",
        body.error.errorDetails.value
      );
      expect(body.error.errorDetails).has.property(
        "label",
        body.error.errorDetails.label
      );
      expect(body).has.property("result", body.result);
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");

  it("Test cases When alphabet provides along with Id ", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/factor_contact/${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        factor_id: Cypress.env("factorId"),
        first_name: Cypress.env("Random"),
        middle_name: Cypress.env("Random"),
        last_name: Cypress.env("Random"),
        status: Cypress.env("randomBoolean"),
        contact_info: [
          {
            id: factor_conInfo_id[0],
            type: "phone",
            value: Cypress.env("Random"),
            label: "office phone",
          },
          {
            id: factor_conInfo_id[1],
            type: "email",
            value: Cypress.env("testEmail"),
            label: "office email",
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.chk_id);
    });
  });

  it("Test cases When factor_contact_id doesn't exist", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/factor_contact/${Cypress.env("RandomNumber")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        factor_id: Cypress.env("factorId"),
        first_name: Cypress.env("Random"),
        middle_name: Cypress.env("Random"),
        last_name: Cypress.env("Random"),
        status: Cypress.env("randomBoolean"),
        contact_info: [
          {
            id: factor_conInfo_id[0],
            type: "phone",
            value: Cypress.env("Random"),
            label: "office phone",
          },
          {
            id: factor_conInfo_id[1],
            type: "email",
            value: Cypress.env("testEmail"),
            label: "office email",
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "factor_contact_id",`{factor_contact_id} is invalid`);
    });
  });

  it("Test cases When contact_info_id doesn't exist", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/factor_contact/${factor_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        factor_id: Cypress.env("factorId"),
        first_name: Cypress.env("Random"),
        middle_name: Cypress.env("Random"),
        last_name: Cypress.env("Random"),
        status: Cypress.env("randomBoolean"),
        contact_info: [
          {
            id: Cypress.env("RandomNumber"),
            type: "phone",
            value: Cypress.env("Random"),
            label: "office phone",
          },
          {
            id: Cypress.env("RandomNumber"),
            type: "email",
            value: Cypress.env("testEmail"),
            label: "office email",
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("contact_info_id");
    });
  });

  it(" Test cases When contact_id is not associated with contact_info_id", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/factor_contact/${factor_contact_id_1}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        factor_id: Cypress.env("factorId"),
        first_name: Cypress.env("Random"),
        middle_name: Cypress.env("Random"),
        last_name: Cypress.env("Random"),
        status: Cypress.env("randomBoolean"),
        contact_info: [
          {
            id: factor_conInfo_id[0],
            type: "phone",
            value: Cypress.env("Random"),
            label: "office phone",
          },
          {
            id: factor_conInfo_id[1],
            type: "email",
            value: Cypress.env("testEmail"),
            label: "office email",
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("contact_info_id");
    });
  });

  it("delete function should work only with associate contact_id and contact_info_id", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/factor_contact/${factor_contact_id_1}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        factor_id: Cypress.env("factorId"),
        first_name: Cypress.env("Random"),
        middle_name: Cypress.env("Random"),
        last_name: Cypress.env("Random"),
        status: Cypress.env("randomBoolean"),
        contact_info: [
          {
            id: factor_conInfo_id[0],
            delete: 1,
            // type: "phone",
            // value: Cypress.env("Random"),
            // label: "office phone",
          },
          {
            id: factor_conInfo_id[1],
            delete: 1,
            // type: "email",
            // value: Cypress.env("testEmail"),
            // label: "office email",
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("contact_info_id");
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/factor_contact/${factor_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        factor_id: "",
        first_name: "",

        status: "",
        contact_info: [
          {
            type: "",
            value: "",
            label: "",
          },
          {},
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "factor_id",
        body.error.errorDetails.factor_id
      );
      expect(body.error.errorDetails).has.property(
        "first_name",
        body.error.errorDetails.first_name
      );
      expect(body.error.errorDetails).has.property(
        "type",
        body.error.errorDetails.type
      );
      expect(body.error.errorDetails).has.property(
        "value",
        body.error.errorDetails.value
      );
      expect(body.error.errorDetails).has.property(
        "label",
        body.error.errorDetails.label
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test cases When factor_id doesn't exist", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/factor_contact/${factor_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        factor_id: Cypress.env("RandomNumber"),
        first_name: Cypress.env("Random"),
        middle_name: Cypress.env("Random"),
        last_name: Cypress.env("Random"),
        status: Cypress.env("randomBoolean"),
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
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("factor_id");
    });
  });

  it("factor_id and status should be number", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/factor_contact/${factor_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        factor_id: Cypress.env("RandomNum"),
        first_name: Cypress.env("Random"),
        middle_name: Cypress.env("Random"),
        last_name: Cypress.env("Random"),
        status: Cypress.env("RandomNum"),
        contact_info: [
          {
            type: "phone",
            value: Cypress.env("Random"),
            label: "office phone",
            status: Cypress.env("RandomNum"),
          },
          {
            type: "email",
            value: Cypress.env("testEmail"),
            label: "office email",
            status: Cypress.env("RandomNum"),
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      // expect(body.error.errorDetails).has.property("factor_id", body.error.errorDetails.factor_id);
      expect(body.error.errorDetails).has.property(
        "status",
        body.error.errorDetails.status
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("status must be one of [0 and 1]", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/factor_contact/${factor_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        factor_id: Cypress.env("factorId"),
        first_name: Cypress.env("Random"),
        middle_name: Cypress.env("Random"),
        last_name: Cypress.env("Random"),
        status: Cypress.env("RandomNumber"),
        contact_info: [
          {
            type: "phone",
            value: Cypress.env("Random"),
            label: "office phone",
            status: Cypress.env("RandomNumber"),
          },
          {
            type: "email",
            value: Cypress.env("testEmail"),
            label: "office email",
            status: Cypress.env("RandomNumber"),
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
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

  it("first_name, middle_name, last_name, type, value and label should be String", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/factor_contact/${factor_contact_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        factor_id: Cypress.env("factorId"),
        first_name: Cypress.env("RandomNumber"),
        middle_name: Cypress.env("RandomNumber"),
        last_name: Cypress.env("RandomNumber"),
        status: 1,
        contact_info: [
          {
            type: Cypress.env("RandomNumber"),
            value: Cypress.env("RandomNumber"),
            label: Cypress.env("RandomNumber"),
            status: 1,
          },
          {
            type: Cypress.env("RandomNumber"),
            value: Cypress.env("RandomNumber"),
            label: Cypress.env("RandomNumber"),
            status: 1,
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "first_name",
        body.error.errorDetails.first_name
      );
      expect(body.error.errorDetails).has.property(
        "last_name",
        body.error.errorDetails.last_name
      );
      expect(body.error.errorDetails).has.property(
        "middle_name",
        body.error.errorDetails.middle_name
      );
      expect(body.error.errorDetails).has.property(
        "type",
        body.error.errorDetails.type
      );
      expect(body.error.errorDetails).has.property(
        "value",
        body.error.errorDetails.value
      );
      expect(body.error.errorDetails).has.property(
        "label",
        body.error.errorDetails.label
      );
      expect(body).has.property("result", body.result);
    });
  });
});

describe(`${store_msg.success_log}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");

  it("Test cases for get-log API", () => {
    let today = new Date().toISOString().slice(0, 10);
    cy.request({
      method: "POST",
      url: `${baseurl}v1/log/getlog`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        module_name: "factor_contact",
        search: [
          {
            key: "createdAt",
            operation: "date_range",
            val: ["2022-08-01", today],
          },
        ],
        select: ["createdAt", "modules"],
        sort: "_id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.check_log(body);
    });
  });

  it("Test case for track-change-data API", () => {
    let recordId = factor_contact_id.toString();
    cy.request({
      method: "POST",
      url: `${baseurl}v1/log/track_change`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        module: "factor_contact",
        record_id: recordId,
        sort: "_id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
      failOnStatusCode: false,
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
    let name = "Factor_contact";
    let obj = {
      statusCode: 200,
      success: true,
      error: null,
      result: {
        message: "Module fields fetched successfully",
        data: {
          fields: [
            "id",
            "factor_id",
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
            factor_contact_info: {
              fields: [
                "id",
                "factor_contact_id",
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
      method: "GET",
      url: `${baseurl}v1/modules/lookup/${name}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(JSON.stringify(body)).to.deep.equal(JSON.stringify(obj));
    });
  });
});
