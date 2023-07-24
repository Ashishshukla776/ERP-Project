
import routes from "../../support/route";
import store_msg from "../../support/store_msg";
let queue_id: Number;
let fail_queue_id: any;
let check_type = "{type} must be one of [Completed, Failed]"

before(() => {
    cy.GetCompanyToken();
});

describe(`${store_msg.success}${Cypress.spec["fileName"]}`, () => {

    it("Get all queue list and get queue_status when type is completed ", () => {
        cy.api({
            method: routes.post,
            url: `${routes.post_queue}${"fetch/list"}`,
            body: { type: "Completed" },
            headers: { Authorization: Cypress.env("companyToken") },
        }).then(({ body }) => {
            let res = body.result.data
            queue_id = res.map((ele: any) => ele.id);
            cy.log(JSON.stringify(body))
            cy.Success(body)
            body.result.data.forEach((ele: any, index) => {
                expect(ele).has.property("id");
                expect(ele).has.property("entity_id");
                expect(ele).has.property("company_id");
                expect(ele).has.property("queue_name");
                expect(ele).has.property("response");
                expect(ele).has.property("action");
                expect(ele).has.property("attempt");
                expect(ele).has.property("in_queue");
                expect(ele).has.property("status");
                expect(ele).has.property("created_by");
                expect(ele).has.property("created_date");
            })
            cy.api({
                method: routes.post,
                url: `${routes.post_queue}${queue_id[0]}`,
                body: { type: "Completed" },
                headers: { Authorization: Cypress.env("companyToken") },
            }).then(({ body }) => {
                cy.log(JSON.stringify(body))
                let res = body.result.data
                cy.Success(body)
                expect(res).has.property("id");
                expect(res).has.property("entity_id");
                expect(res).has.property("company_id");
                expect(res).has.property("queue_name");
                expect(res).has.property("response");
                expect(res).has.property("action");
                expect(res).has.property("attempt");
                expect(res).has.property("in_queue");
                expect(res).has.property("status");
                expect(res).has.property("created_by");
                expect(res).has.property("created_date");
            });
        })
    })

    it("Get all queue list and get queue_status when type is Failed ", () => {
        cy.api({
            method: routes.post,
            url: `${routes.post_queue}${"fetch/list"}`,
            body: { type: "Failed" },
            headers: { Authorization: Cypress.env("companyToken") },
        }).then(({ body }) => {
            let res = body.result.data
            fail_queue_id = res.map((ele: any) => ele.id);
            cy.log(JSON.stringify(body))
            cy.Success(body)
            body.result.data.forEach((ele: any, index) => {
                expect(ele).has.property("id");
                expect(ele).has.property("entity_id");
                expect(ele).has.property("company_id");
                expect(ele).has.property("queue_name");
                expect(ele).has.property("response");
                expect(ele).has.property("action");
                expect(ele).has.property("attempt");
                expect(ele).has.property("in_queue");
                expect(ele).has.property("status");
                expect(ele).has.property("created_by");
                expect(ele).has.property("created_date");
            })
            if (fail_queue_id.length > 0) {
                cy.api({
                    method: routes.post,
                    url: `${routes.post_queue}${fail_queue_id[0]}`,
                    body: { type: "Failed" },
                    headers: { Authorization: Cypress.env("companyToken") },
                }).then(({ body }) => {
                    cy.log(JSON.stringify(body))
                    let res = body.result.data
                    cy.Success(body)
                    expect(res).has.property("id");
                    expect(res).has.property("entity_id");
                    expect(res).has.property("company_id");
                    expect(res).has.property("queue_name");
                    expect(res).has.property("response");
                    expect(res).has.property("action");
                    expect(res).has.property("attempt");
                    expect(res).has.property("in_queue");
                    expect(res).has.property("status");
                    expect(res).has.property("created_by");
                    expect(res).has.property("created_date");
                });
            } else {
                cy.log(JSON.stringify(body))
                cy.Success(body)
            }

        })
    })

    it("Test case for look-up API of queue_status", () => {
        let name = "queue_status";
        let obj = {
            "statusCode": 200,
            "success": true,
            "error": null,
            "result": {
                "message": "Module fields fetched successfully",
                "data": {
                    "fields": [
                        "id",
                        "entity_id",
                        "company_id",
                        "org_id",
                        "org_name",
                        "queue_name",
                        "response",
                        "action",
                        "attempt",
                        "in_queue",
                        "status",
                        "created_by",
                        "created_date"
                    ],
                    "foreignKey": {
                        "company_id": {
                            "object": "company",
                            "fields": [
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
                                "state_id"
                            ]
                        }
                    },
                    "child": {
                        "queue_data": {
                            "fields": [
                                "id",
                                "queue_id",
                                "csku_id",
                                "qty",
                                "old_value",
                                "new_value",
                                "created_date"
                            ],
                            "foreignKey": {}
                        }
                    }
                }
            }
        };
        cy.api({
          method: routes.get,
          url: `${routes.look_up}${name}`,
          headers: { Authorization: Cypress.env("companyToken") },
        }).then(({ body }) => {
          expect(JSON.stringify(body)).to.deep.equal(JSON.stringify(obj));
        });
    });
});

