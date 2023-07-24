import store_msg from "../../support/store_msg";

before(() => {
  cy.GetCompanyToken();
  cy.Get_Email_id();
  cy.randomEmail();
  cy.Random();
  cy.Random1();
  cy.RandomNumber();
  cy.RandomDesc();
});

let reset_token: any;
let resUser_id: any;
let Email_id = [];
describe(`${store_msg.success}${Cypress.spec["fileName"]}`, () => {
  let baseurl = Cypress.env("apiUrl");

  //login and Authorization
  it("Test case for login and get Authorizaton token", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/auth/`,
      body: {
        email: Cypress.env("username"),
        password: Cypress.env("Password"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      Cypress.env("authToken", body.result.auth);
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("auth", body.result.auth);
      expect(body.result).has.property("username", body.result.username);
      expect(body.result).has.property("user_id", body.result.user_id);
    });
  });

  //forget paasword
  it("Test case for forget password", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/auth/forget-password`,
      body: {
        email: Cypress.env("Email_id"),
      },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      reset_token = body.result.data.url;
      cy.Success(body);
      expect(body.result.data).has.property("userId", body.result.data.userId);
      expect(body.result.data).has.property(
        "username",
        body.result.data.username
      );
      expect(body.result.data).has.property("email", body.result.data.email);
      expect(body.result.data).has.property("url", body.result.data.url);
    });
  });

  // Get reset password
  /*it("Test case for get reset password", () => {
        let reset_token
       =Cypress.env("reset_token
      ")
        cy.request({
          method: "GET",
          url: reset_token
        ,
         // body: resetPassword.body,
          //failOnStatusCode: false
        }).then(({ body }) => {
          //Cypress.env("AuthToken", body.result.auth);
          cy.log(JSON.stringify(body));
          //expect(status).to.be.eq(200);
          cy.Success(body)
    
          //Cypress.env("reset_token
        ",body.result.url);
        });
      });*/

  // Post reset password
  it("Test case for post reset password", () => {
    cy.request({
      method: "POST",
      url: reset_token,
      body: {
        newPassword: Cypress.env("Random1"),
        confirmPassword: Cypress.env("Random1"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("userId", body.result.data.userId);
      expect(body.result.data).has.property(
        "username",
        body.result.data.username
      );
      expect(body.result.data).has.property("email", body.result.data.email);
    });
  });

  it("Test case for change password", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/auth/change-password`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        newPassword: Cypress.env("Random"),
        confirmPassword: Cypress.env("Random"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("_id", body.result.data._id);
      expect(body.result.data).has.property(
        "email_id",
        body.result.data.email_id
      );
      expect(body.result.data).has.property(
        "first_name",
        body.result.data.first_name
      );
      expect(body.result.data).has.property(
        "last_name",
        body.result.data.last_name
      );
    });
  });

  it("Restore the password for login", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/auth/change-password`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
        newPassword: Cypress.env("Password"),
        confirmPassword: Cypress.env("Password"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("_id", body.result.data._id);
      expect(body.result.data).has.property(
        "email_id",
        body.result.data.email_id
      );
      expect(body.result.data).has.property(
        "first_name",
        body.result.data.first_name
      );
      expect(body.result.data).has.property(
        "last_name",
        body.result.data.last_name
      );
    });
  });
});

describe(`${store_msg.fail}${Cypress.spec["fileName"]}`, () => {
  let baseurl = Cypress.env("apiUrl");

  it("Test case when email is invalid for login api", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/auth/`,
      body: {
        email: "useryopmail.com",
        password: "123456",
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
      url: `${baseurl}v1/auth/`,
      body: {
        email: "user@yopmail.com",
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
      url: `${baseurl}v1/auth/`,
      body: {
        email: "user@yopmail.com",
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
      url: `${baseurl}v1/auth/`,
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
      url: `${baseurl}v1/auth/`,
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
      url: `${baseurl}v1/auth/`,
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

describe(`${store_msg.fail}${"forget password"} - ${Cypress.spec["fileName"]}`, () => {
  let baseurl = Cypress.env("apiUrl");

  it("Test case when email is invalid", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/auth/forget-password`,
      body: {
        email: "bdsyopmail.com",
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
      url: `${baseurl}v1/auth/forget-password`,
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
      url: `${baseurl}v1/auth/forget-password`,
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
      url: `${baseurl}v1/auth/forget-password`,
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

/*describe(`${store_msg.fail}${"get reset password"} - ${Cypress.spec["fileName"]}`, () => {
    let baseurl = Cypress.env("apiUrl");
    
    //login and Authorization
    it("Test case when token is invalid", () => {
     cy.request({
       method: "GET",
       url: `${baseurl}v1/auth/reset-password/${failureResetPassword.invalidToken}?email=${failureResetPassword.email}`,
      // body: failureResetPassword.invalidBody,
       failOnStatusCode: false
     }).then(({body}) => {
       //Cypress.env("AuthToken", body.result.auth);
       //expect(status).to.be.eq(200);
       cy.log(JSON.stringify(body));
       cy.Failure(body) 
        
     });
   });
  
   it("Test case when token is wrong", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/auth/reset-password/${failureResetPassword.wrongToken}?email=${failureResetPassword.email}`,
      body: failureResetPassword.emptyBody,
      failOnStatusCode: false
    }).then(({body}) => {
      Cypress.env("AuthToken", body.result.auth);
      //expect(status).to.be.eq(200);
      cy.log(JSON.stringify(body));
      cy.Failure(body)
       
    });
  });
  
  it("Test case When email is wrong", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/auth/reset-password/${failureResetPassword.token}?email=${failureResetPassword.wrongEmail}`,
      body:failureResetPassword.requiredBody,
      failOnStatusCode: false
    }).then(({body}) => {
      Cypress.env("AuthToken", body.result.auth);
      //expect(status).to.be.eq(200);
      cy.log(JSON.stringify(body));
      cy.Failure(body)
       
    });
  });
  
  
  it("Test case When email is invalid", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/auth/reset-password/${failureResetPassword.token}?email=${failureResetPassword.invalidEmail}`,
      body: failureResetPassword.notExistBody,
      failOnStatusCode: false
    }).then(({body}) => {
      Cypress.env("AuthToken", body.result.auth);
      //expect(status).to.be.eq(200);
      cy.log(JSON.stringify(body));
      cy.Failure(body) 
       
    });
  });
  })*/

describe(`${store_msg.fail}${"post reset password"} - ${Cypress.spec["fileName"]}`, () => {
  it("Test case when newPassword and confirmPassword is blank", () => {
    cy.request({
      method: "POST",
      url: reset_token,
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
      url: reset_token,
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
      url: reset_token,
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
      url: reset_token,
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

describe(`${store_msg.fail}${"change password"} - ${Cypress.spec["fileName"]}`, () => {
  let baseurl = Cypress.env("apiUrl");
  before(() => {
    cy.UserLogin();
  });
  it("Test case when newPassword and confirmPassword is empty", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/auth/change-password`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
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

  it("Test case When do not providing newPassword and confirmPassword", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/auth/change-password`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
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

  it("Test case When newPassword and confirmPassword does not match each other", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/auth/change-password`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
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

  it("newPassword and confirmPassword must be string", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/auth/change-password`,
      headers: {
        Authorization: "Bearer " + Cypress.env("authToken"),
      },
      body: {
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
