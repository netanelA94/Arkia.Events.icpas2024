$(function () {
    if ($('#wizard').exists()) {
        ARKIA.WIZARD.SHUTTLE.init();
    }
});

ARKIA.WIZARD.SHUTTLE = {
    init: function () {
        $("#btShuttleCon").click(function () {


            var isStepValid = true;
            var errors = new Array();
            var stepnumber = 6;

            var sumShuttle1 = 0;
            var sumShuttle2 = 0;

            $.each(ARKIA.WIZARD.SHUTTLE.temproducts[0], function (i, product) {
                if (product.ADULTS_PRD_NO)
                    sumShuttle1 += product.ADULTS_PRD_NO;
            });

            $.each(ARKIA.WIZARD.SHUTTLE.temproducts[1], function (i, product) {
                if (product.ADULTS_PRD_NO)
                    sumShuttle2 += product.ADULTS_PRD_NO;
            });

            if ((sumShuttle1 + sumShuttle2) == 0 && $('#cbNoShuttle:checkbox:checked').length == 0) {
                isStepValid = false;
                ARKIA2.WIZARD.resetShuttle();
                errors.push(MSG343);
                errorValues[stepnumber] = ARKIA.WIZARD.createErrorListWizard(errors);
            }
            else if ((sumShuttle1 + sumShuttle2) > 0 && $('#cbNoShuttle:checkbox:checked').length == 1) {
                isStepValid = false;
                ARKIA2.WIZARD.resetShuttle();
                errors.push(MSG342);
                errorValues[stepnumber] = ARKIA.WIZARD.createErrorListWizard(errors);
            }

            if (sumShuttle1 > ARKIA.WIZARD.SHUTTLE.passProducts1.length || sumShuttle2 > ARKIA.WIZARD.SHUTTLE.passProducts2.length) {
                isStepValid = false;
                ARKIA2.WIZARD.resetShuttle();
                errors.push(MSG341);
                errorValues[stepnumber] = ARKIA.WIZARD.createErrorListWizard(errors);
            }

            if (isStepValid) {


                if ($('#cbNoShuttle:checkbox:checked').length == 1) {
                    ARKIA2.WIZARD.resetShuttle();
                    $("#buttonNextShuttle").click();
                }
                else {

                    $("#shuttlePart1").hide();
                    $("#shuttlePart2").show();


                    angular.element(document.getElementById('ng_Ctrl_PRD09_PART2')).scope().init();
                    angular.element(document.getElementById('ng_Ctrl_PRD09_PART2')).scope().$apply();

                }
            }
            else {
                errorValues[stepnumber] = ARKIA.WIZARD.createErrorListWizard(errors);
            }
            ARKIA.WIZARD.setError(stepnumber, !isStepValid);
            window.scrollTo(0, 170);

        });
    },
    temproducts: [],
    passProducts1: [],
    passProducts2: [],
    reLoad: true,
    productsCtrl: ['$scope', '$http', function ($scope, $http) {
        var indexPage = 0;
        var prod = ARKIA.WIZARD.SHUTTLE;
        $scope.totalPrice = '';
        $scope.products = [];
        $scope.adults = [];
        $scope.children = [];
        $scope.isChildPriceExists = false;
        $scope.totalPriceText = MSG344;

        $scope.init = function () {


            var ctrlObj = $('#ng_Ctrl_PRD09');
            var pageCode1 = 'PRD11';
            var pageCode2 = 'PRD12';
            $scope.hotelName = ARKIA.WIZARD.HOTELS.roomsChecked.hotel.HOTEL_NAME;

            if (!$scope.products || prod.reLoad) {
                $http({
                    url: 'webmethods/AjaxMethods.aspx/GetShuttles',
                    method: "POST",
                    data: "{pageCode1:'" + pageCode1 + "',pageCode2:'" + pageCode2 + "'}",
                    headers: { 'Content-Type': 'application/json; charset=utf-8' }
                })
                    .success(function (data, status, headers, config) {

                        prod.reLoad = false;
                        var totalPrice = '';
                        var products1 = [];
                        var products2 = [];


                        products1 = data.d.Products1.Value;
                        products2 = data.d.Products2.Value;

                        totalPrice = '';
                        $.each(products1, function (index, product) {
                            product.ADULT_PRICE_FMT = (eventsCurrency + product.ADULT_PRICE.formatMoney(0, '.', ','));
                            product.ADULT_PRICE_FMT2 = (product.ADULT_PRICE.formatMoney(0, '.', ',') + eventsCurrency);
                        });


                        $.each(products2, function (index, product) {
                            product.ADULT_PRICE_FMT = (eventsCurrency + product.ADULT_PRICE.formatMoney(0, '.', ','));
                            product.ADULT_PRICE_FMT2 = (product.ADULT_PRICE.formatMoney(0, '.', ',') + eventsCurrency);
                        });


                        var agc = ARKIA2.WIZARD.getAgeGroupCount();
                        var passCount = agc.adults + agc.children + agc.infants;

                        var sumOB = 0;
                        var sumIB = 0;

                        $.each(ARKIA.WIZARD.FLIGHTS.temflights.itemsOB, function (index, flights) {
                            $.each(flights.FLIGHTS.Value, function (index, flight) {
                                if (flight.selectPassNo)
                                    sumOB += flight.selectPassNo;
                            });
                        });

                        $.each(ARKIA.WIZARD.FLIGHTS.temflights.itemsIB, function (index, flights) {
                            $.each(flights.FLIGHTS.Value, function (index, flight) {
                                if (flight.selectPassNo)
                                    sumIB += flight.selectPassNo;
                            });
                        });

                        var agc = ARKIA2.WIZARD.getAgeGroupCount();
                        var passCount = agc.adults + agc.children + agc.infants;

                        ARKIA.WIZARD.SHUTTLE.passProducts1 = [];
                        ARKIA.WIZARD.SHUTTLE.passProducts2 = [];

                        if (sumOB < passCount) {
                            for (var i = 0; i < (passCount - sumOB); i++) {
                                ARKIA.WIZARD.SHUTTLE.passProducts1.push(i + 1);
                            }
                        }

                        if (sumIB < passCount) {
                            for (var i = 0; i < (passCount - sumIB); i++) {
                                ARKIA.WIZARD.SHUTTLE.passProducts2.push(i + 1);
                            }
                        }


                        ARKIA.WIZARD.SHUTTLE.temproducts[0] = products1;
                        ARKIA.WIZARD.SHUTTLE.temproducts[1] = products2;

                        $scope.obShuttle = sumOB < passCount;
                        $scope.ibShuttle = sumIB < passCount;
                        $scope.totalPrice = totalPrice;
                        $scope.products1 = products1;
                        $scope.products2 = products2;
                        $scope.passProducts1 = ARKIA.WIZARD.SHUTTLE.passProducts1;
                        $scope.passProducts2 = ARKIA.WIZARD.SHUTTLE.passProducts2;

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
            $.each($scope.products1, function (index, product) {
                if (product.ADULTS_PRD_NO != null) {
                    sumPrice += product.ADULT_PRICE * product.ADULTS_PRD_NO;
                }
            });
            $.each($scope.products2, function (index, product) {
                if (product.ADULTS_PRD_NO != null) {
                    sumPrice += product.ADULT_PRICE * product.ADULTS_PRD_NO;
                }
            });
            $scope.totalPrice = sumPrice > 0 ? eventsCurrency + sumPrice.formatMoney(0, '.', ',') : "";
        }
        $scope.clearSelected = function () {
            $.each($scope.products1, function (index, product) {
                product.CHILDREN_PRD_NO = product.ADULTS_PRD_NO = null;
            });
            $.each($scope.products2, function (index, product) {
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



            var allPassengers = ARKIA2.WIZARD.getPassengers();
            var passengers1 = [];
            var passengers2 = [];

            var flights = [];

            if (ARKIA.WIZARD.FLIGHTS.temPassflights) {
                if (ARKIA.WIZARD.FLIGHTS.temPassflights.itemsOB)
                    flights = ARKIA.WIZARD.FLIGHTS.temPassflights.itemsOB;
                $.each(flights, function (index, flight) {
                    $.each(flight.PASSENGERS, function (i, passItem) {
                        passengers1.push(passItem.SELECT_CUSTOMER_NO);
                    });
                });


                var flights = [];
                if (ARKIA.WIZARD.FLIGHTS.temPassflights.itemsIB)
                    flights = ARKIA.WIZARD.FLIGHTS.temPassflights.itemsIB;
                $.each(flights, function (index, flight) {
                    $.each(flight.PASSENGERS, function (i, passItem) {
                        passengers2.push(passItem.SELECT_CUSTOMER_NO);
                    });
                });
            }


            var passengersNof1 = [];
            var passengersNof2 = [];

            jQuery.grep(allPassengers, function (el) {
                if (jQuery.inArray(el.CUSTOMER_NO, passengers1) == -1)
                    passengersNof1.push(el);
            });

            jQuery.grep(allPassengers, function (el) {
                if (jQuery.inArray(el.CUSTOMER_NO, passengers2) == -1)
                    passengersNof2.push(el);
            });

            $scope.products1 = [];
            $scope.products2 = [];

            var selectedProducts1 = jQuery.grep(ARKIA.WIZARD.SHUTTLE.temproducts[0], function (prod) {
                return (prod.ADULTS_PRD_NO > 0);
            });

            $.each(ARKIA.WIZARD.SHUTTLE.temproducts[0], function (i, product) {
                if (product.ADULTS_PRD_NO > 0) {
                    product.PASSENGERS = [];
                    for (var i = 0; i < product.ADULTS_PRD_NO; i++) {

                        var passItem = {
                            VALUES: passengersNof1,
                            SELECT_CUSTOMER_NO: selectedProducts1.length == 1 && product.ADULTS_PRD_NO == passengersNof1.length ? passengersNof1[i].CUSTOMER_NO : 0,
                            OLD_SELECTED: null,
                            PRICE: product.ADULT_PRICE,
                            PRICE_CURRENCY: product.ADULT_PRICE_FMT
                        };

                        product.PASSENGERS.push(passItem);
                    }

                    $scope.products1.push(product);
                }
            });

            var selectedProducts2 = jQuery.grep(ARKIA.WIZARD.SHUTTLE.temproducts[1], function (prod) {
                return (prod.ADULTS_PRD_NO > 0);
            });

            $.each(ARKIA.WIZARD.SHUTTLE.temproducts[1], function (i, product) {
                if (product.ADULTS_PRD_NO > 0) {

                    product.PASSENGERS = [];
                    for (var i = 0; i < product.ADULTS_PRD_NO; i++) {

                        var passItem = {
                            VALUES: passengersNof2,
                            SELECT_CUSTOMER_NO: selectedProducts2.length == 1 && product.ADULTS_PRD_NO == passengersNof2.length ? passengersNof2[i].CUSTOMER_NO : 0,
                            OLD_SELECTED: null,
                            PRICE: product.ADULT_PRICE,
                            PRICE_CURRENCY: product.ADULT_PRICE_FMT
                        };

                        product.PASSENGERS.push(passItem);
                    }
                    $scope.products2.push(product);
                }
            });
            setTimeout(function () {
                $('#ng_Ctrl_PRD09_PART2 .passItem .selectName').each(function () {
                    if ($('.bodyMain.ltr').length) {
                        $(this).attr('aria-label', $(this).parents('.items').find('.greyPanel').text() + $(this).next().text() + ' select passenger');
                    }
                    else {
                        $(this).attr('aria-label', $(this).parents('.items').find('.greyPanel').text() + $(this).next().text() + ' בחר נוסע');
                    }
                });
            }, 100);

            if ((selectedProducts1.length == 0 || selectedProducts1.length == 1 && selectedProducts1[0].ADULTS_PRD_NO == passengersNof1.length) &&
                (selectedProducts2.length == 0 || selectedProducts2.length == 1 && selectedProducts2[0].ADULTS_PRD_NO == passengersNof2.length)) {
                $("#buttonNextShuttle").click();
            }

        },
            $scope.clearSelected = function () {

                $scope.init();

            },
            $scope.passengersChange = function (productItem, passItem, items) {


                if (passItem.OLD_SELECTED != null) {
                    $.each(items, function (ind, product) {
                        $.each(product.PASSENGERS, function (index, val) {
                            if (val.OLD_SELECTED != passItem.OLD_SELECTED) {
                                val.VALUES.push(passItem.OLD_SELECTED);
                            }
                        });
                    });
                }


                if (passItem.SELECT_CUSTOMER_NO != null) {
                    $.each(items, function (ind, product) {
                        $.each(product.PASSENGERS, function (index, val) {
                            if (val.SELECT_CUSTOMER_NO != passItem.SELECT_CUSTOMER_NO) {
                                val.VALUES = jQuery.grep(val.VALUES, function (value) {
                                    return value.CUSTOMER_NO != passItem.SELECT_CUSTOMER_NO;
                                });
                            }
                        });
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

        if (isStepValid) {


            ARKIA2.WIZARD.resetShuttle();


            var products = ARKIA.WIZARD.SHUTTLE.temproducts[0];
            $.each(products, function (index, prod) {
                if (prod.ADULTS_PRD_NO > 0) {
                    $.each(prod.PASSENGERS, function (i, passItem) {
                        if (passItem.SELECT_CUSTOMER_NO == 0)
                            isStepValid = false;
                    });
                }
            });


            var products = ARKIA.WIZARD.SHUTTLE.temproducts[1];
            $.each(products, function (index, prod) {
                if (prod.ADULTS_PRD_NO > 0) {
                    $.each(prod.PASSENGERS, function (i, passItem) {
                        if (passItem.SELECT_CUSTOMER_NO == 0)
                            isStepValid = false;
                    });
                }
            });


            if (!isStepValid) {
                errors.push(MSG324);
            }
            else {

                var products = ARKIA.WIZARD.SHUTTLE.temproducts[0];

                $.each(products, function (index, prod) {
                    if (prod.ADULTS_PRD_NO > 0) {
                        var passenger = [];
                        $.each(prod.PASSENGERS, function (i, passItem) {
                            passenger.push(passItem.SELECT_CUSTOMER_NO);
                        });


                        ARKIA2.WIZARD.AddShuttle(prod.AP_PRD_KEY, passenger);
                    }

                });


                var products = ARKIA.WIZARD.SHUTTLE.temproducts[1];
                $.each(products, function (index, prod) {
                    if (prod.ADULTS_PRD_NO > 0) {
                        var passenger = [];
                        $.each(prod.PASSENGERS, function (i, passItem) {
                            passenger.push(passItem.SELECT_CUSTOMER_NO);
                        });
                        ARKIA2.WIZARD.AddShuttle(prod.AP_PRD_KEY, passenger);
                    }

                });
            }

        }
        if (!isStepValid) {
            errorValues[stepnumber] = ARKIA.WIZARD.createErrorListWizard(errors);
        }


        return isStepValid;

    }

}