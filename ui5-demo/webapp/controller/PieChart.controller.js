sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ricky.test.ui5.demo1.controller.PieChart", {
		onAfterRendering: function () {
            var oResource = this.getView().getBindingContext("testModel");
        },
		onInit: function () {

			// get the path to the JSON file
			var sDataPath = jQuery.sap.getModulePath("ricky.test.ui5.demo1", "/data/pie_chart_data.json");
			console.log("sDataPath:" + sDataPath)
			var sampleDatajson = new sap.ui.model.json.JSONModel(sDataPath); //url+path which you will see in the network tab.
			this.getView().setModel(sampleDatajson, "testModel")
			var oVizFrame = this.getView().byId("idPieChart");
			oVizFrame.setVizProperties({
				plotArea: {
					dataLabel: {
						//type: "value",
						visible: true
						// formatString: {
						// 	"Memory Size": ["0.0", "0.0%"]
						// }
					}
				},

				series: {
					name: "Series",
					defaultSelected: 0,
					enabled: false,
					values: [{
						name: "1 Series"
					}, {
						name: '2 Series'
					}]
				},
				axisTitle: {
					name: "Axis Title",
					defaultState: false,
					enabled: false
				},
				legend: {
					title: {
						visible: false
					}
				},
				title: {
					visible: false
				}
			});
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					name: "Memory",
					value: "{Type}"
				}],
				measures: [{
					name: "Memory Size",
					value: "{Value}"
				}],
				data: {
					path: "/items"
				}
			});
			oVizFrame.setDataset(oDataset);

			oVizFrame.setModel(sampleDatajson);

			var oFeedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
					"uid": "size",
					"type": "Measure",
					"values": ["Memory Size"]
				}),
				oFeedValueAxis2 = new sap.viz.ui5.controls.common.feeds.FeedItem({
					"uid": "color",
					"type": "Dimension",
					"values": ["Memory"]
				});

			oVizFrame.addFeed(oFeedValueAxis);
			oVizFrame.addFeed(oFeedValueAxis2);

		}
	});
});