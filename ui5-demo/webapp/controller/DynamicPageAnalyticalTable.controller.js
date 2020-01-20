sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/core/format/DateFormat"
], function (jQuery, Controller, Filter, JSONModel, MessageToast, DateFormat) {
	"use strict";

	return Controller.extend("ricky.test.ui5.demo1.controller.DynamicPageAnalyticalTable", {
		onInit: function () {
			var oJSONModel = this.initSampleDataModel();
			this.getView().setModel(oJSONModel);
			var selectedKey = {
				variantKey: "ALL"
			};
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(selectedKey);

			this.oView.setModel(oModel, "variantModel");

		},
		initSampleDataModel: function () {
			var oModel = new JSONModel();

			var oDateFormat = DateFormat.getDateInstance({
				source: {
					pattern: "timestamp"
				},
				pattern: "dd/MM/yyyy"
			});

			jQuery.ajax(jQuery.sap.getModulePath("ricky.test.ui5.demo1.data", "/products.json"), {
				dataType: "json",
				success: function (oData) {
					var aTemp1 = [];
					var aTemp2 = [];
					var aSuppliersData = [];
					var aCategoryData = [];
					for (var i = 0; i < oData.ProductCollection.length; i++) {
						var oProduct = oData.ProductCollection[i];
						if (oProduct.SupplierName && jQuery.inArray(oProduct.SupplierName, aTemp1) < 0) {
							aTemp1.push(oProduct.SupplierName);
							aSuppliersData.push({
								Name: oProduct.SupplierName
							});
						}
						if (oProduct.Category && jQuery.inArray(oProduct.Category, aTemp2) < 0) {
							aTemp2.push(oProduct.Category);
							aCategoryData.push({
								Name: oProduct.Category
							});
						}
						oProduct.DeliveryDate = (new Date()).getTime() - (i % 10 * 4 * 24 * 60 * 60 * 1000);
						oProduct.DeliveryDateStr = oDateFormat.format(new Date(oProduct.DeliveryDate));
						oProduct.Heavy = oProduct.WeightMeasure > 1000 ? "true" : "false";
						oProduct.Available = oProduct.Status == "Available" ? true : false;
					}

					oData.Suppliers = aSuppliersData;
					oData.Categories = aCategoryData;
					oData.headerExpanded = true;
					oModel.setData(oData);
				},
				error: function () {
					jQuery.sap.log.error("failed to load json");
				}
			});

			return oModel;
		},
		onVariantSetsShowPress: function () {
			this.initVariantList();
			if (!this.oVariantPopOver) {
				this.oVariantPopOver = new sap.m.ResponsivePopover({
					showHeader: false,
					contentWidth: '250px',
					placement: sap.m.PlacementType.Bottom,
					content: [this.oVariantList]
				});
			}

			var trigger = this.getView().byId('showVariantSetsBtn');
			this.oVariantPopOver.openBy(trigger);
		},

		initVariantList: function () {
			if (!this.oVariantList) {
				this.oVariantList = sap.ui.xmlfragment('ricky.test.ui5.demo1.view.VariantList', this);
				var oView = this.getView();
				oView.addDependent(this.oVariantList);
			}
			var sDataPath = jQuery.sap.getModulePath("ricky.test.ui5.demo1", "/data/areas.json");
			console.log("sDataPath:" + sDataPath)
			var oAreaMode = new sap.ui.model.json.JSONModel(sDataPath); //url+path which you will see in the network tab.
			this.oVariantList.setModel(oAreaMode, 'cards');
			var oVariantModel = this.oView.getModel('variantModel');
			var oData = oVariantModel.getData();
			var sArea = oData.variantKey;
			//set default selected key
			this.oVariantList.setSelectedKey(sArea);
		},
		onVariantChanged: function (oEvent) {
			var selectedText = oEvent.getSource().getSelectedItem().getText();
			this.oVariantPopOver.close();
			this.oView.byId('idVariantTitle').setText(selectedText);
			var oVariantModel = this.oView.getModel('variantModel');
			var oData = oVariantModel.getData();
			oData.variantKey = oEvent.getSource().getSelectedKey();
			oVariantModel.refresh(true);
			//this.onCreateArea();
		},
		formatAvailableToObjectState: function (bAvailable) {
			return bAvailable ? "Success" : "Error";
		},

		formatAvailableToIcon: function (bAvailable) {
			return bAvailable ? "sap-icon://accept" : "sap-icon://decline";
		},

		handleDetailsPress: function (oEvent) {
			MessageToast.show("Details for product with id " + this.getView().getModel().getProperty("ProductId", oEvent.getSource().getBindingContext()));
		}

	});
});