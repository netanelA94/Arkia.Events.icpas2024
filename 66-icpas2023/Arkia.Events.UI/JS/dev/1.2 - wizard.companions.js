ARKIA.WIZARD.COMPANIONS = {
    reLoad: true,
    temAcomp: null,
    accompaniedCtrl: ['$scope', function ($scope) {
        var years = new Array();
        var monthes = new Array();
        var days = new Array();

        var currentYear = new Date().getFullYear();
        var j = 0;
        for (var i = currentYear; i > currentYear - 100; i--) {
            years[j] = i;
            j++;
        }
        for (var i = 1; i < 13; i++) {
            monthes[i - 1] = i;
        }
        for (var i = 1; i < 32; i++) {
            days[i - 1] = i;
        }
        $scope.cmdtitles = [];
        $.each(titlesData, function (index, value) {
            $scope.cmdtitles.push({ "cmdtitle": value.Name, "value": value.Id });
        });
        $scope.cmdjobtitles = [];

        $.each(jobTitlesData, function (index, value) {
            $scope.cmdjobtitles.push({ "cmdjobtitle": value.Name, "value": value.Id });
        });
        $scope.cmdyears = years;
        $scope.cmdmonths = monthes;
        $scope.cmddays = days;

        var years = new Array();
        var monthes = new Array();
        var days = new Array();

        var currentYear = new Date().getFullYear();
        var j = 0;
        for (var i = currentYear - 5; i < currentYear + 10; i++) {
            years[j] = i;
            j++;
        }
        for (var i = 1; i < 13; i++) {
            monthes[i - 1] = i;
        }
        for (var i = 1; i < 32; i++) {
            days[i - 1] = i;
        }
        $scope.cmdtitles = [];
        $.each(titlesData, function (index, value) {
            $scope.cmdtitles.push({ "cmdtitle": value.Name, "value": value.Id });
        });
        $scope.cmdjobtitles = [];

        $.each(jobTitlesData, function (index, value) {
            $scope.cmdjobtitles.push({ "cmdjobtitle": value.Name, "value": value.Id });
        });
        $scope.cmdPyears = years;
        $scope.cmdPmonths = monthes;
        $scope.cmdPdays = days;

        $scope.items = [];
        var res;
        $scope.init = function () {
            if (ARKIA.WIZARD.COMPANIONS.reLoad) {
                res = ARKIA2.WIZARD.getReservation();

                if (res.COMPANIONS == null) {
                    $scope.items = [];
                    $scope.items.push({});
                }
                else {
                    var itemsList = res.COMPANIONS.Value;

                    for (var i = 0; i < itemsList.length; i++) {
                        itemsList[i].YEAR = parseInt(itemsList[i].DOB.substring(0, 4));
                        itemsList[i].MONTH = parseInt(itemsList[i].DOB.substring(4, 6));
                        itemsList[i].DAY = parseInt(itemsList[i].DOB.substring(6, 8));

                        itemsList[i].PASSPORT_YEAR = new Date(itemsList[i].EXPIRE_DATE).getFullYear();
                        itemsList[i].PASSPORT_MONTH = new Date(itemsList[i].EXPIRE_DATE).getUTCMonth() + 1;
                        itemsList[i].PASSPORT_DAY = new Date(itemsList[i].EXPIRE_DATE).getUTCDate() + 1;

                        if (itemsList[i].TITLE_CODE == 1) {
                            itemsList[i].TITLE_CODE_select = $scope.cmdtitles[0];
                        } else {
                            itemsList[i].TITLE_CODE_select = $scope.cmdtitles[1];
                        }

                        if (itemsList[i].JOB_TITLE_CODE != 0) {
                            itemsList[i].JOB_TITLE_CODE_select = $scope.cmdjobtitles[itemsList[i].JOB_TITLE_CODE - 1];
                        }
                    }
                    $scope.items = itemsList;
                }

                //var countArray = -1;
                //for (var k = 0; k < DDAdultsNo - 1; k++) {
                //    countArray++;
                //    $scope.items[countArray].AGE_GROUP = "מבוגר";
                //}
                //for (var k = 0; k < DDChildrenNo; k++) {
                //    countArray++;
                //    $scope.items[countArray].AGE_GROUP = "ילד";
                //}

                //for (var k = 0; k < DDInfantsNo; k++) {
                //    countArray++;
                //    $scope.items[countArray].AGE_GROUP = "תינוק";
                //}


                setTimeout(
                    function () {
                        $("[role='LATIN_LAST_NAME_ACM']").each(function () {
                            $(this).keyfilter(/[a-zA-Z\ ]/i);
                        });
                        $("[role='LATIN_FIRST_NAME_ACM']").each(function () {
                            $(this).keyfilter(/[a-zA-Z\ ]/i);
                        });
                        $("[role='PASSPORT_ACM']").each(function () {
                            $(this).keyfilter(/[0-9]/i);
                        });
                        $("[role='YEAR_ACM']").each(function () {
                            $(this).attr("aria-label", MSG427);
                        });
                        $("[role='MONTH_ACM']").each(function () {
                            $(this).attr("aria-label", MSG428);
                        });
                        $("[role='DAY_ACM']").each(function () {
                            $(this).attr("aria-label", MSG429);
                        });
                        $("[role='PASSPORT_YEAR_ACM']").each(function () {
                            $(this).attr("aria-label", MSG430);
                        });
                        $("[role='PASSPORT_MONTH_ACM']").each(function () {
                            $(this).attr("aria-label", MSG431);
                        });
                        $("[role='PASSPORT_DAY_ACM']").each(function () {
                            $(this).attr("aria-label", MSG432);
                        });
                        $("[role='accompDelete']").each(function (index) {
                            $(this).attr("aria-label", MSG433.replace('{0}', (index + 1)));
                        });
                        $("[role='TITLE_CODE_ACM']").attr("aria-label", MSG443);
                        $("[role='JOB_TITLE_CODE_ACM']").attr("aria-label", MSG444);
                        if ($(".bodyMain.ltr").length) {
                            $("[role='PASSPORT_ACM']").attr("placeholder", "passport number");
                            $("[role='LATIN_LAST_NAME_ACM'], [role='LATIN_FIRST_NAME_ACM']").each(function () {
                                $(this).attr("title", "in english");
                            });
                        }
                        else {
                            $("[role='PASSPORT_ACM']").attr("placeholder", "מספר דרכון");
                            $("[role='LATIN_LAST_NAME_ACM'], [role='LATIN_FIRST_NAME_ACM']").each(function () {
                                $(this).attr("title", "באנגלית");
                            });
                        };
                    }, 100);

                ARKIA.WIZARD.COMPANIONS.reLoad = false;
            }

            ARKIA.WIZARD.COMPANIONS.temAcomp = $scope.items;
        }
        //to Delete for dev
        //$scope.isDev = window.location.href.indexOf("dev") > -1 || window.location.href.indexOf("192.168.95") > -1;
        //$scope.numCompanies = 0;
        $scope.addItem = function () {
            if ($scope.items.length < MaxCompanions) {
                $scope.items.push({});
                setTimeout(function () {
                    $('.accompaniedRow:last select:first').focus();
                }, 100);
                if ($scope.items.length == MaxCompanions) {
                    $('.accompaniedAddLink').attr('aria-disabled', 'true');
                    $('.accompaniedAddLink').attr('tabindex', '-1');
                }
            }

            $scope.reset();

            setTimeout(
                function () {
                    $("[role='LATIN_LAST_NAME_ACM']").each(function () {
                        $(this).keyfilter(/[a-zA-Z\ ]/i);
                    });
                    $("[role='LATIN_FIRST_NAME_ACM']").each(function () {
                        $(this).keyfilter(/[a-zA-Z\ ]/i);
                    });
                    $("[role='PASSPORT_ACM']").each(function () {
                        $(this).keyfilter(/[0-9]/i);
                    });
                    $("[role='YEAR_ACM']").each(function () {
                        $(this).attr("aria-label", MSG427);
                    });
                    $("[role='MONTH_ACM']").each(function () {
                        $(this).attr("aria-label", MSG428);
                    });
                    $("[role='DAY_ACM']").each(function () {
                        $(this).attr("aria-label", MSG429);
                    });
                    $("[role='PASSPORT_YEAR_ACM']").each(function () {
                        $(this).attr("aria-label", MSG430);
                    });
                    $("[role='PASSPORT_MONTH_ACM']").each(function () {
                        $(this).attr("aria-label", MSG431);
                    });
                    $("[role='PASSPORT_DAY_ACM']").each(function () {
                        $(this).attr("aria-label", MSG432);
                    });
                    $("[role='accompDelete']").each(function (index) {
                        $(this).attr("aria-label", MSG433.replace('{0}', (index + 1)));
                    });
                    $("[role='TITLE_CODE_ACM']").attr("aria-label", MSG443);
                    $("[role='JOB_TITLE_CODE_ACM']").attr("aria-label", MSG444);
                    if ($(".bodyMain.ltr").length) {
                        $("[role='PASSPORT_ACM']").attr("placeholder", "passport number");
                        $("[role='LATIN_LAST_NAME_ACM'], [role='LATIN_FIRST_NAME_ACM']").attr("title", "in english");
                    }
                    else {
                        $("[role='PASSPORT_ACM']").attr("placeholder", "מספר דרכון");
                        $("[role='LATIN_LAST_NAME_ACM'], [role='LATIN_FIRST_NAME_ACM']").attr("title", "באנגלית");
                    }
                }, 100);
        }
        $scope.delete_item = function (item) {
            /* FIX FOR IE8 */
            if (!Array.prototype.indexOf) {
                Array.prototype.indexOf = function (item /*, fromIndex */) {
                    'use strict';
                    if (this == null) {
                        throw new TypeError();
                    }
                    var n, k, t = Object(this), len = t.length >>> 0;

                    if (len === 0) {
                        return -1;
                    }
                    n = 0;
                    if (arguments.length > 1) {
                        n = Number(arguments[1]);
                        if (n != n) { // shortcut for verifying if it's NaN
                            n = 0;
                        } else if (n != 0 && n != Infinity && n != -Infinity) {
                            n = (n > 0 || -1) * Math.floor(Math.abs(n));
                        }
                    }
                    if (n >= len) {
                        return -1;
                    }
                    for (k = n >= 0 ? n : Math.max(len - Math.abs(n), 0); k < len; k++) {
                        if (k in t && t[k] === item) {
                            return k;
                        }
                    }
                    return -1;
                };
            } /* END FIX */
            var index = $scope.items.indexOf(item);
            if ($scope.items.length > 1) {
                $scope.items.splice(index, 1);
                setTimeout(function () {
                    if (index < $scope.items.length) {
                        $("[role='TITLE_CODE_ACM']").eq(index).focus();
                    }
                    else {
                        $("[role='TITLE_CODE_ACM']:last").focus();
                    }
               }, 2000);
            }
            else if ($scope.items.length === 1) {
                $scope.items[0] = {};
                setTimeout(function () {
                    $("[role='TITLE_CODE_ACM']:first").focus();
                }, 100);
            }
            if ($scope.items.length < MaxCompanions) {
                $('.accompaniedAddLink').attr('aria-disabled', 'false');
                $('.accompaniedAddLink').attr('tabindex', '0');
            }
            $scope.reset();

        }
        $scope.reset = function () {

            ARKIA2.WIZARD.resetCompanions(true);
            ARKIA.WIZARD.FEES.reLoad = ARKIA.WIZARD.FLIGHTS.reLoad = ARKIA.WIZARD.HOTELS.reLoad = ARKIA.WIZARD.HOTELS.reLoad2 = ARKIA.WIZARD.PRODUCTS.PRD05.reLoad = ARKIA.WIZARD.PRODUCTS.PRD06.reLoad = ARKIA.WIZARD.PRODUCTS.PRD07.reLoad = ARKIA.WIZARD.MEALS.PRD13.reLoad = ARKIA.WIZARD.COMPANIONS.reLoad = ARKIA.WIZARD.SHUTTLE.reLoad = true;

        }
    }],
    ValidateStep: function (stepnumber) {
        var isStepValid = true;
        var alertMSG = '';
        var errors = new Array();
        var isEmptyRow = false;
        var reservation = ARKIA2.WIZARD.getReservation();

        if ($.trim($("[role='LATIN_LAST_NAME_ACM']").val()) !== ''
            || $("[role='TITLE_CODE_ACM']").val() >= '0'
            || $.trim($("[role='LATIN_FIRST_NAME_ACM']").val()) !== ''
            || $("[role='YEAR_ACM']").val() >= '0'
            || $("[role='MONTH_ACM']").val() >= '0'
            || $("[role='DAY_ACM']").val() >= '0'
            || ARKIA.WIZARD.COMPANIONS.temAcomp.length > 1) {

            $("[role='TITLE_CODE_ACM']").each(function (index, value) {
                if ($(this).val() < '0') {
                    isStepValid = false;
                    $(this).addClass('inputError');
                    errors[errors.length] = MSG50.replace('{0}', (index + 1));
                }
            });

            var englishRE = /[a-zA-Z\ ]/i;
            $("[role='LATIN_FIRST_NAME_ACM']").each(function (index, value) {
                if ($.trim($(this).val()).length > 0) {
                    if (!englishRE.test($.trim($(this).val()))) {
                        isStepValid = false;
                        $(this).addClass('inputError');
                        errors[errors.length] = MSG392.replace('{0}', (index + 1));
                    }
                }
            });

            $("[role='LATIN_LAST_NAME_ACM']").each(function (index, value) {
                if ($.trim($(this).val()).length > 0) {
                    if (!englishRE.test($.trim($(this).val()))) {
                        isStepValid = false;
                        $(this).addClass('inputError');
                        errors[errors.length] = MSG393.replace('{0}', (index + 1));
                    }
                }
            });

            $("[role='LATIN_LAST_NAME_ACM']").each(function (index, value) {
                if ($.trim($(this).val()).length < 2) {
                    isStepValid = false;
                    $(this).addClass('inputError');
                    errors[errors.length] = MSG51.replace('{0}', (index + 1));
                }
            });
            $("[role='LATIN_FIRST_NAME_ACM']").each(function (index, value) {
                if ($.trim($(this).val()).length < 2) {
                    isStepValid = false;
                    $(this).addClass('inputError');
                    errors[errors.length] = MSG52.replace('{0}', (index + 1));
                }
            });
            var passport = reservation.CUSTOMER['PASSPORT_NO'];
            for (var i = 0; i < $(".accompaniedRow [role='PASSPORT_ACM']").length; i++) {
                if ($.trim($(".accompaniedRow [role='PASSPORT_ACM']").eq(i).val()) == passport) {
                    isStepValid = false;
                    $(".accompaniedRow [role='PASSPORT_ACM']").eq(i).addClass('inputError');
                    errors[errors.length] = MSG425.replace('{0}', (i + 1));
                }
            }

            var adultsCC = 1;
            var childrenCC = 0;
            var infantsCC = 0;

            $("[role='YEAR_ACM']").each(function (index, value) {
                var parent = $(this).parent();
                var yearObj = $("[role='YEAR_ACM']", parent);
                var monthObj = $("[role='MONTH_ACM']", parent);
                var dayObj = $("[role='DAY_ACM']", parent);
                if (yearObj.val() < '0' || monthObj.val() < '0' || dayObj.val() < '0') {
                    isStepValid = false;
                    if (yearObj.val() < '0') {
                        yearObj.addClass('inputError');
                    }
                    if (monthObj.val() < '0') {
                        monthObj.addClass('inputError');
                    }
                    if (dayObj.val() < '0') {
                        dayObj.addClass('inputError');
                    }
                    errors[errors.length] = MSG53.replace('{0}', (index + 1));
                }
                else {
                    if (ARKIA.COMMON.isNotLogicalDate(dayObj.children(':selected').text(), monthObj.children(':selected').text()) || ARKIA.COMMON.isFutureDate(dayObj.children(':selected').text(), monthObj.children(':selected').text(), yearObj.children(':selected').text())) {
                        isStepValid = false;
                        dayObj.addClass('inputError');
                        monthObj.addClass('inputError');
                        errors[errors.length] = MSG54.replace('{0}', (index + 1));
                    }
                    if (dayObj.children(':selected').text() >= 29 && monthObj.children(':selected').text() == 2) {
                        if (ARKIA.COMMON.isNotLogicalFeb29(dayObj.children(':selected').text(), yearObj.children(':selected').text())) {
                            isStepValid = false;
                            dayObj.addClass('inputError');
                            monthObj.addClass('inputError');
                            errors[errors.length] = MSG54.replace('{0}', (index + 1));
                        }
                    }

                    var parts = startDate.split('/');
                    var eventStartDate = new Date(parts[2], parts[1] - 1, parts[0]);

                    var year = yearObj.children(':selected').text();
                    var month = monthObj.children(':selected').text();
                    var day = dayObj.children(':selected').text();
                    var birthDate = new Date(year, month - 1, day);
                    var age = eventStartDate.getFullYear() - birthDate.getFullYear();

                    var m = eventStartDate.getMonth() - birthDate.getMonth();
                    if (m < 0 || (m === 0 && eventStartDate.getDate() < birthDate.getDate())) {
                        age--;
                    }

                    var ageGroup = $("[role='AGE_GROUP']", parent);


                    if ((age > ChildAgeEnd && ageGroup.val() == "ילד") || (age > ChildAgeStart && ageGroup.val() == "תינוק") || (age < ChildAgeEnd && ageGroup.val() == "מבוגר")) {
                        isStepValid = false;
                        $(this).addClass('inputError');
                        errors[errors.length] = MSG338.replace('{0}', (index + 1));
                    }

                    if (age < ChildAgeStart) {
                        infantsCC++;
                    }
                    else if (age < ChildAgeEnd) {
                        childrenCC++;
                    }
                    else {
                        adultsCC++;
                    }
                    //ולידציה למקסימום 2 תינוקות מלווים
                    if (infantsCC > 2) {
                        isStepValid = false;
                        $("[role='YEAR_ACM']").addClass('inputError');
                        errors[errors.length] = MSG422;
                    }
                }
            });


            if (hasPassport) {
                $("[role='PASSPORT_ACM']").each(function (index, value) {
                    if ($.trim($(this).val()).length < 6) {
                        isStepValid = false;
                        $(this).addClass('inputError');
                        errors[errors.length] = MSG318.replace('{0}', (index + 1));
                    }
                });


                $("[role='PASSPORT_YEAR_ACM']").each(function (index, value) {
                    var parent = $(this).parent();
                    var yearObj = $("[role='PASSPORT_YEAR_ACM']", parent);
                    var monthObj = $("[role='PASSPORT_MONTH_ACM']", parent);
                    var dayObj = $("[role='PASSPORT_DAY_ACM']", parent);
                    if (yearObj.val() < '0' || monthObj.val() < '0' || dayObj.val() < '0') {
                        isStepValid = false;
                        if (yearObj.val() < '0') {
                            yearObj.addClass('inputError');
                        }
                        if (monthObj.val() < '0') {
                            monthObj.addClass('inputError');
                        }
                        if (dayObj.val() < '0') {
                            dayObj.addClass('inputError');
                        }
                        errors[errors.length] = MSG319.replace('{0}', (index + 1));
                    }
                    else {
                        if (ARKIA.COMMON.isNotLogicalDate(dayObj.children(':selected').text(), monthObj.children(':selected').text())) { //|| !ARKIA.COMMON.isFutureDate6Month(dayObj.children(':selected').text(), monthObj.children(':selected').text(), yearObj.children(':selected').text())) {
                            isStepValid = false;
                            dayObj.addClass('inputError');
                            monthObj.addClass('inputError');
                            errors[errors.length] = MSG319.replace('{0}', (index + 1));
                        }

                        if (dayObj.children(':selected').text() >= 29 && monthObj.children(':selected').text() == 2) {
                            if (ARKIA.COMMON.isNotLogicalFeb29(dayObj.children(':selected').text(), yearObj.children(':selected').text())) {
                                isStepValid = false;
                                dayObj.addClass('inputError');
                                monthObj.addClass('inputError');
                                errors[errors.length] = MSG319.replace('{0}', (index + 1));
                            }
                        }

                        else if (!ARKIA.COMMON.isFutureDate6Month(dayObj.children(':selected').text(), monthObj.children(':selected').text(), yearObj.children(':selected').text())) {
                            alertMSG += MSG337.replace('{0}', (index + 1));
                            alertMSG += "\n";
                        }


                    }
                });
            }


        }
        else {
            isEmptyRow = true;
        }
        if (isStepValid) {
            if (alertMSG != '')
                alert(alertMSG);
            ARKIA2.WIZARD.resetCompanions();

            if (!isEmptyRow) {
                for (var i = 0; i < ARKIA.WIZARD.COMPANIONS.temAcomp.length; i++) {
                    var passExpireDate = '';
                    if (hasPassport) {
                        passExpireDate = new Date(ARKIA.WIZARD.COMPANIONS.temAcomp[i].PASSPORT_YEAR, parseInt(ARKIA.WIZARD.COMPANIONS.temAcomp[i].PASSPORT_MONTH) - 1, ARKIA.WIZARD.COMPANIONS.temAcomp[i].PASSPORT_DAY)
                    }
                    ARKIA2.WIZARD.addCompanions(ARKIA.WIZARD.COMPANIONS.temAcomp[i].TITLE_CODE_select.value,
                        ARKIA.WIZARD.COMPANIONS.temAcomp[i].JOB_TITLE_CODE_select != null ? ARKIA.WIZARD.COMPANIONS.temAcomp[i].JOB_TITLE_CODE_select.value : 0,
                        ARKIA.WIZARD.COMPANIONS.temAcomp[i].LATIN_LAST_NAME, ARKIA.WIZARD.COMPANIONS.temAcomp[i].LATIN_FIRST_NAME,
                        ARKIA.WIZARD.COMPANIONS.temAcomp[i].YEAR, ARKIA.WIZARD.COMPANIONS.temAcomp[i].MONTH, ARKIA.WIZARD.COMPANIONS.temAcomp[i].DAY,
                        hasPassport == true ? ARKIA.WIZARD.COMPANIONS.temAcomp[i].PASSPORT_NO : null, hasPassport == true ? passExpireDate : null);
                }
            }
            //to Delete for dev - add accompanions automatic by selecting number
            //if (window.location.href.indexOf("dev") > -1 || window.location.href.indexOf("192.168.95") > -1) {
            //    if (ARKIA.RESERVATION.COMPANIONS) {
            //        ARKIA.WIZARD.COMPANIONS.temAcomp = [];
            //        ARKIA.RESERVATION.COMPANIONS.Value = [];
            //    }
            //    for (var i = 0; i < $('#accNumSelect').val() ; i++) {
            //        ARKIA2.WIZARD.addCompanions(1, 0, "Israeli", "Moshe", "1999", "2", "3", "345234535", new Date(2020, 2, 3));

            //    }
            //    ARKIA2.WIZARD.saveInSession();
            //    ARKIA.WIZARD.FEES.reLoad = ARKIA.WIZARD.FLIGHTS.reLoad = ARKIA.WIZARD.HOTELS.reLoad = ARKIA.WIZARD.HOTELS.reLoad2 = ARKIA.WIZARD.PRODUCTS.PRD05.reLoad = ARKIA.WIZARD.PRODUCTS.PRD06.reLoad = ARKIA.WIZARD.PRODUCTS.PRD07.reLoad = ARKIA.WIZARD.COMPANIONS.reLoad = ARKIA.WIZARD.SHUTTLE.reLoad = true;

            //}
        }
        if (!isStepValid) {
            errorValues[stepnumber] = ARKIA.WIZARD.createErrorListWizard(errors);
        }

        return isStepValid;
    }
}


