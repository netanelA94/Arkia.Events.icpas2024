$(function () {
    if ($('#wizard').exists()) {
        ARKIA.WIZARD.SUMMARY.init();

    }
});

ARKIA.WIZARD.SUMMARY = {
    init: function () {



        //todelete for dev
        if (window.location.href.indexOf("dev") > -1 || window.location.href.indexOf("192.168.84.25") > -1) {
            $("#cbReg").prop('checked', true);
        }


        var handler = function () {
            $('#btnFinish').unbind('click', handler);


            var errors = new Array();
            $(".inputError").removeClass("inputError");
            var stepnumber = 7;
            var isStepValid = true;


            if ($("#cbReg").length > 0) {
                if (!$("#cbReg").is(':checked')) {
                    isStepValid = false;
                    $(".regulations").addClass('inputError');
                    errors.push(MSG103);
                    $('#btnFinish').bind('click', handler);
                }
            }

            if (isStepValid) {

                $(this).hide();
                $('#loader').show();

                var res = ARKIA2.WIZARD.getReservation();


                var DTO = {
                    reservationDetails: res,
                    region: res.REGION
                };

                $.ajax(
                    {
                        type: "POST",
                        url: "webmethods/AjaxMethods.aspx/CreateReservation",
                        data: JSON.stringify(DTO),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (response) {
                            var d = response.d;
                            if (d.ReturnCode != 0) {
                                if (d.ReturnCode == 333) { //כנס סגור או לא נמצא
                                    window.location = closeErrorPage;
                                }
                                else {
                                    window.location = errorPage + "?er=" + d.ReturnCode;
                                }
                            }
                            else {

                                isStepValid = d.ReservationSn != 0;
                                if (d.ReservationSn > 0) {
                                    var paymentResult = {
                                        amountToPay: d.AmountToPay,
                                        currencyCode: d.CurrencyCode,
                                        pricePlans: d.PricePlans,
                                        reservationSn: d.ReservationSn
                                    };
                                    sessionStorage.setItem("paymentResult", JSON.stringify(paymentResult));
                                    window.location = "https://" + location.hostname + "/" + APPFolfer + "/" + paymentPage;
                                }
                                else {
                                    $('#btnFinish').bind('click', handler);

                                    errors = d.ErrorMessages.Value;
                                    if (!d.ErrorReference.IsNull) {
                                        $.each(d.ErrorReference.Value, function (index, entry) {
                                            switch (entry) {
                                                case "RGS05":
                                                    ARKIA.WIZARD.FEES.reLoad = true;
                                                    break;
                                                case "PRD01":
                                                case "PRD02":
                                                    ARKIA.WIZARD.HOTELS.reLoad = true;
                                                    break;
                                                case "PRD03":
                                                case "PRD04":
                                                    ARKIA.WIZARD.FLIGHTS.reLoad = true;
                                                    break;
                                                case "PRD05":
                                                    ARKIA.WIZARD.PRODUCTS.PRD05.reLoad = true;
                                                    break;
                                                case "PRD06":
                                                    ARKIA.WIZARD.PRODUCTS.PRD06.reLoad = true;
                                                    break;
                                                case "PRD07":
                                                    ARKIA.WIZARD.PRODUCTS.PRD07.reLoad = true;
                                                    break;
                                                case "PRD13":
                                                    ARKIA.WIZARD.MEALS.PRD13.reLoad = true;
                                                    break;
                                                case "PRD09":
                                                case "PRD10":
                                                    ARKIA.WIZARD.SHUTTLE.reLoad = true;
                                                    break;
                                            }
                                        });
                                    }

                                    errorValues[stepnumber] = ARKIA.WIZARD.createErrorListWizard(errors);
                                    ARKIA.WIZARD.setError(stepnumber, !isStepValid);
                                    window.scrollTo(0, 170);
                                    $('#btnFinish').show();
                                    $('#loader').hide();
                                }
                            }

                        },
                        error: function (jqXHR, textStatus, errorThrown) {

                            window.location = errorPage;
                        }
                    });
            }
            else {
                errorValues[stepnumber] = ARKIA.WIZARD.createErrorListWizard(errors);
                ARKIA.WIZARD.setError(stepnumber, !isStepValid);
                window.scrollTo(0, 170);
            }

        };
        $('#btnFinish').bind('click', handler);
    },
    summaryCtrl: ['$scope', function ($scope) {
        $scope.totalPrice = '';
        $scope.feesItems = [];
        $scope.flightsItems = [];
        $scope.hotelsItems = [];
        $scope.productsItems = [];
        $scope.shuttlesItems = [];

        $scope.init = function () {
            var totalPrice = 0;
            var summaryFees = [];
            var summaryFlights = [];
            var summaryProducts = [];

            //todelete for dev
            if (window.location.href.indexOf("dev") > -1) {
                var res = ARKIA2.WIZARD.getReservation();
                console.log(res);
            }


            if (ARKIA.WIZARD.FEES != null && ARKIA.WIZARD.FEES.temfees != null) {
                // fees
                $.each(ARKIA.WIZARD.FEES.temfees, function (index, entry) {
                    var fee = {
                        name: entry.LATIN_FIRST_NAME + ' ' + entry.LATIN_LAST_NAME,
                        price: entry.SELECTED_FEE ? entry.SELECTED_FEE.PRICE : 0,
                        priceCurrency: entry.SELECTED_FEE ? entry.SELECTED_FEE.PRICE_CURRENCY : '',
                        feeName: entry.SELECTED_FEE ? entry.SELECTED_FEE.AP_NAME : ''
                    };
                    totalPrice += fee.price;
                    summaryFees.push(fee);
                });
            }



            $scope.feesItems = summaryFees;
            // Hotels
            if (ARKIA.WIZARD.HOTELS.roomsChecked != null) {
                $scope.hotelsItems = [];

                for (var room in ARKIA.WIZARD.HOTELS.roomsChecked.selectedRooms) {
                    var selectedRoom = {
                        ROOM_TYPE_NAME: ARKIA.WIZARD.HOTELS.roomsChecked.selectedRooms[room].ROOM.ROOM_TYPE_NAME,
                        BOARD: ARKIA.WIZARD.HOTELS.roomsChecked.boards.STR,
                        PARTY_TYPE_NAME: ARKIA.WIZARD.HOTELS.roomsChecked.selectedRooms[room].PARTY_TYPE.PARTY_TYPE_NAME,
                        PRICE_FORMATTED: ARKIA.WIZARD.HOTELS.roomsChecked.selectedRooms[room].PARTY_TYPE.PRICE_FORMATTED,
                        PRICE_SELECTED: ARKIA.WIZARD.HOTELS.roomsChecked.selectedRooms[room].PARTY_TYPE.PRICE_SELECTED,
                        CUSTOMERS: []
                    };
                    for (var customer in ARKIA.WIZARD.HOTELS.roomsChecked.selectedRooms[room].room_customers) {
                        var NAME = ARKIA.WIZARD.HOTELS.roomsChecked.selectedRooms[room].room_customers[customer].room_customer.LATIN_FIRST_NAME + " ";
                        NAME += ARKIA.WIZARD.HOTELS.roomsChecked.selectedRooms[room].room_customers[customer].room_customer.LATIN_LAST_NAME;
                        selectedRoom.CUSTOMERS.push({ NAME: NAME });
                    }
                    totalPrice += selectedRoom.PRICE_SELECTED;

                    $scope.hotelsItems.push(selectedRoom);
                }
                //            if (ARKIA.WIZARD.HOTELS.roomsChecked.selectedRooms && ARKIA.WIZARD.HOTELS.roomsChecked.selectedRooms.length > 1) {
                //                totalPrice += 79;
                //            }
                if ($scope.hotelsItems.length > 0) {
                    $scope.hotelName = ARKIA.WIZARD.HOTELS.roomsChecked.hotel.HOTEL_NAME;
                }
            }
            else {
                $scope.hotelsItems = [];
            }
            // End Hotels

            // Flights
            if (ARKIA.WIZARD.FLIGHTS.temPassflights) {
                for (var j = 0; j < 2; j++) {
                    var flights = j == 0 ? ARKIA.WIZARD.FLIGHTS.temPassflights.itemsOB : ARKIA.WIZARD.FLIGHTS.temPassflights.itemsIB;
                    $.each(flights, function (index, flight) {

                        var findflight = jQuery.grep(summaryFlights, function (f) {
                            return f.ARR_STATION_NAME == flight.ARR_STATION_NAME && f.DEP_STATION_NAME == flight.DEP_STATION_NAME
                        });

                        var flightsGroup;
                        if (findflight.length == 0) {
                            flightsGroup = {
                                ARR_STATION_NAME: flight.ARR_STATION_NAME,
                                DEP_STATION_NAME: flight.DEP_STATION_NAME,
                                DEP_DATE: j == 0 ? startDate : endDate,
                                FLIGHTS: []
                            };
                        }
                        else {
                            flightsGroup = findflight[0];
                        }
                        var flightItem = {
                            FLIGHT_DESC: $.trim(flight.CARRIER_NAME) + flight.FLIGHT_NO,
                            DEP_TIME: flight.DEP_TIME,
                            PASSENGERS: []
                        };

                        $.each(flight.PASSENGERS, function (i, passItem) {
                            var pass = {
                                name: passItem.OLD_SELECTED.LATIN_FIRST_NAME + ' ' + passItem.OLD_SELECTED.LATIN_LAST_NAME,
                                price: passItem.PRICE,
                                priceCurrency: passItem.PRICE_CURRENCY
                            };
                            totalPrice += passItem.PRICE;

                            flightItem.PASSENGERS.push(pass);
                        });

                        flightsGroup.FLIGHTS.push(flightItem);
                        if (findflight.length == 0) {
                            summaryFlights.push(flightsGroup);
                        }
                    });
                }
            }

            $scope.flightsItems = summaryFlights;


            //shuttlesBox
            var allPassengers = ARKIA2.WIZARD.getPassengers();
            summaryProducts = [];

            // Add Shuttles
            if (ARKIA.WIZARD.SHUTTLE.temproducts) {

                $.each(ARKIA.WIZARD.SHUTTLE.temproducts, function (indexPage, productsPage) {
                    $.each(productsPage, function (index, product) {

                        if (product.CHILDREN_PRD_NO > 0 || product.ADULTS_PRD_NO > 0) {
                            var adultsNum = product.ADULTS_PRD_NO > 0 ? product.ADULTS_PRD_NO : 0;
                            var childNum = product.CHILDREN_PRD_NO > 0 ? product.CHILDREN_PRD_NO : 0;




                            var productItem = {
                                name: product.AP_NAME,
                                number: adultsNum + childNum,
                                price: product.ADULT_PRICE * adultsNum + product.CHILD_PRICE * childNum,
                                PASSENGERS: []
                            };

                            $.each(product.PASSENGERS, function (i, passItem) {
                                var pp = jQuery.grep(allPassengers, function (value) {
                                    return value.CUSTOMER_NO == passItem.SELECT_CUSTOMER_NO;
                                });

                                var pass = {
                                    name: pp[0].FULL_NAME,
                                    price: passItem.PRICE,
                                    priceCurrency: passItem.PRICE_CURRENCY
                                };

                                productItem.PASSENGERS.push(pass);
                            });


                            totalPrice += productItem.price;
                            productItem.price = productItem.price > 0 ? eventsCurrency + productItem.price.formatMoney(0, '.', ',') : "ללא עלות";

                            summaryProducts.push(productItem);
                        }
                    });
                });
            }

            $scope.shuttlesItems = summaryProducts;

            // Add MEALS

            summaryProducts = [];

            if (ARKIA.WIZARD.MEALS.temproducts) {

                $.each(ARKIA.WIZARD.MEALS.temproducts, function (indexPage, productsPage) {
                    $.each(productsPage, function (index, product) {

                        if (product.CHILDREN_PRD_NO > 0 || product.ADULTS_PRD_NO > 0) {
                            var adultsNum = product.ADULTS_PRD_NO > 0 ? product.ADULTS_PRD_NO : 0;
                            var childNum = product.CHILDREN_PRD_NO > 0 ? product.CHILDREN_PRD_NO : 0;

                            var productItem = {
                                name: product.AP_NAME,
                                number: adultsNum + childNum,
                                price: product.ADULT_PRICE * adultsNum + product.CHILD_PRICE * childNum,
                                PASSENGERS: []
                            };

                            $.each(product.productsMeals, function (i, passItem) {
                                var pp = jQuery.grep(allPassengers, function (value) {
                                    return value.CUSTOMER_NO == passItem.SELECT_CUSTOMER_NO;
                                });

                                var pass = {
                                    name: pp[0].FULL_NAME,
                                    price: passItem.PRICE,
                                    priceCurrency: passItem.PRICE_CURRENCY
                                };

                                productItem.PASSENGERS.push(pass);
                            });

                            totalPrice += productItem.price;
                            productItem.price = productItem.price > 0 ? eventsCurrency + productItem.price.formatMoney(0, '.', ',') : "ללא עלות";

                            summaryProducts.push(productItem);
                        }
                    });
                });
            }

            //////////////////////

            // Add Products
            if (ARKIA.WIZARD.PRODUCTS.temproducts) {
                $.each(ARKIA.WIZARD.PRODUCTS.temproducts, function (indexPage, productsPage) {
                    $.each(productsPage, function (index, product) {

                        if (product.CHILDREN_PRD_NO > 0 || product.ADULTS_PRD_NO > 0) {
                            var adultsNum = product.ADULTS_PRD_NO > 0 ? product.ADULTS_PRD_NO : 0;
                            var childNum = product.CHILDREN_PRD_NO > 0 ? product.CHILDREN_PRD_NO : 0;

                            var show = {
                                name: product.AP_NAME,
                                number: adultsNum + childNum,
                                price: product.ADULT_PRICE * adultsNum + product.CHILD_PRICE * childNum,
                                PASSENGERS: []
                            };
                            $.each(product.PASSENGERS, function (i, passItem) {
                                var pp = jQuery.grep(allPassengers, function (value) {
                                    return value.CUSTOMER_NO == passItem.SELECT_CUSTOMER_NO;
                                });
                                var pass = {
                                    name: pp[0].FULL_NAME,
                                    price: pp[0].AgeGroup == "A" ? product.ADULT_PRICE : pp[0].AgeGroup == "C" ? product.CHILD_PRICE : product.INFANT_PRICE
                                };
                                pass.price = pass.price > 0 ? eventsCurrency + pass.price.formatMoney(0, '.', ',') : "ללא עלות";
                                show.PASSENGERS.push(pass);
                            });

                            totalPrice += show.price;
                            //show.price = show.price > 0 ? eventsCurrency + show.price.formatMoney(0, '.', ',') : "ללא עלות";

                            summaryProducts.push(show);
                        }
                    });
                });
            }

            $scope.productsItems = summaryProducts;
            // End products

            $scope.totalPrice = totalPrice > 0 ? eventsCurrency + totalPrice.formatMoney(0, '.', ',') : "";
        }
    }]
}