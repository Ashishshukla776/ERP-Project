import routes from "../../support/route";
import store_msg from "../../support/store_msg";

before(() => {
  cy.GetCompanyToken(); 
});

beforeEach(() => {
  cy.Random();
  cy.randomEmail();
  cy.randomBoolean();
  cy.Random();
  cy.RandomNumber();
  cy.RandomNum();
  cy.RandomNum_2();
});
 
  let userId: String;
  let userId2: String;
  let fetchEmail: String[];


describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {

  it(`Test case for create new user when send_emails is true`, () => {
     let reqBody ={
      email_id: Cypress.env("testEmail"),
      password: Cypress.env("Password"),
      first_name: Cypress.env("Random"),
      last_name: Cypress.env("Random"),
      send_emails: 1,
      smtp_server: Cypress.env("Random"),
      smtp_port: Cypress.env("Random"),
      smtp_secure_connection: Cypress.env("Random"),
      smtp_username: Cypress.env("Random"),
      smtp_password: Cypress.env("Random"),
      smtp_from_email: Cypress.env("testEmail"),
      smtp_from_name: Cypress.env("Random"),
      status: Cypress.env("randomBoolean"),
    };
    cy.request({
      method: routes.post,
      url: routes.post_user,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody
    }).then(({ body }) => {
      userId = body.result.data._id;
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("organization");
      expect(res).has.property("status");
      expect(res).has.property("is_admin");
      expect(res).has.property("force_password_change");
      expect(res).has.property("enable_tfa");
      expect(res).has.property("otp_verified");
      expect(res).has.property("_id").to.be.string;
      expect(res).has.property("email_id", reqBody.email_id.toLowerCase()).to.be.string;
      expect(res).has.property("first_name", reqBody.first_name).to.be.string;
      expect(res).has.property("last_name", reqBody.last_name).to.be.string;
      expect(res).has.property("send_emails", reqBody.send_emails);
      expect(res).has.property("smtp_server", reqBody.smtp_server).to.be.string;
      expect(res).has.property("smtp_port", reqBody.smtp_port).to.be.string;
      expect(res).has.property("smtp_secure_connection", reqBody.smtp_secure_connection).to.be.string;
      expect(res).has.property("smtp_username", reqBody.smtp_username).to.be.string;
      expect(res).has.property("smtp_password", reqBody.smtp_password).to.be.string
      expect(res).has.property("smtp_from_email", reqBody.smtp_from_email).to.be.string;
      expect(res).has.property("smtp_from_name", reqBody.smtp_from_name).to.be.string;
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it(`Test case for create new user when send_emails is false and optional field are not provided`, () => {
    let reqBody = {
      email_id: Cypress.env("testEmail"),
      password: Cypress.env("Password"),
      first_name: Cypress.env("Random"),
      send_emails: 0
    };
    cy.request({
      method: routes.post,
      url: routes.post_user,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody,
    }).then(({ body }) => {
      userId2 = body.result.data._id;
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("organization");
      expect(res).has.property("status");
      expect(res).has.property("is_admin");
      expect(res).has.property("force_password_change");
      expect(res).has.property("enable_tfa");
      expect(res).has.property("otp_verified");
      expect(res).has.property("_id").to.be.string;
      expect(res).has.property("email_id", reqBody.email_id.toLowerCase()).to.be.string;
      expect(res).has.property("first_name", reqBody.first_name).to.be.string;
      expect(res).has.property("send_emails", reqBody.send_emails);
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test case for create new user when optional field are left blank ", () => {
  
    let reqBody ={
      email_id: Cypress.env("testEmail"),
      password: Cypress.env("Password"),
      first_name: Cypress.env("Random"),
      last_name: "",
      send_emails: 0,
      smtp_server: "",
      smtp_port: "",
      smtp_secure_connection: "",
      smtp_username: "",
      smtp_password: "",
      smtp_from_email: "",
      smtp_from_name: "",
      status: Cypress.env("randomBoolean")
    };
    cy.request({
      method: routes.post,
      url: routes.post_user,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("organization");
      expect(res).has.property("status");
      expect(res).has.property("is_admin");
      expect(res).has.property("force_password_change");
      expect(res).has.property("enable_tfa");
      expect(res).has.property("otp_verified");
      expect(res).has.property("_id").to.be.string;
      expect(res).has.property("email_id", reqBody.email_id.toLowerCase()).to.be.string;
      expect(res).has.property("first_name", reqBody.first_name).to.be.string;
      expect(res).has.property("last_name").to.be.null;
      expect(res).has.property("send_emails", reqBody.send_emails);
      expect(res).has.property("smtp_server", reqBody.smtp_server).to.be.string;
      expect(res).has.property("smtp_port", reqBody.smtp_port).to.be.string;
      expect(res).has.property("smtp_secure_connection", reqBody.smtp_secure_connection).to.be.string;
      expect(res).has.property("smtp_username", reqBody.smtp_username).to.be.string;
      expect(res).has.property("smtp_password", reqBody.smtp_password).to.be.string
      expect(res).has.property("smtp_from_email", reqBody.smtp_from_email).to.be.string;
      expect(res).has.property("smtp_from_name", reqBody.smtp_from_name).to.be.string;
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test case for create new user when optional field are left null ", () => {
   
    let reqBody ={
      email_id: Cypress.env("testEmail"),
      password: Cypress.env("Password"),
      first_name: Cypress.env("Random"),
      last_name: null,
      send_emails: 0,
      smtp_server: null,
      smtp_port: null,
      smtp_secure_connection: null,
      smtp_username: null,
      smtp_password: null,
      smtp_from_email: null,
      smtp_from_name: null,
      status: Cypress.env("randomBoolean"),
    };
    cy.request({
      method: routes.post,
      url: routes.post_user,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("organization");
      expect(res).has.property("status");
      expect(res).has.property("is_admin");
      expect(res).has.property("force_password_change");
      expect(res).has.property("enable_tfa");
      expect(res).has.property("otp_verified");
      expect(res).has.property("_id").to.be.string;
      expect(res).has.property("email_id", reqBody.email_id.toLowerCase()).to.be.string;
      expect(res).has.property("first_name", reqBody.first_name).to.be.string;
      expect(res).has.property("last_name", reqBody.last_name).to.be.string;
      expect(res).has.property("send_emails", reqBody.send_emails);
      expect(res).has.property("smtp_server", reqBody.smtp_server).to.be.string;
      expect(res).has.property("smtp_port", reqBody.smtp_port).to.be.string;
      expect(res).has.property("smtp_secure_connection", reqBody.smtp_secure_connection).to.be.string;
      expect(res).has.property("smtp_username", reqBody.smtp_username).to.be.string;
      expect(res).has.property("smtp_password", reqBody.smtp_password).to.be.string
      expect(res).has.property("smtp_from_email", reqBody.smtp_from_email).to.be.string;
      expect(res).has.property("smtp_from_name", reqBody.smtp_from_name).to.be.string;
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {

  it("Test case for update user when body is left blank ", () => {
    cy.request({
      method: routes.put,
      url: routes.put_user,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {}
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("organization");
      expect(res).has.property("status");
      expect(res).has.property("is_admin");
      expect(res).has.property("force_password_change");
      expect(res).has.property("enable_tfa");
      expect(res).has.property("otp_verified");
      expect(res).has.property("_id")
      expect(res).has.property("email_id")
      expect(res).has.property("first_name")
      expect(res).has.property("last_name")
      expect(res).has.property("send_emails");
      expect(res).has.property("smtp_server")
      expect(res).has.property("smtp_port")
      expect(res).has.property("smtp_secure_connection")
      expect(res).has.property("smtp_username")
      expect(res).has.property("smtp_password")
      expect(res).has.property("smtp_from_email")
      expect(res).has.property("smtp_from_name")
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("created_date");
    });
  });

  it("Test case for update user when optional field are not provided", () => {
    let reqBody = {
      email_id: Cypress.env("username"),
      first_name: "Vipul",
      send_emails: 0
    };
    cy.request({
      method: routes.put,
      url: routes.put_user,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody,
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("organization");
      expect(res).has.property("status");
      expect(res).has.property("is_admin");
      expect(res).has.property("force_password_change");
      expect(res).has.property("enable_tfa");
      expect(res).has.property("otp_verified");
      expect(res).has.property("_id").to.be.string;
      expect(res).has.property("email_id", reqBody.email_id.toLowerCase()).to.be.string;
      expect(res).has.property("first_name", reqBody.first_name).to.be.string;
      expect(res).has.property("last_name").to.be.string;
      expect(res).has.property("send_emails",reqBody.send_emails);
      expect(res).has.property("smtp_server").to.be.string;
      expect(res).has.property("smtp_port").to.be.string;
      expect(res).has.property("smtp_secure_connection").to.be.string;
      expect(res).has.property("smtp_username").to.be.string;
      expect(res).has.property("smtp_password").to.be.string
      expect(res).has.property("smtp_from_email").to.be.string;
      expect(res).has.property("smtp_from_name").to.be.string;
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("created_date");
    });
  });

  it("Test case for update user when optional field are left blank", () => {
    let reqBody = {
      email_id: Cypress.env("username"),
      first_name: "Vipul",
      last_name: "",
      send_emails: 0,
      smtp_server: "",
      smtp_port: "",
      smtp_secure_connection: "",
      smtp_username: "",
      smtp_password: "",
      smtp_from_email: "",
      smtp_from_name: "",
      status: Cypress.env("randomBoolean")
    };
    cy.request({
      method: routes.put,
      url: routes.put_user,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("organization");
      expect(res).has.property("status");
      expect(res).has.property("is_admin");
      expect(res).has.property("force_password_change");
      expect(res).has.property("enable_tfa");
      expect(res).has.property("otp_verified");
      expect(res).has.property("_id").to.be.string;
      expect(res).has.property("email_id", reqBody.email_id.toLowerCase()).to.be.string;
      expect(res).has.property("first_name", reqBody.first_name).to.be.string;
      expect(res).has.property("last_name", reqBody.last_name).to.be.string;
      expect(res).has.property("send_emails", reqBody.send_emails);
      expect(res).has.property("smtp_server", reqBody.smtp_server).to.be.string;
      expect(res).has.property("smtp_port", reqBody.smtp_port).to.be.string;
      expect(res).has.property("smtp_secure_connection", reqBody.smtp_secure_connection).to.be.string;
      expect(res).has.property("smtp_username", reqBody.smtp_username).to.be.string;
      expect(res).has.property("smtp_password", reqBody.smtp_password).to.be.string
      expect(res).has.property("smtp_from_email", reqBody.smtp_from_email).to.be.string;
      expect(res).has.property("smtp_from_name", reqBody.smtp_from_name).to.be.string;
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("created_date");
    });
  });

  it("Test case for update user when optional field are left null", () => {
    let reqBody = {
      email_id: Cypress.env("username"),
      first_name: "Vipul",
      last_name: null,
      send_emails: 0,
      smtp_server: null,
      smtp_port: null,
      smtp_secure_connection: null,
      smtp_username: null,
      smtp_password: null,
      smtp_from_email: null,
      smtp_from_name: null,
      status: Cypress.env("randomBoolean"),
    };
    cy.request({
      method: routes.put,
      url: routes.put_user,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody,
      failOnStatusCode: false,
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("organization");
      expect(res).has.property("status");
      expect(res).has.property("is_admin");
      expect(res).has.property("force_password_change");
      expect(res).has.property("enable_tfa");
      expect(res).has.property("otp_verified");
      expect(res).has.property("_id").to.be.string;
      expect(res).has.property("email_id", reqBody.email_id.toLowerCase()).to.be.string;
      expect(res).has.property("first_name", reqBody.first_name).to.be.string;
      expect(res).has.property("last_name", reqBody.last_name).to.be.string;
      expect(res).has.property("send_emails", reqBody.send_emails);
      expect(res).has.property("smtp_server", reqBody.smtp_server).to.be.string;
      expect(res).has.property("smtp_port", reqBody.smtp_port).to.be.string;
      expect(res).has.property("smtp_secure_connection", reqBody.smtp_secure_connection).to.be.string;
      expect(res).has.property("smtp_username", reqBody.smtp_username).to.be.string;
      expect(res).has.property("smtp_password", reqBody.smtp_password).to.be.string
      expect(res).has.property("smtp_from_email", reqBody.smtp_from_email).to.be.string;
      expect(res).has.property("smtp_from_name", reqBody.smtp_from_name).to.be.string;
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("created_date");
    });
  });

  it("Test case for update user when required field are not provided", () => {
    let reqBody = { last_name: "Kumar" }
    cy.request({
      method: routes.put,
      url: routes.put_user,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("organization");
      expect(res).has.property("status");
      expect(res).has.property("is_admin");
      expect(res).has.property("force_password_change");
      expect(res).has.property("enable_tfa");
      expect(res).has.property("otp_verified");
      expect(res).has.property("_id")
      expect(res).has.property("email_id")
      expect(res).has.property("first_name")
      expect(res).has.property("last_name",reqBody.last_name)
      expect(res).has.property("send_emails");
      expect(res).has.property("smtp_server")
      expect(res).has.property("smtp_port")
      expect(res).has.property("smtp_secure_connection")
      expect(res).has.property("smtp_username")
      expect(res).has.property("smtp_password")
      expect(res).has.property("smtp_from_email")
      expect(res).has.property("smtp_from_name")
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("created_date");
    });
  });

  it("Test case for update user with all field", () => {
    let reqBody = {
      email_id: Cypress.env("username"),
      first_name: "Vipul",
      last_name: "Kumar",
      send_emails: 1,
      smtp_server: Cypress.env("Random"),
      smtp_port: Cypress.env("Random"),
      smtp_secure_connection: Cypress.env("Random"),
      smtp_username: Cypress.env("Random"),
      smtp_password: Cypress.env("Random"),
      smtp_from_email: Cypress.env("testEmail"),
      smtp_from_name: Cypress.env("Random"),
      status: Cypress.env("randomBoolean"),
    };
    cy.request({
      method: routes.put,
      url: routes.put_user,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("organization");
      expect(res).has.property("status");
      expect(res).has.property("is_admin");
      expect(res).has.property("force_password_change");
      expect(res).has.property("enable_tfa");
      expect(res).has.property("otp_verified");
      expect(res).has.property("_id").to.be.string;
      expect(res).has.property("email_id", reqBody.email_id).to.be.string;
      expect(res).has.property("first_name", reqBody.first_name).to.be.string;
      expect(res).has.property("last_name", reqBody.last_name).to.be.string;
      expect(res).has.property("send_emails", reqBody.send_emails);
      expect(res).has.property("smtp_server", reqBody.smtp_server).to.be.string;
      expect(res).has.property("smtp_port", reqBody.smtp_port).to.be.string;
      expect(res).has.property("smtp_secure_connection", reqBody.smtp_secure_connection).to.be.string;
      expect(res).has.property("smtp_username", reqBody.smtp_username).to.be.string;
      expect(res).has.property("smtp_password", reqBody.smtp_password).to.be.string
      expect(res).has.property("smtp_from_email", reqBody.smtp_from_email).to.be.string;
      expect(res).has.property("smtp_from_name", reqBody.smtp_from_name).to.be.string;
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
      expect(res).has.property("updated_by");
      expect(res).has.property("created_date");
    });
  });

});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {
  let baseurl = Cypress.env("apiUrl");
  it("Test case for fetch users ", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/users/fetch`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "_id",
            operation: "=",
            val: userId,
          },
        ],
        select: [
          "_id",
          "first_name",
          "last_name",
          "send_emails",
          "smtp_server",
          "smtp_port",
          "smtp_secure_connection",
          "smtp_username",
          "smtp_password",
          "smtp_from_email",
          "smtp_from_name",
          "is_admin",
          "status",
        ],
        sort: "_id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("is_admin", ele.is_admin);
        expect(ele).has.property("_id", ele._id);
        expect(ele).has.property("first_name", ele.first_name);
        expect(ele).has.property("last_name", ele.last_name);
        expect(ele).has.property("send_emails", ele.send_emails);
        expect(ele).has.property("smtp_server", ele.smtp_server);
        expect(ele).has.property("smtp_port", ele.smtp_port);
        expect(ele).has.property(
          "smtp_secure_connection",
          ele.smtp_secure_connection
        );
        expect(ele).has.property("smtp_username", ele.smtp_username);
        expect(ele).has.property("smtp_password", ele.smtp_password);
        expect(ele).has.property("smtp_from_email", ele.smtp_from_email);
        expect(ele).has.property("smtp_from_name", ele.smtp_from_name);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch users when do not provide any field", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/users/fetch`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
    }).then(({ body }) => {
      fetchEmail = body.result.data.map((ele: any) => ele.email_id);
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("organization", ele.organization);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property(
          "force_password_change",
          ele.force_password_change
        );
        expect(ele).has.property("enable_tfa", ele.enable_tfa);
        expect(ele).has.property("otp_verified", ele.otp_verified);
        expect(ele).has.property("_id", ele._id);
        expect(ele).has.property("email_id", ele.email_id);
        expect(ele).has.property("first_name", ele.first_name);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch users when search field are left blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/users/fetch`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [],
        select: [
          "_id",
          "first_name",
          "last_name",
          "send_emails",
          "smtp_server",
          "smtp_port",
          "smtp_secure_connection",
          "smtp_username",
          "smtp_password",
          "smtp_from_email",
          "smtp_from_name",
          "is_admin",
          "status",
        ],
        sort: "_id",
        orderby: "desc",
        page: 1,
        perPage: 30,
      },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("is_admin", ele.is_admin);
        expect(ele).has.property("_id", ele._id);
        expect(ele).has.property("first_name", ele.first_name);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch users when search and select field are left blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/users/fetch`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [],
        select: [],
        sort: "_id",
        orderby: "desc",
        page: 1,
        perPage: 10,
      },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("organization", ele.organization);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property(
          "force_password_change",
          ele.force_password_change
        );
        expect(ele).has.property("enable_tfa", ele.enable_tfa);
        expect(ele).has.property("otp_verified", ele.otp_verified);
        expect(ele).has.property("_id", ele._id);
        expect(ele).has.property("email_id", ele.email_id);
        expect(ele).has.property("first_name", ele.first_name);
        expect(ele).has.property("send_emails", ele.send_emails);
        expect(ele).has.property("created_by", ele.created_by);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch users when search field are left blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/users/fetch`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "_id",
            operation: "=",
            val: userId,
          },
        ],
        select: [],
        sort: "_id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("organization", ele.organization);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property(
          "force_password_change",
          ele.force_password_change
        );
        expect(ele).has.property("enable_tfa", ele.enable_tfa);
        expect(ele).has.property("otp_verified", ele.otp_verified);
        expect(ele).has.property("_id", ele._id);
        expect(ele).has.property("email_id", ele.email_id);
        expect(ele).has.property("first_name", ele.first_name);
        expect(ele).has.property("last_name", ele.last_name);
        expect(ele).has.property("send_emails", ele.send_emails);
        expect(ele).has.property("smtp_server", ele.smtp_server);
        expect(ele).has.property("smtp_port", ele.smtp_port);
        expect(ele).has.property(
          "smtp_secure_connection",
          ele.smtp_secure_connection
        );
        expect(ele).has.property("smtp_username", ele.smtp_username);
        expect(ele).has.property("smtp_password", ele.smtp_password);
        expect(ele).has.property("smtp_from_email", ele.smtp_from_email);
        expect(ele).has.property("smtp_from_name", ele.smtp_from_name);
        expect(ele).has.property("created_by", ele.created_by);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch users when wrong input is provided in search field", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/users/fetch`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "_id",
            operation: "=",
            val: Cypress.env("Random"),
          },
        ],
        select: [],
        sort: "_id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });
});

describe(`${store_msg.success}${"Assign user & role "}`, () => {
  let baseurl = Cypress.env("apiUrl");

  it("Test case for assign user-roles ", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/users/${Cypress.env(
        "org_id"
      )}/assign-users-role/${userId}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: [
        {
          roles: [1, 2],
          company_id: Cypress.env("company_id"),
        },
      ],
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
    });
  });
});

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {

  it("Test case when body are left blank", () => {
    cy.request({
      method: routes.post,
      url: routes.post_user,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("email_id");
      expect(body.error.errorDetails).has.property("password");
      expect(body.error.errorDetails).has.property("first_name");
    });
  });

  it("Test case when required field are left blank and send_emails is 1", () => {
    let reqBody = {
      email_id: "",
        password: "",
        first_name: "",
        send_emails: 1,
        smtp_server: "",
        smtp_port: "",
        smtp_secure_connection: "",
        smtp_username: "",
        smtp_password: "",
        smtp_from_email: "",
        smtp_from_name: ""
    };
    cy.request({
      method: routes.post,
      url: routes.post_user,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("email_id");
      expect(body.error.errorDetails).has.property("password");
      expect(body.error.errorDetails).has.property("first_name");
      expect(body.error.errorDetails).has.property("smtp_server");
      expect(body.error.errorDetails).has.property("smtp_port");
      expect(body.error.errorDetails).has.property("smtp_secure_connection");
      expect(body.error.errorDetails).has.property("smtp_username");
      expect(body.error.errorDetails).has.property("smtp_password");
      expect(body.error.errorDetails).has.property("smtp_password");
      expect(body.error.errorDetails).has.property("smtp_from_email");
      expect(body.error.errorDetails).has.property("smtp_from_name");
    });
  });

  it("Test case when email_id is invalid", () => {
    let reqBody = {
      email_id: Cypress.env("Random"),
      password: Cypress.env("Password"),
      first_name: Cypress.env("Random"),
      send_emails: 0
    };
    cy.request({
      method: routes.post,
      url: routes.post_user,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("email_id");
    });
  });

  it("send_emails and status should be Boolean", () => {
    let reqBody = {
      email_id: Cypress.env("testEmail"),
      password: Cypress.env("Password"),
      first_name: Cypress.env("Random"),
      send_emails: Cypress.env("RandomNum"),
      status: Cypress.env("RandomNum")
    };
    cy.request({
      method: routes.post,
      url: routes.post_user,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("send_emails");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("send_emails and status must be one of [0 or 1]", () => {
    let reqBody = {
      email_id: Cypress.env("testEmail"),
      password: Cypress.env("Password"),
      first_name: Cypress.env("Random"),
      send_emails: Cypress.env("RandomNumber"),
      status: Cypress.env("RandomNumber")
    };
    cy.request({
      method: routes.post,
      url: routes.post_user,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("send_emails");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it(`smtp_server,smtp_port,smtp_port,smtp_secure_connection,smtp_username,smtp_password,
  smtp_from_email,smtp_from_name will be required when send_emails is 1`, () => {
    let reqBody = {
      email_id: Cypress.env("testEmail"),
      password: Cypress.env("Password"),
      first_name: Cypress.env("Random"),
      send_emails: 1
    };
    cy.request({
      method: routes.post,
      url: routes.post_user,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("smtp_server");
      expect(body.error.errorDetails).has.property("smtp_port");
      expect(body.error.errorDetails).has.property("smtp_secure_connection");
      expect(body.error.errorDetails).has.property("smtp_username");
      expect(body.error.errorDetails).has.property("smtp_password");
      expect(body.error.errorDetails).has.property("smtp_from_email");
      expect(body.error.errorDetails).has.property("smtp_from_name");
    });
  });

});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {

  it("Test case when required field are left blank and send_emails is 1", () => {
    let reqBody = {
      email_id: "",
      password: "",
      first_name: "",
      send_emails: 1,
      smtp_server: "",
      smtp_port: "",
      smtp_secure_connection: "",
      smtp_username: "",
      smtp_password: "",
      smtp_from_email: "",
      smtp_from_name: ""
    };
    cy.request({
      method: routes.put,
      url: routes.put_user,
   headers: { Authorization: Cypress.env("companyToken") },
      body:reqBody,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("email_id");
      expect(body.error.errorDetails).has.property("password");
      expect(body.error.errorDetails).has.property("first_name");
      expect(body.error.errorDetails).has.property("smtp_server");
      expect(body.error.errorDetails).has.property("smtp_port");
      expect(body.error.errorDetails).has.property("smtp_secure_connection");
      expect(body.error.errorDetails).has.property("smtp_username");
      expect(body.error.errorDetails).has.property("smtp_password");
      expect(body.error.errorDetails).has.property("smtp_password");
      expect(body.error.errorDetails).has.property("smtp_from_email");
      expect(body.error.errorDetails).has.property("smtp_from_name");
    });
  });

  it("Test case when email_id is invalid", () => {
    let reqBody = { email_id: Cypress.env("Random") }
    cy.request({
      method: routes.put,
      url: routes.put_user,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("email_id");
    });
  });

  it("send_emails  and status should be Boolean", () => {
    let reqBody =  {
      send_emails: Cypress.env("RandomNum"),
      status: Cypress.env("RandomNum")
    };
    cy.request({
      method: routes.put,
      url: routes.put_user,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("send_emails");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("send_emails and status must be one of [0 or 1]", () => {
    let reqBody = {
      send_emails: Cypress.env("RandomNum_2"),
      status: Cypress.env("RandomNum_2"),
    };
    cy.request({
      method: routes.put,
      url: routes.put_user,
   headers: { Authorization: Cypress.env("companyToken") },
      body: reqBody,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("send_emails");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("Test case when email associate with another id", () => {
    cy.request({
      method: routes.put,
      url: routes.put_user,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        email_id: fetchEmail[0],
      },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("email_id");
    });
  });

});

describe(`${store_msg.fail_put}${"Fetch company-list"}`, () => {

  it("Test case for Fetch company-list", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_user}${"companylist"}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
    }).then(({ body }) => {
      cy.Success(body)
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("org_mongo_id", ele.org_mongo_id);
        expect(ele).has.property("company_mysql_id", ele.company_mysql_id);
        expect(ele).has.property("company_name", ele.company_name);
      });
    });
  });
  
});
