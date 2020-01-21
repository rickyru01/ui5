sap.ui.define(['sap/m/MessageToast', 'sap/ui/core/mvc/Controller'],
    function (MessageToast, Controller) {
        "use strict";

        var PageController = Controller.extend("ricky.test.ui5.demo1.controller.MicroChartsInTable", {

            press: function (oEvent) {
                MessageToast.show("The " + oEvent.getSource().data("name") + " micro chart is pressed.");
            }

        });

        return PageController;

    });