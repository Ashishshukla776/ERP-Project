import routes from "../../support/route";
import store_msg from "../../support/store_msg";

before(() => {
  cy.GetCompanyToken();
  cy.Get_itemId_I();
  cy.Get_itemId_P();
  cy.Get_itemId_S();
  cy.Get_config("Decimal");
});
beforeEach(() => {
  cy.RandomNum_2();
  cy.RandomNum();
  cy.RandomNumber();
  cy.Random();
  cy.randomBoolean();
  blank_req =req_csku({item_id: "", color_id:""})
  check_item = req_csku({ item_id: Cypress.env("RandomNumber") })
  check_color = req_csku({ color_id: Cypress.env("RandomNumber") })
  boolean_req =  req_csku({
    is_virtual: Cypress.env("RandomNum_2"),
    is_sellable: Cypress.env("RandomNum_2"),
    status: Cypress.env("RandomNum_2"),
  });
  number_req = req_csku({
    item_id: Cypress.env("RandomNum"),
    color_id: Cypress.env("RandomNum"),
    sell_price: Cypress.env("RandomNum"),
    height: Cypress.env("RandomNum"),
    length: Cypress.env("RandomNum"),
    width: Cypress.env("RandomNum"),
    weight: Cypress.env("RandomNum"),
    is_virtual: Cypress.env("RandomNum"),
    is_sellable: Cypress.env("RandomNum"),
    status: Cypress.env("RandomNum")
  });
});

let resCsku_id: Number[];
let color_id: Number[];
let blank_req
let check_item
let check_color
let boolean_req
let number_req

