import store_msg from "../../support/store_msg";
import routes from "../../support/route";


let resItemId_I: Number;
let resItemGrid_I: Number[];
let resCode_I: String;
let resItemId_P: Number;
let resItemGrid_P: Number[];
let resCode_P: String;
let resItemId_S: Number;
let resItemGrid_S: Number[];
let resCode_S: String;
let csku_id: Number[];
let resColorId: Number[];
let cskuId: Number[];
let csku_I: Number[];
let insert_csku_id: Number[];
let resItem_color_id: Number[];
let rescolor_id: Number[];
let set_csku_id: Number[];
let colorId: Number[];

before(() => {
  cy.GetCompanyToken();
  cy.GetDivisionId();
  cy.GetseasonId();
  cy.GetgroupId();
  cy.GetcategoryId();
  cy.GetdesignId();
  cy.GetbodyId();
  cy.GetroyaltyId();
  cy.GetcolorId();
});
beforeEach(() => {
  cy.Random();
  cy.RandomDesc();
  cy.randomBoolean();
  cy.RandomNumber();
  cy.RandomNum();
});


function req_item(payload, ignoredata = [], adddata = {}) {
  let reqBody = {
    name: payload.hasOwnProperty("name") ? payload.name : Cypress.env("Random"),
    code: payload.hasOwnProperty("code") ? payload.code : Cypress.env("Random"),
    type: payload.hasOwnProperty("type") ? payload.type : "I",
    division_id: payload.hasOwnProperty("division_id") ? payload.division_id : Cypress.env("divisionId"),
    season_id: payload.hasOwnProperty("season_id") ? payload.season_id : Cypress.env("seasonId"),
    group_id: payload.hasOwnProperty("group_id") ? payload.group_id : Cypress.env("groupId"),
    category_id: payload.hasOwnProperty("category_id") ? payload.category_id : Cypress.env("categoryId"),
    design_id: payload.hasOwnProperty("design_id") ? payload.design_id : Cypress.env("designId"),
    body_id: payload.hasOwnProperty("body_id") ? payload.body_id : Cypress.env("bodyId"),
    royalty_id: payload.hasOwnProperty("royalty_id") ? payload.royalty_id : Cypress.env("royaltyId"),
    description: payload.hasOwnProperty("description") ? payload.description : Cypress.env("RandomDesc"),
    status: payload.hasOwnProperty("status") ? payload.status : 1,
    item_grid: payload.hasOwnProperty("item_grid") ? payload.item_grid : [
      {
        row_num: payload.hasOwnProperty("row_num") ? payload.row_num : 1,
        row_name: payload.hasOwnProperty("row_name") ? payload.row_name : "A",
        col_num: payload.hasOwnProperty("col_num") ? payload.col_num : 1,
        col_name: payload.hasOwnProperty("col_name") ? payload.col_name : "A",
        nrf_code: payload.hasOwnProperty("nrf_code") ? payload.nrf_code : Cypress.env("Random"),
        status: payload.hasOwnProperty("status") ? payload.status : 1
      },
      {
        row_num: payload.hasOwnProperty("row_num") ? payload.row_num : 1,
        row_name: payload.hasOwnProperty("row_name") ? payload.row_name : "A",
        col_num: payload.hasOwnProperty("col_num") ? payload.col_num : 2,
        col_name: payload.hasOwnProperty("col_name") ? payload.col_name : "B",
        nrf_code: payload.hasOwnProperty("nrf_code") ? payload.nrf_code : Cypress.env("Random"),
        status: payload.hasOwnProperty("status") ? payload.status : 1
      }
    ],
    parent: payload.hasOwnProperty("parent") ? payload.parent : {
      id: payload.hasOwnProperty("id") ? payload.id : resItemId_I,
    },

    color_list: payload.hasOwnProperty("color_list") ? payload.color_list : [
      {
        id: payload.hasOwnProperty("id") ? payload.id : Cypress.env("colorId_again"),
      },
      {
        id: payload.hasOwnProperty("id") ? payload.id : Cypress.env("colorId"),
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
}

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {

  it("Test cases for create API when type is I", () => {
    let requestData = req_item({}, ["parent"])
    cy.request({
      method: routes.post,
      url: routes.post_item,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data;
      resItemId_I = res.id;
      resItemGrid_I = res.item_grid.map((elem) => elem.id);
      resCode_I = res.code;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("name", requestData.name).be.string;
      expect(res).has.property("code", requestData.code).be.string;
      expect(res).has.property("division_id", requestData.division_id);
      expect(res).has.property("season_id", requestData.season_id);
      expect(res).has.property("group_id", requestData.group_id)
      expect(res).has.property("category_id", requestData.category_id)
      expect(res).has.property("design_id", requestData.design_id)
      expect(res).has.property("body_id", requestData.body_id)
      expect(res).has.property("royalty_id", requestData.royalty_id)
      expect(res).has.property("status", requestData.status)
      expect(res).has.property("description", requestData.description).be.string;
      expect(res).has.property("type", requestData.type).be.string;
      expect(res).has.property("parent");
      res.item_grid.forEach((ele: any, index: any) => {
        let resGrid = requestData.item_grid[index];
        expect(ele).has.property("id");
        expect(ele).has.property("row_num", resGrid.row_num);
        expect(ele).has.property("row_name", resGrid.row_name);
        expect(ele).has.property("col_num", resGrid.col_num);
        expect(ele).has.property("col_name", resGrid.col_name);
        expect(ele).has.property("nrf_code", resGrid.nrf_code);
        expect(ele).has.property("status", resGrid.status);
      });
      res.color_list.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
      });
    });
  });

  it("Test cases for create API when type is P and optional fields not provided", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_csku}${"fetch"}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [],
        searchOr: [],
        searchOrAnd: [],
        select: [],
        sort: "csku.id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
    }).then(({ body }) => {
      csku_id = body.result.data.map((element) => element.id);

      let requestData = req_item({
        type: "P",
        color_list: [
          {
            id: Cypress.env("colorId_again"),
            csku_group: [
              {
                child_csku_id: csku_id[0],
                ratio: 2
              }
            ]
          }
        ]
      },
        ["division_id", "season_id", "group_id", "category_id", "design_id", "body_id", "royalty_id", "status", "description"])

      cy.request({
        method: routes.post,
        url: routes.post_item,
        headers: { Authorization: Cypress.env("companyToken") },
        body: requestData,
      }).then(({ body }) => {
        let res = body.result.data;
        resItemId_P = res.id;
        resItemGrid_P = res.item_grid.map((elem) => elem.id);
        resCode_P = res.code;
        cy.Success(body);
        expect(res).has.property("status")
        expect(res).has.property("id", res.id);
        expect(res).has.property("name", requestData.name).be.string;
        expect(res).has.property("code", requestData.code).be.string;
        expect(res).has.property("division_id");
        expect(res).has.property("season_id");
        expect(res).has.property("group_id")
        expect(res).has.property("category_id")
        expect(res).has.property("design_id")
        expect(res).has.property("body_id")
        expect(res).has.property("royalty_id")
        expect(res).has.property("type", requestData.type).be.string;
        expect(res.parent).has.property("id");
        expect(res.parent).has.property("code");
        expect(res.parent).has.property("name");
        res.item_grid.forEach((ele: any, index: any) => {
          let resGrid = requestData.item_grid[index];
          expect(ele).has.property("id");
          expect(ele).has.property("row_num", resGrid.row_num);
          expect(ele).has.property("row_name", resGrid.row_name);
          expect(ele).has.property("col_num", resGrid.col_num);
          expect(ele).has.property("col_name", resGrid.col_name);
          expect(ele).has.property("nrf_code", resGrid.nrf_code);
          expect(ele).has.property("status", resGrid.status);
        });
        res.color_list.forEach((ele: any) => {
          expect(ele).has.property("id");
          expect(ele).has.property("code");
          expect(ele).has.property("name");
        });
      });
    });
  });

  it("Test cases for create API when type is S and optional fields are left blank", () => {
    let requestData = req_item({
      division_id: "",
      season_id: "",
      group_id: "",
      category_id: "",
      design_id: "",
      body_id: "",
      royalty_id: "",
      description: "",
      type: "S",
      color_list: [
        {
          id: Cypress.env("colorId"),
          csku_group: [
            {
              child_csku_id: csku_id[0],
              ratio: 2
            }
          ]
        }
      ]
    }, ["parent"]);
    cy.request({
      method: routes.post,
      url: routes.post_item,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data;
      resItemId_S = res.id;
      resItemGrid_S = res.item_grid.map((elem) => elem.id);
      resCode_S = res.code;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("name", requestData.name).be.string;
      expect(res).has.property("code", requestData.code).be.string;
      expect(res).has.property("division_id");
      expect(res).has.property("season_id");
      expect(res).has.property("group_id")
      expect(res).has.property("category_id")
      expect(res).has.property("design_id")
      expect(res).has.property("body_id")
      expect(res).has.property("royalty_id")
      expect(res).has.property("status", requestData.status)
      expect(res).has.property("description").be.string;
      expect(res).has.property("type", requestData.type).be.string;
      expect(res).has.property("parent");
      res.item_grid.forEach((ele: any, index: any) => {
        let resGrid = requestData.item_grid[index];
        expect(ele).has.property("id");
        expect(ele).has.property("row_num", resGrid.row_num);
        expect(ele).has.property("row_name", resGrid.row_name);
        expect(ele).has.property("col_num", resGrid.col_num);
        expect(ele).has.property("col_name", resGrid.col_name);
        expect(ele).has.property("nrf_code", resGrid.nrf_code);
        expect(ele).has.property("status", resGrid.status);
      });
      res.color_list.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
      });
    });
  });

  it("Test cases for create API when optional fields are left null and item_grid array is left blank", () => {
    let requestData = req_item({
      division_id: null,
      season_id: null,
      group_id: null,
      category_id: null,
      design_id: null,
      body_id: null,
      royalty_id: null,
      description: null,
      type: "S",
      item_grid: [],
      color_list: [
        {
          id: Cypress.env("colorId"),
          csku_group: [
            {
              child_csku_id: csku_id[0],
              ratio: 2
            }
          ]
        }
      ]
    }, ["parent"]);
    cy.request({
      method: routes.post,
      url: routes.post_item,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("name", requestData.name).be.string;
      expect(res).has.property("code", requestData.code).be.string;
      expect(res).has.property("division_id", requestData.division_id);
      expect(res).has.property("season_id", requestData.season_id);
      expect(res).has.property("group_id", requestData.group_id)
      expect(res).has.property("category_id", requestData.category_id)
      expect(res).has.property("design_id", requestData.design_id)
      expect(res).has.property("body_id", requestData.body_id)
      expect(res).has.property("royalty_id", requestData.royalty_id)
      expect(res).has.property("status", requestData.status)
      expect(res).has.property("description", requestData.description).be.string;
      expect(res).has.property("type", requestData.type).be.string;
      expect(res).has.property("parent");
      res.item_grid.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("row_num");
        expect(ele).has.property("row_name");
        expect(ele).has.property("col_num");
        expect(ele).has.property("col_name");
        expect(ele).has.property("status");
      });
      res.color_list.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
      });
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {
  before(() => {
    expect(resItemId_I || resItemId_P || resItemId_S).be.not.undefined;
  });

  it("Test case when type is I", () => {
    let requestData = req_item({}, ["parent", "color_list", "type"],
      {
        "item_grid": [
          { id: resItemGrid_I[0] },
          { id: resItemGrid_I[1] }
        ]
      });
    cy.request({
      method: routes.put,
      url: `${routes.post_item}${resItemId_I}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("name", requestData.name).be.string;
      expect(res).has.property("code", requestData.code).be.string;
      expect(res).has.property("description", requestData.description).be.string;
      expect(res).has.property("status", requestData.status)
      expect(res).has.property("division_id", requestData.division_id);
      expect(res).has.property("season_id", requestData.season_id);
      expect(res).has.property("group_id", requestData.group_id)
      expect(res).has.property("category_id", requestData.category_id)
      expect(res).has.property("design_id", requestData.design_id)
      expect(res).has.property("body_id", requestData.body_id)
      expect(res).has.property("royalty_id", requestData.royalty_id)
      expect(res).has.property("parent");
      res.item_grid.forEach((ele: any, index: any) => {
        let resGrid = requestData.item_grid[index];
        expect(ele).has.property("id");
        expect(ele).has.property("row_num", resGrid.row_num);
        expect(ele).has.property("row_name", resGrid.row_name);
        expect(ele).has.property("col_num", resGrid.col_num);
        expect(ele).has.property("col_name", resGrid.col_name);
        expect(ele).has.property("nrf_code", resGrid.nrf_code);
        expect(ele).has.property("status", resGrid.status);
      });
      res.color_list.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
      });
    });
  });

  it("Test case when type is P", () => {
    let requestData = req_item({}, ["parent", "color_list", "type"],
      {
        "item_grid": [
          { id: resItemGrid_P[0] },
          { id: resItemGrid_P[1] }
        ]
      })
    cy.request({
      method: routes.put,
      url: `${routes.post_item}${resItemId_P}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("name", requestData.name).be.string;
      expect(res).has.property("code", requestData.code).be.string;
      expect(res).has.property("description", requestData.description).be.string;
      expect(res).has.property("status", requestData.status)
      expect(res).has.property("division_id", requestData.division_id);
      expect(res).has.property("season_id", requestData.season_id);
      expect(res).has.property("group_id", requestData.group_id)
      expect(res).has.property("category_id", requestData.category_id)
      expect(res).has.property("design_id", requestData.design_id)
      expect(res).has.property("body_id", requestData.body_id)
      expect(res).has.property("royalty_id", requestData.royalty_id)
      expect(res.parent).has.property("id");
      expect(res.parent).has.property("code");
      expect(res.parent).has.property("name");
      res.item_grid.forEach((ele: any, index: any) => {
        let resGrid = requestData.item_grid[index];
        expect(ele).has.property("id");
        expect(ele).has.property("row_num", resGrid.row_num);
        expect(ele).has.property("row_name", resGrid.row_name);
        expect(ele).has.property("col_num", resGrid.col_num);
        expect(ele).has.property("col_name", resGrid.col_name);
        expect(ele).has.property("nrf_code", resGrid.nrf_code);
        expect(ele).has.property("status", resGrid.status);
      });
      res.color_list.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
      });
    });
  });

  it("Test case when optional fields are not provided", () => {
    let requestData = req_item({},
      ["parent", "color_list", "type", "season_id", "group_id", "category_id", "design_id", "body_id", "royalty_id", "status", "description"],
      {
        "item_grid": [
          { id: resItemGrid_I[0] },
          { id: resItemGrid_I[1] }
        ]
      })
    cy.request({
      method: routes.put,
      url: `${routes.post_item}${resItemId_I}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("name", requestData.name).be.string;
      expect(res).has.property("code", requestData.code).be.string;
      expect(res).has.property("description").be.string;
      expect(res).has.property("status")
      expect(res).has.property("division_id");
      expect(res).has.property("season_id");
      expect(res).has.property("group_id")
      expect(res).has.property("category_id")
      expect(res).has.property("design_id")
      expect(res).has.property("body_id")
      expect(res).has.property("royalty_id")
      expect(res).has.property("parent");
      res.item_grid.forEach((ele: any, index: any) => {
        let resGrid = requestData.item_grid[index];
        expect(ele).has.property("id");
        expect(ele).has.property("row_num", resGrid.row_num);
        expect(ele).has.property("row_name", resGrid.row_name);
        expect(ele).has.property("col_num", resGrid.col_num);
        expect(ele).has.property("col_name", resGrid.col_name);
        expect(ele).has.property("nrf_code", resGrid.nrf_code);
        expect(ele).has.property("status", resGrid.status);
      });
      res.color_list.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
      });
    });
  });

  it("Test case when request body is left blank", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_item}${resItemId_S}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {},
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("name").be.string;
      expect(res).has.property("code").be.string;
      expect(res).has.property("description").be.string;
      expect(res).has.property("status")
      expect(res).has.property("division_id");
      expect(res).has.property("season_id");
      expect(res).has.property("group_id")
      expect(res).has.property("category_id")
      expect(res).has.property("design_id")
      expect(res).has.property("body_id")
      expect(res).has.property("royalty_id")
      expect(res).has.property("parent");
      res.item_grid.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("row_num");
        expect(ele).has.property("row_name");
        expect(ele).has.property("col_num");
        expect(ele).has.property("col_name");
        expect(ele).has.property("nrf_code");
        expect(ele).has.property("status");
      });
      res.color_list.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
      });
    });
  });

  it("Test case when optional fiels are provided as blank", () => {
    let requestData = req_item({
      division_id: "",
      season_id: "",
      group_id: "",
      category_id: "",
      design_id: "",
      body_id: "",
      royalty_id: "",
      status: 1,
      description: ""
    }, ["parent", "color_list", "type"], {
      "item_grid": [
        { id: resItemGrid_S[0] },
        { id: resItemGrid_S[1] }
      ]
    });
    cy.request({
      method: routes.put,
      url: `${routes.post_item}${resItemId_S}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("name", requestData.name).be.string;
      expect(res).has.property("code", requestData.code).be.string;
      expect(res).has.property("description").be.string;
      expect(res).has.property("status", requestData.status)
      expect(res).has.property("division_id");
      expect(res).has.property("season_id");
      expect(res).has.property("group_id")
      expect(res).has.property("category_id")
      expect(res).has.property("design_id")
      expect(res).has.property("body_id")
      expect(res).has.property("royalty_id")
      expect(res).has.property("parent",);
      res.item_grid.forEach((ele: any, index: any) => {
        let resGrid = requestData.item_grid[index];
        expect(ele).has.property("id");
        expect(ele).has.property("row_num", resGrid.row_num);
        expect(ele).has.property("row_name", resGrid.row_name);
        expect(ele).has.property("col_num", resGrid.col_num);
        expect(ele).has.property("col_name", resGrid.col_name);
        expect(ele).has.property("nrf_code");
        expect(ele).has.property("status", resGrid.status);
      });
      res.color_list.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
      });
    });
  });

  it("Test case when optional fiels are provided as null", () => {
    let requestData = req_item({
      code: resCode_S,
      division_id: null,
      season_id: null,
      group_id: null,
      category_id: null,
      design_id: null,
      body_id: null,
      royalty_id: null,
      status: 1,
      description: null
    }, ["parent", "color_list", "type"], {
      "item_grid": [
        { id: resItemGrid_S[0] },
        { id: resItemGrid_S[1] }
      ]
    });
    cy.request({
      method: routes.put,
      url: `${routes.post_item}${resItemId_S}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("name", requestData.name).be.string;
      expect(res).has.property("code", requestData.code).be.string;
      expect(res).has.property("description", requestData.description).be.string;
      expect(res).has.property("status", requestData.status)
      expect(res).has.property("division_id", requestData.division_id);
      expect(res).has.property("season_id", requestData.season_id);
      expect(res).has.property("group_id", requestData.group_id)
      expect(res).has.property("category_id", requestData.category_id)
      expect(res).has.property("design_id", requestData.design_id)
      expect(res).has.property("body_id", requestData.body_id)
      expect(res).has.property("royalty_id", requestData.royalty_id)
      expect(res).has.property("parent",);
      res.item_grid.forEach((ele: any, index: any) => {
        let resGrid = requestData.item_grid[index];
        expect(ele).has.property("id");
        expect(ele).has.property("row_num", resGrid.row_num);
        expect(ele).has.property("row_name", resGrid.row_name);
        expect(ele).has.property("col_num", resGrid.col_num);
        expect(ele).has.property("col_name", resGrid.col_name);
        expect(ele).has.property("nrf_code", resGrid.nrf_code);
        expect(ele).has.property("status", resGrid.status);
      });
      res.color_list.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
      });
    });
  });

  it("Test case when type is S", () => {
    let requestData = req_item({
      code: resCode_S,
    }, ["parent", "color_list", "type"], {
      "item_grid": [
        { id: resItemGrid_S[0] },
        { id: resItemGrid_S[1] }
      ]
    });
    cy.request({
      method: routes.put,
      url: `${routes.post_item}${resItemId_S}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("name", requestData.name).be.string;
      expect(res).has.property("code", requestData.code).be.string;
      expect(res).has.property("description", requestData.description).be.string;
      expect(res).has.property("status", requestData.status)
      expect(res).has.property("division_id", requestData.division_id);
      expect(res).has.property("season_id", requestData.season_id);
      expect(res).has.property("group_id", requestData.group_id)
      expect(res).has.property("category_id", requestData.category_id)
      expect(res).has.property("design_id", requestData.design_id)
      expect(res).has.property("body_id", requestData.body_id)
      expect(res).has.property("royalty_id", requestData.royalty_id)
      expect(res).has.property("parent");
      res.item_grid.forEach((ele: any, index: any) => {
        let res_grid = requestData.item_grid[index];
        expect(ele).has.property("id");
        expect(ele).has.property("row_num", res_grid.row_num);
        expect(ele).has.property("row_name", res_grid.row_name);
        expect(ele).has.property("col_num", res_grid.col_num);
        expect(ele).has.property("col_name", res_grid.col_name);
        expect(ele).has.property("nrf_code", res_grid.nrf_code);
        expect(ele).has.property("status", res_grid.status);
      });
      res.color_list.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
      });
    });
  });

  it("Test cases When do not provide required field", () => {
    let requestData = req_item({},
      ["parent", "color_list", "type", "name", "code", "row_num", "row_name", "col_num", "col_name"],
      {
        "item_grid": [{ id: resItemGrid_I[0] }, { id: resItemGrid_I[1] }
        ]
      });
    cy.request({
      method: routes.put,
      url: `${routes.post_item}${resItemId_I}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id", res.id);
      expect(res).has.property("name").be.string;
      expect(res).has.property("code").be.string;
      expect(res).has.property("description", requestData.description).be.string;
      expect(res).has.property("status", requestData.status)
      expect(res).has.property("division_id", requestData.division_id);
      expect(res).has.property("season_id", requestData.season_id);
      expect(res).has.property("group_id", requestData.group_id)
      expect(res).has.property("category_id", requestData.category_id)
      expect(res).has.property("design_id", requestData.design_id)
      expect(res).has.property("body_id", requestData.body_id)
      expect(res).has.property("royalty_id", requestData.royalty_id)
      expect(res).has.property("parent",);
      res.item_grid.forEach((ele: any, index: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("row_num");
        expect(ele).has.property("row_name");
        expect(ele).has.property("col_num");
        expect(ele).has.property("col_name");
        expect(ele).has.property("nrf_code");
        expect(ele).has.property("status");
      });
      res.color_list.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("code");
        expect(ele).has.property("name");
      });
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");

  it("Test case for fetch API when type is I", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/fetch`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "item.id",
            operation: "=",
            val: resItemId_I,
          },
        ],
        searchOr: [
          {
            key: "item.id",
            operation: "=",
            val: resItemId_I,
          },
        ],
        searchOrAnd: [
          {
            key: "item.id",
            operation: "=",
            val: resItemId_I,
          },
        ],
        select: [
          "item.id",
          "item.type as type",
          "item.name as name",
          "item.code as code",
          "item.description as description",
          "item.status as status",
          "item.division_id as division_id",
          "division.name as division_name",
          "item.season_id as season_id",
          "season.name as season_name",
          "item.group_id as group_id",
          "erp_groups.name as group_name",
          "item.category_id as category_id",
          "category.name as category_name",
          "item.design_id as design_id",
          "design.name as design_name",
          "item.body_id as body_id",
          "body.name as body_name",
          "item.royalty_id as royalty_id",
          "royalty.name as royalty_name",
        ],
        sort: "item.id",
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
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("type", ele.type);
        expect(ele).has.property("name", ele.name);
        expect(ele).has.property("code", ele.code);
        expect(ele).has.property("description", ele.description);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("division_id", ele.division_id);
        expect(ele).has.property("division_name", ele.division_name);
        expect(ele).has.property("season_id", ele.season_id);
        expect(ele).has.property("season_name", ele.season_name);
        expect(ele).has.property("group_id", ele.group_id);
        expect(ele).has.property("group_name", ele.group_name);
        expect(ele).has.property("category_id", ele.category_id);
        expect(ele).has.property("category_name", ele.category_name);
        expect(ele).has.property("design_id", ele.design_id);
        expect(ele).has.property("design_name", ele.design_name);
        expect(ele).has.property("body_id", ele.body_id);
        expect(ele).has.property("body_name", ele.body_name);
        expect(ele).has.property("royalty_id", ele.royalty_id);
        expect(ele).has.property("royalty_name", ele.royalty_name);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch API when type is P", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/fetch`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "item.id",
            operation: "=",
            val: resItemId_P,
          },
        ],
        select: [
          "item.id",
          "item.type as type",
          "item.name as name",
          "item.code as code",
          "item.description as description",
          "item.status as status",
          "item.division_id as division_id",
          "division.name as division_name",
          "item.season_id as season_id",
          "season.name as season_name",
          "item.group_id as group_id",
          "erp_groups.name as group_name",
          "item.category_id as category_id",
          "category.name as category_name",
          "item.design_id as design_id",
          "design.name as design_name",
          "item.body_id as body_id",
          "body.name as body_name",
          "item.royalty_id as royalty_id",
          "royalty.name as royalty_name",
        ],
        sort: "item.id",
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
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("type", ele.type);
        expect(ele).has.property("name", ele.name);
        expect(ele).has.property("code", ele.code);
        expect(ele).has.property("description", ele.description);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("division_id", ele.division_id);
        expect(ele).has.property("division_name", ele.division_name);
        expect(ele).has.property("season_id", ele.season_id);
        expect(ele).has.property("season_name", ele.season_name);
        expect(ele).has.property("group_id", ele.group_id);
        expect(ele).has.property("group_name", ele.group_name);
        expect(ele).has.property("category_id", ele.category_id);
        expect(ele).has.property("category_name", ele.category_name);
        expect(ele).has.property("design_id", ele.design_id);
        expect(ele).has.property("design_name", ele.design_name);
        expect(ele).has.property("body_id", ele.body_id);
        expect(ele).has.property("body_name", ele.body_name);
        expect(ele).has.property("royalty_id", ele.royalty_id);
        expect(ele).has.property("royalty_name", ele.royalty_name);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch API when type is S", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/fetch`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "item.id",
            operation: "=",
            val: resItemId_S,
          },
        ],
        select: [
          "item.id",
          "item.type as type",
          "item.name as name",
          "item.code as code",
          "item.description as description",
          "item.status as status",
          "item.division_id as division_id",
          "division.name as division_name",
          "item.season_id as season_id",
          "season.name as season_name",
          "item.group_id as group_id",
          "erp_groups.name as group_name",
          "item.category_id as category_id",
          "category.name as category_name",
          "item.design_id as design_id",
          "design.name as design_name",
          "item.body_id as body_id",
          "body.name as body_name",
          "item.royalty_id as royalty_id",
          "royalty.name as royalty_name",
        ],
        sort: "item.id",
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
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("type", ele.type);
        expect(ele).has.property("name", ele.name);
        expect(ele).has.property("code", ele.code);
        expect(ele).has.property("description", ele.description);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("division_id", ele.division_id);
        expect(ele).has.property("division_name", ele.division_name);
        expect(ele).has.property("season_id", ele.season_id);
        expect(ele).has.property("season_name", ele.season_name);
        expect(ele).has.property("group_id", ele.group_id);
        expect(ele).has.property("group_name", ele.group_name);
        expect(ele).has.property("category_id", ele.category_id);
        expect(ele).has.property("category_name", ele.category_name);
        expect(ele).has.property("design_id", ele.design_id);
        expect(ele).has.property("design_name", ele.design_name);
        expect(ele).has.property("body_id", ele.body_id);
        expect(ele).has.property("body_name", ele.body_name);
        expect(ele).has.property("royalty_id", ele.royalty_id);
        expect(ele).has.property("royalty_name", ele.royalty_name);
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
      url: `${baseurl}v1/item/fetch`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {},
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("name", ele.name);
        expect(ele).has.property("company_id", ele.company_id);
        expect(ele).has.property("division_id", ele.division_id);
        expect(ele).has.property("description", ele.description);
        expect(ele).has.property("season_id", ele.season_id);
        expect(ele).has.property("group_id", ele.group_id);
        expect(ele).has.property("category_id", ele.category_id);
        expect(ele).has.property("design_id", ele.design_id);
        expect(ele).has.property("body_id", ele.body_id);
        expect(ele).has.property("royalty_id", ele.royalty_id);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
        expect(ele).has.property("code", ele.code);
        expect(ele).has.property("type", ele.type);
        expect(ele).has.property("parent_id", ele.parent_id);
        expect(ele).has.property("company_name", ele.company_name);
        expect(ele).has.property("org_id", ele.org_id);
        expect(ele).has.property("telephone", ele.telephone);
        expect(ele).has.property("email", ele.email);
        expect(ele).has.property("mongo_id", ele.mongo_id);
        expect(ele).has.property("address", ele.address);
        expect(ele).has.property("ein_cin", ele.ein_cin);
        expect(ele).has.property("state_id", ele.state_id);
        expect(ele).has.property("division_name", ele.division_name);
        expect(ele).has.property("division_code", ele.division_code);
        expect(ele).has.property("dba", ele.dba);
        expect(ele).has.property("def_factor_id", ele.def_factor_id);
        expect(ele).has.property("season_code", ele.season_code);
        expect(ele).has.property("season_name", ele.season_name);
        expect(ele).has.property("season_description", ele.season_description);
        expect(ele).has.property("erp_groups_name", ele.erp_groups_name);
        expect(ele).has.property("erp_groups_code", ele.erp_groups_code);
        expect(ele).has.property(
          "erp_groups_description",
          ele.erp_groups_description
        );
        expect(ele).has.property("category_code", ele.category_code);
        expect(ele).has.property("category_name", ele.category_name);
        expect(ele).has.property(
          "category_description",
          ele.category_description
        );
        expect(ele).has.property("category_type", ele.category_type);
        expect(ele).has.property("design_name", ele.design_name);
        expect(ele).has.property("design_code", ele.design_code);
        expect(ele).has.property("design_description", ele.design_description);
        expect(ele).has.property("body_code", ele.body_code);
        expect(ele).has.property("body_name", ele.body_name);
        expect(ele).has.property("body_description", ele.body_description);
        expect(ele).has.property("royalty_code", ele.royalty_code);
        expect(ele).has.property("royalty_name", ele.royalty_name);
        expect(ele).has.property(
          "royalty_description",
          ele.royalty_description
        );
        expect(ele).has.property("royalty_amount", ele.royalty_amount);
        expect(ele).has.property("royalty_type", ele.royalty_type);
      });
      expect(body.result).has.property("page", body.result.page);
      expect(body.result).has.property("perPage", body.result.perPage);
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test case for fetch API when not provide select field", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/fetch`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [],
        searchOr: [],
        searchOrAnd: [],
        select: [],
        sort: "item.id",
        orderby: "desc",
        page: 1,
        perPage: 10,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("name", ele.name);
        expect(ele).has.property("company_id", ele.company_id);
        expect(ele).has.property("division_id", ele.division_id);
        expect(ele).has.property("description", ele.description);
        expect(ele).has.property("season_id", ele.season_id);
        expect(ele).has.property("group_id", ele.group_id);
        expect(ele).has.property("category_id", ele.category_id);
        expect(ele).has.property("design_id", ele.design_id);
        expect(ele).has.property("body_id", ele.body_id);
        expect(ele).has.property("royalty_id", ele.royalty_id);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
        expect(ele).has.property("code", ele.code);
        expect(ele).has.property("type", ele.type);
        expect(ele).has.property("parent_id", ele.parent_id);
        expect(ele).has.property("company_name", ele.company_name);
        expect(ele).has.property("org_id", ele.org_id);
        expect(ele).has.property("telephone", ele.telephone);
        expect(ele).has.property("email", ele.email);
        expect(ele).has.property("mongo_id", ele.mongo_id);
        expect(ele).has.property("address", ele.address);
        expect(ele).has.property("ein_cin", ele.ein_cin);
        expect(ele).has.property("state_id", ele.state_id);
        expect(ele).has.property("division_name", ele.division_name);
        expect(ele).has.property("division_code", ele.division_code);
        expect(ele).has.property("dba", ele.dba);
        expect(ele).has.property("def_factor_id", ele.def_factor_id);
        expect(ele).has.property("season_code", ele.season_code);
        expect(ele).has.property("season_name", ele.season_name);
        expect(ele).has.property("season_description", ele.season_description);
        expect(ele).has.property("erp_groups_name", ele.erp_groups_name);
        expect(ele).has.property("erp_groups_code", ele.erp_groups_code);
        expect(ele).has.property(
          "erp_groups_description",
          ele.erp_groups_description
        );
        expect(ele).has.property("category_code", ele.category_code);
        expect(ele).has.property("category_name", ele.category_name);
        expect(ele).has.property(
          "category_description",
          ele.category_description
        );
        expect(ele).has.property("category_type", ele.category_type);
        expect(ele).has.property("design_name", ele.design_name);
        expect(ele).has.property("design_code", ele.design_code);
        expect(ele).has.property("design_description", ele.design_description);
        expect(ele).has.property("body_code", ele.body_code);
        expect(ele).has.property("body_name", ele.body_name);
        expect(ele).has.property("body_description", ele.body_description);
        expect(ele).has.property("royalty_code", ele.royalty_code);
        expect(ele).has.property("royalty_name", ele.royalty_name);
        expect(ele).has.property(
          "royalty_description",
          ele.royalty_description
        );
        expect(ele).has.property("royalty_amount", ele.royalty_amount);
        expect(ele).has.property("royalty_type", ele.royalty_type);
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
      url: `${baseurl}v1/item/fetch`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [],
        searchOr: [],
        searchOrAnd: [],
        select: [
          "item.id",
          "item.type as type",
          "item.name as name",
          "item.code as code",
          "item.description as description",
          "item.status as status",
          "item.division_id as division_id",
          "division.name as division_name",
          "item.season_id as season_id",
          "season.name as season_name",
          "item.group_id as group_id",
          "erp_groups.name as group_name",
          "item.category_id as category_id",
          "category.name as category_name",
          "item.design_id as design_id",
          "design.name as design_name",
          "item.body_id as body_id",
          "body.name as body_name",
          "item.royalty_id as royalty_id",
          "royalty.name as royalty_name",
        ],
        sort: "item.id",
        orderby: "desc",
        page: 1,
        perPage: 30,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Success(body);
    });
  });

  it("Test case for fetch API when not providing select field", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/fetch`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "item.id",
            operation: "=",
            val: resItemId_I,
          },
        ],

        select: [],
        sort: "item.id",
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
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("name", ele.name);
        expect(ele).has.property("company_id", ele.company_id);
        expect(ele).has.property("division_id", ele.division_id);
        expect(ele).has.property("description", ele.description);
        expect(ele).has.property("season_id", ele.season_id);
        expect(ele).has.property("group_id", ele.group_id);
        expect(ele).has.property("category_id", ele.category_id);
        expect(ele).has.property("design_id", ele.design_id);
        expect(ele).has.property("body_id", ele.body_id);
        expect(ele).has.property("royalty_id", ele.royalty_id);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
        expect(ele).has.property("code", ele.code);
        expect(ele).has.property("type", ele.type);
        expect(ele).has.property("parent_id", ele.parent_id);
        expect(ele).has.property("company_name", ele.company_name);
        expect(ele).has.property("org_id", ele.org_id);
        expect(ele).has.property("telephone", ele.telephone);
        expect(ele).has.property("email", ele.email);
        expect(ele).has.property("mongo_id", ele.mongo_id);
        expect(ele).has.property("address", ele.address);
        expect(ele).has.property("ein_cin", ele.ein_cin);
        expect(ele).has.property("state_id", ele.state_id);
        expect(ele).has.property("division_name", ele.division_name);
        expect(ele).has.property("division_code", ele.division_code);
        expect(ele).has.property("dba", ele.dba);
        expect(ele).has.property("def_factor_id", ele.def_factor_id);
        expect(ele).has.property("season_code", ele.season_code);
        expect(ele).has.property("season_name", ele.season_name);
        expect(ele).has.property("season_description", ele.season_description);
        expect(ele).has.property("erp_groups_name", ele.erp_groups_name);
        expect(ele).has.property("erp_groups_code", ele.erp_groups_code);
        expect(ele).has.property(
          "erp_groups_description",
          ele.erp_groups_description
        );
        expect(ele).has.property("category_code", ele.category_code);
        expect(ele).has.property("category_name", ele.category_name);
        expect(ele).has.property(
          "category_description",
          ele.category_description
        );
        expect(ele).has.property("category_type", ele.category_type);
        expect(ele).has.property("design_name", ele.design_name);
        expect(ele).has.property("design_code", ele.design_code);
        expect(ele).has.property("design_description", ele.design_description);
        expect(ele).has.property("body_code", ele.body_code);
        expect(ele).has.property("body_name", ele.body_name);
        expect(ele).has.property("body_description", ele.body_description);
        expect(ele).has.property("royalty_code", ele.royalty_code);
        expect(ele).has.property("royalty_name", ele.royalty_name);
        expect(ele).has.property(
          "royalty_description",
          ele.royalty_description
        );
        expect(ele).has.property("royalty_amount", ele.royalty_amount);
        expect(ele).has.property("royalty_type", ele.royalty_type);
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
      url: `${baseurl}v1/item/fetch`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "item.id",
            operation: "=",
            val: Cypress.env("RandomNumber"),
          },
        ],
        searchOr: [
          {
            key: "item.id",
            operation: "=",
            val: Cypress.env("RandomNumber"),
          },
        ],
        searchOrAnd: [
          {
            key: "item.id",
            operation: "=",
            val: Cypress.env("RandomNumber"),
          },
        ],
        select: [
          "item.code as code",
          "item.name as name",
          "item.description as description",
          "item.status as status",
          "item.division_id as division_id",
          "division.name as division_name",
          "item.season_id as season_id",
          "season.name as season_name",
          "item.group_id as group_id",
          "erp_groups.name as group_name",
          "item.category_id as category_id",
          "category.name as category_name",
          "item.design_id as design_id",
          "design.name as design_name",
          "item.body_id as body_id",
          "body.name as body_name",
          "item.royalty_id as royalty_id",
          "royalty.name as royalty_name",
        ],
        sort: "item.id",
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

describe(`${store_msg.success}${"add colors or csku and Update/Insert CSKU Group"}`, () => {
  const baseurl = Cypress.env("apiUrl");

  it("Test cases to add colors or csku by itemId", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/color/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        code: Cypress.env("Random"),
        name: Cypress.env("Random"),
      },
    }).then(({ body }) => {
      let new_color = body.result.data.id;
      cy.request({
        method: "POST",
        url: `${baseurl}v1/item/${resItemId_P}/color`,
        headers: { Authorization: Cypress.env("companyToken") },
        body: {
          color_list: [
            {
              id: new_color,
              csku_group: [
                {
                  child_csku_id: csku_id[0],
                  ratio: Cypress.env("RandomNumber"),
                },
              ],
            },
          ],
        },
      }).then(({ body }) => {
        rescolor_id = body.result.data.map((ele: any) => ele.color_id);
        expect(body).has.property("statusCode", 200);
        expect(body).has.property("success", true);
        expect(body).has.property("error", null);
        expect(body).has.property("result");
        expect(body.result).has.property("message", body.result.message);
        body.result.data.forEach((ele: any) => {
          expect(ele).has.property("status", ele.status);
          expect(ele).has.property("id", ele.id);
          expect(ele).has.property("item_id", ele.item_id);
          expect(ele).has.property("color_id", ele.color_id);
          expect(ele).has.property("created_date", ele.created_date);
          expect(ele).has.property("created_by", ele.created_by);
          expect(ele).has.property("color_name", ele.color_name);
          expect(ele).has.property("color_code", ele.color_code);
        });
      });
    });
  });

  it("Test case to Update/Insert CSKU Group for Item id and csku_id", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/item/${resItemId_I}/color/${Cypress.env("colorId")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      let cskuId = [];
      cskuId = body.result.data.map((element) => element.id);
      cy.request({
        method: "PUT",
        url: `${baseurl}v1/item/${resItemId_P}/set_csku/${cskuId[0]}`,
        timeout: 120000,
        headers: { Authorization: Cypress.env("companyToken") },
        body: {
          csku_group: [
            {
              child_csku_id: csku_id[0],
              ratio: 2,
            },
          ],
        },
      }).then(({ body }) => {
        set_csku_id = body.result.data.map((element) => element.id);
        cy.request({
          method: "PUT",
          url: `${baseurl}v1/item/${resItemId_P}/set_csku/${cskuId[0]}`,
          headers: { Authorization: Cypress.env("companyToken") },
          body: {
            csku_group: [
              {
                id: set_csku_id[0],
                child_csku_id: csku_id[0],
                ratio: Cypress.env("RandomNumber"),
              },
            ],
          },
        }).then(({ body }) => {
          expect(body).has.property("statusCode", 200);
          expect(body).has.property("success", true);
          expect(body).has.property("error", null);
          expect(body).has.property("result");
          expect(body.result).has.property("message", body.result.message);
          body.result.data.forEach((ele: any) => {
            expect(ele).has.property("id", ele.id);
            expect(ele).has.property("parent_csku_id", ele.parent_csku_id);
            expect(ele).has.property("child_csku_id", ele.child_csku_id);
            expect(ele).has.property("row_num", ele.row_num);
            expect(ele).has.property("col_num", ele.col_num);
            expect(ele).has.property("ratio", ele.ratio);
            expect(ele).has.property("status", ele.status);
            expect(ele).has.property("created_date", ele.created_date);
            expect(ele).has.property("updated_date", ele.updated_date);
            expect(ele).has.property("created_by", ele.created_by);
            expect(ele).has.property("updated_by", ele.updated_by);
            expect(ele).has.property("item_id", ele.item_id);
            expect(ele).has.property("item_code", ele.item_code);
            expect(ele).has.property("item_name", ele.item_name);
          });
        });
      });
    });
  });
});

describe(`${store_msg.success_get}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");
  before(() => {
    expect(resItemId_I || resItemId_P || resItemId_S).be.not.undefined;
  });

  it("Test case for get item API when type is I", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/item/${resItemId_I}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      resColorId = body.result.data.color_list.map((elem) => elem.id);
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("name", body.result.data.name);
      expect(body.result.data).has.property("code", body.result.data.code);
      expect(body.result.data).has.property(
        "description",
        body.result.data.description
      );
      expect(body.result.data).has.property("type", body.result.data.type);
      expect(body.result.data).has.property("status", body.result.data.status);
      expect(body.result.data).has.property(
        "division_id",
        body.result.data.division_id
      );
      expect(body.result.data).has.property(
        "season_id",
        body.result.data.season_id
      );
      expect(body.result.data).has.property(
        "group_id",
        body.result.data.group_id
      );
      expect(body.result.data).has.property(
        "category_id",
        body.result.data.category_id
      );
      expect(body.result.data).has.property(
        "design_id",
        body.result.data.design_id
      );
      expect(body.result.data).has.property(
        "body_id",
        body.result.data.body_id
      );
      expect(body.result.data).has.property(
        "royalty_id",
        body.result.data.royalty_id
      );
      expect(body.result.data).has.property("parent", body.result.data.parent);
      body.result.data.item_grid.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("row_num", ele.row_num);
        expect(ele).has.property("row_name", ele.row_name);
        expect(ele).has.property("col_num", ele.col_num);
        expect(ele).has.property("col_name", ele.col_name);
        expect(ele).has.property("nrf_code", ele.nrf_code);
        expect(ele).has.property("status", ele.status);
      });
      body.result.data.color_list.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("code", ele.code);
        expect(ele).has.property("name", ele.name);
      });
    });
  });

  it("Test case for get item API when type is P", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/item/${resItemId_P}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("name", body.result.data.name);
      expect(body.result.data).has.property("code", body.result.data.code);
      expect(body.result.data).has.property(
        "description",
        body.result.data.description
      );
      expect(body.result.data).has.property("type", body.result.data.type);
      expect(body.result.data).has.property("status", body.result.data.status);
      expect(body.result.data).has.property(
        "division_id",
        body.result.data.division_id
      );
      expect(body.result.data).has.property(
        "season_id",
        body.result.data.season_id
      );
      expect(body.result.data).has.property(
        "group_id",
        body.result.data.group_id
      );
      expect(body.result.data).has.property(
        "category_id",
        body.result.data.category_id
      );
      expect(body.result.data).has.property(
        "design_id",
        body.result.data.design_id
      );
      expect(body.result.data).has.property(
        "body_id",
        body.result.data.body_id
      );
      expect(body.result.data).has.property(
        "royalty_id",
        body.result.data.royalty_id
      );
      expect(body.result.data.parent).has.property(
        "id",
        body.result.data.parent.id
      );
      expect(body.result.data.parent).has.property(
        "code",
        body.result.data.parent.code
      );
      expect(body.result.data.parent).has.property(
        "name",
        body.result.data.parent.name
      );
      body.result.data.item_grid.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("row_num", ele.row_num);
        expect(ele).has.property("row_name", ele.row_name);
        expect(ele).has.property("col_num", ele.col_num);
        expect(ele).has.property("col_name", ele.col_name);
        expect(ele).has.property("nrf_code", ele.nrf_code);
        expect(ele).has.property("status", ele.status);
      });
      body.result.data.color_list.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("code", ele.code);
        expect(ele).has.property("name", ele.name);
      });
    });
  });

  it("Test case for get item API when type is S", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/item/${resItemId_S}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("name", body.result.data.name);
      expect(body.result.data).has.property("code", body.result.data.code);
      expect(body.result.data).has.property(
        "description",
        body.result.data.description
      );
      expect(body.result.data).has.property("type", body.result.data.type);
      expect(body.result.data).has.property("status", body.result.data.status);
      expect(body.result.data).has.property(
        "division_id",
        body.result.data.division_id
      );
      expect(body.result.data).has.property(
        "season_id",
        body.result.data.season_id
      );
      expect(body.result.data).has.property(
        "group_id",
        body.result.data.group_id
      );
      expect(body.result.data).has.property(
        "category_id",
        body.result.data.category_id
      );
      expect(body.result.data).has.property(
        "design_id",
        body.result.data.design_id
      );
      expect(body.result.data).has.property(
        "body_id",
        body.result.data.body_id
      );
      expect(body.result.data).has.property(
        "royalty_id",
        body.result.data.royalty_id
      );
      expect(body.result.data).has.property("parent", body.result.data.parent);
      body.result.data.item_grid.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("row_num", ele.row_num);
        expect(ele).has.property("row_name", ele.row_name);
        expect(ele).has.property("col_num", ele.col_num);
        expect(ele).has.property("col_name", ele.col_name);
        expect(ele).has.property("nrf_code", ele.nrf_code);
        expect(ele).has.property("status", ele.status);
      });
      body.result.data.color_list.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("code", ele.code);
        expect(ele).has.property("name", ele.name);
      });
    });
  });

  it("Test case for get all distinct color by item_id", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/item/${resItemId_I}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("code", ele.code);
        expect(ele).has.property("name", ele.name);
      });
      expect(body.result).has.property(
        "totalRecords",
        body.result.totalRecords
      );
    });
  });

  it("Test cases for get csku list by itemId and colorId", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/item/${resItemId_I}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let all_color = [];
      let arrColor = body.result.data.color_list.map((elem) =>
        all_color.push(elem.id)
      );
      let randomColor = Math.floor(Math.random() * all_color.length);
      colorId = all_color[randomColor];

      cy.request({
        method: "GET",
        url: `${baseurl}v1/item/${resItemId_I}/color/${colorId}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        csku_I = body.result.data.map((element) => element.id);
        resItem_color_id = body.result.data.map(
          (element) => element.item_color_id
        );
        expect(body).has.property("statusCode", 200);
        expect(body).has.property("success", true);
        expect(body).has.property("error", null);
        expect(body).has.property("result");
        expect(body.result).has.property("message", body.result.message);
        body.result.data.forEach((ele: any) => {
          expect(ele).has.property("id", ele.id);
          expect(ele).has.property("sell_price", ele.sell_price);
          expect(ele).has.property("created_date", ele.created_date);
          expect(ele).has.property("updated_date", ele.updated_date);
          expect(ele).has.property("created_by", ele.created_by);
          expect(ele).has.property("updated_by", ele.updated_by);
          expect(ele).has.property("height", ele.height);
          expect(ele).has.property("length", ele.length);
          expect(ele).has.property("width", ele.width);
          expect(ele).has.property("weight", ele.weight);
          expect(ele).has.property("backlog_sales", ele.backlog_sales);
          expect(ele).has.property("backlog_purch", ele.backlog_purch);
          expect(ele).has.property("is_virtual", ele.is_virtual);
          expect(ele).has.property("is_sellable", ele.is_sellable);
          expect(ele).has.property("status", ele.status);
          expect(ele).has.property("upc", ele.upc);
          expect(ele).has.property("length_unit", ele.length_unit);
          expect(ele).has.property("weight_unit", ele.weight_unit);
          expect(ele).has.property("item_color_id", ele.item_color_id);
          expect(ele).has.property("item_grid_id", ele.item_grid_id);
          expect(ele).has.property("row_num", ele.row_num);
          expect(ele).has.property("row_name", ele.row_name);
          expect(ele).has.property("col_num", ele.col_num);
          expect(ele).has.property("col_name", ele.col_name);
        });
        expect(body.result).has.property(
          "totalRecords",
          body.result.totalRecords
        );
      });
    });
  });

  it("Test case to get Set Product detail", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/item/${resItemId_P}/color/${Cypress.env(
        "colorId_again"
      )}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cskuId = body.result.data.map((element) => element.id);
      cy.request({
        method: "GET",
        url: `${baseurl}v1/item/${resItemId_P}/set_csku/${cskuId[0]}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        expect(body).has.property("statusCode", 200);
        expect(body).has.property("success", true);
        expect(body).has.property("error", null);
        expect(body).has.property("result");
        expect(body.result).has.property("message", body.result.message);
        body.result.data.forEach((ele: any) => {
          expect(ele).has.property("id", ele.id);
          expect(ele).has.property("parent_csku_id", ele.parent_csku_id);
          expect(ele).has.property("child_csku_id", ele.child_csku_id);
          expect(ele).has.property("ratio", ele.ratio);
          expect(ele).has.property("item_id", ele.item_id);
          expect(ele).has.property("item_code", ele.item_code);
          expect(ele).has.property("item_name", ele.item_name);
          expect(ele).has.property("color_id", ele.color_id);
          expect(ele).has.property("color_code", ele.color_code);
          expect(ele).has.property("color_name", ele.color_name);
        });
      });
    });
  });
});

