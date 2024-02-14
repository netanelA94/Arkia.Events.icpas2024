ARKIA.WIZARD.PRODUCTS = {
    temproducts: [],
    PRD05: {
        indexPage: 0,
        pageCode: 'PRD05',
        reLoad: true,
        validate1Ticket: true,
        includesEmbedPage: true,
        controllerId: "ng_Ctrl_PRD05_2",
        adults: [],
        children: [],
        init: function (data, ctrlObj, pageCode, indexPage) {
            var controllerId = this.controllerId;
            if (this.includesEmbedPage) {
                $("#btnAddPrdCon" + pageCode).click(function () {

                    var isStepValid = true;
                    var errors = new Array();
                    var stepnumber = 4;


                    if (isStepValid) {

                        var agc = ARKIA2.WIZARD.getAgeGroupCount();
                        var passCount = agc.adults + agc.children;

                        $("#addPrdPart1" + pageCode).hide();
                        $("#addPrdPart2" + pageCode).show();
                        $("#buttonNextAddPrd" + pageCode).show();

                        angular.element(document.getElementById(controllerId)).scope().init();
                        angular.element(document.getElementById(controllerId)).scope().$apply();
                    }
                    else {
                        errorValues[stepnumber] = ARKIA.WIZARD.createErrorListWizard(errors);
                    }
                    ARKIA.WIZARD.setError(stepnumber, !isStepValid);
                    window.scrollTo(0, 170);

                });
            }
            else {
                $("#btnAddPrdCon" + pageCode).hide();
                $("#buttonNextAddPrd" + pageCode).show();
            }

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
                        product.CHILD_PRICE_FMT2 = (product.CHILD_PRICE.formatMoney(0, '.', ',') + eventsCurrency);
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


                    var passengers = ARKIA2.WIZARD.getPassengers();

                    product.child = 0;
                    product.adult = 0;
                    product.adults = [];
                    product.children = [];
                    product.passengersA = [];
                    product.passengersC = [];
                    $.each(passengers, function (index, comp) {
                        if (!isChildPriceExists) {

                            var ageTemp = ARKIA2.WIZARD.getAgeByDate(comp.DOB.toString());

                            if (ageTemp >= product.CHILD_AGE_START) {
                                product.adult++;
                                product.adults.push(product.adult);
                                product.passengersA.push(comp);
                            }
                        }
                        else {
                            var ageTemp = ARKIA2.WIZARD.getAgeByDate(comp.DOB.toString());

                            if (ageTemp >= product.CHILD_AGE_END) {

                                product.adult++;
                                product.adults.push(product.adult);
                                product.passengersA.push(comp);
                            }
                            else if (product.CHILD_AGE_START <= ageTemp && ageTemp < product.CHILD_AGE_END) {

                                product.child++;
                                product.children.push(product.child);
                                product.passengersC.push(comp);
                            }
                        }

                    });


                });

                if (childPriceIsFree && $("#ageMinMsg", ctrlObj).length == 0) {
                    if ($("#infoBoxItems ul", ctrlObj).length > 0) {
                        $("#infoBoxItems ul", ctrlObj).append('<li id="ageMinMsg">' + MSG93.replace('{0}', data.d.ChildAgeStart) + '</li>');
                    }
                    else {
                        $("#infoBoxItems", ctrlObj).append('<div class="infoBox pieFix"><div class="infoBoxBubble"></div><ul><li id="ageMinMsg">' + MSG93.replace('{0}', data.d.ChildAgeStart) + '</li></ul></div></div></div>');
                    }
                }

                ARKIA.WIZARD.PRODUCTS.temproducts[indexPage] = products;

            }

            return {
                totalPrice: totalPrice,
                products: products,
                adults: adults,
                children: children,
                isChildPriceExists: isChildPriceExists
            };

        },
        productsCtrl: ['$scope', '$http', function ($scope, $http) {
            var prod = ARKIA.WIZARD.PRODUCTS.PRD05;
            var indexPage = prod.indexPage;
            $scope.totalPrice = '';
            $scope.products = [];
            $scope.adults = [];
            $scope.children = [];
            $scope.isChildPriceExists = false;
            $scope.totalPriceText = MSG130;
            $scope.init = function (ctrlObj, pageCode) {

                if (!$scope.products || prod.reLoad) {
                    $http({
                        url: 'webmethods/AjaxMethods.aspx/GetAdditionalProducts',
                        method: "POST",
                        data: "{pageCode:'" + pageCode + "'}",
                        headers: { 'Content-Type': 'application/json; charset=utf-8' }
                    })
                        .success(function (data, status, headers, config) {

                            prod.reLoad = false;

                            var retVal = prod.init(data, ctrlObj, pageCode, indexPage);

                            $scope.totalPrice = retVal.totalPrice;
                            $scope.products = retVal.products;
                            prod.adults = $scope.adults = retVal.adults;
                            prod.children = $scope.children = retVal.children;
                            $scope.isChildPriceExists = retVal.isChildPriceExists;

                            $("#showsLoader", ctrlObj).hide();
                            $("#showsContent", ctrlObj).show();
                            setTimeout(function () {
                                $("#ng_Ctrl_PRD05 #adultTickets").each(function () {
                                    $(this).attr("aria-label", $(this).parents(".feesRow").find(".colShowName").text() + ", " + $(this).parents(".feesRow").find("[role='ADULT_PRICE']").text() + ", " + $("#ng_Ctrl_PRD05 label#adultTicketsAmount").text());
                                });
                                $("#ng_Ctrl_PRD05 #childTickets").each(function () {
                                    $(this).attr("aria-label", $(this).parents(".feesRow").find(".colShowName").text() + ", " + $(this).parents(".feesRow").find("[role='CHILD_PRICE']").text() + ", " + $("#ng_Ctrl_PRD05 label#childTicketsAmount").text());
                                });
                                $("#ng_Ctrl_PRD05 .responsive .selShowTickets").each(function () {
                                    $(this).attr("aria-label", $(this).parent().prev().text() + " " + $(this).next().text());
                                });
                            }, 100);
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
                var prod = ARKIA.WIZARD.PRODUCTS.PRD05;
                var indexPage = prod.indexPage;
                var pageCode = prod.pageCode;
                $scope.products = [];

                var jumpPart = true;

                $.each(ARKIA.WIZARD.PRODUCTS.temproducts[indexPage], function (i, product) {

                    if ((product.ADULTS_PRD_NO > 0) || (product.CHILDREN_PRD_NO > 0)) {
                        product.PASSENGERS = [];

                        if (product.ADULTS_PRD_NO > 0) {
                            for (var i = 0; i < product.ADULTS_PRD_NO; i++) {

                                var adult = '';
                                if ($(".bodyMain.ltr").length) {
                                    adult = 'adult';
                                }
                                else {
                                    adult = 'מבוגר';
                                }

                                var passItem = {
                                    VALUES: product.passengersA,
                                    AGE_GROUP: adult + " (" + product.CHILD_AGE_END + "+)",
                                    SELECT_CUSTOMER_NO: product.ADULTS_PRD_NO == product.passengersA.length ? product.passengersA[i].CUSTOMER_NO : 0,
                                    OLD_SELECTED: null,
                                    PRICE: product.ADULT_PRICE,
                                    PRICE_CURRENCY: product.ADULT_PRICE_FMT
                                };

                                product.PASSENGERS.push(passItem);

                                if (product.ADULTS_PRD_NO != product.passengersA.length) {
                                    jumpPart = false;
                                }
                            }
                        }

                        if (product.CHILDREN_PRD_NO > 0) {
                            for (var i = 0; i < product.CHILDREN_PRD_NO; i++) {

                                var child = '';
                                if ($(".bodyMain.ltr").length) {
                                    child = 'child';
                                }
                                else {
                                    child = 'ילד';
                                }

                                var passItem = {
                                    VALUES: product.passengersC,
                                    AGE_GROUP: child + " (" + product.CHILD_AGE_START + "-" + product.CHILD_AGE_END + ")",
                                    SELECT_CUSTOMER_NO: product.CHILDREN_PRD_NO == product.passengersC.length ? product.passengersC[i].CUSTOMER_NO : 0,
                                    OLD_SELECTED: null,
                                    PRICE: product.CHILD_PRICE,
                                    PRICE_CURRENCY: product.CHILD_PRICE_FMT
                                };

                                product.PASSENGERS.push(passItem);

                                if (product.CHILDREN_PRD_NO != product.passengersC.length) {
                                    jumpPart = false;
                                }
                            }
                        }

                        $scope.products.push(product);
                    }
                });

                if (jumpPart) {
                    $("#buttonNextAddPrd" + pageCode).click();
                }


            },
                $scope.clearSelected = function () {

                    $scope.init();

                },
                $scope.passengersChange = function (productItem, passItem, items) {



                    if (passItem.OLD_SELECTED != null) {

                        $.each(productItem.PASSENGERS, function (index, val) {
                            if (val.OLD_SELECTED != passItem.OLD_SELECTED) {
                                val.VALUES.push(passItem.OLD_SELECTED);
                            }
                        });
                    }



                    if (passItem.SELECT_CUSTOMER_NO != null) {

                        $.each(productItem.PASSENGERS, function (index, val) {
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
            var indexPage = this.indexPage;
            var validate1Ticket = this.validate1Ticket;
            var includesEmbedPage = this.includesEmbedPage;
            var isStepValid = true;
            var errors = new Array();
            var isStepValidPrd = true;
            //הופעה אחת ללקוח
            //var sumPrdA = 0;
            //var sumPrdC = 0;

            $(".selectNamePrd05").each(function (index, value) {
                if ($(this).val() < '0') {
                    isStepValidPrd = false;
                    isStepValid = false;
                    $(this).addClass('inputError');
                }
            });


            if (ARKIA.WIZARD.PRODUCTS.temproducts[indexPage]) {
                $.each(ARKIA.WIZARD.PRODUCTS.temproducts[indexPage], function (index, product) {

                    //if (validate1Ticket) {

                        //הופעה אחת ללקוח
                        //if (product.ADULTS_PRD_NO)
                        //    sumPrdA += product.ADULTS_PRD_NO;
                        //if (product.CHILDREN_PRD_NO)
                        //    sumPrdC += product.CHILDREN_PRD_NO;

                        //if (sumPrdA > product.adults.length) {
                        //    isStepValid = false;
                        //}

                        //if (sumPrdC > product.children.length) {
                        //    isStepValid = false;
                        //}

                        //if (sumPrdA + sumPrdC > product.adults.length + product.children.length) {
                        //    isStepValid = false;
                        //}


                        //var sameDate = jQuery.grep(ARKIA.WIZARD.PRODUCTS.temproducts[indexPage], function (value) {
                        //    return value.EXECUTION_START_DATE == product.EXECUTION_START_DATE && value.CHILD_AGE_START == product.CHILD_AGE_START && value.CHILD_AGE_END == product.CHILD_AGE_END;
                        //});
                        //var sumTicketsDay = 0;
                        //$.each(sameDate, function (i, s) {
                        //    sumTicketsDay += s.ADULTS_PRD_NO ? s.ADULTS_PRD_NO : 0;
                        //});

                        //if (sumTicketsDay > product.adults.length) {
                        //    isStepValid = false;
                        //}

                        //sumTicketsDay = 0;
                        //$.each(sameDate, function (i, s) {
                        //    sumTicketsDay += s.CHILDREN_PRD_NO ? s.CHILDREN_PRD_NO : 0;
                        //});
                        //if (sumTicketsDay > product.children.length) {
                        //    isStepValid = false;
                        //}
                    //}
                });
            }

            if (!isStepValid) {
                if (!isStepValid && isStepValidPrd) {
                    ARKIA2.WIZARD.resetProducts((indexPage + 1));
                    errors.push(MSG133);
                    errorValues[stepnumber] = ARKIA.WIZARD.createErrorListWizard(errors);
                }
            }
            else if (!isStepValidPrd) {
                ARKIA2.WIZARD.resetProducts((indexPage + 1));
                errors.push(MSG480);
                errorValues[stepnumber] = ARKIA.WIZARD.createErrorListWizard(errors);
            }
            else {
                ARKIA2.WIZARD.resetProducts((indexPage + 1));
                if (ARKIA.WIZARD.PRODUCTS.temproducts) {

                    $.each(ARKIA.WIZARD.PRODUCTS.temproducts[indexPage], function (index, product) {
                        if (product.CHILDREN_PRD_NO > 0 || product.ADULTS_PRD_NO > 0) {

                            if (includesEmbedPage) {

                                var passenger = [];

                                $.each(product.PASSENGERS, function (index, val) {
                                    passenger.push(val.SELECT_CUSTOMER_NO);
                                });

                                product.CUSTOMERS_NO = passenger;

                                ARKIA2.WIZARD.AddProduct((indexPage + 1), product.AP_PRD_KEY, product.ADULTS_PRD_NO, product.CHILDREN_PRD_NO, product.CUSTOMERS_NO);
                            }
                            else {
                                ARKIA2.WIZARD.AddProduct((indexPage + 1), product.AP_PRD_KEY, product.ADULTS_PRD_NO, product.CHILDREN_PRD_NO);
                            }
                        }
                    });
                }

                return true;
            }
            return isStepValid;
        }
    }
}