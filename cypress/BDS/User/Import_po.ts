import routes from "../../support/route";
import store_msg from "../../support/store_msg";

let Csku_id_I: Number[];
let Csku_id_P: Number[];
let import_po_id: Number;
let import_po_id_nxt: Number;
let lines_id: Number[];
let lines_id1: Number[];
let varients_id = [];
let varients_id1 = [];
let varients_id_2 = [];
let import_po_id_1: Number;
let lines_id_2: Number[];

before(() => {
  cy.GetCompanyToken();
  cy.GetDivisionId();
  cy.Getship_viaIdId();
  cy.Get_vendor_id();
  cy.Get_stage_id();
  cy.Get_termId();
  cy.Get_itemId_I();
  cy.Get_itemId_P();
  cy.date_formate();
  cy.Get_config("Decimal");
  cy.GetWarehouseId();
});
beforeEach(() => {
  cy.Random();
  cy.RandomNumber();
  cy.RandomNum();
  cy.randomBoolean();
  cy.RandomDesc();
});
describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {

  it(`Test case for craete import_po with all request field`, () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_item}${Cypress.env("ItemId_I")}/color/${Cypress.env(
        "resColorId_I"
      )}`,
      headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      Csku_id_I = body.result.data.map((element: any) => element.id);

      cy.request({
        method: routes.get,
        url: `${routes.post_item}${Cypress.env("ItemId_P")}/color/${Cypress.env(
          "resColorId_P"
        )}`,
       headers: { Authorization: Cypress.env("companyToken") }
      }).then(({ body }) => {
        Csku_id_P = body.result.data.map((element: any) => element.id);

        let requestData = {
          division_id: Cypress.env("divisionId"),
          po_date: Cypress.env("date_formate"),
          ship_date: Cypress.env("date_formate"),
          warehouse_date: Cypress.env("date_formate"),
          warehouse_id : Cypress.env("warehouseId"),
          vendor_id: Cypress.env("vendor_id"),
          ship_via_id: Cypress.env("ship_viaId"),
          inhouse_po_number: Cypress.env("Random"),
          fob: Cypress.env("Random"),
          shipment_from: Cypress.env("Random"),
          destination: Cypress.env("Random"),
          term_id: Cypress.env("termId"),
          is_purchase_confirmed: Cypress.env("randomBoolean"),
          is_special_order: Cypress.env("randomBoolean"),
          is_special_cut: Cypress.env("randomBoolean"),
          status: 1,
          "pay_to": {
            "contact_name": Cypress.env("Random"),
            "address_1": Cypress.env("Random"),
            "address_2": Cypress.env("Random"),
            "address_3":Cypress.env("Random"),
            "address_4":Cypress.env("Random"),
            "city": Cypress.env("Random"),
            "state": Cypress.env("Random"),
            "zip": Cypress.env("Random"),
            "country": Cypress.env("Random") 
          },
          "ship_to": {
            "contact_name": Cypress.env("Random"),
            "address_1": Cypress.env("Random"),
            "address_2": Cypress.env("Random"),
            "address_3": Cypress.env("Random"),
            "address_4":Cypress.env("Random"),
            "city": Cypress.env("Random"),
            "state": Cypress.env("Random"),
            "zip": Cypress.env("Random"),
            "country": Cypress.env("Random")
          },
          lines: [
            {
              line: 1,
              item_id: Cypress.env("ItemId_I"),
              color_id: Cypress.env("resColorId_I"),
              stage_id: Cypress.env("stage_id"),
              status: 1,
              variants: [
                {
                  csku_id: Csku_id_I[0],
                  cost: Cypress.env("RandomNum_2"),
                  order_qty: Cypress.env("RandomNum_2"),
                  status: 1
                },
                {
                  csku_id: Csku_id_I[1],
                  cost: Cypress.env("RandomNum_2"),
                  order_qty:Cypress.env("RandomNum_2"),
                  status: 1
                }
              ]
            },
            {
              line: 2,
              item_id: Cypress.env("ItemId_P"),
              color_id: Cypress.env("resColorId_P"),
              stage_id: Cypress.env("stage_id"),
              status: 1,
              variants: [
                {
                  csku_id: Csku_id_P[0],
                  cost: Cypress.env("RandomNum_2"),
                  order_qty: Cypress.env("RandomNum_2"),
                  status: 1
                },
                {
                  csku_id: Csku_id_P[1],
                  cost: Cypress.env("RandomNum_2"),
                  order_qty: Cypress.env("RandomNum_2"),
                  status: 1
                }
              ]
            }
          ]
        };
        cy.request({
          method: routes.post,
          url: routes.post_PO,
          body: requestData,
          headers: { Authorization: Cypress.env("companyToken") }
        }).then(({ body }) => {
          import_po_id = body.result.data.id;
          lines_id = body.result.data.lines.map((ele: any) => ele.id);
          let variantsId = body.result.data.lines.forEach((ele: any) => {
            ele.variants.forEach((elem: any) => {
              varients_id.push(elem.id);
            });
          });
          let res =body.result.data;
          cy.Success(body);
          expect(res).has.property("id");
          expect(res).has.property("po_number");
          expect(res).has.property("po_date", requestData.po_date).to.be.string;
          expect(res).has.property("ship_date",requestData.ship_date).to.be.string;
          expect(res).has.property("warehouse_date",requestData.warehouse_date).to.be.string;
          expect(res).has.property("inhouse_po_number",requestData.inhouse_po_number).to.be.string;
          expect(res).has.property("fob", requestData.fob).to.be.string;
          expect(res).has.property("shipment_from",requestData.shipment_from).to.be.string;
          expect(res).has.property("destination",requestData.destination).to.be.string;
          expect(res).has.property("is_purchase_confirmed",requestData.is_purchase_confirmed);
          expect(res).has.property("is_special_order",requestData.is_special_order);
          expect(res).has.property("is_special_cut",requestData.is_special_cut);
          expect(res).has.property("status", requestData.status);
          expect(res).has.property("division_id",requestData.division_id);
          expect(res).has.property("division_code");
          expect(res).has.property("division_name");
          expect(res).has.property("warehouse_id",requestData.warehouse_id);
          expect(res).has.property("warehouse_code");
          expect(res).has.property("warehouse_name");
          expect(res).has.property("vendor_id",requestData.vendor_id);
          expect(res).has.property("vendor_code");
          expect(res).has.property("vendor_name");
          expect(res).has.property("ship_via_id",requestData.ship_via_id);
          expect(res).has.property("ship_via_code");
          expect(res).has.property("ship_via_name");
          expect(res).has.property("term_id", requestData.term_id);
          expect(res).has.property("term_code");
          expect(res).has.property("term_name");
          expect(res.pay_to).has.property("contact_name",requestData.pay_to.contact_name).to.be.string;
          expect(res.pay_to).has.property("address_1",requestData.pay_to.address_1).to.be.string;
          expect(res.pay_to).has.property("address_2",requestData.pay_to.address_2).to.be.string;
          expect(res.pay_to).has.property("address_3",requestData.pay_to.address_3).to.be.string;
          expect(res.pay_to).has.property("address_4",requestData.pay_to.address_4).to.be.string;
          expect(res.pay_to).has.property("city",requestData.pay_to.city).to.be.string;
          expect(res.pay_to).has.property("state",requestData.pay_to.state).to.be.string;
          expect(res.pay_to).has.property("zip",requestData.pay_to.zip).to.be.string;
          expect(res.pay_to).has.property("country",requestData.pay_to.country).to.be.string;
          expect(res.ship_to).has.property("contact_name",requestData.ship_to.contact_name).to.be.string;
          expect(res.ship_to).has.property("address_1",requestData.ship_to.address_1).to.be.string;
          expect(res.ship_to).has.property("address_2",requestData.ship_to.address_2).to.be.string;
          expect(res.ship_to).has.property("address_3",requestData.ship_to.address_3).to.be.string;
          expect(res.ship_to).has.property("address_4",requestData.ship_to.address_4).to.be.string;
          expect(res.ship_to).has.property("city",requestData.ship_to.city).to.be.string;
          expect(res.ship_to).has.property("state",requestData.ship_to.state).to.be.string;
          expect(res.ship_to).has.property("zip",requestData.ship_to.zip).to.be.string;
          expect(res.ship_to).has.property("country",requestData.ship_to.country).to.be.string;
          res.lines.forEach((element: any, index: any) => {
            let inline = requestData.lines[index];
            expect(element).has.property("id");
            expect(element).has.property("import_po_id");
            expect(element).has.property("line", inline.line);
            expect(element).has.property("item_id",inline.item_id);
            expect(element).has.property("item_code");
            expect(element).has.property("item_name");
            expect(element).has.property("color_id",inline.color_id);
            expect(element).has.property("color_code");
            expect(element).has.property("color_name");
            expect(element).has.property("stage_id",inline.stage_id);
            expect(element).has.property("stage_code");
            expect(element).has.property("stage_name");
            expect(element).has.property("prepack_id");
            expect(element).has.property("status", inline.status);
            element.variants.forEach((element1: any, inner_index: any) => {
              let invariant = inline.variants[inner_index];
              let req_cost = invariant.cost.toString();
              expect(element1).has.property("id");
              expect(element1).has.property("csku_id",invariant.csku_id);
              if(Cypress.env("meta_value")>0){
                req_cost = invariant.cost.toFixed(
                  Cypress.env("meta_value"))
              }else{
                req_cost = invariant.cost.toFixed(
                  Cypress.env("def_metaValue"))
              }
              expect(element1).has.deep.property("cost",req_cost);
              expect(element1).has.property("order_qty",invariant.order_qty);
              expect(element1).has.property("intrans_qty");
              expect(element1).has.property("incustom_qty");
              expect(element1).has.property("received_qty");
              expect(element1).has.property("status",invariant.status);
              expect(element1).has.property("row_num");
              expect(element1).has.property("row_name");
              expect(element1).has.property("col_num");
              expect(element1).has.property("col_name");
              expect(element1).has.property("item_grid_id");
            });
          });
        });
      });
    });
  });

  it(`Test case craete import_po when optional field are blank`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      warehouse_id : Cypress.env("warehouseId"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      inhouse_po_number: "",
      fob: "",
      shipment_from: "",
      destination: "",
      term_id: "",
      is_purchase_confirmed: Cypress.env("randomBoolean"),
      is_special_order: Cypress.env("randomBoolean"),
      is_special_cut: Cypress.env("randomBoolean"),
      status:0,
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "address_2": "",
        "address_3":"",
        "address_4":"",
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "address_2": "",
        "address_3": "",
        "address_4":"",
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          stage_id: "",
          status: 0,
          variants: [
            {
              csku_id: Csku_id_I[0],
              cost: Cypress.env("RandomNum_2"),
              order_qty: Cypress.env("RandomNum_2"),
              status: 0
            },
            {
              csku_id: Csku_id_I[1],
              cost: Cypress.env("RandomNum_2"),
              order_qty: Cypress.env("RandomNum_2"),
              status: 0
            }
          ]
        },
        {
          line: 2,
          item_id: Cypress.env("ItemId_P"),
          color_id: Cypress.env("resColorId_P"),
          stage_id: "",
          status: 0,
          variants: [
            {
              csku_id: Csku_id_P[0],
              cost:Cypress.env("RandomNum_2"),
              order_qty: Cypress.env("RandomNum_2"),
              status: 0
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      import_po_id_nxt = body.result.data.id;
      lines_id1 = body.result.data.lines.map((ele: any) => ele.id);
      let variantsId = body.result.data.lines.forEach((ele: any) => {
        ele.variants.forEach((elem: any) => {
          varients_id1.push(elem.id);
        });
      });
      cy.Success(body);
      let res = body.result.data;
      expect(res).has.property("id");
      expect(res).has.property("po_number");
      expect(res).has.property("po_date", requestData.po_date);
      expect(res).has.property("ship_date",requestData.ship_date);
      expect(res).has.property("warehouse_date",requestData.warehouse_date);
      expect(res).has.property("inhouse_po_number",requestData.inhouse_po_number);
      expect(res).has.property("fob", requestData.fob);
      expect(res).has.property("shipment_from",requestData.shipment_from);
      expect(res).has.property("destination",requestData.destination);
      expect(res).has.property("is_purchase_confirmed",requestData.is_purchase_confirmed);
      expect(res).has.property("is_special_order",requestData.is_special_order);
      expect(res).has.property("is_special_cut",requestData.is_special_cut);
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("division_id",requestData.division_id);
      expect(res).has.property("division_code");
      expect(res).has.property("division_name");
      expect(res).has.property("warehouse_id",requestData.warehouse_id);
      expect(res).has.property("warehouse_code");
      expect(res).has.property("warehouse_name");
      expect(res).has.property("vendor_id",requestData.vendor_id);
      expect(res).has.property("vendor_code");
      expect(res).has.property("vendor_name");
      expect(res).has.property("ship_via_id",requestData.ship_via_id);
      expect(res).has.property("ship_via_code");
      expect(res).has.property("ship_via_name");
      expect(res).has.property("term_id").to.be.null;
      expect(res).has.property("term_code");
      expect(res).has.property("term_name");
      expect(res.pay_to).has.property("contact_name",requestData.pay_to.contact_name);
      expect(res.pay_to).has.property("address_1",requestData.pay_to.address_1);
      expect(res.pay_to).has.property("address_2");
      expect(res.pay_to).has.property("address_3");
      expect(res.pay_to).has.property("address_4");
      expect(res.pay_to).has.property("city",requestData.pay_to.city);
      expect(res.pay_to).has.property("state",requestData.pay_to.state);
      expect(res.pay_to).has.property("zip",requestData.pay_to.zip);
      expect(res.pay_to).has.property("country",requestData.pay_to.country);
      expect(res.ship_to).has.property("contact_name",requestData.ship_to.contact_name);
      expect(res.ship_to).has.property("address_1",requestData.ship_to.address_1);
      expect(res.ship_to).has.property("address_2");
      expect(res.ship_to).has.property("address_3");
      expect(res.ship_to).has.property("address_4");
      expect(res.ship_to).has.property("city",requestData.ship_to.city);
      expect(res.ship_to).has.property("state",requestData.ship_to.state);
      expect(res.ship_to).has.property("zip",requestData.ship_to.zip);
      expect(res.ship_to).has.property("country",requestData.ship_to.country);
      res.lines.forEach((element: any, index: any) => {
        let inline = requestData.lines[index];
        expect(element).has.property("id");
        expect(element).has.property("import_po_id");
        expect(element).has.property("line", inline.line);
        expect(element).has.property("item_id",inline.item_id);
        expect(element).has.property("item_code");
        expect(element).has.property("item_name");
        expect(element).has.property("color_id",inline.color_id);
        expect(element).has.property("color_code");
        expect(element).has.property("color_name");
        expect(element).has.property("stage_id").to.be.null;
        expect(element).has.property("stage_code");
        expect(element).has.property("stage_name");
        expect(element).has.property("prepack_id");
        expect(element).has.property("status", inline.status);
        element.variants.forEach((element1: any, inner_index: any) => {
          let invariant = inline.variants[inner_index];
          let req_cost = invariant.cost.toString();
          expect(element1).has.property("id");
          expect(element1).has.property("csku_id",invariant.csku_id);
          if(Cypress.env("meta_value")>0){
            req_cost = invariant.cost.toFixed(
              Cypress.env("meta_value"))
          }else{
            req_cost = invariant.cost.toFixed(
              Cypress.env("def_metaValue"))
          }
          expect(element1).has.deep.property("cost",req_cost);
          expect(element1).has.property("order_qty",invariant.order_qty);
          expect(element1).has.property("intrans_qty");
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("received_qty");
          expect(element1).has.property("status",invariant.status);
          expect(element1).has.property("row_num");
          expect(element1).has.property("row_name");
          expect(element1).has.property("col_num");
          expect(element1).has.property("col_name");
          expect(element1).has.property("item_grid_id");
        });
      });
    });
  });

  it(`Test case craete import_po when optional field are null`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      warehouse_id : Cypress.env("warehouseId"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      inhouse_po_number: null,
      fob: null,
      shipment_from: null,
      destination: null,
      term_id: null,
      is_purchase_confirmed: Cypress.env("randomBoolean"),
      is_special_order: Cypress.env("randomBoolean"),
      is_special_cut: Cypress.env("randomBoolean"),
      status: Cypress.env("randomBoolean"),
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "address_2": null,
        "address_3":null,
        "address_4":null,
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "address_2": null,
        "address_3": null,
        "address_4":null,
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          stage_id: null,
          status: 0,
          variants: [
            {
              csku_id: Csku_id_I[0],
              cost: Cypress.env("RandomNum_2"),
              order_qty:Cypress.env("RandomNum_2"),
              status: 0
            },
            {
              csku_id: Csku_id_I[1],
              cost: Cypress.env("RandomNum_2"),
              order_qty:Cypress.env("RandomNum_2"),
              status: 0
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      import_po_id_1 = body.result.data.id;
      lines_id_2 = body.result.data.lines.map((ele: any) => ele.id);
      let variantsId = body.result.data.lines.forEach((ele: any) => {
        ele.variants.forEach((elem: any) => {
          varients_id_2.push(elem.id);
        });
      });
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("po_number");
      expect(res).has.property("po_date", requestData.po_date);
      expect(res).has.property("ship_date",requestData.ship_date);
      expect(res).has.property("warehouse_date",requestData.warehouse_date);
      expect(res).has.property("inhouse_po_number",requestData.inhouse_po_number);
      expect(res).has.property("fob", requestData.fob);
      expect(res).has.property("shipment_from",requestData.shipment_from);
      expect(res).has.property("destination",requestData.destination);
      expect(res).has.property("is_purchase_confirmed",requestData.is_purchase_confirmed);
      expect(res).has.property("is_special_order",requestData.is_special_order);
      expect(res).has.property("is_special_cut",requestData.is_special_cut);
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("division_id",requestData.division_id);
      expect(res).has.property("division_code");
      expect(res).has.property("division_name");
      expect(res).has.property("warehouse_id",requestData.warehouse_id);
      expect(res).has.property("warehouse_code");
      expect(res).has.property("warehouse_name");
      expect(res).has.property("vendor_id",requestData.vendor_id);
      expect(res).has.property("vendor_code");
      expect(res).has.property("vendor_name");
      expect(res).has.property("ship_via_id",requestData.ship_via_id);
      expect(res).has.property("ship_via_code");
      expect(res).has.property("ship_via_name");
      expect(res).has.property("term_id").to.be.null;
      expect(res).has.property("term_code");
      expect(res).has.property("term_name");
      expect(res.pay_to).has.property("contact_name",requestData.pay_to.contact_name);
      expect(res.pay_to).has.property("address_1",requestData.pay_to.address_1);
      expect(res.pay_to).has.property("address_2").to.be.null;
      expect(res.pay_to).has.property("address_3").to.be.null;
      expect(res.pay_to).has.property("address_4").to.be.null;
      expect(res.pay_to).has.property("city",requestData.pay_to.city);
      expect(res.pay_to).has.property("state",requestData.pay_to.state);
      expect(res.pay_to).has.property("zip",requestData.pay_to.zip);
      expect(res.pay_to).has.property("country",requestData.pay_to.country);
      expect(res.ship_to).has.property("contact_name",requestData.ship_to.contact_name);
      expect(res.ship_to).has.property("address_1",requestData.ship_to.address_1);
      expect(res.ship_to).has.property("address_2").to.be.null;
      expect(res.ship_to).has.property("address_3").to.be.null;
      expect(res.ship_to).has.property("address_4").to.be.null;
      expect(res.ship_to).has.property("city",requestData.ship_to.city);
      expect(res.ship_to).has.property("state",requestData.ship_to.state);
      expect(res.ship_to).has.property("zip",requestData.ship_to.zip);
      expect(res.ship_to).has.property("country",requestData.ship_to.country);
      res.lines.forEach((element: any, index: any) => {
        let inline = requestData.lines[index];
        expect(element).has.property("id");
        expect(element).has.property("import_po_id");
        expect(element).has.property("line", inline.line);
        expect(element).has.property("item_id",inline.item_id);
        expect(element).has.property("item_code");
        expect(element).has.property("item_name");
        expect(element).has.property("color_id",inline.color_id);
        expect(element).has.property("color_code");
        expect(element).has.property("color_name");
        expect(element).has.property("stage_id",inline.stage_id);
        expect(element).has.property("stage_code");
        expect(element).has.property("stage_name");
        expect(element).has.property("prepack_id");
        expect(element).has.property("status", inline.status);
        element.variants.forEach((element1: any, inner_index: any) => {
          let invariant = inline.variants[inner_index];
          let req_cost = invariant.cost.toString();
          expect(element1).has.property("id");
          expect(element1).has.property("csku_id",invariant.csku_id);
          if(Cypress.env("meta_value")>0){
            req_cost = invariant.cost.toFixed(
              Cypress.env("meta_value"))
          }else{
            req_cost = invariant.cost.toFixed(
              Cypress.env("def_metaValue"))
          }
          expect(element1).has.deep.property("cost",req_cost);
          expect(element1).has.property("order_qty",invariant.order_qty);
          expect(element1).has.property("intrans_qty");
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("received_qty");
          expect(element1).has.property("status",invariant.status);
          expect(element1).has.property("row_num");
          expect(element1).has.property("row_name");
          expect(element1).has.property("col_num");
          expect(element1).has.property("col_name");
          expect(element1).has.property("item_grid_id");
        });
      });
    });
  });

  it(`Test case craete import_po when optional field are not provided`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      warehouse_id : Cypress.env("warehouseId"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: Csku_id_I[0],
              cost: Cypress.env("RandomNum_2"),
              order_qty: Cypress.env("RandomNum_2"),
            },
            {
              csku_id: Csku_id_I[1],
              cost: Cypress.env("RandomNum_2"),
              order_qty: Cypress.env("RandomNum_2"),
            }
          ]
        },
        {
          line: 2,
          item_id: Cypress.env("ItemId_P"),
          color_id: Cypress.env("resColorId_P"),
          variants: [
            {
              csku_id: Csku_id_P[0],
              cost: Cypress.env("RandomNum_2"),
              order_qty: Cypress.env("RandomNum_2"),
            },
            {
              csku_id: Csku_id_P[1],
              cost: Cypress.env("RandomNum_2"),
              order_qty: Cypress.env("RandomNum_2"),
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
      body: requestData,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("po_number");
      expect(res).has.property("po_date", requestData.po_date);
      expect(res).has.property("ship_date",requestData.ship_date);
      expect(res).has.property("warehouse_date",requestData.warehouse_date);
      expect(res).has.property("inhouse_po_number");
      expect(res).has.property("fob");
      expect(res).has.property("shipment_from");
      expect(res).has.property("destination");
      expect(res).has.property("is_purchase_confirmed");
      expect(res).has.property("is_special_order");
      expect(res).has.property("is_special_cut");
      expect(res).has.property("status");
      expect(res).has.property("division_id",requestData.division_id);
      expect(res).has.property("division_code");
      expect(res).has.property("division_name");
      expect(res).has.property("warehouse_id",requestData.warehouse_id);
      expect(res).has.property("warehouse_code");
      expect(res).has.property("warehouse_name");
      expect(res).has.property("vendor_id",requestData.vendor_id);
      expect(res).has.property("vendor_code");
      expect(res).has.property("vendor_name");
      expect(res).has.property("ship_via_id",requestData.ship_via_id);
      expect(res).has.property("ship_via_code");
      expect(res).has.property("ship_via_name");
      expect(res).has.property("term_id");
      expect(res).has.property("term_code");
      expect(res).has.property("term_name");
      expect(res.pay_to).has.property("contact_name",requestData.pay_to.contact_name);
      expect(res.pay_to).has.property("address_1",requestData.pay_to.address_1);
      expect(res.pay_to).has.property("address_2").to.be.null;
      expect(res.pay_to).has.property("address_3").to.be.null;
      expect(res.pay_to).has.property("address_4").to.be.null;
      expect(res.pay_to).has.property("city",requestData.pay_to.city);
      expect(res.pay_to).has.property("state",requestData.pay_to.state);
      expect(res.pay_to).has.property("zip",requestData.pay_to.zip);
      expect(res.pay_to).has.property("country",requestData.pay_to.country);
      expect(res.ship_to).has.property("contact_name",requestData.ship_to.contact_name);
      expect(res.ship_to).has.property("address_1",requestData.ship_to.address_1);
      expect(res.ship_to).has.property("address_2").to.be.null;
      expect(res.ship_to).has.property("address_3").to.be.null;
      expect(res.ship_to).has.property("address_4").to.be.null;
      expect(res.ship_to).has.property("city",requestData.ship_to.city);
      expect(res.ship_to).has.property("state",requestData.ship_to.state);
      expect(res.ship_to).has.property("zip",requestData.ship_to.zip);
      expect(res.ship_to).has.property("country",requestData.ship_to.country);
      res.lines.forEach((element: any, index: any) => {
        let inline = requestData.lines[index];
        expect(element).has.property("id");
        expect(element).has.property("import_po_id");
        expect(element).has.property("line", inline.line);
        expect(element).has.property("item_id",inline.item_id);
        expect(element).has.property("item_code");
        expect(element).has.property("item_name");
        expect(element).has.property("color_id",inline.color_id);
        expect(element).has.property("color_code");
        expect(element).has.property("color_name");
        expect(element).has.property("stage_id");
        expect(element).has.property("stage_code");
        expect(element).has.property("stage_name");
        expect(element).has.property("prepack_id");
        expect(element).has.property("status");
        element.variants.forEach((element1: any, inner_index: any) => {
          let invariant = inline.variants[inner_index];
          let req_cost = invariant.cost.toString();
          expect(element1).has.property("id");
          expect(element1).has.property("csku_id",invariant.csku_id);
          if(Cypress.env("meta_value")>0){
            req_cost = invariant.cost.toFixed(
              Cypress.env("meta_value"))
          }else{
            req_cost = invariant.cost.toFixed(
              Cypress.env("def_metaValue"))
          }
          expect(element1).has.deep.property("cost",req_cost);
          expect(element1).has.property("order_qty",invariant.order_qty);
          expect(element1).has.property("intrans_qty");
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("received_qty");
          expect(element1).has.property("status");
          expect(element1).has.property("row_num");
          expect(element1).has.property("row_name");
          expect(element1).has.property("col_num");
          expect(element1).has.property("col_name");
          expect(element1).has.property("item_grid_id");
        });
      });
    });
  });

});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {
  it(`Test case for update import_po when do not provide any field`, () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("po_number");
      expect(res).has.property("po_date");
      expect(res).has.property("ship_date");
      expect(res).has.property("warehouse_date");
      expect(res).has.property("inhouse_po_number");
      expect(res).has.property("fob");
      expect(res).has.property("shipment_from");
      expect(res).has.property("destination");
      expect(res).has.property("is_purchase_confirmed");
      expect(res).has.property("is_special_order");
      expect(res).has.property("is_special_cut");
      expect(res).has.property("status");
      expect(res).has.property("division_id");
      expect(res).has.property("division_code");
      expect(res).has.property("division_name");
      expect(res).has.property("warehouse_id");
      expect(res).has.property("warehouse_code");
      expect(res).has.property("warehouse_name");
      expect(res).has.property("vendor_id");
      expect(res).has.property("vendor_code");
      expect(res).has.property("vendor_name");
      expect(res).has.property("ship_via_id");
      expect(res).has.property("ship_via_code");
      expect(res).has.property("ship_via_name");
      expect(res).has.property("term_id");
      expect(res).has.property("term_code");
      expect(res).has.property("term_name");
      expect(res.pay_to).has.property("contact_name");
      expect(res.pay_to).has.property("address_1");
      expect(res.pay_to).has.property("address_2");
      expect(res.pay_to).has.property("address_3");
      expect(res.pay_to).has.property("address_4");
      expect(res.pay_to).has.property("city");
      expect(res.pay_to).has.property("state");
      expect(res.pay_to).has.property("zip");
      expect(res.pay_to).has.property("country");
      expect(res.ship_to).has.property("contact_name");
      expect(res.ship_to).has.property("address_1");
      expect(res.ship_to).has.property("address_2");
      expect(res.ship_to).has.property("address_3");
      expect(res.ship_to).has.property("address_4");
      expect(res.ship_to).has.property("city");
      expect(res.ship_to).has.property("state");
      expect(res.ship_to).has.property("zip");
      expect(res.ship_to).has.property("country");
      res.lines.forEach((element: any) => {
        expect(element).has.property("id");
        expect(element).has.property("import_po_id");
        expect(element).has.property("line");
        expect(element).has.property("item_id");
        expect(element).has.property("item_code");
        expect(element).has.property("item_name");
        expect(element).has.property("color_id");
        expect(element).has.property("color_code");
        expect(element).has.property("color_name");
        expect(element).has.property("stage_id");
        expect(element).has.property("stage_code");
        expect(element).has.property("stage_name");
        expect(element).has.property("prepack_id");
        expect(element).has.property("status");
        element.variants.forEach((element1: any) => {
          expect(element1).has.property("id");
          expect(element1).has.property("csku_id");
          expect(element1).has.property("cost");
          expect(element1).has.property("order_qty");
          expect(element1).has.property("intrans_qty");
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("received_qty");
          expect(element1).has.property("status");
          expect(element1).has.property("row_num");
          expect(element1).has.property("row_name");
          expect(element1).has.property("col_num");
          expect(element1).has.property("col_name");
          expect(element1).has.property("item_grid_id");
        });
      });
    });
  });

  it(`Test case for update import_po when option field are not provided`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      warehouse_id : Cypress.env("warehouseId"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [
        {
          id: lines_id[0],
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              id: varients_id[0],
              csku_id: Csku_id_I[0],
              cost: Cypress.env("RandomNum_2"),
              order_qty: 100
            },
            {
              id: varients_id[1],
              csku_id: Csku_id_I[1],
              cost: Cypress.env("RandomNum_2"),
              order_qty: 50
            }
          ]
        },
        {
          id: lines_id[1],
          line: 2,
          item_id: Cypress.env("ItemId_P"),
          color_id: Cypress.env("resColorId_P"),
          variants: [
            {
              id: varients_id[2],
              csku_id: Csku_id_P[0],
              cost: Cypress.env("RandomNum_2"),
              order_qty: 30
            },
            {
              id: varients_id[3],
              csku_id: Csku_id_P[1],
              cost: Cypress.env("RandomNum_2"),
              order_qty: 30
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("po_number");
      expect(res).has.property("po_date", requestData.po_date);
      expect(res).has.property("ship_date",requestData.ship_date);
      expect(res).has.property("warehouse_date",requestData.warehouse_date);
      expect(res).has.property("inhouse_po_number");
      expect(res).has.property("fob");
      expect(res).has.property("shipment_from");
      expect(res).has.property("destination");
      expect(res).has.property("is_purchase_confirmed");
      expect(res).has.property("is_special_order");
      expect(res).has.property("is_special_cut");
      expect(res).has.property("status");
      expect(res).has.property("division_id",requestData.division_id);
      expect(res).has.property("division_code");
      expect(res).has.property("division_name");
      expect(res).has.property("warehouse_id",requestData.warehouse_id);
      expect(res).has.property("warehouse_code");
      expect(res).has.property("warehouse_name");
      expect(res).has.property("vendor_id",requestData.vendor_id);
      expect(res).has.property("vendor_code");
      expect(res).has.property("vendor_name");
      expect(res).has.property("ship_via_id",requestData.ship_via_id);
      expect(res).has.property("ship_via_code");
      expect(res).has.property("ship_via_name");
      expect(res).has.property("term_id");
      expect(res).has.property("term_code");
      expect(res).has.property("term_name");
      expect(res.pay_to).has.property("contact_name",requestData.pay_to.contact_name);
      expect(res.pay_to).has.property("address_1",requestData.pay_to.address_1);
      expect(res.pay_to).has.property("address_2");
      expect(res.pay_to).has.property("address_3");
      expect(res.pay_to).has.property("address_4");
      expect(res.pay_to).has.property("city",requestData.pay_to.city);
      expect(res.pay_to).has.property("state",requestData.pay_to.state);
      expect(res.pay_to).has.property("zip",requestData.pay_to.zip);
      expect(res.pay_to).has.property("country",requestData.pay_to.country);
      expect(res.ship_to).has.property("contact_name",requestData.ship_to.contact_name);
      expect(res.ship_to).has.property("address_1",requestData.ship_to.address_1);
      expect(res.ship_to).has.property("address_2");
      expect(res.ship_to).has.property("address_3");
      expect(res.ship_to).has.property("address_4");
      expect(res.ship_to).has.property("city",requestData.ship_to.city);
      expect(res.ship_to).has.property("state",requestData.ship_to.state);
      expect(res.ship_to).has.property("zip",requestData.ship_to.zip);
      expect(res.ship_to).has.property("country",requestData.ship_to.country);
      res.lines.forEach((element: any, index: any) => {
        let inline = requestData.lines[index];
        expect(element).has.property("id");
        expect(element).has.property("import_po_id");
        expect(element).has.property("line", inline.line);
        expect(element).has.property("item_id",inline.item_id);
        expect(element).has.property("item_code");
        expect(element).has.property("item_name");
        expect(element).has.property("color_id",inline.color_id);
        expect(element).has.property("color_code");
        expect(element).has.property("color_name");
        expect(element).has.property("stage_id");
        expect(element).has.property("stage_code");
        expect(element).has.property("stage_name");
        expect(element).has.property("prepack_id");
        expect(element).has.property("status");
        element.variants.forEach((element1: any, inner_index: any) => {
          let invariant = inline.variants[inner_index];
          let req_cost = invariant.cost.toString();
          expect(element1).has.property("id");
          expect(element1).has.property("csku_id",invariant.csku_id);
          if(Cypress.env("meta_value")>0){
            req_cost = invariant.cost.toFixed(
              Cypress.env("meta_value"))
          }else{
            req_cost = invariant.cost.toFixed(
              Cypress.env("def_metaValue"))
          }
          expect(element1).has.deep.property("cost",req_cost);
          expect(element1).has.property("order_qty",invariant.order_qty);
          expect(element1).has.property("intrans_qty");
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("received_qty");
          expect(element1).has.property("status");
          expect(element1).has.property("row_num");
          expect(element1).has.property("row_name");
          expect(element1).has.property("col_num");
          expect(element1).has.property("col_name");
          expect(element1).has.property("item_grid_id");
        });
      });
    });
  });

  it(`Test case for update import_po when required field are not provided`, () => {
    let requestData = {
      inhouse_po_number: Cypress.env("Random"),
      fob: Cypress.env("Random"),
      shipment_from: Cypress.env("Random"),
      destination: Cypress.env("Random"),
      term_id: Cypress.env("termId"),
      is_purchase_confirmed: Cypress.env("randomBoolean"),
      is_special_order: Cypress.env("randomBoolean"),
      is_special_cut: Cypress.env("randomBoolean"),
      status: 1,
      lines: [
        {
          id: lines_id[0],
          stage_id: Cypress.env("stage_id"),
          status: 1,
          variants: [
            {
              id: varients_id[0],
              status: 1,
            },
            {
              id: varients_id[1],
              status: 1,
            },
          ],
        },
        {
          id: lines_id[1],
          stage_id: Cypress.env("stage_id"),
          status: 1,
          variants: [
            {
              id: varients_id[2],
              status: 1
            },
            {
              id: varients_id[3],
              status: 1
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("po_number");
      expect(res).has.property("po_date");
      expect(res).has.property("ship_date");
      expect(res).has.property("warehouse_date");
      expect(res).has.property("inhouse_po_number",requestData.inhouse_po_number);
      expect(res).has.property("fob", requestData.fob);
      expect(res).has.property("shipment_from",requestData.shipment_from);
      expect(res).has.property("destination",requestData.destination);
      expect(res).has.property("is_purchase_confirmed",requestData.is_purchase_confirmed);
      expect(res).has.property("is_special_order",requestData.is_special_order);
      expect(res).has.property("is_special_cut",requestData.is_special_cut);
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("division_id");
      expect(res).has.property("division_code");
      expect(res).has.property("division_name");
      expect(res).has.property("warehouse_id");
      expect(res).has.property("warehouse_code");
      expect(res).has.property("warehouse_name");
      expect(res).has.property("vendor_id");
      expect(res).has.property("vendor_code");
      expect(res).has.property("vendor_name");
      expect(res).has.property("ship_via_id");
      expect(res).has.property("ship_via_code");
      expect(res).has.property("ship_via_name");
      expect(res).has.property("term_id", requestData.term_id);
      expect(res).has.property("term_code");
      expect(res).has.property("term_name");
      expect(res.pay_to).has.property("contact_name");
      expect(res.pay_to).has.property("address_1");
      expect(res.pay_to).has.property("address_2");
      expect(res.pay_to).has.property("address_3");
      expect(res.pay_to).has.property("address_4");
      expect(res.pay_to).has.property("city");
      expect(res.pay_to).has.property("state");
      expect(res.pay_to).has.property("zip");
      expect(res.pay_to).has.property("country");
      expect(res.ship_to).has.property("contact_name");
      expect(res.ship_to).has.property("address_1");
      expect(res.ship_to).has.property("address_2");
      expect(res.ship_to).has.property("address_3");
      expect(res.ship_to).has.property("address_4");
      expect(res.ship_to).has.property("city");
      expect(res.ship_to).has.property("state");
      expect(res.ship_to).has.property("zip");
      expect(res.ship_to).has.property("country");
      res.lines.forEach((element: any, index: any) => {
        let inline = requestData.lines[index];
        expect(element).has.property("id");
        expect(element).has.property("import_po_id");
        expect(element).has.property("line");
        expect(element).has.property("item_id");
        expect(element).has.property("item_code");
        expect(element).has.property("item_name");
        expect(element).has.property("color_id");
        expect(element).has.property("color_code");
        expect(element).has.property("color_name");
        expect(element).has.property("stage_id",inline.stage_id);
        expect(element).has.property("stage_code");
        expect(element).has.property("stage_name");
        expect(element).has.property("prepack_id");
        expect(element).has.property("status", inline.status);
        element.variants.forEach((element1: any, inner_index: any) => {
          let invariant = inline.variants[inner_index];
          expect(element1).has.property("id");
          expect(element1).has.property("csku_id");
         
          expect(element1).has.deep.property("cost");
          expect(element1).has.property("order_qty");
          expect(element1).has.property("intrans_qty");
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("received_qty");
          expect(element1).has.property("status",invariant.status);
          expect(element1).has.property("row_num");
          expect(element1).has.property("row_name");
          expect(element1).has.property("col_num");
          expect(element1).has.property("col_name");
          expect(element1).has.property("item_grid_id");
        });
      });
    });
  });

  it(`Test case for update import_po when option field are blank`, () => {
    let requestData = {
      inhouse_po_number: "",
      fob: "",
      shipment_from: "",
      destination: "",
      term_id: "",
      "pay_to": {
        "address_2": "",
        "address_3":"",
        "address_4":""
      },
      "ship_to": {
        "address_2": "",
        "address_3":"",
        "address_4":""
      },
      lines: [
        {
          id: lines_id[0],
          stage_id: ""
        }
      ]
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("po_number");
      expect(res).has.property("po_date");
      expect(res).has.property("ship_date");
      expect(res).has.property("warehouse_date");
      expect(res).has.property("inhouse_po_number");
      expect(res).has.property("fob");
      expect(res).has.property("shipment_from");
      expect(res).has.property("destination");
      expect(res).has.property("is_purchase_confirmed");
      expect(res).has.property("is_special_order");
      expect(res).has.property("is_special_cut");
      expect(res).has.property("status");
      expect(res).has.property("division_id");
      expect(res).has.property("division_code");
      expect(res).has.property("division_name");
      expect(res).has.property("warehouse_id");
      expect(res).has.property("warehouse_code");
      expect(res).has.property("warehouse_name");
      expect(res).has.property("vendor_id");
      expect(res).has.property("vendor_code");
      expect(res).has.property("vendor_name");
      expect(res).has.property("ship_via_id");
      expect(res).has.property("ship_via_code");
      expect(res).has.property("ship_via_name");
      expect(res).has.property("term_id");
      expect(res).has.property("term_code");
      expect(res).has.property("term_name");
      expect(res.pay_to).has.property("contact_name");
      expect(res.pay_to).has.property("address_1");
      expect(res.pay_to).has.property("address_2");
      expect(res.pay_to).has.property("address_3");
      expect(res.pay_to).has.property("address_4");
      expect(res.pay_to).has.property("city");
      expect(res.pay_to).has.property("state");
      expect(res.pay_to).has.property("zip");
      expect(res.pay_to).has.property("country");
      expect(res.ship_to).has.property("contact_name");
      expect(res.ship_to).has.property("address_1");
      expect(res.ship_to).has.property("address_2");
      expect(res.ship_to).has.property("address_3");
      expect(res.ship_to).has.property("address_4");
      expect(res.ship_to).has.property("city");
      expect(res.ship_to).has.property("state");
      expect(res.ship_to).has.property("zip");
      expect(res.ship_to).has.property("country");
      res.lines.forEach((element: any) => {
        expect(element).has.property("id");
        expect(element).has.property("import_po_id");
        expect(element).has.property("line");
        expect(element).has.property("item_id");
        expect(element).has.property("item_code");
        expect(element).has.property("item_name");
        expect(element).has.property("color_id");
        expect(element).has.property("color_code");
        expect(element).has.property("color_name");
        expect(element).has.property("stage_id");
        expect(element).has.property("stage_code");
        expect(element).has.property("stage_name");
        expect(element).has.property("prepack_id");
        expect(element).has.property("status");
        element.variants.forEach((element1: any) => {
          expect(element1).has.property("id");
          expect(element1).has.property("csku_id");
          expect(element1).has.property("cost");
          expect(element1).has.property("order_qty");
          expect(element1).has.property("intrans_qty");
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("received_qty");
          expect(element1).has.property("status");
          expect(element1).has.property("row_num");
          expect(element1).has.property("row_name");
          expect(element1).has.property("col_num");
          expect(element1).has.property("col_name");
          expect(element1).has.property("item_grid_id");
        });
      });
    });
  });

  it(`Test case for update import_po when option field are null`, () => {
    let requestData = {
      inhouse_po_number: null,
      fob: null,
      shipment_from: null,
      destination: null,
      term_id: null,
      "pay_to": {
        "address_2": null,
        "address_3":null,
        "address_4":null
      },
      "ship_to": {
        "address_2": null,
        "address_3":null,
        "address_4":null
      },
      lines: [
        {
          id: lines_id[0],
          stage_id: null,
        },
        {
          id: lines_id[1],
          stage_id: null,
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_PO}${import_po_id}`,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("po_number");
      expect(res).has.property("po_date");
      expect(res).has.property("ship_date");
      expect(res).has.property("warehouse_date");
      expect(res).has.property("inhouse_po_number",requestData.inhouse_po_number);
      expect(res).has.property("fob", requestData.fob);
      expect(res).has.property("shipment_from",requestData.shipment_from);
      expect(res).has.property("destination",requestData.destination);
      expect(res).has.property("is_purchase_confirmed");
      expect(res).has.property("is_special_order");
      expect(res).has.property("is_special_cut");
      expect(res).has.property("status");
      expect(res).has.property("division_id");
      expect(res).has.property("division_code");
      expect(res).has.property("division_name");
      expect(res).has.property("warehouse_id");
      expect(res).has.property("warehouse_code");
      expect(res).has.property("warehouse_name");
      expect(res).has.property("vendor_id");
      expect(res).has.property("vendor_code");
      expect(res).has.property("vendor_name");
      expect(res).has.property("ship_via_id");
      expect(res).has.property("ship_via_code");
      expect(res).has.property("ship_via_name");
      expect(res).has.property("term_id", requestData.term_id);
      expect(res).has.property("term_code");
      expect(res).has.property("term_name");
      expect(res.pay_to).has.property("contact_name");
      expect(res.pay_to).has.property("address_1");
      expect(res.pay_to).has.property("address_2",requestData.pay_to.address_2);
      expect(res.pay_to).has.property("address_3",requestData.pay_to.address_3);
      expect(res.pay_to).has.property("address_4",requestData.pay_to.address_4);
      expect(res.pay_to).has.property("city");
      expect(res.pay_to).has.property("state");
      expect(res.pay_to).has.property("zip");
      expect(res.pay_to).has.property("country");
      expect(res.ship_to).has.property("contact_name");
      expect(res.ship_to).has.property("address_1");
      expect(res.ship_to).has.property("address_2",requestData.ship_to.address_2);
      expect(res.ship_to).has.property("address_3",requestData.ship_to.address_3);
      expect(res.ship_to).has.property("address_4",requestData.ship_to.address_4);
      expect(res.ship_to).has.property("city");
      expect(res.ship_to).has.property("state");
      expect(res.ship_to).has.property("zip");
      expect(res.ship_to).has.property("country");
      res.lines.forEach((element: any, index: any) => {
        let inline = requestData.lines[index];
        expect(element).has.property("id");
        expect(element).has.property("import_po_id");
        expect(element).has.property("line");
        expect(element).has.property("item_id");
        expect(element).has.property("item_code");
        expect(element).has.property("item_name");
        expect(element).has.property("color_id");
        expect(element).has.property("color_code");
        expect(element).has.property("color_name");
        expect(element).has.property("stage_id",inline.stage_id);
        expect(element).has.property("stage_code");
        expect(element).has.property("stage_name");
        expect(element).has.property("prepack_id");
        expect(element).has.property("status");
        element.variants.forEach((element1: any, inner_index: any) => {
          expect(element1).has.property("id");
          expect(element1).has.property("csku_id");
          expect(element1).has.deep.property("cost");
          expect(element1).has.property("order_qty");
          expect(element1).has.property("intrans_qty");
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("received_qty");
          expect(element1).has.property("status");
          expect(element1).has.property("row_num");
          expect(element1).has.property("row_name");
          expect(element1).has.property("col_num");
          expect(element1).has.property("col_name");
          expect(element1).has.property("item_grid_id");
        });
      });
    });
  });

  it(`Test case for update import_po with all request field`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      warehouse_id : Cypress.env("warehouseId"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      inhouse_po_number: Cypress.env("Random"),
      fob: Cypress.env("Random"),
      shipment_from: Cypress.env("Random"),
      destination: Cypress.env("Random"),
      term_id: Cypress.env("termId"),
      is_purchase_confirmed: Cypress.env("randomBoolean"),
      is_special_order: Cypress.env("randomBoolean"),
      is_special_cut: Cypress.env("randomBoolean"),
      status: 1,
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "address_2": Cypress.env("Random"),
        "address_3":Cypress.env("Random"),
        "address_4":Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
        
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "address_2": Cypress.env("Random"),
        "address_3": Cypress.env("Random"),
        "address_4":Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [
        {
          id: lines_id[0],
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          stage_id: Cypress.env("stage_id"),
          status: 1,
          variants: [
            {
              id: varients_id[0],
              csku_id: Csku_id_I[0],
              cost: Cypress.env("RandomNum_2"),
              order_qty: 100,
              status: 1,
            },
            {
              id: varients_id[1],
              csku_id: Csku_id_I[1],
              cost: Cypress.env("RandomNum_2"),
              order_qty: 50,
              status: 1,
            },
          ],
        },
        {
          id: lines_id[1],
          line: 2,
          item_id: Cypress.env("ItemId_P"),
          color_id: Cypress.env("resColorId_P"),
          stage_id: Cypress.env("stage_id"),
          status: 1,
          variants: [
            {
              id: varients_id[2],
              csku_id: Csku_id_P[0],
              cost: Cypress.env("RandomNum_2"),
              order_qty: 30,
              status: 1
            },
            {
              id: varients_id[3],
              csku_id: Csku_id_P[1],
              cost: Cypress.env("RandomNum_2"),
              order_qty: 30,
              status: 1
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("po_number");
      expect(res).has.property("po_date", requestData.po_date).to.be.string;
      expect(res).has.property("ship_date",requestData.ship_date).to.be.string;
      expect(res).has.property("warehouse_date",requestData.warehouse_date).to.be.string;
      expect(res).has.property("inhouse_po_number",requestData.inhouse_po_number).to.be.string;
      expect(res).has.property("fob", requestData.fob).to.be.string;
      expect(res).has.property("shipment_from",requestData.shipment_from).to.be.string;
      expect(res).has.property("destination",requestData.destination).to.be.string;
      expect(res).has.property("is_purchase_confirmed",requestData.is_purchase_confirmed);
      expect(res).has.property("is_special_order",requestData.is_special_order);
      expect(res).has.property("is_special_cut",requestData.is_special_cut);
      expect(res).has.property("status", requestData.status);
      expect(res).has.property("division_id",requestData.division_id);
      expect(res).has.property("division_code");
      expect(res).has.property("division_name");
      expect(res).has.property("warehouse_id",requestData.warehouse_id);
      expect(res).has.property("warehouse_code");
      expect(res).has.property("warehouse_name");
      expect(res).has.property("vendor_id",requestData.vendor_id);
      expect(res).has.property("vendor_code");
      expect(res).has.property("vendor_name");
      expect(res).has.property("ship_via_id",requestData.ship_via_id);
      expect(res).has.property("ship_via_code");
      expect(res).has.property("ship_via_name");
      expect(res).has.property("term_id", requestData.term_id);
      expect(res).has.property("term_code");
      expect(res).has.property("term_name");
      expect(res.pay_to).has.property("contact_name",requestData.pay_to.contact_name).to.be.string;
      expect(res.pay_to).has.property("address_1",requestData.pay_to.address_1).to.be.string;
      expect(res.pay_to).has.property("address_2",requestData.pay_to.address_2).to.be.string;
      expect(res.pay_to).has.property("address_3",requestData.pay_to.address_3).to.be.string;
      expect(res.pay_to).has.property("address_4",requestData.pay_to.address_4).to.be.string;
      expect(res.pay_to).has.property("city",requestData.pay_to.city).to.be.string;
      expect(res.pay_to).has.property("state",requestData.pay_to.state).to.be.string;
      expect(res.pay_to).has.property("zip",requestData.pay_to.zip).to.be.string;
      expect(res.pay_to).has.property("country",requestData.pay_to.country).to.be.string;
      expect(res.ship_to).has.property("contact_name",requestData.ship_to.contact_name).to.be.string;
      expect(res.ship_to).has.property("address_1",requestData.ship_to.address_1).to.be.string;
      expect(res.ship_to).has.property("address_2",requestData.ship_to.address_2).to.be.string;
      expect(res.ship_to).has.property("address_3",requestData.ship_to.address_3).to.be.string;
      expect(res.ship_to).has.property("address_4",requestData.ship_to.address_4).to.be.string;
      expect(res.ship_to).has.property("city",requestData.ship_to.city).to.be.string;
      expect(res.ship_to).has.property("state",requestData.ship_to.state).to.be.string;
      expect(res.ship_to).has.property("zip",requestData.ship_to.zip).to.be.string;
      expect(res.ship_to).has.property("country",requestData.ship_to.country).to.be.string;
      res.lines.forEach((element: any, index: any) => {
        let inline = requestData.lines[index];
        expect(element).has.property("id");
        expect(element).has.property("import_po_id");
        expect(element).has.property("line", inline.line);
        expect(element).has.property("item_id",inline.item_id);
        expect(element).has.property("item_code");
        expect(element).has.property("item_name");
        expect(element).has.property("color_id",inline.color_id);
        expect(element).has.property("color_code");
        expect(element).has.property("color_name");
        expect(element).has.property("stage_id",inline.stage_id);
        expect(element).has.property("stage_code");
        expect(element).has.property("stage_name");
        expect(element).has.property("prepack_id");
        expect(element).has.property("status", inline.status);
        element.variants.forEach((element1: any, inner_index: any) => {
          let invariant = inline.variants[inner_index];
          let req_cost = invariant.cost.toString();
          expect(element1).has.property("id");
          expect(element1).has.property("csku_id",invariant.csku_id);
          if(Cypress.env("meta_value")>0){
            req_cost = invariant.cost.toFixed(
              Cypress.env("meta_value"))
          }else{
            req_cost = invariant.cost.toFixed(
              Cypress.env("def_metaValue"))
          }
          expect(element1).has.deep.property("cost",req_cost);
          expect(element1).has.property("order_qty",invariant.order_qty);
          expect(element1).has.property("intrans_qty");
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("received_qty");
          expect(element1).has.property("status",invariant.status);
          expect(element1).has.property("row_num");
          expect(element1).has.property("row_name");
          expect(element1).has.property("col_num");
          expect(element1).has.property("col_name");
          expect(element1).has.property("item_grid_id");
        });
      });
    });
  });
});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {
  it("Test case for FETCH API with all data", () => {
    let requestData = {
      search: [
        {
          key: "import_po.id",
          operation: "=",
          val: import_po_id,
        },
      ],
      select: [
        "import_po.id",
        "company_id",
        "po_number",
        "division_id",
        "po_date",
        "ship_date",
        "warehouse_date",
        "vendor_id",
        "inhouse_po_number",
        "ship_via_id",
        "shipment_from",
      ],
      sort: "import_po.id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      body: requestData,
      url: `${routes.post_PO}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((element: any, index: any) => {
      expect(element).has.property("id", requestData.search[index].val);
      expect(element).has.property("company_id");
      expect(element).has.property("po_number");
      expect(element).has.property("division_id");
      expect(element).has.property("po_date");
      expect(element).has.property("ship_date");
      expect(element).has.property("warehouse_date");
      expect(element).has.property("vendor_id");
      expect(element).has.property("inhouse_po_number");
      expect(element).has.property("ship_via_id");
      expect(element).has.property("shipment_from");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for FETCH API when do not provide any fields", () => {
    cy.request({
      method: routes.post,
      body: {},
      url: `${routes.post_PO}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((element: any) => {
        expect(element).has.property("id");
        expect(element).has.property("company_id");
        expect(element).has.property("po_number");
        expect(element).has.property("division_id");
        expect(element).has.property("po_date");
        expect(element).has.property("ship_date");
        expect(element).has.property("warehouse_date");
        expect(element).has.property("vendor_id");
        expect(element).has.property("inhouse_po_number");
        expect(element).has.property("fob");
        expect(element).has.property("ship_via_id");
        expect(element).has.property("shipment_from");
        expect(element).has.property("destination");
        expect(element).has.property("term_id");
        expect(element).has.property("is_purchase_confirmed");
        expect(element).has.property("is_special_order");
        expect(element).has.property("is_special_cut");
        expect(element).has.property("status");
        expect(element).has.property("created_date");
        expect(element).has.property("updated_date");
        expect(element).has.property("created_by");
        expect(element).has.property("updated_by");
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
        expect(element).has.property("vendor_name");
        expect(element).has.property("vendor_code");
        expect(element).has.property("vendor_description");
        expect(element).has.property("vendor_type_id");
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
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for FETCH API when search field is left blank", () => {
    let requestData = {
      search: [],
      select: [
        "import_po.id",
        "company_id",
        "po_number",
        "division_id",
        "po_date",
        "ship_date",
        "warehouse_date",
        "vendor_id",
        "inhouse_po_number",
        "ship_via_id",
        "shipment_from",
      ],
      sort: "import_po.id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      body: requestData,
      url: `${routes.post_PO}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((element: any) => {
        expect(element).has.property("id");
        expect(element).has.property("company_id");
        expect(element).has.property("po_number");
        expect(element).has.property("division_id");
        expect(element).has.property("po_date");
        expect(element).has.property("ship_date");
        expect(element).has.property("warehouse_date");
        expect(element).has.property("vendor_id");
        expect(element).has.property("inhouse_po_number");
        expect(element).has.property("ship_via_id");
        expect(element).has.property("shipment_from");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for FETCH API when search and select field are left blank", () => {
    let requestData = {
      search: [],
      select: [],
      sort: "import_po.id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      body: requestData,
      url: `${routes.post_PO}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((element: any) => {
        expect(element).has.property("id");
        expect(element).has.property("company_id");
        expect(element).has.property("po_number");
        expect(element).has.property("division_id");
        expect(element).has.property("po_date");
        expect(element).has.property("ship_date");
        expect(element).has.property("warehouse_date");
        expect(element).has.property("vendor_id");
        expect(element).has.property("inhouse_po_number");
        expect(element).has.property("fob");
        expect(element).has.property("ship_via_id");
        expect(element).has.property("shipment_from");
        expect(element).has.property("destination");
        expect(element).has.property("term_id");
        expect(element).has.property("is_purchase_confirmed");
        expect(element).has.property("is_special_order");
        expect(element).has.property("is_special_cut");
        expect(element).has.property("status");
        expect(element).has.property("created_date");
        expect(element).has.property("updated_date");
        expect(element).has.property("created_by");
        expect(element).has.property("updated_by");
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
        expect(element).has.property("vendor_name");
        expect(element).has.property("vendor_code");
        expect(element).has.property("vendor_description");
        expect(element).has.property("vendor_type_id");
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
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for FETCH API when not provide select field", () => {
    let requestData = {
      search: [
        {
          key: "import_po.id",
          operation: "=",
          val: import_po_id,
        },
      ],
      select: [],
      sort: "import_po.id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      body: requestData,
      url: `${routes.post_PO}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((element: any, index: any) => {
        expect(element).has.property("id", requestData.search[index].val);
        expect(element).has.property("company_id");
        expect(element).has.property("po_number");
        expect(element).has.property("division_id");
        expect(element).has.property("po_date");
        expect(element).has.property("ship_date");
        expect(element).has.property("warehouse_date");
        expect(element).has.property("vendor_id");
        expect(element).has.property("inhouse_po_number");
        expect(element).has.property("fob");
        expect(element).has.property("ship_via_id");
        expect(element).has.property("shipment_from");
        expect(element).has.property("destination");
        expect(element).has.property("term_id");
        expect(element).has.property("is_purchase_confirmed");
        expect(element).has.property("is_special_order");
        expect(element).has.property("is_special_cut");
        expect(element).has.property("status");
        expect(element).has.property("created_date");
        expect(element).has.property("updated_date");
        expect(element).has.property("created_by");
        expect(element).has.property("updated_by");
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
        expect(element).has.property("vendor_name");
        expect(element).has.property("vendor_code");
        expect(element).has.property("vendor_description");
        expect(element).has.property("vendor_type_id");
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
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it("Test case for FETCH when wrong/invalid data is provided in search field", () => {
    cy.request({
      method: routes.post,
      url: `${routes.post_PO}${"fetch"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      body: {
        search: [
          {
            key: "import_po.id",
            operation: "=",
            val: Cypress.env("RandomNumber"),
          },
        ],
        select: ["import_po.id", "vendor_id", "po_number"],
        sort: "import_po.id",
        orderby: "desc",
        page: 1,
        perPage: 20,
      },
    }).then(({ body }) => {
      cy.Success(body);
    });
  });
});

describe(`${store_msg.success_get}${Cypress.spec["fileName"]}`, () => {
  it(`Test case for get import_po`, () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let res = body.result.data;
      cy.Success(body);
      expect(res).has.property("id");
      expect(res).has.property("po_number");
      expect(res).has.property("po_date");
      expect(res).has.property("ship_date");
      expect(res).has.property("warehouse_date");
      expect(res).has.property("inhouse_po_number");
      expect(res).has.property("fob");
      expect(res).has.property("shipment_from");
      expect(res).has.property("destination");
      expect(res).has.property("is_purchase_confirmed");
      expect(res).has.property("is_special_order");
      expect(res).has.property("is_special_cut");
      expect(res).has.property("status");
      expect(res).has.property("division_id");
      expect(res).has.property("division_code");
      expect(res).has.property("division_name");
      expect(res).has.property("warehouse_id");
      expect(res).has.property("warehouse_code");
      expect(res).has.property("warehouse_name");
      expect(res).has.property("vendor_id");
      expect(res).has.property("vendor_code");
      expect(res).has.property("vendor_name");
      expect(res).has.property("ship_via_id");
      expect(res).has.property("ship_via_code");
      expect(res).has.property("ship_via_name");
      expect(res).has.property("term_id");
      expect(res).has.property("term_code");
      expect(res).has.property("term_name");
      expect(res.pay_to).has.property("contact_name");
      expect(res.pay_to).has.property("address_1");
      expect(res.pay_to).has.property("address_2");
      expect(res.pay_to).has.property("address_3");
      expect(res.pay_to).has.property("address_4");
      expect(res.pay_to).has.property("city");
      expect(res.pay_to).has.property("state");
      expect(res.pay_to).has.property("zip");
      expect(res.pay_to).has.property("country");
      expect(res.ship_to).has.property("contact_name");
      expect(res.ship_to).has.property("address_1");
      expect(res.ship_to).has.property("address_2");
      expect(res.ship_to).has.property("address_3");
      expect(res.ship_to).has.property("address_4");
      expect(res.ship_to).has.property("city");
      expect(res.ship_to).has.property("state");
      expect(res.ship_to).has.property("zip");
      expect(res.ship_to).has.property("country");
      res.lines.forEach((element: any) => {
        expect(element).has.property("id");
        expect(element).has.property("import_po_id");
        expect(element).has.property("line");
        expect(element).has.property("item_id");
        expect(element).has.property("item_code");
        expect(element).has.property("item_name");
        expect(element).has.property("color_id");
        expect(element).has.property("color_code");
        expect(element).has.property("color_name");
        expect(element).has.property("stage_id");
        expect(element).has.property("stage_code");
        expect(element).has.property("stage_name");
        expect(element).has.property("prepack_id");
        expect(element).has.property("status");
        element.variants.forEach((element1: any) => {
          expect(element1).has.property("id");
          expect(element1).has.property("csku_id");
          expect(element1).has.property("cost");
          expect(element1).has.property("order_qty");
          expect(element1).has.property("intrans_qty");
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("received_qty");
          expect(element1).has.property("status");
          expect(element1).has.property("row_num");
          expect(element1).has.property("row_name");
          expect(element1).has.property("col_num");
          expect(element1).has.property("col_name");
          expect(element1).has.property("item_grid_id");
        });
      });
    });
  });

  it(`Test case for get import_po`, () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_PO}${import_po_id_nxt}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("po_number");
      expect(body.result.data).has.property("po_date");
      expect(body.result.data).has.property("ship_date");
      expect(body.result.data).has.property("warehouse_date");
      expect(body.result.data).has.property("inhouse_po_number");
      expect(body.result.data).has.property("fob");
      expect(body.result.data).has.property("shipment_from");
      expect(body.result.data).has.property("destination");
      expect(body.result.data).has.property("is_purchase_confirmed");
      expect(body.result.data).has.property("is_special_order");
      expect(body.result.data).has.property("is_special_cut");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("division_id");
      expect(body.result.data).has.property("division_code");
      expect(body.result.data).has.property("division_name");
      expect(body.result.data).has.property("vendor_id");
      expect(body.result.data).has.property("vendor_code");
      expect(body.result.data).has.property("vendor_name");
      expect(body.result.data).has.property("ship_via_id");
      expect(body.result.data).has.property("ship_via_code");
      expect(body.result.data).has.property("ship_via_name");
      expect(body.result.data).has.property("term_id");
      expect(body.result.data).has.property("term_code");
      expect(body.result.data).has.property("term_name");
      body.result.data.lines.forEach((element: any) => {
        expect(element).has.property("id");
        expect(element).has.property("import_po_id");
        expect(element).has.property("line");
        expect(element).has.property("item_id");
        expect(element).has.property("item_code");
        expect(element).has.property("item_name");
        expect(element).has.property("color_id");
        expect(element).has.property("color_code");
        expect(element).has.property("color_name");
        expect(element).has.property("stage_id");
        expect(element).has.property("stage_code");
        expect(element).has.property("stage_name");
        expect(element).has.property("prepack_id");
        expect(element).has.property("status");
        element.variants.forEach((element1: any) => {
          expect(element1).has.property("id");
          expect(element1).has.property("csku_id");
          expect(element1).has.property("cost");
          expect(element1).has.property("order_qty");
          expect(element1).has.property("intrans_qty");
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("received_qty");
          expect(element1).has.property("status");
          expect(element1).has.property("row_num");
          expect(element1).has.property("row_name");
          expect(element1).has.property("col_num");
          expect(element1).has.property("col_name");
          expect(element1).has.property("item_grid_id");
        });
      });
    });
  });
});

