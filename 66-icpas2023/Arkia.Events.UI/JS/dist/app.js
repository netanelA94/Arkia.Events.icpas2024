/*============================================================================================*/
/* 1.EXPAND JQUERY FUNCTIONALITY                                                              */
/*============================================================================================*/
jQuery.fn.exists = function () {
    return this.length > 0;
};

var errorValues = [];
var errorPage = "./error";
var paymentPage = "payment";
var closeErrorPage = "./close-error";

/*============================================================================================*/
/* APPLICATION GLOBAL VARIABLE: this is the "namespace" for all the js related actions        */
/*============================================================================================*/
var ARKIA = {
    COMMON: {
        /*
        check if browser version is ie and if it is ie8
        -------------------------------------------------------------------------------------*/
        isIE8: function () {
            return ($.browser.msie && parseInt($.browser.version, 10) < 9);
        },
        showMessageBox: function (errors) {
            $(".msgBox .content").empty();
            var errList = '<ul>';
            $.each(errors, function (errNum) {
                errList += '<li>' + errors[errNum] + '</li>';
            });
            (errList + '</ul>');
            $(".msgBox .content").html(errList);
            $(".bodyMain .msgBox").css('display', 'block');

        },
        /*----------------------------------------------------------------------------------------------------------------*/
        isNotLogicalDate: function (d, m) {
            d = parseInt(d, 10);
            m = parseInt(m, 10);
            return ((m == 4 || m == 6 || m == 9 || m == 11) && d == 31);
        },
        /*----------------------------------------------------------------------------------------------------------------*/
        isNotLogicalFeb29: function (d, y) {
            var isleap = (y % 4 == 0 && (y % 100 != 0 || y % 400 == 0));
            return (d > 29 || (d == 29 && !isleap));
        },
        log: function (m) {
            try {
                console.log(m);
            }
            catch (e) { }
        },
        /*----------------------------------------------------------------------------------------------------------------*/
        isFutureDate: function (d, m, y) {
            var date = new Date(y, m - 1, d, 0, 0, 0, 0);
            return (date > new Date());
        },
        isFutureDate6Month: function (d, m, y) {
            var date = new Date(y, m - 1, d, 0, 0, 0, 0);
            var x = 6; //or whatever offset
            var CurrentDate = new Date();
            CurrentDate.setMonth(CurrentDate.getMonth() + x);
            return (date > CurrentDate);
        },
       
        /*
        get dialogs/modals overlay:
        -------------------------------------------------------------------------------------*/
        getOverlay: function (elm, settings) {
            var defaults = {
                color: '#213154',
                speed: 500,
                opacity: 0.5,
                close: 'geekster',
                closeOnClick: false,
                closeOnEsc: false,
                closeSpeed: 0,
                onBeforeClose: null,
                load: false,
                effect: 'default'
            };
            var settings = $.extend(defaults, settings);

            $(elm).overlay(
            {
                mask: {
                    color: settings.color,
                    loadSpeed: settings.speed,
                    opacity: settings.opacity
                },
                close: settings.closeClass,
                closeOnClick: settings.closeOnClick,
                closeOnEsc: settings.closeOnEsc,
                closeSpeed: settings.closeSpeed,
                onBeforeClose: settings.onBeforeClose,
                load: settings.load,
                effect: settings.effect
            });
            $(elm).data("overlay").load();
        },
        /*
        close dialogs/modals overlay:
        -------------------------------------------------------------------------------------*/
        closeOverlay: function (elm) {
            $(elm).overlay().close();
        }
    },
    VALIDATE: {
        RE_EMAIL: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/,
        RE_VALID_PHONE_COUNTRY: /^[0-9]{1,3}$/,
        RE_VALID_PHONE_AREA: /^[0-9]{1,3}$/,
        RE_VALID_PHONE_NUM: /^[0-9]{7}$/,
        RE_PASS_LEN: /^.{6,32}/,
        RE_WS: /\S/,
        //validate israeli id number
        validateID: function (id) {
            if (id.length > 0) {
                var sum = 0;
                var p = 2;
                for (var i = id.length - 2; i >= 0; i--) {
                    var number = p * parseInt(id.toString().charAt(i).toString());
                    sum += parseInt(number / 10) + parseInt(number % 10);
                    p = p == 2 ? 1 : 2;
                }
                var checkDigit = parseInt(id.toString().charAt(id.length - 1).toString());
                return ((checkDigit + sum) % 10 == 0);
            }
            return false;
        },
        isValidPhone: function (phone) {
            //fix for default value problem
            phone[3] = $.trim(phone[3]);
            var flag = true,
            RE_VALID_PHONE_COUNTRY = /^[0-9]{2,3}/,
            RE_VALID_PHONE_AREA = /^[0-9]{1,3}/,
            RE_VALID_PHONE_NUM = /^[0-9]{7}/;
            if (!RE_VALID_PHONE_NUM.test(phone[1]) || !RE_VALID_PHONE_AREA.test(phone[2]) || !RE_VALID_PHONE_COUNTRY.test(phone[3])) {
                flag = false;
            }
            return flag;
        }
    }
};




Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

$(function () {
    if ($('#RGS02').exists()) {
        ARKIA.RGS02.init();
    }
});

ARKIA.RGS02 = {

    init: function () {
        $('input').keypress(function (e) {
            if (e.which == 13) {
                return false;
            }
        });

        $('input[id$="txtRoommate1Area_code"]').keyfilter(/[0-9]/i);
        $('input[id$="txtRoommate2Area_code"]').keyfilter(/[0-9]/i);
        $('input[id$="txtRoommate1Phone"]').keyfilter(/[0-9]/i);
        $('input[id$="txtRoommate2Phone"]').keyfilter(/[0-9]/i);
        $('input[id$="txtRoommate1Name"]').keyfilter(/[א-תa-zA-Z\ ]/i);
        $('input[id$="txtRoommate2Name"]').keyfilter(/[א-תa-zA-Z\ ]/i);
        $('input[id$="txtRoommate1Id"]').keyfilter(/[0-9]/i);
        $('input[id$="txtRoommate2Id"]').keyfilter(/[0-9]/i);
        $('input[id*="rbCycle"]').attr('title', MSG435);
        $('.roommateArea_code').attr("aria-label", MSG434);
        $('.close').attr('aria-label', MSG426);
        $('input[type="radio"]').attr('name', 'rbLaps');
        $('input[type="radio"]:disabled').attr('aria-disabled', 'true');
        $('a[id$="btnContinue"]').bind('click', ARKIA.RGS02.onContinue);

        //var cycleID = sessionStorage.getItem('cycleID');
        //if (cycleID) {
        //    $("input[name = 'rbLaps']").eq(cycleID - 1).attr("checked", "true");
        //    //$('[id$="txtRoommate1Name"]').val(sessionStorage.getItem('Roomate1Name'));
        //    //$('[id$="txtRoommate1Id"]').val(sessionStorage.getItem('Roomate1Id'));
        //    if (cycleID == '2') {
        //        $(".roommatesRow").show();
        //        //$('[id$="txtRoommate2Name"]').val(sessionStorage.getItem('Roomate2Name'));
        //        //$('[id$="txtRoommate2Id"]').val(sessionStorage.getItem('Roomate2Id'));
        //    }
        //}
        //if (window.location.href.indexOf("dev") > -1 || window.location.href.indexOf("192.168.95") > -1) {
        //    $('input[id$="txtRoommate1Name"]').val("test");
        //    $('input[id$="txtRoommate1Phone"]').val("203807490");
        //    $("input[name = 'rbLaps']:first").attr("checked", "true");
        //    $(".roommatesRow.rr1").show();
        //}
        if ($(".bodyMain.ltr").length) {
            $(".phoneWrapper").attr("dir", "rtl");
        }

        $(".lapWrapper li:has(.aspNetDisabled) .lapName").attr("style", "color: red");

        //$("input[name = 'rbLaps']").change(function () {
        //    var cycle_id = $("input[name='rbLaps']:checked").parent().attr('data-cycleid');
        //    sessionStorage.setItem('cycleID', cycle_id);
        //    if (cycle_id == "1") {
        //        $(".roommatesRow.rr2").hide();
        //    }
        //    else {
        //        $(".roommatesRow").show();
        //    }
        //});
        //$(".ddlRoommates").change(function () {
        //    if ($(this).val() == 0) {
        //        $(".roommatesRow").hide();
        //    }
        //    else {
        //        if ($(this).val() == 1) {
        //            $(".roommatesRow.rr1").show();
        //            $(".roommatesRow.rr2").hide();
        //        }
        //        else {
        //            $(".roommatesRow").show();
        //        }
        //    }

        //});

        $(".roommateClear").click(function () {
            $(".roommatesRow input").val('');
            $(".IdNoExists").css("display", "none");
        });
        $(".roommateClear").keydown(function (e) {
            if (e.keyCode == 13) {
                $(".roommatesRow input").val('');
                $(".IdNoExists").css("display", "none");
            }
        });
    },
    onContinue: function () {
        var isError = false;
        var englishRE = /^[a-zA-Z\ ]*$/;
        var hebrewRE = /^[א-ת\ ]*$/;
        var numberRE = /^[0-9]*$/;



        $(".inputError").removeClass("inputError");
        $(".msgBox").css('display', 'none');
        var errors = new Array();
        if (!$("input[name='rbLaps']:checked").val()) {
            errors[errors.length] = MSG39;
            $("input[name = 'rbLaps']").addClass('inputError');
            $('.close', $(".msgBox")).click(function () {
                $(".msgBox").fadeOut("normal");

            });
            isError = true;

        }
        //name
        if ($('[id$="txtRoommate1Name"]:visible').length && $.trim($('[id$="txtRoommate1Name"]').val()).length < 2) {
            errors.push(MSG326);
            $('[id$="txtRoommate1Name"]').addClass('inputError');
            isError = true;
        }
        if ($('[id$="txtRoommate2Name"]:visible').length && $.trim($('[id$="txtRoommate2Name"]').val()).length < 2) {
            errors.push(MSG327);
            $('[id$="txtRoommate2Name"]').addClass('inputError');
            isError = true;
        }
        //phone
        //if ($(".phoneWrapper:visible").length) {
        //    if ($.trim($('[id$="txtRoommate1Phone"]').val()).length < 7) {
        //        errors.push(MSG330);
        //        $('[id$="txtRoommate1Phone"]').addClass('inputError');
        //        isError = true;
        //    }
        //    if ($.trim($('[id$="txtRoommate1Area_code"]').val()).length < 2) {
        //        $('[id$="txtRoommate1Area_code"]').addClass('inputError');
        //        isError = true;
        //        if ($.trim($('input[id$="txtRoommate1Phone"]').val()).length > 6) {
        //            errors.push(MSG330);
        //        }
        //    }
        //    else if ($('[id$="customerPhone"]').val()) {
        //        var phone1 = $.trim($('[id$="txtRoommate1Area_code"]').val()) + $.trim($('[id$="txtRoommate1Phone"]').val());
        //        if (phone1 === $('[id$="customerPhone"]').val()) {
        //            errors.push(MSG439);
        //            $('[id$="txtRoommate1Area_code"], [id$="txtRoommate1Phone"]').addClass('inputError');
        //            isError = true;
        //        }
        //    }

        //}
        //if ($('[id$="txtRoommate2Phone"]:visible').length) {
        //    if ($.trim($('[id$="txtRoommate2Phone"]').val()).length < 7) {
        //        errors.push(MSG331);
        //        $('[id$="txtRoommate2Phone"]').addClass('inputError');
        //        isError = true;
        //    }
        //    if ($.trim($('[id$="txtRoommate2Area_code"]').val()).length < 2) {
        //        $('[id$="txtRoommate2Area_code"]').addClass('inputError');
        //        isError = true;
        //        if ($.trim($('input[id$="txtRoommate2Phone"]').val()).length > 6) {
        //            errors.push(MSG331);
        //        }
        //    }
        //    if ($('[id$="customerPhone"]').val()) {
        //        var phone2 = $.trim($('[id$="txtRoommate2Area_code"]').val()) + $.trim($('[id$="txtRoommate2Phone"]').val());
        //        if (phone2 === $('[id$="customerPhone"]').val()) {
        //            errors.push(MSG440);
        //            $('[id$="txtRoommate2Area_code"], [id$="txtRoommate2Phone"]').addClass('inputError');
        //            isError = true;
        //        }
        //    }
        //    if ($.trim($('[id$="txtRoommate1Area_code"]').val()) === $.trim($('[id$="txtRoommate2Area_code"]').val()) && $.trim($('input[id$="txtRoommate1Phone"]').val()) === $.trim($('input[id$="txtRoommate2Phone"]').val())) {
        //        errors.push(MSG438);
        //        $('[id$="Area_code"], [id$="Phone"]').addClass('inputError');
        //        isError = true;
        //    }
        //}

        //id
        //if ($('input[id$="txtRoommate1Id"]').val() == '') {
        //    errors[errors.length] = MSG45;
        //    $('input[id$="txtRoommate1Id"]').addClass('inputError');
        //    isError = true;
        //}

        var pad = "000000000";
        if ($(".roommatesRow.rr1 [id$='txtRoommate1Id']:visible").length) {
            if ($.trim($('input[id$="txtRoommate1Id"]').val()).length < 1) {
                errors.push(MSG238);
                $('input[id$="txtRoommate1Id"]').addClass('inputError');
                isError = true;
            }
            else if ($.trim($('input[id$="txtRoommate1Id"]').val()).length > 0 && !ARKIA.VALIDATE.validateID($.trim($('input[id$="txtRoommate1Id"]').val()))) {
                errors.push(MSG238);
                $('input[id$="txtRoommate1Id"]').addClass('inputError');
                isError = true;
            }
            else {
                $('input[id$="txtRoommate1Id"]').val((pad + $('input[id$="txtRoommate1Id"]').val()).slice(-pad.length));
                if ($.trim($('input[id$="txtRoommate1Id"]').val()) === sessionStorage.getItem('CustomerID')) {
                    errors.push(MSG420);
                    $('input[id$="txtRoommate1Id"]').addClass('inputError');
                    isError = true;
                }
            }
        }
        if ($(".roommatesRow.rr2 [id$='txtRoommate2Id']:visible").length) {
            if ($.trim($('input[id$="txtRoommate2Id"]').val()).length < 1) {
                errors.push(MSG239);
                $('input[id$="txtRoommate2Id"]').addClass('inputError');
                isError = true;
            }
            else if ($.trim($('input[id$="txtRoommate2Id"]').val()).length > 0 && !ARKIA.VALIDATE.validateID($.trim($('input[id$="txtRoommate2Id"]').val()))) {
                errors.push(MSG239);
                $('input[id$="txtRoommate2Id"]').addClass('inputError');
                isError = true;
            }
            else {
                $('input[id$="txtRoommate2Id"]').val((pad + $('input[id$="txtRoommate2Id"]').val()).slice(-pad.length));
                if ($.trim($('input[id$="txtRoommate2Id"]').val()) === sessionStorage.getItem('CustomerID')) {
                    errors.push(MSG421);
                    $('input[id$="txtRoommate2Id"]').addClass('inputError');
                    isError = true;
                }
                else if ($.trim($('input[id$="txtRoommate2Id"]').val()) == $.trim($('input[id$="txtRoommate1Id"]').val())) {
                    errors.push(MSG422);
                    $('input[id$="txtRoommate1Id"], input[id$="txtRoommate2Id"]').addClass('inputError');
                    isError = true;
                }
            }
        }

        if (isError) {
            $('.close', $(".msgBox")).click(function () {
                $(".msgBox").fadeOut("normal");
                $('.actionBar .content').attr('tabindex', '-1');
                return false;
            });
            ARKIA.COMMON.showMessageBox(errors);
            var pageWidth = $(window).width();
            if (pageWidth > 1024) {
                setTimeout(function () {
                    $('.actionBar .content').attr('tabindex', '0');
                    $('.actionBar .content').focus();
                }, 100);
                $('.actionBar .content').keydown(function (e) {
                    if (e.keyCode == 9 && !e.shiftKey) {
                        if ($('.inputError').length > 0) {
                            $('.inputError:first').focus();
                            e.preventDefault();
                        }
                    }
                });
            }
            else {
                $('.actionBar .content').removeAttr('role');
                setTimeout(function () {
                    $('.actionBar .content').attr('role', 'alert');
                    $('.actionBar .content').focus();
                }, 100);
                setTimeout(function () {
                    if ($('.inputError').length > 0) {
                        $('.inputError:first').focus();
                    }
                }, 5000);
            }            
            return false;
        }
        var id = $("input[name='rbLaps']:checked").parent().attr('data-cycleid');
        $('input[id$="hfSelectedCycle"]').val(id);
        //sessionStorage.setItem('Roomate1Name', $('[id$="txtRoommate1Name"]').val());
        //sessionStorage.setItem('Roomate1Id', $('[id$="txtRoommate1Id"]').val());
        //if (id == 2) {
            //sessionStorage.setItem('Roomate2Name', $('[id$="txtRoommate2Name"]').val());
            //sessionStorage.setItem('Roomate2Id', $('[id$="txtRoommate2Id"]').val());
        //}
        //if ($('[id$="txtRoommate1Phone"]:visible').length) {
        //    sessionStorage.setItem('PhoneRoomate1', $.trim($('[id$="txtRoommate1Area_code"]').val()) + $.trim($('[id$="txtRoommate1Phone"]').val()));
        //}
        //if ($('[id$="txtRoommate2Phone"]:visible').length) {
        //    sessionStorage.setItem('PhoneRoomate2', $.trim($('[id$="txtRoommate2Area_code"]').val()) + $.trim($('[id$="txtRoommate2Phone"]').val()));
        //}
        return true;
    }
};