describe(`${store_msg.fail}${"get status of "}${Cypress.spec["fileName"]} `, () => {

    it("Failure test case when queue_id is invalid", () => {
        cy.api({
            method: routes.post,
            url: `${routes.post_queue}${Cypress.env("RandomNumber")}`,
            body: { type: "Completed" },
            headers: { Authorization: Cypress.env("companyToken") },
            failOnStatusCode: false
        }).then(({ body }) => {
            let err = body.error.errorDetails
            cy.Failure(body)
            expect(err).has.property("queue_id", "{queue_id} is invalid")
        });
    })

    it("Failure test case when queue_id is provided as string", () => {
        cy.api({
            method: routes.post,
            url: `${routes.post_queue}${Cypress.env("Random")}`,
            body: { type: "Completed" },
            headers: { Authorization: Cypress.env("companyToken") },
            failOnStatusCode: false
        }).then(({ body }) => {
            let err = body.error.errorDetails
            cy.Failure(body)
            expect(err).has.property("queue_id", "{queue_id} must be a number")
        });
    })

    it("type must be one of [Completed or Failed]", () => {
        cy.api({
            method: routes.post,
            url: `${routes.post_queue}${queue_id[0]}`,
            body: { type: Cypress.env("Random") },
            headers: { Authorization: Cypress.env("companyToken") },
            failOnStatusCode: false
        }).then(({ body }) => {
            let err = body.error.errorDetails
            cy.Failure(body)
            expect(err).has.property("type", check_type)
        });
    })

    it("type should be string", () => {
        cy.api({
            method: routes.post,
            url: `${routes.post_queue}${queue_id[0]}`,
            body: { type: Cypress.env("RandomNumber") },
            headers: { Authorization: Cypress.env("companyToken") },
            failOnStatusCode: false
        }).then(({ body }) => {
            let err = body.error.errorDetails
            cy.Failure(body)
            expect(err).has.property("type", "{type} must be a string")
        });

    })

    it("Test case when required field not provided", () => {
        cy.api({
            method: routes.post,
            url: `${routes.post_queue}${queue_id[0]}`,
            body: {},
            headers: { Authorization: Cypress.env("companyToken") },
            failOnStatusCode: false
        }).then(({ body }) => {
            let err = body.error.errorDetails
            cy.Failure(body)
            expect(err).has.property("type", "{type} is required")
        });

    })

    it("Test case when required field left blank", () => {
        cy.api({
            method: routes.post,
            url: `${routes.post_queue}${queue_id[0]}`,
            body: { type: "" },
            headers: { Authorization: Cypress.env("companyToken") },
            failOnStatusCode: false
        }).then(({ body }) => {
            let err = body.error.errorDetails
            cy.Failure(body)
            expect(err).has.property("type", check_type)
        });

    })
});

describe(`${store_msg.fail}${"get list of "}${Cypress.spec["fileName"]} `, () => {

    it("type must be one of [Completed or Failed]", () => {
        cy.api({
            method: routes.post,
            url: `${routes.post_queue}${"fetch/list"}`,
            body: { type: Cypress.env("Random") },
            headers: { Authorization: Cypress.env("companyToken") },
            failOnStatusCode: false
        }).then(({ body }) => {
            let err = body.error.errorDetails
            cy.Failure(body)
            expect(err).has.property("type", check_type)
        });
    })

    it("type should be string", () => {
        cy.api({
            method: routes.post,
            url: `${routes.post_queue}${"fetch/list"}`,
            body: { type: Cypress.env("RandomNumber") },
            headers: { Authorization: Cypress.env("companyToken") },
            failOnStatusCode: false
        }).then(({ body }) => {
            let err = body.error.errorDetails
            cy.Failure(body)
            expect(err).has.property("type", "{type} must be a string")
        });
    })

    it("Test case when required field not provided", () => {
        cy.api({
            method: routes.post,
            url: `${routes.post_queue}${"fetch/list"}`,
            body: {},
            headers: { Authorization: Cypress.env("companyToken") },
            failOnStatusCode: false
        }).then(({ body }) => {
            let err = body.error.errorDetails
            cy.Failure(body)
            expect(err).has.property("type", "{type} is required")
        });
    })

    it("Test case when required field left blank", () => {
        cy.api({
            method: routes.post,
            url: `${routes.post_queue}${"fetch/list"}`,
            body: { type: "" },
            headers: { Authorization: Cypress.env("companyToken") },
            failOnStatusCode: false
        }).then(({ body }) => {
            let err = body.error.errorDetails
            cy.Failure(body)
            expect(err).has.property("type", check_type)
        });
    })
});

describe(`${store_msg.fail}${"Re-"}${Cypress.spec["fileName"]} `, () => {

    it("Failure test case when queue_id is invalid", () => {
        cy.api({
            method: routes.post,
            url: `${routes.post_queue}${"re_queue/"}${Cypress.env("RandomNumber")}`,
            headers: { Authorization: Cypress.env("companyToken") },
            failOnStatusCode: false
        }).then(({ body }) => {
            let err = body.error.errorDetails
            cy.Failure(body)
            expect(err).has.property("queue_id", `No failed record found for this {queue_id}`)
        });
    })

    it("Failure test case when queue_id is provided as string", () => {
        cy.api({
            method: routes.post,
            url: `${routes.post_queue}${"re_queue/"}${Cypress.env("Random")}`,
            headers: { Authorization: Cypress.env("companyToken") },
            failOnStatusCode: false
        }).then(({ body }) => {
            let err = body.error.errorDetails
            cy.Failure(body)
            expect(err).has.property("queue_id", "{queue_id} must be a number")
        });
    })

    it("Failure test case when No failed record found for this queue_id", () => {
        cy.api({
            method: routes.post,
            url: `${routes.post_queue}${"re_queue/"}${queue_id[0]}`,
            headers: { Authorization: Cypress.env("companyToken") },
            failOnStatusCode: false
        }).then(({ body }) => {
            let err = body.error.errorDetails
            cy.Failure(body)
            expect(err).has.property("queue_id", "No failed record found for this {queue_id}")
        });
    })
});