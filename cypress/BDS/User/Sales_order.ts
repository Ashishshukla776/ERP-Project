import routes from "../../support/route";
import findDiscountOfOrder from "../../support/find_discount";
import store_msg from "../../support/store_msg";
import { so_lookUp } from "../../support/so_lookUp";

before(() => {
  cy.GetCompanyToken();
  cy.Get_config("Decimal");
  cy.GetCustomerId();
  cy.GetstoreId();
  cy.GetSalesPersonId();
  cy.GetdcId();
  cy.Getship_viaIdId();
  cy.GetDivisionId();
  cy.Get_deptId();
  cy.Get_termId();
  cy.GetFactorId();
  cy.Get_itemId_I();
  cy.Get_itemId_P();
  cy.Get_itemId_S();
  cy.date_formate();
});

beforeEach(() => {
  cy.RandomNum_2();
  cy.Random();
  cy.RandomNumber();
  cy.RandomNum_1();
  cy.RandomNum();
  cy.randomBoolean();
  cy.RandomDesc();
});

let resId_N: Number;
let opt_sales_id: Number;
let resId_B: Number;
let resId_D: Number;
var cskuId_I = [];
var cskuId_P = [];
var cskuId_S = [];
let resLineId_N = [];
let resvariantsId_N = [];
let resLineId_B = [];
let resvariantsId_B = [];
let resLineId_D = [];
let resvariantsId_D = [];
let resLineId_check: Number[];
let So_id: Number
let So_line_id: Number[]
let So_variant = []
let soCreateReq