describe(`${store_msg.success}${"update Bulk Csku API"}`, () => {
  const baseurl = Cypress.env("apiUrl");
  before(() => {expect(resItemId_I).be.not.undefined});

  it("Test case for update bulk csku API when not providing optional field", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [
          {
            id: Cypress.env("colorId"),
          },
        ],
        item_grid: [
          {
            id: resItemGrid_I[0],
          },
          {
            id: resItemGrid_I[1],
          },
        ],
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
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("item_color_id", ele.item_color_id);
        expect(ele).has.property("item_grid_id", ele.item_grid_id);
        expect(ele).has.property("upc", ele.upc);
        expect(ele).has.property("length_unit", ele.length_unit);
        expect(ele).has.property("weight_unit", ele.weight_unit);
        expect(ele).has.property("sell_price", ele.sell_price);
        expect(ele).has.property("height", ele.height);
        expect(ele).has.property("length", ele.length);
        expect(ele).has.property("width", ele.width);
        expect(ele).has.property("weight", ele.weight);
        expect(ele).has.property("backlog_sales", ele.backlog_sales);
        expect(ele).has.property("backlog_purch", ele.backlog_purch);
        expect(ele).has.property("is_virtual", ele.is_virtual);
        expect(ele).has.property("is_sellable", ele.is_sellable);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
      });
    });
  });

  it("Test case for update bulk csku API when optional field are null", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [
          {
            id: Cypress.env("colorId"),
          },
        ],
        item_grid: [
          {
            id: resItemGrid_I[0],
          },
          {
            id: resItemGrid_I[1],
          },
        ],
        sell_price: null,
        height: null,
        length: null,
        width: null,
        length_unit: null,
        weight: null,
        weight_unit: null,
        is_virtual: Cypress.env("randomBoolean"),
        is_sellable: Cypress.env("randomBoolean"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("data", body.result.data);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("item_color_id", ele.item_color_id);
        expect(ele).has.property("item_grid_id", ele.item_grid_id);
        expect(ele).has.property("upc", ele.upc);
        expect(ele).has.property("length_unit", ele.length_unit);
        expect(ele).has.property("weight_unit", ele.weight_unit);
        expect(ele).has.property("sell_price", ele.sell_price);
        expect(ele).has.property("height", ele.height);
        expect(ele).has.property("length", ele.length);
        expect(ele).has.property("width", ele.width);
        expect(ele).has.property("weight", ele.weight);
        expect(ele).has.property("backlog_sales", ele.backlog_sales);
        expect(ele).has.property("backlog_purch", ele.backlog_purch);
        expect(ele).has.property("is_virtual", ele.is_virtual);
        expect(ele).has.property("is_sellable", ele.is_sellable);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
      });
      cy.log(JSON.stringify(body));
    });
  });

  it("Test case for update bulk csku API when optional field are blank", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [
          {
            id: Cypress.env("colorId"),
          },
        ],
        item_grid: [
          {
            id: resItemGrid_I[0],
          },
          {
            id: resItemGrid_I[1],
          },
        ],
        sell_price: "",
        height: "",
        length: "",
        width: "",
        length_unit: "",
        weight: "",
        weight_unit: "",
        is_virtual: Cypress.env("randomBoolean"),
        is_sellable: Cypress.env("randomBoolean"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("data", body.result.data);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("item_color_id", ele.item_color_id);
        expect(ele).has.property("item_grid_id", ele.item_grid_id);
        expect(ele).has.property("upc", ele.upc);
        expect(ele).has.property("length_unit", ele.length_unit);
        expect(ele).has.property("weight_unit", ele.weight_unit);
        expect(ele).has.property("sell_price", ele.sell_price);
        expect(ele).has.property("height", ele.height);
        expect(ele).has.property("length", ele.length);
        expect(ele).has.property("width", ele.width);
        expect(ele).has.property("weight", ele.weight);
        expect(ele).has.property("backlog_sales", ele.backlog_sales);
        expect(ele).has.property("backlog_purch", ele.backlog_purch);
        expect(ele).has.property("is_virtual", ele.is_virtual);
        expect(ele).has.property("is_sellable", ele.is_sellable);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
      });
      cy.log(JSON.stringify(body));
    });
  });

  it("Test case for update bulk csku API", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [
          {
            id: Cypress.env("colorId"),
          },
        ],
        item_grid: [
          {
            id: resItemGrid_I[0],
          },
          {
            id: resItemGrid_I[1],
          },
        ],
        sell_price: Cypress.env("RandomNumber"),
        height: Cypress.env("RandomNumber"),
        length: Cypress.env("RandomNumber"),
        width: Cypress.env("RandomNumber"),
        length_unit: "CM",
        weight: Cypress.env("RandomNumber"),
        weight_unit: "KG",
        is_virtual: Cypress.env("randomBoolean"),
        is_sellable: Cypress.env("randomBoolean"),
        status: 1,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("data", body.result.data);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("item_color_id", ele.item_color_id);
        expect(ele).has.property("item_grid_id", ele.item_grid_id);
        expect(ele).has.property("upc", ele.upc);
        expect(ele).has.property("length_unit", ele.length_unit);
        expect(ele).has.property("weight_unit", ele.weight_unit);
        expect(ele).has.property("sell_price", ele.sell_price);
        expect(ele).has.property("height", ele.height);
        expect(ele).has.property("length", ele.length);
        expect(ele).has.property("width", ele.width);
        expect(ele).has.property("weight", ele.weight);
        expect(ele).has.property("backlog_sales", ele.backlog_sales);
        expect(ele).has.property("backlog_purch", ele.backlog_purch);
        expect(ele).has.property("is_virtual", ele.is_virtual);
        expect(ele).has.property("is_sellable", ele.is_sellable);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
      });
      cy.log(JSON.stringify(body));
    });
  });

  it("Test case for update bulk csku API with multiple color", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [
          {
            id: Cypress.env("colorId"),
          },
          {
            id: Cypress.env("colorId_again"),
          },
        ],
        item_grid: [
          {
            id: resItemGrid_I[0],
          },
          {
            id: resItemGrid_I[1],
          },
        ],
        sell_price: Cypress.env("RandomNumber"),
        height: Cypress.env("RandomNumber"),
        length: Cypress.env("RandomNumber"),
        width: Cypress.env("RandomNumber"),
        length_unit: "CM",
        weight: Cypress.env("RandomNumber"),
        weight_unit: "KG",
        is_virtual: Cypress.env("randomBoolean"),
        is_sellable: Cypress.env("randomBoolean"),
        status: 1,
      },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(body.result).has.property("data", body.result.data);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("item_color_id", ele.item_color_id);
        expect(ele).has.property("item_grid_id", ele.item_grid_id);
        expect(ele).has.property("upc", ele.upc);
        expect(ele).has.property("length_unit", ele.length_unit);
        expect(ele).has.property("weight_unit", ele.weight_unit);
        expect(ele).has.property("sell_price", ele.sell_price);
        expect(ele).has.property("height", ele.height);
        expect(ele).has.property("length", ele.length);
        expect(ele).has.property("width", ele.width);
        expect(ele).has.property("weight", ele.weight);
        expect(ele).has.property("backlog_sales", ele.backlog_sales);
        expect(ele).has.property("backlog_purch", ele.backlog_purch);
        expect(ele).has.property("is_virtual", ele.is_virtual);
        expect(ele).has.property("is_sellable", ele.is_sellable);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
      });
      cy.log(JSON.stringify(body));
    });
  });
});

