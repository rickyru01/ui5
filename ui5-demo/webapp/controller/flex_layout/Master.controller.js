sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/ui/model/Sorter',
    'sap/m/MessageBox',
    'sap/f/library'
], function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox, fioriLibrary) {
    "use strict";

    return Controller.extend("ricky.test.ui5.demo1.controller.flex_layout.Master", {
        onInit: function () {
            this.oView = this.getView();
            this._bDescendingSort = false;
            this.oProductsTable = this.oView.byId("productsTable");
            this.loadData();
            this.oRouter = this.getOwnerComponent().getRouter();
        },

        loadData: function () {

            // var oProductsModel;

            // UIComponent.prototype.init.apply(this, arguments);

            // // set products demo model on this sample
            // oProductsModel = new JSONModel(sap.ui.require.toUrl('sap/ui/demo/mock') + '/products.json');
            // oProductsModel.setSizeLimit(1000);
            // this.setModel(oProductsModel, 'products');

            var sDataPath = jQuery.sap.getModulePath("ricky.test.ui5.demo1", "/data/products.json");
            var oProductsModel = new sap.ui.model.json.JSONModel(sDataPath);
            var com = sap.ui.core.Component.getOwnerComponentFor(this.getView());
            com.setModel(oProductsModel, 'products');
            //this.oView.setModel(oProductsModel, 'products');

        },

        onSearch: function (oEvent) {
            var oTableSearchState = [],
                sQuery = oEvent.getParameter("query");

            if (sQuery && sQuery.length > 0) {
                oTableSearchState = [new Filter("Name", FilterOperator.Contains, sQuery)];
            }

            this.oProductsTable.getBinding("items").filter(oTableSearchState, "Application");
        },

        onAdd: function () {
            MessageBox.information("This functionality is not ready yet.", {
                title: "Aw, Snap!"
            });
        },

        onSort: function () {
            this._bDescendingSort = !this._bDescendingSort;
            var oBinding = this.oProductsTable.getBinding("items"),
                oSorter = new Sorter("Name", this._bDescendingSort);

            oBinding.sort(oSorter);
        },

        onListItemPress: function (oEvent) {
            // var oFCL = this.oView.getParent().getParent();//the view refer to master view.
            // oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);
            var productPath = oEvent.getSource().getBindingContext("products").getPath(),
                product = productPath.split("/").slice(-1).pop();

            this.oRouter.navTo("detail", {
                layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
                product: product
            });
        }
    });
});