function req_SO(payload, ignoredata = [], adddata = {}) {
  let reqBody = {
    order_type: payload.hasOwnProperty("order_type") ? payload.order_type : "N",
    order_date: payload.hasOwnProperty("order_date") ? payload.order_date : Cypress.env("date_formate"),
    start_date: payload.hasOwnProperty("start_date") ? payload.start_date : Cypress.env("date_formate"),
    cancel_date: payload.hasOwnProperty("cancel_date") ? payload.cancel_date : Cypress.env("date_formate"),
    order_hold: payload.hasOwnProperty("order_hold") ? payload.order_hold : Cypress.env("randomBoolean"),
    credit_hold: payload.hasOwnProperty("credit_hold") ? payload.credit_hold : Cypress.env("randomBoolean"),
    bulk_order_no: payload.hasOwnProperty("bulk_order_no") ? payload.bulk_order_no : Cypress.env("Random"),
    customer_id: payload.hasOwnProperty("customer_id") ? payload.customer_id : Cypress.env("cstId"),
    "purchase_order": payload.hasOwnProperty("purchase_order") ? payload.purchase_order : Cypress.env("Random"),
    "master_order": payload.hasOwnProperty("master_order") ? payload.master_order : Cypress.env("Random"),
    "internal_order": payload.hasOwnProperty("internal_order") ? payload.internal_order : Cypress.env("Random"),
    bill_to: payload.hasOwnProperty("bill_to") ? payload.bill_to : {
      contact_name: payload.hasOwnProperty("contact_name") ? payload.contact_name : Cypress.env("Random"),
      address_1: payload.hasOwnProperty("address_1") ? payload.address_1 : Cypress.env("Random"),
      address_2: payload.hasOwnProperty("address_2") ? payload.address_2 : Cypress.env("Random"),
      address_3: payload.hasOwnProperty("address_3") ? payload.address_3 : Cypress.env("Random"),
      address_4: payload.hasOwnProperty("address_4") ? payload.address_4 : Cypress.env("Random"),
      city: payload.hasOwnProperty("city") ? payload.city : Cypress.env("Random"),
      state: payload.hasOwnProperty("state") ? payload.state : Cypress.env("Random"),
      zip: payload.hasOwnProperty("zip") ? payload.zip : Cypress.env("Random"),
      country: payload.hasOwnProperty("country") ? payload.country : Cypress.env("Random")
    },
    store_id: payload.hasOwnProperty("store_id") ? payload.store_id : Cypress.env("storeId"),
    ship_to_dc: payload.hasOwnProperty("ship_to_dc") ? payload.ship_to_dc : Cypress.env("randomBoolean"),
    dc_id: payload.hasOwnProperty("dc_id") ? payload.dc_id : Cypress.env("dcId"),
    ship_to: payload.hasOwnProperty("ship_to") ? payload.ship_to : {
      contact_name: payload.hasOwnProperty("contact_name") ? payload.contact_name : Cypress.env("Random"),
      address_1: payload.hasOwnProperty("address_1") ? payload.address_1 : Cypress.env("Random"),
      address_2: payload.hasOwnProperty("address_2") ? payload.address_2 : Cypress.env("Random"),
      address_3: payload.hasOwnProperty("address_3") ? payload.address_3 : Cypress.env("Random"),
      address_4: payload.hasOwnProperty("address_4") ? payload.address_4 : Cypress.env("Random"),
      city: payload.hasOwnProperty("city") ? payload.city : Cypress.env("Random"),
      state: payload.hasOwnProperty("state") ? payload.state : Cypress.env("Random"),
      zip: payload.hasOwnProperty("zip") ? payload.zip : Cypress.env("Random"),
      country: payload.hasOwnProperty("country") ? payload.country : Cypress.env("Random")
    },
    ship_via_id: payload.hasOwnProperty("ship_via_id") ? payload.ship_via_id : Cypress.env("ship_viaId"),
    division_id: payload.hasOwnProperty("division_id") ? payload.division_id : Cypress.env("divisionId"),
    department_id: payload.hasOwnProperty("department_id") ? payload.department_id : Cypress.env("deptId"),
    factor_id: payload.hasOwnProperty("factor_id") ? payload.factor_id : Cypress.env("factorId"),
    sales_person: payload.hasOwnProperty("sales_person") ? payload.sales_person : [
      {
        id: payload.hasOwnProperty("id") ? payload.id : Cypress.env("salesId")
      },
      {
        id: payload.hasOwnProperty("id") ? payload.id : Cypress.env("salesId_1")
      },
    ],
    term_id: payload.hasOwnProperty("term_id") ? payload.term_id : Cypress.env("termId"),
    special_instruction: payload.hasOwnProperty("special_instruction") ? payload.special_instruction : Cypress.env("Random"),
    freight_amount: payload.hasOwnProperty("freight_amount") ? payload.freight_amount : 249.99,
    status: payload.hasOwnProperty("status") ? payload.status : 1,
    lines: payload.hasOwnProperty("lines") ? payload.lines : findDiscountOfOrder([{
      line: payload.hasOwnProperty("line") ? payload.line : 1,
      item_id: payload.hasOwnProperty("item_id") ? payload.item_id : Cypress.env("ItemId_I"),
      color_id: payload.hasOwnProperty("color_id") ? payload.color_id : Cypress.env("resColorId_I"),
      discount_rate: payload.hasOwnProperty("discount_rate") ? payload.discount_rate : Cypress.env("RandomNum_1"),
      commissions: [
        {
          sales_person_id: payload.hasOwnProperty("sales_person_id") ? payload.sales_person_id : Cypress.env("salesId"),
          commission_rate: payload.hasOwnProperty("commission_rate") ? payload.commission_rate : Cypress.env("RandomNum_2"),
          commission_amt: payload.hasOwnProperty("commission_amt") ? payload.commission_amt : Cypress.env("RandomNum_2"),
        },
        {
          sales_person_id: payload.hasOwnProperty("sales_person_id") ? payload.sales_person_id : Cypress.env("salesId_1"),
          commission_rate: payload.hasOwnProperty("commission_rate") ? payload.commission_rate : Cypress.env("RandomNum_2"),
          commission_amt: payload.hasOwnProperty("commission_amt") ? payload.commission_amt : Cypress.env("RandomNum_2"),
        },
      ],
      variants: [
        {
          csku_id: payload.hasOwnProperty("csku_id") ? payload.csku_id : cskuId_I[0],
          qty: payload.hasOwnProperty("qty") ? payload.qty : Cypress.env("RandomNumber"),
          price: payload.hasOwnProperty("price") ? payload.price : Cypress.env("RandomNum_2"),
          discount: payload.hasOwnProperty("discount") ? payload.discount : Cypress.env("RandomNum_2")
        },
        {
          csku_id: payload.hasOwnProperty("csku_id") ? payload.csku_id : cskuId_I[1],
          qty: payload.hasOwnProperty("qty") ? payload.qty : Cypress.env("RandomNumber"),
          price: payload.hasOwnProperty("price") ? payload.price : Cypress.env("RandomNum_2"),
          discount: payload.hasOwnProperty("discount") ? payload.discount : Cypress.env("RandomNum_2")
        },
      ],
    },
    {
      line: payload.hasOwnProperty("line") ? payload.line : 2,
      item_id: payload.hasOwnProperty("item_id") ? payload.item_id : Cypress.env("ItemId_P"),
      color_id: payload.hasOwnProperty("color_id") ? payload.color_id : Cypress.env("resColorId_P"),
      discount_rate: payload.hasOwnProperty("discount_rate") ? payload.discount_rate : Cypress.env("RandomNum_1"),
      commissions: [
        {
          sales_person_id: payload.hasOwnProperty("sales_person_id") ? payload.sales_person_id : Cypress.env("salesId"),
          commission_rate: payload.hasOwnProperty("commission_rate") ? payload.commission_rate : Cypress.env("RandomNum_2"),
          commission_amt: payload.hasOwnProperty("commission_amt") ? payload.commission_amt : Cypress.env("RandomNum_2"),
        },
        {
          sales_person_id: payload.hasOwnProperty("sales_person_id") ? payload.sales_person_id : Cypress.env("salesId_1"),
          commission_rate: payload.hasOwnProperty("commission_rate") ? payload.commission_rate : Cypress.env("RandomNum_2"),
          commission_amt: payload.hasOwnProperty("commission_amt") ? payload.commission_amt : Cypress.env("RandomNum_2"),
        }
      ],
      variants: [
        {
          csku_id: payload.hasOwnProperty("csku_id") ? payload.csku_id : cskuId_P[0],
          qty: payload.hasOwnProperty("qty") ? payload.qty : Cypress.env("RandomNumber"),
          price: payload.hasOwnProperty("price") ? payload.price : Cypress.env("RandomNum_2"),
          discount: payload.hasOwnProperty("discount") ? payload.discount : Cypress.env("RandomNum_2")
        }
      ]
    }
    ])
  }
  ignoredata.forEach((itemrow) => {
    delete reqBody[itemrow];
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

function soCreateResp(res) {
  expect(res).has.property("order_no");
  expect(res).has.property("order_type", soCreateReq.order_type);
  expect(res).has.property("order_date", soCreateReq.order_date);
  expect(res).has.property("start_date", soCreateReq.start_date);
  expect(res).has.property("cancel_date", soCreateReq.cancel_date);
  expect(res).has.property("order_hold", soCreateReq.order_hold);
  expect(res).has.property("credit_hold", soCreateReq.credit_hold);
  if (soCreateReq.bulk_order_no > 0 || soCreateReq.hasOwnProperty("bulk_order_no")) {
    expect(res).has.property("bulk_order_no", soCreateReq.bulk_order_no);
  } else { expect(res).has.property("bulk_order_no") }

  if (soCreateReq.special_instruction > 0 || soCreateReq.hasOwnProperty("special_instruction")) {
    expect(res).has.property("special_instruction", soCreateReq.special_instruction);
  } else { expect(res).has.property("special_instruction") }
  expect(res).has.property("total_amount");

  if (soCreateReq.hasOwnProperty("freight_amount")) {
    if (soCreateReq.freight_amount > 0) {
      let req_freight = soCreateReq.freight_amount.toString();
      if (Cypress.env("meta_value") > 0) { req_freight = soCreateReq.freight_amount.toFixed(Cypress.env("meta_value")) }
      else { req_freight = soCreateReq.freight_amount.toFixed(Cypress.env("def_metaValue")) }
      expect(res).has.deep.property("freight_amount", req_freight)
    }
    else { expect(res).has.property("freight_amount") }
  }
  else { expect(res).has.property("freight_amount") }
  expect(res).has.property("total_discount");
  expect(res).has.property("total_quantity");
  expect(res).has.property("grand_total");
  if (soCreateReq.purchase_order > 0 || soCreateReq.hasOwnProperty("purchase_order")) {
    expect(res).has.property("purchase_order", soCreateReq.purchase_order);
  } else { expect(res).has.property("purchase_order") }

  if (soCreateReq.master_order > 0 || soCreateReq.hasOwnProperty("master_order")) {
    expect(res).has.property("master_order", soCreateReq.master_order);
  } else { expect(res).has.property("master_order") }

  if (soCreateReq.internal_order > 0 || soCreateReq.hasOwnProperty("internal_order")) {
    expect(res).has.property("internal_order", soCreateReq.internal_order);
  } else { expect(res).has.property("internal_order") }
  expect(res).has.property("customer_id", soCreateReq.customer_id);
  expect(res).has.property("customer_code");
  expect(res).has.property("customer_name");
  expect(res).has.property("store_id", soCreateReq.store_id);
  expect(res).has.property("store_code");
  expect(res).has.property("ship_to_dc", soCreateReq.ship_to_dc);
  expect(res).has.property("dc_id", soCreateReq.dc_id);
  expect(res).has.property("dc_code");
  expect(res).has.property("ship_via_id", soCreateReq.ship_via_id);
  expect(res).has.property("ship_via_code");
  expect(res).has.property("ship_via_name");
  expect(res).has.property("division_id", soCreateReq.division_id);
  expect(res).has.property("division_code");
  expect(res).has.property("division_name");
  if (soCreateReq.hasOwnProperty("department_id")) {
    if (soCreateReq.department_id == null) { expect(res).has.property("department_id") }
    else if (soCreateReq.department_id == "") { expect(res).has.property("department_id") }
    else { expect(res).has.deep.property("department_id", soCreateReq.department_id) }
  } else { expect(res).has.property("department_id") }
  expect(res).has.property("department_code");
  expect(res).has.property("department_name");
  if (soCreateReq.hasOwnProperty("factor_id")) {
    if (soCreateReq.factor_id == null) { expect(res).has.property("factor_id") }
    else if (soCreateReq.factor_id == "") { expect(res).has.property("factor_id") }
    else { expect(res).has.deep.property("factor_id", soCreateReq.factor_id) }
  } else { expect(res).has.property("factor_id") }
  expect(res).has.property("factor_code");
  expect(res).has.property("factor_name");
  if (soCreateReq.hasOwnProperty("term_id")) {
    if (soCreateReq.term_id == null) { expect(res).has.property("term_id") }
    else if (soCreateReq.term_id == "") { expect(res).has.property("term_id") }
    else { expect(res).has.deep.property("term_id", soCreateReq.term_id) }
  } else { expect(res).has.property("term_id") }
  expect(res).has.property("term_code");
  expect(res).has.property("term_code");
  expect(res.bill_to).has.property("contact_name", soCreateReq.bill_to.contact_name);
  expect(res.bill_to).has.property("address_1", soCreateReq.bill_to.address_1);
  if (soCreateReq.bill_to.hasOwnProperty("address_2")) {
    if (soCreateReq.bill_to.address_2 == null) { expect(res.bill_to).has.property("address_2") }
    else if (soCreateReq.bill_to.address_2 == "") { expect(res.bill_to).has.property("address_2") }
    else { expect(res.bill_to).has.deep.property("address_2", soCreateReq.bill_to.address_2) }
  } else { expect(res.bill_to).has.property("address_2") }
  if (soCreateReq.bill_to.hasOwnProperty("address_3")) {
    if (soCreateReq.bill_to.address_3 == null) { expect(res.bill_to).has.property("address_3") }
    else if (soCreateReq.bill_to.address_3 == "") { expect(res.bill_to).has.property("address_3") }
    else { expect(res.bill_to).has.deep.property("address_3", soCreateReq.bill_to.address_3) }
  } else { expect(res.bill_to).has.property("address_3") }
  if (soCreateReq.bill_to.hasOwnProperty("address_4")) {
    if (soCreateReq.bill_to.address_4 == null) { expect(res.bill_to).has.property("address_4") }
    else if (soCreateReq.bill_to.address_4 == "") { expect(res.bill_to).has.property("address_4") }
    else { expect(res.bill_to).has.deep.property("address_4", soCreateReq.bill_to.address_4) }
  } else { expect(res.bill_to).has.property("address_4") }
  expect(res.bill_to).has.property("city", soCreateReq.bill_to.city);
  expect(res.bill_to).has.property("state", soCreateReq.bill_to.state);
  expect(res.bill_to).has.property("zip", soCreateReq.bill_to.zip);
  expect(res.bill_to).has.property("country", soCreateReq.bill_to.country);
  expect(res.ship_to).has.property("contact_name", soCreateReq.ship_to.contact_name);
  expect(res.ship_to).has.property("address_1", soCreateReq.ship_to.address_1);

  if (soCreateReq.ship_to.hasOwnProperty("address_2")) {
    if (soCreateReq.ship_to.address_2 == null) { expect(res.ship_to).has.property("address_2") }
    else if (soCreateReq.ship_to.address_2 == "") { expect(res.ship_to).has.property("address_2") }
    else { expect(res.ship_to).has.deep.property("address_2", soCreateReq.ship_to.address_2) }
  } else { expect(res.ship_to).has.property("address_2") }

  if (soCreateReq.ship_to.hasOwnProperty("address_3")) {
    if (soCreateReq.ship_to.address_3 == null) { expect(res.ship_to).has.property("address_3") }
    else if (soCreateReq.ship_to.address_3 == "") { expect(res.ship_to).has.property("address_3") }
    else { expect(res.ship_to).has.deep.property("address_3", soCreateReq.ship_to.address_3) }
  } else { expect(res.ship_to).has.property("address_3") }

  if (soCreateReq.ship_to.hasOwnProperty("address_4")) {
    if (soCreateReq.ship_to.address_4 == null) { expect(res.ship_to).has.property("address_4") }
    else if (soCreateReq.ship_to.address_4 == "") { expect(res.ship_to).has.property("address_4") }
    else { expect(res.ship_to).has.deep.property("address_4", soCreateReq.ship_to.address_4) }
  } else { expect(res.ship_to).has.property("address_4") }

  expect(res.ship_to).has.property("city", soCreateReq.ship_to.city);
  expect(res.ship_to).has.property("state", soCreateReq.ship_to.state);
  expect(res.ship_to).has.property("zip", soCreateReq.ship_to.zip);
  expect(res.ship_to).has.property("country", soCreateReq.ship_to.country);
  res.sales_person.forEach((ele, index) => {
    expect(ele).has.property("id");
    expect(ele).has.property("code");
    expect(ele).has.property("name");
  });
  res.lines.forEach((element: any, index: any) => {
    let resline = soCreateReq.lines[index];
    expect(element).has.property("id");
    expect(element).has.property("line", resline.line);

    if (resline.hasOwnProperty("discount_rate")) {
      if (resline.discount_rate > 0) {
        expect(element).has.deep.property("discount_rate", resline.discount_rate);
      } else {
        expect(element).has.property("discount_rate")
      }
    } else {
      expect(element).has.property("discount_rate")
    }
    expect(element).has.property("item_id", resline.item_id);
    expect(element).has.property("item_code");
    expect(element).has.property("item_name");
    expect(element).has.property("color_id", resline.color_id);
    expect(element).has.property("color_code");
    expect(element).has.property("color_name");
    element.variants.forEach((element1: any, in_index: any) => {
      expect(element1).has.property("id");
      expect(element1).has.property("csku_id");
      expect(element1).has.property("qty");
      expect(element1).has.property("price");
      expect(element1).has.property("discount");
      expect(element1).has.property("row_num");
      expect(element1).has.property("row_name");
      expect(element1).has.property("col_num");
      expect(element1).has.property("col_name");
      expect(element1).has.property("item_grid_id");
    });
    element.commissions.forEach((element2: any, inn_index: any) => {
      expect(element2).has.property("sales_person_id");
      expect(element2).has.property("sales_person_code");
      expect(element2).has.property("sales_person_name");
      expect(element2).has.property("commission_rate");
      expect(element2).has.property("commission_amt");
    });
  });
}

function soFetchResp(result) {
  result.data.forEach((element) => {
    expect(element).has.property("id");
    expect(element).has.property("order_no");
    expect(element).has.property("company_id");
    expect(element).has.property("division_id");
    expect(element).has.property("factor_id");
    expect(element).has.property("department_id");
    expect(element).has.property("ship_via_id");
    expect(element).has.property("term_id");
    expect(element).has.property("customer_id");
    expect(element).has.property("order_type");
    expect(element).has.property("order_date");
    expect(element).has.property("start_date");
    expect(element).has.property("cancel_date");
    expect(element).has.property("order_hold");
    expect(element).has.property("credit_hold");
    expect(element).has.property("bulk_order_no");
    expect(element).has.property("purchase_order");
    expect(element).has.property("master_order");
    expect(element).has.property("internal_order");
    expect(element).has.property("store_id");
    expect(element).has.property("ship_to_dc");
    expect(element).has.property("created_date");
    expect(element).has.property("updated_date");
    expect(element).has.property("created_by");
    expect(element).has.property("updated_by");
    expect(element).has.property("status");
    expect(element).has.property("dc_id");
    expect(element).has.property("total_amount");
    expect(element).has.property("freight_amount");
    expect(element).has.property("total_discount");
    expect(element).has.property("grand_total");
    expect(element).has.property("total_quantity");
    expect(element).has.property("special_instruction");
    expect(element).has.property("name");
    expect(element).has.property("org_id");
    expect(element).has.property("fax");
    expect(element).has.property("telephone");
    expect(element).has.property("email");
    expect(element).has.property("mongo_id");
    expect(element).has.property("company_address");
    expect(element).has.property("ein_cin");
    expect(element).has.property("state_id");
    expect(element).has.property("division_name");
    expect(element).has.property("division_code");
    expect(element).has.property("dba");
    expect(element).has.property("def_factor_id");
    expect(element).has.property("factor_name");
    expect(element).has.property("factor_code");
    expect(element).has.property("factor_account_number");
    expect(element).has.property("factor_company_id");
    expect(element).has.property("customer_department_code");
    expect(element).has.property("customer_department_name");
    expect(element).has.property("customer_department_description");
    expect(element).has.property("ship_via_code");
    expect(element).has.property("ship_via_name");
    expect(element).has.property("ship_via_description");
    expect(element).has.property("ship_via_scac_code");
    expect(element).has.property("terms_code");
    expect(element).has.property("terms_name");
    expect(element).has.property("terms_is_prepaid");
    expect(element).has.property("terms_description");
    expect(element).has.property("term_netdays");
    expect(element).has.property("discount");
    expect(element).has.property("months");
    expect(element).has.property("cutoffday");
    expect(element).has.property("customers_code");
    expect(element).has.property("customers_name");
    expect(element).has.property("customers_retail_type_id");
    expect(element).has.property("customers_master_code");
  });
  expect(result).has.property("page");
  expect(result).has.property("perPage");
  expect(result).has.property("totalRecords");
}

describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {

  it(`Test case when order_type is N`, () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_item}${Cypress.env("ItemId_I")}/color/${Cypress.env(
        "resColorId_I")}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cskuId_I = body.result.data.map((element: any) => element.id);
      cy.request({
        method: routes.get,
        url: `${routes.post_item}${Cypress.env("ItemId_P")}/color/${Cypress.env(
          "resColorId_P"
        )}`,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        cskuId_P = body.result.data.map((element: any) => element.id);
        soCreateReq = req_SO({});
        cy.request({
          method: routes.post,
          url: routes.post_SO,
          body: soCreateReq,
          headers: { Authorization: Cypress.env("companyToken") }
        }).then(({ body }) => {
          resId_N = body.result.data.id;
          resLineId_N = body.result.data.lines.map((ele: any) => ele.id);
          let variantsId_N = body.result.data.lines.forEach((ele: any) => {
            ele.variants.forEach((elem: any) => {
              resvariantsId_N.push(elem.id);
            });
          });
          cy.Success(body)
          soCreateResp(body.result.data)
        });
      });
    });
  });

  it(`Test case when order_type is B and optional fields are not provided`, () => {
    soCreateReq = {
      order_type: "B",
      order_date: Cypress.env("date_formate"),
      start_date: Cypress.env("date_formate"),
      cancel_date: Cypress.env("date_formate"),
      order_hold: Cypress.env("randomBoolean"),
      credit_hold: Cypress.env("randomBoolean"),
      customer_id: Cypress.env("cstId"),
      bill_to: {
        contact_name: Cypress.env("Random"),
        address_1: Cypress.env("Random"),
        city: Cypress.env("Random"),
        state: Cypress.env("Random"),
        zip: Cypress.env("Random"),
        country: Cypress.env("Random")
      },
      store_id: Cypress.env("storeId"),
      ship_to_dc: Cypress.env("randomBoolean"),
      dc_id: Cypress.env("dcId"),
      ship_to: {
        contact_name: Cypress.env("Random"),
        address_1: Cypress.env("Random"),
        city: Cypress.env("Random"),
        state: Cypress.env("Random"),
        zip: Cypress.env("Random"),
        country: Cypress.env("Random")
      },
      ship_via_id: Cypress.env("ship_viaId"),
      division_id: Cypress.env("divisionId"),
      sales_person: [
        {
          id: Cypress.env("salesId")
        },
        {
          id: Cypress.env("salesId_1")
        }
      ],

      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_P"),
          color_id: Cypress.env("resColorId_P"),
          commissions: [
            {
              sales_person_id: Cypress.env("salesId"),
              commission_rate: 5,
              commission_amt: 500,
            },
            {
              sales_person_id: Cypress.env("salesId_1"),
              commission_rate: 10,
              commission_amt: 1000
            }
          ],
          variants: [
            {
              csku_id: cskuId_P[0],
              qty: 100,
              price: 0
            },
            {
              csku_id: cskuId_P[1],
              qty: 100,
              price: Cypress.env("RandomNum_2")
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: soCreateReq,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      resId_B = body.result.data.id;
      resLineId_B = body.result.data.lines.map((ele: any) => ele.id);
      let variantsId_B = body.result.data.lines.forEach((ele: any) => {
        ele.variants.forEach((elem: any) => {
          resvariantsId_B.push(elem.id);
        });
      });
      cy.Success(body)
      soCreateResp(body.result.data)
    });
  });

  it(`Test cases when order_type is D`, () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_item}${Cypress.env("ItemId_S")}/color/${Cypress.env(
        "ColorId_S"
      )}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cskuId_S = body.result.data.map((element: any) => element.id);
      soCreateReq = req_SO({ order_type: "D" });
      cy.request({
        method: routes.post,
        url: routes.post_SO,
        body: soCreateReq,
        headers: { Authorization: Cypress.env("companyToken") },
      }).then(({ body }) => {
        resId_D = body.result.data.id;
        resLineId_D = body.result.data.lines.map((ele) => ele.id);
        let variantsId_D = body.result.data.lines.forEach((ele) => {
          ele.variants.forEach((elem) => {
            resvariantsId_D.push(elem.id);
          });
        });
        cy.Success(body)
        soCreateResp(body.result.data)
      });
    });
  });

  it(`Test cases When sales_person and commissions fields are not provided and 
      optional field are left null`, () => {
    soCreateReq = req_SO({
      "purchase_order": null,
      "master_order": null,
      "internal_order": null,
      bill_to: {
        contact_name: Cypress.env("Random"),
        address_1: Cypress.env("Random"),
        address_2: null,
        address_3: null,
        address_4: null,
        city: Cypress.env("Random"),
        state: Cypress.env("Random"),
        zip: Cypress.env("Random"),
        country: Cypress.env("Random"),
      },
      ship_to: {
        contact_name: Cypress.env("Random"),
        address_1: Cypress.env("Random"),
        address_2: null,
        address_3: null,
        address_4: null,
        city: Cypress.env("Random"),
        state: Cypress.env("Random"),
        zip: Cypress.env("Random"),
        country: Cypress.env("Random"),
      },
      department_id: null,
      factor_id: null,
      term_id: null,
      special_instruction: null,
      freight_amount: null,
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          discount_rate: null,
          variants: [
            {
              csku_id: cskuId_I[0],
              qty: Cypress.env("RandomNum_2"),
              price: Cypress.env("RandomNum_2"),
              discount: null
            },
            {
              csku_id: cskuId_I[1],
              qty: Cypress.env("RandomNum_2"),
              price: Cypress.env("RandomNum_2"),
              discount: null
            },
          ],
        }
      ]
    }, ["sales_person"]);
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: soCreateReq,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      opt_sales_id = body.result.data.id;
      resLineId_check = body.result.data.lines.map((ele: any) => ele.id);
      cy.Success(body)
      soCreateResp(body.result.data)
    });
  });

  it("Test cases When sales_person array,commissions array and optional field are left blank", () => {
    soCreateReq = req_SO({
      "purchase_order": "",
      "master_order": "",
      "internal_order": "",
      bill_to: {
        contact_name: Cypress.env("Random"),
        address_1: Cypress.env("Random"),
        address_2: "",
        address_3: "",
        address_4: "",
        city: Cypress.env("Random"),
        state: Cypress.env("Random"),
        zip: Cypress.env("Random"),
        country: Cypress.env("Random"),
      },
      ship_to: {
        contact_name: Cypress.env("Random"),
        address_1: Cypress.env("Random"),
        address_2: "",
        address_3: "",
        address_4: "",
        city: Cypress.env("Random"),
        state: Cypress.env("Random"),
        zip: Cypress.env("Random"),
        country: Cypress.env("Random"),
      },
      department_id: "",
      factor_id: "",
      sales_person: [],
      term_id: "",
      special_instruction: "",
      freight_amount: "",
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          discount_rate: "",
          commissions: [],
          variants: [
            {
              csku_id: cskuId_I[0],
              qty: Cypress.env("RandomNum_2"),
              price: Cypress.env("RandomNum_2"),
              discount: ""
            }
          ],
        }
      ]
    });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: soCreateReq,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      So_id = body.result.data.id;
      So_line_id = body.result.data.lines.map((ele: any) => ele.id);
      let So_variant_id = body.result.data.lines.forEach((ele: any) => {
        ele.variants.forEach((elem: any) => {
          So_variant.push(elem.id);
        });
      });
      cy.Success(body)
      soCreateResp(body.result.data)
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {

  it("Test case for UPDATE Sales_order API When sales_person and commissions fields are not provided", () => {
    let requestData = {
      order_type: "N",
      order_date: Cypress.env("date_formate"),
      start_date: Cypress.env("date_formate"),
      cancel_date: Cypress.env("date_formate"),
      order_hold: Cypress.env("randomBoolean"),
      credit_hold: Cypress.env("randomBoolean"),
      bulk_order_no: Cypress.env("Random"),
      customer_id: Cypress.env("cstId"),
      "purchase_order": Cypress.env("Random"),
      "master_order": Cypress.env("Random"),
      "internal_order": Cypress.env("Random"),
      bill_to: {
        contact_name: Cypress.env("Random"),
        address_1: Cypress.env("Random"),
        address_2: Cypress.env("Random"),
        address_3: Cypress.env("Random"),
        address_4: Cypress.env("Random"),
        city: Cypress.env("Random"),
        state: Cypress.env("Random"),
        zip: Cypress.env("Random"),
        country: Cypress.env("Random"),
      },
      store_id: Cypress.env("storeId"),
      ship_to_dc: Cypress.env("randomBoolean"),
      dc_id: Cypress.env("dcId"),
      ship_to: {
        contact_name: Cypress.env("Random"),
        address_1: Cypress.env("Random"),
        city: Cypress.env("Random"),
        state: Cypress.env("Random"),
        zip: Cypress.env("Random"),
        country: Cypress.env("Random"),
      },
      ship_via_id: Cypress.env("ship_viaId"),
      division_id: Cypress.env("divisionId"),
      department_id: Cypress.env("deptId"),
      factor_id: Cypress.env("factorId"),
      term_id: Cypress.env("termId"),
      special_instruction: Cypress.env("Random"),
      freight_amount: Cypress.env("RandomNum_2"),
      lines: findDiscountOfOrder([
        {
          line: 1,
          id: resLineId_N[0],
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          discount_rate: Cypress.env("RandomNum_1"),
          variants: [
            {
              id: resvariantsId_N[0],
              csku_id: cskuId_I[0],
              qty: Cypress.env("RandomNum_2"),
              price: Cypress.env("RandomNum_2"),
              discount: Cypress.env("RandomNum_2")
            }
          ]
        }
      ])
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.SO_SuccessGetResp(body);
    });
  });

  it("Test case for UPDATE Sales_order API when do not provide any field", () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: {},
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.SO_SuccessGetResp(body);
    });
  });

  it("Test case for UPDATE Sales_order API When variants object are not provided", () => {
    let requestData = {
      lines: [
        {
          id: resLineId_N[0],
          variants: []
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.SO_SuccessGetResp(body);
    });
  });

  it("Test cases When lines object are not provided", () => {
    let requestData = { lines: [] };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.SO_SuccessGetResp(body);
    });
  });

  it("Data should be update with only lines_id", () => {
    let requestData = {
      lines: [
        {
          id: resLineId_N[0],
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.SO_SuccessGetResp(body);
    });
  });

  it("Test cases When lines fields are not provided", () => {
    let requestData = {
      order_type: "N",
      order_date: Cypress.env("date_formate"),
      start_date: Cypress.env("date_formate"),
      cancel_date: Cypress.env("date_formate"),
      order_hold: Cypress.env("randomBoolean"),
      credit_hold: Cypress.env("randomBoolean"),
      bulk_order_no: Cypress.env("Random"),
      customer_id: Cypress.env("cstId"),
      "purchase_order": Cypress.env("Random"),
      "master_order": Cypress.env("Random"),
      "internal_order": Cypress.env("Random"),
      bill_to: {
        contact_name: Cypress.env("Random"),
        address_1: Cypress.env("Random"),
        address_2: Cypress.env("Random"),
        address_3: Cypress.env("Random"),
        address_4: Cypress.env("Random"),
        city: Cypress.env("Random"),
        state: Cypress.env("Random"),
        zip: Cypress.env("Random"),
        country: Cypress.env("Random"),
      },
      store_id: Cypress.env("storeId"),
      ship_to_dc: Cypress.env("randomBoolean"),
      dc_id: Cypress.env("dcId"),
      ship_to: {
        contact_name: Cypress.env("Random"),
        address_1: Cypress.env("Random"),
        city: Cypress.env("Random"),
        state: Cypress.env("Random"),
        zip: Cypress.env("Random"),
        country: Cypress.env("Random"),
      },
      ship_via_id: Cypress.env("ship_viaId"),
      division_id: Cypress.env("divisionId"),
      department_id: Cypress.env("deptId"),
      factor_id: Cypress.env("factorId"),
      sales_person: [
        {
          id: Cypress.env("salesId"),
        },
        {
          id: Cypress.env("salesId_1"),
        },
      ],
      term_id: Cypress.env("termId"),
      special_instruction: Cypress.env("Random"),
      freight_amount: Cypress.env("RandomNum_2")
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.SO_SuccessGetResp(body);
    });
  });

  it("Test cases When variants fields are not provided", () => {
    let requestData = {
      lines: [
        {
          line: 1,
          id: resLineId_N[0],
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          discount_rate: 9.99
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.SO_SuccessGetResp(body);
    });
  });

  it("Data should be update with only varients_id", () => {
    let requestData = {
      lines: [
        {
          id: resLineId_N[0],
          variants: [
            {
              id: resvariantsId_N[0]
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.SO_SuccessGetResp(body);
    });
  });

  it("Test cases When optional field are blank", () => {
    let requestData = {
      bulk_order_no: "",
      "purchase_order": "",
      "master_order": "",
      "internal_order": "",
      bill_to: {
        address_2: "",
        address_3: "",
        address_4: "",
      },

      ship_to: {
        address_2: "",
        address_3: "",
        address_4: "",
      },
      department_id: "",
      factor_id: "",

      term_id: "",
      special_instruction: "",
      freight_amount: "",
      lines: [
        {
          id: resLineId_N[0],
          discount_rate: "",
          variants: [
            {
              id: resvariantsId_N[0],
              discount: ""
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.SO_SuccessGetResp(body);
    });
  });

  it("Test cases When optional field are null", () => {
    let requestData = {
      bulk_order_no: null,
      "purchase_order": null,
      "master_order": null,
      "internal_order": null,
      bill_to: {
        address_2: null,
        address_3: null,
        address_4: null,
      },
      ship_to: {
        address_2: null,
        address_3: null,
        address_4: null,
      },
      department_id: null,
      factor_id: null,

      term_id: null,
      special_instruction: null,
      freight_amount: null,
      lines: [
        {
          id: resLineId_N[0],
          discount_rate: null,
          variants: [
            {
              id: resvariantsId_N[0],
              discount: null
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.SO_SuccessGetResp(body);
    });
  });

  it("Test cases When required fields are not provide", () => {
    let requestData = {
      bulk_order_no: Cypress.env("Random"),
      "purchase_order": Cypress.env("Random"),
      "master_order": Cypress.env("Random"),
      "internal_order": Cypress.env("Random"),
      bill_to: {
        address_2: Cypress.env("Random"),
        address_3: Cypress.env("Random"),
        address_4: Cypress.env("Random"),
      },
      ship_to: {
        address_2: Cypress.env("Random"),
        address_3: Cypress.env("Random"),
        address_4: Cypress.env("Random"),
      },
      department_id: Cypress.env("deptId"),
      factor_id: Cypress.env("factorId"),
      term_id: Cypress.env("termId"),
      special_instruction: Cypress.env("Random"),
      freight_amount: 149.99,
      lines: [
        {
          id: resLineId_N[0],
          variants: [
            {
              id: resvariantsId_N[0],
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.SO_SuccessGetResp(body);
    });
  });

  it("Test case for UPDATE Sales_order API with all field", () => {
    soCreateReq = {
      order_type: "N",
      order_date: Cypress.env("date_formate"),
      start_date: Cypress.env("date_formate"),
      cancel_date: Cypress.env("date_formate"),
      order_hold: Cypress.env("randomBoolean"),
      credit_hold: Cypress.env("randomBoolean"),
      bulk_order_no: Cypress.env("Random"),
      customer_id: Cypress.env("cstId"),
      "purchase_order": Cypress.env("Random"),
      "master_order": Cypress.env("Random"),
      "internal_order": Cypress.env("Random"),
      bill_to: {
        contact_name: Cypress.env("Random"),
        address_1: Cypress.env("Random"),
        address_2: Cypress.env("Random"),
        address_3: Cypress.env("Random"),
        address_4: Cypress.env("Random"),
        city: Cypress.env("Random"),
        state: Cypress.env("Random"),
        zip: Cypress.env("Random"),
        country: Cypress.env("Random"),
      },
      store_id: Cypress.env("storeId"),
      ship_to_dc: Cypress.env("randomBoolean"),
      dc_id: Cypress.env("dcId"),
      ship_to: {
        contact_name: Cypress.env("Random"),
        address_1: Cypress.env("Random"),
        address_2: Cypress.env("Random"),
        address_3: Cypress.env("Random"),
        address_4: Cypress.env("Random"),
        city: Cypress.env("Random"),
        state: Cypress.env("Random"),
        zip: Cypress.env("Random"),
        country: Cypress.env("Random"),
      },
      ship_via_id: Cypress.env("ship_viaId"),
      division_id: Cypress.env("divisionId"),
      department_id: Cypress.env("deptId"),
      factor_id: Cypress.env("factorId"),
      sales_person: [
        {
          id: Cypress.env("salesId"),
        },
        {
          id: Cypress.env("salesId_1"),
        },
      ],
      term_id: Cypress.env("termId"),
      special_instruction: Cypress.env("RandomDesc"),
      freight_amount: Cypress.env("RandomNum_2"),
      lines: findDiscountOfOrder([
        {
          line: 1,
          id: resLineId_N[0],
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          discount_rate: Cypress.env("RandomNum_1"),
          commissions: [
            {
              sales_person_id: Cypress.env("salesId"),
              commission_rate: Cypress.env("RandomNum_1"),
              commission_amt: Cypress.env("RandomNum_2")
            },
            {
              sales_person_id: Cypress.env("salesId_1"),
              commission_rate: Cypress.env("RandomNum_1"),
              commission_amt: Cypress.env("RandomNum_2")
            },
          ],
          variants: [
            {
              id: resvariantsId_N[0],
              csku_id: cskuId_I[0],
              qty: Cypress.env("RandomNum_2"),
              price: Cypress.env("RandomNum_2"),
              discount: Cypress.env("RandomNum_2")
            },
            {
              id: resvariantsId_N[1],
              csku_id: cskuId_I[1],
              qty: Cypress.env("RandomNum_2"),
              price: Cypress.env("RandomNum_2"),
              discount: Cypress.env("RandomNum_2")
            },
          ],
        },
        {
          line: 2,
          id: resLineId_N[1],
          item_id: Cypress.env("ItemId_P"),
          color_id: Cypress.env("resColorId_P"),
          discount_rate: 19.99,
          commissions: [
            {
              sales_person_id: Cypress.env("salesId"),
              commission_rate: Cypress.env("RandomNum_1"),
              commission_amt: Cypress.env("RandomNum_2")
            },
            {
              sales_person_id: Cypress.env("salesId_1"),
              commission_rate: Cypress.env("RandomNum_1"),
              commission_amt: Cypress.env("RandomNum_2")
            },
          ],
          variants: [
            {
              id: resvariantsId_N[2],
              csku_id: cskuId_P[0],
              qty: Cypress.env("RandomNum_2"),
              price: Cypress.env("RandomNum_2"),
              discount: Cypress.env("RandomNum_2")
            },
          ],
        },
      ])
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: soCreateReq,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body)
      soCreateResp(body.result.data)
      // expect(body).has.property("statusCode", 200);
      // expect(body).has.property("success", true);
      // expect(body).has.property("error", null);
      // expect(body).has.property("result");
      // expect(body.result).has.property("message");
      // expect(body.result).has.property("data");
      // expect(body.result.data).has.property("id");
      // expect(body.result.data).has.property("order_no");
      // expect(body.result.data).has.property(
      //   "order_type",
      //   requestData.order_type
      // );
      // expect(body.result.data).has.property(
      //   "order_date",
      //   requestData.order_date
      // );
      // expect(body.result.data).has.property(
      //   "start_date",
      //   requestData.start_date
      // );
      // expect(body.result.data).has.property(
      //   "cancel_date",
      //   requestData.cancel_date
      // );
      // expect(body.result.data).has.property(
      //   "order_hold",
      //   requestData.order_hold
      // );
      // expect(body.result.data).has.property(
      //   "credit_hold",
      //   requestData.credit_hold
      // );
      // expect(body.result.data).has.property(
      //   "bulk_order_no",
      //   requestData.bulk_order_no
      // );
      // expect(body.result.data).has.property(
      //   "special_instruction",
      //   requestData.special_instruction
      // );
      // expect(body.result.data).has.property("total_amount");
      // let req_freight = requestData.freight_amount.toString();
      // if(Cypress.env("meta_value")>0){
      //   req_freight = requestData.freight_amount.toFixed(Cypress.env("meta_value"))
      // }else{
      //   req_freight = requestData.freight_amount.toFixed(Cypress.env("def_metaValue"))
      // }
      // expect(body.result.data).has.deep.property("freight_amount",req_freight);
      // expect(body.result.data).has.property("total_discount");
      // expect(body.result.data).has.property("total_quantity");
      // expect(body.result.data).has.property("grand_total");
      // expect(body.result.data).has.property("purchase_order",requestData.purchase_order).be.string;
      // expect(body.result.data).has.property("master_order",requestData.master_order).be.string;
      // expect(body.result.data).has.property("internal_order",requestData.internal_order).be.string;
      // expect(body.result.data).has.property(
      //   "customer_id",
      //   requestData.customer_id
      // );
      // expect(body.result.data).has.property("customer_code");
      // expect(body.result.data).has.property("customer_name");
      // expect(body.result.data).has.property("store_id", requestData.store_id);
      // expect(body.result.data).has.property("store_code");
      // expect(body.result.data).has.property(
      //   "ship_to_dc",
      //   requestData.ship_to_dc
      // );
      // expect(body.result.data).has.property("dc_id", requestData.dc_id);
      // expect(body.result.data).has.property("dc_code");
      // expect(body.result.data).has.property(
      //   "ship_via_id",
      //   requestData.ship_via_id
      // );
      // expect(body.result.data).has.property("ship_via_code");
      // expect(body.result.data).has.property("ship_via_name");
      // expect(body.result.data).has.property(
      //   "division_id",
      //   requestData.division_id
      // );
      // expect(body.result.data).has.property("division_code");
      // expect(body.result.data).has.property("division_name");
      // expect(body.result.data).has.property(
      //   "department_id",
      //   requestData.department_id
      // );
      // expect(body.result.data).has.property("department_code");
      // expect(body.result.data).has.property("department_name");
      // expect(body.result.data).has.property("factor_id", requestData.factor_id);
      // expect(body.result.data).has.property("factor_code");
      // expect(body.result.data).has.property("factor_name");
      // expect(body.result.data).has.property("term_id", requestData.term_id);
      // expect(body.result.data).has.property("term_code");
      // expect(body.result.data).has.property("term_code");
      // expect(body.result.data.bill_to).has.property(
      //   "contact_name",
      //   requestData.bill_to.contact_name
      // );
      // expect(body.result.data.bill_to).has.property(
      //   "address_1",
      //   requestData.bill_to.address_1
      // );
      // expect(body.result.data.bill_to).has.property(
      //   "address_2",
      //   requestData.bill_to.address_2
      // );
      // expect(body.result.data.bill_to).has.property(
      //   "address_3",
      //   requestData.bill_to.address_3
      // );
      // expect(body.result.data.bill_to).has.property(
      //   "address_4",
      //   requestData.bill_to.address_4
      // );
      // expect(body.result.data.bill_to).has.property(
      //   "city",
      //   requestData.bill_to.city
      // );
      // expect(body.result.data.bill_to).has.property(
      //   "state",
      //   requestData.bill_to.state
      // );
      // expect(body.result.data.bill_to).has.property(
      //   "zip",
      //   requestData.bill_to.zip
      // );
      // expect(body.result.data.bill_to).has.property(
      //   "country",
      //   requestData.bill_to.country
      // );
      // expect(body.result.data.ship_to).has.property(
      //   "contact_name",
      //   requestData.ship_to.contact_name
      // );
      // expect(body.result.data.ship_to).has.property(
      //   "address_1",
      //   requestData.ship_to.address_1
      // );
      // expect(body.result.data.ship_to).has.property(
      //   "address_2",
      //   requestData.ship_to.address_2
      // );
      // expect(body.result.data.ship_to).has.property(
      //   "address_3",
      //   requestData.ship_to.address_3
      // );
      // expect(body.result.data.ship_to).has.property(
      //   "address_4",
      //   requestData.ship_to.address_4
      // );
      // expect(body.result.data.ship_to).has.property(
      //   "city",
      //   requestData.ship_to.city
      // );
      // expect(body.result.data.ship_to).has.property(
      //   "state",
      //   requestData.ship_to.state
      // );
      // expect(body.result.data.ship_to).has.property(
      //   "zip",
      //   requestData.ship_to.zip
      // );
      // expect(body.result.data.ship_to).has.property(
      //   "country",
      //   requestData.ship_to.country
      // );
      // body.result.data.sales_person.forEach((ele, index) => {
      //   expect(ele).has.property("id");
      //   expect(ele).has.property("code");
      //   expect(ele).has.property("name");
      // });
      // body.result.data.lines.forEach((element: any, index: any) => {
      //   expect(element).has.property("id");
      //   expect(element).has.property("line", requestData.lines[index].line);        
      //   expect(element).has.property("discount_rate", requestData.lines[index].discount_rate);
      //   expect(element).has.property(
      //     "item_id",
      //     requestData.lines[index].item_id
      //   );
      //   expect(element).has.property("item_code");
      //   expect(element).has.property("item_name");
      //   expect(element).has.property(
      //     "color_id",
      //     requestData.lines[index].color_id
      //   );
      //   expect(element).has.property("color_code");
      //   expect(element).has.property("color_name");
      //   element.variants.forEach((element1: any, in_index: any) => {
      //     expect(element1).has.property("id");
      //     expect(element1).has.property("csku_id");
      //     expect(element1).has.property("qty");
      //     expect(element1).has.property("price");
      //     expect(element1).has.property("discount");
      //     expect(element1).has.property("row_num");
      //     expect(element1).has.property("row_name");
      //     expect(element1).has.property("col_num");
      //     expect(element1).has.property("col_name");
      //     expect(element1).has.property("item_grid_id");
      //   });
      //   element.commissions.forEach((element2: any, inn_index: any) => {
      //     expect(element2).has.property("sales_person_id");
      //     expect(element2).has.property("sales_person_code");
      //     expect(element2).has.property("sales_person_name");
      //     expect(element2).has.property("commission_rate");
      //     expect(element2).has.property("commission_amt");
      //   });
      // });
    });
  });

});

describe(`${store_msg.success_get}${Cypress.spec["fileName"]}`, () => {
  it("Test case for GET sales_order API when order_type is N", () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_SO}${resId_N}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.SO_SuccessGetResp(body);
    });
  });

  it("Test case for GET sales_order API when order_type is B", () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_SO}${resId_B}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.SO_SuccessGetResp(body);
    });
  });

  it("Test case for GET sales_order API when order_type is D", () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_SO}${resId_N}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.SO_SuccessGetResp(body);
    });
  });
});