$(function () {
    if ($('#PMN04').exists()) {
        ARKIA.PMN04.init();
    }
});

ARKIA.PMN04 = {

    init: function () {
        var userEmail = sessionStorage.getItem('userEmail');
        if (userEmail) {
            $('#txtDocsToMail').val(userEmail);
        }
        $("#hlGetDocsByMail").click(function () {
            if (jQuery.browser.mobile) {
                $('#sendDocsDialog').addClass('absolute');
            }
            ARKIA.COMMON.getOverlay($('#sendDocsDialog'),
                {
                    close: 'dialogBoxClose',
                    closeOnClick: true,
                    closeOnEsc: true
                });
            $('#sendDocsDialog a.close').attr('tabindex', '0');
            $('#sendDocsDialog a.close').attr('aria-label', 'סגור');
            $('#sendDocsDialog a.close').focus();
            $('#sendDocsDialog a.close').keydown(function (e) {
                if (e.keyCode == 9 && e.shiftKey) {
                    $('#sendDocsDialog #btnSendDocs').focus();
                    e.preventDefault();
                }
            });
            $('#sendDocsDialog #btnSendDocs').keydown(function (e) {
                if (e.keyCode == 9 && !e.shiftKey) {
                    $('#sendDocsDialog a.close').focus();
                    e.preventDefault();
                }
            });
        });

        $("#btnSendDocs").click(function () {

            $("#validBox").hide();
            var email = $.trim($('#txtDocsToMail').val());
            if (!email) {
                $("#txtDocsToMail").focus();
                $("#validBox").show();
                return false;
            }
            else if (!ARKIA.VALIDATE.RE_EMAIL.test(email)) {
                $("#txtDocsToMail").focus();
                $("#validBox").show();
                return false;
            }

            var DTO = {
                'reservationsn': reservationSn,
                'email': email
            };


            $.ajax({
                type: "POST",
                url: "webmethods/AjaxMethods.aspx/SendEmailDocs",
                data: JSON.stringify(DTO),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });

            $('#sendDocsDialog').overlay().close();

        });

    }

};



$(function () {
    if ($('#RGS01').exists()) {
        ARKIA.LOGIN.init();
    }
});

ARKIA.LOGIN = {

    init: function () {
        $('input').keypress(function (e) {
            if (e.which == 13) {
                return false;
            }
        });
        $('input[id$="txtID"]').keyfilter(/[0-9]/i);
        //$('input[id$="txtLicense"]').keyfilter(/[0-9]/i);
        $('.txtLogin:first').focus();
        $('.close').attr('aria-label', MSG426);

        $('a[id$="btnContinue"]').click(ARKIA.LOGIN.onContinue);
        sessionStorage.clear();

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



        $.each(years, function (key, value) {
            $(".ddlYears")
                .append($("<option></option>")
                    .attr("value", value)
                    .text(value));
        });

        $.each(monthes, function (key, value) {
            $(".ddlMonthes")
                .append($("<option></option>")
                    .attr("value", value)
                    .text(value));
        });

        $.each(days, function (key, value) {
            $(".ddlDays")
                .append($("<option></option>")
                    .attr("value", value)
                    .text(value));
        });




        //todelete for dev
        if (window.location.href.indexOf("dev") > -1 || window.location.href.indexOf("192.168.84.25") > -1) {
            $('input[id$="txtID"]').val(036038099);
            $('input[id$="txtLicense"]').val(23985);
            $(".ddlDays").val("4");
            $(".ddlMonthes").val("11");
            $(".ddlYears").val("1979");
        }



    },
    onContinue: function () {
        var isError = false;
        $(".inputError").removeClass("inputError");
        $(".msgBox").css('display', 'none');
        var errors = new Array();

        var englishRE = /^[a-zA-Z\ ]*$/;
        var hebrewRE = /^[א-ת\ ]*$/;
        var numberRE = /^[0-9]*$/;

       // optional validation for id with space
        //$('input[id$="txtID"]').val($('input[id$="txtID"]').val().replace(/\s/g, '')); 
        if (!ARKIA.VALIDATE.validateID($.trim($('input[id$="txtID"]').val()))) {
            errors[errors.length] = MSG45;
            $('input[id$="txtID"]').addClass('inputError');
            isError = true;
        }
        //if ($.trim($('input[id$="txtLicense"]').val()).length === 0) {
        //    $('input[id$="txtLicense"]').addClass('inputError');
        //    errors[errors.length] = MSG123;
        //    isError = true;
        //}

        //lpad
       
        var pad = "000000000";
        $('input[id$="txtID"]').val((pad + $('input[id$="txtID"]').val()).slice(-pad.length));
       

        var yearObj = $(".ddlYears option:selected");
        var monthObj = $(".ddlMonthes option:selected");
        var dayObj = $(".ddlDays option:selected");

        if (yearObj.val() < '0' || monthObj.val() < '0' || dayObj.val() < '0') {
            isError = true;
            if (yearObj.val() < '0') {
                yearObj.addClass('inputError');
            }
            if (monthObj.val() < '0') {
                monthObj.addClass('inputError');
            }
            if (dayObj.val() < '0') {
                dayObj.addClass('inputError');
            }
            errors[errors.length] = MSG123;
        }
        else if (ARKIA.COMMON.isNotLogicalDate(dayObj.children(':selected').text(), monthObj.children(':selected').text())) {  //|| !ARKIA.COMMON.isFutureDate6Month(dayObj.children(':selected').text(), monthObj.children(':selected').text(), yearObj.children(':selected').text())) {
            isError = true;
            dayObj.addClass('inputError');
            monthObj.addClass('inputError');
            errors[errors.length] = MSG123;
        }

        if (dayObj.children(':selected').text() >= 29 && monthObj.children(':selected').text() == 2) {
            if (ARKIA.COMMON.isNotLogicalFeb29(dayObj.children(':selected').text(), yearObj.children(':selected').text())) {
                isError = true;
                dayObj.addClass('inputError');
                monthObj.addClass('inputError');
                errors[errors.length] = MSG123;
            }
        }


        if (isError) {
            $('.close', $(".msgBox")).click(function () {
                $(".msgBox").fadeOut("normal");
                $('.actionBar .content').attr('tabindex', '-1');
                return false;
            });
            ARKIA.COMMON.showMessageBox(errors);
            var pageWidth = $(window).width();
            if (pageWidth > 1024) {
                setTimeout(function () {
                    $('.actionBar .content').attr('tabindex', '0');
                    $('.actionBar .content').focus();
                }, 100);
                $('.actionBar .content').keydown(function (e) {
                    if (e.keyCode == 9 && !e.shiftKey) {
                        $('.inputError:first').focus();
                        e.preventDefault();
                    }
                });
            }
            else {
                $('.actionBar .content').removeAttr('role');
                setTimeout(function () {
                    $('.actionBar .content').attr('role', 'alert');
                    $('.actionBar .content').focus();
                }, 100);
                setTimeout(function () {
                    $('.inputError:first').focus();
                }, 5000);

            }
            return false;
        }
        sessionStorage.setItem('CustomerID', $.trim($('input[id$="txtID"]').val()));
        var YEAR = yearObj.val();
        var MONTH = monthObj.val();
        var DAY = dayObj.val();
        var DOB = (DAY < 10 ? '0' + DAY : DAY) + '/' + (MONTH < 10 ? '0' + MONTH : MONTH) + '/' + YEAR;
        $('input[id$="hfDob"]').val(DOB);
    }

};

$(function () {
    if ($('#PMN02').exists()) {
        ARKIA.PAYMENT.init();
    }
});


