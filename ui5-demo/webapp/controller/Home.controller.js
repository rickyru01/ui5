sap.ui.define([
    "ricky/test/ui5/demo1/controller/BaseController"
], function (Controller) {
    "use strict";

    return Controller.extend("ricky.test.ui5.demo1.controller.Home", {
        onDisplayNotFound: function () {
            //display the "notFound" target without changing the hash
            //this.getRouter().getTargets().display("notFound");


            this.getRouter().getTargets().display("notFound", {
                fromTarget: "home"
            });
        },

        onFlexLayout: function () {
            this.getRouter().navTo("flexLayout");
        },

        onStatusIndicator: function () {
            this.getRouter().navTo("statusIndicator");
        },

        onDynamicPage:function(){
            this.getRouter().navTo("dynamicPage");
        },

        onStepInput:function(){
            this.getRouter().navTo("stepInput");
        },
        onMicroChartsInTable:function(){
            this.getRouter().navTo("microChartsInTable");
        }
    });

});