sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("autodesk.Payload.controller.View1", {
		onInit: function () {

			var model = new sap.ui.model.json.JSONModel({
				items: []
			});
			this.getView().setModel(model);
			var dummydata = [{
				Quantity: "TEST1",
				PartSubId: "TEST2",
				SettleDateStart: "",
				SettleDateEnd: "",
				OfferingId: "TEST3",
				LicUsage: "TEST4",
				Connectivity: "TEST5",
				ConnInterval: "TEST6",
				SubsLevel: "TEST7",
				BillBehavior: "TEST8",
				ConTerm: "TEST9",
				BillType: "TEST10",
				BillFreq: "TEST10",
				ExtPrice: "TEST10",
				VolDiscount: "TEST10",
				ManDiscount: "TEST10",
				DealDiscount: "TEST10",
				EUFirstname: "",
				EULastname: "",
				EUEmail: "",
				EUCompId: "",
				EUAddL1: "",
				EUAddL2: "",
				EUCity: "",
				EUState: "",
				EUCountry: "",
				EUPostCode: "",
				EUPhone: "",
				EUAccCsn: "",
				AGFirstname: "",
				AGLastname: "",
				AGEmail: "",
				AGCompId: "",
				AGAddL1: "",
				AGAddL2: "",
				AGCity: "",
				AGState: "",
				AGCountry: "",
				AGPostCode: "",
				AGPhone: "",
				AGAccCsn: ""
			}];

			this.getView().getModel().setData({
				items: dummydata
			});

		},

		onSubmit: function () {
			var aSelectedRows = this.getView().byId("lineitemtable").getSelectedIndices();
			var aLineItems = [];
			for (var i = 0; i < aSelectedRows.length; i++) {
				var rowData = this.getView().getModel().getData().items[i];
				var subscriptionInfo = {},
					offering = {},
					offer = {},
					price = {},
					oLineItem = {};

				// Filling subscriptionInfo Data
				subscriptionInfo.subscriptionId = rowData.PartSubId;
				subscriptionInfo.subscriptionPeriodStartDate = "03162022";
				subscriptionInfo.subscriptionPeriodEndDate = "03162022";

				//Filling Offering ID
				offering.id = rowData.OfferingId;

				//Filling offer Data
				offer.intendedUsage = rowData.LicUsage;
				offer.connectivity = rowData.Connectivity;
				offer.connectivityInterval = rowData.ConnInterval;
				offer.servicePlanId = rowData.SubsLevel;
				offer.billingBehavior = rowData.BillBehavior;
				offer.billingTerm = rowData.ConTerm;
				offer.billingType = rowData.BillType;
				offer.billingFrequency = rowData.BillFreq;

				//Filling price Data
				price.extendedPrice = rowData.ExtPrice;
				price.transactionalVolumeDiscount = rowData.VolDiscount;
				price.manualDiscount = rowData.ManDiscount;
				price.ddaDiscount = rowData.DealDiscount;

				oLineItem.subscriptionInfo = subscriptionInfo;
				oLineItem.offering = offering;
				oLineItem.offer = offer;
				oLineItem.price = price;
				aLineItems.push(oLineItem);

			}

			// Filling header Data 
			var purchaser = {};
			purchaser.oxygenId = "DUMMY";
			purchaser.email = "DUMMY";
			purchaser.contactCsn = "DUMMY";

			var priceheader = {};
			priceheader.country = "US";
			priceheader.currency = "USD";
			priceheader.language = "EN";

			var payment = {};
			payment.paymentProcessor = "TEST";

			var data = {};
			data.orderState = "CHARGED";
			data.purchaser = purchaser;
			data.price = priceheader;
			data.payment = payment;
			data.lineItems = aLineItems;
			console.log(data);
			var ajaxData = {
				"items": [{
					"Detail": data,
					"DetailType": "Test",
					"Source": "com.inv.order"
				}]
			};
			jQuery.ajax({
				type: "POST",
				//	Access-Control-Allow-Headers:'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
				contentType: "application/json",
				url: "//hdiyj6ezwk.execute-api.us-east-1.amazonaws.com/dev/",
				dataType: "json",
				"Access-Control-Allow-Origin": "*",
				async: false,
				data: ajaxData,
				success: function (data1, textStatus, jqXHR) {
					// oModel.setData({modelData : data}); 
					alert("success to post");
				}

			});
		},

		onAddRow: function () {
			var aItems = this.getView().getModel().getData().items;
			var dummydata = [{
				Quantity: "",
				PartSubId: "",
				SettleDateStart: "",
				SettleDateEnd: "",
				OfferingId: "",
				LicUsage: "",
				Connectivity: "",
				ConnInterval: "",
				SubsLevel: "",
				BillBehavior: "",
				ConTerm: "",
				BillType: "",
				BillFreq: "",
				ExtPrice: "",
				VolDiscount: "",
				ManDiscount: "",
				DealDiscount: "",
				EUFirstname: "",
				EULastname: "",
				EUEmail: "",
				EUCompId: "",
				EUAddL1: "",
				EUAddL2: "",
				EUCity: "",
				EUState: "",
				EUCountry: "",
				EUPostCode: "",
				EUPhone: "",
				EUAccCsn: "",
				AGFirstname: "",
				AGLastname: "",
				AGEmail: "",
				AGCompId: "",
				AGAddL1: "",
				AGAddL2: "",
				AGCity: "",
				AGState: "",
				AGCountry: "",
				AGPostCode: "",
				AGPhone: "",
				AGAccCsn: ""
			}];
			aItems.push(dummydata);
			this.getView().getModel().setData({
				items: aItems
			});
		},

		onDelete: function () {
			var aSelectedRows = this.getView().byId("lineitemtable").getSelectedIndices();
			var aItems = this.getView().getModel().getData().items;
			for (var q = aSelectedRows.length - 1; q >= 0; q--) {
				aItems.splice(aSelectedRows[q], 1);
			}
			this.getView().getModel().setData({
				items: aItems
			});

		},

		onCopy: function () {
			var aSelectedRows = this.getView().byId("lineitemtable").getSelectedIndices();
			for (var q = 0; q < aSelectedRows.length; q++) {
				var oItem = this.getView().getModel().getData().items[aSelectedRows[q]];
				var oDummyItem = {
					Quantity: oItem.Quantity,
					PartSubId: oItem.PartSubId,
					SettleDateStart: oItem.SettleDateStart,
					SettleDateEnd: oItem.SettleDateEnd,
					OfferingId: oItem.OfferingId,
					LicUsage: oItem.LicUsage,
					Connectivity: oItem.Connectivity,
					ConnInterval: oItem.ConnInterval,
					SubsLevel: oItem.SubsLevel,
					BillBehavior: oItem.BillBehavior,
					ConTerm: oItem.ConTerm,
					BillType: oItem.BillType,
					BillFreq: oItem.BillFreq,
					ExtPrice: oItem.ExtPrice,
					VolDiscount: oItem.VolDiscount,
					ManDiscount: oItem.ManDiscount,
					DealDiscount: oItem.DealDiscount,
					EUFirstname: oItem.EUFirstname,
					EULastname: oItem.EULastname,
					EUEmail: oItem.EUEmail,
					EUCompId: oItem.EUCompId,
					EUAddL1: oItem.EUAddL1,
					EUAddL2: oItem.EUAddL2,
					EUCity: oItem.EUCity,
					EUState: oItem.EUState,
					EUCountry: oItem.EUCountry,
					EUPostCode: oItem.EUPostCode,
					EUPhone: oItem.EUPhone,
					EUAccCsn: oItem.EUAccCsn,
					AGFirstname: oItem.AGFirstname,
					AGLastname: oItem.AGLastname,
					AGEmail: oItem.AGEmail,
					AGCompId: oItem.AGCompId,
					AGAddL1: oItem.AGAddL1,
					AGAddL2: oItem.AGAddL2,
					AGCity: oItem.AGCity,
					AGState: oItem.AGState,
					AGCountry: oItem.AGCountry,
					AGPostCode: oItem.AGPostCode,
					AGPhone: oItem.AGPhone,
					AGAccCsn: oItem.AGAccCsn
				};
				var aItems = this.getView().getModel().getData().items;
				aItems.push(oDummyItem);
				this.getView().getModel().setData({
					items: aItems
				});
			}

		}
	});
});
