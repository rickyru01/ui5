sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ricky.test.ui5.demo1.controller.DemoStackColumnChart", {
		
		onInit: function () {
		//https://inui.io/sap-ui5-set-local-json-file-to-model/
			// var data= {
			// 	items: [{
			// 			Year: 2012,
			// 			Milk: 20,
			// 			Sugar: 5,
			// 			Tea: 5
			// 		},
			// 		{
			// 			Year: 2013,
			// 			Milk: 30,
			// 			Sugar: 10,
			// 			Tea: 10
			// 		},
			// 		{
			// 			Year: 2014,
			// 			Milk: 35,
			// 			Sugar: 15,
			// 			Tea: 15
			// 		},
			// 		{
			// 			Year: 2015,
			// 			Milk: 60,
			// 			Sugar: 20,
			// 			Tea: 20
			// 		},
			// 		{
			// 			Year: 2016,
			// 			Milk: 70,
			// 			Sugar: 40,
			// 			Tea: 40
			// 		}
			// 	]
			// };
			// var sampleDatajson = new sap.ui.model.json.JSONModel();
			// sampleDatajson.setData(data);

		
			// get the path to the JSON file
			var sDataPath = jQuery.sap.getModulePath("ricky.test.ui5.demo1", "/data/column_chart_data.json");
			console.log("sDataPath:"+sDataPath)
			var sampleDatajson = new sap.ui.model.json.JSONModel(sDataPath);  //url+path which you will see in the network tab.

			//global model
			//console.log(this.getViewgetModel("my_global_json_model"));
			//this.getOwnComponent().getModel("my_global_json_model")

			var oVizFrame = this.getView().byId("idStackedChart");
			oVizFrame.setVizProperties({
				series: [
					{ dataContext: {"measureNames": "Milk"}, "stack": "a"},
					{ dataContext: {"measureNames":  "Sugar"}, "stack": "b"},
					{ dataContext: {"measureNames":  "Tea"}, "stack": "c"}
				],
				// interaction:{decorations:[{name: "abc", fn:"function test(){alert(1)}"}]},
				plotArea: {
					colorPalette: d3.scale.category20().range(),
					dataLabel: {
						visible: true,
                        showTotal: true
					}
				},
				tooltip: {
					visible: true
				},
				title: {
					text: "Stacked Bar Chart"
				}
			});
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					name: "Year",
					value: "{Year}"
				}],

				measures: [{
					name: "Milk",
					value: "{Milk}"
				}, {
					name: "Sugar",
					value: "{Sugar}"
				}, {
					name: "Tea",
					value: "{Tea}"
				}],

				data: {
					path: "/items"
				}
			});
			oVizFrame.setDataset(oDataset);

			oVizFrame.setModel(sampleDatajson);

			var oFeedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
					"uid": "valueAxis",
					"type": "Measure",
					"values": ["Milk"]
				}),
				oFeedValueAxis1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
					"uid": "valueAxis",
					"type": "Measure",
					"values": ["Sugar"]
				}),
				oFeedValueAxis2 = new sap.viz.ui5.controls.common.feeds.FeedItem({
					"uid": "valueAxis",
					"type": "Measure",
					"values": ["Tea"]
				}),

				oFeedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
					"uid": "categoryAxis",
					"type": "Dimension",
					"values": ["Year"]
				});

			oVizFrame.addFeed(oFeedValueAxis);
			oVizFrame.addFeed(oFeedValueAxis1);
			oVizFrame.addFeed(oFeedValueAxis2);
			oVizFrame.addFeed(oFeedCategoryAxis);

		}
	});
});