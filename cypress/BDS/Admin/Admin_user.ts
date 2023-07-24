import routes from "../../support/route";
import store_msg from "../../support/store_msg";

before(() => {
  cy.admin_login();
});
beforeEach(() => {
  cy.randomEmail();
  cy.randomBoolean();
  cy.Random();
  cy.RandomNumber();
  cy.RandomNum();
  cy.RandomNum_2();
});

let new_userId: String;
let new_email: String;
let assign_company_id: Number[];
let new_userId2: String;
let res

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {

  it("Test case for create new user when send_emails and is_admin are 1 ", () => {
    let reqBody = {
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
      is_admin: 1,
      status: Cypress.env("randomBoolean"),
    }
    cy.request({
      method:routes.post, body: reqBody,
      url: routes.post_users,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      }
    }).then(({ body }) => {
      new_userId = body.result.data._id;
      new_email = body.result.data.email_id;
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
      expect(res).has.property("smtp_from_email", reqBody.smtp_from_email.toLowerCase()).to.be.string;
      expect(res).has.property("smtp_from_name", reqBody.smtp_from_name).to.be.string;
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test case for create new user when send_emails and is_admin are 0 ", () => {
    let reqBody = {
      email_id: Cypress.env("testEmail"),
      password: Cypress.env("Password"),
      first_name: Cypress.env("Random"),
      is_admin: 0,
      send_emails: 0
    };
    cy.request({
      method:routes.post, body: reqBody,
      url: routes.post_users,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      }
    }).then(({ body }) => {
      new_userId2 = body.result.data._id;
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
    let reqBody = {
      "email_id": Cypress.env("testEmail"),
      "password": Cypress.env("Password"),
      "first_name": Cypress.env("Random"),
      "last_name":"",
      "send_emails": 0,
      "smtp_server": "",
      "smtp_port": "",
      "smtp_secure_connection": "",
      "smtp_username": "",
      "smtp_password": "",
      "smtp_from_email": "",
      "smtp_from_name": "",
      "status":Cypress.env("randomBoolean")
    };
    cy.request({
      method:routes.post, body: reqBody,
      url: routes.post_users,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      }
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("organization");
      expect(res).has.property("status");
      expect(res).has.property("is_admin");
      expect(res).has.property("force_password_change");
      expect(res).has.property("enable_tfa");
      expect(res).has.property("otp_verified");
      expect(res).has.property("_id");
      expect(res).has.property("email_id", reqBody.email_id.toLowerCase());
      expect(res).has.property("first_name", reqBody.first_name);
      expect(res).has.property("send_emails", reqBody.send_emails);
      expect(res).has.property("smtp_server", reqBody.smtp_server);
      expect(res).has.property("smtp_port", reqBody.smtp_port);
      expect(res).has.property("smtp_secure_connection", reqBody.smtp_secure_connection);
      expect(res).has.property("smtp_username", reqBody.smtp_username);
      expect(res).has.property("smtp_password", reqBody.smtp_password)
      expect(res).has.property("smtp_from_email", reqBody.smtp_from_email);
      expect(res).has.property("smtp_from_name", reqBody.smtp_from_name);
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

  it("Test case for create new user when optional field are left null ", () => {
    let reqBody = {
      "email_id": Cypress.env("testEmail"),
      "password": Cypress.env("Password"),
      "first_name": Cypress.env("Random"),
      "last_name":null,
      "send_emails": 0,
      "smtp_server": null,
      "smtp_port": null,
      "smtp_secure_connection": null,
      "smtp_username": null,
      "smtp_password": null,
      "smtp_from_email": null,
      "smtp_from_name": null,
      "status":Cypress.env("randomBoolean")
    };
    cy.request({
      method:routes.post, body: reqBody,
      url: routes.post_users,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      }
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("organization");
      expect(res).has.property("status");
      expect(res).has.property("is_admin");
      expect(res).has.property("force_password_change");
      expect(res).has.property("enable_tfa");
      expect(res).has.property("otp_verified");
      expect(res).has.property("_id");
      expect(res).has.property("email_id", reqBody.email_id.toLowerCase());
      expect(res).has.property("first_name", reqBody.first_name);
      expect(res).has.property("send_emails", reqBody.send_emails);
      expect(res).has.property("smtp_server", reqBody.smtp_server);
      expect(res).has.property("smtp_port", reqBody.smtp_port);
      expect(res).has.property("smtp_secure_connection", reqBody.smtp_secure_connection);
      expect(res).has.property("smtp_username", reqBody.smtp_username);
      expect(res).has.property("smtp_password", reqBody.smtp_password)
      expect(res).has.property("smtp_from_email", reqBody.smtp_from_email);
      expect(res).has.property("smtp_from_name", reqBody.smtp_from_name);
      expect(res).has.property("created_date");
      expect(res).has.property("created_by");
    });
  });

});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {

  it("Test case for update user when body is left blank ", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_users}${new_userId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {}
    }).then(({ body }) => {
      let req = body.result.data
      cy.Success(body);
      expect(req).has.property("organization");
      expect(req).has.property("status");
      expect(req).has.property("is_admin");
      expect(req).has.property("force_password_change");
      expect(req).has.property("enable_tfa");
      expect(req).has.property("otp_verified");
      expect(req).has.property("_id")
      expect(req).has.property("email_id")
      expect(req).has.property("first_name")
      expect(req).has.property("last_name")
      expect(req).has.property("send_emails");
      expect(req).has.property("smtp_server")
      expect(req).has.property("smtp_port")
      expect(req).has.property("smtp_secure_connection")
      expect(req).has.property("smtp_username")
      expect(req).has.property("smtp_password")
      expect(req).has.property("smtp_from_email")
      expect(req).has.property("smtp_from_name")
      expect(req).has.property("created_date");
      expect(req).has.property("created_by");
      expect(req).has.property("updated_by");
      expect(req).has.property("created_date");
    });
  });

  it("Test case for update user when optional field are not provided and send_emails is 1", () => {
    let reqBody = {
      email_id: new_email,
      password: Cypress.env("Password"),
      first_name: Cypress.env("Random"),
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
      url: `${routes.post_users}${new_userId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: reqBody,
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("organization");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("is_admin");
      expect(body.result.data).has.property("force_password_change");
      expect(body.result.data).has.property("enable_tfa");
      expect(body.result.data).has.property("otp_verified");
      expect(body.result.data).has.property("_id");
      expect(body.result.data).has.property(
        "email_id", reqBody.email_id);
      expect(body.result.data).has.property(
        "first_name", reqBody.first_name);
      expect(body.result.data).has.property("last_name");
      expect(body.result.data).has.property("send_emails", reqBody.send_emails);
      expect(body.result.data).has.property(
        "smtp_server", reqBody.smtp_server);
      expect(body.result.data).has.property(
        "smtp_port", reqBody.smtp_port);
      expect(body.result.data).has.property(
        "smtp_secure_connection", reqBody.smtp_secure_connection);
      expect(body.result.data).has.property(
        "smtp_username", reqBody.smtp_username);
      expect(body.result.data).has.property(
        "smtp_password", reqBody.smtp_password)
      expect(body.result.data).has.property(
        "smtp_from_email", reqBody.smtp_from_email);
      expect(body.result.data).has.property(
        "smtp_from_name", reqBody.smtp_from_name);
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property("created_date");
    });
  });

  it("Test case for update user when optional field are not provided and send_emails is 0", () => {
    let reqBody = {
      email_id: new_email,
      password: Cypress.env("Password"),
      first_name: Cypress.env("Random"),
      send_emails: 0
    }
    cy.request({
      method: routes.put,
      url: `${routes.post_users}${new_userId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: reqBody,
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("organization");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("is_admin");
      expect(body.result.data).has.property("force_password_change");
      expect(body.result.data).has.property("enable_tfa");
      expect(body.result.data).has.property("otp_verified");
      expect(body.result.data).has.property("_id");
      expect(body.result.data).has.property("email_id",reqBody.email_id);
      expect(body.result.data).has.property("first_name",reqBody.first_name);
      expect(body.result.data).has.property("last_name");
      expect(body.result.data).has.property("send_emails", reqBody.send_emails);
      expect(body.result.data).has.property("smtp_server");
      expect(body.result.data).has.property("smtp_port");
      expect(body.result.data).has.property("smtp_secure_connection");
      expect(body.result.data).has.property("smtp_username");
      expect(body.result.data).has.property("smtp_password")
      expect(body.result.data).has.property("smtp_from_email");
      expect(body.result.data).has.property("smtp_from_name");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property("created_date");
    });
  });

  it("Test case for update user when optional field are left blank", () => {
    let reqBody = {
      "last_name": "",
      "send_emails": 0,
      "smtp_server": "",
      "smtp_port": "",
      "smtp_secure_connection": "",
      "smtp_username": "",
      "smtp_password": "",
      "smtp_from_email": "",
      "smtp_from_name": "",
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_users}${new_userId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: reqBody
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("organization");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("is_admin");
      expect(body.result.data).has.property("force_password_change");
      expect(body.result.data).has.property("enable_tfa");
      expect(body.result.data).has.property("otp_verified");
      expect(body.result.data).has.property("_id");
      expect(body.result.data).has.property("email_id").to.be.string;
      expect(body.result.data).has.property("first_name").to.be.string;
      expect(body.result.data).has.property(
        "last_name", reqBody.last_name).to.be.string;
      expect(body.result.data).has.property("send_emails", reqBody.send_emails);
      expect(body.result.data).has.property(
        "smtp_server", reqBody.smtp_server).to.be.string;
      expect(body.result.data).has.property(
        "smtp_port", reqBody.smtp_port).to.be.string;
      expect(body.result.data).has.property(
        "smtp_secure_connection", reqBody.smtp_secure_connection).to.be.string;
      expect(body.result.data).has.property(
        "smtp_username", reqBody.smtp_username).to.be.string;
      expect(body.result.data).has.property(
        "smtp_password", reqBody.smtp_password).to.be.string
      expect(body.result.data).has.property(
        "smtp_from_email", reqBody.smtp_from_email).to.be.string;
      expect(body.result.data).has.property(
        "smtp_from_name", reqBody.smtp_from_name).to.be.string;
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property("created_date");
    });
  });

  it("Test case for update user when optional field are left null", () => {
    let reqBody = {
      "last_name": null,
      "send_emails": 0,
      "smtp_server": null,
      "smtp_port": null,
      "smtp_secure_connection": null,
      "smtp_username": null,
      "smtp_password": null,
      "smtp_from_email": null,
      "smtp_from_name": null
    }
    cy.request({
      method: routes.put,
      url: `${routes.post_users}${new_userId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: reqBody
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("organization");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("is_admin");
      expect(body.result.data).has.property("force_password_change");
      expect(body.result.data).has.property("enable_tfa");
      expect(body.result.data).has.property("otp_verified");
      expect(body.result.data).has.property("_id").to.be.string;
      expect(body.result.data).has.property("email_id").to.be.string;
      expect(body.result.data).has.property("first_name").to.be.string;
      expect(body.result.data).has.property(
        "last_name", reqBody.last_name).to.be.string;
      expect(body.result.data).has.property("send_emails", reqBody.send_emails);
      expect(body.result.data).has.property(
        "smtp_server", reqBody.smtp_server).to.be.string;
      expect(body.result.data).has.property(
        "smtp_port", reqBody.smtp_port).to.be.string;
      expect(body.result.data).has.property(
        "smtp_secure_connection", reqBody.smtp_secure_connection).to.be.string;
      expect(body.result.data).has.property(
        "smtp_username", reqBody.smtp_username).to.be.string;
      expect(body.result.data).has.property(
        "smtp_password", reqBody.smtp_password).to.be.string
      expect(body.result.data).has.property(
        "smtp_from_email", reqBody.smtp_from_email).to.be.string;
      expect(body.result.data).has.property(
        "smtp_from_name", reqBody.smtp_from_name).to.be.string;
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property("created_date");
    });
  });

  it("Test case for update user when send_emails is 1", () => {
    let reqBody = { "send_emails": 1 }
    cy.request({
      method: routes.put,
      url: `${routes.post_users}${new_userId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: reqBody
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("organization");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("is_admin");
      expect(body.result.data).has.property("force_password_change");
      expect(body.result.data).has.property("enable_tfa");
      expect(body.result.data).has.property("otp_verified");
      expect(body.result.data).has.property("_id")
      expect(body.result.data).has.property("email_id")
      expect(body.result.data).has.property("first_name")
      expect(body.result.data).has.property("last_name")
      expect(body.result.data).has.property("send_emails",reqBody.send_emails);
      expect(body.result.data).has.property("smtp_server")
      expect(body.result.data).has.property("smtp_port")
      expect(body.result.data).has.property("smtp_secure_connection")
      expect(body.result.data).has.property("smtp_username")
      expect(body.result.data).has.property("smtp_password")
      expect(body.result.data).has.property("smtp_from_email")
      expect(body.result.data).has.property("smtp_from_name")
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
      expect(body.result.data).has.property("created_date");
    });
  });

  it("Test case for update user with all field", () => {
    let reqBody = {
      email_id: new_email,
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
      status: 1,
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_users}${new_userId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: reqBody,
    }).then(({ body }) => {
      res =body.result.data
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
      url: `${baseurl}v1/admin/users/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [
          {
            key: "_id",
            operation: "=",
            val: new_userId,
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
      url: `${baseurl}v1/admin/users/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {},
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
        expect(ele).has.property("is_admin", ele.is_admin);
        expect(ele).has.property(
          "force_password_change",
          ele.force_password_change
        );
        expect(ele).has.property("enable_tfa", ele.enable_tfa);
        expect(ele).has.property("otp_verified", ele.otp_verified);
        expect(ele).has.property("_id", ele._id);
        expect(ele).has.property("email_id", ele.email_id);
        expect(ele).has.property("first_name", ele.first_name);
        // expect(ele).has.property("send_emails", ele.send_emails);
        // expect(ele).has.property("created_by", ele.created_by);
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
      url: `${baseurl}v1/admin/users/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
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
        // expect(ele).has.property("send_emails", ele.send_emails);
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
      url: `${baseurl}v1/admin/users/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
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
        expect(ele).has.property("is_admin", ele.is_admin);
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
      url: `${baseurl}v1/admin/users/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [
          {
            key: "_id",
            operation: "=",
            val: new_userId,
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
        expect(ele).has.property("is_admin", ele.is_admin);
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
      url: `${baseurl}v1/admin/users/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
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

describe(`${store_msg.success}${"Assign user & role and Fetch company info"}`, () => {
  let baseurl = Cypress.env("apiUrl");

  it("Test case for assign user-roles ", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/company/${Cypress.env("org_id")}/fetch`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        search: [],
        select: [],
        sort: "id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      }
    }).then(({ body }) => {
      assign_company_id = body.result.data.map((ele: any) => ele.id);
      cy.request({
        method: "POST",
        url: `${baseurl}v1/admin/users/${Cypress.env(
          "org_id"
        )}/assign-users-role/${new_userId}`,
        headers: {
          Authorization: "Bearer " + Cypress.env("authToken"),
        },
        body: [
          {
            roles: [1, 2],
            company_id: assign_company_id[0],
          },
        ]
      }).then(({ body }) => {
        cy.log(JSON.stringify(body));
        expect(body).has.property("statusCode", 200);
        expect(body).has.property("success", true);
        expect(body).has.property("error", null);
        expect(body).has.property("result");
        expect(body.result).has.property("message", body.result.message);
      });
    });
  });

  /********************* Fetch company info by orginizationId and user_id***********************/
  it("Test case for fetch company info ", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/admin/users/${Cypress.env(
        "org_id"
      )}/fetch-company-info/${new_userId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("data", body.result.data);
    });
  });
});

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {
  let baseurl = Cypress.env("apiUrl");

  it("Test case when body are left blank", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/users/`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "email_id",
        body.error.errorDetails.email_id
      );
      expect(body.error.errorDetails).has.property(
        "password",
        body.error.errorDetails.password
      );
      expect(body.error.errorDetails).has.property(
        "first_name",
        body.error.errorDetails.first_name
      );
      expect(body.error.errorDetails).has.property(
        "send_emails",
        body.error.errorDetails.send_emails
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when required field are left blank and send_emails is 1", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/users/`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email_id: "",
        password: "",
        first_name: "",
        last_name: Cypress.env("Random"),
        send_emails: 1,
        smtp_server: "",
        smtp_port: "",
        smtp_secure_connection: "",
        smtp_username: "",
        smtp_password: "",
        smtp_from_email: "",
        smtp_from_name: "",
        is_admin: 1,
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "email_id",
        body.error.errorDetails.email_id
      );
      expect(body.error.errorDetails).has.property(
        "password",
        body.error.errorDetails.password
      );
      expect(body.error.errorDetails).has.property(
        "first_name",
        body.error.errorDetails.first_name
      );
      expect(body.error.errorDetails).has.property(
        "smtp_server",
        body.error.errorDetails.smtp_server
      );
      expect(body.error.errorDetails).has.property(
        "smtp_port",
        body.error.errorDetails.smtp_port
      );
      expect(body.error.errorDetails).has.property(
        "smtp_secure_connection",
        body.error.errorDetails.smtp_secure_connection
      );
      expect(body.error.errorDetails).has.property(
        "smtp_username",
        body.error.errorDetails.smtp_username
      );
      expect(body.error.errorDetails).has.property(
        "smtp_password",
        body.error.errorDetails.smtp_password
      );
      expect(body.error.errorDetails).has.property(
        "smtp_password",
        body.error.errorDetails.smtp_password
      );
      expect(body.error.errorDetails).has.property(
        "smtp_from_email",
        body.error.errorDetails.smtp_from_email
      );
      expect(body.error.errorDetails).has.property(
        "smtp_from_name",
        body.error.errorDetails.smtp_from_name
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when required field are left blank and send_emails is 0", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/users/`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email_id: "",
        password: "",
        first_name: "",
        last_name: Cypress.env("Random"),
        send_emails: 0,
        // "smtp_server": Cypress.env("Random"),
        // "smtp_port": Cypress.env("Random"),
        // "smtp_secure_connection": Cypress.env("Random"),
        // "smtp_username": Cypress.env("Random"),
        // "smtp_password": Cypress.env("Random"),
        // "smtp_from_email": Cypress.env("testEmail"),
        // "smtp_from_name": Cypress.env("Random"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "email_id",
        body.error.errorDetails.email_id
      );
      expect(body.error.errorDetails).has.property(
        "password",
        body.error.errorDetails.password
      );
      expect(body.error.errorDetails).has.property(
        "first_name",
        body.error.errorDetails.first_name
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when email_id is invalid", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/users/`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email_id: Cypress.env("Random"),
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
        is_admin: 1,
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "email_id",
        body.error.errorDetails.email_id
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("email_id,password, first_name,last_name,smtp_server, smtp_port, smtp_secure_connection,smtp_username,smtp_password, smtp_from_email,smtp_from_name souuld be string", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/users/`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email_id: Cypress.env("RandomNumber"),
        password: Cypress.env("RandomNumber"),
        first_name: Cypress.env("RandomNumber"),
        last_name: Cypress.env("RandomNumber"),
        send_emails: 1,
        smtp_server: Cypress.env("RandomNumber"),
        smtp_port: Cypress.env("RandomNumber"),
        smtp_secure_connection: Cypress.env("RandomNumber"),
        smtp_username: Cypress.env("RandomNumber"),
        smtp_password: Cypress.env("RandomNumber"),
        smtp_from_email: Cypress.env("RandomNumber"),
        smtp_from_name: Cypress.env("RandomNumber"),
        is_admin: 1,
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "email_id",
        body.error.errorDetails.email_id
      );
      expect(body.error.errorDetails).has.property(
        "password",
        body.error.errorDetails.password
      );
      expect(body.error.errorDetails).has.property(
        "first_name",
        body.error.errorDetails.first_name
      );
      expect(body.error.errorDetails).has.property(
        "smtp_server",
        body.error.errorDetails.smtp_server
      );
      expect(body.error.errorDetails).has.property(
        "smtp_port",
        body.error.errorDetails.smtp_port
      );
      expect(body.error.errorDetails).has.property(
        "smtp_secure_connection",
        body.error.errorDetails.smtp_secure_connection
      );
      expect(body.error.errorDetails).has.property(
        "smtp_username",
        body.error.errorDetails.smtp_username
      );
      expect(body.error.errorDetails).has.property(
        "smtp_password",
        body.error.errorDetails.smtp_password
      );
      expect(body.error.errorDetails).has.property(
        "smtp_password",
        body.error.errorDetails.smtp_password
      );
      expect(body.error.errorDetails).has.property(
        "smtp_from_email",
        body.error.errorDetails.smtp_from_email
      );
      expect(body.error.errorDetails).has.property(
        "smtp_from_name",
        body.error.errorDetails.smtp_from_name
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("send_emails, is_admin and status should be Boolean", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/users/`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email_id: Cypress.env("testEmail"),
        password: Cypress.env("Password"),
        first_name: Cypress.env("Random"),
        last_name: Cypress.env("Random"),
        send_emails: Cypress.env("RandomNum"),
        smtp_server: Cypress.env("Random"),
        smtp_port: Cypress.env("Random"),
        smtp_secure_connection: Cypress.env("Random"),
        smtp_username: Cypress.env("Random"),
        smtp_password: Cypress.env("Random"),
        smtp_from_email: Cypress.env("testEmail"),
        smtp_from_name: Cypress.env("Random"),
        is_admin: Cypress.env("RandomNum"),
        status: Cypress.env("RandomNum"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "send_emails",
        body.error.errorDetails.send_emails
      );
      expect(body.error.errorDetails).has.property(
        "is_admin",
        body.error.errorDetails.is_admin
      );
      expect(body.error.errorDetails).has.property(
        "status",
        body.error.errorDetails.status
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("send_emails, is_admin and status must be one of [0 or 1]", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/users/`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email_id: Cypress.env("testEmail"),
        password: Cypress.env("Password"),
        first_name: Cypress.env("Random"),
        last_name: Cypress.env("Random"),
        send_emails: Cypress.env("RandomNumber"),
        smtp_server: Cypress.env("Random"),
        smtp_port: Cypress.env("Random"),
        smtp_secure_connection: Cypress.env("Random"),
        smtp_username: Cypress.env("Random"),
        smtp_password: Cypress.env("Random"),
        smtp_from_email: Cypress.env("testEmail"),
        smtp_from_name: Cypress.env("Random"),
        is_admin: Cypress.env("RandomNumber"),
        status: Cypress.env("RandomNumber"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      // expect(body).has.property("statusCode", 400);
      // expect(body).has.property("success", false);
      // expect(body).has.property("error");
      // expect(body.error).has.property("message", body.error.message);
      // expect(body.error.errorDetails).has.property("send_emails", body.error.errorDetails.send_emails);
      // expect(body.error.errorDetails).has.property("is_admin", body.error.errorDetails.is_admin);
      // expect(body.error.errorDetails).has.property("status", body.error.errorDetails.status);
      // expect(body).has.property("result",body.result);
    });
  });

  it(`smtp_server,smtp_port,smtp_port,smtp_secure_connection,smtp_username,smtp_password,
  smtp_from_email,smtp_from_name will be required when send_emails is 1`, () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/users/`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email_id: Cypress.env("testEmail"),
        password: Cypress.env("Password"),
        first_name: Cypress.env("Random"),
        last_name: Cypress.env("Random"),
        send_emails: 1,
        // "smtp_server": Cypress.env("Random"),
        // "smtp_port": Cypress.env("Random"),
        // "smtp_secure_connection": Cypress.env("Random"),
        // "smtp_username": Cypress.env("Random"),
        // "smtp_password": Cypress.env("Random"),
        // "smtp_from_email": Cypress.env("testEmail"),
        // "smtp_from_name": Cypress.env("Random"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "smtp_server",
        body.error.errorDetails.smtp_server
      );
      expect(body.error.errorDetails).has.property(
        "smtp_port",
        body.error.errorDetails.smtp_port
      );
      expect(body.error.errorDetails).has.property(
        "smtp_secure_connection",
        body.error.errorDetails.smtp_secure_connection
      );
      expect(body.error.errorDetails).has.property(
        "smtp_username",
        body.error.errorDetails.smtp_username
      );
      expect(body.error.errorDetails).has.property(
        "smtp_password",
        body.error.errorDetails.smtp_password
      );
      expect(body.error.errorDetails).has.property(
        "smtp_from_email",
        body.error.errorDetails.smtp_from_email
      );
      expect(body.error.errorDetails).has.property(
        "smtp_from_name",
        body.error.errorDetails.smtp_from_name
      );
      expect(body).has.property("result", body.result);
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {
  let baseurl = Cypress.env("apiUrl");

  it("Test case when user_id is invalid", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/users/${Cypress.env("Random")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email_id: new_email,
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
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when required field are left blank and send_emails is 1", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/users/${new_userId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email_id: "",
        password: "",
        first_name: "",
        last_name: Cypress.env("Random"),
        send_emails: 1,
        smtp_server: "",
        smtp_port: "",
        smtp_secure_connection: "",
        smtp_username: "",
        smtp_password: "",
        smtp_from_email: "",
        smtp_from_name: "",
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "email_id",
        body.error.errorDetails.email_id
      );
      expect(body.error.errorDetails).has.property(
        "password",
        body.error.errorDetails.password
      );
      expect(body.error.errorDetails).has.property(
        "first_name",
        body.error.errorDetails.first_name
      );
      expect(body.error.errorDetails).has.property(
        "smtp_server",
        body.error.errorDetails.smtp_server
      );
      expect(body.error.errorDetails).has.property(
        "smtp_port",
        body.error.errorDetails.smtp_port
      );
      expect(body.error.errorDetails).has.property(
        "smtp_secure_connection",
        body.error.errorDetails.smtp_secure_connection
      );
      expect(body.error.errorDetails).has.property(
        "smtp_username",
        body.error.errorDetails.smtp_username
      );
      expect(body.error.errorDetails).has.property(
        "smtp_password",
        body.error.errorDetails.smtp_password
      );
      expect(body.error.errorDetails).has.property(
        "smtp_password",
        body.error.errorDetails.smtp_password
      );
      expect(body.error.errorDetails).has.property(
        "smtp_from_email",
        body.error.errorDetails.smtp_from_email
      );
      expect(body.error.errorDetails).has.property(
        "smtp_from_name",
        body.error.errorDetails.smtp_from_name
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when required field are left blank and send_emails is 0", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/users/${new_userId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email_id: "",
        password: "",
        first_name: "",
        last_name: Cypress.env("Random"),
        send_emails: 0,
        // "smtp_server": Cypress.env("Random"),
        // "smtp_port": Cypress.env("Random"),
        // "smtp_secure_connection": Cypress.env("Random"),
        // "smtp_username": Cypress.env("Random"),
        // "smtp_password": Cypress.env("Random"),
        // "smtp_from_email": Cypress.env("testEmail"),
        // "smtp_from_name": Cypress.env("Random"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "email_id",
        body.error.errorDetails.email_id
      );
      expect(body.error.errorDetails).has.property(
        "password",
        body.error.errorDetails.password
      );
      expect(body.error.errorDetails).has.property(
        "first_name",
        body.error.errorDetails.first_name
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when email_id is invalid", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/users/${new_userId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email_id: Cypress.env("Random"),
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
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "email_id",
        body.error.errorDetails.email_id
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("email_id, password, first_name,last_name,smtp_server, smtp_port, smtp_secure_connection,smtp_username,smtp_password, smtp_from_email,smtp_from_name should be string", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/users/${new_userId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email_id: Cypress.env("RandomNumber"),
        password: Cypress.env("RandomNumber"),
        first_name: Cypress.env("RandomNumber"),
        last_name: Cypress.env("RandomNumber"),
        send_emails: 1,
        smtp_server: Cypress.env("RandomNumber"),
        smtp_port: Cypress.env("RandomNumber"),
        smtp_secure_connection: Cypress.env("RandomNumber"),
        smtp_username: Cypress.env("RandomNumber"),
        smtp_password: Cypress.env("RandomNumber"),
        smtp_from_email: Cypress.env("RandomNumber"),
        smtp_from_name: Cypress.env("RandomNumber"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      // expect(body).has.property("statusCode", 400);
      // expect(body).has.property("success", false);
      // expect(body).has.property("error");
      // expect(body.error).has.property("message", body.error.message);
      // expect(body.error.errorDetails).has.property("email_id", body.error.errorDetails.email_id);
      // expect(body.error.errorDetails).has.property("password", body.error.errorDetails.password);
      // expect(body.error.errorDetails).has.property("first_name", body.error.errorDetails.first_name);
      // expect(body.error.errorDetails).has.property("smtp_server", body.error.errorDetails.smtp_server);
      // expect(body.error.errorDetails).has.property("smtp_port", body.error.errorDetails.smtp_port);
      // expect(body.error.errorDetails).has.property("smtp_secure_connection", body.error.errorDetails.smtp_secure_connection);
      // expect(body.error.errorDetails).has.property("smtp_username", body.error.errorDetails.smtp_username);
      // expect(body.error.errorDetails).has.property("smtp_password", body.error.errorDetails.smtp_password);
      // expect(body.error.errorDetails).has.property("smtp_password", body.error.errorDetails.smtp_password);
      // expect(body.error.errorDetails).has.property("smtp_from_email", body.error.errorDetails.smtp_from_email);
      // expect(body.error.errorDetails).has.property("smtp_from_name", body.error.errorDetails.smtp_from_name);
      // expect(body).has.property("result",body.result);
    });
  });

  it("send_emails  and status should be Boolean", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/users/${new_userId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email_id: Cypress.env("testEmail"),
        password: Cypress.env("Password"),
        first_name: Cypress.env("Random"),
        last_name: Cypress.env("Random"),
        send_emails: Cypress.env("RandomNum"),
        smtp_server: Cypress.env("Random"),
        smtp_port: Cypress.env("Random"),
        smtp_secure_connection: Cypress.env("Random"),
        smtp_username: Cypress.env("Random"),
        smtp_password: Cypress.env("Random"),
        smtp_from_email: Cypress.env("testEmail"),
        smtp_from_name: Cypress.env("Random"),
        status: Cypress.env("RandomNum"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "send_emails",
        body.error.errorDetails.send_emails
      );
      expect(body.error.errorDetails).has.property(
        "status",
        body.error.errorDetails.status
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("send_emails and status must be one of [0 or 1]", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/users/${new_userId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email_id: Cypress.env("testEmail"),
        password: Cypress.env("Password"),
        first_name: Cypress.env("Random"),
        last_name: Cypress.env("Random"),
        send_emails: Cypress.env("RandomNumber"),
        smtp_server: Cypress.env("Random"),
        smtp_port: Cypress.env("Random"),
        smtp_secure_connection: Cypress.env("Random"),
        smtp_username: Cypress.env("Random"),
        smtp_password: Cypress.env("Random"),
        smtp_from_email: Cypress.env("testEmail"),
        smtp_from_name: Cypress.env("Random"),
        status: Cypress.env("RandomNumber"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "send_emails",
        body.error.errorDetails.send_emails
      );
      expect(body.error.errorDetails).has.property(
        "status",
        body.error.errorDetails.status
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when email associate with another id", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/admin/users/${new_userId2}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email_id: new_email,
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
        status: 1,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body).has.property("result", body.result);
    });
  });
});

describe(`${store_msg.fail}${"Assign-user-role"}`, () => {
  let baseurl = Cypress.env("apiUrl");

  it("Test case when org_id is invalid ", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/users/${Cypress.env(
        "Random"
      )}/assign-users-role/${new_userId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: [
        {
          roles: [1, 2],
          company_id: assign_company_id[0],
        },
      ],
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when user_id is invalid ", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/users/${Cypress.env(
        "org_id"
      )}/assign-users-role/${Cypress.env("Random")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: [
        {
          roles: [1, 2],
          company_id: assign_company_id[0],
        },
      ],
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when role_id is invalid ", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/users/${Cypress.env(
        "org_id"
      )}/assign-users-role/${new_userId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: [
        {
          roles: [Cypress.env("RandomNumber")],
          company_id: assign_company_id[0],
        },
      ],
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when company_id is invalid ", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/users/${Cypress.env(
        "org_id"
      )}/assign-users-role/${new_userId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: [
        {
          roles: [1],
          company_id: Cypress.env("RandomNumber"),
        },
      ],
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when body array is left blank ", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/users/${Cypress.env(
        "org_id"
      )}/assign-users-role/${new_userId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: [
        //   {
        //   "roles": [
        //     1,
        //     2
        //   ],
        //   "company_id": assign_company_id[0]
        // }
      ],
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "roles",
        body.error.errorDetails.roles
      );
      expect(body.error.errorDetails).has.property(
        "company_id",
        body.error.errorDetails.company_id
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when body oject is left blank ", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/users/${Cypress.env(
        "org_id"
      )}/assign-users-role/${new_userId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: [
        {
          // "roles": [
          //   1,
          //   2
          // ],
          // "company_id": assign_company_id[0]
        },
      ],
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "roles",
        body.error.errorDetails.roles
      );
      expect(body.error.errorDetails).has.property(
        "company_id",
        body.error.errorDetails.company_id
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when roles array is left blank ", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/users/${Cypress.env(
        "org_id"
      )}/assign-users-role/${new_userId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: [
        {
          roles: [
            // 1,
            // 2
          ],
          company_id: assign_company_id[0],
        },
      ],
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when company_id  is not provided", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/users/${Cypress.env(
        "org_id"
      )}/assign-users-role/${new_userId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: [
        {
          roles: [1],
          // "company_id": assign_company_id[0]
        },
      ],
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "company_id",
        body.error.errorDetails.company_id
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("roles[] and company_id sould be number", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/admin/users/${Cypress.env(
        "org_id"
      )}/assign-users-role/${new_userId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: [
        {
          roles: [Cypress.env("RandomNum")],
          company_id: Cypress.env("RandomNum"),
        },
      ],
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body).has.property("result", body.result);
    });
  });
});

describe(`${store_msg.fail}${"Fetch_company_info"}`, () => {
  let baseurl = Cypress.env("apiUrl");

  it("Test case for fetch company info when org_id is invalid ", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/admin/users/${Cypress.env(
        "Random"
      )}/fetch-company-info/${new_userId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case for fetch company info when user_id is invalid ", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/admin/users/${Cypress.env(
        "org_id"
      )}/fetch-company-info/${Cypress.env("Random")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error).has.property("errorDetails", body.error.errorDetails);
      expect(body).has.property("result", body.result);
    });
  });
});
