sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller"
], function(MessageToast, Controller) {
	"use strict";

	return Controller.extend("ricky.test.ui5.demo1.controller.View1", {
		onPress: function (evt) {
			MessageToast.show(evt.getSource().getId() + " Pressed");
		}
	});
});