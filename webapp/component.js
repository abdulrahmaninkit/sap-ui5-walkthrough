// sap.ui.define([
//    "sap/ui/core/UIComponent",
//    "sap/ui/model/json/JSONModel",
//    "sap/ui/model/resource/ResourceModel",
//    "./controller/HelloDialog",
// ], (UIComponent, JSONModel, ResourceModel, HelloDialog) => {
//    "use strict";

//    return UIComponent.extend("sap.ui5.walkthrough.Component", {
//       metadata: {
//          interfaces: ["sap.ui.core.IAsyncContentCreation"],
//          manifest: "json"
//       },

//       init() {
//          // call the init function of the parent
//          UIComponent.prototype.init.apply(this, arguments);
//          // set data model
//          const oData = {
//             recipient: {
//                name: "AR"
//             }
//          };
//          const oModel = new JSONModel(oData);
//          this.setModel(oModel);

//          // set i18n model
//          const i18nModel = new ResourceModel({
//             bundleName: "sap.ui5.walkthrough.i18n.i18n"
//          });
//          this.setModel(i18nModel, "i18n");

//          // set dialog 
//          this._helloDialog = new HelloDialog(this.getRootControl());
//       },
//       exit: function () {
//          this._helloDialog.destroy();
//          delete this._helloDialog;
//       },
//       openHelloDialog: function () {
//          this._helloDialog.open();
//       },
//    });
// });

sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/resource/ResourceModel",
   "./controller/HelloDialog"
], (UIComponent, JSONModel, ResourceModel, HelloDialog) => {
   "use strict";

   return UIComponent.extend("sap.ui5.walkthrough.Component", {
      metadata: {
         interfaces: ["sap.ui.core.IAsyncContentCreation"],
         manifest: "json"
      },

      init() {
         UIComponent.prototype.init.apply(this, arguments);

         // set data model
         const oData = {
            recipient: {
               name: "AR"
            }
         };
         const oModel = new JSONModel(oData);
         this.setModel(oModel);

         // set i18n model
         const i18nModel = new ResourceModel({
            bundleName: "sap.ui5.walkthrough.i18n.i18n"
         });
         this.setModel(i18nModel, "i18n");
      },

      createContent() {
         const oView = sap.ui.view({
            id: "app",
            viewName: "sap.ui5.walkthrough.view.App",
            type: "XML",
            async: true
         });

         // Wait until view is loaded, then create the HelloDialog
         oView.loaded().then(() => {
            this._helloDialog = new HelloDialog(oView);
         });

         return oView;
      },

      exit() {
         if (this._helloDialog) {
            this._helloDialog.destroy();
            delete this._helloDialog;
         }
      },

      openHelloDialog() {
         if (this._helloDialog) {
            this._helloDialog.open();
         } else {
            console.warn("HelloDialog not yet initialized.");
         }
      }
   });
});
