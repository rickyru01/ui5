/************************************************************************************************
 * Copyright (c) 2016 - 2019 SAP SE or an SAP affiliate company. All rights reserved.
 ************************************************************************************************/

/* Custom SearchField to delay 400ms(default) before fire liveSearch event */
sap.ui.define([
    'sap/m/SearchField',
    'sap/m/SearchFieldRenderer'
], function (SearchField, SearchFieldRenderer) {
    'use strict';

    var oSearchField = SearchField.extend('ricky.test.ui5.demo1.controller.SearchField', {
        metadata: {
            properties: {
                delay: { type: 'int', defaultValue: 400 }
            }
        },

        renderer: function (oRM, oControl) {
            SearchFieldRenderer.render(oRM, oControl);
        }
    });

    oSearchField.prototype.onInput = function (oEvent) {
        var value = this.getInputElement().value;

        // IE fires an input event when an empty input with a placeholder is focused or loses focus.// TODO remove after 1.62 version
        // Check if the value has changed, before firing the liveChange event.
        if (value !== this.getValue()) {
            this.setValue(value);

            if (this._customDelay) {
                clearTimeout(this._customDelay);
            }

            this._customDelay = setTimeout(function () {
                this.fireLiveChange({ newValue: value });
                this._customDelay = null;
            }.bind(this), this.getDelay());

            if (this.getEnableSuggestions()) {
                if (this._iSuggestDelay) {
                    clearTimeout(this._iSuggestDelay);
                }

                this._iSuggestDelay = setTimeout(function () {
                    this.fireSuggest({ suggestValue: value });
                    updateSuggestions(this);
                    this._iSuggestDelay = null;
                }.bind(this), 400);
            }
        }
    };

    SearchField.prototype.getDelay = function () {
        return this.getProperty('delay');
    };

    return oSearchField;
}, /* bExport= */ true);