describe(`${store_msg.success}${"Update/Insert CSKU"}`, () => {
  const baseurl = Cypress.env("apiUrl");
  before(() => {expect(resItemId_I ).be.not.undefined});

  it("Test case  when optional fiels are provided as blank", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color/${Cypress.env("colorId")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        csku_list: [
          {
            item_grid_id: resItemGrid_I[0],
            upc: Cypress.env("Random"),
            sell_price: Cypress.env("RandomNumber"),
            height: Cypress.env("RandomNumber"),
            length: Cypress.env("RandomNumber"),
            width: Cypress.env("RandomNumber"),
            length_unit: "CM",
            weight: Cypress.env("RandomNumber"),
            weight_unit: "KG",
            is_virtual: 0,
            is_sellable: 1,
            status: 1,
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      insert_csku_id = body.result.data.map((ele) => ele.id);
      let requestData = {
        csku_list: [
          {
            id: insert_csku_id[0],
            upc: "",
            sell_price: "",
            height: "",
            length: "",
            width: "",
            length_unit: "",
            weight: "",
            weight_unit: "",
            is_virtual: 0,
            is_sellable: 1,
            status: 1,
          },
        ],
      };
      cy.request({
        method: "PUT",
        url: `${baseurl}v1/item/${resItemId_I}/color/${Cypress.env("colorId")}`,
        headers: { Authorization: Cypress.env("companyToken") },
        body: requestData,
        failOnStatusCode: false,
      }).then(({ body }) => {
        expect(body).has.property("statusCode", 200);
        expect(body).has.property("success", true);
        expect(body).has.property("error", null);
        expect(body).has.property("result");
        expect(body.result).has.property("message", body.result.message);
        expect(
          JSON.stringify(body.result.data.map((ele: any) => ele.is_virtual))
        ).that.deep.equals(
          JSON.stringify(requestData.csku_list.map((item) => item.is_virtual))
        );
        expect(
          JSON.stringify(body.result.data.map((ele: any) => ele.is_sellable))
        ).that.deep.equals(
          JSON.stringify(requestData.csku_list.map((item) => item.is_sellable))
        );
        expect(
          JSON.stringify(body.result.data.map((ele: any) => ele.status))
        ).that.deep.equals(
          JSON.stringify(requestData.csku_list.map((item) => item.status))
        );

        body.result.data.filter((ele: any) => {
          expect(ele).has.property("id", ele.id);
          expect(ele).has.property("item_color_id", ele.item_color_id);
          expect(ele).has.property("item_grid_id", ele.item_grid_id);
          expect(ele).has.property("upc", ele.upc);
          expect(ele).has.property("length_unit", ele.length_unit);
          expect(ele).has.property("weight_unit", ele.weight_unit);
          expect(ele).has.property("sell_price", ele.sell_price);
          expect(ele).has.property("height", ele.height);
          expect(ele).has.property("length", ele.length);
          expect(ele).has.property("width", ele.width);
          expect(ele).has.property("weight", ele.weight);
          expect(ele).has.property("backlog_sales", ele.backlog_sales);
          expect(ele).has.property("backlog_purch", ele.backlog_purch);
          expect(ele).has.property("is_virtual", ele.is_virtual);
          expect(ele).has.property("is_sellable", ele.is_sellable);
          expect(ele).has.property("status", ele.status);
          expect(ele).has.property("created_date", ele.created_date);
          expect(ele).has.property("updated_date", ele.updated_date);
          expect(ele).has.property("created_by", ele.created_by);
          expect(ele).has.property("updated_by", ele.updated_by);
        });
      });
    });
  });

  it("Test case  when optional fiels are provided as null", () => {
    let requestData = {
      csku_list: [
        {
          id: insert_csku_id[0],
          upc: null,
          sell_price: null,
          height: null,
          length: null,
          width: null,
          length_unit: null,
          weight: null,
          weight_unit: null,
          is_virtual: 0,
          is_sellable: 1,
          status: 1,
        },
      ],
    };
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color/${Cypress.env("colorId")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(
        JSON.stringify(body.result.data.map((ele: any) => ele.id))
      ).that.deep.equals(
        JSON.stringify(requestData.csku_list.map((item) => item.id))
      );
      expect(
        JSON.stringify(body.result.data.map((ele: any) => ele.upc))
      ).that.deep.equals(
        JSON.stringify(requestData.csku_list.map((item) => item.upc))
      );
      expect(
        JSON.stringify(body.result.data.map((ele: any) => ele.length_unit))
      ).that.deep.equals(
        JSON.stringify(requestData.csku_list.map((item) => item.length_unit))
      );
      expect(
        JSON.stringify(body.result.data.map((ele: any) => ele.weight_unit))
      ).that.deep.equals(
        JSON.stringify(requestData.csku_list.map((item) => item.weight_unit))
      );
      expect(
        JSON.stringify(body.result.data.map((ele: any) => ele.is_virtual))
      ).that.deep.equals(
        JSON.stringify(requestData.csku_list.map((item) => item.is_virtual))
      );
      expect(
        JSON.stringify(body.result.data.map((ele: any) => ele.is_sellable))
      ).that.deep.equals(
        JSON.stringify(requestData.csku_list.map((item) => item.is_sellable))
      );
      expect(
        JSON.stringify(body.result.data.map((ele: any) => ele.status))
      ).that.deep.equals(
        JSON.stringify(requestData.csku_list.map((item) => item.status))
      );
      body.result.data.filter((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("item_color_id", ele.item_color_id);
        expect(ele).has.property("item_grid_id", ele.item_grid_id);
        expect(ele).has.property("upc", ele.upc);
        expect(ele).has.property("length_unit", ele.length_unit);
        expect(ele).has.property("weight_unit", ele.weight_unit);
        expect(ele).has.property("sell_price", ele.sell_price);
        expect(ele).has.property("height", ele.height);
        expect(ele).has.property("length", ele.length);
        expect(ele).has.property("width", ele.width);
        expect(ele).has.property("weight", ele.weight);
        expect(ele).has.property("backlog_sales", ele.backlog_sales);
        expect(ele).has.property("backlog_purch", ele.backlog_purch);
        expect(ele).has.property("is_virtual", ele.is_virtual);
        expect(ele).has.property("is_sellable", ele.is_sellable);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
      });
    });
  });

  it("Test case  when don't provide any fields", () => {
    let requestData = {
      csku_list: [
        {
          id: insert_csku_id[0],
        },
      ],
    };
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color/${Cypress.env("colorId")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(
        JSON.stringify(body.result.data.map((ele: any) => ele.id))
      ).that.deep.equals(
        JSON.stringify(requestData.csku_list.map((item) => item.id))
      );
      body.result.data.filter((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("item_color_id", ele.item_color_id);
        expect(ele).has.property("item_grid_id", ele.item_grid_id);
        expect(ele).has.property("upc", ele.upc);
        expect(ele).has.property("length_unit", ele.length_unit);
        expect(ele).has.property("weight_unit", ele.weight_unit);
        expect(ele).has.property("sell_price", ele.sell_price);
        expect(ele).has.property("height", ele.height);
        expect(ele).has.property("length", ele.length);
        expect(ele).has.property("width", ele.width);
        expect(ele).has.property("weight", ele.weight);
        expect(ele).has.property("backlog_sales", ele.backlog_sales);
        expect(ele).has.property("backlog_purch", ele.backlog_purch);
        expect(ele).has.property("is_virtual", ele.is_virtual);
        expect(ele).has.property("is_sellable", ele.is_sellable);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
      });
    });
  });

  it("Test case for Update/Insert CSKU for Item id and color id.", () => {
    let requestData = {
      csku_list: [
        {
          id: insert_csku_id[0],
          upc: Cypress.env("Random"),
          sell_price: Cypress.env("RandomNumber"),
          height: Cypress.env("RandomNumber"),
          length: Cypress.env("RandomNumber"),
          width: Cypress.env("RandomNumber"),
          length_unit: "CM",
          weight: Cypress.env("RandomNumber"),
          weight_unit: "KG",
          is_virtual: 0,
          is_sellable: 1,
          status: 1,
        },
      ],
    };
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color/${Cypress.env("colorId")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message", body.result.message);
      expect(
        JSON.stringify(body.result.data.map((ele: any) => ele.id))
      ).that.deep.equals(
        JSON.stringify(requestData.csku_list.map((item) => item.id))
      );
      expect(
        JSON.stringify(body.result.data.map((ele: any) => ele.upc))
      ).that.deep.equals(
        JSON.stringify(requestData.csku_list.map((item) => item.upc))
      );
      expect(
        JSON.stringify(body.result.data.map((ele: any) => ele.length_unit))
      ).that.deep.equals(
        JSON.stringify(requestData.csku_list.map((item) => item.length_unit))
      );
      expect(
        JSON.stringify(body.result.data.map((ele: any) => ele.weight_unit))
      ).that.deep.equals(
        JSON.stringify(requestData.csku_list.map((item) => item.weight_unit))
      );
      expect(
        JSON.stringify(body.result.data.map((ele: any) => ele.sell_price))
      ).that.deep.equals(
        JSON.stringify(requestData.csku_list.map((item) => item.sell_price))
      );
      expect(
        JSON.stringify(body.result.data.map((ele: any) => ele.height))
      ).that.deep.equals(
        JSON.stringify(requestData.csku_list.map((item) => item.height))
      );
      expect(
        JSON.stringify(body.result.data.map((ele: any) => ele.length))
      ).that.deep.equals(
        JSON.stringify(requestData.csku_list.map((item) => item.length))
      );
      expect(
        JSON.stringify(body.result.data.map((ele: any) => ele.width))
      ).that.deep.equals(
        JSON.stringify(requestData.csku_list.map((item) => item.width))
      );
      expect(
        JSON.stringify(body.result.data.map((ele: any) => ele.weight))
      ).that.deep.equals(
        JSON.stringify(requestData.csku_list.map((item) => item.weight))
      );
      expect(
        JSON.stringify(body.result.data.map((ele: any) => ele.is_virtual))
      ).that.deep.equals(
        JSON.stringify(requestData.csku_list.map((item) => item.is_virtual))
      );
      expect(
        JSON.stringify(body.result.data.map((ele: any) => ele.is_sellable))
      ).that.deep.equals(
        JSON.stringify(requestData.csku_list.map((item) => item.is_sellable))
      );
      expect(
        JSON.stringify(body.result.data.map((ele: any) => ele.status))
      ).that.deep.equals(
        JSON.stringify(requestData.csku_list.map((item) => item.status))
      );
      body.result.data.filter((ele: any) => {
        expect(ele).has.property("id", ele.id);
        expect(ele).has.property("item_color_id", ele.item_color_id);
        expect(ele).has.property("item_grid_id", ele.item_grid_id);
        expect(ele).has.property("upc", ele.upc);
        expect(ele).has.property("length_unit", ele.length_unit);
        expect(ele).has.property("weight_unit", ele.weight_unit);
        expect(ele).has.property("sell_price", ele.sell_price);
        expect(ele).has.property("height", ele.height);
        expect(ele).has.property("length", ele.length);
        expect(ele).has.property("width", ele.width);
        expect(ele).has.property("weight", ele.weight);
        expect(ele).has.property("backlog_sales", ele.backlog_sales);
        expect(ele).has.property("backlog_purch", ele.backlog_purch);
        expect(ele).has.property("is_virtual", ele.is_virtual);
        expect(ele).has.property("is_sellable", ele.is_sellable);
        expect(ele).has.property("status", ele.status);
        expect(ele).has.property("created_date", ele.created_date);
        expect(ele).has.property("updated_date", ele.updated_date);
        expect(ele).has.property("created_by", ele.created_by);
        expect(ele).has.property("updated_by", ele.updated_by);
      });
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
        module_name: "item",
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
    let recordId = resItemId_I.toString();
    cy.request({
      method: "POST",
      url: `${baseurl}v1/log/track_change`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        module: "item",
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
    let name = "item";
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
            "description",
            "company_id",
            "division_id",
            "season_id",
            "group_id",
            "category_id",
            "design_id",
            "body_id",
            "royalty_id",
            "type",
            "parent_id",
            "status",
            "created_date",
            "updated_date",
            "created_by",
            "updated_by",
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
            division_id: {
              object: "division",
              fields: [
                "id",
                "company_id",
                "name",
                "code",
                "status",
                "dba",
                "def_factor_id",
                "created_date",
                "updated_date",
                "created_by",
                "updated_by",
              ],
            },
            season_id: {
              object: "season",
              fields: [
                "id",
                "code",
                "name",
                "description",
                "status",
                "created_date",
                "updated_date",
                "created_by",
                "updated_by",
              ],
            },
            group_id: {
              object: "group",
              fields: [
                "id",
                "name",
                "code",
                "description",
                "status",
                "created_date",
                "updated_date",
                "created_by",
                "updated_by",
              ],
            },
            category_id: {
              object: "category",
              fields: [
                "id",
                "code",
                "name",
                "description",
                "type",
                "status",
                "created_date",
                "updated_date",
                "created_by",
                "updated_by",
              ],
            },
            design_id: {
              object: "design",
              fields: [
                "id",
                "name",
                "code",
                "description",
                "status",
                "created_date",
                "updated_date",
                "created_by",
                "updated_by",
              ],
            },
            body_id: {
              object: "body",
              fields: [
                "id",
                "code",
                "name",
                "description",
                "status",
                "created_date",
                "updated_date",
                "created_by",
                "updated_by",
              ],
            },
            royalty_id: {
              object: "royalty",
              fields: [
                "id",
                "company_name",
                "code",
                "name",
                "description",
                "amount",
                "type",
                "status",
                "created_date",
                "updated_date",
                "created_by",
                "updated_by",
              ],
            },
          },
          child: {
            item_color: {
              fields: [
                "id",
                "item_id",
                "color_id",
                "status",
                "created_date",
                "updated_date",
                "created_by",
                "updated_by",
              ],
              foreignKey: {
                color_id: {
                  object: "color",
                  fields: [
                    "id",
                    "name",
                    "code",
                    "status",
                    "created_date",
                    "updated_date",
                    "created_by",
                    "updated_by",
                  ],
                },
              },
            },
            item_grid: {
              fields: [
                "id",
                "item_id",
                "row_num",
                "row_name",
                "col_num",
                "col_name",
                "nrf_code",
                "status",
                "created_date",
                "updated_date",
                "created_by",
                "updated_by",
              ],
              foreignKey: {},
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

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");

  it("Test cases When code already exist", () => {
    let reqData = req_item({ code: resCode_S }, ["parent"])
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("code should be maximum 40 charector", () => {
    let reqData = req_item({ code: Cypress.env("RandomDesc") }, ["parent"])
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When do not provide required field data", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("name", "{name} is required");
      expect(body.error.errorDetails).has.property("code", "{code} is required");
      expect(body.error.errorDetails).has.property("color_list", "{color_list} is required");
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        name: "",
        code: "",
        status: "",
        item_grid: [
          {
            row_num: "",
            row_name: "",
            col_num: "",
            col_name: "",
            nrf_code: "",
            status: "",
          },
        ],

        color_list: [],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
      expect(body.error.errorDetails).has.property("name");
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("row_num");
      expect(body.error.errorDetails).has.property("row_name");
      expect(body.error.errorDetails).has.property("col_num");
      expect(body.error.errorDetails).has.property("col_name");
      expect(body.error.errorDetails).has.property("color_list");
    });
  });

  it("Test cases When provided parent field but type is I", () => {
    let reqData = req_item({})
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("parent");
    });
  });

  it("Test cases When provided csku_group field but type is I", () => {
    let reqData = req_item({
      color_list: [
        {
          id: Cypress.env("colorId"),
          csku_group: [
            {
              child_csku_id: csku_id[0],
              ratio: 2
            }
          ]
        }
      ]
    })
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("csku_group");
    });
  });

  it("Test cases When provided parent field but type is S", () => {
    let reqData = req_item({
      type: "S",
      color_list: [
        {
          id: Cypress.env("colorId"),
          csku_group: [
            {
              child_csku_id: csku_id[0],
              ratio: 2
            }
          ]
        }
      ]
    })
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("parent");
    });
  });

  it("Test cases When division_id doesn't exist ", () => {
    let reqData = req_item({ division_id: Cypress.env("RandomNumber") })
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("division_id", store_msg.division);
    });
  });

  it("Test cases When season_id doesn't exist ", () => {
    let reqData = req_item({ season_id: Cypress.env("RandomNumber") })
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("season_id", `{season_id} is invalid`);
    });
  });

  it("Test cases When group_id doesn't exist ", () => {
    let reqData = req_item({ group_id: Cypress.env("RandomNumber") })
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("group_id", `{group_id} is invalid`);
    });
  });

  it("Test cases When category_id doesn't exist ", () => {
    let reqData = req_item({ category_id: Cypress.env("RandomNumber") })
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("category_id", `{category_id} is invalid`);
    });
  });

  it("Test cases When design_id doesn't exist ", () => {
    let reqData = req_item({ design_id: Cypress.env("RandomNumber") })
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("design_id", `{design_id} is invalid`);
    });
  });

  it("Test cases When body_id doesn't exist ", () => {
    let reqData = req_item({ body_id: Cypress.env("RandomNumber") })
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("body_id", `{body_id} is invalid`);
    });
  });

  it("Test cases When royalty_id doesn't exist ", () => {
    let reqData = req_item({ royalty_id: Cypress.env("RandomNumber") })
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("royalty_id", `{royalty_id} is invalid`);
    });
  });

  it("Type will be only [I, P and S] ", () => {
    let reqData = req_item({ type: Cypress.env("Random") })
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("type", `{type} must be one of [I, P, S]`);
    });
  });

  it("Test case when colorId does not exist ", () => {
    let reqData = req_item({
      color_list: [
        {
          id: Cypress.env("RandomNumber")
        }
      ]
    }, ["parent"])
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "color_id", `Either {color_id} is invalid or status could be inactive`);
    });
  });

  it("Test cases When parent doesn't exist when type is P", () => {
    let reqData = req_item({
      type: "P",
      parent: {
        id: Cypress.env("RandomNumber")
      },
      color_list: [
        {
          id: Cypress.env("colorId_again"),
          csku_group: [
            {
              child_csku_id: csku_id[0],
              ratio: 2
            }
          ]
        }
      ]
    })
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("parent_id", "{parent_id} is invalid");
    });
  });

  it("Test cases When child_csku_id doesn't exist when type is P", () => {
    let reqData = req_item({
      type: "P",
      color_list: [
        {
          id: Cypress.env("colorId"),
          csku_group: [
            {
              child_csku_id: Cypress.env("RandomNumber"),
              ratio: 2
            }
          ]
        }
      ]
    })
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "child_csku_id", `Either {child_csku_id} is invalid or status could be inactive`);
    });
  });

  it("Test cases When child_csku_id doesn't exist when type is S", () => {
    let reqData = req_item({
      type: "S",
      color_list: [
        {
          id: Cypress.env("colorId"),
          csku_group: [
            {
              child_csku_id: Cypress.env("RandomNumber"),
              ratio: 2
            }
          ]
        }
      ]
    }, ["parent"])
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "child_csku_id", `Either {child_csku_id} is invalid or status could be inactive`);
    });
  });

  it(`division_id, season_id, group_id, category_id, design_id, body_id,royalty_id
      status,row_num, col_num, parent_id, color_id,child_csku_id and ratio must be intger`, () => {
    let reqData = req_item({
      division_id: Cypress.env("RandomNum"),
      season_id: Cypress.env("RandomNum"),
      group_id: Cypress.env("RandomNum"),
      category_id: Cypress.env("RandomNum"),
      design_id: Cypress.env("RandomNum"),
      body_id: Cypress.env("RandomNum"),
      royalty_id: Cypress.env("RandomNum"),
      status: Cypress.env("RandomNum"),
      type: "P",
      item_grid: [
        {
          row_num: Cypress.env("RandomNum"),
          row_name: Cypress.env("Random"),
          col_num: Cypress.env("RandomNum"),
          col_name: Cypress.env("Random"),
          nrf_code: Cypress.env("Random"),
          status: Cypress.env("RandomNum")
        }
      ],
      parent: {
        id: Cypress.env("RandomNum"),
      },
      color_list: [
        {
          id: Cypress.env("RandomNum"),
          csku_group: [
            {
              child_csku_id: Cypress.env("RandomNum"),
              ratio: Cypress.env("RandomNum")
            }
          ]
        }
      ]
    })
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "division_id", "{division_id} must be a number");
      expect(body.error.errorDetails).has.property(
        "season_id", "{season_id} must be a number");
      expect(body.error.errorDetails).has.property(
        "group_id", "{group_id} must be a number");
      expect(body.error.errorDetails).has.property(
        "category_id", "{category_id} must be a number");
      expect(body.error.errorDetails).has.property(
        "design_id", "{design_id} must be a number");
      expect(body.error.errorDetails).has.property(
        "body_id", "{body_id} must be a number");
      expect(body.error.errorDetails).has.property(
        "royalty_id", "{royalty_id} must be a number");
      expect(body.error.errorDetails).has.property(
        "status", `"status" must be a number`);
      expect(body.error.errorDetails).has.property(
        "row_num", `"row_num" must be a number`);
      expect(body.error.errorDetails).has.property(
        "col_num", `"col_num" must be a number`);
      expect(body.error.errorDetails).has.property(
        "id", `{id} must be a number`);
      expect(body.error.errorDetails).has.property(
        "child_csku_id", `"child_csku_id" must be a number`);
      expect(body.error.errorDetails).has.property(
        "ratio", `"ratio" must be a number`);
    });
  });

  it("status must be one of [0 and 1]", () => {
    let reqData = req_item({ status: Cypress.env("RandomNumber") }, ["parent"])
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "status", `"status" must be one of [1, 0]`);
    });
  });

  it("item_grid - row_num and col_num should be unique", () => {
    let reqData = req_item({
      item_grid: [
        {
          row_num: 1,
          row_name: "A",
          col_num: 1,
          col_name: "A"
        },
        {
          row_num: 1,
          row_name: "A",
          col_num: 1,
          col_name: "B"
        }
      ],
    }, ["parent"])
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "row_num", "{row_num} should be unique");
      expect(body.error.errorDetails).has.property(
        "col_num", "{col_num} should be unique");
    });
  });

  it("row_num and col_num should be equel to or less than item_grid object", () => {
    let reqData = req_item({
      item_grid: [
        {
          row_num: 1,
          row_name: "A",
          col_num: 1,
          col_name: "A"
        },
        {
          row_num: 3,
          row_name: "A",
          col_num: 3,
          col_name: "B"
        }
      ],
    }, ["parent"])
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.log(JSON.stringify(reqData));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("row_num");
      expect(body.error.errorDetails).has.property("col_num");
    });
  });

  it("item_grid - row_name and col_name should be unique", () => {
    let reqData = req_item({
      item_grid: [
        {
          row_num: 1,
          row_name: "A",
          col_num: 1,
          col_name: "A"
        },
        {
          row_num: 1,
          row_name: "A",
          col_num: 2,
          col_name: "A"
        }
      ],
    }, ["parent"])
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: reqData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.log(JSON.stringify(reqData));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("row_name");
      expect(body.error.errorDetails).has.property("col_name");
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");

  before(() => {
    expect(resItemId_I || resItemId_P || resItemId_S).be.not.undefined;
  });

  it("Test cases When alphabet provides along with Id ", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${Cypress.env("Random")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id", store_msg.chk_id);
    });
  });

  it("Code will be maximum 40 charector ", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        code: Cypress.env("RandomDesc")
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Code(body);
    });
  });

  it("Test cases When item_id relates from type P but item_grid_id relates from type I  ", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_P}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        item_grid: [
          {
            id: resItemGrid_I[0],
          }
        ]
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("item_grid_id", store_msg.item_grid);
    });
  });

  it("Test cases When item_id relates from type I but item_grid_id relates from type P  ", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        item_grid: [
          {
            id: resItemGrid_P[0]
          }
        ]
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("item_grid_id", store_msg.item_grid);
    });
  });

  it("Test cases When item_id relates from type S but item_grid_id relates from type I  ", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_S}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        item_grid: [
          {
            id: resItemGrid_I[0]
          }
        ]
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("item_grid_id", store_msg.item_grid);
    });
  });

  it("Test cases When item_id relates from type I but item_grid_id relates from type S  ", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        item_grid: [
          {
            id: resItemGrid_S[0]
          }
        ]
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("item_grid_id", store_msg.item_grid);
    });
  });

  it("Test cases When item_id relates from type P but item_grid_id relates from type S  ", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_P}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        item_grid: [
          {
            id: resItemGrid_S[0]
          }
        ]
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("item_grid_id", store_msg.item_grid);
    });
  });

  it("Test cases When item_id relates from type S but item_grid_id relates from type P  ", () => {
    -cy
      .request({
        method: "PUT",
        url: `${baseurl}v1/item/${resItemId_S}`,
        headers: { Authorization: Cypress.env("companyToken") },
        body: {
          item_grid: [
            {
              id: resItemGrid_P[0]
            }
          ]
        },
        failOnStatusCode: false,
      })
      .then(({ body }) => {
        cy.log(JSON.stringify(body));
        cy.Failure(body);
        expect(body.error.errorDetails).has.property("item_grid_id", store_msg.item_grid);
      });
  });

  it("Test cases When Id doesn't exist", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${Cypress.env("RandomNumber")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id", store_msg.id);
    });
  });

  it("Test cases When required field are left blank", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        name: "",
        code: "",
        status: "",
        item_grid: [
          {
            row_num: "",
            row_name: "",
            col_num: "",
            col_name: "",
            nrf_code: "",
            status: "",
          },
        ],

        color_list: [],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("status");
      expect(body.error.errorDetails).has.property("name");
      expect(body.error.errorDetails).has.property("code");
      expect(body.error.errorDetails).has.property("row_num");
      expect(body.error.errorDetails).has.property("row_name");
      expect(body.error.errorDetails).has.property("col_num");
      expect(body.error.errorDetails).has.property("col_name");
      expect(body.error.errorDetails).has.property("color_list");
    });
  });

  it("Test cases When item_grid_id doesn't exist ", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        item_grid: [
          {
            id: Cypress.env("RandomNumber")
          }
        ]
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("item_grid_id");
    });
  });

  it("Test cases When division_id doesn't  exist ", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        division_id: Cypress.env("RandomNumber")
      },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("division_id", store_msg.division);
    });
  });

  it("Test cases When season_id doesn't  exist ", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        season_id: Cypress.env("RandomNumber")
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("season_id", `{season_id} is invalid`);
    });
  });

  it("Test cases When group_id doesn't  exist ", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        group_id: Cypress.env("RandomNumber")
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("group_id", `{group_id} is invalid`);
    });
  });

  it("Test cases When category_id doesn't  exist ", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        category_id: Cypress.env("RandomNumber")
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("category_id", `{category_id} is invalid`);
    });
  });

  it("Test cases When design_id doesn't  exist ", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        design_id: Cypress.env("RandomNumber"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("design_id", `{design_id} is invalid`);
    });
  });

  it("Test cases When body_id doesn't  exist ", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        body_id: Cypress.env("RandomNumber")
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("body_id", `{body_id} is invalid`);
    });
  });

  it("Test cases When royalty_id doesn't  exist ", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        royalty_id: Cypress.env("RandomNumber")
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("royalty_id", `{royalty_id} is invalid`);
    });
  });

  it(`division_id, season_id, group_id, category_id, design_id, body_id,royalty_id
  status,item_grid-[id,row_num, col_num] must be intger`, () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_P}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        division_id: Cypress.env("Random"),
        season_id: Cypress.env("Random"),
        group_id: Cypress.env("Random"),
        category_id: Cypress.env("Random"),
        design_id: Cypress.env("Random"),
        body_id: Cypress.env("Random"),
        royalty_id: Cypress.env("Random"),
        status: Cypress.env("Random"),
        item_grid: [
          {
            id: Cypress.env("Random"),
            row_num: Cypress.env("Random"),
            col_num: Cypress.env("Random"),
            status: Cypress.env("Random"),
          }
        ]
      },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "division_id", "{division_id} must be a number");
      expect(body.error.errorDetails).has.property(
        "season_id", "{season_id} must be a number");
      expect(body.error.errorDetails).has.property(
        "group_id", "{group_id} must be a number");
      expect(body.error.errorDetails).has.property(
        "category_id", "{category_id} must be a number");
      expect(body.error.errorDetails).has.property(
        "design_id", "{design_id} must be a number");
      expect(body.error.errorDetails).has.property(
        "body_id", "{body_id} must be a number");
      expect(body.error.errorDetails).has.property(
        "royalty_id", "{royalty_id} must be a number");
      expect(body.error.errorDetails).has.property(
        "status", `"status" must be a number`);
      expect(body.error.errorDetails).has.property(
        "id", `"id" must be a number`);
      expect(body.error.errorDetails).has.property(
        "row_num", `"row_num" must be a number`);
      expect(body.error.errorDetails).has.property(
        "col_num", `"col_num" must be a number`);
    });
  });

  it(`name, code, description, row_name, col_name and nrf_code should be string`, () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        name: Cypress.env("RandomNumber"),
        code: Cypress.env("RandomNumber"),
        description: Cypress.env("RandomNumber"),
        item_grid: [
          {
            id: resItemGrid_I[0],
            row_name: Cypress.env("RandomNumber"),
            col_name: Cypress.env("RandomNumber"),
            nrf_code: Cypress.env("RandomNumber"),
          }
        ],
      },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "name", "{name} must be a string");
      expect(body.error.errorDetails).has.property(
        "code", "{code} must be a string");
      expect(body.error.errorDetails).has.property(
        "description", "{description} must be a string");
      expect(body.error.errorDetails).has.property(
        "row_name", `"row_name" must be a string`);
      expect(body.error.errorDetails).has.property(
        "col_name", `"col_name" must be a string`);
      expect(body.error.errorDetails).has.property(
        "nrf_code", `"nrf_code" must be a string`);
    });
  });

  it("status must be one of [0 and 1]", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        status: Cypress.env("RandomNumber")
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "status", "{status} must be one of [1, 0]");
    });
  });

  it("item_grid - row_num and col_num should be unique", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {

        item_grid: [
          {
            id: resItemGrid_I[0],
            row_num: 1,
            col_num: 1
          },
          {
            id: resItemGrid_I[1],
            row_num: 1,
            col_num: 1
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "row_num", "{row_num} should be unique");
      expect(body.error.errorDetails).has.property(
        "col_num", "{col_num} should be unique");
    });
  });

  it("row_num and col_num should be equel to or less than item_grid object", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {

        item_grid: [
          {
            id: resItemGrid_I[1],
            row_num: 3,
            col_num: 3
          },
        ],
      },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("row_num");
      expect(body.error.errorDetails).has.property("col_num");
    });
  });

  it("item_grid - row_name and col_name should be unique", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {

        item_grid: [
          {
            id: resItemGrid_I[0],
            row_name: Cypress.env("Random"),
            col_name: Cypress.env("Random")
          },
          {
            id: resItemGrid_I[1],
            row_name: Cypress.env("Random"),
            col_name: Cypress.env("Random")
          }
        ]
      },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "row_name", "{row_name} should be unique");
      expect(body.error.errorDetails).has.property(
        "col_name", "{col_name} should be unique");
    });
  });


});

