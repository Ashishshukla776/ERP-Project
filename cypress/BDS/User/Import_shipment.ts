import routes from "../../support/route";
import store_msg from "../../support/store_msg";
before(() => {
  cy.GetCompanyToken();
  cy.Get_PO_id();
  cy.GetWarehouseId();
  cy.date_formate();
  cy.Get_config("Decimal");
});
beforeEach(() => {
  cy.Random();
  cy.RandomNumber();
  cy.RandomNum_2();
  cy.RandomNum();
  cy.randomBoolean();
});
let shipment_num: String;
let shipment_id: Number;
let shipment_id_1: Number;
let shipment_id_2: Number;
let lines_id: Number[];
let lines_id_1: Number[];
let lines_id_2: Number[];
let varients_id = [];
let custom_qty = [];
let custom_qty_1 = [];
let varients_id_1 = [];
let varients_id_2 = [];


describe(`${store_msg.success_post}${Cypress.spec["fileName"]}`, () => {
  it(`Test case for craete import_shipment when optional field are not provided`, () => {
    let requestData = {
      shipment_num: Cypress.env("Random"),
      shipment_date: Cypress.env("date_formate"),
      intrans_wh_id: Cypress.env("warehouseId"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("date_formate"),
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      lines: [
        {
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          variants: [
            {
              csku_id: Cypress.env("csku_id"),
              invoiced_cost: Cypress.env("RandomNumber"),
              intrans_qty: Cypress.env("RandomNumber"),
            },
            {
              csku_id: Cypress.env("csku_id1"),
              invoiced_cost: Cypress.env("RandomNumber"),
              intrans_qty: Cypress.env("RandomNumber"),
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_shipment,
      body: requestData,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("shipment_num", requestData.shipment_num);
      expect(body.result.data).has.property("shipment_date", requestData.shipment_date);
      expect(body.result.data).has.property("etd", requestData.etd);
      expect(body.result.data).has.property("eta", requestData.eta);
      expect(body.result.data).has.property("warehouse_id");
      expect(body.result.data).has.property("custom_in", requestData.custom_in);
      expect(body.result.data).has.property("custom_out",requestData.custom_out);
      expect(body.result.data).has.property("custom_entry_num");
      expect(body.result.data).has.property("air_or_sea", requestData.air_or_sea);
      expect(body.result.data).has.property("bol_num", requestData.bol_num);
      expect(body.result.data).has.property("vessel");
      expect(body.result.data).has.property("carton_count", requestData.carton_count);
      expect(body.result.data).has.property("container_num", requestData.container_num);
      expect(body.result.data).has.property("document_comment");
      expect(body.result.data).has.property("bank_release");
      expect(body.result.data).has.property("misc_remark");
      expect(body.result.data).has.property("purchase_inv_num");
      expect(body.result.data).has.property("brokers_inv_num");
      expect(body.result.data).has.property("brokers_inv_date");
      expect(body.result.data).has.property("brokers_freight_amt");
      expect(body.result.data).has.property("brokers_storage_amt");
      expect(body.result.data).has.property("freight_amt");
      expect(body.result.data).has.property("storage_amt");
      expect(body.result.data).has.property("duty_amt");
      expect(body.result.data).has.property("freight_fwd_charges");
      expect(body.result.data).has.property("invoiced_total_amt");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("intrans_wh_id",requestData.intrans_wh_id);
      expect(body.result.data).has.property("warehouse_code");
      expect(body.result.data).has.property("warehouse_name");
      body.result.data.lines.forEach((element: any, index: any) => {
        expect(element).has.property("id", element.id);
        expect(element).has.property("import_po_line_id",
          requestData.lines[index].import_po_line_id);
      expect(element).has.property("line", requestData.lines[index].line);
      element.variants.forEach((element1: any, inner_index: any) => {
        expect(element1).has.property("id");
        expect(element1).has.property(
          "csku_id",
          requestData.lines[index].variants[inner_index].csku_id
        );

        let req_invoiced_cost =  requestData.lines[index].variants[inner_index].invoiced_cost.toString();
          if(Cypress.env("meta_value")>0){
            req_invoiced_cost =  requestData.lines[index].variants[
              inner_index].invoiced_cost.toFixed(Cypress.env("meta_value"))
          }else{
            req_invoiced_cost =  requestData.lines[index].variants[
              inner_index].invoiced_cost.toFixed(Cypress.env("def_metaValue"))
          }
        expect(element1).has.deep.property("invoiced_cost",req_invoiced_cost);
       
        expect(element1).has.property(
          "intrans_qty",
          requestData.lines[index].variants[inner_index].intrans_qty
        );
        expect(element1).has.property("incustom_qty");
        expect(element1).has.property("invoiced_qty");
        expect(element1).has.property("status");
      });
      });
    });
  });

  it(`Test case for craete import_shipment when optional field are left blank`, () => {
    cy.log("custom_qty_1",custom_qty_1[0])

    let requestData = {
      shipment_num: Cypress.env("Random"),
      shipment_date: Cypress.env("date_formate"),
      warehouse_id: "",
      intrans_wh_id:  Cypress.env("warehouseId"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("date_formate"),
      custom_entry_num: null,
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      vessel: "",
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      document_comment: "",
      bank_release: "",
      misc_remark: "",
      purchase_inv_num: "",
      brokers_inv_num: "",
      brokers_inv_date: "",
      brokers_freight_amt: "",
      brokers_storage_amt: "",
      freight_amt: "",
      storage_amt: "",
      duty_amt: "",
      freight_fwd_charges: "",
      invoiced_total_amt: "",
      status: 1,
      lines: [
        {
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          status: 1,
          variants: [
            {
              csku_id: Cypress.env("csku_id"),
              invoiced_cost: Cypress.env("RandomNumber"),
              intrans_qty: Cypress.env("RandomNumber"),
              status: 0
            },
            {
              csku_id: Cypress.env("csku_id1"),
              invoiced_cost: Cypress.env("RandomNumber"),
              intrans_qty: Cypress.env("RandomNumber"),
              status: 1
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.post,
      url: routes.post_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      shipment_id_1 = body.result.data.id;
      lines_id_1 = body.result.data.lines.map((ele: any) => ele.id);
      let variantsId = body.result.data.lines.forEach((ele: any) => {
        ele.variants.forEach((elem: any) => {varients_id_1.push(elem.id)
        });
      });
      let qty = body.result.data.lines.forEach((ele: any) => {
        ele.variants.forEach((elem: any) => {custom_qty_1.push(elem.intrans_qty)});
      });
      cy.log("custom_qty_1",custom_qty_1[0])

      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("shipment_num", requestData.shipment_num);
      expect(body.result.data).has.property("shipment_date", requestData.shipment_date);
      expect(body.result.data).has.property("warehouse_id");
      expect(body.result.data).has.property("etd", requestData.etd);
      expect(body.result.data).has.property("eta", requestData.eta);
      expect(body.result.data).has.property("custom_in", requestData.custom_in);
      expect(body.result.data).has.property("custom_out", requestData.custom_out);
      expect(body.result.data).has.property("custom_entry_num",requestData.custom_entry_num);
      expect(body.result.data).has.property("air_or_sea",requestData.air_or_sea);
      expect(body.result.data).has.property("bol_num", requestData.bol_num);
      expect(body.result.data).has.property("vessel", requestData.vessel);
      expect(body.result.data).has.property("carton_count",requestData.carton_count);
      expect(body.result.data).has.property("container_num",requestData.container_num);
      expect(body.result.data).has.property("document_comment",requestData.document_comment);
      expect(body.result.data).has.property("bank_release",requestData.bank_release);
      expect(body.result.data).has.property("misc_remark",requestData.misc_remark);
      expect(body.result.data).has.property("purchase_inv_num",requestData.purchase_inv_num);
      expect(body.result.data).has.property("brokers_inv_num",requestData.brokers_inv_num);
      expect(body.result.data).has.property("brokers_inv_date");
      expect(body.result.data).has.property("brokers_freight_amt");
      expect(body.result.data).has.property("brokers_storage_amt");
      expect(body.result.data).has.property("freight_amt");
      expect(body.result.data).has.property("storage_amt");
      expect(body.result.data).has.property("duty_amt");
      expect(body.result.data).has.property("freight_fwd_charges");
      expect(body.result.data).has.property("invoiced_total_amt");
      expect(body.result.data).has.property("status", requestData.status);
      expect(body.result.data).has.property("intrans_wh_id",requestData.intrans_wh_id);
      expect(body.result.data).has.property("warehouse_code");
      expect(body.result.data).has.property("warehouse_name");
      body.result.data.lines.forEach((element: any, index: any) => {
        expect(element).has.property("id", element.id);
        expect(element).has.property("import_po_line_id",requestData.lines[index].import_po_line_id);
        expect(element).has.property("line", requestData.lines[index].line);
        element.variants.forEach((element1: any, inner_index: any) => {
          expect(element1).has.property("id");
          expect(element1).has.property("csku_id",
            requestData.lines[index].variants[inner_index].csku_id);
          let req_invoiced_cost =  requestData.lines[index].variants[inner_index].invoiced_cost.toString();
          if(Cypress.env("meta_value")>0){
            req_invoiced_cost =  requestData.lines[index].variants[
              inner_index].invoiced_cost.toFixed(Cypress.env("meta_value"))
          }else{
            req_invoiced_cost =  requestData.lines[index].variants[
              inner_index].invoiced_cost.toFixed(Cypress.env("def_metaValue"))
          }
        expect(element1).has.deep.property("invoiced_cost",req_invoiced_cost);
          expect(element1).has.property("intrans_qty",
          requestData.lines[index].variants[inner_index].intrans_qty);
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("invoiced_qty");
          expect(element1).has.property("status");
        });
      });
    });
  });

  it(`Test case for craete import_shipment when optional field are left null`, () => {
    let requestData = {
      shipment_num: Cypress.env("Random"),
      shipment_date: Cypress.env("date_formate"),
      warehouse_id: null,
      intrans_wh_id: Cypress.env("warehouseId"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("date_formate"),
      custom_entry_num: null,
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      vessel: null,
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      document_comment: null,
      bank_release: null,
      misc_remark: null,
      purchase_inv_num: null,
      brokers_inv_num: null,
      brokers_inv_date: null,
      brokers_freight_amt: null,
      brokers_storage_amt: null,
      freight_amt: null,
      storage_amt: null,
      duty_amt: null,
      freight_fwd_charges: null,
      invoiced_total_amt: null,
      status: 0,
      lines: [
        {
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          status: 0,
          variants: [
            {
              csku_id: Cypress.env("csku_id"),
              invoiced_cost: Cypress.env("RandomNumber"),
              intrans_qty: Cypress.env("RandomNumber"),
              status: 0,
            },
            {
              csku_id: Cypress.env("csku_id1"),
              invoiced_cost: Cypress.env("RandomNumber"),
              intrans_qty: Cypress.env("RandomNumber"),
              status: 1,
            },
          ],
        },
        {
          line: 2,
          import_po_line_id: Cypress.env("line_id_1"),
          status: 0,
          variants: [
            {
              csku_id: Cypress.env("csku_id2"),
              invoiced_cost: Cypress.env("RandomNumber"),
              intrans_qty: Cypress.env("RandomNumber"),
              status: 0,
            },
            {
              csku_id: Cypress.env("csku_id3"),
              invoiced_cost: Cypress.env("RandomNumber"),
              intrans_qty: Cypress.env("RandomNumber"),
              status: 1,
            },
          ],
        }
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      shipment_id_2 = body.result.data.id;
      lines_id_2 = body.result.data.lines.map((ele: any) => ele.id);
      let variantsId = body.result.data.lines.forEach((ele: any) => {
        ele.variants.forEach((elem: any) => {varients_id_2.push(elem.id)});
      });
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("shipment_num", requestData.shipment_num);
      expect(body.result.data).has.property("shipment_date", requestData.shipment_date);
      expect(body.result.data).has.property("warehouse_id",requestData.warehouse_id);
      expect(body.result.data).has.property("etd", requestData.etd);
      expect(body.result.data).has.property("eta", requestData.eta);
      expect(body.result.data).has.property("custom_in", requestData.custom_in);
      expect(body.result.data).has.property("custom_out", requestData.custom_out);
      expect(body.result.data).has.property("custom_entry_num",requestData.custom_entry_num);
      expect(body.result.data).has.property("air_or_sea",requestData.air_or_sea);
      expect(body.result.data).has.property("bol_num", requestData.bol_num);
      expect(body.result.data).has.property("vessel", requestData.vessel);
      expect(body.result.data).has.property("carton_count",requestData.carton_count);
      expect(body.result.data).has.property("container_num",requestData.container_num);
      expect(body.result.data).has.property("document_comment",requestData.document_comment);
      expect(body.result.data).has.property("bank_release",requestData.bank_release);
      expect(body.result.data).has.property("misc_remark",requestData.misc_remark);
      expect(body.result.data).has.property("purchase_inv_num",requestData.purchase_inv_num);
      expect(body.result.data).has.property("brokers_inv_num",requestData.brokers_inv_num);
      expect(body.result.data).has.property("brokers_inv_date");
      expect(body.result.data).has.property("brokers_freight_amt");
      expect(body.result.data).has.property("brokers_storage_amt");
      expect(body.result.data).has.property("freight_amt");
      expect(body.result.data).has.property("storage_amt");
      expect(body.result.data).has.property("duty_amt");
      expect(body.result.data).has.property("freight_fwd_charges");
      expect(body.result.data).has.property("invoiced_total_amt");
      expect(body.result.data).has.property("status", requestData.status);
      expect(body.result.data).has.property("intrans_wh_id",requestData.intrans_wh_id);
      expect(body.result.data).has.property("warehouse_code");
      expect(body.result.data).has.property("warehouse_name");
      body.result.data.lines.forEach((element: any, index: any) => {
        expect(element).has.property("id", element.id);
        expect(element).has.property("import_po_line_id",requestData.lines[index].import_po_line_id);
        expect(element).has.property("line", requestData.lines[index].line);
        element.variants.forEach((element1: any, inner_index: any) => {
          expect(element1).has.property("id");
          expect(element1).has.property("csku_id",
            requestData.lines[index].variants[inner_index].csku_id);
          let req_invoiced_cost =  requestData.lines[index].variants[inner_index].invoiced_cost.toString();
          if(Cypress.env("meta_value")>0){
            req_invoiced_cost =  requestData.lines[index].variants[
              inner_index].invoiced_cost.toFixed(Cypress.env("meta_value"))
          }else{
            req_invoiced_cost =  requestData.lines[index].variants[
              inner_index].invoiced_cost.toFixed(Cypress.env("def_metaValue"))
          }
        expect(element1).has.deep.property("invoiced_cost",req_invoiced_cost);
          expect(element1).has.property("intrans_qty",
          requestData.lines[index].variants[inner_index].intrans_qty);
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("invoiced_qty");
          expect(element1).has.property("status");
        });
      });
    });
  });

  it(`Test case for craete import_shipment with all request field`, () => {
    let requestData = {
      shipment_num: Cypress.env("Random"),
      shipment_date: Cypress.env("date_formate"),
      warehouse_id: Cypress.env("warehouseId"),
      intrans_wh_id: Cypress.env("warehouseId"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("date_formate"),
      custom_entry_num: Cypress.env("Random"),
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      vessel: Cypress.env("Random"),
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      document_comment: Cypress.env("Random"),
      bank_release: Cypress.env("Random"),
      misc_remark: Cypress.env("Random"),
      purchase_inv_num: Cypress.env("Random"),
      brokers_inv_num: Cypress.env("Random"),
      brokers_inv_date: Cypress.env("date_formate"),
      brokers_freight_amt: Cypress.env("RandomNum_2"),
      brokers_storage_amt:Cypress.env("RandomNum_2"),
      freight_amt: Cypress.env("RandomNum_2"),
      storage_amt: Cypress.env("RandomNum_2"),
      duty_amt: Cypress.env("RandomNum_2"),
      freight_fwd_charges: Cypress.env("RandomNum_2"),
      invoiced_total_amt: Cypress.env("RandomNum_2"),
      status: 1,
      lines: [
        {
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          status: 1,
          variants: [
            {
              csku_id: Cypress.env("csku_id"),
              invoiced_cost: Cypress.env("RandomNumber"),
              intrans_qty:Cypress.env("RandomNumber"),
              status: 1,
            },
            {
              csku_id: Cypress.env("csku_id1"),
              invoiced_cost: Cypress.env("RandomNumber"),
              intrans_qty: Cypress.env("RandomNumber"),
              status: 1,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_shipment,
      body: requestData,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      shipment_id = body.result.data.id;
      lines_id = body.result.data.lines.map((ele: any) => ele.id);
      let variantsId = body.result.data.lines.forEach((ele: any) => {
        ele.variants.forEach((elem: any) => {varients_id.push(elem.id)});
      });
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("shipment_num",requestData.shipment_num).to.be.string;
      expect(body.result.data).has.property("shipment_date",requestData.shipment_date).to.be.string;
      expect(body.result.data).has.property("warehouse_id",requestData.warehouse_id);
      expect(body.result.data).has.property("etd", requestData.etd).to.be.string;
      expect(body.result.data).has.property("eta", requestData.eta).to.be.string;
      expect(body.result.data).has.property("custom_in", requestData.custom_in).to.be.string;
      expect(body.result.data).has.property("custom_out",requestData.custom_out).to.be.string;
      expect(body.result.data).has.property("custom_entry_num",requestData.custom_entry_num).to.be.string;
      expect(body.result.data).has.property("air_or_sea",requestData.air_or_sea).to.be.string
      expect(body.result.data).has.property("bol_num", requestData.bol_num).to.be.string;
      expect(body.result.data).has.property("vessel", requestData.vessel).to.be.string;
      expect(body.result.data).has.property("carton_count",requestData.carton_count).to.be.string;
      expect(body.result.data).has.property("container_num",requestData.container_num).to.be.string;
      expect(body.result.data).has.property("document_comment",requestData.document_comment).to.be.string;
      expect(body.result.data).has.property("bank_release",requestData.bank_release).to.be.string;
      expect(body.result.data).has.property("misc_remark",requestData.misc_remark).to.be.string;
      expect(body.result.data).has.property("purchase_inv_num",requestData.purchase_inv_num).to.be.string;
      expect(body.result.data).has.property("brokers_inv_num",requestData.brokers_inv_num).to.be.string;
      expect(body.result.data).has.property("brokers_inv_date",requestData.brokers_inv_date).to.be.string;
      let req_brokers_freight_amt =  requestData.brokers_freight_amt.toString();
      if(Cypress.env("meta_value")>0){
        req_brokers_freight_amt =  requestData.brokers_freight_amt.toFixed(Cypress.env("meta_value"))
      }else{
        req_brokers_freight_amt =  requestData.brokers_freight_amt.toFixed(Cypress.env("def_metaValue"))
      }
      expect(body.result.data).has.deep.property("brokers_freight_amt",req_brokers_freight_amt);

      let req_brokers_storage_amt =  requestData.brokers_storage_amt.toString();
      if(Cypress.env("meta_value")>0){
        req_brokers_storage_amt =  requestData.brokers_storage_amt.toFixed(Cypress.env("meta_value"))
      }else{
        req_brokers_storage_amt =  requestData.brokers_storage_amt.toFixed(Cypress.env("def_metaValue"))
      }
      expect(body.result.data).has.deep.property("brokers_storage_amt",req_brokers_storage_amt);

      let req_freight_amt =  requestData.freight_amt.toString();
      if(Cypress.env("meta_value")>0){
        req_freight_amt =  requestData.freight_amt.toFixed(Cypress.env("meta_value"))
      }else{
        req_freight_amt =  requestData.freight_amt.toFixed(Cypress.env("def_metaValue"))
      }
      expect(body.result.data).has.deep.property("freight_amt",req_freight_amt);

      let req_storage_amt =  requestData.storage_amt.toString();
      if(Cypress.env("meta_value")>0){
        req_storage_amt =  requestData.storage_amt.toFixed(Cypress.env("meta_value"))
      }else{
        req_storage_amt =  requestData.storage_amt.toFixed(Cypress.env("def_metaValue"))
      }
      expect(body.result.data).has.deep.property("storage_amt",req_storage_amt);

      let req_duty_amt =  requestData.duty_amt.toString();
      if(Cypress.env("meta_value")>0){
        req_duty_amt =  requestData.duty_amt.toFixed(Cypress.env("meta_value"))
      }else{
        req_duty_amt =  requestData.duty_amt.toFixed(Cypress.env("def_metaValue"))
      }
      expect(body.result.data).has.deep.property("duty_amt",req_duty_amt);

      let req_fwd_charges =  requestData.freight_fwd_charges.toString();
      if(Cypress.env("meta_value")>0){
        req_fwd_charges =  requestData.freight_fwd_charges.toFixed(Cypress.env("meta_value"))
      }else{
        req_fwd_charges =  requestData.freight_fwd_charges.toFixed(Cypress.env("def_metaValue"))
      }
      expect(body.result.data).has.deep.property("freight_fwd_charges",req_fwd_charges);

      let req_total_amt =  requestData.invoiced_total_amt.toString();
      if(Cypress.env("meta_value")>0){
        req_total_amt =  requestData.invoiced_total_amt.toFixed(Cypress.env("meta_value"))
      }else{
        req_total_amt =  requestData.invoiced_total_amt.toFixed(Cypress.env("def_metaValue"))
      }
      expect(body.result.data).has.deep.property("invoiced_total_amt",req_total_amt);
      
      expect(body.result.data).has.property("status", requestData.status);
      expect(body.result.data).has.property("intrans_wh_id",requestData.intrans_wh_id);
      expect(body.result.data).has.property("warehouse_code");
      expect(body.result.data).has.property("warehouse_name");
      body.result.data.lines.forEach((element: any, index: any) => {
        expect(element).has.property("id", element.id);
        expect(element).has.property("import_po_line_id",requestData.lines[index].import_po_line_id);
        expect(element).has.property("line", requestData.lines[index].line);
        element.variants.forEach((element1: any, inner_index: any) => {
          expect(element1).has.property("id");
          expect(element1).has.property("csku_id",
            requestData.lines[index].variants[inner_index].csku_id);
          let req_invoiced_cost =  requestData.lines[index].variants[inner_index].invoiced_cost.toString();
          if(Cypress.env("meta_value")>0){
            req_invoiced_cost =  requestData.lines[index].variants[
              inner_index].invoiced_cost.toFixed(Cypress.env("meta_value"))
          }else{
            req_invoiced_cost =  requestData.lines[index].variants[
              inner_index].invoiced_cost.toFixed(Cypress.env("def_metaValue"))
          }
        expect(element1).has.deep.property("invoiced_cost",req_invoiced_cost);
          expect(element1).has.property("intrans_qty",
            requestData.lines[index].variants[inner_index].intrans_qty);
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("invoiced_qty");
          expect(element1).has.property("status");
        });
      });
    });
  });
});

describe(`${store_msg.success_put}${Cypress.spec["fileName"]}`, () => {
  it(`Test case when request body is left blank`, () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: {},
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("shipment_num");
      expect(body.result.data).has.property("shipment_date");
      expect(body.result.data).has.property("warehouse_id");
      expect(body.result.data).has.property("etd");
      expect(body.result.data).has.property("eta");
      expect(body.result.data).has.property("custom_in");
      expect(body.result.data).has.property("custom_out");
      expect(body.result.data).has.property("custom_entry_num");
      expect(body.result.data).has.property("air_or_sea");
      expect(body.result.data).has.property("bol_num");
      expect(body.result.data).has.property("vessel");
      expect(body.result.data).has.property("carton_count");
      expect(body.result.data).has.property("container_num");
      expect(body.result.data).has.property("document_comment");
      expect(body.result.data).has.property("bank_release");
      expect(body.result.data).has.property("misc_remark");
      expect(body.result.data).has.property("purchase_inv_num");
      expect(body.result.data).has.property("brokers_inv_num");
      expect(body.result.data).has.property("brokers_inv_date");
      expect(body.result.data).has.property("brokers_freight_amt");
      expect(body.result.data).has.property("brokers_storage_amt");
      expect(body.result.data).has.property("freight_amt");
      expect(body.result.data).has.property("storage_amt");
      expect(body.result.data).has.property("duty_amt");
      expect(body.result.data).has.property("freight_fwd_charges");
      expect(body.result.data).has.property("invoiced_total_amt");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("warehouse_id");
      expect(body.result.data).has.property("warehouse_code");
      expect(body.result.data).has.property("warehouse_name");
      body.result.data.lines.forEach((element: any, index: any) => {
        expect(element).has.property("id");
        expect(element).has.property("import_po_line_id");
        expect(element).has.property("line");
        element.variants.forEach((element1: any) => {
          expect(element1).has.property("id");
          expect(element1).has.deep.property("csku_id");
          expect(element1).has.property("invoiced_cost");
          expect(element1).has.property("intrans_qty");
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("invoiced_qty");
          expect(element1).has.property("status");
        });
      });
    });
  });

  it(`Test case when optional field are not provided`, () => {
    let requestData = {
      shipment_date: Cypress.env("date_formate"),
      intrans_wh_id: Cypress.env("warehouseId"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("date_formate"),
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      lines: [
        {
          id: lines_id[0],
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          variants: [
            {
              id: varients_id[0],
              csku_id: Cypress.env("csku_id"),
              invoiced_cost: Cypress.env("RandomNumber"),
              intrans_qty: Cypress.env("RandomNumber"),
            },
            {
              id: varients_id[1],
              csku_id: Cypress.env("csku_id1"),
              invoiced_cost: Cypress.env("RandomNumber"),
              intrans_qty: Cypress.env("RandomNumber"),
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("shipment_num");
      expect(body.result.data).has.property("shipment_date",requestData.shipment_date);
      expect(body.result.data).has.property("warehouse_id");
      expect(body.result.data).has.property("etd", requestData.etd);
      expect(body.result.data).has.property("eta", requestData.eta);
      expect(body.result.data).has.property("custom_in", requestData.custom_in);
      expect(body.result.data).has.property("custom_out",requestData.custom_out);
      expect(body.result.data).has.property("custom_entry_num");
      expect(body.result.data).has.property("air_or_sea",requestData.air_or_sea);
      expect(body.result.data).has.property("bol_num", requestData.bol_num);
      expect(body.result.data).has.property("vessel");
      expect(body.result.data).has.property("carton_count",requestData.carton_count);
      expect(body.result.data).has.property("container_num",requestData.container_num);
      expect(body.result.data).has.property("document_comment");
      expect(body.result.data).has.property("bank_release");
      expect(body.result.data).has.property("misc_remark");
      expect(body.result.data).has.property("purchase_inv_num");
      expect(body.result.data).has.property("brokers_inv_num");
      expect(body.result.data).has.property("brokers_inv_date");
      expect(body.result.data).has.property("brokers_freight_amt");
      expect(body.result.data).has.property("brokers_storage_amt");
      expect(body.result.data).has.property("freight_amt");
      expect(body.result.data).has.property("storage_amt");
      expect(body.result.data).has.property("duty_amt");
      expect(body.result.data).has.property("freight_fwd_charges");
      expect(body.result.data).has.property("invoiced_total_amt");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("intrans_wh_id",requestData.intrans_wh_id);
      expect(body.result.data).has.property("warehouse_code");
      expect(body.result.data).has.property("warehouse_name");
      body.result.data.lines.forEach((element: any, index: any) => {
        expect(element).has.property("id");
        expect(element).has.property("import_po_line_id",requestData.lines[index].import_po_line_id);
        expect(element).has.property("line", requestData.lines[index].line);
        element.variants.forEach((element1: any, inner_index: any) => {
          expect(element1).has.property("id",requestData.lines[index].variants[inner_index].id);
          expect(element1).has.deep.property("csku_id",requestData.lines[index].variants[inner_index].csku_id);
          let req_invoiced_cost =  requestData.lines[index].variants[inner_index].invoiced_cost.toString();
          if(Cypress.env("meta_value")>0){
            req_invoiced_cost =  requestData.lines[index].variants[
              inner_index].invoiced_cost.toFixed(Cypress.env("meta_value"))
          }else{
            req_invoiced_cost =  requestData.lines[index].variants[
              inner_index].invoiced_cost.toFixed(Cypress.env("def_metaValue"))
          }
        expect(element1).has.deep.property("invoiced_cost",req_invoiced_cost);
          expect(element1).has.property("intrans_qty",
            requestData.lines[index].variants[inner_index].intrans_qty);
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("invoiced_qty");
          expect(element1).has.property("status");
        });
      });
    });
  });

  it(`Test case when optional field are left blank`, () => {
    let requestData = {
      shipment_date: Cypress.env("date_formate"),
      warehouse_id: "",
      intrans_wh_id:  Cypress.env("warehouseId"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("date_formate"),
      custom_entry_num: "",
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      vessel: "",
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      document_comment: "",
      bank_release: "",
      misc_remark: "",
      purchase_inv_num: "",
      brokers_inv_num: "",
      brokers_inv_date: "",
      brokers_freight_amt: "",
      brokers_storage_amt: "",
      freight_amt: "",
      storage_amt: "",
      duty_amt: "",
      freight_fwd_charges: "",
      invoiced_total_amt: "",
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("shipment_num");
      expect(body.result.data).has.property(
        "shipment_date",
        requestData.shipment_date
      );
      expect(body.result.data).has.property("warehouse_id");
      expect(body.result.data).has.property("etd", requestData.etd);
      expect(body.result.data).has.property("eta", requestData.eta);
      expect(body.result.data).has.property("custom_in", requestData.custom_in);
      expect(body.result.data).has.property(
        "custom_out",
        requestData.custom_out
      );
      expect(body.result.data).has.property(
        "custom_entry_num",
        requestData.custom_entry_num
      );
      expect(body.result.data).has.property(
        "air_or_sea",
        requestData.air_or_sea
      );
      expect(body.result.data).has.property("bol_num", requestData.bol_num);
      expect(body.result.data).has.property("vessel", requestData.vessel);
      expect(body.result.data).has.property(
        "carton_count",
        requestData.carton_count
      );
      expect(body.result.data).has.property(
        "container_num",
        requestData.container_num
      );
      expect(body.result.data).has.property(
        "document_comment",
        requestData.document_comment
      );
      expect(body.result.data).has.property(
        "bank_release",
        requestData.bank_release
      );
      expect(body.result.data).has.property(
        "misc_remark",
        requestData.misc_remark
      );
      expect(body.result.data).has.property(
        "purchase_inv_num",
        requestData.purchase_inv_num
      );
      expect(body.result.data).has.property(
        "brokers_inv_num",
        requestData.brokers_inv_num
      );
      expect(body.result.data).has.property("brokers_inv_date");
      expect(body.result.data).has.property("brokers_freight_amt");
      expect(body.result.data).has.property("brokers_storage_amt");
      expect(body.result.data).has.property("freight_amt");
      expect(body.result.data).has.property("storage_amt");
      expect(body.result.data).has.property("duty_amt");
      expect(body.result.data).has.property("freight_fwd_charges");
      expect(body.result.data).has.property("invoiced_total_amt");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("intrans_wh_id",requestData.intrans_wh_id);
      expect(body.result.data).has.property("warehouse_code");
      expect(body.result.data).has.property("warehouse_name");
      body.result.data.lines.forEach((element: any) => {
        expect(element).has.property("id");
        expect(element).has.property("import_po_line_id");
        expect(element).has.property("line");
        element.variants.forEach((element1: any) => {
          expect(element1).has.property("id");
          expect(element1).has.property("csku_id");
          expect(element1).has.property("invoiced_cost");
          expect(element1).has.property("intrans_qty");
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("invoiced_qty");
          expect(element1).has.property("status");
        });
      });
    });
  });

  it(`Test case when optional field are left null`, () => {
    let requestData = {
      shipment_date: Cypress.env("date_formate"),
      warehouse_id:  null,
      intrans_wh_id:  Cypress.env("warehouseId"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("date_formate"),
      custom_entry_num: null,
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      vessel: null,
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      document_comment: null,
      bank_release: null,
      misc_remark: null,
      purchase_inv_num: null,
      brokers_inv_num: null,
      brokers_inv_date: null,
      brokers_freight_amt: null,
      brokers_storage_amt: null,
      freight_amt: null,
      storage_amt: null,
      duty_amt: null,
      freight_fwd_charges: null,
      invoiced_total_amt: null,
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("shipment_num");
      expect(body.result.data).has.property(
        "shipment_date",
        requestData.shipment_date
      );
      expect(body.result.data).has.property(
        "warehouse_id",
        requestData.warehouse_id
      );
      expect(body.result.data).has.property("etd", requestData.etd);
      expect(body.result.data).has.property("eta", requestData.eta);
      expect(body.result.data).has.property("custom_in", requestData.custom_in);
      expect(body.result.data).has.property(
        "custom_out",
        requestData.custom_out
      );
      expect(body.result.data).has.property(
        "custom_entry_num",
        requestData.custom_entry_num
      );
      expect(body.result.data).has.property(
        "air_or_sea",
        requestData.air_or_sea
      );
      expect(body.result.data).has.property("bol_num", requestData.bol_num);
      expect(body.result.data).has.property("vessel", requestData.vessel);
      expect(body.result.data).has.property(
        "carton_count",
        requestData.carton_count
      );
      expect(body.result.data).has.property(
        "container_num",
        requestData.container_num
      );
      expect(body.result.data).has.property(
        "document_comment",
        requestData.document_comment
      );
      expect(body.result.data).has.property(
        "bank_release",
        requestData.bank_release
      );
      expect(body.result.data).has.property(
        "misc_remark",
        requestData.misc_remark
      );
      expect(body.result.data).has.property(
        "purchase_inv_num",
        requestData.purchase_inv_num
      );
      expect(body.result.data).has.property(
        "brokers_inv_num",
        requestData.brokers_inv_num
      );
      expect(body.result.data).has.property(
        "brokers_inv_date",
        requestData.brokers_inv_date
      );
      expect(body.result.data).has.property("brokers_freight_amt");
      expect(body.result.data).has.property("brokers_storage_amt");
      expect(body.result.data).has.property("freight_amt");
      expect(body.result.data).has.property("storage_amt");
      expect(body.result.data).has.property("duty_amt");
      expect(body.result.data).has.property("freight_fwd_charges");
      expect(body.result.data).has.property("invoiced_total_amt");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("intrans_wh_id",requestData.intrans_wh_id);
      expect(body.result.data).has.property("warehouse_code");
      expect(body.result.data).has.property("warehouse_name");
      body.result.data.lines.forEach((element: any) => {
        expect(element).has.property("id");
        expect(element).has.property("import_po_line_id");
        expect(element).has.property("line");
        element.variants.forEach((element1: any) => {
          expect(element1).has.property("id");
          expect(element1).has.property("csku_id");
          expect(element1).has.property("invoiced_cost");
          expect(element1).has.property("intrans_qty");
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("invoiced_qty");
          expect(element1).has.property("status");
        });
      });
    });
  });

  it(`Test case when required field are not provided`, () => {
    let requestData = {
      warehouse_id:  Cypress.env("warehouseId"),
      custom_entry_num: Cypress.env("Random"),
      vessel: Cypress.env("Random"),
      document_comment: Cypress.env("Random"),
      bank_release: Cypress.env("Random"),
      misc_remark: Cypress.env("Random"),
      purchase_inv_num: Cypress.env("Random"),
      brokers_inv_num: Cypress.env("Random"),
      brokers_inv_date: Cypress.env("date_formate"),
      brokers_freight_amt: Cypress.env("RandomNum_2"),
      brokers_storage_amt: Cypress.env("RandomNum_2"),
      freight_amt: Cypress.env("RandomNum_2"),
      storage_amt: Cypress.env("RandomNum_2"),
      duty_amt:Cypress.env("RandomNum_2"),
      freight_fwd_charges: Cypress.env("RandomNum_2"),
      invoiced_total_amt:Cypress.env("RandomNum_2"),
      status: 1,
      lines: [
        {
          id: lines_id[0],
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
      ],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("shipment_num");
      expect(body.result.data).has.property("shipment_date");
      expect(body.result.data).has.property("warehouse_id",requestData.warehouse_id);
      expect(body.result.data).has.property("etd");
      expect(body.result.data).has.property("eta");
      expect(body.result.data).has.property("custom_in");
      expect(body.result.data).has.property("custom_out");
      expect(body.result.data).has.property(
        "custom_entry_num",
        requestData.custom_entry_num
      );
      expect(body.result.data).has.property("air_or_sea");
      expect(body.result.data).has.property("bol_num");
      expect(body.result.data).has.property("vessel", requestData.vessel);
      expect(body.result.data).has.property("carton_count");
      expect(body.result.data).has.property("container_num");
      expect(body.result.data).has.property(
        "document_comment",
        requestData.document_comment
      );
      expect(body.result.data).has.property(
        "bank_release",
        requestData.bank_release
      );
      expect(body.result.data).has.property(
        "misc_remark",
        requestData.misc_remark
      );
      expect(body.result.data).has.property(
        "purchase_inv_num",
        requestData.purchase_inv_num
      );
      expect(body.result.data).has.property(
        "brokers_inv_num",
        requestData.brokers_inv_num
      );
      expect(body.result.data).has.property(
        "brokers_inv_date",
        requestData.brokers_inv_date
      );
      let req_brokers_freight_amt =  requestData.brokers_freight_amt.toString();
      if(Cypress.env("meta_value")>0){
        req_brokers_freight_amt =  requestData.brokers_freight_amt.toFixed(Cypress.env("meta_value"))
      }else{
        req_brokers_freight_amt =  requestData.brokers_freight_amt.toFixed(Cypress.env("def_metaValue"))
      }
      expect(body.result.data).has.deep.property("brokers_freight_amt",req_brokers_freight_amt);

      let req_brokers_storage_amt =  requestData.brokers_storage_amt.toString();
      if(Cypress.env("meta_value")>0){
        req_brokers_storage_amt =  requestData.brokers_storage_amt.toFixed(Cypress.env("meta_value"))
      }else{
        req_brokers_storage_amt =  requestData.brokers_storage_amt.toFixed(Cypress.env("def_metaValue"))
      }
      expect(body.result.data).has.deep.property("brokers_storage_amt",req_brokers_storage_amt);

      let req_freight_amt =  requestData.freight_amt.toString();
      if(Cypress.env("meta_value")>0){
        req_freight_amt =  requestData.freight_amt.toFixed(Cypress.env("meta_value"))
      }else{
        req_freight_amt =  requestData.freight_amt.toFixed(Cypress.env("def_metaValue"))
      }
      expect(body.result.data).has.deep.property("freight_amt",req_freight_amt);

      let req_storage_amt =  requestData.storage_amt.toString();
      if(Cypress.env("meta_value")>0){
        req_storage_amt =  requestData.storage_amt.toFixed(Cypress.env("meta_value"))
      }else{
        req_storage_amt =  requestData.storage_amt.toFixed(Cypress.env("def_metaValue"))
      }
      expect(body.result.data).has.deep.property("storage_amt",req_storage_amt);

      let req_duty_amt =  requestData.duty_amt.toString();
      if(Cypress.env("meta_value")>0){
        req_duty_amt =  requestData.duty_amt.toFixed(Cypress.env("meta_value"))
      }else{
        req_duty_amt =  requestData.duty_amt.toFixed(Cypress.env("def_metaValue"))
      }
      expect(body.result.data).has.deep.property("duty_amt",req_duty_amt);

      let req_fwd_charges =  requestData.freight_fwd_charges.toString();
      if(Cypress.env("meta_value")>0){
        req_fwd_charges =  requestData.freight_fwd_charges.toFixed(Cypress.env("meta_value"))
      }else{
        req_fwd_charges =  requestData.freight_fwd_charges.toFixed(Cypress.env("def_metaValue"))
      }
      expect(body.result.data).has.deep.property("freight_fwd_charges",req_fwd_charges);

      let req_total_amt =  requestData.invoiced_total_amt.toString();
      if(Cypress.env("meta_value")>0){
        req_total_amt =  requestData.invoiced_total_amt.toFixed(Cypress.env("meta_value"))
      }else{
        req_total_amt =  requestData.invoiced_total_amt.toFixed(Cypress.env("def_metaValue"))
      }
      expect(body.result.data).has.deep.property("invoiced_total_amt",req_total_amt);
      expect(body.result.data).has.property("status", requestData.status);
      expect(body.result.data).has.property("intrans_wh_id");
      expect(body.result.data).has.property("warehouse_code");
      expect(body.result.data).has.property("warehouse_name");
      body.result.data.lines.forEach((element: any, index: any) => {
        expect(element).has.property("id", requestData.lines[index].id);
        expect(element).has.property("import_po_line_id");
        expect(element).has.property("line");
        element.variants.forEach((element1: any, inner_index: any) => {
          expect(element1).has.property(
            "id",
            requestData.lines[index].variants[inner_index].id
          );
          expect(element1).has.property("csku_id");
          expect(element1).has.property("invoiced_cost");
          expect(element1).has.property("intrans_qty");
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("invoiced_qty");
          expect(element1).has.property("status");
        });
      });
    });
  });

  it(`Test case when lines array are left blank`, () => {
    let requestData = {
      lines: [],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("shipment_num");
      expect(body.result.data).has.property("shipment_date");
      expect(body.result.data).has.property("warehouse_id");
      expect(body.result.data).has.property("etd");
      expect(body.result.data).has.property("eta");
      expect(body.result.data).has.property("custom_in");
      expect(body.result.data).has.property("custom_out");
      expect(body.result.data).has.property("custom_entry_num");
      expect(body.result.data).has.property("air_or_sea");
      expect(body.result.data).has.property("bol_num");
      expect(body.result.data).has.property("vessel");
      expect(body.result.data).has.property("carton_count");
      expect(body.result.data).has.property("container_num");
      expect(body.result.data).has.property("document_comment");
      expect(body.result.data).has.property("bank_release");
      expect(body.result.data).has.property("misc_remark");
      expect(body.result.data).has.property("purchase_inv_num");
      expect(body.result.data).has.property("brokers_inv_num");
      expect(body.result.data).has.property("brokers_inv_date");
      expect(body.result.data).has.property("brokers_freight_amt");
      expect(body.result.data).has.property("brokers_storage_amt");
      expect(body.result.data).has.property("freight_amt");
      expect(body.result.data).has.property("storage_amt");
      expect(body.result.data).has.property("duty_amt");
      expect(body.result.data).has.property("freight_fwd_charges");
      expect(body.result.data).has.property("invoiced_total_amt");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("intrans_wh_id");
      expect(body.result.data).has.property("warehouse_code");
      expect(body.result.data).has.property("warehouse_name");
      body.result.data.lines.forEach((element: any) => {
        expect(element).has.property("id");
        expect(element).has.property("import_po_line_id");
        expect(element).has.property("line");
        element.variants.forEach((element1: any) => {
          expect(element1).has.property("id");
          expect(element1).has.property("csku_id");
          expect(element1).has.property("invoiced_cost");
          expect(element1).has.property("intrans_qty");
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("invoiced_qty");
          expect(element1).has.property("status");
        });
      });
    });
  });

  it(`Test case when lines object are left blank`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id[0],
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("shipment_num");
      expect(body.result.data).has.property("shipment_date");
      expect(body.result.data).has.property("warehouse_id");
      expect(body.result.data).has.property("etd");
      expect(body.result.data).has.property("eta");
      expect(body.result.data).has.property("custom_in");
      expect(body.result.data).has.property("custom_out");
      expect(body.result.data).has.property("custom_entry_num");
      expect(body.result.data).has.property("air_or_sea");
      expect(body.result.data).has.property("bol_num");
      expect(body.result.data).has.property("vessel");
      expect(body.result.data).has.property("carton_count");
      expect(body.result.data).has.property("container_num");
      expect(body.result.data).has.property("document_comment");
      expect(body.result.data).has.property("bank_release");
      expect(body.result.data).has.property("misc_remark");
      expect(body.result.data).has.property("purchase_inv_num");
      expect(body.result.data).has.property("brokers_inv_num");
      expect(body.result.data).has.property("brokers_inv_date");
      expect(body.result.data).has.property("brokers_freight_amt");
      expect(body.result.data).has.property("brokers_storage_amt");
      expect(body.result.data).has.property("freight_amt");
      expect(body.result.data).has.property("storage_amt");
      expect(body.result.data).has.property("duty_amt");
      expect(body.result.data).has.property("freight_fwd_charges");
      expect(body.result.data).has.property("invoiced_total_amt");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("intrans_wh_id");
      expect(body.result.data).has.property("warehouse_code");
      expect(body.result.data).has.property("warehouse_name");
      body.result.data.lines.forEach((element: any, index: any) => {
        expect(element).has.property("id", requestData.lines[index].id);
        expect(element).has.property("import_po_line_id");
        expect(element).has.property("line");
        element.variants.forEach((element1: any, index: any) => {
          expect(element1).has.property("id");
          expect(element1).has.property("csku_id");
          expect(element1).has.property("invoiced_cost");
          expect(element1).has.property("intrans_qty");
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("invoiced_qty");
          expect(element1).has.property("status");
        });
      });
    });
  });

  it(`Test case when variants array are left blank`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id[0],
          variants: []
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("shipment_num");
      expect(body.result.data).has.property("shipment_date");
      expect(body.result.data).has.property("warehouse_id");
      expect(body.result.data).has.property("etd");
      expect(body.result.data).has.property("eta");
      expect(body.result.data).has.property("custom_in");
      expect(body.result.data).has.property("custom_out");
      expect(body.result.data).has.property("custom_entry_num");
      expect(body.result.data).has.property("air_or_sea");
      expect(body.result.data).has.property("bol_num");
      expect(body.result.data).has.property("vessel");
      expect(body.result.data).has.property("carton_count");
      expect(body.result.data).has.property("container_num");
      expect(body.result.data).has.property("document_comment");
      expect(body.result.data).has.property("bank_release");
      expect(body.result.data).has.property("misc_remark");
      expect(body.result.data).has.property("purchase_inv_num");
      expect(body.result.data).has.property("brokers_inv_num");
      expect(body.result.data).has.property("brokers_inv_date");
      expect(body.result.data).has.property("brokers_freight_amt");
      expect(body.result.data).has.property("brokers_storage_amt");
      expect(body.result.data).has.property("freight_amt");
      expect(body.result.data).has.property("storage_amt");
      expect(body.result.data).has.property("duty_amt");
      expect(body.result.data).has.property("freight_fwd_charges");
      expect(body.result.data).has.property("invoiced_total_amt");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("intrans_wh_id");
      expect(body.result.data).has.property("warehouse_code");
      expect(body.result.data).has.property("warehouse_name");
      body.result.data.lines.forEach((element: any, index: any) => {
        expect(element).has.property("id", requestData.lines[index].id);
        expect(element).has.property("import_po_line_id");
        expect(element).has.property("line");
        element.variants.forEach((element1: any, index: any) => {
          expect(element1).has.property("id");
          expect(element1).has.property("csku_id");
          expect(element1).has.property("invoiced_cost");
          expect(element1).has.property("intrans_qty");
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("invoiced_qty");
          expect(element1).has.property("status");
        });
      });
    });
  });

  it(`Test case when variants object are left blank`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id[0],
          variants: [
            {
              id: varients_id[0]
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("shipment_num");
      expect(body.result.data).has.property("shipment_date");
      expect(body.result.data).has.property("warehouse_id");
      expect(body.result.data).has.property("etd");
      expect(body.result.data).has.property("eta");
      expect(body.result.data).has.property("custom_in");
      expect(body.result.data).has.property("custom_out");
      expect(body.result.data).has.property("custom_entry_num");
      expect(body.result.data).has.property("air_or_sea");
      expect(body.result.data).has.property("bol_num");
      expect(body.result.data).has.property("vessel");
      expect(body.result.data).has.property("carton_count");
      expect(body.result.data).has.property("container_num");
      expect(body.result.data).has.property("document_comment");
      expect(body.result.data).has.property("bank_release");
      expect(body.result.data).has.property("misc_remark");
      expect(body.result.data).has.property("purchase_inv_num");
      expect(body.result.data).has.property("brokers_inv_num");
      expect(body.result.data).has.property("brokers_inv_date");
      expect(body.result.data).has.property("brokers_freight_amt");
      expect(body.result.data).has.property("brokers_storage_amt");
      expect(body.result.data).has.property("freight_amt");
      expect(body.result.data).has.property("storage_amt");
      expect(body.result.data).has.property("duty_amt");
      expect(body.result.data).has.property("freight_fwd_charges");
      expect(body.result.data).has.property("invoiced_total_amt");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("intrans_wh_id");
      expect(body.result.data).has.property("warehouse_code");
      expect(body.result.data).has.property("warehouse_name");
      body.result.data.lines.forEach((element: any, index: any) => {
        expect(element).has.property("id", requestData.lines[index].id);
        expect(element).has.property("import_po_line_id");
        expect(element).has.property("line");
        element.variants.forEach((element1: any, inner_index: any) => {
          expect(element1).has.deep.property("id");
          expect(element1).has.property("csku_id");
          expect(element1).has.property("invoiced_cost");
          expect(element1).has.property("intrans_qty");
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("invoiced_qty");
          expect(element1).has.property("status");
        });
      });
    });
  });

  it(`Test case with all request field`, () => {
    let requestData = {
      shipment_date: Cypress.env("date_formate"),
      warehouse_id: Cypress.env("warehouseId"),
      intrans_wh_id: Cypress.env("warehouseId"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("date_formate"),
      custom_entry_num: Cypress.env("Random"),
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      vessel: Cypress.env("Random"),
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      document_comment: Cypress.env("Random"),
      bank_release: Cypress.env("Random"),
      misc_remark: Cypress.env("Random"),
      purchase_inv_num: Cypress.env("Random"),
      brokers_inv_num: Cypress.env("Random"),
      brokers_inv_date: Cypress.env("date_formate"),
      brokers_freight_amt: Cypress.env("RandomNum_2"),
      brokers_storage_amt: Cypress.env("RandomNum_2"),
      freight_amt: Cypress.env("RandomNum_2"),
      storage_amt: Cypress.env("RandomNum_2"),
      duty_amt: Cypress.env("RandomNum_2"),
      freight_fwd_charges: Cypress.env("RandomNum_2"),
      invoiced_total_amt: Cypress.env("RandomNum_2"),
      status: 1,
      lines: [
        {
          id: lines_id[0],
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          status: 1,
          variants: [
            {
              id: varients_id[0],
              csku_id: Cypress.env("csku_id"),
              invoiced_cost: Cypress.env("RandomNumber"),
              intrans_qty: Cypress.env("RandomNumber"),
              status: 1,
            },
            {
              id: varients_id[1],
              csku_id: Cypress.env("csku_id1"),
              invoiced_cost:Cypress.env("RandomNumber"),
              intrans_qty: Cypress.env("RandomNumber"),
              status: 1
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      shipment_num = body.result.data.shipment_num;
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("shipment_num");
      expect(body.result.data).has.property(
        "shipment_date",
        requestData.shipment_date
      );
      expect(body.result.data).has.property(
        "warehouse_id",
        requestData.warehouse_id
      );
      expect(body.result.data).has.property("etd", requestData.etd);
      expect(body.result.data).has.property("eta", requestData.eta);
      expect(body.result.data).has.property("custom_in", requestData.custom_in);
      expect(body.result.data).has.property(
        "custom_out",
        requestData.custom_out
      );
      expect(body.result.data).has.property(
        "custom_entry_num",
        requestData.custom_entry_num
      );
      expect(body.result.data).has.property(
        "air_or_sea",
        requestData.air_or_sea
      );
      expect(body.result.data).has.property("bol_num", requestData.bol_num);
      expect(body.result.data).has.property("vessel", requestData.vessel);
      expect(body.result.data).has.property(
        "carton_count",
        requestData.carton_count
      );
      expect(body.result.data).has.property(
        "container_num",
        requestData.container_num
      );
      expect(body.result.data).has.property(
        "document_comment",
        requestData.document_comment
      );
      expect(body.result.data).has.property(
        "bank_release",
        requestData.bank_release
      );
      expect(body.result.data).has.property(
        "misc_remark",
        requestData.misc_remark
      );
      expect(body.result.data).has.property(
        "purchase_inv_num",
        requestData.purchase_inv_num
      );
      expect(body.result.data).has.property(
        "brokers_inv_num",
        requestData.brokers_inv_num
      );
      expect(body.result.data).has.property(
        "brokers_inv_date",
        requestData.brokers_inv_date
      );
      let req_brokers_freight_amt =  requestData.brokers_freight_amt.toString();
      if(Cypress.env("meta_value")>0){
        req_brokers_freight_amt =  requestData.brokers_freight_amt.toFixed(Cypress.env("meta_value"))
      }else{
        req_brokers_freight_amt =  requestData.brokers_freight_amt.toFixed(Cypress.env("def_metaValue"))
      }
      expect(body.result.data).has.deep.property("brokers_freight_amt",req_brokers_freight_amt);

      let req_brokers_storage_amt =  requestData.brokers_storage_amt.toString();
      if(Cypress.env("meta_value")>0){
        req_brokers_storage_amt =  requestData.brokers_storage_amt.toFixed(Cypress.env("meta_value"))
      }else{
        req_brokers_storage_amt =  requestData.brokers_storage_amt.toFixed(Cypress.env("def_metaValue"))
      }
      expect(body.result.data).has.deep.property("brokers_storage_amt",req_brokers_storage_amt);

      let req_freight_amt =  requestData.freight_amt.toString();
      if(Cypress.env("meta_value")>0){
        req_freight_amt =  requestData.freight_amt.toFixed(Cypress.env("meta_value"))
      }else{
        req_freight_amt =  requestData.freight_amt.toFixed(Cypress.env("def_metaValue"))
      }
      expect(body.result.data).has.deep.property("freight_amt",req_freight_amt);

      let req_storage_amt =  requestData.storage_amt.toString();
      if(Cypress.env("meta_value")>0){
        req_storage_amt =  requestData.storage_amt.toFixed(Cypress.env("meta_value"))
      }else{
        req_storage_amt =  requestData.storage_amt.toFixed(Cypress.env("def_metaValue"))
      }
      expect(body.result.data).has.deep.property("storage_amt",req_storage_amt);

      let req_duty_amt =  requestData.duty_amt.toString();
      if(Cypress.env("meta_value")>0){
        req_duty_amt =  requestData.duty_amt.toFixed(Cypress.env("meta_value"))
      }else{
        req_duty_amt =  requestData.duty_amt.toFixed(Cypress.env("def_metaValue"))
      }
      expect(body.result.data).has.deep.property("duty_amt",req_duty_amt);

      let req_fwd_charges =  requestData.freight_fwd_charges.toString();
      if(Cypress.env("meta_value")>0){
        req_fwd_charges =  requestData.freight_fwd_charges.toFixed(Cypress.env("meta_value"))
      }else{
        req_fwd_charges =  requestData.freight_fwd_charges.toFixed(Cypress.env("def_metaValue"))
      }
      expect(body.result.data).has.deep.property("freight_fwd_charges",req_fwd_charges);

      let req_total_amt =  requestData.invoiced_total_amt.toString();
      if(Cypress.env("meta_value")>0){
        req_total_amt =  requestData.invoiced_total_amt.toFixed(Cypress.env("meta_value"))
      }else{
        req_total_amt =  requestData.invoiced_total_amt.toFixed(Cypress.env("def_metaValue"))
      }
      expect(body.result.data).has.deep.property("invoiced_total_amt",req_total_amt);
      expect(body.result.data).has.property("status", requestData.status);
      expect(body.result.data).has.property("intrans_wh_id",requestData.intrans_wh_id);
      expect(body.result.data).has.property("warehouse_code");
      expect(body.result.data).has.property("warehouse_name");
      body.result.data.lines.forEach((element: any, index: any) => {
        expect(element).has.property("id", element.id);
        expect(element).has.property(
          "import_po_line_id",
          requestData.lines[index].import_po_line_id
        );
        expect(element).has.property("line", requestData.lines[index].line);
        element.variants.forEach((element1: any, inner_index: any) => {
          expect(element1).has.property(
            "id",
            requestData.lines[index].variants[inner_index].id
          );
          expect(element1).has.property(
            "csku_id",
            requestData.lines[index].variants[inner_index].csku_id
          );
          let req_invoiced_cost =  requestData.lines[index].variants[inner_index].invoiced_cost.toString();
          if(Cypress.env("meta_value")>0){
            req_invoiced_cost =  requestData.lines[index].variants[
              inner_index].invoiced_cost.toFixed(Cypress.env("meta_value"))
          }else{
            req_invoiced_cost =  requestData.lines[index].variants[
              inner_index].invoiced_cost.toFixed(Cypress.env("def_metaValue"))
          }
         expect(element1).has.deep.property("invoiced_cost",req_invoiced_cost);
          expect(element1).has.property(
            "intrans_qty",
            requestData.lines[index].variants[inner_index].intrans_qty
          );
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("invoiced_qty");
          expect(element1).has.property("status");
        });
      });
    });
  });

  it(`Test case for manage import_shipment incustom_qty`, () => {
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}${"/custom"}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      let qty = body.result.data.lines.forEach((ele: any) => {
        ele.variants.forEach((elem: any) => {custom_qty.push(elem.incustom_qty)});
      });
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("shipment_num");
      expect(body.result.data).has.property("shipment_date");
      expect(body.result.data).has.property("warehouse_id");
      expect(body.result.data).has.property("etd");
      expect(body.result.data).has.property("eta");
      expect(body.result.data).has.property("custom_in");
      expect(body.result.data).has.property("custom_out");
      expect(body.result.data).has.property("custom_entry_num");
      expect(body.result.data).has.property("air_or_sea");
      expect(body.result.data).has.property("bol_num");
      expect(body.result.data).has.property("vessel");
      expect(body.result.data).has.property("carton_count");
      expect(body.result.data).has.property("container_num");
      expect(body.result.data).has.property("document_comment");
      expect(body.result.data).has.property("bank_release");
      expect(body.result.data).has.property("misc_remark");
      expect(body.result.data).has.property("purchase_inv_num");
      expect(body.result.data).has.property("brokers_inv_num");
      expect(body.result.data).has.property("brokers_inv_date");
      expect(body.result.data).has.deep.property("brokers_freight_amt");
      expect(body.result.data).has.deep.property("brokers_storage_amt");
      expect(body.result.data).has.deep.property("freight_amt");
      expect(body.result.data).has.deep.property("storage_amt");
      expect(body.result.data).has.deep.property("duty_amt");
      expect(body.result.data).has.deep.property(  "freight_fwd_charges");
      expect(body.result.data).has.deep.property(  "invoiced_total_amt");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("intrans_wh_id");
      expect(body.result.data).has.property("warehouse_code");
      expect(body.result.data).has.property("warehouse_name");
      body.result.data.lines.forEach((element: any, index: any) => 
      {expect(element).has.property("id");
      expect(element).has.property("import_po_line_id");
      expect(element).has.property("line");
      element.variants.forEach((element1: any, inner_index: any) => {  
        expect(element1).has.property("id");  
        expect(element1).has.property("csku_id");   
        expect(element1).has.deep.property("invoiced_cost");  
        expect(element1).has.property("intrans_qty");  
        expect(element1).has.property("incustom_qty");
        expect(element1).has.property("invoiced_qty");
        expect(element1).has.property("status");
        });
      });
    });
  });

  it(`Test case for manage import_shipment invoiced_qty`, () => {
    let shortage_qty = Cypress.env("RandomNum_2");
    let invoiced_qty = custom_qty[1]-shortage_qty
    let requestData = {
      warehouse_id: Cypress.env("warehouseId"),
      "lines": [
        {
          "id": lines_id[0],
          "variants": [
            {
              "csku_id": Cypress.env("csku_id"),
              "invoiced_cost": Cypress.env("RandomNumber"),
              "shortage_qty": 0,
              "invoiced_qty": custom_qty[0]
            },
            {
              "csku_id":Cypress.env("csku_id1"),
              "invoiced_cost": Cypress.env("RandomNumber"),
              "shortage_qty": shortage_qty,
              "invoiced_qty": invoiced_qty
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}${"/receive"}`,
      body: requestData,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.log(JSON.stringify(body))
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("shipment_num");
      expect(body.result.data).has.property("shipment_date");
      expect(body.result.data).has.property("warehouse_id");
      expect(body.result.data).has.property("etd");
      expect(body.result.data).has.property("eta");
      expect(body.result.data).has.property("custom_in");
      expect(body.result.data).has.property("custom_out");
      expect(body.result.data).has.property("custom_entry_num");
      expect(body.result.data).has.property("air_or_sea");
      expect(body.result.data).has.property("bol_num");
      expect(body.result.data).has.property("vessel");
      expect(body.result.data).has.property("carton_count");
      expect(body.result.data).has.property("container_num");
      expect(body.result.data).has.property("document_comment");
      expect(body.result.data).has.property("bank_release");
      expect(body.result.data).has.property("misc_remark");
      expect(body.result.data).has.property("purchase_inv_num");
      expect(body.result.data).has.property("brokers_inv_num");
      expect(body.result.data).has.property("brokers_inv_date");
      expect(body.result.data).has.deep.property("brokers_freight_amt");
      expect(body.result.data).has.deep.property("brokers_storage_amt");
      expect(body.result.data).has.deep.property("freight_amt");
      expect(body.result.data).has.deep.property("storage_amt");
      expect(body.result.data).has.deep.property("duty_amt");
      expect(body.result.data).has.deep.property(  "freight_fwd_charges");
      expect(body.result.data).has.deep.property(  "invoiced_total_amt");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("intrans_wh_id");
      expect(body.result.data).has.property("warehouse_code");
      expect(body.result.data).has.property("warehouse_name");
      body.result.data.lines.forEach((element: any, index: any) => 
      {expect(element).has.property("id");
      expect(element).has.property("import_po_line_id");
      expect(element).has.property("line");
      element.variants.forEach((element1: any, inner_index: any) => {  
        expect(element1).has.property("id");  
        expect(element1).has.property("csku_id"); 
        let req_invoiced_cost =requestData.lines[index].variants[inner_index].invoiced_cost.toString()
        if(Cypress.env("meta_value")>0){
          req_invoiced_cost =  requestData.lines[index].variants[
            inner_index].invoiced_cost.toFixed(Cypress.env("meta_value"))
        }else{
          req_invoiced_cost =  requestData.lines[index].variants[
            inner_index].invoiced_cost.toFixed(Cypress.env("def_metaValue"))
        }
      expect(element1).has.deep.property("invoiced_cost",req_invoiced_cost);  
        expect(element1).has.deep.property("invoiced_cost");  
        expect(element1).has.property("intrans_qty");  
        expect(element1).has.property("incustom_qty");
        expect(element1).has.property("invoiced_qty");
        expect(element1).has.property("status");
        });
      });
    });
  });

});

describe(`${store_msg.success_fetch}${Cypress.spec["fileName"]}`, () => {
  it(`Test case for fetch import_shipment`, () => {
    let requestData = {
      search: [
        {
          key: "import_shipment.id",
          operation: "=",
          val: shipment_id,
        },
      ],
      searchOr: [
        {
          key: "import_shipment.id",
          operation: "=",
          val: shipment_id,
        },
      ],
      searchOrAnd: [
        {
          key: "import_shipment.id",
          operation: "=",
          val: shipment_id,
        },
      ],
      select: [
        "import_shipment.id",
        "company_id",
        "shipment_num",
        "warehouse_id",
        "warehouse.name as warehouse_name",
        "etd",
        "eta",
        "air_or_sea",
        "container_num",
      ],
      sort: "import_shipment.id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((element: any, index: any) => {
        expect(element).has.property("id", requestData.search[index].val);
        expect(element).has.property("company_id");
        expect(element).has.property("shipment_num");
        expect(element).has.property("warehouse_id");
        expect(element).has.property("warehouse_name");
        expect(element).has.property("etd");
        expect(element).has.property("eta");
        expect(element).has.property("air_or_sea");
        expect(element).has.property("container_num");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it(`Test case for fetch import_shipment when don't provide any field`, () => {
    let requestData = {};
    cy.request({
      method: routes.post,
      url: routes.fetch_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 200);
      expect(body).has.property("success", true);
      expect(body).has.property("error", null);
      expect(body).has.property("result");
      expect(body.result).has.property("message");
      body.result.data.forEach((element: any) => {
        expect(element).has.property("id");
        expect(element).has.property("company_id");
        expect(element).has.property("shipment_num");
        expect(element).has.property("shipment_date");
        expect(element).has.property("warehouse_id");
        expect(element).has.property("etd");
        expect(element).has.property("eta");
        expect(element).has.property("custom_in");
        expect(element).has.property("custom_out");
        expect(element).has.property("custom_entry_num");
        expect(element).has.property("air_or_sea");
        expect(element).has.property("bol_num");
        expect(element).has.property("vessel");
        expect(element).has.property("carton_count");
        expect(element).has.property("container_num");
        expect(element).has.property("document_comment");
        expect(element).has.property("bank_release");
        expect(element).has.property("misc_remark");
        expect(element).has.property("purchase_inv_num");
        expect(element).has.property("brokers_inv_num");
        expect(element).has.property("brokers_inv_date");
        expect(element).has.property("brokers_freight_amt");
        expect(element).has.property("brokers_storage_amt");
        expect(element).has.property("freight_amt");
        expect(element).has.property("storage_amt");
        expect(element).has.property("duty_amt");
        expect(element).has.property("freight_fwd_charges");
        expect(element).has.property("invoiced_total_amt");
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
        expect(element).has.property("warehouse_name");
        expect(element).has.property("warehouse_code");
      });
      expect(body.result).has.property("page");
      expect(body.result).has.property("perPage");
      expect(body.result).has.property("totalRecords");
    });
  });

  it(`Test case for fetch import_shipment when select field is not provided`, () => {
    let requestData = {
      search: [
        {
          key: "import_shipment.id",
          operation: "=",
          val: shipment_id,
        },
      ],
      select: [],
      sort: "import_shipment.id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((element: any, index: any) => {
        expect(element).has.property("id", requestData.search[index].val);
        expect(element).has.property("company_id");
        expect(element).has.property("shipment_num");
        expect(element).has.property("shipment_date");
        expect(element).has.property("warehouse_id");
        expect(element).has.property("etd");
        expect(element).has.property("eta");
        expect(element).has.property("custom_in");
        expect(element).has.property("custom_out");
        expect(element).has.property("custom_entry_num");
        expect(element).has.property("air_or_sea");
        expect(element).has.property("bol_num");
        expect(element).has.property("vessel");
        expect(element).has.property("carton_count");
        expect(element).has.property("container_num");
        expect(element).has.property("document_comment");
        expect(element).has.property("bank_release");
        expect(element).has.property("misc_remark");
        expect(element).has.property("purchase_inv_num");
        expect(element).has.property("brokers_inv_num");
        expect(element).has.property("brokers_inv_date");
        expect(element).has.property("brokers_freight_amt");
        expect(element).has.property("brokers_storage_amt");
        expect(element).has.property("freight_amt");
        expect(element).has.property("storage_amt");
        expect(element).has.property("duty_amt");
        expect(element).has.property("freight_fwd_charges");
        expect(element).has.property("invoiced_total_amt");
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
        expect(element).has.property("warehouse_name");
        expect(element).has.property("warehouse_code");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it(`Test case for fetch import_shipment when search and select field are not provided`, () => {
    let requestData = {
      search: [],
      select: [],
      sort: "import_shipment.id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((element: any) => {
        expect(element).has.property("id");
        expect(element).has.property("company_id");
        expect(element).has.property("shipment_num");
        expect(element).has.property("shipment_date");
        expect(element).has.property("warehouse_id");
        expect(element).has.property("etd");
        expect(element).has.property("eta");
        expect(element).has.property("custom_in");
        expect(element).has.property("custom_out");
        expect(element).has.property("custom_entry_num");
        expect(element).has.property("air_or_sea");
        expect(element).has.property("bol_num");
        expect(element).has.property("vessel");
        expect(element).has.property("carton_count");
        expect(element).has.property("container_num");
        expect(element).has.property("document_comment");
        expect(element).has.property("bank_release");
        expect(element).has.property("misc_remark");
        expect(element).has.property("purchase_inv_num");
        expect(element).has.property("brokers_inv_num");
        expect(element).has.property("brokers_inv_date");
        expect(element).has.property("brokers_freight_amt");
        expect(element).has.property("brokers_storage_amt");
        expect(element).has.property("freight_amt");
        expect(element).has.property("storage_amt");
        expect(element).has.property("duty_amt");
        expect(element).has.property("freight_fwd_charges");
        expect(element).has.property("invoiced_total_amt");
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
        expect(element).has.property("warehouse_name");
        expect(element).has.property("warehouse_code");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it(`Test case for fetch import_shipment when search field are not provided`, () => {
    let requestData = {
      search: [],
      select: [
        "import_shipment.id",
        "company_id",
        "shipment_num",
        "warehouse_id",
        "warehouse.name as warehouse_name",
        "etd",
        "eta",
        "air_or_sea",
        "container_num",
      ],
      sort: "import_shipment.id",
      orderby: "desc",
      page: 1,
      perPage: 20,
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      body.result.data.forEach((element: any, index: any) => {
        expect(element).has.property("id");
        expect(element).has.property("company_id");
        expect(element).has.property("shipment_num");
        expect(element).has.property("warehouse_id");
        expect(element).has.property("warehouse_name");
        expect(element).has.property("etd");
        expect(element).has.property("eta");
        expect(element).has.property("air_or_sea");
        expect(element).has.property("container_num");
      });
      expect(body.result).has.property("page", requestData.page);
      expect(body.result).has.property("perPage", requestData.perPage);
      expect(body.result).has.property("totalRecords");
    });
  });

  it(`Test case for fetch import_shipment when wrong/invalid data is provided in search field`, () => {
    let requestData = {
      search: [
        {
          key: "import_shipment.id",
          operation: "=",
          val: Cypress.env("RandomNumber"),
        },
      ],
      select: [
        "import_shipment.id as import_shipment_id",
        "warehouse_id",
        "shipment_num",
        "company_id",
      ],
      sort: "import_shipment.id",
      orderby: "desc",
      page: 1,
      perPage: 20
    };
    cy.request({
      method: routes.post,
      url: routes.fetch_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
    });
  });
});

describe(`${store_msg.success_get}${Cypress.spec["fileName"]}`, () => {
  it(`Test case for get import_shipment`, () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_shipment}${shipment_id}`,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("shipment_num");
      expect(body.result.data).has.property("shipment_date");
      expect(body.result.data).has.property("warehouse_id");
      expect(body.result.data).has.property("etd");
      expect(body.result.data).has.property("eta");
      expect(body.result.data).has.property("custom_in");
      expect(body.result.data).has.property("custom_out");
      expect(body.result.data).has.property("custom_entry_num");
      expect(body.result.data).has.property("air_or_sea");
      expect(body.result.data).has.property("bol_num");
      expect(body.result.data).has.property("vessel");
      expect(body.result.data).has.property("carton_count");
      expect(body.result.data).has.property("container_num");
      expect(body.result.data).has.property("document_comment");
      expect(body.result.data).has.property("bank_release");
      expect(body.result.data).has.property("misc_remark");
      expect(body.result.data).has.property("purchase_inv_num");
      expect(body.result.data).has.property("brokers_inv_num");
      expect(body.result.data).has.property("brokers_inv_date");
      expect(body.result.data).has.property("brokers_freight_amt");
      expect(body.result.data).has.property("brokers_storage_amt");
      expect(body.result.data).has.property("freight_amt");
      expect(body.result.data).has.property("storage_amt");
      expect(body.result.data).has.property("duty_amt");
      expect(body.result.data).has.property("freight_fwd_charges");
      expect(body.result.data).has.property("invoiced_total_amt");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("warehouse_code");
      expect(body.result.data).has.property("warehouse_name");
      body.result.data.lines.forEach((element: any) => {
        expect(element).has.property("id");
        expect(element).has.property("import_po_line_id");
        expect(element).has.property("line");
        element.variants.forEach((element1: any) => {
          expect(element1).has.property("id");
          expect(element1).has.property("csku_id");
          expect(element1).has.property("invoiced_cost");
          expect(element1).has.property("intrans_qty");
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("invoiced_qty");
          expect(element1).has.property("status");
        });
      });
    });
  });
});

describe(`${store_msg.success_log}${Cypress.spec["fileName"]}`, () => {

  it("Test cases for get-log API", () => {
    let today = new Date().toISOString().slice(0, 10);
    let requestData = {
      module_name: "import_shipment",
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
    let recordId = shipment_id.toString();
    let requestData = {
      module: "import_shipment",
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
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Track_change(body);
    });
  });

  it("Test case for look-up API", () => {
    let name = "import_shipment";
    let obj = {
      "statusCode": 200,
      "success": true,
      "error": null,
      "result": {
        "message": "Module fields fetched successfully",
        "data": {
          "fields": [
            "id",
            "company_id",
            "shipment_num",
            "shipment_date",
            "warehouse_id",
            "intrans_wh_id",
            "etd",
            "eta",
            "custom_in",
            "custom_out",
            "custom_entry_num",
            "air_or_sea",
            "bol_num",
            "vessel",
            "carton_count",
            "container_num",
            "document_comment",
            "bank_release",
            "misc_remark",
            "purchase_inv_num",
            "brokers_inv_num",
            "brokers_inv_date",
            "brokers_freight_amt",
            "brokers_storage_amt",
            "freight_amt",
            "storage_amt",
            "duty_amt",
            "freight_fwd_charges",
            "invoiced_total_amt",
            "status",
            "created_date",
            "updated_date",
            "created_by",
            "updated_by"
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
            },
            "warehouse_id": {
              "object": "warehouse",
              "fields": [
                "id",
                "code",
                "name",
                "status",
                "created_date",
                "updated_date",
                "created_by",
                "updated_by"
              ]
            }
          },
          "child": {
            "import_shipment_lines": {
              "fields": [
                "id",
                "import_shipment_id",
                "line",
                "import_po_line_id",
                "status",
                "created_date",
                "updated_date",
                "created_by",
                "updated_by"
              ],
              "foreignKey": {
                "import_po_line_id": {
                  "object": "import_po_lines",
                  "fields": [
                    "id",
                    "import_po_id",
                    "line",
                    "item_id",
                    "color_id",
                    "prepack_id",
                    "stage_id",
                    "status",
                    "created_date",
                    "updated_date",
                    "created_by",
                    "updated_by"
                  ]
                }
              }
            }
          }
        }
      }
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

describe(`${store_msg.fail_post}${Cypress.spec["fileName"]}`, () => {
  it(`Test case when warehouse_id does not exist`, () => {
    let requestData = {
      shipment_num: Cypress.env("Random"),
      shipment_date: Cypress.env("date_formate"),
      warehouse_id: Cypress.env("RandomNumber"),
      intrans_wh_id: Cypress.env("warehouseId"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("date_formate"),
      custom_entry_num: Cypress.env("Random"),
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      vessel: Cypress.env("Random"),
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      document_comment: Cypress.env("Random"),
      bank_release: Cypress.env("Random"),
      misc_remark: Cypress.env("Random"),
      purchase_inv_num: Cypress.env("Random"),
      brokers_inv_num: Cypress.env("Random"),
      brokers_inv_date: Cypress.env("date_formate"),
      brokers_freight_amt: 150.25,
      brokers_storage_amt: 150.25,
      freight_amt: 150.25,
      storage_amt: 150.25,
      duty_amt: 150.25,
      freight_fwd_charges: 150.25,
      invoiced_total_amt: 150.25,
      status: 1,
      lines: [
        {
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          status: 1,
          variants: [
            {
              csku_id: Cypress.env("csku_id"),
              invoiced_cost: 2.25,
              intrans_qty: 5,
              status: 1,
            },
            {
              csku_id: Cypress.env("csku_id1"),
              invoiced_cost: 5.75,
              intrans_qty: 10,
              status: 1,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it(`Test case when intrans_wh_id does not exist`, () => {
    let requestData = {
      shipment_num: Cypress.env("Random"),
      shipment_date: Cypress.env("date_formate"),
      warehouse_id: Cypress.env("warehouseId"),
      intrans_wh_id: Cypress.env("RandomNumber"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("date_formate"),
      custom_entry_num: Cypress.env("Random"),
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      vessel: Cypress.env("Random"),
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      document_comment: Cypress.env("Random"),
      bank_release: Cypress.env("Random"),
      misc_remark: Cypress.env("Random"),
      purchase_inv_num: Cypress.env("Random"),
      brokers_inv_num: Cypress.env("Random"),
      brokers_inv_date: Cypress.env("date_formate"),
      brokers_freight_amt: 150.25,
      brokers_storage_amt: 150.25,
      freight_amt: 150.25,
      storage_amt: 150.25,
      duty_amt: 150.25,
      freight_fwd_charges: 150.25,
      invoiced_total_amt: 150.25,
      status: 1,
      lines: [
        {
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          status: 1,
          variants: [
            {
              csku_id: Cypress.env("csku_id"),
              invoiced_cost: 2.25,
              intrans_qty: 5,
              status: 1,
            },
            {
              csku_id: Cypress.env("csku_id1"),
              invoiced_cost: 5.75,
              intrans_qty: 10,
              status: 1,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      cy.Failure(body);
    });
  });

  it(`Test case when import_po_line_id does not exist`, () => {
    let requestData = {
      shipment_num: Cypress.env("Random"),
      shipment_date: Cypress.env("date_formate"),
      warehouse_id: Cypress.env("warehouseId"),
      intrans_wh_id: Cypress.env("warehouseId"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("date_formate"),
      custom_entry_num: Cypress.env("Random"),
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      vessel: Cypress.env("Random"),
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      document_comment: Cypress.env("Random"),
      bank_release: Cypress.env("Random"),
      misc_remark: Cypress.env("Random"),
      purchase_inv_num: Cypress.env("Random"),
      brokers_inv_num: Cypress.env("Random"),
      brokers_inv_date: Cypress.env("date_formate"),
      brokers_freight_amt: 150.25,
      brokers_storage_amt: 150.25,
      freight_amt: 150.25,
      storage_amt: 150.25,
      duty_amt: 150.25,
      freight_fwd_charges: 150.25,
      invoiced_total_amt: 150.25,
      status: 1,
      lines: [
        {
          line: 1,
          import_po_line_id: Cypress.env("RandomNumber"),
          status: 1,
          variants: [
            {
              csku_id: Cypress.env("csku_id"),
              invoiced_cost: 2.25,
              intrans_qty: 5,
              status: 1,
            },
            {
              csku_id: Cypress.env("csku_id1"),
              invoiced_cost: 5.75,
              intrans_qty: 10,
              status: 1,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "import_po_line_id",
        body.error.errorDetails.import_po_line_id
      );
      expect(body).has.property("result", body.result);
    });
  });

  it(`import_po_line_id is not associated with csku_id`, () => {
    let requestData = {
      shipment_num: Cypress.env("Random"),
      shipment_date: Cypress.env("date_formate"),
      warehouse_id: Cypress.env("warehouseId"),
      intrans_wh_id: Cypress.env("warehouseId"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("date_formate"),
      custom_entry_num: Cypress.env("Random"),
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      vessel: Cypress.env("Random"),
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      document_comment: Cypress.env("Random"),
      bank_release: Cypress.env("Random"),
      misc_remark: Cypress.env("Random"),
      purchase_inv_num: Cypress.env("Random"),
      brokers_inv_num: Cypress.env("Random"),
      brokers_inv_date: Cypress.env("date_formate"),
      brokers_freight_amt: 150.25,
      brokers_storage_amt: 150.25,
      freight_amt: 150.25,
      storage_amt: 150.25,
      duty_amt: 150.25,
      freight_fwd_charges: 150.25,
      invoiced_total_amt: 150.25,
      status: 1,
      lines: [
        {
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          status: 1,
          variants: [
            {
              csku_id: Cypress.env("RandomNumber"),
              invoiced_cost: 2.25,
              intrans_qty: 5,
              status: 1,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "import_po_line_id",
        body.error.errorDetails.import_po_line_id
      );
      expect(body).has.property("result", body.result);
    });
  });

  it(`shipment_num should be unique`, () => {
    let requestData = {
      shipment_num: shipment_num,
      shipment_date: Cypress.env("date_formate"),
      warehouse_id: Cypress.env("warehouseId"),
      intrans_wh_id: Cypress.env("warehouseId"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("date_formate"),
      custom_entry_num: Cypress.env("Random"),
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      vessel: Cypress.env("Random"),
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      document_comment: Cypress.env("Random"),
      bank_release: Cypress.env("Random"),
      misc_remark: Cypress.env("Random"),
      purchase_inv_num: Cypress.env("Random"),
      brokers_inv_num: Cypress.env("Random"),
      brokers_inv_date: Cypress.env("date_formate"),
      brokers_freight_amt: 150.25,
      brokers_storage_amt: 150.25,
      freight_amt: 150.25,
      storage_amt: 150.25,
      duty_amt: 150.25,
      freight_fwd_charges: 150.25,
      invoiced_total_amt: 150.25,
      status: 1,
      lines: [
        {
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          status: 1,
          variants: [
            {
              csku_id: Cypress.env("csku_id"),
              invoiced_cost: 2.25,
              intrans_qty: 5,
              status: 1,
            },
            {
              csku_id: Cypress.env("csku_id1"),
              invoiced_cost: 5.75,
              intrans_qty: 10,
              status: 1,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "shipment_num",
        body.error.errorDetails.shipment_num
      );
      expect(body).has.property("result", body.result);
    });
  });

  it(`shipment_date should be date-format`, () => {
    let requestData = {
      shipment_num: Cypress.env("Random"),
      shipment_date: Cypress.env("Random"),
      warehouse_id: Cypress.env("warehouseId"),
      intrans_wh_id: Cypress.env("warehouseId"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("date_formate"),
      custom_entry_num: Cypress.env("Random"),
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      vessel: Cypress.env("Random"),
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      document_comment: Cypress.env("Random"),
      bank_release: Cypress.env("Random"),
      misc_remark: Cypress.env("Random"),
      purchase_inv_num: Cypress.env("Random"),
      brokers_inv_num: Cypress.env("Random"),
      brokers_inv_date: Cypress.env("date_formate"),
      brokers_freight_amt: 150.25,
      brokers_storage_amt: 150.25,
      freight_amt: 150.25,
      storage_amt: 150.25,
      duty_amt: 150.25,
      freight_fwd_charges: 150.25,
      invoiced_total_amt: 150.25,
      status: 1,
      lines: [
        {
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          status: 1,
          variants: [
            {
              csku_id: Cypress.env("csku_id"),
              invoiced_cost: 2.25,
              intrans_qty: 5,
              status: 1,
            },
            {
              csku_id: Cypress.env("csku_id1"),
              invoiced_cost: 5.75,
              intrans_qty: 10,
              status: 1,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "date_format",
        body.error.errorDetails.date_format
      );
      expect(body).has.property("result", body.result);
    });
  });

  it(`etd should be date-format`, () => {
    let requestData = {
      shipment_num: Cypress.env("Random"),
      shipment_date: Cypress.env("date_formate"),
      warehouse_id: Cypress.env("warehouseId"),
      intrans_wh_id: Cypress.env("warehouseId"),
      etd: Cypress.env("Random"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("date_formate"),
      custom_entry_num: Cypress.env("Random"),
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      vessel: Cypress.env("Random"),
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      document_comment: Cypress.env("Random"),
      bank_release: Cypress.env("Random"),
      misc_remark: Cypress.env("Random"),
      purchase_inv_num: Cypress.env("Random"),
      brokers_inv_num: Cypress.env("Random"),
      brokers_inv_date: Cypress.env("date_formate"),
      brokers_freight_amt: 150.25,
      brokers_storage_amt: 150.25,
      freight_amt: 150.25,
      storage_amt: 150.25,
      duty_amt: 150.25,
      freight_fwd_charges: 150.25,
      invoiced_total_amt: 150.25,
      status: 1,
      lines: [
        {
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          status: 1,
          variants: [
            {
              csku_id: Cypress.env("csku_id"),
              invoiced_cost: 2.25,
              intrans_qty: 5,
              status: 1,
            },
            {
              csku_id: Cypress.env("csku_id1"),
              invoiced_cost: 5.75,
              intrans_qty: 10,
              status: 1,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "date_format",
        body.error.errorDetails.date_format
      );
      expect(body).has.property("result", body.result);
    });
  });

  it(`eta should be date-format`, () => {
    let requestData = {
      shipment_num: Cypress.env("Random"),
      shipment_date: Cypress.env("date_formate"),
      warehouse_id: Cypress.env("warehouseId"),
      intrans_wh_id: Cypress.env("warehouseId"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("Random"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("date_formate"),
      custom_entry_num: Cypress.env("Random"),
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      vessel: Cypress.env("Random"),
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      document_comment: Cypress.env("Random"),
      bank_release: Cypress.env("Random"),
      misc_remark: Cypress.env("Random"),
      purchase_inv_num: Cypress.env("Random"),
      brokers_inv_num: Cypress.env("Random"),
      brokers_inv_date: Cypress.env("date_formate"),
      brokers_freight_amt: 150.25,
      brokers_storage_amt: 150.25,
      freight_amt: 150.25,
      storage_amt: 150.25,
      duty_amt: 150.25,
      freight_fwd_charges: 150.25,
      invoiced_total_amt: 150.25,
      status: 1,
      lines: [
        {
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          status: 1,
          variants: [
            {
              csku_id: Cypress.env("csku_id"),
              invoiced_cost: 2.25,
              intrans_qty: 5,
              status: 1,
            },
            {
              csku_id: Cypress.env("csku_id1"),
              invoiced_cost: 5.75,
              intrans_qty: 10,
              status: 1,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "date_format",
        body.error.errorDetails.date_format
      );
      expect(body).has.property("result", body.result);
    });
  });

  it(`custom_in should be date-format`, () => {
    let requestData = {
      shipment_num: Cypress.env("Random"),
      shipment_date: Cypress.env("date_formate"),
      warehouse_id: Cypress.env("warehouseId"),
      intrans_wh_id: Cypress.env("warehouseId"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("Random"),
      custom_out: Cypress.env("date_formate"),
      custom_entry_num: Cypress.env("Random"),
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      vessel: Cypress.env("Random"),
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      document_comment: Cypress.env("Random"),
      bank_release: Cypress.env("Random"),
      misc_remark: Cypress.env("Random"),
      purchase_inv_num: Cypress.env("Random"),
      brokers_inv_num: Cypress.env("Random"),
      brokers_inv_date: Cypress.env("date_formate"),
      brokers_freight_amt: 150.25,
      brokers_storage_amt: 150.25,
      freight_amt: 150.25,
      storage_amt: 150.25,
      duty_amt: 150.25,
      freight_fwd_charges: 150.25,
      invoiced_total_amt: 150.25,
      status: 1,
      lines: [
        {
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          status: 1,
          variants: [
            {
              csku_id: Cypress.env("csku_id"),
              invoiced_cost: 2.25,
              intrans_qty: 5,
              status: 1,
            },
            {
              csku_id: Cypress.env("csku_id1"),
              invoiced_cost: 5.75,
              intrans_qty: 10,
              status: 1,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "date_format",
        body.error.errorDetails.date_format
      );
      expect(body).has.property("result", body.result);
    });
  });

  it(`custom_out should be date-format`, () => {
    let requestData = {
      shipment_num: Cypress.env("Random"),
      shipment_date: Cypress.env("date_formate"),
      warehouse_id: Cypress.env("warehouseId"),
      intrans_wh_id: Cypress.env("warehouseId"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("Random"),
      custom_entry_num: Cypress.env("Random"),
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      vessel: Cypress.env("Random"),
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      document_comment: Cypress.env("Random"),
      bank_release: Cypress.env("Random"),
      misc_remark: Cypress.env("Random"),
      purchase_inv_num: Cypress.env("Random"),
      brokers_inv_num: Cypress.env("Random"),
      brokers_inv_date: Cypress.env("date_formate"),
      brokers_freight_amt: 150.25,
      brokers_storage_amt: 150.25,
      freight_amt: 150.25,
      storage_amt: 150.25,
      duty_amt: 150.25,
      freight_fwd_charges: 150.25,
      invoiced_total_amt: 150.25,
      status: 1,
      lines: [
        {
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          status: 1,
          variants: [
            {
              csku_id: Cypress.env("csku_id"),
              invoiced_cost: 2.25,
              intrans_qty: 5,
              status: 1,
            },
            {
              csku_id: Cypress.env("csku_id1"),
              invoiced_cost: 5.75,
              intrans_qty: 10,
              status: 1,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "date_format",
        body.error.errorDetails.date_format
      );
      expect(body).has.property("result", body.result);
    });
  });

  it(`air_or_sea must be one of [A and S]`, () => {
    let requestData = {
      shipment_num: Cypress.env("Random"),
      shipment_date: Cypress.env("date_formate"),
      warehouse_id: Cypress.env("warehouseId"),
      intrans_wh_id: Cypress.env("warehouseId"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("date_formate"),
      custom_entry_num: Cypress.env("Random"),
      air_or_sea: Cypress.env("Random"),
      bol_num: Cypress.env("Random"),
      vessel: Cypress.env("Random"),
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      document_comment: Cypress.env("Random"),
      bank_release: Cypress.env("Random"),
      misc_remark: Cypress.env("Random"),
      purchase_inv_num: Cypress.env("Random"),
      brokers_inv_num: Cypress.env("Random"),
      brokers_inv_date: Cypress.env("date_formate"),
      brokers_freight_amt: 150.25,
      brokers_storage_amt: 150.25,
      freight_amt: 150.25,
      storage_amt: 150.25,
      duty_amt: 150.25,
      freight_fwd_charges: 150.25,
      invoiced_total_amt: 150.25,
      status: 1,
      lines: [
        {
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          status: 1,
          variants: [
            {
              csku_id: Cypress.env("csku_id"),
              invoiced_cost: 2.25,
              intrans_qty: 5,
              status: 1,
            },
            {
              csku_id: Cypress.env("csku_id1"),
              invoiced_cost: 5.75,
              intrans_qty: 10,
              status: 1,
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "air_or_sea",
        body.error.errorDetails.air_or_sea
      );
      expect(body).has.property("result", body.result);
    });
  });

  it(`warehouse_id, intrans_wh_id, carton_count, brokers_freight_amt, brokers_storage_amt, freight_amt,
        invoiced_total_amt,storage_amt, duty_amt, freight_fwd_charges,status,line,
        import_po_line_id, csku_id, invoiced_cost and intrans_qty should be number `, () => {
    let requestData = {
      shipment_num: Cypress.env("Random"),
      shipment_date: Cypress.env("date_formate"),
      warehouse_id: Cypress.env("RandomNum"),
      intrans_wh_id: Cypress.env("RandomNum"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("date_formate"),
      custom_entry_num: Cypress.env("Random"),
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      vessel: Cypress.env("Random"),
      carton_count: Cypress.env("RandomNum"),
      container_num: Cypress.env("Random"),
      document_comment: Cypress.env("Random"),
      bank_release: Cypress.env("Random"),
      misc_remark: Cypress.env("Random"),
      purchase_inv_num: Cypress.env("Random"),
      brokers_inv_num: Cypress.env("Random"),
      brokers_inv_date: Cypress.env("date_formate"),
      brokers_freight_amt: Cypress.env("RandomNum"),
      brokers_storage_amt: Cypress.env("RandomNum"),
      freight_amt: Cypress.env("RandomNum"),
      storage_amt: Cypress.env("RandomNum"),
      duty_amt: Cypress.env("RandomNum"),
      freight_fwd_charges: Cypress.env("RandomNum"),
      invoiced_total_amt: Cypress.env("RandomNum"),
      status: Cypress.env("RandomNum"),
      lines: [
        {
          line: Cypress.env("RandomNum"),
          import_po_line_id: Cypress.env("RandomNum"),
          status: Cypress.env("RandomNum"),
          variants: [
            {
              csku_id: Cypress.env("RandomNum"),
              invoiced_cost: Cypress.env("RandomNum"),
              intrans_qty: Cypress.env("RandomNum"),
              status: Cypress.env("RandomNum")
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.post,
      url: routes.post_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.log(JSON.stringify(requestData))
      cy.Failure(body)
      expect(body.error.errorDetails).has.property("warehouse_id");
      expect(body.error.errorDetails).has.property("intrans_wh_id");
      expect(body.error.errorDetails).has.property("carton_count");
      expect(body.error.errorDetails).has.property("brokers_freight_amt");
      expect(body.error.errorDetails).has.property("brokers_storage_amt");
      expect(body.error.errorDetails).has.property("freight_amt");
      expect(body.error.errorDetails).has.property("storage_amt");
      expect(body.error.errorDetails).has.property("duty_amt");
      expect(body.error.errorDetails).has.property("freight_fwd_charges");
      expect(body.error.errorDetails).has.property("invoiced_total_amt");
      expect(body.error.errorDetails).has.property("status");
      expect(body.error.errorDetails).has.property("line");
      expect(body.error.errorDetails).has.property("import_po_line_id");
      expect(body.error.errorDetails).has.property("csku_id");
      expect(body.error.errorDetails).has.property("invoiced_cost");
      expect(body.error.errorDetails).has.property("intrans_qty");
    });
  });

  it(`status must be one of [0 or 1]`, () => {
    let requestData = {
      shipment_num: Cypress.env("Random"),
      shipment_date: Cypress.env("date_formate"),
      warehouse_id: Cypress.env("warehouseId"),
      intrans_wh_id: Cypress.env("warehouseId"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("date_formate"),
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      status: Cypress.env("RandomNumber"),
      lines: [
        {
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          status: Cypress.env("RandomNumber"),
          variants: [
            {
              csku_id: Cypress.env("csku_id"),
              invoiced_cost: 2.25,
              intrans_qty: 5,
              status: Cypress.env("RandomNumber"),
            },
          ],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(requestData))
      cy.Failure(body)
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it(`Test case when lines array are left blank`, () => {
    let requestData = {
      shipment_num: Cypress.env("Random"),
      shipment_date: Cypress.env("date_formate"),
      warehouse_id: Cypress.env("warehouseId"),
      intrans_wh_id: Cypress.env("warehouseId"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("date_formate"),
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      lines: [],
    };
    cy.request({
      method: routes.post,
      url: routes.post_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "lines",
        body.error.errorDetails.lines
      );
      expect(body).has.property("result", body.result);
    });
  });

  it(`Test case when lines object are left blank`, () => {
    let requestData = {
      shipment_num: Cypress.env("Random"),
      shipment_date: Cypress.env("date_formate"),
      warehouse_id: Cypress.env("warehouseId"),
      intrans_wh_id: Cypress.env("warehouseId"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("date_formate"),
      custom_entry_num: Cypress.env("Random"),
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      vessel: Cypress.env("Random"),
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      document_comment: Cypress.env("Random"),
      bank_release: Cypress.env("Random"),
      misc_remark: Cypress.env("Random"),
      purchase_inv_num: Cypress.env("Random"),
      brokers_inv_num: Cypress.env("Random"),
      brokers_inv_date: Cypress.env("date_formate"),
      brokers_freight_amt: 150.25,
      brokers_storage_amt: 150.25,
      freight_amt: 150.25,
      storage_amt: 150.25,
      duty_amt: 150.25,
      freight_fwd_charges: 150.25,
      invoiced_total_amt: 150.25,
      status: 1,
      lines: [{}],
    };
    cy.request({
      method: routes.post,
      url: routes.post_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "line",
        body.error.errorDetails.line
      );
      expect(body.error.errorDetails).has.property(
        "import_po_line_id",
        body.error.errorDetails.import_po_line_id
      );
      expect(body.error.errorDetails).has.property(
        "variants",
        body.error.errorDetails.variants
      );
      expect(body).has.property("result", body.result);
    });
  });

  it(`Test case when variants array are left blank`, () => {
    let requestData = {
      shipment_num: Cypress.env("Random"),
      shipment_date: Cypress.env("date_formate"),
      warehouse_id: Cypress.env("warehouseId"),
      intrans_wh_id: Cypress.env("warehouseId"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("date_formate"),
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      lines: [
        {
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          variants: [],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "variants",
        body.error.errorDetails.variants
      );
      expect(body).has.property("result", body.result);
    });
  });

  it(`Test case when variants object are left blank`, () => {
    let requestData = {
      shipment_num: Cypress.env("Random"),
      shipment_date: Cypress.env("date_formate"),
      warehouse_id: Cypress.env("warehouseId"),
      intrans_wh_id: Cypress.env("warehouseId"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("date_formate"),
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      lines: [
        {
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          variants: [{}],
        },
      ],
    };
    cy.request({
      method: routes.post,
      url: routes.post_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(body));
      expect(body).has.property("statusCode", 400);
      expect(body).has.property("success", false);
      expect(body).has.property("error");
      expect(body.error).has.property("message", body.error.message);
      expect(body.error.errorDetails).has.property(
        "csku_id",
        body.error.errorDetails.csku_id
      );
      expect(body.error.errorDetails).has.property(
        "invoiced_cost",
        body.error.errorDetails.invoiced_cost
      );
      expect(body.error.errorDetails).has.property(
        "intrans_qty",
        body.error.errorDetails.intrans_qty
      );
      expect(body).has.property("result", body.result);
    });
  });

  it(`Test case when required field left blank`, () => {
    let requestData = {
      intrans_wh_id: "",
      shipment_num: "",
      shipment_date: "",
      etd: "",
      eta: "",
      custom_in: "",
      custom_out: "",
      air_or_sea: "",
      bol_num: "",
      carton_count: "",
      container_num: "",
      status: "",
      lines: [
        {
          line: "",
          import_po_line_id: "",
          status: "",
          variants: [
            {
              csku_id: "",
              invoiced_cost: "",
              intrans_qty: "",
              status: ""
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.post,
      url: routes.post_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("intrans_wh_id");
      expect(body.error.errorDetails).has.property("shipment_num");
      expect(body.error.errorDetails).has.property("shipment_date");
      expect(body.error.errorDetails).has.property("etd");
      expect(body.error.errorDetails).has.property("eta");
      expect(body.error.errorDetails).has.property("custom_in");
      expect(body.error.errorDetails).has.property("custom_out",);
      expect(body.error.errorDetails).has.property("air_or_sea");
      expect(body.error.errorDetails).has.property("bol_num");
      expect(body.error.errorDetails).has.property("carton_count");
      expect(body.error.errorDetails).has.property("container_num");
      expect(body.error.errorDetails).has.property("status");
      expect(body.error.errorDetails).has.property("line");
      expect(body.error.errorDetails).has.property("import_po_line_id");
      expect(body.error.errorDetails).has.property("csku_id");
      expect(body.error.errorDetails).has.property("invoiced_cost");
      expect(body.error.errorDetails).has.property("intrans_qty");
    });
  });

  it(` Test case when request body left blank`, () => {
    cy.request({
      method: routes.post,
      url: routes.post_shipment,
      body: {},
      headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("intrans_wh_id");
      expect(body.error.errorDetails).has.property("shipment_num");
      expect(body.error.errorDetails).has.property("shipment_date");
      expect(body.error.errorDetails).has.property("etd");
      expect(body.error.errorDetails).has.property("eta");
      expect(body.error.errorDetails).has.property("custom_in");
      expect(body.error.errorDetails).has.property("custom_out",);
      expect(body.error.errorDetails).has.property("air_or_sea");
      expect(body.error.errorDetails).has.property("bol_num");
      expect(body.error.errorDetails).has.property("carton_count");
      expect(body.error.errorDetails).has.property("container_num");
      expect(body.error.errorDetails).has.property("lines");
    });
  });

  it(`line should be unique`, () => {
    let requestData = {
      shipment_num: Cypress.env("Random"),
      shipment_date: Cypress.env("date_formate"),
      warehouse_id: Cypress.env("warehouseId"),
      intrans_wh_id: Cypress.env("warehouseId"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("date_formate"),
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      lines: [
        {
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          status: 1,
          variants: [
            {
              csku_id: Cypress.env("csku_id"),
              invoiced_cost: 2.25,
              intrans_qty: 5
            }
          ]
        },
        {
          line: 1,
          import_po_line_id: 1,
          status: 1,
          variants: [
            {
              csku_id: Cypress.env("csku_id"),
              invoiced_cost: 2.25,
              intrans_qty: 5
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.post,
      url: routes.post_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.log(JSON.stringify(requestData))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("line");
    });
  });

  it(`import_po_line_id should be unique`, () => {
    let requestData = {
      shipment_num: Cypress.env("Random"),
      shipment_date: Cypress.env("date_formate"),
      warehouse_id: Cypress.env("warehouseId"),
      intrans_wh_id: Cypress.env("warehouseId"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("date_formate"),
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      lines: [
        {
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          status: 1,
          variants: [
            {
              csku_id: Cypress.env("csku_id"),
              invoiced_cost: 2.25,
              intrans_qty: 5
            }
          ]
        },
        {
          line: 2,
          import_po_line_id: Cypress.env("line_id"),
          status: 1,
          variants: [
            {
              csku_id: Cypress.env("csku_id"),
              invoiced_cost: 2.25,
              intrans_qty: 5
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.post,
      url: routes.post_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("import_po_line_id");
    });
  });

  it(`csku_id should be unique for a lines`, () => {
    let requestData = {
      shipment_num: Cypress.env("Random"),
      shipment_date: Cypress.env("date_formate"),
      warehouse_id: Cypress.env("warehouseId"),
      intrans_wh_id: Cypress.env("warehouseId"),
      etd: Cypress.env("date_formate"),
      eta: Cypress.env("date_formate"),
      custom_in: Cypress.env("date_formate"),
      custom_out: Cypress.env("date_formate"),
      air_or_sea: "A",
      bol_num: Cypress.env("Random"),
      carton_count: Cypress.env("RandomNumber"),
      container_num: Cypress.env("Random"),
      lines: [
        {
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          variants: [
            {
              csku_id: Cypress.env("csku_id"),
              invoiced_cost: 2.25,
              intrans_qty: 5
            },
            {
              csku_id: Cypress.env("csku_id"),
              invoiced_cost: 5.75,
              intrans_qty: 10
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.post,
      url: routes.post_shipment,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("csku_id");
    });
  });
});

describe(`${store_msg.fail_put}${Cypress.spec["fileName"]}`, () => {
  it(`Test case when import_shipment_id does not exist`, () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_shipment}${Cypress.env("RandomNumber")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it(`import_shipment_id should be number`, () => {
    cy.request({
      method: routes.put,
      body: {},
      url: `${routes.post_shipment}${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it(`Test case when warehouse_id does not exist`, () => {
    let requestData = {
      warehouse_id: Cypress.env("RandomNumber"),
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it(`Test case when intrans_wh_id does not exist`, () => {
    let requestData = {
      intrans_wh_id: Cypress.env("RandomNumber"),
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
    });
  });

  it(`Test case when import_po_line_id does not exist`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id[0],
          import_po_line_id: Cypress.env("RandomNumber")
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("import_po_line_id");
    });
  });

  it(`import_po_line_id is not associated with csku_id`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id[0],
          import_po_line_id: Cypress.env("line_id"),
          variants: [
            {
              id: varients_id[0],
              csku_id: Cypress.env("RandomNumber")
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("import_po_line_id");
    });
  });

  it(`shipment_date should be date-format`, () => {
    let requestData = {
      shipment_date: Cypress.env("Random"),
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("date_format");
    });
  });

  it(`etd should be date-format`, () => {
    let requestData = {
      etd: Cypress.env("Random"),
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("date_format");
    });
  });

  it(`eta should be date-format`, () => {
    let requestData = {
      eta: Cypress.env("Random"),
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("date_format");
    });
  });

  it(`custom_in should be date-format`, () => {
    let requestData = {
      custom_in: Cypress.env("Random"),
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("date_format");
    });
  });

  it(`custom_out should be date-format`, () => {
    let requestData = {
      custom_out: Cypress.env("Random"),
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("date_format");
    });
  });

  it(`air_or_sea must be one of [A and S]`, () => {
    let requestData = {
      air_or_sea: Cypress.env("Random"),
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("air_or_sea",);
    });
  });

  it(`warehouse_id,intrans_wh_id, carton_count, brokers_freight_amt, brokers_storage_amt, freight_amt,
        invoiced_total_amt,storage_amt, duty_amt, freight_fwd_charges,status,lines_id,line,
        import_po_line_id,variants_id, csku_id, invoiced_cost and intrans_qty should be number `, () => {
    let requestData = {
      warehouse_id: Cypress.env("RandomNum"),
      intrans_wh_id:Cypress.env("RandomNum"),
      carton_count: Cypress.env("RandomNum"),
      brokers_freight_amt: Cypress.env("RandomNum"),
      brokers_storage_amt: Cypress.env("RandomNum"),
      freight_amt: Cypress.env("RandomNum"),
      storage_amt: Cypress.env("RandomNum"),
      duty_amt: Cypress.env("RandomNum"),
      freight_fwd_charges: Cypress.env("RandomNum"),
      invoiced_total_amt: Cypress.env("RandomNum"),
      status: Cypress.env("RandomNum"),
      lines: [
        {
          id: Cypress.env("RandomNum"),
          line: Cypress.env("RandomNum"),
          import_po_line_id: Cypress.env("RandomNum"),
          status: Cypress.env("RandomNum"),
          variants: [
            {
              id: Cypress.env("RandomNum"),
              csku_id: Cypress.env("RandomNum"),
              invoiced_cost: Cypress.env("RandomNum"),
              intrans_qty: Cypress.env("RandomNum"),
              status: Cypress.env("RandomNum")
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.log(JSON.stringify(requestData))
      cy.log(JSON.stringify(body))
      cy.Failure(body)
      expect(body.error.errorDetails).has.property("warehouse_id");
      expect(body.error.errorDetails).has.property("intrans_wh_id");
      expect(body.error.errorDetails).has.property("carton_count");
      expect(body.error.errorDetails).has.property("brokers_freight_amt");
      expect(body.error.errorDetails).has.property("brokers_storage_amt");
      expect(body.error.errorDetails).has.property("freight_amt");
      expect(body.error.errorDetails).has.property("storage_amt");
      expect(body.error.errorDetails).has.property("duty_amt");
      expect(body.error.errorDetails).has.property("freight_fwd_charges");
      expect(body.error.errorDetails).has.property("invoiced_total_amt");
      expect(body.error.errorDetails).has.property("status");
      expect(body.error.errorDetails).has.property("line");
      expect(body.error.errorDetails).has.property("import_po_line_id");
      expect(body.error.errorDetails).has.property("csku_id");
      expect(body.error.errorDetails).has.property("invoiced_cost");
      expect(body.error.errorDetails).has.property("intrans_qty");
    });
  });

  it(`status must be one of [0 or 1]`, () => {
    let requestData = {
      status: Cypress.env("RandomNumber")
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.log(JSON.stringify(requestData))
      cy.Failure(body)
      expect(body.error.errorDetails).has.property("status");
    });
  });

  it(`Test case when lines_id doesn't exist`, () => {
    let requestData = {
      lines: [
        {
          id: Cypress.env("RandomNumber"),
        },
      ],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(requestData))
      cy.Failure(body)
      expect(body.error.errorDetails).has.property("line");
      expect(body.error.errorDetails).has.property("line_id");
    });
  });

  it(`Test case when variants_id doesn't exist`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id[0],
          variants: [{ id: Cypress.env("RandomNumber") }],
        },
      ],
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(requestData))
      cy.Failure(body)
      expect(body.error.errorDetails).has.property("variants_id");
    });
  });

  it(`Test case when required field left blank`, () => {
    let requestData = {
      intrans_wh_id:"",
      shipment_num: "",
      shipment_date: "",
      etd: "",
      eta: "",
      custom_in: "",
      custom_out: "",
      air_or_sea: "",
      bol_num: "",
      carton_count: "",
      container_num: "",
      status: "",
      lines: [
        {
          line: "",
          import_po_line_id: "",
          status: "",
          variants: [
            {
              csku_id: "",
              invoiced_cost: "",
              intrans_qty: "",
              status: ""
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(requestData))
      cy.log(JSON.stringify(body))
      cy.Failure(body)
      expect(body.error.errorDetails).has.property("intrans_wh_id");
      expect(body.error.errorDetails).has.property("shipment_num");
      expect(body.error.errorDetails).has.property("shipment_date");
      expect(body.error.errorDetails).has.property("etd");
      expect(body.error.errorDetails).has.property("eta");
      expect(body.error.errorDetails).has.property("custom_in");
      expect(body.error.errorDetails).has.property("custom_out",);
      expect(body.error.errorDetails).has.property("air_or_sea");
      expect(body.error.errorDetails).has.property("bol_num");
      expect(body.error.errorDetails).has.property("carton_count");
      expect(body.error.errorDetails).has.property("container_num");
      expect(body.error.errorDetails).has.property("status");
      expect(body.error.errorDetails).has.property("line");
      expect(body.error.errorDetails).has.property("import_po_line_id");
      expect(body.error.errorDetails).has.property("csku_id");
      expect(body.error.errorDetails).has.property("invoiced_cost");
      expect(body.error.errorDetails).has.property("intrans_qty");
    });
  });

  it(`line should be unique for lines`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id[0],
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          variants: [
            {
              id: varients_id[0],
              csku_id: Cypress.env("csku_id"),
            },
          ],
        },
        {
          id: lines_id[0],
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          variants: [
            {
              id: varients_id[0],
              csku_id: Cypress.env("csku_id")
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(requestData))
      cy.Failure(body)
      expect(body.error.errorDetails).has.property("line");
    });
  });

  it(`combination of import_po_line_id and csku_id should be unique`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id_2[0],
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          variants: [
            {
              id: varients_id_2[0],
              csku_id: Cypress.env("csku_id"),
            },
          ],
        },
        {
          id: lines_id_2[1],
          line: 2,
          import_po_line_id: Cypress.env("line_id"),
          variants: [
            {
              id: varients_id_2[2],
              csku_id: Cypress.env("csku_id"),
              invoiced_cost: Cypress.env("RandomNumber"),
              intrans_qty:Cypress.env("RandomNumber"),
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id_2}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body)
      expect(body.error.errorDetails).has.property(
        "import_po_line_id","{import_po_line_id} should be unique in lines");
    });
  });

  it(`import_po_line_id must be unique when adding new lines`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id_2[0],
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          variants: [
            {
              id: varients_id_2[0],
              csku_id: Cypress.env("csku_id"),
            },
          ],
        },
        {
          line: 2,
          import_po_line_id: Cypress.env("line_id"),
          variants: [
            {
              csku_id: Cypress.env("csku_id"),
              invoiced_cost: Cypress.env("RandomNumber"),
              intrans_qty:Cypress.env("RandomNumber"),
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id_2}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.Failure(body)
      expect(body.error.errorDetails).has.property(
        "import_po_line_id","{import_po_line_id} should be unique in lines");
    });
  });

  it(`csku_id should be unique for a varients`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id[0],
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          variants: [
            {
              id: varients_id[0],
              csku_id: Cypress.env("csku_id")
            },
            {
              id: varients_id[1],
              csku_id: Cypress.env("csku_id")
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.log(JSON.stringify(requestData))
      cy.Failure(body)
      expect(body.error.errorDetails).has.property("csku_id");
    });
  });

  it(`csku_id must be unique when adding new variants`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id[0],
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          variants: [
            {
              id: varients_id[0],
              csku_id: Cypress.env("csku_id")
            },
            {
              csku_id: Cypress.env("csku_id"),
              invoiced_cost: Cypress.env("RandomNumber"),
              intrans_qty: Cypress.env("RandomNumber")
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.log(JSON.stringify(requestData))
      cy.log(JSON.stringify(body))
      cy.Failure(body)
      expect(body.error.errorDetails).has.property("csku_id");
    });
  });

  it(`lines_id should be associates with import_shipment_id`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id_1[0]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false,
    }).then(({ body }) => {
      cy.log(JSON.stringify(requestData))
      cy.Failure(body)
      expect(body.error.errorDetails).has.property("line");
      expect(body.error.errorDetails).has.property("line_id");
    });
  });

  it(`varients_id should be associates with lines_id and import_shipment_id`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id[0],
          line: 1,
          import_po_line_id: Cypress.env("line_id"),
          variants: [
            {
              id: varients_id_1[0],
              csku_id: Cypress.env("csku_id")
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.log(JSON.stringify(requestData))
      cy.Failure(body)
      expect(body.error.errorDetails).has.property("variants_id");
    });
  });

  it(`Test case for manage import_shipment incustom_qty when id does not exist`, () => {
  cy.request({
    method: routes.put, failOnStatusCode: false,
    url: `${routes.post_shipment}${Cypress.env("RandomNumber")}${"/custom"}`,
    headers: {
      Authorization: "Bearer " + Cypress.env("companyToken")
    },
  }).then(({ body }) => {
    cy.log(JSON.stringify(body))
   
  });
  });

  it(`Test case for manage import_shipment incustom_qty when alphabet are provided instead of id`, () => {
  cy.request({
    method: routes.put, failOnStatusCode: false,
    url: `${routes.post_shipment}${Cypress.env("Random")}${"/custom"}`,
    headers: {
      Authorization: "Bearer " + Cypress.env("companyToken")
    },
  }).then(({ body }) => {
   cy.log(JSON.stringify(body))
   
  });
  });

});