describe(`${store_msg.success}${"print pdf and excel"} of ${Cypress.spec["fileName"]}`, () => {

  it(`Test case for print pdf for import_po`, () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_PO}${import_po_id}${"/print/pdf"}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("url");
    });
  });

  it(`Test case for print pdf for import_po`, () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_PO}${import_po_id}${"/print/excel"}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("url");
    });
  });
});

describe(`${store_msg.success_log}${Cypress.spec["fileName"]}`, () => {
  it("Test cases for get-log API", () => {
    let today = new Date().toISOString().slice(0, 10);
    let requestData = {
      module_name: "import_po",
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
      perPage: 20,
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
    let recordId = import_po_id.toString();
    let requestData = {
      module: "import_po",
      record_id: recordId,
      sort: "_id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      body: requestData,
      url: routes.track_change,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Track_change(body);
    });
  });

  it("Test case for look-up API", () => {
    let name = "import_po";
    let obj = {"statusCode":200,"success":true,"error":null,"result":{"message":"Module fields fetched successfully","data":{"fields":["id","company_id","po_number","division_id","po_date","ship_date","warehouse_date","vendor_id","inhouse_po_number","fob","ship_via_id","shipment_from","destination","term_id","is_purchase_confirmed","is_special_order","is_special_cut","warehouse_id","status","created_date","updated_date","created_by","updated_by"],"foreignKey":{"company_id":{"object":"company","fields":["id","name","org_id","fax","telephone","email","created_date","updated_date","created_by","updated_by","status","mongo_id","address","ein_cin","state_id"]},"division_id":{"object":"division","fields":["id","company_id","name","code","status","dba","def_factor_id","created_date","updated_date","created_by","updated_by"]},"vendor_id":{"object":"vendor","fields":["id","code","name","description","vendor_type_id","term_id","status","created_date","updated_date","created_by","updated_by"]},"ship_via_id":{"object":"ship_via","fields":["id","code","name","description","scac_code","status","created_date","updated_date","created_by","updated_by"]},"stage_id":{"object":"stage","fields":["id","code","name","description","status","created_date","updated_date","created_by","updated_by"]},"term_id":{"object":"terms","fields":["id","code","name","is_prepaid","description","term_netdays","discount","months","cutoffday","status","created_date","updated_date","created_by","updated_by"]}},"child":{"import_po_lines":{"fields":["id","import_po_id","line","item_id","color_id","prepack_id","stage_id","status","created_date","updated_date","created_by","updated_by"],"foreignKey":{"item_id":{"object":"item","fields":["id","code","name","description","company_id","division_id","season_id","group_id","category_id","design_id","body_id","royalty_id","type","parent_id","status","created_date","updated_date","created_by","updated_by"]},"color_id":{"object":"color","fields":["id","name","code","status","created_date","updated_date","created_by","updated_by"]},"stage_id":{"object":"stage","fields":["id","code","name","description","status","created_date","updated_date","created_by","updated_by"]},"prepack_id":{"object":"item","fields":["id","code","name","description","company_id","division_id","season_id","group_id","category_id","design_id","body_id","royalty_id","type","parent_id","status","created_date","updated_date","created_by","updated_by"]}}}}}}};
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

  it(`Test case when division_id doesn't exist`, () => {
    let requestData = {
      division_id: Cypress.env("RandomNumber"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      warehouse_id : Cypress.env("warehouseId"),
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
        
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: Csku_id_I[0],
              cost: 10,
              order_qty: 100,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("division_id");
    });
  });

  it(`Test case when vendor_id doesn't exist`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      vendor_id: Cypress.env("RandomNumber"),
      ship_via_id: Cypress.env("ship_viaId"),
      warehouse_id : Cypress.env("warehouseId"),
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
        
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: Csku_id_I[0],
              cost: 10,
              order_qty: 100,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("vendor_id");
    });
  });

  it(`Test case when warehouse_id doesn't exist`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      warehouse_id : Cypress.env("RandomNumber"),
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
        
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: Csku_id_I[0],
              cost: 10,
              order_qty: 100,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("warehouse_id");
    });
  });

  it(`Test case when ship_via_id doesn't exist`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("RandomNumber"),
      warehouse_id : Cypress.env("warehouseId"),
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
        
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: Csku_id_I[0],
              cost: 10,
              order_qty: 100,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("ship_via_id");
    });
  });

  it(`Test case when stage_id doesn't exist`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      warehouse_id : Cypress.env("warehouseId"),
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
        
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          stage_id: Cypress.env("RandomNumber"),
          variants: [
            {
              csku_id: Csku_id_I[0],
              cost: 10,
              order_qty: 100,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("stage_id");
    });
  });

  it(`Test case when term_id doesn't exist`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      term_id: Cypress.env("RandomNumber"),
      warehouse_id : Cypress.env("warehouseId"),
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
        
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: Csku_id_I[0],
              cost: 10,
              order_qty: 100,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("term_id");
    });
  });

  it(`Test case when item_id doesn't exist and csku_id is not associated with this item_id`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      warehouse_id : Cypress.env("warehouseId"),
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
        
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [
        {
          line: 1,
          item_id: Cypress.env("RandomNumber"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: Csku_id_I[0],
              cost: 10,
              order_qty: 100,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      // cy.Failure(body);
      // expect(body.error.errorDetails).has.property("csku_id");
      // expect(body.error.errorDetails).has.property("item_id");
    });
  });

  it(`Test case when color_id doesn't exist and csku_id is not associated with this color_id`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      warehouse_id : Cypress.env("warehouseId"),
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
        
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("RandomNumber"),
          variants: [
            {
              csku_id: Csku_id_I[0],
              cost: 10,
              order_qty: 100,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      // cy.Failure(body);
      // expect(body.error.errorDetails).has.property("csku_id");
      // expect(body.error.errorDetails).has.property("color_id");
    });
  });

  it(`Test case when csku_id doesn't exist`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      warehouse_id : Cypress.env("warehouseId"),
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
        
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: Cypress.env("RandomNumber"),
              cost: 10,
              order_qty: 100,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("csku_id");
    });
  });

  it(`po_date should be date-formate`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("Random"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      warehouse_id : Cypress.env("warehouseId"),
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
        
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: Csku_id_I[0],
              cost: 10,
              order_qty: 100,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("date_format");
    });
  });

  it(`ship_date should be date-formate`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("Random"),
      warehouse_date: Cypress.env("date_formate"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      warehouse_id : Cypress.env("warehouseId"),
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
        
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: Csku_id_I[0],
              cost: 10,
              order_qty: 100,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("date_format");
    });
  });

  it(`warehouse_date should be date-formate`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("Random"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      warehouse_id : Cypress.env("warehouseId"),
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
        
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: Csku_id_I[0],
              cost: 10,
              order_qty: 100,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("date_format");
    });
  });

  it(`division_id, vendor_id, ship_via_id, stage_id,term_id,is_purchase_confirmed,
      is_special_order,is_special_cut, status,warehouse_id,line,item_id,color_id,csku_id,cost,order_qty 
      should be Number data-type`, () => {
    let requestData = {
      division_id: Cypress.env("RandomNum"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      vendor_id: Cypress.env("RandomNum"),
      ship_via_id: Cypress.env("RandomNum"),
      term_id: Cypress.env("RandomNum"),
      is_purchase_confirmed: Cypress.env("RandomNum"),
      is_special_order: Cypress.env("RandomNum"),
      is_special_cut: Cypress.env("RandomNum"),
      status: Cypress.env("RandomNum"),
      warehouse_id : Cypress.env("RandomNum"),
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
        
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [
        {
          line: Cypress.env("RandomNum"),
          item_id: Cypress.env("RandomNum"),
          color_id: Cypress.env("RandomNum"),
          stage_id: Cypress.env("RandomNum"),
          status: Cypress.env("RandomNum"),
          variants: [
            {
              csku_id: Cypress.env("RandomNum"),
              cost: Cypress.env("RandomNum"),
              order_qty: Cypress.env("RandomNum"),
              status: Cypress.env("RandomNum"),
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("division_id");
      expect(body.error.errorDetails).has.property("vendor_id");
      expect(body.error.errorDetails).has.property("ship_via_id");
      expect(body.error.errorDetails).has.property("stage_id");
      expect(body.error.errorDetails).has.property("term_id");
      expect(body.error.errorDetails).has.property("is_purchase_confirmed");
      expect(body.error.errorDetails).has.property("is_special_order");
      expect(body.error.errorDetails).has.property("is_special_cut");
      expect(body.error.errorDetails).has.property("status");
      expect(body.error.errorDetails).has.property("warehouse_id");
      expect(body.error.errorDetails).has.property("line");
      expect(body.error.errorDetails).has.property("item_id");
      expect(body.error.errorDetails).has.property("color_id");
      expect(body.error.errorDetails).has.property("csku_id");
      expect(body.error.errorDetails).has.property("cost");
      expect(body.error.errorDetails).has.property("order_qty");
    });
  });

  it(`is_purchase_confirmed,is_special_order and status must be one of [0 or 1]`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      is_purchase_confirmed: Cypress.env("RandomNumber"),
      is_special_order: Cypress.env("RandomNumber"),
      is_special_cut: Cypress.env("RandomNumber"),
      status: Cypress.env("RandomNumber"),
      warehouse_id : Cypress.env("warehouseId"),
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          status: Cypress.env("RandomNumber"),
          variants: [
            {
              csku_id: Csku_id_I[0],
              cost: 10,
              order_qty: 100,
              status: Cypress.env("RandomNumber"),
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("is_purchase_confirmed");
      expect(body.error.errorDetails).has.property("is_special_order");
      expect(body.error.errorDetails).has.property("is_special_cut");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it(`line should be unique`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      warehouse_id : Cypress.env("warehouseId"),
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
        
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: Csku_id_I[0],
              cost: 10,
              order_qty: 100,
            },
          ],
        },
        {
          line: 1,
          item_id: Cypress.env("ItemId_P"),
          color_id: Cypress.env("resColorId_P"),
          status: Cypress.env("randomBoolean"),
          variants: [
            {
              csku_id: Csku_id_P[0],
              cost: 3,
              order_qty: 30,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("line");
    });
  });

  it(`test case when required field are not provided`, () => {
    let requestData = {
      inhouse_po_number: Cypress.env("Random"),
      fob: Cypress.env("Random"),
      shipment_from: Cypress.env("Random"),
      destination: Cypress.env("Random"),
      stage_id: Cypress.env("stage_id"),
      term_id: Cypress.env("termId"),
      is_purchase_confirmed: Cypress.env("randomBoolean"),
      is_special_order: Cypress.env("randomBoolean"),
      is_special_cut: Cypress.env("randomBoolean"),
      status: Cypress.env("randomBoolean"),
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("division_id");
      expect(body.error.errorDetails).has.property("po_date");
      expect(body.error.errorDetails).has.property("ship_date");
      expect(body.error.errorDetails).has.property("warehouse_date");
      expect(body.error.errorDetails).has.property("vendor_id");
      expect(body.error.errorDetails).has.property("ship_via_id");
      expect(body.error.errorDetails).has.property("warehouse_id");
      expect(body.error.errorDetails).has.property("pay_to");
      expect(body.error.errorDetails).has.property("ship_to");
    });
  });

  it(`Test case when required field are left blank`, () => {
    let requestData = {
      division_id: "",
      po_date: "",
      ship_date: "",
      warehouse_date: "",
      vendor_id: "",
      ship_via_id: "",
      warehouse_id : "",
      "pay_to": "",
      "ship_to": "",
      lines: [
        {
          line: "",
          item_id: "",
          color_id: "",
          variants: [
            {
              csku_id: "",
              cost: "",
              order_qty: "",
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("division_id");
      expect(body.error.errorDetails).has.property("po_date");
      expect(body.error.errorDetails).has.property("ship_date");
      expect(body.error.errorDetails).has.property("warehouse_date");
      expect(body.error.errorDetails).has.property("vendor_id");
      expect(body.error.errorDetails).has.property("ship_via_id");
      expect(body.error.errorDetails).has.property("warehouse_id");
      expect(body.error.errorDetails).has.property("pay_to");
      expect(body.error.errorDetails).has.property("ship_to");
      expect(body.error.errorDetails).has.property("line");
      expect(body.error.errorDetails).has.property("item_id");
      expect(body.error.errorDetails).has.property("color_id");
      expect(body.error.errorDetails).has.property("csku_id");
      expect(body.error.errorDetails).has.property("cost");
      expect(body.error.errorDetails).has.property("order_qty");
    });
  });

  it(`Test case when lines array haven't any object`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      warehouse_id : Cypress.env("warehouseId"),
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
        
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("lines");
    });
  });

  it(`Test case when required field are not provided into lines`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      warehouse_id : Cypress.env("warehouseId"),
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
        
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [{}],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
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

  it(`Test case when variants array haven't any object`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      warehouse_id : Cypress.env("warehouseId"),
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
        
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("variants");
    });
  });

  it(`Test case when variants object are blank`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      warehouse_id : Cypress.env("warehouseId"),
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
        
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [{}],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("csku_id");
      expect(body.error.errorDetails).has.property("cost");
      expect(body.error.errorDetails).has.property("order_qty");
    });
  });

  it(`The combination of item_id, color_id and csku_id should be unique`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      warehouse_id : Cypress.env("warehouseId"),
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
        
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: Csku_id_I[0],
              cost: 10,
              order_qty: 100,
            },
          ],
        },
        {
          line: 2,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: Csku_id_I[0],
              cost: 3,
              order_qty: 30,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("item_id");
      expect(body.error.errorDetails).has.property("color_id");
    });
  });

  it(`csku_id should be unique`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      warehouse_id : Cypress.env("warehouseId"),
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
        
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: Csku_id_I[0],
              cost: 10,
              order_qty: 100,
            },
            {
              csku_id: Csku_id_I[0],
              cost: 20,
              order_qty: 50,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("csku_id");
    });
  });

  it(`pay_to and ship_to - contact_name,address_1,city,state,zip,country should be required`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      warehouse_id : Cypress.env("RandomNumber"),
      "pay_to": {},
      "ship_to": {},
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: Csku_id_I[0],
              cost: 10,
              order_qty: 100,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
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

  it(`pay_to - contact_name,address_1,city,state,zip,country should not be blank`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      warehouse_id : Cypress.env("RandomNumber"),
      "pay_to": {
        "contact_name": "",
        "address_1": "",
        "city": "",
        "state": "",
        "zip": "",
        "country": ""
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: Csku_id_I[0],
              cost: 10,
              order_qty: 100,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
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

  it(`pay_to - contact_name,address_1,city,state,zip,country should not be null`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      warehouse_id : Cypress.env("RandomNumber"),
      "pay_to": {
        "contact_name": null,
        "address_1": null,
        "city": null,
        "state": null,
        "zip": null,
        "country": null
      },
      "ship_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: Csku_id_I[0],
              cost: 10,
              order_qty: 100,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
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

  it(`ship_to - contact_name,address_1,city,state,zip,country should not be blank`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      warehouse_id : Cypress.env("RandomNumber"),
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      "ship_to": {
        "contact_name": "",
        "address_1": "",
        "city": "",
        "state": "",
        "zip": "",
        "country": ""
      },
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: Csku_id_I[0],
              cost: 10,
              order_qty: 100,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
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

  it(`ship_to - contact_name,address_1,city,state,zip,country should not be null`, () => {
    let requestData = {
      division_id: Cypress.env("divisionId"),
      po_date: Cypress.env("date_formate"),
      ship_date: Cypress.env("date_formate"),
      warehouse_date: Cypress.env("date_formate"),
      vendor_id: Cypress.env("vendor_id"),
      ship_via_id: Cypress.env("ship_viaId"),
      warehouse_id : Cypress.env("RandomNumber"),
      "pay_to": {
        "contact_name": Cypress.env("Random"),
        "address_1": Cypress.env("Random"),
        "city": Cypress.env("Random"),
        "state": Cypress.env("Random"),
        "zip": Cypress.env("Random"),
        "country": Cypress.env("Random")
      },
      "ship_to": {
        "contact_name": null,
        "address_1": null,
        "city": null,
        "state": null,
        "zip": null,
        "country": null
      },
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: Csku_id_I[0],
              cost: 10,
              order_qty: 100,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_PO,
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
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {

  it(`Test case when division_id doesn't exist`, () => {
    let requestData = {
      division_id: Cypress.env("RandomNumber"),
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("division_id");
    });
  });

  it(`Test case when vendor_id doesn't exist`, () => {
    let requestData = {
      vendor_id: Cypress.env("RandomNumber"),
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("vendor_id");
    });
  });

  it(`Test case when warehouse_id doesn't exist`, () => {
    let requestData = {
      warehouse_id: Cypress.env("RandomNumber"),
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("warehouse_id");
    });
  });

  it(`Test case when ship_via_id doesn't exist`, () => {
    let requestData = {
      ship_via_id: Cypress.env("RandomNumber"),
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("ship_via_id");
    });
  });

  it(`Test case when stage_id doesn't exist`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id[0],
          stage_id: Cypress.env("RandomNumber"),
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("stage_id");
    });
  });

  it(`Test case when term_id doesn't exist`, () => {
    let requestData = {
      term_id: Cypress.env("RandomNumber"),
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("term_id");
    });
  });

  it(`Test case when item_id doesn't exist`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id[0],
          item_id: Cypress.env("RandomNumber"),
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      // cy.Failure(body);
      // expect(body.error.errorDetails).has.property("csku_id");
      // expect(body.error.errorDetails).has.property("item_id");
    });
  });

  it(`Test case when color_id doesn't exist and csku_id is not associated with this color_id`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id[0],
          color_id: Cypress.env("RandomNumber"),
        },
      ],
    };

    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      // cy.Failure(body);
      // expect(body.error.errorDetails).has.property("csku_id",);
      // expect(body.error.errorDetails).has.property("color_id");
    });
  });

  it(`Test case when csku_id doesn't exist`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id[0],
          variants: [
            {
              id: varients_id[0],
              csku_id: Cypress.env("RandomNumber"),
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      // cy.Failure(body);
      // expect(body.error.errorDetails).has.property("csku_id");
    });
  });

  it(`po_date should be date-formate`, () => {
    let requestData = { po_date: Cypress.env("Random") };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("date_format");
    });
  });

  it(`ship_date should be date-formate`, () => {
    let requestData = { ship_date: Cypress.env("Random") };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("date_format");
    });
  });

  it(`warehouse_date should be date-formate`, () => {
    let requestData = { warehouse_date: Cypress.env("Random") };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("date_format");
    });
  });

  it(`division_id, vendor_id, ship_via_id, stage_id,term_id,is_purchase_confirmed,
      is_special_order,is_special_cut, status,warehouse_id,line,item_id,color_id,csku_id,cost,order_qty 
      should be Number data-type`, () => {
    let requestData = {
      division_id: Cypress.env("RandomNum"),
      vendor_id: Cypress.env("RandomNum"),
      ship_via_id: Cypress.env("RandomNum"),
      term_id: Cypress.env("RandomNum"),
      is_purchase_confirmed: Cypress.env("RandomNum"),
      is_special_order: Cypress.env("RandomNum"),
      is_special_cut: Cypress.env("RandomNum"),
      status: Cypress.env("RandomNum"),
      warehouse_id :Cypress.env("RandomNum"),
      lines: [
        {
          id: lines_id[0],
          line: Cypress.env("RandomNum"),
          item_id: Cypress.env("RandomNum"),
          color_id: Cypress.env("RandomNum"),
          stage_id: Cypress.env("RandomNum"),
          status: Cypress.env("RandomNum"),
          variants: [
            {
              id: varients_id[0],
              csku_id: Cypress.env("RandomNum"),
              cost: Cypress.env("RandomNum"),
              order_qty: Cypress.env("RandomNum"),
              status: Cypress.env("RandomNum"),
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("division_id");
      expect(body.error.errorDetails).has.property("vendor_id");
      expect(body.error.errorDetails).has.property("ship_via_id");
      expect(body.error.errorDetails).has.property("stage_id");
      expect(body.error.errorDetails).has.property("term_id");
      expect(body.error.errorDetails).has.property("is_purchase_confirmed");
      expect(body.error.errorDetails).has.property("is_special_order");
      expect(body.error.errorDetails).has.property("is_special_cut");
      expect(body.error.errorDetails).has.property("status");
      expect(body.error.errorDetails).has.property("warehouse_id");
      expect(body.error.errorDetails).has.property("line");
      expect(body.error.errorDetails).has.property("item_id");
      expect(body.error.errorDetails).has.property("color_id");
      expect(body.error.errorDetails).has.property("csku_id");
      expect(body.error.errorDetails).has.property("cost");
      expect(body.error.errorDetails).has.property("order_qty");
    });
  });

  it(`is_purchase_confirmed,is_special_order and status must be one of [0 or 1]`, () => {
    let requestData = {
      is_purchase_confirmed: Cypress.env("RandomNumber"),
      is_special_order: Cypress.env("RandomNumber"),
      is_special_cut: Cypress.env("RandomNumber"),
      status: Cypress.env("RandomNumber"),
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("is_purchase_confirmed");
      expect(body.error.errorDetails).has.property("is_special_order");
      expect(body.error.errorDetails).has.property("is_special_cut");
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it(`line should be unique`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id[0],
          line: 1,
        },
        {
          id: lines_id[1],
          line: 1,
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("line");
    });
  });

  it(`line should be unique while craeting new line via update API`, () => {
    let requestData = {
      lines: [
        {
          line: 1,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              csku_id: Csku_id_I[0],
              cost: 10,
              order_qty: 100,
            },
            {
              csku_id: Csku_id_I[1],
              cost: 20,
              order_qty: 50,
            },
          ],
        }
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("line");
    });
  });

  it(`Test case when required field are left blank`, () => {
    let requestData = {
      division_id: "",
      po_date: "",
      ship_date: "",
      warehouse_date: "",
      vendor_id: "",
      ship_via_id: "",
      pay_to:"",
      ship_to:"",
      lines: [
        {
          id: lines_id[0],
          line: "",
          item_id: "",
          color_id: "",
          variants: [
            {
              id: varients_id[0],
              csku_id: "",
              cost: "",
              order_qty: "",
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("division_id");
      expect(body.error.errorDetails).has.property("po_date");
      expect(body.error.errorDetails).has.property("ship_date");
      expect(body.error.errorDetails).has.property("warehouse_date");
      expect(body.error.errorDetails).has.property("vendor_id");
      expect(body.error.errorDetails).has.property("ship_via_id");
      expect(body.error.errorDetails).has.property("pay_to");
      expect(body.error.errorDetails).has.property("ship_to");
      expect(body.error.errorDetails).has.property("line");
      expect(body.error.errorDetails).has.property("item_id");
      expect(body.error.errorDetails).has.property("color_id");
      expect(body.error.errorDetails).has.property("csku_id");
      expect(body.error.errorDetails).has.property("cost");
      expect(body.error.errorDetails).has.property("order_qty");
    });
  });

  it(`Test case when required field are not provided into lines`, () => {
    let requestData = { lines: [{}] };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("line");
      expect(body.error.errorDetails).has.property("item_id");
      expect(body.error.errorDetails).has.property("color_id");
      expect(body.error.errorDetails).has.property("variants");
    });
  });

  it(`Test case when required field are not provided into variants`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id[0],
          variants: [{}],
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("csku_id");
      expect(body.error.errorDetails).has.property("cost");
      expect(body.error.errorDetails).has.property("order_qty");
    });
  });

  it(`The combination of item_id, color_id and csku_id should be unique`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id[0],
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              id: varients_id[0],
              csku_id: Csku_id_I[0],
            },
          ],
        },
        {
          id: lines_id[1],
          line: 2,
          item_id: Cypress.env("ItemId_I"),
          color_id: Cypress.env("resColorId_I"),
          variants: [
            {
              id: varients_id[2],
              csku_id: Csku_id_I[0],
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("item_id");
      expect(body.error.errorDetails).has.property("color_id");
    });
  });

  it(`Item should be associated with color and csku`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id_2[0],
          item_id: Cypress.env("ItemId_P"),
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id_1}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("csku_id");
    });
  });

  it(`Csku should be associated with item and color`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id_2[0],
          variants: [
            {
              id: varients_id_2[0],
              csku_id: Csku_id_P[0],
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id_1}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("csku_id");
    });
  });

  it(`csku_id should be unique`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id[0],
          variants: [
            {
              id: varients_id[0],
              csku_id: Csku_id_I[0],
            },
            {
              id: varients_id[1],
              csku_id: Csku_id_I[0],
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("csku_id");
    });
  });

  it(`csku_id should be unique while creating new variants via update API`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id[0],
          variants: [
            {
              csku_id: Csku_id_I[0],
              cost: 10,
              order_qty: 100,
            }
          ],
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("csku_id");
    });
  });

  it(`Test case when line_id does not exist`, () => {
    let requestData = {
      lines: [
        {
          id: Cypress.env("RandomNumber"),
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it(`Test case when line_id is provided as string`, () => {
    let requestData = {
      lines: [
        {
          id: Cypress.env("Random"),
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it(`Test case when varients_id does not exist`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id[0],
          variants: [
            {
              id: Cypress.env("RandomNumber"),
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it(`Test case when varients_id is provided as string`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id[0],
          variants: [
            {
              id: Cypress.env("Random"),
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it(`Test case when import_po_id does not exist`, () => {
    cy.request({
      method: routes.put,
      body: {},
      failOnStatusCode: false,
      url: `${routes.post_PO}${Cypress.env("RandomNumber")}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it(`Test case when import_po_id is provided as string`, () => {
    cy.request({
      method: routes.put,
      body: {},
      failOnStatusCode: false,
      url: `${routes.post_PO}${Cypress.env("Random")}`,
      headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it(`lines_id shuold be associate with import_po_id`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id[0],
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id_nxt}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("line");
    });
  });

  it(`variants should be associate with lines_id and import_po_id`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id1[0],
          variants: [
            {
              id: varients_id[0],
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id_nxt}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("variants_id");
    });
  });

  it(`pay_to - contact_name,address_1,city,state,zip,country will not be blank`, () => {
    let requestData = {
      "pay_to": {
        "contact_name": "",
        "address_1": "",
        "city": "",
        "state": "",
        "zip": "",
        "country": ""
        
      },
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id_nxt}`,
   headers: { Authorization: Cypress.env("companyToken") },
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

  it(`pay_to - contact_name,address_1,city,state,zip,country will not be null`, () => {
    let requestData = {
      "pay_to": {
        "contact_name": null,
        "address_1": null,
        "city": null,
        "state": null,
        "zip": null,
        "country": null
        
      },
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id_nxt}`,
   headers: { Authorization: Cypress.env("companyToken") },
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

  it(`ship_to - contact_name,address_1,city,state,zip,country will not be blank`, () => {
    let requestData = {
      "ship_to": {
        "contact_name": "",
        "address_1": "",
        "city": "",
        "state": "",
        "zip": "",
        "country": ""
      }
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id_nxt}`,
   headers: { Authorization: Cypress.env("companyToken") },
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

  it(`ship_to - contact_name,address_1,city,state,zip,country will not be null`, () => {
    let requestData = {
      "ship_to": {
        "contact_name": null,
        "address_1": null,
        "city": null,
        "state": null,
        "zip": null,
        "country": null
      }
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id_nxt}`,
   headers: { Authorization: Cypress.env("companyToken") },
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
});

describe(`${store_msg.fail_get}${Cypress.spec["fileName"]}`, () => {
  it(`FailureTest case when import_po_id doesn't exist`, () => {
    cy.request({
      method: routes.get,
      failOnStatusCode: false,
      url: `${routes.post_PO}${Cypress.env("RandomNumber")}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it(`FailureTest case when string is provided instead of import_po_id`, () => {
    cy.request({
      method: routes.get,
      failOnStatusCode: false,
      url: `${routes.post_PO}${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });
});

describe(`${store_msg.fail}${"print pdf and excel"} of ${Cypress.spec["fileName"]}`, () => {

  it(`Test case for print pdf when import_po is invalid`, () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_PO}${Cypress.env("RandomNumber")}${"/print/pdf"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.id);
    });
  });

  it(`Test case for print pdf when alphabet is provided instead of import_po_id`, () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_PO}${Cypress.env("Random")}${"/print/pdf"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.chk_id);
    });
  });

  it(`Test case for print excel when import_po is invalid`, () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_PO}${Cypress.env("RandomNumber")}${"/print/excel"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.id);
    });
  });

  it(`Test case for print excel when alphabet is provided instead of import_po_id`, () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_PO}${Cypress.env("Random")}${"/print/excel"}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.chk_id);
    });
  });
});

describe(`${store_msg.delete}${Cypress.spec["fileName"]}`, () => {

  it(`delete fuction for lines and create new lines`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id1[1],
          delete: 1,
        },
        {
          line: 3,
          item_id: Cypress.env("ItemId_P"),
          color_id: Cypress.env("resColorId_P"),
          status: Cypress.env("randomBoolean"),
          variants: [
            {
              csku_id: Csku_id_P[0],
              cost: 10,
              order_qty: 100,
              status: Cypress.env("randomBoolean"),
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_PO}${import_po_id_nxt}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("po_number");
      expect(body.result.data).has.property("po_date");
      expect(body.result.data).has.property("ship_date");
      expect(body.result.data).has.property("warehouse_date");
      expect(body.result.data).has.property("inhouse_po_number");
      expect(body.result.data).has.property("fob");
      expect(body.result.data).has.property("shipment_from");
      expect(body.result.data).has.property("destination");
      expect(body.result.data).has.property("is_purchase_confirmed");
      expect(body.result.data).has.property("is_special_order");
      expect(body.result.data).has.property("is_special_cut");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("division_id");
      expect(body.result.data).has.property("division_code");
      expect(body.result.data).has.property("division_name");
      expect(body.result.data).has.property("vendor_id");
      expect(body.result.data).has.property("vendor_code");
      expect(body.result.data).has.property("vendor_name");
      expect(body.result.data).has.property("ship_via_id");
      expect(body.result.data).has.property("ship_via_code");
      expect(body.result.data).has.property("ship_via_name");
      expect(body.result.data).has.property("term_id");
      expect(body.result.data).has.property("term_code");
      expect(body.result.data).has.property("term_name");
      body.result.data.lines.forEach((element: any) => {
        expect(element).has.property("id");
        expect(element).has.property("import_po_id");
        expect(element).has.property("line");
        expect(element).has.property("item_id");
        expect(element).has.property("item_code");
        expect(element).has.property("item_name");
        expect(element).has.property("color_id");
        expect(element).has.property("color_code");
        expect(element).has.property("color_name");
        expect(element).has.property("stage_id");
        expect(element).has.property("stage_code");
        expect(element).has.property("stage_name");
        expect(element).has.property("prepack_id");
        expect(element).has.property("status");
        element.variants.forEach((element1: any) => {
          expect(element1).has.property("id");
          expect(element1).has.property("csku_id");
          expect(element1).has.property("cost");
          expect(element1).has.property("order_qty");
          expect(element1).has.property("intrans_qty");
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("received_qty");
          expect(element1).has.property("status");
          expect(element1).has.property("row_num");
          expect(element1).has.property("row_name");
          expect(element1).has.property("col_num");
          expect(element1).has.property("col_name");
          expect(element1).has.property("item_grid_id");
        });
      });
    });
  });

  it(`delete fuction for varients `, () => {
    let requestData = {
      lines: [
        {
          id: lines_id1[0],
          variants: [
            {
              id: varients_id1[0],
              delete: 1
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      body: requestData,
      url: `${routes.post_PO}${import_po_id_nxt}`,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("po_number");
      expect(body.result.data).has.property("po_date");
      expect(body.result.data).has.property("ship_date");
      expect(body.result.data).has.property("warehouse_date");
      expect(body.result.data).has.property("inhouse_po_number");
      expect(body.result.data).has.property("fob");
      expect(body.result.data).has.property("shipment_from");
      expect(body.result.data).has.property("destination");
      expect(body.result.data).has.property("is_purchase_confirmed");
      expect(body.result.data).has.property("is_special_order");
      expect(body.result.data).has.property("is_special_cut");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("division_id");
      expect(body.result.data).has.property("division_code");
      expect(body.result.data).has.property("division_name");
      expect(body.result.data).has.property("vendor_id");
      expect(body.result.data).has.property("vendor_code");
      expect(body.result.data).has.property("vendor_name");
      expect(body.result.data).has.property("ship_via_id");
      expect(body.result.data).has.property("ship_via_code");
      expect(body.result.data).has.property("ship_via_name");
      expect(body.result.data).has.property("term_id");
      expect(body.result.data).has.property("term_code");
      expect(body.result.data).has.property("term_name");
      body.result.data.lines.forEach((element: any) => {
        expect(element).has.property("id");
        expect(element).has.property("import_po_id");
        expect(element).has.property("line");
        expect(element).has.property("item_id");
        expect(element).has.property("item_code");
        expect(element).has.property("item_name");
        expect(element).has.property("color_id");
        expect(element).has.property("color_code");
        expect(element).has.property("color_name");
        expect(element).has.property("stage_id");
        expect(element).has.property("stage_code");
        expect(element).has.property("stage_name");
        expect(element).has.property("prepack_id");
        expect(element).has.property("status");
        element.variants.forEach((element1: any) => {
          expect(element1).has.property("id");
          expect(element1).has.property("csku_id");
          expect(element1).has.property("cost");
          expect(element1).has.property("order_qty");
          expect(element1).has.property("intrans_qty");
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("received_qty");
          expect(element1).has.property("status");
          expect(element1).has.property("row_num");
          expect(element1).has.property("row_name");
          expect(element1).has.property("col_num");
          expect(element1).has.property("col_name");
          expect(element1).has.property("item_grid_id");
        });
      });
    });
  });

  it(`Atleast one variants should be present in lines`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id_2[0],
          variants: [
            {
              id: varients_id_2[0],
              delete: 1
            },
            {
              id: varients_id_2[1],
              delete: 1
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id_1}`,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("variant");
    });
  });

  it(`Atleast one line should be present for a record`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id_2[0],
          delete: 1
        }
      ]
    };
    cy.request({
      method: routes.put,
      body: requestData,
      failOnStatusCode: false,
      url: `${routes.post_PO}${import_po_id_1}`,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("line");
    });
  });
});