describe(`${store_msg.fail_get}${Cypress.spec["fileName"]}`, () => {
  const baseurl = Cypress.env("apiUrl");

  it("Failure test case for get item API when Item_id doesn't exist", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/item/${Cypress.env("RandomNumber")}`,
      headers: { Authorization: Cypress.env("companyToken") },

      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id", store_msg.id);
    });
  });

  it("Failure Test case for get all distinct color by item_id when Item_id doesn't exist", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/item/${Cypress.env("RandomNumber")}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id", store_msg.id);
    });
  });

  it("Failure test cases for get csku list when Item_id doesn't exist", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/item/${Cypress.env("RandomNumber")}/color/${colorId}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "item_id", "Either {item_id} is invalid or status could be inactive");
    });
  });

  it("Failure test cases for get csku list when color_id doesn't exist", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/item/${resItemId_I}/color/${Cypress.env(
        "RandomNumber"
      )}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "color_id", `Either {color_id} is invalid or status could be inactive`);
    });
  });

  it("Failure test case to get Set Product detail when item_type is I", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/item/${resItemId_I}/set_csku/${cskuId[0]}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("type", "{type} I is not allowed");
    });
  });

  it("Failure test case to get Set Product detail when item_id doesn't exist", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/item/${Cypress.env("RandomNumber")}/set_csku/${cskuId[0]
        }`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body.error.errorDetails).has.property("item_id", store_msg.item);
    });
  });

  it("Failure test case to get Set Product detail when parent_csku_id doesn't exist", () => {
    cy.request({
      method: "GET",
      url: `${baseurl}v1/item/${resItemId_P}/set_csku/${Cypress.env(
        "RandomNumber"
      )}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("csku_id", `{csku_id} is invalid`);
    });
  });
});

describe(`${store_msg.fail}${"add colors or csku"}`, () => {
  const baseurl = Cypress.env("apiUrl");

  it("Failure test cases when item_id does not exist", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/${Cypress.env("RandomNumber")}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [
          {
            id: Cypress.env("colorId"),

            csku_group: [
              {
                child_csku_id: csku_id[0],
                ratio: Cypress.env("RandomNumber"),
              },
            ],
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      // cy.Failure(body);
      // expect(body.error.errorDetails).has.property("item_id",store_msg.item);
    });
  });

  it("Failure test cases when type is I and csku_group field is provided ", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/${resItemId_I}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [
          {
            id: Cypress.env("colorId"),

            csku_group: [
              {
                child_csku_id: csku_id[0],
                ratio: Cypress.env("RandomNumber"),
              },
            ],
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("type", "{type} 'I' is not allowed");
    });
  });

  it("Failure test cases when color_id does not exist and type is I", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/${resItemId_I}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [
          {
            id: Cypress.env("RandomNumber"),
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "color_id", `Either {color_id} is invalid or status could be inactive`)
    });
  });

  it("Failure test cases when color_id does not exist and type is P", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/${resItemId_P}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [
          {
            id: Cypress.env("RandomNumber"),

            csku_group: [
              {
                child_csku_id: csku_id[0],
                ratio: Cypress.env("RandomNumber"),
              },
            ],
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "color_id", `Either {color_id} is invalid or status could be inactive`)
    });
  });

  it("Failure test cases when color_id does not exist and type is S", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/${resItemId_S}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [
          {
            id: Cypress.env("RandomNumber"),

            csku_group: [
              {
                child_csku_id: csku_id[0],
                ratio: Cypress.env("RandomNumber"),
              },
            ],
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "color_id", `Either {color_id} is invalid or status could be inactive`)
    });
  });

  it("Failure test cases when child_csku_id does not exist and type is P", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/${resItemId_P}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [
          {
            id: Cypress.env("colorId"),

            csku_group: [
              {
                child_csku_id: Cypress.env("RandomNumber"),
                ratio: Cypress.env("RandomNumber"),
              },
            ],
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "child_csku_id", `{child_csku_id} is invalid`)
    });
  });

  it("Failure test cases when child_csku_id does not exist and type is S", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/${resItemId_S}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [
          {
            id: Cypress.env("colorId"),

            csku_group: [
              {
                child_csku_id: Cypress.env("RandomNumber"),
                ratio: Cypress.env("RandomNumber"),
              },
            ],
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "child_csku_id", `{child_csku_id} is invalid`)
    });
  });

  it("Failure test cases when do not provide required field", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/${resItemId_P}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "color_list", "{color_list} is required");
    });
  });

  it("Failure test cases when Required field is empty", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/${resItemId_P}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [
          {
            id: "",

            csku_group: [
              {
                child_csku_id: "",
                ratio: "",
              },
            ],
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "id", `"id" must be a number`);
      expect(body.error.errorDetails).has.property(
        "child_csku_id", `"child_csku_id" must be a number`);
      expect(body.error.errorDetails).has.property(
        "ratio", `"ratio" must be a number`);
    });
  });

  it("id, child_csku_id and ratio must be number", () => {
    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/${resItemId_P}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [
          {
            id: Cypress.env("RandomNum"),

            csku_group: [
              {
                child_csku_id: Cypress.env("RandomNum"),
                ratio: Cypress.env("RandomNum"),
              },
            ],
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "id", '"id" must be a number');
      expect(body.error.errorDetails).has.property(
        "child_csku_id", `"child_csku_id" must be a number`);
      expect(body.error.errorDetails).has.property(
        "ratio", `"ratio" must be a number`);
    });
  });

  it("The combinations of item and color id is already exist", () => {

    cy.request({
      method: "POST",
      url: `${baseurl}v1/item/${resItemId_P}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [
          {
            id: rescolor_id[0],
            csku_group: [
              {
                child_csku_id: csku_id[0],
                ratio: Cypress.env("RandomNumber"),
              },
            ],
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "item_id", "{item_id} is already associated with {color_id}");
    });
  });
});

