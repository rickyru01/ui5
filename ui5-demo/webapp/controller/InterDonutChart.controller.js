sap.ui.define(['sap/m/MessageToast', 'sap/ui/core/mvc/Controller'],
    function (MessageToast, Controller) {
        "use strict";

        var PageController = Controller.extend("ricky.test.ui5.demo1.controller.InterDonutChart", {

            onInit: function () {
                var mainSeg = this.getView().byId("mainSeg").setTooltip(undefined);
                var tempSeg = this.getView().byId("tempSeg").setTooltip("");
                var remainingSeg = this.getView().byId("remainingSeg").setTooltip("");
                var chart = this.getView().byId("theChart").setTooltip("");
            },

            /**
             * Creates a message for a press event on the chart
             *
             * @private
             */
            press: function (oEvent) {
                MessageToast.show("The Interactive Donut Chart is pressed.");
            },

            /**
             * Creates a message for a selection change event on the chart
             *
             * @private
             */
            onSelectionChanged: function (oEvent) {
                var oSegment = oEvent.getParameter("segment");
                MessageToast.show("The selection changed: " + oSegment.getLabel() + " " + ((oSegment.getSelected()) ? "selected" : "not selected"));
            }
        });

        return PageController;

    });