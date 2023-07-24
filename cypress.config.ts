import * as dotenv from "dotenv";
dotenv.config();
import { defineConfig } from "cypress";

export default defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "BDS API Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  screenshotOnRunFailure: false,
  video: false,
  e2e: {
    setupNodeEvents(on, config: any) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    baseUrl: process.env.BASE_URL,
    env: {
      snapshotOnly: false,
      apiUrl: process.env.BASE_URL,
      admin_username: process.env.ADMIN_USERNAME,
      admin_Password: process.env.ADMIN_PASSWORD,
      username: process.env.USER_USERNAME,
      Password: process.env.USER_PASSWORD,
      org_id: process.env.ORG_ID,
      layout_copm: process.env.LAYOUT_COMPANY,
      layout_name: process.env.LAYOUT_NAME,
      layout_type: process.env.LAYOUT_TYPE,
      role_id :+process.env.ROLE_ID,

      /****************************tfa verify*****************/
      token: "936218",
      /******************organization create/update credentials***************/
      org_name: process.env.ORG_NAME,
      c_host: process.env.C_HOST,
      c_username: process.env.C_USERNAME,
      c_password: process.env.C_PASSWORD,
      c_database: process.env.C_DATABASE,

      /******************Module create/update Inputs***************/
      name: "body",
      display_name: "Body",
      access: {
        show_menu: 1,
        read: 1,
        update: 1,
        create: 1,
      },
      order: 1,
      menu_icon: "master",
      link: "/",
      parent_menu_name: "Master",
      parent_menu_icon: "master",
      status: 1,

      /******************BusinessFlow and Sequence create Inputs***************/
      seqOrg_id: "6374c4de6917ecf51c3ab7f4",
      seqCompany_id: "1",
    },
    specPattern: "cypress/BDS",
  },
});