describe(`${store_msg.fail_get}${Cypress.spec["fileName"]}`, () => {
  it(`Failure test case for get import_shipment when id doesn't exist`, () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_shipment}${Cypress.env("RandomNumber")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.log(Cypress.env("RandomNumber"))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.id);
    });
  });

  it(`Failure test case for get import_shipment when id is provided as string`, () => {
    cy.request({
      method: routes.get,
      url: `${routes.post_shipment}${Cypress.env("Random")}`,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id",store_msg.chk_id);
    });
  });
});

describe(`${store_msg.fail}${"manage invoiced_qty"} - ${Cypress.spec["fileName"]}`, () => {
  
  it(`Test case for manage import_shipment invoiced_qty when warehouse_id doesn't exist`, () => {
    cy.log("custom_qty_1",custom_qty_1[0])

    let requestData = {
      warehouse_id: Cypress.env("RandomNumber"),
      "lines": [
        {
          "id": lines_id_1[0],
          "variants": [
            {
              "csku_id": Cypress.env("csku_id"),
              "invoiced_cost": Cypress.env("RandomNumber"),
              "shortage_qty": 0,
              "invoiced_qty": custom_qty_1[0]
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put, failOnStatusCode: false,
      url: `${routes.post_shipment}${shipment_id_1}${"/receive"}`,
      body: requestData,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("warehouse_id");
      cy.log(JSON.stringify(requestData))
    });
  });

  it(`Test case for manage import_shipment invoiced_qty when lines_id doesn't exist`, () => {
  
    let requestData = {
      warehouse_id: Cypress.env("warehouseId"),
      "lines": [
        {
          "id": Cypress.env("RandomNumber"),
          "variants": [
            {
              "csku_id": Cypress.env("csku_id"),
              "invoiced_cost": Cypress.env("RandomNumber"),
              "shortage_qty": 0,
              "invoiced_qty": custom_qty_1[0]
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put, failOnStatusCode: false,
      url: `${routes.post_shipment}${shipment_id_1}${"/receive"}`,
      body: requestData,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.log(JSON.stringify(requestData))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("line");
      expect(body.error.errorDetails).has.property("line_id");
    });
  });

  it(`Test case for manage import_shipment invoiced_qty when csku_id doesn't exist`, () => {
  cy.log("custom_qty_1",custom_qty_1[0])
    let requestData = {
      warehouse_id: Cypress.env("warehouseId"),
      "lines": [
        {
          "id": lines_id_1[0],
          "variants": [
            {
              "csku_id": Cypress.env("RandomNumber"),
              "invoiced_cost": Cypress.env("RandomNumber"),
              "shortage_qty": 0,
              "invoiced_qty": custom_qty_1[0]
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put, failOnStatusCode: false,
      url: `${routes.post_shipment}${shipment_id_1}${"/receive"}`,
      body: requestData,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.log(JSON.stringify(body))
      cy.log(JSON.stringify(requestData))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("csku_id");

    });
  });

  it(`manage import_shipment- warehouse_id, lines_id, csku_id, invoiced_cost, shortage_qty and 
      invoiced_qty must be number`, () => {
  
    let requestData = {
      warehouse_id: Cypress.env("RandomNum"),
      "lines": [
        {
          "id": Cypress.env("RandomNum"),
          "variants": [
            {
              "csku_id": Cypress.env("RandomNum"),
              "invoiced_cost": Cypress.env("RandomNum"),
              "shortage_qty": Cypress.env("RandomNum"),
              "invoiced_qty": Cypress.env("RandomNum")
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put, failOnStatusCode: false,
      url: `${routes.post_shipment}${shipment_id_1}${"/receive"}`,
      body: requestData,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.log(JSON.stringify(requestData))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("warehouse_id");
      expect(body.error.errorDetails).has.property("id");
      expect(body.error.errorDetails).has.property("csku_id");
      expect(body.error.errorDetails).has.property("invoiced_cost");
      expect(body.error.errorDetails).has.property("shortage_qty");
      expect(body.error.errorDetails).has.property("invoiced_qty");
    });
  });

  it(`manage import_shipment-invoiced_qty will be equal to eigther intrans_qty and incustom_qty`, () => {
  
    let requestData = {
      warehouse_id: Cypress.env("warehouseId"),
      "lines": [
        {
          "id": lines_id_1[0],
          "variants": [
            {
              "csku_id": Cypress.env("csku_id"),
              "invoiced_cost": Cypress.env("RandomNumber"),
              "shortage_qty": 0,
              "invoiced_qty": Cypress.env("RandomNumber")
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put, failOnStatusCode: false,
      url: `${routes.post_shipment}${shipment_id_1}${"/receive"}`,
      body: requestData,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.log(JSON.stringify(requestData))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("quantity");
    });
  });

  it(`manage import_shipment-when required field are left blank`, () => {
  
    let requestData = {
      warehouse_id: "",
      "lines": []
    };
    cy.request({
      method: routes.put, failOnStatusCode: false,
      url: `${routes.post_shipment}${shipment_id_1}${"/receive"}`,
      body: requestData,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.log(JSON.stringify(requestData))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("warehouse_id");
      expect(body.error.errorDetails).has.property("lines");
    });
  });

  it(`manage import_shipment-when lines has not any object`, () => {
  
    let requestData = {
      warehouse_id: Cypress.env("warehouseId"),
      "lines": [{}]
    };
    cy.request({
      method: routes.put, failOnStatusCode: false,
      url: `${routes.post_shipment}${shipment_id_1}${"/receive"}`,
      body: requestData,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.log(JSON.stringify(requestData))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id");
      expect(body.error.errorDetails).has.property("variants");
    });
  });

  it(`manage import_shipment-when variants array is left blank`, () => {
  
    let requestData = {
      warehouse_id: Cypress.env("warehouseId"),
      "lines": [
        {
          "id": lines_id_1[0],
          "variants": []
        }
      ]
    };
    cy.request({
      method: routes.put, failOnStatusCode: false,
      url: `${routes.post_shipment}${shipment_id_1}${"/receive"}`,
      body: requestData,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.log(JSON.stringify(requestData))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("variants");
    });
  });

  it(`manage import_shipment-when variants has not any object`, () => {
  
    let requestData = {
      warehouse_id: Cypress.env("warehouseId"),
      "lines": [
        {
          "id": lines_id_1[0],
          "variants": [{}]
        }
      ]
    };
    cy.request({
      method: routes.put, failOnStatusCode: false,
      url: `${routes.post_shipment}${shipment_id_1}${"/receive"}`,
      body: requestData,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.log(JSON.stringify(requestData))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("csku_id");
      expect(body.error.errorDetails).has.property("invoiced_cost");
      expect(body.error.errorDetails).has.property("shortage_qty");
      expect(body.error.errorDetails).has.property("invoiced_qty");
    });
  });

  it(`manage import_shipment-lines field is left blank`, () => {
  
    let requestData = {
      warehouse_id: Cypress.env("warehouseId"),
      "lines": [
        {
          "id":"",
          "variants": [
            {
              "csku_id": "",
              "invoiced_cost": "",
              "shortage_qty": "",
              "invoiced_qty": ""
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put, failOnStatusCode: false,
      url: `${routes.post_shipment}${shipment_id_1}${"/receive"}`,
      body: requestData,
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.log(JSON.stringify(requestData))
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("id");
      expect(body.error.errorDetails).has.property("csku_id");
      expect(body.error.errorDetails).has.property("invoiced_cost");
      expect(body.error.errorDetails).has.property("shortage_qty");
      expect(body.error.errorDetails).has.property("invoiced_qty");
    });
  });

  it(`manage import_shipment-when not provide any field`, () => {
  
    cy.request({
      method: routes.put, failOnStatusCode: false,
      url: `${routes.post_shipment}${shipment_id_1}${"/receive"}`,
      body: {},
     headers: { Authorization: Cypress.env("companyToken") }
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property("warehouse_id");
      expect(body.error.errorDetails).has.property("lines");
    });
  });

});

describe(`${store_msg.delete}${Cypress.spec["fileName"]}`, () => {
  it(`Test case for delete functionality for lines`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id_2[1],
          delete: 1
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id_2}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("shipment_num");
      expect(body.result.data).has.property("shipment_date");
      expect(body.result.data).has.property("warehouse_id");
      expect(body.result.data).has.property("etd");
      expect(body.result.data).has.property("eta");
      expect(body.result.data).has.property("custom_in");
      expect(body.result.data).has.property("custom_out");
      expect(body.result.data).has.property("custom_entry_num");
      expect(body.result.data).has.property("air_or_sea");
      expect(body.result.data).has.property("bol_num");
      expect(body.result.data).has.property("vessel");
      expect(body.result.data).has.property("carton_count");
      expect(body.result.data).has.property("container_num");
      expect(body.result.data).has.property("document_comment");
      expect(body.result.data).has.property("bank_release");
      expect(body.result.data).has.property("misc_remark");
      expect(body.result.data).has.property("purchase_inv_num");
      expect(body.result.data).has.property("brokers_inv_num");
      expect(body.result.data).has.property("brokers_inv_date");
      expect(body.result.data).has.property("brokers_freight_amt");
      expect(body.result.data).has.property("brokers_storage_amt");
      expect(body.result.data).has.property("freight_amt");
      expect(body.result.data).has.property("storage_amt");
      expect(body.result.data).has.property("duty_amt");
      expect(body.result.data).has.property("freight_fwd_charges");
      expect(body.result.data).has.property("invoiced_total_amt");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("warehouse_code");
      expect(body.result.data).has.property("warehouse_name");
      body.result.data.lines.forEach((element: any) => {
        expect(element).has.property("id");
        expect(element).has.property("import_po_line_id");
        expect(element).has.property("line");
        element.variants.forEach((element1: any) => {
          expect(element1).has.property("id");
          expect(element1).has.property("csku_id");
          expect(element1).has.property("invoiced_cost");
          expect(element1).has.property("intrans_qty");
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("invoiced_qty");
          expect(element1).has.property("status");
        });
      });    
    });
  });

  it(`Atleast one lines should be present in ${Cypress.spec["fileName"]}`, () => {
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
      url: `${routes.post_shipment}${shipment_id_2}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "line",`Atleast one {line} item should be present.`);  
    });
  });

  it(`Test case for delete functionality for variants`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id_1[0],

          variants: [
            {
              id: varients_id_1[1],
              delete: 1
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id_1}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
    }).then(({ body }) => {
      cy.Success(body);
      expect(body.result.data).has.property("id");
      expect(body.result.data).has.property("shipment_num");
      expect(body.result.data).has.property("shipment_date");
      expect(body.result.data).has.property("warehouse_id");
      expect(body.result.data).has.property("etd");
      expect(body.result.data).has.property("eta");
      expect(body.result.data).has.property("custom_in");
      expect(body.result.data).has.property("custom_out");
      expect(body.result.data).has.property("custom_entry_num");
      expect(body.result.data).has.property("air_or_sea");
      expect(body.result.data).has.property("bol_num");
      expect(body.result.data).has.property("vessel");
      expect(body.result.data).has.property("carton_count");
      expect(body.result.data).has.property("container_num");
      expect(body.result.data).has.property("document_comment");
      expect(body.result.data).has.property("bank_release");
      expect(body.result.data).has.property("misc_remark");
      expect(body.result.data).has.property("purchase_inv_num");
      expect(body.result.data).has.property("brokers_inv_num");
      expect(body.result.data).has.property("brokers_inv_date");
      expect(body.result.data).has.property("brokers_freight_amt");
      expect(body.result.data).has.property("brokers_storage_amt");
      expect(body.result.data).has.property("freight_amt");
      expect(body.result.data).has.property("storage_amt");
      expect(body.result.data).has.property("duty_amt");
      expect(body.result.data).has.property("freight_fwd_charges");
      expect(body.result.data).has.property("invoiced_total_amt");
      expect(body.result.data).has.property("status");
      expect(body.result.data).has.property("warehouse_code");
      expect(body.result.data).has.property("warehouse_name");
      body.result.data.lines.forEach((element: any) => {
        expect(element).has.property("id");
        expect(element).has.property("import_po_line_id");
        expect(element).has.property("line");
        element.variants.forEach((element1: any) => {
          expect(element1).has.property("id");
          expect(element1).has.property("csku_id");
          expect(element1).has.property("invoiced_cost");
          expect(element1).has.property("intrans_qty");
          expect(element1).has.property("incustom_qty");
          expect(element1).has.property("invoiced_qty");
          expect(element1).has.property("status");
        });
      });
    });
  });

  it(`Atleast one variants should be present in lines`, () => {
    let requestData = {
      lines: [
        {
          id: lines_id_1[0],

          variants: [
            {
              id: varients_id_1[0],
              delete: 1
            }
          ]
        }
      ]
    };
    cy.request({
      method: routes.put,
      url: `${routes.post_shipment}${shipment_id_1}`,
      body: requestData,
   headers: { Authorization: Cypress.env("companyToken") },
      failOnStatusCode: false
    }).then(({ body }) => {
      cy.Failure(body);
      expect(body.error.errorDetails).has.property(
        "variant",`Atleast one {Variant} should be present with each line.`);
    });
  });
});
