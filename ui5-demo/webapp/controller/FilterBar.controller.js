sap.ui.define([
	'ricky/test/ui5/demo1/controller/SearchField',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/Label',
	'sap/ui/model/Filter'
], function (SearchField, Controller, JSONModel, Label, Filter) {
	"use strict";

	return Controller.extend("ricky.test.ui5.demo1.controller.DynamicPageListReport", {
		createSearchField: function () {
			var oFilterBar = this.getView().byId('filterbar');

			var oSearchField = oFilterBar.getBasicSearch();
			var oBasicSearch = null;

			if (!oSearchField) {
				oBasicSearch = new SearchField('idSearchField', {
					liveChange: [this.onFilter, this],
					search: [this.onFilter, this]
				});
			} else {
				oSearchField = null;
			}

			oFilterBar.setBasicSearch(oBasicSearch);
		},

		onFilter: function (oEvent) {
			var sQuery = oEvent.getSource().getValue();
			var oController = this;
			this.openBusyDialog();		
			setTimeout(this.closeBusyDialog.bind(this), 3000);
			while(1){
				console.log("test");
			}
			oController.applyClientFiltering.call(oController, sQuery);
			//setTimeout(this.applyClientFiltering.bind(this, oEvent), 4000);
			// setTimeout(function(){
			// 	oController.applyClientFiltering.call(oController, sQuery);
			// }, 9000)
		},

		openBusyDialog: function () {
			if (!this.busyDialog) {
				this.busyDialog = new sap.m.BusyDialog({
					title: "loading data..."
				});
			}
			this.busyDialog.open();
		},

		closeBusyDialog: function () {
			if (this.busyDialog) {
				this.busyDialog.close();
			}
		},

		// sleep time expects milliseconds
		// sleep: function (time) {
		// 	return new Promise((resolve) => setTimeout(resolve, time));
		// },

		applyClientFiltering: function (sQuery) {
			// add filter for search
			var aFilters = [];
			//var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("Name", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}

			// update list binding
			var oList = this.byId("idProductsTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilters, "Application");
		},

		onInit: function () {
			this.oModel = new JSONModel();
			this.oModel.loadData(sap.ui.require.toUrl("ricky/test/ui5/demo1/data/model.json"), null, false);
			this.getView().setModel(this.oModel);

			this.aKeys = [
				"Name", "Category", "SupplierName"
			];
			this.oSelectName = this.getSelect("slName");
			this.oSelectCategory = this.getSelect("slCategory");
			this.oSelectSupplierName = this.getSelect("slSupplierName");
			this.oModel.setProperty("/Filter/text", "Filtered by None");
			this.addSnappedLabel();

			var oFB = this.getView().byId("filterbar");
			if (oFB) {
				oFB.variantsInitialized();
			}


			this.createSearchField();
		},

		onExit: function () {
			this.aKeys = [];
			this.aFilters = [];
			this.oModel = null;
		},
		onToggleHeader: function () {
			this.getPage().setHeaderExpanded(!this.getPage().getHeaderExpanded());
		},
		onToggleFooter: function () {
			this.getPage().setShowFooter(!this.getPage().getShowFooter());
		},
		onSelectChange: function () {
			var aCurrentFilterValues = [];

			aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectName));
			aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectCategory));
			aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectSupplierName));

			this.filterTable(aCurrentFilterValues);
		},

		filterTable: function (aCurrentFilterValues) {
			this.getTableItems().filter(this.getFilters(aCurrentFilterValues));
			this.updateFilterCriterias(this.getFilterCriteria(aCurrentFilterValues));
		},

		updateFilterCriterias: function (aFilterCriterias) {
			this.removeSnappedLabel(); /* because in case of label with an empty text, */
			this.addSnappedLabel(); /* a space for the snapped content will be allocated and can lead to title misalignment */
			this.oModel.setProperty("/Filter/text", this.getFormattedSummaryText(aFilterCriterias));
		},

		addSnappedLabel: function () {
			var oSnappedLabel = this.getSnappedLabel();
			oSnappedLabel.attachBrowserEvent("click", this.onToggleHeader, this);
			this.getPageTitle().addSnappedContent(oSnappedLabel);
		},

		removeSnappedLabel: function () {
			this.getPageTitle().destroySnappedContent();
		},

		getFilters: function (aCurrentFilterValues) {
			this.aFilters = [];

			this.aFilters = this.aKeys.map(function (sCriteria, i) {
				return new Filter(sCriteria, sap.ui.model.FilterOperator.Contains, aCurrentFilterValues[i]);
			});

			return this.aFilters;
		},
		getFilterCriteria: function (aCurrentFilterValues) {
			return this.aKeys.filter(function (el, i) {
				if (aCurrentFilterValues[i] !== "") {
					return el;
				}
			});
		},
		getFormattedSummaryText: function (aFilterCriterias) {
			if (aFilterCriterias.length > 0) {
				return "Filtered By (" + aFilterCriterias.length + "): " + aFilterCriterias.join(", ");
			} else {
				return "Filtered by None";
			}
		},

		getTable: function () {
			return this.getView().byId("idProductsTable");
		},
		getTableItems: function () {
			return this.getTable().getBinding("items");
		},
		getSelect: function (sId) {
			return this.getView().byId(sId);
		},
		getSelectedItemText: function (oSelect) {
			return oSelect.getSelectedItem() ? oSelect.getSelectedItem().getKey() : "";
		},
		getPage: function () {
			return this.getView().byId("dynamicPageId");
		},
		getPageTitle: function () {
			return this.getPage().getTitle();
		},
		getSnappedLabel: function () {
			return new Label({
				text: "{/Filter/text}"
			});
		}
	});
});