describe(`${store_msg.success}${"print PDF and print EXCEL"} of ${Cypress.spec["fileName"]}`, () => {
  it("Test case for print sales_order-PDF when order_type is N", () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_SO}${resId_N}/print/pdf`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("url");
    });
  });

  it("Test case for print sales_order-PDF when order_type is B", () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_SO}${resId_B}/print/pdf`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("url");
    });
  });

  it("Test case for print sales_order-PDF when order_type is D", () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_SO}${resId_D}/print/pdf`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("url");
    });
  });

  it("Test case for print sales_order-PDF when optional field are not provided for sales_order", () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_SO}${opt_sales_id}/print/pdf`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("url");
    });
  });

  it("Test case for print sales_order-EXCEL when order_type is N", () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_SO}${resId_N}/print/excel`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("url");
    });
  });

  it("Test case for print sales_order-EXCEL when order_type is B", () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_SO}${resId_B}/print/excel`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("url");
    });
  });

  it("Test case for print sales_order-EXCEL when order_type is D", () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_SO}${resId_D}/print/excel`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("url");
    });
  });

  it("Test case for print sales_order-EXCEL when optional field are not provided for sales_order", () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_SO}${opt_sales_id}/print/excel`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("url");
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {
  it("Test case for FETCH API when order_type is D", () => {
    let req = {
      search: [
        {
          key: "sales_order.id",
          operation: "=",
          val: resId_D,
        },
      ],
      searchOr: [
        {
          key: "sales_order.id",
          operation: "=",
          val: resId_D,
        },
      ],
      searchOrAnd: [
        {
          key: "sales_order.id",
          operation: "=",
          val: resId_D,
        },
      ],
      select: [
        "sales_order.id as sales_order_id",
        "company.id as company_id",
        "order_no",
        "order_type",
        "order_date",
        "start_date",
        "cancel_date",
        "order_hold",
        "credit_hold",
        "bulk_order_no",
        "factor_id",
        "factor.name as factor_name",
        "factor.code as factor_code",
        "division_id",
        "division.name as division_name",
        "division.code as division_code",
      ],
      sort: "sales_order.id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_SO,
      body: req,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body)
      body.result.data.forEach((element: any, index: any) => {
        expect(element).has.property("sales_order_id", req.search[index].val)
        expect(element).has.property("company_id")
        expect(element).has.property("order_no")
        expect(element).has.property("order_type")
        expect(element).has.property("order_date")
        expect(element).has.property("start_date")
        expect(element).has.property("cancel_date")
        expect(element).has.property("order_hold")
        expect(element).has.property("credit_hold")
        expect(element).has.property("bulk_order_no")
        expect(element).has.property("factor_id")
        expect(element).has.property("factor_name")
        expect(element).has.property("factor_code")
        expect(element).has.property("division_id")
        expect(element).has.property("division_name")
        expect(element).has.property("division_code")
      });
      expect(body.result).has.property("page", req.page)
      expect(body.result).has.property("perPage", req.perPage)
      expect(body.result).has.property("totalRecords")
    })
  });

  it("Test case for FETCH API when do not provide any fields", () => {
    cy.request({
      method: routes.post,
      url: routes.fetch_SO,
      body: {},
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body)
      soFetchResp(body.result)
    });
  });

  it("Test case for FETCH API when not provide search field", () => {
    let requestData = {
      search: [],
      select: [
        "sales_order.id as sales_order_id",
        "company.id as company_id",
        "order_no",
        "order_type",
        "order_date",
        "start_date",
        "cancel_date",
        "order_hold",
        "credit_hold",
        "bulk_order_no",
        "factor_id",
        "factor.name as factor_name",
        "factor.code as factor_code",
        "division_id",
        "division.name as division_name",
        "division.code as division_code",
      ],
      sort: "sales_order.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body)
      body.result.data.forEach((element: any) => {
        expect(element).has.property("sales_order_id");
        expect(element).has.property("company_id");
        expect(element).has.property("order_no");
        expect(element).has.property("order_type");
        expect(element).has.property("order_date");
        expect(element).has.property("start_date");
        expect(element).has.property("cancel_date");
        expect(element).has.property("order_hold");
        expect(element).has.property("credit_hold");
        expect(element).has.property("bulk_order_no");
        expect(element).has.property("factor_id");
        expect(element).has.property("factor_name");
        expect(element).has.property("factor_code");
        expect(element).has.property("division_id");
        expect(element).has.property("division_name");
        expect(element).has.property("division_code");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for FETCH API when not provide search and select field", () => {
    let requestData = {
      search: [],
      select: [],
      sort: "sales_order.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body)
      soFetchResp(body.result)
    });
  });

  it("Test case for FETCH API when not provide select field", () => {
    let requestData = {
      search: [
        {
          key: "sales_order.id",
          operation: "=",
          val: resId_N,
        },
      ],
      select: [],
      sort: "sales_order.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body)
      soFetchResp(body.result)
    });
  });

  it("Test case for FETCH when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: routes.fetch_SO,
      headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "sales_order.id",
            operation: "=",
            val: Cypress.env("RandomNumber")
          }
        ],
        select: ["sales_order.id as sales_order_id"],
        sort: "sales_order.id",
        orderby: "desc",
        page: 1,
        perPage: 20
      },
    }).then(({ body }) => {
      cy.Success(body);
    });
  });
});

