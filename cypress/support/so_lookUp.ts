export function so_lookUp() {
    let useLookUp ={
        "statusCode": 200,
        "success": true,
        "error": null,
        "result": {
          "message": "Module fields fetched successfully",
          "data": {
            "fields": [
              "id",
              "order_no",
              "company_id",
              "division_id",
              "factor_id",
              "department_id",
              "ship_via_id",
              "term_id",
              "customer_id",
              "order_type",
              "order_date",
              "start_date",
              "cancel_date",
              "order_hold",
              "credit_hold",
              "bulk_order_no",
              "purchase_order",
              "master_order",
              "internal_order",
              "store_id",
              "dc_id",
              "ship_to_dc",
              "total_amount",
              "freight_amount",
              "total_discount",
              "grand_total",
              "total_quantity",
              "created_date",
              "updated_date",
              "created_by",
              "updated_by",
              "status",
              "special_instruction"
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
              "division_id": {
                "object": "division",
                "fields": [
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
                  "updated_by"
                ]
              },
              "factor_id": {
                "object": "factor",
                "fields": [
                  "id",
                  "name",
                  "code",
                  "account_number",
                  "company_id",
                  "status",
                  "created_date",
                  "updated_date",
                  "created_by",
                  "updated_by"
                ]
              },
              "department_id": {
                "object": "Customer_department",
                "fields": [
                  "id",
                  "customer_id",
                  "code",
                  "name",
                  "description",
                  "created_date",
                  "updated_date",
                  "created_by",
                  "updated_by",
                  "status"
                ]
              },
              "ship_via_id": {
                "object": "ship_via",
                "fields": [
                  "id",
                  "code",
                  "name",
                  "description",
                  "scac_code",
                  "status",
                  "created_date",
                  "updated_date",
                  "created_by",
                  "updated_by"
                ]
              },
              "term_id": {
                "object": "terms",
                "fields": [
                  "id",
                  "code",
                  "name",
                  "is_prepaid",
                  "description",
                  "term_netdays",
                  "discount",
                  "months",
                  "cutoffday",
                  "status",
                  "created_date",
                  "updated_date",
                  "created_by",
                  "updated_by"
                ]
              },
              "customer_id": {
                "object": "customers",
                "fields": [
                  "id",
                  "code",
                  "name",
                  "retail_type_id",
                  "master_code",
                  "status",
                  "created_date",
                  "updated_date",
                  "created_by",
                  "updated_by"
                ]
              }
            },
            "child": {
              "sales_order_line": {
                "fields": [
                  "id",
                  "sales_order_id",
                  "line",
                  "item_id",
                  "color_id",
                  "prepack_id",
                  "status",
                  "discount_rate"
                ],
                "foreignKey": {
                  "item_id": {
                    "object": "item",
                    "fields": [
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
                      "updated_by"
                    ]
                  },
                  "color_id": {
                    "object": "color",
                    "fields": [
                      "id",
                      "name",
                      "code",
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
      }
      return useLookUp
}