function req_csku(payload,ignoredata=[]){
  let reqBody = {
    item_id: payload.hasOwnProperty("item_id")?payload.item_id :Cypress.env("ItemId_I"),
    color_id: payload.hasOwnProperty("color_id")?payload.color_id :color_id,
    upc: payload.hasOwnProperty("upc")?payload.upc :Cypress.env("Random"),
    length_unit: payload.hasOwnProperty("length_unit")?payload.length_unit :"CM",
    weight_unit:payload.hasOwnProperty("weight_unit")?payload.weight_unit : "KG",
    sell_price: payload.hasOwnProperty("sell_price")?payload.sell_price :Cypress.env("RandomNum_2"),
    height: payload.hasOwnProperty("height")?payload.height :Cypress.env("RandomNum_2"),
    length:payload.hasOwnProperty("length")?payload.length : Cypress.env("RandomNum_2"),
    width: payload.hasOwnProperty("width")?payload.width :Cypress.env("RandomNum_2"),
    weight: payload.hasOwnProperty("weight")?payload.weight :Cypress.env("RandomNum_2"),
    is_virtual: payload.hasOwnProperty("is_virtual")?payload.is_virtual :Cypress.env("randomBoolean"),
    is_sellable: payload.hasOwnProperty("is_sellable")?payload.is_sellable :Cypress.env("randomBoolean"),
    status: payload.hasOwnProperty("status")?payload.status :1
  };
  ignoredata.forEach((itemrow)=>{
    delete reqBody[itemrow];
  })
  return reqBody
}

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {
 
  it("Test cases for create csku", () => {
    cy.request({
      method: routes.post,
      url: routes.post_color,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        code: Cypress.env("Random"),
        name: Cypress.env("Random"),
        status: 1,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      color_id = body.result.data.id;
      let requestData = req_csku({});
      cy.request({
        method: routes.post,
        url: routes.post_csku,
        headers: { Authorization:Cypress.env("companyToken") },
        body: requestData,
      }).then(({ body }) => {
        resCsku_id = body.result.data.map((elem: any) => elem.id);
        let req_sellPrice = requestData.sell_price.toString();
        expect(requestData).has.property("item_id", requestData.item_id);
        expect(requestData).has.property("color_id", requestData.color_id);
        cy.Success(body);
        body.result.data.forEach((ele: any) => {
          expect(ele).has.property("backlog_sales");
          expect(ele).has.property("backlog_purch");
          expect(ele).has.property("id");
          expect(ele).has.property("created_date");
          expect(ele).has.property("created_by");
          expect(ele).has.property("upc").that.to.be.equal(requestData.upc);
          expect(ele).has.property("length_unit",requestData.length_unit)
          expect(ele).has.property("weight_unit",requestData.weight_unit)
          if(Cypress.env("meta_value")>0){
            req_sellPrice = requestData.sell_price.toFixed(Cypress.env("meta_value"))
          }else{
            req_sellPrice = requestData.sell_price.toFixed(Cypress.env("def_metaValue"))
          }
          expect(ele).has.property("sell_price",req_sellPrice)
          expect(ele).has.property("height",requestData.height)
          expect(ele).has.property("length",requestData.length)
          expect(ele).has.property("width").that.to.be.equal(requestData.width);
          expect(ele).has.property("weight",requestData.weight);
          expect(ele).has.property("is_virtual",requestData.is_virtual)
          expect(ele).has.property("is_sellable",requestData.is_sellable)
          expect(ele).has.property("status",requestData.status)
          expect(ele).has.property("item_color_id");
          expect(ele).has.property("item_grid_id");
        });
      });
    });
  });

  it("Test cases for create csku when optional field are not provided", () => {
    cy.request({
      method: routes.post,
      url: routes.post_color,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        code: Cypress.env("Random"),
        name: Cypress.env("Random"),
        status: 1,
      },
    }).then(({ body }) => {
      let colorId = body.result.data.id;
      let requestData = {
        item_id: Cypress.env("ItemId_I"),
        color_id: colorId
      };
      cy.request({
        method: routes.post,
        url: routes.post_csku,
        headers: { Authorization:Cypress.env("companyToken") },
        body: requestData
      }).then(({ body }) => {
        expect(requestData).has.property("item_id", requestData.item_id);
        expect(requestData).has.property("color_id", requestData.color_id);
        cy.Success(body);
        body.result.data.forEach((ele: any) => {
          expect(ele).has.property("sell_price");
          expect(ele).has.property("height");
          expect(ele).has.property("length");
          expect(ele).has.property("width");
          expect(ele).has.property("weight");
          expect(ele).has.property("backlog_sales");
          expect(ele).has.property("backlog_purch");
          expect(ele).has.property("is_virtual");
          expect(ele).has.property("is_sellable");
          expect(ele).has.property("status");
          expect(ele).has.property("id");
          expect(ele).has.property("created_date");
          expect(ele).has.property("created_by");
          expect(ele).has.property("item_color_id");
          expect(ele).has.property("item_grid_id");
        });
      });
    });
  });

  it("Test cases for create csku when optional field are blank", () => {
    let requestData = req_csku({
      item_id :Cypress.env("ItemId_P"),
      upc: "",
      length_unit: "",
      weight_unit: "",
      sell_price: "",
      height: "",
      length: "",
      width: "",
      weight: ""
    });
    cy.request({
      method: routes.post,
        url: routes.post_csku,
        headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(requestData).has.property("item_id", requestData.item_id);
      expect(requestData).has.property("color_id", requestData.color_id);
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("backlog_sales");
        expect(ele).has.property("backlog_purch");
        expect(ele).has.property("id");
        expect(ele).has.property("created_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("upc",requestData.upc);
        expect(ele).has.property("length_unit",requestData.length_unit);
        expect(ele).has.property("weight_unit", requestData.weight_unit);
        expect(ele).has.property("sell_price");
        expect(ele).has.property("height");
        expect(ele).has.property("length");
        expect(ele).has.property("width");
        expect(ele).has.property("weight");
        expect(ele).has.property("is_virtual",requestData.is_virtual)
        expect(ele).has.property("is_sellable",requestData.is_sellable)
        expect(ele).has.property("status",requestData.status)
        expect(ele).has.property("item_color_id");
        expect(ele).has.property("item_grid_id");
      });
    });
  });

  it("Test cases for create csku when optional field are null", () => {
    let requestData = req_csku({
      item_id :Cypress.env("ItemId_S"),
      upc: null,
      length_unit: null,
      weight_unit: null,
      sell_price: null,
      height: null,
      length: null,
      width: null,
      weight: null
    });
    cy.request({
      method: routes.post,
      url: routes.post_csku,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      expect(requestData).has.property("item_id", requestData.item_id);
      expect(requestData).has.property("color_id", requestData.color_id);
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("backlog_sales");
        expect(ele).has.property("backlog_purch");
        expect(ele).has.property("id");
        expect(ele).has.property("created_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("upc");
        expect(ele).has.property("length_unit");
        expect(ele).has.property("weight_unit");
        expect(ele).has.property("sell_price");
        expect(ele).has.property("height");
        expect(ele).has.property("length");
        expect(ele).has.property("width");
        expect(ele).has.property("weight");
        expect(ele).has.property("is_virtual",requestData.is_virtual)
        expect(ele).has.property("is_sellable",requestData.is_sellable)
        expect(ele).has.property("status",requestData.status)
        expect(ele).has.property("item_color_id");
        expect(ele).has.property("item_grid_id");
      });
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {

  it("Test cases When do not provide required field for update API", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_csku}${resCsku_id[0]}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {}
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("item_color_id");
      expect(body.result.data).has.property("item_grid_id");
      expect(body.result.data).has.property("upc");
      expect(body.result.data).has.property("length_unit");
      expect(body.result.data).has.property("weight_unit");
      expect(body.result.data).has.property("sell_price");
      expect(body.result.data).has.property("height");
      expect(body.result.data).has.property("length");
      expect(body.result.data).has.property("width");
      expect(body.result.data).has.property("weight");
      expect(body.result.data).has.property("backlog_sales");
      expect(body.result.data).has.property("backlog_purch");
      expect(body.result.data).has.property("is_virtual");
      expect(body.result.data).has.property("is_sellable");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
    });
  });

  it("Test cases When option  field are blank", () => {
    let requestData = req_csku({
      upc: "",
      length_unit: "",
      weight_unit: "",
      sell_price: "",
      height: "",
      length: "",
      width: "",
      weight: ""
    });
    cy.request({
      method: routes.put,
      url: `${routes.post_csku}${resCsku_id[0]}`,
      headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("item_color_id");
      expect(body.result.data).has.property("item_grid_id");
      expect(body.result.data).has.property("upc",requestData.upc);
      expect(body.result.data).has.property("length_unit",requestData.length_unit);
      expect(body.result.data).has.property("weight_unit", requestData.weight_unit);
      expect(body.result.data).has.property("sell_price");
      expect(body.result.data).has.property("height");
      expect(body.result.data).has.property("length");
      expect(body.result.data).has.property("width");
      expect(body.result.data).has.property("weight");
      expect(body.result.data).has.property("backlog_sales");
      expect(body.result.data).has.property("backlog_purch");
      expect(body.result.data).has.property("is_virtual",requestData.is_virtual)
      expect(body.result.data).has.property("is_sellable",requestData.is_sellable)
      expect(body.result.data).has.property("status",requestData.status)
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
    });
  });

  it("Test cases When option  field are null", () => {
    let requestData = req_csku({
      upc: null,
      length_unit: null,
      weight_unit: null,
      sell_price: null,
      height: null,
      length: null,
      width: null,
      weight: null
    });
    cy.request({
      method: routes.put,
      url: `${routes.post_csku}${resCsku_id[0]}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("item_color_id");
      expect(body.result.data).has.property("item_grid_id");
      expect(body.result.data).has.property("upc",requestData.upc);
      expect(body.result.data).has.property("length_unit",requestData.length_unit);
      expect(body.result.data).has.property("weight_unit", requestData.weight_unit);
      expect(body.result.data).has.property("sell_price");
      expect(body.result.data).has.property("height");
      expect(body.result.data).has.property("length");
      expect(body.result.data).has.property("width");
      expect(body.result.data).has.property("weight");
      expect(body.result.data).has.property("backlog_sales");
      expect(body.result.data).has.property("backlog_purch");
      expect(body.result.data).has.property("is_virtual",requestData.is_virtual)
      expect(body.result.data).has.property("is_sellable",requestData.is_sellable)
      expect(body.result.data).has.property("status",requestData.status)
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
    });
  });

  it("Test case for when optional field are not provided", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_csku}${resCsku_id[0]}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        item_id: Cypress.env("ItemId_I"),
        color_id: color_id
      }
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("item_color_id");
      expect(body.result.data).has.property("item_grid_id");
      expect(body.result.data).has.property("upc");
      expect(body.result.data).has.property("length_unit");
      expect(body.result.data).has.property("weight_unit");
      expect(body.result.data).has.property("sell_price");
      expect(body.result.data).has.property("height");
      expect(body.result.data).has.property("length");
      expect(body.result.data).has.property("width");
      expect(body.result.data).has.property("weight");
      expect(body.result.data).has.property("backlog_sales");
      expect(body.result.data).has.property("backlog_purch");
      expect(body.result.data).has.property("is_virtual");
      expect(body.result.data).has.property("is_sellable");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
    });
  });

  it("Test case for when required field are not provided", () => {
    let requestData = req_csku({},["item_id","color_id"]);
    cy.request({
      method: routes.put,
      url: `${routes.post_csku}${resCsku_id[0]}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let req_sellPrice = requestData.sell_price.toString();
      cy.Success(body);
      expect(body.result.data).has.property("id", body.result.data.id);
      expect(body.result.data).has.property("item_color_id");
      expect(body.result.data).has.property("item_grid_id");
      expect(body.result.data).has.property("upc",requestData.upc)
      expect(body.result.data).has.property("length_unit",requestData.length_unit)
      expect(body.result.data).has.property("weight_unit",requestData.weight_unit)
      if(Cypress.env("meta_value")>0){
        req_sellPrice = requestData.sell_price.toFixed(Cypress.env("meta_value"))
      }else{
        req_sellPrice = requestData.sell_price.toFixed(Cypress.env("def_metaValue"))
      }
      expect(body.result.data).has.property("sell_price",req_sellPrice)
      expect(body.result.data).has.property("height",requestData.height)
      expect(body.result.data).has.property("length",requestData.length)
      expect(body.result.data).has.property("width",requestData.width)
      expect(body.result.data).has.property("weight",requestData.weight)
      expect(body.result.data).has.property("backlog_sales");
      expect(body.result.data).has.property("backlog_purch");
      expect(body.result.data).has.property("is_virtual",requestData.is_virtual)
      expect(body.result.data).has.property("is_sellable",requestData.is_sellable)
      expect(body.result.data).has.property("status",requestData.status)
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
    });
  });

  it("Test case for update API with all field", () => {
    let requestData = req_csku({});
    cy.request({
      method: routes.put,
      url: `${routes.post_csku}${resCsku_id[0]}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      let req_sellPrice = requestData.sell_price.toString();
      expect(requestData).has.property("item_id", requestData.item_id);
      expect(requestData).has.property("color_id", requestData.color_id);
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("item_color_id");
      expect(body.result.data).has.property("item_grid_id");
      expect(body.result.data).has.property("upc",requestData.upc)
      expect(body.result.data).has.property("length_unit",requestData.length_unit)
      expect(body.result.data).has.property("weight_unit",requestData.weight_unit)
      if(Cypress.env("meta_value")>0){
        req_sellPrice = requestData.sell_price.toFixed(Cypress.env("meta_value"))
      }else{
        req_sellPrice = requestData.sell_price.toFixed(Cypress.env("def_metaValue"))
      }
      expect(body.result.data).has.property("sell_price",req_sellPrice)
      expect(body.result.data).has.property("height",requestData.height)
      expect(body.result.data).has.property("length",requestData.length)
      expect(body.result.data).has.property("width",requestData.width)
      expect(body.result.data).has.property("weight",requestData.weight)
      expect(body.result.data).has.property("backlog_sales");
      expect(body.result.data).has.property("backlog_purch");
      expect(body.result.data).has.property("is_virtual",requestData.is_virtual)
      expect(body.result.data).has.property("is_sellable",requestData.is_sellable)
      expect(body.result.data).has.property("status",requestData.status)
      expect(body.result.data).has.property("created_date");
      expect(body.result.data).has.property("updated_date");
      expect(body.result.data).has.property("created_by");
      expect(body.result.data).has.property("updated_by");
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {

  it("Test case for fetch API", () => {
    let requestData = {
      search: [
        {
          key: "csku.id",
          operation: "=",
          val: resCsku_id[0],
        },
      ],
      searchOr: [
        {
          key: "csku.id",
          operation: "=",
          val: resCsku_id[0],
        },
      ],
      searchOrAnd: [
        {
          key: "csku.id",
          operation: "=",
          val: resCsku_id[0],
        },
      ],
      select: [
        "id",
        "height",
        "length",
        "width",
        "weight",
        "backlog_sales",
        "backlog_purch",
        "is_virtual",
        "is_sellable",
        "status",
        "upc",
        "length_unit",
        "weight_unit",
        "item_color_id",
        "item_grid_id",
        "csku.sell_price",
      ],
      sort: "csku.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    }
    cy.request({
      method: routes.post,
      url: `${routes.post_csku}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index) => {
        expect(ele).has.property("id", requestData.search[index].val);
        expect(ele).has.property("height");
        expect(ele).has.property("length");
        expect(ele).has.property("width");
        expect(ele).has.property("weight");
        expect(ele).has.property("backlog_sales");
        expect(ele).has.property("backlog_purch");
        expect(ele).has.property("is_virtual");
        expect(ele).has.property("is_sellable");
        expect(ele).has.property("status");
        expect(ele).has.property("upc");
        expect(ele).has.property("length_unit");
        expect(ele).has.property("weight_unit");
        expect(ele).has.property("item_color_id");
        expect(ele).has.property("item_grid_id");
        expect(ele).has.property("sell_price");
      });
      expect(body.result).has.property("page",requestData.page);
      expect(body.result).has.property("perPage",requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when do not provide any fields", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_csku}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("height");
        expect(ele).has.property("length");
        expect(ele).has.property("width");
        expect(ele).has.property("weight");
        expect(ele).has.property("backlog_sales");
        expect(ele).has.property("backlog_purch");
        expect(ele).has.property("is_virtual");
        expect(ele).has.property("is_sellable");
        expect(ele).has.property("status");
        expect(ele).has.property("upc");
        expect(ele).has.property("length_unit");
        expect(ele).has.property("weight_unit");
        expect(ele).has.property("sell_price");
        expect(ele).has.property("item_color_id");
        expect(ele).has.property("item_grid_id");
        expect(ele).has.property("row_num");
        expect(ele).has.property("row_name");
        expect(ele).has.property("col_num");
        expect(ele).has.property("col_name");
        expect(ele).has.property("nrf_code");
        expect(ele).has.property("color_id");
        expect(ele).has.property("csku_group_col_num");
        expect(ele).has.property("csku_group_row_num");
        expect(ele).has.property("ratio");
        expect(ele).has.property("sell_price");
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
        "id",
        "height",
        "length",
        "width",
        "weight",
        "backlog_sales",
        "backlog_purch",
        "is_virtual",
        "is_sellable",
        "status",
        "upc",
        "length_unit",
        "weight_unit",
        "item_color_id",
        "item_grid_id",
        "csku.sell_price",
      ],
      sort: "csku.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: `${routes.post_csku}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any,index) => {
        expect(ele).has.property("id");
        expect(ele).has.property("height");
        expect(ele).has.property("length");
        expect(ele).has.property("width");
        expect(ele).has.property("weight");
        expect(ele).has.property("backlog_sales");
        expect(ele).has.property("backlog_purch");
        expect(ele).has.property("is_virtual");
        expect(ele).has.property("is_sellable");
        expect(ele).has.property("status");
        expect(ele).has.property("upc");
        expect(ele).has.property("length_unit");
        expect(ele).has.property("weight_unit");
        expect(ele).has.property("item_color_id");
        expect(ele).has.property("item_grid_id");
        expect(ele).has.property("sell_price");
      });
      expect(body.result).has.property("page",requestData.page);
      expect(body.result).has.property("perPage",requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for fetch API when not provide select field", () => {
    let requestData = {
      search: [],
      searchOr: [],
      searchOrAnd: [],
      select: [],
      sort: "csku.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    }
    cy.request({
      method: routes.post,
      url: `${routes.post_csku}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: requestData,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((ele: any) => {
        expect(ele).has.property("id");
        expect(ele).has.property("created_date");
        expect(ele).has.property("updated_date");
        expect(ele).has.property("created_by");
        expect(ele).has.property("updated_by");
        expect(ele).has.property("height");
        expect(ele).has.property("length");
        expect(ele).has.property("width");
        expect(ele).has.property("weight");
        expect(ele).has.property("backlog_sales");
        expect(ele).has.property("backlog_purch");
        expect(ele).has.property("is_virtual");
        expect(ele).has.property("is_sellable");
        expect(ele).has.property("status");
        expect(ele).has.property("upc");
        expect(ele).has.property("length_unit");
        expect(ele).has.property("weight_unit");
        expect(ele).has.property("sell_price");
        expect(ele).has.property("item_color_id");
        expect(ele).has.property("item_grid_id");
        expect(ele).has.property("row_num");
        expect(ele).has.property("row_name");
        expect(ele).has.property("col_num");
        expect(ele).has.property("col_name");
        expect(ele).has.property("nrf_code");
        expect(ele).has.property("color_id");
        expect(ele).has.property("csku_group_col_num");
        expect(ele).has.property("csku_group_row_num");
        expect(ele).has.property("ratio");
        expect(ele).has.property("sell_price");
      });
      expect(body.result).has.property("page",requestData.page);
      expect(body.result).has.property("perPage",requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_csku}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "csku.id",
            operation: "=",
            val: Cypress.env("RandomNumber")
          }
        ],
        
        select: ["csku.id", "csku.upc", "csku.sell_price", "csku.status"],
        sort: "csku.id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Success(body);
    });
  });
});

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {
 
  it("Test cases When do not provide any field data", () => {
    cy.request({
      method: routes.post,
      url: routes.post_csku,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("item_id");
      expect(body.error.errorDetails).has.property("color_id");
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: routes.post,
      url: routes.post_csku,
   headers: { Authorization: Cypress.env("companyToken") },
      body:blank_req,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("item_id");
      expect(body.error.errorDetails).has.property("color_id");
    });
  });

  it("Test cases When item_id doesn't exist", () => {
    cy.request({
      method: routes.post,
      url: routes.post_csku,
   headers: { Authorization: Cypress.env("companyToken") },
      body: check_item,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "item_id","Either {item_id} is invalid or status could be inactive");
    });
  });

  it("Test cases When color_id doesn't exist", () => {
    cy.request({
      method: routes.post,
      url: routes.post_csku,
   headers: { Authorization: Cypress.env("companyToken") },
      body: check_color,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "color_id",`Either {color_id} is invalid or status could be inactive`);
    });
  });

  it("is_sellable, is_virtual and status must be one of [0,1]", () => {
    cy.request({
      method: routes.post,
      url: routes.post_csku,
   headers: { Authorization: Cypress.env("companyToken") },
      body: boolean_req,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("is_virtual");
      expect(body.error.errorDetails).has.property("is_sellable");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it(`item_id,color_id,sell_price,height,length,width,weight,is_virtual,is_sellable and
      status should be number`, () => {
    cy.request({
      method: routes.post,
      url: routes.post_csku,
   headers: { Authorization: Cypress.env("companyToken") },
      body: number_req,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("item_id");
      expect(body.error.errorDetails).has.property("color_id");
      expect(body.error.errorDetails).has.property("sell_price");
      expect(body.error.errorDetails).has.property("height");
      expect(body.error.errorDetails).has.property("length");
      expect(body.error.errorDetails).has.property("width");
      expect(body.error.errorDetails).has.property("is_virtual");
      expect(body.error.errorDetails).has.property("is_sellable");
      expect(body.error.errorDetails).has.property("status");
    });
  });

});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {

  it("Test cases When alphabet provides along with Id ", () => {
    cy.request({
      method:routes.put,
      url: `${routes.post_csku}${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.chk_id);
    });
  });

  it("Test cases When id doesn't exist", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_csku}${Cypress.env("RandomNumber")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {},
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.id);
    });
  });

  it("Test cases When required fields are empty", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_csku}${resCsku_id[0]}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: blank_req,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("item_id");
      expect(body.error.errorDetails).has.property("color_id");
    });
  });

  it("Test cases When item_id doesn't exist", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_csku}${resCsku_id[0]}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: check_item,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "item_id","Either {item_id} is invalid or status could be inactive");
    });
  });

  it("Test cases When color_id doesn't exist", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_csku}${resCsku_id[0]}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: check_color,
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "color_id",`Either {color_id} is invalid or status could be inactive`);
    });
  });

  it("is_sellable, is_virtual and status must be one of [0,1]", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_csku}${resCsku_id[0]}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: boolean_req,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("is_virtual");
      expect(body.error.errorDetails).has.property("is_sellable");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it(`item_id,color_id,sell_price,height,length,width,weight,is_virtual,is_sellable and
      status should be number`, () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_csku}${resCsku_id[0]}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: number_req,
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("item_id");
      expect(body.error.errorDetails).has.property("color_id");
      expect(body.error.errorDetails).has.property("sell_price");
      expect(body.error.errorDetails).has.property("height");
      expect(body.error.errorDetails).has.property("length");
      expect(body.error.errorDetails).has.property("width");
      expect(body.error.errorDetails).has.property("is_virtual");
      expect(body.error.errorDetails).has.property("is_sellable");
      expect(body.error.errorDetails).has.property("status");
    });
  });

});

