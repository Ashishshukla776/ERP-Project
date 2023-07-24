import store_msg from "../../support/store_msg";

let cst_address_id: any[];
describe(`${store_msg.success}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");
  before(() => {
    cy.GetCompanyToken();
    cy.GetCustomerId();
    cy.GetFactorId();
    cy.Random();
    cy.RandomNumber();
  });

  it(`Success test case for Adress verification when is_verified is false(0) `, () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/customer_address/fetch`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [],
        searchOr: [],
        searchOrAnd: [],
        select: [],
        sort: "customers.id",
        orderby: "asc",
        page: "1",
        perPage: "20",
      },
    }).then(({ body }) => {
      cst_address_id = body.result.data.map((ele: any) => ele.id);

      let requestData = {
        is_verified: 0,
      };
      cy.request({
        method: "PUT",
        url: `${baseurl}v1/address_verification/${cst_address_id[0]}`,
        headers: { Authorization: Cypress.env("companyToken") },
        body: requestData,
      }).then(({ body }) => {
        expect(body).has.property("statusCode", 200);
        expect(body).has.property("success", true);
        expect(body).has.property("error", null);
        expect(body).has.property("result");
        expect(body.result).has.property("message", body.result.message);
        expect(body.result.data).has.property("id", body.result.data.id);
        expect(body.result.data).has.property(
          "contact_name",
          body.result.data.contact_name
        );
        expect(body.result.data).has.property("type", body.result.data.type);
        expect(body.result.data).has.property(
          "address_1",
          body.result.data.address_1
        );
        expect(body.result.data).has.property(
          "address_2",
          body.result.data.address_2
        );
        expect(body.result.data).has.property(
          "address_3",
          body.result.data.address_3
        );
        expect(body.result.data).has.property(
          "address_4",
          body.result.data.address_4
        );
        expect(body.result.data).has.property("city", body.result.data.city);
        expect(body.result.data).has.property("state", body.result.data.state);
        expect(body.result.data).has.property("zip", body.result.data.zip);
        expect(body.result.data).has.property(
          "country",
          body.result.data.country
        );
        expect(body.result.data).has.property(
          "status",
          body.result.data.status
        );
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
          "verification_source",
          body.result.data.verification_source
        );
        expect(body.result.data)
          .has.property("is_verified")
          .that.to.be.equal(requestData.is_verified);
        expect(body.result.data).has.property(
          "verified_date",
          body.result.data.verified_date
        );
        expect(body.result.data).has.property(
          "verified_by",
          body.result.data.verified_by
        );
      });
    });
  });

  it(`Success test case for Adress verification when not providing is_verified field`, () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/address_verification/${cst_address_id[0]}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {},
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property(
        "contact_name",
        body.result.data.contact_name
      );
      expect(body.result.data).has.property("type", body.result.data.type);
      expect(body.result.data).has.property(
        "address_1",
        body.result.data.address_1
      );
      expect(body.result.data).has.property(
        "address_2",
        body.result.data.address_2
      );
      expect(body.result.data).has.property(
        "address_3",
        body.result.data.address_3
      );
      expect(body.result.data).has.property(
        "address_4",
        body.result.data.address_4
      );
      expect(body.result.data).has.property("city", body.result.data.city);
      expect(body.result.data).has.property("state", body.result.data.state);
      expect(body.result.data).has.property("zip", body.result.data.zip);
      expect(body.result.data).has.property(
        "country",
        body.result.data.country
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
        "verification_source",
        body.result.data.verification_source
      );
      expect(body.result.data).has.property(
        "is_verified",
        body.result.data.is_verified
      );
      expect(body.result.data).has.property(
        "verified_date",
        body.result.data.verified_date
      );
      expect(body.result.data).has.property(
        "verified_by",
        body.result.data.verified_by
      );
    });
  });

  it(`Success test case for Adress verification when is_verified is true(1) `, () => {
    let requestData = {
      is_verified: 1,
    };
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/address_verification/${cst_address_id[0]}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property(
        "contact_name",
        body.result.data.contact_name
      );
      expect(body.result.data).has.property("type", body.result.data.type);
      expect(body.result.data).has.property(
        "address_1",
        body.result.data.address_1
      );
      expect(body.result.data).has.property(
        "address_2",
        body.result.data.address_2
      );
      expect(body.result.data).has.property(
        "address_3",
        body.result.data.address_3
      );
      expect(body.result.data).has.property(
        "address_4",
        body.result.data.address_4
      );
      expect(body.result.data).has.property("city", body.result.data.city);
      expect(body.result.data).has.property("state", body.result.data.state);
      expect(body.result.data).has.property("zip", body.result.data.zip);
      expect(body.result.data).has.property(
        "country",
        body.result.data.country
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
        "verification_source",
        body.result.data.verification_source
      );
      expect(body.result.data)
        .has.property("is_verified")
        .that.to.be.equal(requestData.is_verified);
      expect(body.result.data).has.property(
        "verified_date",
        body.result.data.verified_date
      );
      expect(body.result.data).has.property(
        "verified_by",
        body.result.data.verified_by
      );
    });
  });

  it(`Success test case for Adress verification by geoapi`, () => {
    let requestData = {
      contact_name: "Vipul Kumar",
      type: "Office",
      address_1: "sector-62",
      address_2: "Noida",
      city: "Noida",
      state: "UP",
      zip: "201309",
      country: "India",
      customer_id: Cypress.env("cstId"),
      status: 1,
    };
    cy.request({
      method: "POST",
      url: `${baseurl}v1/customer_address/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let Address_id = body.result.data.id;

      cy.request({
        method: "PUT",
        url: `${baseurl}v1/address_verification/verify/${Address_id}`,
        headers: { Authorization: Cypress.env("companyToken") },
        body: {},
      }).then(({ body }) => {
        cy.log(JSON.stringify(body));
        expect(body).has.property("statusCode", 200);
        expect(body).has.property("success", true);
        expect(body).has.property("error", null);
        expect(body).has.property("result");
        expect(body.result).has.property("message", body.result.message);
        expect(body.result.data).has.property("id", body.result.data.id);
        expect(body.result.data).has.property(
          "contact_name",
          body.result.data.contact_name
        );
        expect(body.result.data).has.property("type", body.result.data.type);
        expect(body.result.data).has.property(
          "address_1",
          body.result.data.address_1
        );
        expect(body.result.data).has.property(
          "address_2",
          body.result.data.address_2
        );
        // expect(body.result.data).has.property(
        //   "address_3",
        //   body.result.data.address_3
        // );
        // expect(body.result.data).has.property(
        //   "address_4",
        //   body.result.data.address_4
        // );
        expect(body.result.data).has.property("city", body.result.data.city);
        expect(body.result.data).has.property("state", body.result.data.state);
        expect(body.result.data).has.property("zip", body.result.data.zip);
        expect(body.result.data).has.property(
          "country",
          body.result.data.country
        );
        expect(body.result.data).has.property(
          "status",
          body.result.data.status
        );
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
          "verification_source",
          body.result.data.verification_source
        );
        expect(body.result.data).has.property(
          "is_verified",
          body.result.data.is_verified
        );
        expect(body.result.data).has.property(
          "verified_date",
          body.result.data.verified_date
        );
        expect(body.result.data).has.property(
          "verified_by",
          body.result.data.verified_by
        );
      });
    });
  });
});

describe(`${store_msg.fail}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");

  it(`Failure test case for Adress verification when adress_id does not exist`, () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/address_verification/${Cypress.env("RandomNumber")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        is_verified: 1,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it(`Failure test case for Adress verification when providing adress_id as string`, () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/address_verification/${Cypress.env("Random")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        is_verified: 1,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it(`is_verified should be Number`, () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/address_verification/${cst_address_id[0]}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        is_verified: "1",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "is_verified",
        body.error.errorDetails.is_verified
      );
    });
  });

  it(`is_verified must be one of [0 or 1]`, () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/address_verification/${cst_address_id[0]}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        is_verified: 10,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "is_verified",
        body.error.errorDetails.is_verified
      );
    });
  });

  it(`Failure test case for Adress verification by geoapi when adress_id does not exist`, () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/address_verification/verify/${Cypress.env(
        "RandomNumber"
      )}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it(`Failure test case for Adress verification by geoapi when adress does not exist`, () => {
    let requestData = {
      contact_name: Cypress.env("Random"),
      type: Cypress.env("Random"),
      address_1: Cypress.env("Random"),
      address_2: Cypress.env("Random"),
      address_3: Cypress.env("Random"),
      address_4: Cypress.env("Random"),
      city: Cypress.env("Random"),
      state: Cypress.env("Random"),
      zip: Cypress.env("Random"),
      country: Cypress.env("Random"),
      status: Cypress.env("randomBoolean"),
      factor_id: Cypress.env("factorId"),
    };
    cy.request({
      method: "POST",
      url: `${baseurl}v1/factor_address/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let address_id = body.result.data.id;
      cy.request({
        method: "PUT",
        url: `${baseurl}v1/address_verification/verify/${address_id}`,
        headers: { Authorization: Cypress.env("companyToken") },
        body: {},
        failOnStatusCode: false,
      }).then(({ body }) => {
        expect(body).has.property("statusCode", 400);
        expect(body).has.property("success", false);
        expect(body).has.property("error");
        expect(body.error).has.property("message", body.error.message);
        expect(body.error).has.property(
          "errorDetails",
          body.error.errorDetails
        );
        expect(body.error).has.property(
          "recommendation",
          body.error.recommendation
        );
        expect(body).has.property("result", body.result);
      });
    });
  });
});