ARKIA.PAYMENT = {


    init: function () {

        //$('#txtCvv').keyfilter(/[0-9]/i);
        $('#txtCardHolderName').keyfilter(/[a-zA-Zא-ת .-]+/);
        $('#txtInvoiceCustomerName').keyfilter(/[a-zA-Zא-ת .-]+/);
        $('#txtVatCaseRefNo').keyfilter(/[0-9]/i);
        $('.txtTokenVal').keyfilter(/[0-9]/i);

        $("#hfBalancePrice").val(parseInt($(".balancePrice").attr("data-amount")));

        window.setTimeout(function () {
            $.ajax(
                {
                    type: "POST",
                    url: "webmethods/AjaxMethods.aspx/CancelReservation",
                    data: "{reservationSn:'" + reservationSn + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        var d = response.d;
                        window.location = "http://" + location.hostname + "/" + APPFolfer + "/" + "form-wizard";
                        alert(MSG81);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                        window.location = "http://" + location.hostname + "/" + APPFolfer + "/" + errorPage;
                    }
                });
        }, 900000);

        var handler = function () {
            $('#txtCCNumberPCI').unbind('click', handler);
            var cardHolder = $('#txtCardHolderName');

            $(".inputError").removeClass("inputError");
            $(".msgBox").css('display', 'none');


            if ($.trim(cardHolder.val()).length < 4) {
                var errors = new Array();
                errors.push(MSG94);
                cardHolder.addClass('inputError');
                ARKIA.COMMON.showMessageBox(errors);
                setTimeout(function () {
                    $('.actionBar .content').attr('tabindex', '0');
                    $('.actionBar .content').focus();
                }, 100);
                $('.actionBar .content').keydown(function (e) {
                    if (e.which == 9 && !e.shiftKey) {
                        $('.inputError:first').focus();
                        e.preventDefault();
                    }
                });

                $('#txtCCNumberPCI').bind('click', handler);
                $('#txtCCNumberPCI').keydown(function (e) {
                    if (e.which == 13) {
                        $('#txtCCNumberPCI').click();
                    }
                });
            }
            else {

                $.ajax({
                    type: "POST",
                    url: "webmethods/AjaxMethods.aspx/GetPCIUrl",
                    data: "{customerName:'" + $.trim(cardHolder.val()) + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        var res = response.d;
                        if (res != null && res.ReturnCode == 0 && res.Url != null && res.Url != 'null') {
                            $('#pciIframe').attr('src', res.Url);

                            if (jQuery.browser.mobile) {
                                $('#pciDialog').addClass('absolute');
                            }
                            ARKIA.COMMON.getOverlay($('#pciDialog'),
                                {
                                    close: 'dialogBoxClose',
                                    closeOnClick: false,
                                    onBeforeClose: function () {
                                        $('#txtCCNumberPCI').bind('click', handler);
                                        $('#txtCCNumberPCI').keydown(function (e) {
                                            if (e.which == 13) {
                                                $('#txtCCNumberPCI').click();
                                            }
                                        });
                                    },
                                    closeOnEsc: false
                                });
                            $('#pciDialog .close').click(function () {
                                //$('#txtCvv').focus();
                                $('#ddlPaymentsNum').focus();
                            });
                            $('#pciDialog a.close').attr('tabindex', '0');
                            $('#pciDialog a.close').attr('aria-label', MSG426);
                            $('#pciDialog a.close').focus();
                            $('#pciDialog a.close').keydown(function (e) {
                                if (e.keyCode == 9 && e.shiftKey) {
                                    e.preventDefault();
                                }
                            });
                            $("#pciDialog").focusout(function () {
                                $(this).find("a.close").focus();
                            });
                        }
                        else {
                            alert(MSG92);
                            $('#txtCCNumberPCI').bind('click', handler);
                            $('#txtCCNumberPCI').keydown(function (e) {
                                if (e.which == 13) {
                                    $('#txtCCNumberPCI').click();
                                }
                            });
                        }

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert(MSG92);
                        $('#txtCCNumberPCI').bind('click', handler);
                        $('#txtCCNumberPCI').keydown(function (e) {
                            if (e.which == 13) {
                                $('#txtCCNumberPCI').click();
                            }
                        });
                        return false;
                    }
                });
            }

        };

        $('#txtCCNumberPCI').bind('click', handler);
        $('#txtCCNumberPCI').keydown(function (e) {
            if (e.which == 13) {
                $('#txtCCNumberPCI').click();
            }
        });

        //$.each(pricePlans.Value, function (index, value) {
        //    $("#ddlPaymnetMethod").append('<option value="' + value.PLAN_CODE + '">' + value.PLAN_NAME + '</option>');
        //});

        //for (var i = 1; i <= pricePlans.Value[0].MAX_PAYMENTS_NO; i++) {
        //    $('#ddlPaymentsNum').append("<option value=" + i + ">" + i + "</option>");
        //}

        ////assign event handler for payments selection.
        //$('#ddlPaymnetMethod').bind('change', function () {
        //    var select = $('#ddlPaymentsNum');
        //    select.find('option').remove().end();
        //    var selectedVal = $('option:selected', this).val();
        //    var selectedItem = jQuery.grep(pricePlans.Value, function (value) {
        //        return value.PLAN_CODE == selectedVal;
        //    });

        //    for (var i = 1; i <= selectedItem[0].MAX_PAYMENTS_NO; i++) {
        //        select.append("<option value=" + i + ">" + i + "</option>");
        //    }
        //});

        if (pricePlans.Value.length > 1)
            for (var i = 1; i <= 3 && i <= pricePlans.Value[1].MAX_PAYMENTS_NO; i++) {                
                   $('#ddlPaymentsNum').append("<option value=" + i + ">" + i + "</option>");
            }
        else $('.paymentRow.paymentsNum').css('display', 'none');

        var paymentByCc = true;
        $("#hlotherPayment").click(function () {
            $('#hfToken').val('');
            $('#hfTxnToken').val('');
            $('#txtCCNumberPCI').val('');
            $('#txtCardHolderName').val('');
            $("#ddlPaymnetMethod").val('');
            //$('#txtCvv').val('');
            $("#ddlPaymnetMethod").val($("#ddlPaymnetMethod option:first").val());
            $("#ddlPaymentsNum").val($("#ddlPaymentsNum option:first").val());
            $('#txtVatCaseRefNo').val('');
            $(".inputError").removeClass("inputError");
            $(".msgBox").css('display', 'none');
            $('#hlPayment').add('#otherPaymentMethodsBox').add('#btnOtherPayment').add("#titleText").show();
            $('#hlotherPayment').add('#invoicePropBox').add('#btnPayment').add("#titleCcText").add("#ccPaymentInfoBox").hide();
            paymentByCc = false;
        });

        $("#hlPayment").click(function () {
            $('#hfToken').val('');
            $('#hfTxnToken').val('');
            $('#txtCCNumberPCI').val('');
            $('#txtCardHolderName').val('');
            //$('#txtCvv').val('');
            $("#ddlPaymnetMethod").val($("#ddlPaymnetMethod option:first").val());
            $("#ddlPaymentsNum").val($("#ddlPaymentsNum option:first").val());
            $('#txtInvoiceCustomerName').val('');
            $('#txtVatCaseRefNo').val('');
            $(".inputError").removeClass("inputError");
            $(".msgBox").css('display', 'none');
            $('#hlPayment').add('#otherPaymentMethodsBox').add('#btnOtherPayment').add("#titleText").hide();
            $('#hlotherPayment').add('#invoicePropBox').add('#btnPayment').add("#titleCcText").add("#ccPaymentInfoBox").show();
            paymentByCc = true;
        });

        $('.close', $(".msgBox")).click(function () {
            $(".msgBox").fadeOut("normal");
            $('.actionBar .content').attr('tabindex', '-1');
            return false;
        });




        $(".txtTokenVal").blur(function () {


            var tokenDue = parseInt($(this).attr("data-TOKEN_DUE"));
            if (parseInt($(this).val()) > tokenDue) {

                alert(MSG351);
                $(this).val(0);
                return;
            }
        });



        $("#updateTokenLink").click(function () {

            var amountToPay = parseInt($(".balancePrice").attr("data-amount"));

            var a = 0;
            $(".txtTokenVal").each(function () {

                if ($(this).val())
                    a += parseInt($(this).val());
            });

            if (a > amountToPay) {
                alert(MSG350);
                return;
            }

            if (a >= amountToPay) {
                $("#paymentByCCBox").hide();
                paymentByCc = false;
            }
            else {
                $("#paymentByCCBox").show();
                paymentByCc = true;
            }

            $("#hfBalancePrice").val((amountToPay - a));
            $(".balancePrice span").text(eventsCurrency + ((amountToPay - a).formatMoney(0, '.', ',')));

        });


        $("#btnPayment").add("#btnOtherPayment").click(function () {

            if ($("#tokensList").length) {
                var amountToPay = parseInt($(".balancePrice").attr("data-amount"));

                var a = 0;
                $(".txtTokenVal").each(function () {

                    if ($(this).val())
                        a += parseInt($(this).val());
                });

                if ((amountToPay - a) != parseInt($("#hfBalancePrice").val())) {
                    alert(MSG352);
                    return;
                }
            }


            $(".inputError").removeClass("inputError");
            $(".msgBox").css('display', 'none');
            var errors = new Array();


            if ($("#paymentByCCBox").is(":visible")) {
                if ($.trim($('#txtCardHolderName').val()).length < 4) {
                    errors.push(MSG94);
                    $('#txtCardHolderName').addClass('inputError');
                }

                if ($.trim($('#hfTxnToken').val()).length < 4 || $.trim($('#hfTxnToken').val()).length < 4) {
                    errors.push(MSG98);
                    $('#txtCCNumberPCI').addClass('inputError');
                }

                //if (!ARKIA.VALIDATE.RE_WS.test($('#txtCvv').val()) || $('#txtCvv').val().length < 3) {
                //    errors.push(MSG95);
                //    $('#txtCvv').addClass('inputError');
                //}


                if (paymentByCc) {
                    if ($.trim($('#txtInvoiceCustomerName').val()).length > 1) {
                        if ($.trim($('#txtInvoiceCustomerName').val()).length < 4) {
                            errors.push(MSG96);
                            $('#txtInvoiceCustomerName').addClass('inputError');
                        }
                        else if ($.trim($('#txtVatCaseRefNo').val()).length < 2) {
                            errors.push(MSG97);
                            $('#txtVatCaseRefNo').addClass('inputError');
                        }
                    }
                }
                else {
                    if (!$('input[name=paymentType]:checked').val()) {
                        errors.push(MSG99);
                        $('input[name=paymentType]').addClass('inputError');
                    }
                }
            }
            else {
                paymentByCc = false;
            }


            if (errors.length > 0) {
                ARKIA.COMMON.showMessageBox(errors);
                setTimeout(function () {
                    $('.actionBar .content').attr('tabindex', '0');
                    $('.actionBar .content').focus();
                }, 100);
                $('.actionBar .content').keydown(function (e) {
                    if (e.which == 9 && !e.shiftKey) {
                        $('.inputError:first').focus();
                        e.preventDefault();
                    }
                });
                return false;
            }
            $(this).hide();
            $('#loader').show();

            var tokens = '';
            var paymentBYToken = false;

            if ($("#tokensList").length) {

                paymentBYToken = true;

                tokens = '<M_PAYMENT_TOKENS>';


                $(".txtTokenVal").each(function () {

                    if ($(this).val()) {

                        var paymentAmountT = parseInt($(this).val());
                        var exchangeRate = parseFloat($(this).attr('data-EXCHANGE_RATE'));

                        if (paymentAmountT > 0) {
                            tokens += '<O_PAYMENT_TOKEN>';
                            if (exchangeRate != 0) {
                                paymentAmountT = paymentAmountT / exchangeRate;
                            }
                            tokens += '<PAYMENT_AMOUNT>' + paymentAmountT + '</PAYMENT_AMOUNT>'
                            tokens += '<TOKENSN>' + $(this).attr('data-TOKENSN') + '</TOKENSN>'
                            tokens += '<CURRENCY_CODE>' + $(this).attr('data-CURRENCY_CODE') + '</CURRENCY_CODE>'
                            tokens += '</O_PAYMENT_TOKEN>';
                        }
                    }
                });

                tokens += '</M_PAYMENT_TOKENS>';
            }


            var DTO = {
                'reservationsn': reservationSn,
                'paymentByCc': paymentByCc,
                'token': $('#hfToken').val() ? $('#hfToken').val() : '',
                'txnToken': $('#hfTxnToken').val() ? $('#hfTxnToken').val() : '',
                'cardOwnerName': $('#txtCardHolderName').val() ? $('#txtCardHolderName').val() : '',
                'ccPlanNo': pricePlans.Value.length == 1 || pricePlans.Value.length > 1 && $('#ddlPaymentsNum').val() == 1 ? pricePlans.Value[0].PLAN_CODE : pricePlans.Value.length > 1 ? pricePlans.Value[1].PLAN_CODE : 0,
                'cvv': $('#txtCvv').val() ? $('#txtCvv').val() : 0,
                'paymentsNo': pricePlans.Value.length == 1 ? 1 : pricePlans.Value.length > 1 ? $('#ddlPaymentsNum').val() : 0,
                'pmtTokensXml': tokens,
                'invoiceCustomerName': paymentByCc && $('#txtInvoiceCustomerName').val() ? $('#txtInvoiceCustomerName').val() : null,
                'vatCaseRefNo': paymentByCc && $('#txtVatCaseRefNo').val() ? $('#txtVatCaseRefNo').val() : null,
                'invoiceEmailSend': paymentByCc && $('#txtInvoiceEmailSend').val() ? $('#txtInvoiceEmailSend').val() : null,
                'formOfPayment': !paymentByCc && !paymentBYToken ? $('input[name=paymentType]:checked').val() : null
            };


            $.ajax({
                type: "POST",
                url: "webmethods/AjaxMethods.aspx/DoPayment",
                data: JSON.stringify(DTO),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    var res = response.d;
                    window.location = "http://" + location.hostname + "/" + APPFolfer + "/" + "tnx?r=" + reservationSn + "&ca=" + res.ContinueAction;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    window.location = "http://" + location.hostname + "/" + APPFolfer + "/" + errorPage;
                    console.log(errorThrown)
                }
            });
        });


    },
    /*----------------------------------------------------------------------------------------------------------------*/
    setToken: function (error, token, txnToken, url, oraMsg, oraSession) {

        console.info("ora: errCode: " + error + " msg: " + oraMsg + " session:" + oraSession);

        var hfTxnToken = $('#hfTxnToken'),
            hfToken = $('#hfToken');

        if (error == 0) {
            $('#pciDialog').overlay().close();
            $('#txtCvv').focus();
            hfTxnToken.val(txnToken);
            hfToken.val(token);
            $('#txtCCNumberPCI').val("************" + token.substr(token.length - 4));
            $('#paymentPCIError').hide();
        }
        else {
            $('#txtCCNumberPCI').val('');
            hfTxnToken.val('');
            hfToken.val('');
            $('#pciIframe').attr('src', url);

            $('#paymentPCIError').show();
        }
    }

};
$(function () {
    if ($('#wizard').exists()) {
        ARKIA.WIZARD.init();
    }
});

