sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/ui/core/Fragment"
], (ManagedObject,Fragment) => {
    "use strict";

    return ManagedObject.extend("sap.ui5.walkthrough.controller.HelloDialog", {
        constructor: function (oView) {
            this._oView = oView;
        },
        exit: function () {
            delete this._oView;
        },
        open: function () {
            var oView = this._oView;

            // create dialog lazily
            if (!oView.byId("helloDialog")) {
                var oFragmentController = {
                    onCloseDialog: function () {
                        // note: We don't need to chain to the pDialog promise, since this event handler
                        // is only called from within the loaded dialog itself.
                        this._oDialog.close();
                    }
                }
                // load asynchronous XML fragment
                Fragment.load({
                    id: oView.getId(),
                    name: "sap.ui5.walkthrough.view.HelloDialog",
                    controller: oFragmentController
                }).then(function (oDialog) {
                    // connect dialog to the root view of this component (models, lifecycle)
                    oFragmentController._oDialog = oDialog;
                    oView.addDependent(oDialog);
                    oDialog.open();
                })

            } else {
                oView.byId("helloDialog").open();
            }
        }
    });
});