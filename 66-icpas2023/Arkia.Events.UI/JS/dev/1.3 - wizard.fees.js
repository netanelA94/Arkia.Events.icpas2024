ARKIA.WIZARD.FEES = {
    temfees: null,
    reLoad: true,
    registrFeeCtrl: ['$scope', function ($scope) {

        $scope.totalPrice = '';
        $scope.init = function () {
            var res = ARKIA2.WIZARD.getReservation();
            if ((res.FEES == null && !$scope.items) || ARKIA.WIZARD.FEES.reLoad) {
                $.ajax(
                    {
                        type: "POST",
                        async: false,
                        url: "webmethods/AjaxMethods.aspx/GetFees",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (response) {
                            ARKIA.WIZARD.FEES.reLoad = false;
                            var d = response.d;
                            // All the products will return uniform currency
                            eventsCurrency = d.mainFees[0].CURRENCY;
                            var resfee = {
                                CUSTOMER_NO: res.CUSTOMER.CUSTOMER_NO,
                                AGE_GROUP: 'A',
                                LATIN_FIRST_NAME: res.CUSTOMER.LATIN_FIRST_NAME,
                                LATIN_LAST_NAME: res.CUSTOMER.LATIN_LAST_NAME,
                                FEES: d.mainFees,
                                ALL_FEES: d.mainFees,
                                SELECTED_PRD_KEY: d.mainFees.length > 1 ? '' : d.mainFees[0].AP_PRD_KEY,
                                SELECTED_FEE: d.mainFees.length > 1 ? null : d.mainFees[0],
                                HOTEL_REQUIRE_YN: d.mainFees.length > 1 ? '' : d.mainFees[0].HOTEL_REQUIRE_YN,
                                PRICE: d.mainFees.length > 1 ? 0 : d.mainFees[0].PRICE,
                                PRICE_CURRENCY: d.mainFees.length > 1 ? '' : d.mainFees[0].PRICE_CURRENCY
                            };

                            if (d.mainFees.length == 1) {
                                if (d.mainFees[0].HOTEL_REQUIRE_YN == 'N') {

                                    $("#buttonNextFees").attr('jumpStep', true);
                                }
                                else {
                                    $("#buttonNextFees").removeAttr('jumpStep');
                                }
                            }

                            var agc = ARKIA2.WIZARD.getAgeGroupCountRegType();

                            $scope.items = [];
                            $scope.items.push(resfee);


                            if (res.COMPANIONS) {
                                $.each(res.COMPANIONS.Value, function (index, value) {

                                    var feesItems;
                                    var ageGroup = ARKIA2.WIZARD.getAgeGroupRegType(value);

                                    //הצגת דמי רישום לפי טווח גילאים ולא לפי קבוצת גיל

                                    //if (ageGroup == "I") {
                                    //    if (d.infantFees.length > 0)
                                    //        feesItems = d.infantFees;
                                    //    else
                                    //        ageGroup = "C";

                                    //}
                                    //if (ageGroup == "C") {
                                    //    if (d.childFees.length > 0)
                                    //        feesItems = d.childFees;
                                    //    else
                                    //        ageGroup = "A";

                                    //}
                                    //if (ageGroup == "A") {
                                    //    feesItems = d.adultFees;
                                    //}
                                    var age = ARKIA2.WIZARD.getAgeByDate(value.DOB);
                                    feesItems = d.companionsFees.filter(function (fees) {
                                        return fees.AGE_FROM <= age && fees.AGE_TO >= age;
                                    });;


                                    resfee = {
                                        CUSTOMER_NO: value.CUSTOMER_NO,
                                        AGE_GROUP: ageGroup,
                                        LATIN_FIRST_NAME: value.LATIN_FIRST_NAME,
                                        LATIN_LAST_NAME: value.LATIN_LAST_NAME,
                                        FEES: feesItems,
                                        ALL_FEES: feesItems,
                                        SELECTED_PRD_KEY: feesItems.length > 1 ? '' : feesItems[0].AP_PRD_KEY,
                                        SELECTED_FEE: feesItems.length > 1 ? null : feesItems[0],
                                        HOTEL_REQUIRE_YN: feesItems.length > 1 ? '' : feesItems[0].HOTEL_REQUIRE_YN,
                                        PRICE: feesItems.length > 1 ? 0 : feesItems[0].PRICE,
                                        PRICE_CURRENCY: feesItems.length > 1 ? '' : feesItems[0].PRICE_CURRENCY
                                    };


                                    $scope.items.push(resfee);


                                });
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {

                            window.location = errorPage;
                        }
                    });
                var sumPrice = 0;
                $.each($scope.items, function (index, value) {
                    sumPrice += value.PRICE;
                });
                $scope.totalPrice = sumPrice > 0 ? eventsCurrency + sumPrice.formatMoney(0, '.', ',') : "";

                ARKIA.WIZARD.FEES.temfees = $scope.items;
            }
        }
        $scope.feesChange = function (item, reset) {
            var p = jQuery.grep(item.FEES, function (f) {
                return f.AP_PRD_KEY == item.SELECTED_PRD_KEY;
            });


            if (p.length == 0) {
                item.SELECTED_FEE = null;
                item.PRICE = 0;
                item.PRICE_CURRENCY = '';
                item.HOTEL_REQUIRE_YN = '';
            }
            else {
                item.SELECTED_FEE = p[0];
                item.PRICE = p[0].PRICE;
                item.PRICE_CURRENCY = p[0].PRICE_CURRENCY;
                item.HOTEL_REQUIRE_YN = p[0].HOTEL_REQUIRE_YN;
            }

            if (item.CUSTOMER_NO == 1) {

                $.each($scope.items, function (index, value) {
                    if (value.ALL_FEES && value.ALL_FEES.length > 1 && value.CUSTOMER_NO > 1) {
                        value.FEES = jQuery.grep(value.ALL_FEES, function (fee) {
                            return p.length == 0 || !fee.HOTEL_REQUIRE_YN || fee.HOTEL_REQUIRE_YN == '' || fee.HOTEL_REQUIRE_YN == p[0].HOTEL_REQUIRE_YN;
                        });

                        if (value.FEES.length == 1) {
                            value.SELECTED_PRD_KEY = value.FEES[0].AP_PRD_KEY;
                            value.SELECTED_FEE = value.FEES[0];
                            value.PRICE = value.FEES[0].PRICE;
                            value.PRICE_CURRENCY = value.FEES[0].PRICE_CURRENCY;
                            value.HOTEL_REQUIRE_YN = value.FEES[0].HOTEL_REQUIRE_YN;
                        }
                        else {
                            value.SELECTED_PRD_KEY = '';
                            value.SELECTED_FEE = null;
                            value.PRICE = 0;
                            value.PRICE_CURRENCY = '';
                            value.HOTEL_REQUIRE_YN = '';
                        }
                    }
                });

                if (p.length > 0 && p[0].HOTEL_REQUIRE_YN == 'N') {
                    $("#buttonNextFees").attr('jumpStep', true);
                }
                else {
                    $("#buttonNextFees").removeAttr('jumpStep');
                }

            }
            var sumPrice = 0;
            $.each($scope.items, function (index, value) {
                sumPrice += value.PRICE;
            });
            $scope.totalPrice = sumPrice > 0 ? eventsCurrency + sumPrice.formatMoney(0, '.', ',') : "";

            if (reset) {
                ARKIA2.WIZARD.resetHotels();
                ARKIA.WIZARD.HOTELS.reLoad = ARKIA.WIZARD.HOTELS.reLoad2 = true;  
                ARKIA.WIZARD.HOTELS.roomsChecked = null;
            }
        }
    }],
    ValidateStep: function (stepnumber) {
        var isStepValid = true;
        var errors = new Array();
        $("[role='FEE_ACM_RGS05']").each(function (index, value) {
            if ($(this).val() < '0') {
                isStepValid = false;
                $(this).addClass('inputError');
                errors[errors.length] = MSG55.replace('{0}', (index + 1));
            }
        });
        if (isStepValid) {

            ARKIA2.WIZARD.resetFees();            

            for (var i in ARKIA.WIZARD.FEES.temfees) {
                //                if (ARKIA.WIZARD.FEES.temfees[i].AGE_GROUP == "A") {
                ARKIA2.WIZARD.addFee(ARKIA.WIZARD.FEES.temfees[i].SELECTED_PRD_KEY, ARKIA.WIZARD.FEES.temfees[i].CUSTOMER_NO);
                //                }
            }

        }

        if (!isStepValid) {
            errorValues[stepnumber] = ARKIA.WIZARD.createErrorListWizard(errors);
        }
        return isStepValid;
    }
}