describe(`${store_msg.fail}${"Update/Insert CSKU Group"}`, () => {
  const baseurl = Cypress.env("apiUrl");

  it("Failure test case when type is I", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/set_csku/${cskuId[0]}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        csku_group: [
          {
            id: set_csku_id[0],
            child_csku_id: csku_id[0],
            ratio: Cypress.env("RandomNumber"),
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("type", "{type} 'I' is not allowed");
    });
  });

  it("Failure test case when Item_id does not exist", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${Cypress.env("RandomNumber")}/set_csku/${cskuId[0]
        }`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        csku_group: [
          {
            id: set_csku_id[0],
            child_csku_id: csku_id[0],
            ratio: Cypress.env("RandomNumber"),
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("item_id", store_msg.item);
    });
  });

  it("Failure test case when csku_id does not exist", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_P}/set_csku/${Cypress.env(
        "RandomNumber"
      )}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        csku_group: [
          {
            id: set_csku_id[0],
            child_csku_id: csku_id[0],
            ratio: Cypress.env("RandomNumber"),
          }
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("csku_id", "{csku_id} is invalid");
    });
  });

  it("Failure test case when csku_group_id does not exist", () => {
    cy.log("cskuId", [0]);
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_P}/set_csku/${cskuId[0]}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        csku_group: [
          {
            id: Cypress.env("RandomNumber"),
            child_csku_id: csku_id[0],
            ratio: Cypress.env("RandomNumber"),
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "csku_group_id", "{csku_group_id} is invalid");
    });
  });

  it("Failure test case when child_csku_id does not exist", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_P}/set_csku/${cskuId[0]}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        csku_group: [
          {
            id: set_csku_id[0],
            child_csku_id: Cypress.env("RandomNumber"),
            ratio: Cypress.env("RandomNumber"),
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "child_csku_id", `{child_csku_id} is invalid`);
    });
  });

  it("Failure test case when do not provide required fields", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_P}/set_csku/${cskuId[0]}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        csku_group: [
          {
            id: set_csku_id[0]
          }
        ]
      },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "child_csku_id", `"child_csku_id" is required`);
      expect(body.error.errorDetails).has.property(
        "ratio", `"ratio" is required`);
      expect(body.error.errorDetails).has.property("csku_group");
    });
  });

  it("Failure test case when required fields are empty", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_P}/set_csku/${cskuId[0]}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        csku_group: [
          {
            id: "",
            child_csku_id: "",
            ratio: ""
          }
        ]
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id", `"id" must be a number`);
      expect(body.error.errorDetails).has.property(
        "child_csku_id", `"child_csku_id" must be a number`);
      expect(body.error.errorDetails).has.property("ratio", `"ratio" must be a number`);
      expect(body.error.errorDetails).has.property("csku_group");
    });
  });

  it("Id, child_csku_id, ratio must be integer", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_P}/set_csku/${cskuId[0]}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        csku_group: [
          {
            id: Cypress.env("RandomNum"),
            child_csku_id: Cypress.env("RandomNum"),
            ratio: Cypress.env("RandomNum"),
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id", `"id" must be a number`);
      expect(body.error.errorDetails).has.property(
        "child_csku_id", `"child_csku_id" must be a number`);
      expect(body.error.errorDetails).has.property("ratio", `"ratio" must be a number`);
      expect(body.error.errorDetails).has.property("csku_group");
    });
  });
});

describe(`${store_msg.fail}${"Update/Insert CSKU"}`, () => {
  const baseurl = Cypress.env("apiUrl");

  it("Failure test case when item_id does not exist ", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${Cypress.env(
        "RandomNumber"
      )}/color/${Cypress.env("colorId")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        csku_list: [
          {
            id: insert_csku_id[0],
            // item_grid_id: resItemGrid_I[0],
            sell_price: 50,
            height: 170,
            length: 50,
            width: 130,
            length_unit: "CM",
            weight: 60,
            weight_unit: "KG",
            is_virtual: 0,
            is_sellable: 1,
            status: 1,
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("item_id", store_msg.item);
    });
  });

  it("Failure test case when color_id does not exist ", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color/${Cypress.env(
        "RandomNumber"
      )}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        csku_list: [
          {
            id: insert_csku_id[0],
            sell_price: 50,
            height: 170,
            length: 50,
            width: 130,
            length_unit: "CM",
            weight: 60,
            weight_unit: "KG",
            is_virtual: 0,
            is_sellable: 1,
            status: 1,
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("color_id", "{color_id} is invalid");
    });
  });

  it("Failure test case when id does not exist ", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color/${Cypress.env("colorId")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        csku_list: [
          {
            id: Cypress.env("RandomNumber"),
            sell_price: 50,
            height: 170,
            length: 50,
            width: 130,
            length_unit: "CM",
            weight: 60,
            weight_unit: "KG",
            is_virtual: 0,
            is_sellable: 1,
            status: 1,
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "id", "{id} is not associated with {item_id} and {color_id}");
    });
  });

  it("Failure test case for insert csku when item_grid_id does not exist", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color/${Cypress.env("colorId")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        csku_list: [
          {
            item_grid_id: Cypress.env("RandomNumber")
          }
        ]
      },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "item_grid_id", store_msg.item_grid);
    });
  });

  it("is_virtual, is_sellable and status must be one of [0,1]", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color/${Cypress.env("colorId")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        csku_list: [
          {
            id: insert_csku_id[0],
            is_virtual: Cypress.env("RandomNumber"),
            is_sellable: Cypress.env("RandomNumber"),
            status: Cypress.env("RandomNumber")
          }
        ]
      },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "is_virtual", `"is_virtual" must be one of [1, 0]`);
      expect(body.error.errorDetails).has.property(
        "is_sellable", `"is_sellable" must be one of [1, 0]`);
      expect(body.error.errorDetails).has.property(
        "status", `"status" must be one of [1, 0]`);
      expect(body.error.errorDetails).has.property("csku_list");
      expect(body).has.property("result", body.result);
    });
  });

  it("Failure test case for insert Csku when do not provide required field", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color/${Cypress.env("colorId")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        csku_list: [{}],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "item_grid_id", `"item_grid_id" is required`);
      expect(body.error.errorDetails).has.property("csku_list");
    });
  });

  it("Failure test case for insert Csku when do not provide any field", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color/${Cypress.env("colorId")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        csku_list: [],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("csku_list");
    });
  });

  it("Failure test case for insert Csku when required field are empty", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color/${Cypress.env("colorId")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        csku_list: [
          {
            item_grid_id: ""
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("item_grid_id");
    });
  });

  it("Test case which field should be intger", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color/${Cypress.env("colorId")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        csku_list: [
          {
            id: Cypress.env("RandomNum"),
            sell_price: Cypress.env("RandomNum"),
            height: Cypress.env("RandomNum"),
            length: Cypress.env("RandomNum"),
            width: Cypress.env("RandomNum"),
            length_unit: "CM",
            weight: Cypress.env("RandomNum"),
            weight_unit: "KG",
            is_virtual: Cypress.env("RandomNum"),
            is_sellable: Cypress.env("RandomNum"),
            status: Cypress.env("RandomNum"),
          },
        ],
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id", `"id" must be a number`);
      expect(body.error.errorDetails).has.property("sell_price", `"sell_price" must be a number`);
      expect(body.error.errorDetails).has.property("height", `"height" must be a number`);
      expect(body.error.errorDetails).has.property("width", `"width" must be a number`);
      expect(body.error.errorDetails).has.property("weight", `"weight" must be a number`);
      expect(body.error.errorDetails).has.property("is_virtual", `"is_virtual" must be a number`);
      expect(body.error.errorDetails).has.property("is_sellable", `"is_sellable" must be a number`);
      expect(body.error.errorDetails).has.property("status", `"status" must be a number`);
    });
  });

  it("length_unit and weight_unit should be string", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color/${Cypress.env("colorId")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        csku_list: [
          {
            id: insert_csku_id[0],
            length_unit: Cypress.env("RandomNumber"),
            weight_unit: Cypress.env("RandomNumber")
          }
        ]
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "length_unit", `"length_unit" must be a string`);
      expect(body.error.errorDetails).has.property(
        "weight_unit", `"weight_unit" must be a string`);
    });
  });
});

describe(`${store_msg.fail}${"update Bulk Csku"}`, () => {
  const baseurl = Cypress.env("apiUrl");

  it("Test case when item_id doesn't exist", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${Cypress.env("RandomNumber")}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [
          {
            id: Cypress.env("colorId"),
          },
        ],
        item_grid: [
          {
            id: resItemGrid_I[0],
          },
          {
            id: resItemGrid_I[1],
          },
        ],
        sell_price: Cypress.env("RandomNumber"),
        height: Cypress.env("RandomNumber"),
        length: Cypress.env("RandomNumber"),
        width: Cypress.env("RandomNumber"),
        length_unit: "CM",
        weight: Cypress.env("RandomNumber"),
        weight_unit: "KG",
        is_virtual: Cypress.env("randomBoolean"),
        is_sellable: Cypress.env("randomBoolean"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "id", `{id} is invalid`);
    });
  });

  it("Alphabet are provided instead of item_id doesn't exist", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${Cypress.env("Random")}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [
          {
            id: Cypress.env("colorId"),
          },
        ],
        item_grid: [
          {
            id: resItemGrid_I[0],
          },
          {
            id: resItemGrid_I[1],
          },
        ],
        sell_price: Cypress.env("RandomNumber"),
        height: Cypress.env("RandomNumber"),
        length: Cypress.env("RandomNumber"),
        width: Cypress.env("RandomNumber"),
        length_unit: "CM",
        weight: Cypress.env("RandomNumber"),
        weight_unit: "KG",
        is_virtual: Cypress.env("randomBoolean"),
        is_sellable: Cypress.env("randomBoolean"),
        status: Cypress.env("randomBoolean"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id");
    });
  });

  it("Test case when item_id doesn't associate with item_color_id", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_P}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [
          {
            id: Cypress.env("colorId")
          }
        ],
        item_grid: [
          {
            id: resItemGrid_I[0],
          }
        ]
      },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "item_id", `{item_id} is not associated with {color_list_id}`);
    });
  });

  it("Test case when item_id doesn't associate with item_grid_id", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [
          {
            id: Cypress.env("colorId"),
          },
        ],
        item_grid: [
          {
            id: resItemGrid_P[0],
          }
        ]
      },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "item_id", `{item_id} is not associated with {item_grid_id}`);
    });
  });

  it("Test case when item_color_id doesn't exist", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [
          {
            id: Cypress.env("RandomNumber")
          }
        ],
        item_grid: [
          {
            id: resItemGrid_I[0]
          }
        ]
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "item_id", `{item_id} is not associated with {color_list_id}`);
    });
  });

  it("Test case when item_grid_id doesn't exist", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [
          {
            id: Cypress.env("colorId")
          }
        ],
        item_grid: [
          {
            id: Cypress.env("RandomNumber")
          }
        ]
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "item_id", `{item_id} is not associated with {item_grid_id}`);
    });
  });

  it("color_list and item_grid must contain atleast one value", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [],
        item_grid: []
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "color_list", `{color_list} must contain at least 1 items`);
      expect(body.error.errorDetails).has.property(
        "item_grid", `{item_grid} must contain at least 1 items`);
    });
  });

  it("Test case when color_list object are blank", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [{}],
        item_grid: [
          {
            id: resItemGrid_I[0]
          }
        ]

      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "id", `"id" is required`);
    });
  });

  it("Test case when item_grid object are blank", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [
          {
            id: Cypress.env("colorId")
          }
        ],
        item_grid: [{}]
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "id", `"id" is required`);
    });
  });

  it("sell_price, height, length, width, weight, is_virtual, is_sellable and status should be number", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [
          {
            id: Cypress.env("colorId")
          }
        ],
        item_grid: [
          {
            id: resItemGrid_I[0]
          }
        ],
        sell_price: Cypress.env("RandomNum"),
        height: Cypress.env("RandomNum"),
        length: Cypress.env("RandomNum"),
        width: Cypress.env("RandomNum"),
        weight: Cypress.env("RandomNum"),
        is_virtual: Cypress.env("RandomNum"),
        is_sellable: Cypress.env("RandomNum"),
        status: Cypress.env("RandomNum"),
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "sell_price", `{sell_price} must be a number`);
      expect(body.error.errorDetails).has.property(
        "height", `{height} must be a number`);
      expect(body.error.errorDetails).has.property(
        "length", `{length} must be a number`);
      expect(body.error.errorDetails).has.property(
        "width", `{width} must be a number`);
      expect(body.error.errorDetails).has.property(
        "weight", `{weight} must be a number`);
      expect(body.error.errorDetails).has.property(
        "is_virtual", `{is_virtual} must be a number`);
      expect(body.error.errorDetails).has.property(
        "is_sellable", `{is_sellable} must be a number`);
      expect(body.error.errorDetails).has.property(
        "status", `{status} must be a number`);
    });
  });

  it("is_virtual, is_sellable and status must be one of [0 and 1]", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [
          {
            id: Cypress.env("colorId")
          }
        ],
        item_grid: [
          {
            id: resItemGrid_I[0]
          }
        ],
        is_virtual: Cypress.env("RandomNumber"),
        is_sellable: Cypress.env("RandomNumber"),
        status: Cypress.env("RandomNumber")
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "is_virtual", `{is_virtual} must be one of [1, 0]`);
      expect(body.error.errorDetails).has.property(
        "is_sellable", `{is_sellable} must be one of [1, 0]`);
      expect(body.error.errorDetails).has.property(
        "status", `{status} must be one of [1, 0]`);
    });
  });

  it("length_unit and weight_unit should be string", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}v1/item/${resItemId_I}/color`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        color_list: [
          {
            id: Cypress.env("colorId")
          },
        ],
        item_grid: [
          {
            id: resItemGrid_I[0],
          },
          {
            id: resItemGrid_I[1],
          },
        ],
        length_unit: Cypress.env("RandomNumber"),
        weight_unit: Cypress.env("RandomNumber")
      },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "length_unit", `{length_unit} must be a string`);
      expect(body.error.errorDetails).has.property(
        "weight_unit", `{weight_unit} must be a string`);
    });
  });
});
