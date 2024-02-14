$(function () {
    if ($('#wizard').exists()) {
        ARKIA.WIZARD.FLIGHTS.init();
    }
});


ARKIA.WIZARD.FLIGHTS = {
    init: function () {

        //todelete for dev
        if (window.location.href.indexOf("dev") > -1 || window.location.href.indexOf("192.168.84.25") > -1) {
            $("#cbFlightProcFileName").prop('checked', true);
        }

        $(".inputError").removeClass("inputError");


        $("#btnFlightsCon").click(function () {
            var errors = new Array();
            $(".inputError").removeClass("inputError");
            var stepnumber = 5;
            var isStepValid = true;

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

            if (sumOB > passCount || sumIB > passCount) {
                isStepValid = false;
                errors[errors.length] = MSG321;
            }

            if ((sumOB + sumIB) > 0) {
                if (!$(".cbflights input[type='checkbox']").is(':checked')) {
                    isStepValid = false;
                    $(".cbflights").addClass('inputError');
                    errors[errors.length] = MSG61;
                }
            }
            else {
                isStepValid = false;
                errors[errors.length] = MSG137;
            }


            if (isStepValid) {
                ARKIA2.WIZARD.resetFlights();
                if ((sumOB + sumIB) > 0) {
                    ARKIA2.WIZARD.initFlights();
                }

                //במידה ואין הסעות יש להוריד  קוד זה
                //if (sumOB == passCount && sumIB == passCount) {
                //    $("#buttonNextFlights").attr('jumpStep', true);
                //}
                //else {
                //    $("#buttonNextFlights").removeAttr('jumpStep');
                //}
                //

                $("#PRD03").hide();
                $("#PRD04").show();
                angular.element(document.getElementById('ng_Ctrl_PRD04')).scope().init();
                angular.element(document.getElementById('ng_Ctrl_PRD04')).scope().$apply();
            }
            else {
                errorValues[stepnumber] = ARKIA.WIZARD.createErrorListWizard(errors);
            }
            ARKIA.WIZARD.setError(stepnumber, !isStepValid);
            window.scrollTo(0, 170);

        });
    },
    reLoad: true,
    temflights: null,
    FlightsCtrl: ['$scope', '$http', function ($scope, $http) {
        $scope.init = function () {
            if (!$scope.itemsOB || ARKIA.WIZARD.FLIGHTS.reLoad) {
                var res = ARKIA2.WIZARD.getReservation();
                if (res.FLIGHTS == null) {
                    $http({
                        url: 'webmethods/AjaxMethods.aspx/GetFlights',
                        method: "POST",
                        data: null,
                        headers: { 'Content-Type': 'application/json; charset=utf-8' }
                    })
                        .success(function (data, status, headers, config) {
                            ARKIA.WIZARD.FLIGHTS.reLoad = false;
                            var result = data.d;
                            $scope.itemsOB = result.OBFlights.Value;
                            $scope.itemsIB = result.IBFlights.Value;
                            ARKIA.WIZARD.FLIGHTS.temflights = {
                                itemsOB: $scope.itemsOB,
                                itemsIB: $scope.itemsIB
                            };
                            $("#flightsLoader").hide();
                            $("#flightsContent").show();
                        })
                        .error(function (data, status, headers, config) {
                            window.location = errorPage;
                        });

                    var result = [];
                    result.push(1);
                    if (res.COMPANIONS != null) {
                        $.each(res.COMPANIONS.Value, function (index, value) {
                            result.push(index + 2);
                        });
                    }

                    $scope.passengers = result;
                    ARKIA.WIZARD.FLIGHTS.temPassflights = null;
                }
            }
        }
        $scope.passengersCountChange = function () {
            ARKIA.WIZARD.FLIGHTS.temPassflights = null;
        }
        $scope.clearSelectedAndJamp = function () {
            var selectFlight = false;
            $("[role='PASSENGERS_OB_FLIGHT_PRD03']").each(function (index, value) {
                if ($(this).val() != '') {
                    selectFlight = true;
                }
            });
            $("[role='PASSENGERS_IB_FLIGHT_PRD03']").each(function (index, value) {
                if ($(this).val() != '') {
                    selectFlight = true;
                }
            });
            if (selectFlight) {
                var confirmResult = confirm(MSG73);
                if (confirmResult == true) {

                    for (var j = 0; j < 2; j++) {
                        var flightsDir = j == 0 ? ARKIA.WIZARD.FLIGHTS.temflights.itemsOB : ARKIA.WIZARD.FLIGHTS.temflights.itemsIB;
                        $.each(flightsDir, function (index, flights) {
                            $.each(flights.FLIGHTS.Value, function (index, flight) {
                                flight.selectPassNo = 0;
                            });
                        });
                    }

                    ARKIA2.WIZARD.resetFlights();
                    ARKIA.WIZARD.FLIGHTS.temPassflights = null;
                    $("#buttonNextPRD03").click();
                }
            }
            else {
                ARKIA2.WIZARD.resetFlights();
                ARKIA.WIZARD.FLIGHTS.temPassflights = null;
                $("#buttonNextPRD03").click();
            }
        }
    }],
    temPassflights: null,
    FlightsPassCtrl: ['$scope', function ($scope) {
        $scope.totalPrice = '';
        $scope.init = function () {
            var passengers = ARKIA2.WIZARD.getPassengers();
            if (ARKIA.WIZARD.FLIGHTS.temPassflights == null) {
                $scope.itemsOB = [];
                $scope.itemsIB = [];

                $scope.itemsOB = $scope.initFlights(ARKIA.WIZARD.FLIGHTS.temflights.itemsOB, passengers);
                $scope.itemsIB = $scope.initFlights(ARKIA.WIZARD.FLIGHTS.temflights.itemsIB, passengers);

                ARKIA.WIZARD.FLIGHTS.temPassflights = {
                    itemsOB: $scope.itemsOB,
                    itemsIB: $scope.itemsIB
                };

                var sumPrice = 0;
                $.each($scope.itemsOB, function (index, flights) {
                    $.each(flights.PASSENGERS, function (index, passItem) {
                        sumPrice += passItem.PRICE;
                    });
                });
                $.each($scope.itemsIB, function (index, flights) {
                    $.each(flights.PASSENGERS, function (index, passItem) {
                        sumPrice += passItem.PRICE;
                    });
                });
                $scope.totalPrice = sumPrice > 0 ? eventsCurrency + sumPrice.formatMoney(0, '.', ',') : "";
            }
            setTimeout(function () {
                $('#ng_Ctrl_PRD04 .passItem .selectName').each(function () {
                    if ($('.bodyMain.ltr').length) {
                        $(this).attr('aria-label', $(this).parents('.items').find('.marginRight10').text() + ' select passenger');
                    }
                    else {
                        $(this).attr('aria-label', $(this).parents('.items').find('.marginRight10').text() + ' בחר נוסע');
                    }
                });
            }, 100);

            var obFlights = ARKIA.WIZARD.FLIGHTS.temPassflights.itemsOB;
            var ibFlights = ARKIA.WIZARD.FLIGHTS.temPassflights.itemsIB;
            if ((obFlights.length == 0 || obFlights.length == 1 && obFlights[0].PASSENGERS.length == passengers.length)
                && (ibFlights.length == 0 || ibFlights.length == 1 && ibFlights[0].PASSENGERS.length == passengers.length)) {
                $("#buttonNextFlights").click();
            }
        }
        $scope.initFlights = function (flightsDir, passengers) {
            var items = [];
            var selectedFlights;

            for (var i in flightsDir) {
                var selectedFlights = jQuery.grep(flightsDir[i].FLIGHTS.Value, function (flight) {
                    return (flight.selectPassNo);
                });
                for (var j in flightsDir[i].FLIGHTS.Value) {
                    var flight = flightsDir[i].FLIGHTS.Value[j];
                    if (flight.selectPassNo) {
                        flight.ARR_STATION_NAME = flightsDir[i].ARR_STATION_NAME;
                        flight.DEP_STATION_NAME = flightsDir[i].DEP_STATION_NAME;
                        flight.PASSENGERS = [];
                        for (var k = 0; k < flight.selectPassNo; k++) {
                            var passItem = {};

                            if (selectedFlights.length == 1 && flight.selectPassNo == passengers.length) {
                                passItem = {
                                    VALUES: [],
                                    SELECT_CUSTOMER_NO: passengers[k].CUSTOMER_NO,
                                    OLD_SELECTED: passengers[k]
                                };

                                passItem.VALUES.push(passengers[k]);

                                if (passengers[k].AgeGroup == "I") {
                                    passItem.PRICE = flight.INFANT_PRICE;
                                    passItem.PRICE_CURRENCY = eventsCurrency + flight.INFANT_PRICE;
                                }
                                else if (passengers[k].AgeGroup == "C") {
                                    passItem.PRICE = flight.CHILD_PRICE;
                                    passItem.PRICE_CURRENCY = eventsCurrency + flight.CHILD_PRICE;
                                }
                                else {
                                    passItem.PRICE = flight.ADULT_PRICE;
                                    passItem.PRICE_CURRENCY = eventsCurrency + flight.ADULT_PRICE;
                                }
                            }
                            else {
                                passItem = {
                                    VALUES: passengers,
                                    SELECT_CUSTOMER_NO: 0,
                                    OLD_SELECTED: null,
                                    PRICE: 0,
                                    PRICE_CURRENCY: ''
                                };

                            }

                            flight.PASSENGERS.push(passItem);
                        }
                        items.push(flight);

                    }
                }
            }

            return items;
        }
        $scope.passengersChange = function (flightItem, passItem, items) {

            if (passItem.OLD_SELECTED != null) {
                $.each(items, function (ind, flight) {
                    $.each(flight.PASSENGERS, function (index, val) {
                        if (val.OLD_SELECTED != passItem.OLD_SELECTED) {
                            val.VALUES.push(passItem.OLD_SELECTED);
                        }
                    });
                });
            }


            if (passItem.SELECT_CUSTOMER_NO != null) {
                $.each(items, function (ind, flight) {
                    $.each(flight.PASSENGERS, function (index, val) {
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
                if (selected[0].AgeGroup == "I") {
                    passItem.PRICE = flightItem.INFANT_PRICE;
                    passItem.PRICE_CURRENCY = eventsCurrency + flightItem.INFANT_PRICE;
                }
                else if (selected[0].AgeGroup == "C") {
                    passItem.PRICE = flightItem.CHILD_PRICE;
                    passItem.PRICE_CURRENCY = eventsCurrency + flightItem.CHILD_PRICE;
                }
                else {
                    passItem.PRICE = flightItem.ADULT_PRICE;
                    passItem.PRICE_CURRENCY = eventsCurrency + flightItem.ADULT_PRICE;
                }
            }
            else {
                passItem.OLD_SELECTED = null;
                passItem.PRICE = 0;
                passItem.PRICE_CURRENCY = '';
            }

            var sumPrice = 0;
            $.each($scope.itemsOB, function (index, flights) {
                $.each(flights.PASSENGERS, function (index, passItem) {
                    sumPrice += passItem.PRICE;
                });
            });
            $.each($scope.itemsIB, function (index, flights) {
                $.each(flights.PASSENGERS, function (index, passItem) {
                    sumPrice += passItem.PRICE;
                });
            });
            $scope.totalPrice = sumPrice > 0 ? eventsCurrency + sumPrice.formatMoney(0, '.', ',') : "";
            setTimeout(function () {
                $("#PRD04 .TotalPrice.pie").attr("role", "alert");
            }, 3000);
            $("#PRD04 .TotalPrice.pie").removeAttr("role");

        }
        $scope.clearSelected = function () {
            var passengers = ARKIA2.WIZARD.getPassengers();
            for (var j = 0; j < 2; j++) {
                var flights = j == 0 ? $scope.itemsOB : $scope.itemsIB;
                $.each(flights, function (index, flight) {

                    $.each(flight.PASSENGERS, function (i, passItem) {
                        passItem.SELECT_CUSTOMER_NO = 0;
                        passItem.VALUES = passengers;
                        passItem.OLD_SELECTED = null;
                        passItem.PRICE = 0;
                        passItem.PRICE_CURRENCY = '';
                    });

                });
            }
        }
        $scope.returnToSelectFlights = function () {
            $('.msgBox').css('display', 'none');
            $("#PRD03").show();
            $("#PRD04").hide();
        }
    }],
    ValidateStep: function (stepnumber) {
        var isStepValid = true;
        var errors = new Array();

        ARKIA.WIZARD.SHUTTLE.reLoad = true;
        if (ARKIA.WIZARD.FLIGHTS.temPassflights) {
            for (var j = 0; j < 2; j++) {
                var flights = j == 0 ? ARKIA.WIZARD.FLIGHTS.temPassflights.itemsOB : ARKIA.WIZARD.FLIGHTS.temPassflights.itemsIB;
                $.each(flights, function (index, flight) {

                    $.each(flight.PASSENGERS, function (i, passItem) {
                        if (passItem.SELECT_CUSTOMER_NO == null || passItem.SELECT_CUSTOMER_NO == 0)
                            isStepValid = false;
                        //passItem.SELECT_CUSTOMER_NO.addClass('inputError');
                    });
                });
            }
        }


        if (!isStepValid) {
            errors.push(MSG69);
        }
        else {
            if (ARKIA.WIZARD.FLIGHTS.temPassflights) {
                for (var j = 0; j < 2; j++) {
                    var flights = j == 0 ? ARKIA.WIZARD.FLIGHTS.temPassflights.itemsOB : ARKIA.WIZARD.FLIGHTS.temPassflights.itemsIB;
                    if ($(".bodyMain.ltr").length) {
                        var dir = j == 0 ? "outbound" : "inbound";
                    }
                    else {
                        var dir = j == 0 ? "הלוך" : "חזור";
                    }
                    $.each(flights, function (index, flight) {
                        var flightSeats = flight.SEATS_NO;
                        var adults = 0;
                        var children = 0;
                        var infants = 0;

                        $.each(flight.PASSENGERS, function (i, passItem) {
                            if (passItem.OLD_SELECTED.AgeGroup == 'I') {
                                infants++;
                            }
                            else if (passItem.OLD_SELECTED.AgeGroup == 'C') {
                                children++;
                            }
                            else {
                                adults++;
                            }
                        });

                        if ((adults + children) > flightSeats) {
                            isStepValid = false;
                            if ($(".bodyMain.ltr").length) {
                                errors[errors.length] = MSG70.replace('{0}', dir).replace('{1}', 'form ' + flight.DEP_STATION_NAME + ' to ' + flight.ARR_STATION_NAME + ', at ' + flight.DEP_TIME);
                            }
                            else {
                                errors[errors.length] = MSG70.replace('{0}', dir).replace('{1}', 'מ' + flight.DEP_STATION_NAME + ' ל' + flight.ARR_STATION_NAME + ', בשעה ' + flight.DEP_TIME);
                            }
                        }
                        else if (infants > adults) {
                            isStepValid = false;
                            if ($(".bodyMain.ltr").length) {
                                errors[errors.length] = MSG71.replace('{0}', dir).replace('{1}', 'from ' + flight.DEP_STATION_NAME + ' to ' + flight.ARR_STATION_NAME + ', at ' + flight.DEP_TIME);
                            }
                            else {
                                errors[errors.length] = MSG71.replace('{0}', dir).replace('{1}', 'מ' + flight.DEP_STATION_NAME + ' ל' + flight.ARR_STATION_NAME + ', בשעה ' + flight.DEP_TIME);
                            }
                        }
                        else if ((infants + children) > 0 && adults == 0) {
                            isStepValid = false;
                            if ($(".bodyMain.ltr").length) {
                                errors[errors.length] = MSG72.replace('{0}', dir).replace('{1}', 'from ' + flight.DEP_STATION_NAME + ' to ' + flight.ARR_STATION_NAME + ', at ' + flight.DEP_TIME);
                            }
                            else {
                                errors[errors.length] = MSG72.replace('{0}', dir).replace('{1}', 'מ' + flight.DEP_STATION_NAME + ' ל' + flight.ARR_STATION_NAME + ', בשעה ' + flight.DEP_TIME);
                            }
                        }
                    });
                }
                if (isStepValid) {
                    ARKIA2.WIZARD.resetFlights();
                    for (var j = 0; j < 2; j++) {
                        var flights = j == 0 ? ARKIA.WIZARD.FLIGHTS.temPassflights.itemsOB : ARKIA.WIZARD.FLIGHTS.temPassflights.itemsIB;
                        $.each(flights, function (index, flight) {
                            var passenger = [];
                            $.each(flight.PASSENGERS, function (i, passItem) {
                                passenger.push(passItem.SELECT_CUSTOMER_NO);
                            });

                            ARKIA2.WIZARD.AddFlight(flight.FL_PRD_KEY, passenger);
                        });
                    }
                }
            }

        }
        if (!isStepValid) {
            errorValues[stepnumber] = ARKIA.WIZARD.createErrorListWizard(errors);
        }
        return isStepValid;
    }
}