ARKIA.WIZARD = {

    init: function () {


        $("#menu li > a").each(function (index) {
            $(this).attr("href", "#step-" + (index + 1))
        });

        $("#wizardContent .stepContent").each(function (index) {
            $(this).attr("id", "step-" + (index + 1))
        });



        $('#wizard').smartWizard(
            {
                // Properties
                selected: 0,  // Selected Step, 0 = first step   
                keyNavigation: false, // Enable/Disable key navigation(left and right keys are used if enabled)
                enableAllSteps: false,  // Enable/Disable all steps on first load
                updateHeight: false,
                transitionEffect: 'fade', // Effect on navigation, none/fade/slide/slideleft
                contentURL: null, // specifying content url enables ajax content loading
                contentCache: true, // cache step contents, if false content is fetched always from ajax url
                cycleSteps: false, // cycle step navigation
                enableFinishButton: false, // makes finish button enabled always
                errorSteps: [],    // array of step numbers to highlighting as error steps
                labelNext: 'הבא', // label for Next button
                labelPrevious: 'הקודם', // label for Previous button
                labelFinish: 'סיום',  // label for Finish button        
                // Events
                onLeaveStep: ARKIA.WIZARD.leaveAStepCallback, // triggers when leaving a step
                onShowStep: ARKIA.WIZARD.showAStepCallback,  // triggers when showing a step
                onFinish: ARKIA.WIZARD.onFinishCallback  // triggers when Finish button is clicked
            });

        $("#wizardLoader").hide();
        $("#wizardContent").show();
    },
    wizardCtrl: ['$scope', '$window', function ($scope, $window) {
        $scope.init = function () {
            setWindowSize();
        }
        $(window).resize(function () {
            var currentSize = $scope.xs ? "xs" : $scope.sm ? "sm" : $scope.md ? "md" : "lg";
            setWindowSize();
            var newSize = $scope.xs ? "xs" : $scope.sm ? "sm" : $scope.md ? "md" : "lg";
            if (currentSize != newSize) {
                $window.location.reload();
            }
        });
        var setWindowSize = function () {
            $scope.xs = $scope.sm = $scope.md = $scope.lg = false;
            var w = $(window).width();
            if (w < 768) {
                $scope.xs = true;
            } else if (w < 992) {
                $scope.sm = true;
            } else if (w < 1200) {
                $scope.md = true;
            } else {
                $scope.lg = true;
            }
        }
    }],

    leaveAStepCallback: function (obj) {
        var stepnumber = obj.attr('rel'); // get the current step number
        var stepPage = obj.attr('data-stepPage'); // get the current step page
        return ARKIA.WIZARD.validateSteps(stepPage, stepnumber); // return false to stay on step and true to continue navigation 
    },
    showAStepCallback: function (obj) {
        var stepnumber = obj.attr('rel');
        var stepPage = obj.attr('data-stepPage');
        $('#wizard').smartWizard('unVisitSteps', { stepnum: stepnumber });
        switch (stepPage) {
            case 'RGS03':
                angular.element(document.getElementById('ng_Ctrl_RGS03')).scope().init();
                angular.element(document.getElementById('ng_Ctrl_RGS03')).scope().$apply();
                break;
            case 'RGS04':
                angular.element(document.getElementById('ng_Ctrl_RGS04')).scope().init();
                angular.element(document.getElementById('ng_Ctrl_RGS04')).scope().$apply();
                break;
            case 'RGS05':
                angular.element(document.getElementById('ng_Ctrl_RGS05')).scope().init();
                angular.element(document.getElementById('ng_Ctrl_RGS05')).scope().$apply();
                break;
            case 'PRD01': // hotels
                angular.element(document.getElementById('ng_Ctrl_PRD01')).scope().init();
                angular.element(document.getElementById('ng_Ctrl_PRD01')).scope().$apply();
                $("#PRD01").show();
                $("#PRD02").hide();
                break;
            case 'PRD03': //flights
                angular.element(document.getElementById('ng_Ctrl_PRD03')).scope().init();
                angular.element(document.getElementById('ng_Ctrl_PRD03')).scope().$apply();
                $("#PRD03").show();
                $("#PRD04").hide();
                break;
            case 'PRD09': //Shuttle
                angular.element(document.getElementById('ng_Ctrl_PRD09')).scope().init();
                angular.element(document.getElementById('ng_Ctrl_PRD09')).scope().$apply();
                $("#shuttlePart1").show();
                $("#shuttlePart2").hide();
                break;
            case 'PRD05':
                angular.element(document.getElementById('ng_Ctrl_PRD05')).scope().init($('#ng_Ctrl_PRD05'), 'PRD05');
                angular.element(document.getElementById('ng_Ctrl_PRD05')).scope().$apply();
                $("#addPrdPart1PRD05").show();
                $("#addPrdPart2PRD05").hide();
                break;
            case 'PRD06':
                angular.element(document.getElementById('ng_Ctrl_PRD06')).scope().init($('#ng_Ctrl_PRD06'), 'PRD06');
                angular.element(document.getElementById('ng_Ctrl_PRD06')).scope().$apply();
                $("#addPrdPart1PRD06").show();
                $("#addPrdPart2PRD06").hide();
                break;
            case 'PRD07':
                angular.element(document.getElementById('ng_Ctrl_PRD07')).scope().init($('#ng_Ctrl_PRD07'), 'PRD07');
                angular.element(document.getElementById('ng_Ctrl_PRD07')).scope().$apply();
                $("#addPrdPart1PRD07").show();
                $("#addPrdPart2PRD07").hide();
                break;
            case 'PRD13':
                angular.element(document.getElementById('ng_Ctrl_PRD13')).scope().init($('#ng_Ctrl_PRD13'), 'PRD13');
                angular.element(document.getElementById('ng_Ctrl_PRD13')).scope().$apply();
                $("#mealsPart1").show();
                $("#mealsPart2").hide();
                break;
            case 'PMN01':
                angular.element(document.getElementById('ng_Ctrl_PMN01')).scope().init();
                angular.element(document.getElementById('ng_Ctrl_PMN01')).scope().$apply();
                break;
        }
        return true;
    },
    onFinishCallback: function () {
        if (ARKIA.WIZARD.validateAllSteps()) {
            var stepPage = obj.attr('data-stepPage');
            if (stepPage == "PMN01") {
                $('#wizard').smartWizard('showMessage', 'Finish Clicked');
                $('form').submit();
            }
        }
    },
    // Your Step validation logic
    validateSteps: function (stepPage, stepnumber) {

        var isStepValid = true;
        var errors = new Array();
        $(".inputError").removeClass("inputError");


        switch (stepPage) {
            case 'RGS03':
                isStepValid = ARKIA.WIZARD.REGISTRATION.ValidateStep(stepnumber);
                break;
            case 'RGS04':
                isStepValid = ARKIA.WIZARD.COMPANIONS.ValidateStep(stepnumber);
                break;
            case 'RGS05':
                isStepValid = ARKIA.WIZARD.FEES.ValidateStep(stepnumber);
                break;
            case 'PRD01':
                isStepValid = ARKIA.WIZARD.HOTELS.ValidateStep(stepnumber);
                break;
            case 'PRD03':
                isStepValid = ARKIA.WIZARD.FLIGHTS.ValidateStep(stepnumber);
                break;
            case 'PRD09':
                isStepValid = ARKIA.WIZARD.SHUTTLE.ValidateStep(stepnumber);
                break;
            case 'PRD05':
                isStepValid = ARKIA.WIZARD.PRODUCTS.PRD05.ValidateStep(stepnumber);
                break;
            case 'PRD06':
                isStepValid = ARKIA.WIZARD.PRODUCTS.PRD06.ValidateStep(stepnumber);
                break;
            case 'PRD07':
                isStepValid = ARKIA.WIZARD.PRODUCTS.PRD07.ValidateStep(stepnumber);
                break;
            case 'PRD08':
                isStepValid = ARKIA.WIZARD.PRODUCTS.PRD08.ValidateStep(stepnumber);
                break;
            case 'PRD13':
                isStepValid = ARKIA.WIZARD.MEALS.PRD13.ValidateStep(stepnumber);
                break;
        }

        ARKIA.WIZARD.setError(stepnumber, !isStepValid);
        window.scrollTo(0, 170);
        return isStepValid;
    },
    createErrorListWizard: function (errors) {
        var errList = '<ul>';
        $.each(errors, function (errNum) {
            errList += '<li>' + errors[errNum] + '</li>';
        });
        var pageWidth = $(window).width();
        if (pageWidth > 1024) {
            setTimeout(function () {
                $('.actionBar .content').attr('tabindex', '0');
                $('.actionBar .content').focus();
            }, 100);
        }
        else {
            $('.actionBar .content').removeAttr('role');
            setTimeout(function () {
                $('.actionBar .content').attr('role', 'alert');
                $('.actionBar .content').focus();
            }, 100);
        }
        return (errList + '</ul>');
    },
    validateAllSteps: function () {
        var isStepValid = true;
        return isStepValid;
    },
    setError: function (stepnumber, iserr) {
        $('#wizard').smartWizard('setError', { stepnum: stepnumber, iserror: iserr });
        if (iserr) {
            $('#wizard').smartWizard('showMessage', errorValues[stepnumber]);
        } else { $('.msgBox').css('display', 'none'); }
    }
};
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
$(function () {
    if ($('#wizard').exists()) {
        ARKIA.WIZARD.HOTELS.init();
    }
});