describe(`${store_msg.success_log}${Cypress.spec["fileName"]}`, () => {
  it("Test cases for get-log API", () => {
    let today = new Date().toISOString().slice(0, 10);
    let requestData = {
      module_name: "sales_order",
      search: [
        {
          key: "createdAt",
          operation: "date_range",
          val: [today, today]
        }
      ],
      select: ["createdAt", "modules"],
      sort: "_id",
      orderby: "desc",
      page: 1,
      perPage: 20
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
    let recordId = resId_N.toString();
    let requestData = {
      module: Cypress.spec["fileName"],
      record_id: recordId,
      sort: "_id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: routes.track_change,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Track_change(body);
    });
  });

  it("Test case for look-up API", () => {
    let name = Cypress.spec["fileName"];
    let obj = so_lookUp()
    cy.request({
      method: routes.get,
      url: `${routes.look_up}${name}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(JSON.stringify(body)).to.deep.equal(JSON.stringify(obj));
    });
  });
});

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {
  it("Test cases When customer_id doesn't exist", () => {
    let requestData = req_SO({
      customer_id: Cypress.env("RandomNumber")
    });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id", `{customer_id} is invalid`);
    });
  });

  it("Test cases When store_id doesn't exist", () => {
    let requestData = req_SO({
      store_id: Cypress.env("RandomNumber")
    });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("store_id", `{store_id} is invalid`);
    });
  });

  it("Test cases When dc_id doesn't exist", () => {
    let requestData = req_SO({
      dc_id: Cypress.env("RandomNumber")
    });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("dc_id", `{dc_id} is invalid`);
    });
  });

  it("Test cases When ship_via_id doesn't exist", () => {
    let requestData = req_SO({
      ship_via_id: Cypress.env("RandomNumber")
    });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("ship_via_id", `{ship_via_id} is invalid`);
    });
  });

  it("Test cases When division_id doesn't exist", () => {
    let requestData = req_SO({
      division_id: Cypress.env("RandomNumber")
    });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("division_id", store_msg.division);
    });
  });

  it("Test cases When department_id doesn't exist", () => {
    let requestData = req_SO({
      department_id: Cypress.env("RandomNumber")
    });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("department_id", `{department_id} is invalid`);
    });
  });

  it("Test cases When factor_id doesn't exist", () => {
    let requestData = req_SO({
      factor_id: Cypress.env("RandomNumber")
    });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("factor_id", `{factor_id} is invalid`);
    });
  });

  it("Test cases When term_id doesn't exist", () => {
    let requestData = req_SO({
      term_id: Cypress.env("RandomNumber")
    });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("term_id", `{term_id} is invalid`);
    });
  });

  it("Test cases When sales_person_id doesn't exist", () => {
    let requestData = req_SO({
      sales_person: [
        {
          id: Cypress.env("RandomNumber")
        }
      ]
    });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("sales_person_id", `{sales_person_id} is invalid`);
    });
  });

  it("Test cases When commission_sales_person_id doesn't exist", () => {
    let requestData = req_SO({
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          commissions: [
            {
              sales_person_id: Cypress.env("RandomNumber"),
              commission_rate: 10,
              commission_amt: 1125
            },
            {
              sales_person_id: Cypress.env("RandomNumber"),
              commission_rate: 10,
              commission_amt: 1125
            }
          ],
          variants: [
            {
              csku_id: cskuId_I[0],
              qty: 100,
              price: 100
            }
          ]
        }
      ]
    });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("commissions_sales_person_id");
    });
  });

  it("Test cases When item_id doesn't exist", () => {
    let requestData = req_SO({
      lines: [
        {
          line: 1,
          item_id: Cypress.env("RandomNumber"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: cskuId_I[0],
              qty: 100,
              price: 100
            }
          ]
        }
      ]
    }, ["sales_person"]);
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("csku_id");
      expect(body.error.errorDetails).has.property("item_id");
    });
  });

  it("Test cases When color_id doesn't exist", () => {
    let requestData = req_SO({
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("RandomNumber"),
          variants: [
            {
              csku_id: cskuId_I[0],
              qty: 100,
              price: 100
            }
          ]
        }
      ]
    }, ["sales_person"]);
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("csku_id");
      expect(body.error.errorDetails).has.property("color_id");
    });
  });

  it("Test cases When csku_id doesn't exist", () => {
    let requestData = req_SO({
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: Cypress.env("RandomNumber"),
              qty: 50,
              price: 50,
            },
          ],
        },
      ],
    }, ["sales_person"]);
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("csku_id");
    });
  });

  it("Test cases When do not provide any field", () => {
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: {},
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("order_type");
      expect(body.error.errorDetails).has.property("order_date");
      expect(body.error.errorDetails).has.property("start_date");
      expect(body.error.errorDetails).has.property("cancel_date");
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("store_id");
      expect(body.error.errorDetails).has.property("ship_via_id");
      expect(body.error.errorDetails).has.property("division_id");
      expect(body.error.errorDetails).has.property("dc_id");
      expect(body.error.errorDetails).has.property("bill_to");
      expect(body.error.errorDetails).has.property("ship_to");
      expect(body.error.errorDetails).has.property("lines");
    });
  });

  it("Test cases When lines object are empty", () => {
    let requestData = req_SO({ lines: [{}] });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("line");
      expect(body.error.errorDetails).has.property("item_id");
      expect(body.error.errorDetails).has.property("color_id");
      expect(body.error.errorDetails).has.property("variants");
    });
  });

  it("Test cases When lines object are not provided", () => {
    let requestData = req_SO({ lines: [] });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("lines");
    });
  });

  it("Test cases When lines fields are not provided", () => {
    let requestData = req_SO({}, ["lines"]);
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("lines");
    });
  });

  it("Test cases When commissions object are empty", () => {
    let requestData = req_SO({
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          discount_rate: 10,
          commissions: [{}, {}],
          variants: [
            {
              csku_id: cskuId_I[0],
              qty: 100,
              price: 100
            }
          ]
        }
      ]
    });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("sales_person_id");
      expect(body.error.errorDetails).has.property("commission_rate");
      expect(body.error.errorDetails).has.property("commission_amt");
    });
  });

  it("Test case when sales_person field is not provided but commission field is provided", () => {
    let requestData = req_SO({
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          commissions: [
            {
              sales_person_id: Cypress.env("salesId"),
              commission_rate: 10,
              commission_amt: 1125
            }
          ],
          variants: [
            {
              csku_id: cskuId_I[0],
              qty: 100,
              price: 100
            }
          ]
        }
      ]
    }, ["sales_person"]);
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("commissions");
    });
  });

  it("Test case when sales_person object are empty but commission object are not empty", () => {
    let requestData = req_SO({
      sales_person: [{}],
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          commissions: [
            {
              sales_person_id: Cypress.env("salesId"),
              commission_rate: 10,
              commission_amt: 1125
            }
          ],
          variants: [
            {
              csku_id: cskuId_I[0],
              qty: 100,
              price: 100
            }
          ]
        }
      ]
    });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id");
    });
  });

  it("Test case when commission field is not provided but sales_person field is provided", () => {
    let requestData = req_SO({
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: cskuId_I[0],
              qty: 100,
              price: 100
            }
          ]
        }
      ]
    });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("commissions");
    });
  });

  it("Test case when commission object are not provided but sales_person object are provided", () => {
    let requestData = req_SO({
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          commissions: [],
          variants: [
            {
              csku_id: cskuId_I[0],
              qty: 100,
              price: 100,
            },
          ],
        },
      ],
    });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("commissions");
    });
  });

  it("Test case when commission object are empty but sales_person object are not empty", () => {
    let requestData = req_SO({
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          discount_rate: 10,
          commissions: [{}, {}],
          variants: [
            {
              csku_id: cskuId_I[0],
              qty: 100,
              price: 100,
              discount: 10
            }
          ]
        }
      ]
    });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("sales_person_id");
      expect(body.error.errorDetails).has.property("commission_rate");
      expect(body.error.errorDetails).has.property("commission_amt");
    });
  });

  it("Test cases When variants object are empty", () => {
    let requestData = req_SO({
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [{}]
        }
      ]
    }, ["sales_person"]);
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("csku_id");
      expect(body.error.errorDetails).has.property("qty");
      expect(body.error.errorDetails).has.property("price");
    });
  });

  it("Test cases When variants object are not provided", () => {
    let requestData = req_SO({
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: []
        }
      ]
    }, ["sales_person"]);
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("variants");
    });
  });

  it("Test cases When variants fields are not provided", () => {
    let requestData = req_SO({
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I")
        }
      ]
    }, ["sales_person"]);
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("variants");
    });
  });

  it("Test cases When required fields are empty", () => {
    let requestData = {
      order_type: "",
      order_date: "",
      start_date: "",
      cancel_date: "",
      order_hold: "",
      credit_hold: "",
      customer_id: "",
      bill_to: "",
      store_id: "",
      ship_to_dc: "",
      ship_to: "",
      ship_via_id: "",
      division_id: "",
      sales_person: [
        {
          id: ""
        }
      ],
      lines: [
        {
          line: "",
          item_id: "",
          color_id: "",
          commissions: [
            {
              sales_person_id: "",
              commission_rate: "",
              commission_amt: ""
            }
          ],
          variants: [
            {
              csku_id: "",
              qty: "",
              price: ""
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("order_type");
      expect(body.error.errorDetails).has.property("order_date");
      expect(body.error.errorDetails).has.property("start_date");
      expect(body.error.errorDetails).has.property("cancel_date");
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("store_id");
      expect(body.error.errorDetails).has.property("ship_via_id");
      expect(body.error.errorDetails).has.property("division_id");
      expect(body.error.errorDetails).has.property("id");
      expect(body.error.errorDetails).has.property("order_hold");
      expect(body.error.errorDetails).has.property("credit_hold");
      expect(body.error.errorDetails).has.property("ship_to_dc");
      expect(body.error.errorDetails).has.property("bill_to");
      expect(body.error.errorDetails).has.property("ship_to");
      expect(body.error.errorDetails).has.property("line");
      expect(body.error.errorDetails).has.property("item_id");
      expect(body.error.errorDetails).has.property("color_id");
      expect(body.error.errorDetails).has.property("sales_person_id");
      expect(body.error.errorDetails).has.property("commission_rate");
      expect(body.error.errorDetails).has.property("commission_amt");
      expect(body.error.errorDetails).has.property("csku_id");
      expect(body.error.errorDetails).has.property("qty");
      expect(body.error.errorDetails).has.property("price");
    });
  });

  it("order_type must be one of [N, B, D]", () => {
    let requestData = req_SO({ order_type: Cypress.env("Random") });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("order_type");
    });
  });

  it("bulk_order_no will be required when order_type is Distro[D]", () => {
    let requestData = req_SO({ order_type: "D" }, ["bulk_order_no"]);
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("bulk_order_no");
    });
  });

  it("dc_id will be required when ship_to_dc will true ", () => {
    let requestData = req_SO({ ship_to_dc: 1 }, ["dc_id"]);
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("dc_id");
    });
  });

  it("order_date must be date-formate", () => {
    let requestData = req_SO({ order_date: Cypress.env("Random") });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("date_format");
    });
  });

  it("start_date must be date-formate", () => {
    let requestData = req_SO({ start_date: Cypress.env("Random") });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("date_format");
    });
  });

  it("cancel_date must be date-formate", () => {
    let requestData = req_SO({ cancel_date: Cypress.env("Random") });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("date_format");
    });
  });

  it("Test cases for number data-type", () => {
    let requestData = req_SO({
      order_hold: Cypress.env("RandomNum"),
      credit_hold: Cypress.env("RandomNum"),
      customer_id: Cypress.env("RandomNum"),
      store_id: Cypress.env("RandomNum"),
      ship_to_dc: Cypress.env("RandomNum"),
      dc_id: Cypress.env("RandomNum"),
      ship_via_id: Cypress.env("RandomNum"),
      division_id: Cypress.env("RandomNum"),
      department_id: Cypress.env("RandomNum"),
      factor_id: Cypress.env("RandomNum"),
      sales_person: [{ id: Cypress.env("RandomNum") }],
      term_id: Cypress.env("RandomNum"),
      freight_amount: Cypress.env("RandomNum"),
      status: Cypress.env("RandomNum"),
      lines: [
        {
          line: 1,
          item_id: Cypress.env("RandomNum"),
          color_id: Cypress.env("RandomNum"),
          discount_rate: Cypress.env("RandomNum"),
          commissions: [
            {
              sales_person_id: Cypress.env("RandomNum"),
              commission_rate: Cypress.env("RandomNum"),
              commission_amt: Cypress.env("RandomNum")
            }
          ],
          variants: [
            {
              csku_id: Cypress.env("RandomNum"),
              qty: Cypress.env("RandomNum"),
              price: Cypress.env("RandomNum"),
              discount: Cypress.env("RandomNum")
            }
          ]
        }
      ]
    });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("store_id");
      expect(body.error.errorDetails).has.property("ship_via_id");
      expect(body.error.errorDetails).has.property("division_id");
      expect(body.error.errorDetails).has.property("department_id");
      expect(body.error.errorDetails).has.property("factor_id");
      expect(body.error.errorDetails).has.property("term_id");
      expect(body.error.errorDetails).has.property("id");
      expect(body.error.errorDetails).has.property("order_hold");
      expect(body.error.errorDetails).has.property("credit_hold");
      expect(body.error.errorDetails).has.property("ship_to_dc");
      expect(body.error.errorDetails).has.property("dc_id");
      expect(body.error.errorDetails).has.property("item_id");
      expect(body.error.errorDetails).has.property("color_id");
      expect(body.error.errorDetails).has.property("discount_rate");
      expect(body.error.errorDetails).has.property("sales_person_id");
      expect(body.error.errorDetails).has.property("commission_rate");
      expect(body.error.errorDetails).has.property("commission_amt");
      expect(body.error.errorDetails).has.property("csku_id");
      expect(body.error.errorDetails).has.property("qty");
      expect(body.error.errorDetails).has.property("discount");
      expect(body.error.errorDetails).has.property("price");
      expect(body.error.errorDetails).has.property("freight_amount");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("sales_person_id should be unique", () => {
    let requestData = req_SO({
      sales_person: [
        {
          id: Cypress.env("salesId")
        },
        {
          id: Cypress.env("salesId")
        },
      ]
    });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("sales_person_id");
    });
  });

  it("commission_sales_person_id should be unique", () => {
    let requestData = req_SO({
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          discount_rate: 10,
          commissions: [
            {
              sales_person_id: Cypress.env("salesId"),
              commission_rate: 10,
              commission_amt: 1125
            },
            {
              sales_person_id: Cypress.env("salesId"),
              commission_rate: 5,
              commission_amt: 562.5
            }
          ],
          variants: [
            {
              csku_id: cskuId_I[0],
              qty: 100,
              price: 100,
              discount: 10
            }
          ]
        }
      ]
    });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("commission_sales_person_id");
    });
  });

  it("csku_id should be unique", () => {
    let requestData = req_SO({
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: cskuId_I[0],
              qty: 100,
              price: 100,
            },
            {
              csku_id: cskuId_I[0],
              qty: 50,
              price: 50,
            },
          ],
        },
      ],
    }, ["sales_person"]);
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("csku_id");
    });
  });

  it("Incorrect sales_person_id and commission_sales_person_id are provided together", () => {
    let requestData = req_SO({
      sales_person: [
        {
          id: Cypress.env("RandomNumber")
        }
      ],
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          commissions: [
            {
              sales_person_id: Cypress.env("RandomNumber"),
              commission_rate: 10,
              commission_amt: 1125
            }
          ],
          variants: [
            {
              csku_id: cskuId_I[0],
              qty: 100,
              price: 100
            }
          ]
        }
      ]
    });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("sales_person_id");
    });
  });

  it("bill_to -contact_name, address_1, city, state, zip and country should be required", () => {
    let requestData = req_SO({ bill_to: {} });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("contact_name");
      expect(body.error.errorDetails).has.property("address_1");
      expect(body.error.errorDetails).has.property("city");
      expect(body.error.errorDetails).has.property("state");
      expect(body.error.errorDetails).has.property("zip");
      expect(body.error.errorDetails).has.property("country");
    });
  });

  it("bill_to -contact_name, address_1, city, state, zip and country should not allow to be empty", () => {
    let requestData = req_SO({
      bill_to: {
        contact_name: "",
        address_1: "",
        city: "",
        state: "",
        zip: "",
        country: ""
      }
    });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("contact_name");
      expect(body.error.errorDetails).has.property("address_1");
      expect(body.error.errorDetails).has.property("city");
      expect(body.error.errorDetails).has.property("state");
      expect(body.error.errorDetails).has.property("zip");
      expect(body.error.errorDetails).has.property("country");
    });
  });

  it("ship_to -contact_name, address_1, city, state, zip and country should be required", () => {
    let requestData = req_SO({ ship_to: {} });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("contact_name");
      expect(body.error.errorDetails).has.property("address_1");
      expect(body.error.errorDetails).has.property("city");
      expect(body.error.errorDetails).has.property("state");
      expect(body.error.errorDetails).has.property("zip");
      expect(body.error.errorDetails).has.property("country");
    });
  });

  it("ship_to -contact_name, address_1, city, state, zip and country should not allow to be empty", () => {
    let requestData = req_SO({
      ship_to: {
        contact_name: "",
        address_1: "",
        city: "",
        state: "",
        zip: "",
        country: ""
      }
    });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("contact_name");
      expect(body.error.errorDetails).has.property("address_1");
      expect(body.error.errorDetails).has.property("city");
      expect(body.error.errorDetails).has.property("state");
      expect(body.error.errorDetails).has.property("zip");
      expect(body.error.errorDetails).has.property("country");
    });
  });

  it("Test cases to check string field", () => {
    let requestData = req_SO({
      order_type: Cypress.env("RandomNumber"),
      order_date: Cypress.env("RandomNumber"),
      start_date: Cypress.env("RandomNumber"),
      cancel_date: Cypress.env("RandomNumber"),
      order_hold: Cypress.env("randomBoolean"),
      credit_hold: Cypress.env("randomBoolean"),
      bulk_order_no: Cypress.env("RandomNumber"),
      bill_to: {
        contact_name: Cypress.env("RandomNumber"),
        address_1: Cypress.env("RandomNumber"),
        address_2: Cypress.env("RandomNumber"),
        address_3: Cypress.env("RandomNumber"),
        address_4: Cypress.env("RandomNumber"),
        city: Cypress.env("RandomNumber"),
        state: Cypress.env("RandomNumber"),
        zip: Cypress.env("RandomNumber"),
        country: Cypress.env("RandomNumber"),
      },
      ship_to: {
        contact_name: Cypress.env("RandomNumber"),
        address_1: Cypress.env("RandomNumber"),
        address_2: Cypress.env("RandomNumber"),
        address_3: Cypress.env("RandomNumber"),
        address_4: Cypress.env("RandomNumber"),
        city: Cypress.env("RandomNumber"),
        state: Cypress.env("RandomNumber"),
        zip: Cypress.env("RandomNumber"),
        country: Cypress.env("RandomNumber"),
      },
      special_instruction: Cypress.env("RandomNumber")
    });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("order_type");
      expect(body.error.errorDetails).has.property("order_date");
      expect(body.error.errorDetails).has.property("start_date");
      expect(body.error.errorDetails).has.property("cancel_date");
      expect(body.error.errorDetails).has.property("bulk_order_no");
      expect(body.error.errorDetails).has.property("contact_name");
      expect(body.error.errorDetails).has.property("address_1");
      expect(body.error.errorDetails).has.property("city");
      expect(body.error.errorDetails).has.property("state");
      expect(body.error.errorDetails).has.property("zip");
      expect(body.error.errorDetails).has.property("country");
      expect(body.error.errorDetails).has.property("address_2");
      expect(body.error.errorDetails).has.property("address_3");
      expect(body.error.errorDetails).has.property("address_4");
    });
  });

  it("order_hold, credit_hold , ship_to_dc and status must be one of [0 and 1]", () => {
    let requestData = req_SO({
      order_hold: Cypress.env("RandomNumber"),
      credit_hold: Cypress.env("RandomNumber"),
      ship_to_dc: Cypress.env("RandomNumber"),
      status: Cypress.env("RandomNumber")
    });
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("order_hold");
      expect(body.error.errorDetails).has.property("credit_hold");
      expect(body.error.errorDetails).has.property("ship_to_dc");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("item_id is not associated with color_id and csku_id", () => {
    let requestData = req_SO({
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_P"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: cskuId_I[0],
              qty: 100,
              price: 100
            }
          ]
        }
      ]
    }, ["sales_person"]);
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("csku_id");
    });
  });

  it("line should be unique", () => {
    let requestData = req_SO({
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: cskuId_I[0],
              qty: 100,
              price: 100
            }
          ]
        },
        {
          line: 1,
          item_id: Cypress.env("ItemId_P"),
          color_id: Cypress.env("resColorId_P"),
          variants: [
            {
              csku_id: cskuId_P[0],
              qty: 500,
              price: 10
            }
          ]
        }
      ]
    }, ["sales_person"]);
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).to.have.property("line")
    });
  });

  it("discount will be +-1 of the discount_rate", () => {
    let requestData = req_SO({
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          discount_rate: 10,
          variants: [
            {
              csku_id: cskuId_I[0],
              qty: 100,
              price: 100,
              discount: 8
            }
          ]
        }
      ]
    }, ["sales_person"]);
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).to.have.property("discount")
    });
  });

  it("The combinition of Item_id, color_id and csku_id should be unique in lines", () => {
    let requestData = req_SO({
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_P"),
          color_id: Cypress.env("resColorId_P"),
          variants: [
            {
              csku_id: cskuId_P[0],
              qty: 500,
              price: 10
            }
          ]
        },
        {
          line: 2,
          item_id: Cypress.env("ItemId_P"),
          color_id: Cypress.env("resColorId_P"),
          discount_rate: 20,
          variants: [
            {
              csku_id: cskuId_P[0],
              qty: 500,
              price: 10
            }
          ]
        }
      ]
    }, ["sales_person"]);
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).to.have.property("item_id")
      expect(body.error.errorDetails).to.have.property("color_id")
    });
  });

  it("Quantity must be greater than 0", () => {
    let requestData = req_SO({
      lines: findDiscountOfOrder([
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          discount_rate: Cypress.env("RandomNum_1"),
          variants: [
            {
              csku_id: cskuId_I[0],
              qty: 0,
              price: Cypress.env("RandomNum_2"),
              discount: Cypress.env("RandomNum_2"),
            }
          ]
        }
      ])
    }, ["sales_person"]);
    cy.request({
      method: routes.post,
      url: routes.post_SO,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).to.have.property("qty")
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {
  it("Test cases When customer_id doesn't exist", () => {
    let requestData = { customer_id: Cypress.env("RandomNumber") };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id", `{customer_id} is invalid`);
    });
  });

  it("Test cases When store_id doesn't exist", () => {
    let requestData = { store_id: Cypress.env("RandomNumber") };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("store_id", `{store_id} is invalid`);
    });
  });

  it("Test cases When dc_id doesn't exist", () => {
    let requestData = { dc_id: Cypress.env("RandomNumber") };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("dc_id", `{dc_id} is invalid`);
    });
  });

  it("Test cases When ship_via_id doesn't exist", () => {
    let requestData = { ship_via_id: Cypress.env("RandomNumber") };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("ship_via_id", `{ship_via_id} is invalid`);
    });
  });

  it("Test cases When division_id doesn't exist", () => {
    let requestData = { division_id: Cypress.env("RandomNumber") };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("division_id", `{division_id} is invalid`);
    });
  });

  it("Test cases When department_id doesn't exist", () => {
    let requestData = { department_id: Cypress.env("RandomNumber") };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("department_id", `{department_id} is invalid`);
    });
  });

  it("Test cases When factor_id doesn't exist", () => {
    let requestData = { factor_id: Cypress.env("RandomNumber") };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("factor_id", `{factor_id} is invalid`);
    });
  });

  it("Test cases When term_id doesn't exist", () => {
    let requestData = { term_id: Cypress.env("RandomNumber") };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("term_id", `{term_id} is invalid`);
    });
  });

  it("Test cases When sales_person_id doesn't exist", () => {
    let requestData = { sales_person: [{ id: Cypress.env("RandomNumber") }] };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("sales_person_id", `{sales_person_id} is invalid`);
    });
  });

  it("Test cases When commission_sales_person_id doesn't exist", () => {
    let requestData = {
      sales_person: [{ id: Cypress.env("salesId") }],
      lines: [
        {
          id: resLineId_N[0],
          commissions: [
            {
              sales_person_id: Cypress.env("RandomNumber"),
              commission_rate: 10,
              commission_amt: 1125,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "commissions_sales_person_id", "{commissions_sales_person_id} is not available in sales_person"
      );
    });
  });

  it("Test cases When item_id doesn't exist", () => {
    let requestData = {
      lines: [
        {
          id: resLineId_N[0],
          item_id: Cypress.env("RandomNumber"),
        },
      ],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("item_id", `{item_id} is invalid`);
    });
  });

  it("Test cases When color_id doesn't exist", () => {
    let requestData = {
      lines: [
        {
          id: resLineId_N[0],
          color_id: Cypress.env("RandomNumber"),
        },
      ],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("color_id", `{color_id} is invalid`);
    });
  });

  it("Test cases When csku_id doesn't exist", () => {
    let requestData = {
      lines: [
        {
          id: resLineId_N[0],
          variants: [
            {
              id: resvariantsId_N[0],
              csku_id: Cypress.env("RandomNumber"),
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("csku_id", `{csku_id} is not associated with {item_id} and {color_id}`);
    });
  });

  it("Test cases When lines object are empty", () => {
    let requestData = {
      lines: [{}],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("line");
      expect(body.error.errorDetails).has.property("item_id");
      expect(body.error.errorDetails).has.property("color_id");
      expect(body.error.errorDetails).has.property("variants");
    });
  });

  it("Test cases When commissions object are empty", () => {
    let requestData = {
      sales_person: [
        {
          id: Cypress.env("salesId"),
        },
      ],
      lines: [
        {
          id: resLineId_N[0],
          commissions: [{}],
        },
      ],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("sales_person_id");
      expect(body.error.errorDetails).has.property("commission_rate");
      expect(body.error.errorDetails).has.property("commission_amt");
    });
  });

  it("Test case when sales_person field is not provided but commission field is provided", () => {
    let requestData = {
      lines: [
        {
          id: resLineId_N[0],
          commissions: [
            {
              sales_person_id: Cypress.env("salesId"),
              commission_rate: 10,
              commission_amt: 1125,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it("Test case when sales_person object are not provided but commission object are provided", () => {
    let requestData = {
      sales_person: [],
      lines: [
        {
          id: resLineId_N[0],
          commissions: [
            {
              sales_person_id: Cypress.env("salesId"),
              commission_rate: 10,
              commission_amt: 1125,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it("Test case when sales_person object are empty but commission object are not empty", () => {
    let requestData = {
      sales_person: [{}],
      lines: [
        {
          id: resLineId_N[0],
          commissions: [
            {
              sales_person_id: Cypress.env("salesId"),
              commission_rate: 10,
              commission_amt: 1125,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it("Test case when commission field is not provided but sales_person field is provided", () => {
    let requestData = {
      sales_person: [
        {
          id: Cypress.env("salesId"),
        },
      ],
      lines: [
        {
          id: resLineId_N[0],
        },
      ],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it("Test case when commission object are not provided but sales_person object are provided", () => {
    let requestData = {
      sales_person: [
        {
          id: Cypress.env("salesId"),
        },
      ],
      lines: [
        {
          id: resLineId_N[0],
          commissions: [],
        },
      ],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it("Test case when commission object are empty but sales_person object are not empty", () => {
    let requestData = {
      sales_person: [
        {
          id: Cypress.env("salesId"),
        },
      ],
      lines: [
        {
          id: resLineId_N[0],
          commissions: [{}],
        },
      ],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("sales_person_id");
      expect(body.error.errorDetails).has.property("commission_rate");
      expect(body.error.errorDetails).has.property("commission_amt");
    });
  });

  it("Test cases When variants object are empty", () => {
    let requestData = {
      lines: [
        {
          id: resLineId_N[0],
          variants: [{}],
        },
      ],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("csku_id");
      expect(body.error.errorDetails).has.property("qty");
      expect(body.error.errorDetails).has.property("price");
    });
  });

  it("Test cases When required fields are empty", () => {
    let requestData = {
      order_type: "",
      order_date: "",
      start_date: "",
      cancel_date: "",
      order_hold: "",
      credit_hold: "",
      customer_id: "",
      bill_to: "",
      store_id: "",
      ship_to_dc: "",
      ship_to: "",
      ship_via_id: "",
      division_id: "",
      sales_person: [
        {
          id: "",
        },
      ],
      lines: [
        {
          line: "",
          id: "",
          item_id: "",
          color_id: "",
          commissions: [
            {
              sales_person_id: "",
              commission_rate: "",
              commission_amt: "",
            },
          ],
          variants: [
            {
              id: "",
              csku_id: "",
              qty: "",
              price: "",
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("order_type");
      expect(body.error.errorDetails).has.property("order_date");
      expect(body.error.errorDetails).has.property("start_date");
      expect(body.error.errorDetails).has.property("cancel_date");
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("store_id");
      expect(body.error.errorDetails).has.property("ship_via_id");
      expect(body.error.errorDetails).has.property("division_id");
      expect(body.error.errorDetails).has.property("id");
      expect(body.error.errorDetails).has.property("order_hold");
      expect(body.error.errorDetails).has.property("credit_hold");
      expect(body.error.errorDetails).has.property("ship_to_dc");
      expect(body.error.errorDetails).has.property("bill_to");
      expect(body.error.errorDetails).has.property("ship_to");
      expect(body.error.errorDetails).has.property("line");
      expect(body.error.errorDetails).has.property("item_id");
      expect(body.error.errorDetails).has.property("color_id");
      expect(body.error.errorDetails).has.property("sales_person_id");
      expect(body.error.errorDetails).has.property("commission_rate");
      expect(body.error.errorDetails).has.property("commission_amt");
      expect(body.error.errorDetails).has.property("csku_id");
      expect(body.error.errorDetails).has.property("qty");
      expect(body.error.errorDetails).has.property("price");
    });
  });

  it("order_type must be one of [N, B, D]", () => {
    let requestData = { order_type: Cypress.env("Random") };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("order_type");
    });
  });

  it("order_date must be date-formate", () => {
    let requestData = { order_date: Cypress.env("Random") };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("date_format");
    });
  });

  it("start_date must be date-formate", () => {
    let requestData = { start_date: Cypress.env("Random") };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("date_format");
    });
  });

  it("cancel_date must be date-formate", () => {
    let requestData = { cancel_date: Cypress.env("Random") };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("date_format");
    });
  });

  it("Test cases for number data-type", () => {
    let requestData = {
      order_hold: Cypress.env("RandomNum"),
      credit_hold: Cypress.env("RandomNum"),
      customer_id: Cypress.env("RandomNum"),
      store_id: Cypress.env("RandomNum"),
      ship_to_dc: Cypress.env("RandomNum"),
      dc_id: Cypress.env("RandomNum"),
      ship_via_id: Cypress.env("RandomNum"),
      division_id: Cypress.env("RandomNum"),
      department_id: Cypress.env("RandomNum"),
      factor_id: Cypress.env("RandomNum"),
      sales_person: [{ id: Cypress.env("RandomNum") }],
      term_id: Cypress.env("RandomNum"),
      freight_amount: Cypress.env("RandomNum"),
      status: Cypress.env("RandomNum"),
      lines: [
        {
          id: Cypress.env("RandomNum"),
          line: Cypress.env("RandomNum"),
          item_id: Cypress.env("RandomNum"),
          color_id: Cypress.env("RandomNum"),
          discount_rate: Cypress.env("RandomNum"),
          commissions: [
            {
              sales_person_id: Cypress.env("RandomNum"),
              commission_rate: Cypress.env("RandomNum"),
              commission_amt: Cypress.env("RandomNum"),
            },
          ],
          variants: [
            {
              id: Cypress.env("RandomNum"),
              csku_id: Cypress.env("RandomNum"),
              qty: Cypress.env("RandomNum"),
              price: Cypress.env("RandomNum"),
              discount: Cypress.env("RandomNum"),
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("customer_id");
      expect(body.error.errorDetails).has.property("store_id");
      expect(body.error.errorDetails).has.property("ship_via_id");
      expect(body.error.errorDetails).has.property("division_id");
      expect(body.error.errorDetails).has.property("department_id");
      expect(body.error.errorDetails).has.property("factor_id");
      expect(body.error.errorDetails).has.property("term_id");
      expect(body.error.errorDetails).has.property("id");
      expect(body.error.errorDetails).has.property("order_hold");
      expect(body.error.errorDetails).has.property("credit_hold");
      expect(body.error.errorDetails).has.property("ship_to_dc");
      expect(body.error.errorDetails).has.property("dc_id");
      expect(body.error.errorDetails).has.property("item_id");
      expect(body.error.errorDetails).has.property("color_id");
      expect(body.error.errorDetails).has.property("discount_rate");
      expect(body.error.errorDetails).has.property("sales_person_id");
      expect(body.error.errorDetails).has.property("commission_rate");
      expect(body.error.errorDetails).has.property("commission_amt");
      expect(body.error.errorDetails).has.property("csku_id");
      expect(body.error.errorDetails).has.property("qty");
      expect(body.error.errorDetails).has.property("price");
      expect(body.error.errorDetails).has.property("discount");
      expect(body.error.errorDetails).has.property("status");
      expect(body.error.errorDetails).has.property("freight_amount");
    });
  });

  it("sales_person_id should be unique", () => {
    let requestData = {
      sales_person: [
        {
          id: Cypress.env("salesId"),
        },
        {
          id: Cypress.env("salesId"),
        },
      ],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("sales_person_id");
    });
  });

  it("commission_sales_person_id should be unique", () => {
    let requestData = {
      sales_person: [
        {
          id: Cypress.env("salesId"),
        },
        {
          id: Cypress.env("salesId_1"),
        },
      ],
      lines: [
        {
          id: resLineId_N[0],
          commissions: [
            {
              sales_person_id: Cypress.env("salesId"),
              commission_rate: 10,
              commission_amt: 1125
            },
            {
              sales_person_id: Cypress.env("salesId"),
              commission_rate: 5,
              commission_amt: 562.5
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.log(JSON.stringify(body))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("commission_sales_person_id");
    });
  });

  it("csku_id should be unique", () => {
    let requestData = {
      lines: [
        {
          id: resLineId_N[0],
          variants: [
            {
              id: resvariantsId_N[0],
              csku_id: cskuId_I[0]
            },
            {
              id: resvariantsId_N[1],
              csku_id: cskuId_I[0]
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("csku_id");
    });
  });

  it("csku_id should be unique while creating new variants via update API", () => {
    let requestData = {
      lines: [
        {
          id: resLineId_N[0],
          variants: [
            {
              csku_id: cskuId_I[0],
              qty: 100,
              price: 100,
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("csku_id");
    });
  });

  it("Incorrect sales_person_id and commission_sales_person_id are provided together", () => {
    let requestData = {
      sales_person: [{ id: Cypress.env("RandomNumber") }],
      lines: [
        {
          id: resLineId_N[0],
          commissions: [
            {
              sales_person_id: Cypress.env("RandomNumber"),
              commission_rate: 10,
              commission_amt: 1125
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("sales_person_id");
    });
  });

  it("Test cases to check string field", () => {
    let requestData = {
      order_type: Cypress.env("RandomNumber"),
      order_date: Cypress.env("RandomNumber"),
      start_date: Cypress.env("RandomNumber"),
      cancel_date: Cypress.env("RandomNumber"),

      bulk_order_no: Cypress.env("RandomNumber"),
      bill_to: {
        contact_name: Cypress.env("RandomNumber"),
        address_1: Cypress.env("RandomNumber"),
        address_2: Cypress.env("RandomNumber"),
        address_3: Cypress.env("RandomNumber"),
        address_4: Cypress.env("RandomNumber"),
        city: Cypress.env("RandomNumber"),
        state: Cypress.env("RandomNumber"),
        zip: Cypress.env("RandomNumber"),
        country: Cypress.env("RandomNumber"),
      },
      ship_to: {
        contact_name: Cypress.env("RandomNumber"),
        address_1: Cypress.env("RandomNumber"),
        address_2: Cypress.env("RandomNumber"),
        address_3: Cypress.env("RandomNumber"),
        address_4: Cypress.env("RandomNumber"),
        city: Cypress.env("RandomNumber"),
        state: Cypress.env("RandomNumber"),
        zip: Cypress.env("RandomNumber"),
        country: Cypress.env("RandomNumber"),
      },
      special_instruction: Cypress.env("RandomNumber"),
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("order_type");
      expect(body.error.errorDetails).has.property("order_date");
      expect(body.error.errorDetails).has.property("start_date");
      expect(body.error.errorDetails).has.property("cancel_date");
      expect(body.error.errorDetails).has.property("bulk_order_no");
      expect(body.error.errorDetails).has.property("contact_name");
      expect(body.error.errorDetails).has.property("address_1");
      expect(body.error.errorDetails).has.property("city");
      expect(body.error.errorDetails).has.property("state");
      expect(body.error.errorDetails).has.property("zip");
      expect(body.error.errorDetails).has.property("country");
      expect(body.error.errorDetails).has.property("address_2");
      expect(body.error.errorDetails).has.property("address_3");
      expect(body.error.errorDetails).has.property("address_4");
    });
  });

  it("order_hold, credit_hold , ship_to_dc and status must be one of [0 and 1]", () => {
    let requestData = {
      order_hold: Cypress.env("RandomNum_2"),
      credit_hold: Cypress.env("RandomNum_2"),
      ship_to_dc: Cypress.env("RandomNum_2"),
      status: Cypress.env("RandomNum_2"),
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("order_hold");
      expect(body.error.errorDetails).has.property("credit_hold");
      expect(body.error.errorDetails).has.property("ship_to_dc");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it("csku_id is not associated with color_id and item_id", () => {
    let requestData = {
      lines: [
        {
          id: resLineId_N[0],
          item_id: Cypress.env("ItemId_P"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              id: resvariantsId_N[0],
              csku_id: cskuId_I[0]
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("csku_id");
    });
  });

  it("Test case when sales_order id does not exist", () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_SO}${Cypress.env("RandomNumber")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id", store_msg.id);
    });
  });

  it("Test case when alphabet provided instead of sales_order id", () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_SO}${Cypress.env("Random")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id", store_msg.chk_id);
    });
  });

  it("Test case when lines_id does not exist", () => {
    let requestData = {
      lines: [
        {
          id: Cypress.env("RandomNumber"),
        },
      ],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "line_id", "{line_id} does not exists for {sales_order}");
    });
  });

  it("Test case when provides lines_id as string", () => {
    let requestData = {
      lines: [
        {
          id: Cypress.env("RandomNum"),
        },
      ],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id", `"id" must be a number`);
    });
  });

  it("Test case when lines_id does not associetes with provided sales_order_id", () => {
    let requestData = {
      lines: [
        {
          id: resLineId_check[0],
        },
      ],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "line_id", "{line_id} does not exists for {sales_order}");
    });
  });

  it("Test case when variants_id does not exist", () => {
    let requestData = {
      lines: [
        {
          id: resLineId_N[0],
          variants: [
            {
              id: Cypress.env("RandomNumber")
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "variants_id", "{variant_id} is invalid");
    });
  });

  it("Test case when provides variants_id as string", () => {
    let requestData = {
      lines: [
        {
          id: resLineId_N[0],
          variants: [
            {
              id: Cypress.env("RandomNum")
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id", `"id" must be a number`);
    });
  });

  it("Test case when variants_id does not associetes with provided sales_order_id and lines_id", () => {
    let requestData = {
      lines: [
        {
          id: resLineId_N[0],
          variants: [
            {
              id: resvariantsId_B[0]
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "variants_id", "{variant_id} is not associated with {line_id}");
    });
  });

  it("line should be unique", () => {
    let requestData = {
      lines: [
        {
          line: 1,
          id: resLineId_N[0],
        },
        {
          line: 1,
          id: resLineId_N[1],
        },
      ],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).to.have.property(
        "line", `{line} should be unique`)
    });
  });

  it("line should be unique while creating new lines via update API", () => {
    let requestData = {
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: cskuId_I[0],
              qty: 100,
              price: 100
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).to.have.property(
        "line", `{line} should be unique`)
    });
  });

  it("Test case to check range of discount", () => {
    let requestData = {
      lines: [
        {
          id: resLineId_N[0],
          discount_rate: 10,
          variants: [
            {
              id: resvariantsId_N[0],
              discount: 12
            },
            {
              id: resvariantsId_N[1],
              discount: 3
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).to.have.property(
        "discount", `{discount} amount is not matching`)
    });
  });

  it("The combination of item_id, color_id and csku_id should be unique for a line", () => {
    let requestData = {
      lines: [
        {
          line: 1,
          id: resLineId_N[0],
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              id: resvariantsId_N[0],
              csku_id: cskuId_I[0],
            },
          ],
        },
        {
          line: 2,
          id: resLineId_N[1],
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),

          variants: [
            {
              id: resvariantsId_N[2],
              csku_id: cskuId_I[0],
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).to.have.property(
        "lines", `Combination of {item_id} and {color_id} should be unique in {lines}`)
    });
  });

  it("Quantity must ba greater than 0", () => {
    let requestData = {
      lines: [
        {
          id: resLineId_N[0],
          variants: [
            {
              id: resvariantsId_N[0],
              qty: 0
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_N}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).to.have.property(
        "qty", `"qty" must be greater than 0`)
    });
  });
});

describe(`${store_msg.fail}${"GET,print PDF and print EXCEL"} of ${Cypress.spec["fileName"]}`, () => {
  it("Failure test case for GET sales_order API when sales_order_id doesn't exist", () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_SO}${Cypress.env("RandomNumber")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id", store_msg.id);
    });
  });

  it("Failure test case for GET sales_order API when alphbets provided instead of sales_order_id ", () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_SO}${Cypress.env("Random")}`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id", store_msg.chk_id);
    });
  });

  it("Failure test case for print sales_order-PDF when sales_order_id doesn't exist", () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_SO}${Cypress.env("RandomNumber")}/print/pdf`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id", store_msg.id);
    });
  });

  it("Failure test case for print sales_order-PDF when alphbets provided instead of sales_order_id", () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_SO}${Cypress.env("Random")}/print/pdf`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id", store_msg.chk_id);
    });
  });

  it("Failure test case for print sales_order-EXCEL when sales_order_id doesn't exist", () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_SO}${Cypress.env("RandomNumber")}/print/excel`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id", store_msg.id);
    });
  });

  it("Failure test case for print sales_order-EXCEL when alphbets provided instead of sales_order_id", () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_SO}${Cypress.env("Random")}/print/excel`,
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id", store_msg.chk_id);
    });
  });
});