describe(`${store_msg.success_log}${Cypress.spec["fileName"]}`, () => {

  it("Test cases for get-log API", () => {
    let today = new Date().toISOString().slice(0, 10);
    cy.request({
      method:routes.post,
      url: routes.get_log,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        module_name: "csku",
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
        perPage: 20
      }
    }).then(({ body }) => {
      cy.check_log(body);
    });
  });

  it("Test case for track-change-data API", () => {
    let recordId = resCsku_id[0].toString();
    cy.request({
      method:routes.post,
      url: routes.track_change,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        module: "csku",
        record_id: recordId,
        sort: "_id",
        orderby: "desc",
        page: 1,
        perPage: 20
      },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Track_change(body);
    });
  });

  it("Test case for look-up API", () => {
    let name = "csku";
    let obj = {
      statusCode: 200,
      success: true,
      error: null,
      result: {
        message: "Module fields fetched successfully",
        data: {
          fields: [
            "id",
            "item_color_id",
            "item_grid_id",
            "upc",
            "length_unit",
            "weight_unit",
            "sell_price",
            "height",
            "length",
            "width",
            "weight",
            "backlog_sales",
            "backlog_purch",
            "is_virtual",
            "is_sellable",
            "status",
            "created_date",
            "updated_date",
            "created_by",
            "updated_by",
          ],
          foreignKey: {
            item_color_id: {
              object: "item_color",
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
              item_grid_id: {
                object: "item_grid",
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
              },
            },
            child: {
              csku_group: {
                fields: [
                  "id",
                  "parent_csku_id",
                  "child_csku_id",
                  "row_num",
                  "col_num",
                  "ratio",
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
