ARKIA.WIZARD.MEALS = {
    init: function (data, ctrlObj, pageCode, indexPage) {

        $("#btnMealsCon").click(function () {

            var isStepValid = true;
            var errors = new Array();
            var stepnumber = 4;

            var sumMeals = 0;


            $.each(ARKIA.WIZARD.MEALS.temproducts[0], function (i, product) {
                if (product.CHILDREN_PRD_NO)
                    sumMeals += product.CHILDREN_PRD_NO;
                if (product.ADULTS_PRD_NO)
                    sumMeals += product.ADULTS_PRD_NO;
            });



            if (sumMeals == 0 && $('#cbNoLunch:checkbox:checked').length == 0) {
                isStepValid = false;
                ARKIA2.WIZARD.resetMeal();
                errors.push(MSG133);
                errorValues[stepnumber] = ARKIA.WIZARD.createErrorListWizard(errors);
            }
            else if (sumMeals > 0 && $('#cbNoLunch:checkbox:checked').length == 1) {
                isStepValid = false;
                ARKIA2.WIZARD.resetMeal();
                errors.push(MSG318);
                errorValues[stepnumber] = ARKIA.WIZARD.createErrorListWizard(errors);
            }

            if (isStepValid) {

                if ($('#cbNoLunch:checkbox:checked').length == 1) {
                    ARKIA2.WIZARD.resetMeal();
                    $("#buttonNextMeals").click();
                }
                else {
                    var agc = ARKIA2.WIZARD.getAgeGroupCount();
                    var passCount = agc.adults + agc.children;

                    $("#mealsPart1").hide();
                    $("#mealsPart2").show();

                    angular.element(document.getElementById('ng_Ctrl_PRD13_MEALS')).scope().init();
                    angular.element(document.getElementById('ng_Ctrl_PRD13_MEALS')).scope().$apply();
                }
            }
            else {
                errorValues[stepnumber] = ARKIA.WIZARD.createErrorListWizard(errors);
            }
            ARKIA.WIZARD.setError(stepnumber, !isStepValid);
            window.scrollTo(0, 170);

        });


        var totalPrice = '';
        var products = [];
        var adults = [];
        var children = [];
        var isChildPriceExists = false;

        products = data.d.Products.Value;

        if (data.d.Products.Value) {

            totalPrice = '';
            var childPriceIsFree = false;
            $.each(products, function (index, product) {
                if (product.CHILD_PRICEIsNull == false) {
                    product.CHILD_PRICE_FMT = (eventsCurrency + product.CHILD_PRICE.formatMoney(0, '.', ','));
                }
                if (product.ADULT_PRICEIsNull == false) {
                    product.ADULT_PRICE_FMT = (eventsCurrency + product.ADULT_PRICE.formatMoney(0, '.', ','));
                    product.ADULT_PRICE_FMT2 = (product.ADULT_PRICE.formatMoney(0, '.', ',') + eventsCurrency);
                }
                if (product.CHILD_PRICEIsNull != product.ADULT_PRICEIsNull || product.CHILD_PRICE != product.ADULT_PRICE) {
                    isChildPriceExists = true;
                }
                if (product.CHILD_PRICEIsNull) {
                    childPriceIsFree = true;
                }
            });

            if (childPriceIsFree && $("#ageMinMsg", ctrlObj).length == 0) {
                if ($("#infoBoxItems ul", ctrlObj).length > 0) {
                    $("#infoBoxItems ul", ctrlObj).append('<li id="ageMinMsg">' + MSG93.replace('{0}', data.d.ChildAgeStart) + '</li>');
                }
                else {
                    $("#infoBoxItems", ctrlObj).append('<div class="infoBox pieFix"><div class="infoBoxBubble"></div><ul><li id="ageMinMsg">' + MSG93.replace('{0}', data.d.ChildAgeStart) + '</li></ul></div></div></div>');
                }
            }

            var res = ARKIA2.WIZARD.getReservation();
            var child = 0;
            var adult = 1;
            adults = [];
            children = [];
            adults.push(1);
            if (res.COMPANIONS != null) {
                $.each(res.COMPANIONS.Value, function (index, comp) {
                    if (!isChildPriceExists) {
                        var ageTemp = ARKIA2.WIZARD.getAgeByDate(comp.DOB.toString());
                        if (ageTemp >= data.d.ChildAgeStart) {
                            adult++;
                            adults.push(adult);
                        }
                    }
                    else {
                        var ageTemp = ARKIA2.WIZARD.getAgeByDate(comp.DOB.toString());
                        if (ageTemp > data.d.ChildAgeEnd) {
                            adult++;
                            adults.push(adult);
                        }
                        else if (data.d.ChildAgeStart <= ageTemp && ageTemp < data.d.ChildAgeEnd) {
                            child++;
                            children.push(child);
                        }
                    }

                });
            }

            ARKIA.WIZARD.MEALS.temproducts[indexPage] = products;
        }

        return {
            totalPrice: totalPrice,
            products: products,
            adults: adults,
            children: children,
            isChildPriceExists: isChildPriceExists
        };

    },
    temproducts: [],
    PRD13: {
        reLoad: true,
        productsCtrl: ['$scope', '$http', function ($scope, $http) {
            var indexPage = 0;
            var prod = ARKIA.WIZARD.MEALS.PRD13;
            $scope.totalPrice = '';
            $scope.products = [];
            $scope.adults = [];
            $scope.children = [];
            $scope.isChildPriceExists = false;
            $scope.totalPriceText = MSG130;

            $scope.init = function () {


                var ctrlObj = $('#ng_Ctrl_PRD13');
                var pageCode = 'PRD13';
                $scope.hotelName = ARKIA.WIZARD.HOTELS.roomsChecked.hotel.HOTEL_NAME;

                if (!$scope.products || prod.reLoad) {
                    $http({
                        url: 'webmethods/AjaxMethods.aspx/GetAdditionalProducts',
                        method: "POST",
                        data: "{pageCode:'" + pageCode + "'}",
                        headers: { 'Content-Type': 'application/json; charset=utf-8' }
                    })
                        .success(function (data, status, headers, config) {

                            prod.reLoad = false;

                            var retVal = ARKIA.WIZARD.MEALS.init(data, ctrlObj, pageCode, indexPage);

                            $scope.totalPrice = retVal.totalPrice;
                            $scope.products = retVal.products;
                            $scope.adults = retVal.adults;
                            $scope.children = retVal.children;
                            $scope.isChildPriceExists = retVal.isChildPriceExists;

                            $("#showsLoader", ctrlObj).hide();
                            $("#showsContent", ctrlObj).show();
                        })
                        .error(function (data, status, headers, config) {
                            window.location = errorPage;
                        });
                }
            }
            $scope.addSum = function () {
                var sumPrice = 0;
                $.each($scope.products, function (index, product) {
                    if (product.CHILDREN_PRD_NO != null) {
                        sumPrice += product.CHILD_PRICE * product.CHILDREN_PRD_NO;
                    }
                    if (product.ADULTS_PRD_NO != null) {
                        sumPrice += product.ADULT_PRICE * product.ADULTS_PRD_NO;
                    }
                });
                $scope.totalPrice = sumPrice > 0 ? eventsCurrency + sumPrice.formatMoney(0, '.', ',') : "";
            }
            $scope.clearSelected = function () {
                $.each($scope.products, function (index, product) {
                    product.CHILDREN_PRD_NO = product.ADULTS_PRD_NO = null;
                });
                $scope.totalPrice = '';
            }
            $scope.formatDate = function (date) {
                var num = parseInt(date.replace(/[^0-9]/g, ""));
                return new Date(num);
            };
        }],
        productsCtrl_2: ['$scope', '$http', function ($scope, $http) {
            $scope.init = function () {

                $scope.hotelName = ARKIA.WIZARD.HOTELS.roomsChecked.hotel.HOTEL_NAME;

                var passengers = ARKIA2.WIZARD.getPassengers();
                passengers = jQuery.grep(passengers, function (value) {
                    return value.AgeGroup != 'I';
                });


                //                var passengersA = jQuery.grep(passengers, function (value) {
                //                    return value.AgeGroup == 'A';
                //                });

                //                var passengersC = jQuery.grep(passengers, function (value) {
                //                    return value.AgeGroup == 'C';
                //                });

                ARKIA.WIZARD.MEALS.temproducts[0][0].productsMeals = [];

                var adultsPRDNo = ARKIA.WIZARD.MEALS.temproducts[0][0].ADULTS_PRD_NO;

                for (var i = 0; i < adultsPRDNo; i++) {

                    var passItem = {
                        AGE_GROUP: 'מבוגר',
                        VALUES: passengers,
                        SELECT_CUSTOMER_NO: adultsPRDNo == passengers.length ? passengers[i].CUSTOMER_NO : 0,
                        OLD_SELECTED: null,
                        PRICE: ARKIA.WIZARD.MEALS.temproducts[0][0].ADULT_PRICE,
                        PRICE_CURRENCY: ARKIA.WIZARD.MEALS.temproducts[0][0].ADULT_PRICE_FMT
                    };

                    ARKIA.WIZARD.MEALS.temproducts[0][0].productsMeals.push(passItem);
                }

                //                var childrenPRDNo = 0;
                //                if (ARKIA.WIZARD.MEALS.temproducts[0][0].CHILDREN_PRD_NO)
                //                     childrenPRDNo = ARKIA.WIZARD.MEALS.temproducts[0][0].CHILDREN_PRD_NO;

                //                for (var i = 0; i < childrenPRDNo; i++) {

                //                    var passItem = {
                //                        AGE_GROUP: 'ילד',
                //                        VALUES: passengers,
                //                        SELECT_CUSTOMER_NO: childrenPRDNo == passengersC.length ? passengersC[i].CUSTOMER_NO : 0,
                //                        OLD_SELECTED: null,
                //                        PRICE: ARKIA.WIZARD.MEALS.temproducts[0][0].CHILD_PRICE,
                //                        PRICE_CURRENCY: ARKIA.WIZARD.MEALS.temproducts[0][0].CHILD_PRICE_FMT
                //                    };

                //                    ARKIA.WIZARD.MEALS.temproducts[0][0].productsMeals.push(passItem);
                //                }


                $scope.productsMeals = ARKIA.WIZARD.MEALS.temproducts[0][0].productsMeals;

                setTimeout(function () {
                    $('#ng_Ctrl_PRD13_MEALS .passItem .selectName').each(function () {
                        if ($('.bodyMain.ltr').length) {
                            $(this).attr('aria-label', $(this).parents('.ribbonBox').find('.marginRight10').text() + $(this).next().text() + ', select participant');
                        }
                        else {
                            $(this).attr('aria-label', $(this).parents('.ribbonBox').find('.marginRight10').text() + $(this).next().text() + ', בחר משתתף');
                        }
                    });
                }, 100);

                if (adultsPRDNo == passengers.length) {
                    $("#buttonNextMeals").click();
                }

                //                if (adultsPRDNo == passengersA.length && childrenPRDNo == passengersC.length) {
                //                    $("#buttonNextMeals").click();
                //                }


            },
                $scope.clearSelected = function () {

                    $scope.init();

                },
                $scope.passengersChange = function (passItem) {

                    if (passItem.OLD_SELECTED != null) {
                        $.each($scope.productsMeals, function (index, val) {
                            if (val.OLD_SELECTED != passItem.OLD_SELECTED) {
                                if (val.AGE_GROUP == passItem.AGE_GROUP) {
                                    val.VALUES.push(passItem.OLD_SELECTED);
                                }
                            }
                        });

                    }

                    if (passItem.SELECT_CUSTOMER_NO != null) {
                        $.each($scope.productsMeals, function (index, val) {
                            if (val.SELECT_CUSTOMER_NO != passItem.SELECT_CUSTOMER_NO) {
                                val.VALUES = jQuery.grep(val.VALUES, function (value) {
                                    return value.CUSTOMER_NO != passItem.SELECT_CUSTOMER_NO;
                                });
                            }
                        });
                    }

                    //FIX for IE9
                    angular.forEach($("select"), function (currSelect) {
                        currSelect.options[currSelect.selectedIndex].text += " ";
                    });

                    if (passItem.SELECT_CUSTOMER_NO != null) {
                        var selected = jQuery.grep(passItem.VALUES, function (value) {
                            return value.CUSTOMER_NO == passItem.SELECT_CUSTOMER_NO;
                        });
                        passItem.OLD_SELECTED = selected[0];

                    }
                    else {
                        passItem.OLD_SELECTED = null;
                    }
                }

        }],
        ValidateStep: function (stepnumber) {
            var isStepValid = true;
            var errors = new Array();

            if (ARKIA.WIZARD.MEALS.temproducts[0][0].productsMeals) {

                $.each(ARKIA.WIZARD.MEALS.temproducts[0][0].productsMeals, function (index, val) {
                    if (val.SELECT_CUSTOMER_NO == 0)
                        isStepValid = false;
                });

                if (!isStepValid) {
                    errors.push(MSG323);
                }
                else {

                    var passenger = [];
                    $.each(ARKIA.WIZARD.MEALS.temproducts[0][0].productsMeals, function (index, val) {
                        passenger.push(val.SELECT_CUSTOMER_NO);
                    });

                    ARKIA.WIZARD.MEALS.temproducts[0][0].CUSTOMERS_NO = passenger;

                    ARKIA2.WIZARD.resetMeal();


                    if (ARKIA.WIZARD.MEALS.temproducts) {
                        $.each(ARKIA.WIZARD.MEALS.temproducts, function (indexPage, productsPage) {
                            $.each(productsPage, function (index, product) {
                                if (product.CHILDREN_PRD_NO > 0 || product.ADULTS_PRD_NO > 0) {
                                    ARKIA2.WIZARD.AddMeal(product.AP_PRD_KEY, product.ADULTS_PRD_NO, product.CHILDREN_PRD_NO, product.CUSTOMERS_NO);
                                }
                            });
                        });
                    }
                }

            }
            if (!isStepValid) {
                errorValues[stepnumber] = ARKIA.WIZARD.createErrorListWizard(errors);
            }
            return isStepValid;
        }
    }
}