describe(`${store_msg.delete}${Cypress.spec["fileName"]}`, () => {

  it("Test case for delete function for variants", () => {
    let requestData = {
      lines: [
        {
          id: resLineId_B[0],
          variants: [
            {
              id: resvariantsId_B[1],
              delete: 1
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_B}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.SO_SuccessGetResp(body);
    });
  });

  it("Test case for delete function for lines", () => {
    let requestData = {
      lines: [
        {
          id: resLineId_D[0],
          delete: 1
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_SO}${resId_D}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.SO_SuccessGetResp(body);
    });
  });

  it("Atleast one variants should be present in lines", () => {
    let requestData = {
      lines: [
        {
          id: So_line_id[0],
          variants: [
            {
              id: So_variant[0],
              delete: 1
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put, failOnStatusCode: false,
      url: `${routes.post_SO}${So_id}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).to.have.property(
        "variant", "Atleast one {variant} should be present with each line")
    });
  });

  it("Atleast one line should be present in a record", () => {
    let requestData = {
      lines: [
        {
          id: So_line_id[0],
          delete: 1
        }
      ]
    };
    cy.request({
      method: routes.put, failOnStatusCode: false,
      url: `${routes.post_SO}${So_id}`,
      body: requestData,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).to.have.property(
        "line", "Atleast one {line} item should be present")
    });
  });

});
