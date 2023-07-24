import store_msg from "../../support/store_msg";

let resetToken: any;

describe(`${store_msg.success}${Cypress.spec["fileName"]}`, () => {
  let baseUrl = Cypress.env("apiUrl");
  before(() => {
    cy.admin_login();
    cy.randomEmail();
    cy.Random();
    cy.Random1();
    cy.RandomNumber();
  });
  //login and Authorization
  it("Test case for login and get Authorizaton token", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/`,
      body: {
        email: Cypress.env("admin_username"),
        password: Cypress.env("admin_Password"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("auth", body.result.auth);
      expect(body.result).has.property("username", body.result.username);
      expect(body.result).has.property("enable_tfa", body.result.enable_tfa);
      expect(body.result).has.property("user_id", body.result.user_id);
    });
  });

  //forget paasword
  it("Test case for forget password", () => {
    cy.request({
      method: "POST",
      url: baseUrl + "v1/admin/auth/forget-password",
      body: {
        email: Cypress.env("admin_username"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
      resetToken = body.result.data.url;
    });
  });

  // reset password
  it("Test case for reset password", () => {
    cy.request({
      method: "POST",
      url: resetToken,
      body: {
        newPassword: Cypress.env("Random1"),
        confirmPassword: Cypress.env("Random1"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });

  it("Restore password for login from reset password APi", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/forget-password`,
      body: {
        email: Cypress.env("admin_username"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let Token = body.result.data.url;
      cy.request({
        method: "POST",
        url: Token,
        body: {
          newPassword: Cypress.env("admin_Password"),
          confirmPassword: Cypress.env("admin_Password"),
        },
        failOnStatusCode: false,
      }).then(({ body }) => {
        cy.log(JSON.stringify(body));
        cy.Success(body);
      });
    });
  });
});