ARKIA.WIZARD.HOTELS = {
    reLoad: true,
    reLoad2: true,
    roomsChecked: {},
    partyTypeDefault: null,
    init: function () {
        $("#btnHotelCon").click(function () {
            var allRoomsSelected = false;
            var errors = new Array();
            $(".inputError").removeClass("inputError");
            var stepnumber = 4;
            var isStepValid = true;
            if ($("[role='HOTEL_PRD01']").val() === '') {
                isStepValid = false;
                $("[role='HOTEL_PRD01']").addClass('inputError');
                errors.push(MSG112);
            }
            if ($("[role='ACOM_PRD01']").val() === '') {
                isStepValid = false;
                $("[role='ACOM_PRD01']").addClass('inputError');
                errors.push(MSG62);
            }
            if ($("[role='ROOM_PRD01']").val() === '') {
                isStepValid = false;
                $("[role='ROOM_PRD01']").addClass('inputError');
                errors.push(MSG63);
            }
            if ($("[role='ROOM_NUM']").exists()) {
                allRoomsSelected = true;
                var Adults = 0, Children = 0, Infants = 0;
                $("[role='ROOM_NUM']").each(function (index, value) {
                    var parent = $(this).parent();
                    if (window.innerWidth < 768) {
                        parent = $(this).parent().parent();
                    }
                    if ($("[role='ROOM_TYPE_NAME']", parent).val() === '') {
                        isStepValid = false;
                        $("[role='ROOM_TYPE_NAME']", parent).addClass('inputError');
                        errors.push(MSG64.replace('{0}', (index + 1)));
                        allRoomsSelected = false
                    }

                    if ($("[role='PARTY_TYPE_NAME']", parent).val() < '0') {
                        isStepValid = false;
                        $("[role='PARTY_TYPE_NAME']", parent).addClass('inputError');
                        errors.push(MSG65.replace('{0}', (index + 1)));
                        allRoomsSelected = false
                    }

                    if (allRoomsSelected) {

                        if (typeof ARKIA.WIZARD.HOTELS.roomsChecked.selectedRooms[index].PARTY_TYPE !== 'undefined') {
                            Adults += Number(ARKIA.WIZARD.HOTELS.roomsChecked.selectedRooms[index].PARTY_TYPE.ADULTS);
                            Children += Number(ARKIA.WIZARD.HOTELS.roomsChecked.selectedRooms[index].PARTY_TYPE.CHILDREN);
                            Infants += Number(ARKIA.WIZARD.HOTELS.roomsChecked.selectedRooms[index].INFANTS);
                        }
                    }
                });
            }
            if (allRoomsSelected) {
                //age checking
                var agc = ARKIA2.WIZARD.getAgeGroupCount();
                if (agc.adults != Adults || agc.children != Children) {
                    $("[role='ROOM_NUM']").each(function (index, value) {
                        $("[role='PARTY_TYPE_NAME']").addClass('inputError');
                        isStepValid = false;
                    });
                    errors.push(MSG68);
                }
                if (agc.infants != Infants) {
                    $("[role='ROOM_NUM']").each(function (index, value) {
                        $("[role='MAX_INFANTS']").addClass('inputError');
                        isStepValid = false;
                        errors.push(MSG67.replace('{0}', (index + 1)));
                    });
                }
                var roomTypes = [];
                $(ARKIA.WIZARD.HOTELS.roomsChecked.hotel.ROOMS.Value).each(function (index, value) {
                    roomTypes.push({ type: ARKIA.WIZARD.HOTELS.roomsChecked.hotel.ROOMS.Value[index].ROOM_TYPE_NAME, limit: ARKIA.WIZARD.HOTELS.roomsChecked.hotel.ROOMS.Value[index].ROOMS_NO, roomsNum: 0 });
                });
                for (var i = 0; i < ARKIA.WIZARD.HOTELS.roomsChecked.selectedRooms.length; i++) {
                    for (var j = 0; j < roomTypes.length; j++) {
                        if (roomTypes[j].type === ARKIA.WIZARD.HOTELS.roomsChecked.selectedRooms[i].ROOM.ROOM_TYPE_NAME) {
                            roomTypes[j].roomsNum++;
                            break;
                        }
                    }
                }
                for (var i in roomTypes) {
                    if (roomTypes[i].limit < roomTypes[i].roomsNum) {
                        isStepValid = false;
                        errors.push(MSG66);
                        break;
                    }
                }
            }


            if (isStepValid) {
                ARKIA2.WIZARD.resetHotels();
                ARKIA2.WIZARD.setHotelComment($("#HotelComment").val());
                $("#PRD01").hide();
                $("#PRD02").show();
                angular.element(document.getElementById('ng_Ctrl_PRD02')).scope().init();
                angular.element(document.getElementById('ng_Ctrl_PRD02')).scope().$apply();
                $(".roomPrice").css("margin-top", ($(".hotelInfoRow").height() - 24) / 2);
                $(".marketingTextBox").height($(".hotelsRowThird").height() - 20);
            }
            else {
                errorValues[stepnumber] = ARKIA.WIZARD.createErrorListWizard(errors);
            }
            ARKIA.WIZARD.setError(stepnumber, !isStepValid);
        });
        $("#backToPRD01").click(function () {
            $(".inputError").removeClass("inputError");
            $(".msgBox").css('display', 'none');
            $("#PRD01").show();
            $("#PRD02").hide();
        });
        $('#HotelComment').keyfilter(/[א-ת0-9_\.\-\,\:\;\!\ ]/i);
        if ($('.bodyMain.ltr').length) {
            $('#HotelComment').attr('title', 'In Hebrew');
        }
        else {
            $('#HotelComment').attr('title', 'הזן בעברית');
        }
    },
    hotesCtrl: ['$scope', '$http', function ($scope, $http) {
        $scope.hotels = [];
        $scope.noInfants = false;
        $scope.hotelOptions = {};
        $scope.hotelOptions.hotel = {};
        $scope.hotelOptions.room = {};
        $scope.hotelOptions.board = {};
        $scope.rooms_amount_arr = [];
        $scope.hotelOptions.rooms_amount;
        $scope.hotelOptions.selectedRooms = [];
        $scope.INFANTS_ARR_proto = [0, 1, 2, 3, 4, 5];

        $('#HotelComment').keyfilter(/[א-ת0-9_\.\-\,\:\;\!\ ]/i);

        var roomsCount = [];
        for (var i = 0; i < maxRooms; i++) {
            roomsCount.push(i + 1);
        }

        $scope.changeHotels = function (newVal) {
            ARKIA.WIZARD.HOTELS.reLoad2 = true;
            ARKIA.WIZARD.HOTELS.partyTypeDefault = null;

            if (newVal.hotel == null) {
                newVal.boards = {};
                $scope.rooms_amount_arr = [];
                newVal.rooms_amount = null;
                newVal.selectedRooms = [];
            }
            else {
                if (newVal.hotel.BOARD_BASIS.Value.length == 1) {
                    newVal.boards = newVal.hotel.BOARD_BASIS.Value[0];
                    $scope.changeBoardBasis(newVal.boards);
                }
                else {
                    newVal.boards = {};
                }


            }

        }

        $scope.changeBoardBasis = function (boards) {
            var agc = ARKIA2.WIZARD.getAgeGroupCount();
            ARKIA.WIZARD.HOTELS.reLoad2 = true;
            ARKIA.WIZARD.HOTELS.partyTypeDefault = null;

            if (boards == null) {
                $scope.rooms_amount_arr = [];
                $scope.hotelOptions.rooms_amount = null;
                $scope.hotelOptions.selectedRooms = [];
            }
            else {

                $scope.rooms_amount_arr = [];
                $scope.hotelOptions.rooms_amount = null;
                $scope.hotelOptions.selectedRooms = [];
                if ($scope.hotelOptions.hotel != null) {
                    $scope.rooms_amount_arr = roomsCount;

                    if (roomsCount.length === 1 || agc.adults === 1 && agc.children === 0) {
                        $scope.hotelOptions.rooms_amount = roomsCount[0];
                        $scope.changeRooms($scope.hotelOptions);
                        $scope.adultsCount = 1;
                    }
                    else {
                        $scope.hotelOptions.rooms_amount = 0;
                        $scope.adultsCount = 0;
                    }

                }
            }

            //FIX for IE9
            angular.forEach($("select:visible"), function (currSelect) {
                currSelect.options[currSelect.selectedIndex].text += " ";
            });

        }

        $scope.changeRooms = function (newVal) {
            ARKIA.WIZARD.HOTELS.reLoad2 = true;
            ARKIA.WIZARD.HOTELS.partyTypeDefault = null;

            $scope.hotelOptions.selectedRooms = [];
            for (var i = 0; i < newVal.rooms_amount; i++) {
                $scope.hotelOptions.selectedRooms.push({});
            }

            //FIX for IE9
            angular.forEach($("select:visible"), function (currSelect) {
                currSelect.options[currSelect.selectedIndex].text += " ";
            });

            ARKIA.WIZARD.HOTELS.roomsChecked = newVal;


            if (ARKIA.WIZARD.HOTELS.partyTypeDefault != null) {
                newVal.selectedRooms[0].PARTY_TYPE = newVal.selectedRooms[0].ROOM.PARTY_TYPES.Value[ARKIA.WIZARD.HOTELS.partyTypeDefault];
            }


            if (newVal.hotel.ROOMS.Value.length == 1) {
                for (var i = 0; i < $scope.hotelOptions.selectedRooms.length; i++) {
                    $scope.hotelOptions.selectedRooms[i].ROOM = $scope.hotelOptions.hotel.ROOMS.Value[0];
                    $scope.roomTypeChanged($scope.hotelOptions.selectedRooms[i]);
                }
            }

        }

        $scope.roomTypeChanged = function (room) {


            if (room.ROOM != null) {
                room.INFANTS_ARR = $scope.INFANTS_ARR_proto.slice(0, room.ROOM.MAX_INFANTS + 1);
                room.INFANTS = room.INFANTS_ARR[0];
                var agc = ARKIA2.WIZARD.getAgeGroupCount();
                if ($scope.hotelOptions.selectedRooms.length == 1) {

                    var party_types_num = $scope.hotelOptions.hotel.ROOMS.Value[0].PARTY_TYPES.Value.length;
                    for (var i = 0; i < party_types_num; i++) {
                        if ($scope.hotelOptions.hotel.ROOMS.Value[0].PARTY_TYPES.Value[i].ADULTS == agc.adults &&
                            $scope.hotelOptions.hotel.ROOMS.Value[0].PARTY_TYPES.Value[i].CHILDREN == agc.children) {
                            ARKIA.WIZARD.HOTELS.partyTypeDefault = i;
                            break;
                        }
                    }
                }

                if ($scope.hotelOptions.rooms_amount == 1 && room.ROOM.PARTY_TYPES.Value.length > 1) {
                    var pt = jQuery.grep(room.ROOM.PARTY_TYPES.Value, function (f) {
                        return f.ADULTS == agc.adults && f.CHILDREN == agc.children;
                    });

                    room.PARTY_TYPE = pt[0];
                    $scope.updatePrice(room);
                }

                if (room.ROOM.PARTY_TYPES.Value.length == 1) {
                    room.PARTY_TYPE = room.ROOM.PARTY_TYPES.Value[0];
                    $scope.updatePrice(room);
                }

                if ($scope.hotelOptions.rooms_amount == 1) {
                    room.INFANTS = agc.infants;
                    $scope.updatePrice(room);
                }
                if ($scope.noInfants) {
                    $(".roomInfantsSel").css('display', 'none')

                }


            }
            ARKIA.WIZARD.HOTELS.reLoad2 = true;
        };

        $scope.updatePrice = function (room) {
            ARKIA.WIZARD.HOTELS.reLoad2 = true;
            ARKIA.WIZARD.HOTELS.partyTypeDefault = null;
            //FIX for IE9
            angular.forEach($("select:visible"), function (currSelect) {
                currSelect.options[currSelect.selectedIndex].text += " ";
            });

            room.PRICE_FORMATTED = '';
            if (room.PARTY_TYPE != null) {
                var p = jQuery.grep(room.PARTY_TYPE.PRICES.Value, function (f) {
                    return f.BOARD_BASIS_CODE == $scope.hotelOptions.boards.CODE;
                });

                var infantPrice = p[0].INFANT_PRICE * room.INFANTS;
                room.PRICE_FORMATTED = eventsCurrency + (p[0].PRICE + infantPrice).formatMoney(0, '.', ',');
            }
        };

        $scope.init = function () {


            $scope.noInfants = (ARKIA2.WIZARD.getAgeGroupCount().infants === 0) ? true : false;
            if (!$scope.hotels || ARKIA.WIZARD.HOTELS.reLoad) {

                $("[role='adultsCount']").empty();
                $("[role='childrencCount']").empty();
                $("[role='infantsCount']").empty();
                $("[role='childLine']").hide();
                $("[role='infantLine']").hide();
                $('[role="HOTEL_COMMENT"]').val('');

                var agc = ARKIA2.WIZARD.getAgeGroupCount();
                if (agc.adults === 1) {
                    if ($(".bodyMain.ltr").length) {
                        $("[role='adultsCount']").text("adult");
                    }
                    else {
                        $("[role='adultsCount']").text("מבוגר");
                    }
                }
                else {
                    if ($(".bodyMain.ltr").length) {
                        $("[role='adultsCount']").text(agc.adults + " adults");
                    }
                    else {
                        $("[role='adultsCount']").text(agc.adults + " מבוגרים");
                    }
                }
                if (agc.children > 0) {
                    $("[role='childLine']").show();
                    if (agc.children === 1) {
                        if ($(".bodyMain.ltr").length) {
                            $("[role='childrencCount']").text("child");
                        }
                        else {
                            $("[role='childrencCount']").text("ילד");
                        }
                    }
                    else {
                        if ($(".bodyMain.ltr").length) {
                            $("[role='childrencCount']").text(agc.children + " children");
                        }
                        else {
                            $("[role='childrencCount']").text(agc.children + " ילדים");
                        }
                    }
                }
                if (agc.infants > 0) {
                    $("[role='infantLine']").show();
                    if (agc.infants === 1) {
                        if ($(".bodyMain.ltr").length) {
                            $("[role='infantsCount']").text("infant");
                        }
                        else {
                            $("[role='infantsCount']").text("תינוק");
                        }
                    }
                    else {
                        if ($(".bodyMain.ltr").length) {
                            $("[role='infantsCount']").text(agc.infants + " infants");
                        }
                        else {
                            $("[role='infantsCount']").text(agc.infants + " תינוקות");
                        }
                    }
                }

                $scope.hotelOptions.rooms_amount = 0;
                $scope.hotelOptions.selectedRooms = null;
                $scope.hotelOptions.hotel = null;
                var ageGroupCount = ARKIA2.WIZARD.getAgeGroupCount();
                $http({
                    url: 'webmethods/AjaxMethods.aspx/GetHotels',
                    method: "POST",
                    data: JSON.stringify(ageGroupCount),
                    headers: { 'Content-Type': 'application/json; charset=utf-8' }
                })
                    .success(function (data, status, headers, config) {
                        if (data.d.Value == null) {
                            alert(MSG383);
                            window.location = "./event-cycles";
                        }
                        $scope.hotels = data.d.Value;

                        if ($scope.hotels.length == 1) {
                            $scope.hotelOptions.hotel = $scope.hotels[0];
                            $scope.changeHotels($scope.hotelOptions);
                        }
                        ARKIA.WIZARD.HOTELS.reLoad = false;
                        $("#hotelsLoader").hide();
                        $("#hotelsContent").show();
                    })
                    .error(function (data, status, headers, config) {
                        window.location = errorPage;
                    });

            }
        }
    }],
    hotesCtrl_2: ['$scope', '$http', function ($scope, $http) {
        $scope.checkedOptions = {};

        if ($(".bodyMain.ltr").length) {
            var age_group_name = ['adult', 'child', 'infant'];
        }
        else {
            var age_group_name = ['מבוגר', 'ילד', 'תינוק'];
        }
        var infants = 0;
        $scope.addAllHotelRooms = function () {
            for (var i in $scope.checkedOptions.selectedRooms) {
                var PRD_KEY, HT_PARTY_TYPE_CODE, HT_BOARD_BASIS_CODE;
                PRD_KEY = $scope.checkedOptions.selectedRooms[i].ROOM.ROOM_PRD_KEY;
                HT_PARTY_TYPE_CODE = $scope.checkedOptions.selectedRooms[i].PARTY_TYPE.PARTY_TYPE_CODE;
                HT_BOARD_BASIS_CODE = $scope.checkedOptions.boards.CODE;
                var CUSTOMERS_NO = [];
                for (var index in $scope.checkedOptions.selectedRooms[i].room_customers) {
                    CUSTOMERS_NO.push($scope.checkedOptions.selectedRooms[i].room_customers[index].room_customer.CUSTOMER_NO);
                }
                ARKIA2.WIZARD.addHotelRoom(PRD_KEY, HT_PARTY_TYPE_CODE, HT_BOARD_BASIS_CODE, CUSTOMERS_NO);
            }
        }
        $scope.init_flag = true
        $scope.init = function () {

            if (ARKIA.WIZARD.HOTELS.reLoad2 == true) {
                $scope.init_flag = true


                var customers = { "A": [], "C": [], "I": [] };
                $('[role="HOTEL_COMMENT"]').val('');


                $scope.checkedOptions = ARKIA.WIZARD.HOTELS.roomsChecked;

                var customersArray = ARKIA2.WIZARD.getPassengers();

                for (var item in customersArray) {
                    customersArray[item].fullName = customersArray[item].LATIN_FIRST_NAME + " " + customersArray[item].LATIN_LAST_NAME;
                    customers[customersArray[item].AgeGroup].push(customersArray[item]);

                    infants += (customersArray[item].AgeGroup == 'I') ? 1 : 0;
                }

                for (var i in $scope.checkedOptions.selectedRooms) {
                    var aNumber = $scope.checkedOptions.selectedRooms[i].PARTY_TYPE.ADULTS;
                    var cNumber = $scope.checkedOptions.selectedRooms[i].PARTY_TYPE.CHILDREN;
                    var iNumber = $scope.checkedOptions.selectedRooms[i].INFANTS;
                    $scope.checkedOptions.selectedRooms[i].room_customers = [];
                    for (var price = 0; price < $scope.checkedOptions.selectedRooms[i].PARTY_TYPE.PRICES.Value.length; price++) {
                        if ($scope.checkedOptions.selectedRooms[i].PARTY_TYPE.PRICES.Value[price].BOARD_BASIS_CODE == ARKIA.WIZARD.HOTELS.roomsChecked.boards.CODE) {
                            var infantPrice = $scope.checkedOptions.selectedRooms[i].PARTY_TYPE.PRICES.Value[price].INFANT_PRICE * iNumber;
                            $scope.checkedOptions.selectedRooms[i].PARTY_TYPE.PRICE_FORMATTED =
                                ($scope.checkedOptions.selectedRooms[i].PARTY_TYPE.PRICES.Value[price].PRICE > 0) ? eventsCurrency + ($scope.checkedOptions.selectedRooms[i].PARTY_TYPE.PRICES.Value[price].PRICE + infantPrice).formatMoney(0, '.', ',') : "";
                            $scope.checkedOptions.selectedRooms[i].PARTY_TYPE.PRICE_SELECTED = $scope.checkedOptions.selectedRooms[i].PARTY_TYPE.PRICES.Value[price].PRICE + infantPrice;
                            break;
                        }
                    }

                    var oneRoom = ($scope.checkedOptions.selectedRooms.length == 1);

                    var cArr = [];
                    for (var ind in customers["A"]) {
                        cArr.push(customers["A"][ind]);
                    }
                    for (var j = 0; j < aNumber; j++) {
                        $scope.checkedOptions.selectedRooms[i].room_customers.push({ room_customer: oneRoom ? cArr[j] : null, type: "A", select_arr: oneRoom ? [cArr[j]] : cArr, label: age_group_name[0] });
                    }

                    var cArr = [];
                    for (var ind in customers["C"]) {
                        cArr.push(customers["C"][ind]);
                    }
                    for (var j = 0; j < cNumber; j++) {
                        $scope.checkedOptions.selectedRooms[i].room_customers.push({ room_customer: oneRoom ? cArr[j] : null, type: "C", select_arr: oneRoom ? [cArr[j]] : cArr, label: age_group_name[1] });
                    }

                    var cArr = [];
                    for (var ind in customers["I"]) {
                        cArr.push(customers["I"][ind]);
                    }
                    for (var j = 0; j < iNumber; j++) {
                        $scope.checkedOptions.selectedRooms[i].room_customers.push({ room_customer: oneRoom ? cArr[j] : null, type: "I", select_arr: oneRoom ? [cArr[j]] : cArr, label: age_group_name[2] });
                    }

                }
                ARKIA.WIZARD.HOTELS.reLoad2 = false;
                setTimeout(function () {
                    $('.hotelInfoRow .roomTypeSel').each(function () {
                        $(this).attr('aria-label', $(this).parents('.roomsResultRow').find('.roomNumLbl').text() + " " + $(this).prev().text());
                    });
                }, 100);
            }

            if ($scope.checkedOptions.selectedRooms.length == 1) {
                $("#buttonNextHotel").click();
            }
        }
        $scope.clearSelected = function (room) {
            ARKIA.WIZARD.HOTELS.reLoad2 = true;
            $scope.init();
        };

        $scope.passengersChange = function (roomItem, passItem, items) {

            if (passItem.OLD_SELECTED != null) {
                $.each(items, function (ind, room) {
                    $.each(room.room_customers, function (index, val) {
                        if (val.OLD_SELECTED != passItem.OLD_SELECTED) {
                            if (val.type == passItem.type) {
                                val.select_arr.push(passItem.OLD_SELECTED);
                            }
                        }
                    });
                });
            }

            if (passItem.room_customer != null) {
                $.each(items, function (ind, room) {
                    $.each(room.room_customers, function (index, val) {
                        if (val.room_customer != passItem.room_customer) {
                            val.select_arr = jQuery.grep(val.select_arr, function (value) {
                                return value.CUSTOMER_NO != passItem.room_customer.CUSTOMER_NO;
                            });
                        }
                    });
                });
            }

            //FIX for IE9
            angular.forEach($("select:visible"), function (currSelect) {
                currSelect.options[currSelect.selectedIndex].text += " ";
            });


            if (passItem.room_customer != null) {
                var selected = jQuery.grep(passItem.select_arr, function (value) {
                    return value.CUSTOMER_NO == passItem.room_customer.CUSTOMER_NO;
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
        $("[role='CUSTOMER_PRD02']").each(function (index, value) {
            if ($(this).val() < '0') {
                isStepValid = false;
                $(this).addClass('inputError');
                errors.push(MSG74.replace('{0}', (index + 1)));
            }
        });
        if (isStepValid) {
            angular.element(document.getElementById('ng_Ctrl_PRD02')).scope().addAllHotelRooms();
        }
        if (!isStepValid) {
            errorValues[stepnumber] = ARKIA.WIZARD.createErrorListWizard(errors);
        }
        return isStepValid;
    }
}
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
ARKIA.WIZARD.PRODUCTS.PRD06 = {
    indexPage: 1,
    pageCode: 'PRD06',
    reLoad: true,
    validate1Ticket: false,
    includesEmbedPage: true,
    controllerId: "ng_Ctrl_PRD06_2",
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
        var prod = ARKIA.WIZARD.PRODUCTS.PRD06;
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
                            $("#ng_Ctrl_PRD06 #adultTickets").each(function () {
                                $(this).attr("aria-label", $(this).parents(".feesRow").find(".colShowName").text() + ", " + $(this).parents(".feesRow").find("[role='ADULT_PRICE']").text() + ", " + $("#ng_Ctrl_PRD06 label#adultTicketsAmount").text());
                            });
                            $("#ng_Ctrl_PRD06 #childTickets").each(function () {
                                $(this).attr("aria-label", $(this).parents(".feesRow").find(".colShowName").text() + ", " + $(this).parents(".feesRow").find("[role='CHILD_PRICE']").text() + ", " + $("#ng_Ctrl_PRD06 label#childTicketsAmount").text());
                            });
                            $("#ng_Ctrl_PRD06 .responsive .selShowTickets").each(function () {
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
            var prod = ARKIA.WIZARD.PRODUCTS.PRD06;
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
            setTimeout(function () {
                $('#ng_Ctrl_PRD06_2 .passItem .selectName').each(function () {
                    if ($('.bodyMain.ltr').length) {
                        $(this).attr('aria-label', $(this).parents('.passItemBox').find('.greyPanel').text() + " " + $(this).prev().text() + $(this).next().text() + ', select participant');
                    }
                    else {
                        $(this).attr('aria-label', $(this).parents('.passItemBox').find('.greyPanel').text() + " " + $(this).prev().text() + $(this).next().text() + ', בחר משתתף');
                    }
                });
            }, 100);

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

        //הופעה אחת ללקוח
        //var sumPrdA = 0;
        //var sumPrdC = 0;


        if (ARKIA.WIZARD.PRODUCTS.temproducts[indexPage]) {
            $.each(ARKIA.WIZARD.PRODUCTS.temproducts[indexPage], function (index, product) {

                if (validate1Ticket) {

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

                    var sameDate = jQuery.grep(ARKIA.WIZARD.PRODUCTS.temproducts[indexPage], function (value) {
                        return value.EXECUTION_START_DATE == product.EXECUTION_START_DATE && value.CHILD_AGE_START == product.CHILD_AGE_START && value.CHILD_AGE_END == product.CHILD_AGE_END;
                    });
                    var sumTicketsDay = 0;
                    $.each(sameDate, function (i, s) {
                        sumTicketsDay += s.ADULTS_PRD_NO ? s.ADULTS_PRD_NO : 0;
                    });

                    if (sumTicketsDay > product.adults.length) {
                        isStepValid = false;
                    }

                    sumTicketsDay = 0;
                    $.each(sameDate, function (i, s) {
                        sumTicketsDay += s.CHILDREN_PRD_NO ? s.CHILDREN_PRD_NO : 0;
                    });
                    if (sumTicketsDay > product.children.length) {
                        isStepValid = false;
                    }
                }
            });
        }

        if (!isStepValid) {
            ARKIA2.WIZARD.resetProducts((indexPage + 1));
            errors.push(MSG134);
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
ARKIA.WIZARD.PRODUCTS.PRD07 = {
    indexPage: 2,
    pageCode: 'PRD07',
    reLoad: true,
    validate1Ticket: false,
    includesEmbedPage: true,
    controllerId: "ng_Ctrl_PRD07_2",
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
                }
                if (product.ADULT_PRICEIsNull == false) {
                    product.ADULT_PRICE_FMT = (eventsCurrency + product.ADULT_PRICE.formatMoney(0, '.', ','));
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
        var prod = ARKIA.WIZARD.PRODUCTS.PRD07;
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
                        $("#ng_Ctrl_PRD07 #adultTickets").each(function () {
                            $(this).attr("aria-label", $(this).parents(".feesRow").find(".colShowName").text() + ", " + $(this).parents(".feesRow").find("[role='ADULT_PRICE']").text() + ", " + $("#ng_Ctrl_PRD07 label#adultTicketsAmount").text());
                        });
                        $("#ng_Ctrl_PRD07 #childTickets").each(function () {
                            $(this).attr("aria-label", $(this).parents(".feesRow").find(".colShowName").text() + ", " + $(this).parents(".feesRow").find("[role='CHILD_PRICE']").text() + ", " + $("#ng_Ctrl_PRD07 label#childTicketsAmount").text());
                        });
                        $("#ng_Ctrl_PRD07 .responsive .selShowTickets").each(function () {
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
            var prod = ARKIA.WIZARD.PRODUCTS.PRD07;
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

            setTimeout(function () {
                $('#ng_Ctrl_PRD07_2 .passItem .selectName').each(function () {
                    if ($('.bodyMain.ltr').length) {
                        $(this).attr('aria-label', $(this).parents('.passItemBox').find('.greyPanel').text() + " " + $(this).prev().text() + $(this).next().text() + ', select participant');
                    }
                    else {
                        $(this).attr('aria-label', $(this).parents('.passItemBox').find('.greyPanel').text() + " " + $(this).prev().text() + $(this).next().text() + ', בחר משתתף');
                    }
                });
            }, 100);

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


        if (ARKIA.WIZARD.PRODUCTS.temproducts[indexPage]) {
            $.each(ARKIA.WIZARD.PRODUCTS.temproducts[indexPage], function (index, product) {

                if (validate1Ticket) {
                    var sameDate = jQuery.grep(ARKIA.WIZARD.PRODUCTS.temproducts[indexPage], function (value) {
                        return value.EXECUTION_START_DATE == product.EXECUTION_START_DATE && value.CHILD_AGE_START == product.CHILD_AGE_START && value.CHILD_AGE_END == product.CHILD_AGE_END;
                    });
                    var sumTicketsDay = 0;
                    $.each(sameDate, function (i, s) {
                        sumTicketsDay += s.ADULTS_PRD_NO ? s.ADULTS_PRD_NO : 0;
                    });

                    if (sumTicketsDay > product.adults.length) {
                        isStepValid = false;
                    }

                    sumTicketsDay = 0;
                    $.each(sameDate, function (i, s) {
                        sumTicketsDay += s.CHILDREN_PRD_NO ? s.CHILDREN_PRD_NO : 0;
                    });
                    if (sumTicketsDay > product.children.length) {
                        isStepValid = false;
                    }
                }
            });
        }

        if (!isStepValid) {
            ARKIA2.WIZARD.resetProducts((indexPage + 1));
            errors.push(MSG135);
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


ARKIA.RESERVATION = {
    CUSTOMER: null,
    COMPANIONS: null,
    FEES: null,
    HOTELS: null,
    HOTEL_COMMENT: null,
    FLIGHTS: null,
    AD_PRODUCTS: null,
    AD_PRODUCTS1: null,
    AD_PRODUCTS2: null,
    AD_PRODUCTS3: null,
    AD_PRODUCTS4: null,
    AD_PRODUCTS5: null,
    SHUTTLE: null,
    MEAL: null,
    REGION: ''
};

ARKIA.CUSTOMER = function () { }

ARKIA.CUSTOMER.prototype = {
    LAST_NAME: '',
    CUSTOMER_NO: 0,
    CUSTOMER_NOIsNull: true,
    EMAIL: '',
    LATIN_LAST_NAME: '',
    JOB_TITLE_CODE: '',
    JOB_TITLE_CODEIsNull: true,
    DOB: '',
    PHONES: {},
    FIRST_NAME: '',
    LATIN_FIRST_NAME: '',
    TITLE_CODE: '',
    TITLE_CODEIsNull: '',
    ID_NO: '',
    PASSPORT_NO: '',
    EXPIRE_DATE: '',
    ADDITIONAL_INFO1: '',
    ADDITIONAL_INFO2: '',
    ADDITIONAL_INFO3: '',
    COMMENT_1: '',
    COMMENT_2: '',
    COMMENT_3: '',
    COMMENT_4: '',


    init: function (TITLE_CODE, JOB_TITLE_CODE, ID_NO, LAST_NAME, FIRST_NAME, LATIN_LAST_NAME, LATIN_FIRST_NAME, EMAIL, AREA_CODE1, PHONE1, AREA_CODE2, PHONE2, AREA_CODE_FAX, FAX, PASSPORT_NO, EXPIRE_DATE, YEAR, MONTH, DAY, ADDITIONAL_INFO1, ADDITIONAL_INFO2, ADDITIONAL_INFO3, COMMENT_1, COMMENT_2, COMMENT_3, COMMENT_4) {
        this.CUSTOMER_NO = 1;
        this.CUSTOMER_NOIsNull = false;
        this.TITLE_CODE = TITLE_CODE;
        this.TITLE_CODEIsNull = false;
        this.JOB_TITLE_CODE = JOB_TITLE_CODE;
        if (JOB_TITLE_CODE != 0)
            this.JOB_TITLE_CODEIsNull = false;
        this.ID_NO = ID_NO;
        this.FIRST_NAME = FIRST_NAME;
        this.LAST_NAME = LAST_NAME;
        this.LATIN_LAST_NAME = LATIN_LAST_NAME;
        this.LATIN_FIRST_NAME = LATIN_FIRST_NAME;
        this.EMAIL = EMAIL;
        if (PASSPORT_NO != null) {
            this.PASSPORT_NO = PASSPORT_NO;
            this.EXPIRE_DATE = EXPIRE_DATE;
            this.EXPIRE_DATEIsNull = false;
            this.DOB = YEAR + '' + (MONTH < 10 ? '0' + MONTH : MONTH) + '' + (DAY < 10 ? '0' + DAY : DAY);
        }
        this.PHONES = new ARKIA.PHONES();

        this.PHONES.Value = [];

        if (PHONE1) {
            var p1 = new ARKIA.PHONE();
            p1.init(PHONE1, AREA_CODE1, 'N');
            this.PHONES.Value.push(p1);
        }

        if (PHONE2) {
            var p2 = new ARKIA.PHONE();
            p2.init(PHONE2, AREA_CODE2, 'N');
            this.PHONES.Value.push(p2);
        }

        if (FAX) {
            var fax = new ARKIA.PHONE();
            fax.init(FAX, AREA_CODE_FAX, 'Y');
            this.PHONES.Value.push(fax);
        }

        this.ADDITIONAL_INFO1 = ADDITIONAL_INFO1;
        this.ADDITIONAL_INFO2 = ADDITIONAL_INFO2;
        this.ADDITIONAL_INFO3 = ADDITIONAL_INFO3;
        this.COMMENT_1 = COMMENT_1;
        this.COMMENT_2 = COMMENT_2;
        this.COMMENT_3 = COMMENT_3;
        this.COMMENT_4 = COMMENT_4;
    },
    initComp: function (CUSTOMER_NO, TITLE_CODE, JOB_TITLE_CODE, LATIN_LAST_NAME, LATIN_FIRST_NAME, YEAR, MONTH, DAY, PASSPORT_NO, EXPIRE_DATE) {
        this.CUSTOMER_NO = CUSTOMER_NO;
        this.CUSTOMER_NOIsNull = false;
        this.TITLE_CODE = TITLE_CODE;
        this.TITLE_CODEIsNull = false;
        this.JOB_TITLE_CODE = JOB_TITLE_CODE;
        if (JOB_TITLE_CODE != 0)
            this.JOB_TITLE_CODEIsNull = false;
        this.LATIN_LAST_NAME = LATIN_LAST_NAME;
        this.LATIN_FIRST_NAME = LATIN_FIRST_NAME;
        this.DOB = YEAR + '' + (MONTH < 10 ? '0' + MONTH : MONTH) + '' + (DAY < 10 ? '0' + DAY : DAY);
        if (PASSPORT_NO != null) {
            this.PASSPORT_NO = PASSPORT_NO;
            this.EXPIRE_DATE = EXPIRE_DATE;
            this.EXPIRE_DATEIsNull = false;
        }
    }

};

ARKIA.PHONES = function () { }
ARKIA.PHONES.prototype = {
    Value: []
};

ARKIA.PHONE = function () { }
ARKIA.PHONE.prototype = {
    FAX_YN: '',
    PHONE_NO: 0,
    PHONE_NOIsNull: true,
    AREA_CODE: 0,
    AREA_CODEIsNull: true,

    init: function (PHONE_NO, AREA_CODE, FAX_YN) {
        this.PHONE_NO = PHONE_NO;
        this.PHONE_NOIsNull = false;
        this.AREA_CODE = AREA_CODE;
        this.AREA_CODEIsNull = false;
        this.FAX_YN = FAX_YN;
    }
};

ARKIA.PRODUCTS = function () { }
ARKIA.PRODUCTS.prototype = {
    Value: []
};


ARKIA.PRODUCT = function () { }
ARKIA.PRODUCT.prototype = {
    PRD_KEY: null,
    PASSENGERS: null,
    HT_PARTY_TYPE_CODE: 0,
    HT_PARTY_TYPE_CODEIsNull: true,
    HT_BOARD_BASIS_CODE: 0,
    HT_BOARD_BASIS_CODEIsNull: true,
    ADULTS_PRD_NO: 0,
    ADULTS_PRD_NOIsNull: true,
    CHILDREN_PRD_NO: 0,
    CHILDREN_PRD_NOIsNull: true,

    initFee: function (PRD_KEY, CUSTOMER_NO) {
        this.PRD_KEY = PRD_KEY;
        this.PASSENGERS = new ARKIA.PASSENGERS();
        this.PASSENGERS.Value = [];
        this.PASSENGERS.StatusArray = [];
        if (CUSTOMER_NO) {

            this.PASSENGERS.Value.push(CUSTOMER_NO);
            this.PASSENGERS.StatusArray.push(1); // NotNull = 1,
        }
    },
    initHotel: function (PRD_KEY, HT_PARTY_TYPE_CODE, HT_BOARD_BASIS_CODE, CUSTOMERS_NO) {
        this.PRD_KEY = PRD_KEY;
        this.HT_PARTY_TYPE_CODE = HT_PARTY_TYPE_CODE;
        this.HT_PARTY_TYPE_CODEIsNull = false;
        this.HT_BOARD_BASIS_CODE = HT_BOARD_BASIS_CODE;
        this.HT_BOARD_BASIS_CODEIsNull = false;
        var pass = new ARKIA.PASSENGERS();
        pass.Value = [];
        pass.StatusArray = [];
        if (CUSTOMERS_NO) {
            $.each(CUSTOMERS_NO, function (index, entry) {
                pass.Value.push(entry);
                pass.StatusArray.push(1); // NotNull = 1,
            });
        }
        this.PASSENGERS = pass;
    },
    initFlight: function (PRD_KEY, CUSTOMERS_NO) {
        this.PRD_KEY = PRD_KEY;
        var pass = new ARKIA.PASSENGERS();
        pass.Value = [];
        pass.StatusArray = [];
        if (CUSTOMERS_NO) {
            $.each(CUSTOMERS_NO, function (index, entry) {
                pass.Value.push(entry);
                pass.StatusArray.push(1); // NotNull = 1,
            });
        }
        this.PASSENGERS = pass;
    },
    initProduct: function (PRD_KEY, ADULTS_PRD_NO, CHILDREN_PRD_NO, CUSTOMERS_NO) {
        this.PRD_KEY = PRD_KEY;
        if (ADULTS_PRD_NO > 0) {
            this.ADULTS_PRD_NO = ADULTS_PRD_NO;
            this.ADULTS_PRD_NOIsNull = false;
        }
        if (CHILDREN_PRD_NO > 0) {
            this.CHILDREN_PRD_NO = CHILDREN_PRD_NO;
            this.CHILDREN_PRD_NOIsNull = false;
        }

        if (CUSTOMERS_NO) {
            var pass = new ARKIA.PASSENGERS();
            pass.Value = [];
            pass.StatusArray = [];
            if (CUSTOMERS_NO) {
                $.each(CUSTOMERS_NO, function (index, entry) {
                    pass.Value.push(entry);
                    pass.StatusArray.push(1); // NotNull = 1,
                });
            }
            this.PASSENGERS = pass;
        }
    },

    initMeal: function (PRD_KEY, ADULTS_PRD_NO, CHILDREN_PRD_NO) {
        this.PRD_KEY = PRD_KEY;
        if (ADULTS_PRD_NO > 0) {
            this.ADULTS_PRD_NO = ADULTS_PRD_NO;
            this.ADULTS_PRD_NOIsNull = false;
        }
        if (CHILDREN_PRD_NO > 0) {
            this.CHILDREN_PRD_NO = CHILDREN_PRD_NO;
            this.CHILDREN_PRD_NOIsNull = false;
        }
    },

    initShuttle: function (PRD_KEY, CUSTOMERS_NO) {
        this.PRD_KEY = PRD_KEY;
        var pass = new ARKIA.PASSENGERS();
        pass.Value = [];
        pass.StatusArray = [];
        if (CUSTOMERS_NO) {
            $.each(CUSTOMERS_NO, function (index, entry) {
                pass.Value.push(entry);
                pass.StatusArray.push(1); // NotNull = 1,
            });
        }
        this.PASSENGERS = pass;
    },
};

ARKIA.PASSENGERS = function () { }
ARKIA.PASSENGERS.prototype = {
    Value: [],
    StatusArray: [] //OracleUdtStatus Null = 0, NotNull = 1,
};

ARKIA.COMPANIONS = function () { }
ARKIA.COMPANIONS.prototype = {
    Value: []
};


var ARKIA2 = {

    WIZARD: {

        setCustomer: function (TITLE_CODE, JOB_TITLE_CODE, ID_NO, LAST_NAME, FIRST_NAME, LATIN_LAST_NAME, LATIN_FIRST_NAME, EMAIL, AREA_CODE1, PHONE1, AREA_CODE2, PHONE2, AREA_CODE_FAX, FAX, PASSPORT_NO, EXPIRE_DATE, YEAR, MONTH, DAY, REGION, ADDITIONAL_INFO1, ADDITIONAL_INFO2, ADDITIONAL_INFO3, COMMENT_1, COMMENT_2, COMMENT_3, COMMENT_4) {
            cust = new ARKIA.CUSTOMER();
            cust.init(TITLE_CODE, JOB_TITLE_CODE, ID_NO, LAST_NAME, FIRST_NAME, LATIN_LAST_NAME, LATIN_FIRST_NAME, EMAIL, AREA_CODE1, PHONE1, AREA_CODE2, PHONE2, AREA_CODE_FAX, FAX, PASSPORT_NO, EXPIRE_DATE, YEAR, MONTH, DAY, ADDITIONAL_INFO1, ADDITIONAL_INFO2, ADDITIONAL_INFO3, COMMENT_1, COMMENT_2, COMMENT_3, COMMENT_4);

            ARKIA.RESERVATION.CUSTOMER = cust;
            ARKIA.RESERVATION.REGION = REGION;

            ARKIA2.WIZARD.saveInSession();
            return ARKIA.RESERVATION;
        },

        //if something changed reset session and send true
        resetCompanions: function (resetSelectedProducts) {

            ARKIA.RESERVATION.COMPANIONS = null;

            if (resetSelectedProducts && resetSelectedProducts == true) {
                ARKIA.RESERVATION.FEES = null;
                ARKIA.RESERVATION.HOTELS = null;
                ARKIA.RESERVATION.HOTEL_COMMENT = null;
                ARKIA.RESERVATION.FLIGHTS = null;
                ARKIA.RESERVATION.AD_PRODUCTS = null;
                ARKIA.RESERVATION.AD_PRODUCTS1 = null;
                ARKIA.RESERVATION.AD_PRODUCTS2 = null;
                ARKIA.RESERVATION.AD_PRODUCTS3 = null;
                ARKIA.RESERVATION.AD_PRODUCTS4 = null;
                ARKIA.RESERVATION.AD_PRODUCTS5 = null;
                ARKIA.RESERVATION.SHUTTLE = null;
                ARKIA.RESERVATION.MEAL = null;

            }
        },

        addCompanions: function (TITLE_CODE, JOB_TITLE_CODE, LATIN_LAST_NAME, LATIN_FIRST_NAME, YEAR, MONTH, DAY, PASSPORT_NO, EXPIRE_DATE) {

            if (!ARKIA.RESERVATION.COMPANIONS) {
                ARKIA.RESERVATION.COMPANIONS = new ARKIA.COMPANIONS();

                ARKIA.RESERVATION.COMPANIONS.Value = [];
            }

            var comp = new ARKIA.CUSTOMER();
            comp.initComp(ARKIA.RESERVATION.COMPANIONS.Value.length + 2, TITLE_CODE, JOB_TITLE_CODE, LATIN_LAST_NAME, LATIN_FIRST_NAME, YEAR, MONTH, DAY, PASSPORT_NO, EXPIRE_DATE);
            ARKIA.RESERVATION.COMPANIONS.Value.push(comp);

            ARKIA2.WIZARD.saveInSession();
            return ARKIA.RESERVATION;

        },

        resetFees: function () {
            ARKIA.RESERVATION.FEES = null;
        },

        addFee: function (PRD_KEY, CUSTOMER_NO) {
            if (!ARKIA.RESERVATION.FEES) {
                ARKIA.RESERVATION.FEES = new ARKIA.PRODUCTS();

                ARKIA.RESERVATION.FEES.Value = [];
            }

            var prd = new ARKIA.PRODUCT();
            prd.initFee(PRD_KEY, CUSTOMER_NO);
            ARKIA.RESERVATION.FEES.Value.push(prd);

            ARKIA2.WIZARD.saveInSession();

            return ARKIA.RESERVATION;
        },


        resetHotels: function () {
            ARKIA.RESERVATION.HOTELS = null;
        },
        initHotels: function () {
            if (!ARKIA.RESERVATION.HOTELS) {
                ARKIA.RESERVATION.HOTELS = new ARKIA.PRODUCTS();

                ARKIA.RESERVATION.HOTELS.Value = [];
            }
        },
        //CUSTOMERS_NO - array of CUSTOMER_NO
        addHotelRoom: function (PRD_KEY, HT_PARTY_TYPE_CODE, HT_BOARD_BASIS_CODE, CUSTOMERS_NO) {
            if (!ARKIA.RESERVATION.HOTELS) {
                ARKIA.RESERVATION.HOTELS = new ARKIA.PRODUCTS();

                ARKIA.RESERVATION.HOTELS.Value = [];
            }
            var prd = new ARKIA.PRODUCT();
            prd.initHotel(PRD_KEY, HT_PARTY_TYPE_CODE, HT_BOARD_BASIS_CODE, CUSTOMERS_NO);
            ARKIA.RESERVATION.HOTELS.Value.push(prd);

            ARKIA2.WIZARD.saveInSession();
            return ARKIA.RESERVATION;
        },
        setHotelComment: function (HOTEL_COMMENT) {
            ARKIA.RESERVATION.HOTEL_COMMENT = HOTEL_COMMENT;
        },
        resetFlights: function () {
            ARKIA.RESERVATION.FLIGHTS = null;
        },
        initFlights: function () {
            if (!ARKIA.RESERVATION.FLIGHTS) {
                ARKIA.RESERVATION.FLIGHTS = new ARKIA.PRODUCTS();

                ARKIA.RESERVATION.FLIGHTS.Value = [];
            }
        },
        //CUSTOMERS_NO - array of CUSTOMER_NO
        AddFlight: function (PRD_KEY, CUSTOMERS_NO) {
            if (!ARKIA.RESERVATION.FLIGHTS) {
                ARKIA.RESERVATION.FLIGHTS = new ARKIA.PRODUCTS();

                ARKIA.RESERVATION.FLIGHTS.Value = [];
            }

            var prd = new ARKIA.PRODUCT();
            prd.initFlight(PRD_KEY, CUSTOMERS_NO);
            ARKIA.RESERVATION.FLIGHTS.Value.push(prd);

            ARKIA2.WIZARD.saveInSession();
            return ARKIA.RESERVATION;
        },
        resetProducts: function (indexPage) {
            ARKIA.RESERVATION.AD_PRODUCTS = null;
            switch (indexPage) {
                case 1:
                    ARKIA.RESERVATION.AD_PRODUCTS1 = null;
                    break;
                case 2:
                    ARKIA.RESERVATION.AD_PRODUCTS2 = null;
                    break;
                case 3:
                    ARKIA.RESERVATION.AD_PRODUCTS3 = null;
                    break;
                case 4:
                    ARKIA.RESERVATION.AD_PRODUCTS4 = null;
                    break;
                case 5:
                    ARKIA.RESERVATION.AD_PRODUCTS5 = null;
                    break;
            }
        },
        AddProduct: function (indexPage, PRD_KEY, ADULTS_PRD_NO, CHILDREN_PRD_NO, CUSTOMERS_NO) {
            switch (indexPage) {
                case 1:
                    if (!ARKIA.RESERVATION.AD_PRODUCTS1) {
                        ARKIA.RESERVATION.AD_PRODUCTS1 = new ARKIA.PRODUCTS();
                        ARKIA.RESERVATION.AD_PRODUCTS1.Value = [];
                    }
                    var prd = new ARKIA.PRODUCT();
                    prd.initProduct(PRD_KEY, ADULTS_PRD_NO, CHILDREN_PRD_NO, CUSTOMERS_NO);
                    ARKIA.RESERVATION.AD_PRODUCTS1.Value.push(prd);
                    break;
                case 2:
                    if (!ARKIA.RESERVATION.AD_PRODUCTS2) {
                        ARKIA.RESERVATION.AD_PRODUCTS2 = new ARKIA.PRODUCTS();
                        ARKIA.RESERVATION.AD_PRODUCTS2.Value = [];
                    }
                    var prd = new ARKIA.PRODUCT();
                    prd.initProduct(PRD_KEY, ADULTS_PRD_NO, CHILDREN_PRD_NO, CUSTOMERS_NO);
                    ARKIA.RESERVATION.AD_PRODUCTS2.Value.push(prd);
                    break;
                case 3:
                    if (!ARKIA.RESERVATION.AD_PRODUCTS3) {
                        ARKIA.RESERVATION.AD_PRODUCTS3 = new ARKIA.PRODUCTS();
                        ARKIA.RESERVATION.AD_PRODUCTS3.Value = [];
                    }
                    var prd = new ARKIA.PRODUCT();
                    prd.initProduct(PRD_KEY, ADULTS_PRD_NO, CHILDREN_PRD_NO, CUSTOMERS_NO);
                    ARKIA.RESERVATION.AD_PRODUCTS3.Value.push(prd);

                    break;
                case 4:
                    if (!ARKIA.RESERVATION.AD_PRODUCTS4) {
                        ARKIA.RESERVATION.AD_PRODUCTS4 = new ARKIA.PRODUCTS();
                        ARKIA.RESERVATION.AD_PRODUCTS4.Value = [];
                    }
                    var prd = new ARKIA.PRODUCT();
                    prd.initProduct(PRD_KEY, ADULTS_PRD_NO, CHILDREN_PRD_NO, CUSTOMERS_NO);
                    ARKIA.RESERVATION.AD_PRODUCTS4.Value.push(prd);
                    break;
                case 5:
                    if (!ARKIA.RESERVATION.AD_PRODUCTS5) {
                        ARKIA.RESERVATION.AD_PRODUCTS5 = new ARKIA.PRODUCTS();
                        ARKIA.RESERVATION.AD_PRODUCTS5.Value = [];
                    }
                    var prd = new ARKIA.PRODUCT();
                    prd.initProduct(PRD_KEY, ADULTS_PRD_NO, CHILDREN_PRD_NO, CUSTOMERS_NO);
                    ARKIA.RESERVATION.AD_PRODUCTS5.Value.push(prd);
                    break;
            }

            ARKIA2.WIZARD.saveInSession();
            return ARKIA.RESERVATION;
        },
        resetMeal: function () {
            ARKIA.RESERVATION.MEAL = null;
        },
        AddMeal: function (PRD_KEY, ADULTS_PRD_NO, CHILDREN_PRD_NO) {
            if (!ARKIA.RESERVATION.MEAL) {
                ARKIA.RESERVATION.MEAL = new ARKIA.PRODUCTS();

                ARKIA.RESERVATION.MEAL.Value = [];
            }

            var prd = new ARKIA.PRODUCT();
            prd.initMeal(PRD_KEY, ADULTS_PRD_NO, CHILDREN_PRD_NO);
            ARKIA.RESERVATION.MEAL.Value.push(prd);

            ARKIA2.WIZARD.saveInSession();
            return ARKIA.RESERVATION;
        },

        resetShuttle: function () {
            ARKIA.RESERVATION.SHUTTLE = null;
        },
        initShuttle: function () {
            if (!ARKIA.RESERVATION.SHUTTLE) {
                ARKIA.RESERVATION.SHUTTLE = new ARKIA.PRODUCTS();

                ARKIA.RESERVATION.SHUTTLE.Value = [];
            }
        },
        //CUSTOMERS_NO - array of CUSTOMER_NO
        AddShuttle: function (PRD_KEY, CUSTOMERS_NO) {
            if (!ARKIA.RESERVATION.SHUTTLE) {
                ARKIA.RESERVATION.SHUTTLE = new ARKIA.PRODUCTS();

                ARKIA.RESERVATION.SHUTTLE.Value = [];
            }

            var prd = new ARKIA.PRODUCT();
            prd.initShuttle(PRD_KEY, CUSTOMERS_NO);
            ARKIA.RESERVATION.SHUTTLE.Value.push(prd);

            ARKIA2.WIZARD.saveInSession();
            return ARKIA.RESERVATION;
        },

        saveInSession: function () {
            sessionStorage.setItem('RESERVATION', JSON.stringify(ARKIA.RESERVATION));
        },


        getReservation: function () {
            var res = null;

            if (ARKIA.RESERVATION.CUSTOMER) {

                res = ARKIA.RESERVATION;
            }
            else {
                var str = sessionStorage.getItem('RESERVATION')
                if (str) {
                    ARKIA.RESERVATION = JSON.parse(str);
                    ARKIA.RESERVATION.FEES = null;
                    ARKIA.RESERVATION.HOTELS = null;
                    ARKIA.RESERVATION.HOTEL_COMMENT = null;
                    ARKIA.RESERVATION.FLIGHTS = null;
                    ARKIA.RESERVATION.AD_PRODUCTS = null;
                    ARKIA.RESERVATION.SHUTTLE = null;
                    res = ARKIA.RESERVATION;
                }
            }
            if (res != null) {
                if (res.AD_PRODUCTS == null) {
                    res.AD_PRODUCTS = new ARKIA.PRODUCTS();
                    ARKIA.RESERVATION.AD_PRODUCTS.Value = [];
                }
                if (res.AD_PRODUCTS1 == null) {
                    res.AD_PRODUCTS1 = new ARKIA.PRODUCTS();
                    ARKIA.RESERVATION.AD_PRODUCTS1.Value = [];
                }
                if (res.AD_PRODUCTS2 == null) {
                    res.AD_PRODUCTS2 = new ARKIA.PRODUCTS();
                    ARKIA.RESERVATION.AD_PRODUCTS2.Value = [];
                }
                if (res.AD_PRODUCTS3 == null) {
                    res.AD_PRODUCTS3 = new ARKIA.PRODUCTS();
                    ARKIA.RESERVATION.AD_PRODUCTS3.Value = [];
                }
                if (res.AD_PRODUCTS4 == null) {
                    res.AD_PRODUCTS4 = new ARKIA.PRODUCTS();
                    ARKIA.RESERVATION.AD_PRODUCTS4.Value = [];
                }
                if (res.AD_PRODUCTS5 == null) {
                    res.AD_PRODUCTS5 = new ARKIA.PRODUCTS();
                    ARKIA.RESERVATION.AD_PRODUCTS5.Value = [];
                }
                if (res.SHUTTLE == null) {
                    res.SHUTTLE = new ARKIA.PRODUCTS();
                    ARKIA.RESERVATION.SHUTTLE.Value = [];
                }
                if (res.MEAL == null) {
                    res.MEAL = new ARKIA.PRODUCTS();
                    ARKIA.RESERVATION.MEAL.Value = [];
                }

                res.AD_PRODUCTS.Value = $.merge(res.AD_PRODUCTS.Value, res.AD_PRODUCTS1.Value);
                res.AD_PRODUCTS.Value = $.merge(res.AD_PRODUCTS.Value, res.AD_PRODUCTS2.Value);
                res.AD_PRODUCTS.Value = $.merge(res.AD_PRODUCTS.Value, res.AD_PRODUCTS3.Value);
                res.AD_PRODUCTS.Value = $.merge(res.AD_PRODUCTS.Value, res.AD_PRODUCTS4.Value);
                res.AD_PRODUCTS.Value = $.merge(res.AD_PRODUCTS.Value, res.AD_PRODUCTS5.Value);
                res.AD_PRODUCTS.Value = $.merge(res.AD_PRODUCTS.Value, res.SHUTTLE.Value);
                res.AD_PRODUCTS.Value = $.merge(res.AD_PRODUCTS.Value, res.MEAL.Value);
                //במידה ואין דף מוצרים כגון ארוחות או הסעות יש להוריד את השורה

            }
            return res;
        },
        getPassengers: function () {
            var items = [];
            var cust = ARKIA.RESERVATION.CUSTOMER;
            cust.AgeGroup = 'A';
            cust.FULL_NAME = cust.LATIN_FIRST_NAME + " " + cust.LATIN_LAST_NAME;
            items.push(cust);
            if (ARKIA.RESERVATION.COMPANIONS) {
                $.each(ARKIA.RESERVATION.COMPANIONS.Value, function (index, item) {
                    item.AgeGroup = ARKIA2.WIZARD.getAgeGroup(item);
                    item.FULL_NAME = item.LATIN_FIRST_NAME + " " + item.LATIN_LAST_NAME;
                    items.push(item);
                });
            }
            return items;
        },
        getAgeByDate: function (dateString) {
            var parts = startDate.split('/');
            eventStartDate = new Date(parts[2], parts[1] - 1, parts[0]);

            var year = dateString.substring(0, 4);
            var month = dateString.substring(4, 6);
            var day = dateString.substring(6, 8);
            var birthDate = new Date(year, month - 1, day);
            var age = eventStartDate.getFullYear() - birthDate.getFullYear();
            var m = eventStartDate.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && eventStartDate.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        },
        getAgeGroup: function (entry) {
            if (entry.CUSTOMER_NO == 1) {
                return 'A'; // adult - Main Customer
            }
            else {
                var age = ARKIA2.WIZARD.getAgeByDate(entry.DOB);
                if (age < ChildAgeStart) {
                    return 'I'; // baby
                }
                else if (age < ChildAgeEnd) {
                    return 'C'; // child
                }
                return 'A'; // adult
            }

        },
        getAgeGroupRegType: function (entry) {
            if (entry.CUSTOMER_NO == 1) {
                return 'A'; // adult - Main Customer
            }
            else {
                var age = ARKIA2.WIZARD.getAgeByDate(entry.DOB);
                if (age < 2) {
                    return 'I'; // baby
                }
                else if (age < 22) {
                    return 'C'; // child
                }
                return 'A'; // adult
            }

        },

        getAgeGroupCountRegType: function () {
            var adults = 1;
            var children = 0;
            var infants = 0;

            if (ARKIA.RESERVATION.COMPANIONS != null && ARKIA.RESERVATION.COMPANIONS.Value != null) {
                $.each(ARKIA.RESERVATION.COMPANIONS.Value, function (index, entry) {
                    if (ARKIA2.WIZARD.getAgeGroupRegType(entry) == 'I') {
                        infants++;
                    }
                    else if (ARKIA2.WIZARD.getAgeGroupRegType(entry) == 'C') {
                        children++;
                    }
                    else {
                        adults++;
                    }
                });
            }

            return {
                adults: adults,
                children: children,
                infants: infants
            };

        },

        getAgeGroupCount: function () {
            var adults = 1;
            var children = 0;
            var infants = 0;

            if (ARKIA.RESERVATION.COMPANIONS != null && ARKIA.RESERVATION.COMPANIONS.Value != null) {
                $.each(ARKIA.RESERVATION.COMPANIONS.Value, function (index, entry) {
                    if (ARKIA2.WIZARD.getAgeGroup(entry) == 'I') {
                        infants++;
                    }
                    else if (ARKIA2.WIZARD.getAgeGroup(entry) == 'C') {
                        children++;
                    }
                    else {
                        adults++;
                    }
                });
            }

            return {
                adults: adults,
                children: children,
                infants: infants
            };

        }
    }
};

