$(function () {
    if ($('#wizard').exists()) {
        ARKIA.WIZARD.REGISTRATION.init();
    }
});



ARKIA.WIZARD.REGISTRATION = {
    reLoad: true,
    registrationCtrl: ['$scope', function ($scope) {
        $scope.init = function () {
            if (ARKIA.WIZARD.REGISTRATION.reLoad) {
                $(".skip.mainContent1").attr("style", "display:none;");
                $(".skip.mainContent2").attr("style", "display:block;");
                $(".skip.topMenu").attr("style", "display:block;");

                if (sessionStorage.getItem('CustomerID') !== null && sessionStorage.getItem('CustomerID').length > 1) {
                    $("[role='ID_NO']").val(sessionStorage.getItem('CustomerID'));
                }
                var years = new Array();
                var monthes = new Array();
                var days = new Array();

                var currentYear = new Date().getFullYear();
                var j = 0;
                for (var i = (currentYear - 12); i > currentYear - 88; i--) {
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

                var currentYear = new Date().getFullYear();
                var years = new Array();
                var j = 0;
                for (var i = currentYear - 5; i < currentYear + 11; i++) {
                    years[j] = i;
                    j++;
                }

                $scope.cmdPyears = years;
                $scope.cmdPmonths = monthes;
                $scope.cmdPdays = days;

                if (regTypeCode != 0) {
                    $('#divCPA').hide()
                };


                ARKIA.WIZARD.REGISTRATION.reLoad = false;

                //todelete for dev
                if (window.location.href.indexOf("dev") > -1 || window.location.href.indexOf("192.168.84.25") > -1) {
                    $('#lastname_eng').val("test");
                    $('#firstname_eng').val("test");
                    $('.emailDetails').val("test@test.com");
                    $('.phoneDetails').val("1234567");
                    $('.area_codeDetails').val("073");
                    $('.firstnameDetails').val("אלמוני");
                    $('.lastnameDetails').val("פלוני");
                    //$('#district').val("צפון");
                    $('#title').val(1);
                    $('#passport').val(1234567890);
                    $('#passportYear').val(2020);
                    $('#passportMonth').val(12);
                    $('#passportDay').val(17);
                    $('#DOBYear').val(1980);
                    $('#DOBMonth').val(7);
                    $('#DOBDay').val(25);

                }
            }
        }



    }],
    init: function () {




        ARKIA.WIZARD.REGISTRATION.autofillInputs();
        ARKIA.WIZARD.REGISTRATION.initKeyfilter();
        ARKIA.WIZARD.REGISTRATION.initDescriptions();

        if (hasRoommate) {
            $("#buttonNextDetails").attr('jumpStep', true);
        }
        else {
            $("#buttonNextDetails").removeAttr('jumpStep');
        }
        $('.close').attr('aria-label', MSG426);
    },
    autofillInputs: function () {
        // Fill in step 1
        var reservation = ARKIA2.WIZARD.getReservation();
        if (reservation !== null) {
            for (var key in reservation.CUSTOMER) {
                if (reservation.CUSTOMER.hasOwnProperty(key)) {
                    $("[role='" + key + "']").val(reservation.CUSTOMER[key]);
                }
            }
            //            var phones = reservation.CUSTOMER.PHONES.Value;
            //            for (var i = 0; i < phones.length; i++) {
            //               
            //                if (phones[i].FAX_YN === 'N') {
            //                    $("[role='PHONE" + (i + 1) + "']").val(phones[i].PHONE_NO);
            //                    $("[role='AREA_CODE" + (i + 1) + "']").val(phones[i].AREA_CODE);
            //                } else {
            //                    $("[role='FAX']").val(phones[i].PHONE_NO);
            //                    $("[role='AREA_CODE_FAX']").val(phones[i].AREA_CODE);
            //                }
            //            }
        }
        $('#id').attr('disabled', 'disabled');
    },
    initKeyfilter: function () {
        //$('#id').keyfilter(/[0-9]/i);
        $('.lastnameDetails').keyfilter(/[א-ת\'\ ]/i);
        $('.firstnameDetails').keyfilter(/[א-ת\'\ ]/i);
        $('#lastname_eng').keyfilter(/[a-zA-Z\ ]/i);
        $('#firstname_eng').keyfilter(/[a-zA-Z\ ]/i);
        $('.emailDetails').keyfilter(/[a-z0-9_\.\-@]/i);
        $('.phoneDetails').keyfilter(/[0-9]/i);
        $('#phone_ext').keyfilter(/[0-9]/i);
        $('#fax').keyfilter(/[0-9]/i);
        $('.area_codeDetails').keyfilter(/[0-9]/i);
        $('#area_code_ext').keyfilter(/[0-9]/i);
        $('#area_code_fax').keyfilter(/[0-9]/i);
        $('#passport').keyfilter(/[0-9]/i);
        //$('.comment_1').keyfilter(/[א-תa-zA-Z\ ]/i);
        // $('.comment_2').keyfilter(/[א-תa-zA-Z\ ]/i);
    },
    initDescriptions: function () {
        $("[role='TITLE_CODE']").attr("aria-label", MSG443);
        $("[role='JOB_TITLE_CODE']").attr("aria-label", MSG444);
        $("[role='YEAR']").attr("aria-label", MSG427);
        $("[role='MONTH']").attr("aria-label", MSG428);
        $("[role='DAY']").attr("aria-label", MSG429);
        $("[role='PASSPORT_YEAR']").attr("aria-label", MSG430);
        $("[role='PASSPORT_MONTH']").attr("aria-label", MSG431);
        $("[role='PASSPORT_DAY']").attr("aria-label", MSG432);
        $(".area_codeDetails").attr("aria-label", MSG434);
        $("#area_code_ext").attr("aria-label", MSG441);
        $("#area_code_fax").attr("aria-label", MSG442);
        $('#ng_Ctrl_RGS03 input:disabled').attr('aria-disabled', 'true');
    },
    ValidateStep: function (stepnumber) {
        //todelete for dev
        if (window.location.href.indexOf("dev") > -1 || window.location.href.indexOf("192.168.84.25") > -1) {
            $("#title").val("1");
            $('#passport').val(1234567890);
            $('#passportYear').val(10);
            $('#passportMonth').val(10);
            $('#passportDay').val(15);
            $('#DOBYear').val(33);
            $('#DOBMonth').val(7);
            $('#DOBDay').val(25);
        }
        var isStepValid = true;
        var errors = new Array();
        if ($("#title").children(':selected').val() == '') {
            isStepValid = false;
            $('#title').addClass('inputError');
            errors[errors.length] = MSG40;
        }
        if ($.trim($('.lastnameDetails').val()).length < 2) {
            isStepValid = false;
            $('.lastnameDetails').addClass('inputError');
            errors[errors.length] = MSG41;
        }
        if ($.trim($('.firstnameDetails').val()).length < 2) {
            isStepValid = false;
            $('.firstnameDetails').addClass('inputError');
            errors[errors.length] = MSG42;
        }
        if ($.trim($('.phoneDetails').val()).length < 7) {
            isStepValid = false;
            $('.phoneDetails').addClass('inputError');
            errors[errors.length] = MSG43;
        }
        if ($.trim($('.area_codeDetails').val()).length < 1) {
            isStepValid = false;
            $('.area_codeDetails').addClass('inputError');
            if ($.trim($('.phoneDetails').val()).length > 6) {
                errors[errors.length] = MSG43;
            }
        }
        else {
            var phone = $.trim($('.area_codeDetails').val()) + $.trim($('.phoneDetails').val());
            if (phone === sessionStorage.getItem('PhoneRoomate1')) {
                isStepValid = false;
                $('.area_codeDetails, .phoneDetails').addClass('inputError');
                errors[errors.length] = MSG439;
            }
            else if (phone === sessionStorage.getItem("PhoneRoomate2")) {
                isStepValid = false;
                $('.area_codeDetails, .phoneDetails').addClass('inputError');
                errors[errors.length] = MSG440;
            }

        }
        if ($.trim($('.emailDetails').val()).length < 5) {
            isStepValid = false;
            $('.emailDetails').addClass('inputError');
            errors[errors.length] = MSG44;
        } else if (!ARKIA.VALIDATE.RE_EMAIL.test($.trim($('.emailDetails').val()))) {
            isStepValid = false;
            $('.emailDetails').addClass('inputError');
            errors[errors.length] = MSG44;
        }
        if ($.trim($('#lastname_eng').val()).length < 2) {
            isStepValid = false;
            $('#lastname_eng').addClass('inputError');
            errors[errors.length] = MSG46;
        }
        if ($.trim($('#firstname_eng').val()).length < 2) {
            isStepValid = false;
            $('#firstname_eng').addClass('inputError');
            errors[errors.length] = MSG47;
        }

        var englishRE = /[a-zA-Z\ ]/i;
        if ($.trim($('input[id$="firstname_eng"]').val()).length > 0) {
            if (!englishRE.test($.trim($('input[id$="firstname_eng"]').val()))) {
                isStepValid = false;
                $('#firstname_eng').addClass('inputError');
                errors[errors.length] = MSG390;
            }
        }
        if ($.trim($('input[id$="lastname_eng"]').val()).length > 0) {
            if (!englishRE.test($.trim($('input[id$="lastname_eng"]').val()))) {
                isStepValid = false;
                $('#lastname_eng').addClass('inputError');
                errors[errors.length] = MSG391;
            }
        }

        var hebrewRE = /^[א-ת\'\-\(\) ]*$/;
        if ($.trim($('.firstnameDetails').val()).length > 0) {
            if (!hebrewRE.test($.trim($('.firstnameDetails').val()))) {
                isStepValid = false;
                $('.firstnameDetails').addClass('inputError');
                errors[errors.length] = MSG394;

            }
        }
        if ($.trim($('.lastnameDetails').val()).length > 0) {
            if (!hebrewRE.test($.trim($('.lastnameDetails').val()))) {
                isStepValid = false;
                $('.lastnameDetails').addClass('inputError');
                errors[errors.length] = MSG395;

            }
        }

        //external phone
        if ($.trim($('#phone_ext').val()).length > 0 || $.trim($('#area_code_ext').val()).length > 0) {
            if ($.trim($('#phone_ext').val()).length < 7) {
                isStepValid = false;
                $('#phone_ext').addClass('inputError');
                errors[errors.length] = MSG48;
            }
            if ($.trim($('#area_code_ext').val()).length < 1) {
                isStepValid = false;
                $('#area_code_ext').addClass('inputError');
                if ($.trim($('#phone_ext').val()).length > 6) {
                    errors[errors.length] = MSG48;
                }
            }
        } //fax
        //if ($.trim($('#fax').val()).length > 0 || $.trim($('#area_code_fax').val()).length > 0) {
        //    if ($.trim($('#fax').val()).length < 7) {
        //        isStepValid = false;
        //        $('#fax').addClass('inputError');
        //        errors[errors.length] = MSG49;
        //    }
        //    if ($.trim($('#area_code_fax').val()).length < 1) {
        //        isStepValid = false;
        //        $('#area_code_fax').addClass('inputError');
        //        if ($.trim($('#fax').val()).length > 6) {
        //            errors[errors.length] = MSG49;
        //        }
        //    }
        //}
        //if (!$('#district').val()) {
        //    isStepValid = false;
        //    $('#district').addClass('inputError');
        //    errors[errors.length] = MSG129;
        //}

        if ($("#CPA").children(':selected').val() == '' && regTypeCode == 0) {
            isStepValid = false;
            $('#CPA').addClass('inputError');
            errors[errors.length] = MSG370;
        }

        //if ($("#route").children(':selected').val() == '') {
        //    isStepValid = false;
        //    $('#route').addClass('inputError');
        //    errors[errors.length] = MSG200;
        //}

        var hasPassport = $('#passport').length;

        if (hasPassport) {
            if ($.trim($('#passport').val()).length < 6) {
                isStepValid = false;
                $('#passport').addClass('inputError');
                errors[errors.length] = MSG316;
            }

            var yearPObj = $("#passportYear");
            var monthPObj = $("#passportMonth");
            var dayPObj = $("#passportDay");

            if (yearPObj.val() < '0' || monthPObj.val() < '0' || dayPObj.val() < '0') {
                isStepValid = false;
                if (yearPObj.val() < '0') {
                    yearPObj.addClass('inputError');
                }
                if (monthPObj.val() < '0') {
                    monthPObj.addClass('inputError');
                }
                if (dayPObj.val() < '0') {
                    dayPObj.addClass('inputError');
                }
                errors[errors.length] = MSG317;
            }
            else if (ARKIA.COMMON.isNotLogicalDate(dayPObj.children(':selected').text(), monthPObj.children(':selected').text())) {  //|| !ARKIA.COMMON.isFutureDate6Month(dayObj.children(':selected').text(), monthObj.children(':selected').text(), yearObj.children(':selected').text())) {
                isStepValid = false;
                dayPObj.addClass('inputError');
                monthPObj.addClass('inputError');
                errors[errors.length] = MSG317;
            }

            if (dayPObj.children(':selected').text() >= 29 && monthPObj.children(':selected').text() == 2) {
                if (ARKIA.COMMON.isNotLogicalFeb29(dayPObj.children(':selected').text(), yearPObj.children(':selected').text())) {
                    isStepValid = false;
                    dayPObj.addClass('inputError');
                    monthPObj.addClass('inputError');
                    errors[errors.length] = MSG317;
                }
            }


            var yearObj = $("#DOBYear");
            var monthObj = $("#DOBMonth");
            var dayObj = $("#DOBDay");

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
                errors[errors.length] = MSG322;
            }
            else if (ARKIA.COMMON.isNotLogicalDate(dayObj.children(':selected').text(), monthObj.children(':selected').text())) {  //|| !ARKIA.COMMON.isFutureDate6Month(dayObj.children(':selected').text(), monthObj.children(':selected').text(), yearObj.children(':selected').text())) {
                isStepValid = false;
                dayObj.addClass('inputError');
                monthObj.addClass('inputError');
                errors[errors.length] = MSG322;
            }

            if (dayObj.children(':selected').text() >= 29 && monthObj.children(':selected').text() == 2) {
                if (ARKIA.COMMON.isNotLogicalFeb29(dayObj.children(':selected').text(), yearObj.children(':selected').text())) {
                    isStepValid = false;
                    dayObj.addClass('inputError');
                    monthObj.addClass('inputError');
                    errors[errors.length] = MSG322;
                }
            }
        }
        //if ($.trim($('#comment_1').val()).length > 0 && $.trim($('#comment_1').val()).length === 1) {
        //    isStepValid = false;
        //    $('#comment_1').addClass('inputError');
        //    errors[errors.length] = MSG423;
        //}
        //if ($.trim($('#comment_2').val()).length > 0 && $.trim($('#comment_2').val()).length === 1) {
        //    isStepValid = false;
        //    $('#comment_2').addClass('inputError');
        //    errors[errors.length] = MSG424;
        //}

        if (isStepValid) {

            if (hasPassport) {
                if (!ARKIA.COMMON.isFutureDate6Month(dayPObj.children(':selected').text(), monthPObj.children(':selected').text(), yearPObj.children(':selected').text())) {
                    alert(MSG336);
                }

                sessionStorage.setItem('userEmail', $('.emailDetails').val());
                var passExpireDate = new Date(yearPObj.children(':selected').text(), parseInt(monthPObj.children(':selected').text()) - 1, dayPObj.children(':selected').text());

            }
            if ($("#CPA").children(':selected').val() == '7' && regTypeCode == 0)
                alert(MSG371);

            if ((ARKIA.RESERVATION.CUSTOMER !== null) && ($("#lastname_eng").val().toLowerCase() != (ARKIA.RESERVATION.CUSTOMER.LATIN_LAST_NAME).toLowerCase() ||
                $("#firstname_eng").val().toLowerCase() != (ARKIA.RESERVATION.CUSTOMER.LATIN_FIRST_NAME).toLowerCase())) {
                ARKIA2.WIZARD.resetCompanions(true);
                ARKIA.WIZARD.FEES.reLoad = ARKIA.WIZARD.FLIGHTS.reLoad = ARKIA.WIZARD.HOTELS.reLoad = ARKIA.WIZARD.HOTELS.reLoad2 = ARKIA.WIZARD.PRODUCTS.PRD05.reLoad = ARKIA.WIZARD.PRODUCTS.PRD06.reLoad = ARKIA.WIZARD.PRODUCTS.PRD07.reLoad = ARKIA.WIZARD.MEALS.PRD13.reLoad = ARKIA.WIZARD.COMPANIONS.reLoad = true;
            }


            ARKIA2.WIZARD.setCustomer($("#title").val() != "" ? $("#title").val() : 0,
                $("#jobtitle").val() != "" ? $("#jobtitle").val() : 0,
                $(".idDetails").val(),
                $(".lastnameDetails").val(),
                $(".firstnameDetails").val(),
                $("#lastname_eng").val(),
                $("#firstname_eng").val(),
                $.trim($('.emailDetails').val()),
                $(".area_codeDetails").val(),
                $(".phoneDetails").val(),
                $("#area_code_ext").val(),
                $("#phone_ext").val(),
                $("#area_code_fax").val() ? $("#area_code_fax").val() : null,
                $("#fax").val() ? $("#fax").val() : null,
                hasPassport ? $("#passport").val() : null,
                hasPassport ? passExpireDate : null,
                hasPassport ? yearObj.children(':selected').text() : null,
                hasPassport ? monthObj.children(':selected').text() : null,
                hasPassport ? dayObj.children(':selected').text() : null,
                //  null,//$("#district").val(),
                regTypeCode == 0 ? $('#CPA').val() : regTypeCode,
                null,
                null,
                null, //$('#route').val(),
                null,
                null,
                null,
                null
            );

            var DTO = {
                idNo: $(".idDetails").val(),
                phone1: $(".area_codeDetails").val() + $(".phoneDetails").val(),
                phone2: $("#area_code_ext").val() + $("#phone_ext").val(),
                email: $.trim($('.emailDetails').val()),
                customerName: $(".firstnameDetails").val() + " " + $(".lastnameDetails").val(),
                regTypeCode: regTypeCode == 0 ? $('#CPA').val() : regTypeCode
            };

            $.ajax(
                {
                    type: "POST",
                    url: "webmethods/AjaxMethods.aspx/UpdateAuthentucation",
                    data: JSON.stringify(DTO),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                    }
                });

        }
        if (!isStepValid) {
            errorValues[stepnumber] = ARKIA.WIZARD.createErrorListWizard(errors);
        }
        return isStepValid;
    }
}