describe(`${store_msg.success}${"tfa setup and change password"} - ${Cypress.spec["fileName"]}`, () => {
  let baseUrl = Cypress.env("apiUrl");
  before(() => {
    cy.admin_login();
    cy.Random();
  });

  /********************** tfa setup *****************/
  it("Test case for tfa setup", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/tfa/setup`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email: Cypress.env("admin_username"),
        password: Cypress.env("admin_Password"),
      },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property(
        "tempSecret",
        body.result.data.tempSecret
      );
      expect(body.result.data).has.property(
        "dataURL",
        body.result.data.dataURL
      );
      expect(body.result.data).has.property("tfaURL", body.result.data.tfaURL);
    });
  });

  it("Test case for change password", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/change-password`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email: Cypress.env("admin_username"),
        newPassword: Cypress.env("Random"),
        confirmPassword: Cypress.env("Random"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });
  /**********************change password *****************/
  it("Restore the password for login from change-password API", () => {
    cy.request({
      method: "POST",
      url: baseUrl + "v1/admin/auth/change-password",
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email: Cypress.env("admin_username"),
        newPassword: Cypress.env("admin_Password"),
        confirmPassword: Cypress.env("admin_Password"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });
});

describe(`${store_msg.fail}${Cypress.spec["fileName"]}`, () => {
  let baseUrl = Cypress.env("apiUrl");
  it("Test case when email is invalid", () => {
    cy.request({
      method: "POST",
      url: baseUrl + "v1/admin/auth/",
      body: {
        email: Cypress.env("Random"),
        password: Cypress.env("Password"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "email",
        body.error.errorDetails.email
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Password must be alphanumeric", () => {
    cy.request({
      method: "POST",
      url: baseUrl + "v1/admin/auth/",
      body: {
        email: Cypress.env("username"),
        password: Cypress.env("RandomNumber"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "password",
        body.error.errorDetails.password
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when password is invalid", () => {
    cy.request({
      method: "POST",
      url: baseUrl + "v1/admin/auth/",
      body: {
        email: Cypress.env("username"),
        password: Cypress.env("Random"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it("Test case when not providing email and password", () => {
    cy.request({
      method: "POST",
      url: baseUrl + "v1/admin/auth/",
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      Cypress.env("AuthToken", body.result.auth);
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "email",
        body.error.errorDetails.email
      );
      expect(body.error.errorDetails).has.property(
        "password",
        body.error.errorDetails.password
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case When email and password field are blank", () => {
    cy.request({
      method: "POST",
      url: baseUrl + "v1/admin/auth/",
      body: {
        email: "",
        password: "",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      Cypress.env("AuthToken", body.result.auth);
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "email",
        body.error.errorDetails.email
      );
      expect(body.error.errorDetails).has.property(
        "password",
        body.error.errorDetails.password
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case When email and password does not exist", () => {
    cy.request({
      method: "POST",
      url: baseUrl + "v1/admin/auth/",
      body: {
        email: Cypress.env("testEmail"),
        password: Cypress.env("Random"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      Cypress.env("AuthToken", body.result.auth);
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body).has.property("result", body.result);
    });
  });
});

describe(`${store_msg.fail}${"forgot password"} - ${Cypress.spec["fileName"]}`, () => {
  let baseUrl = Cypress.env("apiUrl");
  it("Test case when email is invalid", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/forget-password`,
      body: {
        email: Cypress.env("Random"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "email",
        body.error.errorDetails.email
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case when email is empty", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/forget-password`,
      body: {
        email: "",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      Cypress.env("AuthToken", body.result.auth);
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "email",
        body.error.errorDetails.email
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case When do not provide required email field", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/forget-password`,
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      Cypress.env("AuthToken", body.result.auth);
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "email",
        body.error.errorDetails.email
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case When email does not exist", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/forget-password`,
      body: {
        email: Cypress.env("testEmail"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      Cypress.env("AuthToken", body.result.auth);
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body).has.property("result", body.result);
    });
  });
});

describe(`${store_msg.fail}${"reset password"} - ${Cypress.spec["fileName"]}`, () => {
  it("Test case when newPassword and confirmPassword is blank", () => {
    cy.request({
      method: "POST",
      url: resetToken,
      body: {
        newPassword: "",
        confirmPassword: "",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "newPassword",
        body.error.errorDetails.newPassword
      );
      expect(body.error.errorDetails).has.property(
        "confirmPassword",
        body.error.errorDetails.confirmPassword
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case When do not provide required  field", () => {
    cy.request({
      method: "POST",
      url: resetToken,
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "newPassword",
        body.error.errorDetails.newPassword
      );
      expect(body.error.errorDetails).has.property(
        "confirmPassword",
        body.error.errorDetails.confirmPassword
      );
      expect(body).has.property("result", body.result);
    });
  });

  it("Test case When newPassword and confirmPassword does not match from each other", () => {
    cy.request({
      method: "POST",
      url: resetToken,
      body: {
        newPassword: Cypress.env("Random"),
        confirmPassword: Cypress.env("Random1"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body).has.property("result", body.result);
    });
  });

  it("newPassword and confirmPassword must be string ", () => {
    cy.request({
      method: "POST",
      url: resetToken,
      body: {
        newPassword: Cypress.env("RandomNumber"),
        confirmPassword: Cypress.env("RandomNumber"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      Cypress.env("AuthToken", body.result.auth);
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "newPassword",
        body.error.errorDetails.newPassword
      );
      expect(body.error.errorDetails).has.property(
        "confirmPassword",
        body.error.errorDetails.confirmPassword
      );
      expect(body).has.property("result", body.result);
    });
  });
});

describe(`${store_msg.fail}${"TFA setup"} - ${Cypress.spec["fileName"]}`, () => {
  let baseUrl = Cypress.env("apiUrl");

  before(() => {
    cy.admin_login();
  });

  it("Test case when email is invalid", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/tfa/setup`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email: Cypress.env("Random"),
        password: Cypress.env("admin_Password"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("Test case when email and password are empty", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/tfa/setup`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email: "",
        password: "",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      Cypress.env("AuthToken", body.result.auth);
      //expect(status).to.be.eq(200);
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("Test case When do not provide required  field", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/tfa/setup`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      Cypress.env("AuthToken", body.result.auth);
      //expect(status).to.be.eq(200);
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("Test case When email does not exist", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/tfa/setup`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email: Cypress.env("testEmail"),
        password: Cypress.env("admin_Password"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("Test case when passworg is wrong", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/tfa/setup`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email: Cypress.env("admin_username"),
        password: Cypress.env("Random"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("Test case when email and passworg should be string", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/tfa/setup`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email: Cypress.env("RandomNumber"),
        password: Cypress.env("RandomNumber"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });
});

describe(`${store_msg.fail}${"TFA verify"} - ${Cypress.spec["fileName"]}`, () => {
  let baseUrl = Cypress.env("apiUrl");
  before(() => {
    cy.admin_login();
  });
  it("Test case when email is invalid ", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/tfa/verify`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email: Cypress.env("Random"),
        password: Cypress.env("admin_Password"),
        token: "936218",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("Test case when email, password and token are left empty ", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/tfa/verify`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email: "",
        password: "",
        token: "",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("Test case When do not provide required email field", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/tfa/verify`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("Test case When email does not exist", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/tfa/verify`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email: Cypress.env("testEmail"),
        password: Cypress.env("admin_Password"),
        token: "936218",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      Cypress.env("AuthToken", body.result.auth);
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("Test case when passworg and token are wrong", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/tfa/verify`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email: Cypress.env("admin_username"),
        password: Cypress.env("Random"),
        token: Cypress.env("Random"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      Cypress.env("AuthToken", body.result.auth);
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("Test case when email, password and token should be string", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/tfa/verify`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email: Cypress.env("RandomNumber"),
        "": Cypress.env("RandomNumber"),
        token: Cypress.env("RandomNumber"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      Cypress.env("AuthToken", body.result.auth);
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });
});

describe(`${store_msg.fail}${"TFA setup by email"} - ${Cypress.spec["fileName"]}`, () => {
  let baseUrl = Cypress.env("apiUrl");
  before(() => {
    cy.admin_login();
  });
  it("Test case when email is invalid for TFA setup by email api", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/tfa/setup/${Cypress.env("Random")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        password: Cypress.env("admin_Password"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("Test case When password is not provided", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/tfa/setup/${Cypress.env("Random")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("Test case When email does not exist", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/tfa/setup/${Cypress.env("testEmail")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        password: Cypress.env("admin_Password"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
    });
  });

  it("Test case When password is empty", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/tfa/setup/${Cypress.env("testEmail")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        password: "",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it("Test case When password is wrong", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/tfa/setup/${Cypress.env("testEmail")}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        password: Cypress.env("Random"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
    });
  });
});

describe(`${store_msg.fail}${"change password"} - ${Cypress.spec["fileName"]}`, () => {
  let baseUrl = Cypress.env("apiUrl");
  before(() => {
    cy.admin_login();
  });
  it("Test case when email is invalid", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/change-password`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email: Cypress.env("Random"),
        newPassword: Cypress.env("Random"),
        confirmPassword: Cypress.env("Random"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "email",
        body.error.errorDetails.email
      );
    });
  });
  it("Test case when email does not exist", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/change-password`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email: Cypress.env("testEmail"),
        newPassword: Cypress.env("Random"),
        confirmPassword: Cypress.env("Random"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });
  it("Test case when email, newPassword and confirmPassword is empty", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/change-password`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email: "",
        newPassword: "",
        confirmPassword: "",
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "newPassword",
        body.error.errorDetails.newPassword
      );
      expect(body.error.errorDetails).has.property(
        "confirmPassword",
        body.error.errorDetails.confirmPassword
      );
      expect(body).has.property("result", body.result);
    });
  });
  it("Test case When do not providing email, newPassword and confirmPassword", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/change-password`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "email",
        body.error.errorDetails.email
      );
      expect(body.error.errorDetails).has.property(
        "newPassword",
        body.error.errorDetails.newPassword
      );
      expect(body.error.errorDetails).has.property(
        "confirmPassword",
        body.error.errorDetails.confirmPassword
      );
      expect(body).has.property("result", body.result);
    });
  });
  it("Test case When newPassword and confirmPassword does not match each other", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/change-password`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email: Cypress.env("username"),
        newPassword: Cypress.env("Random"),
        confirmPassword: Cypress.env("Random1"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body).has.property("result", body.result);
    });
  });
  it("newPassword and confirmPassword must be string", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}v1/admin/auth/change-password`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        email: Cypress.env("username"),
        newPassword: Cypress.env("RandomNumber"),
        confirmPassword: Cypress.env("RandomNumber"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "newPassword",
        body.error.errorDetails.newPassword
      );
      expect(body.error.errorDetails).has.property(
        "confirmPassword",
        body.error.errorDetails.confirmPassword
      );
      expect(body).has.property("result", body.result);
    });
  });
});
